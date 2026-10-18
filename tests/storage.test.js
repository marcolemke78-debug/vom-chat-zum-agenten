const test = require('node:test');
const assert = require('node:assert/strict');
const { mockLocalStorage, throwingLocalStorage } = require('./helpers');
const AppStorage = require('../js/storage.js');

test.beforeEach(() => { AppStorage._memory = {}; });

test('load liefert Fallback bei fehlendem Eintrag', () => {
  globalThis.localStorage = mockLocalStorage();
  assert.deepEqual(AppStorage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert Fallback bei kaputtem JSON', () => {
  globalThis.localStorage = mockLocalStorage({ k: '{kaputt' });
  assert.deepEqual(AppStorage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert Fallback bei anderer version', () => {
  globalThis.localStorage = mockLocalStorage({ k: JSON.stringify({ version: 0, a: 5 }) });
  assert.deepEqual(AppStorage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert gespeicherte Daten bei passender version', () => {
  globalThis.localStorage = mockLocalStorage({ k: JSON.stringify({ version: 1, a: 5 }) });
  assert.deepEqual(AppStorage.load('k', { version: 1, a: 1 }), { version: 1, a: 5 });
});

test('Fallback ist eine Kopie', () => {
  globalThis.localStorage = mockLocalStorage();
  const fallback = { version: 1, inner: { x: 1 } };
  const result = AppStorage.load('k', fallback);
  result.inner.x = 99;
  assert.equal(fallback.inner.x, 1);
});

test('save + load ohne localStorage nutzt den Speicher-Fallback', () => {
  globalThis.localStorage = throwingLocalStorage();
  assert.equal(AppStorage.save('k', { version: 1, a: 7 }), false);
  assert.deepEqual(AppStorage.load('k', { version: 1, a: 1 }), { version: 1, a: 7 });
  assert.equal(AppStorage.available(), false);
});

test('save fasst andere Schluessel nicht an', () => {
  const ls = mockLocalStorage({ anderes: 'bleibt' });
  globalThis.localStorage = ls;
  assert.equal(AppStorage.save('k', { version: 1 }), true);
  assert.equal(ls.store.anderes, 'bleibt');
  assert.equal(AppStorage.available(), true);
});
