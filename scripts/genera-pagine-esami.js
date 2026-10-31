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

/* Data di revisione mostrata in fondo a ogni pagina esame ("Review date" del
   design system NHS.UK). Si aggiorna a mano quando il medico rivede i testi. */
const REVISIONE = { iso: '2026-10-31', it: '31 ottobre 2026', en: '31 October 2026' };

/* Mappa id -> nome file, condivisa con generate-sitemap.js */
const { SLUG, GIA_ESISTENTI, CORRELATI_EXTRA } = require('./esami-mappa');
const { faqGruppo } = require('./faq-gruppi');
const { faqPratiche } = require('./faq-pratiche');

/* Preparazione richiesta, per esame */
const DIGIUNO = ['addome-completo', 'addome-superiore', 'renale', 'doppler-aorta', 'doppler-arterie-renali'];
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
    directionsPage: 'come-arrivare.html',
    contactPage: 'contatti.html',
    bookPage: 'prenota.html',
    navChiSono: 'Chi sono',
    navEcografie: 'Ecografie',
    navStudio: 'Lo studio',
    navComeArrivare: 'Come arrivare',
    navContatti: 'Contatti',
    navPrenota: 'Prenota',
    navRecensione: 'Lascia una recensione',
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
    hContents: 'In questa pagina',
    hBrief: 'In breve',
    briefPrep: 'Preparazione',
    briefReport: 'Referto',
    briefFee: 'Onorario',
    briefWhere: 'Dove',
    briefReportText: 'Scritto, consegnato al termine dell’esame',
    briefWhereText: 'Via dell’Arno 34, su appuntamento',
    briefPrepFasting: 'Digiuno da 6-8 ore',
    briefPrepBladder: 'Vescica piena',
    briefPrepNone: 'Nessuna',
    doTitle: 'Cosa fare',
    dontTitle: 'Cosa evitare',
    // Liste "cosa fare / cosa evitare": stesse indicazioni dei testi prepFasting,
    // prepBladder e prepNone qui sotto, solo riordinate in forma di elenco.
    doFasting: ['Puoi bere acqua', 'Puoi prendere i farmaci abituali', 'Porta con te referti o ecografie precedenti'],
    dontFasting: ['Non mangiare nelle 6-8 ore prima dell’esame'],
    doBladder: ['Bevi circa un litro d’acqua un’ora prima', 'Porta con te referti o ecografie precedenti'],
    dontBladder: ['Non urinare fino all’esame'],
    doNone: ['Porta con te referti o ecografie precedenti', 'Vieni con abbigliamento comodo'],
    calloutTitle: 'Importante',
    /* DA VERIFICARE: frase nuova, da confermare dal medico */
    calloutPrep: 'Se non riesci a seguire la preparazione, avvisa prima dell’appuntamento: senza, alcuni organi si vedono male e l’esame potrebbe andare ripetuto.',
    reviewText: (data) => `Contenuti a cura del Dr. Salvatore Susino, medico specialista in Radiologia. Ultima revisione: ${data}.`,
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
    ctaText: 'Online in pochi passaggi, oppure al telefono. Si riceve su appuntamento.',
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
    // Title entro 60 caratteri col suffisso 'Studio Dr. Susino' sempre intero:
    // se non ci sta, si accorcia prima la localita', poi il nome dell'esame (titoliBrevi).
    titoliBrevi: {
      'Ecografia scrotale e testicolare': 'Ecografia testicolare',
      'Ecocolordoppler aorta addominale': 'Doppler aorta addominale',
      'Ecocolordoppler arti superiori': 'Doppler arti superiori',
      'Ecocolordoppler arti inferiori': 'Doppler arti inferiori',
      'Ecocolordoppler arterie renali': 'Doppler arterie renali',
      'Ecocolordoppler carotidi': 'Doppler carotidi'
},
    titleForms: (nome, breve) => [
      `${nome} a Pozzallo (RG) | Studio Dr. Susino`,
      `${nome} a Pozzallo | Studio Dr. Susino`,
      `${breve} a Pozzallo | Studio Dr. Susino`,
      `${nome} | Studio Dr. Susino`,
      `${breve} | Studio Dr. Susino`,
    ],
    descTail: ' Studio a Pozzallo (RG): prenota online o al telefono.',
    lead: () => 'Esame eseguito personalmente dal medico radiologo, su appuntamento. Referto e spiegazione al termine dell’esame.',
  },
  en: {
    lang: 'en',
    locale: 'en_US',
    home: 'Home',
    scans: 'Scans',
    listPage: 'ecografie-en.html',
    aboutPage: 'chi-sono-en.html',
    studioPage: 'studio-en.html',
    directionsPage: 'come-arrivare-en.html',
    contactPage: 'contatti-en.html',
    bookPage: 'prenota-en.html',
    navChiSono: 'About me',
    navEcografie: 'Scans',
    navStudio: 'The practice',
    navComeArrivare: 'How to get here',
    navContatti: 'Contact',
    navPrenota: 'Book',
    navRecensione: 'Leave a review',
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
    hContents: 'On this page',
    hBrief: 'At a glance',
    briefPrep: 'Preparation',
    briefReport: 'Report',
    briefFee: 'Fee',
    briefWhere: 'Where',
    briefReportText: 'Written, handed to you at the end of the scan',
    briefWhereText: 'Via dell’Arno 34, by appointment',
    briefPrepFasting: 'Fast for 6-8 hours',
    briefPrepBladder: 'Full bladder',
    briefPrepNone: 'None',
    doTitle: 'Do',
    dontTitle: 'Don’t',
    doFasting: ['You may drink water', 'You may take your usual medication', 'Bring any previous reports or scans'],
    dontFasting: ['Do not eat in the 6-8 hours before the scan'],
    doBladder: ['Drink about a litre of water an hour before', 'Bring any previous reports or scans'],
    dontBladder: ['Do not go to the toilet until the scan'],
    doNone: ['Bring any previous reports or scans', 'Wear comfortable clothes'],
    calloutTitle: 'Important',
    /* DA VERIFICARE: frase nuova, da confermare dal medico */
    calloutPrep: 'If you cannot follow the preparation, let us know before the appointment: without it some organs are hard to see and the scan may need to be repeated.',
    reviewText: (date) => `Content by Dr. Salvatore Susino, specialist in Radiology. Last reviewed: ${date}.`,
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
    ctaText: 'Online in a few steps, or by phone. By appointment.',
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
    titoliBrevi: {
      'Carotid (supra-aortic) Doppler ultrasound': 'Carotid Doppler ultrasound',
      'Abdominal aorta Doppler ultrasound': 'Aorta Doppler ultrasound',
      'Scrotal and testicular ultrasound': 'Testicular ultrasound',
      'Renal artery Doppler ultrasound': 'Renal Doppler ultrasound',
      'Bladder and prostate ultrasound': 'Bladder-prostate ultrasound',
      'Upper-limb Doppler ultrasound': 'Arm Doppler ultrasound',
      'Lower-limb Doppler ultrasound': 'Leg Doppler ultrasound',
      'Complete abdominal ultrasound': 'Abdominal ultrasound'
},
    titleForms: (nome, breve) => [
      `${nome} in Pozzallo (RG), Italy | Studio Dr. Susino`,
      `${nome} in Pozzallo, Italy | Studio Dr. Susino`,
      `${nome} in Pozzallo | Studio Dr. Susino`,
      `${breve} in Pozzallo | Studio Dr. Susino`,
      `${nome} | Studio Dr. Susino`,
      `${breve} | Studio Dr. Susino`,
    ],
    descTail: ' Practice in Pozzallo (RG), Italy: book online or by phone.',
    lead: () => 'Performed personally by the radiologist, by appointment. Report and explanation at the end of the scan.',
  },
};

