/*
 * app.js — logica del Refertario.
 * Legge ESAMI, LINGUE e UI da data.js e compone il referto.
 */
(function () {
  'use strict';

  // ---------- Riferimenti agli elementi della pagina ----------
  const selEsame = document.getElementById('sel-esame');
  const selLingua = document.getElementById('sel-lingua');
  const listaReperti = document.getElementById('lista-reperti');
  const contatore = document.getElementById('contatore');
  const referto = document.getElementById('referto');
  const btnGenera = document.getElementById('btn-genera');
  const btnCopia = document.getElementById('btn-copia');
  const btnStampa = document.getElementById('btn-stampa');
  const btnReset = document.getElementById('btn-reset');

  // Stato: il referto è già stato generato almeno una volta?
  // Se sì, lo aggiorniamo in automatico quando cambiano lingua o reperti.
  let generato = false;

  // ---------- Utilità ----------

  /** Restituisce l'esame selezionato. */
  function esameCorrente() {
    return ESAMI.find((e) => e.id === selEsame.value) || ESAMI[0];
  }

  /** Lingua selezionata (codice). */
  function linguaCorrente() {
    return selLingua.value;
  }

  /** Prende il testo nella lingua scelta, con ripiego sull'italiano. */
  function t(testi, lingua) {
    if (!testi) return '';
    return testi[lingua] || testi.it || '';
  }

  /** Crea un elemento con testo (evita innerHTML con dati). */
  function el(tag, testo, classe) {
    const nodo = document.createElement(tag);
    if (testo) nodo.textContent = testo;
    if (classe) nodo.className = classe;
    return nodo;
  }

  /** Insieme degli id dei reperti spuntati. */
  function repertiPositivi() {
    const spuntati = listaReperti.querySelectorAll('input:checked');
    return new Set(Array.from(spuntati, (c) => c.value));
  }

  // ---------- Popolamento controlli ----------

  /** Riempie il menu delle lingue. */
  function popolaLingue() {
    Object.entries(LINGUE).forEach(([codice, nome]) => {
      selLingua.add(new Option(nome, codice));
    });
    selLingua.value = 'it';
  }

  /** Riempie il menu degli esami nella lingua corrente, mantenendo la scelta. */
  function popolaEsami() {
    const scelto = selEsame.value;
    selEsame.innerHTML = '';
    ESAMI.forEach((e) => selEsame.add(new Option(t(e.nome, linguaCorrente()), e.id)));
    if (scelto) selEsame.value = scelto;
  }

  /** Disegna le checkbox dei reperti, conservando quelle già spuntate. */
  function popolaReperti() {
    const lingua = linguaCorrente();
    const giaSpuntati = repertiPositivi();
    listaReperti.innerHTML = '';

    esameCorrente().reperti.forEach((r) => {
      const etichetta = el('label', null, 'reperto');
      const casella = document.createElement('input');
      casella.type = 'checkbox';
      casella.value = r.id;
      casella.checked = giaSpuntati.has(r.id);
      etichetta.append(casella, el('span', t(r.etichetta, lingua)));
      listaReperti.append(etichetta);
    });
    aggiornaContatore();
  }

  /** Aggiorna il numero di reperti positivi selezionati. */
  function aggiornaContatore() {
    const n = repertiPositivi().size;
    contatore.textContent = String(n);
    contatore.classList.toggle('attivo', n > 0);
    contatore.title = n + ' ' + UI[linguaCorrente()].selezionati;
  }

  /** Traduce i testi fissi dell'interfaccia. */
  function traduciInterfaccia() {
    const testi = UI[linguaCorrente()];
    document.documentElement.lang = linguaCorrente();
    const mappa = {
      'ui-sottotitolo': testi.sottotitolo,
      'ui-esame': testi.esame,
      'ui-lingua': testi.lingua,
      'ui-reperti': testi.reperti,
      'ui-suggerimento': testi.suggerimento,
      'ui-avviso': testi.avviso,
      'btn-genera': testi.genera,
      'btn-copia': testi.copia,
      'btn-stampa': testi.stampa,
      'btn-reset': testi.reset
    };
    Object.entries(mappa).forEach(([id, testo]) => {
      document.getElementById(id).textContent = testo;
    });
    const vuoto = document.getElementById('ui-vuoto');
    if (vuoto) vuoto.textContent = testi.vuoto;
  }

  // ---------- Composizione del referto ----------

  /**
   * Costruisce il referto come struttura dati, usata sia per la pagina
   * sia per il testo semplice da copiare.
   */
  function componiReferto() {
    const esame = esameCorrente();
    const lingua = linguaCorrente();
    const positivi = repertiPositivi();

    // Ogni reperto: testo positivo se spuntato, altrimenti negativo
    const descrizione = esame.reperti.map((r) => ({
      testo: positivi.has(r.id) ? t(r.positivo, lingua) : t(r.negativo, lingua),
      positivo: positivi.has(r.id)
    }));

    // Conclusione: normale se nessun positivo, altrimenti elenco dei positivi
    const conclusioni = positivi.size === 0
      ? [t(esame.conclusioneNormale, lingua)]
      : esame.reperti
          .filter((r) => positivi.has(r.id))
          .map((r) => t(r.conclusione, lingua) || t(r.etichetta, lingua));

    return {
      titolo: t(esame.titolo, lingua),
      tecnica: t(esame.tecnica, lingua),
      descrizione,
      conclusioni,
      elenco: positivi.size > 0,
      etichette: UI[lingua]
    };
  }

  /** Mostra il referto nella colonna di destra. */
  function genera() {
    const r = componiReferto();
    referto.innerHTML = '';

    referto.append(el('h2', r.titolo));

    referto.append(el('h3', r.etichette.tecnica));
    referto.append(el('p', r.tecnica));

    referto.append(el('h3', r.etichette.descrizione));
    r.descrizione.forEach((d) => {
      const p = el('p');
      p.append(el('span', d.testo, d.positivo ? 'pos' : ''));
      referto.append(p);
    });

    referto.append(el('h3', r.etichette.conclusioni));
    if (r.elenco) {
      const ul = el('ul');
      r.conclusioni.forEach((c) => ul.append(el('li', c)));
      referto.append(ul);
    } else {
      referto.append(el('p', r.conclusioni[0]));
    }

    generato = true;
  }

  /** Versione in testo semplice, pronta da incollare in un gestionale. */
  function refertoComeTesto() {
    const r = componiReferto();
    const righe = [
      r.titolo,
      '',
      r.etichette.tecnica.toUpperCase() + ':',
      r.tecnica,
      '',
      r.etichette.descrizione.toUpperCase() + ':',
      ...r.descrizione.map((d) => d.testo),
      '',
      r.etichette.conclusioni.toUpperCase() + ':',
      ...(r.elenco ? r.conclusioni.map((c) => '- ' + c) : r.conclusioni)
    ];
    return righe.join('\n');
  }

  // ---------- Azioni dei pulsanti ----------

  /** Copia il referto negli appunti (con ripiego per browser senza API). */
  async function copia() {
    if (!generato) genera();
    const testo = refertoComeTesto();
    try {
      await navigator.clipboard.writeText(testo);
    } catch (errore) {
      // Ripiego: textarea temporanea (es. pagina aperta come file://)
      const area = document.createElement('textarea');
      area.value = testo;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const etichette = UI[linguaCorrente()];
    btnCopia.textContent = etichette.copiato;
    setTimeout(() => { btnCopia.textContent = UI[linguaCorrente()].copia; }, 1500);
  }

  /** Stampa solo il referto (il CSS di stampa nasconde il resto). */
  function stampa() {
    if (!generato) genera();
    window.print();
  }

  /** Riporta tutto allo stato iniziale. */
  function reset() {
    listaReperti.querySelectorAll('input').forEach((c) => { c.checked = false; });
    aggiornaContatore();
    generato = false;
    referto.innerHTML = '';
    const vuoto = el('p', UI[linguaCorrente()].vuoto, 'referto__vuoto');
    vuoto.id = 'ui-vuoto';
    referto.append(vuoto);
  }

  // ---------- Eventi ----------

  selEsame.addEventListener('change', () => {
    // Cambiando esame i reperti spuntati non hanno più senso: si riparte puliti
    listaReperti.innerHTML = '';
    popolaReperti();
    if (generato) genera();
  });

  selLingua.addEventListener('change', () => {
    traduciInterfaccia();
    popolaEsami();
    popolaReperti();
    if (generato) genera();
  });

  listaReperti.addEventListener('change', () => {
    aggiornaContatore();
    if (generato) genera();
  });

  btnGenera.addEventListener('click', genera);
  btnCopia.addEventListener('click', copia);
  btnStampa.addEventListener('click', stampa);
  btnReset.addEventListener('click', reset);

  // ---------- Avvio ----------
  popolaLingue();
  popolaEsami();
  popolaReperti();
  traduciInterfaccia();
})();
