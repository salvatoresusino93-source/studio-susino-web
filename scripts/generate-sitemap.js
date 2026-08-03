#!/usr/bin/env node
/**
 * Ricostruisce sitemap.xml elencando solo le pagine che esistono davvero.
 * Da lanciare DOPO scripts/genera-pagine-esami.js.
 */
const fs = require('fs');
const path = require('path');
const { SLUG } = require('./esami-mappa');

const ROOT = path.join(__dirname, '..');
const base = 'https://studiosusino.it';
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/ecografie.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/prenota.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/tariffe.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecografie-modica-ispica-scicli.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/chi-sono.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/studio.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contatti.html', priority: '0.75', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.2', changefreq: 'yearly' },
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

const esistenti = pages.filter(
  (p) => p.loc === '/' || fs.existsSync(path.join(ROOT, p.loc.slice(1)))
);

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  esistenti
    .map(
      (p) =>
        '  <url><loc>' +
        base +
        p.loc +
        '</loc><lastmod>' +
        today +
        '</lastmod><changefreq>' +
        p.changefreq +
        '</changefreq><priority>' +
        p.priority +
        '</priority></url>'
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log('sitemap.xml: ' + esistenti.length + ' URL');

const mancanti = pages.length - esistenti.length;
if (mancanti) console.log('(' + mancanti + ' pagine non ancora create, escluse)');
