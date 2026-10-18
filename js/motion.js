// Movimento sobrio: scorrimento fluido (Lenis) e comparsa delle sezioni (GSAP + ScrollTrigger).
// Micro-interazioni e ingresso del titolo della home sono solo CSS (css/style.css).
// Se l'utente riduce le animazioni o le librerie non arrivano dal CDN, non succede nulla:
// il contenuto resta visibile e statico.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion-ready');

  // 1. Scorrimento fluido, sincronizzato con ScrollTrigger (sul touch resta quello nativo)
  const header = document.querySelector('.site-header');
  const lenis = new window.Lenis({
    autoRaf: false,
    lerp: 0.12,
    anchors: { offset: -((header ? header.offsetHeight : 64) + 16) }
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Con il menu mobile aperto la pagina sotto non deve scorrere
  new MutationObserver(() => {
    if (document.body.classList.contains('menu-open')) lenis.stop();
    else lenis.start();
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // 2. Comparsa delle sezioni: solo per ciò che al caricamento è ancora sotto lo schermo,
  // così l'apertura della pagina non viene mai nascosta né ritardata.
  const targets = gsap.utils.toArray(
    '.intro-panel-inner, .section-header, .service-card, .info-strip-item, .reach-box, ' +
    '.cta-band .container, .review-invite .container, .card, .booking-card, .onorario-card, ' +
    '.notice, .faq details, .related-list > li, .exam-item'
  ).filter((el) => {
    if (el.closest('.hero, .page-hero')) return false;
    const rect = el.getBoundingClientRect();
    return rect.height > 0 && rect.top > window.innerHeight;
  });

  if (targets.length) {
    // Solo opacity (non visibility): gli elementi restano raggiungibili con il tasto Tab.
    gsap.set(targets, { opacity: 0, y: 16 });
    ScrollTrigger.batch(targets, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        // Le transizioni CSS di :hover rallenterebbero il tween: sospese finché entra.
        batch.forEach((el) => { el.style.transition = 'none'; });
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
          overwrite: true,
          clearProps: 'transform,transition'
        });
      }
    });

    // Se il focus da tastiera arriva dentro un elemento non ancora comparso, mostralo subito.
    document.addEventListener('focusin', (event) => {
      const el = targets.find((t) => t.contains(event.target));
      if (el && +gsap.getProperty(el, 'opacity') < 1) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.2, overwrite: true, clearProps: 'transform,transition' });
      }
    });
  }

  // I filtri della pagina ecografie cambiano l'altezza dell'elenco: ricalcola le posizioni.
  const finder = document.querySelector('.exam-finder');
  if (finder) {
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    finder.addEventListener('input', refresh);
    finder.addEventListener('click', refresh);
  }
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
