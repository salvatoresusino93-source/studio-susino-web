# studiosusino.it — istruzioni per Claude

## Il sito
Sito vetrina statico (HTML/CSS/JS, nessun framework né build) dello **Studio Ecografico Dr. Salvatore Susino**, medico specialista in Radiologia, via dell'Arno 34, 97016 Pozzallo (RG), presso Arcobaleno Dentisti.
- Pubblicazione: GitHub Pages dal branch `main` (1–2 minuti dopo il push), dominio `https://studiosusino.it` (file `CNAME`).
- Prenotazioni online: app esterna RefertEco su `https://referteco-production.up.railway.app/prenota` (repo separato). Il sito rimanda lì.
- Lo studio fa solo ecografie ed ecocolordoppler, su appuntamento; referto consegnato al termine dell'esame.
- Anteprima locale: `python3 -m http.server 8099` (configurazione `static` in `.claude/launch.json`).

## Pubblico
Pazienti comuni della provincia di Ragusa (Pozzallo, Ispica, Modica, Scicli, Ragusa, Rosolini, Pachino), spesso anziani o familiari che cercano per loro, quasi sempre da smartphone. D'estate anche turisti e stranieri residenti (versione EN). Testi semplici, pulsanti grandi, telefono sempre a portata.

## Struttura IT/EN
- Ogni pagina italiana `nome.html` ha la gemella inglese `nome-en.html` (unica eccezione: `ecografie-modica-ispica-scicli.html`, solo IT). Ogni modifica si fa **su entrambe** nella stessa sessione.
- Ogni pagina ha `canonical` assoluto su se stessa e `hreflang` `it` / `en` / `x-default` (= IT) reciproci. La home canonica è `/`, mai `index.html`.
- **Pagine esame generate**: nascono da `scripts/genera-pagine-esami.js` usando `js/esami-data.js`, `js/esami-paziente.js` e le versioni `-en.js`; la mappa id → file è in `scripts/esami-mappa.js`. Non modificare l'HTML generato: modifica i `.js` e rilancia `node scripts/genera-pagine-esami.js` (rigenera anche l'elenco in `ecografie.html`/`ecografie-en.html` e `js/esami-slug.js`).
- **Pagine esame scritte a mano** (`GIA_ESISTENTI`): `ecografia-tiroide`, `ecografia-addome`, `ecografia-muscolo-scheletrica`, `ecocolordoppler-carotidi`, `ecocolordoppler-arti-inferiori` (+ `-en`). Si modificano direttamente, tenendo il JSON-LD `FAQPage` uguale alle FAQ visibili.
- `sitemap.xml` si rigenera con `node scripts/generate-sitemap.js` (dopo il generatore delle pagine).
- `esame.html`, `esame-en.html`, `privacy.html`, `privacy-en.html` sono `noindex` e fuori sitemap: devono restare così.
- CSS e JS sono richiamati con `?v=AAAAMMGG`: dopo averli modificati aggiorna il parametro ovunque (anche nel generatore).
- Validazione HTML: `npx --yes html-validate "*.html"` (config `.htmlvalidate.json`).

## Regole sui contenuti sanitari (vincolanti)
Il sito è **informazione sanitaria, non pubblicità** (Codice di deontologia medica artt. 55–57; L. 145/2018 comma 525; indicazioni FNOMCeO).
- Niente promesse di risultato, superlativi ("il migliore", "all'avanguardia", "massima precisione"), confronti con altri medici o strutture, sconti, offerte, pacchetti, urgenza commerciale, testimonianze di pazienti in pagina.
- L'onorario (pagina `tariffe.html`) si riporta com'è; non si cambia né si presenta come vantaggio senza decisione del medico.
- **Ogni affermazione clinica nuova o numerica** (durate, valori, indicazioni, controindicazioni, percentuali) va segnalata per la revisione del medico:
  - in HTML: `<!-- DA VERIFICARE: ... -->` prima della frase;
  - nei file `.js` di dati: `/* DA VERIFICARE: ... */` sopra il campo (un commento HTML dentro una stringa finirebbe visibile).
