# „Vom Chat zum Agenten" – Bauabschnitt 1 (Grundgerüst + Modul 1 bis Pilot)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine öffentlich erreichbare, selbsterklärende Kurs-WebApp mit Modul 1 (5 Lektionen + Modultest), Glossar, Karteikarten-Wiederholung und einer Agenten-Demo, bereit für den Pilot mit 1–2 Kolleg:innen.

**Architecture:** Statische Vanilla-HTML/CSS/JS-App ohne Build und ohne Abhängigkeiten, Hash-Routing, Fortschritt in localStorage. Inhalte (Lektionen, Glossar, Demos, Modultest) liegen als Daten in eigenen JS-Dateien, der Renderer ist datengetrieben. Reine Logik (Speicher, Leitner, Fortschritt, Shuffle, Inhaltsprüfung) wird mit `node --test` getestet.

**Tech Stack:** HTML5, CSS3, ES2020 (Browser-Globals + `module.exports`-Weiche für Node), `node:test` (Node ≥ 18), GitHub Pages.

**Spec:** `docs/2026-10-18-konzept.md` (freigegeben 18.10.2026). Modul 2 und 3 sind **nicht** Teil dieses Plans; sie folgen nach dem Pilot in einem eigenen Plan.

**Referenz-Code zum Portieren:** `~/Desktop/YouTube-Pilot/Bio-Fotosynthese_LernApp/` (`js/progress.js` Leitner-Logik `recordCompletion`/`getDueLessons`/`_today`/`_addDays`, `js/exercises.js` MC/Matching/Ordering mit `wrongExplanations`, `js/renderer.js` Phasen-Tabs/`renderSelfCheck`/`renderReviewDue`). MC-Shuffle-Vorbild: Knuth-Hash, beschrieben in Memory `feedback_mc_position_bias.md`.

## Global Constraints

