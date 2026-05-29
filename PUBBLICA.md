# Pubblicare il sito — guida rapida

## Problema attuale
L'URL lungo `.../studio-susino-web/` dà problemi. La soluzione è rinominare il repository.

## Passi (5 minuti, una volta sola)

### 1. Rinomina il repository su GitHub
1. Vai su **github.com/salvatoresusino93-source/studio-susino-web**
2. **Settings** → **General**
3. In **Repository name** scrivi esattamente:
   ```
   salvatoresusino93-source.github.io
   ```
4. Clicca **Rename**

### 2. Configura GitHub Pages
1. Sempre in **Settings** → **Pages**
2. **Source** → **Deploy from a branch** (NON GitHub Actions)
3. Branch: **main** | Cartella: **/ (root)**
4. **Save**
5. **Custom domain** → lascia **VUOTO**

### 3. Aggiorna il collegamento sul tuo Mac (Terminale)
```bash
cd ~/Projects/studio-susino-web
git remote set-url origin https://github.com/salvatoresusino93-source/salvatoresusino93-source.github.io.git
git push
```

### 4. Apri il sito (dopo 2-5 minuti)
```
https://salvatoresusino93-source.github.io/
```

### 5. Se ancora non va
- Prova **finestra in incognito** (Chrome: Cmd+Shift+N)
- Non aprire `studiosusino.it` — non è ancora attivo

## Quando Aruba attiva il dominio
Aggiungeremo `studiosusino.it` su GitHub Pages + DNS.
