# Vom Chat zum Agenten

Selbstlernkurs für Lehrkräfte: von der ersten Frage an einen KI-Chat bis zu KI-Agenten, die Aufgaben am Rechner erledigen.

**Zum Kurs:** https://marcolemke78-debug.github.io/vom-chat-zum-agenten/

## Für wen?

Für Lehrkräfte, die schon einmal einen KI-Chat wie ChatGPT benutzt haben, aber noch nicht wissen, was danach kommt. Begriffe wie Prompt, Kontextfenster, Skill, Hook oder Harness werden mit Beispielen aus dem Schulalltag und Bildern aus dem Alltag erklärt.

## Aufbau

Der Kurs geht in drei Stufen vor:

| Stufe | Modul | Werkzeug | Kosten |
|---|---|---|---|
| A | 1: KI verstehen und sicher nutzen | fobizz, ChatGPT oder Claude | kostenlos |
| B | 2: Claude als Werkstatt (folgt) | Claude im Browser | kostenlos |
| C | 3: Ausblick Agenten (folgt) | Claude Code und Co. | ab Claude Pro |

Jede Lektion dauert 10 bis 15 Minuten und hat vier Teile: ein Beispiel aus dem Schulalltag, die Idee dahinter, einen Auftrag zum Selbst-Ausprobieren und einen kurzen Check. Neue Begriffe landen in einem Karteikasten und kommen zum Wiederholen zurück. Nach jedem Modul gibt es einen Modultest.

Alle Werkzeug-Angaben haben den Stand 18.10.2026. KI-Werkzeuge ändern sich schnell, deshalb steht an jeder Lektion ein Stand-Datum.

## Datenschutz

Der Kurs speichert den Fortschritt nur im eigenen Browser (localStorage). Es gibt kein Konto, keine Anmeldung und keine Weitergabe von Kursdaten an Dritte. Beim Aufruf über GitHub Pages sieht der Hoster (GitHub) technisch bedingt die IP-Adresse. Inhaltlich vermittelt der Kurs eine klare Faustregel: keine personenbezogenen Daten in KI-Chats, Platzhalter nutzen, Training ausschalten, im Zweifel die Schulleitung fragen. Das ist keine Rechtsberatung.

## Technik

Reines HTML, CSS und JavaScript, ohne Framework, ohne Build, ohne externe Abhängigkeiten. Läuft auf Tablets und, lokal aus dem Ordner gestartet, auch offline.

- Lokal starten: `python3 -m http.server 8765` im Projektordner, dann http://localhost:8765 öffnen
- Tests: `node --test tests/`
- Browser-Prüfung (Playwright): `python3 tools/browser_check.py http://localhost:8765/`

Kursinhalte liegen als Daten in `js/data/` (Lektionen, Glossar, Demos). `js/validate.js` prüft sie bei jedem Testlauf.

## Lizenz und Autor

Marco Lemke, 2026. Inhalte lizenziert unter [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de): Schulen und Lehrkräfte dürfen den Kurs nutzen, anpassen und weitergeben, mit Namensnennung, nicht kommerziell und unter gleichen Bedingungen. Siehe `LICENSE`.
