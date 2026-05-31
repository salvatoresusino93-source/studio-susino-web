#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const dataSrc = fs.readFileSync(path.join(ROOT, 'js/esami-data.js'), 'utf8');
const ids = [...dataSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);
const base = 'https://studiosusino.it';

const pages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/ecografie.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ecografia-tiroide.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecografia-addome.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecocolordoppler-carotidi.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecocolordoppler-arti-inferiori.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/ecografia-muscolo-scheletrica.html', priority: '0.85', changefreq: 'monthly' },
  { loc: '/prenota.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/chi-sono.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/studio.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contatti.html', priority: '0.75', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.2', changefreq: 'yearly' },
];

for (const id of ids) {
  pages.push({
    loc: '/esame.html?id=' + encodeURIComponent(id),
    priority: '0.65',
    changefreq: 'monthly',
  });
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages
    .map(
      (p) =>
        '  <url><loc>' +
        base +
        p.loc.replace(/&/g, '&amp;') +
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
console.log('sitemap.xml: ' + pages.length + ' URL');
