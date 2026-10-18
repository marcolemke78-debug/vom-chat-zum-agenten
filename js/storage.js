/**
 * Storage - sicheres Laden und Speichern im Browser (localStorage).
 *
 * Problem: In manchen Browsern ist localStorage gesperrt (iOS-Safari im
 * privaten Modus, blockierte Website-Daten). Dann wirft schon der Zugriff
 * einen Fehler. Damit die App trotzdem laeuft, merken wir uns die Daten
 * in diesem Fall nur im Arbeitsspeicher (_memory) - sie gehen beim
 * Neuladen verloren, aber nichts stuerzt ab.
 */
const Storage = {
  _memory: {},
  _ok: true,

  // Tiefe Kopie, damit niemand versehentlich den Fallback veraendert.
  _copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Daten laden. Fallback bei: fehlendem Eintrag, kaputtem JSON,
  // anderer Datenversion oder gesperrtem localStorage.
  load(key, fallback) {
    if (key in this._memory) return this._copy(this._memory[key]);
    let raw = null;
    try {
      raw = localStorage.getItem(key);
    } catch (e) {
      this._ok = false;
    }
    if (raw === null) return this._copy(fallback);
    try {
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || data.version !== fallback.version) {
        return this._copy(fallback);
      }
      return data;
    } catch (e) {
      return this._copy(fallback);
    }
  },

  // Daten speichern. Gibt false zurueck, wenn localStorage nicht geht -
  // dann landen die Daten im Arbeitsspeicher.
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      delete this._memory[key];
      this._ok = true;
      return true;
    } catch (e) {
      this._memory[key] = this._copy(data);
      this._ok = false;
      return false;
    }
  },

  // Funktioniert das dauerhafte Speichern gerade?
  available() {
    return this._ok;
  }
};

if (typeof module !== 'undefined') module.exports = Storage;
