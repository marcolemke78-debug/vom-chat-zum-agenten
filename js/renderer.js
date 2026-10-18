/**
 * Renderer - baut die Seiten aus den Kursdaten.
 * Seiten: Start, Lektion, Glossar, Wiederholen, Modultest.
 */
const Renderer = {
  STAGES: {
    A: { name: 'Stufe A', label: 'Mit jedem KI-Chat', text: 'fobizz, ChatGPT oder Claude, kostenlos' },
    B: { name: 'Stufe B', label: 'Claude im Browser', text: 'Projekte, Artifacts, eigene Skills, kostenlos' },
    C: { name: 'Stufe C', label: 'Echte Agenten', text: 'Claude Code und Co., mit Pro-Abo' }
  },
  TOOL_NAMES: { claude: 'Claude', fobizz: 'fobizz', chatgpt: 'ChatGPT' },
  PHASES: [
    { key: 'moment', label: 'Das will ich auch' },
    { key: 'concept', label: 'Dahinter steckt' },
    { key: 'practice', label: 'Selbst ausprobieren' },
    { key: 'quiz', label: 'Kurz-Check' }
  ],
  CONFIDENCE: [
    { value: 'low', label: 'Noch unsicher' },
    { value: 'medium', label: 'Geht so' },
    { value: 'high', label: 'Sitzt' }
  ],
  COURSE_STAND: '2026-10-18',

  // ---------- Hilfsfunktionen ----------

  el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  },

  button(label, className, onClick) {
    const b = this.el('button', className || 'btn', label);
    b.type = 'button';
    if (onClick) b.addEventListener('click', onClick);
    return b;
  },

  link(label, href, className) {
    const a = this.el('a', className || 'btn', label);
    a.href = href;
    return a;
  },

  // 2026-10-18 -> 18.10.2026
  date(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return d + '.' + m + '.' + y;
  },

  esc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  findLesson(course, id) {
    for (const mod of course.modules) {
      const idx = mod.lessons.findIndex(l => l.id === id);
      if (idx >= 0) return { mod, lesson: mod.lessons[idx], index: idx };
    }
    return null;
  },

  term(course, id) {
    return course.glossary.find(g => g.id === id);
  },

  // Text in die Zwischenablage. Wenn das nicht geht (file://, alter Browser,
  // Berechtigung verweigert), markieren wir den Text, damit man ihn selbst
  // mit Strg/Cmd+C kopieren kann - statt still zu scheitern.
  async copyText(text, buttonEl) {
    const original = buttonEl.dataset.label || buttonEl.textContent;
    buttonEl.dataset.label = original;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('kein Clipboard');
      await navigator.clipboard.writeText(text);
      buttonEl.textContent = 'Kopiert';
      setTimeout(() => { buttonEl.textContent = original; }, 2000);
      return true;
    } catch (e) {
      const pre = buttonEl.closest('.prompt-box') && buttonEl.closest('.prompt-box').querySelector('pre');
      if (pre) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      buttonEl.textContent = 'Markiert – mit Strg/Cmd+C kopieren';
      return false;
    }
  },

  // ---------- Rahmen ----------

  render(course, route) {
    this.renderSidebar(course, route);
    this.renderNotice();
    this.renderFooter();
    const page = document.getElementById('page');
    page.innerHTML = '';
    if (route.page === 'lesson') this.renderLesson(course, route.id, page);
    else if (route.page === 'glossary') this.renderGlossary(course, page);
    else if (route.page === 'review') this.renderReview(course, page);
    else if (route.page === 'test') this.renderTest(course, route.id, page);
    else this.renderStart(course, page);
    document.title = (page.querySelector('h1') ? page.querySelector('h1').textContent + ' – ' : '') + 'Vom Chat zum Agenten';
  },

  // Hinweis, wenn der Browser nichts speichern darf (z. B. privates Fenster).
  renderNotice() {
    const box = document.getElementById('notice');
    box.innerHTML = '';
    if (!Storage.available()) {
      box.appendChild(this.el('p', 'notice',
        'Dein Browser erlaubt gerade kein Speichern (z. B. im privaten Fenster). Du kannst alles nutzen, aber dein Fortschritt geht beim Schließen verloren.'));
    }
  },

  renderFooter() {
    document.getElementById('footer').innerHTML =
      'Vom Chat zum Agenten · Marco Lemke · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de" rel="license">CC BY-NC-SA 4.0</a> · Stand ' + this.date(this.COURSE_STAND);
  },

  renderSidebar(course, route) {
    const nav = document.getElementById('sidebar');
    nav.innerHTML = '';
    nav.appendChild(this.link('Start', '#/start', 'nav-link' + (route.page === 'start' ? ' active' : '')));

    course.modules.forEach(mod => {
      const group = this.el('section', 'nav-module stage-' + mod.stage.toLowerCase() + (mod.planned ? ' planned' : ''));
      const head = this.el('h2', 'nav-module-title', 'Modul ' + mod.id + ': ' + this.esc(mod.title));
      group.appendChild(head);
      if (mod.planned) {
        group.appendChild(this.el('p', 'nav-planned', 'folgt nach der Pilotphase'));
      } else {
        const list = this.el('ol', 'nav-lessons');
        mod.lessons.forEach(l => {
          const status = Progress.getStatus(l.id);
          const li = this.el('li', 'status-' + status);
          const a = this.link(this.esc(l.title), '#/lektion/' + l.id, 'nav-link' + (route.page === 'lesson' && route.id === l.id ? ' active' : ''));
          if (status === 'completed') a.setAttribute('aria-label', l.title + ' (erledigt)');
          li.appendChild(a);
          list.appendChild(li);
        });
        group.appendChild(list);
        if (mod.test) {
          const res = Progress.getTestResult(mod.test.id);
          const label = 'Modultest' + (res ? ' (' + res.best + ' %)' : '');
          group.appendChild(this.link(label, '#/test/' + mod.test.id, 'nav-link nav-test' + (route.page === 'test' && route.id === mod.test.id ? ' active' : '')));
        }
      }
      nav.appendChild(group);
    });

    const tools = this.el('section', 'nav-tools');
    const due = Progress.getDueCards().length;
    tools.appendChild(this.link('Wiederholen' + (due ? ' <span class="badge">' + due + '</span>' : ''), '#/wiederholen', 'nav-link' + (route.page === 'review' ? ' active' : '')));
    tools.appendChild(this.link('Glossar', '#/glossar', 'nav-link' + (route.page === 'glossary' ? ' active' : '')));
    nav.appendChild(tools);
  },

  // ---------- Startseite ----------

  renderStart(course, page) {
    const hero = this.el('section', 'hero');
    hero.appendChild(this.el('h1', 'hero-title', 'Vom Chat zum Agenten'));
    hero.appendChild(this.el('p', 'lead',
      'Du nutzt schon einen KI-Chat? Dann bist du auf der ersten Stufe. Dieser Kurs zeigt dir in kurzen Häppchen, was danach kommt: bis zu KI-Agenten, die für dich Aufgaben am Rechner erledigen.'));
    page.appendChild(hero);

    // Die Stufenleiter: das Bild, das den ganzen Kurs zusammenhaelt.
    const stairs = this.el('ol', 'stairs');
    stairs.setAttribute('aria-label', 'Die drei Stufen des Kurses');
    ['A', 'B', 'C'].forEach(key => {
      const s = this.STAGES[key];
      const mods = course.modules.filter(m => m.stage === key);
      const li = this.el('li', 'stair stair-' + key.toLowerCase());
      li.innerHTML = '<span class="stair-name">' + s.name + '</span>'
        + '<strong class="stair-label">' + s.label + '</strong>'
        + '<span class="stair-text">' + s.text + '</span>'
        + mods.map(m => '<span class="stair-module">Modul ' + m.id + (m.planned ? ' (folgt)' : '') + '</span>').join('');
      stairs.appendChild(li);
    });
    page.appendChild(stairs);

    // Weitermachen bzw. loslegen
    const actions = this.el('div', 'start-actions');
    const last = Progress.getLastRoute();
    const firstLesson = course.modules[0].lessons[0];
    const started = course.modules.some(m => m.lessons.some(l => Progress.getStatus(l.id) !== 'not_started'));
    if (started && last !== '#/start') {
      actions.appendChild(this.link('Weitermachen', last, 'btn btn-primary'));
    } else {
      actions.appendChild(this.link('Mit Lektion 1 loslegen', '#/lektion/' + firstLesson.id, 'btn btn-primary'));
    }
    page.appendChild(actions);

    // Begruessung: faellige Karteikarten (nur hier, kein Dauer-Banner)
    const due = Progress.getDueCards().length;
    if (due) {
      const box = this.el('aside', 'due-box');
      box.innerHTML = '<p><strong>Heute ' + (due === 1 ? 'ist 1 Karteikarte' : 'sind ' + due + ' Karteikarten') + ' zum Wiederholen fällig.</strong> Das dauert etwa ' + Math.max(1, Math.round(due / 3)) + ' Minuten.</p>';
      box.appendChild(this.link('Jetzt wiederholen', '#/wiederholen', 'btn btn-secondary'));
      page.appendChild(box);
    }

    // Fortschritt je Modul
    const overview = this.el('section', 'module-overview');
    overview.appendChild(this.el('h2', '', 'Dein Stand'));
    course.modules.filter(m => !m.planned).forEach(m => {
      const pct = Progress.getModulePercent(m.lessons.map(l => l.id));
      const row = this.el('div', 'module-row');
      row.innerHTML = '<span>Modul ' + m.id + ': ' + this.esc(m.title) + '</span>'
        + '<span class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></span>'
        + '<span class="meter-value">' + pct + ' %</span>';
      overview.appendChild(row);
    });
    page.appendChild(overview);

    const how = this.el('section', 'how');
    how.innerHTML = '<h2>So funktioniert der Kurs</h2>'
      + '<p>Jede Lektion dauert 10 bis 15 Minuten und hat vier Teile: ein Beispiel aus dem Schulalltag, die Idee dahinter, einen Auftrag zum Selbst-Ausprobieren und einen kurzen Check. Die neuen Begriffe landen in deinem Karteikasten und kommen zum Wiederholen zurück, bevor du sie vergisst.</p>'
      + '<p>Du brauchst kein Abo und keine Installation. Ein Browser und ein kostenloser Zugang zu einem KI-Chat reichen. Dein Fortschritt bleibt nur in diesem Browser gespeichert, niemand sonst sieht ihn.</p>';
    page.appendChild(how);
  },

  // ---------- Lektion ----------

  renderLesson(course, id, page) {
    const found = this.findLesson(course, id);
    const { mod, lesson, index } = found;
    Progress.startLesson(id);

    const header = this.el('header', 'lesson-header stage-' + mod.stage.toLowerCase());
    header.innerHTML = '<p class="lesson-kicker">Modul ' + mod.id + ', Lektion ' + (index + 1) + ' von ' + mod.lessons.length + '</p>'
      + '<h1>' + this.esc(lesson.title) + '</h1>'
      + '<p class="lesson-meta">ca. ' + lesson.minutes + ' Minuten, Stand ' + this.date(lesson.stand) + '</p>';
    page.appendChild(header);

    const tabs = this.el('div', 'phase-tabs');
    tabs.setAttribute('role', 'tablist');
    const panels = {};
    const tabButtons = {};

    const activate = (key) => {
      Object.keys(panels).forEach(k => {
        const on = k === key;
        panels[k].hidden = !on;
        tabButtons[k].classList.toggle('active', on);
        tabButtons[k].setAttribute('aria-selected', String(on));
      });
      tabs.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };

    this.PHASES.forEach((phase, i) => {
      const b = this.button('<span class="phase-num">' + (i + 1) + '</span> ' + phase.label, 'phase-tab', () => activate(phase.key));
      b.setAttribute('role', 'tab');
      tabButtons[phase.key] = b;
      tabs.appendChild(b);
      const panel = this.el('section', 'phase phase-' + phase.key);
      panel.setAttribute('role', 'tabpanel');
      panels[phase.key] = panel;
    });
    page.appendChild(tabs);

    this.renderMoment(course, lesson, panels.moment);
    this.renderConcept(lesson, panels.concept);
    this.renderPractice(lesson, panels.practice);
    this.renderQuiz(course, mod, lesson, index, panels.quiz);

    // "Weiter"-Knopf am Ende jeder Phase (ausser der letzten)
    this.PHASES.slice(0, -1).forEach((phase, i) => {
      const next = this.PHASES[i + 1];
      const nav = this.el('div', 'phase-next');
      nav.appendChild(this.button('Weiter: ' + next.label, 'btn btn-primary', () => activate(next.key)));
      panels[phase.key].appendChild(nav);
    });

    Object.values(panels).forEach(p => page.appendChild(p));
    Object.keys(panels).forEach(k => { panels[k].hidden = k !== 'moment'; });
    tabButtons.moment.classList.add('active');
    tabButtons.moment.setAttribute('aria-selected', 'true');
  },

  renderMoment(course, lesson, panel) {
    panel.appendChild(this.el('div', 'prose', lesson.moment.html));
    if (lesson.demo && typeof DemoPlayer !== 'undefined') {
      const demo = course.demos.find(d => d.id === lesson.demo);
      if (demo) {
        const box = this.el('div', 'demo-wrap');
        panel.appendChild(box);
        DemoPlayer.create(demo, box);
      }
    }
  },

  renderConcept(lesson, panel) {
    panel.appendChild(this.el('div', 'prose', lesson.concept.html));
    const a = lesson.concept.analogy;
    const aside = this.el('aside', 'analogy');
    aside.innerHTML = '<h3>' + this.esc(a.title) + '</h3>' + a.html;
    panel.appendChild(aside);
  },

  renderPractice(lesson, panel) {
    const p = lesson.practice;
    panel.appendChild(this.el('div', 'prose', p.html));

    if (p.tools) {
      const box = this.el('div', 'tool-switch');
      const label = this.el('p', 'tool-switch-label', 'Womit arbeitest du?');
      const group = this.el('div', 'segmented');
      group.setAttribute('role', 'radiogroup');
      group.setAttribute('aria-label', 'Werkzeug wählen');
      const content = this.el('div', 'tool-content prose');
      const show = (tool) => {
        content.innerHTML = p.tools[tool] || p.tools.claude;
        group.querySelectorAll('button').forEach(b => {
          const on = b.dataset.tool === tool;
          b.classList.toggle('active', on);
          b.setAttribute('aria-checked', String(on));
        });
      };
      ['claude', 'fobizz', 'chatgpt'].filter(t => p.tools[t]).forEach(tool => {
        const b = this.button(this.TOOL_NAMES[tool], 'segment', () => { Progress.setTool(tool); show(tool); });
        b.dataset.tool = tool;
        b.setAttribute('role', 'radio');
        group.appendChild(b);
      });
      box.appendChild(label);
      box.appendChild(group);
      box.appendChild(content);
      panel.appendChild(box);
      show(p.tools[Progress.getTool()] ? Progress.getTool() : 'claude');
    }

    (p.prompts || []).forEach(pr => {
      const fig = this.el('figure', 'prompt-box');
      fig.appendChild(this.el('figcaption', '', this.esc(pr.label)));
      fig.appendChild(this.el('pre', '', this.esc(pr.text)));
      const btn = this.button('Text kopieren', 'btn btn-secondary btn-copy');
      btn.addEventListener('click', () => this.copyText(pr.text, btn));
      fig.appendChild(btn);
      panel.appendChild(fig);
    });

    const check = this.el('fieldset', 'checklist');
    check.appendChild(this.el('legend', '', 'Hast du es geschafft? Hake ab:'));
    const state = Progress.getChecklist(lesson.id);
    p.checklist.forEach((item, i) => {
      const label = this.el('label', 'check-item');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = !!state[i];
      box.addEventListener('change', () => Progress.setChecklistItem(lesson.id, i, box.checked));
      label.appendChild(box);
      label.appendChild(this.el('span', '', item));
      check.appendChild(label);
    });
    panel.appendChild(check);

    const stuck = this.el('details', 'stuck');
    stuck.appendChild(this.el('summary', '', 'Hängt? Dann prüf das'));
    const dl = this.el('dl');
    p.stuck.forEach(s => {
      dl.appendChild(this.el('dt', '', s.problem));
      dl.appendChild(this.el('dd', '', s.fix));
    });
    stuck.appendChild(dl);
    panel.appendChild(stuck);
  },

  renderQuiz(course, mod, lesson, index, panel) {
    panel.appendChild(this.el('p', 'prose', 'Ein paar kurze Fragen. Falsche Antworten sind kein Problem: Du bekommst eine Erklärung und versuchst es noch einmal.'));
    const area = this.el('div', 'quiz-area');
    panel.appendChild(area);
    let current = 0;

    const showNext = () => {
      if (current >= lesson.quiz.length) {
        this.renderSelfCheck(course, mod, lesson, index, panel);
        return;
      }
      const ex = lesson.quiz[current];
      const box = this.el('div', 'quiz-item');
      box.appendChild(this.el('p', 'quiz-count', 'Frage ' + (current + 1) + ' von ' + lesson.quiz.length));
      area.appendChild(box);
      const seed = lesson.id + '-' + current;
      current++;
      Exercises.render(ex, box, () => {
        const isLast = current >= lesson.quiz.length;
        const next = this.button(isLast ? 'Abschließen' : 'Nächste Frage', 'btn btn-primary quiz-next', () => {
          next.remove();
          showNext();
        });
        box.appendChild(next);
      }, seed);
    };
    showNext();
  },

  // Selbsteinschaetzung: steuert, wann die Begriffe wiederkommen.
  renderSelfCheck(course, mod, lesson, index, panel) {
    const box = this.el('section', 'self-check');
    box.innerHTML = '<h3>Wie sicher fühlst du dich jetzt?</h3><p>Deine Einschätzung bestimmt, wann die Begriffe dieser Lektion zum Wiederholen zurückkommen: Was noch wackelt, kommt schon morgen wieder.</p>';
    const row = this.el('div', 'confidence-row');
    this.CONFIDENCE.forEach(c => {
      row.appendChild(this.button(c.label, 'btn btn-secondary', () => {
        Progress.completeLesson(lesson.id, lesson.terms, c.value);
        this.renderSidebar(course, { page: 'lesson', id: lesson.id });
        row.remove();
        const names = lesson.terms.map(t => (this.term(course, t) || { term: t }).term).join(', ');
        const done = this.el('div', 'lesson-done');
        done.innerHTML = '<p><strong>Lektion geschafft.</strong> In deinem Karteikasten liegen jetzt: ' + this.esc(names) + '.</p>';
        const next = mod.lessons[index + 1];
        if (next) done.appendChild(this.link('Weiter mit: ' + this.esc(next.title), '#/lektion/' + next.id, 'btn btn-primary'));
        else if (mod.test) done.appendChild(this.link('Zum Modultest', '#/test/' + mod.test.id, 'btn btn-primary'));
        box.appendChild(done);
      }));
    });
    box.appendChild(row);
    panel.appendChild(box);
  },

  // ---------- Glossar ----------

  renderGlossary(course, page) {
    page.appendChild(this.el('h1', '', 'Glossar'));
    page.appendChild(this.el('p', 'lead', 'Alle Begriffe des Kurses, jeweils mit einem Bild aus dem Alltag. Nachschlagen ist ausdrücklich erlaubt, auch bei Begriffen aus späteren Modulen.'));

    const controls = this.el('div', 'glossary-controls');
    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'glossary-search';
    search.placeholder = 'Begriff suchen';
    search.setAttribute('aria-label', 'Begriff suchen');
    controls.appendChild(search);

    const filter = this.el('div', 'segmented');
    filter.setAttribute('aria-label', 'Nach Stufe filtern');
    let stage = 'all';
    [['all', 'Alle'], ['A', 'Stufe A'], ['B', 'Stufe B'], ['C', 'Stufe C']].forEach(([key, label]) => {
      const b = this.button(label, 'segment' + (key === 'all' ? ' active' : ''), () => {
        stage = key;
        filter.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
        update();
      });
      filter.appendChild(b);
    });
    controls.appendChild(filter);
    page.appendChild(controls);

    const list = this.el('dl', 'glossary-list');
    const empty = this.el('p', 'glossary-empty', 'Kein Begriff gefunden. Versuch es mit einem kürzeren Suchwort.');
    page.appendChild(list);
    page.appendChild(empty);

    const sorted = course.glossary.slice().sort((a, b) => a.term.localeCompare(b.term, 'de'));
    const update = () => {
      const q = search.value.trim().toLowerCase();
      list.innerHTML = '';
      let shown = 0;
      sorted.forEach(g => {
        if (stage !== 'all' && g.stage !== stage) return;
        if (q && !(g.term + ' ' + g.short).toLowerCase().includes(q)) return;
        shown++;
        const item = this.el('div', 'glossary-item stage-' + g.stage.toLowerCase());
        item.id = 'begriff-' + g.id;
        item.innerHTML = '<dt>' + this.esc(g.term) + ' <span class="stage-tag">Stufe ' + g.stage + '</span></dt>'
          + '<dd>' + this.esc(g.short) + '</dd>'
          + '<dd class="glossary-analogy">' + this.esc(g.analogy) + '</dd>';
        list.appendChild(item);
      });
      empty.hidden = shown > 0;
    };
    search.addEventListener('input', update);
    update();
  },

  // ---------- Wiederholen (Karteikasten) ----------

  renderReview(course, page) {
    page.appendChild(this.el('h1', '', 'Wiederholen'));
    const area = this.el('div', 'review-area');
    page.appendChild(area);
    const due = Progress.getDueCards().filter(id => this.term(course, id));
    const total = due.length;

    const showEmpty = () => {
      area.innerHTML = '';
      const next = Progress.getNextDueDate();
      const box = this.el('div', 'review-empty');
      if (next) {
        box.innerHTML = '<p><strong>Heute ist nichts mehr fällig.</strong> Die nächste Wiederholung steht am ' + this.date(next) + ' an.</p>';
        box.appendChild(this.link('Zurück zum Kurs', Progress.getLastRoute(), 'btn btn-primary'));
      } else {
        box.innerHTML = '<p><strong>Dein Karteikasten ist noch leer.</strong> Nach jeder Lektion landen die neuen Begriffe hier und kommen zurück, bevor du sie vergisst.</p>';
        box.appendChild(this.link('Mit Lektion 1 loslegen', '#/lektion/' + course.modules[0].lessons[0].id, 'btn btn-primary'));
      }
      area.appendChild(box);
    };

    const showCard = (i) => {
      if (i >= due.length) {
        this.renderSidebar(course, { page: 'review' });
        showEmpty();
        return;
      }
      const g = this.term(course, due[i]);
      area.innerHTML = '';
      area.appendChild(this.el('p', 'quiz-count', 'Karte ' + (i + 1) + ' von ' + total));
      const card = this.el('article', 'flashcard stage-' + g.stage.toLowerCase());
      card.appendChild(this.el('h2', 'flashcard-term', this.esc(g.term)));
      card.appendChild(this.el('p', 'flashcard-ask', 'Erklär dir den Begriff kurz selbst, bevor du aufdeckst.'));
      const reveal = this.button('Aufdecken', 'btn btn-primary', () => {
        reveal.remove();
        card.querySelector('.flashcard-ask').remove();
        card.appendChild(this.el('p', '', this.esc(g.short)));
        card.appendChild(this.el('p', 'glossary-analogy', this.esc(g.analogy)));
        const row = this.el('div', 'confidence-row');
        row.appendChild(this.el('p', 'confidence-label', 'Wie gut wusstest du es?'));
        this.CONFIDENCE.forEach(c => {
          row.appendChild(this.button(c.label, 'btn btn-secondary', () => {
            Progress.rateCard(g.id, c.value);
            showCard(i + 1);
          }));
        });
        card.appendChild(row);
      });
      card.appendChild(reveal);
      area.appendChild(card);
    };

    if (total) showCard(0);
    else showEmpty();
  },

  renderTest(course, id, page) {
    page.appendChild(this.el('h1', '', 'Modultest'));
  }
};

if (typeof module !== 'undefined') module.exports = Renderer;
