const test = require('node:test');
const assert = require('node:assert/strict');
const DemoPlayer = require('../js/demo.js');

const DEMO = {
  id: 'd', title: 'T', intro: 'i',
  steps: [{ kind: 'user', text: 'a' }, { kind: 'agent', text: 'b' }, { kind: 'result', text: 'c' }]
};

test('Index 0 zeigt den ersten Schritt', () => {
  assert.deepEqual(DemoPlayer.visibleSteps(DEMO, 0).map(s => s.text), ['a']);
});

test('Index 1 zeigt zwei Schritte', () => {
  assert.equal(DemoPlayer.visibleSteps(DEMO, 1).length, 2);
});

test('Index zu gross zeigt alle Schritte', () => {
  assert.equal(DemoPlayer.visibleSteps(DEMO, 99).length, 3);
});

test('negativer Index zeigt einen Schritt', () => {
  assert.equal(DemoPlayer.visibleSteps(DEMO, -5).length, 1);
});