- Linguaggio da scuola media, frasi brevi, termini tecnici spiegati la prima volta; ogni pagina esame con contenuto proprio, non un modello ripetuto.
- Lessico deciso: specialità "Radiologia" (non "radiodiagnostica"); "addome" non "pancia"; nome "Studio Ecografico Dr. Salvatore Susino".
- Esami **non** offerti, da non citare come disponibili: mammella, ginecologia, ostetricia.
- Non cambiare contatti, orari, indirizzo, onorario senza richiesta esplicita.

## Regole sulle immagini (vincolanti, valgono per chiunque modifichi il sito)
- **Immagini generate con AI**: ammesse **solo come illustrazioni generiche** (es. sonda appoggiata su un collo, lettino ed ecografo in un ambiente neutro, dettagli) e **sempre dichiarate**: `alt` che inizia con "Illustrazione:" / "Illustration:" e registrazione in `docs/immagini-ai.md` (file, pagina, strumento, prompt, data).
- **Mai** come sostituto di foto reali: lo studio, l'ingresso, la sala d'attesa e il medico si mostrano solo con foto vere; se mancano, si segnala "da fotografare".
- **Mai** come ecografie: le immagini ecografiche sono solo reali e con licenza (crediti in `images/us-reali/ATTRIBUTIONS.md`), mai generate o presentate come esami di pazienti.
- Mai persone presentate come pazienti reali, testimonianze, prima/dopo, loghi o marchi di terzi.
- Un'immagine credibile ma falsa su un sito sanitario è informazione ingannevole: in caso di dubbio, non usarla e chiedere al medico.

## Agenti (`.claude/agents/`)
| Agente | Cosa fa | Modifica file? |
|---|---|---|
| `seo-auditor` | Controllo tecnico (canonical, hreflang, sitemap, robots, noindex, redirect, link, meta, JSON-LD, immagini); riporta solo novità e regressioni rispetto a `docs/seo-log.md` | No |
| `seo-strategist` | Proposte di SEO locale (nuove pagine/sezioni/FAQ), senza doppioni né pagine doorway | No |
| `content-editor` | Riscrive 1–2 pagine esame per sessione, IT + EN, con le regole sopra | Sì |
| `design-curator` | Design, leggibilità, mobile, peso delle immagini, brief per immagini AI | Sì |

Si possono usare anche da soli, ad esempio: "usa content-editor su ecografia-spalla" oppure "usa design-curator per rivedere la home su mobile".

## Comandi
- **`/seo-audit [testo Search Console]`** — solo controllo, nessuna modifica. Utile prima di pubblicare o quando Search Console segnala qualcosa.
- **`/seo-periodico [testo Search Console]`** — sessione completa: auditor e stratega in parallelo, correzioni tecniche sicure, `content-editor` sulla pagina più debole, voce datata in cima a `docs/seo-log.md` (problemi, modifiche, "Da verificare per il medico"). Non fa commit.
- Per dare priorità a Search Console: copia la tabella (Rendimento → Query/Pagine, oppure Indicizzazione → Pagine) e incollala dopo il comando.

## Automazione settimanale
`.github/workflows/seo-settimanale.yml` esegue `/seo-periodico` ogni **lunedì alle 06:00 UTC** (08:00 d'estate, 07:00 d'inverno) con la GitHub Action ufficiale `anthropics/claude-code-action@v1` e apre una Pull Request `SEO settimanale AAAA-MM-GG` con le modifiche e la voce del log nella descrizione.
- **Mai merge automatico**: la PR la rivede e la unisce il medico. Prima di approvare cercare `DA VERIFICARE` nei file modificati; dopo la revisione rimuovere i commenti verificati.
- Se c'è ancora una PR SEO aperta, il lunedì successivo la sessione viene saltata.
- Si può lanciare a mano da GitHub → Actions → "SEO settimanale" → Run workflow, incollando facoltativamente il testo di Search Console.
- Secret (Settings → Secrets and variables → Actions), **uno** dei due: `CLAUDE_CODE_OAUTH_TOKEN` (da `claude setup-token`, usa l'abbonamento) oppure `ANTHROPIC_API_KEY`. In Settings → Actions → General: "Read and write permissions" e "Allow GitHub Actions to create and approve pull requests".

## Git
- Lavorare su un branch e aprire una PR; `main` è il sito pubblico.
- Non committare `.claude/settings.local.json` (già escluso da `.gitignore`).
