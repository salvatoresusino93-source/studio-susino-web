# RIPRENDI QUI — Sito Studio Susino

Ultimo aggiornamento: **2026-05-29**

## Repository e URL

| Cosa | Dove |
|------|------|
| **Codice** | https://github.com/salvatoresusino93-source/studio-susino-web |
| **Locale Mac** | `~/Projects/studio-susino-web` |
| **Google Drive** | `Il mio Drive/studio-susino-web` |
| **Sito live** | https://salvatoresusino93-source.github.io/studio-susino-web/index.html |
| **Dominio (da attivare)** | https://studiosusino.it |
| **Prenotazione** | https://referteco-production.up.railway.app/prenota |

## Cosa contiene

Sito vetrina statico (HTML/CSS/JS): home, chi sono, ecografie, singoli esami, studio, contatti, prenota (link a Railway).

- **`js/esami-data.js`** — 25 esami con descrizioni e link prenotazione
- **`js/esami-list.js`** — elenco per categorie su `ecografie.html`
- **`js/esame.js`** — pagina dettaglio `esame.html?id=...`
- **`index.html`** — card servizi con link a sezioni `#addome`, `#doppler`, ecc.

## Regole testi (decise con il Dott.)

- Specialità: **Radiologia** (non radiodiagnostica)
- **No** mammella, ginecologia, ostetrica in elenco
- **No** giorni (martedì/venerdì) né fasce orarie sul sito — solo «su appuntamento»
- **Preparazione digiuno/vescica** solo in `/prenota`, non sul sito vetrina
- Logo header: **50px** mobile, **56px** desktop (`css/style.css`)

## Esami in elenco (25)

Addome (3), urinario/urologia (6 incl. **renale**), tiroide/collo (2), MSK (8), pediatrica (**anca neonatale**), doppler (5 incl. **aorta addominale** e **arterie renali**), linfonodi.

## Su altro PC

```bash
git clone https://github.com/salvatoresusino93-source/studio-susino-web.git
cd studio-susino-web
# Modifiche → commit → push → GitHub Pages si aggiorna in 1-2 min
```

Oppure copia da Google Drive `Il mio Drive/studio-susino-web`.

## Collegato a RefertEco

Elenco prenotabile online sincronizzato con `RefertEco/scripts/sync_tipi.js` e Supabase.
Vedi `RefertEco/RIPRENDI_QUI.md` sezione sito vetrina.
