# Report interventi SEO — studiosusino.it

## Aggiornamento 29 settembre 2026 — FAQ specifiche per 13 esami, parità IT/EN

Branch `seo/faq-specifiche-esami`, pubblicato tramite Pull Request (non su `main` direttamente).

### FAQ specifiche
- **30 nuove FAQ** (IT + EN) come `faqExtra` in `js/esami-paziente.js` / `js/esami-paziente-en.js` per gli esami che non ne avevano: gomito, anca, polso-mano, parti molli, collo, linfonodi, renale, vescico-prostatica, addome superiore, addome inferiore, ecocolordoppler aorta, arterie renali, arti superiori.
- Ogni risposta riformula informazioni già presenti nella pagina dell'esame (descrizione, "perché si fa", "come si svolge", "cosa controllo"); nessun dato numerico o clinico nuovo.
- Ogni nuova FAQ ha `verificata: false` e un commento `/* DA VERIFICARE */` nel file dati. Dopo il merge della PR #9 **le FAQ non verificate non compaiono nelle pagine**: vengono pubblicate solo quando il medico mette `verificata: true` e si rilanciano i generatori.
- Revisione del medico (29/09): tolte "Perché a volte mi fa girare sul fianco?" (renale) e "Devo indicare io dove si trova la tumefazione?" (parti molli); aggiunte 3 FAQ sulla spalla (calcificazioni, borsite subacromion-deltoidea, lesioni della cuffia); tolte poi "Perché mi chiede di piegare le dita?" (polso-mano) e, tra le FAQ di gruppo, "Perché a volte mi chiede di trattenere il respiro o di girarmi sul fianco?" (addome). Totale: 30 FAQ specifiche nuove e 21 FAQ di gruppo, IT + EN.

### Terminologia rivista (29/09, su richiesta del medico)
Le 30 FAQ sono state riscritte con termini medici corretti, spiegati tra parentesi la prima volta, confrontandoli con letteratura e con siti sanitari italiani (Policlinico Gemelli, Humanitas, Auxologico, SIECVI, SIUMB). Correzioni sostanziali rispetto alla prima versione:
- vescico-prostatica: con vescica poco distesa l'attesa è di solito 30–60 minuti o un nuovo appuntamento, non "qualche minuto";
- renale: i calcoli di pochi millimetri possono sfuggire e quelli dell'uretere raramente si vedono direttamente (segno indiretto: idronefrosi); reni "retroperitoneali", decubito laterale/prono, scansioni intercostali;
- anca: sindrome dolorosa del grande trocantere, più spesso tendinopatia del gluteo medio/minimo che borsite;
- gomito: tendine comune degli estensori (epicondilo) e dei flessori-pronatori (epitroclea);
- addome inferiore: nelle infezioni ricorrenti si cercano idronefrosi, calcoli, residuo post-minzionale elevato, diverticoli; l'esame non serve in tutti i casi.

### Approvazione del medico (29/09)
Tutte le 51 FAQ rimaste (30 specifiche + 21 di gruppo) sono state approvate e hanno `verificata: true`: compaiono nelle pagine dopo il merge della PR #8. Similarità massima tra pagine esame con le FAQ pubblicate: 35%, nessuna coppia sopra il 40%.

Confronto con siti simili (Santagostino, San Raffaele, Humanitas, centri diagnostici): terminologia e lunghezza delle risposte allineate. Tipi di domanda presenti altrove e ancora assenti qui, da decidere con il medico: dolore/fastidio, durata in minuti per esame, creme e gioielli, controindicazioni e gravidanza, ritorno alle attività.

### Domande pratiche (29/09, approvate dal medico)
- `scripts/faq-pratiche.js`: su ogni pagina esame "Fa male?", "Quanto dura?" e una domanda su creme/abbigliamento, con testi diversi per gruppo di esami e, nel muscolo-scheletrico e nei Doppler addominali, per singolo esame. Non si aggiungono dove la pagina ha già la domanda (dolore o durata).
- Controindicazioni/gravidanza e "Dopo l'esame" sono uguali per tutti gli esami: stanno una volta sola nelle FAQ di Prenota (IT/EN), non su ogni pagina.
- Durata **20–30 minuti per tutti gli esami** (decisione del medico): allineati i testi che dicevano "pochi minuti" o "15–20 minuti" (Prenota, tiroide, addome, carotidi, scrotale, parti molli, anca neonatale, IT/EN).
- Somiglianza tra pagine esame con tutte le FAQ approvate: **massimo 33%** (con le 5 domande uguali per gruppo sarebbe stata 49%).

