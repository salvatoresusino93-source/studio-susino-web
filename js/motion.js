// Animazioni del sito: GSAP + ScrollTrigger (js/vendor) e scorrimento fluido con Lenis.
// Effetti di testo, sfondo e pulsanti ispirati a React Bits, riscritti senza React.
// Niente animazioni se il visitatore ha chiesto di ridurle o se GSAP non si carica:
// in quel caso il contenuto resta semplicemente visibile.
(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    root.classList.add('motion-done');
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    showAll();
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const header = document.querySelector('.site-header');

  // Divide un titolo in parole (stile "BlurText"): il testo resta leggibile dai lettori di schermo.
  function splitWords(el) {
    if (!el || el.dataset.split || el.children.length) return [];
    const words = el.textContent.trim().split(/\s+/);
    el.dataset.split = '1';
    el.textContent = '';
    return words.map((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      return span;
    });
  }

  function blurIn(targets, vars) {
    return gsap.from(targets, Object.assign({
      autoAlpha: 0,
      y: 18,
      filter: 'blur(8px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      clearProps: 'filter'
    }, vars));
  }

  // 1. Apertura della pagina (hero della home o intestazione delle altre pagine)
  const hero = document.querySelector('.hero');
  const pageHero = document.querySelector('.page-hero');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (hero) {
    const words = splitWords(hero.querySelector('h1'));
    const visual = hero.querySelector('.hero-visual');
    const img = visual && visual.querySelector('img');
    gsap.set(hero.querySelector('.container'), { visibility: 'visible' });

    // Onde concentriche sullo sfondo, come un'eco (solo decorazione)
    const echo = document.createElement('div');
    echo.className = 'hero-echo';
    echo.setAttribute('aria-hidden', 'true');
    echo.innerHTML = '<span></span><span></span><span></span><span></span>';
    hero.prepend(echo);

    tl.from(hero.querySelector('.hero-eyebrow'), { autoAlpha: 0, y: 12, duration: 0.6 })
      .add(blurIn(words, { duration: 0.9, stagger: 0.09 }), '-=0.3')
      .from(hero.querySelectorAll('.hero-tagline, .hero-lead'), { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1 }, '-=0.5')
      .from(hero.querySelectorAll('.hero-actions .btn'), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1 }, '-=0.45')
      .from(hero.querySelectorAll('.hero-trust li'), { autoAlpha: 0, x: -10, duration: 0.5, stagger: 0.08 }, '-=0.35');

    if (visual) {
      tl.from(visual, {
        clipPath: 'inset(12% 12% 12% 12% round 22px)',
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power4.out',
        clearProps: 'clipPath'
      }, 0.1);
      if (img) {
        tl.from(img, { scale: 1.18, duration: 1.6, ease: 'power3.out' }, 0.1);
        // Leggero effetto profondità mentre si scorre
        gsap.to(img, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: visual, start: 'top top+=80', end: 'bottom top', scrub: true }
        });
      }
    }
    tl.add(() => hero.classList.add('is-ready'));
  } else if (pageHero) {
    const container = pageHero.querySelector('.container');
    const h1 = pageHero.querySelector('h1');
    const words = splitWords(h1);
    const figure = pageHero.querySelector('.hero-figure');
    const others = Array.from(pageHero.querySelectorAll('.breadcrumb-nav, .hero-text > *, .container > *'))
      .filter((el) => el !== h1 && el !== figure && !el.classList.contains('hero-text') && !el.contains(h1) && !(figure && figure.contains(el)));
    gsap.set(container, { visibility: 'visible' });

    if (words.length) tl.add(blurIn(words, { stagger: 0.07 }), 0.05);
    else if (h1) tl.from(h1, { autoAlpha: 0, y: 16, duration: 0.7 }, 0.05);
    if (others.length) tl.from(others, { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, 0.25);
    if (figure) {
      tl.from(figure, { autoAlpha: 0, scale: 0.94, y: 16, duration: 0.9, ease: 'power3.out' }, 0.15);
    }
  }
  tl.add(showAll);

  // 2. Titoli delle sezioni: parole che compaiono sfocate e si mettono a fuoco
  document.querySelectorAll('.section-header h2, .intro-panel-inner h2, .cta-band h2').forEach((h2) => {
    const words = splitWords(h2);
    if (!words.length) return;
    blurIn(words, { scrollTrigger: { trigger: h2, start: 'top 95%', once: true } });
  });

  // 3. Schede e blocchi: entrano a gruppi, uno dopo l'altro
  const batchTargets = gsap.utils.toArray(
    '.service-card, .info-strip-item, .intro-panel-inner, .card, .onorario-card, .reach-box, .cta-band .container > :not(h2), .related-list > li'
  );
  if (batchTargets.length) {
    gsap.set(batchTargets, { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch(batchTargets, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        // La transizione CSS di :hover rallenterebbe l'animazione: sospesa finché entra.
        batch.forEach((el) => { el.style.transition = 'none'; });
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          overwrite: true,
          clearProps: 'transform,transition'
        });
      }
    });
  }

  // 4. Barra di avanzamento della lettura e intestazione che si "stacca" dal contenuto
  if (header) {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    header.appendChild(bar);
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
    const markScrolled = (y) => header.classList.toggle('is-scrolled', y > 8);
    markScrolled(window.scrollY);
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => markScrolled(self.scroll()) });
  }

  // 5. Luce che segue il puntatore sulle schede (stile "SpotlightCard"), solo con mouse
  if (finePointer) {
    document.querySelectorAll('.service-card, .info-strip-item, .card, .intro-panel-inner, .booking-card').forEach((card) => {
      card.classList.add('spotlight');
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });
  }

  // Le pagine con filtri o contenuti generati cambiano altezza: ricalcola le posizioni.
  window.addEventListener('load', () => ScrollTrigger.refresh());

  // 6. Scorrimento fluido (Lenis) solo su computer: sul telefono resta quello nativo.
  if (!finePointer) return;
  const script = document.createElement('script');
  script.src = 'js/vendor/lenis.min.js?v=1.3.26';
  script.async = true;
  script.onload = () => {
    if (!window.Lenis) return;
    const headerOffset = header ? header.offsetHeight + 16 : 80;
    const lenis = new window.Lenis({
      autoRaf: false,
      lerp: 0.12,
      wheelMultiplier: 0.9,
      anchors: { offset: -headerOffset }
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  };
  document.head.appendChild(script);
})();
