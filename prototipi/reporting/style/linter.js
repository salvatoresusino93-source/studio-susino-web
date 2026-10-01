/*
 * linter.js — controllo di stile dei referti (modulo indipendente).
 *
 * Legge le regole da stile-referto.md (sezioni marcate «(linter)») e SEGNALA,
 * senza correggere:
 *   - forme verbali finite (elenco nel file .md);
 *   - costruzioni impersonali con «si»;
 *   - termini vietati (tabella nel file .md);
 *   - uso eccessivo di «Assenza di»;
 *   - la stessa parola ripetuta con desinenza diversa nella stessa frase
 *     (es. «di maggiori dimensioni… la maggiore») e frasi identiche ripetute;
 *   - la stessa formula all'inizio di troppe frasi consecutive (es. «Non… Non… Non…»);
 *   - regole di contesto (es. versamento pleurico in TC addome).
 *
 * Nessuna dipendenza. Funziona:
 *   - in Node:      const stile = require('./linter.js');
 *   - nel browser:  <script src="style/linter.js"></script>  →  window.StileReferto
 *
 * Uso:
 *   const regole = stile.leggiRegole(testoDelFileMd);
 *   const avvisi = stile.controlla(testoReferto, regole, { contesto: 'tc-addome' });
 *   // avvisi = [{ tipo, messaggio, inizio, fine, estratto, riga }]
 */
