const test = require('node:test');
const assert = require('node:assert/strict');
const Exercises = require('../js/exercises.js');

const MC = {
  type: 'multiple-choice',
  question: 'Frage?',
  options: ['A falsch', 'B richtig', 'C falsch', 'D falsch'],
  correct: 1,
  explanation: 'Weil B.',
  wrongExplanations: { 0: 'zu A', 2: 'zu C', 3: 'zu D' }
};

test('Shuffle behaelt richtige Antwort', () => {
  for (let i = 0; i < 20; i++) {
    const s = Exercises.shuffleMc(MC, 'seed' + i);
    assert.equal(s.options[s.correct], 'B richtig');
  }
});

test('Shuffle verschiebt wrongExplanations mit', () => {
  for (let i = 0; i < 20; i++) {
    const s = Exercises.shuffleMc(MC, 'seed' + i);
    s.options.forEach((text, pos) => {
      if (pos === s.correct) return;
      const original = MC.options.indexOf(text);
      assert.equal(s.wrongExplanations[pos], MC.wrongExplanations[original]);
    });
  }
});

test('Shuffle veraendert das Original nicht', () => {
  Exercises.shuffleMc(MC, 'x');
  assert.deepEqual(MC.options, ['A falsch', 'B richtig', 'C falsch', 'D falsch']);
  assert.equal(MC.correct, 1);
});

test('Shuffle deterministisch', () => {
  assert.deepEqual(Exercises.shuffleMc(MC, 'm1l1-0').options, Exercises.shuffleMc(MC, 'm1l1-0').options);
});

test('Positionsverteilung zwischen 15 und 35 Prozent', () => {
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < 200; i++) counts[Exercises.shuffleMc(MC, 'm1l' + i + '-0').correct]++;
  counts.forEach(c => {
    assert.ok(c >= 30 && c <= 70, 'Verteilung ' + counts.join('/'));
  });
});

test('Shuffle mit 3 Optionen funktioniert', () => {
  const three = { ...MC, options: ['x', 'y', 'z'], correct: 2, wrongExplanations: { 0: 'zu x', 1: 'zu y' } };
  const s = Exercises.shuffleMc(three, 'abc');
  assert.equal(s.options[s.correct], 'z');
  assert.equal(s.options.length, 3);
});

test('_permutation liefert nie die Ausgangsreihenfolge (n > 1)', () => {
  for (const n of [2, 3, 4, 5]) {
    for (let s = 0; s < 200; s++) {
      const order = Exercises._permutation(n, 'seed-' + s);
      assert.notDeepEqual(order, [...Array(n).keys()]);
      assert.deepEqual([...order].sort(), [...Array(n).keys()]);
    }
  }
});
