/*
 * Test del linter di stile.
 * Esecuzione:  node --test prototipi/reporting/style/
 * Usa solo moduli integrati di Node (node:test, node:assert, node:fs).
 */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const stile = require('./linter.js');

const md = fs.readFileSync(path.join(__dirname, 'stile-referto.md'), 'utf8');
const regole = stile.leggiRegole(md);
const tipi = (testo, opzioni) => stile.controlla(testo, regole, opzioni).map((a) => a.tipo);

test('il file delle regole contiene le sezioni del linter', () => {
  assert.ok(regole.verbi.includes('presenta'));
  assert.ok(regole.verbi.includes('è'));
  assert.ok(regole.vietati.some((v) => v.termine === 'densificazione'));
  assert.ok(regole.contesti.some((c) => c.contesto === 'tc-addome'));
  assert.equal(regole.soglie.assenza_di_max, 1);
});

test('esempi del file .md: ogni «prima» è segnalato, ogni «dopo» è pulito', () => {
  const esempi = stile.leggiEsempi(md);
  assert.ok(esempi.length >= 6, 'attesi almeno 6 esempi');
  esempi.forEach((e) => {
    const opzioni = { contesto: e.contesto };
    assert.ok(tipi(e.prima, opzioni).length > 0, 'non segnalato: ' + e.prima);
    e.dopo.forEach((d) => assert.deepEqual(tipi(d, opzioni), [], 'segnalato a torto: ' + d));
  });
});

test('forme verbali finite, anche accentate e a inizio frase', () => {
  assert.deepEqual(tipi('Il fegato è aumentato di volume.'), ['verbo']);
  assert.deepEqual(tipi('È stata esaminata la spalla destra.'), ['verbo']);
  assert.deepEqual(tipi('Tali formazioni presentano vascolarizzazione periferica.'), ['verbo']);
});

test('i participi usati come aggettivi non sono segnalati', () => {
  assert.deepEqual(tipi('Colecisti distesa. Linfonodo ingrandito. Lume obliterato.'), []);
  assert.deepEqual(tipi('Lobo medio improntante la base vescicale; ateromi determinanti stenosi lieve.'), []);
});

test('costruzioni con «si» segnalate una sola volta (non anche come verbo)', () => {
  const avvisi = stile.controlla('Non si osservano lesioni focali.', regole);
  assert.equal(avvisi.length, 1);
  assert.equal(avvisi[0].tipo, 'si');
  assert.equal(avvisi[0].estratto, 'si osservano');
});

test('termini vietati con suggerimento', () => {
  const avvisi = stile.controlla("Densificazione dell'adipe. Canale midollare ampio.", regole);
  assert.deepEqual(avvisi.map((a) => a.tipo), ['termine', 'termine']);
  assert.match(avvisi[0].messaggio, /addensamento/);
  assert.match(avvisi[1].messaggio, /canale vertebrale/);
});

test('«Assenza di» segnalato solo oltre la soglia', () => {
  assert.deepEqual(tipi('Assenza di versamento.'), []);
  assert.deepEqual(tipi('Assenza di versamento. Assenza di lesioni focali.'), ['assenza', 'assenza']);
});

test('ripetizione di parole con la stessa radice nella stessa frase', () => {
  const avvisi = stile.controlla('Linfonodi di maggiori dimensioni, il maggiore di 12 mm.', regole);
  assert.deepEqual(avvisi.map((a) => a.tipo), ['ripetizione']);
  // la stessa parola ripetuta (es. carotide … carotide) non è segnalata
  assert.deepEqual(tipi('Regolare pervietà della carotide comune, della carotide interna ed esterna.'), []);
  // parole esenti
  assert.deepEqual(tipi('Rene destro e rene sinistro in sede, a destra lieve ectasia.'), []);
});

test('referto composto: formule negative consecutive e frasi ripetute', () => {
  const referto = [
    'Non tumefazioni pancreatiche.',
    'Non dilatazioni aneurismatiche.',
    'Non falde fluide.',
    'Vie biliari non dilatate.',
    'Vie biliari non dilatate.'
  ].join('\n');
  const avvisi = stile.controlla(referto, regole);
  const formula = avvisi.filter((a) => a.tipo === 'formula');
  assert.equal(formula.length, 1, 'la terza «Non» consecutiva va segnalata');
  assert.equal(formula[0].riga, 3);
  assert.ok(avvisi.some((a) => a.tipo === 'ripetizione' && a.riga === 5));
});

test('formule alternate non sono segnalate', () => {
  const referto = 'Non tumefazioni pancreatiche.\nAssenti falde fluide.\nNon dilatazioni aneurismatiche.';
  assert.deepEqual(tipi(referto), []);
});

test('regola di contesto: versamento pleurico in TC addome', () => {
  assert.deepEqual(tipi('Falda di versamento pleurico bilaterale.', { contesto: 'tc-addome' }), ['contesto']);
  assert.deepEqual(tipi('Falda di versamento pleurico bilaterale.'), [], 'fuori contesto non si applica');
});

test('posizione e riga degli avvisi', () => {
  const testo = 'Colecisti distesa.\nIl fegato è omogeneo.';
  const [a] = stile.controlla(testo, regole);
  assert.equal(a.riga, 2);
  assert.equal(testo.slice(a.inizio, a.fine), 'è');
});

test('senza regole il linter non va in errore', () => {
  assert.doesNotThrow(() => stile.controlla('Testo qualsiasi.', stile.leggiRegole('')));
});
