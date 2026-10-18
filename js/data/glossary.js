/**
 * GLOSSARY - alle Begriffe des Kurses (auch Modul 2 und 3, damit man von
 * Anfang an nachschlagen kann).
 * Format: { id, term, short, analogy, stage: 'A'|'B'|'C', lessonId? }
 * Die IDs der Modul-1-Begriffe sind fest - die Lektionen verweisen darauf.
 * Stand der Werkzeug-Angaben: 18.10.2026.
 */
const GLOSSARY = [
  // ---------- Stufe A ----------
  {
    id: 'sprachmodell', term: 'Sprachmodell (LLM)', stage: 'A', lessonId: 'm1l2',
    short: 'Das Programm hinter jedem KI-Chat. Es hat aus riesigen Textmengen gelernt, welches Wort wahrscheinlich als Nächstes kommt, und baut so Antworten Wort für Wort auf. LLM steht für Large Language Model.',
    analogy: 'Wie die Autovervollständigung im Handy, nur unvorstellbar viel belesener: Sie hat fast alles gelesen, aber nichts davon nachgeprüft.'
  },
  {
    id: 'token', term: 'Token', stage: 'A', lessonId: 'm1l2',
    short: 'Die Bausteine, in die ein Sprachmodell Text zerlegt: ganze Wörter, Wortteile oder Satzzeichen. Ein deutsches Wort sind im Schnitt etwa ein bis zwei Token. Länge, Limits und Kosten werden in Token gemessen.',
    analogy: 'Wie Silben beim Klatschen in der Grundschule: Das Modell liest nicht Buchstabe für Buchstabe, sondern in Häppchen.'
  },
  {
    id: 'kontextfenster', term: 'Kontextfenster', stage: 'A', lessonId: 'm1l2',
    short: 'Wie viel Text das Modell in einem Gespräch gleichzeitig im Blick hat: deine Fragen, seine Antworten, hochgeladene Dateien. Wird es voll, geraten frühe Teile aus dem Blick.',
    analogy: 'Die Fläche deines Schreibtischs: Was darauf liegt, kannst du nutzen. Ist er voll, rutscht vorne etwas herunter.'
  },
  {
    id: 'halluzination', term: 'Halluzination', stage: 'A', lessonId: 'm1l2',
    short: 'Eine Antwort, die überzeugend klingt, aber erfunden oder falsch ist, zum Beispiel eine Quelle, die es nicht gibt. Das Modell lügt nicht absichtlich, es setzt wahrscheinlich klingende Wörter zusammen.',
    analogy: 'Wie eine Schülerin, die bei der Abfrage nichts weiß, aber selbstbewusst etwas Plausibles erzählt.'
  },
  {
    id: 'modell', term: 'Modell (Modellwahl)', stage: 'A', lessonId: 'm1l2',
    short: 'Jeder Anbieter hat mehrere Modelle: große, gründliche und kleine, schnelle. In vielen Werkzeugen kannst du wählen, zum Beispiel in Claude zwischen Sonnet und Haiku oder in fobizz zwischen Modellen verschiedener Anbieter.',
    analogy: 'Wie bei Fahrzeugen: Für den Brötchenkauf reicht das Fahrrad, für den Umzug brauchst du den Transporter.'
  },
  {
    id: 'effort', term: 'Effort (Denktiefe)', stage: 'A', lessonId: 'm1l2',
    short: 'Wie gründlich ein Modell nachdenkt, bevor es antwortet. Mehr Denktiefe heißt meist bessere Antworten bei schwierigen Aufgaben, aber auch längere Wartezeit. Manche Werkzeuge lassen dich das einstellen, andere entscheiden selbst.',
    analogy: 'Kopfrechnen oder schriftlich rechnen: Bei 7 mal 8 reicht der Kopf, bei der Steuererklärung nimmst du dir Zeit.'
  },
  {
    id: 'prompt', term: 'Prompt', stage: 'A', lessonId: 'm1l4',
    short: 'Deine Eingabe an die KI: Frage, Auftrag, Material. Je klarer der Prompt, desto brauchbarer die Antwort.',
    analogy: 'Der Arbeitsauftrag an der Tafel: Ein schwammiger Auftrag bringt schwammige Ergebnisse.'
  },
  {
    id: 'rkaf', term: 'Rolle, Kontext, Aufgabe, Format', stage: 'A', lessonId: 'm1l4',
    short: 'Eine Merkhilfe für gute Prompts: Wer soll die KI sein (Rolle)? Worum geht es (Kontext)? Was genau soll sie tun (Aufgabe)? Wie soll das Ergebnis aussehen (Format)?',
    analogy: 'Wie eine gute Vertretungsnotiz: Wer übernimmt, welche Klasse, was ist zu tun, was soll am Ende abgegeben werden.'
  },
  {
    id: 'platzhalter', term: 'Platzhalter-Prinzip', stage: 'A', lessonId: 'm1l3',
    short: 'Statt echter Namen und Daten schreibst du Platzhalter wie Schüler A oder Klasse X in den Prompt. Die echten Angaben setzt du erst danach selbst in Word oder im Mailprogramm ein.',
    analogy: 'Wie ein Formbrief mit Lücken: Die KI schreibt den Brief, du füllst die Lücken.'
  },
  {
    id: 'personenbezogen', term: 'Personenbezogene Daten', stage: 'A', lessonId: 'm1l3',
    short: 'Alle Angaben, mit denen man eine Person erkennen kann: Namen, Noten, Adressen, Fotos, auch Beschreibungen, die eindeutig auf ein Kind zeigen. Sie gehören in keinen KI-Chat.',
    analogy: 'Alles, was du auch nicht auf eine Postkarte schreiben würdest, die durch viele Hände geht.'
  },
  {
    id: 'training-optout', term: 'Training ausschalten', stage: 'A', lessonId: 'm1l3',
    short: 'Viele Anbieter dürfen Chats nutzen, um ihre Modelle weiter zu trainieren. In den Einstellungen kannst du das abschalten: bei Claude unter Einstellungen, Datenschutz; bei ChatGPT unter Einstellungen, Datenkontrollen. fobizz gibt deine Eingaben laut eigener Aussage nicht zum Training weiter.',
    analogy: 'Wie das Häkchen bei der Kundenkarte: Standardmäßig wird oft mitgeschrieben, aber du darfst widersprechen.'
  },
  {
    id: 'assistent', term: 'Assistent', stage: 'A', lessonId: 'm1l5',
    short: 'Ein KI-Chat mit festen Anweisungen und Hintergrundwissen, den du immer wieder nutzt, zum Beispiel ein Elternbrief-Assistent. In fobizz heißt das Eigene KI-Assistenten, in Claude und ChatGPT nutzt du dafür ein Projekt.',
    analogy: 'Eine eingearbeitete Vertretungskraft: Du musst nicht jedes Mal von vorn erklären, wie es an deiner Schule läuft.'
  },
  {
    id: 'projekt', term: 'Projekt', stage: 'A', lessonId: 'm1l5',
    short: 'Ein Ordner in Claude oder ChatGPT, der Anweisungen, Dateien und Chats zu einem Thema bündelt. Jeder neue Chat im Projekt kennt die Anweisungen schon. Im kostenlosen Claude-Konto sind bis zu fünf Projekte möglich.',
    analogy: 'Wie eine Klassenmappe: Alles zu dieser Klasse liegt an einem Ort und ist sofort griffbereit.'
  },
  {
    id: 'agent', term: 'Agent', stage: 'A', lessonId: 'm1l1',
    short: 'Eine KI, die nicht nur antwortet, sondern selbst Schritte ausführt: Dateien lesen, Programme starten, Ergebnisse prüfen, nachbessern. Sie arbeitet in einer Schleife, bis die Aufgabe erledigt ist, und fragt bei heiklen Schritten nach.',
    analogy: 'Der Unterschied zwischen einem Kochbuch, das dir sagt, wie es geht, und einer Küchenhilfe, die selbst schnippelt, abschmeckt und Bescheid sagt, wenn etwas fehlt.'
  },
  {
    id: 'werkzeug', term: 'Werkzeug (Tool)', stage: 'A', lessonId: 'm1l1',
    short: 'Eine Fähigkeit, die einem Modell zur Verfügung gestellt wird: im Web suchen, eine Datei lesen, Code ausführen, einen Klick machen. Erst Werkzeuge machen aus einem Sprachmodell einen Agenten.',
    analogy: 'Hände für einen Kopf: Das Modell denkt, die Werkzeuge greifen zu.'
  },
  {
    id: 'harness', term: 'Harness', stage: 'A', lessonId: 'm1l1',
    short: 'Die Software um das Modell herum: Sie gibt ihm Werkzeuge, führt die Schleife aus, merkt sich den Verlauf und achtet auf Regeln und Erlaubnisse. Claude Code ist zum Beispiel ein solches Harness.',
    analogy: 'Die Werkstatt um einen Motor: Der Motor (das Modell) liefert die Kraft, aber erst Karosserie, Lenkung und Bremsen machen daraus ein Auto, mit dem man fahren kann.'
  },

  // ---------- Stufe B ----------
  {
    id: 'gedaechtnis', term: 'Gedächtnis (Memory)', stage: 'B',
    short: 'Die Fähigkeit eines KI-Chats, sich Dinge über mehrere Gespräche hinweg zu merken, zum Beispiel deine Fächer oder deinen bevorzugten Stil. Du kannst es ansehen, bearbeiten und abschalten.',
    analogy: 'Wie eine Kollegin, die sich merkt, dass du Mathe und Technik unterrichtest, statt jeden Morgen neu zu fragen.'
  },
  {
    id: 'artifact', term: 'Artifact', stage: 'B',
    short: 'Ein eigenständiges Ergebnis, das Claude neben dem Chat erstellt: ein Dokument, eine Grafik oder sogar eine kleine App wie ein Zufallsgenerator oder Timer, die du direkt benutzen und teilen kannst.',
    analogy: 'Der Unterschied zwischen jemandem, der dir erklärt, wie ein Würfel aussieht, und jemandem, der dir einen in die Hand drückt.'
  },
  {
    id: 'skill', term: 'Skill', stage: 'B',
    short: 'Eine Anleitung als Datei, die Claude bei passender Gelegenheit selbst hervorholt: zum Beispiel wie deine Arbeitsblätter aufgebaut sein sollen. Einmal gebaut, wirkt sie in jedem passenden Chat. Eigene Skills gehen auch im kostenlosen Claude-Konto.',
    analogy: 'Eine Rezeptkarte in der Schublade: Der Koch holt sie nur heraus, wenn genau dieses Gericht bestellt wird.'
  },
  {
    id: 'connector', term: 'Connector (MCP)', stage: 'B',
    short: 'Eine Verbindung, über die Claude auf andere Dienste zugreifen kann, etwa Kalender oder Cloud-Speicher. MCP (Model Context Protocol) ist der gemeinsame Standard, nach dem solche Verbindungen gebaut werden.',
    analogy: 'Wie ein Universal-Ladekabel: Ein Stecker-Standard, und plötzlich passt vieles zusammen.'
  },

  // ---------- Stufe C ----------
  {
    id: 'claude-code', term: 'Claude Code', stage: 'C',
    short: 'Ein Agent von Anthropic, der direkt auf deinem Rechner arbeitet: Dateien lesen und schreiben, Skripte bauen und ausführen. Er läuft im Terminal oder in der Desktop-App, unter macOS und Windows, und braucht mindestens ein Pro-Abo.',
    analogy: 'Statt einer Beraterin am Telefon sitzt jetzt eine Fachkraft an deinem Schreibtisch, die selbst anpacken darf, wenn du es erlaubst.'
  },
  {
    id: 'terminal', term: 'Terminal', stage: 'C',
    short: 'Ein Fenster, in dem man dem Computer Befehle als Text gibt statt mit der Maus zu klicken. Unter Windows heißt es PowerShell oder Eingabeaufforderung, auf dem Mac Terminal.',
    analogy: 'Wie das Funkgerät statt der Fernbedienung: weniger bunt, aber man kann sehr genau sagen, was passieren soll.'
  },
  {
    id: 'hook', term: 'Hook', stage: 'C',
    short: 'Eine feste Regel, die automatisch an einer bestimmten Stelle greift, zum Beispiel: Bevor eine Datei überschrieben wird, frag nach. Anders als eine Bitte im Prompt kann ein Hook nicht vergessen werden.',
    analogy: 'Ein Bewegungsmelder: Er schaltet nicht, weil jemand daran denkt, sondern immer, wenn sich etwas bewegt.'
  },
  {
    id: 'subagent', term: 'Subagent', stage: 'C',
    short: 'Ein Helfer-Agent, den ein Agent für eine Teilaufgabe losschickt, zum Beispiel zum Recherchieren oder Gegenlesen. Er arbeitet mit eigenem, frischem Blick und liefert nur das Ergebnis zurück.',
    analogy: 'Wie bei einer Fachschaftssitzung: Eine Kollegin übernimmt die Recherche und berichtet nachher nur das Wichtigste.'
  },
  {
    id: 'computer-use', term: 'Computer Use', stage: 'C',
    short: 'Die Fähigkeit eines Agenten, einen Bildschirm zu sehen und Maus und Tastatur zu bedienen, also Programme zu nutzen wie ein Mensch. Bei Claude als Forschungsvorschau mit Pro-Abo, unter macOS und Windows.',
    analogy: 'Wie ein Praktikant, dem du über die Schulter schaust, während er sich durch ein Programm klickt.'
  },
  {
    id: 'cowork', term: 'Cowork', stage: 'C',
    short: 'Ein Bereich in der Claude-Desktop-App, in dem Claude Aufgaben mit deinen Dateien selbstständig erledigt, ohne Terminal. Nur mit bezahltem Abo; auf Windows-Home-Rechnern startet es laut Nutzerberichten derzeit nicht.',
    analogy: 'Wie eine Assistenz, der du einen Ordner auf den Tisch legst und sagst: Mach daraus bitte eine Übersicht.'
  }
];

if (typeof module !== 'undefined') module.exports = GLOSSARY;
