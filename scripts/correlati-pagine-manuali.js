#!/usr/bin/env node
/**
 * Scrive il blocco "Esami correlati" nelle pagine esame scritte a mano
 * (quelle in GIA_ESISTENTI, che genera-pagine-esami.js non tocca).
 * La lista dei link sta in CORRELATI_MANUALI in scripts/esami-mappa.js.
 * Si puo' rilanciare quante volte si vuole: il blocco tra i due commenti
 * CORRELATI viene sostituito, il resto della pagina resta com'e'.
 */
const fs = require('fs');
const path = require('path');
const { SLUG, GIA_ESISTENTI, CORRELATI_MANUALI } = require('./esami-mappa');

const ROOT = path.join(__dirname, '..');
const INIZIO = '<!-- CORRELATI: generato da scripts/correlati-pagine-manuali.js -->';
const FINE = '<!-- /CORRELATI -->';

function carica(file) {
  const src = fs.readFileSync(path.join(ROOT, 'js', file), 'utf8');
  const sandbox = { window: {} };
  new Function('window', src).call(sandbox, sandbox.window);
  return new Map(sandbox.window.ESAMI.map((e) => [e.id, e]));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let scritte = 0;
for (const [dati, isEN] of [[carica('esami-data.js'), false], [carica('esami-data-en.js'), true]]) {
  for (const id of Object.keys(GIA_ESISTENTI)) {
    const ids = CORRELATI_MANUALI[id];
    if (!ids) continue;
    const file = path.join(ROOT, SLUG[id] + (isEN ? '-en' : '') + '.html');
    let html = fs.readFileSync(file, 'utf8');

    const blocco =
      `${INIZIO}\n` +
      `        <h2>${isEN ? 'Related scans' : 'Esami correlati'}</h2>\n` +
      `        <ul class="related-list">\n` +
      ids
        .map((r) => `          <li><a href="${SLUG[r]}${isEN ? '-en' : ''}.html">${esc(dati.get(r).nome)}</a></li>`)
        .join('\n') +
      `\n        </ul>\n        ${FINE}`;

    if (html.includes(INIZIO)) {
      html = html.replace(new RegExp(INIZIO + '[\\s\\S]*?' + FINE), blocco);
    } else {
      // Subito prima del paragrafo finale "Vedi tutti gli esami..."
      const i = html.lastIndexOf('<p class="content-spaced">');
      if (i < 0) throw new Error('Punto di inserimento non trovato in ' + file);
      html = html.slice(0, i) + blocco + '\n\n        ' + html.slice(i);
    }
    fs.writeFileSync(file, html, 'utf8');
    scritte++;
  }
}
console.log('Esami correlati aggiornati in ' + scritte + ' pagine scritte a mano');
