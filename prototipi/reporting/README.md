# Refertario — prototipo locale

App statica e offline per comporre i referti **nello stile del Dr. Susino**.
Si scelgono uno o più distretti, si spuntano i reperti positivi; per ogni organo non toccato
viene scritta in automatico la frase negativa abituale.

> I testi vengono dal documento «Referti Dott. Susino» (Google Drive) e dai modelli di RefertEco,
> senza nomi propri e con i valori dei singoli casi sostituiti da `___`.
> Le frasi marcate **nuovo** sono state scritte da Claude nello stesso stile per coprire reperti
> frequenti mancanti: **vanno verificate** (vedi «Revisione dei testi clinici»).

## Avvio

Apri `index.html` con il browser (doppio clic), oppure:

```bash
cd prototipi/reporting
python3 -m http.server 8000
```

e vai su <http://localhost:8000>.

## Uso

1. In alto la **metodica**: per ora Ecografia (TC, RM, RX in arrivo).
2. Scegli uno o più **distretti** (es. Addome completo + Tiroide): vengono uniti in un unico referto.
   Per i distretti con lato (spalla, ginocchio…) scegli destra/sinistra.
3. Per ogni organo spunta i **reperti positivi**: il testo positivo prende il posto della frase negativa
   (alcuni, come le cisti renali, si aggiungono alla frase negativa).
4. **✎ Descrivi tu** su un organo: scrivi la tua descrizione, che sostituisce la frase negativa
   (parte precompilata con il negativo, da modificare). **Altro** in fondo al distretto: testo libero in coda.
5. **Frasi in testa / in coda**: quesito, confronto con esame precedente, controllo a distanza…
6. Il referto si aggiorna mentre scegli. I campi `___` sono evidenziati in giallo e contati.
   **Copia** lo mette negli appunti in testo semplice, **Stampa** stampa solo il referto,
   **Nuovo referto** azzera. Le scelte restano salvate nel browser se ricarichi la pagina.
7. **Conclusioni** (facoltative): elenco dei positivi, oppure la frase negativa del distretto.
8. **Lingua** del referto (IT/EN/ES) e **Tecnica**: la lingua cambia solo il testo del referto, l'interfaccia resta in
   italiano. I distretti non tradotti sono marcati «(solo IT)» e, in EN/ES, esclusi dal referto con un avviso.
   Il controllo di stile vale solo per l'italiano.

## File

| File | Contenuto |
|---|---|
| `index.html`, `styles.css`, `app.js` | composizione del referto |
| `data.js` | libreria: metodiche, distretti, organi, frasi negative e reperti positivi |
| `review.html`, `review.css`, `review.js` | strumento di revisione dei testi (vedi sotto) |
| `review_export.py` | esportazione CSV da riga di comando |
| `style/` | regole di stile e linter (vedi sotto) |
| `lint-data.js` | linter su tutto `data.js` |

## Modificare o aggiungere testi

Tutto è in `data.js` (struttura spiegata in testa al file). Un organo ha una frase `negativo`
e un elenco di `reperti`; ogni reperto ha `etichetta`, `testo`, eventuale `conclusione`,
`modo: "aggiunge"` se non deve togliere il negativo, `nuovo: true` se non viene dall'archivio,
`riscritta: true` se è stato riscritto nel nuovo stile.

