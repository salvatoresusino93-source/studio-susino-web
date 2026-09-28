#!/usr/bin/env node
/**
 * Controlli SEO da lanciare dopo aver rigenerato pagine e sitemap:
 *   node scripts/verifica-seo.js
 * Esce con errore se trova problemi (hreflang, canonical, sitemap,
 * JSON-LD non valido, pagine esame con meno di 3 link in entrata).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://studiosusino.it/';
const file = (url) => (url === BASE ? 'index.html' : url.replace(BASE, ''));
const url = (f) => (f === 'index.html' ? BASE : BASE + f);

const pulisci = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const pagine = {};
for (const f of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const head = html.split('</head>')[0];
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
  pagine[f] = {
    html,
    canonical: (head.match(/rel="canonical"\s+href="([^"]+)"/) || [])[1],
    noindex: /name="robots"\s+content="[^"]*noindex/.test(head),
    hreflang: Object.fromEntries(
      [...head.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]])
    ),
    link: new Set([...main.matchAll(/href="([^"#?]+)/g)].map((m) => m[1])),
  };
}

const errori = [];
for (const [f, p] of Object.entries(pagine)) {
  if (p.canonical !== url(f)) errori.push(`${f}: canonical ${p.canonical} non punta a se stessa`);
  const hl = p.hreflang;
  if (!Object.keys(hl).length) { errori.push(`${f}: nessun hreflang`); continue; }
  if (!Object.values(hl).includes(url(f))) errori.push(`${f}: hreflang senza la pagina stessa`);
  if (hl['x-default'] !== hl.it) errori.push(`${f}: x-default diverso dalla versione italiana`);
  for (const [lingua, u] of Object.entries(hl)) {
    const altra = pagine[file(u)];
    if (!altra) errori.push(`${f}: hreflang ${lingua} verso pagina inesistente ${u}`);
    else if (!Object.values(altra.hreflang).includes(url(f))) errori.push(`${f}: hreflang ${lingua} non ricambiato da ${file(u)}`);
  }
  for (const m of p.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let dati;
    try { dati = JSON.parse(m[1]); } catch (e) { errori.push(`${f}: JSON-LD non valido (${e.message})`); continue; }
    // FAQPage identico alle domande visibili (stesso ordine, stesso testo)
    if (dati['@type'] === 'FAQPage') {
      const json = dati.mainEntity.map((q) => pulisci(q.name));
      const visibili = [...p.html.matchAll(/<summary>([\s\S]*?)<\/summary>/g)].map((x) => pulisci(x[1]));
      if (json.join('|') !== visibili.join('|')) errori.push(`${f}: FAQPage diverso dalle FAQ visibili`);
    }
  }
  if (!p.noindex) {
    const title = pulisci((p.html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
    const desc = pulisci((p.html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || '');
    if (title.length > 60) errori.push(`${f}: title di ${title.length} caratteri (max 60)`);
    if (desc.length > 160) errori.push(`${f}: description di ${desc.length} caratteri (max 160)`);
  }
}

// Parita' IT/EN: la pagina inglese ha lo stesso numero di FAQ di quella italiana
for (const f of Object.keys(pagine).filter((f) => !f.endsWith('-en.html'))) {
  const en = f === 'index.html' ? 'index-en.html' : f.replace('.html', '-en.html');
  if (!pagine[en]) continue;
  const conta = (x) => (pagine[x].html.match(/<summary>/g) || []).length;
  if (conta(f) !== conta(en)) errori.push(`${f}: ${conta(f)} FAQ in italiano, ${conta(en)} in inglese (${en})`);
}

const sitemap = [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const indicizzabili = Object.keys(pagine).filter((f) => !pagine[f].noindex).map(url);
for (const u of sitemap) if (!indicizzabili.includes(u)) errori.push(`sitemap: ${u} non esiste o e' noindex`);
for (const u of indicizzabili) if (!sitemap.includes(u)) errori.push(`sitemap: manca ${u}`);

for (const esame of Object.keys(pagine).filter((f) => /^(ecografia|ecocolordoppler)-/.test(f))) {
  const da = Object.keys(pagine).filter((f) => f !== esame && pagine[f].link.has(esame));
  if (da.length < 3) errori.push(`${esame}: solo ${da.length} link in entrata (${da.join(', ')})`);
}

if (errori.length) {
  console.error(errori.join('\n'));
  process.exit(1);
}
console.log(`OK: ${Object.keys(pagine).length} pagine, ${sitemap.length} URL in sitemap, nessun problema.`);
