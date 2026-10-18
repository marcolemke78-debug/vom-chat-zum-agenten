/**
 * MODULE1 - KI verstehen und sicher nutzen (Stufe A, mit jedem Werkzeug).
 * Die Lektions-IDs duerfen spaeter NICHT mehr geaendert werden, sonst geht
 * der im Browser gespeicherte Fortschritt verloren.
 */
const MODULE1 = {
  id: 1,
  title: 'KI verstehen und sicher nutzen',
  stage: 'A',
  lessons: [
    {
      id: 'm1l1',
      module: 1,
      title: 'Platzhalter-Lektion',
      minutes: 10,
      stand: '2026-10-18',
      terms: ['agent', 'werkzeug'],
      moment: { html: '<p>Platzhalter für den Einstieg.</p>' },
      concept: {
        html: '<p>Platzhalter für das Konzept.</p>',
        analogy: { title: 'Wie im Alltag', html: '<p>Platzhalter-Analogie.</p>' }
      },
      practice: {
        html: '<p>Platzhalter für den Praxisauftrag.</p>',
        tools: {
          claude: '<p>So geht es in Claude.</p>',
          fobizz: '<p>So geht es in fobizz.</p>',
          chatgpt: '<p>So geht es in ChatGPT.</p>'
        },
        prompts: [{ label: 'Zum Kopieren', text: 'Schreibe einen kurzen Elternbrief zum Wandertag. Schüler A ...' }],
        checklist: ['Werkzeug geöffnet', 'Prompt eingefügt', 'Antwort gelesen'],
        stuck: [{ problem: 'Ich finde das Eingabefeld nicht.', fix: 'Es steht ganz unten in der Mitte.' }]
      },
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Was macht ein Agent anders als ein Chat?',
          options: ['Er antwortet nur', 'Er handelt mit Werkzeugen', 'Er ist immer kostenlos', 'Er hat kein Modell'],
          correct: 1,
          explanation: 'Ein Agent nutzt Werkzeuge und arbeitet in Schritten.',
          wrongExplanations: { 0: 'Das macht ein Chat.', 2: 'Kosten haben damit nichts zu tun.', 3: 'Auch ein Agent nutzt ein Sprachmodell.' }
        },
        {
          type: 'matching',
          question: 'Ordne zu.',
          pairs: [{ left: 'Chat', right: 'antwortet' }, { left: 'Agent', right: 'handelt' }],
          explanation: 'Gut.'
        },
        {
          type: 'ordering',
          question: 'Bring in die richtige Reihenfolge.',
          items: ['Auftrag geben', 'Agent arbeitet', 'Ergebnis prüfen'],
          explanation: 'Genau so.'
        }
      ]
    }
  ],
  test: { id: 'm1test', module: 1, title: 'Modultest 1', questions: [] }
};

if (typeof module !== 'undefined') module.exports = MODULE1;
