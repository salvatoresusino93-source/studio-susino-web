# Icone degli esami

Un file per esame: `images/icone/{id}.svg` (id di `js/esami-data.js`, campo `icona`).
Colore #0e7c8b già nel file, perché un SVG in `<img>` non eredita il colore dal CSS.

- **Definitive**: Health Icons (https://healthicons.org, repository github.com/resolvetosavelives/healthicons),
  stile outline 48×48, licenza **CC0** (pubblico dominio, nessuna attribuzione richiesta).
  La fonte di ciascuna è nel commento in testa al file.
- **Provvisorie** (`TEMP` nel commento in testa e in `js/esami-data.js`): icone Health Icons generiche,
  da sostituire con le icone commissionate a un illustratore. Per sostituirle basta sovrascrivere
  il file con lo stesso nome (48×48, stesso stile) e togliere il commento TEMP nei dati.
- Gli URL hanno `?v=AAAAMMGG` (generatore e `js/esami-list.js`): quando si sostituisce un file, aggiornarlo.
- Mai icone o illustrazioni generate con AI per l'anatomia (vedi CLAUDE.md, regole sulle immagini).
