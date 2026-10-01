# Refertario — prototipo locale

App statica e offline che genera **referti radiologici standard** in italiano, inglese e spagnolo.
Ogni reperto è **negativo di default**; spuntando una casella diventa **positivo** e finisce nelle conclusioni.

> Prototipo: i testi sono bozze originali e vanno **verificati dal medico** prima di qualsiasi uso clinico.
> Nessun contenuto, codice, logo o immagine è preso da altri siti.

## Avvio

**Opzione 1:** apri direttamente `index.html` con il browser (doppio clic).

**Opzione 2:** server locale, dalla cartella del progetto:

```bash
cd prototipi/reporting
python3 -m http.server 8000
```

poi apri <http://localhost:8000>.

## Uso

1. Scegli l'**esame** e la **lingua** del referto.
2. Spunta i **reperti positivi** (quelli non spuntati sono refertati come negativi).
3. Premi **Genera**. Dopo la prima generazione il referto si aggiorna da solo a ogni modifica.
4. **Copia** mette negli appunti il referto in testo semplice; **Stampa** stampa solo il referto; **Reset** azzera tutto.

Conclusioni: se non c'è alcun positivo si usa la conclusione normale dell'esame, altrimenti un elenco dei reperti positivi.

## File

| File | Contenuto |
|---|---|
| `index.html` | struttura della pagina (header, controlli a sinistra, referto a destra) |
| `styles.css` | stile responsive, tema chiaro/scuro, stile di stampa |
| `app.js` | logica: menu, checkbox, composizione del referto, copia/stampa/reset |
| `data.js` | lingue, testi dell'interfaccia e libreria degli esami |
| `review.html`, `review.css`, `review.js` | strumento di revisione dei testi (vedi sotto) |
| `review_export.py` | esportazione CSV da riga di comando |

Esami inclusi: Rx torace, TC addome, RM encefalo, Ecografia addome.

## Aggiungere un esame

In `data.js` aggiungi un oggetto all'array `ESAMI`:

```js
{
  id: 'eco-tiroide',
  nome:    { it: 'Ecografia tiroide', en: 'Thyroid ultrasound', es: 'Ecografía tiroidea' },
  titolo:  { it: '…', en: '…', es: '…' },
  tecnica: { it: '…', en: '…', es: '…' },
  reperti: [
    {
      id: 'nodulo',
      etichetta:   { it: '…', en: '…', es: '…' },
      negativo:    { it: '…', en: '…', es: '…' },
      positivo:    { it: '…', en: '…', es: '…' },
      conclusione: { it: '…', en: '…', es: '…' } // facoltativa
    }
  ],
  conclusioneNormale: { it: '…', en: '…', es: '…' }
}
```

Per una nuova lingua aggiungi il codice in `LINGUE`, un blocco in `UI` e la chiave in ogni testo.

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

Righe della tabella: una per ogni reperto e per ogni lingua, più una riga `(esame)` per lingua con
titolo (colonna *Etichetta*), tecnica (colonna *Testo negativo*) e conclusione normale.

### Controlli automatici

| Livello | Controllo |
|---|---|
| errore | traduzione mancante in una lingua di `LINGUE`, testo vuoto, campo obbligatorio assente |
| errore | segnaposto: `TODO`, `TBD`, `FIXME`, `XXX`, `da specificare`, `da definire`, `da completare`, `???`, `lorem ipsum` |
| errore | id di esame duplicato, id di reperto duplicato nello stesso esame, id mancante |
| errore | testo negativo e positivo identici |
| errore | **testo modificato dopo la revisione**: una riga segnata OK/Da correggere il cui testo è poi cambiato in `data.js` (va ricontrollata) |
| avviso | testo EN/ES identico all'italiano (non tradotto?), graffe `{…}` rimaste, conclusione assente, lingue non dichiarate in `LINGUE` |

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
