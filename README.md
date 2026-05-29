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
