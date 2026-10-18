/**
 * Exercises - die Aufgabentypen des Kurses.
 *
 *   multiple-choice  { question, options[], correct, explanation, wrongExplanations{index: text} }
 *   matching         { question, pairs[{left, right}], explanation }
 *   ordering         { question, items[] (in richtiger Reihenfolge), explanation }
 *
 * Gemischt wird "deterministisch": dieselbe Aufgabe hat bei jedem Laden
 * dieselbe Reihenfolge (das verwirrt beim Neuladen nicht), aber ueber alle
 * Aufgaben verteilt steht die richtige Antwort mal oben, mal unten.
 */
const Exercises = {
  // Aus einem Text (Seed) eine Zahl machen (Knuth-Hash).
  _hash(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
    }
    return h >>> 0;
  },

  // Reihenfolge 0..n-1, gemischt nach Seed. Die Hash-Zahl waehlt eine der n!
  // moeglichen Reihenfolgen aus (Lehmer-Code).
  _permutation(n, seed) {
    let factorial = 1;
    for (let i = 2; i <= n; i++) factorial *= i;
    let k = this._hash(seed) % factorial;
    const pool = [];
    for (let i = 0; i < n; i++) pool.push(i);
    const order = [];
    for (let i = n; i > 0; i--) {
      factorial /= i;
      const idx = Math.floor(k / factorial);
      k %= factorial;
      order.push(pool.splice(idx, 1)[0]);
    }
    return order;
  },

  // Neue, gemischte Kopie einer MC-Aufgabe. options, correct und die
  // Schluessel von wrongExplanations wandern GEMEINSAM mit.
  shuffleMc(exercise, seed) {
    const order = this._permutation(exercise.options.length, seed);
    const wrong = {};
    const source = exercise.wrongExplanations || {};
    order.forEach((orig, pos) => {
      if (source[orig] !== undefined) wrong[pos] = source[orig];
    });
    return Object.assign({}, exercise, {
      options: order.map(i => exercise.options[i]),
      correct: order.indexOf(exercise.correct),
      wrongExplanations: wrong
    });
  },

  // Aufgabe in container zeichnen. onComplete() wird aufgerufen, sobald sie
  // richtig geloest ist. onAnswer(firstTry) meldet, ob der erste Versuch
  // richtig war (fuer den Modultest).
  render(exercise, container, onComplete, seed, onAnswer) {
    const s = seed || exercise.question;
    const report = onAnswer || function () {};
    if (exercise.type === 'multiple-choice') return this._renderMc(this.shuffleMc(exercise, s), container, onComplete, report);
    if (exercise.type === 'matching') return this._renderMatching(exercise, container, onComplete, s, report);
    if (exercise.type === 'ordering') return this._renderOrdering(exercise, container, onComplete, s, report);
    container.appendChild(this._el('p', 'exercise-question', 'Unbekannter Aufgabentyp: ' + exercise.type));
    onComplete();
  },

  _el(tag, className, html) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (html !== undefined) el.innerHTML = html;
    return el;
  },

  _feedback(el, ok, html) {
    el.className = 'exercise-feedback ' + (ok ? 'correct' : 'incorrect');
    el.innerHTML = html;
    el.hidden = false;
  },

  _renderMc(ex, container, onComplete, report) {
    const wrap = this._el('div', 'exercise exercise-mc');
    wrap.appendChild(this._el('p', 'exercise-question', ex.question));
    const list = this._el('div', 'mc-options');
    const fb = this._el('div', 'exercise-feedback');
    fb.hidden = true;
    let first = true;
    ex.options.forEach((text, i) => {
      const btn = this._el('button', 'mc-option', text);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        if (i === ex.correct) {
          btn.classList.add('correct');
          list.querySelectorAll('button').forEach(b => { b.disabled = true; });
          this._feedback(fb, true, '<strong>Richtig.</strong> ' + ex.explanation);
          if (first) report(true);
          onComplete();
        } else {
          btn.classList.add('incorrect');
          btn.disabled = true;
          if (first) report(false);
          const why = ex.wrongExplanations[i];
          this._feedback(fb, false, (why || 'Das passt nicht ganz.') + ' Versuch es noch einmal.');
        }
        first = false;
      });
      list.appendChild(btn);
    });
    wrap.appendChild(list);
    wrap.appendChild(fb);
    container.appendChild(wrap);
  },

  // Zuordnen: erst links antippen, dann rechts das Passende.
  _renderMatching(ex, container, onComplete, seed, report) {
    const wrap = this._el('div', 'exercise exercise-matching');
    wrap.appendChild(this._el('p', 'exercise-question', ex.question));
    wrap.appendChild(this._el('p', 'exercise-hint', 'Tippe links einen Begriff an und dann rechts das Passende.'));
    const area = this._el('div', 'matching-area');
    const left = this._el('div', 'matching-col');
    const right = this._el('div', 'matching-col');
    const fb = this._el('div', 'exercise-feedback');
    fb.hidden = true;
    let selected = null;
    let matched = 0;
    let mistakes = 0;

    ex.pairs.forEach((pair, i) => {
      const btn = this._el('button', 'match-item', pair.left);
      btn.type = 'button';
      btn.dataset.index = i;
      btn.addEventListener('click', () => {
        if (btn.classList.contains('matched')) return;
        left.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = i;
      });
      left.appendChild(btn);
    });

    this._permutation(ex.pairs.length, seed + '-r').forEach(i => {
      const btn = this._el('button', 'match-item', ex.pairs[i].right);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        if (btn.classList.contains('matched')) return;
        if (selected === null) {
          this._feedback(fb, false, 'Tippe zuerst links einen Begriff an.');
          return;
        }
        const leftBtn = left.querySelector('[data-index="' + selected + '"]');
        if (selected === i) {
          const color = 'pair-' + (matched % 6);
          [leftBtn, btn].forEach(b => { b.classList.remove('selected'); b.classList.add('matched', color); b.disabled = true; });
          matched++;
          selected = null;
          fb.hidden = true;
          if (matched === ex.pairs.length) {
            this._feedback(fb, true, '<strong>Alles richtig zugeordnet.</strong> ' + ex.explanation);
            report(mistakes === 0);
            onComplete();
          }
        } else {
          mistakes++;
          this._feedback(fb, false, 'Das gehört nicht zusammen. Versuch es noch einmal.');
        }
      });
      right.appendChild(btn);
    });

    area.appendChild(left);
    area.appendChild(right);
    wrap.appendChild(area);
    wrap.appendChild(fb);
    container.appendChild(wrap);
  },

  // Reihenfolge: Schritte in der richtigen Reihenfolge antippen.
  _renderOrdering(ex, container, onComplete, seed, report) {
    const wrap = this._el('div', 'exercise exercise-ordering');
    wrap.appendChild(this._el('p', 'exercise-question', ex.question));
    wrap.appendChild(this._el('p', 'exercise-hint', 'Tippe die Schritte in der richtigen Reihenfolge an.'));
    const answer = this._el('ol', 'ordering-answer');
    const pool = this._el('div', 'ordering-pool');
    const fb = this._el('div', 'exercise-feedback');
    fb.hidden = true;
    const resetBtn = this._el('button', 'btn btn-secondary', 'Von vorn');
    resetBtn.type = 'button';
    let chosen = [];
    let first = true;

    const order = this._permutation(ex.items.length, seed);
    const buttons = order.map(i => {
      const btn = this._el('button', 'order-item', ex.items[i]);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        btn.disabled = true;
        chosen.push(i);
        answer.appendChild(this._el('li', '', ex.items[i]));
        if (chosen.length === ex.items.length) check();
      });
      pool.appendChild(btn);
      return btn;
    });

    const check = () => {
      const ok = chosen.every((v, pos) => v === pos);
      if (first) report(ok);
      first = false;
      if (ok) {
        this._feedback(fb, true, '<strong>Richtige Reihenfolge.</strong> ' + ex.explanation);
        resetBtn.hidden = true;
        onComplete();
      } else {
        const wrongAt = chosen.findIndex((v, pos) => v !== pos) + 1;
        this._feedback(fb, false, 'Noch nicht ganz: Ab Schritt ' + wrongAt + ' stimmt die Reihenfolge nicht. Tippe auf &bdquo;Von vorn&ldquo;.');
      }
    };

    resetBtn.addEventListener('click', () => {
      chosen = [];
      answer.innerHTML = '';
      buttons.forEach(b => { b.disabled = false; });
      fb.hidden = true;
    });

    wrap.appendChild(pool);
    wrap.appendChild(answer);
    wrap.appendChild(resetBtn);
    wrap.appendChild(fb);
    container.appendChild(wrap);
  }
};

if (typeof module !== 'undefined') module.exports = Exercises;
