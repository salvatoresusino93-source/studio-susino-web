(function () {
  const container = document.getElementById('exam-lists');
  if (!container || !window.ESAMI) return;

  const paziente = window.ESAMI_PAZIENTE || {};

  const ordine = [
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

  const slugCategoria = {
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
          const href = 'esame.html?id=' + encodeURIComponent(e.id);
          return (
            '<li class="exam-item">' +
            '<h3 class="exam-item-title">' +
            e.nome +
            '</h3>' +
            '<p class="exam-item-sintesi">' +
            sintesi +
            '</p>' +
            '<a class="exam-item-more link-arrow" href="' +
            href +
            '">Scopri di più →</a>' +
            '</li>'
          );
        })
        .join('') +
      '</ul>';
  }
  container.innerHTML = html;
})();
