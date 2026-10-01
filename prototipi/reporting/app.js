/*
 * app.js — logica del Refertario.
 *
 * Legge METODICHE e FRASI_COMUNI da data.js.
 * Per ogni distretto scelto, organo per organo:
 *   - nessun reperto e nessun testo libero  → frase negativa dell'organo;
 *   - reperto spuntato ("sostituisce")      → testo del reperto al posto del negativo;
 *   - reperto spuntato ("aggiunge")         → negativo + testo del reperto;
 *   - testo libero ("Descrivi tu")          → prende il posto del negativo.
 * Lo stato si ricorda nel browser, così un ricaricamento non perde il lavoro.
 *
 * Lingue: un testo può essere una stringa (solo italiano) oppure { it, en, es }.
 * L'interfaccia resta in italiano; cambia solo la lingua del referto.
 * Un distretto è disponibile nelle lingue indicate in `lingue` (predefinito: solo "it").
 */
(function () {
  'use strict';

  const CHIAVE_STATO = 'refertario-stato-v2';
  const SEGNAPOSTO = /_{3,}/g;
  const INTESTAZIONE_CONCLUSIONI = { it: 'Conclusioni:', en: 'Conclusions:', es: 'Conclusiones:' };

  // ---------- Riferimenti alla pagina ----------
  const $ = (id) => document.getElementById(id);
  const boxMetodiche = $('metodiche');
  const boxScelta = $('scelta-distretti');
  const boxScelti = $('distretti-scelti');
  const boxPremessa = $('premessa');
  const boxChiusura = $('chiusura');
  const cercaDistretto = $('cerca-distretto');
  const referto = $('referto');
  const optTitoli = $('opt-titoli');
  const optConclusioni = $('opt-conclusioni');
  const contaSegnaposto = $('conta-segnaposto');
  const selLingua = $('sel-lingua');
  const optTecnica = $('opt-tecnica');
  const avvisoLingua = $('avviso-lingua');
  const btnCopia = $('btn-copia');

  // ---------- Stato ----------
  /*
   * stato = {
   *   metodica: 'eco',
   *   distretti: [ { id, lato, reperti: ['organo/reperto', …], liberi: { organo: testo }, coda: '' } ],
   *   premessa: ['id', …], chiusura: ['id', …],
   *   titoli: true, conclusioni: false
   * }
   */
  function statoVuoto() {
    return { metodica: 'eco', lingua: 'it', distretti: [], premessa: [], chiusura: [], titoli: true, tecnica: true, conclusioni: false };
  }
  let stato = caricaStato();

  function caricaStato() {
    try {
      const s = JSON.parse(localStorage.getItem(CHIAVE_STATO));
      if (s && Array.isArray(s.distretti)) {
        // Scarta i distretti che non esistono più in data.js
        s.distretti = s.distretti.filter((d) => trovaDistretto(s.metodica, d.id));
        return Object.assign(statoVuoto(), s);
      }
    } catch (e) { /* storage non disponibile o dato corrotto: si riparte puliti */ }
    return statoVuoto();
  }

  function salvaStato() {
    try { localStorage.setItem(CHIAVE_STATO, JSON.stringify(stato)); } catch (e) { /* ignorato */ }
  }

  // ---------- Utilità ----------

  /** Testo di un campo nella lingua indicata: stringa = solo italiano; oggetto = { it, en, es }. */
  function tl(campo, lingua) {
    if (campo == null) return null;
    if (typeof campo === 'string') return lingua === 'it' ? campo : null;
    return campo[lingua] != null ? String(campo[lingua]) : null;
  }
  /** Testo italiano (per l'interfaccia). */
  const ti = (campo) => tl(campo, 'it') || '';
  /** Lingue in cui è disponibile un distretto. */
  const lingueDi = (d) => (Array.isArray(d.lingue) && d.lingue.length ? d.lingue : ['it']);
  /** Lato nella lingua del referto ("destra" → "right"); i lati possono essere stringhe o { it, en, es }. */
  function latoIn(d, valore, lingua) {
    const voce = (d.lati || []).find((l) => ti(l) === valore);
    return (voce && tl(voce, lingua)) || valore;
  }
  function metodicaCorrente() {
    return METODICHE.find((m) => m.id === stato.metodica) || METODICHE[0];
  }
  function trovaDistretto(idMetodica, idDistretto) {
    const m = METODICHE.find((x) => x.id === idMetodica);
    return m ? m.distretti.find((d) => d.id === idDistretto) : null;
  }
  function el(tag, testo, classe) {
    const n = document.createElement(tag);
    if (testo) n.textContent = testo;
    if (classe) n.className = classe;
    return n;
  }
  /** Pulsante "a pillola" che si accende/spegne. */
  function pillola(testo, acceso, onClick, classe, nuovo) {
    const b = el('button', null, 'pillola' + (classe ? ' ' + classe : ''));
    b.type = 'button';
    b.setAttribute('aria-pressed', acceso ? 'true' : 'false');
    b.append(document.createTextNode(testo));
    if (nuovo) {
      const n = el('span', 'nuovo', 'nuovo');
      n.title = 'Frase non presente nel tuo archivio: da verificare';
      b.append(n);
    }
    b.addEventListener('click', onClick);
    return b;
  }
  function toggle(lista, valore) {
    const i = lista.indexOf(valore);
    if (i === -1) lista.push(valore); else lista.splice(i, 1);
  }
  function statoDistretto(id) {
    return stato.distretti.find((d) => d.id === id);
  }

  // ---------- Disegno dei controlli ----------

  function disegnaMetodiche() {
    boxMetodiche.textContent = '';
    METODICHE.forEach((m) => {
      const b = el('button', m.nome, 'metodica');
      b.type = 'button';
      b.setAttribute('aria-pressed', m.id === stato.metodica ? 'true' : 'false');
      if (!m.attiva) {
        b.disabled = true;
        b.append(document.createTextNode(' '), el('small', 'in arrivo'));
      }
      b.addEventListener('click', () => {
        if (m.id === stato.metodica) return;
        stato.metodica = m.id;
        stato.distretti = [];
        aggiornaTutto();
      });
      boxMetodiche.append(b);
    });
  }

  /** Elenco dei distretti, raggruppati, filtrati dalla ricerca. */
  function disegnaSceltaDistretti() {
    boxScelta.textContent = '';
    const cerca = cercaDistretto.value.trim().toLowerCase();
    const gruppi = new Map();
    metodicaCorrente().distretti.forEach((d) => {
      if (cerca && !d.nome.toLowerCase().includes(cerca)) return;
      if (!gruppi.has(d.gruppo)) gruppi.set(d.gruppo, []);
      gruppi.get(d.gruppo).push(d);
    });
    if (!gruppi.size) {
      boxScelta.append(el('p', 'Nessun distretto trovato.', 'aiuto'));
      return;
    }
    gruppi.forEach((distretti, nomeGruppo) => {
      const g = el('div', null, 'gruppo');
      g.append(el('p', nomeGruppo, 'gruppo__nome'));
      const p = el('div', null, 'pillole');
      distretti.forEach((d) => {
        const nome = lingueDi(d).includes(stato.lingua) ? d.nome : d.nome + ' (solo IT)';
        p.append(pillola(nome, !!statoDistretto(d.id), () => {
          if (statoDistretto(d.id)) {
            stato.distretti = stato.distretti.filter((x) => x.id !== d.id);
          } else {
            stato.distretti.push({ id: d.id, lato: '', reperti: [], liberi: {}, coda: '' });
          }
          aggiornaTutto();
        }));
      });
      g.append(p);
      boxScelta.append(g);
    });
  }

  /** Frasi comuni in testa o in coda. */
  function disegnaFrasiComuni(box, elenco, chiave) {
    box.textContent = '';
    elenco.forEach((f) => {
      box.append(pillola(f.etichetta, stato[chiave].includes(f.id), () => {
        toggle(stato[chiave], f.id);
        aggiornaTutto();
      }));
    });
  }

  /** Un pannello per ogni distretto scelto, con organi, reperti e testi liberi. */
  function disegnaDistrettiScelti() {
    boxScelti.textContent = '';
    if (!stato.distretti.length) {
      const p = el('div', null, 'pannello vuoto-distretti');
      p.textContent = metodicaCorrente().attiva
        ? 'Scegli uno o più distretti qui sopra.'
        : 'Metodica in preparazione.';
      boxScelti.append(p);
      return;
    }

    stato.distretti.forEach((sd) => {
      const d = trovaDistretto(stato.metodica, sd.id);
      const pannello = el('div', null, 'pannello distretto');

      // Testa: nome, lato, chiudi
      const testa = el('div', null, 'distretto__testa');
      testa.append(el('h2', d.nome));
      if (d.lati) {
        const sel = document.createElement('select');
        sel.setAttribute('aria-label', 'Lato ' + d.nome);
        sel.add(new Option('Lato…', ''));
        d.lati.forEach((l) => { const v = ti(l); sel.add(new Option(v.charAt(0).toUpperCase() + v.slice(1), v)); });
        if (d.introBilaterale) sel.add(new Option('Bilaterale', 'bilaterale'));
        sel.value = sd.lato || '';
        sel.addEventListener('change', () => { sd.lato = sel.value; aggiornaReferto(); });
        testa.append(sel);
      }
      const chiudi = el('button', '×', 'chiudi');
      chiudi.type = 'button';
      chiudi.title = 'Togli ' + d.nome;
      chiudi.setAttribute('aria-label', 'Togli ' + d.nome);
      chiudi.addEventListener('click', () => {
        stato.distretti = stato.distretti.filter((x) => x.id !== sd.id);
        aggiornaTutto();
      });
      testa.append(chiudi);
      pannello.append(testa);

      // Organi
      d.organi.forEach((o) => {
        if (o.soloSeNegativo) return; // frase automatica, niente da scegliere
        pannello.append(disegnaOrgano(d, sd, o));
      });

      // Testo libero in coda al distretto
      const coda = el('div', null, 'coda');
      const id = 'coda-' + d.id;
      const lab = el('label', 'Altro (testo libero in coda)');
      lab.htmlFor = id;
      const area = document.createElement('textarea');
      area.id = id;
      area.placeholder = 'Scrivi qui altri reperti o una descrizione personalizzata…';
      area.value = sd.coda || '';
      area.addEventListener('input', () => { sd.coda = area.value; aggiornaReferto(); });
      coda.append(lab, area);
      pannello.append(coda);

      boxScelti.append(pannello);
    });
  }

  function disegnaOrgano(d, sd, o) {
    const box = el('div', null, 'organo');
    const chiaveLibero = o.id;
    const haPositivi = () => o.reperti.some((r) => sd.reperti.includes(o.id + '/' + r.id) && (r.modo || 'sostituisce') === 'sostituisce')
      || !!(sd.liberi[chiaveLibero] || '').trim();

    const testa = el('div', null, 'organo__testa');
    testa.append(el('span', o.nome, 'organo__nome'));
    if (o.negativo) {
      const neg = el('span', ti(o.negativo).replace(/\n/g, ' '), 'organo__negativo');
      neg.title = 'Negativo: ' + ti(o.negativo);
      testa.append(neg);
    } else {
      testa.append(el('span', '', 'organo__negativo'));
    }

    // "Descrivi tu": testo libero che prende il posto del negativo
    const scrivi = el('button', '✎ Descrivi tu', 'organo__scrivi');
    scrivi.type = 'button';
    const area = document.createElement('textarea');
    area.className = 'organo__libero';
    area.placeholder = o.negativo ? 'La tua descrizione (sostituisce: «' + ti(o.negativo).slice(0, 60) + '…»)' : 'La tua descrizione';
    area.setAttribute('aria-label', 'Descrizione libera ' + o.nome);
    area.value = sd.liberi[chiaveLibero] || '';
    area.hidden = !area.value;
    scrivi.setAttribute('aria-expanded', area.hidden ? 'false' : 'true');
    scrivi.addEventListener('click', () => {
      area.hidden = !area.hidden;
      scrivi.setAttribute('aria-expanded', area.hidden ? 'false' : 'true');
      if (!area.hidden) {
        // Precompila con il negativo, da modificare, se il campo è vuoto
        if (!area.value && o.negativo) { area.value = tl(o.negativo, stato.lingua) || ti(o.negativo); aggiornaLibero(); }
        area.focus();
      }
    });
    function aggiornaLibero() {
      sd.liberi[chiaveLibero] = area.value;
      box.classList.toggle('organo--positivo', haPositivi());
      aggiornaReferto();
    }
    area.addEventListener('input', aggiornaLibero);
    testa.append(scrivi);
    box.append(testa);

    // Reperti predefiniti
    if (o.reperti.length) {
      const p = el('div', null, 'pillole');
      o.reperti.forEach((r) => {
        const chiave = o.id + '/' + r.id;
        const b = pillola(r.etichetta, sd.reperti.includes(chiave), () => {
          toggle(sd.reperti, chiave);
          b.setAttribute('aria-pressed', sd.reperti.includes(chiave) ? 'true' : 'false');
          box.classList.toggle('organo--positivo', haPositivi());
          aggiornaReferto();
        }, 'pillola--reperto', r.nuovo);
        b.title = ti(r.testo);
        p.append(b);
      });
      box.append(p);
    }
    box.append(area);
    box.classList.toggle('organo--positivo', haPositivi());
    return box;
  }

  // ---------- Composizione del referto ----------

  /**
   * Restituisce le righe del referto: [{ testo, tipo }]
   * tipo: 'titolo' | 'sezione' | 'neg' (frase standard) | 'pos' (positivo o testo libero)
   */
  function componiRighe() {
    const righe = [];
    const aggiungi = (testo, tipo) => {
      String(testo).split('\n').forEach((t) => { if (t.trim()) righe.push({ testo: t.trim(), tipo }); });
    };
    const L = stato.lingua;
    const mancanti = []; // voci senza traduzione nella lingua scelta

    // Frasi in testa
    FRASI_COMUNI.premessa.forEach((f) => {
      if (!stato.premessa.includes(f.id)) return;
      const t = tl(f.testo, L);
      if (t) aggiungi(t, 'neg'); else mancanti.push('«' + f.etichetta + '»');
    });

    const conclusioni = [];

    stato.distretti.forEach((sd) => {
      const d = trovaDistretto(stato.metodica, sd.id);
      if (!lingueDi(d).includes(L)) { mancanti.push(d.nome); return; } // distretto non tradotto
      if (stato.titoli) righe.push({ testo: tl(d.titolo, L), tipo: 'titolo' });
      if (stato.tecnica && d.tecnica) aggiungi(tl(d.tecnica, L), 'neg');

      // Intro con il lato
      if (sd.lato === 'bilaterale' && d.introBilaterale) aggiungi(tl(d.introBilaterale, L), 'neg');
      else if (d.intro) aggiungi(tl(d.intro, L).replace('{lato}', sd.lato ? latoIn(d, sd.lato, L) : '___'), 'neg');

      const positivoDistretto = sd.reperti.length > 0
        || Object.values(sd.liberi).some((t) => t && t.trim())
        || !!(sd.coda || '').trim();

      d.organi.forEach((o) => {
        if (o.soloSeNegativo) {
          if (!positivoDistretto && o.negativo) aggiungi(tl(o.negativo, L), 'neg');
          return;
        }
        const scelti = o.reperti.filter((r) => sd.reperti.includes(o.id + '/' + r.id));
        const libero = (sd.liberi[o.id] || '').trim();
        const sostituito = !!libero || scelti.some((r) => (r.modo || 'sostituisce') === 'sostituisce');

        const parti = [];
        if (!sostituito && o.negativo) parti.push({ testo: tl(o.negativo, L), tipo: 'neg' });
        if (libero) parti.push({ testo: libero, tipo: 'pos' });
        scelti.forEach((r) => {
          parti.push({ testo: tl(r.testo, L), tipo: 'pos' });
          if (r.conclusione) conclusioni.push({ testo: tl(r.conclusione, L), pos: true });
        });

        parti.forEach((parte, i) => {
          // "stessaRiga": la prima frase continua la riga precedente (es. "Vie biliari non dilatate.")
          if (i === 0 && o.stessaRiga && righe.length && !parte.testo.includes('\n')
              && righe[righe.length - 1].tipo !== 'titolo') {
            const prec = righe[righe.length - 1];
            prec.testo += ' ' + parte.testo;
            if (parte.tipo === 'pos') prec.tipo = 'pos';
          } else {
            aggiungi(parte.testo, parte.tipo);
          }
        });
      });

      if ((sd.coda || '').trim()) aggiungi(sd.coda, 'pos');

      if (!positivoDistretto && d.conclusioneNegativa) {
        conclusioni.push({ testo: tl(d.conclusioneNegativa, L), pos: false });
      } else if (positivoDistretto && !conclusioni.some((c) => c.pos)) {
        // Positivo descritto solo a testo libero: conclusione da scrivere a mano
        conclusioni.push({ testo: '___', pos: true });
      }
    });

    // Frasi in coda
    FRASI_COMUNI.chiusura.forEach((f) => {
      if (!stato.chiusura.includes(f.id)) return;
      const t = tl(f.testo, L);
      if (t) aggiungi(t, 'neg'); else mancanti.push('«' + f.etichetta + '»');
    });

    // Conclusioni (facoltative)
    if (stato.conclusioni && stato.distretti.length) {
      righe.push({ testo: INTESTAZIONE_CONCLUSIONI[L] || INTESTAZIONE_CONCLUSIONI.it, tipo: 'sezione' });
      const viste = new Set();
      conclusioni.forEach((c) => {
        if (!c.testo || viste.has(c.testo)) return;
        viste.add(c.testo);
        aggiungi(c.testo, c.pos ? 'pos' : 'neg');
      });
    }
    righe.mancanti = mancanti;
    return righe;
  }

  /**
   * Testo finale del referto (quello che si copia) e posizione di ogni riga al suo interno,
   * così l'anteprima e il controllo di stile lavorano sullo stesso testo.
   */
  function componiTesto() {
    const righe = componiRighe();
    const mancanti = righe.mancanti || [];
    let testo = '';
    righe.forEach((r, i) => {
      // Riga vuota prima di ogni titolo (tranne il primo) e prima delle conclusioni
      if (i > 0) testo += (r.tipo === 'titolo' || r.tipo === 'sezione') ? '\n\n' : '\n';
      r.inizio = testo.length;
      testo += r.testo;
    });
    return { testo, righe, mancanti };
  }

  function refertoComeTesto() {
    return componiTesto().testo;
  }

  // ---------- Controllo di stile (style/linter.js + style/stile-referto.md) ----------

  let regoleStile = null;
  let statoStile = 'caricamento'; // 'caricamento' | 'pronto' | 'non-disponibile'

  function caricaRegoleStile() {
    if (typeof StileReferto === 'undefined') { statoStile = 'non-disponibile'; return; }
    fetch('style/stile-referto.md')
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
      .then((md) => { regoleStile = StileReferto.leggiRegole(md); statoStile = 'pronto'; })
      .catch(() => { statoStile = 'non-disponibile'; }) // es. pagina aperta come file://
      .then(aggiornaReferto);
  }

  /**
   * Contesto per le regole del linter, es. "eco-addome" o "tc-addome" (solo se il distretto è uno).
   * Un distretto può indicarlo esplicitamente con `contesto` (es. addome acuto → "tc-addome").
   */
  function contestoStile() {
    if (stato.distretti.length !== 1) return '';
    const d = trovaDistretto(stato.metodica, stato.distretti[0].id);
    return (d && d.contesto) || stato.metodica + '-' + stato.distretti[0].id;
  }

  function disegnaAvvisiStile(avvisi) {
    const box = $('stile');
    box.textContent = '';
    if (!stato.distretti.length) return;
    if (stato.lingua !== 'it') {
      box.append(el('p', 'Controllo di stile disponibile solo per i referti in italiano.', 'stile__nota'));
      return;
    }
    if (statoStile !== 'pronto') {
      box.append(el('p', statoStile === 'caricamento'
        ? 'Controllo di stile in caricamento…'
        : 'Controllo di stile non disponibile: avvia con «python3 -m http.server 8000» e apri http://localhost:8000.', 'stile__nota'));
      return;
    }
    const titolo = el('p', null, 'stile__titolo' + (avvisi.length ? ' attivo' : ''));
    titolo.textContent = avvisi.length ? 'Stile: ' + avvisi.length + (avvisi.length === 1 ? ' avviso' : ' avvisi') : 'Stile: nessun avviso';
    box.append(titolo);
    if (!avvisi.length) return;
    const ul = el('ul', null, 'stile__elenco');
    avvisi.forEach((a) => ul.append(el('li', 'Riga ' + a.riga + ' — ' + a.messaggio)));
    box.append(ul);
  }

  /** Scrive una riga evidenziando i segnaposto ___ e le parti segnalate dal linter. */
  function scriviRiga(nodo, riga, avvisi) {
    const fineRiga = riga.inizio + riga.testo.length;
    const zone = [];
    riga.testo.replace(SEGNAPOSTO, (m, pos) => { zone.push({ a: pos, b: pos + m.length, tag: 'mark' }); return m; });
    avvisi.forEach((av) => {
      if (av.fine <= riga.inizio || av.inizio >= fineRiga) return;
      zone.push({ a: Math.max(av.inizio, riga.inizio) - riga.inizio, b: Math.min(av.fine, fineRiga) - riga.inizio,
        tag: 'span', classe: 'stile-avviso', titolo: av.messaggio });
    });
    zone.sort((x, y) => x.a - y.a || y.b - x.b);
    let pos = 0;
    zone.forEach((z) => {
      if (z.a < pos) return; // zone sovrapposte: tiene la prima
      if (z.a > pos) nodo.append(document.createTextNode(riga.testo.slice(pos, z.a)));
      const n = el(z.tag, riga.testo.slice(z.a, z.b), z.classe);
      if (z.titolo) n.title = z.titolo;
      nodo.append(n);
      pos = z.b;
    });
    if (pos < riga.testo.length) nodo.append(document.createTextNode(riga.testo.slice(pos)));
  }

  function aggiornaReferto() {
    const { testo, righe, mancanti } = componiTesto();
    // Il linter gira sul referto composto finale (solo italiano: le regole sono per l'italiano)
    const avvisi = (statoStile === 'pronto' && testo && stato.lingua === 'it')
      ? StileReferto.controlla(testo, regoleStile, { contesto: contestoStile() }) : [];
    avvisoLingua.textContent = mancanti.length
      ? 'Non disponibili in ' + stato.lingua.toUpperCase() + ' (esclusi dal referto): ' + mancanti.join(', ') + '.'
      : '';
    avvisoLingua.hidden = !mancanti.length;

    referto.textContent = '';
    if (!stato.distretti.length) {
      referto.append(el('p', 'Il referto comparirà qui man mano che scegli distretti e reperti.', 'referto__vuoto'));
    }
    let segnaposto = 0;
    righe.forEach((r) => {
      const p = el('p', null, 'r-' + r.tipo);
      scriviRiga(p, r, avvisi);
      segnaposto += (r.testo.match(SEGNAPOSTO) || []).length;
      referto.append(p);
    });
    contaSegnaposto.textContent = segnaposto ? segnaposto + ' campi ___ da completare' : (righe.length ? 'Nessun campo da completare' : '');
    contaSegnaposto.classList.toggle('attivo', segnaposto > 0);
    disegnaAvvisiStile(avvisi);
    salvaStato();
  }

  function aggiornaTutto() {
    disegnaMetodiche();
    disegnaSceltaDistretti();
    disegnaFrasiComuni(boxPremessa, FRASI_COMUNI.premessa, 'premessa');
    disegnaFrasiComuni(boxChiusura, FRASI_COMUNI.chiusura, 'chiusura');
    disegnaDistrettiScelti();
    optTitoli.checked = stato.titoli;
    optTecnica.checked = stato.tecnica !== false;
    selLingua.value = stato.lingua || 'it';
    optConclusioni.checked = stato.conclusioni;
    aggiornaReferto();
  }

  // ---------- Azioni ----------

  async function copia() {
    const testo = refertoComeTesto();
    try {
      await navigator.clipboard.writeText(testo);
    } catch (e) {
      // Ripiego per pagine aperte come file:// o browser senza API
      const area = document.createElement('textarea');
      area.value = testo;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const n = (testo.match(SEGNAPOSTO) || []).length;
    btnCopia.textContent = n ? 'Copiato (restano ' + n + ' ___)' : 'Copiato!';
    setTimeout(() => { btnCopia.textContent = 'Copia'; }, 2000);
  }

  function nuovoReferto() {
    if (stato.distretti.length && !confirm('Iniziare un nuovo referto? Le scelte attuali verranno azzerate.')) return;
    const { metodica, lingua } = stato;
    stato = statoVuoto();
    stato.metodica = metodica;
    stato.lingua = lingua;
    aggiornaTutto();
  }

  // ---------- Eventi ----------
  cercaDistretto.addEventListener('input', disegnaSceltaDistretti);
  optTitoli.addEventListener('change', () => { stato.titoli = optTitoli.checked; aggiornaReferto(); });
  optTecnica.addEventListener('change', () => { stato.tecnica = optTecnica.checked; aggiornaReferto(); });
  Object.entries(LINGUE).forEach(([codice, nome]) => selLingua.add(new Option(nome, codice)));
  selLingua.addEventListener('change', () => { stato.lingua = selLingua.value; aggiornaTutto(); });
  optConclusioni.addEventListener('change', () => { stato.conclusioni = optConclusioni.checked; aggiornaReferto(); });
  btnCopia.addEventListener('click', copia);
  $('btn-stampa').addEventListener('click', () => window.print());
  $('btn-reset').addEventListener('click', nuovoReferto);

  // ---------- Avvio ----------
  aggiornaTutto();
  caricaRegoleStile();
})();