(function (radice, crea) {
  if (typeof module === 'object' && module.exports) module.exports = crea();
  else radice.StileReferto = crea();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Lettere (anche accentate) e cifre: servono per i confini di parola con l'italiano
  const LETTERA = '\\p{L}\\p{N}';
  const SOGLIE_PREDEFINITE = { assenza_di_max: 1, formula_consecutiva_max: 2, radice_min: 6 };

  // Parole brevi che non contano come "formula" iniziale né come ripetizione
  const PAROLE_VUOTE = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'di', 'a', 'da', 'in',
    'con', 'su', 'per', 'tra', 'fra', 'e', 'ed', 'o', 'del', 'della', 'dei', 'delle', 'al', 'alla', 'ai', 'alle',
    'nel', 'nella', 'nei', 'nelle', 'sul', 'sulla', "l'", "un'", "dell'", "all'", "nell'"]);

  // ---------------------------------------------------------------------
  // Lettura delle regole dal file .md
  // ---------------------------------------------------------------------

  /** Restituisce il testo di una sezione "## Titolo" (fino alla sezione successiva). */
  function sezione(md, titolo) {
    const righe = md.split(/\r?\n/);
    const inizio = righe.findIndex((r) => /^##\s/.test(r) && r.toLowerCase().includes(titolo.toLowerCase()));
    if (inizio === -1) return '';
    const fine = righe.findIndex((r, i) => i > inizio && /^#{1,2}\s/.test(r));
    return righe.slice(inizio + 1, fine === -1 ? undefined : fine).join('\n');
  }

  /** Voci di un elenco puntato "- a, b, c" → ['a', 'b', 'c']. */
  function vociElenco(testo) {
    const voci = [];
    testo.split('\n').forEach((r) => {
      const m = r.match(/^\s*-\s+(.*)$/);
      if (m) m[1].split(',').map((x) => x.trim()).filter(Boolean).forEach((x) => voci.push(x));
    });
    return voci;
  }

  /** Righe di una tabella markdown (senza intestazione e separatore). */
  function righeTabella(testo) {
    const righe = testo.split('\n').filter((r) => /^\s*\|/.test(r));
    return righe.slice(2).map((r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
  }

  /**
   * Legge le regole del linter dal contenuto di stile-referto.md.
   * @param {string} md
   */
  function leggiRegole(md) {
    const testo = String(md || '');
    const soglie = Object.assign({}, SOGLIE_PREDEFINITE);
    vociElenco(sezione(testo, 'Soglie (linter)')).forEach((v) => {
      const m = v.match(/^([\w_]+)\s*:\s*(\d+)/);
      if (m) soglie[m[1]] = Number(m[2]);
    });
    return {
      verbi: vociElenco(sezione(testo, 'Forme verbali vietate (linter)')).map((v) => v.toLowerCase()),
      eccezioniVerbi: vociElenco(sezione(testo, 'Eccezioni alle forme verbali (linter)')),
      vietati: righeTabella(sezione(testo, 'Termini vietati (linter)'))
        .filter((c) => c[0])
        .map((c) => ({ termine: c[0], invece: c[1] || '', nota: c[2] || '' })),
      contesti: righeTabella(sezione(testo, 'Regole di contesto (linter)'))
        .filter((c) => c[0] && c[1] && c[2])
        .map((c) => ({ contesto: c[0].toLowerCase(), seCompare: c[1], richiesto: c[2] })),
      esenti: new Set(vociElenco(sezione(testo, 'Parole esenti dal controllo ripetizioni (linter)')).map((v) => v.toLowerCase())),
      soglie
    };
  }

  /**
   * Legge gli esempi "prima → dopo" (usati dai test e, in futuro, come few-shot).
   * @returns {{prima: string, contesto: string, dopo: string[]}[]}
   */
  function leggiEsempi(md) {
    const esempi = [];
    sezione(String(md || ''), 'Esempi').split('\n').forEach((r) => {
      const m = r.match(/^\s*-\s*"([^"]+)"\s*(?:\(([^)]+)\))?\s*→\s*(.+)$/);
      if (!m) return;
      const dopo = (m[3].match(/"([^"]+)"/g) || []).map((x) => x.slice(1, -1));
      esempi.push({ prima: m[1], contesto: (m[2] || '').trim().toLowerCase(), dopo });
    });
    return esempi;
  }

  // ---------------------------------------------------------------------
  // Utilità
  // ---------------------------------------------------------------------

  function escape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /** Espressione per una o più parole intere (con confini validi anche per lettere accentate). */
  function parole(elenco) {
    const alternative = elenco
      .map((p) => escape(p).replace(/'/g, "['’]").replace(/\s+/g, '\\s+'))
      .sort((a, b) => b.length - a.length)
      .join('|');
    return new RegExp('(?<![' + LETTERA + '])(?:' + alternative + ')(?![' + LETTERA + '])', 'giu');
  }

  /** Numero di riga (da 1) di una posizione nel testo. */
  function rigaDi(testo, pos) {
    let n = 1;
    for (let i = 0; i < pos; i++) if (testo.charCodeAt(i) === 10) n++;
    return n;
  }

  /** Divide il testo in frasi, con la posizione di inizio. */
  function frasi(testo) {
    const risultato = [];
    const re = /[^.!?\n]+[.!?]?/g;
    let m;
    while ((m = re.exec(testo))) {
      const t = m[0];
      const spazi = t.length - t.trimStart().length;
      if (t.trim()) risultato.push({ testo: t.trim(), inizio: m.index + spazi });
    }
    return risultato;
  }

  /** Parole di una frase con posizione assoluta. */
  function paroleDi(frase) {
    const out = [];
    const re = new RegExp('[' + LETTERA + "]+(?:['’][" + LETTERA + ']+)?', 'gu');
    let m;
    while ((m = re.exec(frase.testo))) out.push({ parola: m[0], inizio: frase.inizio + m.index });
    return out;
  }

  /** Parola senza la desinenza vocalica finale: «maggiori»/«maggiore» → «maggior». */
  function tema(parola) {
    return parola.replace(/[aeiouàèéìòù]+$/u, '');
  }

  /** Formula iniziale di una frase: "non", "assente/i", "regolare/i", … (prima parola significativa). */
  function formulaIniziale(frase) {
    const p = paroleDi(frase).map((x) => x.parola.toLowerCase());
    if (!p.length) return '';
    const prima = p[0].replace(/[ie]$/, '');
    if (prima === 'non' || prima === 'assent' || prima === 'regolar' || prima === 'nella' || prima === 'senz') return prima;
    return '';
  }

  const ETICHETTE_FORMULA = { non: '«Non …»', assent: '«Assente/Assenti …»', regolar: '«Regolare/Regolari …»', nella: '«Nella norma …»', senz: '«Senza …»' };

  // ---------------------------------------------------------------------
  // Controllo
  // ---------------------------------------------------------------------

  /**
   * Controlla un testo (una frase o un referto intero).
   * @param {string} testo
   * @param {object} regole   risultato di leggiRegole()
   * @param {{contesto?: string}} [opzioni]
   * @returns {{tipo: string, messaggio: string, inizio: number, fine: number, estratto: string, riga: number}[]}
   */
  function controlla(testo, regole, opzioni) {
    const t = String(testo || '');
    const r = regole || leggiRegole('');
    const contesto = ((opzioni && opzioni.contesto) || '').toLowerCase();
    const avvisi = [];
    const aggiungi = (tipo, messaggio, inizio, fine) => {
      avvisi.push({ tipo, messaggio, inizio, fine, estratto: t.slice(inizio, fine), riga: rigaDi(t, inizio) });
    };

    // 1. Costruzioni impersonali con «si»
    const reSi = new RegExp("(?<![" + LETTERA + "])si\\s+([" + LETTERA + "]+)", 'giu');
    const posizioniSi = new Set();
    let m;
    while ((m = reSi.exec(t))) {
      aggiungi('si', 'Costruzione impersonale con «si»: «' + m[0] + '»', m.index, m.index + m[0].length);
      posizioniSi.add(m.index + m[0].length - m[1].length); // il verbo dopo «si» è già segnalato
    }

    // 2. Forme verbali finite (tranne dentro le espressioni di eccezione, es. «in minor misura»)
    if (r.verbi.length) {
      const zoneEccezione = [];
      if (r.eccezioniVerbi && r.eccezioniVerbi.length) {
        const reEcc = parole(r.eccezioniVerbi);
        while ((m = reEcc.exec(t))) zoneEccezione.push([m.index, m.index + m[0].length]);
      }
      const reVerbi = parole(r.verbi);
      while ((m = reVerbi.exec(t))) {
        if (posizioniSi.has(m.index)) continue;
        const pos = m.index;
        if (zoneEccezione.some(([a, b]) => pos >= a && pos < b)) continue;
        aggiungi('verbo', 'Forma verbale finita: «' + m[0] + '»', m.index, m.index + m[0].length);
      }
    }

    // 3. Termini vietati
    r.vietati.forEach((v) => {
      const re = parole([v.termine]);
      while ((m = re.exec(t))) {
        const invece = v.invece ? ' → usare «' + v.invece + '»' : '';
        const nota = v.nota ? ' (' + v.nota + ')' : '';
        aggiungi('termine', 'Termine da evitare: «' + m[0] + '»' + invece + nota, m.index, m.index + m[0].length);
      }
    });

    // 4. «Assenza di» oltre la soglia
    const reAssenza = parole(['assenza di', "assenza d'"]);
    const assenze = [];
    while ((m = reAssenza.exec(t))) assenze.push(m);
    if (assenze.length > r.soglie.assenza_di_max) {
      assenze.forEach((a) => aggiungi('assenza',
        '«Assenza di» usato ' + assenze.length + ' volte (massimo ' + r.soglie.assenza_di_max + '): preferire «Non …» / «Assente/i …» / «senza …»',
        a.index, a.index + a[0].length));
    }

    const elencoFrasi = frasi(t);

    // 5. Ripetizioni nella stessa frase: stessa parola con desinenza diversa («maggiori… maggiore»)
    elencoFrasi.forEach((f) => {
      const viste = new Map();
      paroleDi(f).forEach((p) => {
        const parola = p.parola.toLowerCase();
        if (parola.length < r.soglie.radice_min || r.esenti.has(parola) || PAROLE_VUOTE.has(parola)) return;
        const rad = tema(parola);
        const prec = viste.get(rad);
        if (prec && prec.parola.toLowerCase() !== parola) {
          aggiungi('ripetizione', 'Ripetizione nella stessa frase: «' + prec.parola + '» … «' + p.parola + '»',
            prec.inizio, p.inizio + p.parola.length);
        }
        if (!prec) viste.set(rad, p);
      });
    });

    // 6. Frasi identiche ripetute nel referto
    const frasiViste = new Map();
    elencoFrasi.forEach((f) => {
      const chiave = f.testo.toLowerCase().replace(/\s+/g, ' ');
      if (chiave.length < 12) return;
      if (frasiViste.has(chiave)) {
        aggiungi('ripetizione', 'Frase ripetuta nel referto: «' + f.testo + '»', f.inizio, f.inizio + f.testo.length);
      } else {
        frasiViste.set(chiave, f);
      }
    });

    // 7. Stessa formula all'inizio di troppe frasi consecutive
    let serie = [];
    const chiudiSerie = () => {
      if (serie.length > r.soglie.formula_consecutiva_max) {
        const formula = ETICHETTE_FORMULA[serie[0].formula] || serie[0].formula;
        serie.slice(r.soglie.formula_consecutiva_max).forEach((s) => aggiungi('formula',
          serie.length + ' frasi consecutive iniziano con ' + formula + ': alternare le formule',
          s.frase.inizio, s.frase.inizio + s.frase.testo.length));
      }
      serie = [];
    };
    elencoFrasi.forEach((f) => {
      const formula = formulaIniziale(f);
      if (formula && serie.length && serie[0].formula === formula) serie.push({ formula, frase: f });
      else {
        chiudiSerie();
        if (formula) serie.push({ formula, frase: f });
      }
    });
    chiudiSerie();

    // 8. Regole di contesto
    if (contesto) {
      r.contesti.filter((c) => c.contesto === contesto).forEach((c) => {
        elencoFrasi.forEach((f) => {
          const testoFrase = f.testo.toLowerCase();
          if (testoFrase.includes(c.seCompare.toLowerCase()) && !testoFrase.includes(c.richiesto.toLowerCase())) {
            aggiungi('contesto', '«' + c.seCompare + '» (' + c.contesto + '): introdurre con «' + c.richiesto + '»',
              f.inizio, f.inizio + f.testo.length);
          }
        });
      });
    }

    return avvisi.sort((a, b) => a.inizio - b.inizio || a.fine - b.fine);
  }

  return { leggiRegole, leggiEsempi, controlla };
});
