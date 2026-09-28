#!/usr/bin/env node
/**
 * FAQ delle pagine scritte a mano (esami in GIA_ESISTENTI, contatti,
 * prenota, tariffe, pagina comuni vicini).
 *
 * 1. Al posto delle domande generiche ripetute su tutto il sito
 *    ("Serve l'impegnativa?", "Quanto dura?") mette la domanda del gruppo
 *    dell'esame (scripts/faq-gruppi.js) se e' verificata: true, altrimenti
 *    un commento segnaposto (la domanda resta nascosta).
 * 2. Riscrive il JSON-LD FAQPage partendo dalle FAQ visibili nella pagina,
 *    cosi' i due restano sempre identici (regola in CLAUDE.md).
 *
 * Si puo' rilanciare: ogni volta allinea le pagine allo stato di verifica.
 *   node scripts/faq-pagine-manuali.js
 */
const fs = require('fs');
const path = require('path');
const { faqPerId } = require('./faq-gruppi');
const { faqPratiche } = require('./faq-pratiche');

const ROOT = path.join(__dirname, '..');

/* pagina -> { domanda visibile da sostituire: id della FAQ di gruppo } */
const SOSTITUZIONI = {
  'ecografia-tiroide.html': {
    "Serve l'impegnativa del medico?": 'tiroide-esami-sangue',
    'Quanto dura e quando ho il referto?': 'nodulo-dopo',
  },
  'ecografia-tiroide-en.html': {
    "Do I need a doctor's referral?": 'tiroide-esami-sangue',
    'How long does it take and when do I get the report?': 'nodulo-dopo',
  },
  'ecografia-addome.html': { "Serve l'impegnativa del medico?": 'stomaco-intestino' },
  'ecografia-addome-en.html': { "Do I need a doctor's referral?": 'stomaco-intestino' },
  'ecografia-muscolo-scheletrica.html': { 'Serve preparazione o impegnativa?': 'fratture' },
  'ecografia-muscolo-scheletrica-en.html': { 'Is preparation or a referral needed?': 'fratture' },
  'ecocolordoppler-carotidi.html': { "Serve l'impegnativa del medico?": 'eco-vs-doppler' },
  'ecocolordoppler-carotidi-en.html': { "Do I need a doctor's referral?": 'eco-vs-doppler' },
  'ecocolordoppler-arti-inferiori.html': { "Serve l'impegnativa del medico?": 'ripetere' },
  'ecocolordoppler-arti-inferiori-en.html': { "Do I need a doctor's referral?": 'ripetere' },
};

/* Domande pratiche (scripts/faq-pratiche.js) in coda alle FAQ delle pagine
   esame scritte a mano: pagina -> [gruppo, id esame] */
const PRATICHE = {
  'ecografia-tiroide': ['tiroide-e-collo', 'tiroide'],
  'ecografia-addome': ['addome', 'addome-completo'],
  'ecografia-muscolo-scheletrica': ['muscolo-scheletrico', 'muscolo-scheletrica'],
  'ecocolordoppler-carotidi': ['doppler', 'doppler-tsa'],
  'ecocolordoppler-arti-inferiori': ['doppler', 'doppler-arti-inferiori'],
};
const INIZIO_PRATICHE = '<!-- FAQ PRATICHE (scripts/faq-pratiche.js) -->';
const FINE_PRATICHE = '<!-- /FAQ PRATICHE -->';

/* Pagine il cui FAQPage si ricostruisce dalle FAQ visibili */
const PAGINE_FAQ = Object.keys(SOSTITUZIONI).concat([
  'contatti.html',
  'contatti-en.html',
  'prenota.html',
  'prenota-en.html',
  'tariffe.html',
  'tariffe-en.html',
  'ecografie-modica-ispica-scicli.html',
]);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function testo(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const nome of PAGINE_FAQ) {
  const file = path.join(ROOT, nome);
  let html = fs.readFileSync(file, 'utf8');
  const lingua = nome.endsWith('-en.html') ? 'en' : 'it';

  for (const [vecchia, id] of Object.entries(SOSTITUZIONI[nome] || {})) {
    const f = faqPerId(id, lingua);
    // La FAQ di gruppo puo' trovarsi in pagina in tre forme: la domanda
    // generica originale, la FAQ gia' pubblicata (con o senza il vecchio
    // commento DA VERIFICARE) oppure il segnaposto di una FAQ nascosta.
    const segnaposto = `<!-- FAQ di gruppo "${id}" nascosta finche' non verificata (scripts/faq-gruppi.js) -->`;
    const dettagli = (q) => '<details>\\s*<summary>' + reEsc(q) + '</summary>[\\s\\S]*?</details>';
    const re = new RegExp(
      '( *)(?:<!-- DA VERIFICARE: [^>]*-->\\s*)?(?:' +
        [dettagli(vecchia), dettagli(esc(f.q)), reEsc(segnaposto)].join('|') +
        ')'
    );
    const m = html.match(re);
    if (!m) throw new Error(`FAQ "${id}" non trovata in ${nome}`);
    const ind = m[1];
    // Solo le FAQ approvate dal medico (verificata: true) vanno in pagina.
    html = html.replace(
      re,
      f.verificata
        ? `${ind}<details>\n${ind}  <summary>${esc(f.q)}</summary>\n${ind}  <p>${esc(f.a)}</p>\n${ind}</details>`
        : `${ind}${segnaposto}`
    );
  }

  const base = nome.replace(/(-en)?\.html$/, '');
  if (PRATICHE[base]) {
    const [gruppo, id] = PRATICHE[base];
    const voci = faqPratiche(gruppo, id, lingua)
      .map((f) => `          <details>\n            <summary>${esc(f.q)}</summary>\n            <p>${esc(f.a)}</p>\n          </details>\n`)
      .join('');
    const blocco = `          ${INIZIO_PRATICHE}\n${voci}          ${FINE_PRATICHE}\n`;
    const reBlocco = new RegExp(' *' + reEsc(INIZIO_PRATICHE) + '[\\s\\S]*?' + reEsc(FINE_PRATICHE) + '\\n');
    if (reBlocco.test(html)) {
      html = html.replace(reBlocco, blocco);
    } else {
      // In fondo al contenitore delle FAQ, prima della sua chiusura
      const i = html.indexOf('<div class="faq">');
      const j = html.indexOf('        </div>', i);
      if (i < 0 || j < 0) throw new Error('Contenitore FAQ non trovato in ' + nome);
      html = html.slice(0, j) + blocco + html.slice(j);
    }
  }

  const faq = [...html.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(
    (m) => ({ q: testo(m[1]), a: testo(m[2]) })
  );
  if (!faq.length) throw new Error('Nessuna FAQ visibile in ' + nome);

  const json = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    null,
    2
  ).replace(/\n/g, '\n  ');
  const blocco = `<script type="application/ld+json">\n  ${json}\n  </script>`;

  const reFaqPage = /<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"FAQPage"[\s\S]*?<\/script>/;
  html = reFaqPage.test(html) ? html.replace(reFaqPage, blocco) : html.replace('</head>', `  ${blocco}\n</head>`);

  fs.writeFileSync(file, html, 'utf8');
  console.log(`FAQ: ${nome} (${faq.length} domande)`);
}
