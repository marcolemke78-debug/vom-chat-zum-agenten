// Test-Hilfen: ein nachgebauter localStorage fuer Node.
// Node hat keinen localStorage - wir bauen einen kleinen Ersatz,
// der sich wie der echte verhaelt (Strings rein, Strings raus).
function mockLocalStorage(initial = {}) {
  const store = { ...initial };
  return {
    store,
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };
}

// localStorage, der bei jedem Zugriff wirft (wie iOS-Safari im privaten Modus
// oder blockierte Website-Daten).
function throwingLocalStorage() {
  const fail = () => { throw new Error('SecurityError'); };
  return { getItem: fail, setItem: fail, removeItem: fail };
}

module.exports = { mockLocalStorage, throwingLocalStorage };
