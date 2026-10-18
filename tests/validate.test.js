const test = require('node:test');
const assert = require('node:assert/strict');
const validateCourse = require('../js/validate.js');

// Kleiner, gueltiger Kurs als Ausgangspunkt. Jeder Test veraendert eine Kopie.
function fixture() {
  const mc = (q) => ({
    type: 'multiple-choice', question: q, options: ['a', 'b', 'c'], correct: 0,
    explanation: 'ok', wrongExplanations: { 1: 'nein b', 2: 'nein c' }
  });
  const lesson = (id) => ({
    id, module: 1, title: 'T ' + id, minutes: 10, stand: '2026-10-18', terms: ['token'],
    moment: { html: '<p>m</p>' },
    concept: { html: '<p>k</p>', analogy: { title: 'Bild', html: '<p>a</p>' } },
    practice: { html: '<p>p</p>', checklist: ['eins'], stuck: [{ problem: 'p', fix: 'f' }] },
    quiz: [mc('1'), mc('2'), { type: 'matching', question: 'z', pairs: [{ left: 'l', right: 'r' }], explanation: 'e' }]
  });
  const questions = [];
  for (let i = 0; i < 10; i++) questions.push(Object.assign(mc('t' + i), { lessonId: 'm1l1' }));
  return {
    glossary: [{ id: 'token', term: 'Token', short: 's', analogy: 'a', stage: 'A' }],
    demos: [{ id: 'd1', title: 'Demo', intro: 'i', steps: [{ kind: 'user', text: 'x' }] }],
    modules: [{ id: 1, title: 'Modul 1', lessons: [lesson('m1l1'), lesson('m1l2')], test: { id: 'm1test', module: 1, title: 'Test', questions } }]
  };
}

const has = (errors, part) => errors.some(e => e.includes(part));

test('gueltiges Fixture -> keine Fehler', () => {
  assert.deepEqual(validateCourse(fixture()), []);
});

test('fehlende wrongExplanations werden gemeldet', () => {
  const c = fixture();
  delete c.modules[0].lessons[0].quiz[0].wrongExplanations[2];
  const errors = validateCourse(c);
  assert.ok(has(errors, 'm1l1') && has(errors, 'wrongExplanations'), errors.join('\n'));
});

test('correct ausserhalb der Optionen', () => {
  const c = fixture();
  c.modules[0].lessons[0].quiz[0].correct = 5;
  assert.ok(has(validateCourse(c), 'correct'));
});

test('Quizlaenge 2 oder 6 wird gemeldet', () => {
  const c = fixture();
  c.modules[0].lessons[0].quiz.length = 2;
  assert.ok(has(validateCourse(c), '3–5'));
  const d = fixture();
  const q = d.modules[0].lessons[0].quiz;
  while (q.length < 6) q.push(q[0]);
  assert.ok(has(validateCourse(d), '3–5'));
});

test('minutes 20 wird gemeldet', () => {
  const c = fixture();
  c.modules[0].lessons[0].minutes = 20;
  assert.ok(has(validateCourse(c), 'minutes'));
});

test('unbekannter Begriff wird gemeldet', () => {
  const c = fixture();
  c.modules[0].lessons[0].terms.push('gibtsnicht');
  assert.ok(has(validateCourse(c), 'gibtsnicht'));
});

test('doppelte Lektions-ID wird gemeldet', () => {
  const c = fixture();
  c.modules[0].lessons[1].id = 'm1l1';
  assert.ok(has(validateCourse(c), 'doppelt'));
});

test('Modultest mit 9 Fragen wird gemeldet', () => {
  const c = fixture();
  c.modules[0].test.questions.length = 9;
  assert.ok(has(validateCourse(c), '10–12'));
});

test('Modultest-Frage ohne gueltige lessonId', () => {
  const c = fixture();
  c.modules[0].test.questions[3].lessonId = 'm7l7';
  assert.ok(has(validateCourse(c), 'lessonId'));
});

test('typografisches Anfuehrungszeichen wird gemeldet', () => {
  const c = fixture();
  c.modules[0].lessons[0].concept.html = '<p>\u201eHallo</p>';
  assert.ok(has(validateCourse(c), 'Anführungszeichen'));
});

test('Verweis auf fehlende Demo', () => {
  const c = fixture();
  c.modules[0].lessons[0].demo = 'x';
  assert.ok(has(validateCourse(c), 'Demo'));
});

test('fehlendes Pflichtfeld wird gemeldet', () => {
  const c = fixture();
  delete c.modules[0].lessons[0].practice.checklist;
  assert.ok(has(validateCourse(c), 'checklist'));
});

test('doppelte Glossar-ID wird gemeldet', () => {
  const c = fixture();
  c.glossary.push({ id: 'token', term: 'Token2', short: 's', analogy: 'a', stage: 'A' });
  assert.ok(has(validateCourse(c), 'doppelt'));
});
