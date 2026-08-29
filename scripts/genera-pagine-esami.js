#!/usr/bin/env node
/**
 * Genera una pagina HTML vera (statica) per ogni esame.
 *
 * PERCHE': prima gli esami vivevano solo su esame.html?id=xxx, una pagina vuota
 * riempita da JavaScript. Google la vede bianca e non la indicizza. Qui le
 * pagine nascono gia' scritte nell'HTML, con testo, dati strutturati e FAQ.
 *
 * Uso:  node scripts/genera-pagine-esami.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://studiosusino.it';

/* ------------------------------------------------------------------ */
/* Onorario                                                            */
/* Metti MOSTRA: true quando la pagina tariffe.html e' online.          */
/* ------------------------------------------------------------------ */
const ONORARIO = {
  MOSTRA: true,
  IMPORTO: '80 €',
  IT: 'Onorario unico di 80 €, uguale per ogni esame: comprende l’esame, il referto scritto consegnato subito e la spiegazione a voce.',
  EN: 'A single fee of €80 for every exam: includes the scan, the written report handed to you straight away and a spoken explanation.',
  PAGINA_IT: 'tariffe.html',
  PAGINA_EN: 'tariffe-en.html',
};

/* Mappa id -> nome file, condivisa con generate-sitemap.js */
const { SLUG, GIA_ESISTENTI } = require('./esami-mappa');

/* Preparazione richiesta, per esame */
const DIGIUNO = ['addome-completo', 'addome-superiore', 'doppler-aorta', 'doppler-arterie-renali'];
const VESCICA_PIENA = ['addome-inferiore', 'apparato-urinario', 'vescico-prostatica'];

/* ------------------------------------------------------------------ */
/* Utilita'                                                            */
/* ------------------------------------------------------------------ */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function json(s) {
  // testo dentro un JSON-LD: via i tag, virgolette normalizzate
  return String(s).replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();
}

/** Carica un file js/*.js che assegna una variabile su window */
function carica(file, nomeVar) {
  const src = fs.readFileSync(path.join(ROOT, 'js', file), 'utf8');
  const sandbox = { window: {} };
  new Function('window', src).call(sandbox, sandbox.window);
  return sandbox.window[nomeVar];
}

const ESAMI = carica('esami-data.js', 'ESAMI');
const PAZIENTE = carica('esami-paziente.js', 'ESAMI_PAZIENTE');
const ESAMI_EN = carica('esami-data-en.js', 'ESAMI');
const PAZIENTE_EN = carica('esami-paziente-en.js', 'ESAMI_PAZIENTE');