### Parità IT/EN su prenota e tariffe
Le due FAQ mancanti in inglese non erano state tolte di proposito: erano state aggiunte solo in italiano nel commit `d77e8d3`.
- `prenota-en.html`: aggiunta la FAQ "How much does the scan cost?" e la sezione "How much it costs". La sezione italiana è già un riassunto di una frase con link a `tariffe.html`, non una copia: in inglese è lo stesso riassunto con link a `tariffe-en.html`.
- `tariffe-en.html`: aggiunta la FAQ "Can I pay online and cancel?".
- FAQPage ricostruito dalle FAQ visibili: ora 5/5 (prenota) e 4/4 (tariffe).
- `verifica-seo.js` controlla ora anche che ogni pagina italiana e la sua versione inglese abbiano lo stesso numero di FAQ.

### Similarità tra pagine esame (frasi di 5 parole in comune, stessa lingua)
*Valori misurati con le FAQ visibili: si applicheranno quando le FAQ saranno approvate e pubblicate.*
| | Prima (main) | Dopo |
|---|---|---|
| Massimo | 45% | **36%** |
| Coppie ≥ 50% | 0 | 0 |
| Coppie ≥ 40% | 12 | **0** |
| Coppie ≥ 35% | 19 | 2 |

Le coppie più simili rimaste: ecocolordoppler aorta ↔ arterie renali (36% IT, 35% EN: stessa preparazione a digiuno, stessa FAQ di gruppo sul digiuno, modello comune della pagina) e polso-mano ↔ caviglia-piede EN (34%).

### Da verificare per il medico
- [ ] 30 FAQ specifiche nuove (elenco per esame nella descrizione della PR).
- [ ] Testi EN aggiunti su prenota e tariffe (riprendono i testi italiani esistenti).
- [ ] Restano da rivedere anche le 22 FAQ di gruppo della sessione precedente.

---


## Aggiornamento 28 settembre 2026 — title, contenuti sottili, FAQ duplicate

### Title e meta description
Tutte le pagine indicizzabili ora hanno **title ≤ 60** e **description ≤ 160** caratteri (controllato da `verifica-seo.js`). URL, canonical e hreflang invariati.

| Pagina | Prima | Dopo |
|---|---|---|
| ecocolordoppler-aorta-addominale | T61 | T56 (generatore) |
| ecografia-scrotale-testicolare | T61 | T56 (generatore) |
| ecografia-apparato-urinario-en / caviglia-piede-en / polso-mano-en | T61–62 | T56–57 (generatore) |
| ecocolordoppler-arti-inferiori | T67, D163 | T59, D148 |
| ecocolordoppler-arti-inferiori-en | D167 | D151 |
| ecocolordoppler-carotidi / -en | D169 / D171 | D146 / D144 |
| ecografia-addome / -en | T60 D164 / T67 D164 | T50 D155 / T57 D152 |
| ecografia-muscolo-scheletrica | T68, D164 | T58, D158 |
| ecografia-tiroide / -en | T62 D175 / T65 D168 | T52 D145 / T55 D150 |
| ecografie-en | T63 | T53 |
| tariffe-en | T63 | T54 |
| ecografie-modica-ispica-scicli | D161 | D153 ("appuntamento in tempi brevi" → "appuntamento online": niente promesse) |
| studio / -en | T61 D83 / T66 D78 | T53 D158 / T58 D157 |
| contatti / -en | D96 / D95 | D152 / D155 |

Nel generatore: il title prova forme via via più corte finché sta in 60 caratteri; la description viene tagliata a fine parola (prima poteva essere troncata a metà parola).

### Contenuti sottili (solo informazioni già presenti sul sito)
| Pagina | Parole prima → dopo | Aggiunto |
|---|---|---|
| chi-sono / -en | 154 / 172 → 359 / 387 | "Come lavoro" (esame eseguito dal medico, referto + immagini + spiegazione, confronto con esami precedenti, estensione senza costi), "Gli esami che eseguo" con link, "Prima della visita" (impegnativa, esami precedenti, preparazione) |
| studio / -en | 172 / 177 → 328 / 337 | Orari, "Come si svolge la visita" in 4 passi (prenotazione, cosa portare, esame, pagamento e ricevuta), "Da dove arrivano i pazienti" con link alla pagina dei comuni vicini |
| contatti / -en | 127 / 121 → 258 / 268 | Avviso "non per urgenze" (da prenota), 4 FAQ (come prenotare, spostare/disdire, sabato, parcheggio) + JSON-LD FAQPage |