const TEL1 = '+39 0932 954441';
const TEL2 = '+39 351 374 6102';
const PRENOTA_BASE = 'https://referteco-production.up.railway.app/prenota';

/* ------------------------------------------------------------------ */
/* Costruzione della pagina                                            */
/* ------------------------------------------------------------------ */
// Preparazione con testo proprio, quando quello generico non si adatta all'esame
const PREP_SPECIFICA = {
  renale: {
    it: 'Sì: è consigliato il <strong>digiuno da 6-8 ore</strong>, perché l’aria nell’intestino, che aumenta dopo i pasti, può coprire i reni. Puoi bere acqua e prendere i farmaci abituali. Non serve invece la vescica piena. Porta con te eventuali esami precedenti.',
    en: 'Yes: <strong>fasting for 6-8 hours</strong> is recommended, because bowel gas, which increases after meals, can hide the kidneys. You may drink water and take your usual medication. A full bladder is not needed. Bring any previous scans with you.',
  },
};

function preparazione(id, t) {
  if (PREP_SPECIFICA[id]) return PREP_SPECIFICA[id][t.lang];
  if (DIGIUNO.includes(id)) return t.prepFasting;
  if (VESCICA_PIENA.includes(id)) return t.prepBladder;
  return t.prepNone;
}
function tipoPreparazione(id) {
  if (DIGIUNO.includes(id)) return 'fasting';
  if (VESCICA_PIENA.includes(id)) return 'bladder';
  return 'none';
}

