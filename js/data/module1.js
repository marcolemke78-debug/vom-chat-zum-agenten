/**
 * MODULE1 - KI verstehen und sicher nutzen (Stufe A, mit jedem Werkzeug).
 * Die Lektions-IDs duerfen spaeter NICHT mehr geaendert werden, sonst geht
 * der im Browser gespeicherte Fortschritt verloren.
 *
 * Werkzeug-Angaben geprueft am 18.10.2026:
 *  - Claude Free: claude.com/pricing, support.claude.com (Projekte max. 5, Skills, kein Claude Code; ab 18 Jahren)
 *  - ChatGPT Free: learn.chatgpt.com, help.openai.com (Projekte, Datenkontrollen; GPTs werden abgeschaltet)
 *  - fobizz: live in einem Lehrkraft-Konto (KI-Chat mit Modellwahl inkl. Claude Sonnet 5.5, Eigene KI-Assistenten)
 * HTML steht in Backtick-Strings; Anfuehrungszeichen als &bdquo; ... &ldquo;.
 */
const MODULE1 = {
  id: 1,
  title: 'KI verstehen und sicher nutzen',
  stage: 'A',
  lessons: [
    // ------------------------------------------------------------------
    {
      id: 'm1l1',
      module: 1,
      title: 'Vom Chat zum Agenten',
      minutes: 15,
      stand: '2026-10-18',
      terms: ['agent', 'werkzeug', 'harness'],
      demo: 'klassenliste',
      moment: {
        html: `<p>Du kennst das: Jedes Schuljahr kopierst du Namenslisten aus der Schulverwaltung, tippst sie ins Notenprogramm, ins Klassenbuch, in die Kursliste. Eine Stunde Arbeit, die niemand sieht.</p>
<p>Ein KI-Chat kann dir erklären, wie man das automatisieren könnte. Ein <strong>KI-Agent</strong> erledigt es. Schau dir an, wie das aussieht. Du musst davon heute noch nichts selbst können.</p>`
      },
      concept: {
        html: `<h3>Chat und Agent: der Unterschied</h3>
<table>
<tr><th></th><th>KI-Chat</th><th>KI-Agent</th></tr>
<tr><td>Was er tut</td><td>antwortet mit Text</td><td>führt Schritte selbst aus</td></tr>
<tr><td>Womit</td><td>vor allem mit Text, dazu eingebaute Extras wie Websuche</td><td>mit <strong>Werkzeugen</strong>: Dateien lesen, Programme starten, im Web suchen</td></tr>
<tr><td>Wie lange</td><td>eine Antwort, dann wartet er</td><td>arbeitet in einer Schleife, bis die Aufgabe erledigt ist</td></tr>
<tr><td>Wer prüft</td><td>du</td><td>er prüft sich selbst, und du prüfst das Ergebnis, bevor du es nutzt</td></tr>
</table>
<p>Die Schleife eines Agenten sieht immer ähnlich aus: Auftrag verstehen, planen, ein Werkzeug benutzen, das Ergebnis prüfen, nachbessern, fertig melden. Genau das hast du in der Demo gesehen, als der Agent den Fehler beim Doppelnamen selbst bemerkt hat.</p>
<p>Damit das funktioniert, braucht das Sprachmodell eine Umgebung, die ihm Werkzeuge gibt, die Schleife ausführt und auf Regeln achtet. Diese Umgebung heißt <strong>Harness</strong>. Ein Sprachmodell ohne Harness kann nur reden. Mit Harness kann es handeln.</p>
<h3>Wohin dieser Kurs führt</h3>
<p>Der Kurs geht in drei Stufen vor. Jede Stufe ist für sich schon nützlich, du kannst also auch nach Stufe A oder B aufhören und hast trotzdem viel gewonnen.</p>
<ul>
<li><strong>Stufe A, Modul 1:</strong> KI-Chats sicher und geschickt nutzen. Geht mit fobizz, ChatGPT oder Claude, kostenlos.</li>
<li><strong>Stufe B, Modul 2:</strong> Claude als Werkstatt: Projekte, kleine Apps, eigene Skills. Kostenlos im Browser.</li>
<li><strong>Stufe C, Modul 3:</strong> Echte Agenten wie in der Demo. Dafür braucht es später ein Abo (Claude Pro, rund 20 US-Dollar im Monat). Für diesen Kurs zahlst du nichts.</li>
</ul>`,
        analogy: {
          title: 'Kochbuch oder Küchenhilfe?',
          html: `<p>Ein KI-Chat ist wie ein sehr gutes Kochbuch: Es sagt dir genau, wie es geht, aber schnippeln musst du selbst. Ein Agent ist wie eine Küchenhilfe: Sie schnippelt, schmeckt ab, merkt, dass das Salz fehlt, und fragt dich, bevor sie den Rest der Sahne nimmt. Die Küche, in der sie arbeiten darf, mit Messern, Herd und Hausregeln, ist das Harness.</p>`
        }
      },
      practice: {
        html: `<p>Dein erster Auftrag ist klein: Verschaff dir einen Zugang zu einem KI-Chat und stell ihm eine Frage zu dem, was du gerade gelernt hast. Wähle das Werkzeug, mit dem du arbeiten möchtest. Im ganzen Modul 1 kannst du bei deiner Wahl bleiben.</p>`,
        tools: {
          claude: `<p><strong>Claude</strong> (kostenlos, ab 18 Jahren)</p>
<ol>
<li>Öffne <a href="https://claude.ai" target="_blank" rel="noopener">claude.ai</a> und wähle Registrieren.</li>
<li>Melde dich mit deiner <strong>privaten</strong> E-Mail-Adresse an und bestätige sie.</li>
<li>Stelle die Sprache auf Deutsch, falls nötig: Profilbild unten links, dann Language.</li>
<li>Füge den Text unten in das Eingabefeld ein und schicke ihn ab.</li>
</ol>
<p>Das kostenlose Konto reicht für den ganzen Kurs bis einschließlich Modul 2. Tipp: Wenn du wenig Zeit hast, leg das Konto schon vorher an.</p>`,
          fobizz: `<p><strong>fobizz</strong> (falls deine Schule eine Lizenz hat)</p>
<ol>
<li>Melde dich bei <a href="https://app.fobizz.com" target="_blank" rel="noopener">app.fobizz.com</a> an.</li>
<li>Oben auf Tools, dann KI Chat.</li>
<li>Füge den Text unten in das Eingabefeld ein und schicke ihn ab.</li>
</ol>
<p>Tipp: In fobizz kannst du unten im Eingabefeld das Sprachmodell wählen, darunter auch Claude. So lernst du Claude kennen, ohne ein eigenes Claude-Konto anzulegen.</p>`,
          chatgpt: `<p><strong>ChatGPT</strong> (kostenlos)</p>
<ol>
<li>Öffne <a href="https://chatgpt.com" target="_blank" rel="noopener">chatgpt.com</a> und lege ein kostenloses Konto mit deiner <strong>privaten</strong> E-Mail-Adresse an.</li>
<li>Füge den Text unten in das Eingabefeld ein und schicke ihn ab.</li>
</ol>`
        },
        prompts: [
          {
            label: 'Zum Kopieren',
            text: 'Erkläre mir in drei Sätzen den Unterschied zwischen einem KI-Chat und einem KI-Agenten. Nutze dafür ein Beispiel aus dem Alltag einer Lehrkraft.'
          }
        ],
        checklist: [
          'Ich habe einen Zugang zu einem KI-Chat geöffnet.',
          'Ich habe die Frage abgeschickt und die Antwort gelesen.',
          'Ich habe die Antwort mit der Tabelle aus &bdquo;Dahinter steckt&ldquo; verglichen: Passt das zusammen?'
        ],
        stuck: [
          { problem: 'Bei der Anmeldung wird eine Handynummer verlangt.', fix: 'Manche Anbieter wollen so prüfen, dass du ein Mensch bist. Wenn du das nicht möchtest, nimm fobizz über deine Schule.' },
          { problem: 'Die Antwort klingt anders als hier im Kurs.', fix: 'Das ist normal. Ein KI-Chat formuliert jedes Mal neu. Entscheidend ist, ob der Kern stimmt: Ein Chat antwortet meist nur, ein Agent handelt.' },
          { problem: 'Claude meldet, dass das Nachrichtenlimit erreicht ist.', fix: 'Das kostenlose Konto hat ein Kontingent, das sich nach einigen Stunden wieder auffüllt. Mach morgen weiter oder nutze in der Zwischenzeit fobizz.' }
        ]
      },
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Was unterscheidet einen KI-Agenten von einem KI-Chat?',
          options: [
            'Der Agent nutzt Werkzeuge und führt Schritte selbst aus, bis die Aufgabe erledigt ist.',
            'Der Agent nutzt ein besseres Sprachmodell als der Chat.',
            'Der Agent antwortet schneller und ausführlicher.',
            'Der Agent braucht keine Anweisungen mehr von dir.'
          ],
          correct: 0,
          explanation: 'Der Kern sind Werkzeuge und die Arbeitsschleife: Der Agent liest Dateien, startet Programme, prüft und bessert nach.',
          wrongExplanations: {
            1: 'Naheliegend, aber oft arbeitet im Agenten dasselbe Modell wie im Chat. Der Unterschied ist, was um das Modell herum gebaut ist: die Werkzeuge.',
            2: 'Tempo und Länge sind kein Merkmal. Agenten brauchen für eine Aufgabe sogar oft länger, weil sie mehrere Schritte machen.',
            3: 'Im Gegenteil: Ein Agent braucht einen klaren Auftrag von dir und fragt bei heiklen Schritten nach.'
          }
        },
        {
          type: 'ordering',
          question: 'Bring die Arbeitsschleife eines Agenten in die richtige Reihenfolge.',
          items: ['Auftrag verstehen', 'Plan machen', 'Werkzeug benutzen', 'Ergebnis prüfen', 'Nachbessern und fertig melden'],
          explanation: 'Das Prüfen und Nachbessern ist der entscheidende Teil: Daran hat der Agent in der Demo den Fehler beim Doppelnamen gefunden.'
        },
        {
          type: 'multiple-choice',
          question: 'Was ist ein Harness?',
          options: [
            'Ein besonders großes Sprachmodell',
            'Die Software um das Sprachmodell, die ihm Werkzeuge gibt und auf Regeln achtet',
            'Eine Sicherheitsfunktion, die personenbezogene Daten herausfiltert',
            'Ein anderes Wort für Prompt'
          ],
          correct: 1,
          explanation: 'Das Harness ist die Küche, in der die Küchenhilfe arbeitet: Werkzeuge, Arbeitsschleife, Erlaubnisse. Claude Code ist ein Beispiel.',
          wrongExplanations: {
            0: 'Das Modell ist die Küchenhilfe. Das Harness ist die Küche drumherum, ohne die sie nichts kochen kann.',
            2: 'Ein Harness kann zwar Regeln durchsetzen, aber ein Datenfilter ist es nicht. Und darauf solltest du dich bei Personendaten ohnehin nie verlassen.',
            3: 'Der Prompt ist deine Eingabe. Das Harness ist die Software, die mit dieser Eingabe arbeitet.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Warum hat der Agent in der Demo mit erfundenen Namen getestet?',
          options: [
            'Weil echte Namen das Programm zum Absturz bringen würden',
            'Weil Fantasienamen kürzer sind',
            'Damit echte Schülerdaten nicht bei der KI landen; die echte Liste verarbeitet später das fertige Programm, das die Lehrkraft selbst startet',
            'Weil die KI keine deutschen Namen kennt'
          ],
          correct: 2,
          explanation: 'Das ist das Prinzip für alles, was mit Schülerdaten zu tun hat: Die KI baut das Werkzeug mit Testdaten. Die echte Liste verarbeitest du später selbst mit dem fertigen Programm, ohne dass der Agent sie zu sehen bekommt. Mehr dazu in Lektion 3.',
          wrongExplanations: {
            0: 'Technisch würde das Programm mit echten Namen genauso laufen. Der Grund ist Datenschutz, nicht Technik.',
            1: 'Die Länge spielt keine Rolle. Es geht darum, welche Daten die KI zu sehen bekommt.',
            3: 'Sprachmodelle kennen deutsche Namen gut. Gerade deshalb ist es wichtig, ihnen keine echten zu geben.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------
    {
      id: 'm1l2',
      module: 1,
      title: 'Wie ein Sprachmodell tickt',
      minutes: 15,
      stand: '2026-10-18',
      terms: ['sprachmodell', 'token', 'kontextfenster', 'halluzination', 'modell', 'effort'],
      moment: {
        html: `<p>Für die nächste Gesamtlehrerkonferenz willst du ein Argument zur Hausaufgabenpraxis untermauern. Du fragst einen KI-Chat nach Studien. Die Antwort kommt prompt: drei Studien, mit Autorin, Jahr, Titel und Zeitschrift. Klingt hervorragend.</p>
<p>Bei genauem Hinsehen passt eine davon nicht: Die Autorin existiert, das Thema stimmt, aber genau diese Studie hat sie nie geschrieben. So etwas passiert seltener als früher, aber es passiert.</p>
<p>Wenn du verstehst, warum das passiert, weißt du auch, wann du einer KI vertrauen kannst und wann nicht. Darum geht es in dieser Lektion.</p>`
      },
      concept: {
        html: `<h3>Ein Sprachmodell rät das nächste Wort</h3>
<p>Hinter jedem KI-Chat steckt ein <strong>Sprachmodell</strong>. Es hat aus riesigen Textmengen gelernt, welches Wort in einem Zusammenhang wahrscheinlich als Nächstes kommt. So baut es Antworten Wort für Wort auf. Das funktioniert erstaunlich gut, aber es bedeutet: Von sich aus prüft das Modell nicht, ob etwas wahr ist. Es weiß, was <em>plausibel klingt</em>. Manche Werkzeuge können zusätzlich im Web suchen. Das hilft, schützt aber nicht vollständig vor Fehlern.</p>
<p>Genau daher kommt die erfundene Studie. Name, Jahr und Titel klingen zusammen völlig plausibel. Fachleute nennen das <strong>Halluzination</strong>. Am anfälligsten sind genaue Angaben: Quellen, Zahlen, Zitate, Paragrafen.</p>
<h3>Token und Kontextfenster</h3>
<p>Das Modell liest keine Buchstaben, sondern <strong>Token</strong>: Wörter oder Wortstücke. Ein deutsches Wort sind im Schnitt ein bis zwei Token. Wichtig wird das beim <strong>Kontextfenster</strong>: So viel Text kann das Modell in einem Gespräch gleichzeitig im Blick behalten. In sehr langen Chats geraten frühe Teile aus dem Blick, und die Antworten werden schlechter. Dann hilft ein neuer Chat, in den du die wichtigsten Punkte kurz einfügst.</p>
<h3>Modell und Denktiefe</h3>
<p>Anbieter haben mehrere <strong>Modelle</strong>: große, gründliche und kleine, schnelle. In fobizz kannst du zum Beispiel zwischen Modellen von OpenAI, Anthropic (Claude), Google und Mistral wählen. Manche Modelle können außerdem vor der Antwort länger nachdenken. Diese <strong>Denktiefe</strong> (englisch Effort) lässt sich in manchen Werkzeugen einstellen. Faustregel: Für eine kurze Mail reicht ein schnelles Modell. Für eine Unterrichtsreihe oder eine knifflige Formulierung lohnt sich ein großes Modell mit mehr Denktiefe.</p>
<h3>Was folgt daraus für dich?</h3>
<ul>
<li>Formulieren, gliedern, umschreiben, Ideen sammeln: Darin sind Sprachmodelle stark.</li>
<li>Fakten, Quellen, Zahlen und Rechtliches: immer selbst prüfen, bevor du sie verwendest.</li>
<li>Lange Chats: lieber neu anfangen, als ewig weiterzuschreiben.</li>
</ul>`,
        analogy: {
          title: 'Die belesene Kollegin, die selten nachschlägt',
          html: `<p>Stell dir eine Kollegin vor, die fast alles gelesen hat, was es gibt, aber beim Antworten meist nicht nachschlägt. Sie antwortet auf alles flüssig und überzeugt, weil sie im Kopf hat, wie solche Antworten klingen. Meistens liegt sie richtig. Bei genauen Angaben, wie Seitenzahlen oder Erscheinungsjahren, erfindet sie aber manchmal etwas Passendes, ohne es selbst zu merken. Du würdest ihr trotzdem gern zuhören, aber bevor du sie in der Konferenz zitierst, prüfst du nach.</p>`
        }
      },
      practice: {
        html: `<p>Teste selbst, wie ein Modell mit Quellen umgeht. Stelle die Frage unten und prüfe danach <strong>eine</strong> der genannten Studien, zum Beispiel über eine Suche bei Google Scholar. Wenn du Zeit hast, stelle dieselbe Frage zusätzlich einem zweiten Modell und vergleiche.</p>`,
        tools: {
          claude: `<p><strong>Claude</strong>: Stelle die Frage in einem neuen Chat. Falls du unter dem Eingabefeld einen Modellnamen siehst (etwa Sonnet), kannst du dort ein anderes Modell wählen und die Frage in einem zweiten neuen Chat wiederholen. Gibt es bei dir keine Auswahl, vergleiche Claude stattdessen mit dem KI-Chat in fobizz oder mit ChatGPT.</p>`,
          fobizz: `<p><strong>fobizz</strong>: Im KI Chat unten auf das Modell-Menü (zeigt anfangs Auto) klicken, dann Mehr Modelle. Stelle die Frage mit <strong>Claude Sonnet</strong>. Für den Vergleich wiederholst du sie in einem neuen Chat mit einem Modell von OpenAI, etwa <strong>GPT-6.1 Sol</strong>.</p>`,
          chatgpt: `<p><strong>ChatGPT</strong>: Im kostenlosen Konto ist die Modellwahl eingeschränkt. Stelle die Frage in ChatGPT und zum Vergleich in einem zweiten Werkzeug, zum Beispiel im KI-Chat von fobizz oder in Claude.</p>`
        },
        prompts: [
          {
            label: 'Frage für beide Modelle',
            text: 'Nenne mir drei wissenschaftliche Studien zur Wirkung von Hausaufgaben auf den Lernerfolg in der Sekundarstufe. Gib jeweils Autorin oder Autor, Jahr, Titel und Zeitschrift an.'
          },
          {
            label: 'Nachfrage (ersetzt nicht das Prüfen)',
            text: 'Wie sicher bist du dir bei jeder dieser Angaben? Markiere, was du nicht überprüfen kannst.'
          }
        ],
        checklist: [
          'Ich habe die Frage gestellt (und, wenn Zeit war, einem zweiten Modell).',
          'Ich habe eine genannte Studie selbst gesucht.',
          'Ich habe mir notiert, ob die Studie stimmt, teilweise stimmt oder erfunden ist.'
        ],
        stuck: [
          { problem: 'Das Modell weigert sich, Studien zu nennen, oder verweist nur auf Datenbanken.', fix: 'Gut so: Manche Modelle sind inzwischen vorsichtiger. Notiere das als Ergebnis. Es zeigt, dass Modelle unterschiedlich mit Unsicherheit umgehen.' },
          { problem: 'Das Modell hat im Web gesucht und Links angegeben.', fix: 'Dann sind die Quellen meist echter. Prüfe trotzdem, ob die Studie wirklich sagt, was das Modell behauptet. Auch beim Zusammenfassen echter Quellen passieren Fehler.' },
          { problem: 'Alle Studien gibt es wirklich.', fix: 'Dann prüf die Details: Stimmen Jahr und Zeitschrift, und sagt die Studie wirklich das, was die KI behauptet? Gerade dort schleichen sich Fehler ein. Und die Antwort auf die Nachfrage, wie sicher die KI ist, ist kein Beweis: Auch erfundene Angaben werden oft mit großer Sicherheit bestätigt.' },
          { problem: 'Ich finde die Studie nicht und bin unsicher, ob ich falsch gesucht habe.', fix: 'Suche nach dem Titel in Anführungszeichen und zusätzlich nach Autorin plus Jahr. Findest du beides nicht, ist die Angabe sehr wahrscheinlich erfunden.' }
        ]
      },
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Warum erfindet ein Sprachmodell manchmal Quellen?',
          options: [
            'Weil es absichtlich täuschen will',
            'Weil es Wort für Wort zusammensetzt, was plausibel klingt, ohne von sich aus zu prüfen, ob es stimmt',
            'Weil es keinen Zugang zu Büchern hatte',
            'Weil die Frage zu kurz war'
          ],
          correct: 1,
          explanation: 'Das Modell erzeugt wahrscheinliche Wortfolgen. Eine erfundene Quelle sieht genauso wahrscheinlich aus wie eine echte. Deshalb: Quellen immer prüfen.',
          wrongExplanations: {
            0: 'Ein Sprachmodell hat keine Absicht. Es merkt gar nicht, dass die Angabe falsch ist, und genau das macht Halluzinationen so tückisch.',
            2: 'Die Modelle haben sehr viel Fachliteratur gesehen. Das Problem ist nicht fehlendes Wissen, sondern dass sie ohne Websuche nicht nachschlagen, bevor sie antworten.',
            3: 'Eine genauere Frage hilft bei vielem, verhindert erfundene Quellen aber nicht. Prüfen musst du trotzdem.'
          }
        },
        {
          type: 'matching',
          question: 'Ordne die Begriffe ihrer Bedeutung zu.',
          pairs: [
            { left: 'Token', right: 'Textbaustein, in den das Modell Wörter zerlegt' },
            { left: 'Kontextfenster', right: 'Wie viel Text das Modell im Gespräch gleichzeitig im Blick hat' },
            { left: 'Halluzination', right: 'Überzeugend klingende, aber erfundene Angabe' },
            { left: 'Denktiefe (Effort)', right: 'Wie gründlich das Modell vor der Antwort nachdenkt' }
          ],
          explanation: 'Diese vier Begriffe begegnen dir im ganzen Kurs wieder. Sie liegen jetzt in deinem Karteikasten.'
        },
        {
          type: 'multiple-choice',
          question: 'Du arbeitest seit zwei Stunden im selben Chat an einer Unterrichtsreihe. Die Antworten ignorieren plötzlich Vorgaben vom Anfang. Was hilft am ehesten?',
          options: [
            'Die Vorgaben vom Anfang noch einmal in Großbuchstaben schreiben',
            'Ein anderes Werkzeug ausprobieren',
            'Die Seite neu laden',
            'Einen neuen Chat beginnen und die wichtigsten Vorgaben und den Stand kurz zusammengefasst einfügen'
          ],
          correct: 3,
          explanation: 'Das Kontextfenster ist voll oder sehr lang geworden. Ein frischer Chat mit einer knappen Zusammenfassung gibt dem Modell wieder einen klaren Blick.',
          wrongExplanations: {
            0: 'Großbuchstaben helfen kaum. Das Problem ist die Länge des Gesprächs, nicht die Lautstärke der Vorgabe.',
            1: 'Möglich, aber nicht nötig. Auch im neuen Werkzeug würdest du bei null anfangen. Ein neuer Chat im selben Werkzeug mit Zusammenfassung ist schneller.',
            2: 'Neu laden ändert nichts am Gespräch. Der lange Verlauf bleibt erhalten.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Für welche Aufgabe lohnt sich am ehesten ein großes Modell mit viel Denktiefe?',
          options: [
            'Eine Terminerinnerung an das Kollegium umformulieren',
            'Eine differenzierte Unterrichtsreihe mit drei Niveaustufen planen',
            'Einen Tippfehler in einer Mail finden',
            'Fünf Synonyme für &bdquo;wichtig&ldquo; suchen'
          ],
          correct: 1,
          explanation: 'Je mehr Zusammenhänge eine Aufgabe hat, desto mehr lohnt sich Gründlichkeit. Für kurze Routinesachen reicht ein schnelles Modell.',
          wrongExplanations: {
            0: 'Das schafft jedes schnelle Modell in Sekunden. Mehr Denktiefe bringt hier nur Wartezeit.',
            2: 'Eine Kleinigkeit, für die das schnellste Modell völlig ausreicht.',
            3: 'Synonyme sind eine Routineaufgabe. Hier lohnt sich kein großes Modell.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------
    {
      id: 'm1l3',
      module: 1,
      title: 'Datenschutz und das Platzhalter-Prinzip',
      minutes: 13,
      stand: '2026-10-18',
      terms: ['personenbezogen', 'platzhalter', 'training-optout'],
      moment: {
        html: `<p>Freitag, 16 Uhr. Ein schwieriges Elterngespräch liegt hinter dir, und du hast zugesagt, die Vereinbarungen schriftlich zusammenzufassen: sachlich, freundlich, verbindlich. Normalerweise sitzt du daran eine halbe Stunde und feilst an jedem Satz.</p>
<p>Mit KI geht es in fünf Minuten. Aber was darf in den Chat, und was auf keinen Fall? In dieser Lektion lernst du einen Weg, der fast immer funktioniert: das <strong>Platzhalter-Prinzip</strong>.</p>`
      },
      concept: {
        html: `<h3>Was sind personenbezogene Daten?</h3>
<p>Alles, womit man eine Person erkennen kann: Namen, Noten, Adressen, Geburtsdaten, Fotos. Dazu zählen auch Beschreibungen, die eindeutig auf ein Kind zeigen, etwa &bdquo;der einzige Junge im Rollstuhl in der 7b unserer Schule&ldquo;. Besonders heikel sind Angaben zu Gesundheit, Religion, Herkunft oder Förderbedarf.</p>
<p><strong>Faustregel:</strong> Personenbezogene Daten von Schülerinnen, Schülern, Eltern und Kolleginnen gehören in keinen KI-Chat, auch nicht in fobizz. fobizz warnt selbst: Teile niemals persönliche Daten mit der KI.</p>
<h3>Das Platzhalter-Prinzip</h3>
<ol>
<li>Du schreibst den Prompt mit Platzhaltern: Schüler A, Mutter von Schüler A, Klasse X, Datum Y.</li>
<li>Du beschreibst die Lage allgemein: Was wurde vereinbart, welcher Ton ist gewünscht?</li>
<li>Die KI schreibt den Text mit den Platzhaltern.</li>
<li>Du kopierst den Text in Word oder dein Mailprogramm und setzt dort die echten Angaben ein.</li>
</ol>
<p>Die KI hat dann einen Brief geschrieben, ohne je zu erfahren, um wen es geht.</p>
<h3>Training ausschalten</h3>
<p>Viele Anbieter nutzen Chats, um ihre Modelle zu verbessern. Bei Claude und ChatGPT kannst du das in den Einstellungen abschalten. fobizz gibt deine Eingaben nach eigener Aussage nicht zum Training weiter. Wichtig: Training auszuschalten ist gut, macht personenbezogene Daten im Chat aber <strong>nicht</strong> erlaubt. Die Daten landen trotzdem beim Anbieter.</p>
<h3>Was gilt an deiner Schule?</h3>
<p>Für Schulen in Baden-Württemberg gibt es Vorgaben des Kultusministeriums, und deine Schulleitung entscheidet, welche Werkzeuge dienstlich genutzt werden dürfen. Das hier ist eine Faustregel, keine Rechtsberatung: <strong>keine personenbezogenen Daten, Platzhalter nutzen, Training ausschalten, im Zweifel die Schulleitung fragen.</strong></p>`,
        analogy: {
          title: 'Die Postkarte',
          html: `<p>Stell dir vor, alles, was du in einen KI-Chat schreibst, wäre eine Postkarte: Sie geht durch viele Hände, und du weißt nicht genau, wer sie liest. Einen Brief an Familie Müller über die Leistungen ihres Sohnes würdest du nie auf eine Postkarte schreiben. Ein Musterschreiben &bdquo;An die Eltern von Schüler A&ldquo; schon.</p>`
        }
      },
      practice: {
        html: `<p>Zwei Schritte: Zuerst schaltest du in deinem Werkzeug das Training aus (wo das geht). Dann lässt du dir einen Elternbrief nach dem Platzhalter-Prinzip schreiben. Nimm die vorgegebene Beispiel-Lage unten oder denk dir eine aus. Einen echten Fall nimmst du erst, wenn du das Prinzip sicher beherrschst.</p>`,
        tools: {
          claude: `<p><strong>Claude</strong>: Klicke unten links auf dein Profil, dann Einstellungen, dann Datenschutz. Schalte dort die Option aus, mit der deine Chats zur Verbesserung der Modelle genutzt werden dürfen. Danach in einem neuen Chat den Text unten einfügen.</p>`,
          fobizz: `<p><strong>fobizz</strong>: Hier musst du nichts umstellen, fobizz gibt deine Eingaben laut eigener Aussage nicht zum Training weiter. Öffne den KI Chat und füge den Text unten ein. Die Warnung unter dem Eingabefeld gilt trotzdem.</p>`,
          chatgpt: `<p><strong>ChatGPT</strong>: Klicke auf dein Profil, dann Einstellungen, dann Datenkontrollen. Schalte dort &bdquo;Das Modell für alle verbessern&ldquo; aus. Danach in einem neuen Chat den Text unten einfügen.</p>`
        },
        prompts: [
          {
            label: 'Elternbrief mit Platzhaltern',
            text: 'Du bist eine erfahrene Klassenlehrerin an einer Gemeinschaftsschule. Schreibe eine kurze, freundliche und sachliche Zusammenfassung eines Elterngesprächs an die Eltern von Schüler A (Klasse X).\n\nVereinbart wurde:\n- Schüler A gibt die Hausaufgaben ab sofort jeden Montag vollständig ab.\n- Die Eltern schauen sonntags kurz ins Hausaufgabenheft.\n- In vier Wochen gibt es ein kurzes Telefonat, um zu schauen, wie es läuft.\n\nTon: wertschätzend, klar, ohne Vorwürfe. Länge: höchstens 150 Wörter. Verwende nur die Platzhalter Schüler A, Klasse X und Datum Y, keine erfundenen Namen.'
          }
        ],
        checklist: [
          'Ich habe das Training ausgeschaltet (oder nutze fobizz).',
          'Ich habe einen Brief mit Platzhaltern schreiben lassen, ohne echte Namen oder erkennbare Details.',
          'Ich weiß, wo ich die echten Angaben einsetze: erst danach in Word oder im Mailprogramm.'
        ],
        stuck: [
          { problem: 'Ich finde den Schalter fürs Training nicht.', fix: 'Die Menüs ändern sich gelegentlich. Suche in den Einstellungen nach Datenschutz oder Datenkontrollen. Bei Claude kommst du auch direkt über claude.ai/settings/data-privacy-controls dorthin.' },
          { problem: 'Die KI hat selbst Namen erfunden.', fix: 'Schreib nach: Bitte verwende nur die Platzhalter Schüler A und Klasse X. Erfundene Namen sind kein Datenschutzproblem, aber du musst sie später mühsam ersetzen.' },
          { problem: 'Mein Fall ist so speziell, dass er auch ohne Namen erkennbar wäre.', fix: 'Dann beschreibe ihn allgemeiner: statt &bdquo;der Sohn der Schulleiterin&ldquo; einfach &bdquo;ein Schüler&ldquo;. Im Zweifel den Text lieber selbst schreiben und die KI nur um Formulierungshilfen für einzelne Sätze bitten.' }
        ]
      },
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Welche Eingabe ist nach dem Platzhalter-Prinzip in Ordnung?',
          options: [
            'Schreibe einen Brief an Familie Yilmaz, weil Emre aus der 7b seit drei Wochen keine Hausaufgaben macht.',
            'Schreibe einen Brief an die Eltern von Schüler A (Klasse X). Schüler A macht seit drei Wochen keine Hausaufgaben.',
            'Schreibe einen Brief an die Eltern unseres einzigen Schülers mit Diabetes in der 7b.',
            'Fasse diese Notenliste der 7b zusammen und schreibe jedem Kind eine Rückmeldung.'
          ],
          correct: 1,
          explanation: 'Platzhalter statt Namen, keine erkennbaren Details: So kann die KI helfen, ohne zu erfahren, um wen es geht.',
          wrongExplanations: {
            0: 'Hier stehen echte Namen und die Klasse drin. Das sind personenbezogene Daten. Ersetze sie durch Schüler A und Klasse X.',
            2: 'Kein Name, aber eindeutig erkennbar, und dazu eine Gesundheitsangabe. Solche Angaben sind besonders geschützt.',
            3: 'Eine Notenliste mit Namen gehört nie in einen KI-Chat. Für so etwas eignet sich ein kleines Programm, das nur auf deinem Rechner läuft.'
          }
        },
        {
          type: 'ordering',
          question: 'Bring das Platzhalter-Prinzip in die richtige Reihenfolge.',
          items: [
            'Lage allgemein beschreiben, Platzhalter statt Namen verwenden',
            'Die KI schreibt den Text mit Platzhaltern',
            'Text in Word oder ins Mailprogramm kopieren',
            'Dort die echten Angaben einsetzen'
          ],
          explanation: 'Die echten Angaben kommen erst ganz am Ende dazu, und zwar außerhalb des KI-Chats.'
        },
        {
          type: 'multiple-choice',
          question: 'Du hast in Claude das Training ausgeschaltet. Darfst du jetzt Namen und Noten eingeben?',
          options: [
            'Ja, denn dann werden die Daten sofort gelöscht.',
            'Ja, aber nur Vornamen.',
            'Nein. Die Daten landen trotzdem beim Anbieter. Training auszuschalten schützt dich zusätzlich, ersetzt aber nicht das Platzhalter-Prinzip.',
            'Ja, wenn ich die Namen nur als Datei im Anhang hochlade statt im Text.'
          ],
          correct: 2,
          explanation: 'Training auszuschalten bedeutet nur: Deine Chats werden nicht zum Weiterentwickeln der Modelle verwendet. Gespeichert und verarbeitet werden sie trotzdem.',
          wrongExplanations: {
            0: 'Gelöscht wird nichts sofort. Deine Chats bleiben in deinem Verlauf, bis du sie löschst, und liegen auch danach noch eine Zeit lang beim Anbieter.',
            1: 'Auch ein Vorname kann zusammen mit Klasse und Situation eine Person erkennbar machen. Platzhalter sind sicherer.',
            3: 'Eine hochgeladene Datei landet genauso beim Anbieter wie getippter Text. Für den Datenschutz macht das keinen Unterschied.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Eine Kollegin fragt dich, worauf sie beim Einsatz von KI-Chats im Schulalltag achten soll. Welcher Rat ist der beste?',
          options: [
            'Mit fobizz ist alles erlaubt, weil es für Schulen gemacht ist.',
            'Namen durch Schüler A ersetzen, die Einstellung zum Modell-Training abschalten und bei Unklarheiten die Schulleitung fragen.',
            'Personenbezogene Daten sind in Ordnung, wenn man den Chat danach löscht.',
            'Datenschutz betrifft nur Schülerdaten, Daten von Kolleginnen und Kollegen sind kein Problem.'
          ],
          correct: 1,
          explanation: 'Diese vier Punkte decken fast alle Alltagssituationen ab. Und für die Ausnahmen gibt es die Schulleitung.',
          wrongExplanations: {
            0: 'fobizz ist datenschutzfreundlicher als viele andere Werkzeuge, warnt aber selbst ausdrücklich davor, persönliche Daten einzugeben.',
            2: 'Löschen hilft nicht rückwirkend: Die Daten waren beim Anbieter, sobald du sie abgeschickt hast.',
            3: 'Auch Kolleginnen, Kollegen und Eltern haben ein Recht auf Datenschutz. Die Regel gilt für alle Personen.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------
    {
      id: 'm1l4',
      module: 1,
      title: 'Gut fragen',
      minutes: 13,
      stand: '2026-10-18',
      terms: ['prompt', 'rkaf'],
      moment: {
        html: `<p>Nach der Fachkonferenz liegen deine Stichpunkte auf dem Tisch: Kürzel, Pfeile, halbe Sätze. Bis Montag soll daraus ein ordentliches Protokoll werden.</p>
<p>Du fragst die KI: &bdquo;Mach daraus ein Protokoll.&ldquo; Heraus kommt ein Text, der irgendwie nach Protokoll klingt, aber nicht nach eurer Schule: falscher Aufbau, zu lang, Beschlüsse versteckt im Fließtext. Mit vier Zutaten wird aus derselben Anfrage ein Ergebnis, das du fast unverändert verschicken kannst.</p>`
      },
      concept: {
        html: `<h3>Der Prompt ist dein Arbeitsauftrag</h3>
<p>Alles, was du der KI schreibst, heißt <strong>Prompt</strong>. Die KI kennt weder deine Schule noch deine Konferenz noch deinen Geschmack. Sie füllt jede Lücke mit dem Durchschnitt aus allem, was sie gelesen hat. Je weniger du ihr sagst, desto durchschnittlicher wird das Ergebnis.</p>
<h3>Vier Zutaten: Rolle, Kontext, Aufgabe, Format</h3>
<table>
<tr><th>Zutat</th><th>Frage</th><th>Beispiel</th></tr>
<tr><td><strong>Rolle</strong></td><td>Wer soll die KI sein?</td><td>Du bist Protokollführerin einer Fachkonferenz an einer Gemeinschaftsschule.</td></tr>
<tr><td><strong>Kontext</strong></td><td>Worum geht es?</td><td>Fachkonferenz Technik, 45 Minuten, Stichpunkte siehe unten.</td></tr>
<tr><td><strong>Aufgabe</strong></td><td>Was genau soll entstehen?</td><td>Schreibe ein Ergebnisprotokoll. Erfinde nichts dazu.</td></tr>
<tr><td><strong>Format</strong></td><td>Wie soll es aussehen?</td><td>Tagesordnungspunkte als Überschriften, Beschlüsse fett, höchstens eine Seite.</td></tr>
</table>
<p>Nicht jede Anfrage braucht alle vier. Aber wenn ein Ergebnis nicht passt, fehlt fast immer eine davon.</p>
<h3>Nachschärfen statt neu fragen</h3>
<p>Der erste Entwurf ist selten der letzte. Statt die ganze Frage neu zu stellen, sag der KI im selben Chat, was du ändern willst: &bdquo;Kürzer, bitte.&ldquo; &bdquo;Beschlüsse als Liste am Ende.&ldquo; &bdquo;Weniger förmlich.&ldquo; Die KI hat den ersten Entwurf noch im Blick und baut darauf auf. So arbeitest du wie mit einer Kollegin, der du Rückmeldung gibst.</p>
<h3>Zwei Sätze, die fast immer helfen</h3>
<ul>
<li><strong>&bdquo;Erfinde nichts dazu.&ldquo;</strong> Gerade bei Protokollen und Zusammenfassungen verhindert das, dass die KI Lücken mit Plausiblem füllt.</li>
<li><strong>&bdquo;Stell mir zuerst Rückfragen, wenn dir etwas fehlt.&ldquo;</strong> Dann fragt die KI nach, statt zu raten.</li>
</ul>`,
        analogy: {
          title: 'Die Vertretungsnotiz',
          html: `<p>&bdquo;Mach was mit der 7b&ldquo; ist eine schlechte Vertretungsnotiz. &bdquo;7b, Technik, 3. Stunde. Ihr seid bei Seite 42, Aufgabe 3 und 4 in Einzelarbeit, die Lösungen liegen im Fach. Bitte am Ende einsammeln.&ldquo; ist eine gute. Sie sagt, wer übernimmt, worum es geht, was zu tun ist und was am Ende vorliegen soll. Genau das braucht auch die KI.</p>`
        }
      },
      practice: {
        html: `<p>Verwandle Stichpunkte in ein Protokoll. Nimm die Beispiel-Stichpunkte unten oder eigene, aber <strong>ohne Namen</strong>: Ersetze Personen durch Kollegin A, Kollege B und so weiter. Probiere zuerst die kurze Version und dann die Version mit allen vier Zutaten. Schärfe das bessere Ergebnis anschließend mindestens einmal nach.</p>`,
        tools: {
          claude: `<p><strong>Claude</strong>: Öffne zwei neue Chats, einen für die kurze und einen für die ausführliche Version. So beeinflussen sich die beiden Versuche nicht gegenseitig.</p>`,
          fobizz: `<p><strong>fobizz</strong>: Öffne zwei neue Chats im KI Chat. Tipp: Im Promptlabor unter Tools findest du fertige Prompts für Schulaufgaben. Schau dir an, wie sie aufgebaut sind. Du wirst Rolle, Kontext, Aufgabe und Format wiederfinden.</p>`,
          chatgpt: `<p><strong>ChatGPT</strong>: Öffne zwei neue Chats, einen für die kurze und einen für die ausführliche Version.</p>`
        },
        prompts: [
          {
            label: 'Version 1: kurz',
            text: 'Mach aus diesen Stichpunkten ein Protokoll:\n\nFK Technik 14.10., 45 Min, anwesend 5\n- TOP1 Werkraum: Bohrmaschine defekt, Ersatz bis Weihnachten? Kollegin A klärt Budget mit SL\n- TOP2 Projektprüfung Kl. 9: Termin 12.-14.5., Themenliste bis 30.1., Kollege B entwirft Bewertungsbogen\n- TOP3 Fortbildung Lasercutter: Interesse 3 Pers., Kollegin C fragt beim Fortbildungsträger\n- Beschluss: Sicherheitsbelehrung künftig schriftlich mit Unterschrift'
          },
          {
            label: 'Version 2: mit Rolle, Kontext, Aufgabe, Format',
            text: 'Rolle: Du bist Protokollführerin einer Fachkonferenz an einer Gemeinschaftsschule.\n\nKontext: Fachkonferenz Technik am 14.10., 45 Minuten, 5 Anwesende. Meine Stichpunkte:\n- TOP1 Werkraum: Bohrmaschine defekt, Ersatz bis Weihnachten? Kollegin A klärt Budget mit SL\n- TOP2 Projektprüfung Kl. 9: Termin 12.-14.5., Themenliste bis 30.1., Kollege B entwirft Bewertungsbogen\n- TOP3 Fortbildung Lasercutter: Interesse 3 Pers., Kollegin C fragt beim Fortbildungsträger\n- Beschluss: Sicherheitsbelehrung künftig schriftlich mit Unterschrift\n\nAufgabe: Schreibe ein knappes Ergebnisprotokoll. Erfinde nichts dazu. Wenn etwas unklar ist, markiere es mit [?].\n\nFormat: Kopf mit Datum, Dauer und Anzahl der Anwesenden. Jeder TOP als Überschrift mit zwei bis drei Sätzen. Am Ende eine Tabelle: Aufgabe, zuständig, bis wann. Beschlüsse fett.'
          },
          {
            label: 'Nachschärfen, zum Beispiel so',
            text: 'Danke. Bitte kürzer, die Beschlüsse zusätzlich als nummerierte Liste ganz oben, und schreibe SL aus als Schulleitung.'
          }
        ],
        checklist: [
          'Ich habe beide Versionen ausprobiert und die Ergebnisse verglichen.',
          'Ich kann bei der zweiten Version Rolle, Kontext, Aufgabe und Format zeigen.',
          'Ich habe ein Ergebnis mindestens einmal nachgeschärft.'
        ],
        stuck: [
          { problem: 'Beide Versionen sehen fast gleich gut aus.', fix: 'Das kommt vor, gute Modelle raten oft geschickt. Achte auf Details: Steht etwas im Protokoll, das nicht in den Stichpunkten war? Genau das verhindert die zweite Version.' },
          { problem: 'Die KI hat die Tabelle nicht als Tabelle dargestellt.', fix: 'Schreib nach: Bitte die Aufgaben als Tabelle mit drei Spalten. Beim Kopieren nach Word bleibt die Tabelle meist erhalten. Wenn nicht, hilft Einfügen ohne Formatierung und dann in Word Text in Tabelle umwandeln.' },
          { problem: 'Ich habe eigene Stichpunkte mit Namen genommen.', fix: 'Lösche den Chat und mach es noch einmal mit Kollegin A, Kollege B. Die echten Namen setzt du hinterher in Word ein, wie in Lektion 3.' }
        ]
      },
      quiz: [
        {
          type: 'matching',
          question: 'Ordne die Teile dieses Prompts den vier Zutaten zu.',
          pairs: [
            { left: 'Rolle', right: 'Du bist Klassenlehrerin einer 7. Klasse.' },
            { left: 'Kontext', right: 'Am Freitag ist Wandertag, Treffpunkt Bahnhof um 8 Uhr.' },
            { left: 'Aufgabe', right: 'Schreibe eine Erinnerung an die Eltern.' },
            { left: 'Format', right: 'Höchstens fünf Sätze, freundlich, mit Packliste als Aufzählung.' }
          ],
          explanation: 'Wenn ein Ergebnis nicht passt, frag dich: Welche der vier Zutaten fehlt oder ist zu ungenau?'
        },
        {
          type: 'multiple-choice',
          question: 'Der erste Entwurf eines Elternbriefs ist dir zu förmlich. Was ist am geschicktesten?',
          options: [
            'Die ganze Anfrage in einem neuen Chat noch einmal stellen',
            'Den Text selbst komplett umschreiben',
            'Im selben Chat nachschärfen: Bitte weniger förmlich, eher wie ein persönliches Schreiben.',
            'Ein anderes Modell ausprobieren'
          ],
          correct: 2,
          explanation: 'Im selben Chat hat die KI den Entwurf noch im Blick und ändert gezielt nur das, was du ansprichst.',
          wrongExplanations: {
            0: 'Dann fängst du bei null an und bekommst womöglich einen ganz anderen Text, mit neuen Schwächen.',
            1: 'Kannst du natürlich, aber genau diese Arbeit kann dir die KI mit einem Satz Rückmeldung abnehmen.',
            3: 'Am Modell liegt es selten. Der Ton ist eine Frage des Auftrags, nicht der Rechenleistung.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Warum ist der Satz &bdquo;Erfinde nichts dazu&ldquo; bei Protokollen besonders sinnvoll?',
          options: [
            'Weil die KI sonst Lücken mit plausibel klingenden, aber erfundenen Details füllen kann',
            'Weil die KI sonst zu kurze Texte schreibt',
            'Weil der Satz das Training ausschaltet',
            'Weil Protokolle sonst nicht gespeichert werden'
          ],
          correct: 0,
          explanation: 'Das ist dieselbe Ursache wie bei den erfundenen Studien aus Lektion 2: Das Modell ergänzt, was plausibel klingt. Bei einem Protokoll wäre das fatal.',
          wrongExplanations: {
            1: 'Mit der Länge hat das nichts zu tun. Dafür gibt es die Zutat Format.',
            2: 'Training schaltest du nur in den Einstellungen aus, nicht mit einem Satz im Prompt.',
            3: 'Ob und wo etwas gespeichert wird, hängt nicht von deinem Prompt ab.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Welcher Prompt wird voraussichtlich das brauchbarste Arbeitsblatt liefern?',
          options: [
            'Mach ein Arbeitsblatt über Brüche.',
            'Mach ein richtig gutes, abwechslungsreiches Arbeitsblatt über Brüche für meine Klasse.',
            'Du bist Mathelehrerin. Mach ein Arbeitsblatt über Brüche, bitte ganz ausführlich.',
            'Du bist Mathelehrerin an einer Gemeinschaftsschule. Klasse 6, Thema Brüche erweitern und kürzen, die Klasse hat das Thema gerade eingeführt. Erstelle sechs Übungsaufgaben mit steigender Schwierigkeit und eine Lösung auf einer zweiten Seite.'
          ],
          correct: 3,
          explanation: 'Nur diese Version enthält alle vier Zutaten: Rolle, Kontext (Klasse, Stand), Aufgabe und Format (Anzahl, Steigerung, Lösung separat).',
          wrongExplanations: {
            0: 'Hier fehlen Rolle, Kontext und Format. Die KI muss raten, für welche Klasse und in welcher Form.',
            1: 'Richtig gut und abwechslungsreich sind Wünsche, aber keine Angaben. Die KI weiß immer noch nicht, welche Klasse und welcher Stand.',
            2: 'Die Rolle ist da, aber Kontext und Format fehlen. Ganz ausführlich führt eher zu einem langen als zu einem passenden Blatt.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------
    {
      id: 'm1l5',
      module: 1,
      title: 'Ein Assistent für Wiederkehrendes',
      minutes: 15,
      stand: '2026-10-18',
      terms: ['assistent', 'projekt'],
      moment: {
        html: `<p>Elternbriefe, Erinnerungen, Rückmeldungen: Viele deiner Texte folgen demselben Muster. Und jedes Mal erklärst du der KI von vorn, wer du bist, wie eure Schule tickt, welcher Ton passt und dass bitte keine Namen erfunden werden sollen.</p>
<p>Das geht einfacher. Du richtest einmal einen <strong>Assistenten</strong> ein, der das alles schon weiß. Danach genügt ein Satz: &bdquo;Erinnerung an den Elternabend am Donnerstag.&ldquo;</p>`
      },
      concept: {
        html: `<h3>Feste Anweisungen plus Hintergrundwissen</h3>
<p>Ein Assistent ist ein KI-Chat mit zwei Dingen, die du einmal festlegst:</p>
<ul>
<li><strong>Anweisungen:</strong> Wer ist der Assistent, wofür ist er da, welcher Ton, welches Format, welche Regeln? Zum Beispiel: Verwende immer Platzhalter statt Namen.</li>
<li><strong>Hintergrundwissen:</strong> Dateien, die er kennen soll, etwa ein Mustertext, den du gut findest, oder eure Hausordnung (ohne Personendaten).</li>
</ul>
<p>Jeder neue Chat mit diesem Assistenten startet mit diesem Wissen. Du sparst dir die Erklärungen und bekommst gleichbleibende Qualität.</p>
<h3>Wie das in deinem Werkzeug heißt</h3>
<table>
<tr><th>Werkzeug</th><th>Name</th><th>Besonderheit</th></tr>
<tr><td>fobizz</td><td>Eigene KI-Assistenten</td><td>Modell wählbar, bis zu zehn Dateien, lässt sich per Link mit Kolleginnen und Kollegen teilen</td></tr>
<tr><td>Claude</td><td>Projekt</td><td>Anweisungen und Dateien gelten für alle Chats im Projekt; kostenlos bis zu fünf Projekte</td></tr>
<tr><td>ChatGPT</td><td>Projekt</td><td>Anweisungen und Dateien gelten für alle Chats im Projekt</td></tr>
</table>
<h3>Was eine gute Anweisung enthält</h3>
<p>Du kennst die Zutaten schon aus Lektion 4: Rolle, Kontext, Aufgabe, Format. Dazu kommen feste Regeln, die immer gelten sollen, zum Beispiel das Platzhalter-Prinzip. Fang klein an. Eine halbe Seite Anweisung reicht für den Anfang. Wenn dich etwas an den Ergebnissen stört, ergänzt du die Anweisung um einen Satz.</p>
<h3>Ausblick: vom Assistenten zum Skill</h3>
<p>In Modul 2 lernst du einen nächsten Schritt kennen: <strong>Skills</strong>. Ein Assistent ist ein Ort, an den du gehst. Ein Skill ist eine Anleitung, die Claude von selbst hervorholt, sobald sie passt, egal in welchem Chat. Dein Abschlussprojekt dort ist ein eigener Arbeitsblatt-Skill.</p>`,
        analogy: {
          title: 'Die eingearbeitete Vertretungskraft',
          html: `<p>Eine neue Vertretungskraft musst du jedes Mal einweisen: Wo ist der Kopierer, wie läuft der Unterricht, worauf ist zu achten. Eine eingearbeitete Kraft weiß das alles und legt einfach los. Ein Assistent ist deine eingearbeitete Kraft für eine bestimmte Art von Aufgaben.</p>`
        }
      },
      practice: {
        html: `<p>Richte einen <strong>Elternbrief-Assistenten</strong> ein. Die Anweisung unten kannst du übernehmen und an deine Schule anpassen. Teste den Assistenten danach mit einer kurzen Anfrage.</p>`,
        tools: {
          claude: `<ol>
<li>Links in der Seitenleiste auf Projekte, dann Neues Projekt.</li>
<li>Name: Elternbriefe. Bei den Projektanweisungen die Anweisung unten einfügen.</li>
<li>Optional: einen Mustertext ohne Namen als Datei hinzufügen.</li>
<li>Im Projekt einen neuen Chat starten und die Test-Anfrage eingeben.</li>
</ol>
<p>Im kostenlosen Konto sind bis zu fünf Projekte möglich. Wähle sie mit Bedacht.</p>`,
          fobizz: `<ol>
<li>Tools, dann Eigene KI-Assistenten, dann Assistent anlegen.</li>
<li>Name und kurze Beschreibung eintragen, die Anweisung unten bei Rolle und Instruktionen einfügen.</li>
<li>Sprachmodell wählen, zum Beispiel Claude Sonnet. Speichern.</li>
<li>Chat starten und die Test-Anfrage eingeben.</li>
</ol>
<p>Achtung: Schon der Klick auf Assistent anlegen legt einen Entwurf an. Brichst du ab, bleibt ein Assistent &bdquo;Beispiel Name&ldquo; in deiner Liste. Den kannst du über das Menü mit den drei Punkten in den Papierkorb verschieben.</p>`,
          chatgpt: `<ol>
<li>Links in der Seitenleiste auf Neues Projekt.</li>
<li>Name: Elternbriefe. In den Projekteinstellungen die Anweisung unten einfügen.</li>
<li>Im Projekt einen neuen Chat starten und die Test-Anfrage eingeben.</li>
</ol>`
        },
        prompts: [
          {
            label: 'Anweisung für den Assistenten',
            text: 'Du unterstützt eine Lehrkraft an einer Gemeinschaftsschule beim Schreiben von Elternbriefen, Erinnerungen und Rückmeldungen an Eltern.\n\nTon: freundlich, wertschätzend, klar. Kurze Sätze, keine Fachbegriffe, keine Vorwürfe. Die Eltern werden mit Sie angesprochen.\n\nFormat: Betreff, Anrede "Liebe Eltern", höchstens 150 Wörter, Gruß mit dem Platzhalter [Name Lehrkraft].\n\nFeste Regeln:\n- Verwende nie echte Namen. Nutze Platzhalter wie Schüler A, Klasse X, Datum Y.\n- Wenn dir eine Angabe fehlt (Datum, Uhrzeit, Ort), setze einen Platzhalter in eckigen Klammern und erfinde nichts.\n- Wenn die Lehrkraft versehentlich einen echten Namen schreibt, weise freundlich darauf hin und verwende trotzdem einen Platzhalter.'
          },
          {
            label: 'Test-Anfrage',
            text: 'Erinnerung an den Elternabend der Klasse X am Donnerstag um 19 Uhr im Raum 104. Thema: Klassenfahrt im Frühjahr.'
          }
        ],
        checklist: [
          'Ich habe einen Assistenten bzw. ein Projekt mit der Anweisung angelegt.',
          'Ich habe ihn mit der Test-Anfrage ausprobiert, ohne die Regeln noch einmal zu erklären.',
          'Ich habe mir überlegt, für welche wiederkehrende Aufgabe ich einen zweiten Assistenten brauchen könnte.'
        ],
        stuck: [
          { problem: 'Der Assistent hat trotzdem einen Namen erfunden.', fix: 'Ergänze die Regel in der Anweisung, zum Beispiel: Erfinde keine Namen, auch keine Beispielnamen. Speichern und in einem neuen Chat testen, denn geänderte Anweisungen gelten erst für neue Chats zuverlässig.' },
          { problem: 'Der Assistent hält sich nicht an die Wortgrenze.', fix: 'Schreib die Regel deutlicher in die Anweisung, etwa: Höchstens 150 Wörter, das ist eine harte Grenze. Und schärfe im Chat nach: Bitte kürzer.' },
          { problem: 'Ich finde Projekte in Claude nicht.', fix: 'Projekte findest du in der linken Seitenleiste. Ist sie eingeklappt, öffne sie über das Symbol oben links. In der Handy-App sind Projekte teilweise nur eingeschränkt verfügbar. Richte das Projekt am besten am Rechner ein.' }
        ]
      },
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Was macht einen Assistenten (bzw. ein Projekt) aus?',
          options: [
            'Er nutzt ein besonders leistungsfähiges Modell.',
            'Er hat feste Anweisungen und Hintergrundwissen, die in jedem neuen Chat schon gelten.',
            'Er darf personenbezogene Daten verarbeiten.',
            'Er arbeitet selbstständig wie ein Agent.'
          ],
          correct: 1,
          explanation: 'Der Kern sind die einmal festgelegten Anweisungen und Dateien. Du musst nicht mehr jedes Mal von vorn erklären.',
          wrongExplanations: {
            0: 'Welches Modell der Assistent nutzt, ist eine eigene Einstellung. Ein Assistent kann auch mit einem kleinen Modell arbeiten.',
            2: 'Nein, auch für Assistenten gilt das Platzhalter-Prinzip. Gute Anweisungen erinnern sogar selbst daran.',
            3: 'Ein Assistent ist immer noch ein Chat: Er antwortet, aber er führt keine Schritte mit Werkzeugen aus. Das kommt erst in Stufe C.'
          }
        },
        {
          type: 'matching',
          question: 'Wie heißt der Assistent in welchem Werkzeug?',
          pairs: [
            { left: 'fobizz', right: 'Eigene KI-Assistenten' },
            { left: 'Claude', right: 'Projekt (kostenlos bis zu fünf)' },
            { left: 'ChatGPT', right: 'Projekt' }
          ],
          explanation: 'Die Namen unterscheiden sich, die Idee ist überall dieselbe: Anweisungen und Dateien einmal festlegen, dann immer wieder nutzen.'
        },
        {
          type: 'multiple-choice',
          question: 'Welche Regel gehört auf jeden Fall in die Anweisung eines Elternbrief-Assistenten?',
          options: [
            'Schreibe immer mindestens 300 Wörter.',
            'Nutze immer das neueste Modell.',
            'Speichere die Briefe automatisch in der Cloud.',
            'Verwende nie echte Namen, sondern Platzhalter, und erfinde keine fehlenden Angaben.'
          ],
          correct: 3,
          explanation: 'So ist das Platzhalter-Prinzip fest eingebaut und wirkt in jedem Chat, ohne dass du daran denken musst.',
          wrongExplanations: {
            0: 'Elternbriefe sollen eher kurz sein. Eine Mindestlänge führt zu aufgeblähten Texten.',
            1: 'Das Modell stellst du in den Einstellungen ein, nicht in der Anweisung. Und für Elternbriefe reicht meist ein schnelles Modell.',
            2: 'Speichern kann ein Assistent nicht selbst, das ist keine Frage der Anweisung. Und Elternbriefe mit echten Namen gehören ohnehin nicht in die Cloud des KI-Anbieters.'
          }
        },
        {
          type: 'multiple-choice',
          question: 'Was unterscheidet einen Skill (Modul 2) von einem Assistenten?',
          options: [
            'Ein Skill kostet immer Geld.',
            'Ein Skill ist nur für Programmierer.',
            'Einen Assistenten öffnest du gezielt. Einen Skill holt Claude von selbst hervor, sobald er zur Aufgabe passt, egal in welchem Chat.',
            'Es gibt keinen Unterschied, nur einen anderen Namen.'
          ],
          correct: 2,
          explanation: 'Der Assistent ist ein Ort, an den du gehst. Der Skill ist eine Rezeptkarte, die Claude selbst aus der Schublade holt, wenn sie gebraucht wird.',
          wrongExplanations: {
            0: 'Eigene Skills funktionieren auch im kostenlosen Claude-Konto.',
            1: 'Ein Skill ist im Kern eine gut geschriebene Anleitung. Du baust deinen ersten in Modul 2, ganz ohne Programmieren.',
            3: 'Der Unterschied ist, wer entscheidet, wann die Anleitung zum Einsatz kommt: beim Assistenten du, beim Skill Claude.'
          }
        }
      ]
    }
  ],
  test: {
    id: 'm1test',
    module: 1,
    title: 'Modultest: KI verstehen und sicher nutzen',
    questions: [
      {
        lessonId: 'm1l1',
        type: 'multiple-choice',
        question: 'Eine Kollegin sagt: &bdquo;ChatGPT kann mir doch auch erklären, wie ich meine Klassenliste umwandle. Wozu brauche ich einen Agenten?&ldquo; Was antwortest du?',
        options: [
          'Ein Agent erklärt es ausführlicher.',
          'Ein Agent erklärt es nicht nur, er erledigt es: Er legt Dateien an, testet und bessert nach.',
          'Ein Agent ist datenschutzfreundlicher.',
          'Ein Agent ist kostenlos, ChatGPT nicht.'
        ],
        correct: 1,
        explanation: 'Das ist der Kern von Lektion 1: Ein Chat liefert Text, ein Agent handelt mit Werkzeugen in einer Schleife.',
        wrongExplanations: {
          0: 'Ausführlichkeit ist nicht der Punkt. Der Agent nimmt dir die Arbeit ab, statt sie zu beschreiben.',
          2: 'Datenschutz hängt davon ab, wie du arbeitest, nicht davon, ob Chat oder Agent. Auch ein Agent sollte nur mit Testdaten arbeiten.',
          3: 'Eher umgekehrt: Echte Agenten wie Claude Code brauchen ein Abo, einfache Chats gibt es kostenlos.'
        }
      },
      {
        lessonId: 'm1l1',
        type: 'multiple-choice',
        question: 'Im Agenten-Beispiel greift ein Hook ein, bevor eine Datei überschrieben wird. Wer sorgt dafür, dass diese Regel greift?',
        options: [
          'Das Sprachmodell erinnert sich daran.',
          'Die Lehrkraft muss jedes Mal daran denken.',
          'Die Schulleitung schaltet die Regel frei.',
          'Das Harness, also die Software um das Modell, führt die Regel automatisch aus.'
        ],
        correct: 3,
        explanation: 'Werkzeuge, Schleife, Erlaubnisse und Hooks gehören zum Harness. Darum kann ein Hook nicht vergessen werden.',
        wrongExplanations: {
          0: 'Genau das ist der Unterschied zu einer Bitte im Prompt: Das Modell könnte sie vergessen. Der Hook wird von der Software ausgeführt.',
          1: 'Die Lehrkraft richtet den Hook einmal ein, danach greift er von selbst, wie ein Bewegungsmelder.',
          2: 'Mit der Schulleitung hat das nichts zu tun. Es ist eine technische Regel im Programm.'
        }
      },
      {
        lessonId: 'm1l2',
        type: 'multiple-choice',
        question: 'Die KI nennt dir für einen Elternabend eine Studie mit Autor, Jahr und Titel. Was tust du?',
        options: [
          'Ich prüfe, ob es die Studie gibt und ob sie das sagt, bevor ich sie zitiere.',
          'Ich übernehme sie, weil so genaue Angaben nicht erfunden sein können.',
          'Ich frage die KI, ob die Studie echt ist, und verlasse mich auf ihre Antwort.',
          'Ich nehme lieber ein größeres Modell, das halluziniert nie.'
        ],
        correct: 0,
        explanation: 'Gerade genaue Angaben sind anfällig für Halluzinationen. Prüfen kostet zwei Minuten und erspart eine peinliche Situation.',
        wrongExplanations: {
          1: 'Genau das ist die Falle: Erfundene Quellen sehen genauso detailliert aus wie echte.',
          2: 'Die Nachfrage kann helfen, Unsicherheiten aufzudecken, ist aber keine Prüfung. Das Modell kann sich auch dabei irren.',
          3: 'Größere Modelle halluzinieren seltener, aber nicht nie. Prüfen musst du trotzdem.'
        }
      },
      {
        lessonId: 'm1l2',
        type: 'matching',
        question: 'Ordne die Situation dem passenden Begriff zu.',
        pairs: [
          { left: 'Nach zwei Stunden im selben Chat vergisst die KI frühe Vorgaben.', right: 'Kontextfenster' },
          { left: 'Die KI zitiert ein Gesetz mit einem Paragrafen, den es nicht gibt.', right: 'Halluzination' },
          { left: 'Für eine knifflige Planung lässt du die KI länger nachdenken.', right: 'Denktiefe (Effort)' },
          { left: 'In fobizz stellst du um von GPT auf Claude Sonnet.', right: 'Modellwahl' }
        ],
        explanation: 'Wenn du diese vier Situationen erkennst, weißt du auch, was jeweils hilft: neuer Chat, prüfen, mehr Denktiefe, anderes Modell.'
      },
      {
        lessonId: 'm1l2',
        type: 'multiple-choice',
        question: 'Wofür ist ein Sprachmodell am wenigsten verlässlich?',
        options: [
          'Einen holprigen Text flüssiger formulieren',
          'Ideen für einen Unterrichtseinstieg sammeln',
          'Genaue Zahlen, Quellen und Paragrafen liefern',
          'Einen langen Text in fünf Stichpunkten zusammenfassen'
        ],
        correct: 2,
        explanation: 'Formulieren, Ideen sammeln, zusammenfassen: Das sind Stärken. Bei genauen Fakten setzt das Modell zusammen, was plausibel klingt, und das kann falsch sein.',
        wrongExplanations: {
          0: 'Umformulieren ist eine Kernstärke von Sprachmodellen.',
          1: 'Ideen sammeln funktioniert sehr gut. Hier ist Plausibilität sogar erwünscht.',
          3: 'Zusammenfassen gelingt meist gut. Prüfe trotzdem, ob nichts Wichtiges fehlt, aber das ist nicht die größte Schwäche.'
        }
      },
      {
        lessonId: 'm1l3',
        type: 'multiple-choice',
        question: 'Ein Kollege will die Notenliste seiner 8a in einen KI-Chat kopieren, damit die KI Zeugnisbemerkungen formuliert. Was rätst du ihm?',
        options: [
          'Kein Problem, wenn er vorher das Training ausschaltet.',
          'Kein Problem, wenn er fobizz nutzt.',
          'Lieber nur die Vornamen eingeben.',
          'Keine echten Daten eingeben. Er kann sich Textbausteine mit Platzhaltern schreiben lassen und sie selbst zuordnen.'
        ],
        correct: 3,
        explanation: 'Noten mit Namen sind personenbezogene Daten. Mit Platzhaltern bekommt er trotzdem gute Formulierungshilfen.',
        wrongExplanations: {
          0: 'Training auszuschalten ist gut, aber die Daten liegen trotzdem beim Anbieter. Das ersetzt nicht das Platzhalter-Prinzip.',
          1: 'fobizz ist datenschutzfreundlicher, warnt aber selbst ausdrücklich davor, persönliche Daten einzugeben.',
          2: 'Vornamen plus Klasse plus Noten machen Kinder leicht erkennbar. Platzhalter sind die sichere Lösung.'
        }
      },
      {
        lessonId: 'm1l3',
        type: 'multiple-choice',
        question: 'Welche dieser Angaben ist trotz fehlendem Namen personenbezogen?',
        options: [
          'Ein Schüler der Klasse X hat seine Hausaufgaben vergessen.',
          'Die einzige Schülerin unserer Schule mit Hörgerät hat im Sport Probleme.',
          'Schüler A und Schüler B haben sich in der Pause gestritten.',
          'Eine Klasse 7 plant einen Wandertag.'
        ],
        correct: 1,
        explanation: 'Durch die Beschreibung ist die Schülerin eindeutig erkennbar, und dazu kommt eine Gesundheitsangabe. Das ist besonders geschützt.',
        wrongExplanations: {
          0: 'Mit Platzhalter und ohne weitere Merkmale ist hier niemand erkennbar.',
          2: 'Platzhalter, keine erkennbaren Details: so soll es sein.',
          3: 'Eine Klassenstufe allein macht niemanden erkennbar.'
        }
      },
      {
        lessonId: 'm1l3',
        type: 'ordering',
        question: 'Du willst nach einem Elterngespräch eine Zusammenfassung mit KI schreiben. Bring die Schritte in eine sinnvolle Reihenfolge.',
        items: [
          'Training im Werkzeug ausschalten (falls möglich)',
          'Lage allgemein beschreiben, Platzhalter statt Namen',
          'Entwurf der KI lesen und nachschärfen',
          'Text in Word übernehmen und echte Angaben einsetzen'
        ],
        explanation: 'Erst die Einstellungen, dann der Prompt mit Platzhaltern, dann das Nachschärfen, und ganz zum Schluss, außerhalb der KI, die echten Angaben.'
      },
      {
        lessonId: 'm1l4',
        type: 'multiple-choice',
        question: 'Das KI-Protokoll deiner Fachkonferenz enthält einen Beschluss, den es nie gab. Welcher Zusatz im Prompt hätte das am ehesten verhindert?',
        options: [
          'Erfinde nichts dazu. Markiere Unklares mit [?].',
          'Schreibe besonders ausführlich.',
          'Du bist ein erfahrener Schulleiter.',
          'Antworte auf Deutsch.'
        ],
        correct: 0,
        explanation: 'Die KI füllt Lücken gern mit Plausiblem. Dieser Satz gibt ihr ausdrücklich die Erlaubnis, Lücken offen zu lassen.',
        wrongExplanations: {
          1: 'Ausführlichkeit verleitet eher dazu, noch mehr zu ergänzen.',
          2: 'Eine Rolle hilft beim Ton, verhindert aber keine erfundenen Inhalte.',
          3: 'Die Sprache war nicht das Problem.'
        }
      },
      {
        lessonId: 'm1l4',
        type: 'multiple-choice',
        question: 'Die KI hat dir eine Elterninfo geschrieben, die inhaltlich passt, aber doppelt so lang ist wie gewünscht. Was tust du?',
        options: [
          'Einen neuen Chat mit derselben Frage starten',
          'Das Modell wechseln',
          'Im selben Chat nachschärfen: Bitte auf die Hälfte kürzen, Inhalt beibehalten.',
          'Den Text so lassen, Eltern lesen ohnehin nur den Anfang'
        ],
        correct: 2,
        explanation: 'Nachschärfen im selben Chat ist fast immer der schnellste Weg: Der Entwurf ist noch da, du änderst gezielt eine Sache.',
        wrongExplanations: {
          0: 'Dann verlierst du den guten Inhalt und bekommst womöglich einen ganz anderen Text.',
          1: 'Die Länge ist eine Frage des Auftrags, nicht des Modells.',
          3: 'Gerade deshalb lohnt es sich zu kürzen, damit das Wichtige gelesen wird.'
        }
      },
      {
        lessonId: 'm1l5',
        type: 'multiple-choice',
        question: 'Du schreibst jede Woche ähnliche Rückmeldungen an Eltern und erklärst der KI jedes Mal dieselben Regeln. Was ist der nächste sinnvolle Schritt?',
        options: [
          'Die Regeln in Großbuchstaben an den Anfang jedes Prompts schreiben',
          'Einen Assistenten bzw. ein Projekt mit festen Anweisungen einrichten',
          'Auf ein kostenpflichtiges Abo wechseln',
          'Einen Agenten mit Claude Code einrichten'
        ],
        correct: 1,
        explanation: 'Genau dafür gibt es Assistenten und Projekte: Regeln einmal festlegen, dann in jedem Chat nutzen.',
        wrongExplanations: {
          0: 'Das wäre immer noch jedes Mal Arbeit. Ein Assistent nimmt dir genau das ab.',
          2: 'Assistenten und Projekte gibt es kostenlos, in fobizz, Claude und ChatGPT.',
          3: 'Für Texte nach Muster brauchst du keinen Agenten. Ein Assistent reicht völlig und ist viel einfacher.'
        }
      }
    ]
  }
};

if (typeof module !== 'undefined') module.exports = MODULE1;
