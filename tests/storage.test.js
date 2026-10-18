const test = require('node:test');
const assert = require('node:assert/strict');
const { mockLocalStorage, throwingLocalStorage } = require('./helpers');
const Storage = require('../js/storage.js');

test.beforeEach(() => { Storage._memory = {}; });

test('load liefert Fallback bei fehlendem Eintrag', () => {
  globalThis.localStorage = mockLocalStorage();
  assert.deepEqual(Storage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert Fallback bei kaputtem JSON', () => {
  globalThis.localStorage = mockLocalStorage({ k: '{kaputt' });
  assert.deepEqual(Storage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert Fallback bei anderer version', () => {
  globalThis.localStorage = mockLocalStorage({ k: JSON.stringify({ version: 0, a: 5 }) });
  assert.deepEqual(Storage.load('k', { version: 1, a: 1 }), { version: 1, a: 1 });
});

test('load liefert gespeicherte Daten bei passender version', () => {
  globalThis.localStorage = mockLocalStorage({ k: JSON.stringify({ version: 1, a: 5 }) });
  assert.deepEqual(Storage.load('k', { version: 1, a: 1 }), { version: 1, a: 5 });
});

test('Fallback ist eine Kopie', () => {
  globalThis.localStorage = mockLocalStorage();
  const fallback = { version: 1, inner: { x: 1 } };
  const result = Storage.load('k', fallback);
  result.inner.x = 99;
  assert.equal(fallback.inner.x, 1);
});

test('save + load ohne localStorage nutzt den Speicher-Fallback', () => {
  globalThis.localStorage = throwingLocalStorage();
  assert.equal(Storage.save('k', { version: 1, a: 7 }), false);
  assert.deepEqual(Storage.load('k', { version: 1, a: 1 }), { version: 1, a: 7 });
  assert.equal(Storage.available(), false);
});

test('save fasst andere Schluessel nicht an', () => {
  const ls = mockLocalStorage({ anderes: 'bleibt' });
  globalThis.localStorage = ls;
  assert.equal(Storage.save('k', { version: 1 }), true);
  assert.equal(ls.store.anderes, 'bleibt');
  assert.equal(Storage.available(), true);
});
