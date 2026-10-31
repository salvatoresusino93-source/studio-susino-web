# Testi alternativi delle icone — da verificare

**Proposta del 25/10/2026 (approvata da Claude, da confermare dal medico):** l'icona in cima a ogni pagina esame è decorativa, perché il titolo accanto nomina già l'esame; nelle pagine ha `alt=""` e `role="presentation"`, come già le icone dell'elenco. I testi qui sotto restano come riserva: se il medico decide che le icone sono informative, basta rimettere `alt="${esc(esame.iconaAlt)}"` nel generatore e approvare questi testi.

Testi letti dai lettori di schermo per l'icona in cima alle pagine esame (campo `iconaAlt` in `js/esami-data.js` e `js/esami-data-en.js`).
Nelle card dell'elenco ecografie l'icona è decorativa (`alt=""`), perché il titolo accanto nomina già l'esame.

Da rileggere da parte del dott. Susino: correggere direttamente i due file .js, poi `node scripts/genera-pagine-esami.js` e togliere il commento `DA VERIFICARE` in testa ai file.

Colonna **Icona**: *definitiva* (Health Icons) o *provvisoria* (in attesa dell'icona commissionata).

| Esame | Alt IT | Alt EN | Icona |
|---|---|---|---|
| Ecografia addome completo (`addome-completo`) | Illustrazione: organi dell'addome | Illustration: abdominal organs | provvisoria |
| Ecografia addome superiore (`addome-superiore`) | Illustrazione: fegato e colecisti, nella parte alta dell'addome | Illustration: liver and gallbladder, in the upper abdomen | definitiva |
| Ecografia addome inferiore (`addome-inferiore`) | Illustrazione: vescica, nella parte bassa dell'addome | Illustration: bladder, in the lower abdomen | definitiva |
| Ecografia apparato urinario (`apparato-urinario`) | Illustrazione: reni, vie urinarie e vescica | Illustration: kidneys, urinary tract and bladder | provvisoria |
| Ecografia renale (`renale`) | Illustrazione: i due reni | Illustration: the two kidneys | definitiva |
| Ecografia vescico-prostatica (`vescico-prostatica`) | Illustrazione: vescica e prostata | Illustration: bladder and prostate | definitiva |
| Ecografia scrotale e testicolare (`scrotale-testicolare`) | Illustrazione: testicoli | Illustration: testicles | definitiva |
| Ecografia tiroide (`tiroide`) | Illustrazione: tiroide, ghiandola alla base del collo | Illustration: thyroid, the gland at the base of the neck | definitiva |
| Ecografia del collo (`collo`) | Illustrazione: collo e ghiandole salivari | Illustration: neck and salivary glands | provvisoria |
| Ecografia muscolo-scheletrica (`muscolo-scheletrica`) | Illustrazione: articolazione con muscoli e tendini | Illustration: a joint with muscles and tendons | definitiva |
| Ecografia spalla (`spalla`) | Illustrazione: articolazione della spalla | Illustration: shoulder joint | provvisoria |
| Ecografia ginocchio (`ginocchio`) | Illustrazione: articolazione del ginocchio | Illustration: knee joint | provvisoria |
| Ecografia anca (`anca`) | Illustrazione: articolazione dell'anca | Illustration: hip joint | provvisoria |
| Ecografia anca neonatale (`anca-neonatale`) | Illustrazione: anca del neonato | Illustration: a newborn's hip | provvisoria |
| Ecografia gomito (`gomito`) | Illustrazione: articolazione del gomito | Illustration: elbow joint | provvisoria |
| Ecografia polso e mano (`polso-mano`) | Illustrazione: polso e mano | Illustration: wrist and hand | provvisoria |
| Ecografia caviglia e piede (`caviglia-piede`) | Illustrazione: caviglia e piede | Illustration: ankle and foot | definitiva |
| Ecografia parti molli (`parti-molli`) | Illustrazione: pelle e tessuti sotto la pelle | Illustration: skin and the tissues beneath it | provvisoria |
| Ecocolordoppler carotidi (`doppler-tsa`) | Illustrazione: arterie carotidi e vertebrali del collo | Illustration: carotid and vertebral arteries in the neck | provvisoria |
| Ecocolordoppler aorta addominale (`doppler-aorta`) | Illustrazione: aorta nell'addome | Illustration: the aorta in the abdomen | provvisoria |
| Ecocolordoppler arterie renali (`doppler-arterie-renali`) | Illustrazione: arterie che portano il sangue ai reni | Illustration: the arteries that carry blood to the kidneys | provvisoria |
| Ecocolordoppler arti inferiori (`doppler-arti-inferiori`) | Illustrazione: vene e arterie della gamba | Illustration: veins and arteries of the leg | provvisoria |
| Ecocolordoppler arti superiori (`doppler-arti-superiori`) | Illustrazione: vene e arterie del braccio | Illustration: veins and arteries of the arm | provvisoria |
| Ecografia linfonodi (`linfonodi`) | Illustrazione: linfonodi | Illustration: lymph nodes | definitiva |

## Specifiche per l'illustratore

Specifiche per l'illustratore: SVG con viewBox 48×48, colore #0e7c8b. Lo stile va replicato dalle 9 icone definitive in images/icone/: sono forme piene con contorno, non linee da 2px. L'illustratore deve guardare i file esistenti e matcharne il peso visivo, lo spessore del contorno e il livello di dettaglio. Nessuna patologia, niente ostetricia, ogni icona diversa dalle 9 definitive.
