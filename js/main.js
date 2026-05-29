(function () {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  const body = document.body;

  if (!toggle || !mobileNav) return;

  function setMenuOpen(open) {
    mobileNav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(!mobileNav.classList.contains('open'));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false);
  });
})();
