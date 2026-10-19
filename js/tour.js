/**
 * Tour - kurzer Rundgang durch den Kurs.
 *
 * Erscheint beim ersten Besuch auf der Startseite und laesst sich jederzeit
 * ueber #/tour neu starten. Jeder Schritt hebt ein echtes Element der Seite
 * hervor (ein Rahmen mit abgedunkeltem Rest), daneben steht eine Karte mit
 * Text und den Knoepfen Zurueck, Weiter und Ueberspringen.
 */
const Tour = {
  // Die Schritte. narrow = schmaler Bildschirm, dort steckt das Menue hinter
  // dem Menue-Knopf und wird nicht direkt gezeigt.
  steps(narrow) {
    const menu = narrow ? '#menu-toggle' : null;
    return [
      {
        target: '.stairs',
        title: 'Drei Stufen vom Chat zum Agenten',
        text: '<p>Der Kurs führt dich in drei Stufen von der ersten KI-Frage bis zum Agenten, der für dich am Rechner arbeitet. Wenn du schon einen KI-Chat nutzt, stehst du auf Stufe A. Modul 1 holt dich genau dort ab.</p>'
      },
      {
        target: '.start-actions',
        title: 'Jede Lektion hat vier Schritte',
        text: '<p>Eine Lektion dauert 10 bis 15 Minuten. Oben in der Lektion führen dich vier Reiter durch:</p>'
          + '<ol class="tour-phases"><li>Das will ich auch</li><li>Dahinter steckt</li><li>Selbst ausprobieren</li><li>Kurz-Check</li></ol>'
          + '<p>Du kannst jederzeit aufhören. Die App merkt sich, wo du warst.</p>'
      },
      {
        target: menu || '.nav-module',
        title: 'Das Kursmenü',
        text: (narrow ? '<p>Über diesen Knopf öffnest du das Kursmenü.</p>' : '')
          + '<p>Im Menü stehen alle Lektionen und am Ende jedes Moduls ein kurzer Modultest. Ein Haken zeigt, was du schon erledigt hast.</p>'
      },
      {
        target: menu || '.nav-tools',
        title: 'Wiederholen und Glossar',
        text: '<p>' + (narrow ? 'Ebenfalls im Menü: ' : '')
          + 'Unter <strong>Wiederholen</strong> kommen die wichtigsten Begriffe als Karteikarten zurück, kurz bevor du sie vergisst. Im <strong>Glossar</strong> schlägst du jeden Begriff nach.</p>'
      },
      {
        target: '.module-overview',
        title: 'Dein Fortschritt bleibt auf diesem Gerät',
        text: '<p>Der Kurs speichert deinen Stand nur in diesem Browser auf diesem Gerät, ohne Konto und ohne Anmeldung. Fängst du am Schul-iPad an und machst zu Hause am Laptop weiter, beginnst du dort von vorn.</p>'
          + '<p><strong>Tipp:</strong> Bleib möglichst bei einem Gerät und einem Browser. Im privaten Fenster wird nichts gespeichert.</p>'
      }
    ];
  },

  // Tour starten. onDone() wird beim Beenden oder Ueberspringen aufgerufen.
  start(onDone) {
    this.stop();
    const narrow = window.matchMedia('(max-width: 900px)').matches;
    this._steps = this.steps(narrow);
    this._index = 0;
    this._onDone = onDone;
    this._lastFocus = document.activeElement;

    // Sperrschicht: verhindert Klicks auf die Seite waehrend der Tour
    this._blocker = document.createElement('div');
    this._blocker.className = 'tour-blocker';
    this._frame = document.createElement('div');
    this._frame.className = 'tour-frame';
    this._card = document.createElement('div');
    this._card.className = 'tour-card';
    this._card.setAttribute('role', 'dialog');
    this._card.setAttribute('aria-modal', 'true');
    this._card.setAttribute('aria-labelledby', 'tour-title');
    document.body.append(this._blocker, this._frame, this._card);

    this._onKey = (e) => {
      if (e.key === 'Escape') this.finish();
      if (e.key === 'Tab') this._trapFocus(e);
    };
    this._onMove = () => this._place();
    document.addEventListener('keydown', this._onKey);
    window.addEventListener('resize', this._onMove);
    window.addEventListener('scroll', this._onMove, { passive: true });
    this._show();
  },

  _show() {
    const step = this._steps[this._index];
    const last = this._index === this._steps.length - 1;
    this._card.innerHTML =
      '<p class="tour-count">Schritt ' + (this._index + 1) + ' von ' + this._steps.length + '</p>'
      + '<h2 id="tour-title" class="tour-title">' + step.title + '</h2>'
      + step.text
      + '<div class="tour-buttons">'
      + (this._index > 0 ? '<button type="button" class="btn" data-tour="back">Zurück</button>' : '')
      + '<button type="button" class="btn btn-primary" data-tour="next">' + (last ? 'Los geht&rsquo;s' : 'Weiter') + '</button>'
      + (last ? '' : '<button type="button" class="tour-skip" data-tour="skip">Überspringen</button>')
      + '</div>';
    this._card.querySelectorAll('[data-tour]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.tour;
        if (action === 'back') { this._index--; this._show(); }
        else if (action === 'next' && !last) { this._index++; this._show(); }
        else this.finish();
      });
    });

    // Ziel nach oben holen (unter die Kopfleiste), damit darunter Platz fuer die Karte ist
    const target = document.querySelector(step.target);
    if (target) {
      const bar = document.querySelector('.topbar');
      const offset = (bar && bar.offsetHeight ? bar.offsetHeight : 0) + 16;
      window.scrollBy(0, target.getBoundingClientRect().top - offset);
    }
    this._place();
    this._card.querySelector('[data-tour="next"]').focus();
  },

  // Rahmen um das Ziel legen. Die Karte steht unter oder ueber dem Ziel, wo sie
  // hinpasst. Ist das Ziel zu gross dafuer, steht sie unten am Rand.
  _place() {
    if (!this._card) return;
    const target = document.querySelector(this._steps[this._index].target);
    if (!target) { this._frame.hidden = true; return; }
    const r = target.getBoundingClientRect();
    const pad = 6;
    this._frame.hidden = false;
    Object.assign(this._frame.style, {
      top: (r.top - pad) + 'px', left: (r.left - pad) + 'px',
      width: (r.width + 2 * pad) + 'px', height: (r.height + 2 * pad) + 'px'
    });
    const gap = 12;
    const h = this._card.offsetHeight;
    let top = window.innerHeight - h - 16;
    if (window.innerHeight - r.bottom - pad >= h + 2 * gap) top = r.bottom + pad + gap;
    else if (r.top - pad >= h + 2 * gap) top = r.top - pad - gap - h;
    this._card.style.top = Math.max(8, top) + 'px';
  },

  // Fokus bleibt in der Karte, solange die Tour laeuft
  _trapFocus(e) {
    const items = this._card.querySelectorAll('button');
    const first = items[0];
    const lastItem = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastItem.focus(); }
    else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); first.focus(); }
  },

  finish() {
    const done = this._onDone;
    this.stop();
    if (done) done();
  },

  stop() {
    if (!this._card) return;
    document.removeEventListener('keydown', this._onKey);
    window.removeEventListener('resize', this._onMove);
    window.removeEventListener('scroll', this._onMove);
    this._blocker.remove();
    this._frame.remove();
    this._card.remove();
    this._card = null;
    window.scrollTo(0, 0);
    if (this._lastFocus && this._lastFocus.focus) this._lastFocus.focus();
  }
};

if (typeof module !== 'undefined') module.exports = Tour;
