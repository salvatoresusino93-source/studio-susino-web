#!/usr/bin/env node
/**
 * Ricostruisce sitemap.xml elencando solo le pagine che esistono davvero.
 * Da lanciare DOPO scripts/genera-pagine-esami.js.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { SLUG } = require('./esami-mappa');

const ROOT = path.join(__dirname, '..');
const base = 'https://studiosusino.it';
const today = new Date().toLocaleDateString('sv-SE'); // AAAA-MM-GG, ora locale come le date di git

const pages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/ecografie.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/prenota.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/tariffe.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecografie-modica-ispica-scicli.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/chi-sono.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/studio.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contatti.html', priority: '0.75', changefreq: 'monthly' },
];

/* Una riga per ogni pagina-esame presente sul disco */
for (const slug of [...new Set(Object.values(SLUG))].sort()) {
  pages.push({ loc: '/' + slug + '.html', priority: '0.8', changefreq: 'monthly' });
  pages.push({ loc: '/' + slug + '-en.html', priority: '0.6', changefreq: 'monthly' });
}

/* Versioni inglesi delle pagine principali */
for (const en of [
  '/index-en.html',
  '/ecografie-en.html',
  '/prenota-en.html',
  '/tariffe-en.html',
  '/chi-sono-en.html',
  '/studio-en.html',
  '/contatti-en.html',
]) {
  pages.push({ loc: en, priority: '0.6', changefreq: 'monthly' });
}

const fileDi = (loc) => path.join(ROOT, loc === '/' ? 'index.html' : loc.slice(1));

/* Solo pagine che esistono e che non sono marcate noindex:
   una URL noindex in sitemap e' un segnale contraddittorio per Google. */
const esistenti = pages.filter((p) => {
  const f = fileDi(p.loc);
  if (!fs.existsSync(f)) return false;
  return !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(fs.readFileSync(f, 'utf8'));
});

/* lastmod reale: data dell'ultimo commit che ha toccato il file,
   oppure oggi se il file ha modifiche non ancora committate. */
function lastmod(loc) {
  const rel = path.relative(ROOT, fileDi(loc));
  const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
  try {
    if (git(['status', '--porcelain', '--', rel])) return today;
    return git(['log', '-1', '--format=%cs', '--', rel]) || today;
  } catch (e) {
    return today;
  }
}

/* changefreq e priority non si scrivono: Google li ignora. */
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  esistenti
    .map((p) => '  <url><loc>' + base + p.loc + '</loc><lastmod>' + lastmod(p.loc) + '</lastmod></url>')
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log('sitemap.xml: ' + esistenti.length + ' URL');

const mancanti = pages.length - esistenti.length;
if (mancanti) console.log('(' + mancanti + ' pagine non ancora create, escluse)');
