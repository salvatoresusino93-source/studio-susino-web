(function () {
  const PRENOTA_BASE = 'https://referteco-production.up.railway.app/prenota';
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const esame = (window.ESAMI || []).find((e) => e.id === id);
  const info = (window.ESAMI_PAZIENTE || {})[id];
  const main = document.getElementById('exam-main');

  if (!main) return;

  if (!esame) {
    main.innerHTML =
      '<section class="page-hero"><div class="container">' +
      '<h1>Esame non trovato</h1>' +
      '<p>Non siamo riusciti a trovare la pagina di questo esame.</p>' +
      '<p class="btn-stack"><a class="btn btn-primary" href="ecografie.html">Torna agli esami</a></p>' +
      '</div></section>';
    document.title = 'Esame non trovato — Studio Susino';
    return;
  }

  const prenotaUrl =
    PRENOTA_BASE + '?esame=' + encodeURIComponent(esame.prenotaNome);

  const sintesi =
    info && info.sintesi ? info.sintesi : esame.descrizione.split('.')[0] + '.';
  const metaText = sintesi.slice(0, 155);

  document.title = esame.nome + ' — Studio Susino';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = metaText;

  // Icone (stroke, ereditano il colore dal contenitore)
  const ICON = {
    perche:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    svolgimento:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>',
    controlla:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  };

  function block(icon, title, text) {
    if (!text) return '';
    return (
      '<article class="exam-block">' +
      '<span class="exam-block-icon" aria-hidden="true">' +
      icon +
      '</span>' +
      '<div class="exam-block-text">' +
      '<h2>' +
      title +
      '</h2>' +
      '<p>' +
      text +
      '</p>' +
      '</div>' +
      '</article>'
    );
  }

  let blocks = '';
  if (info) {
    blocks =
      block(ICON.perche, 'Perché si fa', info.perche) +
      block(ICON.svolgimento, 'Come si svolge', info.svolgimento) +
      block(ICON.controlla, 'Cosa controlliamo', info.cosaControlla);
  } else {
    blocks = block(ICON.perche, 'A cosa serve', esame.descrizione);
  }

  main.innerHTML =
    '<section class="page-hero exam-hero"><div class="container">' +
    '<p class="exam-breadcrumb"><a href="ecografie.html">Ecografie</a> · ' +
    esame.categoria +
    '</p>' +
    '<h1>' +
    esame.nome +
    '</h1>' +
    '<p class="exam-lead">' +
    sintesi +
    '</p>' +
    '</div></section>' +
    '<section class="content-block"><div class="container exam-detail">' +
    '<div class="exam-blocks">' +
    blocks +
    '</div>' +
    '<div class="exam-cta-card">' +
    '<h2>Vuoi prenotare questo esame?</h2>' +
    '<p>Online in pochi passaggi, oppure al telefono se preferisci.</p>' +
    '<div class="btn-stack exam-actions">' +
    '<a class="btn btn-primary" href="' +
    prenotaUrl +
    '" rel="noopener noreferrer">Prenota online</a>' +
    '<a class="btn btn-outline" href="ecografie.html">Torna all\'elenco</a>' +
    '</div>' +
    '<p class="exam-note">Al telefono: ' +
    '<a href="tel:+390932954441">0932 954441</a> · ' +
    '<a href="https://wa.me/393513746102" target="_blank" rel="noopener">351 374 6102 <span class="wa-tag">WhatsApp</span></a></p>' +
    '</div>' +
    '<p class="exam-disclaimer">Queste informazioni descrivono l’esame in linea generale. ' +
    'Per il tuo caso specifico fa sempre fede quanto indicato dal medico che ti ha prescritto l’esame.</p>' +
    '</div></section>';
})();