- Projektordner: `~/Projekte/vom-chat-zum-agenten/`, App liegt im Repo-Root (`index.html` im Root, damit GitHub Pages ohne Unterordner läuft).
- Keine externen Abhängigkeiten, keine CDNs, kein Build. Läuft per `file://` und auf GitHub Pages.
- localStorage-Schlüssel: **`vcza_v1`** (eigener Schlüssel, weil alle Pages-Apps unter `marcolemke78-debug.github.io` dieselbe Domain teilen).
- Texte in Deutsch, Anrede **du**, Zielgruppe erwachsene Lehrkräfte: sachlich-freundlich, nicht kindlich, keine Emojis-Flut.
- In JS-Dateien **nur gerade Anführungszeichen** (`'` `"`) – typografische (`„ " ' '`) werden von einem Hook blockiert; in Texten `&bdquo;…&ldquo;` verwenden. Umlaute direkt als UTF-8.
- Jede Lektion: max. **10–15 Minuten**, Feld `minutes` (Zahl 5–15), Feld `stand` (`YYYY-MM-DD`).
- Mini-Test pro Lektion: **3–5** Aufgaben. Modultest: **10–12** Aufgaben, Bestehensgrenze **75 %**.
- Jede MC-Aufgabe: `wrongExplanations` für **jede** falsche Option. MC-Optionen werden zur Laufzeit deterministisch gemischt.
- Leitner-Intervalle in Tagen: **[1, 3, 7, 16, 35]**; Selbsteinschätzung `low` → Fach 1, `medium` → bleibt (erstmals Fach 1), `high` → +1 (erstmals Fach 2).
- Werkzeug-Varianten im Praxisteil: `claude` (Hauptanleitung, Standard), `fobizz`, `chatgpt`. Keine Custom GPTs erwähnen/anleiten.
- Datenschutz-Faustregel überall gleich formuliert: keine personenbezogenen Daten, Platzhalter („Schüler A"), Training ausschalten, im Zweifel Schulleitung fragen; „keine Rechtsberatung".
- Kein Schul-Branding. Footer: „Vom Chat zum Agenten · Marco Lemke · CC BY-NC-SA 4.0 · Stand <Datum>".
- Touch-Ziele ≥ 44 px; kein horizontales Scrollen ab 360 px Breite; iPad/iOS-Safari muss funktionieren.
- Keine fremden Screenshots/Bilder; Tool-Oberflächen nur als eigene, vereinfachte HTML/SVG-Skizzen.

## Review Focus

1. **localStorage gesperrt** (iOS-Safari privat, blockierte Website-Daten): App läuft vollständig, nur ohne Speichern; kein weißer Bildschirm. → Test in Task 1.
2. **Kaputte oder fremde Daten unter `vcza_v1`** (manuell editiert, alte Version): fällt auf Standard zurück, ohne andere Schlüssel anzufassen. → Test in Task 1.
3. **Unbekannte Route / Lektions-ID im Link** (`#/lektion/m9l9`, Tippfehler in geteiltem Link): landet auf der Startseite statt auf leerer Seite. → Test in Task 4.
4. **Kopieren-Button ohne Clipboard-API** (`file://`, alte Browser, Berechtigung verweigert): markiert den Text und zeigt „Mit Strg/Cmd+C kopieren" statt still zu scheitern. → Test in Task 4.
5. **Schmale Bildschirme mit langen Prompt-Boxen/Tabellen** (iPhone 360 px): Inhalte brechen um bzw. scrollen innerhalb ihrer Box, die Seite selbst scrollt nicht horizontal. → Prüfschritt in Task 5 und Task 9.

---

## Dateistruktur

```
index.html                 Gerüst, lädt alle Skripte in fester Reihenfolge
css/style.css              komplettes Styling (Tokens, Layout, Komponenten)
js/storage.js              Storage: sicheres Laden/Speichern (Fallback im Speicher)
js/leitner.js              Leitner: reine Fach-/Datumslogik
js/progress.js             Progress: Lektionsstatus, Checklisten, Werkzeugwahl, Karten, Testergebnisse
js/exercises.js            Exercises: MC (mit Shuffle), Zuordnung, Reihenfolge
js/demo.js                 DemoPlayer: Schritt-für-Schritt-Animation eines Agentenlaufs
js/data/glossary.js        GLOSSARY: alle Begriffe des Kurses (auch Modul 2/3)
js/data/demos.js           DEMOS: Demo-Skripte
js/data/module1.js         MODULE1: Lektionen 1.1–1.5 + Modultest
js/validate.js             validateCourse(): Inhaltsprüfung (Node + Browser-Konsole)
js/renderer.js             Renderer: Seiten (Start, Lektion, Glossar, Wiederholen, Modultest)
js/app.js                  Router + Init
tests/*.test.js            node:test-Tests
README.md, LICENSE         Doku, CC BY-NC-SA 4.0
docs/                      Konzept, Pläne, Pilot-Unterlagen
```

Jede `js/*.js`-Datei definiert genau ein Global (`const Storage = {…}` usw.) und endet mit
`if (typeof module !== 'undefined') module.exports = <Global>;` – so laufen dieselben Dateien im Browser und in `node --test`.

---

### Task 1: Projekt anlegen, Storage und Leitner-Logik

**Files:**
- Create: `js/storage.js`, `js/leitner.js`, `tests/storage.test.js`, `tests/leitner.test.js`, `.gitignore` (`.DS_Store`)

**Interfaces:**
- Produces:
  - `Storage.load(key: string, fallback: object): object` – liefert geparstes Objekt; bei fehlendem Eintrag, kaputtem JSON, anderem `version`-Feld oder werfendem localStorage eine **tiefe Kopie** von `fallback`.
  - `Storage.save(key: string, data: object): boolean` – `false`, wenn Speichern scheitert; hält die Daten dann in einem Speicher-Fallback (`Storage._memory`), den `load` vorrangig nutzt.
  - `Storage.available(): boolean`
  - `Leitner.INTERVALS = [1, 3, 7, 16, 35]`
  - `Leitner.today(): string` (`YYYY-MM-DD`, lokale Zeit), `Leitner.addDays(date: string, n: number): string`
  - `Leitner.rate(card: {box?: number} | null, confidence: 'low'|'medium'|'high'|undefined, today: string): {box: number, dueDate: string, lastReviewed: string}`
  - `Leitner.isDue(card, today: string): boolean`

- [ ] **Step 1:** `git init` in `~/Projekte/vom-chat-zum-agenten/` (Ordner `docs/` existiert schon), `.gitignore` anlegen.
- [ ] **Step 2: Failing tests schreiben**

`tests/storage.test.js` (localStorage per `globalThis.localStorage = {...}` mocken):
- `load liefert Fallback bei fehlendem Eintrag` → `deepEqual(load('k', {version:1,a:1}), {version:1,a:1})`
- `load liefert Fallback bei kaputtem JSON` (getItem → `'{kaputt'`)
- `load liefert Fallback bei anderer version` (gespeichert `{version:0}`, Fallback `{version:1}`)
- `Fallback ist eine Kopie` (Rückgabe ändern, Fallback-Objekt bleibt unverändert)
- `save + load ohne localStorage` (getItem/setItem werfen `Error('SecurityError')`): `save` gibt `false`, anschließendes `load` liefert die gespeicherten Daten aus `_memory`
- `save fasst andere Schlüssel nicht an` (Mock mit zweitem Schlüssel `'anderes'` bleibt unverändert)

`tests/leitner.test.js`:
- `addDays über Monatsgrenze`: `addDays('2026-10-30', 3) === '2026-11-02'`
- `addDays über Zeitumstellung`: `addDays('2026-10-24', 2) === '2026-10-26'`
- `erste Bewertung high → Fach 2, fällig in 3 Tagen`: `rate(null,'high','2026-10-18')` → `{box:2, dueDate:'2026-10-21', lastReviewed:'2026-10-18'}`
- `erste Bewertung medium → Fach 1`, `low → Fach 1` (dueDate `'2026-10-19'`)
- `high aus Fach 5 bleibt Fach 5` (dueDate +35)
- `low aus Fach 4 → Fach 1`
- `medium aus Fach 3 bleibt 3` (+7)
- `ohne confidence wie medium`
- `isDue`: dueDate gleich heute → true, morgen → false, Karte ohne box → false

- [ ] **Step 3:** `node --test tests/` → FAIL (Module fehlen).
- [ ] **Step 4:** `js/storage.js` und `js/leitner.js` implementieren (Datumslogik wie `_today`/`_addDays` der Referenz: String-Vergleich, `'T00:00:00'` lokal).
- [ ] **Step 5:** `node --test tests/` → alle PASS.
- [ ] **Step 6:** Commit `feat: Storage mit Fallback und Leitner-Logik`.

---

### Task 2: Fortschritt

**Files:**
- Create: `js/progress.js`, `tests/progress.test.js`

**Interfaces:**
- Consumes: `Storage.load/save`, `Leitner.rate/isDue/today`
- Produces (`Progress`, Schlüssel `'vcza_v1'`, Datenform `{version:1, lessons:{}, checklists:{}, tool:'claude', cards:{}, tests:{}, lastRoute:'#/start'}`):
  - `Progress.getStatus(lessonId: string): 'not_started'|'in_progress'|'completed'`
  - `Progress.startLesson(lessonId)` – setzt `in_progress`, falls `not_started`
  - `Progress.completeLesson(lessonId: string, termIds: string[], confidence)` – Status `completed`; jede Karte aus `termIds` wird mit `Leitner.rate` bewertet (gemeinsame Selbsteinschätzung = Wirksamkeits-Trio)
  - `Progress.rateCard(termId: string, confidence)`
  - `Progress.getDueCards(today?: string): string[]` – fällige termIds, am längsten überfällig zuerst
  - `Progress.getChecklist(lessonId): boolean[]`, `Progress.setChecklistItem(lessonId, index: number, checked: boolean)`
  - `Progress.getTool(): 'claude'|'fobizz'|'chatgpt'`, `Progress.setTool(tool)` – ungültiger Wert → `'claude'`
  - `Progress.saveTestResult(testId: string, percent: number)` – speichert bestes Ergebnis + `passed: percent >= 75`
  - `Progress.getTestResult(testId): {best:number, passed:boolean}|null`
  - `Progress.getModulePercent(lessonIds: string[]): number` (0–100, gerundet)
  - `Progress.getLastRoute()/setLastRoute(route)`, `Progress.reset()`

- [ ] **Step 1: Failing tests** (`tests/progress.test.js`, localStorage-Mock wie Task 1, vor jedem Test `Progress.reset()`):
  - `neue Lektion ist not_started`; `startLesson → in_progress`; `startLesson ändert completed nicht`
  - `completeLesson legt Karten an`: `completeLesson('m1l2',['token','kontext'],'high')` → `getDueCards('2026-10-21')` enthält beide, `getDueCards('2026-10-20')` (bei today 18.10.) nicht. (Today per Parameter oder `Leitner.today` mocken.)
  - `rateCard low setzt auf Fach 1`
  - `Checkliste merkt sich Haken` (Index 2 = true, Rest false, Länge egal)
  - `setTool('xyz') → getTool() === 'claude'`
  - `saveTestResult behält bestes Ergebnis`: 60 dann 80 dann 70 → `{best:80, passed:true}`
  - `getModulePercent`: 2 von 5 completed → 40
- [ ] **Step 2:** `node --test tests/progress.test.js` → FAIL.
- [ ] **Step 3:** `js/progress.js` implementieren.
- [ ] **Step 4:** `node --test tests/` → PASS.
- [ ] **Step 5:** Commit `feat: Fortschritt mit Karteikarten, Checklisten, Werkzeugwahl`.

---

### Task 3: Übungstypen und Inhaltsprüfung

**Files:**
- Create: `js/exercises.js`, `js/validate.js`, `tests/exercises.test.js`, `tests/validate.test.js`

**Interfaces:**
- Produces:
  - `Exercises.shuffleMc(exercise, seed: string): exercise` – neue Kopie; `options`, `correct` und die Schlüssel von `wrongExplanations` gemeinsam permutiert (Knuth-Hash `Math.imul(h ^ c, 2654435761)` über den Seed → Permutationsindex).
  - `Exercises.render(exercise, container: HTMLElement, onComplete: () => void)` – Typen `multiple-choice`, `matching`, `ordering` (aus Referenz portieren, `innerHTML` für Fragen/Optionen; Feedback: spezifische `wrongExplanations[i]` → `hint` → generisch).
  - Aufgabenformat:
    - `{type:'multiple-choice', question, options: string[], correct: number, explanation, wrongExplanations: {[i]: string}}`
    - `{type:'matching', question, pairs: [{left, right}], explanation}`
    - `{type:'ordering', question, items: string[] /* in richtiger Reihenfolge */, explanation}`
  - `validateCourse({glossary, modules, demos}): string[]` – Liste von Fehlermeldungen, leer = ok.

- [ ] **Step 1: Failing tests**

`tests/exercises.test.js`:
- `Shuffle behält richtige Antwort`: für 20 Seeds gilt `s.options[s.correct] === original.options[original.correct]`
- `Shuffle verschiebt wrongExplanations mit`: für jede falsche Option `s.wrongExplanations[i]` gehört zum Text `s.options[i]` (Vergleich über Original-Zuordnung)
- `Shuffle deterministisch`: gleicher Seed → gleiche Reihenfolge
- `Positionsverteilung`: über 200 Seeds `'m1l1-0'…` liegt jede der 4 Positionen zwischen 15 % und 35 %

`tests/validate.test.js` (kleines Fixture-Objekt im Test):
- gültiges Fixture → `[]`
- MC ohne `wrongExplanations` für eine falsche Option → Meldung enthält Lektions-ID und `wrongExplanations`
- `correct` außerhalb von `options` → Meldung
- Lektion mit 2 oder 6 Quizaufgaben → Meldung `3–5`
- `minutes` 20 → Meldung
- `terms` verweist auf unbekannte Glossar-ID → Meldung
- doppelte Lektions-ID → Meldung
- Modultest mit 9 Fragen → Meldung `10–12`
- Modultest-Frage ohne gültige `lessonId` → Meldung
- typografisches Anführungszeichen `„` irgendwo in einem String → Meldung
- Lektion mit `demo:'x'`, aber kein Demo `x` → Meldung

- [ ] **Step 2:** `node --test tests/` → FAIL.
- [ ] **Step 3:** `js/exercises.js` (Render-Teil aus Referenz portieren, nicht testen) und `js/validate.js` implementieren. Prüfregeln = obige Tests + Pflichtfelder des Lektionsformats aus Task 4 und des Demo-Formats aus Task 6.
- [ ] **Step 4:** `node --test tests/` → PASS.
- [ ] **Step 5:** Commit `feat: Übungstypen mit Shuffle und Inhaltsprüfung`.

---

### Task 4: App-Gerüst, Router, Lektionsseite

**Files:**
- Create: `index.html`, `css/style.css`, `js/renderer.js`, `js/app.js`, `js/data/module1.js` (vorerst 1 Platzhalter-Lektion `m1l1` + leerer Modultest-Rumpf), `js/data/glossary.js` (2 Platzhalter-Begriffe), `js/data/demos.js` (leer `[]`), `tests/router.test.js`

**Interfaces:**
- Consumes: alle bisherigen Globals.
- Produces:
  - Routen: `#/start`, `#/lektion/<id>`, `#/glossar`, `#/wiederholen`, `#/test/<moduleTestId>`
  - `parseRoute(hash: string, knownLessonIds: string[], knownTestIds: string[]): {page:'start'|'lesson'|'glossary'|'review'|'test', id?: string}` – Unbekanntes → `{page:'start'}` (in `js/app.js`, exportiert für Node).
  - `Renderer.copyText(text: string, buttonEl): Promise<boolean>` – nutzt `navigator.clipboard.writeText`; bei Fehlen/Fehler: Text im zugehörigen `<pre>` markieren (`Range` + `getSelection`), Button-Label „Markiert – mit Strg/Cmd+C kopieren", Rückgabe `false`.
  - Lektionsdatenform (`MODULE1.lessons[]`):
    ```
    { id:'m1l1', module:1, title, minutes, stand:'2026-10-18', terms:['…'], demo?:'demo-id',
      moment:{ html },                      // „Das will ich auch"
      concept:{ html, analogy:{ title, html } },
      practice:{ html, tools?:{ claude, fobizz, chatgpt }, prompts?:[{label, text}],
                 checklist:[string], stuck:[{problem, fix}] },
      quiz:[exercise] }
    MODULE1.test = { id:'m1test', module:1, title, questions:[exercise & {lessonId}] }
    ```
- Lektionsseite: vier Phasen-Reiter **„Das will ich auch" · „Dahinter steckt" · „Selbst ausprobieren" · „Kurz-Check"**, Kopfzeile mit Minuten und „Stand". Praxis: Werkzeug-Umschalter (Claude/fobizz/ChatGPT, Wahl gespeichert), Prompt-Boxen mit Kopieren-Button, Checkliste (gespeichert), aufklappbares „Hängt? Dann prüf das". Kurz-Check: Aufgaben nacheinander; wenn alle gelöst → Selbsteinschätzung (3 Buttons: „noch unsicher" / „geht so" / „sitzt") → `Progress.completeLesson(id, lesson.terms, confidence)` → Button „Weiter zur nächsten Lektion".
- Sidebar: Module als Gruppen (Modul 2/3 ausgegraut „folgt"), Lektionen mit Status-Haken, Einträge „Glossar", „Wiederholen (n fällig)", Modultest. Startseite: Kurz-Intro, Stufenleiter A/B/C, „Weitermachen"-Button (letzte Route), Fällig-Hinweis als Begrüßung (nur Startseite).
- Init: `validateCourse` läuft beim Start, Fehler nur per `console.warn`.

- [ ] **Step 1: Failing tests** `tests/router.test.js`:
  - `''` und `'#/'` → start; `'#/lektion/m1l1'` → `{page:'lesson', id:'m1l1'}`; `'#/lektion/m9l9'` → start; `'#/test/m1test'` → test; `'#/test/xyz'` → start; `'#/glossar'` → glossary; `'#/wiederholen'` → review; `'#/quatsch'` → start
- [ ] **Step 2:** `node --test tests/router.test.js` → FAIL.
- [ ] **Step 3:** `parseRoute` implementieren → PASS.
- [ ] **Step 4:** Design: vorher Skill `frontend-design:frontend-design` laden. Vorgaben: neutral-professionell für Erwachsene, eine ruhige Akzentfarbe (nicht Schul-Blau anderer Lern-Apps), CSS-Tokens in `:root`, System-Schrift, gut lesbare Zeilenlänge (≤ 70 Zeichen), Hell-Modus (Dunkelmodus optional, nicht nötig).
- [ ] **Step 5:** `index.html`, `css/style.css`, `js/renderer.js`, `js/app.js` und Platzhalterdaten bauen. Skriptreihenfolge: storage, leitner, progress, exercises, demo, data/glossary, data/demos, data/module1, validate, renderer, app.
- [ ] **Step 6: Browser-Prüfung** (Chrome per claude-in-chrome, `file://…/index.html` bzw. `python3 -m http.server 8000` → `http://localhost:8000`): Platzhalter-Lektion komplett durchklicken bis Selbsteinschätzung; Reload → Haken und Status bleiben; `#/lektion/m9l9` → Startseite; Konsole ohne Fehler. Kopieren-Button einmal unter `file://` testen (Fallback-Label erscheint oder Kopie klappt).
- [ ] **Step 7:** `node --test tests/` → PASS; Commit `feat: App-Gerüst mit Router und Lektionsseite`.

---

### Task 5: Glossar und Karteikarten-Wiederholung

**Files:**
- Modify: `js/renderer.js`, `css/style.css`
- Create/Modify: `js/data/glossary.js` (vollständig)

**Interfaces:**
- Consumes: `Progress.getDueCards/rateCard`, `GLOSSARY`.
- Produces: `GLOSSARY = [{ id, term, short /* 1–2 Sätze */, analogy /* Alltagsbild */, stage:'A'|'B'|'C', lessonId?: string }]`

- [ ] **Step 1:** `js/data/glossary.js` mit allen Kursbegriffen füllen (auch Stufe B/C, damit das Glossar von Anfang an vollständig ist): Sprachmodell, Token, Kontextfenster, Halluzination, Modell (Modellwahl), Effort/Denktiefe, Prompt, Rolle-Kontext-Aufgabe-Format, Platzhalter-Prinzip, personenbezogene Daten, Training-Opt-out, Assistent, Projekt, Gedächtnis (Memory), Artifact, Skill, Agent, Werkzeug (Tool), Harness, Claude Code, Terminal, Hook, MCP/Connector, Subagent, Computer Use, Cowork. Analogien u. a.: Harness = Werkstatt um den Motor, Skill = Rezeptkarte, Hook = Bewegungsmelder, Kontextfenster = Schreibtischfläche, Token = Silbenbausteine; weitere Bilder vgl. Memory `reference_ki_analogien_unterricht.md` (Restaurant-Modell, Zauberlehrling). `lessonId` nur für Begriffe aus Modul 1 setzen. **Diese IDs sind fest** (Tasks 7/8 verweisen darauf): `agent`, `werkzeug`, `harness`, `sprachmodell`, `token`, `kontextfenster`, `halluzination`, `modell`, `effort`, `platzhalter`, `personenbezogen`, `training-optout`, `prompt`, `rkaf`, `assistent`, `projekt`; übrige IDs frei in Kleinbuchstaben mit Bindestrich (z. B. `claude-code`, `computer-use`).
- [ ] **Step 2:** Glossar-Seite: Suchfeld, Filter nach Stufe A/B/C, Karten mit Begriff, Erklärung, Analogie; Begriffe aus noch nicht bearbeiteten Lektionen normal sichtbar (Nachschlagen ist erlaubt).
- [ ] **Step 3:** Wiederholen-Seite: fällige Karten nacheinander (Vorderseite Begriff → „Aufdecken" → Erklärung + Analogie → drei Bewertungs-Buttons → nächste Karte); leerer Zustand „Heute nichts fällig – nächste Wiederholung am …".
- [ ] **Step 4: Browser-Prüfung:** Lektion abschließen mit „sitzt", dann in der Konsole die `dueDate` einer Karte auf heute setzen → Wiederholen zeigt sie; Bewertung „noch unsicher" → morgen fällig. Bei 360 px Breite: keine horizontale Seitenscrollleiste.
- [ ] **Step 5:** `node --test tests/` → PASS (validate prüft Glossar-IDs eindeutig); Commit `feat: Glossar und Karteikarten-Wiederholung`.

---

### Task 6: Demo-Player und Demo „Agent richtet Klassenliste ein"

**Files:**
- Create: `js/demo.js`, `tests/demo.test.js`
- Modify: `js/data/demos.js`, `css/style.css`, `js/renderer.js` (Demo im Moment-Teil einbinden, wenn `lesson.demo` gesetzt)

**Interfaces:**
- Produces:
  - `DEMOS = [{ id, title, intro, steps:[{ kind:'user'|'agent'|'tool'|'hook'|'result', text, note? /* Erklär-Einblendung, darf Glossar-Begriffe nennen */ }] }]`
  - `DemoPlayer.create(demo, container): {next():boolean, reset():void, index:number}` – zeigt Schritt für Schritt; Buttons „Weiter", „Alles zeigen", „Von vorn"; kein Autoplay (Lesetempo bestimmt die Lehrkraft).
  - `DemoPlayer.visibleSteps(demo, index): step[]` (reine Funktion, testbar)

- [ ] **Step 1: Failing tests** `tests/demo.test.js`: `visibleSteps(demo, 0)` → 1 Schritt; `index` größer als Länge → alle Schritte; negativer Index → 1 Schritt.
- [ ] **Step 2:** `node --test tests/demo.test.js` → FAIL; implementieren → PASS.
- [ ] **Step 3:** Demo `klassenliste` schreiben (8–12 Schritte), angelehnt an Marcos echten Alltag, mit Fantasienamen: Lehrkraft bittet „Mach aus dieser kopierten Namensliste eine CSV für mein Notenprogramm" → Agent liest Datei (tool) → schreibt Skript (tool) → **Hook** „Bevor eine Datei überschrieben wird, frag nach" greift (hook) → Lehrkraft bestätigt → Agent testet mit Fantasienamen → Ergebnis-CSV (result). `note`-Texte erklären: Agent vs. Chat, Werkzeug, Harness, Hook, warum nur Fantasienamen. Darstellung als eigene, vereinfachte Fenster-Skizze (kein Screenshot).
- [ ] **Step 4: Browser-Prüfung** der Demo auf Desktop und 360 px; Commit `feat: Demo-Player mit Klassenlisten-Demo`.

---

### Task 7: Inhalte Modul 1, Lektionen 1.1–1.3

**Files:**
- Modify: `js/data/module1.js`

**Vorgehen:** Didaktik und Texte entscheidet der Builder (Spec §10). Jede Lektion folgt dem Format aus Task 4. **Vor dem Schreiben** jede Werkzeug-Angabe gegen die aktuelle offizielle Hilfe prüfen (Claude: support.claude.com; ChatGPT: help.openai.com / learn.chatgpt.com; fobizz: Marcos Konto über claude-in-chrome nur lesend, nichts anlegen) und im Code-Kommentar mit Datum vermerken. fobizz-Fakten vom 18.10.2026 stehen in Spec §6.

- [ ] **Step 1: Lektion `m1l1` „Vom Chat zum Agenten"** – Moment: Demo `klassenliste`. Konzept: Chat (Antwort) vs. Agent (handelt mit Werkzeugen in Schleife); Stufenleiter A/B/C als eigene SVG/HTML-Grafik; was der Kurs kostet (nichts) und was nicht drin ist. Praxis: Konto bzw. Zugang wählen (Claude Free / fobizz-Login / ChatGPT), ersten Satz eingeben. Terms: `agent`, `werkzeug`, `harness`.
- [ ] **Step 2: Lektion `m1l2` „Wie ein Sprachmodell tickt"** – Moment: KI erfindet souverän eine Quelle. Konzept: Token, Kontextfenster, Halluzination, Modellwahl, Effort. Praxis: dieselbe Frage an zwei Modelle stellen (in fobizz direkt per Modellwahl, z. B. Claude Sonnet vs. GPT; bei Claude Free Sonnet vs. Haiku). Terms: `sprachmodell`, `token`, `kontextfenster`, `halluzination`, `modell`, `effort`.
- [ ] **Step 3: Lektion `m1l3` „Datenschutz und das Platzhalter-Prinzip"** – Moment: Elternbrief nach schwierigem Gespräch, in 5 Minuten statt 30. Konzept: personenbezogene Daten, Training-Opt-out (Claude: Einstellungen → Datenschutz; ChatGPT: Einstellungen → Datenkontrollen), Platzhalter-Prinzip, BW-Faustregel (Formulierung aus Global Constraints). Praxis: Elternbrief mit „Schüler A" erzeugen, Namen erst in Word einsetzen. Terms: `platzhalter`, `personenbezogen`, `training-optout`.
- [ ] **Step 4:** Jede Lektion: 3–5 Quizaufgaben (mind. 1 nicht-MC), `wrongExplanations` vollständig, Checkliste 3–5 Punkte, 2–4 „Hängt?"-Einträge, `minutes` ehrlich geschätzt (Lesezeit ≈ 200 Wörter/Min + Praxis).
- [ ] **Step 5:** `node --test tests/` → PASS (inkl. `validateCourse` über echte Daten: Test `tests/content.test.js` anlegen, der die echten Datendateien lädt und `[]` erwartet).
- [ ] **Step 6:** Fach-Review: Agent `reviewer` auf 1.1–1.3 (fachliche Richtigkeit Stand Oktober 2026, Datenschutz-Aussagen, Tonfall Erwachsene, Länge ≤ 15 Min.). Funde einarbeiten.
- [ ] **Step 7:** Commit `content: Modul 1, Lektionen 1.1–1.3`.

---

### Task 8: Inhalte Modul 1, Lektionen 1.4–1.5 und Modultest

**Files:**
- Modify: `js/data/module1.js`

- [ ] **Step 1: Lektion `m1l4` „Gut fragen"** – Moment: Konferenzprotokoll aus Stichpunkten. Konzept: Rolle–Kontext–Aufgabe–Format, Nachschärfen statt neu fragen, Beispiele vorher/nachher. Praxis: Prompt-Bausteine zum Kopieren, eigene Stichpunkte (ohne Namen) in Protokoll verwandeln. Terms: `prompt`, `rkaf`.
- [ ] **Step 2: Lektion `m1l5` „Ein Assistent für Wiederkehrendes"** – Moment: jede Woche dieselbe Art Elternbrief. Konzept: feste Anweisungen + Hintergrundwissen = Assistent; Brücke zu Skills (Ausblick Modul 2). Praxis je Werkzeug: Claude-Projekt (Free: max. 5), fobizz „Eigene KI-Assistenten" (Hinweis aus Spec: „Assistent anlegen" erzeugt sofort einen Entwurf; Entwurf ggf. in den Papierkorb verschieben), ChatGPT-Projekt (keine GPTs). Vorgefertigte Anweisung „Elternbrief-Assistent" zum Kopieren. Terms: `assistent`, `projekt`.
- [ ] **Step 3: Modultest `m1test`** – 10–12 Aufgaben, jede mit `lessonId`, alle 5 Lektionen abgedeckt, mind. 3 Anwendungsfälle („Eine Kollegin will … – was rätst du?"). Ergebnisseite: Prozent, bestanden ab 75 %, Liste „Nochmal ansehen" mit Links zu den Lektionen der falsch beantworteten Fragen, bestes Ergebnis gespeichert; bei Bestehen Hinweis „Modul 2 folgt nach der Pilotphase".
- [ ] **Step 4:** Modultest-Seite im Renderer bauen (Fragen nacheinander, Ergebnis wie oben).
- [ ] **Step 5:** `node --test tests/` → PASS; MC-Verteilung nach Shuffle stichprobenartig im Browser ansehen.
- [ ] **Step 6:** Fach-Review mit `reviewer` auf 1.4–1.5 + Modultest; Funde einarbeiten.
- [ ] **Step 7:** Commit `content: Modul 1, Lektionen 1.4–1.5 und Modultest`.

---

### Task 9: Gesamtprüfung, Veröffentlichung, Pilot-Unterlagen

**Files:**
- Create: `README.md`, `LICENSE` (offizieller Text CC BY-NC-SA 4.0, Legal-Code-Link + Kurzfassung), `docs/pilot.md`

- [ ] **Step 1:** Abschluss-Review: Skill `lernprogramm-review` auf Modul 1 (1 Reviewer pro Lektion, dosiert laut Memory `feedback_lernprogramm_review_workflow.md`). Funde einarbeiten.
- [ ] **Step 2: Gerätecheck** per claude-in-chrome: Breiten 1280, 1024 (iPad quer), 768 (iPad hoch), 360; Route-Fehler, Reload, Werkzeugwechsel, Kopieren, Wiederholen, Modultest. Konsole fehlerfrei. Privates Fenster (localStorage evtl. eingeschränkt) → App läuft.
- [ ] **Step 3:** README (Was, für wen, Stufen, Stand, Lizenz, Autor, Link) und LICENSE schreiben.
- [ ] **Step 4:** Secret-Check vor Push (`git grep -iE "api[_-]?key|token\s*=|sk-"` → nur fachliche Erwähnungen). GitHub-Repo `vom-chat-zum-agenten` auf Account **marcolemke78-debug** anlegen (`gh repo create … --public`), pushen, GitHub Pages aus `main` / Root aktivieren.
- [ ] **Step 5:** Live-URL `https://marcolemke78-debug.github.io/vom-chat-zum-agenten/` öffnen und Kurzcheck wiederholen.
- [ ] **Step 6:** `docs/pilot.md`: Begleittext für Kolleg:innen (3–4 Sätze, Link, „ca. 1 Stunde für Modul 1, in Häppchen") und 5 Rückfragen für das Gespräch danach (Wo hängengeblieben? Welche Lektion zu lang? Was hat Lust auf mehr gemacht? Welches Werkzeug genutzt? Was fehlte?).
- [ ] **Step 7:** Commit + Push `docs: README, Lizenz, Pilot-Unterlagen`; Memory `project_vom_chat_zum_agenten.md` auf Stand „Pilot läuft" setzen.
