#!/usr/bin/env node
/**
 * FAQ delle pagine scritte a mano (esami in GIA_ESISTENTI, contatti,
 * prenota, tariffe, pagina comuni vicini).
 *
 * 1. Sostituisce le domande generiche ripetute su tutto il sito
 *    ("Serve l'impegnativa?", "Quanto dura?") con domande del gruppo
 *    dell'esame, prese da scripts/faq-gruppi.js.
 * 2. Riscrive il JSON-LD FAQPage partendo dalle FAQ visibili nella pagina,
 *    cosi' i due restano sempre identici (regola in CLAUDE.md).
 *
 * Si puo' rilanciare: le sostituzioni gia' fatte vengono saltate.
 *   node scripts/faq-pagine-manuali.js
 */
const fs = require('fs');
const path = require('path');
const { faqPerId } = require('./faq-gruppi');

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
    const re = new RegExp(
      '( *)<details>\\s*<summary>' + reEsc(vecchia) + '</summary>[\\s\\S]*?</details>'
    );
    const m = html.match(re);
    if (!m) continue; // gia' sostituita
    const f = faqPerId(id, lingua);
    const ind = m[1];
    const nota = f.daVerificare
      ? `${ind}<!-- DA VERIFICARE: FAQ di gruppo "${f.daVerificare}" (scripts/faq-gruppi.js) -->\n`
      : '';
    html = html.replace(
      re,
      `${nota}${ind}<details>\n${ind}  <summary>${esc(f.q)}</summary>\n${ind}  <p>${esc(f.a)}</p>\n${ind}</details>`
    );
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
