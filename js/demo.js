/**
 * DemoPlayer - spielt einen nachgebauten Agenten-Lauf Schritt fuer Schritt ab.
 * Kein Autoplay: Wer liest, bestimmt das Tempo mit "Weiter".
 * Jeder Schritt kann eine Erklaer-Einblendung (note) haben.
 */
const DemoPlayer = {
  KINDS: {
    user: 'Du',
    agent: 'Agent',
    tool: 'Werkzeug',
    hook: 'Hook',
    result: 'Ergebnis'
  },

  // Welche Schritte sind bei Position index sichtbar? (mindestens einer, hoechstens alle)
  visibleSteps(demo, index) {
    const n = Math.max(0, Math.min(index, demo.steps.length - 1));
    return demo.steps.slice(0, n + 1);
  },

  create(demo, container) {
    let index = 0;
    const box = document.createElement('figure');
    box.className = 'demo';
    box.innerHTML = '<figcaption class="demo-title"><strong>' + demo.title + '</strong>'
      + '<span class="demo-sub">Nachgestellter Ablauf, vereinfacht dargestellt</span></figcaption>'
      + '<p class="demo-intro">' + demo.intro + '</p>';
    const log = document.createElement('ol');
    log.className = 'demo-log';
    log.setAttribute('aria-live', 'polite');
    const controls = document.createElement('div');
    controls.className = 'demo-controls';

    const mkBtn = (label, cls, fn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = cls;
      b.textContent = label;
      b.addEventListener('click', fn);
      controls.appendChild(b);
      return b;
    };

    const draw = () => {
      const steps = this.visibleSteps(demo, index);
      log.innerHTML = '';
      steps.forEach((s, i) => {
        const li = document.createElement('li');
        li.className = 'demo-step demo-' + s.kind + (i === steps.length - 1 ? ' current' : '');
        li.innerHTML = '<span class="demo-kind">' + (this.KINDS[s.kind] || s.kind) + '</span>'
          + '<div class="demo-text">' + s.text + '</div>'
          + (s.note && i === steps.length - 1 ? '<p class="demo-note"><strong>Was passiert hier?</strong> ' + s.note + '</p>' : '');
        log.appendChild(li);
      });
      const done = steps.length === demo.steps.length;
      next.hidden = done;
      all.hidden = done;
      again.hidden = !done;
      counter.textContent = 'Schritt ' + steps.length + ' von ' + demo.steps.length;
    };

    const next = mkBtn('Nächster Schritt', 'btn btn-primary', () => { index++; draw(); });
    const all = mkBtn('Alles zeigen', 'btn btn-secondary', () => { index = demo.steps.length; draw(); });
    const again = mkBtn('Noch einmal von vorn', 'btn btn-secondary', () => { index = 0; draw(); });
    const counter = document.createElement('span');
    counter.className = 'demo-counter';
    controls.appendChild(counter);

    box.appendChild(log);
    box.appendChild(controls);
    container.appendChild(box);
    draw();
    return {
      next() { index++; draw(); return index < demo.steps.length; },
      reset() { index = 0; draw(); },
      get index() { return index; }
    };
  }
};

if (typeof module !== 'undefined') module.exports = DemoPlayer;