Fonti usate: prenota, tariffe, studio, ecografie-modica-ispica-scicli, home. Nessun dato nuovo.

### Pagine esame troppo simili
- **Tolte le 4 FAQ identiche** dalle 38 pagine generate ("fa male?", "serve preparazione?", "serve l'impegnativa?", "quanto dura e quando ho il referto?"). Preparazione, impegnativa e referto restano nel testo della pagina e in prenota/tariffe.
- **Nuove FAQ per gruppo** in `scripts/faq-gruppi.js` (22 domande IT + EN: addome, apparato urinario, tiroide e collo, muscolo-scheletrico, doppler, linfonodi). Ogni pagina ne riceve 2–3 del proprio gruppo **a rotazione** e con filtri `solo`/`esclusi`, così pagine vicine non hanno lo stesso blocco.
- **Tradotte in inglese** le 18 FAQ specifiche già esistenti (spalla, ginocchio, caviglia-piede, anca neonatale, apparato urinario, scrotale): prima le pagine EN avevano solo le 4 generiche.
- **Pagine scritte a mano**: "Serve l'impegnativa?" / "Quanto dura?" sostituite con FAQ del gruppo (tiroide ×2, addome, muscolo-scheletrica, carotidi, arti inferiori; IT + EN) con `scripts/faq-pagine-manuali.js`.
- **Risultato** (sovrapposizione di frasi di 5 parole tra pagine della stessa lingua): coppie oltre il 50% **da 42 a 0**; massimo **da 61% a 45%**. Il 43–45% residuo (gomito/anca/polso-mano, aorta/arterie renali) è il modello comune della pagina: servono FAQ specifiche per esame (`faqExtra`), che vanno scritte dal medico.

### FAQPage: errori trovati e corretti
Il JSON-LD FAQPage **non coincideva con le FAQ visibili** su 15 pagine (5 esami scritti a mano ×2, prenota ×2, tariffe ×2, comuni vicini): domande diverse o in più, come "Dove si trova lo studio?" o "Come si paga?", presenti solo nei dati strutturati. Google chiede che coincidano. Ora `faq-pagine-manuali.js` ricostruisce il FAQPage dal testo visibile e `verifica-seo.js` blocca ogni differenza su tutte le pagine.

### Da verificare per il medico
- [ ] **22 FAQ di gruppo** in `scripts/faq-gruppi.js`: informazioni generali e prudenti, ma nuove. In pagina ognuna è preceduta da `<!-- DA VERIFICARE: FAQ di gruppo "id" -->` (44 file). Dopo la revisione aggiungere `verificata: true` alla domanda e rilanciare i generatori: il commento sparisce.
- [ ] Traduzioni EN delle 18 FAQ specifiche esistenti (`js/esami-paziente-en.js`).
- [ ] IT/EN non allineati (preesistente): prenota ha 5 FAQ in IT e 4 in EN, tariffe 4 in IT e 3 in EN.
- [ ] Scrivere `faqExtra` specifiche per gli esami che ne sono ancora privi: gomito, anca, polso-mano, parti molli, collo, linfonodi, renale, vescico-prostatica, addome superiore/inferiore, doppler aorta/arterie renali/arti superiori.

Procedura completa dopo ogni modifica:
```bash
node scripts/genera-pagine-esami.js
node scripts/correlati-pagine-manuali.js
node scripts/faq-pagine-manuali.js
node scripts/dati-strutturati-studio.js
node scripts/generate-sitemap.js
node scripts/verifica-seo.js
npx --yes html-validate "*.html"
```

---

## Intervento del 27 settembre 2026

Data: 27 settembre 2026
Situazione di partenza (Search Console): 4 pagine indicizzate su ~35; 30 "Scansionata ma attualmente non indicizzata", 1 "Esclusa da tag noindex", 1 "Pagina alternativa con tag canonical appropriato".

