/**
 * Leitner - reine Logik des Karteikastens (ohne Speichern, ohne DOM).
 *
 * Jede Karteikarte liegt in einem Fach 1..5. Je hoeher das Fach, desto
 * laenger dauert es bis zur naechsten Wiederholung. Die Selbsteinschaetzung
 * steuert, in welches Fach die Karte wandert:
 *   'low'    (noch unsicher) -> zurueck in Fach 1
 *   'medium' (geht so)       -> bleibt (beim ersten Mal Fach 1)
 *   'high'   (sitzt)         -> ein Fach weiter (beim ersten Mal Fach 2)
 */
const Leitner = {
  INTERVALS: [1, 3, 7, 16, 35], // Tage bis zur naechsten Wiederholung je Fach

  _fmt(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  // Heutiges Datum als YYYY-MM-DD. Bewusst ohne Uhrzeit: sonst haengt
  // "heute faellig" an der Tageszeit und an der Zeitumstellung.
  today() {
    return this._fmt(new Date());
  },

  // Datum (YYYY-MM-DD) um n Tage verschieben. 'T00:00:00' ohne Zeitzone
  // erzwingt lokale Mitternacht - sonst rutscht die Rechnung evtl. auf den Vortag.
  addDays(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return this._fmt(d);
  },

  // Neue Kartendaten nach einer Bewertung berechnen.
  rate(card, confidence, today) {
    const isFirstTime = !card || !card.box;
    const current = isFirstTime ? 0 : card.box;
    let box;
    if (confidence === 'low') {
      box = 1;
    } else if (confidence === 'high') {
      box = isFirstTime ? 2 : current + 1;
    } else {
      box = isFirstTime ? 1 : current;
    }
    box = Math.max(1, Math.min(box, this.INTERVALS.length));
    return { box, dueDate: this.addDays(today, this.INTERVALS[box - 1]), lastReviewed: today };
  },

  // Ist die Karte heute (oder schon frueher) faellig? YYYY-MM-DD-Strings
  // lassen sich direkt als Text vergleichen.
  isDue(card, today) {
    return !!(card && card.box && card.dueDate && card.dueDate <= today);
  }
};

if (typeof module !== 'undefined') module.exports = Leitner;
