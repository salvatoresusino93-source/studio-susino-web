(function () {
  const container = document.getElementById('exam-lists');
  if (!container || !window.ESAMI) return;

  // L'elenco e' gia' scritto nell'HTML da scripts/genera-pagine-esami.js
  // (serve a Google, che non aspetta il JavaScript). Non lo ricostruiamo.
  if (container.children.length) return;

  const paziente = window.ESAMI_PAZIENTE || {};
  const slug = window.ESAMI_SLUG || {};
  const EN = document.documentElement.lang === 'en';
  const moreLabel = EN ? 'Learn more →' : 'Scopri di più →';
  const examPage = EN ? 'esame-en.html' : 'esame.html';

  const ordine = EN
    ? [
        'Abdomen',
        'Urinary tract and urology',
        'Thyroid and neck',
        'Musculoskeletal',
        'Paediatric',
        'Vascular (Doppler)',
        'Other',
      ]
    : [
        'Addome',
        'Apparato urinario e urologia',
        'Tiroide e collo',
        'Muscolo-scheletrico',
        'Pediatrica',
        'Vascolare (Doppler)',
        'Altro',
      ];

  const gruppi = new Map();
  for (const cat of ordine) gruppi.set(cat, []);
  for (const esame of ESAMI) {
    if (!gruppi.has(esame.categoria)) gruppi.set(esame.categoria, []);
    gruppi.get(esame.categoria).push(esame);
  }

  const slugCategoria = EN
    ? {
        Abdomen: 'addome',
        'Urinary tract and urology': 'apparato-urinario',
        'Thyroid and neck': 'tiroide-e-collo',
        Musculoskeletal: 'muscolo-scheletrico',
        Paediatric: 'pediatrica',
        'Vascular (Doppler)': 'doppler',
        Other: 'altro',
      }
    : {
        Addome: 'addome',
        'Apparato urinario e urologia': 'apparato-urinario',
        'Tiroide e collo': 'tiroide-e-collo',
        'Muscolo-scheletrico': 'muscolo-scheletrico',
        Pediatrica: 'pediatrica',
        'Vascolare (Doppler)': 'doppler',
        Altro: 'altro',
      };

  let html = '';
  for (const cat of ordine) {
    const items = gruppi.get(cat) || [];
    if (!items.length) continue;
    const id = slugCategoria[cat] || cat.toLowerCase().replace(/\s+/g, '-');
    html +=
      '<h2 id="' +
      id +
      '">' +
      cat +
      '</h2><ul class="exam-list">' +
      items
        .map((e) => {
          const info = paziente[e.id] || {};
          const sintesi = info.sintesi || e.descrizione.split('.')[0] + '.';
          // Pagina vera se esiste, altrimenti la vecchia pagina dinamica.
          const href = slug[e.id]
            ? slug[e.id] + (EN ? '-en' : '') + '.html'
            : examPage + '?id=' + encodeURIComponent(e.id);
          const imgSrc = 'images/esami/' + e.id + '.jpg?v=20260601rp';
          const imgAlt = e.nome;
          return (
            '<li class="exam-item">' +
            '<div class="exam-item-body">' +
            '<h3 class="exam-item-title">' +
            e.nome +
            '</h3>' +
            '<p class="exam-item-sintesi">' +
            sintesi +
            '</p>' +
            '<a class="exam-item-more link-arrow" href="' +
            href +
            '">' + moreLabel + '</a>' +
            '</div>' +
            '<div class="exam-item-thumb">' +
            '<img src="' +
            imgSrc +
            '" alt="' +
            imgAlt +
            '" width="88" height="88" loading="lazy">' +
            '</div>' +
            '</li>'
          );
        })
        .join('') +
      '</ul>';
  }
  container.innerHTML = html;
})();

// Ricerca e filtri: l'elenco resta presente nell'HTML per SEO e funziona anche senza JavaScript.
(function () {
  const finder = document.querySelector('.exam-finder');
  const container = document.getElementById('exam-lists');
  if (!finder || !container) return;

  const EN = document.documentElement.lang === 'en';
  const input = finder.querySelector('#exam-search');
  const filters = finder.querySelector('.exam-filters');
  const results = finder.querySelector('.exam-results');
  const clear = finder.querySelector('.exam-clear');
  const headings = Array.from(container.querySelectorAll(':scope > h2'));
  const sections = headings.map((heading) => ({
    heading,
    list: heading.nextElementSibling,
    id: heading.id,
    label: heading.textContent.trim(),
  }));
  let activeCategory = 'all';

  function normalise(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function makeFilter(id, label, current) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'exam-filter';
    button.dataset.category = id;
    button.textContent = label;
    button.setAttribute('aria-pressed', current ? 'true' : 'false');
    return button;
  }

  filters.appendChild(makeFilter('all', EN ? 'All' : 'Tutti', true));
  sections.forEach((section) => filters.appendChild(makeFilter(section.id, section.label, false)));

  function update() {
    const query = normalise(input.value);
    let count = 0;

    sections.forEach((section) => {
      let sectionCount = 0;
      const categoryMatches = activeCategory === 'all' || activeCategory === section.id;
      const items = Array.from(section.list.querySelectorAll('.exam-item'));

      items.forEach((item) => {
        const matches = categoryMatches && (!query || normalise(item.textContent).includes(query));
        item.hidden = !matches;
        if (matches) {
          sectionCount += 1;
          count += 1;
        }
      });

      section.heading.hidden = sectionCount === 0;
      section.list.hidden = sectionCount === 0;
    });

    const filtering = Boolean(query) || activeCategory !== 'all';
    clear.hidden = !filtering;
    results.textContent = filtering
      ? (count === 1
          ? (EN ? '1 scan found' : '1 esame trovato')
          : (EN ? `${count} scans found` : `${count} esami trovati`))
      : (EN ? `${count} scans available` : `${count} esami disponibili`);
    container.classList.toggle('is-filtering', filtering);
  }

  input.addEventListener('input', update);
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.exam-filter');
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll('.exam-filter').forEach((item) => {
      item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
    });
    update();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    activeCategory = 'all';
    filters.querySelectorAll('.exam-filter').forEach((item) => {
      item.setAttribute('aria-pressed', item.dataset.category === 'all' ? 'true' : 'false');
    });
    update();
    input.focus();
  });

  update();
})();