/* ------------------------------------------------------------------ */
/* Testi                                                               */
/* ------------------------------------------------------------------ */
const T = {
  it: {
    lang: 'it',
    locale: 'it_IT',
    home: 'Home',
    scans: 'Ecografie',
    listPage: 'ecografie.html',
    aboutPage: 'chi-sono.html',
    studioPage: 'studio.html',
    contactPage: 'contatti.html',
    bookPage: 'prenota.html',
    navChiSono: 'Chi sono',
    navEcografie: 'Ecografie',
    navStudio: 'Lo studio',
    navContatti: 'Contatti',
    navPrenota: 'Prenota',
    navPrenotaLong: 'Prenota online',
    altLang: 'EN',
    altLangLabel: 'English version',
    hWhat: 'A cosa serve',
    hWhy: 'Perché si fa',
    hHow: 'Come si svolge',
    hCheck: 'Cosa controllo',
    hPrep: 'Serve preparazione?',
    hFee: 'Quanto costa',
    hFaq: 'Domande frequenti',
    hRelated: 'Esami correlati',
    feeMore: 'Vedi le tariffe',
    prepNone:
      'No. Per questo esame <strong>non serve digiuno né alcuna preparazione</strong>. Se hai referti o ecografie precedenti portali con te: aiutano a confrontare e a seguire l’evoluzione nel tempo.',
    prepFasting:
      'Sì: è consigliato il <strong>digiuno da 6-8 ore</strong>, perché lo stomaco e l’intestino pieni di aria coprono la vista di fegato, colecisti e pancreas. Puoi bere acqua e prendere i farmaci abituali. Porta con te eventuali esami precedenti.',
    prepBladder:
      'Sì: serve arrivare con la <strong>vescica piena</strong>. Bevi circa un litro d’acqua un’ora prima e non urinare fino all’esame: la vescica distesa fa da finestra e permette di vedere bene gli organi del bacino.',
    bookThis: 'Prenota questo esame',
    call: 'Chiama',
    ctaTitle: 'Vuoi prenotare questo esame?',
    ctaText: 'Online in pochi passaggi, oppure al telefono. Si riceve su appuntamento a Pozzallo (RG).',
    bookOnline: 'Prenota online',
    allExams: 'Vedi tutti gli esami',
    disclaimer:
      'Queste informazioni descrivono l’esame in linea generale e non sostituiscono il parere del medico. Per sapere qual è l’esame più adatto al tuo caso, rivolgiti al tuo medico curante oppure contattami.',
    seeAlso: 'Vedi anche tutti gli',
    seeAlsoLink: 'esami ecografici disponibili',
    seeAlsoTail: 'oppure le informazioni su',
    studioWord: 'lo studio',
    andWord: 'e i',
    contactWord: 'contatti',
    titleTail: 'a Pozzallo (RG)',
    descTail: ' Studio a Pozzallo (RG): prenota online o al telefono.',
    lead: (nome) => `${nome} eseguita personalmente dal medico radiologo, su appuntamento, nello studio di Pozzallo (RG). Referto e spiegazione al termine dell’esame.`,
    faq: (nome, prep) => [
      {
        q: `L’${nome.toLowerCase()} fa male?`,
        a: 'No, è un esame indolore. Si appoggia la sonda sulla pelle con un po’ di gel. Usa gli ultrasuoni, non le radiazioni: è sicuro e si può ripetere quante volte serve, anche in gravidanza e nei bambini.',
      },
      { q: 'Serve preparazione?', a: prep },
      {
        q: 'Serve l’impegnativa del medico?',
        a: 'Per la prestazione privata non è obbligatoria. Se hai la richiesta del medico portala con te, insieme a eventuali esami precedenti: aiuta a indirizzare l’ecografia sul quesito giusto.',
      },
      {
        q: 'Quanto dura e quando ho il referto?',
        a: 'L’esame dura in genere pochi minuti. Al termine ti consegno subito il referto scritto e ti spiego con parole semplici cosa è emerso e se servono altri controlli.',
      },
    ],
  },
  en: {
    lang: 'en',
    locale: 'en_US',
    home: 'Home',
    scans: 'Scans',
    listPage: 'ecografie-en.html',
    aboutPage: 'chi-sono-en.html',
    studioPage: 'studio-en.html',
    contactPage: 'contatti-en.html',
    bookPage: 'prenota-en.html',
    navChiSono: 'About me',
    navEcografie: 'Scans',
    navStudio: 'The practice',
    navContatti: 'Contact',
    navPrenota: 'Book',
    navPrenotaLong: 'Book online',
    altLang: 'IT',
    altLangLabel: 'Versione italiana',
    hWhat: 'What it is for',
    hWhy: 'Why it is done',
    hHow: 'How it works',
    hCheck: 'What I check',
    hPrep: 'Is any preparation needed?',
    hFee: 'How much it costs',
    hFaq: 'Frequently asked questions',
    hRelated: 'Related scans',
    feeMore: 'See fees',
    prepNone:
      'No. This scan needs <strong>no fasting and no preparation</strong>. If you have previous reports or scans, bring them with you: they help to compare and follow any change over time.',
    prepFasting:
      'Yes: <strong>fasting for 6-8 hours</strong> is recommended, because a full stomach and bowel gas hide the liver, gallbladder and pancreas. You may drink water and take your usual medication. Bring any previous scans with you.',
    prepBladder:
      'Yes: you need to arrive with a <strong>full bladder</strong>. Drink about a litre of water an hour before and do not go to the toilet until the scan: a full bladder acts as a window onto the pelvic organs.',
    bookThis: 'Book this scan',
    call: 'Call',
    ctaTitle: 'Would you like to book this scan?',
    ctaText: 'Online in a few steps, or by phone. By appointment in Pozzallo (RG), Italy.',
    bookOnline: 'Book online',
    allExams: 'See all scans',
    disclaimer:
      'This information describes the scan in general terms and does not replace your doctor’s advice. To find out which exam suits your case, ask your doctor or contact me.',
    seeAlso: 'See all the',
    seeAlsoLink: 'ultrasound scans available',
    seeAlsoTail: 'or read about',
    studioWord: 'the practice',
    andWord: 'and',
    contactWord: 'contact details',
    titleTail: 'in Pozzallo (RG), Italy',
    descTail: ' Practice in Pozzallo (RG), Italy: book online or by phone.',
    lead: (nome) => `${nome} performed personally by the radiologist, by appointment, at the practice in Pozzallo (RG), Italy. Report and explanation at the end of the scan.`,
    faq: (nome, prep) => [
      {
        q: `Does the ${nome.toLowerCase()} hurt?`,
        a: 'No, it is painless. The probe is placed on the skin with a little gel. It uses ultrasound, not radiation: it is safe and can be repeated as often as needed, including during pregnancy and in children.',
      },
      { q: 'Is any preparation needed?', a: prep },
      {
        q: 'Do I need a referral from my doctor?',
        a: 'For a private appointment it is not compulsory. If you have a referral, bring it along with any previous scans: it helps to focus the examination on the right clinical question.',
      },
      {
        q: 'How long does it take and when do I get the report?',
        a: 'The scan usually takes a few minutes. At the end I hand you the written report and explain in plain words what was found and whether further checks are needed.',
      },
    ],
  },
};

