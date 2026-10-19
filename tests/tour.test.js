const test = require('node:test');
const assert = require('node:assert/strict');
const Tour = require('../js/tour.js');

test('Tour hat fuenf Schritte mit Titel, Text und Ziel', () => {
  for (const narrow of [false, true]) {
    const steps = Tour.steps(narrow);
    assert.equal(steps.length, 5);
    steps.forEach(s => {
      assert.ok(s.title && s.text && s.target, JSON.stringify(s));
      assert.doesNotMatch(s.title + s.text, /[–—]/, 'keine Gedankenstriche');
    });
  }
});

test('auf schmalen Bildschirmen zeigen Menue-Schritte auf den Menue-Knopf', () => {
  const wide = Tour.steps(false).map(s => s.target);
  const narrow = Tour.steps(true).map(s => s.target);
  assert.deepEqual(wide.slice(2, 4), ['.nav-module', '.nav-tools']);
  assert.deepEqual(narrow.slice(2, 4), ['#menu-toggle', '#menu-toggle']);
});

test('letzter Schritt erklaert, dass der Fortschritt nur auf diesem Geraet bleibt', () => {
  const last = Tour.steps(false)[4];
  assert.match(last.text, /diesem Browser/);
  assert.match(last.text, /von vorn/);
});
