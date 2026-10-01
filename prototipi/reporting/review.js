/*
 * review.js — strumento di revisione dei testi clinici di data.js.
 *
 * - Legge ESAMI e LINGUE caricati da data.js (sola lettura: i testi non si toccano).
 * - Crea una riga per ogni reperto e per ogni lingua, più una riga "(esame)"
 *   per lingua con titolo, tecnica e conclusione normale.
 * - Segnala automaticamente i problemi (traduzioni mancanti, segnaposto, id duplicati…).
 * - Salva stato, note, revisore e data in localStorage.
 * - Esporta tutto in CSV (separatore ";" per Excel in italiano) e in JSON di backup.
 *
 * Le regole di controllo sono le stesse di review_export.py: se ne cambi una,
 * aggiorna anche l'altra.
 */
(function () {
  'use strict';

  // ---------- Costanti ----------

  const CHIAVE_REVISIONE = 'refertario-revisione-v1';
  const CHIAVE_REVISORE = 'refertario-revisore';
  const ID_RIGA_ESAME = '(esame)';

  const STATI = {
    rivedere: 'Da rivedere',
    ok: 'OK',
    correggere: 'Da correggere'
  };

  // Parole che indicano un testo non finito
  const SEGNAPOSTO = /\b(TODO|TBD|FIXME|XXX+)\b|da specificare|da definire|da completare|\?\?\?|lorem ipsum/i;
  // Graffe del tipo {campo} rimaste nel testo
  const GRAFFE = /\{[^}]*\}/;
  // Sotto questa lunghezza un testo uguale all'italiano non è sospetto (es. "TC", "Splenomegalia")
  const MIN_LUNGHEZZA_COPIA = 20;

  // Colonne del CSV (stesso ordine di review_export.py)
  const COLONNE_CSV = [
    'esame', 'id_reperto', 'etichetta', 'lingua', 'testo_negativo', 'testo_positivo',
    'conclusione', 'problemi', 'stato', 'note', 'revisore', 'data'
  ];

  // ---------- Riferimenti alla pagina ----------

  const $ = (id) => document.getElementById(id);
  const corpo = $('corpo');
  const inputRevisore = $('nome-revisore');
  const filtri = {
    esame: $('f-esame'),
    lingua: $('f-lingua'),
    stato: $('f-stato'),
    testo: $('f-testo'),
    problemi: $('f-problemi'),
    riferimento: $('f-riferimento')
  };

  // ---------- Lettura sicura di localStorage ----------

  function leggiStorage(chiave, ripiego) {
    try {
      const valore = localStorage.getItem(chiave);
      return valore === null ? ripiego : JSON.parse(valore);
    } catch (e) {
      return ripiego;
    }
  }

  function scriviStorage(chiave, valore) {
    try {
      localStorage.setItem(chiave, JSON.stringify(valore));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Stato della revisione: { "esame|reperto|lingua": { stato, note, revisore, data, impronta } }
  let revisione = leggiStorage(CHIAVE_REVISIONE, {}) || {};

  // ---------- Utilità ----------

  /** Testo in una lingua, oppure null se il campo o la lingua mancano. */
  function testoIn(campo, lingua) {
    if (!campo || typeof campo !== 'object') return null;
    return Object.prototype.hasOwnProperty.call(campo, lingua) ? String(campo[lingua]) : null;
  }

  /** Conta le occorrenze di ogni valore (per trovare id duplicati). */
  function conta(valori) {
    const mappa = new Map();
    valori.forEach((v) => mappa.set(v, (mappa.get(v) || 0) + 1));
    return mappa;
  }

  /** Impronta breve dei testi di una riga: serve a capire se sono cambiati dopo la revisione. */
  function impronta(riga) {
    const s = [riga.etichetta, riga.negativo, riga.positivo, riga.conclusione].map((x) => x ?? '').join('␞');
    let h = 2166136261; // FNV-1a 32 bit
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  /** Data di oggi in formato AAAA-MM-GG (ora locale). */
  function oggi() {
    const d = new Date();
    const due = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + due(d.getMonth() + 1) + '-' + due(d.getDate());
  }

  /** Crea un elemento con testo opzionale e classe opzionale. */
  function el(tag, testo, classe) {
    const nodo = document.createElement(tag);
    if (testo != null && testo !== '') nodo.textContent = testo;
    if (classe) nodo.className = classe;
    return nodo;
  }

  // ---------- Controlli automatici ----------

  /**
   * Controlla un campo multilingua in una lingua.
   * obbligatorio=false: se il campo manca del tutto non è un errore.
   */
  function controllaCampo(problemi, campo, lingua, nome, obbligatorio) {
    if (campo === undefined || campo === null) {
      if (obbligatorio) problemi.push({ livello: 'errore', testo: nome + ': campo assente' });
      return;
    }
    if (typeof campo !== 'object' || Array.isArray(campo)) {
      problemi.push({ livello: 'errore', testo: nome + ': formato non valido' });
      return;
    }
    const valore = testoIn(campo, lingua);
    if (valore === null) {
      problemi.push({ livello: 'errore', testo: nome + ': traduzione ' + lingua.toUpperCase() + ' mancante' });
      return;
    }
    if (valore.trim() === '') {
      problemi.push({ livello: 'errore', testo: nome + ': vuoto' });
      return;
    }
    if (SEGNAPOSTO.test(valore)) {
      problemi.push({ livello: 'errore', testo: nome + ': contiene un segnaposto (TODO, XXX, da specificare…)' });
    }
    if (GRAFFE.test(valore)) {
      problemi.push({ livello: 'avviso', testo: nome + ': graffe {…} non sostituite' });
    }
    const it = testoIn(campo, 'it');
    if (lingua !== 'it' && it && valore.trim() === it.trim() && valore.length >= MIN_LUNGHEZZA_COPIA) {
      problemi.push({ livello: 'avviso', testo: nome + ': identico all\'italiano (non tradotto?)' });
    }
  }

  /** Lingue presenti nei testi ma non dichiarate in LINGUE (es. refuso "en " o "eng"). */
  function lingueNonDichiarate(oggetti, lingue) {
    const extra = new Set();
    oggetti.forEach((o) => {
      if (o && typeof o === 'object' && !Array.isArray(o)) {
        Object.keys(o).forEach((k) => { if (!lingue.includes(k)) extra.add(k); });
      }
    });
    return Array.from(extra);
  }

  // ---------- Costruzione delle righe ----------

  /** Trasforma ESAMI in righe piatte (una per reperto e lingua). */
  function costruisciRighe(esami, lingue) {
    const righe = [];
    const contaEsami = conta(esami.map((e) => e && e.id));

    esami.forEach((esame, indiceEsame) => {
      const esameId = (esame && esame.id) || '(senza id #' + (indiceEsame + 1) + ')';
      const reperti = Array.isArray(esame && esame.reperti) ? esame.reperti : [];
      const contaReperti = conta(reperti.map((r) => r && r.id));

      // --- Riga "(esame)": titolo, tecnica, conclusione normale ---
      lingue.forEach((lingua) => {
        const problemi = [];
        if (!esame || !esame.id) problemi.push({ livello: 'errore', testo: 'esame senza id' });
        else if (contaEsami.get(esame.id) > 1) problemi.push({ livello: 'errore', testo: 'id esame duplicato: ' + esame.id });
        if (!reperti.length) problemi.push({ livello: 'errore', testo: 'esame senza reperti' });
        controllaCampo(problemi, esame && esame.nome, lingua, 'nome esame', true);
        controllaCampo(problemi, esame && esame.titolo, lingua, 'titolo', true);
        controllaCampo(problemi, esame && esame.tecnica, lingua, 'tecnica', true);
        controllaCampo(problemi, esame && esame.conclusioneNormale, lingua, 'conclusione normale', true);
        if (lingua === lingue[0] && esame) {
          const extra = lingueNonDichiarate([esame.nome, esame.titolo, esame.tecnica, esame.conclusioneNormale], lingue);
          if (extra.length) problemi.push({ livello: 'avviso', testo: 'lingue non dichiarate in LINGUE: ' + extra.join(', ') });
        }

        righe.push({
          tipo: 'esame',
          esameId,
          esameNome: testoIn(esame && esame.nome, 'it') || esameId,
          repertoId: ID_RIGA_ESAME,
          lingua,
          etichetta: testoIn(esame && esame.titolo, lingua),
          negativo: testoIn(esame && esame.tecnica, lingua),
          positivo: null,
          conclusione: testoIn(esame && esame.conclusioneNormale, lingua),
          riferimento: {
            etichetta: testoIn(esame && esame.titolo, 'it'),
            negativo: testoIn(esame && esame.tecnica, 'it'),
            conclusione: testoIn(esame && esame.conclusioneNormale, 'it')
          },
          problemi
        });
      });

      // --- Righe dei reperti ---
      reperti.forEach((r, indiceReperto) => {
        const repertoId = (r && r.id) || '(senza id #' + (indiceReperto + 1) + ')';
        lingue.forEach((lingua) => {
          const problemi = [];
          if (!r || !r.id) problemi.push({ livello: 'errore', testo: 'reperto senza id' });
          else if (contaReperti.get(r.id) > 1) problemi.push({ livello: 'errore', testo: 'id reperto duplicato nell\'esame' });
          controllaCampo(problemi, r && r.etichetta, lingua, 'etichetta', true);
          controllaCampo(problemi, r && r.negativo, lingua, 'negativo', true);
          controllaCampo(problemi, r && r.positivo, lingua, 'positivo', true);
          controllaCampo(problemi, r && r.conclusione, lingua, 'conclusione', false);
          if (r && r.conclusione == null) {
            problemi.push({ livello: 'avviso', testo: 'conclusione assente: nel referto si usa l\'etichetta' });
          }
          const neg = testoIn(r && r.negativo, lingua);
          const pos = testoIn(r && r.positivo, lingua);
          if (neg && pos && neg.trim() === pos.trim()) {
            problemi.push({ livello: 'errore', testo: 'testo negativo e positivo identici' });
          }
          if (lingua === lingue[0] && r) {
            const extra = lingueNonDichiarate([r.etichetta, r.negativo, r.positivo, r.conclusione], lingue);
            if (extra.length) problemi.push({ livello: 'avviso', testo: 'lingue non dichiarate in LINGUE: ' + extra.join(', ') });
          }

          righe.push({
            tipo: 'reperto',
            esameId,
            esameNome: testoIn(esame && esame.nome, 'it') || esameId,
            repertoId,
            lingua,
            etichetta: testoIn(r && r.etichetta, lingua),
            negativo: neg,
            positivo: pos,
            conclusione: testoIn(r && r.conclusione, lingua),
            riferimento: {
              etichetta: testoIn(r && r.etichetta, 'it'),
              negativo: testoIn(r && r.negativo, 'it'),
              positivo: testoIn(r && r.positivo, 'it'),
              conclusione: testoIn(r && r.conclusione, 'it')
            },
            problemi
          });
        });
      });
    });

    // Chiave univoca e impronta per ogni riga
    righe.forEach((riga) => {
      riga.chiave = riga.esameId + '|' + riga.repertoId + '|' + riga.lingua;
      riga.impronta = impronta(riga);
    });
    return righe;
  }

  /** Problemi "dinamici" legati alla revisione salvata (es. testo cambiato dopo l'OK). */
  function problemiRevisione(riga) {
    const r = revisione[riga.chiave];
    if (r && r.stato && r.stato !== 'rivedere' && r.impronta && r.impronta !== riga.impronta) {
      return [{ livello: 'errore', testo: 'testo modificato dopo la revisione del ' + (r.data || '?') }];
    }
    return [];
  }

  function tuttiIProblemi(riga) {
    return riga.problemi.concat(problemiRevisione(riga));
  }

  function statoDi(riga) {
    const r = revisione[riga.chiave];
    return (r && STATI[r.stato]) ? r.stato : 'rivedere';
  }

  // ---------- Disegno della tabella ----------

  /** Cella con un testo clinico (o l'indicazione che manca). */
  function cellaTesto(riga, campo, colonna, etichettaCampo) {
    const td = el('td', null, 'c-testo');
    td.dataset.colonna = colonna;
    if (etichettaCampo) td.append(el('span', etichettaCampo, 'etichetta-campo'));

    const valore = riga[campo];
    if (riga.tipo === 'esame' && campo === 'positivo') {
      td.append(el('span', '—', 'c-piccola'));
      return td;
    }
    if (valore === null) td.append(el('span', campo === 'conclusione' ? '(assente)' : '(mancante)', 'vuoto'));
    else if (valore.trim() === '') td.append(el('span', '(vuoto)', 'vuoto'));
    else td.append(document.createTextNode(valore));

    // Testo italiano di riferimento, sotto le lingue diverse dall'italiano
    const rif = riga.riferimento[campo];
    if (riga.lingua !== 'it' && rif) {
      const span = el('span', 'IT: ' + rif, 'riferimento');
      span.hidden = !filtri.riferimento.checked;
      td.append(span);
    }
    return td;
  }

  /** Elenco dei problemi di una riga. */
  function disegnaProblemi(td, riga) {
    td.textContent = '';
    const problemi = tuttiIProblemi(riga);
    if (!problemi.length) {
      td.append(el('span', '✓ nessuno', 'nessun-problema'));
      return;
    }
    const ul = el('ul', null, 'problemi');
    problemi.forEach((p) => ul.append(el('li', p.testo, 'problema problema--' + p.livello)));
    td.append(ul);
  }

  /** Crea tutte le righe della tabella una volta sola; i filtri le nascondono. */
  function disegnaTabella(righe) {
    corpo.textContent = '';
    let gruppoPrecedente = '';

    righe.forEach((riga) => {
      const tr = document.createElement('tr');
      riga.tr = tr;
      if (riga.tipo === 'esame') tr.classList.add('riga-esame');

      const gruppo = riga.esameId + '|' + riga.repertoId;
      if (gruppo !== gruppoPrecedente) tr.classList.add('inizio-gruppo');
      gruppoPrecedente = gruppo;

      const esame = el('td', riga.esameNome);
      esame.dataset.colonna = 'Esame';
      const id = el('td', riga.repertoId, 'c-id');
      id.dataset.colonna = 'ID reperto';
      const lingua = el('td');
      lingua.dataset.colonna = 'Lingua';
      lingua.append(el('span', riga.lingua, 'lingua'));

      const isEsame = riga.tipo === 'esame';
      const celle = [
        esame,
        id,
        cellaTesto(riga, 'etichetta', 'Etichetta', isEsame ? 'Titolo' : ''),
        lingua,
        cellaTesto(riga, 'negativo', 'Testo negativo', isEsame ? 'Tecnica' : ''),
        cellaTesto(riga, 'positivo', 'Testo positivo', ''),
        cellaTesto(riga, 'conclusione', 'Conclusione', isEsame ? 'Conclusione normale' : '')
      ];

      // Controlli automatici
      const tdProblemi = el('td');
      tdProblemi.dataset.colonna = 'Controlli';
      riga.tdProblemi = tdProblemi;
      disegnaProblemi(tdProblemi, riga);

      // Stato
      const tdStato = el('td');
      tdStato.dataset.colonna = 'Stato';
      const sel = document.createElement('select');
      sel.setAttribute('aria-label', 'Stato ' + riga.chiave);
      Object.entries(STATI).forEach(([valore, testo]) => sel.add(new Option(testo, valore)));
      sel.value = statoDi(riga);
      sel.addEventListener('change', () => cambiaStato(riga, sel));
      tdStato.append(sel);

      // Note
      const tdNote = el('td', null, 'c-note');
      tdNote.dataset.colonna = 'Note';
      const area = document.createElement('textarea');
      area.setAttribute('aria-label', 'Note ' + riga.chiave);
      area.placeholder = 'Correzioni, dubbi, fonte…';
      area.value = (revisione[riga.chiave] && revisione[riga.chiave].note) || '';
      area.addEventListener('input', () => cambiaNote(riga, area));
      tdNote.append(area);

      // Revisore e data
      const tdRevisore = el('td', null, 'c-piccola');
      tdRevisore.dataset.colonna = 'Revisore';
      const tdData = el('td', null, 'c-piccola');
      tdData.dataset.colonna = 'Data';
      riga.tdRevisore = tdRevisore;
      riga.tdData = tdData;

      tr.append(...celle, tdProblemi, tdStato, tdNote, tdRevisore, tdData);
      corpo.append(tr);
      aggiornaRiga(riga);
    });
  }

  /** Aggiorna colore, revisore, data e problemi di una riga dopo una modifica. */
  function aggiornaRiga(riga) {
    const r = revisione[riga.chiave] || {};
    const stato = statoDi(riga);
    riga.tr.classList.toggle('stato-ok', stato === 'ok');
    riga.tr.classList.toggle('stato-correggere', stato === 'correggere');
    riga.tdRevisore.textContent = r.revisore || '';
    riga.tdData.textContent = r.data || '';
    disegnaProblemi(riga.tdProblemi, riga);
  }

  // ---------- Modifiche della revisione ----------

  /** Il nome del revisore è obbligatorio per lasciare traccia di chi ha validato. */
  function revisoreValido() {
    const nome = inputRevisore.value.trim();
    inputRevisore.classList.toggle('manca', !nome);
    if (!nome) {
      inputRevisore.focus();
      mostraSalvataggio('Inserisci il nome del revisore prima di modificare la revisione.', true);
    }
    return nome;
  }

  /** Registra revisore, data e impronta dei testi nella voce della riga. */
  function firma(riga, nome) {
    const voce = revisione[riga.chiave] || { stato: 'rivedere', note: '' };
    voce.revisore = nome;
    voce.data = oggi();
    voce.impronta = riga.impronta;
    revisione[riga.chiave] = voce;
    return voce;
  }

  function cambiaStato(riga, sel) {
    const nome = revisoreValido();
    if (!nome) {
      sel.value = statoDi(riga); // annulla la modifica
      return;
    }
    firma(riga, nome).stato = sel.value;
    salva();
    aggiornaRiga(riga);
    aggiornaRiepilogo();
    applicaFiltri();
  }

  // Le note si salvano mentre si scrive, con un piccolo ritardo
  let timerNote = null;
  function cambiaNote(riga, area) {
    const nome = revisoreValido();
    if (!nome) return;
    firma(riga, nome).note = area.value;
    aggiornaRiga(riga);
    clearTimeout(timerNote);
    timerNote = setTimeout(salva, 400);
  }

  function salva() {
    const ok = scriviStorage(CHIAVE_REVISIONE, revisione);
    mostraSalvataggio(ok ? 'Salvato in locale · ' + new Date().toLocaleTimeString() : 'Salvataggio non riuscito (localStorage non disponibile): esporta il backup JSON.', !ok);
  }

  function mostraSalvataggio(testo, errore) {
    const nodo = $('salvataggio');
    nodo.textContent = testo;
    nodo.classList.toggle('errore', !!errore);
  }

  // ---------- Filtri e riepilogo ----------

  function applicaFiltri() {
    const esame = filtri.esame.value;
    const lingua = filtri.lingua.value;
    const stato = filtri.stato.value;
    const cerca = filtri.testo.value.trim().toLowerCase();
    const soloProblemi = filtri.problemi.checked;
    let visibili = 0;

    RIGHE.forEach((riga) => {
      let mostra = (!esame || riga.esameId === esame)
        && (!lingua || riga.lingua === lingua)
        && (!stato || statoDi(riga) === stato)
        && (!soloProblemi || tuttiIProblemi(riga).length > 0);

      if (mostra && cerca) {
        const note = (revisione[riga.chiave] && revisione[riga.chiave].note) || '';
        const pagliaio = [riga.esameNome, riga.esameId, riga.repertoId, riga.etichetta, riga.negativo,
          riga.positivo, riga.conclusione, note].join(' ').toLowerCase();
        mostra = pagliaio.includes(cerca);
      }
      riga.tr.hidden = !mostra;
      if (mostra) visibili++;
    });

    $('conteggio').textContent = visibili + ' di ' + RIGHE.length + ' righe visibili';
    $('nessuna-riga').hidden = visibili > 0;
  }

  function aggiornaRiepilogo() {
    const conteggi = { rivedere: 0, ok: 0, correggere: 0 };
    let conProblemi = 0;
    RIGHE.forEach((riga) => {
      conteggi[statoDi(riga)]++;
      if (tuttiIProblemi(riga).length) conProblemi++;
    });
    const percentuale = RIGHE.length ? Math.round((conteggi.ok / RIGHE.length) * 100) : 0;
    const voci = [
      ['', RIGHE.length, 'righe totali'],
      ['', conteggi.rivedere, 'da rivedere'],
      ['cifra--ok', conteggi.ok + ' (' + percentuale + '%)', 'OK'],
      ['cifra--correggere', conteggi.correggere, 'da correggere'],
      ['cifra--problemi', conProblemi, 'con problemi automatici']
    ];
    const box = $('riepilogo');
    box.textContent = '';
    voci.forEach(([classe, numero, testo]) => {
      const div = el('div', null, 'cifra ' + classe);
      div.append(el('strong', String(numero)), el('span', testo));
      box.append(div);
    });
  }

  // ---------- Esportazione e backup ----------

  /** Racchiude un valore tra virgolette CSV quando serve. */
  function cellaCsv(valore) {
    const s = valore == null ? '' : String(valore);
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  /** Valori di una riga nell'ordine di COLONNE_CSV. */
  function valoriCsv(riga) {
    const r = revisione[riga.chiave] || {};
    return [
      riga.esameId,
      riga.repertoId,
      riga.etichetta,
      riga.lingua,
      riga.negativo,
      riga.positivo,
      riga.conclusione,
      tuttiIProblemi(riga).map((p) => p.livello.toUpperCase() + ': ' + p.testo).join(' | '),
      STATI[statoDi(riga)],
      r.note || '',
      r.revisore || '',
      r.data || ''
    ];
  }

  function scarica(nomeFile, contenuto, tipo) {
    const blob = new Blob([contenuto], { type: tipo });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeFile;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /** CSV di tutte le righe (non solo quelle filtrate), con BOM per Excel. */
  function esportaCsv() {
    const linee = [COLONNE_CSV.join(';')].concat(RIGHE.map((riga) => valoriCsv(riga).map(cellaCsv).join(';')));
    scarica('revisione-referti-' + oggi() + '.csv', '﻿' + linee.join('\r\n'), 'text/csv;charset=utf-8');
  }

  /** Backup completo della revisione (utile per cambiare browser o computer). */
  function esportaJson() {
    const dati = { formato: 'refertario-revisione', versione: 1, esportato: new Date().toISOString(), revisione };
    scarica('revisione-referti-' + oggi() + '.json', JSON.stringify(dati, null, 2), 'application/json');
  }

  /** Importa un backup: le voci del file sostituiscono quelle con la stessa chiave. */
  function importaJson(file) {
    const lettore = new FileReader();
    lettore.onload = () => {
      try {
        const dati = JSON.parse(lettore.result);
        const voci = dati && dati.revisione;
        if (!voci || typeof voci !== 'object') throw new Error('file non riconosciuto');
        const n = Object.keys(voci).length;
        if (!confirm('Importare ' + n + ' voci di revisione? Le voci con la stessa chiave verranno sostituite.')) return;
        Object.assign(revisione, voci);
        salva();
        RIGHE.forEach((riga) => {
          riga.tr.querySelector('select').value = statoDi(riga);
          riga.tr.querySelector('textarea').value = (revisione[riga.chiave] && revisione[riga.chiave].note) || '';
          aggiornaRiga(riga);
        });
        aggiornaRiepilogo();
        applicaFiltri();
      } catch (e) {
        alert('Importazione non riuscita: ' + e.message);
      }
    };
    lettore.readAsText(file);
  }

  // ---------- Avvio ----------

  // Se data.js manca o contiene un errore di sintassi, ESAMI non esiste
  if (typeof ESAMI === 'undefined' || !Array.isArray(ESAMI)) {
    const box = $('errore-dati');
    box.hidden = false;
    box.textContent = 'Impossibile leggere ESAMI da data.js.\n'
      + 'Controlla che il file esista nella stessa cartella e non contenga errori di sintassi '
      + '(apri la console del browser per il dettaglio, oppure esegui: node --check data.js).';
    return;
  }

  const LINGUE_ATTIVE = (typeof LINGUE === 'object' && LINGUE) ? Object.keys(LINGUE) : ['it'];
  const RIGHE = costruisciRighe(ESAMI, LINGUE_ATTIVE);

  // Menu dei filtri
  ESAMI.forEach((e, i) => {
    if (!e) return;
    const id = e.id || '(senza id #' + (i + 1) + ')';
    filtri.esame.add(new Option(testoIn(e.nome, 'it') || id, id));
  });
  LINGUE_ATTIVE.forEach((codice) => filtri.lingua.add(new Option(LINGUE[codice] + ' (' + codice + ')', codice)));

  // Nome del revisore ricordato tra una sessione e l'altra
  inputRevisore.value = leggiStorage(CHIAVE_REVISORE, '') || '';
  inputRevisore.addEventListener('input', () => {
    inputRevisore.classList.remove('manca');
    scriviStorage(CHIAVE_REVISORE, inputRevisore.value.trim());
  });

  disegnaTabella(RIGHE);
  aggiornaRiepilogo();
  applicaFiltri();

  // Eventi dei filtri
  ['esame', 'lingua', 'stato', 'problemi'].forEach((k) => filtri[k].addEventListener('change', applicaFiltri));
  filtri.testo.addEventListener('input', applicaFiltri);
  filtri.riferimento.addEventListener('change', () => {
    document.querySelectorAll('.riferimento').forEach((n) => { n.hidden = !filtri.riferimento.checked; });
  });

  // Eventi dei pulsanti
  $('btn-csv').addEventListener('click', esportaCsv);
  $('btn-json').addEventListener('click', esportaJson);
  $('file-json').addEventListener('change', (ev) => {
    if (ev.target.files[0]) importaJson(ev.target.files[0]);
    ev.target.value = '';
  });
})();