const TEL1 = '+39 0932 954441';
const TEL2 = '+39 351 374 6102';
const PRENOTA_BASE = 'https://referteco-production.up.railway.app/prenota';

/* ------------------------------------------------------------------ */
/* Costruzione della pagina                                            */
/* ------------------------------------------------------------------ */
function preparazione(id, t) {
  if (DIGIUNO.includes(id)) return t.prepFasting;
  if (VESCICA_PIENA.includes(id)) return t.prepBladder;
  return t.prepNone;
}

function testoSenzaTag(html) {
  return html.replace(/<[^>]*>/g, '');
}

function paginaEsame(esame, info, t, tuttiEsami, isEN) {
  const slug = SLUG[esame.id];
  const file = isEN ? slug + '-en.html' : slug + '.html';
  const fileAlt = isEN ? slug + '.html' : slug + '-en.html';
  const url = `${BASE}/${file}`;
  const urlIt = `${BASE}/${slug}.html`;
  const urlEn = `${BASE}/${slug}-en.html`;

  const sintesi = (info && info.sintesi) || esame.descrizione.split('.')[0] + '.';

  let title = `${esame.nome} ${t.titleTail} | Dr. Susino`;
  if (title.length > 62) title = `${esame.nome} ${t.titleTail}`;

  const description = (sintesi + t.descTail).slice(0, 158);
  const prep = preparazione(esame.id, t);
  // Alle 4 domande comuni si aggiungono, se presenti, quelle specifiche
  // dell'esame (info.faqExtra): servono a dare a ogni pagina contenuto
  // proprio invece di ripetere lo stesso blocco su tutte.
  const faq = t.faq(esame.nome, testoSenzaTag(prep)).concat(
    info && Array.isArray(info.faqExtra) ? info.faqExtra : []
  );

  const correlati = tuttiEsami
    .filter((e) => e.categoria === esame.categoria && e.id !== esame.id && SLUG[e.id])
    .slice(0, 5);

  const img = `images/esami/${esame.id}.jpg`;

  // Link diretto alla prenotazione con l'esame gia' selezionato: un passaggio in meno.
  const prenotaUrl =
    PRENOTA_BASE +
    '?esame=' +
    encodeURIComponent(esame.prenotaNome || esame.nome) +
    (isEN ? '&lang=en' : '');

  const feeBlock = ONORARIO.MOSTRA
    ? `
        <h2>${t.hFee}</h2>
        <p>
          ${isEN ? ONORARIO.EN : ONORARIO.IT}
          <a href="${isEN ? ONORARIO.PAGINA_EN : ONORARIO.PAGINA_IT}">${t.feeMore}</a>
        </p>
`
    : '';

  const correlatiBlock = correlati.length
    ? `
        <h2>${t.hRelated}</h2>
        <ul class="related-list">
${correlati
  .map(
    (e) =>
      `          <li><a href="${SLUG[e.id]}${isEN ? '-en' : ''}.html">${esc(e.nome)}</a></li>`
  )
  .join('\n')}
        </ul>
`
    : '';

  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#586570">
  <link rel="icon" href="images/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="images/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="it" href="${urlIt}">
  <link rel="alternate" hreflang="en" href="${urlEn}">
  <link rel="alternate" hreflang="x-default" href="${urlIt}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/${img}">
  <meta property="og:site_name" content="Studio Ecografico Dr. Salvatore Susino">
  <meta property="og:locale" content="${t.locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${BASE}/${img}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=20260803">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "${t.home}", "item": "${BASE}/${isEN ? 'index-en.html' : ''}" },
      { "@type": "ListItem", "position": 2, "name": "${t.scans}", "item": "${BASE}/${t.listPage}" },
      { "@type": "ListItem", "position": 3, "name": "${json(esame.nome)}", "item": "${url}" }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "${json(esame.nome)}",
    "description": "${json(sintesi)}",
    "url": "${url}",
    "usesDevice": { "@type": "MedicalDevice", "name": "Ecografo" },
    "availableAtOrFrom": {
      "@type": "MedicalBusiness",
      "@id": "${BASE}/#business",
      "name": "Studio Ecografico Dr. Salvatore Susino",
      "telephone": ["+39-0932-954441", "+39-351-3746102"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via dell'Arno, 34",
        "postalCode": "97016",
        "addressLocality": "Pozzallo",
        "addressRegion": "RG",
        "addressCountry": "IT"
      }
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${faq
  .map(
    (f) => `      {
        "@type": "Question",
        "name": "${json(f.q)}",
        "acceptedAnswer": { "@type": "Answer", "text": "${json(f.a)}" }
      }`
  )
  .join(',\n')}
    ]
  }
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="${isEN ? 'index-en.html' : '/'}" aria-label="Studio Ecografico Dr. Salvatore Susino — home">
        <img
          class="logo-mark"
          src="images/logo-mark.png"
          srcset="images/logo-mark.png 1x, images/logo-mark@2x.png 2x"
          alt=""
          width="36"
          height="49"
        >
        <span class="logo-word">Salvatore Susino</span>
      </a>
      <nav class="nav-desktop" aria-label="Menu">
        <a href="${t.aboutPage}">${t.navChiSono}</a>
        <a href="${t.listPage}" aria-current="page">${t.navEcografie}</a>
        <a href="${t.studioPage}">${t.navStudio}</a>
        <a href="${t.contactPage}">${t.navContatti}</a>
        <a class="lang-switch" href="${fileAlt}" hreflang="${isEN ? 'it' : 'en'}" aria-label="${t.altLangLabel}">${t.altLang}</a>
        <a class="btn btn-primary" href="${t.bookPage}">${t.navPrenota}</a>
      </nav>
      <button class="menu-toggle" type="button" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="nav-mobile" aria-label="Menu">
      <a href="${t.aboutPage}">${t.navChiSono}</a>
      <a href="${t.listPage}">${t.navEcografie}</a>
      <a href="${t.studioPage}">${t.navStudio}</a>
      <a href="${t.contactPage}">${t.navContatti}</a>
      <a class="lang-switch" href="${fileAlt}" hreflang="${isEN ? 'it' : 'en'}" aria-label="${t.altLangLabel}">${t.altLang}</a>
      <a class="btn btn-primary" href="${t.bookPage}">${t.navPrenotaLong}</a>
    </nav>
  </header>

  <main>
    <section class="page-hero">
      <div class="container exam-hero-grid">
        <div class="hero-text">
          <nav class="breadcrumb-nav" aria-label="${t.home}"><ol><li><a href="${isEN ? 'index-en.html' : '/'}">${t.home}</a></li><li><a href="${t.listPage}">${t.scans}</a></li><li aria-current="page">${esc(esame.nome)}</li></ol></nav>
          <h1>${esc(esame.nome)} ${isEN ? 'in Pozzallo' : 'a Pozzallo'}</h1>
          <p>${esc(t.lead(esame.nome))}</p>
        </div>
        <figure class="hero-figure">
          <img src="${img}?v=20260803" alt="${esc(esame.nome)}" loading="lazy" width="700" height="603">
        </figure>
      </div>
    </section>

    <section class="content-block">
      <div class="container">
        <h2>${t.hWhat}</h2>
        <p>${esc(esame.descrizione)}</p>