Hosting: **GitHub Pages** (repo `salvatoresusino93-source/studio-susino-web`, branch `main`), DNS su Aruba.
Il sito live coincideva con l'ultimo commit (`b9ff575`) prima di questi interventi.

---

## 1. Modifiche fatte

### Commit 1 — modifiche locali già presenti (non fatte in questa sessione)
Committate così com'erano, prima degli interventi SEO: ricerca/filtri in `ecografie.html`, animazioni leggere in `js/main.js`, "Ecocolordoppler TSA" → "Ecocolordoppler carotidi" (title, H1, breadcrumb, elenchi).

### Commit 2 — interventi SEO

| Punto | Esito |
|---|---|
| **Hreflang** | Erano **già presenti e corretti**: 31 coppie IT/EN con `it`, `en` reciproci e `x-default` → italiano. Unica pagina senza controparte: `ecografie-modica-ispica-scicli.html` (esiste solo in italiano, ha `it` + `x-default`: corretto). Nessuna modifica; aggiunto un controllo automatico. |
| **Sitemap** | `scripts/generate-sitemap.js` ora: esclude automaticamente le pagine `noindex` (prima conteneva `privacy.html` → causa della voce "Esclusa da tag noindex"); `lastmod` **reale** = data dell'ultimo commit che ha modificato il file (prima tutte le 64 URL avevano la data di generazione); tolti `changefreq`/`priority` (ignorati da Google). Risultato: **63 URL**, tutte canoniche e indicizzabili. |
| **robots.txt** | Già corretto: `Allow: /` e dichiara `Sitemap: https://studiosusino.it/sitemap.xml`. Non blocca nulla. Nessuna modifica. |
| **Redirect** | Nulla da configurare nel repo: GitHub Pages non supporta `.htaccess`, `_redirects` né header personalizzati. Vedi sezione 5 per lo stato e le azioni manuali. |
| **Dati strutturati** | Nuovo `scripts/dati-strutturati-studio.js`: un unico blocco `@graph` con **MedicalClinic** (`#business`) + **Physician** (`#physician`) collegati tra loro (`subOrganization` / `parentOrganization`), scritto in `index`, `contatti`, `chi-sono` (IT ed EN). Sostituisce il vecchio `MedicalBusiness` della home e il `Physician` di chi-sono (che usava `worksFor`, proprietà non valida per quel tipo). Dati identici a quelli visibili: Via dell'Arno 34, 97016 Pozzallo (RG); tel. +39 0932 954441 e +39 351 3746102; geo 36.7299582, 14.8483942; lun–ven 9:00–12:30 e 15:00–19:00. Le pagine esame puntano già allo stesso `@id #business`. BreadcrumbList (tutte le 48 pagine esame) e FAQPage (53 pagine con FAQ) **erano già presenti**: nessuna modifica. |
| **Link interni** | Nuova mappa `CORRELATI_EXTRA` in `scripts/esami-mappa.js` (collegamenti tra categorie diverse: collo ↔ tiroide/linfonodi, parti molli ↔ linfonodi, anca ↔ anca neonatale, addome sup./inf. ↔ addome/reni, reni ↔ doppler arterie renali, ecc.). Il generatore ora sceglie gli esami della stessa categoria **a rotazione** (prima prendeva sempre i primi 5: caviglia-piede e parti molli restavano esclusi) e mostra fino a 6 correlati. Aggiunto il blocco "Esami correlati" alle **10 pagine scritte a mano** (tiroide, addome, muscolo-scheletrica, carotidi, arti inferiori — IT ed EN) con `scripts/correlati-pagine-manuali.js`. Risultato: **ogni pagina esame riceve ora da 3 a 10 link** dal contenuto di altre pagine (prima: linfonodi, parti molli, collo EN, caviglia-piede EN, anca neonatale EN ne avevano 1). |
| **Controllo** | Nuovo `scripts/verifica-seo.js`: verifica canonical, reciprocità hreflang, x-default, sitemap = pagine indicizzabili, JSON-LD valido, ≥ 3 link in entrata per ogni pagina esame. Esito attuale: **OK, nessun problema**. |

Procedura dopo ogni modifica ai testi:
```bash
node scripts/genera-pagine-esami.js
node scripts/correlati-pagine-manuali.js
node scripts/dati-strutturati-studio.js
node scripts/generate-sitemap.js
node scripts/verifica-seo.js
```