Lingue: ogni testo è una stringa (solo italiano) oppure `{ it, en, es }`. Un distretto tradotto dichiara
`lingue: ["it", "en", "es"]`; con `traduzioniDaVerificare: true` la revisione segnala le righe EN/ES come da verificare.
`tecnica` (facoltativa) è la riga della tecnica d'esame, con `tecnicaNuova: true` se non viene dall'archivio.
Nomi di distretti/organi ed etichette dei reperti restano in italiano (sono l'interfaccia).
Dopo una modifica, la revisione segnala le righe cambiate rispetto a quanto già validato.

## Controllo di stile (cartella `style/`)

Modulo **indipendente** (nessuna dipendenza dal Refertario), riusabile tale e quale in RefertEco:

| File | Contenuto |
|---|---|
| `style/stile-referto.md` | **unica fonte** delle regole di stile: sintassi, negatività, lessico, RM rachide, esempi «prima → dopo», e le sezioni «(linter)» (verbi vietati, termini vietati, regole di contesto, soglie) |
| `style/linter.js` | linter: **segnala, non corregge**. Funziona in Node (`require`) e nel browser (`window.StileReferto`) |
| `style/linter.test.js` | test: ogni esempio «prima» del file `.md` deve essere segnalato, ogni «dopo» no, più casi limite |

Per cambiare le regole basta modificare `stile-referto.md` (anche aggiungere termini vietati o verbi).

Cosa segnala: forme verbali finite, costruzioni con «si», termini vietati (con la forma corretta),
«Assenza di» oltre la soglia, parole con la stessa radice nella stessa frase («maggiori dimensioni… la maggiore»),
frasi identiche ripetute, stessa formula all'inizio di troppe frasi consecutive («Non… Non… Non…»),
regole di contesto (es. versamento pleurico in TC addome).

Nel Refertario il linter gira sul **referto composto finale**: le parti segnalate sono sottolineate
nell'anteprima e l'elenco degli avvisi compare sotto il referto. Serve il server locale
(`python3 -m http.server 8000`): aperta con doppio clic la pagina non può leggere il file `.md`.

```bash
node --test style/linter.test.js     # test del linter
node lint-data.js                    # linter su tutte le frasi di data.js e sui referti negativi composti
```

## Revisione dei testi clinici

Strumento separato per controllare tutti i testi di `data.js` prima dell'uso con pazienti.
**Non modifica `data.js`**: legge i testi, permette di segnare lo stato e annotare, ed esporta.

### Avvio

Apri `review.html` con il browser (doppio clic), oppure con il server locale:

```bash
cd prototipi/reporting
python3 -m http.server 8000
```

e vai su <http://localhost:8000/review.html>.

### Come si usa

1. Scrivi il tuo nome in **Revisore** (obbligatorio: ogni modifica registra chi l'ha fatta e la data).
2. Usa i filtri per **esame**, **lingua**, **stato** e la **ricerca libera** (cerca anche nelle note).
   *Solo righe con problemi* mostra solo quelle con controlli automatici non superati;
   *Mostra testo IT di riferimento* affianca l'italiano ai testi EN/ES.
3. Per ogni riga scegli lo **stato** (Da rivedere / OK / Da correggere) e scrivi le **note**.
4. Tutto si salva da solo nel browser (localStorage).
5. **Esporta CSV** scarica tutte le righe con stato, note, revisore e data (separatore `;`, si apre in Excel).
6. **Backup revisione (JSON)** salva la revisione in un file; **Importa backup** la ricarica
   (utile per cambiare browser/computer o passare il lavoro a un collega).
   Il salvataggio nel browser si perde se cancelli i dati di navigazione: esporta il backup ogni tanto.

Righe della tabella: una per distretto (titolo, intro, conclusione negativa), una per organo (frase negativa),
una per reperto (frase positiva) e una per ogni frase comune. *Solo frasi da verificare* mostra le frasi non presenti
nel tuo archivio (`nuovo: true`) e quelle riscritte nel nuovo stile (`riscritta: true`), da verificare per prime.

### Controlli automatici

| Livello | Controllo |
|---|---|
| errore | traduzione mancante in una lingua di `LINGUE`, testo vuoto, campo obbligatorio assente |
| errore | segnaposto: `TODO`, `TBD`, `FIXME`, `XXX`, `da specificare`, `da definire`, `da completare`, `???`, `lorem ipsum` |
| errore | id duplicati (distretto, organo, reperto, frase) o mancanti; organo senza negativo né reperti |
| errore | testo positivo identico al negativo; `modo` non valido |
| errore | **testo modificato dopo la revisione**: una riga segnata OK/Da correggere il cui testo è poi cambiato in `data.js` (va ricontrollata) |
| avviso | **frase nuova** (non dal tuo archivio) o **riscritta** nel nuovo stile, graffe `{…}` rimaste (tranne `{lato}`), lingue non dichiarate in `LINGUE` |

### Esportazione da riga di comando (per Excel)

```bash
cd prototipi/reporting
python3 review_export.py                               # crea revisione-referti.csv
python3 review_export.py --revisione backup.json       # include stato e note dal backup JSON
python3 review_export.py -o mio.csv --sep ","          # nome e separatore a scelta
```

Usa solo Python 3 standard e produce le stesse colonne e gli stessi controlli di `review.html`:
`esame; id_reperto; etichetta; lingua; testo_negativo; testo_positivo; conclusione; problemi; stato; note; revisore; data`.

I file esportati (`revisione-referti*.csv` / `.json`) sono esclusi da git: contengono le note di revisione.