${info && info.perche ? `
        <h2>${t.hWhy}</h2>
        <p>${esc(info.perche)}</p>
` : ''}${info && info.svolgimento ? `
        <h2>${t.hHow}</h2>
        <p>${esc(info.svolgimento)}</p>
` : ''}${info && info.cosaControlla ? `
        <h2>${t.hCheck}</h2>
        <p>${esc(info.cosaControlla)}</p>
` : ''}
        <h2>${t.hPrep}</h2>
        <p>${prep}</p>
${feeBlock}
        <div class="btn-stack content-spaced">
          <a class="btn btn-primary" href="${esc(prenotaUrl)}" rel="noopener">${t.bookThis}</a>
          <a class="btn btn-outline" href="tel:+390932954441">${t.call} ${TEL1}</a>
          <a class="btn btn-outline" href="tel:+393513746102">${t.call} ${TEL2}</a>
        </div>

        <h2>${t.hFaq}</h2>
        <div class="faq">
${faq
  .map(
    (f) => `          <details>
            <summary>${esc(f.q)}</summary>
            <p>${f.a}</p>
          </details>`
  )
  .join('\n')}
        </div>
${correlatiBlock}
        <p class="content-spaced">
          ${t.seeAlso} <a href="${t.listPage}">${t.seeAlsoLink}</a> ${t.seeAlsoTail}
          <a href="${t.studioPage}">${t.studioWord}</a> ${t.andWord}
          <a href="${t.contactPage}">${t.contactWord}</a>.
        </p>

        <p class="exam-disclaimer">${t.disclaimer}</p>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2>${t.ctaTitle}</h2>
        <p>${t.ctaText}</p>
        <a class="btn btn-primary" href="${esc(prenotaUrl)}" rel="noopener">${t.bookOnline}</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div><strong>Studio Ecografico Dr. Salvatore Susino</strong> Via dell'Arno, 34 — Pozzallo (RG)<br>${isEN ? 'Mon–Fri' : 'Lun–Ven'} 9:00–12:30 · 15:00–19:00</div>
      <div>Tel. <a href="tel:+390932954441">${TEL1}</a> · <a href="tel:+393513746102">${TEL2}</a></div>
      <div class="footer-links"><a href="${t.bookPage}">${t.navPrenota}</a></div>
    </div>
  </footer>
  <script src="js/main.js?v=20260601" defer></script>
