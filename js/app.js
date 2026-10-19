/**
 * Vom Chat zum Agenten - Router und Start.
 *
 * Jede Seite hat eine eigene Adresse hinter dem #, z. B. #/lektion/m1l2.
 * So funktionieren Zurueck-Button, Lesezeichen und geteilte Links.
 */

// Adresse (hash) in eine Seite uebersetzen. Alles Unbekannte fuehrt zur
// Startseite - ein vertippter Link soll nie auf einer leeren Seite enden.
function parseRoute(hash, knownLessonIds, knownTestIds) {
  const parts = (hash || '').replace(/^#\/?/, '').split('/');
  const [page, id] = parts;
  if (page === 'lektion' && knownLessonIds.includes(id)) return { page: 'lesson', id };
  if (page === 'test' && knownTestIds.includes(id)) return { page: 'test', id };
  if (page === 'glossar' && parts.length === 1) return { page: 'glossary' };
  if (page === 'wiederholen' && parts.length === 1) return { page: 'review' };
  return { page: 'start' };
}

if (typeof module !== 'undefined') module.exports = { parseRoute };

if (typeof document !== 'undefined') {
  // Der ganze Kurs an einem Ort. Modul 2 und 3 sind angekuendigt, aber noch leer.
  const COURSE = {
    glossary: GLOSSARY,
    demos: DEMOS,
    modules: [
      MODULE1,
      { id: 2, title: 'Claude als Werkstatt', stage: 'B', lessons: [], planned: true },
      { id: 3, title: 'Ausblick: Agenten', stage: 'C', lessons: [], planned: true }
    ]
  };

  const allLessonIds = () => COURSE.modules.flatMap(m => m.lessons.map(l => l.id));
  const allTestIds = () => COURSE.modules.filter(m => m.test).map(m => m.test.id);

  let wantTour = false;

  function show() {
    if (location.hash === '#/tour') wantTour = true;
    const route = parseRoute(location.hash, allLessonIds(), allTestIds());
    if (route.page === 'lesson' || route.page === 'test') Progress.setLastRoute(location.hash);
    Renderer.render(COURSE, route);
    document.body.classList.remove('nav-open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    // Einfuehrung: beim ersten Besuch der Startseite oder auf Wunsch (#/tour)
    if (location.hash === '#/tour') history.replaceState(null, '', '#/start');
    if (route.page === 'start' && (wantTour || !Progress.getTourSeen())) {
      wantTour = false;
      Tour.start(() => Progress.setTourSeen());
    } else {
      Tour.stop();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const errors = validateCourse(COURSE);
    errors.forEach(e => console.warn('[Kursinhalt] ' + e));

    document.getElementById('menu-toggle').addEventListener('click', (e) => {
      const open = document.body.classList.toggle('nav-open');
      e.currentTarget.setAttribute('aria-expanded', String(open));
    });

    // Skip-Link: zum Inhalt springen, ohne den Router auszuloesen
    document.querySelector('.skip-link').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('content').focus();
    });

    // Menue auf schmalen Bildschirmen schliessen: Tippen neben das Menue,
    // auf einen Menue-Link (auch die gerade offene Seite) oder Escape
    function closeNav() {
      document.body.classList.remove('nav-open');
      document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    }
    document.getElementById('nav-backdrop').addEventListener('click', closeNav);
    document.getElementById('sidebar').addEventListener('click', (e) => {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('hashchange', show);
    show();
  });
}
