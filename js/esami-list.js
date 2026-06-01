(function () {
  const container = document.getElementById('exam-lists');
  if (!container || !window.ESAMI) return;

  const paziente = window.ESAMI_PAZIENTE || {};
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
          const href = examPage + '?id=' + encodeURIComponent(e.id);
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
