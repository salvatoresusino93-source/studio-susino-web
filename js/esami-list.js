(function () {
  const container = document.getElementById('exam-lists');
  if (!container || !window.ESAMI) return;

  const ordine = [
    'Addome',
    'Apparato urinario e urologia',
    'Tiroide e collo',
    'Muscolo-scheletrico',
    'Vascolare (Doppler)',
    'Altro',
  ];

  const gruppi = new Map();
  for (const cat of ordine) gruppi.set(cat, []);
  for (const esame of ESAMI) {
    if (!gruppi.has(esame.categoria)) gruppi.set(esame.categoria, []);
    gruppi.get(esame.categoria).push(esame);
  }

  let html = '';
  for (const cat of ordine) {
    const items = gruppi.get(cat) || [];
    if (!items.length) continue;
    html +=
      '<h2>' +
      cat +
      '</h2><ul class="tag-list">' +
      items
        .map(
          (e) =>
            '<li><a class="exam-link" href="esame.html?id=' +
            encodeURIComponent(e.id) +
            '">' +
            e.nome +
            '</a></li>'
        )
        .join('') +
      '</ul>';
  }
  container.innerHTML = html;
})();
