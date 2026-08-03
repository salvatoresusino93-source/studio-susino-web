# Studio Susino — Sito web

Sito vetrina per lo Studio Dr. Susino, ambulatorio di ecografia clinica a Pozzallo (RG).

**Dominio:** https://studiosusino.it  
**Hosting:** GitHub Pages (gratuito)

## Pubblicazione su GitHub Pages

### 1. Crea il repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `studio-susino-web`
3. Pubblico (Public)
4. Clicca "Create repository"

### 2. Carica il codice

```bash
cd ~/Projects/studio-susino-web
git init
git add .
git commit -m "Prima versione sito studiosusino.it"
git branch -M main
git remote add origin https://github.com/salvatoresusino93-source/studio-susino-web.git
git push -u origin main
```

### 3. Attiva GitHub Pages

1. GitHub → repository → **Settings** → **Pages**
2. Source: branch **main**, cartella **/ (root)**
3. In **Custom domain**: `studiosusino.it`
4. Attiva **Enforce HTTPS** (dopo propagazione DNS)

## DNS su Aruba

Pannello Aruba → Domini → `studiosusino.it` → Gestione DNS

**4 record A** (host `@`):

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**CNAME** (host `www`):

- salvatoresusino93-source.github.io

Propagazione: 15 min – 24 ore.

## Rigenerare le pagine degli esami

Ogni esame ha una **pagina HTML vera** (es. `ecografia-spalla.html`), generata
automaticamente dai testi che stanno in `js/esami-data.js` e `js/esami-paziente.js`.
Non vanno modificate a mano: si modificano i testi e si rilancia il generatore.

```bash
node scripts/genera-pagine-esami.js   # ricrea le pagine + l'elenco in ecografie.html
node scripts/generate-sitemap.js      # riscrive sitemap.xml
```

Cose da sapere:

- `scripts/esami-mappa.js` decide **come si chiama il file** di ogni esame.
  Cambiare un nome lì significa cambiare l'indirizzo della pagina su Google:
  farlo solo se davvero necessario.
- Gli esami elencati in `GIA_ESISTENTI` **non** vengono rigenerati, perché hanno
  una pagina scritta a mano più curata (tiroide, addome, muscolo-scheletrica,
  carotidi, arti inferiori). Quelle si modificano direttamente.
- L'onorario mostrato nelle pagine esame si cambia in un punto solo:
  la costante `ONORARIO` in cima a `scripts/genera-pagine-esami.js`.
  (La pagina `tariffe.html` invece è scritta a mano.)
- I vecchi indirizzi `esame.html?id=...` portano automaticamente alla pagina
  nuova, quindi i link già in giro continuano a funzionare.
