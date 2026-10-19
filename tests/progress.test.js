const test = require('node:test');
const assert = require('node:assert/strict');
const { mockLocalStorage } = require('./helpers');

globalThis.AppStorage = require('../js/storage.js');
globalThis.Leitner = require('../js/leitner.js');
const Progress = require('../js/progress.js');

const TODAY = '2026-10-18';

test.beforeEach(() => {
  globalThis.localStorage = mockLocalStorage();
  AppStorage._memory = {};
  Leitner.today = () => TODAY;
  Progress.reset();
});

test('neue Lektion ist not_started', () => {
  assert.equal(Progress.getStatus('m1l1'), 'not_started');
});

test('startLesson setzt in_progress', () => {
  Progress.startLesson('m1l1');
  assert.equal(Progress.getStatus('m1l1'), 'in_progress');
});

test('startLesson aendert completed nicht', () => {
  Progress.completeLesson('m1l1', [], 'medium');
  Progress.startLesson('m1l1');
  assert.equal(Progress.getStatus('m1l1'), 'completed');
});

test('completeLesson legt Karten an', () => {
  Progress.completeLesson('m1l2', ['token', 'kontext'], 'high');
  assert.equal(Progress.getStatus('m1l2'), 'completed');
  assert.deepEqual(Progress.getDueCards('2026-10-21').sort(), ['kontext', 'token']);
  assert.deepEqual(Progress.getDueCards('2026-10-20'), []);
});

test('getDueCards: am laengsten ueberfaellig zuerst', () => {
  Progress.completeLesson('m1l1', ['spaet'], 'high');   // faellig 21.10.
  Progress.completeLesson('m1l2', ['frueh'], 'medium'); // faellig 19.10.
  assert.deepEqual(Progress.getDueCards('2026-10-25'), ['frueh', 'spaet']);
});

test('rateCard low setzt auf Fach 1', () => {
  Progress.completeLesson('m1l2', ['token'], 'high');
  Progress.rateCard('token', 'low');
  assert.deepEqual(Progress.getDueCards('2026-10-19'), ['token']);
});

test('Checkliste merkt sich Haken', () => {
  Progress.setChecklistItem('m1l1', 2, true);
  const list = Progress.getChecklist('m1l1');
  assert.equal(list[2], true);
  assert.ok(!list[0] && !list[1]);
});

test('Werkzeug: Standard claude, ungueltig -> claude', () => {
  assert.equal(Progress.getTool(), 'claude');
  Progress.setTool('fobizz');
  assert.equal(Progress.getTool(), 'fobizz');
  Progress.setTool('xyz');
  assert.equal(Progress.getTool(), 'claude');
});

test('saveTestResult behaelt bestes Ergebnis', () => {
  assert.equal(Progress.getTestResult('m1test'), null);
  Progress.saveTestResult('m1test', 60);
  assert.deepEqual(Progress.getTestResult('m1test'), { best: 60, passed: false });
  Progress.saveTestResult('m1test', 80);
  Progress.saveTestResult('m1test', 70);
  assert.deepEqual(Progress.getTestResult('m1test'), { best: 80, passed: true });
});

test('getModulePercent', () => {
  Progress.completeLesson('a', [], 'medium');
  Progress.completeLesson('b', [], 'medium');
  assert.equal(Progress.getModulePercent(['a', 'b', 'c', 'd', 'e']), 40);
});

test('lastRoute wird gemerkt', () => {
  assert.equal(Progress.getLastRoute(), '#/start');
  Progress.setLastRoute('#/lektion/m1l2');
  assert.equal(Progress.getLastRoute(), '#/lektion/m1l2');
});

test('Tour gilt anfangs als nicht gesehen und bleibt nach setTourSeen gesehen', () => {
  assert.equal(Progress.getTourSeen(), false);
  Progress.setTourSeen();
  assert.equal(Progress.getTourSeen(), true);
});
