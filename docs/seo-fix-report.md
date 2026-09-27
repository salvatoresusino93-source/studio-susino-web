# Report interventi SEO — studiosusino.it

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
