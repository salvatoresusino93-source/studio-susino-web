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
