/*
 * review.js — strumento di revisione dei testi clinici di data.js.
 *
 * - Legge METODICHE, FRASI_COMUNI e LINGUE da data.js (sola lettura: i testi non si toccano).
 * - Crea, per ogni lingua, una riga per distretto (titolo, intro, conclusione negativa),
 *   una per organo (frase negativa) e una per reperto (frase positiva), più le frasi comuni.
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

  const CHIAVE_REVISIONE = 'refertario-revisione-v2';
  const CHIAVE_REVISORE = 'refertario-revisore';
  const ID_RIGA_DISTRETTO = '(distretto)';
  const ID_RIGA_TECNICA = '(tecnica)';

  const STATI = {
    rivedere: 'Da rivedere',
    ok: 'OK',
    correggere: 'Da correggere'
  };

  // Parole che indicano un testo non finito
  const SEGNAPOSTO = /\b(TODO|TBD|FIXME|XXX+)\b|da specificare|da definire|da completare|\?\?\?|lorem ipsum/i;
  // Graffe del tipo {campo} rimaste nel testo ({lato} è previsto e viene sostituito)
  const GRAFFE = /\{(?!lato\})[^}]*\}/;
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
    nuovi: $('f-nuovi'),
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
    if (typeof campo === 'string') return lingua === 'it' ? campo : null;
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
    if (typeof campo === 'string') campo = { it: campo }; // stringa semplice = italiano
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

  /** Controlla id mancanti o duplicati. */
  function controllaId(problemi, oggetto, conteggi, cosa) {
    if (!oggetto || !oggetto.id) problemi.push({ livello: 'errore', testo: cosa + ' senza id' });
    else if (conteggi.get(oggetto.id) > 1) problemi.push({ livello: 'errore', testo: 'id ' + cosa + ' duplicato: ' + oggetto.id });
  }

  /** Avviso per le frasi da verificare: nuove (scritte da Claude) o riscritte nello stile telegrafico. */
  function controllaNuovo(problemi, oggetto) {
    if (oggetto && oggetto.nuovo) problemi.push({ livello: 'avviso', testo: 'frase nuova (non dal tuo archivio): verificare' });
    if (oggetto && oggetto.riscritta) problemi.push({ livello: 'avviso', testo: 'frase riscritta nel nuovo stile: verificare' });
  }
  const daVerificare = (o) => !!(o && (o.nuovo || o.riscritta));

  /** Lingue di un elenco (es. distretto.lingue), limitate a quelle dichiarate in LINGUE. Predefinito: italiano. */
  function lingueDi(oggetto, lingue) {
    const proprie = (oggetto && Array.isArray(oggetto.lingue) && oggetto.lingue.length) ? oggetto.lingue : ['it'];
    return proprie.filter((l) => lingue.includes(l));
  }

  /** Avviso per le traduzioni (EN/ES) non ancora verificate. */
  function controllaTraduzione(problemi, contenitore, lingua) {
    if (lingua !== 'it' && contenitore && contenitore.traduzioniDaVerificare) {
      problemi.push({ livello: 'avviso', testo: 'traduzione nuova: verificare' });
      return true;
    }
    return false;
  }

  /**
   * Trasforma METODICHE e FRASI_COMUNI in righe piatte (una per voce e lingua).
   * Le righe in EN/ES esistono solo per i distretti (e le frasi comuni) tradotti, cioè con `lingue`.
   * Nomi ed etichette sono testi dell'interfaccia: si controllano solo in italiano.
   */
  function costruisciRighe(metodiche, frasi, lingue) {
    const righe = [];
    const aggiungi = (riga) => righe.push(riga);
    const etichettaIn = (campo, lingua) => testoIn(campo, lingua) || testoIn(campo, 'it');

    // --- Frasi comuni (in testa e in coda) ---
    const lingueFrasi = lingueDi(frasi, lingue);
    ['premessa', 'chiusura'].forEach((sezione) => {
      const elenco = (frasi && Array.isArray(frasi[sezione])) ? frasi[sezione] : [];
      const conteggi = conta(elenco.map((f) => f && f.id));
      elenco.forEach((f, i) => {
        const id = (f && f.id) || '(senza id #' + (i + 1) + ')';
        lingueFrasi.forEach((lingua) => {
          const problemi = [];
          controllaId(problemi, f, conteggi, 'frase');
          if (lingua === 'it') controllaCampo(problemi, f && f.etichetta, lingua, 'etichetta', true);
          controllaCampo(problemi, f && f.testo, lingua, 'testo', true);
          controllaNuovo(problemi, f);
          const traduzione = controllaTraduzione(problemi, frasi, lingua);
          aggiungi({
            tipo: 'frase', gruppoId: 'frasi-comuni', esameNome: 'Frasi comuni', repertoId: sezione + '/' + id, lingua,
            etichetta: etichettaIn(f && f.etichetta, lingua), negativo: null, positivo: testoIn(f && f.testo, lingua), conclusione: null,
            nuovo: daVerificare(f) || traduzione,
            riferimento: { etichetta: testoIn(f && f.etichetta, 'it'), positivo: testoIn(f && f.testo, 'it') },
            problemi
          });
        });
      });
    });

    // --- Metodiche → distretti → organi → reperti ---
    (metodiche || []).forEach((m) => {
      const distretti = Array.isArray(m && m.distretti) ? m.distretti : [];
      const contaDistretti = conta(distretti.map((d) => d && d.id));
      distretti.forEach((d, iD) => {
        const idD = (d && d.id) || '(senza id #' + (iD + 1) + ')';
        const gruppoId = m.id + '/' + idD;
        const esameNome = m.nome + ' › ' + (testoIn(d && d.nome, 'it') || idD);
        const organi = Array.isArray(d && d.organi) ? d.organi : [];
        const contaOrgani = conta(organi.map((o) => o && o.id));
        const lingueD = lingueDi(d, lingue);
        const introIn = (lingua) => [testoIn(d && d.intro, lingua), testoIn(d && d.introBilaterale, lingua)].filter(Boolean).join(' / ') || null;

        lingueD.forEach((lingua) => {
          // Riga del distretto: titolo, intro, conclusione negativa
          const problemi = [];
          controllaId(problemi, d, contaDistretti, 'distretto');
          if (!organi.length) problemi.push({ livello: 'errore', testo: 'distretto senza organi' });
          if (lingua === 'it') controllaCampo(problemi, d && d.nome, lingua, 'nome', true);
          controllaCampo(problemi, d && d.titolo, lingua, 'titolo', true);
          if (d && d.intro) controllaCampo(problemi, d.intro, lingua, 'intro', true);
          if (d && d.introBilaterale) controllaCampo(problemi, d.introBilaterale, lingua, 'intro bilaterale', true);
          if (d && d.lati && !(testoIn(d.intro, lingua) || '').includes('{lato}')) {
            problemi.push({ livello: 'avviso', testo: 'distretto con lati ma intro senza {lato}' });
          }
          controllaCampo(problemi, d && d.conclusioneNegativa, lingua, 'conclusione negativa', false);
          controllaNuovo(problemi, d);
          const traduzione = controllaTraduzione(problemi, d, lingua);
          aggiungi({
            tipo: 'distretto', gruppoId, esameNome, repertoId: ID_RIGA_DISTRETTO, lingua,
            etichetta: testoIn(d && d.titolo, lingua), negativo: introIn(lingua), positivo: null,
            conclusione: testoIn(d && d.conclusioneNegativa, lingua), nuovo: daVerificare(d) || traduzione,
            riferimento: { etichetta: testoIn(d && d.titolo, 'it'), negativo: introIn('it'), conclusione: testoIn(d && d.conclusioneNegativa, 'it') },
            problemi
          });

          // Riga della tecnica (se presente)
          if (d && d.tecnica) {
            const pt = [];
            controllaCampo(pt, d.tecnica, lingua, 'tecnica', true);
            if (d.tecnicaNuova) pt.push({ livello: 'avviso', testo: 'frase nuova (non dal tuo archivio): verificare' });
            const trad = controllaTraduzione(pt, d, lingua);
            aggiungi({
              tipo: 'tecnica', gruppoId, esameNome, repertoId: ID_RIGA_TECNICA, lingua,
              etichetta: 'Tecnica', negativo: testoIn(d.tecnica, lingua), positivo: null, conclusione: null,
              nuovo: !!d.tecnicaNuova || trad,
              riferimento: { negativo: testoIn(d.tecnica, 'it') },
              problemi: pt
            });
          }
        });

        organi.forEach((o, iO) => {
          const idO = (o && o.id) || '(senza id #' + (iO + 1) + ')';
          const reperti = Array.isArray(o && o.reperti) ? o.reperti : [];
          const contaReperti = conta(reperti.map((r) => r && r.id));

          // Riga dell'organo: frase negativa
          lingueD.forEach((lingua) => {
            const problemi = [];
            controllaId(problemi, o, contaOrgani, 'organo');
            if (lingua === 'it') controllaCampo(problemi, o && o.nome, lingua, 'nome organo', true);
            if (o && o.negativo) controllaCampo(problemi, o.negativo, lingua, 'negativo', true);
            else if (!reperti.length) problemi.push({ livello: 'errore', testo: 'organo senza frase negativa né reperti' });
            controllaNuovo(problemi, o);
            const traduzione = o && o.negativo ? controllaTraduzione(problemi, d, lingua) : false;
            aggiungi({
              tipo: 'organo', gruppoId, esameNome, repertoId: idO, lingua,
              etichetta: etichettaIn(o && o.nome, lingua), negativo: (o && o.negativo) ? testoIn(o.negativo, lingua) : '',
              positivo: null, conclusione: null, nuovo: daVerificare(o) || traduzione,
              riferimento: { etichetta: testoIn(o && o.nome, 'it'), negativo: testoIn(o && o.negativo, 'it') },
              problemi
            });
          });

          // Righe dei reperti: frase positiva
          reperti.forEach((r, iR) => {
            const idR = (r && r.id) || '(senza id #' + (iR + 1) + ')';
            lingueD.forEach((lingua) => {
              const problemi = [];
              controllaId(problemi, r, contaReperti, 'reperto');
              if (lingua === 'it') controllaCampo(problemi, r && r.etichetta, lingua, 'etichetta', true);
              controllaCampo(problemi, r && r.testo, lingua, 'testo positivo', true);
              controllaCampo(problemi, r && r.conclusione, lingua, 'conclusione', false);
              if (r && r.modo && !['sostituisce', 'aggiunge'].includes(r.modo)) {
                problemi.push({ livello: 'errore', testo: 'modo non valido: ' + r.modo });
              }
              const neg = testoIn(o && o.negativo, lingua);
              const pos = testoIn(r && r.testo, lingua);
              if (neg && pos && neg.trim() === pos.trim()) problemi.push({ livello: 'errore', testo: 'testo positivo identico al negativo' });
              controllaNuovo(problemi, r);
              const traduzione = controllaTraduzione(problemi, d, lingua);
              aggiungi({
                tipo: 'reperto', gruppoId, esameNome, repertoId: idO + '/' + idR, lingua,
                etichetta: etichettaIn(r && r.etichetta, lingua), negativo: null, positivo: pos,
                conclusione: testoIn(r && r.conclusione, lingua), nuovo: daVerificare(r) || traduzione,
                riferimento: { etichetta: testoIn(r && r.etichetta, 'it'), positivo: testoIn(r && r.testo, 'it'), conclusione: testoIn(r && r.conclusione, 'it') },
                problemi
              });
            });
          });
        });
      });
    });

    // Chiave univoca e impronta per ogni riga
    righe.forEach((riga) => {
      riga.chiave = riga.gruppoId + '|' + riga.repertoId + '|' + riga.lingua;
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
    // Celle che per quel tipo di riga non hanno contenuto
    const nonPrevisto = (riga.tipo === 'distretto' && campo === 'positivo')
      || (riga.tipo === 'organo' && (campo === 'positivo' || campo === 'conclusione'))
      || ((riga.tipo === 'reperto' || riga.tipo === 'frase') && campo === 'negativo')
      || (riga.tipo === 'frase' && campo === 'conclusione')
      || (riga.tipo === 'tecnica' && (campo === 'positivo' || campo === 'conclusione'));
    if (nonPrevisto || (valore === '' && riga.tipo === 'organo') || (valore === null && riga.tipo === 'distretto' && campo === 'negativo')) {
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
      if (riga.tipo === 'distretto' || riga.tipo === 'tecnica') tr.classList.add('riga-esame');
      if (riga.tipo === 'organo') tr.classList.add('riga-organo');

      const gruppo = riga.gruppoId + '|' + riga.repertoId.split('/')[0];
      if (gruppo !== gruppoPrecedente) tr.classList.add('inizio-gruppo');
      gruppoPrecedente = gruppo;

      const esame = el('td', riga.esameNome);
      esame.dataset.colonna = 'Esame';
      const id = el('td', riga.repertoId, 'c-id');
      id.dataset.colonna = 'ID reperto';
      const lingua = el('td');
      lingua.dataset.colonna = 'Lingua';
      lingua.append(el('span', riga.lingua, 'lingua'));

      const isDistretto = riga.tipo === 'distretto';
      const celle = [
        esame,
        id,
        cellaTesto(riga, 'etichetta', 'Etichetta', isDistretto ? 'Titolo' : (riga.tipo === 'organo' ? 'Organo' : '')),
        lingua,
        cellaTesto(riga, 'negativo', 'Testo negativo', isDistretto ? 'Intro' : ''),
        cellaTesto(riga, 'positivo', 'Testo positivo', ''),
        cellaTesto(riga, 'conclusione', 'Conclusione', isDistretto ? 'Conclusione negativa' : '')
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
      let mostra = (!esame || riga.gruppoId === esame)
        && (!filtri.nuovi.checked || riga.nuovo)
        && (!lingua || riga.lingua === lingua)
        && (!stato || statoDi(riga) === stato)
        && (!soloProblemi || tuttiIProblemi(riga).length > 0);

      if (mostra && cerca) {
        const note = (revisione[riga.chiave] && revisione[riga.chiave].note) || '';
        const pagliaio = [riga.esameNome, riga.gruppoId, riga.repertoId, riga.etichetta, riga.negativo,
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
      riga.gruppoId,
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

  // Se data.js manca o contiene un errore di sintassi, METODICHE non esiste
  if (typeof METODICHE === 'undefined' || !Array.isArray(METODICHE)) {
    const box = $('errore-dati');
    box.hidden = false;
    box.textContent = 'Impossibile leggere METODICHE da data.js.\n'
      + 'Controlla che il file esista nella stessa cartella e non contenga errori di sintassi '
      + '(apri la console del browser per il dettaglio, oppure esegui: node --check data.js).';
    return;
  }

  const LINGUE_ATTIVE = (typeof LINGUE === 'object' && LINGUE) ? Object.keys(LINGUE) : ['it'];
  const RIGHE = costruisciRighe(METODICHE, typeof FRASI_COMUNI === 'object' ? FRASI_COMUNI : null, LINGUE_ATTIVE);

  // Menu dei filtri: un'opzione per distretto, nell'ordine di data.js
  const gruppiVisti = new Set();
  RIGHE.forEach((r) => {
    if (gruppiVisti.has(r.gruppoId)) return;
    gruppiVisti.add(r.gruppoId);
    filtri.esame.add(new Option(r.esameNome, r.gruppoId));
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
  ['esame', 'lingua', 'stato', 'problemi', 'nuovi'].forEach((k) => filtri[k].addEventListener('change', applicaFiltri));
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
