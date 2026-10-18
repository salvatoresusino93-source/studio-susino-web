# Registro immagini generate con AI

Ogni immagine generata con AI usata sul sito va registrata qui (vedi regole nell'agente `design-curator`).
Solo illustrazioni generiche: mai lo studio reale, il medico, pazienti o ecografie spacciate per vere.

| File | Pagina/e | Strumento | Prompt (sintesi) | Data |
|------|----------|-----------|------------------|------|

### Immagini AI non dichiarate, rimosse

Trovate nel repo senza registrazione (aggiunte il 2026-05-30 e il 2026-09-02, origine e prompt sconosciuti). Violavano le regole: ambulatorio generato al posto dello studio reale e un'ecografia finta sullo schermo.

| File | Cosa mostrava | Dove era usata | Esito |
|------|---------------|----------------|-------|
| `images/hero-studio.jpg` | Ambulatorio generato con AI; sullo schermo dell'ecografo un'immagine che sembra **un feto di profilo** (contenuto ostetrico, esame non offerto dallo studio) | Nessuna pagina (sostituita in precedenza da `hero-studio-v2.jpg`) | Rimossa il 2026-10-19 |
| `images/hero-studio-v2.jpg` | Ambulatorio generato con AI; sullo schermo un'**ecografia addominale finta** | Hero della home, `og:image` / `twitter:image` di tutte le pagine, `image` del JSON-LD | Sostituita da foto stock dichiarata (hero) e da `og-studio-susino.jpg` (social, JSON-LD); rimossa il 2026-10-19 |

## Foto stock

Foto da banche immagini usate come illustrazioni generiche (regole in `CLAUDE.md`): didascalia visibile "Foto illustrativa", alt neutro, mai per rappresentare lo studio, il medico o pazienti reali. Licenza Unsplash: uso libero anche commerciale, credito non obbligatorio; **non** include il consenso delle persone ritratte, quindi niente volti riconoscibili.

| File | Pagina/e | Autore | Licenza | URL originale | Uso e modifiche | Data |
|------|----------|--------|---------|---------------|-----------------|------|
| `images/home/hero-ecografia.jpg`, `hero-ecografia-480/960/1600.webp` | `index.html`, `index-en.html` (hero) | Green Country Ultrasound LLC | Unsplash License | https://unsplash.com/photos/ultrasound-transducer-held-by-medical-professional--dQRBFWd-ok | Mani con guanti, sonda lineare e console; nessuno schermo visibile. Ritaglio 4:3 sulla destra per togliere il logo "Green Country Ultrasound" sulla casacca e i capelli; saturazione 95% | 2026-10-19 |
| `images/home/referto-mani.jpg`, `referto-mani-400/800.webp` | `index.html`, `index-en.html` (riquadro "dall'accoglienza al referto") | Vitaly Gariev | Unsplash License | https://unsplash.com/photos/doctor-writing-on-a-patients-chart-8WYkI3cEZm8 | Mani del medico che scrive su una cartellina, nessun volto. Ritaglio 4:3; il modulo in inglese è illeggibile a 800 px; saturazione 95%, temperatura naturale | 2026-10-19 |

Riserva non usata: https://unsplash.com/photos/a-person-writing-on-a-piece-of-paper-with-a-stethoscope-ai5uaJfRFxc (Frederick Medina), alternativa per il referto.

## Immagini grafiche

| File | Uso | Origine | Data |
|------|-----|---------|------|
| `images/og-studio-susino.jpg` | `og:image` / `twitter:image` delle pagine generali (le pagine esame generate usano la propria immagine), `image` del JSON-LD MedicalClinic | Composizione: monogramma da `images/logo-google.png` in bianco, testo "Studio Susino – Ecografie a Pozzallo" (Avenir Next), fondo #0e7c8b, 1200×630 | 2026-10-19 |
