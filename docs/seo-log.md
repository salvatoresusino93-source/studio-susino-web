# Registro SEO — studiosusino.it

Voci in ordine dalla più recente. Ogni voce la scrive `/seo-periodico` (in locale o dal workflow del lunedì).
Gli agenti leggono la voce più recente per segnalare solo novità e regressioni: non cancellare le voci vecchie.
Quando decidi su una proposta o un "Da verificare", spunta la casella e aggiungi una nota (es. "scartata: non offriamo l'esame").

<!-- NUOVE VOCI SOTTO QUESTA RIGA -->

## 2026-09-27 — Sessione periodica

**Fonte dati:** audit automatico (nessun testo Search Console in questa sessione)

### Problemi trovati
- [NUOVO] `https://www.studiosusino.it/` non fa un redirect 301 pulito in HTTPS: il TLS handshake presenta il certificato wildcard di default di GitHub Pages (`*.github.io`), non uno valido per `www.studiosusino.it` — il browser mostra un errore di certificato invece del redirect (in chiaro su HTTP il redirect invece funziona). Serve intervento su DNS/GitHub Pages, fuori dal repo.
- [NUOVO] `index.html`/`index-en.html`: `aria-label` su `<ul class="hero-trust">` segnalato da html-validate (`aria-label-misuse`) — corretto in questa sessione (vedi sotto).
- Ancora aperti: 22 FAQ di gruppo in `scripts/faq-gruppi.js` da approvare; traduzioni EN mancanti per alcune FAQ specifiche in `js/esami-paziente-en.js`; `faqExtra` mancante per alcuni esami; `prenota`/`tariffe` con una FAQ in meno in EN; secret del workflow settimanale da configurare.

### Modifiche fatte
- Correzioni tecniche: rimosso `aria-label` non valido su `<ul class="hero-trust">` in `index.html` e `index-en.html` (html-validate ora pulito).
- Contenuti: `ecografia-renale.html` (+ EN) — testi (`perche`, `svolgimento`, `cosaControlla`) riscritti in `js/esami-paziente.js`/`-en.js` per differenziare l'esame da `ecografia-apparato-urinario` e `ecocolordoppler-arterie-renali`; aggiunte 3 FAQ specifiche per lingua (non ancora visibili: `verificata: false`, in attesa di approvazione come da regola del 2026-09-29).

### Da verificare per il medico
- [ ] `js/esami-paziente.js` sopra `renale.perche`: "esempio di controllo nel tempo di una cisti o di un calcolo renale già noti, aggiunto per spiegare quando si sceglie questo esame invece dell'ecografia dell'apparato urinario" (e equivalente EN in `js/esami-paziente-en.js`).
- [ ] `js/esami-paziente.js` sopra `renale.cosaControlla`: "elenco esplicito di calcoli, cisti e dilatazione delle vie urinarie come reperti tipici che si possono vedere con questo esame" (e equivalente EN).
- [ ] 3 nuove FAQ su `renale` (IT+EN) in `js/esami-paziente.js`/`-en.js`: differenza da ecografia apparato urinario, differenza da ecocolordoppler arterie renali, vescica piena/digiuno non necessari — impostare `verificata: true` dopo revisione e rigenerare con `node scripts/genera-pagine-esami.js`.
- [ ] Redirect `www.studiosusino.it` senza certificato valido (vedi sopra): da sistemare su DNS/GitHub Pages, non nel repo.
- [ ] Proposte dello stratega da approvare o scartare:
  1. FAQ EN "For visitors and international patients" su prenota-en/contatti-en (referto in italiano, pagamento estero, accompagnatore non necessario).
  2. FAQ "posso venire da solo" e "l'esame fa male" su contatti/studio (+EN).
  3. Paragrafo "Accessibilità" (ingresso, parcheggio) in studio.html/-en — dato strutturale da verificare col medico.
  4. Paragrafo turistico su Marina di Ragusa in ecografie-en.html.
  5. FAQ su tempi di appuntamento (nessuna corsia prioritaria a pagamento) su contatti.html.
  6. FAQ "referto via email" su prenota/contatti — da verificare la prassi attuale.
  7. Controllo coerenza NAP (nome/indirizzo/telefono/categoria) tra sito e Google Business Profile — nessuna pubblicazione, solo verifica.
  8. FAQ su detraibilità 730 in tariffe.html — da verificare con il medico/commercialista prima di pubblicare.

### Pagine lavorate
- ecografia-renale.html, ecografia-renale-en.html

## 2026-09-29 — FAQ non verificate nascoste fino ad approvazione

### Modifiche fatte
- Generatore e `faq-pagine-manuali.js`: in pagina vanno solo FAQ approvate. FAQ di gruppo solo con `verificata: true`; `faqExtra` nascoste se `verificata: false` (quelle senza campo sono precedenti, approvate con la PR #2).
- Nascoste le 22 FAQ di gruppo pubblicate il 28/09 (nessuna ancora verificata). Nelle pagine scritte a mano resta un commento segnaposto nella stessa posizione.
- 26 pagine esame (13 esami IT/EN) restano senza FAQ finche' non si approvano: niente sezione vuota e niente FAQPage.

### Da verificare per il medico
- [ ] Le 22 FAQ di gruppo in `scripts/faq-gruppi.js`: approvarle una per una con `verificata: true`.

## 2026-09-28 — Title, contenuti sottili, FAQ differenziate

**Fonte dati:** report `docs/seo-fix-report.md` (Search Console: 30 pagine "Scansionata ma non indicizzata").

### Modifiche fatte
- Title ≤ 60 e description ≤ 160 su tutte le pagine indicizzabili (generatore + 16 pagine a mano); controllo aggiunto a `verifica-seo.js`.
- Ampliate chi-sono, studio, contatti (IT/EN) con sole informazioni già presenti sul sito; 4 FAQ su contatti.
- Tolte le 4 FAQ generiche identiche dalle pagine esame; nuove FAQ per gruppo (`scripts/faq-gruppi.js`) a rotazione; tradotte in EN le 18 FAQ specifiche esistenti.
- FAQPage ricostruito dalle FAQ visibili su 17 pagine (15 non coincidevano); controllo aggiunto a `verifica-seo.js`.
- Somiglianza tra pagine esame: coppie > 50% da 42 a 0, massimo da 61% a 45%.

### Da verificare per il medico
- [ ] 22 FAQ di gruppo in `scripts/faq-gruppi.js` (commenti `DA VERIFICARE` in 44 pagine): dopo la revisione `verificata: true` e rigenerare.
- [ ] Traduzioni EN delle FAQ specifiche in `js/esami-paziente-en.js`.
- [ ] Prenota e tariffe: una FAQ in meno nella versione EN (preesistente).
- [ ] FAQ specifiche (`faqExtra`) per gli esami che non le hanno ancora (elenco nel report).

## 2026-09-27 — Impianto del sistema

**Fonte dati:** nessun audit ancora eseguito.

### Modifiche fatte
- Creati gli agenti `seo-auditor`, `content-editor`, `seo-strategist`, `design-curator` e i comandi `/seo-periodico`, `/seo-audit`.
- Creato il workflow `.github/workflows/seo-settimanale.yml` (lunedì mattina, apre una PR).

### Da verificare per il medico
- [ ] Configurare i secret del repository (vedi CLAUDE.md, sezione "Automazione settimanale").
