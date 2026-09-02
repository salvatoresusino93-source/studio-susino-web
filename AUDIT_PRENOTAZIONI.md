# Audit affidabilità sito e prenotazioni

Ultimo aggiornamento: 2026-09-02.

## Confine verificato

Questo repository contiene esclusivamente il sito statico pubblicato con GitHub Pages. Non contiene server, database, endpoint API, credenziali, logica di disponibilità o integrazione con Google Calendar.

Il flusso presente è: pagina esame → pagina locale `prenota.html`/`prenota-en.html` → collegamento HTTPS costruito da `js/booking-config.js` verso il sistema esterno. Ogni elaborazione successiva avviene fuori da questo repository. Il sito valida il parametro `esame` contro il catalogo locale e inoltra soltanto `esame` e, se necessario, `lang=en`; non raccoglie dati del paziente.

## Problemi ordinati per gravità

### Critico — non verificabile qui

Disponibilità, durate, concorrenza, doppie prenotazioni, timezone, creazione/modifica/cancellazione, Google Calendar, retry, webhook, riconciliazione, conferme e promemoria non sono implementati in questo repository. Per verificarli servono il codice del servizio esterno e uno staging isolato con database, calendario Google e provider di notifica di test. Nessuna credenziale è stata inventata e nessun sistema di produzione è stato contattato.

### Alta — corretta

- L’informativa privacy era un segnaposto pubblico nonostante l’analytics attivo: ora copre il sito vetrina e distingue l’informativa del sistema esterno.
- Il collegamento di prenotazione era duplicato in decine di file: ora è centralizzato, valida l’esame, non invia referrer ed è coperto da test.

### Media — corretta

- Menu mobile: aggiunti stato ARIA, gestione del focus ed Escape.
- Aggiunto “salta al contenuto” a tutte le pagine.
- Rimossa la richiesta non necessaria a Google Fonts; resta lo stack di sistema.
- WhatsApp ora usa lingua corretta e non invia referrer.

### Bassa — corretta

- Aggiunti build, test Node senza dipendenze runtime e CI con permessi di sola lettura.
- Sitemap resa deterministica: rimosso `lastmod` globale fuorviante ed escluse automaticamente le pagine `noindex`.

## Contratto minimo da verificare sul backend esterno

| Area | Proprietà richiesta | Prova minima in staging |
|---|---|---|
| Disponibilità | durata effettiva più buffer | matrice di tutti i tipi esame e slot adiacenti |
| Concorrenza | vincolo atomico anti-sovrapposizione | due richieste simultanee: una sola confermata |
| Timezone | zona `Europe/Rome`, istanti persistiti in UTC | 29 marzo e 25 ottobre 2026; mezzanotte e confini giornata |
| Creazione | conferma solo dopo persistenza certa | errore prima/dopo la chiamata Google |
| Modifica/cancellazione | operazione atomica o recuperabile | retry dopo timeout e operazione già applicata |
| Idempotenza | stessa chiave, un solo appuntamento/evento | ripetere POST/webhook almeno tre volte |
| Google Calendar | ID evento e versione/etag persistiti | 409, 429, 5xx e token scaduto |
| Webhook | firma, timestamp, deduplica, ordine non garantito | payload alterato, duplicato, vecchio e fuori ordine |
| Riconciliazione | job periodico DB ↔ calendario | modifica/eliminazione manuale nel calendario di test |
| Stati parziali | stato esplicito e retry con backoff/jitter | Google indisponibile per 15 minuti |
| Notifiche | outbox idempotente; invio dopo conferma | provider sandbox, retry e duplicati |
| Autorizzazione | token non enumerabile e con scadenza | IDOR, token scaduto/riusato e rate limit |
| Privacy | niente dati clinici eccedenti in Calendar/log/notifiche | ispezione payload, log e template |

## Verifica locale

```bash
npm test
npm run build
```

I test non aprono il servizio esterno, non inviano notifiche e non scrivono su calendari o database.
