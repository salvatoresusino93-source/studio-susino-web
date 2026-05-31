# Immagini ecografiche per l'elenco esami

Ogni esame in `ecografie.html` ha **una miniatura dedicata** in `images/esami/{id}.jpg`, generata da una fonte specifica in questa cartella.

## Rigenerare

```bash
# 1) Scarica le fonti mancanti (serve internet)
bash scripts/fetch-us-reali.sh

# 2) Crea le miniature 480×480
bash scripts/build-esami-images.sh
```

## Mappa esame → anatomia attesa

| Esame | Fonte | Cosa deve vedersi |
|-------|-------|-------------------|
| Addome completo | Rene + fegato | Addome superiore/inferiore |
| Addome superiore | Colecisti / fegato | Vie biliari, fegato |
| Addome inferiore | Vescica | Pelvi, vescica |
| Apparato urinario | Rene | Reni e vie urinarie |
| Renale | Rene | Rene in longitudinale |
| Vescico-prostatica | Prostata sovrapubica | Vescica e prostata |
| Scrotale | Scroto | Testicolo/epididimo |
| Tiroide | Tiroide color Doppler | Lobo tiroideo |
| Collo | Parotide | Ghiandola salivare (non vescica/rene) |
| MSK generica | Tendine (crop diverso) | Muscolo/tendine |
| Spalla | Sovraspinato | Tendine cuffia |
| Ginocchio | Tendine rotuleo/quadricipite | Ginocchio anteriore |
| Anca | Articolazione anca | Testa femorale / acetabolo |
| Anca neonatale | Graf tipo Ib | Anca neonatale |
| Gomito | Epicondilo / tendini estensori | Gomito |
| Polso e mano | Nervo mediano / polso | Tunnel carpale |
| Caviglia | Caviglia / legamenti | Malleoli / tendine Achille |
| Parti molli | Cisti sottocutanea | Lesione superficiale |
| Doppler TSA | Carotidi | Flusso carotideo |
| Doppler aorta | Aorta addominale | Vaso aortico |
| Doppler arterie renali | Doppler renale | Rene con spettro |
| Doppler arti inferiori | Femorale | Arteria/vena femorale |
| Doppler arti superiori | Asse venoso braccio | Vasi arto superiore |
| Linfonodi | Linfonodo collo | Linfonodo con ilo |

## Sostituire con le tue schermate

Per usare **ecografie del tuo Toshiba/Samsung**, salva uno screenshot per esame come:

`images/us-reali/src-{nome}.jpg`

e aggiorna la mappa in `scripts/build-esami-images.sh`, poi rigenera.

Le fonti Wikimedia usate da `fetch-us-reali.sh` sono a licenza libera per uso educativo; vedi [Commons:Reusing content](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia).