<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "0510c857500244ef9115f66be08e0432"}'></script><!-- End Cloudflare Web Analytics -->
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* Esecuzione                                                          */
/* ------------------------------------------------------------------ */
let creati = 0;
let saltati = 0;

for (const [lista, paziente, t, isEN] of [
  [ESAMI, PAZIENTE, T.it, false],
  [ESAMI_EN, PAZIENTE_EN, T.en, true],
]) {
  for (const esame of lista) {
    if (!SLUG[esame.id]) {
      console.warn('  ! nessuno slug per: ' + esame.id);
      continue;
    }
    if (GIA_ESISTENTI[esame.id]) {
      saltati++;
      continue;
    }
    const slug = SLUG[esame.id];
    const file = isEN ? slug + '-en.html' : slug + '.html';
    fs.writeFileSync(
      path.join(ROOT, file),
      paginaEsame(esame, paziente[esame.id], t, lista, isEN),
      'utf8'
    );
    creati++;
  }
}

/* --- Mappa id -> pagina, usata da js/esami-list.js --------------- */
fs.writeFileSync(
  path.join(ROOT, 'js/esami-slug.js'),
  '/* GENERATO da scripts/genera-pagine-esami.js — non modificare a mano */\n' +
    'window.ESAMI_SLUG = ' +
    JSON.stringify(SLUG, null, 2) +
    ';\n',
  'utf8'
);

