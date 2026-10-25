# Pubblicare il sito — guida rapida

Ultimo aggiornamento: 2026-10-25.

## Come è pubblicato oggi
- **Hosting:** GitHub Pages, repository `salvatoresusino93-source/studio-susino-web`, branch `main`, cartella `/ (root)`.
- **Dominio:** `https://studiosusino.it`, dichiarato nel file `CNAME` alla radice del repository (contenuto: `studiosusino.it`, senza `www`, senza `https://`, senza barra finale).
- **DNS (Aruba):** record `A` dell'apex verso gli indirizzi di GitHub Pages elencati nel `README.md`; record `CNAME` dell'host `www` verso `salvatoresusino93-source.github.io`.
- Ogni push su `main` va online in 1–2 minuti. Le modifiche passano da una Pull Request, mai direttamente su `main`.

## Il file CNAME non si tocca
Il 28/09/2026 il file è stato cancellato e ricreato nello stesso giorno dalla UI di GitHub: succede quando in **Settings → Pages → Custom domain** si svuota o si riscrive il campo. Ogni volta che il file manca, il sito torna a rispondere solo su `salvatoresusino93-source.github.io`, Google trova un duplicato e il certificato HTTPS del dominio va rigenerato.
- Non modificare il campo *Custom domain* nelle impostazioni di GitHub Pages: il file nel repository è la fonte di verità.
- Il workflow **Verifica sito** fallisce su ogni PR e su ogni push se `CNAME` manca o contiene un valore diverso da `studiosusino.it`.
- Se il file sparisce, si ripristina con un commit che lo ricrea con il solo contenuto `studiosusino.it`.

## Controlli dopo una pubblicazione
1. `https://studiosusino.it/` risponde con il sito e il lucchetto HTTPS.
2. `https://studiosusino.it/sitemap.xml` elenca le pagine (63 URL).
3. In **Settings → Pages** compare "Your site is live at https://studiosusino.it" con *Enforce HTTPS* attivo.

## Anteprima in locale
```bash
python3 -m http.server 8099
```
Poi aprire `http://localhost:8099/`.
