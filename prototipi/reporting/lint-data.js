#!/usr/bin/env node
/*
 * lint-data.js — passa tutti i testi di data.js al linter di stile.
 *
 * Uso:   node lint-data.js            (riepilogo e elenco delle segnalazioni)
 *        node lint-data.js --json     (risultato in JSON)
 *
 * Controlla:
 *   1. ogni frase singola (negativi degli organi, reperti, intro, conclusioni, frasi comuni);
 *   2. il referto NEGATIVO composto di ogni distretto (tutte le frasi negative una dopo l'altra),
 *      per intercettare formule ripetute e ripetizioni tra frasi diverse.
 * Non modifica nulla.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const stile = require('./style/linter.js');

const cartella = __dirname;
const regole = stile.leggiRegole(fs.readFileSync(path.join(cartella, 'style', 'stile-referto.md'), 'utf8'));

// Carica data.js in un contesto isolato e legge le costanti
const contesto = {};
vm.createContext(contesto);
vm.runInContext(fs.readFileSync(path.join(cartella, 'data.js'), 'utf8')
  + '\n;this.__dati = { METODICHE, FRASI_COMUNI };', contesto);
const { METODICHE, FRASI_COMUNI } = contesto.__dati;

const risultati = [];
function controlla(dove, testo, contestoLinter) {
  if (!testo) return;
  stile.controlla(testo, regole, { contesto: contestoLinter }).forEach((a) => {
    risultati.push({ dove, tipo: a.tipo, messaggio: a.messaggio, estratto: a.estratto });
  });
}

// 1. Frasi singole
['premessa', 'chiusura'].forEach((sez) => (FRASI_COMUNI[sez] || []).forEach((f) => {
  controlla('frasi comuni › ' + sez + '/' + f.id, f.testo);
}));
METODICHE.forEach((m) => m.distretti.forEach((d) => {
  const ctx = m.id + '-' + d.id;
  const base = m.nome + ' › ' + d.nome;
  controlla(base + ' › intro', d.intro, ctx);
  controlla(base + ' › intro bilaterale', d.introBilaterale, ctx);
  controlla(base + ' › conclusione negativa', d.conclusioneNegativa, ctx);
  d.organi.forEach((o) => {
    controlla(base + ' › ' + o.id + ' (negativo)', o.negativo, ctx);
    o.reperti.forEach((r) => {
      controlla(base + ' › ' + o.id + '/' + r.id, r.testo, ctx);
      controlla(base + ' › ' + o.id + '/' + r.id + ' (conclusione)', r.conclusione, ctx);
    });
  });
}));
const singole = risultati.length;

// 2. Referto negativo composto per distretto (solo avvisi che coinvolgono più frasi)
METODICHE.forEach((m) => m.distretti.forEach((d) => {
  const righe = [];
  if (d.intro) righe.push(d.intro.replace('{lato}', 'destra'));
  d.organi.forEach((o) => { if (o.negativo) righe.push(o.negativo); });
  stile.controlla(righe.join('\n'), regole, { contesto: m.id + '-' + d.id })
    .filter((a) => a.tipo === 'formula' || (a.tipo === 'ripetizione' && a.messaggio.startsWith('Frase ripetuta')))
    .forEach((a) => risultati.push({
      dove: m.nome + ' › ' + d.nome + ' › REFERTO NEGATIVO COMPOSTO (riga ' + a.riga + ')',
      tipo: a.tipo, messaggio: a.messaggio, estratto: a.estratto
    }));
}));

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(risultati, null, 2));
} else {
  const perTipo = {};
  risultati.forEach((r) => { perTipo[r.tipo] = (perTipo[r.tipo] || 0) + 1; });
  console.log('Segnalazioni: ' + risultati.length + ' (frasi singole: ' + singole + ', referti composti: ' + (risultati.length - singole) + ')');
  console.log('Per tipo: ' + (Object.entries(perTipo).map(([k, v]) => k + ' ' + v).join(', ') || 'nessuna'));
  console.log('');
  risultati.forEach((r) => console.log('- [' + r.tipo + '] ' + r.dove + '\n    ' + r.messaggio));
}