/* --- Elenco esami scritto direttamente in ecografie.html --------- */
const CAT_ORDINE = {
  it: ['Addome', 'Apparato urinario e urologia', 'Tiroide e collo', 'Muscolo-scheletrico', 'Pediatrica', 'Vascolare (Doppler)', 'Altro'],
  en: ['Abdomen', 'Urinary tract and urology', 'Thyroid and neck', 'Musculoskeletal', 'Paediatric', 'Vascular (Doppler)', 'Other'],
};
const CAT_SLUG = {
  Addome: 'addome', Abdomen: 'addome',
  'Apparato urinario e urologia': 'apparato-urinario', 'Urinary tract and urology': 'apparato-urinario',
  'Tiroide e collo': 'tiroide-e-collo', 'Thyroid and neck': 'tiroide-e-collo',
  'Muscolo-scheletrico': 'muscolo-scheletrico', Musculoskeletal: 'muscolo-scheletrico',
  Pediatrica: 'pediatrica', Paediatric: 'pediatrica',
  'Vascolare (Doppler)': 'doppler', 'Vascular (Doppler)': 'doppler',
  Altro: 'altro', Other: 'altro',
};

function elencoStatico(lista, paziente, isEN) {
  const more = isEN ? 'Learn more →' : 'Scopri di più →';
  const ordine = CAT_ORDINE[isEN ? 'en' : 'it'];
  const gruppi = new Map(ordine.map((c) => [c, []]));
  for (const e of lista) {
    if (!gruppi.has(e.categoria)) gruppi.set(e.categoria, []);
    gruppi.get(e.categoria).push(e);
  }
  let html = '';
  for (const [cat, items] of gruppi) {
    if (!items.length) continue;
    html += `\n          <h2 id="${CAT_SLUG[cat] || 'altro'}">${esc(cat)}</h2>\n          <ul class="exam-list">\n`;
    for (const e of items) {
      const info = paziente[e.id] || {};
      const sintesi = info.sintesi || e.descrizione.split('.')[0] + '.';
      const href = SLUG[e.id]
        ? SLUG[e.id] + (isEN ? '-en' : '') + '.html'
        : (isEN ? 'esame-en.html' : 'esame.html') + '?id=' + encodeURIComponent(e.id);
      html +=
        `            <li class="exam-item"><div class="exam-item-body">` +
        `<h3 class="exam-item-title"><a href="${href}">${esc(e.nome)}</a></h3>` +
        `<p class="exam-item-sintesi">${esc(sintesi)}</p>` +
        `<a class="exam-item-more link-arrow" href="${href}">${more}</a></div>` +
        `<div class="exam-item-thumb"><img src="images/esami/${e.id}.jpg?v=20260803" alt="${esc(e.nome)}" width="88" height="88" loading="lazy"></div></li>\n`;
    }
    html += '          </ul>\n';
  }
  return html + '        ';
}

for (const [file, lista, paziente, isEN] of [
  ['ecografie.html', ESAMI, PAZIENTE, false],
  ['ecografie-en.html', ESAMI_EN, PAZIENTE_EN, true],
]) {
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, 'utf8');
  const INIZIO = '<!-- ELENCO-ESAMI: generato, non modificare a mano -->';
  const FINE = '<!-- /ELENCO-ESAMI -->';
  const nuovo =
    INIZIO +
    '\n        <div id="exam-lists">' +
    elencoStatico(lista, paziente, isEN) +
    '</div>\n        ' +
    FINE;
  const prima = html;

  if (html.includes(INIZIO)) {
    // rigenerazione: sostituisco solo cio' che sta fra i due segnalibri
    html = html.replace(
      new RegExp(INIZIO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + FINE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      nuovo
    );
  } else {
    // prima volta: prendo tutto il contenitore, fino al paragrafo che lo segue
    html = html.replace(
      /<div id="exam-lists">[\s\S]*<\/div>(?=\s*<p class="content-spaced">)/,
      nuovo
    );
  }

  if (!html.includes(INIZIO)) {
    console.warn('  ! non ho trovato il contenitore #exam-lists in ' + file);
  } else if (html === prima) {
    console.log('Elenco in ' + file + ': gia\' aggiornato');
  } else {
    if (!html.includes('js/esami-slug.js')) {
      html = html.replace(
        /(<script src="js\/esami-data)/,
        '<script src="js/esami-slug.js?v=20260803" defer></script>\n  $1'
      );
    }
    fs.writeFileSync(p, html, 'utf8');
    console.log('Elenco statico scritto in ' + file);
  }
}

console.log(`Pagine esame generate: ${creati}`);
console.log(`Saltate (pagina scritta a mano gia' esistente): ${saltati}`);
console.log(`Onorario in pagina: ${ONORARIO.MOSTRA ? 'SI' : 'no (ONORARIO.MOSTRA = false)'}`);
