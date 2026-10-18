"""
Browser-Pruefung fuer "Vom Chat zum Agenten" (Playwright, headless Chromium).

Aufruf (lokaler Server muss laufen, z. B. python3 -m http.server 8765):
  /Library/Frameworks/Python.framework/Versions/3.13/bin/python3 tools/browser_check.py [URL] [SCREENSHOT-ORDNER]

Prueft:
  - Konsole ohne Fehler auf allen Seiten
  - jede Lektion: alle vier Phasen, Kurz-Check komplett loesen, Selbsteinschaetzung
  - Fortschritt bleibt nach Neuladen erhalten
  - unbekannte Route landet auf der Startseite
  - kein horizontales Scrollen bei 360, 768, 1024, 1280 px Breite
  - App laeuft auch, wenn localStorage gesperrt ist
Gibt am Ende "OK" oder eine Fehlerliste aus (Exit-Code 1).
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
SHOTS = Path(sys.argv[2]) if len(sys.argv) > 2 else None
problems = []


def shot(page, name):
    if SHOTS:
        SHOTS.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(SHOTS / f'{name}.png'), full_page=True)


def watch_console(page, label):
    page.on('console', lambda m: m.type == 'error' and problems.append(f'{label}: Konsole: {m.text}'))
    page.on('pageerror', lambda e: problems.append(f'{label}: JS-Fehler: {e}'))


def no_overflow(page, label):
    over = page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
    if over > 1:
        problems.append(f'{label}: horizontales Scrollen ({over}px)')


def solve_quiz(page, lesson_id):
    """Loest den Kurz-Check, indem alle Antworten durchprobiert werden."""
    page.click('.phase-tab:nth-child(4)')
    for _ in range(10):
        item = page.locator('.quiz-item').last
        if item.locator('.mc-option').count():
            for btn in item.locator('.mc-option').all():
                if btn.is_enabled():
                    btn.click()
                if item.locator('.mc-option.correct').count():
                    break
        elif item.locator('.match-item').count():
            col = item.locator('.matching-col')
            lefts = col.nth(0).locator('.match-item')
            rights = col.nth(1).locator('.match-item')
            for i in range(lefts.count()):
                for j in range(rights.count()):
                    if rights.nth(j).is_disabled():
                        continue
                    lefts.nth(i).click()
                    rights.nth(j).click()
                    if lefts.nth(i).is_disabled():
                        break
        elif item.locator('.order-item').count():
            # Richtige Reihenfolge steht in den Daten - aus dem Fenster holen
            items = page.evaluate(
                f"(() => {{ const l = MODULE1.lessons.find(x => x.id === '{lesson_id}'); "
                f"const ex = l.quiz[document.querySelectorAll('.quiz-item').length - 1]; return ex.items; }})()")
            for text in items:
                item.locator('.order-item', has_text=text).first.click()
        nxt = item.locator('.quiz-next')
        if nxt.count():
            nxt.click()
        if page.locator('.self-check').count():
            return True
    problems.append(f'{lesson_id}: Kurz-Check liess sich nicht abschliessen')
    return False


with sync_playwright() as p:
    browser = p.chromium.launch()

    # --- Desktop: kompletter Durchlauf ---
    ctx = browser.new_context(viewport={'width': 1280, 'height': 900})
    page = ctx.new_page()
    watch_console(page, 'Desktop')
    page.goto(URL)
    page.wait_for_selector('.stairs')
    shot(page, 'start-1280')

    lesson_ids = page.evaluate('MODULE1.lessons.map(l => l.id)')
    for lid in lesson_ids:
        page.goto(URL + '#/lektion/' + lid)
        page.wait_for_selector('.phase-tabs')
        for n in range(1, 5):
            page.click(f'.phase-tab:nth-child({n})')
            no_overflow(page, f'{lid} Phase {n}')
        page.click('.phase-tab:nth-child(1)')
        shot(page, f'{lid}-moment')
        page.click('.phase-tab:nth-child(3)')
        shot(page, f'{lid}-praxis')
        if page.locator('.check-item input').count():
            page.locator('.check-item input').first.check()
        if solve_quiz(page, lid):
            page.locator('.confidence-row button').nth(2).click()
            if not page.locator('.lesson-done').count():
                problems.append(f'{lid}: nach Selbsteinschaetzung keine Abschlussmeldung')
        shot(page, f'{lid}-fertig')

    page.reload()
    page.wait_for_selector('.sidebar')
    done = page.locator('.nav-lessons .status-completed').count()
    if done != len(lesson_ids):
        problems.append(f'Neuladen: {done} von {len(lesson_ids)} Lektionen als erledigt markiert')
    page.goto(URL + '#/lektion/' + lesson_ids[0])
    page.click('.phase-tab:nth-child(3)')
    if page.locator('.check-item input').count() and not page.locator('.check-item input').first.is_checked():
        problems.append('Checkliste: Haken nach Neuladen verloren')

    page.goto(URL + '#/lektion/m9l9')
    page.wait_for_selector('.stairs', timeout=3000)

    # Karteikasten: eine Karte kuenstlich faellig machen, wiederholen, mit "Noch unsicher" bewerten
    page.evaluate("""(() => {
      const d = JSON.parse(localStorage.getItem('vcza_v1'));
      const id = Object.keys(d.cards)[0];
      d.cards[id].dueDate = Leitner.today();
      localStorage.setItem('vcza_v1', JSON.stringify(d));
    })()""")
    page.goto(URL + '#/start')
    page.wait_for_selector('.due-box', timeout=3000)
    page.goto(URL + '#/wiederholen')
    page.wait_for_selector('.flashcard')
    shot(page, 'karte-vorn')
    page.click('.flashcard .btn-primary')
    shot(page, 'karte-hinten')
    page.locator('.flashcard .confidence-row button').first.click()
    page.wait_for_selector('.review-empty', timeout=3000)
    tomorrow = page.evaluate("Leitner.addDays(Leitner.today(), 1)")
    due_tomorrow = page.evaluate(f"Progress.getDueCards('{tomorrow}').length")
    if due_tomorrow < 1:
        problems.append('Wiederholen: Karte mit "Noch unsicher" ist morgen nicht faellig')

    # Glossar-Suche
    page.goto(URL + '#/glossar')
    page.fill('.glossary-search', 'Hook')
    if page.locator('.glossary-item').count() != 1:
        problems.append('Glossar: Suche nach Hook liefert nicht genau 1 Treffer')
    page.fill('.glossary-search', 'xyzxyz')
    if not page.locator('.glossary-empty').is_visible():
        problems.append('Glossar: kein Leer-Hinweis')

    for route in ['#/glossar', '#/wiederholen', '#/test/m1test']:
        page.goto(URL + route)
        page.wait_for_timeout(200)
        shot(page, route.strip('#/').replace('/', '-') + '-1280')
    ctx.close()

    # --- Breiten ---
    for w, h in [(360, 740), (768, 1024), (1024, 768)]:
        ctx = browser.new_context(viewport={'width': w, 'height': h}, has_touch=True)
        page = ctx.new_page()
        watch_console(page, f'{w}px')
        for route in ['', '#/lektion/' + lesson_ids[0], '#/glossar', '#/wiederholen', '#/test/m1test']:
            page.goto(URL + route)
            page.wait_for_timeout(200)
            if route.startswith('#/lektion'):
                for n in range(1, 5):
                    page.click(f'.phase-tab:nth-child({n})')
                    no_overflow(page, f'{w}px {route} Phase {n}')
            else:
                no_overflow(page, f'{w}px {route or "start"}')
        shot(page, f'test-{w}')
        page.goto(URL + '#/lektion/' + lesson_ids[0])
        shot(page, f'lektion-{w}')
        ctx.close()

    # --- localStorage gesperrt ---
    ctx = browser.new_context()
    ctx.add_init_script("""Object.defineProperty(window, 'localStorage', {get() { throw new Error('SecurityError'); }});""")
    page = ctx.new_page()
    watch_console(page, 'ohne localStorage')
    page.goto(URL)
    page.wait_for_selector('.stairs', timeout=3000)
    if not page.locator('.notice').count():
        problems.append('ohne localStorage: kein Hinweis angezeigt')
    page.goto(URL + '#/lektion/' + lesson_ids[0])
    page.wait_for_selector('.phase-tabs', timeout=3000)
    ctx.close()

    browser.close()

if problems:
    print('PROBLEME:')
    for pr in problems:
        print(' -', pr)
    sys.exit(1)
print('OK')
