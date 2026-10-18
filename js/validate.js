/**
 * validateCourse - prueft die Kursinhalte auf typische Fehler.
 * Laeuft in den Tests (Node) und beim Start der App (Warnungen in der Konsole).
 * Rueckgabe: Liste von Fehlermeldungen, leer = alles in Ordnung.
 */
function validateCourse(course) {
  const errors = [];
  const glossaryIds = new Set();
  const demoIds = new Set((course.demos || []).map(d => d.id));
  const lessonIds = new Set();
  const TYPO_QUOTES = /[\u201e\u201c\u201d\u201a\u2018\u2019]/;

  const need = (obj, fields, where) => {
    fields.forEach(f => {
      const v = f.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
      if (v === undefined || v === null || v === '') errors.push(where + ': Pflichtfeld ' + f + ' fehlt');
    });
  };

  // Alle Strings eines Objekts durchsuchen (fuer die Anfuehrungszeichen-Pruefung).
  const scanStrings = (value, where) => {
    if (typeof value === 'string') {
      if (TYPO_QUOTES.test(value)) errors.push(where + ': typografisches Anführungszeichen, bitte &bdquo; / &ldquo; verwenden');
    } else if (value && typeof value === 'object') {
      Object.keys(value).forEach(k => scanStrings(value[k], where));
    }
  };

  const checkExercise = (ex, where) => {
    if (ex.type === 'multiple-choice') {
      need(ex, ['question', 'options', 'explanation'], where);
      const n = (ex.options || []).length;
      if (!(ex.correct >= 0 && ex.correct < n)) errors.push(where + ': correct liegt außerhalb der Optionen');
      for (let i = 0; i < n; i++) {
        if (i !== ex.correct && !(ex.wrongExplanations && ex.wrongExplanations[i])) {
          errors.push(where + ': wrongExplanations für Option ' + i + ' fehlt');
        }
      }
    } else if (ex.type === 'matching') {
      need(ex, ['question', 'pairs', 'explanation'], where);
    } else if (ex.type === 'ordering') {
      need(ex, ['question', 'items', 'explanation'], where);
    } else {
      errors.push(where + ': unbekannter Aufgabentyp ' + ex.type);
    }
  };

  (course.glossary || []).forEach(g => {
    need(g, ['id', 'term', 'short', 'analogy', 'stage'], 'Glossar ' + g.id);
    if (glossaryIds.has(g.id)) errors.push('Glossar: ID ' + g.id + ' doppelt');
    glossaryIds.add(g.id);
    scanStrings(g, 'Glossar ' + g.id);
  });

  (course.demos || []).forEach(d => {
    need(d, ['id', 'title', 'intro', 'steps'], 'Demo ' + d.id);
    scanStrings(d, 'Demo ' + d.id);
  });

  (course.modules || []).forEach(mod => {
    (mod.lessons || []).forEach(l => {
      const where = 'Lektion ' + l.id;
      if (lessonIds.has(l.id)) errors.push(where + ': ID doppelt');
      lessonIds.add(l.id);
      need(l, ['id', 'module', 'title', 'minutes', 'stand', 'terms', 'moment.html', 'concept.html',
        'concept.analogy.title', 'concept.analogy.html', 'practice.html', 'practice.checklist',
        'practice.stuck', 'quiz'], where);
      if (!(l.minutes >= 5 && l.minutes <= 15)) errors.push(where + ': minutes muss zwischen 5 und 15 liegen');
      if (l.stand && !/^\d{4}-\d{2}-\d{2}$/.test(l.stand)) errors.push(where + ': stand muss YYYY-MM-DD sein');
      const quiz = l.quiz || [];
      if (quiz.length < 3 || quiz.length > 5) errors.push(where + ': Kurz-Check braucht 3–5 Aufgaben (hat ' + quiz.length + ')');
      quiz.forEach((ex, i) => checkExercise(ex, where + ' Aufgabe ' + (i + 1)));
      (l.terms || []).forEach(t => {
        if (!glossaryIds.has(t)) errors.push(where + ': Begriff ' + t + ' fehlt im Glossar');
      });
      if (l.demo && !demoIds.has(l.demo)) errors.push(where + ': Demo ' + l.demo + ' gibt es nicht');
      scanStrings(l, where);
    });

    if (mod.test) {
      const where = 'Modultest ' + mod.test.id;
      const qs = mod.test.questions || [];
      if (qs.length < 10 || qs.length > 12) errors.push(where + ': braucht 10–12 Fragen (hat ' + qs.length + ')');
      qs.forEach((q, i) => {
        checkExercise(q, where + ' Frage ' + (i + 1));
        if (!lessonIds.has(q.lessonId)) errors.push(where + ' Frage ' + (i + 1) + ': lessonId ' + q.lessonId + ' unbekannt');
      });
      scanStrings(mod.test, where);
    }
  });

  return errors;
}

if (typeof module !== 'undefined') module.exports = validateCourse;
