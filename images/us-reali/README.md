# Fonti immagini ecografiche reali (elenco ecografie)

Le miniature in `images/esami/` sono ritagli da **schermate ecografiche vere**, non illustrazioni.

| Fonte | File | Uso |
|-------|------|-----|
| Ecografia addome (Toshiba Aplio) | `esame-addome.jpg` | Addome, reni, vescica, prostata, aorta |
| Ecografia tiroide (color Doppler) | `esame-tiroide.jpg` | Tiroide, collo, linfonodi |
| Ecocolordoppler carotidi (Samsung HS70A) | `esame-carotidi.jpg` | Doppler TSA |
| Ecocolordoppler arti inferiori | `esame-arti-inferiori.jpg` | Doppler gambe / braccia |
| Ecografia spalla / sovraspinato | `esame-muscolo-scheletrica.jpg` | Esami muscolo-scheletrici |

Rigenerare le miniature:

```bash
bash scripts/build-esami-images.sh
```

**Da migliorare in futuro:** scrotale e anca neonatale usano per ora la fonte addome/MSK più vicina.