---

## 2. Pagine con noindex

Tutte tramite `<meta name="robots" content="noindex, follow">`. **Nessun** header `X-Robots-Tag` (verificato sugli header live di GitHub Pages). Nessuna è stata modificata.

| Pagina | Motivo | Consiglio |
|---|---|---|
| `privacy.html` | Informativa privacy | Va bene così. Era erroneamente in sitemap → corretto. |
| `privacy-en.html` | Informativa privacy (EN) | Va bene così. |
| `esame.html` | Vecchia pagina dinamica `?id=...`, oggi serve solo a reindirizzare ai vecchi link | Va bene così. |
| `esame-en.html` | Idem (EN) | Va bene così. |

---

## 3. Pagine con contenuto da arricchire (solo elenco, nessun testo scritto)

Conteggio parole del testo principale (`<main>`, esclusi menu/header/footer).

**Troppo brevi (< 200 parole), indicizzabili:**

| Pagina | Parole | Nota |
|---|---|---|
| `contatti.html` / `contatti-en.html` | 127 / 121 | Normale per una pagina contatti; si può aggiungere come arrivare, parcheggio, accessibilità. |
| `chi-sono.html` / `chi-sono-en.html` | 154 / 172 | **Priorità alta** per un sito medico (E-E-A-T): formazione, specializzazione, iscrizione all'Ordine, esperienza, strumentazione, foto. |
| `studio.html` / `studio-en.html` | 172 / 177 | Descrizione dell'ambulatorio, ecografo usato, accessibilità. |

**Nella norma ma migliorabili (250–320 parole):** `prenota` (278/245), `index` (305/284), `tariffe-en` (305), `ecocolordoppler-carotidi` (~316).

**Pagine esame troppo simili tra loro** (sovrapposizione del 50–61% delle frasi di 5 parole, 42 coppie sopra il 50%). Probabile causa principale del "Scansionata ma non indicizzata": Google vede molte pagine quasi uguali e ne indicizza poche.

- Gruppo **muscolo-scheletrico** (il più critico, 55–61%): anca, gomito, polso-mano, caviglia-piede, spalla, ginocchio, parti molli (IT ed EN), più `ecocolordoppler-arti-superiori-en` e `ecografia-collo`.
- **Ecocolordoppler aorta addominale ↔ arterie renali**: 58% (IT), 56% (EN).
- Origine della somiglianza: le **4 FAQ identiche** su tutte le pagine generate ("fa male?", "serve preparazione?", "serve l'impegnativa?", "quanto dura e quando ho il referto?") e i blocchi di template uguali (onorario, come si svolge, prenotazione).
- Cosa servirebbe (da scrivere a cura del Dott.): per ciascun esame 150–300 parole **specifiche** (quesiti clinici tipici, cosa si vede e cosa non si vede, confronto con RX/RM, cosa succede dopo), FAQ specifiche al posto di quelle comuni.
- Le pagine EN sono traduzioni delle IT: vanno bene (hreflang corretto), ma hanno poco pubblico potenziale; la priorità è l'italiano.

---

## 4. Title e meta description

**Nessun duplicato** tra le 67 pagine. Fuori norma (title > 60 caratteri, description > 160), da rivedere a mano se si vuole:

| Pagina | Title | Description |
|---|---|---|
| ecografia-muscolo-scheletrica | 68 | 164 |
| ecocolordoppler-arti-inferiori | 67 | 163 |
| ecografia-addome-en | 67 | 164 |
| studio-en | 66 | — |
| ecografia-tiroide-en | 65 | 168 |
| ecografie-en, tariffe-en | 63 | — |
| ecografia-tiroide | 62 | **175** |
| ecografia-caviglia-piede-en, ecografia-polso-mano-en | 62 | — |
| ecocolordoppler-aorta-addominale, ecografia-scrotale-testicolare, ecografia-apparato-urinario-en, studio | 61 | — |
| ecocolordoppler-carotidi / -en | — | 169 / 171 |
| ecocolordoppler-arti-inferiori-en | — | 167 |
| ecografia-addome | — | 164 |
| ecografie-modica-ispica-scicli | — | 161 |
| privacy (noindex, irrilevante) | — | 68 (corta) |

Gli sforamenti sono piccoli (Google tronca oltre ~60 caratteri / ~155–160 caratteri, non penalizza).

---

