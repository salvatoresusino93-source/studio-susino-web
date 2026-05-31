# Immagini ecografiche per l'elenco esami

Ogni esame ha **una miniatura dedicata** in `images/esami/{id}.jpg`, generata da una schermata ecografica **specifica** in `images/us-reali/`.

## Rigenerare (consigliato: Radiopaedia)

```bash
cd ~/Projects/studio-susino-web

# 1) Scarica da Radiopaedia.org (serve internet)
bash scripts/fetch-us-reali.sh

# Oppure solo download + build separati:
node scripts/fetch-radiopaedia-us.mjs
bash scripts/build-esami-images.sh
```

Lo script legge `scripts/radiopaedia-manifest.json`: per ogni esame scarica un'immagine dal case study indicato e genera `images/us-reali/ATTRIBUTIONS.md`.

## Mappa esame → anatomia

| Esame | Cosa deve vedersi | Fonte Radiopaedia (esempio) |
|-------|-------------------|----------------------------|
| Addome completo / renale | Rene in longitudinale | Normal kidneys |
| Addome superiore | Colecisti | Cholelithiasis |
| Addome inferiore / vescico-prostatica | Vescica e prostata | Benign prostatic hyperplasia |
| Scrotale | Testicolo | Scrotal ultrasound - normal |
| Tiroide | Lobo tiroideo | Normal neck ultrasound |
| Collo | Parotide | Normal parotid/submandibular glands |
| Spalla | Tendine sovraspinato | Supraspinatus tendinopathy |
| Ginocchio | Tendine rotuleo | Patella tendon US |
| Gomito | Epicondilo / tendini estensori | Lateral epicondylitis US |
| Polso e mano | Nervo mediano | Carpal tunnel syndrome |
| Anca | Trocantere / anca | Greater trochanter bursa US |
| Anca neonatale | Graf tipo I | Normal pediatric hip US |
| Caviglia | Fascia plantare / piede | Plantar fasciitis |
| Doppler TSA | Carotidi | Carotid artery stenosis |
| Doppler aorta | Aorta addominale | Abdominal aortic aneurysm US |
| Doppler arterie renali | Rene + spettro renale | Renal artery stenosis |
| Doppler arti inferiori | Femorale | Femoral artery thrombosis |
| Linfonodi | Linfonodo collo | Cervical lymphadenitis US |
| Parti molli | Lipoma | Lipoma biceps |

## Licenza

Le immagini da Radiopaedia.org sono sotto [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/).  
Vedi `images/us-reali/ATTRIBUTIONS.md` per citazioni e DOI.

## Usare le tue schermate

Per sostituire con ecografie del tuo ecografo, salva in `images/us-reali/`:

- `src-ginocchio.jpg` — tendine rotuleo / quadricipitale  
- `src-gomito.jpg` — epicondilo / tendini estensori  
- `src-polso-mano.jpg` — nervo mediano al polso  

Poi: `bash scripts/build-esami-images.sh`
