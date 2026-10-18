const test = require('node:test');
const assert = require('node:assert/strict');
const Leitner = require('../js/leitner.js');

const T = '2026-10-18';

test('addDays ueber Monatsgrenze', () => {
  assert.equal(Leitner.addDays('2026-10-30', 3), '2026-11-02');
});

test('addDays ueber Zeitumstellung', () => {
  assert.equal(Leitner.addDays('2026-10-24', 2), '2026-10-26');
});

test('today hat das Format YYYY-MM-DD', () => {
  assert.match(Leitner.today(), /^\d{4}-\d{2}-\d{2}$/);
});

test('erste Bewertung high -> Fach 2, faellig in 3 Tagen', () => {
  assert.deepEqual(Leitner.rate(null, 'high', T), { box: 2, dueDate: '2026-10-21', lastReviewed: T });
});

test('erste Bewertung medium -> Fach 1', () => {
  assert.deepEqual(Leitner.rate(null, 'medium', T), { box: 1, dueDate: '2026-10-19', lastReviewed: T });
});

test('erste Bewertung low -> Fach 1', () => {
  assert.equal(Leitner.rate({}, 'low', T).box, 1);
});

test('high aus Fach 5 bleibt Fach 5', () => {
  assert.deepEqual(Leitner.rate({ box: 5 }, 'high', T), { box: 5, dueDate: '2026-11-22', lastReviewed: T });
});

test('low aus Fach 4 -> Fach 1', () => {
  assert.equal(Leitner.rate({ box: 4 }, 'low', T).box, 1);
});

test('medium aus Fach 3 bleibt 3', () => {
  assert.deepEqual(Leitner.rate({ box: 3 }, 'medium', T), { box: 3, dueDate: '2026-10-25', lastReviewed: T });
});

test('ohne confidence wie medium', () => {
  assert.equal(Leitner.rate({ box: 3 }, undefined, T).box, 3);
  assert.equal(Leitner.rate(null, undefined, T).box, 1);
});

test('isDue: heute faellig, morgen nicht, ohne box nie', () => {
  assert.equal(Leitner.isDue({ box: 1, dueDate: T }, T), true);
  assert.equal(Leitner.isDue({ box: 1, dueDate: '2026-10-19' }, T), false);
  assert.equal(Leitner.isDue({ dueDate: T }, T), false);
});