## 5. Redirect: stato verificato sul sito live

| Caso | Stato | Azione |
|---|---|---|
| `http://` → `https://` | ✅ 301 | nessuna |
| `http://www.` → `https://studiosusino.it/` | ✅ 301 | nessuna |
| `https://www.studiosusino.it/` | ❌ **errore certificato SSL** (il certificato è `*.github.io`) | **manuale, vedi sotto** |
| `/index.html` → `/` | 200 (nessun redirect) | GitHub Pages non può fare 301. Il canonical punta già a `/` e nessun link interno usa `index.html`: è la voce "Pagina alternativa con canonical appropriato", **innocua**. |
| `/ecografia-spalla` (senza `.html`) | 200, stessa pagina | Idem: coperto dal canonical. Nessun link interno usa URL senza `.html`. |

Se in futuro si vogliono 301 veri per `index.html` e per le URL senza `.html`: mettere **Cloudflare (gratuito)** davanti a GitHub Pages (il sito usa già Cloudflare Web Analytics) e creare le regole di redirect lì. Non indispensabile.

---

## 6. Azioni da fare a mano

### A. Certificato www (GitHub + Aruba) — priorità alta
1. **Aruba → DNS di studiosusino.it**: il record `www` oggi è un CNAME verso `studiosusino.it`. Cambiarlo in **CNAME `www` → `salvatoresusino93-source.github.io`** (come da README).
2. **GitHub → repo → Settings → Pages → Custom domain**: togliere `studiosusino.it`, salvare, rimetterlo e salvare (forza la riemissione del certificato includendo `www`). Attendere che compaia "DNS check successful", poi spuntare **Enforce HTTPS**.
3. Verificare dopo qualche ora che `https://www.studiosusino.it/` porti con 301 a `https://studiosusino.it/`.

### B. Search Console
1. Se non c'è già, creare una **proprietà di tipo Dominio** (`studiosusino.it`) che copre http/https/www.
2. **Sitemap** → rimuovere la sitemap vecchia se presente e inviare `https://studiosusino.it/sitemap.xml`. Controllare dopo qualche giorno "Rilevate: 63".
3. **Pagine → "Esclusa da tag noindex"** → "Convalida correzione" (privacy non è più in sitemap).
4. **"Pagina alternativa con tag canonical appropriato"**: nessuna azione, è corretto così.
5. **Controllo URL → Richiedi indicizzazione** (limite circa 10 al giorno), in quest'ordine:
   - Giorno 1: `/`, `/ecografie.html`, `/prenota.html`, `/tariffe.html`, `/contatti.html`, `/chi-sono.html`, `/ecografie-modica-ispica-scicli.html`, `/ecografia-addome.html`, `/ecografia-tiroide.html`, `/ecocolordoppler-carotidi.html`
   - Giorno 2: `/ecografia-muscolo-scheletrica.html`, `/ecocolordoppler-arti-inferiori.html`, `/ecografia-spalla.html`, `/ecografia-ginocchio.html`, `/ecografia-renale.html`, `/ecografia-apparato-urinario.html`, `/ecografia-collo.html`, `/ecografia-addome-superiore.html`, `/ecografia-addome-inferiore.html`, `/ecografia-vescico-prostatica.html`
   - Poi le altre pagine esame italiane; le `-en` per ultime (Google le trova tramite hreflang).
6. Dopo 2–4 settimane: **Pagine → "Scansionata ma attualmente non indicizzata" → Convalida correzione**.
7. **Test dei risultati avanzati** (search.google.com/test/rich-results) su `/` e `/contatti.html`: devono comparire MedicalClinic/LocalBusiness e Breadcrumb senza errori.

### C. Fuori dal sito (incidono molto sull'indicizzazione di un sito giovane)
- **Scheda Google Business Profile**: sito web = `https://studiosusino.it/`, indirizzo e telefoni **identici** a quelli del sito (NAP coerente).
- Link in entrata: sito di Arcobaleno Dentisti, directory mediche (MioDottore, iDoctors, Pagine Gialle), Ordine dei Medici se prevede un profilo. Un sito nuovo senza link esterni viene scansionato ma spesso non indicizzato.
- Arricchire i contenuti elencati nella sezione 3 (soprattutto **chi sono** e le pagine muscolo-scheletriche), poi richiedere di nuovo l'indicizzazione.
