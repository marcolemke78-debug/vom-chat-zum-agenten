/**
 * Progress - alles, was sich die App ueber den Lernstand merkt.
 *
 * Gespeichert wird unter einem eigenen Schluessel ('vcza_v1'), weil alle
 * Lern-Apps auf GitHub Pages dieselbe Domain teilen und sich sonst
 * gegenseitig ueberschreiben wuerden.
 *
 * Datenform:
 *   lessons    { [lessonId]: 'in_progress' | 'completed' }
 *   checklists { [lessonId]: boolean[] }
 *   tool       'claude' | 'fobizz' | 'chatgpt'
 *   cards      { [termId]: { box, dueDate, lastReviewed } }   (Karteikasten)
 *   tests      { [testId]: { best, passed } }
 *   lastRoute  zuletzt besuchte Seite, z. B. '#/lektion/m1l2'
 *   tourSeen   Einfuehrung schon gesehen oder uebersprungen
 */
const Progress = {
  KEY: 'vcza_v1',
  VERSION: 1,
  TOOLS: ['claude', 'fobizz', 'chatgpt'],
  PASS_PERCENT: 75,

  _default() {
    return { version: this.VERSION, lessons: {}, checklists: {}, tool: 'claude', cards: {}, tests: {}, lastRoute: '#/start', tourSeen: false };
  },

  _load() {
    return AppStorage.load(this.KEY, this._default());
  },

  _save(data) {
    AppStorage.save(this.KEY, data);
  },

  // Eine Aenderung am Datenstand: laden, aendern, speichern.
  _update(fn) {
    const data = this._load();
    fn(data);
    this._save(data);
  },

  getStatus(lessonId) {
    return this._load().lessons[lessonId] || 'not_started';
  },

  startLesson(lessonId) {
    this._update(d => {
      if (!d.lessons[lessonId]) d.lessons[lessonId] = 'in_progress';
    });
  },

  // Lektion fertig: Status setzen und alle Begriffe der Lektion mit der
  // gemeinsamen Selbsteinschaetzung in den Karteikasten legen.
  completeLesson(lessonId, termIds, confidence) {
    const today = Leitner.today();
    this._update(d => {
      d.lessons[lessonId] = 'completed';
      termIds.forEach(id => { d.cards[id] = Leitner.rate(d.cards[id], confidence, today); });
    });
  },

  rateCard(termId, confidence) {
    const today = Leitner.today();
    this._update(d => { d.cards[termId] = Leitner.rate(d.cards[termId], confidence, today); });
  },

  // Faellige Karten, am laengsten ueberfaellig zuerst.
  getDueCards(today) {
    const day = today || Leitner.today();
    const cards = this._load().cards;
    return Object.keys(cards)
      .filter(id => Leitner.isDue(cards[id], day))
      .sort((a, b) => (cards[a].dueDate < cards[b].dueDate ? -1 : cards[a].dueDate > cards[b].dueDate ? 1 : 0));
  },

  // Naechstes Wiederholungsdatum ueber alle Karten (fuer "Heute nichts faellig").
  getNextDueDate() {
    const cards = this._load().cards;
    const dates = Object.keys(cards).map(id => cards[id].dueDate).filter(Boolean).sort();
    return dates[0] || null;
  },

  getChecklist(lessonId) {
    return this._load().checklists[lessonId] || [];
  },

  setChecklistItem(lessonId, index, checked) {
    this._update(d => {
      const list = d.checklists[lessonId] || [];
      list[index] = !!checked;
      d.checklists[lessonId] = list;
    });
  },

  getTool() {
    const tool = this._load().tool;
    return this.TOOLS.includes(tool) ? tool : 'claude';
  },

  setTool(tool) {
    this._update(d => { d.tool = this.TOOLS.includes(tool) ? tool : 'claude'; });
  },

  saveTestResult(testId, percent) {
    this._update(d => {
      const old = d.tests[testId];
      const best = old ? Math.max(old.best, percent) : percent;
      d.tests[testId] = { best, passed: best >= this.PASS_PERCENT };
    });
  },

  getTestResult(testId) {
    return this._load().tests[testId] || null;
  },

  getModulePercent(lessonIds) {
    if (!lessonIds.length) return 0;
    const lessons = this._load().lessons;
    const done = lessonIds.filter(id => lessons[id] === 'completed').length;
    return Math.round((done / lessonIds.length) * 100);
  },

  getLastRoute() {
    return this._load().lastRoute || '#/start';
  },

  setLastRoute(route) {
    this._update(d => { d.lastRoute = route; });
  },

  getTourSeen() {
    return !!this._load().tourSeen;
  },

  setTourSeen() {
    this._update(d => { d.tourSeen = true; });
  },

  reset() {
    this._save(this._default());
  }
};

if (typeof module !== 'undefined') module.exports = Progress;
