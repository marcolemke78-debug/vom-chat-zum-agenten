const test = require('node:test');
const assert = require('node:assert/strict');
const validateCourse = require('../js/validate.js');
const GLOSSARY = require('../js/data/glossary.js');
const DEMOS = require('../js/data/demos.js');
const MODULE1 = require('../js/data/module1.js');

const course = { glossary: GLOSSARY, demos: DEMOS, modules: [MODULE1] };

test('echte Kursinhalte bestehen die Inhaltspruefung', () => {
  assert.deepEqual(validateCourse(course), []);
});

test('Modul 1 hat genau 5 Lektionen mit festen IDs', () => {
  assert.deepEqual(MODULE1.lessons.map(l => l.id), ['m1l1', 'm1l2', 'm1l3', 'm1l4', 'm1l5']);
});

test('jede Lektion hat mindestens eine Aufgabe, die kein Multiple Choice ist', () => {
  MODULE1.lessons.forEach(l => {
    assert.ok(l.quiz.some(q => q.type !== 'multiple-choice'), l.id);
  });
});

test('keine Custom GPTs im Kurs', () => {
  const text = JSON.stringify([MODULE1, GLOSSARY, DEMOS]);
  assert.ok(!/Custom GPT|\bGPTs\b|eigene[nrs]? GPT\b/i.test(text), 'Custom GPTs erwaehnt');
});
