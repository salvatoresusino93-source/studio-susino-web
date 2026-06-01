(function () {
  const PRENOTA_BASE = 'https://referteco-production.up.railway.app/prenota';
  const EN = document.documentElement.lang === 'en';
  const homePage = EN ? 'index-en.html' : 'index.html';
  const listPage = EN ? 'ecografie-en.html' : 'ecografie.html';

  const T = EN
    ? {
        notFoundTitle: 'Exam not found',
        notFoundText: 'We could not find the page for this exam.',
        backToScans: 'Back to scans',
        notFoundDocTitle: 'Exam not found — Studio Susino',
        why: 'Why it is done',
        how: 'How it works',
        whatWeCheck: 'What we check',
        whatFor: 'What it is for',
        deepLink: 'Read more about this type of exam →',
        home: 'Home',
        scans: 'Scans',
        ctaTitle: 'Would you like to book this exam?',
        ctaText: 'Online in a few steps, or by phone if you prefer.',
        bookOnline: 'Book online',
        backToList: 'Back to the list',
        byPhone: 'By phone: ',
        disclaimer:
          'This information describes the exam in general terms. ' +
          'If you have any doubts, or to find out which exam is most suitable for you, ask your doctor or contact us.',
      }
    : {
        notFoundTitle: 'Esame non trovato',
        notFoundText: 'Non siamo riusciti a trovare la pagina di questo esame.',
        backToScans: 'Torna agli esami',
        notFoundDocTitle: 'Esame non trovato — Studio Susino',
        why: 'Perché si fa',
        how: 'Come si svolge',
        whatWeCheck: 'Cosa controlliamo',
        whatFor: 'A cosa serve',
        deepLink: 'Approfondimento su questo tipo di esame →',
        home: 'Home',
        scans: 'Ecografie',
        ctaTitle: 'Vuoi prenotare questo esame?',
        ctaText: 'Online in pochi passaggi, oppure al telefono se preferisci.',
        bookOnline: 'Prenota online',
        backToList: "Torna all'elenco",
        byPhone: 'Al telefono: ',
        disclaimer:
          'Queste informazioni descrivono l’esame in linea generale. ' +
          'Per dubbi o per sapere qual è l’esame più adatto da eseguire, rivolgiti al tuo medico oppure contattaci.',
      };

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const esame = (window.ESAMI || []).find((e) => e.id === id);
  const info = (window.ESAMI_PAZIENTE || {})[id];
  const main = document.getElementById('exam-main');

  if (!main) return;

  if (!esame) {
    main.innerHTML =
      '<section class="page-hero"><div class="container">' +
      '<h1>' + T.notFoundTitle + '</h1>' +
      '<p>' + T.notFoundText + '</p>' +
      '<p class="btn-stack"><a class="btn btn-primary" href="' + listPage + '">' + T.backToScans + '</a></p>' +
      '</div></section>';
    document.title = T.notFoundDocTitle;
    return;
  }

  const prenotaUrl =
    PRENOTA_BASE + '?esame=' + encodeURIComponent(esame.prenotaNome) + (EN ? '&lang=en' : '');

  const sintesi =
    info && info.sintesi ? info.sintesi : esame.descrizione.split('.')[0] + '.';

  // Titolo e meta gestiti da js/esame-head.js in <head>
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
      block(ICON.perche, T.why, info.perche) +
      block(ICON.svolgimento, T.how, info.svolgimento) +
      block(ICON.controlla, T.whatWeCheck, info.cosaControlla);
  } else {
    blocks = block(ICON.perche, T.whatFor, esame.descrizione);
  }

  const SEO_DEEP = EN
    ? {
        tiroide: 'ecografia-tiroide-en.html',
        'addome-completo': 'ecografia-addome-en.html',
        'addome-superiore': 'ecografia-addome-en.html',
        'addome-inferiore': 'ecografia-addome-en.html',
        'doppler-tsa': 'ecocolordoppler-carotidi-en.html',
        'doppler-arti-inferiori': 'ecocolordoppler-arti-inferiori-en.html',
        spalla: 'ecografia-muscolo-scheletrica-en.html',
        ginocchio: 'ecografia-muscolo-scheletrica-en.html',
        'muscolo-scheletrica': 'ecografia-muscolo-scheletrica-en.html',
      }
    : {
        tiroide: 'ecografia-tiroide.html',
        'addome-completo': 'ecografia-addome.html',
        'addome-superiore': 'ecografia-addome.html',
        'addome-inferiore': 'ecografia-addome.html',
        'doppler-tsa': 'ecocolordoppler-carotidi.html',
        'doppler-arti-inferiori': 'ecocolordoppler-arti-inferiori.html',
        spalla: 'ecografia-muscolo-scheletrica.html',
        ginocchio: 'ecografia-muscolo-scheletrica.html',
        'muscolo-scheletrica': 'ecografia-muscolo-scheletrica.html',
      };
  const deepLink = SEO_DEEP[esame.id];
  const deepBlock = deepLink
    ? '<p class="exam-deep-link"><a class="link-arrow" href="' +
      deepLink +
      '">' + T.deepLink + '</a></p>'
    : '';

  main.innerHTML =
    '<section class="page-hero exam-hero"><div class="container">' +
    '<p class="exam-breadcrumb"><a href="' + homePage + '">' + T.home + '</a> · <a href="' + listPage + '">' + T.scans + '</a> · ' +
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
    deepBlock +
    '<div class="exam-cta-card">' +
    '<h2>' + T.ctaTitle + '</h2>' +
    '<p>' + T.ctaText + '</p>' +
    '<div class="btn-stack exam-actions">' +
    '<a class="btn btn-primary" href="' +
    prenotaUrl +
    '" rel="noopener noreferrer">' + T.bookOnline + '</a>' +
    '<a class="btn btn-outline" href="' + listPage + '">' + T.backToList + '</a>' +
    '</div>' +
    '<p class="exam-note">' + T.byPhone +
    '<a href="tel:+390932954441">0932 954441</a> · ' +
    '<a href="tel:+393513746102">351 374 6102</a></p>' +
    '</div>' +
    '<p class="exam-disclaimer">' + T.disclaimer + '</p>' +
    '</div></section>';
})();
