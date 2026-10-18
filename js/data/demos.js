/**
 * DEMOS - nachgebaute Agenten-Laeufe zum Durchklicken.
 * Format: { id, title, intro, steps: [{ kind: 'user'|'agent'|'tool'|'hook'|'result', text, note? }] }
 * Alle Namen sind erfunden.
 */
const DEMOS = [
  {
    id: 'klassenliste',
    title: 'Ein Agent macht aus einer Namensliste eine Importdatei',
    intro: 'Jedes Schuljahr dasselbe: Namenslisten aus der Schulverwaltung kopieren und von Hand ins Notenprogramm übertragen. So erledigt ein KI-Agent das. Klick dich Schritt für Schritt durch.',
    steps: [
      {
        kind: 'user',
        text: 'Ich kopiere jedes Jahr Namenslisten aus der Schulverwaltung in mein Notenprogramm. Bau mir ein kleines Programm, das so eine kopierte Liste in eine Importdatei umwandelt. Teste es nur mit erfundenen Namen.',
        note: 'Das ist ein Auftrag, keine Frage. Ein Chat würde dir erklären, wie man so etwas programmiert. Ein Agent erledigt es selbst.'
      },
      {
        kind: 'agent',
        text: 'Gern. Ich schaue mir zuerst an, wie die Importdatei für dein Notenprogramm aufgebaut sein muss.',
        note: 'Der Agent plant, bevor er loslegt, und sagt dir, was er vorhat.'
      },
      {
        kind: 'tool',
        text: '<code>Datei lesen: import-vorlage.csv</code><br>Gefunden: drei Spalten, Nachname; Vorname; Klasse',
        note: 'Hier setzt der Agent ein Werkzeug ein: Er liest selbst eine Datei auf deinem Rechner. Das darf er nur in dem Ordner, den du ihm freigegeben hast.'
      },
      {
        kind: 'tool',
        text: '<code>Datei anlegen: testliste.txt</code><br>Erfundene Namen, alle Klasse 7b: Lena Beispiel, Tom Muster, Mira Probe, Jonas Test-Hausen, Ella Vorlage, Ben Platz',
        note: 'Der Agent testet mit Fantasienamen. Echte Schülerdaten bekommt die KI nur zu sehen, wenn du sie ihr gibst, und genau das vermeidest du. Die echte Liste verarbeitet später das fertige Programm, ohne KI.'
      },
      {
        kind: 'tool',
        text: '<code>Datei anlegen: liste-zu-csv.py</code> (35 Zeilen)',
        note: 'Das eigentliche Programm. Du musst den Code nicht verstehen, um es zu benutzen.'
      },
      {
        kind: 'tool',
        text: '<code>Programm ausführen: liste-zu-csv.py testliste.txt</code><br>Ergebnis: 6 Zeilen, aber Fehler bei Jonas Test-Hausen. Der Doppelname wird an der falschen Stelle getrennt.',
        note: 'Der Agent prüft sein eigenes Ergebnis und findet dabei einen Fehler. Genau das unterscheidet ihn vom Chat: Er arbeitet in einer Schleife aus Tun, Prüfen und Nachbessern.'
      },
      {
        kind: 'agent',
        text: 'Doppelnamen mit Bindestrich werden falsch getrennt. Ich bessere das Programm nach.'
      },
      {
        kind: 'hook',
        text: 'Halt: liste-zu-csv.py gibt es schon. Regel: Vor dem Überschreiben einer Datei erst fragen.<br><strong>Du:</strong> Ja, überschreiben.',
        note: 'Das ist ein Hook: eine feste Regel, die du einmal eingestellt hast und die immer greift, so zuverlässig wie ein Bewegungsmelder. Eine Bitte im Chat kann die KI vergessen, einen Hook nicht.'
      },
      {
        kind: 'tool',
        text: '<code>Programm erneut ausführen</code><br>Ergebnis: testliste.csv mit 6 Zeilen, keine Fehler.'
      },
      {
        kind: 'result',
        text: '<pre>Nachname;Vorname;Klasse\nBeispiel;Lena;7b\nMuster;Tom;7b\nProbe;Mira;7b\nTest-Hausen;Jonas;7b\nVorlage;Ella;7b\nPlatz;Ben;7b</pre>Fertig. Starte das Programm künftig selbst mit deiner echten, kopierten Liste, nicht über den Agenten. Leg die echte Liste nicht in seinen Arbeitsordner und zeig ihm auch die fertige Importdatei nicht. Dann bleiben die echten Namen auf deinem Rechner.',
        note: 'Werkzeuge, Schleife, Erlaubnisse, Hook: Das alles organisiert die Software um das Sprachmodell herum. Sie heißt Harness. Claude Code ist so ein Harness. Bis du selbst so arbeitest, ist es noch ein Stück Weg, und genau den geht dieser Kurs mit dir.'
      }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = DEMOS;
