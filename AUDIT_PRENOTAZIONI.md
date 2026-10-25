# Audit affidabilità sito e confine prenotazioni

Ultimo aggiornamento: 2026-10-25 (recupero parziale dalla PR #5 del 2 settembre 2026, chiusa senza merge).

## Confine verificato

Questo repository contiene esclusivamente il sito statico pubblicato con GitHub Pages. Non contiene server, database, endpoint API, credenziali, logica di disponibilità né integrazione con Google Calendar o Stripe.

Il flusso è: pagina esame → collegamento HTTPS verso il sistema esterno RefertEco (`https://referteco-production.up.railway.app/prenota`, con il parametro `esame` e, per le pagine inglesi, `lang=en`). Oggi il collegamento è costruito in due punti: `scripts/genera-pagine-esami.js` (pagine esame generate) e `js/esame.js` (vecchia pagina dinamica `esame.html`, oggi solo redirect). Il modulo `js/booking-config.js`, con i test in `tests/booking-config.test.js`, centralizza la costruzione del collegamento e valida il parametro `esame` contro il catalogo locale (`window.ESAMI`): è pronto ma **non ancora collegato** alle pagine; il collegamento va fatto nel generatore, non nell'HTML generato.

Il sito non raccoglie dati del paziente: ogni elaborazione successiva avviene fuori da questo repository.

## Contratto minimo da verificare sul backend esterno (RefertEco)

Queste proprietà non sono verificabili da questo repository. Servono il codice di RefertEco e uno staging isolato (database, calendario Google e provider di notifica di test). Nessuna prova va fatta sul sistema di produzione.

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
| Pagamento online (Stripe) | account live verificato; webhook firmato; rimborso possibile dal gestionale | pagamento di prova in sandbox, poi uno reale a importo minimo e rimborso |
| Autorizzazione | token non enumerabile e con scadenza | IDOR, token scaduto/riusato e rate limit |
| Privacy | niente dati clinici eccedenti in Calendar/log/notifiche | ispezione payload, log e template |

## Verifica locale

```bash
node --test tests/*.test.js
node scripts/verifica-seo.js
npx --yes html-validate "*.html"
```

Gli stessi controlli girano in `.github/workflows/verify.yml` a ogni Pull Request. I test non aprono il servizio esterno, non inviano notifiche e non scrivono su calendari o database.
