# Registro SEO — studiosusino.it

Voci in ordine dalla più recente. Ogni voce la scrive `/seo-periodico` (in locale o dal workflow del lunedì).
Gli agenti leggono la voce più recente per segnalare solo novità e regressioni: non cancellare le voci vecchie.
Quando decidi su una proposta o un "Da verificare", spunta la casella e aggiungi una nota (es. "scartata: non offriamo l'esame").

<!-- NUOVE VOCI SOTTO QUESTA RIGA -->

## 2026-09-30 — Ecografia renale a digiuno, approvazione testi rene e anca

### Modifiche fatte
- Ecografia renale **a digiuno** (indicazione del medico): sezione "Serve preparazione?" con testo proprio (digiuno 6-8 ore, niente vescica piena), FAQ "Devo essere a digiuno? Serve la vescica piena?" riscritta; Prenota e Chi sono (IT/EN) ora elencano tutti gli esami a digiuno (addome superiore/completo, renale, ecocolordoppler aorta e arterie renali).
- Approvati dal medico: testi descrittivi di ecografia renale (#11) e anca (#13), commenti DA VERIFICARE rimossi; FAQ renale "differenza con l'ecocolordoppler delle arterie renali" e FAQ anca "artrosi" ora visibili.
- Da ora si lavora nella copia `~/Projects/studiosusino-it` (la cartella in Documenti è sincronizzata con iCloud e aveva danneggiato `.git`).

### Da verificare per il medico
- [ ] Preparazione dell'ecografia renale anche nella prenotazione online (RefertEco, repository separato): se lì è indicato "nessuna preparazione", va aggiornata.

## 2026-09-29 — Domande pratiche per esame e durate per esame

### Modifiche fatte
- `scripts/faq-pratiche.js`: "Fa male?" (risposta standard unica, testo del medico), "Quanto dura?" (durate per esame dalle medie dei siti italiani) e creme/abbigliamento su ogni pagina esame; controindicazioni e "dopo l'esame" una volta sola su Prenota.
- Durate diverse per esame, allineati i testi precedenti (IT/EN).
- Esclusa dalle articolazioni la FAQ di gruppo "Come conviene vestirsi?" (ora c'è la domanda specifica).
- Somiglianza massima tra pagine esame: 39%.

### Da verificare per il medico
- [x] Testi approvati il 29/09; resta da confermare la resa finale prima del merge della PR #8.

## 2026-09-29 — FAQ non verificate nascoste fino ad approvazione

### Modifiche fatte
- Generatore e `faq-pagine-manuali.js`: in pagina vanno solo FAQ approvate. FAQ di gruppo solo con `verificata: true`; `faqExtra` nascoste se `verificata: false` (quelle senza campo sono precedenti, approvate con la PR #2).
- Nascoste le 22 FAQ di gruppo pubblicate il 28/09 (nessuna ancora verificata). Nelle pagine scritte a mano resta un commento segnaposto nella stessa posizione.
- 26 pagine esame (13 esami IT/EN) restano senza FAQ finche' non si approvano: niente sezione vuota e niente FAQPage.

### Da verificare per il medico
- [x] FAQ di gruppo: approvate dal medico il 29/09 (tolta 1; restano 21).

## 2026-09-29 — FAQ specifiche per 13 esami, parità IT/EN prenota e tariffe

**Fonte dati:** `docs/seo-fix-report.md` (esami senza FAQ proprie; FAQ mancanti in EN).

### Modifiche fatte
- 30 FAQ specifiche IT + EN (`faqExtra`, `verificata: false`) per gomito, anca, polso-mano, parti molli, collo, linfonodi, renale, vescico-prostatica, addome superiore/inferiore, doppler aorta/arterie renali/arti superiori.
- Le FAQ nuove restano nascoste finché non hanno `verificata: true` (regola introdotta con la PR #9).
- prenota-en: sezione "How much it costs" + FAQ sul costo; tariffe-en: FAQ "Can I pay online and cancel?"; FAQPage allineati.
- `verifica-seo.js`: nuovo controllo sul numero di FAQ IT = EN.
- Similarità massima tra pagine esame da 45% a 36%; nessuna coppia sopra il 40%.

### Da verificare per il medico
- [x] FAQ specifiche nuove: approvate dal medico il 29/09 (tolte 4, aggiunte 3 sulla spalla; restano 30).
- [ ] Testi EN nuovi su prenota-en e tariffe-en.

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

## 2026-09-27 — Sessione periodica (2)

**Fonte dati:** audit automatico (nessun testo Search Console in questa sessione)

### Problemi trovati
- Nessun problema nuovo né regressione: audit tecnico completo (canonical, hreflang, sitemap, robots, noindex, link interni, title/description, JSON-LD, immagini, html-validate, redirect) risultato pulito.
- Ancora aperti (invariati dalle voci precedenti): certificato TLS mancante per `www.studiosusino.it` (fuori dal repo); 3 FAQ su `ecografia-renale` e 22 FAQ di gruppo in attesa di `verificata: true`; traduzioni EN mancanti per alcune FAQ specifiche; `faqExtra` mancante per diversi esami; `prenota`/`tariffe` con una FAQ in meno in EN; secret del workflow settimanale da configurare; 8 proposte stratega del 27/09 ancora da approvare/scartare.

### Modifiche fatte
- Correzioni tecniche: nessuna (l'auditor non ha trovato interventi meccanici da applicare in questa sessione).
- Contenuti: `ecografia-anca.html` (+ EN) — arricchiti `perche`/`svolgimento`/`cosaControlla` in `js/esami-paziente.js`/`-en.js` per l'anca adulta (tendinopatia glutei/borsite trocanterica, ileopsoas/adduttori, anca a scatto, sport, controllo protesi d'anca, limiti vs radiografia); aggiunte 4 FAQ specifiche per lingua in `faqExtra` (non ancora visibili: `verificata: false`, in attesa di approvazione). Rigenerato con `node scripts/genera-pagine-esami.js` (aggiornati anche `ecografie.html`/`ecografie-en.html`).

### Da verificare per il medico
- [ ] `js/esami-paziente.js`/`-en.js` sopra `anca.perche`: elenco di quadri clinici (tendinopatia dei glutei, borsite trocanterica, tendinopatia di ileopsoas e adduttori, anca a scatto, sport come corsa e calcio, controllo dei tessuti intorno a una protesi d'anca) e indicazione che per l'artrosi si preferisce la radiografia.
- [ ] `js/esami-paziente.js`/`-en.js` sopra `anca.svolgimento`: descrizione della posizione (fianco o pancia in giù) e della manovra dinamica (muovere la gamba) per lo studio dell'anca a scatto.
- [ ] `js/esami-paziente.js`/`-en.js` sopra `anca.cosaControlla`: elenco esplicito delle strutture valutate (glutei, ileopsoas, adduttori, eventuale liquido articolare, tessuti intorno a una protesi) e limite dell'ecografia rispetto a osso e cartilagine.
- [ ] 4 nuove FAQ su `anca` (IT+EN) in `js/esami-paziente.js`/`-en.js`: differenza da anca neonatale, anca a scatto, ecografia con protesi d'anca, limiti su artrosi — impostare `verificata: true` dopo revisione e rigenerare con `node scripts/genera-pagine-esami.js`.
- [ ] Correzioni non sicure proposte dall'auditor: nessuna in questa sessione oltre a quelle già aperte (certificato TLS `www.studiosusino.it`, fuori dal repo).
- [ ] Proposte dello stratega da approvare o scartare:
  1. FAQ generali "differenza ecografia/ecocolordoppler" sulla pagina hub `ecografie.html`/-en.
  2. FAQ "devo sospendere gli anticoagulanti?" su tutte le pagine ecocolordoppler (+EN).
  3. FAQ di sicurezza su `ecografia-scrotale-testicolare.html` (+EN): dolore acuto al testicolo, indirizzare al pronto soccorso e non alla prenotazione online.
  4. FAQ pratica "cosa indossare/togliere prima dell'esame" su pagine muscolo-scheletriche, tiroide, collo e su `prenota.html` (+EN).
  5. FAQ/sezione su `ecografia-parti-molli.html` (+EN) per la query "ecografia ernia inguinale" — verificare prima con il medico se l'esame è offerto in questa forma.
  6. FAQ su `ecografia-anca-neonatale.html` (+EN): tempistica del controllo rispetto alla nascita e necessità della richiesta del pediatra.
  7. Arricchire `ecografie-modica-ispica-scicli.html` con paragrafi dedicati a Rosolini e Pachino (oggi solo citati di sfuggita).
  8. FAQ "come riconosco l'ingresso" su `contatti.html`/`studio.html` (+EN), essendo lo studio dentro Arcobaleno Dentisti.

### Pagine lavorate
- ecografia-anca.html, ecografia-anca-en.html

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

## 2026-09-27 — Impianto del sistema

**Fonte dati:** nessun audit ancora eseguito.

### Modifiche fatte
- Creati gli agenti `seo-auditor`, `content-editor`, `seo-strategist`, `design-curator` e i comandi `/seo-periodico`, `/seo-audit`.
- Creato il workflow `.github/workflows/seo-settimanale.yml` (lunedì mattina, apre una PR).

### Da verificare per il medico
- [ ] Configurare i secret del repository (vedi CLAUDE.md, sezione "Automazione settimanale").
