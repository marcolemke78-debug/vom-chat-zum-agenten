const test = require('node:test');
const assert = require('node:assert/strict');
const { parseRoute } = require('../js/app.js');

const L = ['m1l1', 'm1l2'];
const T = ['m1test'];

test('leer und #/ -> Start', () => {
  assert.deepEqual(parseRoute('', L, T), { page: 'start' });
  assert.deepEqual(parseRoute('#/', L, T), { page: 'start' });
});

test('bekannte Lektion', () => {
  assert.deepEqual(parseRoute('#/lektion/m1l1', L, T), { page: 'lesson', id: 'm1l1' });
});

test('unbekannte Lektion -> Start', () => {
  assert.deepEqual(parseRoute('#/lektion/m9l9', L, T), { page: 'start' });
});

test('Modultest bekannt und unbekannt', () => {
  assert.deepEqual(parseRoute('#/test/m1test', L, T), { page: 'test', id: 'm1test' });
  assert.deepEqual(parseRoute('#/test/xyz', L, T), { page: 'start' });
});

test('Glossar und Wiederholen', () => {
  assert.deepEqual(parseRoute('#/glossar', L, T), { page: 'glossary' });
  assert.deepEqual(parseRoute('#/wiederholen', L, T), { page: 'review' });
});

test('Unsinn -> Start', () => {
  assert.deepEqual(parseRoute('#/quatsch', L, T), { page: 'start' });
  assert.deepEqual(parseRoute('#/lektion/', L, T), { page: 'start' });
});
