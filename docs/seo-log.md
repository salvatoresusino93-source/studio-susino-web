# Registro SEO — studiosusino.it

Voci in ordine dalla più recente. Ogni voce la scrive `/seo-periodico` (in locale o dal workflow del lunedì).
Gli agenti leggono la voce più recente per segnalare solo novità e regressioni: non cancellare le voci vecchie.
Quando decidi su una proposta o un "Da verificare", spunta la casella e aggiungi una nota (es. "scartata: non offriamo l'esame").

<!-- NUOVE VOCI SOTTO QUESTA RIGA -->

## 2026-09-27 — Sessione periodica

**Fonte dati:** audit automatico (nessun dato Search Console per questa sessione)

### Problemi trovati
- [NUOVO] JSON-LD `FAQPage` disallineato dal testo visibile in `tariffe.html` / `tariffe-en.html` (domande diverse da quelle mostrate in pagina)
- [NUOVO] JSON-LD `FAQPage` disallineato dal testo visibile in `prenota.html` / `prenota-en.html` (2 domande extra nel JSON-LD non visibili, 1 mancante)
- Ancora aperti: `aria-label-misuse` su `<ul class="hero-trust">` in `index.html`/`index-en.html`; 6 pagine esame con FAQ aggiuntive IT non tradotte in EN (anca-neonatale, apparato-urinario, caviglia-piede, ginocchio, scrotale-testicolare, spalla); certificato HTTPS assente su `https://www.studiosusino.it/` (redirect funziona solo su HTTP); configurazione secret del workflow settimanale (dal log precedente)

### Modifiche fatte
- Correzioni tecniche: riallineato il JSON-LD `FAQPage` al testo visibile in `tariffe.html`, `tariffe-en.html`, `prenota.html`, `prenota-en.html`
- Contenuti: `ecocolordoppler-arti-superiori.html` + EN (pagina più debole segnalata dall'audit: testo generico e più corto di tutte le altre pagine esame, FAQ solo generiche). Arricchiti in `js/esami-data(.js|-en.js)` e `js/esami-paziente(.js|-en.js)`: descrizione più precisa (estensione spalla→mano), sezioni "perché/come si svolge/cosa controllo" più dettagliate, aggiunte 3 FAQ specifiche (fistola per dialisi, trombosi da catetere/pacemaker, sindrome dello stretto toracico) in IT ed EN. Pagine rigenerate con `node scripts/genera-pagine-esami.js` (aggiornato anche l'elenco in `ecografie.html`/`ecografie-en.html`)

### Da verificare per il medico
- [ ] `js/esami-paziente.js` e `js/esami-paziente-en.js`, voce `doppler-arti-superiori`: "conferma che lo studio esegue davvero la mappatura dei vasi prima della creazione della fistola e il controllo della maturazione dopo l'intervento, e che la descrizione clinica sia corretta"
- [ ] stessi file: "conferma l'indicazione (catetere venoso centrale o elettrocatetere di pacemaker come possibile causa di trombosi venosa del braccio)"
- [ ] stessi file: "conferma se in studio si esegue questa manovra e se la spiegazione della sindrome dello stretto toracico è corretta" (manovra di elevazione del braccio, sindrome dello stretto toracico) — se non viene eseguita in studio, togliere o riformulare la FAQ
- [ ] Correzione non sicura: rimuovere/spostare `aria-label` da `<ul class="hero-trust">` in `index.html`/`index-en.html` (errore html-validate `aria-label-misuse`)
- [ ] Correzione non sicura: tradurre le FAQ aggiuntive (`faqExtra`) già presenti in IT ma assenti in EN per 6 pagine esame (anca-neonatale, apparato-urinario, caviglia-piede, ginocchio, scrotale-testicolare, spalla)
- [ ] Correzione non sicura: verificare il certificato HTTPS per `www.studiosusino.it` (oggi fallisce, il redirect funziona solo passando da HTTP)
- [ ] Proposte dello stratega da approvare o scartare:
  1. FAQ su ecografia vescico-prostatica vs trans-rettale (chiarimento, nessun nuovo dato clinico rilevante)
  2. FAQ "quando un linfonodo ingrossato deve preoccupare" su `ecografia-linfonodi.html`/`ecografia-collo.html` (contiene soglie cliniche da verificare)
  3. Espandere `ecografie-modica-ispica-scicli.html` con un paragrafo su Rosolini, Pachino e Marina di Ragusa
  4. Sezione "Accessibilità e parcheggio" in `studio.html`/`contatti.html` (dati fattuali da verificare/fotografare)
  5. FAQ su ecocolordoppler carotidi: durata esame e frequenza dei controlli
  6. FAQ per turisti in `prenota-en.html`/`contatti-en.html` (ricetta come turista, referto in italiano)
  7. Verifica coerenza NAP/categoria tra sito e Google Business Profile
  8. FAQ di orientamento tra ecografia renale, apparato urinario e addome inferiore

### Pagine lavorate
- ecocolordoppler-arti-superiori.html, ecocolordoppler-arti-superiori-en.html

## 2026-09-27 — Impianto del sistema

**Fonte dati:** nessun audit ancora eseguito.

### Modifiche fatte
- Creati gli agenti `seo-auditor`, `content-editor`, `seo-strategist`, `design-curator` e i comandi `/seo-periodico`, `/seo-audit`.
- Creato il workflow `.github/workflows/seo-settimanale.yml` (lunedì mattina, apre una PR).

### Da verificare per il medico
- [ ] Configurare i secret del repository (vedi CLAUDE.md, sezione "Automazione settimanale").