/* Blocchi ispirati al design system NHS.UK (vedi css/style.css):
   "Do and Don't list" + "Warning callout" per la preparazione. */
function bloccoPreparazione(id, t) {
  const tipo = tipoPreparazione(id);
  const fai = tipo === 'fasting' ? t.doFasting : tipo === 'bladder' ? t.doBladder : t.doNone;
  const evita = tipo === 'fasting' ? t.dontFasting : tipo === 'bladder' ? t.dontBladder : [];
  const lista = (titolo, voci, cls) =>
    `          <div class="do-dont-box${cls ? ' ' + cls : ''}">
            <h3>${titolo}</h3>
            <ul>
${voci.map((v) => `              <li>${esc(v)}</li>`).join('\n')}
            </ul>
          </div>`;
  return `        <div class="do-dont">
${lista(t.doTitle, fai, '')}${evita.length ? '\n' + lista(t.dontTitle, evita, 'dont') : ''}
        </div>
${evita.length ? `        <div class="callout">
          <h3>${t.calloutTitle}</h3>
          <p>${esc(t.calloutPrep)}</p>
        </div>
` : ''}`;
}

/* "Summary list": i dati essenziali dell'esame, subito sotto il titolo. */
function bloccoInBreve(id, t, isEN) {
  const tipo = tipoPreparazione(id);
  const prep = tipo === 'fasting' ? t.briefPrepFasting : tipo === 'bladder' ? t.briefPrepBladder : t.briefPrepNone;
  const righe = [
    [t.briefPrep, `<a href="#preparazione">${esc(prep)}</a>`],
    [t.briefReport, esc(t.briefReportText)],
  ];
  if (ONORARIO.MOSTRA) {
    righe.push([t.briefFee, `${esc(ONORARIO.IMPORTO)} · <a href="${isEN ? ONORARIO.PAGINA_EN : ONORARIO.PAGINA_IT}">${t.feeMore}</a>`]);
  }
  righe.push([t.briefWhere, esc(t.briefWhereText)]);
  return `        <div class="in-breve">
          <h2 class="in-breve-title">${t.hBrief}</h2>
          <dl>
${righe.map(([k, v]) => `            <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
          </dl>
        </div>
`;
}

/* "Contents list": indice delle sezioni presenti nella pagina. */
function bloccoIndice(voci, t) {
  return `        <nav class="page-contents" aria-label="${t.hContents}">
          <span class="page-contents-title">${t.hContents}</span>
          <ol>
${voci.map(([id, label]) => `            <li><a href="#${id}">${label}</a></li>`).join('\n')}
          </ol>
        </nav>
`;
}

/* Gruppo FAQ (scripts/faq-gruppi.js) dalla categoria italiana dell'esame:
   vale anche per le pagine inglesi, che hanno nomi di categoria tradotti. */
const GRUPPO = {
  Addome: 'addome',
  'Apparato urinario e urologia': 'apparato-urinario',
  'Tiroide e collo': 'tiroide-e-collo',
  'Muscolo-scheletrico': 'muscolo-scheletrico',
  Pediatrica: 'pediatrica',
  'Vascolare (Doppler)': 'doppler',
  Altro: 'altro',
};
function categoriaIt(id) {
  return ESAMI.find((e) => e.id === id).categoria;
}

/* Taglia a fine parola (mai a meta') e chiude con il punto. */
function tagliaParola(testo, max) {
  if (testo.length <= max) return testo;
  const corto = testo.slice(0, max - 1);
  return corto.slice(0, corto.lastIndexOf(' ')).replace(/[\s,;:]+$/, '') + '…';
}

function paginaEsame(esame, info, t, tuttiEsami, isEN) {
  const slug = SLUG[esame.id];
  const file = isEN ? slug + '-en.html' : slug + '.html';
  const fileAlt = isEN ? slug + '.html' : slug + '-en.html';
  const url = `${BASE}/${file}`;
  const urlIt = `${BASE}/${slug}.html`;
  const urlEn = `${BASE}/${slug}-en.html`;

  const sintesi = (info && info.sintesi) || esame.descrizione.split('.')[0] + '.';

  // Title entro 60 caratteri: si prova dalla forma piu' completa alla piu' corta.
  const forme = t.titleForms(esame.nome, t.titoliBrevi[esame.nome] || esame.nome);
  const title = forme.find((x) => x.length <= 60) || forme.pop();

  const description = tagliaParola(sintesi + t.descTail, 158);
  const prep = preparazione(esame.id, t);
  // Domande dell'esame (faqExtra) + domande del suo gruppo (scripts/faq-gruppi.js),
  // scelte a rotazione. Niente piu' blocco di domande generiche uguale su
  // tutte le pagine: preparazione, impegnativa e referto stanno gia' nel testo
  // della pagina e in prenota/tariffe.
  // In pagina vanno solo FAQ approvate dal medico: le faqExtra nuove si scrivono
  // con verificata: false e restano nascoste finche' non diventano true. Quelle
  // senza il campo sono precedenti a questa regola (approvate con la PR #2).
  const faqEsame = (info && Array.isArray(info.faqExtra) ? info.faqExtra : []).filter(
    (f) => f.verificata !== false
  );
  const gruppo = GRUPPO[categoriaIt(esame.id)];
  const stessoGruppo = tuttiEsami.filter((e) => e.categoria === esame.categoria);
  const faq = faqEsame.concat(
    faqGruppo(
      gruppo,
      esame.id,
      stessoGruppo.findIndex((e) => e.id === esame.id),
      faqEsame.length >= 3 ? 2 : 3,
      t.lang
    ),
    // In coda le domande pratiche (dolore, durata, creme, controindicazioni, dopo)
    faqPratiche(gruppo, esame.id, t.lang)
  );

  // Prima i correlati scelti a mano fra categorie diverse, poi quelli della
  // stessa categoria partendo dall'esame successivo (a rotazione), cosi' i link
  // si distribuiscono su tutta la categoria e non solo sui primi della lista.
  const perId = new Map(tuttiEsami.map((e) => [e.id, e]));
  const extra = (CORRELATI_EXTRA[esame.id] || []).map((id) => perId.get(id));
  const stessaCat = tuttiEsami.filter((e) => e.categoria === esame.categoria);
  const pos = stessaCat.findIndex((e) => e.id === esame.id);
  const rotati = stessaCat.slice(pos + 1).concat(stessaCat.slice(0, pos));
  const correlati = [...new Set(extra.concat(rotati))]
    .filter((e) => e && e.id !== esame.id && SLUG[e.id])
    .slice(0, 6);

  // Icona dell'esame (images/icone/, vedi LEGGIMI.md). Per le anteprime social serve un JPG:
  // gli SVG non vengono mostrati da WhatsApp e Facebook, quindi si usa l'immagine col logo.
  // Non una foto: finché non ci sono foto vere dello studio, nessuna immagine lo rappresenta.
  const icona = esame.icona;
  const imgSocial = 'images/og-studio-susino.jpg';

  // Link diretto alla prenotazione con l'esame gia' selezionato: un passaggio in meno.
  const prenotaUrl =
    PRENOTA_BASE +
    '?esame=' +
    encodeURIComponent(esame.prenotaNome || esame.nome) +
    (isEN ? '&lang=en' : '');

  // Voci dell'indice "In questa pagina", solo per le sezioni presenti
  const indice = [['a-cosa-serve', t.hWhat]];
  if (info && info.svolgimento) indice.push(['come-si-svolge', t.hHow]);
  indice.push(['preparazione', t.hPrep]);
  if (ONORARIO.MOSTRA) indice.push(['costo', t.hFee]);
  if (faq.length) indice.push(['domande', t.hFaq]);

  const feeBlock = ONORARIO.MOSTRA
    ? `
        <h2 id="costo">${t.hFee}</h2>
        <p>
          ${isEN ? ONORARIO.EN : ONORARIO.IT}
          <a href="${isEN ? ONORARIO.PAGINA_EN : ONORARIO.PAGINA_IT}">${t.feeMore}</a>
        </p>
`
    : '';

  const correlatiBlock = correlati.length
    ? `
        <h2 id="correlati">${t.hRelated}</h2>
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
  <meta property="og:image" content="${BASE}/${imgSocial}">
  <meta property="og:site_name" content="Studio Ecografico Dr. Salvatore Susino">
  <meta property="og:locale" content="${t.locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${BASE}/${imgSocial}">
  <link rel="preload" href="fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="css/style.css?v=20261031d">
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
${faq.length ? `  <script type="application/ld+json">
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
` : ''}</head>
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
      <nav class="nav-desktop" aria-label="${isEN ? 'Main menu' : 'Menu principale'}">
        <a href="${t.aboutPage}">${t.navChiSono}</a>
        <a href="${t.listPage}" aria-current="page">${t.navEcografie}</a>
        <a href="${t.studioPage}">${t.navStudio}</a>
        <a href="${t.directionsPage}">${t.navComeArrivare}</a>
        <a href="${t.contactPage}">${t.navContatti}</a>
        <a class="lang-switch" href="${fileAlt}" hreflang="${isEN ? 'it' : 'en'}" aria-label="${t.altLangLabel}">${t.altLang}</a>
        <a class="btn btn-primary" href="${t.bookPage}">${t.navPrenota}</a>
      </nav>
      <button class="menu-toggle" type="button" aria-label="${isEN ? 'Open menu' : 'Apri menu'}" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="nav-mobile" aria-label="${isEN ? 'Mobile menu' : 'Menu mobile'}">
      <a href="${t.aboutPage}">${t.navChiSono}</a>
      <a href="${t.listPage}">${t.navEcografie}</a>
      <a href="${t.studioPage}">${t.navStudio}</a>
      <a href="${t.directionsPage}">${t.navComeArrivare}</a>
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
        <figure class="hero-figure hero-figure-icona">
          <img src="${icona}?v=20261018" alt="${esc(esame.iconaAlt)}" width="240" height="240">
        </figure>
      </div>
    </section>

    <section class="content-block">
      <div class="container">
${bloccoInBreve(esame.id, t, isEN)}${bloccoIndice(indice, t)}
        <h2 id="a-cosa-serve">${t.hWhat}</h2>
        <p>${esc(esame.descrizione)}</p>
${info && info.perche ? `
        <h2 id="perche">${t.hWhy}</h2>
        <p>${esc(info.perche)}</p>
` : ''}${info && info.svolgimento ? `
        <h2 id="come-si-svolge">${t.hHow}</h2>
        <p>${esc(info.svolgimento)}</p>
` : ''}${info && info.cosaControlla ? `
        <h2 id="cosa-controllo">${t.hCheck}</h2>
        <p>${esc(info.cosaControlla)}</p>
` : ''}
        <h2 id="preparazione">${t.hPrep}</h2>
        <p>${prep}</p>
${bloccoPreparazione(esame.id, t)}${feeBlock}
        <div class="btn-stack content-spaced">
          <a class="btn btn-primary" href="${esc(prenotaUrl)}" rel="noopener">${t.bookThis}</a>
          <a class="btn btn-outline" href="tel:+390932954441">${t.call} ${TEL1}</a>
          <a class="btn btn-outline" href="tel:+393513746102">${t.call} ${TEL2}</a>
        </div>

${faq.length ? `        <h2 id="domande">${t.hFaq}</h2>
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
` : ''}${correlatiBlock}
        <p class="content-spaced">
          ${t.seeAlso} <a href="${t.listPage}">${t.seeAlsoLink}</a> ${t.seeAlsoTail}
          <a href="${t.studioPage}">${t.studioWord}</a> ${t.andWord}
          <a href="${t.contactPage}">${t.contactWord}</a>.
        </p>

        <div class="inset">
          <p>${t.disclaimer}</p>
        </div>
        <p class="review-date">${t.reviewText(REVISIONE[t.lang])}</p>
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
      <div class="footer-links"><a href="${t.bookPage}">${t.navPrenota}</a> <a href="https://g.page/r/CQUbXzXQvvzqEBM/review" target="_blank" rel="noopener">${t.navRecensione}</a></div>
    </div>
  </footer>
  <script src="js/main.js?v=20261031" defer></script>
  <!-- Librerie di animazione (usate da js/motion.js); integrity = sha384 dei file del pacchetto npm -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js" integrity="sha384-XmJ9SoHtVOHoQUcKvFAzVXwdkKo1Ie3bhmSoIAkcdsHGaIrVJIkmozyq0FJeb/Ly" crossorigin="anonymous" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js" integrity="sha384-wl5TeDVvOWt30Pbf8aSo2ZrzsOjddu3avOBvHe+p+OhJt9gP6w9YXmDkN5DK2/dF" crossorigin="anonymous" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js" integrity="sha384-jqpi9VmOdhyLoLURgjCn7EpnG9BbnHW57ibIZoeaIU+erWDH3k8fQQg0xH2ySjnw" crossorigin="anonymous" defer></script>
  <script src="js/motion.js?v=20261018" defer></script>
<!-- Cloudflare Web Analytics --><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "0510c857500244ef9115f66be08e0432"}'></script><!-- End Cloudflare Web Analytics -->
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
        `<div class="exam-item-thumb"><img src="${e.icona}?v=20261018" alt="" width="56" height="56" loading="lazy"></div></li>\n`;
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
