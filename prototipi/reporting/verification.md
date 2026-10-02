# Verifica dei testi del Refertario

Rapporto generato il 2026-10-02 su `data.js` al commit `83b4ffc` (nessuna modifica a `data.js`).
Solo testi italiani, salvo la sezione 5. Gli id hanno la forma `organo/reperto`; `(negativo)` è la frase negativa dell'organo,
`(conclusione)` la conclusione del reperto, `(distretto).campo` i campi del distretto.

> Nota: i distretti nuovi richiesti (TC total body trauma/oncologico, rachide, bacino; RX OPT, ossa nasali;
> RM prostata, pelvi, coxofemorale, piede) e la regola «pare/apparentemente» **non sono ancora in `data.js`**
> e quindi non compaiono qui.

## Sommario

1. [Frasi `nuovo: true`](#1-frasi-nuovo-true)
2. [Frasi `riscritta: true`: prima e dopo](#2-frasi-riscritta-true-prima-e-dopo)
3. [«apparentemente» al posto di «pare/paiono»](#3-apparentemente-al-posto-di-parepaiono)
4. [Frasi accorpate o divise rispetto agli originali](#4-frasi-accorpate-o-divise-rispetto-agli-originali)
5. [Traduzioni EN/ES identiche all'IT](#5-traduzioni-enes-identiche-allit)
6. [Linter su data.js e sui referti negativi composti](#6-linter-su-datajs-e-sui-referti-negativi-composti)
7. [Test, parità CSV, id](#7-test-parità-csv-id)

## 1. Frasi `nuovo: true`

Frasi non presenti nei documenti del medico, scritte nello stile telegrafico: **352** (Ecografia 106, TC 123, RM 74, RX 49).
Comprende i campi coperti dal flag: testo e conclusione del reperto, negativo dell'organo, titolo/intro/conclusione
del distretto marcato nuovo, tecnica con `tecnicaNuova`.

### Ecografia

#### Addome completo (`addome`)

- `fegato/cirrosi` — Fegato di dimensioni ___, con margini bozzuti ed ecostruttura grossolanamente disomogenea, come nei quadri di epatopatia cronica. Non evidenti lesioni focali US risolvibili.
- `fegato/cirrosi (conclusione)` — Quadro ecografico di epatopatia cronica.
- `vasi/porta-dilatata` — Vena porta pervia, di calibro aumentato all'ilo epatico (___ mm), con flusso ___ (epatopeto/epatofugo).
- `vasi/porta-dilatata (conclusione)` — Dilatazione della vena porta.
- `colecisti/colecistite` — Colecisti distesa, con pareti ispessite (___ mm) e stratificate, con formazione litiasica incuneata nel collo e segno di Murphy ecografico positivo, come nei quadri di colecistite acuta.
- `colecisti/colecistite (conclusione)` — Quadro ecografico compatibile con colecistite acuta: utile valutazione chirurgica.
- `colecisti/contratta` — Colecisti contratta, non valutabile (paziente non a digiuno).
- `colecisti/colecistectomia` — Esiti di colecistectomia.
- `vie-biliari/dilatate` — Dilatazione delle vie biliari intraepatiche e della via biliare principale, di calibro pari a ___ mm; utile approfondimento diagnostico.
- `vie-biliari/dilatate (conclusione)` — Dilatazione delle vie biliari.
- `pancreas/wirsung` — Dotto di Wirsung dilatato (calibro ___ mm); utile approfondimento diagnostico.
- `pancreas/wirsung (conclusione)` — Dilatazione del dotto di Wirsung.
- `milza/splenomegalia` — Milza aumentata di volume (diametro bipolare ___ mm), ad ecostruttura omogenea.
- `milza/splenomegalia (conclusione)` — Splenomegalia.
- `milza/accessoria` — Milza nei limiti morfo-volumetrici. All'ilo splenico, piccola formazione rotondeggiante isoecogena al parenchima splenico di ___ mm, compatibile con milza accessoria.
- `reni/nefropatia` — Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica.
- `reni/nefropatia (conclusione)` — Segni ecografici di nefropatia cronica.
- `vie-urinarie/idronefrosi` — Dilatazione delle cavità calico-pieliche del rene ___ di grado ___ (lieve/moderato/marcato).
- `vie-urinarie/idronefrosi (conclusione)` — Idronefrosi ___.
- `aorta/ectasia` — Aorta addominale sottorenale ectasica, con diametro massimo trasverso di ___ mm, senza franche dilatazioni aneurismatiche.
- `aorta/ectasia (conclusione)` — Ectasia dell'aorta addominale.
- `aorta/aneurisma` — Dilatazione aneurismatica dell'aorta addominale sottorenale, con diametro massimo trasverso di ___ mm ed estensione longitudinale di circa ___ mm, con apposizione trombotica parietale ___; utile valutazione specialistica chirurgo-vascolare.
- `aorta/aneurisma (conclusione)` — Aneurisma dell'aorta addominale sottorenale.
- `vescica/pareti` — Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo.
- `vescica/aggetto` — Vescica distesa; lungo la parete ___, formazione aggettante nel lume di ___ mm, meritevole di approfondimento specialistico urologico.
- `vescica/aggetto (conclusione)` — Lesione vegetante vescicale meritevole di approfondimento urologico.
- `prostata/normale` — Prostata, esplorata per via sovrapubica, di dimensioni nei limiti della norma (volume di circa ___ cc) ed ecostruttura omogenea.
- `peritoneo/versamento` — Falda fluida libera ___ (nello scavo pelvico/periepatica/perisplenica/diffusa nei recessi peritoneali).
- `peritoneo/versamento (conclusione)` — Versamento libero endoaddominale.

#### Addome in urgenza (trauma) (`addome-urgenza`)

- `parenchimi/lesione` — A carico di ___, area disomogenea di ___ mm, sospetta per lesione post-traumatica; utile approfondimento diagnostico con esame TC.
- `parenchimi/lesione (conclusione)` — Sospetta lesione post-traumatica di ___: utile TC.
- `peritoneo/versamento` — Falda fluida libera ___ (nello spazio di Morison/perisplenica/nello scavo pelvico).
- `peritoneo/versamento (conclusione)` — Versamento libero endoaddominale.

#### Reni e vie urinarie (`urinario`)

- `reni/nefropatia` — Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica.
- `reni/nefropatia (conclusione)` — Segni ecografici di nefropatia cronica.
- `vie-urinarie/idronefrosi` — Dilatazione delle cavità calico-pieliche del rene ___ di grado ___ (lieve/moderato/marcato).
- `vie-urinarie/idronefrosi (conclusione)` — Idronefrosi ___.
- `vescica/pareti` — Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo.
- `vescica/residuo` — Residuo vescicale post-minzionale di circa ___ cc.
- `prostata/normale` — Prostata, esplorata per via sovrapubica, di dimensioni nei limiti della norma (volume di circa ___ cc) ed ecostruttura omogenea.

#### Tiroide (`tiroide`)

- `(distretto).tecnica` — Esame eseguito con sonda lineare ad alta frequenza, con integrazione color-Doppler.
- `vascolarizzazione/aumentata` — Vascolarizzazione ghiandolare diffusamente aumentata all'integrazione con color-Doppler.

#### Spalla (`spalla`)

- `versamento/versamento` — Falda di versamento nei recessi articolari esplorabili.
- `dinamica/impingement` — Alle manovre dinamiche, segni di conflitto subacromiale.
- `dinamica/impingement (conclusione)` — Segni dinamici di impingement subacromiale.

#### Gomito (`gomito`)

- `tendini/epitrocleite` — Ecostruttura finemente disomogenea ed ispessimento in sede pre-inserzionale del tendine comune dei flessori rispetto al controlato, compatibili in prima ipotesi con quadro di epitrocleite. ⏎ Regolari reperti ecografici a carico del tendine comune degli estensori e del tendine tricipitale.
- `tendini/epitrocleite (conclusione)` — Quadro compatibile con epitrocleite.
- `borsa-olecranica/borsite` — Distensione fluida della borsa olecranica, delle dimensioni di ___ x ___ mm, come da borsite.
- `borsa-olecranica/borsite (conclusione)` — Borsite olecranica.

#### Polso e mano (`polso-mano`)

- `tunnel/tunnel-carpale` — Nervo mediano ispessito ed ipoecogeno all'ingresso del canale carpale, con area di sezione trasversa di ___ mm², come nei quadri di sindrome del tunnel carpale; utile correlazione con esame elettromiografico.
- `tunnel/tunnel-carpale (conclusione)` — Quadro compatibile con sindrome del tunnel carpale.
- `tendini/dito-scatto` — Ispessimento ipoecogeno della puleggia A1 del ___ dito, con tendine flessore lievemente ispessito e scorrimento a scatto alle manovre dinamiche.
- `tendini/dito-scatto (conclusione)` — Quadro compatibile con dito a scatto.

#### Anca (`anca`)

- `borse/borsite` — Distensione fluida della borsa trocanterica ___, dello spessore di ___ mm, come da borsite.
- `borse/borsite (conclusione)` — Borsite trocanterica.
- `coxofemorale/versamento` — Falda di versamento coxo-femorale ___ dello spessore di ___ mm.
- `coxofemorale/versamento (conclusione)` — Versamento coxo-femorale.

#### Anca neonatale (`anca-neonatale`)

- `graf/immatura` — Proiezioni coronali standard secondo Graf. A destra angolo α di circa ___° e angolo β di ___°; a sinistra angolo α di ___° e angolo β di ___°. ⏎ Anca ___ di tipo ___ secondo Graf; utile controllo ecografico a distanza di ___ settimane e valutazione specialistica ortopedica.
- `graf/immatura (conclusione)` — Anca ___ di tipo ___ secondo Graf.

#### Coscia e gamba (muscoli) (`coscia-gamba`)

- `falde/ematoma` — Raccolta fluida disomogenea di ___ x ___ mm in sede ___, compatibile con ematoma.

#### Ginocchio (`ginocchio`)

- `tendini/rotuleo` — Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale. ⏎ Tendine rotuleo ispessito e disomogeneamente ipoecogeno in sede prossimale, come per tendinopatia. ⏎ Regolari i legamenti collaterali.
- `tendini/rotuleo (conclusione)` — Tendinopatia rotulea.
- `versamento/versamento` — Versamento articolare nel recesso sottoquadricipitale, dello spessore di ___ mm.
- `versamento/versamento (conclusione)` — Versamento articolare.

#### Caviglia e piede (`caviglia-piede`)

- `legamenti-tibiali/paa` — Legamento peroneo-astragalico anteriore ispessito e disomogeneamente ipoecogeno, con perdita della regolare struttura fibrillare, come per lesione ___ (parziale/completa). ⏎ Regolari i tendini tibiale anteriore e posteriore.
- `legamenti-tibiali/paa (conclusione)` — Lesione del legamento peroneo-astragalico anteriore.

#### Tessuti molli (tumefazione) (`tessuti-molli`)

- `sottocute/raccolta` — Raccolta fluida disomogenea, a margini irregolari, di ___ x ___ mm, con iperemia perilesionale al color-Doppler, in prima ipotesi di natura flogistica-ascessuale.
- `sottocute/raccolta (conclusione)` — Raccolta fluida di probabile natura flogistica.

#### Testicoli (`testicoli`)

- `didimi/microlitiasi` — Didimi regolari per morfologia e dimensioni, con multipli spot iperecogeni puntiformi diffusi nel parenchima, come da microlitiasi testicolare.
- `didimi/microlitiasi (conclusione)` — Microlitiasi testicolare.
- `didimi/lesione` — Nel contesto del didimo ___, formazione ipoecogena di ___ mm, vascolarizzata al color-Doppler, meritevole di valutazione specialistica urologica urgente.
- `didimi/lesione (conclusione)` — Lesione focale testicolare ___ meritevole di valutazione urologica urgente.
- `epididimi/epididimite` — Epididimo ___ ingrandito e disomogeneamente ipoecogeno, con aumentata vascolarizzazione al color-Doppler, come nei quadri di epididimite.
- `epididimi/epididimite (conclusione)` — Quadro compatibile con epididimite ___.
- `varicocele/varicocele` — Ectasia delle vene del plesso pampiniforme a ___, con calibro massimo di ___ mm e reflusso durante la manovra di Valsalva, come da varicocele.
- `varicocele/varicocele (conclusione)` — Varicocele ___.

#### Doppler tronchi sovraortici (`tsa`)

- `(distretto).tecnica` — Esame eseguito con sonda lineare, studio B-mode, color-Doppler e Doppler pulsato.
- `destra/significativa` — A destra: regolare pervietà della carotide comune e della carotide esterna. ⏎ Placca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.
- `destra/significativa (conclusione)` — Stenosi emodinamicamente significativa della carotide interna destra.
- `sinistra/significativa` — A sinistra: regolare pervietà della carotide comune e della carotide esterna. ⏎ Placca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.
- `sinistra/significativa (conclusione)` — Stenosi emodinamicamente significativa della carotide interna sinistra.
- `vertebrali/invertito` — Arteria vertebrale ___ con flusso ___ (invertito/alternante); utile studio delle arterie succlavie.
- `vertebrali/invertito (conclusione)` — Alterazione del flusso vertebrale ___.
- `vertebrali/ipoplasica` — Arterie vertebrali pervie con tracciati normodiretti; vertebrale ___ di calibro ridotto, come per ipoplasia.

#### Doppler venoso arti inferiori (`venoso-ai`)

- `(distretto).tecnica` — Esame eseguito con sonda lineare, in clinostatismo e ortostatismo, con manovre di compressione e di Valsalva.
- `profondo/tvp` — A ___ (destra/sinistra), vena ___ non comprimibile ed occupata da materiale ecogeno, senza segnale di flusso al color-Doppler, come da trombosi venosa profonda ___ (occlusiva/non occlusiva). ⏎ Controlateralmente regolare pervietà, calibro e continenza del sistema venoso profondo.
- `profondo/tvp (conclusione)` — Trombosi venosa profonda ___: comunicato al paziente / al curante per valutazione urgente.
- `profondo/esiti` — A ___, vena ___ ricanalizzata, con ispessimenti parietali e reflusso, come da esiti di pregressa trombosi. ⏎ Non segni di TVP in atto.
- `profondo/esiti (conclusione)` — Esiti di pregressa trombosi venosa profonda.
- `destra/insufficienza` — A destra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna. ⏎ Assenti segni di tromboflebite in atto.
- `destra/insufficienza (conclusione)` — Insufficienza della safena interna destra.
- `destra/tromboflebite` — A destra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.
- `destra/tromboflebite (conclusione)` — Tromboflebite della safena ___ destra.
- `sinistra/insufficienza` — A sinistra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna. ⏎ Non segni di tromboflebite in atto.
- `sinistra/insufficienza (conclusione)` — Insufficienza della safena interna sinistra.
- `sinistra/tromboflebite` — A sinistra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.
- `sinistra/tromboflebite (conclusione)` — Tromboflebite della safena ___ sinistra.

#### Doppler arterioso arti inferiori (`arterioso-ai`)

- `generale/assente` — Non significative alterazioni ateromasiche a carico del distretto esaminato.
- `destra/stenosi` — A destra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).
- `destra/stenosi (conclusione)` — Arteriopatia obliterante dell'arto inferiore destro.
- `sinistra/stenosi` — A sinistra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).
- `sinistra/stenosi (conclusione)` — Arteriopatia obliterante dell'arto inferiore sinistro.

#### Doppler aorta e assi iliaci (`aorta-iliache`)

- `calibro/aneurisma` — Aorta addominale sottorenale sede di dilatazione aneurismatica con diametro massimo trasverso di ___ mm ed estensione longitudinale di circa ___ mm, con apposizione trombotica parietale ___; assi iliaci pervi con calibro conservato.
- `calibro/aneurisma (conclusione)` — Aneurisma dell'aorta addominale sottorenale: utile valutazione chirurgo-vascolare.

#### Doppler arterie renali (`arterie-renali`)

- `arterie/stenosi` — A livello dell'arteria renale ___, accelerazione del flusso all'origine (PSV ___ cm/s), con tracciati intraparenchimali a valle di tipo tardus-parvus, come per stenosi emodinamicamente significativa. ⏎ Regolare l'arteria renale controlaterale.
- `arterie/stenosi (conclusione)` — Stenosi emodinamicamente significativa dell'arteria renale ___.

### TC

#### Encefalo senza mdc (`encefalo`)

- `emorragia/ematoma` — Iperdensità di natura ematica intraparenchimale in sede ___, di circa ___ x ___ mm, con edema perilesionale ___ ed effetto massa ___.
- `emorragia/ematoma (conclusione)` — Ematoma intraparenchimale ___.
- `emorragia/esa` — Iperdensità di natura ematica negli spazi liquorali ___ (solchi della convessità/cisterne della base/scissure), come da emorragia subaracnoidea.
- `emorragia/esa (conclusione)` — Emorragia subaracnoidea.
- `emorragia/subdurale` — Falda iperdensa extra-assiale a semiluna lungo la convessità ___, dello spessore massimo di ___ mm, come da ematoma subdurale ___ (acuto/subacuto/cronico).
- `emorragia/subdurale (conclusione)` — Ematoma subdurale ___.
- `emorragia/epidurale` — Raccolta iperdensa extra-assiale biconvessa in sede ___, dello spessore massimo di ___ mm, come da ematoma epidurale.
- `emorragia/epidurale (conclusione)` — Ematoma epidurale ___.
- `parenchima/ischemia` — Area ipodensa ___ (corticale/cortico-sottocorticale) in sede ___, con perdita della differenziazione tra sostanza grigia e bianca, come per lesione ischemica in evoluzione nel territorio dell'arteria ___.
- `parenchima/ischemia (conclusione)` — Lesione ischemica in evoluzione nel territorio dell'arteria ___.
- `parenchima/contusione` — Focolai contusivi in sede ___, con componente emorragica ___.
- `parenchima/contusione (conclusione)` — Focolai contusivi ___.
- `ventricoli/idrocefalo` — Dilatazione del sistema ventricolare sovratentoriale ___, con ipodensità periventricolare da riassorbimento transependimale ___, come da idrocefalo ___.
- `ventricoli/idrocefalo (conclusione)` — Idrocefalo ___.
- `ventricoli/emoventricolo` — Iperdensità ematica nel lume ventricolare ___, come da emoventricolo.
- `ventricoli/emoventricolo (conclusione)` — Emoventricolo.
- `linea-mediana/shift` — Deviazione delle strutture della linea mediana verso ___ di circa ___ mm.
- `linea-mediana/shift (conclusione)` — Deviazione della linea mediana di ___ mm.
- `ossa/frattura` — Allo studio con finestra per osso, rima di frattura ___ (composta/scomposta) a carico di ___.
- `ossa/frattura (conclusione)` — Frattura ___ di ___.

#### Angio-TC encefalo (stroke) (`encefalo-angio`)

- `basale/ischemia` — All'esame basale, ipodensità ___ in sede ___, con perdita della differenziazione cortico-sottocorticale (ASPECTS ___), come per lesione ischemica recente nel territorio dell'arteria ___.
- `basale/ischemia (conclusione)` — Lesione ischemica recente nel territorio dell'arteria ___ (ASPECTS ___).
- `emorragia/ematoma` — Iperdensità focale di natura emorragica in sede ___, di circa ___ x ___ mm.
- `emorragia/ematoma (conclusione)` — Emorragia intracranica ___.
- `tsa/stenosi` — Dopo iniezione ev di MdC, placca ateromasica ___ all'origine della carotide interna ___, con stenosi stimata del ___% (criteri NASCET); regolare pervietà dei restanti TSA.
- `tsa/stenosi (conclusione)` — Stenosi della carotide interna ___ del ___%.
- `intracranici/occlusione` — Mancata opacizzazione del tratto ___ dell'arteria ___ (carotide interna/M1/M2/basilare), come per occlusione trombo-embolica.
- `intracranici/occlusione (conclusione)` — Occlusione dell'arteria ___ (tratto ___).
- `intracranici/aneurisma` — Dilatazione aneurismatica sacciforme dell'arteria ___, con colletto di ___ mm e sacca di ___ x ___ mm.
- `intracranici/aneurisma (conclusione)` — Aneurisma dell'arteria ___.
- `collaterali/scarso` — Sistema collaterale leptomeningeo ridotto nel territorio ___, categorizzabile come ___ (moderato/scarso).

#### Massiccio facciale (`massiccio-facciale`)

- `seni/sinusite` — Livello idroaereo nel seno ___, come per sinusite acuta.
- `seni/sinusite (conclusione)` — Sinusite acuta ___.
- `ossa (negativo)` — Non rime di frattura delle strutture ossee del massiccio facciale.
- `ossa/frattura` — Rima di frattura ___ (composta/scomposta) a carico di ___.
- `ossa/frattura (conclusione)` — Frattura ___ di ___.

#### Collo (`collo`)

- `linfonodi/adenopatie` — Linfonodi di dimensioni aumentate al livello ___, il maggiore di ___ mm in asse corto, ___ (omogenei/con aree di necrosi colliquativa).
- `linfonodi/adenopatie (conclusione)` — Linfoadenopatie laterocervicali ___.
- `faringe/ascesso` — Raccolta ipodensa a margini con enhancement in sede ___ (peritonsillare/retrofaringea/parafaringea), di ___ x ___ mm, come per ascesso.
- `faringe/ascesso (conclusione)` — Ascesso ___.
- `tiroide/nodulo` — Nodulo tiroideo ipodenso di ___ mm nel lobo ___, da caratterizzare con ecografia.
- `tiroide/nodulo (conclusione)` — Nodulo tiroideo ___: utile ecografia.

#### Torace (`torace`)

- `polmoni/polmonite` — Area di consolidazione parenchimale ___ (sede), con broncogramma aereo, di verosimile natura flogistica.
- `polmoni/polmonite (conclusione)` — Focolaio broncopneumonico ___.
- `polmoni/nodulo` — Nodulo polmonare ___ (solido/subsolido/a vetro smerigliato) di ___ mm nel lobo ___.
- `polmoni/nodulo (conclusione)` — Nodulo polmonare ___: follow-up secondo le linee guida.
- `polmoni/massa` — Formazione espansiva solida del lobo ___, di ___ x ___ mm, a margini ___ (spiculati/lobulati/netti).
- `polmoni/massa (conclusione)` — Formazione espansiva polmonare ___: utile approfondimento.
- `polmoni/enfisema` — Aree di enfisema ___ (centrolobulare/parasettale/panlobulare), prevalenti ___.
- `polmoni/enfisema (conclusione)` — Enfisema polmonare ___.
- `vie-aeree/obliterazione` — Obliterazione mucosa del bronco ___.
- `vie-aeree/obliterazione (conclusione)` — Bronco ___ obliterato.
- `pleura/versamento` — Falda di versamento pleurico ___ (destro/sinistro/bilaterale), dello spessore massimo di ___ mm.
- `pleura/versamento (conclusione)` — Versamento pleurico ___.
- `pleura/pnx` — Pneumotorace ___, con falda aerea dello spessore massimo di ___ mm all'apice.
- `pleura/pnx (conclusione)` — Pneumotorace ___.
- `pericardio/versamento` — Falda di versamento pericardico dello spessore massimo di ___ mm.
- `pericardio/versamento (conclusione)` — Versamento pericardico.
- `linfonodi/adenopatie` — Linfonodi di dimensioni aumentate in sede ___, il maggiore di ___ mm in asse corto.
- `linfonodi/adenopatie (conclusione)` — Linfoadenopatie ___.
- `ossa/frattura-costale` — Allo studio con finestra per osso, rima di frattura ___ (composta/scomposta) dell'arco ___ della ___ costa ___.
- `ossa/frattura-costale (conclusione)` — Frattura costale ___.

#### Angio-TC torace (embolia polmonare) (`torace-tepa`)

- `arterie-polmonari/tep` — Difetti di riempimento endoluminali ipodensi a carico ___ (tronco dell'arteria polmonare/rami lobari/segmentari/subsegmentari ___), come da tromboembolia polmonare.
- `arterie-polmonari/tep (conclusione)` — Tromboembolia polmonare ___.
- `arterie-polmonari/sovraccarico` — Rapporto tra ventricolo destro e ventricolo sinistro di ___, con reflusso di mdc in vena cava inferiore e nelle vene sovraepatiche, come per sovraccarico ventricolare destro.
- `arterie-polmonari/sovraccarico (conclusione)` — Segni di sovraccarico ventricolare destro.
- `arterie-polmonari/infarto` — Area di consolidazione periferica cuneiforme a base pleurica nel lobo ___, come per infarto polmonare.
- `arterie-polmonari/infarto (conclusione)` — Infarto polmonare ___.
- `pleura/versamento` — Falda di versamento pleurico ___, dello spessore massimo di ___ mm; non versamento pericardico.
- `pleura/versamento (conclusione)` — Versamento pleurico ___.

#### Addome (`addome`)

- `fegato/steatosi` — Fegato di dimensioni ___, con diffusa riduzione della densità parenchimale, come per steatosi.
- `fegato/steatosi (conclusione)` — Steatosi epatica.
- `fegato/cisti` — Al ___ segmento, formazione ipodensa di ___ mm, a margini netti, priva di enhancement, di tipo cistico.
- `fegato/cisti (conclusione)` — Cisti epatica.
- `fegato/secondarismi` — Plurime lesioni focali ipodense epatiche di diverse dimensioni, la maggiore di ___ mm al ___ segmento, compatibili con secondarismi.
- `fegato/secondarismi (conclusione)` — Lesioni epatiche compatibili con secondarismi.
- `colecisti/calcoli` — Colecisti con ___ calcoli calcifici endoluminali, il maggiore di ___ mm.
- `colecisti/calcoli (conclusione)` — Colelitiasi.
- `colecisti/colecistite` — Colecisti distesa, a pareti ispessite (___ mm), con addensamento dell'adipe pericolecistico, come per colecistite acuta.
- `colecisti/colecistite (conclusione)` — Colecistite acuta.
- `vie-biliari/dilatate` — Dilatazione delle vie biliari intraepatiche e del coledoco (calibro ___ mm).
- `vie-biliari/dilatate (conclusione)` — Dilatazione delle vie biliari.
- `milza-pancreas/pancreatite` — Pancreas tumefatto, con addensamento dell'adipe peripancreatico ___ e raccolte fluide ___, come per pancreatite acuta ___ (edematosa/necrotico-emorragica).
- `milza-pancreas/pancreatite (conclusione)` — Pancreatite acuta ___.
- `milza-pancreas/splenomegalia` — Milza aumentata di volume (diametro bipolare ___ mm).
- `milza-pancreas/splenomegalia (conclusione)` — Splenomegalia.
- `milza-pancreas/adenoma` — Nodulo surrenalico ___ di ___ mm, ipodenso (densità basale ___ HU), come per adenoma.
- `milza-pancreas/adenoma (conclusione)` — Nodulo surrenalico ___ compatibile con adenoma.
- `reni/cisti` — Cisti corticale semplice di ___ mm al polo ___ del rene ___.
- `reni/pielonefrite` — Aree cuneiformi ipoperfuse nel rene ___, come per focolai pielonefritici.
- `reni/pielonefrite (conclusione)` — Pielonefrite ___.
- `vie-urinarie/calcolo-ureterale` — Calcolo di ___ mm nell'uretere ___ (prossimale/medio/distale), con dilatazione delle vie escretrici a monte.
- `vie-urinarie/calcolo-ureterale (conclusione)` — Calcolo ureterale ___ con idronefrosi.
- `vie-urinarie/calcoli-renali` — Calcoli caliceali ___, il maggiore di ___ mm, senza dilatazione delle vie escretrici.
- `vie-urinarie/calcoli-renali (conclusione)` — Nefrolitiasi ___.
- `aorta/aneurisma` — Dilatazione aneurismatica dell'aorta addominale sottorenale, con diametro massimo di ___ mm ed estensione longitudinale di ___ mm, con trombosi parietale ___.
- `aorta/aneurisma (conclusione)` — Aneurisma dell'aorta addominale sottorenale.
- `peritoneo/versamento` — Falda di versamento libero ___ (periepatico/perisplenico/nello scavo pelvico/diffuso).
- `peritoneo/versamento (conclusione)` — Versamento peritoneale.
- `basi-polmonari/versamento-pleurico` — Nelle scansioni craniali passanti per le basi polmonari, falda di versamento pleurico ___ (destro/sinistro/bilaterale).

#### Addome acuto (DEA) (`addome-acuto`)

- `pneumoperitoneo/perforazione` — Bolle aeree libere extraluminali ___ (sottodiaframmatiche/in sede ___), come per perforazione di viscere cavo ___.
- `pneumoperitoneo/perforazione (conclusione)` — Pneumoperitoneo da perforazione di viscere cavo ___.
- `colecisti/colecistite` — Colecisti distesa, a pareti ispessite (___ mm), con addensamento dell'adipe pericolecistico e falda fluida perivescicolare, ___ (con calcoli endoluminali), come per colecistite acuta.
- `colecisti/colecistite (conclusione)` — Colecistite acuta.
- `pancreas/pancreatite` — Pancreas tumefatto, con addensamento dell'adipe peripancreatico ___ e raccolte fluide ___, come per pancreatite acuta ___ (edematosa/necrotico-emorragica).
- `pancreas/pancreatite (conclusione)` — Pancreatite acuta ___.
- `reni/pielonefrite` — Reni in sede, di dimensioni nella norma; aree cuneiformi ipoperfuse nel rene ___, come per focolai pielonefritici.
- `reni/pielonefrite (conclusione)` — Pielonefrite ___.
- `vie-urinarie/calcolo-ureterale` — Calcolo di ___ mm nell'uretere ___ (prossimale/medio/distale), con dilatazione delle vie escretrici a monte.
- `vie-urinarie/calcolo-ureterale (conclusione)` — Calcolo ureterale ___ con idronefrosi.
- `appendice/appendicite` — Appendice ciecale ispessita (diametro ___ mm), con iperenhancement parietale e addensamento dell'adipe periappendicolare ___ (con appendicolita/raccolta/bolle aeree extraluminali), come per appendicite acuta ___.
- `appendice/appendicite (conclusione)` — Appendicite acuta ___.
- `sigma/diverticolite` — Diverticoli del sigma con ispessimento parietale segmentario e addensamento dell'adipe pericolico ___ (con raccolta/bolle aeree extraluminali), come per diverticolite acuta ___ (Hinchey ___).
- `sigma/diverticolite (conclusione)` — Diverticolite acuta del sigma ___.
- `anse/occlusione` — Distensione delle anse ___ (tenuali/coliche) fino a ___ mm, con livelli idroaerei e passaggio di calibro in sede ___, come per occlusione intestinale ___.
- `anse/occlusione (conclusione)` — Occlusione intestinale ___.
- `pareti/ischemia` — Ispessimento parietale delle anse ___ con ridotto enhancement ___, come per sofferenza ischemica.
- `pareti/ischemia (conclusione)` — Sofferenza ischemica intestinale ___.
- `versamento/versamento` — Falda di versamento libero ___ (periepatico/perisplenico/nello scavo pelvico/diffuso).
- `versamento/versamento (conclusione)` — Versamento peritoneale.
- `arterie/ams` — Difetto di opacizzazione dell'arteria mesenterica superiore ___ (a ___ mm dall'origine), come per occlusione trombo-embolica.
- `arterie/ams (conclusione)` — Occlusione dell'arteria mesenterica superiore.
- `basi-polmonari/versamento-pleurico` — Nelle scansioni craniali passanti per le basi polmonari, falda di versamento pleurico ___ (destro/sinistro/bilaterale).

### RM

#### Spalla (`spalla`)

- `(distretto).titolo` — RM DELLA SPALLA
- `(distretto).intro` — Esame mirato alla spalla {lato}.
- `(distretto).conclusioneNegativa` — Quadro RM della spalla nei limiti della norma.
- `cuffia/tendinosi` — Tendine sovraspinato ispessito, con iperintensità di segnale intratendinea nelle sequenze DP, senza lesioni di continuità, come per tendinosi.
- `cuffia/tendinosi (conclusione)` — Tendinosi del sovraspinato.
- `cuffia/lesione-parziale` — Lesione parziale del tendine sovraspinato sul versante ___ (articolare/bursale), di circa ___ mm.
- `cuffia/lesione-parziale (conclusione)` — Lesione parziale del tendine sovraspinato.
- `cuffia/lesione-completa` — Lesione a tutto spessore del tendine sovraspinato, con retrazione del moncone di circa ___ mm; trofismo del ventre muscolare ___ (conservato/ridotto, con infiltrazione adiposa).
- `cuffia/lesione-completa (conclusione)` — Lesione a tutto spessore del tendine sovraspinato.
- `cuffia/calcifica` — Calcificazione di ___ mm nel contesto del tendine ___, ipointensa in tutte le sequenze, come per tendinopatia calcifica.
- `cuffia/calcifica (conclusione)` — Tendinopatia calcifica del ___.
- `clb/tenosinovite` — Tendine del capo lungo del bicipite in sede, con distensione fluida della guaina, come per tenosinovite.
- `clb/tenosinovite (conclusione)` — Tenosinovite del capo lungo del bicipite.
- `labbro/lesione` — Iperintensità lineare nel contesto del cercine glenoideo ___ (superiore/anteriore/posteriore), come per lesione.
- `labbro/lesione (conclusione)` — Lesione del cercine glenoideo ___.
- `acromion-claveare/artrosi` — Articolazione acromion-claveare con ipertrofia capsulo-osteofitosica e improntamento del versante bursale del sovraspinato, come per artrosi.
- `acromion-claveare/artrosi (conclusione)` — Artrosi acromion-claveare.
- `borsa/borsite` — Distensione fluida della borsa subacromion-deltoidea, come per borsite.
- `borsa/borsite (conclusione)` — Borsite subacromion-deltoidea.

#### Encefalo (`encefalo`)

- `parenchima/lesione-espansiva` — Formazione espansiva ___ (intra/extra-assiale) in sede ___, di ___ x ___ mm, ___ (iperintensa/ipointensa) in T2, con enhancement ___ dopo mdc ed edema perilesionale ___.
- `parenchima/lesione-espansiva (conclusione)` — Lesione espansiva ___: utile valutazione specialistica.
- `diffusione/ischemia-acuta` — Nella sequenza in diffusione, area di restrizione della diffusività in sede ___, come per lesione ischemica acuta nel territorio dell'arteria ___.
- `diffusione/ischemia-acuta (conclusione)` — Lesione ischemica acuta nel territorio dell'arteria ___.
- `emosiderina/microsanguinamenti` — Nella sequenza T2 GE, piccoli foci ipointensi in sede ___, riconducibili a depositi emosiderinici da microsanguinamenti.
- `emosiderina/microsanguinamenti (conclusione)` — Microsanguinamenti ___.
- `mdc/enhancement` — Dopo somministrazione del mdc paramagnetico, impregnazione contrastografica ___ (nodulare/anulare/leptomeningea) in sede ___.
- `mdc/enhancement (conclusione)` — Enhancement patologico ___.

#### Rachide lombosacrale (`rachide-lombosacrale`)

- `protrusioni/focale` — In ___, protrusione discale focale ___ (mediana/paramediana ___/foraminale ___), improntante il sacco durale, con obliterazione del piano di clivaggio adiposo disco-radicolare ___.
- `protrusioni/focale (conclusione)` — Protrusione discale focale ___ in ___.
- `protrusioni/ernia` — In ___, ernia discale ___ (contenuta/espulsa/migrata ___), con cancellazione del piano adiposo periradicolare e compressione della radice ___.
- `protrusioni/ernia (conclusione)` — Ernia discale ___ in ___ con conflitto radicolare ___.
- `protrusioni/fissurazione` — In ___, fissurazione dell'anulus fibroso posteriore.

#### Rachide cervicale (`rachide-cervicale`)

- `protrusioni/ernia` — In ___, ernia discale ___ (paramediana/foraminale ___), con estrinsecazione intraforaminale e conflitto con la radice emergente ___.
- `protrusioni/ernia (conclusione)` — Ernia discale ___ in ___ con conflitto radicolare.
- `midollo/mielopatia` — Area di iperintensità di segnale in T2 nel midollo spinale a livello di ___, in corrispondenza della compressione discale, come per mielopatia compressiva.
- `midollo/mielopatia (conclusione)` — Mielopatia compressiva a livello di ___.

#### Ginocchio (`ginocchio`)

- `(distretto).titolo` — RM DEL GINOCCHIO
- `(distretto).intro` — Esame mirato al ginocchio {lato}.
- `(distretto).conclusioneNegativa` — RM del ginocchio nei limiti della norma.
- `menischi/lesione` — Iperintensità lineare nel corno ___ del menisco ___, raggiungente la superficie articolare ___, come per lesione ___ (orizzontale/verticale/complessa).
- `menischi/lesione (conclusione)` — Lesione del corno ___ del menisco ___.
- `menischi/degenerazione` — Iperintensità intrameniscale globulare del corno ___ del menisco ___, senza estensione alla superficie articolare, come per degenerazione mucoide.
- `legamenti/lca` — Discontinuità delle fibre del legamento crociato anteriore, con iperintensità di segnale, come per lesione ___ (completa/parziale).
- `legamenti/lca (conclusione)` — Lesione ___ del legamento crociato anteriore.
- `legamenti/lcm` — Ispessimento e iperintensità del legamento collaterale mediale, con edema dei tessuti periligamentosi, come per distrazione di grado ___.
- `legamenti/lcm (conclusione)` — Distrazione del legamento collaterale mediale.
- `cartilagine/condropatia` — Assottigliamento della cartilagine di rivestimento articolare ___ (femoro-tibiale mediale/laterale/femoro-rotulea), con alterazioni di segnale dell'osso subcondrale ___.
- `cartilagine/condropatia (conclusione)` — Condropatia ___.
- `osso/edema` — Area di edema della spongiosa ossea ___ (condilo femorale/piatto tibiale ___), iperintensa in STIR, come per contusione ossea.
- `osso/edema (conclusione)` — Contusione ossea ___.
- `versamento/versamento` — Versamento intrarticolare ___ (modesto/abbondante), con distensione del recesso sovrapatellare.
- `versamento/versamento (conclusione)` — Versamento articolare.
- `versamento/baker` — Distensione fluida della borsa gastrocnemio-semimembranosa (cisti di Baker), di ___ x ___ mm.
- `versamento/baker (conclusione)` — Cisti di Baker.

#### Caviglia (`caviglia`)

- `(distretto).titolo` — RM DELLA CAVIGLIA
- `(distretto).intro` — Esame mirato alla caviglia {lato}.
- `(distretto).conclusioneNegativa` — RM della caviglia nei limiti della norma.
- `achille/tendinopatia` — Tendine achilleo ispessito, con iperintensità intratendinea ___ (preinserzionale/inserzionale), come per tendinopatia.
- `achille/tendinopatia (conclusione)` — Tendinopatia achillea.
- `fascia/fascite` — Aponeurosi plantare ispessita all'inserzione calcaneare, con edema dei tessuti perifasciali, come per fascite plantare.
- `fascia/fascite (conclusione)` — Fascite plantare.
- `legamenti/paa` — Discontinuità delle fibre del legamento peroneo-astragalico anteriore, con edema periligamentoso, come per lesione ___ (parziale/completa).
- `legamenti/paa (conclusione)` — Lesione del legamento peroneo-astragalico anteriore.
- `versamento/versamento` — Versamento articolare tibio-astragalico ___.
- `ossa/edema` — Area di edema della spongiosa ossea ___ (astragalo/calcagno/malleolo ___), iperintensa in STIR, come per contusione ossea.
- `ossa/edema (conclusione)` — Contusione ossea ___.

#### Bacino (sacro-iliache) (`sacroiliache`)

- `sacroiliache/sacroileite` — Edema della spongiosa ossea subcondrale ___ (iliaca/sacrale) dell'articolazione sacro-iliaca ___, iperintenso in STIR, come per sacroileite attiva.
- `sacroiliache/sacroileite (conclusione)` — Sacroileite attiva ___.

#### Colangio-RM (`colangio`)

- `colecisti/calcoli` — Colecisti distesa, con ___ difetti di segnale endoluminali di natura litiasica, il maggiore di ___ mm.
- `colecisti/calcoli (conclusione)` — Colelitiasi.
- `vie-biliari/dilatazione` — Dilatazione delle vie biliari intra ed extraepatiche; epatocoledoco di circa ___ mm.
- `vie-biliari/dilatazione (conclusione)` — Dilatazione delle vie biliari.
- `litiasi/coledocolitiasi` — Difetti di segnale endoluminali nel coledoco ___ (prossimale/medio/distale), il maggiore di ___ mm, come da coledocolitiasi.
- `litiasi/coledocolitiasi (conclusione)` — Coledocolitiasi.

### RX

#### Torace (PA e LL) (`torace`)

- `parenchima/addensamento` — Addensamento parenchimale ___ (sede), di verosimile natura flogistica.
- `parenchima/addensamento (conclusione)` — Addensamento parenchimale ___.
- `parenchima/nodulo` — Opacità nodulare di ___ mm al campo polmonare ___, meritevole di approfondimento con TC.
- `parenchima/nodulo (conclusione)` — Opacità nodulare ___: utile TC.
- `parenchima/stasi` — Accentuazione della trama interstiziale e ridistribuzione del circolo verso i campi superiori, come per stasi del piccolo circolo.
- `parenchima/stasi (conclusione)` — Segni di stasi del piccolo circolo.
- `parenchima/pnx` — Linea pleurica viscerale all'apice ___, senza trama polmonare periferica, come per pneumotorace.
- `parenchima/pnx (conclusione)` — Pneumotorace ___.
- `pleura/versamento` — Obliterazione del seno costofrenico ___, come per falda di versamento pleurico.
- `pleura/versamento (conclusione)` — Versamento pleurico ___.
- `cuore/ingrandita` — Immagine cardiaca ingrandita (indice cardio-toracico ___).
- `cuore/ingrandita (conclusione)` — Aumento dell'immagine cardiaca.

#### Torace al letto (AP) (`torace-letto`)

- `parenchima/addensamento` — Addensamento parenchimale ___ (sede); non evidenti falde di PNX.
- `parenchima/addensamento (conclusione)` — Addensamento parenchimale ___.
- `parenchima/pnx` — Non addensamenti parenchimali; falda di PNX ___ (sede).
- `parenchima/pnx (conclusione)` — Pneumotorace ___.
- `pleura/versamento` — Velatura ___ dell'emitorace ___, come per versamento pleurico in decubito supino.
- `pleura/versamento (conclusione)` — Versamento pleurico ___.

#### Addome diretto (`addome`)

- `livelli/occlusione` — Multipli livelli idroaerei ___ (tenuali/colici), con distensione delle anse fino a ___ mm, come per quadro ___ (occlusivo/subocclusivo).
- `livelli/occlusione (conclusione)` — Quadro radiologico ___ (occlusivo/subocclusivo).
- `aria-libera/pneumoperitoneo` — Falda aerea libera sottodiaframmatica ___, come da pneumoperitoneo.
- `aria-libera/pneumoperitoneo (conclusione)` — Pneumoperitoneo.
- `vie-urinarie/litiasi` — Radiopacità di ___ mm proiettivamente ___ (all'area renale/al decorso ureterale ___), sospetta per litiasi calcifica.
- `vie-urinarie/litiasi (conclusione)` — Radiopacità sospetta per litiasi ___.

#### Rachide cervicale (`rachide-cervicale`)

- `lordosi/rettilineizzazione` — Rettilineizzazione della fisiologica lordosi cervicale.
- `spazi/spondiloartrosi` — Riduzione in ampiezza degli spazi intersomatici ___, con osteofitosi margino-somatica, come per spondiloartrosi.
- `spazi/spondiloartrosi (conclusione)` — Spondiloartrosi cervicale.
- `fratture/frattura` — Rima di frattura ___ (composta/scomposta) a carico di ___.
- `fratture/frattura (conclusione)` — Frattura ___ di ___: utile TC.

#### Rachide dorsale (`rachide-dorsale`)

- `cifosi/accentuata` — Accentuazione della fisiologica cifosi dorsale.
- `fratture/crollo` — Riduzione in altezza del soma di ___ con deformazione a cuneo anteriore, di verosimile natura ___ (osteoporotica/post-traumatica).
- `fratture/crollo (conclusione)` — Crollo vertebrale di ___.

#### Rachide lombosacrale (`rachide-lombosacrale`)

- `lordosi/rettilineizzazione` — Rettilineizzazione della fisiologica lordosi lombosacrale.
- `muri/listesi` — ___ (Antero/Retro)listesi di ___ su ___ di grado ___ secondo Meyerding.
- `muri/listesi (conclusione)` — Listesi di ___ su ___.
- `artrosi/spondiloartrosi` — Segni di spondiloartrosi, con osteofitosi margino-somatica e riduzione in ampiezza degli spazi intersomatici ___.
- `artrosi/spondiloartrosi (conclusione)` — Spondiloartrosi lombare.
- `fratture/crollo` — Riduzione in altezza del soma di ___ con deformazione a cuneo anteriore, di verosimile natura ___ (osteoporotica/post-traumatica).
- `fratture/crollo (conclusione)` — Crollo vertebrale di ___.

#### Bacino (`bacino`)

- `fratture/femore-prossimale` — Rima di frattura ___ (sottocapitata/mediocervicale/basicervicale/pertrocanterica) del femore ___, ___ (composta/scomposta).
- `fratture/femore-prossimale (conclusione)` — Frattura ___ del femore ___.
- `fratture/branche` — Rima di frattura della branca ___ (ileo/ischio)-pubica ___.
- `fratture/branche (conclusione)` — Frattura della branca ___ pubica ___.

#### Segmento osseo (trauma) (`segmento-osseo`)

- `fratture/frattura` — Rima di frattura ___ (composta/scomposta) a carico di ___.
- `fratture/frattura (conclusione)` — Frattura ___ di ___.
- `articolazioni/lussazione` — Perdita dei rapporti articolari ___, come per lussazione ___.
- `articolazioni/lussazione (conclusione)` — Lussazione ___.

#### Emicostato (`emicostato`)

- `fratture/frattura` — Rima di frattura ___ (composta/scomposta) dell'arco ___ della ___ costa ___.
- `fratture/frattura (conclusione)` — Frattura costale ___.

## 2. Frasi `riscritta: true`: prima e dopo

Frasi riscritte nello stile telegrafico a partire dai testi del medico: **512** (Frasi comuni 6, Ecografia 294, TC 109, RM 78, RX 25).

- **Ecografia e frasi comuni**: «prima» è il testo esatto della versione precedente in `data.js` (commit `947c952`, prima della riscrittura).
- **TC, RX, RM** (e frasi comuni aggiunte dopo): «prima» è la frase (o le frasi, separate da ‖) del documento EL-DEA trovata **automaticamente** per somiglianza
  di parole: è un aiuto alla lettura, non una corrispondenza certa. Se non trovata, è indicato.
- `(invariata)`: il flag copre l'oggetto ma quel campo non è cambiato (es. la conclusione di un reperto riscritto).

### Frasi comuni

#### In testa (`premessa`)

| id | prima | dopo |
|---|---|---|
| `precedente` | Si prende in visione il precedente esame del ___ eseguito presso altra Sede. | Presa visione del precedente esame del ___, eseguito presso altra Sede. |
| `precedente-analogo` | L'esame è stato confrontato con il precedente analogo del . _(«1. TC NEGATIVO STANDARD EL-DEA»)_ | Confronto con il precedente esame analogo del ___. |
| `dea` | L'esame è stato eseguito e refertato in regime di urgenza ed emergenza, con valutazione mirata al quadro e al quesito clinico indicati. _(«1. TC NEGATIVO STANDARD EL-DEA»)_ | Esame eseguito e refertato in regime di urgenza ed emergenza, con valutazione mirata al quadro e al quesito clinico indicati. |

#### In coda (`chiusura`)

| id | prima | dopo |
|---|---|---|
| `controllo` | Si consiglia controllo ecografico a distanza di ___ mesi. | Consigliato controllo ecografico a distanza di ___ mesi. |
| `followup` | Si indica follow-up clinico-strumentale. | Indicato follow-up clinico-strumentale. |
| `addendum` | Seguirà valutazione dei reperti collaterali in un secondo momento, con eventuale addendum. _(«1. TC NEGATIVO STANDARD EL-DEA»)_ | Valutazione dei reperti collaterali in un secondo momento, con eventuale addendum. |

### Ecografia

#### Addome completo (`addome`)

| id | prima | dopo |
|---|---|---|
| `limiti/habitus` | Esame tecnicamente limitato dalla scarsa collaborazione del paziente e dall'habitus del paziente, e per la sovrapposizione di marcato meteorismo intestinale. | Esame tecnicamente limitato dalla scarsa collaborazione e dall'habitus del paziente, e per la sovrapposizione di marcato meteorismo intestinale. |
| `fegato/steatosi` | Il fegato appare ad ecostruttura iperriflettente come si osserva nei quadri di steatosi epatica, ha dimensioni ___ (nei limiti della norma/aumentate) ed è indenne da lesioni focali US risolvibili. | Fegato ad ecostruttura iperriflettente, come nei quadri di steatosi epatica, di dimensioni ___ (nei limiti della norma/aumentate) e indenne da lesioni focali US risolvibili. |
| `fegato/steatosi (conclusione)` | (invariata) | Steatosi epatica. |
| `fegato/angioma` | Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.<br>Al ___ segmento, in sede ___, presenza di focalità debolmente iperecogena di ___ mm, in prima ipotesi compatibile con angioma. Non si rilevano ulteriori evidenti lesioni focali. | Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.<br>Al ___ segmento, in sede ___, presenza di focalità debolmente iperecogena di ___ mm, in prima ipotesi compatibile con angioma. Non ulteriori evidenti lesioni focali. |
| `fegato/angioma (conclusione)` | (invariata) | Focalità epatica in prima ipotesi angiomatosa. |
| `fegato/angioma-noto` | Nel ___ segmento epatico si conferma la nota formazione iperecogena a margini polilobati, delle dimensioni massime di ___ x ___ mm, da riferire in prima ipotesi ad angioma. Non si rilevano ulteriori evidenti lesioni focali. | Nel ___ segmento epatico, conferma della nota formazione iperecogena a margini polilobati, delle dimensioni massime di ___ x ___ mm, da riferire in prima ipotesi ad angioma. Assenti ulteriori evidenti lesioni focali. |
| `fegato/cisti` | Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.<br>Al ___ segmento si documenta formazione anecogena a margini netti di ___ mm, a contenuto omogeneo, priva di setti interni e componente solida, di tipo cistico semplice. | Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.<br>Al ___ segmento, formazione anecogena a margini netti di ___ mm, a contenuto omogeneo, priva di setti interni e componente solida, di tipo cistico semplice. |
| `fegato/cisti (conclusione)` | (invariata) | Cisti epatica semplice. |
| `fegato/solida` | Al ___ segmento epatico si documenta formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm. Al color-Doppler si documenta/non si documenta vascolarizzazione interna. Si consiglia correlazione clinica e approfondimento diagnostico. | Al ___ segmento epatico, formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm. Al color-Doppler, presenza/assenza di vascolarizzazione interna. Consigliati correlazione clinica e approfondimento diagnostico. |
| `fegato/solida (conclusione)` | (invariata) | Formazione epatica solida meritevole di approfondimento diagnostico. |
| `fegato/secondarismi` | L'ecostruttura epatica è sovvertita per la presenza di plurime lesioni focali, variabili per aspetto e dimensioni, compatibili con secondarismi. Utile approfondimento diagnostico con esame TC. | Ecostruttura epatica sovvertita per la presenza di plurime lesioni focali, variabili per aspetto e dimensioni, compatibili con secondarismi. Utile approfondimento diagnostico con esame TC. |
| `fegato/secondarismi (conclusione)` | (invariata) | Lesioni focali epatiche multiple compatibili con secondarismi. |
| `fegato/cirrosi` | Fegato di dimensioni ___, con margini bozzuti ed ecostruttura grossolanamente disomogenea, come si osserva nei quadri di epatopatia cronica. Non evidenti lesioni focali US risolvibili. | Fegato di dimensioni ___, con margini bozzuti ed ecostruttura grossolanamente disomogenea, come nei quadri di epatopatia cronica. Non evidenti lesioni focali US risolvibili. |
| `fegato/cirrosi (conclusione)` | (invariata) | Quadro ecografico di epatopatia cronica. |
| `colecisti/concrezioni` | La colecisti nel proprio lume presenta alcune minute concrezioni calcifiche. | Colecisti con alcune minute concrezioni calcifiche nel lume. |
| `colecisti/concrezioni (conclusione)` | (invariata) | Microlitiasi della colecisti. |
| `colecisti/polipo` | Lungo il profilo ___ del corpo colecistico aggetta nel lume una formazione di aspetto polipoide di ___ mm, meritevole di controllo ecografico a distanza di circa 4 - 6 mesi in considerazione del primo riscontro. | Lungo il profilo ___ del corpo colecistico, formazione di aspetto polipoide di ___ mm aggettante nel lume, meritevole di controllo ecografico a distanza di circa 4 - 6 mesi in considerazione del primo riscontro. |
| `colecisti/polipo (conclusione)` | (invariata) | Formazione polipoide della colecisti. |
| `colecisti/colecistite` | Colecisti distesa, con pareti ispessite (___ mm) e stratificate, con formazione litiasica incuneata nel collo e segno di Murphy ecografico positivo, come si osserva nei quadri di colecistite acuta. | Colecisti distesa, con pareti ispessite (___ mm) e stratificate, con formazione litiasica incuneata nel collo e segno di Murphy ecografico positivo, come nei quadri di colecistite acuta. |
| `colecisti/colecistite (conclusione)` | (invariata) | Quadro ecografico compatibile con colecistite acuta: utile valutazione chirurgica. |
| `milza/accessoria` | Milza nei limiti morfo-volumetrici. All'ilo splenico si riconosce piccola formazione rotondeggiante isoecogena al parenchima splenico di ___ mm, compatibile con milza accessoria. | Milza nei limiti morfo-volumetrici. All'ilo splenico, piccola formazione rotondeggiante isoecogena al parenchima splenico di ___ mm, compatibile con milza accessoria. |
| `reni/cisti` | Al polo ___ del rene ___ si documenta una formazione ipoanecogena, con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm. | Al polo ___ del rene ___, formazione ipoanecogena con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm. |
| `reni/cisti (conclusione)` | (invariata) | Cisti renale. |
| `reni/cisti-multiple` | A livello dei reni si documentano alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___ di circa ___ mm. | A livello dei reni, alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___, di circa ___ mm. |
| `reni/cisti-multiple (conclusione)` | (invariata) | Cisti renali bilaterali. |
| `reni/cisti-note` | Sono invariate le note cisti corticali renali in sede bilaterale, la maggiore sita al polo ___ di ___ del diametro massimo di circa ___ mm. | Invariate le note cisti corticali renali in sede bilaterale, la maggiore sita al polo ___ di ___, del diametro massimo di circa ___ mm. |
| `reni/nefropatia` | Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come si osserva nei quadri di nefropatia cronica. | Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica. |
| `reni/nefropatia (conclusione)` | (invariata) | Segni ecografici di nefropatia cronica. |
| `vie-urinarie/calcoli-dx` | A destra si visualizzano ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche. | A destra, ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche. |
| `vie-urinarie/calcoli-dx (conclusione)` | (invariata) | Nefrolitiasi destra. |
| `vie-urinarie/calcoli-sx` | A sinistra si visualizzano ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; non sono dilatate le cavità calico-pieliche. | A sinistra, ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; cavità calico-pieliche non dilatate. |
| `vie-urinarie/calcoli-sx (conclusione)` | (invariata) | Nefrolitiasi sinistra. |
| `vescica/sedimento` | Vescica ben distesa nel cui lume si apprezza abbondante sedimento ematico; tale limite non consente un'adeguata valutazione delle pareti e pertanto si rimanda a valutazione specialistica. | Vescica ben distesa, con abbondante sedimento ematico nel lume: pareti non adeguatamente valutabili per tale limite; indicata valutazione specialistica. |
| `vescica/sovradistesa` | La vescica è sovradistesa con pareti sottili e lume libero; tale condizione non permette la valutazione della loggia prostatica. | Vescica sovradistesa, a pareti sottili e lume libero; loggia prostatica non valutabile per tale condizione. |
| `vescica/pareti` | Vescica distesa, con pareti diffusamente ispessite e trabecolate, come si osserva nei quadri di vescica da sforzo. | Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo. |
| `vescica/aggetto` | Vescica distesa; lungo la parete ___ si documenta formazione aggettante nel lume di ___ mm, meritevole di approfondimento specialistico urologico. | Vescica distesa; lungo la parete ___, formazione aggettante nel lume di ___ mm, meritevole di approfondimento specialistico urologico. |
| `vescica/aggetto (conclusione)` | (invariata) | Lesione vegetante vescicale meritevole di approfondimento urologico. |
| `prostata/ipertrofica` | La prostata esplorata per via sovrapubica, ha ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; il lobo medio impronta la base vescicale; volume di circa ___ cc. | Prostata, esplorata per via sovrapubica, ad ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; lobo medio improntante la base vescicale; volume di circa ___ cc. |
| `prostata/ipertrofica (conclusione)` | (invariata) | Ipertrofia prostatica. |
| `peritoneo (negativo)` | Non falde fluide nei recessi peritoneali esplorati. | Assenti falde fluide nei recessi peritoneali esplorati. |

#### Addome in urgenza (trauma) (`addome-urgenza`)

| id | prima | dopo |
|---|---|---|
| `parenchimi (negativo)` | Non si osservano alterazioni ecostrutturali da riferire alla natura post-traumatica a carico di fegato, milza, reni. | Non alterazioni ecostrutturali da riferire alla natura post-traumatica a carico di fegato, milza, reni. |
| `parenchimi/lesione` | A carico di ___ si documenta area disomogenea di ___ mm, sospetta per lesione post-traumatica; utile approfondimento diagnostico con esame TC. | A carico di ___, area disomogenea di ___ mm, sospetta per lesione post-traumatica; utile approfondimento diagnostico con esame TC. |
| `parenchimi/lesione (conclusione)` | (invariata) | Sospetta lesione post-traumatica di ___: utile TC. |

#### Reni e vie urinarie (`urinario`)

| id | prima | dopo |
|---|---|---|
| `reni/cisti` | Al polo ___ del rene ___ si documenta una formazione ipoanecogena, con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm. | Al polo ___ del rene ___, formazione ipoanecogena con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm. |
| `reni/cisti (conclusione)` | (invariata) | Cisti renale. |
| `reni/cisti-multiple` | A livello dei reni si documentano alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___ di circa ___ mm. | A livello dei reni, alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___, di circa ___ mm. |
| `reni/cisti-multiple (conclusione)` | (invariata) | Cisti renali bilaterali. |
| `reni/nefropatia` | Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come si osserva nei quadri di nefropatia cronica. | Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica. |
| `reni/nefropatia (conclusione)` | (invariata) | Segni ecografici di nefropatia cronica. |
| `vie-urinarie/calcoli-dx` | A destra si visualizzano ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche. | A destra, ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche. |
| `vie-urinarie/calcoli-dx (conclusione)` | (invariata) | Nefrolitiasi destra. |
| `vie-urinarie/calcoli-sx` | A sinistra si visualizzano ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; non sono dilatate le cavità calico-pieliche. | A sinistra, ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; cavità calico-pieliche non dilatate. |
| `vie-urinarie/calcoli-sx (conclusione)` | (invariata) | Nefrolitiasi sinistra. |
| `vescica/sedimento` | Vescica ben distesa nel cui lume si apprezza abbondante sedimento ematico; tale limite non consente un'adeguata valutazione delle pareti e pertanto si rimanda a valutazione specialistica. | Vescica ben distesa, con abbondante sedimento ematico nel lume: pareti non adeguatamente valutabili per tale limite; indicata valutazione specialistica. |
| `vescica/sovradistesa` | La vescica è sovradistesa con pareti sottili e lume libero; tale condizione non permette la valutazione della loggia prostatica. | Vescica sovradistesa, a pareti sottili e lume libero; loggia prostatica non valutabile per tale condizione. |
| `vescica/pareti` | Vescica distesa, con pareti diffusamente ispessite e trabecolate, come si osserva nei quadri di vescica da sforzo. | Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo. |
| `vescica/residuo` | Dopo minzione si documenta residuo vescicale di circa ___ cc. | Residuo vescicale post-minzionale di circa ___ cc. |
| `prostata/ipertrofica` | La prostata esplorata per via sovrapubica, ha ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; il lobo medio impronta la base vescicale; volume di circa ___ cc.<br>Vescica con pareti regolari, senza aggetti endoluminali, improntata sul pavimento dalla prostata ipertrofica. | Prostata, esplorata per via sovrapubica, ad ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; lobo medio improntante la base vescicale; volume di circa ___ cc.<br>Vescica con pareti regolari, senza aggetti endoluminali, improntata sul pavimento dalla prostata ipertrofica. |
| `prostata/ipertrofica (conclusione)` | (invariata) | Ipertrofia prostatica. |

#### Tiroide (`tiroide`)

| id | prima | dopo |
|---|---|---|
| `dimensioni/lobo-dx` | Tiroide in sede, con ingrandimento del lobo ___ che mostra diametro AP massimo di ___ mm, e normali spessore e dimensioni di istmo e lobo controlaterale. | Tiroide in sede, con ingrandimento del lobo ___ (diametro AP massimo di ___ mm) e normali spessore e dimensioni di istmo e lobo controlaterale. |
| `ecostruttura (negativo)` | L'ecostruttura ghiandolare è omogenea in assenza di formazioni nodulari. | Ecostruttura ghiandolare omogenea, senza formazioni nodulari. |
| `ecostruttura/tiroidite` | L'ecostruttura ghiandolare è disomogenea per la presenza di multiple formazioni ipoecogene confluenti, come si osserva nei quadri tiroiditici cronici. | Ecostruttura ghiandolare disomogenea per la presenza di multiple formazioni ipoecogene confluenti, come nei quadri tiroiditici cronici. |
| `ecostruttura/tiroidite (conclusione)` | (invariata) | Quadro ecografico di tiroidite cronica. |
| `ecostruttura/nodulo` | Nel contesto del lobo ___ si apprezza nodulo ad ecostruttura ___ (iso/ipo/iperecogena), delle dimensioni massime di ___ x ___ mm, caratterizzato da vascolarizzazione ___ (perilesionale/intralesionale/mista) al color-Doppler.<br>Non franche nodularità nel lobo controlaterale. | Nel contesto del lobo ___, nodulo ad ecostruttura ___ (iso/ipo/iperecogena), delle dimensioni massime di ___ x ___ mm, caratterizzato da vascolarizzazione ___ (perilesionale/intralesionale/mista) al color-Doppler.<br>Non franche nodularità nel lobo controlaterale. |
| `ecostruttura/nodulo (conclusione)` | (invariata) | Nodulo tiroideo del lobo ___. |
| `ecostruttura/nodulo-orletto` | Presenza di noduli isoecogeni, con orletto ipoecogeno, del diametro massimo di ___ mm.<br>All'esame color-Doppler tali formazioni presentano una vascolarizzazione prevalentemente periferica. | Presenza di noduli isoecogeni, con orletto ipoecogeno, del diametro massimo di ___ mm.<br>All'esame color-Doppler, vascolarizzazione prevalentemente periferica di tali formazioni. |
| `ecostruttura/multinodulare` | L'ecostruttura è sovvertita dalla presenza di numerose formazioni nodulari di differenti dimensioni ed ecostruttura prevalentemente mista, disomogeneamente ipo-isoecogena e con aree colloidocistiche contestuali, caratterizzate da vascolarizzazione mista, prevalentemente perilesionale.<br>Il nodulo maggiore è sito al terzo ___ del lobo ___ e mostra dimensioni di ___ x ___ mm. | Ecostruttura sovvertita dalla presenza di numerose formazioni nodulari di differenti dimensioni ed ecostruttura prevalentemente mista, disomogeneamente ipo-isoecogena e con aree colloidocistiche contestuali, caratterizzate da vascolarizzazione mista, prevalentemente perilesionale.<br>Nodulo maggiore sito al terzo ___ del lobo ___, di ___ x ___ mm. |
| `ecostruttura/multinodulare (conclusione)` | (invariata) | Tiroide multinodulare. |
| `ecostruttura/conglomerato` | Nel contesto del lobo ___ si apprezzano multiple aree pseudonodulari confluenti, a margini mal delimitabili, ad ecostruttura disomogeneamente iso-ipoecogena, costituenti un simil conglomerato di ___ x ___ mm sul piano trasversale e ___ mm sul piano longitudinale, disomogeneamente vascolarizzati. | Nel contesto del lobo ___, multiple aree pseudonodulari confluenti, a margini mal delimitabili, ad ecostruttura disomogeneamente iso-ipoecogena, costituenti un simil conglomerato di ___ x ___ mm sul piano trasversale e ___ mm sul piano longitudinale, disomogeneamente vascolarizzati. |
| `ecostruttura/lobo-occupato` | Il lobo ___ è sostanzialmente occupato in toto da una grossolana formazione nodulare ovalare, ben circoscritta, prevalentemente isoecogena e con alcune piccole componenti anecogene liquide contestuali, delle dimensioni massime assiali di ___ x ___ mm, caratterizzata da vascolarizzazione mista. | Lobo ___ sostanzialmente occupato in toto da una grossolana formazione nodulare ovalare, ben circoscritta, prevalentemente isoecogena e con alcune piccole componenti anecogene liquide contestuali, delle dimensioni massime assiali di ___ x ___ mm, caratterizzata da vascolarizzazione mista. |
| `vascolarizzazione (negativo)` | La vascolarizzazione ghiandolare non è aumentata. | Vascolarizzazione ghiandolare non aumentata. |
| `vascolarizzazione/aumentata` | La vascolarizzazione ghiandolare appare diffusamente aumentata all'integrazione con color-Doppler. | Vascolarizzazione ghiandolare diffusamente aumentata all'integrazione con color-Doppler. |
| `linfonodi (negativo)` | Non si osservano linfoadenopatie in sede laterocervicale bilaterale. | Assenti linfoadenopatie in sede laterocervicale bilaterale. |
| `linfonodi/reattivi` | In sede latero-cervicale bilaterale si osservano alcuni linfonodi di tipo reattivo, il maggiore a ___ del diametro massimo di ___ mm. | In sede latero-cervicale bilaterale, alcuni linfonodi di tipo reattivo, il maggiore a ___ del diametro massimo di ___ mm. |
| `sottomandibolari/nodulo` | In corrispondenza della ghiandola sottomandibolare ___ si documenta formazione nodulare ipoecogena a margini netti di ___ x ___ mm, priva di segnali vascolari intralesionali, meritevole di ulteriore approfondimento diagnostico mediante agobiopsia. | In corrispondenza della ghiandola sottomandibolare ___, formazione nodulare ipoecogena a margini netti di ___ x ___ mm, priva di segnali vascolari intralesionali, meritevole di ulteriore approfondimento diagnostico mediante agobiopsia. |
| `sottomandibolari/nodulo (conclusione)` | (invariata) | Nodulo della ghiandola sottomandibolare ___ meritevole di approfondimento. |

#### Linfonodi (`linfonodi`)

| id | prima | dopo |
|---|---|---|
| `premessa/linfoadenectomia` | In esiti di linfoadenectomia ___, non si riconoscono linfonodi ingranditi o con caratteristiche sospette nelle sedi esaminate. | In esiti di linfoadenectomia ___, non linfonodi ingranditi o con caratteristiche sospette nelle sedi esaminate. |
| `stazioni/reattivi` | Si documentano in queste sedi alcuni linfonodi ovalari, ipoecogeni, con ilo ben rappresentato e vascolarizzazione unipolare, tra i quali il maggiore localizzato in sede ___ delle dimensioni di ___ x ___ mm, tutti di aspetto ecografico reattivo-benigno. | In queste sedi, alcuni linfonodi ovalari, ipoecogeni, con ilo ben rappresentato e vascolarizzazione unipolare, tra i quali il maggiore localizzato in sede ___, delle dimensioni di ___ x ___ mm, tutti di aspetto ecografico reattivo-benigno. |
| `stazioni/reattivi-ingranditi` | In sede laterocervicale non linfonodi con caratteristiche di sovvertimento strutturale sospette per secondarietà.<br>In queste sedi si apprezzano alcuni linfonodi ipoecogeni, ovalari, con ilo ben rappresentato e vascolarizzazione unipolare, disposti in sede perigiugulare d'ambo i lati, i maggiori in sede ___, di aspetto reattivo-benigno, lievemente ingranditi con dimensioni massime di ___ x ___ mm.<br>Si indica follow-up clinico-strumentale. | In sede laterocervicale non linfonodi con caratteristiche di sovvertimento strutturale sospette per secondarietà.<br>In queste sedi, alcuni linfonodi ipoecogeni, ovalari, con ilo ben rappresentato e vascolarizzazione unipolare, disposti in sede perigiugulare d'ambo i lati, i maggiori in sede ___, di aspetto reattivo-benigno, lievemente ingranditi con dimensioni massime di ___ x ___ mm.<br>Indicato follow-up clinico-strumentale. |
| `stazioni/aumentati` | In sede ___ si riconoscono alcuni linfonodi di dimensioni nettamente aumentate, a morfologia ovalare e con ilo adiposo apparentemente riconoscibile, delle dimensioni massime di circa ___ mm.<br>I reperti descritti, in considerazione dell'anamnesi, sono meritevoli di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza. | In sede ___, alcuni linfonodi di dimensioni nettamente aumentate, a morfologia ovalare e con ilo adiposo apparentemente riconoscibile, delle dimensioni massime di circa ___ mm.<br>Reperti descritti meritevoli, in considerazione dell'anamnesi, di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza. |
| `stazioni/aumentati (conclusione)` | (invariata) | Linfonodi ___ di dimensioni aumentate meritevoli di valutazione specialistica. |
| `stazioni/inguinali` | In sede inguinale bilaterale si riconoscono alcuni linfonodi ovalari, con ilo adiposo visibile, delle dimensioni massime di circa ___ mm. | In sede inguinale bilaterale, alcuni linfonodi ovalari, con ilo adiposo visibile, delle dimensioni massime di circa ___ mm. |

#### Spalla (`spalla`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (invariata) | ECOGRAFIA DELLA SPALLA |
| `(distretto).intro` | È stata esaminata la spalla {lato}, sede della sintomatologia riferita. | Esame mirato alla spalla {lato}, sede della sintomatologia riferita. |
| `(distretto).introBilaterale` | Sono state esaminate entrambe le spalle. | Esame di entrambe le spalle. |
| `(distretto).conclusioneNegativa` | (invariata) | Quadro ecografico nei limiti della norma. |
| `acromion-claveare (negativo)` | L'articolazione acromion-claveare presenta morfologia conservata. | Articolazione acromion-claveare a morfologia conservata. |
| `acromion-claveare/artrosi` | L'articolazione acromion-claveare appare lievemente irregolare, con modesto assottigliamento della rima articolare e piccoli rilievi osteofitosici marginali. | Articolazione acromion-claveare lievemente irregolare, con modesto assottigliamento della rima articolare e piccoli rilievi osteofitosici marginali. |
| `cuffia (negativo)` | I tendini della cuffia dei rotatori (sovraspinato, sottospinato, sottoscapolare) appaiono regolari per spessore, margini ed ecostruttura fibrillare, senza evidenza di lesioni focali, discontinuità, calcificazioni o segni di tendinopatia; si osserva buon trofismo dei muscoli sovraspinato e infraspinato. | Tendini della cuffia dei rotatori (sovraspinato, sottospinato, sottoscapolare) regolari per spessore, margini ed ecostruttura fibrillare, senza evidenza di lesioni focali, discontinuità, calcificazioni o segni di tendinopatia; buon trofismo dei muscoli sovraspinato e infraspinato. |
| `cuffia/tendinosi-lieve` | Ha aspetto lievemente ipoecogeno il tendine sovraspinato in quadro compatibile con tendinosi.<br>Non si apprezzano alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete. | Tendine sovraspinato di aspetto lievemente ipoecogeno, in quadro compatibile con tendinosi.<br>Non alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete. |
| `cuffia/tendinosi-lieve (conclusione)` | (invariata) | Tendinosi del sovraspinato. |
| `cuffia/tendinopatia-cronica` | I tendini della cuffia dei rotatori, in particolare il sovraspinato, mostrano perdita della regolare struttura fibrillare ed aspetto ipoecogeno disomogeneo, in assenza di segni di avulsione, reperto compatibile con tendinopatia cronica. | Tendini della cuffia dei rotatori, in particolare il sovraspinato, con perdita della regolare struttura fibrillare ed aspetto ipoecogeno disomogeneo, senza segni di avulsione: reperto compatibile con tendinopatia cronica. |
| `cuffia/tendinopatia-cronica (conclusione)` | (invariata) | Tendinopatia cronica della cuffia dei rotatori. |
| `cuffia/tendinosi-calcificazioni` | Il tendine del sovraspinato appare marcatamente ispessito e disomogeneo, in particolare in sede inserzionale e pre-inserzionale come per tendinosi; nel suo contesto si osservano alcuni millimetrici spot iperecogeni da riferire a piccole calcificazioni. | Tendine del sovraspinato marcatamente ispessito e disomogeneo, in particolare in sede inserzionale e pre-inserzionale, come per tendinosi; nel suo contesto, alcuni millimetrici spot iperecogeni da riferire a piccole calcificazioni. |
| `cuffia/tendinosi-calcificazioni (conclusione)` | (invariata) | Tendinosi calcifica del sovraspinato. |
| `cuffia/tendinosi-calcifica` | Modeste alterazioni tendinosiche a carico del tendine sovraspinato che appare ispessito e disomogeneo con alcune minute calcificazioni in sede preinserzionale; analoghi reperti, di minore entità, in corrispondenza del tendine sottoscapolare.<br>Regolare ecostruttura fibrillare del tendine sottospinato. | Modeste alterazioni tendinosiche a carico del tendine sovraspinato, ispessito e disomogeneo, con alcune minute calcificazioni in sede preinserzionale; analoghi reperti, di minore entità, in corrispondenza del tendine sottoscapolare.<br>Regolare ecostruttura fibrillare del tendine sottospinato. |
| `cuffia/tendinosi-calcifica (conclusione)` | (invariata) | Tendinosi calcifica del sovraspinato e del sottoscapolare. |
| `cuffia/calcificazioni` | I tendini della cuffia dei rotatori presentano regolare aspetto fibrillare in assenza di evidenti lesioni.<br>Millimetriche calcificazioni sono riconoscibili all'inserzione del tendine ___. | Tendini della cuffia dei rotatori di regolare aspetto fibrillare, senza evidenti lesioni.<br>Millimetriche calcificazioni all'inserzione del tendine ___. |
| `cuffia/entesopatia-sottoscapolare` | Non evidenza di rotture tendinee, complete o parziali.<br>È disomogeneo il tendine sottoscapolare con alcune calcificazioni inserzionali lineari (la maggiore di ___ mm), come da entesopatia inserzionale calcifica.<br>Non si apprezzano alterazioni ecotomografiche a carico del sovraspinato e sottospinato. | Non evidenza di rotture tendinee, complete o parziali.<br>Tendine sottoscapolare disomogeneo, con alcune calcificazioni inserzionali lineari (la maggiore di ___ mm), come da entesopatia inserzionale calcifica.<br>Assenti alterazioni ecotomografiche a carico del sovraspinato e sottospinato. |
| `cuffia/entesopatia-sottoscapolare (conclusione)` | (invariata) | Entesopatia inserzionale calcifica del sottoscapolare. |
| `cuffia/fissurazione-capsulare` | Il tendine sovraspinato mostra lungo il versante capsulare un difetto della struttura fibrillare di circa ___ mm compatibile con fissurazione. | Tendine sovraspinato con difetto della struttura fibrillare lungo il versante capsulare, di circa ___ mm, compatibile con fissurazione. |
| `cuffia/fissurazione-capsulare (conclusione)` | (invariata) | Fissurazione del tendine sovraspinato. |
| `cuffia/fissurazione-spessore` | Si riconosce aspetto ispessito del tendine sovraspinato che mostra una fissurazione lineare a tutto spessore della porzione anteriore con associata falda fluida intrarticolare.<br>Non si apprezzano ulteriori alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete. | Tendine sovraspinato ispessito, con fissurazione lineare a tutto spessore della porzione anteriore e associata falda fluida intrarticolare.<br>Non ulteriori alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete. |
| `cuffia/fissurazione-spessore (conclusione)` | (invariata) | Fissurazione a tutto spessore del sovraspinato. |
| `cuffia/rottura-parziale` | Modeste alterazioni tendinosiche del sovraspinato che mostra una rottura non completa del fascio anteriore, interessante il tendine a tutto spessore. | Modeste alterazioni tendinosiche del sovraspinato, con rottura non completa del fascio anteriore, interessante il tendine a tutto spessore. |
| `cuffia/rottura-parziale (conclusione)` | (invariata) | Rottura parziale del tendine sovraspinato. |
| `cuffia/rottura-sottoscapolare` | Si osserva rottura pressoché completa del tendine del sottoscapolare.<br>Il tendine del sovraspinato presenta aspetto marcatamente ipoecogeno ed ispessito, in quadro di tendinosi, in assenza di franche lesioni di continuità; concomitano microcalcificazioni in sede inserzionale.<br>Si osservano alterazioni tendinosiche anche a carico del tendine del sottospinato. | Rottura pressoché completa del tendine del sottoscapolare.<br>Tendine del sovraspinato marcatamente ipoecogeno ed ispessito, in quadro di tendinosi, senza franche lesioni di continuità; concomitanti microcalcificazioni in sede inserzionale.<br>Alterazioni tendinosiche anche a carico del tendine del sottospinato. |
| `cuffia/rottura-sottoscapolare (conclusione)` | (invariata) | Rottura del tendine sottoscapolare. |
| `clb (negativo)` | Il tendine del capo lungo del bicipite brachiale è in sede, ben contenuto nella doccia bicipitale, con guaina peritendinea priva di distensione fluida. | Tendine del capo lungo del bicipite brachiale in sede, ben contenuto nella doccia bicipitale, con guaina peritendinea priva di distensione fluida. |
| `borsa (negativo)` | La borsa subacromion-deltoidea presenta pareti regolari e non risulta significativamente distesa da fluido. | Borsa subacromion-deltoidea a pareti regolari, non significativamente distesa da fluido. |
| `borsa/conflitto` | La borsa subacromion-deltoidea si presenta lievemente ispessita e ipoecogena, come frequentemente riscontrabile nei quadri di sindrome da conflitto subacromiale. | Borsa subacromion-deltoidea lievemente ispessita e ipoecogena, come frequentemente riscontrabile nei quadri di sindrome da conflitto subacromiale. |
| `borsa/conflitto (conclusione)` | (invariata) | Borsite subacromion-deltoidea. |
| `versamento (negativo)` | Non si rileva versamento nei recessi articolari esplorabili. | Non versamento nei recessi articolari esplorabili. |
| `versamento/epifisi` | Si rilevano diffuse alterazioni degenerative a carico dell'epifisi prossimale omerale. | Diffuse alterazioni degenerative a carico dell'epifisi prossimale omerale. |
| `versamento/versamento` | Si apprezza falda di versamento nei recessi articolari esplorabili. | Falda di versamento nei recessi articolari esplorabili. |
| `dinamica (negativo)` | Non si documentano segni dinamici di impingement subacromiale. | Assenti segni dinamici di impingement subacromiale. |
| `dinamica/impingement` | Alle manovre dinamiche si documentano segni di conflitto subacromiale. | Alle manovre dinamiche, segni di conflitto subacromiale. |
| `dinamica/impingement (conclusione)` | (invariata) | Segni dinamici di impingement subacromiale. |

#### Gomito (`gomito`)

| id | prima | dopo |
|---|---|---|
| `tendini/epicondilite` | Si documenta ecostruttura finemente disomogenea in sede pre-inserzionale del tendine comune degli estensori rispetto al controlato; all'integrazione con color-Doppler si apprezzano alcuni spot vascolari nel contesto; tali reperti sono compatibili in prima ipotesi con quadro di epicondilite.<br>Regolari reperti ecografici a carico del tendine comune dei flessori e del tendine tricipitale. | Ecostruttura finemente disomogenea in sede pre-inserzionale del tendine comune degli estensori rispetto al controlato; all'integrazione con color-Doppler, alcuni spot vascolari nel contesto: reperti compatibili in prima ipotesi con quadro di epicondilite.<br>Regolari reperti ecografici a carico del tendine comune dei flessori e del tendine tricipitale. |
| `tendini/epicondilite (conclusione)` | (invariata) | Quadro compatibile con epicondilite. |
| `tendini/epitrocleite` | Si documenta ecostruttura finemente disomogenea ed ispessimento in sede pre-inserzionale del tendine comune dei flessori rispetto al controlato, compatibile in prima ipotesi con quadro di epitrocleite.<br>Regolari reperti ecografici a carico del tendine comune degli estensori e del tendine tricipitale. | Ecostruttura finemente disomogenea ed ispessimento in sede pre-inserzionale del tendine comune dei flessori rispetto al controlato, compatibili in prima ipotesi con quadro di epitrocleite.<br>Regolari reperti ecografici a carico del tendine comune degli estensori e del tendine tricipitale. |
| `tendini/epitrocleite (conclusione)` | (invariata) | Quadro compatibile con epitrocleite. |
| `tendini/calcificazione` | Nella norma l'aspetto del tendine comune dei flessori; una millimetrica calcificazione (___ mm) si riconosce all'inserzione.<br>Nella norma l'aspetto del tendine comune degli estensori.<br>Nella norma l'aspetto del tendine tricipite all'inserzione olecranica, con riscontro di calcificazione inserzionale. | Nella norma l'aspetto del tendine comune dei flessori, con millimetrica calcificazione (___ mm) all'inserzione.<br>Regolare il tendine comune degli estensori.<br>Nella norma l'aspetto del tendine tricipite all'inserzione olecranica, con riscontro di calcificazione inserzionale. |
| `versamento/versamento` | Si rileva una raccolta fluida corpuscolata nel contesto della capsula articolare del gomito, senza evidenti segnali vascolari all'integrazione con box colore, da versamento intrarticolare.<br>Reperto meritevole di integrazione con esami ematochimici ed eventuale RX per la valutazione dei capi ossei affrontati. | Raccolta fluida corpuscolata nel contesto della capsula articolare del gomito, senza evidenti segnali vascolari all'integrazione con box colore, da versamento intrarticolare.<br>Reperto meritevole di integrazione con esami ematochimici ed eventuale RX per la valutazione dei capi ossei affrontati. |
| `versamento/versamento (conclusione)` | (invariata) | Versamento articolare. |
| `borsa-olecranica (negativo)` | Non distensione della borsa olecranica. | Borsa olecranica non distesa. |
| `ulnare/impingement` | L'esame ecografico evidenzia marcato ispessimento (___ mm) ipoecogeno, con perdita della normale fascicolazione, del nervo ulnare a livello della doccia ossea in quadro di impingement; i reperti sono da correlare con esame elettromiografico.<br>Non segni di sublussazione del nervo durante le manovre dinamiche né formazioni cistiche-ossee nel canale ulnare. | Marcato ispessimento (___ mm) ipoecogeno, con perdita della normale fascicolazione, del nervo ulnare a livello della doccia ossea, in quadro di impingement; reperti da correlare con esame elettromiografico.<br>Non segni di sublussazione del nervo durante le manovre dinamiche né formazioni cistiche-ossee nel canale ulnare. |
| `ulnare/impingement (conclusione)` | (invariata) | Quadro compatibile con sofferenza del nervo ulnare al canale cubitale. |
| `tessuti/tumefazione` | Si documenta ispessimento ed imbibizione dei tessuti molli sottocutanei in sede sovrafasciale, dello spessore massimo di circa ___ mm, nel cui contesto si osserva raccolta fluida con alcuni tralci iperecogeni, a margini lievemente irregolari delle dimensioni massime di ___ x ___ mm, priva di segnali vascolari al color-Doppler. | Ispessimento ed imbibizione dei tessuti molli sottocutanei in sede sovrafasciale, dello spessore massimo di circa ___ mm, nel cui contesto raccolta fluida con alcuni tralci iperecogeni, a margini lievemente irregolari delle dimensioni massime di ___ x ___ mm, priva di segnali vascolari al color-Doppler. |

#### Polso e mano (`polso-mano`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (invariata) | ECOGRAFIA DEL POLSO E DELLA MANO |
| `(distretto).intro` | Esame mirato alla valutazione del polso ___ (e della mano) {lato}, sede della sintomatologia riferita. | Esame mirato alla valutazione del polso (e della mano) {lato}, sede della sintomatologia riferita. |
| `(distretto).conclusioneNegativa` | (invariata) | Quadro ecografico nei limiti della norma. |
| `tunnel (negativo)` | Appaiono regolarmente rappresentate le strutture del tunnel carpale, in assenza di falde fluide all'interno o a monte dello stesso.<br>Regolare diametro, ecogenicità e aspetto fibrillare dei nervi mediano e ulnare. | Strutture del tunnel carpale regolarmente rappresentate, senza falde fluide all'interno o a monte dello stesso.<br>Regolare diametro, ecogenicità e aspetto fibrillare dei nervi mediano e ulnare. |
| `tunnel/tunnel-carpale` | Il nervo mediano appare ispessito ed ipoecogeno all'ingresso del canale carpale, con area di sezione trasversa di ___ mm², come si osserva nei quadri di sindrome del tunnel carpale; utile correlazione con esame elettromiografico. | Nervo mediano ispessito ed ipoecogeno all'ingresso del canale carpale, con area di sezione trasversa di ___ mm², come nei quadri di sindrome del tunnel carpale; utile correlazione con esame elettromiografico. |
| `tunnel/tunnel-carpale (conclusione)` | (invariata) | Quadro compatibile con sindrome del tunnel carpale. |
| `tendini/de-quervain` | Si documenta aspetto lievemente disomogeneo dei tendini abduttore lungo ed estensore breve del pollice, associato a minimo ispessimento del retinacolo, dello spessore massimo di circa ___ mm come da iniziale tenosinovite di de Quervain; utile valutazione specialistica. | Aspetto lievemente disomogeneo dei tendini abduttore lungo ed estensore breve del pollice, associato a minimo ispessimento del retinacolo, dello spessore massimo di circa ___ mm come da iniziale tenosinovite di de Quervain; utile valutazione specialistica. |
| `tendini/de-quervain (conclusione)` | (invariata) | Tenosinovite di de Quervain. |
| `tendini/sclerosante` | Si documenta ispessimento del retinacolo degli estensori del I compartimento in assenza di falde fluide peritendinee come da tenosinovite sclerosante. | Ispessimento del retinacolo degli estensori del I compartimento, senza falde fluide peritendinee, come da tenosinovite sclerosante. |
| `tendini/sclerosante (conclusione)` | (invariata) | Tenosinovite stenosante di de Quervain. |
| `tendini/de-quervain-negativo` | È regolare l'aspetto ecografico dei tendini estensore breve ed abduttore lungo del pollice, senza fluido nelle relative guaine. | Regolare l'aspetto ecografico dei tendini estensore breve ed abduttore lungo del pollice, senza fluido nelle relative guaine. |
| `tendini/ii-compartimento` | Si osserva lieve distensione fluida della guaina dei tendini estensore radiale breve e lungo del carpo e, minima, dell'estensore breve del pollice.<br>Regolari per ecostruttura i tendini del comparto degli estensori e flessori del polso. | Lieve distensione fluida della guaina dei tendini estensore radiale breve e lungo del carpo e, minima, dell'estensore breve del pollice.<br>Regolari per ecostruttura i tendini del comparto degli estensori e flessori del polso. |
| `tendini/ii-compartimento (conclusione)` | (invariata) | Tenosinovite del II compartimento degli estensori. |
| `tendini/frc` | Si rileva distensione fluida della guaina del tendine flessore radiale del carpo, che appare continuo.<br>Regolare spessore ed aspetto fibrillare dei tendini estensori. | Distensione fluida della guaina del tendine flessore radiale del carpo, tendine continuo.<br>Regolare spessore ed aspetto fibrillare dei tendini estensori. |
| `tendini/dito-scatto` | Si documenta ispessimento ipoecogeno della puleggia A1 del ___ dito, con tendine flessore lievemente ispessito e scorrimento a scatto alle manovre dinamiche. | Ispessimento ipoecogeno della puleggia A1 del ___ dito, con tendine flessore lievemente ispessito e scorrimento a scatto alle manovre dinamiche. |
| `tendini/dito-scatto (conclusione)` | (invariata) | Quadro compatibile con dito a scatto. |
| `cisti/articolare` | Sul versante ___ del polso, in continuità con l'articolazione, è apprezzabile una formazione anecogena, corpuscolata, del diametro massimo di ___ x ___ mm: tale reperto è compatibile con cisti articolare. | Sul versante ___ del polso, in continuità con l'articolazione, formazione anecogena, corpuscolata, del diametro massimo di ___ x ___ mm, compatibile con cisti articolare. |
| `cisti/articolare (conclusione)` | (invariata) | Cisti articolare del polso. |
| `cisti/tendinea` | Si riconosce formazione anecogena a contenuto in parte corpuscolato che avvolge la porzione più superficiale del tendine ___, delle dimensioni massime di circa ___ x ___ mm, a circa ___ mm di profondità dal piano cutaneo. La formazione, che appare priva di segnali vascolari al color-Doppler, è compatibile con cisti tendinea. | Formazione anecogena a contenuto in parte corpuscolato, avvolgente la porzione più superficiale del tendine ___, delle dimensioni massime di circa ___ x ___ mm, a circa ___ mm di profondità dal piano cutaneo. Formazione priva di segnali vascolari al color-Doppler, compatibile con cisti tendinea. |
| `cisti/tendinea (conclusione)` | (invariata) | Cisti tendinea. |
| `cisti/palmare` | A livello della regione palmare della mano, in corrispondenza della tumefazione obiettivabile, si evidenzia formazione ipo-anecogena di aspetto cistico con morfologia ovalare delle dimensioni di ___ x ___ mm con piano di clivaggio rispetto al sottostante tendine flessore del ___ raggio. | A livello della regione palmare della mano, in corrispondenza della tumefazione obiettivabile, formazione ipo-anecogena di aspetto cistico con morfologia ovalare delle dimensioni di ___ x ___ mm con piano di clivaggio rispetto al sottostante tendine flessore del ___ raggio. |
| `articolazioni/rizoartrosi` | Microcalcificazioni si riconoscono a livello dell'articolazione trapezio-metacarpale come per fenomeni degenerativi.<br>Non si riconosce distensione fluida intrarticolare trapezio-metacarpale né metacarpo-falangea, né accentuata vascolarizzazione della capsula all'integrazione color-Doppler. | Microcalcificazioni a livello dell'articolazione trapezio-metacarpale, come per fenomeni degenerativi.<br>Non distensione fluida intrarticolare trapezio-metacarpale né metacarpo-falangea, né accentuata vascolarizzazione della capsula all'integrazione color-Doppler. |
| `articolazioni/rizoartrosi (conclusione)` | (invariata) | Rizoartrosi. |
| `dita/corpo-estraneo` | A livello del terzo ___ si riconosce una formazione lineare delle dimensioni di ___ x ___ mm compatibile con corpo estraneo, circondata da un alone di ipoecogenicità verosimilmente attribuibile a tessuto di granulazione. | A livello del terzo ___, formazione lineare delle dimensioni di ___ x ___ mm compatibile con corpo estraneo, circondata da un alone di ipoecogenicità verosimilmente attribuibile a tessuto di granulazione. |
| `dita/corpo-estraneo (conclusione)` | (invariata) | Corpo estraneo nei tessuti molli. |
| `dita/imbibizione` | In tale sede si riconosce unicamente imbibizione edematosa dei tessuti molli.<br>Integro l'aspetto del tendine estensore del dito. | In tale sede, unicamente imbibizione edematosa dei tessuti molli.<br>Integro l'aspetto del tendine estensore del dito. |

#### Anca (`anca`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (invariata) | ECOGRAFIA DELLE ANCHE |
| `(distretto).intro` | Sono state esaminate le regioni pertrocanteriche da ambo i lati. | Esame delle regioni pertrocanteriche da ambo i lati. |
| `(distretto).conclusioneNegativa` | (invariata) | Quadro ecografico nei limiti della norma. |
| `borse (negativo)` | Non si riconoscono distensioni fluide delle borse trocanteriche. | Non distensioni fluide delle borse trocanteriche. |
| `borse/entesopatia` | Fenomeni di entesopatia si riconoscono a livello di ___ (entrambi i grandi trocanteri). | Fenomeni di entesopatia a livello di ___ (entrambi i grandi trocanteri). |
| `coxofemorale (negativo)` | Non si riconoscono falde di versamento coxo-femorale bilateralmente. | Assenti falde di versamento coxo-femorale bilateralmente. |
| `coxofemorale/artrosi` | Si documenta lieve irregolarità del profilo corticale osseo della testa femorale come per fenomeni degenerativo-artrosici di grado modesto. | Lieve irregolarità del profilo corticale osseo della testa femorale, come per fenomeni degenerativo-artrosici di grado modesto. |

#### Anca neonatale (`anca-neonatale`)

| id | prima | dopo |
|---|---|---|
| `graf (negativo)` | Proiezioni coronali standard secondo Graf evidenziano entrambe le anche in asse, con tetto acetabolare osseo ben conformato e normale copertura della testa femorale. A sinistra l'angolo α misura circa ___° e l'angolo β ___°, a destra l'angolo α è ___° e l'angolo β ___°. Questi valori rientrano nei parametri di un'anca di tipo I secondo Graf, compatibile con sviluppo articolare maturo. | Proiezioni coronali standard secondo Graf: entrambe le anche in asse, con tetto acetabolare osseo ben conformato e normale copertura della testa femorale. A sinistra angolo α di circa ___° e angolo β di ___°, a destra angolo α di ___° e angolo β di ___°. Valori nei parametri di un'anca di tipo I secondo Graf, compatibile con sviluppo articolare maturo. |
| `graf/immatura` | Proiezioni coronali standard secondo Graf. A destra l'angolo α misura circa ___° e l'angolo β ___°; a sinistra l'angolo α è ___° e l'angolo β ___°.<br>L'anca ___ rientra nel tipo ___ secondo Graf; utile controllo ecografico a distanza di ___ settimane e valutazione specialistica ortopedica. | Proiezioni coronali standard secondo Graf. A destra angolo α di circa ___° e angolo β di ___°; a sinistra angolo α di ___° e angolo β di ___°.<br>Anca ___ di tipo ___ secondo Graf; utile controllo ecografico a distanza di ___ settimane e valutazione specialistica ortopedica. |
| `graf/immatura (conclusione)` | (invariata) | Anca ___ di tipo ___ secondo Graf. |

#### Coscia e gamba (muscoli) (`coscia-gamba`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (invariata) | ECOGRAFIA MUSCOLARE |
| `(distretto).intro` | È stata esaminata la regione ___ della ___ (coscia/gamba) {lato}, sede della sintomatologia riferita, anche in comparativa con il controlato. | Esame mirato alla regione ___ della ___ (coscia/gamba) {lato}, sede della sintomatologia riferita, anche in comparativa con il controlato. |
| `(distretto).conclusioneNegativa` | (invariata) | Quadro ecografico nei limiti della norma. |
| `muscoli/lesione` | A livello del muscolo ___ si documenta alterazione ecostrutturale con area ___ (ipoecogena/anecogena/disomogenea) delle dimensioni di ___ x ___ mm, compatibile con lesione muscolare. | A livello del muscolo ___, alterazione ecostrutturale con area ___ (ipoecogena/anecogena/disomogenea) delle dimensioni di ___ x ___ mm, compatibile con lesione muscolare. |
| `muscoli/lesione (conclusione)` | (invariata) | Lesione del muscolo ___. |
| `muscoli/retto-femorale` | È regolare la struttura del ventre muscolare del retto femorale, in assenza di immagini compatibili con rottura.<br>È regolare l'inserzione prossimale del retto femorale sulla spina iliaca. | Regolare la struttura del ventre muscolare del retto femorale, senza immagini compatibili con rottura.<br>Nella norma l'inserzione prossimale del retto femorale sulla spina iliaca. |
| `muscoli/flessori` | Non si riconoscono alterazioni strutturali dei ventri dei muscoli flessori della coscia né delle giunzioni miotendinee.<br>Conservata la struttura fibrillare dei relativi tendini. | Non alterazioni strutturali dei ventri dei muscoli flessori della coscia né delle giunzioni miotendinee.<br>Conservata la struttura fibrillare dei relativi tendini. |
| `falde (negativo)` | Non si rilevano falde fluide perimuscolari. | Assenti falde fluide perimuscolari. |
| `falde/ematoma` | Si documenta raccolta fluida disomogenea di ___ x ___ mm in sede ___, compatibile con ematoma. | Raccolta fluida disomogenea di ___ x ___ mm in sede ___, compatibile con ematoma. |

#### Ginocchio (`ginocchio`)

| id | prima | dopo |
|---|---|---|
| `tendini (negativo)` | Si documenta regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, del tendine rotuleo e dei legamenti collaterali mediale (LCM) e laterale (LCL). | Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, del tendine rotuleo e dei legamenti collaterali mediale (LCM) e laterale (LCL). |
| `tendini/entesopatia` | Si documenta regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, quest'ultimo in presenza di segni di entesopatia calcifica al polo rotuleo superiore.<br>Regolari reperti il tendine rotuleo e i legamenti collaterali. | Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, quest'ultimo con segni di entesopatia calcifica al polo rotuleo superiore.<br>Regolari il tendine rotuleo e i legamenti collaterali. |
| `tendini/entesopatia (conclusione)` | (invariata) | Entesopatia calcifica quadricipitale. |
| `tendini/rotuleo` | Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale.<br>Il tendine rotuleo appare ispessito e disomogeneamente ipoecogeno in sede prossimale, come per tendinopatia.<br>Regolari i legamenti collaterali. | Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale.<br>Tendine rotuleo ispessito e disomogeneamente ipoecogeno in sede prossimale, come per tendinopatia.<br>Regolari i legamenti collaterali. |
| `tendini/rotuleo (conclusione)` | (invariata) | Tendinopatia rotulea. |
| `menischi (negativo)` | Non estrusione delle fibro-cartilagini meniscali. | Fibro-cartilagini meniscali non estruse. |
| `menischi/laterale` | Si segnala aspetto disomogeneo e protruso esternamente della porzione esplorabile del menisco ___; utile a giudizio clinico approfondimento diagnostico con esame RM. | Aspetto disomogeneo e protruso esternamente della porzione esplorabile del menisco ___; utile a giudizio clinico approfondimento diagnostico con esame RM. |
| `versamento/artrosi` | Si osservano segni di degenerazione artrosica in presenza di sottile falda fluida nel recesso sottoquadricipitale. | Segni di degenerazione artrosica, con sottile falda fluida nel recesso sottoquadricipitale. |
| `versamento/artrosi (conclusione)` | (invariata) | Segni di gonartrosi. |
| `versamento/versamento` | Si documenta versamento articolare nel recesso sottoquadricipitale, dello spessore di ___ mm. | Versamento articolare nel recesso sottoquadricipitale, dello spessore di ___ mm. |
| `versamento/versamento (conclusione)` | (invariata) | Versamento articolare. |
| `popliteo/baker` | Si documenta distensione fluida della borsa gastrocnemio-semimembranosa con contenuto ___ (finemente corpuscolato) (cisti di Baker) delle dimensioni massime di ___ x ___ mm. | Distensione fluida della borsa gastrocnemio-semimembranosa con contenuto ___ (finemente corpuscolato) (cisti di Baker) delle dimensioni massime di ___ x ___ mm. |
| `popliteo/baker (conclusione)` | (invariata) | Cisti di Baker. |
| `popliteo/baker-spot` | Si conferma la presenza di distensione fluida della borsa del gastrocnemio-semimembranoso delle dimensioni massime di circa ___ x ___ mm, a contenuto fluido-corpuscolato, caratterizzato da alcuni spot vascolari nel contesto (sinoviali?). | Confermata la distensione fluida della borsa del gastrocnemio-semimembranoso delle dimensioni massime di circa ___ x ___ mm, a contenuto fluido-corpuscolato, caratterizzato da alcuni spot vascolari nel contesto (sinoviali?). |
| `popliteo/baker-spot (conclusione)` | (invariata) | Cisti di Baker. |

#### Caviglia e piede (`caviglia-piede`)

| id | prima | dopo |
|---|---|---|
| `peronei/falda` | Regolare ecostruttura fibrillare dei tendini peronei lungo e breve, che presentano sottile falda fluida peritendinea. | Regolare ecostruttura fibrillare dei tendini peronei lungo e breve, con sottile falda fluida peritendinea. |
| `legamenti-tibiali (negativo)` | Regolare il legamento peroneo-astragalico anteriore e i tendini tibiale anteriore e posteriore. | Legamento peroneo-astragalico anteriore e tendini tibiale anteriore e posteriore nella norma. |
| `legamenti-tibiali/paa` | Il legamento peroneo-astragalico anteriore appare ispessito e disomogeneamente ipoecogeno, con perdita della regolare struttura fibrillare, come per lesione ___ (parziale/completa).<br>Regolari i tendini tibiale anteriore e posteriore. | Legamento peroneo-astragalico anteriore ispessito e disomogeneamente ipoecogeno, con perdita della regolare struttura fibrillare, come per lesione ___ (parziale/completa).<br>Regolari i tendini tibiale anteriore e posteriore. |
| `legamenti-tibiali/paa (conclusione)` | (invariata) | Lesione del legamento peroneo-astragalico anteriore. |
| `legamenti-tibiali/tibiale-posteriore` | Regolare il legamento peroneo-astragalico anteriore e il tendine tibiale anteriore.<br>Si documenta aspetto disomogeneo ed ispessito del tendine tibiale posteriore in sede sottomalleolare, compatibile con fissurazione, associato alla presenza di una falda ipoecogena nella guaina propria, che posteriormente risale in sede retro-malleolare, compatibile con falda di ematoma. | Regolare il legamento peroneo-astragalico anteriore e il tendine tibiale anteriore.<br>Tendine tibiale posteriore disomogeneo ed ispessito in sede sottomalleolare, compatibile con fissurazione, associato alla presenza di una falda ipoecogena nella guaina propria, estesa posteriormente in sede retro-malleolare, compatibile con falda di ematoma. |
| `legamenti-tibiali/tibiale-posteriore (conclusione)` | (invariata) | Fissurazione del tendine tibiale posteriore. |
| `achille/entesopatia` | Nel tendine d'Achille, a livello preinserzionale calcaneare, sono riconoscibili tenui calcificazioni in quadro di entesopatia, senza segni di rottura.<br>Non si riconoscono falde fluide peritendinee. | Nel tendine d'Achille, a livello preinserzionale calcaneare, tenui calcificazioni in quadro di entesopatia, senza segni di rottura.<br>Non falde fluide peritendinee. |
| `achille/entesopatia (conclusione)` | (invariata) | Entesopatia achillea. |
| `achille/tendinopatia` | Si documenta ispessimento fusiforme del tendine d'Achille, dello spessore massimo di circa ___ mm (vs. ___ mm del controlato), di aspetto disomogeneamente ipoecogeno come si osserva nei casi di tendinopatia; la regione inserzionale è mal valutabile per la presenza di grossolane immagini calcifiche del diametro massimo complessivo di circa ___ mm.<br>Il reperto è compatibile con entesopatia calcaneale calcifica; si consiglia integrazione con esame RX. | Ispessimento fusiforme del tendine d'Achille, dello spessore massimo di circa ___ mm (vs. ___ mm del controlato), di aspetto disomogeneamente ipoecogeno come nei casi di tendinopatia; regione inserzionale mal valutabile per la presenza di grossolane immagini calcifiche del diametro massimo complessivo di circa ___ mm.<br>Reperto compatibile con entesopatia calcaneale calcifica; consigliata integrazione con esame RX. |
| `achille/tendinopatia (conclusione)` | (invariata) | Tendinopatia achillea con entesopatia calcaneale calcifica. |
| `retrocalcaneare/falda` | Una minima falda fluida si riconosce nella borsa retrocalcaneare. | Minima falda fluida nella borsa retrocalcaneare. |
| `fascia/ispessita` | In quadro di entesopatia calcifica retro- e sottocalcaneare, risulta lievemente ispessita, senza segni di rottura, la fascia plantare. | In quadro di entesopatia calcifica retro- e sottocalcaneare, fascia plantare lievemente ispessita, senza segni di rottura. |
| `fascia/ispessita (conclusione)` | (invariata) | Ispessimento della fascia plantare con entesopatia calcifica (sperone calcaneare). |
| `versamento/trauma` | Nella sede della tumefazione clinicamente obiettivabile pare apprezzarsi interruzione della corticale ossea del malleolo peroneale in presenza di versamento intra-articolare.<br>Il reperto è meritevole di valutazione con esame radiografico mirato ed eventuale completamento con esame RM. | Nella sede della tumefazione clinicamente obiettivabile pare apprezzarsi interruzione della corticale ossea del malleolo peroneale in presenza di versamento intra-articolare.<br>Reperto meritevole di valutazione con esame radiografico mirato ed eventuale completamento con esame RM. |
| `versamento/trauma (conclusione)` | (invariata) | Sospetta interruzione corticale del malleolo peroneale: utile RX. |

#### Tessuti molli (tumefazione) (`tessuti-molli`)

| id | prima | dopo |
|---|---|---|
| `sottocute (negativo)` | In tale sede si evidenzia una regolare rappresentazione del tessuto adiposo sottocutaneo, in assenza di evidenti formazioni solide e/o liquide nel contesto. | In tale sede, regolare rappresentazione del tessuto adiposo sottocutaneo, senza evidenti formazioni solide e/o liquide nel contesto. |
| `sottocute/lipoma` | A tale livello, nel contesto del tessuto sottocutaneo in sede sovrafasciale, si riconosce formazione ovalare a margini netti, ad ecostruttura mista prevalentemente ipoecogena con tralci iperecogeni nel contesto, delle dimensioni massime di ___ x ___ mm; la distanza tra il piano cutaneo ed il margine superficiale della lesione è di circa ___ mm.<br>La formazione, priva di significativi segnali vascolari al color-Doppler, è riferibile in prima ipotesi a fibrolipoma. | A tale livello, nel contesto del tessuto sottocutaneo in sede sovrafasciale, formazione ovalare a margini netti, ad ecostruttura mista prevalentemente ipoecogena con tralci iperecogeni nel contesto, delle dimensioni massime di ___ x ___ mm; distanza tra il piano cutaneo ed il margine superficiale della lesione di circa ___ mm.<br>Formazione priva di significativi segnali vascolari al color-Doppler, riferibile in prima ipotesi a fibrolipoma. |
| `sottocute/lipoma (conclusione)` | (invariata) | Formazione sottocutanea riferibile in prima ipotesi a fibrolipoma. |
| `sottocute/lipoma-intramuscolare` | A tale livello, in sede sottofasciale, nel contesto della porzione ___ del muscolo ___, è presente formazione ovalare a margini netti, tenuemente iperecogena con tralci fibrosi nel contesto, delle dimensioni massime di circa ___ x ___ mm, priva di segnali vascolari al color-Doppler.<br>La porzione più superficiale della formazione è localizzata a circa ___ mm dal piano cutaneo.<br>Il reperto è compatibile in prima ipotesi con lipoma intramuscolare; utile valutazione specialistica. | A tale livello, in sede sottofasciale, nel contesto della porzione ___ del muscolo ___, formazione ovalare a margini netti, tenuemente iperecogena con tralci fibrosi nel contesto, delle dimensioni massime di circa ___ x ___ mm, priva di segnali vascolari al color-Doppler.<br>Porzione più superficiale della formazione a circa ___ mm dal piano cutaneo.<br>Reperto compatibile in prima ipotesi con lipoma intramuscolare; utile valutazione specialistica. |
| `sottocute/lipoma-intramuscolare (conclusione)` | (invariata) | Lipoma intramuscolare. |
| `sottocute/lipomi-multipli` | Si riconoscono, nel contesto del tessuto adiposo sottocutaneo, formazioni ovalari a margini netti e struttura adiposa, con componente fibrosa variabile, privi di alterazioni vascolari all'esame color-Doppler e compatibili con lipomi. | Nel contesto del tessuto adiposo sottocutaneo, formazioni ovalari a margini netti e struttura adiposa, con componente fibrosa variabile, prive di alterazioni vascolari all'esame color-Doppler e compatibili con lipomi. |
| `sottocute/lipomi-multipli (conclusione)` | (invariata) | Lipomi sottocutanei multipli. |
| `sottocute/cisti-sebacea` | Nel contesto del tessuto sottocutaneo si documenta formazione ovalare del diametro massimo di ___ mm, ad ecostruttura ipo-anecogena di aspetto cistico con componente in parte corpuscolata nel contesto, priva di segnali vascolari all'integrazione con color-Doppler.<br>Tale reperto è riferibile in prima ipotesi a cisti sebacea. | Nel contesto del tessuto sottocutaneo, formazione ovalare del diametro massimo di ___ mm, ad ecostruttura ipo-anecogena di aspetto cistico con componente in parte corpuscolata nel contesto, priva di segnali vascolari all'integrazione con color-Doppler.<br>Reperto riferibile in prima ipotesi a cisti sebacea. |
| `sottocute/cisti-sebacea (conclusione)` | (invariata) | Cisti sebacea. |
| `sottocute/cisti` | Nel contesto dei tessuti molli sottocutanei si riconosce una formazione ___ (ovalare/polilobata) ipo-anecogena a margini netti di ___ x ___ mm, con rinforzo ecografico di parete posteriore, priva di segnali vascolari all'integrazione con box colore.<br>La formazione, di aspetto cistico, è meritevole di monitoraggio clinico. | Nel contesto dei tessuti molli sottocutanei, formazione ___ (ovalare/polilobata) ipo-anecogena a margini netti di ___ x ___ mm, con rinforzo ecografico di parete posteriore, priva di segnali vascolari all'integrazione con box colore.<br>Formazione di aspetto cistico, meritevole di monitoraggio clinico. |
| `sottocute/cisti (conclusione)` | (invariata) | Formazione cistica sottocutanea. |
| `sottocute/solida` | Si documenta formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm, in sede ___. Al color-Doppler si documenta/non si documenta vascolarizzazione interna. Si consiglia correlazione clinica e approfondimento diagnostico. | Formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm, in sede ___. Al color-Doppler, presenza/assenza di vascolarizzazione interna. Consigliati correlazione clinica e approfondimento diagnostico. |
| `sottocute/solida (conclusione)` | (invariata) | Formazione solida dei tessuti molli meritevole di approfondimento. |
| `sottocute/adiposo` | In tale sede non si riconoscono immagini compatibili con lipoma né formazioni cistiche. Appare unicamente maggiormente rappresentato il tessuto adiposo sottocutaneo a tale livello, in comparazione con il controlato. | In tale sede, non immagini compatibili con lipoma né formazioni cistiche. Unicamente maggiore rappresentazione del tessuto adiposo sottocutaneo a tale livello, in comparazione con il controlato. |
| `sottocute/esiti-chirurgici` | Nella sede di recente intervento non si riscontrano raccolte. È riconoscibile unicamente modesta disomogeneità dei tessuti in esiti chirurgici. | Nella sede di recente intervento, assenti raccolte. Unicamente modesta disomogeneità dei tessuti in esiti chirurgici. |
| `sottocute/raccolta` | Si documenta raccolta fluida disomogenea, a margini irregolari, di ___ x ___ mm, con iperemia perilesionale al color-Doppler, in prima ipotesi di natura flogistica-ascessuale. | Raccolta fluida disomogenea, a margini irregolari, di ___ x ___ mm, con iperemia perilesionale al color-Doppler, in prima ipotesi di natura flogistica-ascessuale. |
| `sottocute/raccolta (conclusione)` | (invariata) | Raccolta fluida di probabile natura flogistica. |

#### Regione inguinale (ernia) (`inguine`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (invariata) | ECOGRAFIA DELLA REGIONE INGUINALE |
| `(distretto).intro` | È stata esaminata la regione inguinale {lato}, sede di sospetta ernia. | Esame mirato alla regione inguinale {lato}, sede di sospetta ernia. |
| `(distretto).introBilaterale` | Sono state esaminate le regioni inguinali bilateralmente, sede di sospetta ernia. | Esame delle regioni inguinali bilateralmente, sede di sospetta ernia. |
| `(distretto).conclusioneNegativa` | (invariata) | Non segni ecografici di ernia inguinale. |
| `canale (negativo)` | Non si riconoscono immagini compatibili con protrusioni erniarie neanche durante la manovra del ponzamento.<br>Non si rilevano alterazioni del piano muscolo-fasciale inguinale. | Non immagini compatibili con protrusioni erniarie, neanche durante la manovra del ponzamento.<br>Assenti alterazioni del piano muscolo-fasciale inguinale. |
| `canale/ernia` | Si riconosce tessuto adiposo addominale che si affaccia all'orifizio inguinale esterno durante la manovra del ponzamento eseguita in stazione supina, e spontaneamente in stazione eretta, e che si riduce al termine della manovra.<br>Non si riconoscono falde fluide limitrofe all'ernia descritta. | Tessuto adiposo addominale affacciato all'orifizio inguinale esterno durante la manovra del ponzamento eseguita in stazione supina, e spontaneamente in stazione eretta, con riduzione al termine della manovra.<br>Non falde fluide limitrofe all'ernia descritta. |
| `canale/ernia (conclusione)` | (invariata) | Ernia inguinale. |
| `canale/controlaterale` | Controlateralmente è riconoscibile reperto analogo. | Controlateralmente, reperto analogo. |

#### Parete addominale (`parete`)

| id | prima | dopo |
|---|---|---|
| `retti (negativo)` | Non si osserva diastasi dei muscoli retti. | Non diastasi dei muscoli retti. |
| `retti/diastasi` | In sede ___ la distanza massima dei muscoli retti è di ___ centimetri: il reperto è compatibile con ___ (lieve) diastasi dei muscoli retti. | In sede ___, distanza massima dei muscoli retti di ___ centimetri: reperto compatibile con ___ (lieve) diastasi dei muscoli retti. |
| `retti/diastasi (conclusione)` | (invariata) | Diastasi dei muscoli retti. |
| `linea-alba (negativo)` | Non si osserva interruzione della linea alba. | Assente interruzione della linea alba. |
| `linea-alba/interruzione` | Non si osserva interruzione della linea alba se non in sede ___, ove si segnala piccola interruzione (___ mm) in assenza di impegno mesenteriale. | Non interruzione della linea alba se non in sede ___, con piccola interruzione (___ mm), senza impegno mesenteriale. |
| `linea-alba/ombelicale` | In sede ombelicale si osserva impegno di materiale mesenteriale avente estensione di circa ___ cm che protrude attraverso l'ombelico, con porta erniaria di ___ mm, riducibile ___ (spontaneamente/dopo manovra di compressione). | In sede ombelicale, impegno di materiale mesenteriale di circa ___ cm di estensione, protrudente attraverso l'ombelico, con porta erniaria di ___ mm, riducibile ___ (spontaneamente/dopo manovra di compressione). |
| `linea-alba/ombelicale (conclusione)` | (invariata) | Ernia ombelicale. |

#### Testicoli (`testicoli`)

| id | prima | dopo |
|---|---|---|
| `didimi/rete-testis` | Didimi in sede, di regolari dimensioni ed ecostruttura, se si eccettuano alcune formazioni pseudocistiche/serpiginose a livello della rete testis di ___, in prima ipotesi da attribuire a ectasia tubulare. | Didimi in sede, di regolari dimensioni ed ecostruttura, eccetto alcune formazioni pseudocistiche/serpiginose a livello della rete testis di ___, in prima ipotesi da attribuire a ectasia tubulare. |
| `didimi/rete-testis (conclusione)` | (invariata) | Ectasia tubulare della rete testis. |
| `didimi/lesione` | Nel contesto del didimo ___ si documenta formazione ipoecogena di ___ mm, vascolarizzata al color-Doppler, meritevole di valutazione specialistica urologica urgente. | Nel contesto del didimo ___, formazione ipoecogena di ___ mm, vascolarizzata al color-Doppler, meritevole di valutazione specialistica urologica urgente. |
| `didimi/lesione (conclusione)` | (invariata) | Lesione focale testicolare ___ meritevole di valutazione urologica urgente. |
| `epididimi/cisti-coda` | Si documenta formazione anecogena d'aspetto cistico in corrispondenza della coda dell'epididimo di ___ delle dimensioni di ___ mm. | Formazione anecogena d'aspetto cistico in corrispondenza della coda dell'epididimo di ___ delle dimensioni di ___ mm. |
| `epididimi/cisti-testa` | A livello della testa di ___ epididimo si documentano formazioni anecogene di aspetto cistico, a contenuto finemente corpuscolato, delle dimensioni di ___ x ___ mm. | A livello della testa di ___ epididimo, formazioni anecogene di aspetto cistico, a contenuto finemente corpuscolato, delle dimensioni di ___ x ___ mm. |
| `epididimi/epididimite` | Epididimo ___ ingrandito e disomogeneamente ipoecogeno, con aumentata vascolarizzazione al color-Doppler, come si osserva nei quadri di epididimite. | Epididimo ___ ingrandito e disomogeneamente ipoecogeno, con aumentata vascolarizzazione al color-Doppler, come nei quadri di epididimite. |
| `epididimi/epididimite (conclusione)` | (invariata) | Quadro compatibile con epididimite ___. |
| `varicocele (negativo)` | Non segni di varicocele né ectasie delle strutture venose, in particolare in corrispondenza dei poli inferiori. | Assenti segni di varicocele ed ectasie delle strutture venose, in particolare in corrispondenza dei poli inferiori. |

#### Doppler tronchi sovraortici (`tsa`)

| id | prima | dopo |
|---|---|---|
| `generale/angiosclerosi` | Si rileva diffusa angiosclerosi a carico del distretto esaminato. | Diffusa angiosclerosi a carico del distretto esaminato. |
| `destra (negativo)` | A destra: si documenta regolare pervietà della carotide comune, della carotide interna ed esterna in assenza di ateromi e/o di stenosi. | A destra: regolare pervietà della carotide comune, della carotide interna ed esterna, senza ateromi e/o stenosi. |
| `destra/minime` | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Sottili ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%). | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Sottili ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%). |
| `destra/minime (conclusione)` | (invariata) | Ateromasia carotidea destra non emodinamicamente significativa. |
| `destra/lievi` | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa). | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa). |
| `destra/lievi (conclusione)` | (invariata) | Stenosi carotidea interna destra di grado lieve. |
| `destra/moderate` | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%). | A destra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%). |
| `destra/moderate (conclusione)` | (invariata) | Stenosi carotidea interna destra di grado moderato. |
| `sinistra (negativo)` | A sinistra: si documenta regolare pervietà della carotide comune, della carotide interna ed esterna in assenza di ateromi e/o di stenosi. | A sinistra: regolare pervietà della carotide comune, della carotide interna ed esterna; assenti ateromi e/o stenosi. |
| `sinistra/minime` | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Sottili ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%). | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Sottili ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%). |
| `sinistra/minime (conclusione)` | (invariata) | Ateromasia carotidea sinistra non emodinamicamente significativa. |
| `sinistra/lievi` | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa). | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa). |
| `sinistra/lievi (conclusione)` | (invariata) | Stenosi carotidea interna sinistra di grado lieve. |
| `sinistra/moderate` | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%). | A sinistra: regolare pervietà della carotide comune e della carotide esterna.<br>Ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%). |
| `sinistra/moderate (conclusione)` | (invariata) | Stenosi carotidea interna sinistra di grado moderato. |
| `vertebrali/ipoplasica` | Arterie vertebrali pervie con tracciati normodiretti; la vertebrale ___ appare di calibro ridotto, come per ipoplasia. | Arterie vertebrali pervie con tracciati normodiretti; vertebrale ___ di calibro ridotto, come per ipoplasia. |

#### Doppler venoso arti inferiori (`venoso-ai`)

| id | prima | dopo |
|---|---|---|
| `profondo (negativo)` | Regolare pervietà, calibro e continenza del sistema venoso profondo bilateralmente.<br>In particolare non si documentano segni di TVP in atto bilateralmente. | Regolare pervietà, calibro e continenza del sistema venoso profondo bilateralmente.<br>In particolare, non segni di TVP in atto bilateralmente. |
| `profondo/tvp` | A ___ (destra/sinistra) la vena ___ risulta non comprimibile ed occupata da materiale ecogeno, in assenza di segnale di flusso al color-Doppler, come da trombosi venosa profonda ___ (occlusiva/non occlusiva).<br>Controlateralmente regolare pervietà, calibro e continenza del sistema venoso profondo. | A ___ (destra/sinistra), vena ___ non comprimibile ed occupata da materiale ecogeno, senza segnale di flusso al color-Doppler, come da trombosi venosa profonda ___ (occlusiva/non occlusiva).<br>Controlateralmente regolare pervietà, calibro e continenza del sistema venoso profondo. |
| `profondo/tvp (conclusione)` | (invariata) | Trombosi venosa profonda ___: comunicato al paziente / al curante per valutazione urgente. |
| `profondo/esiti` | A ___ la vena ___ appare ricanalizzata, con ispessimenti parietali e reflusso, come da esiti di pregressa trombosi.<br>Non si documentano segni di TVP in atto. | A ___, vena ___ ricanalizzata, con ispessimenti parietali e reflusso, come da esiti di pregressa trombosi.<br>Non segni di TVP in atto. |
| `profondo/esiti (conclusione)` | (invariata) | Esiti di pregressa trombosi venosa profonda. |
| `destra (negativo)` | A destra: regolare pervietà, calibro e continenza della safena interna ed esterna.<br>Non si documentano segni di tromboflebite in atto. | A destra: regolare pervietà, calibro e continenza della safena interna ed esterna.<br>Assenti segni di tromboflebite in atto. |
| `destra/insufficienza` | A destra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.<br>Non si documentano segni di tromboflebite in atto. | A destra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.<br>Assenti segni di tromboflebite in atto. |
| `destra/insufficienza (conclusione)` | (invariata) | Insufficienza della safena interna destra. |
| `destra/tromboflebite` | A destra: la safena ___ risulta non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite. | A destra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite. |
| `destra/tromboflebite (conclusione)` | (invariata) | Tromboflebite della safena ___ destra. |
| `sinistra (negativo)` | A sinistra: regolare pervietà, calibro e continenza della safena interna ed esterna.<br>Non si documentano segni di tromboflebite in atto. | A sinistra: regolare pervietà, calibro e continenza della safena interna ed esterna.<br>Non segni di tromboflebite in atto. |
| `sinistra/insufficienza` | A sinistra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.<br>Non si documentano segni di tromboflebite in atto. | A sinistra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.<br>Non segni di tromboflebite in atto. |
| `sinistra/insufficienza (conclusione)` | (invariata) | Insufficienza della safena interna sinistra. |
| `sinistra/tromboflebite` | A sinistra: la safena ___ risulta non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite. | A sinistra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite. |
| `sinistra/tromboflebite (conclusione)` | (invariata) | Tromboflebite della safena ___ sinistra. |
| `altro/baker` | Si riconosce una formazione cistica polilobata nel cavo popliteo di ___ attribuibile a cisti di Baker. | Formazione cistica polilobata nel cavo popliteo di ___, attribuibile a cisti di Baker. |

#### Doppler arterioso arti inferiori (`arterioso-ai`)

| id | prima | dopo |
|---|---|---|
| `generale (negativo)` | Si documenta un quadro di modesta e diffusa ateromasia a carico del distretto esaminato. | Quadro di modesta e diffusa ateromasia a carico del distretto esaminato. |
| `generale/assente` | Non si documentano significative alterazioni ateromasiche a carico del distretto esaminato. | Non significative alterazioni ateromasiche a carico del distretto esaminato. |
| `destra (negativo)` | A destra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba che presentano tracciati di tipo trifasico in assenza di stenosi emodinamiche. | A destra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba, con tracciati di tipo trifasico, senza stenosi emodinamiche. |
| `destra/stenosi` | A destra: a livello ___ si documenta ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico). | A destra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico). |
| `destra/stenosi (conclusione)` | (invariata) | Arteriopatia obliterante dell'arto inferiore destro. |
| `sinistra (negativo)` | A sinistra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba che presentano tracciati di tipo trifasico in assenza di stenosi emodinamiche. | A sinistra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba, con tracciati di tipo trifasico; assenti stenosi emodinamiche. |
| `sinistra/stenosi` | A sinistra: a livello ___ si documenta ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico). | A sinistra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico). |
| `sinistra/stenosi (conclusione)` | (invariata) | Arteriopatia obliterante dell'arto inferiore sinistro. |

#### Doppler aorta e assi iliaci (`aorta-iliache`)

| id | prima | dopo |
|---|---|---|
| `calibro (negativo)` | Aorta addominale ed assi iliaci pervi con calibro conservato.<br>In particolare non si documentano dilatazioni aneurismatiche né stenosi emodinamiche. | Aorta addominale ed assi iliaci pervi con calibro conservato.<br>In particolare, non dilatazioni aneurismatiche né stenosi emodinamiche. |
| `tracciati (negativo)` | I tracciati sono di tipo regolarmente trifasico in tutto l'ambito esplorato. | Tracciati di tipo regolarmente trifasico in tutto l'ambito esplorato. |

#### Doppler arterie renali (`arterie-renali`)

| id | prima | dopo |
|---|---|---|
| `reni (negativo)` | I reni, in sede, hanno regolari dimensioni ed ecostruttura con conservato gradiente cortico-midollare.<br>Le vie escretrici urinarie non sono dilatate. | Reni in sede, di regolari dimensioni ed ecostruttura, con conservato gradiente cortico-midollare.<br>Vie escretrici urinarie non dilatate. |
| `tecnica (negativo)` | Si è proceduto al campionamento delle arterie renali all'origine e all'ilo e a campionamento dei vasi in sede intraparenchimale. | Campionamento delle arterie renali all'origine e all'ilo e dei vasi in sede intraparenchimale. |
| `arterie (negativo)` | Le arterie renali sono regolarmente pervie senza evidenza di stenosi emodinamiche con indici di resistenza < 0.8.<br>Il campionamento dei vasi intraparenchimali ha documentato un indice di resistenza < 0.7. | Arterie renali regolarmente pervie, senza evidenza di stenosi emodinamiche, con indici di resistenza < 0.8.<br>Al campionamento dei vasi intraparenchimali, indice di resistenza < 0.7. |
| `arterie/stenosi` | A livello dell'arteria renale ___ si documenta accelerazione del flusso all'origine (PSV ___ cm/s), con tracciati intraparenchimali a valle di tipo tardus-parvus, come per stenosi emodinamicamente significativa.<br>Regolare l'arteria renale controlaterale. | A livello dell'arteria renale ___, accelerazione del flusso all'origine (PSV ___ cm/s), con tracciati intraparenchimali a valle di tipo tardus-parvus, come per stenosi emodinamicamente significativa.<br>Regolare l'arteria renale controlaterale. |
| `arterie/stenosi (conclusione)` | (invariata) | Stenosi emodinamicamente significativa dell'arteria renale ___. |

#### Doppler trapianto renale (`trapianto-renale`)

| id | prima | dopo |
|---|---|---|
| `rene (negativo)` | Il rene presenta regolari dimensioni ed ecostruttura con conservata quota parenchimale corticale.<br>Le vie escretrici urinarie non sono dilatate. | Rene di regolari dimensioni ed ecostruttura, con conservata quota parenchimale corticale.<br>Vie escretrici urinarie non dilatate. |
| `arteria (negativo)` | Regolare pervietà dell'arteria renale senza evidenza di stenosi anastomotica con IR ___.<br>Il campionamento dei vasi intraparenchimali ha documentato regolare vascolarizzazione con IR < 0.7. | Regolare pervietà dell'arteria renale senza evidenza di stenosi anastomotica con IR ___.<br>Al campionamento dei vasi intraparenchimali, regolare vascolarizzazione con IR < 0.7. |

### TC

#### Encefalo senza mdc (`encefalo`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | SENZA E  CON MDC | TC DELL'ENCEFALO SENZA MDC |
| `(distretto).conclusioneNegativa` | Non evidenti alterazioni lacero-contusive encefaliche, nè ematomi intracerebrali. | Non alterazioni encefaliche di significato acuto. |
| `emorragia (negativo)` | Non si rilevano iperdensità di natura ematica. | Non evidenti iperdensità di natura ematica in sede intracranica. |
| `parenchima (negativo)` | Non si rilevano evidenti iperdensità di natura ematica nè ulteriori alterazioni tomodensitometriche del tessuto nervoso in sede sovra e sottotentoriale. | Non ulteriori alterazioni tomodensitometriche del tessuto nervoso in sede sovra e sottotentoriale. |
| `parenchima/leucoaraiosi` | E' presente diffusa ipodensità della sostanza bianca peri-ventricolare in rapporto a vasculopatia cronica. | Diffusa ipodensità della sostanza bianca periventricolare in rapporto a vasculopatia cronica. |
| `parenchima/leucoaraiosi (conclusione)` | E' presente diffusa ipodensità della sostanza bianca peri-ventricolare in rapporto a vasculopatia cronica. | Segni di vasculopatia cronica della sostanza bianca. |
| `parenchima/esiti-ischemici` | In sede   si osserva lesione ipodensa rotondeggiante in verosimili esiti ischemici non recenti. | In sede ___, lesione ipodensa rotondeggiante in verosimili esiti ischemici non recenti. |
| `ventricoli (negativo)` | Il sistema ventricolare è regolare per sede, dimensioni e morfologia. | Sistema ventricolare regolare per sede, dimensioni e morfologia. |
| `ventricoli/atrofia` | Si rileva lieve aumento delle dimensioni del sistema ventricolare e dell'ampiezza degli spazi subaracnoidei della volta in rapporto a fenomeni regressivo-atrofici. | Lieve aumento delle dimensioni del sistema ventricolare e dell'ampiezza degli spazi subaracnoidei della volta, in rapporto a fenomeni regressivo-atrofici. |
| `linea-mediana (negativo)` | Le strutture della linea mediana sono in asse. | Strutture della linea mediana in asse. |
| `ossa (negativo)` | Lo studio con finestra per osso non ha documentato la presenza di alterazioni ossee a livello della teca e della base cranica. | Allo studio con finestra per osso, non alterazioni ossee della teca e della base cranica. |
| `tessuti-molli/tumefazione` | Si rileva tumefazione dei tessuti molli extracranici in sede  . | Tumefazione dei tessuti molli extracranici in sede ___. |

#### Angio-TC encefalo (stroke) (`encefalo-angio`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | SENZA E  CON MDC | TC DELL'ENCEFALO SENZA E CON MDC E ANGIO-TC |
| `(distretto).conclusioneNegativa` | Regolare la pervietà dei principali vasi arteriosi intracranici. | Non segni TC di lesioni ischemiche o emorragiche acute; circolo arterioso intracranico pervio. |
| `basale (negativo)` | All'esame basale non si osservano evidenti alterazioni tomodensitometriche del tessuto nervoso di significato attuale, in particolare non si osservano evidenti ipodensità focali di significato ischemico recente. | All'esame basale, non evidenti alterazioni tomodensitometriche del tessuto nervoso di significato attuale, in particolare non evidenti ipodensità focali di significato ischemico recente. |
| `emorragia (negativo)` | Non si riconoscono franche iperdensità focali di natura emorragica attuale in sede intracranica. | Non franche iperdensità focali di natura emorragica attuale in sede intracranica. |
| `ventricoli (negativo)` | Il sistema ventricolare è regolare per sede, dimensioni e morfologia. | Sistema ventricolare regolare per sede, dimensioni e morfologia. |
| `linea-mediana (negativo)` | Le strutture della linea sagittale mediana sono in asse. | Strutture della linea sagittale mediana in asse. |
| `ossa (negativo)` | Lo studio con finestra per osso non ha documentato la presenza di alterazioni ossee a livello della teca e della base cranica. | Allo studio con finestra per osso, non alterazioni ossee della teca e della base cranica. |
| `tsa (negativo)` | Dopo iniezione endovenosa di MdC, l'esame Angio-TC ha dimostrato regolare calibro e pervietà dell'arco aortico e dei TSA (, diffusamente ateromasici). | Dopo iniezione ev di MdC, regolari calibro e pervietà dell'arco aortico e dei TSA (___, diffusamente ateromasici). |
| `intracranici (negativo)` | I principali vasi arteriosi intracranici risultano pervi e di calibro nei limiti della norma; non sono apprezzabili malformazioni di tipo aneurismatico e/o artero-venoso. | Principali vasi arteriosi intracranici pervi e di calibro nei limiti della norma; non malformazioni aneurismatiche e/o artero-venose. |
| `collaterali (negativo)` | Il sistema collaterale leptomeningeo appare ben rappresentato e categorizzabile come buono. | Sistema collaterale leptomeningeo ben rappresentato, categorizzabile come buono. |
| `venoso (negativo)` | E' regolarmente rappresentato il deflusso venoso. | Deflusso venoso regolarmente rappresentato. |

#### Massiccio facciale (`massiccio-facciale`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | TC MASSICCIO FACCIALE | TC DEL MASSICCIO FACCIALE |
| `(distretto).conclusioneNegativa` | TC MASSICCIO FACCIALE | TC del massiccio facciale nei limiti della norma. |
| `turbinati (negativo)` | Si documenta regolare aspetto dei turbinati nasali, con regolari dimensioni dei corrispettivi spazi coanali. | Turbinati nasali di regolare aspetto, con spazi coanali di normali dimensioni. |
| `turbinati/ipertrofia` | Si documenta ipertrofia dei turbinati medi e inferiori con associata riduzione dei corrispettivi spazi coanali. | Ipertrofia dei turbinati medi e inferiori, con associata riduzione dei corrispettivi spazi coanali. |
| `seni/ispessimento` | Regolare rappresentazione dei complessi ostio-meatali e pneumatizzazione dei restanti seni paranasali. ‖ Collateralmente si segnala ispessimento della mucosa dei seni mascellari bilateralmente, con maggiore evidenza a sinistra, di verosimile significato flogistico, da correlare con la clinica e l'anamnesi del paziente. | Ispessimento della mucosa dei seni mascellari ___, di verosimile significato flogistico, da correlare con la clinica e l'anamnesi.<br>Regolare rappresentazione dei complessi ostio-meatali e pneumatizzazione dei restanti seni paranasali. |
| `seni/ipoplasia` | Ipoplasia del seno frontale sinistro ed agenesia del destro. | Ipoplasia del seno frontale ___ ed agenesia del controlaterale. |
| `seni/onodi` | Si segnala la presenza di cellette sfeno-etmoidali (cellette di Onodi) bilateralmente. | Cellette sfeno-etmoidali (cellette di Onodi) bilateralmente. |
| `setto/deviazione` | Deviazione del setto nasale. | Deviazione del setto nasale verso ___. |
| `setto/sperone` | Setto nasale sostanzialmente in asse, con piccolo sperone osseo in sede mediana verso sinistra. | Setto nasale sostanzialmente in asse, con piccolo sperone osseo in sede mediana verso ___. |

#### Collo (`collo`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | TC COLLO | TC DEL COLLO |
| `(distretto).conclusioneNegativa` | Il fegato ha dimensioni nei limiti di norma, profili regolari ed è indenne da lesioni focali. | TC del collo nei limiti della norma. |
| `linfonodi (negativo)` | Non si apprezzano linfoadenopatie in corrispondenza dei livelli linfonodali. | Non linfoadenopatie in corrispondenza dei livelli linfonodali. |
| `faringe (negativo)` | Il rinofaringe e l'orofaringe hanno regolare aspetto tomodensitometrico. | Rinofaringe e orofaringe di regolare aspetto tomodensitometrico. |
| `parafaringei (negativo)` | Sono conservati i piani adiposi parafaringei. | Conservati i piani adiposi parafaringei. |
| `laringe (negativo)` | Appare regolare la colonna aerea laringo-tracheale. | Regolare la colonna aerea laringo-tracheale. |
| `tiroide (negativo)` | La tiroide ha normale aspetto TC. | Tiroide di normale aspetto TC. |
| `ossa (negativo)` | Lo studio con finestra per osso non ha documentato la presenza di alterazioni ossee compatibili con lesioni con caratteristiche di evolutività . | Allo studio con finestra per osso, non alterazioni ossee compatibili con lesioni con caratteristiche di evolutività. |

#### Torace (`torace`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | TC TORACE | TC DEL TORACE |
| `(distretto).conclusioneNegativa` | TC TORACE SMDC (MACRO: TORACE NORMALE) | TC del torace nei limiti della norma. |
| `polmoni (negativo)` | Non si osservano alterazioni polmonari con caratteristiche evolutive. | Non alterazioni polmonari con caratteristiche evolutive. |
| `polmoni/interstiziale` | Si osservano diffuse aree di iperdensità parenchimale con aspetto "a vetro smerigliato" distribuite a chiazze in parte confluenti tra loro, localizzate prevalentemente in sede periferica, nei lobi superiori/inferiori/in entrambi i lobi. ‖ Si rileva ispessimento dei setti intra- e interlobulari con quadro di "crazy paving". ‖ Sono presenti aree di consolidazione parenchimale con/senza broncogramma aereo . | Diffuse aree di iperdensità parenchimale con aspetto a vetro smerigliato, a chiazze in parte confluenti, prevalentemente in sede periferica, nei lobi ___ (superiori/inferiori/in entrambi i lobi).<br>Ispessimento dei setti intra- e interlobulari con quadro di «crazy paving».<br>Aree di consolidazione parenchimale ___ (con/senza) broncogramma aereo. |
| `polmoni/interstiziale (conclusione)` | I reperti sono indicativi di polmonite interstiziale di possibile eziologia infettiva. | Reperti indicativi di polmonite interstiziale di possibile eziologia infettiva. |
| `polmoni/scompenso` | Si riconosce diffuso ispessimento dell'interstizio cuffiale peribroncovascolare, prevalentemente a livello del grosso interstizio centrale in sede perilare, e diffuso ispessimento delle scissure e dei setti interlobulari, con maggiore evidenza a livello medio-basale. ‖ Si riconoscono alcune sfumate aree tenuemente iperdense, di aspetto simil vetro smerigliato, localizzate diffusamente in entrambi i polmoni. ‖ Il calibro vascolare è diffusamente maggiore rispetto a quello bronchiale. | Diffuso ispessimento dell'interstizio cuffiale peribroncovascolare, prevalentemente a livello del grosso interstizio centrale in sede perilare, e diffuso ispessimento delle scissure e dei setti interlobulari, con maggiore evidenza a livello medio-basale.<br>Alcune sfumate aree tenuemente iperdense, di aspetto simil vetro smerigliato, diffuse in entrambi i polmoni.<br>Calibro vascolare diffusamente maggiore rispetto a quello bronchiale. |
| `polmoni/scompenso (conclusione)` | I reperti soprasegnalati paiono compatibili con quadro di scompenso cardiaco sinistro congestizio con iniziali segni di edema interstizio-alveolare: in tale contesto la presenza di una polmonite interstiziale ad eziologia infettiva non può essere esclusa. | Reperti compatibili con scompenso cardiaco sinistro congestizio con iniziali segni di edema interstizio-alveolare; utile integrazione con i dati clinico-laboratoristici. |
| `vie-aeree (negativo)` | La trachea ed i grossi bronchi sono pervi. | Trachea e grossi bronchi pervi. |
| `pleura (negativo)` | Le cavità pleuriche sono libere da versamento. | Cavità pleuriche libere da versamento. |
| `pericardio (negativo)` | Non è presente versamento pericardico. | Non versamento pericardico. |
| `linfonodi (negativo)` | Non si riconoscono linfonodi di dimensioni aumentate in sede ilo-mediastinica ed ascellare. | Non linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare. |
| `linfonodi/limiti-smdc` | Con i limiti dati dall'assenza di somministrazione contrastografica non si riconoscono linfonodi di dimensioni aumentate in sede ilo-mediastinica ed ascellare. | Con i limiti dati dall'assenza di somministrazione contrastografica, non linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare. |
| `cuore (negativo)` | Il cuore ed i grossi vasi paiono presentare regolare aspetto tomodensitometrico. | Cuore e grossi vasi apparentemente di regolare aspetto tomodensitometrico. |
| `cuore/ateromasia` | Sono presenti diffusi segni di ateromasia parietale calcifica aorto-coronarica, con maggiore evidenza a carico dell'IVA. | Diffusi segni di ateromasia parietale calcifica aorto-coronarica, con maggiore evidenza a carico ___. |
| `ossa (negativo)` | Lo studio con finestra per osso non ha documentato la presenza di alterazioni ossee compatibili con lesioni con caratteristiche di evolutività . | Allo studio con finestra per osso, non alterazioni ossee compatibili con lesioni con caratteristiche di evolutività. |

#### Angio-TC torace (embolia polmonare) (`torace-tepa`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | TC  TORACE CMDC X TEPA (FASE ARTER POLMONARE) | ANGIO-TC DEL TORACE PER EMBOLIA POLMONARE |
| `(distretto).conclusioneNegativa` | (nessuna corrispondenza automatica affidabile nel documento) | Non segni TC di tromboembolia polmonare. |
| `arterie-polmonari (negativo)` | Non si osservano difetti di riempimento endoluminali ipodensi a livello delle arterie polmonari e delle loro principali diramazioni compatibili con fenomeni tromboembolici. | Non difetti di riempimento endoluminali ipodensi delle arterie polmonari e delle principali diramazioni compatibili con fenomeni tromboembolici. |
| `polmoni (negativo)` | Non si osservano alterazioni polmonari con caratteristiche evolutive. | Non alterazioni polmonari con caratteristiche evolutive. |
| `vie-aeree (negativo)` | La trachea ed i grossi bronchi sono pervi. | Trachea e grossi bronchi pervi. |
| `pleura (negativo)` | Non si rilevano versamenti pleuro-pericardici. | Non versamenti pleuro-pericardici. |
| `linfonodi (negativo)` | Non si riconoscono linfonodi di dimensioni aumentate in sede ilo-mediastinica ed ascellare. | Assenti linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare. |

#### Addome (`addome`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | TC ADDOME SMDC | TC DELL'ADDOME |
| `(distretto).conclusioneNegativa` | Il fegato ha dimensioni nei limiti di norma, profili regolari ed è indenne da lesioni focali. | TC dell'addome nei limiti della norma. |
| `fegato (negativo)` | Il fegato ha dimensioni nei limiti di norma, profili regolari ed è indenne da lesioni focali. | Fegato di dimensioni nei limiti di norma, a profili regolari, indenne da lesioni focali. |
| `fegato/limiti-smdc` | Il fegato ha dimensioni nei limiti di norma, profili regolari ed ha, con i limiti dati dall'assenza di somministrazione contrastografica,  aspetto tomodensitometrico omogeneo. | Fegato di dimensioni nei limiti di norma, a profili regolari, di aspetto tomodensitometrico omogeneo con i limiti dati dall'assenza di somministrazione contrastografica. |
| `colecisti (negativo)` | La colecisti è priva di calcoli calcifici endoluminali. | Colecisti priva di calcoli calcifici endoluminali. |
| `vie-biliari (negativo)` | Le vie biliari non sono dilatate. | Vie biliari non dilatate. |
| `milza-pancreas (negativo)` | La milza, il pancreas ed i surreni hanno normale aspetto tomodensitometrico. | Milza, pancreas e surreni di normale aspetto tomodensitometrico. |
| `reni (negativo)` | I reni, in sede e di dimensioni nella norma, hanno regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare. | Reni in sede, di dimensioni nella norma, di regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare. |
| `escrezione (negativo)` | L'escrezione renale di urina organoiodata avviene in tempi fisiologici. | Escrezione renale di urina organoiodata in tempi fisiologici. |
| `vie-urinarie (negativo)` | Le vie escretrici urinarie non sono dilatate. | Vie escretrici urinarie non dilatate. |
| `vescica (negativo)` | La vescica, regolarmente distesa, è priva di lesioni organiche. | Vescica regolarmente distesa, priva di lesioni organiche. |
| `utero-annessi (negativo)` | Non si rilevano tumefazioni utero-annessiali. | Non tumefazioni utero-annessiali. |
| `prostata (negativo)` | La prostata ha dimensioni conservate. | Prostata di dimensioni conservate. |
| `aorta (negativo)` | L'asse aorto-iliaco femorale è pervio e conserva regolare calibro. | Asse aorto-iliaco femorale pervio, di regolare calibro. |
| `linfonodi (negativo)` | Non si osservano linfonodi patologicamente ingranditi in sede retro ed intraperitoneale. | Non linfonodi patologicamente ingranditi in sede retro e intraperitoneale. |
| `peritoneo (negativo)` | La cavità peritoneale è libera da versamento. | Cavità peritoneale libera da versamento. |
| `basi-polmonari (negativo)` | Le scansioni passanti per le basi polmonari non hanno documentato alterazioni parenchimali in atto. | Nelle scansioni craniali passanti per le basi polmonari, non alterazioni parenchimali in atto. |
| `ossa (negativo)` | Alla valutazione dell'esame con finestra per osso non si riconoscono immagini attribuibili a localizzazioni scheletriche di malattia. | Alla valutazione con finestra per osso, non immagini attribuibili a localizzazioni scheletriche di malattia. |

#### Addome acuto (DEA) (`addome-acuto`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | SENZA E  CON MDC | TC DELL'ADDOME SENZA E CON MDC (ADDOME ACUTO) |
| `(distretto).conclusioneNegativa` | TC ADDOME CMDC X ADDOME ACUTO DEA GENERALE | Non segni TC di addome acuto. |
| `fegato (negativo)` | Il fegato ha dimensioni nei limiti di norma, profili regolari e regolare aspetto tomodensitometrico,  indenne da lesioni focali. | Fegato di dimensioni nei limiti di norma, a profili regolari e di normale aspetto tomodensitometrico, indenne da lesioni focali. |
| `sovraepatiche (negativo)` | Le vene sovraepatiche sono regolari per calibro e pervietà. | Vene sovraepatiche regolari per calibro e pervietà. |
| `porta (negativo)` | La vena porta e le sue principali diramazioni in sede intrepatica sono regolar per calibro e pervietà,in assenza di edema periportale. | Vena porta e principali diramazioni intraepatiche regolari per calibro e pervietà, senza edema periportale. |
| `colecisti (negativo)` | La colecisti, normodistesa, è priva di calcoli calcifici endoluminali, con pareti non ispessite e priva di falde fluide pericolecistiche da riferire a colecistite acuta. | Colecisti normodistesa, priva di calcoli calcifici endoluminali, a pareti non ispessite, senza falde fluide pericolecistiche da riferire a colecistite acuta. |
| `vie-biliari (negativo)` | Le vie biliari non sono dilatate e non mostrano alterazioni tomodensitometriche riferibili a colangite acuta. | Vie biliari non dilatate, senza alterazioni tomodensitometriche riferibili a colangite acuta. |
| `milza-surreni (negativo)` | La milza ed i surreni hanno normale aspetto tomodensitometrico. | Milza e surreni di normale aspetto tomodensitometrico. |
| `pancreas (negativo)` | Il pancreas non ha aspetto tumefatto, con adipe periviscerale regolarmente ipodenso senza segni di infiltrazione flogistica o raccolte limitrofe  riferibili a pancreatite acuta. | Pancreas non tumefatto, con adipe periviscerale regolarmente ipodenso, senza segni di infiltrazione flogistica o raccolte limitrofe riferibili a pancreatite acuta. |
| `reni (negativo)` | I reni, in sede e di dimensioni nella norma, hanno regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare: non si rilevano aree ipoperfuse da riferire a focolai pielonefritici. | Reni in sede, di dimensioni nella norma, di regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare; non aree ipoperfuse da riferire a focolai pielonefritici. |
| `escrezione (negativo)` | L'escrezione renale di urina organoiodata avviene in tempi fisiologici. | Escrezione renale di urina organoiodata in tempi fisiologici. |
| `vie-urinarie (negativo)` | Le vie escretrici urinarie non sono dilatate. | Vie escretrici urinarie non dilatate. |
| `vescica (negativo)` | La vescica, regolarmente distesa, è priva di lesioni parietali aggettanti il lume vescicale ed ha aspetto tomodensitometrico omogeneo. | Vescica regolarmente distesa, priva di lesioni parietali aggettanti nel lume, di aspetto tomodensitometrico omogeneo. |
| `calcoli (negativo)` | Non si rilevano formazioni calcifiche da riferire a calcolosi urinaria. | Non formazioni calcifiche da riferire a calcolosi urinaria. |
| `utero-annessi (negativo)` | Non si rilevano tumefazioni utero-annessiali. | Non tumefazioni utero-annessiali. |
| `prostata (negativo)` | La prostata ha dimensioni conservate. | Prostata di dimensioni conservate. |
| `appendice (negativo)` | Non si rilevano grossolane tumefazioni o raccolte fluide o addensamento del grasso in regione appendicolare da riferire ad appendicite acuta. | Non grossolane tumefazioni, raccolte fluide o addensamento del grasso in regione appendicolare da riferire ad appendicite acuta. |
| `sigma (negativo)` | Non si rilevano ispessimento parietale sigmoideo o addensamento dell'adipe perisigmoideo o raccolte essudative perisigmoidee da riferire a diverticolite acuta. | Sigma senza ispessimento parietale, addensamento dell'adipe circostante o raccolte essudative perisigmoidee da riferire a diverticolite acuta. |
| `anse (negativo)` | Non si apprezzano anse intestinali significativamente dilatate, nè livelli idro-aerei da riferire a fenomeni di subocclusione - occlusione intestinale. | Anse intestinali non significativamente dilatate, senza livelli idroaerei da riferire a fenomeni di subocclusione-occlusione. |
| `pareti (negativo)` | Le anse del piccolo e grosso intestino non mostrano focali o diffusi significativi ispessimenti parietali o variazioni di enhancement contrastografico. | Anse del piccolo e grosso intestino senza significativi ispessimenti parietali focali o diffusi né variazioni dell'enhancement contrastografico. |
| `pneumatosi (negativo)` | Non segni riferibili a pneumatosi intraparietale intestinale o nel lume dell'asse venoso spleno-porto-mesenterico. | Non segni riferibili a pneumatosi intraparietale intestinale né nel lume dell'asse venoso spleno-porto-mesenterico. |
| `versamento (negativo)` | Non si rilevano falde libere di versamento peritoneale. | Assenti falde libere di versamento peritoneale. |
| `mesentere (negativo)` | Il fodero adiposo mesenteriale è normotrasparente senza segni di infiltrazione ed imbizione edematoso-flogistica. | Fodero adiposo mesenteriale normotrasparente, senza segni di infiltrazione e imbibizione edematoso-flogistica. |
| `linfonodi (negativo)` | Non si osservano linfonodi patologicamente ingranditi in sede retro ed intraperitoneale. | Non linfonodi patologicamente ingranditi in sede retro e intraperitoneale. |
| `arterie (negativo)` | L'asse arterioso aorto-iliaco femorale è pervio e conserva regolare calibro, così come le sue principali derivazioni splancniche (tronco celiaco, mesenterica superiore ed inferiore), senza evidenti segni dissecativi o occlusivi tromboembolici arteriosi. | Asse arterioso aorto-iliaco femorale pervio, di regolare calibro, così come le principali derivazioni splancniche (tronco celiaco, mesenterica superiore e inferiore), senza evidenti segni dissecativi o occlusivi tromboembolici. |
| `vene (negativo)` | L'asse venoso porto-spleno-mesenterico è regolarmente pervio, senza evidenti segni occlusivi venosi tromboembolici. | Asse venoso porto-spleno-mesenterico regolarmente pervio, senza evidenti segni occlusivi tromboembolici. |
| `perfusione (negativo)` | La perfusione degli organi parenchimatosi intraddominali è regolare, in assenza di evidenti aree ischemiche o ipoperfuse;  i vasi venosi mantengono regolare calibro in assenza di VCI appiattita o vene sovrepatiche filiformi; si rileva fisiologica escrezione renale di urinaiodata bilateralmente. | Regolare perfusione degli organi parenchimatosi intraddominali, senza evidenti aree ischemiche o ipoperfuse; vasi venosi di regolare calibro, senza appiattimento della VCI né vene sovraepatiche filiformi; fisiologica escrezione renale di urina iodata bilateralmente: non evidenti segni riferibili a shock o ipoperfusione sistemica. |
| `basi-polmonari (negativo)` | Le scansioni passanti per le basi polmonari non hanno documentato alterazioni pleuro-parenchimali in atto. | Nelle scansioni craniali passanti per le basi polmonari, non alterazioni pleuro-parenchimali in atto. |
| `ossa (negativo)` | Alla valutazione dell'esame con finestra per osso non si riconoscono immagini attribuibili a localizzazioni scheletriche di malattia. | Alla valutazione con finestra per osso, non immagini attribuibili a localizzazioni scheletriche di malattia. |

### RM

#### Spalla (`spalla`)

| id | prima | dopo |
|---|---|---|
| `cuffia (negativo)` | Non si osservano alterazioni morfologiche e si segnale dei tendini sovraspinoso, sottospinoso e sottoscapolare. ‖ Conservato il trofismo dei ventri muscolari. | Non alterazioni morfologiche e di segnale dei tendini sovraspinoso, sottospinoso e sottoscapolare.<br>Conservato il trofismo dei ventri muscolari. |
| `clb (negativo)` | Continuo e in sede tendine capolungo del bicipite omerale. | Tendine del capo lungo del bicipite continuo e in sede. |
| `labbro (negativo)` | Cercine glenoideo regolarmente inserito. | Cercine glenoideo regolarmente inserito. |
| `acromion-claveare (negativo)` | Regolare l'articolazione acromion-claveare. | Regolare l'articolazione acromion-claveare. |
| `articolazione (negativo)` | Non versamento articolare. | Non versamento articolare. |

#### Encefalo (`encefalo`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | - RM ENCEFALO - MASSICCIO PER APC | RM DELL'ENCEFALO |
| `(distretto).conclusioneNegativa` | Reperti RM nei limiti della norma. | RM dell'encefalo nei limiti della norma. |
| `parenchima (negativo)` | Non si osservano significative aree di alterato segnale a carico del parenchima encefalico in sede sovra o sottotentoriale. | Non significative aree di alterato segnale del parenchima encefalico in sede sovra o sottotentoriale. |
| `parenchima/gliosi` | L'esame RM ha documentato la presenza di multipli piccoli focolai di ipersegnale nelle sequenze T2 dipendenti nel contesto della sostanza bianca sovratentoriale di entrambi gli emisferi cerebrali da riferire a piccole zone di gliosi da generica sofferenza vascolare aspecifica. | Multipli piccoli focolai di ipersegnale nelle sequenze T2 dipendenti nel contesto della sostanza bianca sovratentoriale di entrambi gli emisferi cerebrali, da riferire a gliosi da generica sofferenza vascolare aspecifica. |
| `parenchima/gliosi (conclusione)` | - RM ENCEFALO NEGATIVO STANDARD ECCETTO GLIOSI ASPECIFICA DA GENERICA SOFFERENZA VASCOLARE | Gliosi da sofferenza vascolare aspecifica. |
| `parenchima/sclerosi-multipla` | All'esame attuale non si rilevano evidenti evidenti modificazioni del carico lesionale, in particolare sono invariate per numero, dimensioni e comportamento del segnale le multiple aree di iperintensità nelle sequenze a TR lungo precedentemente descritte nel contesto della sostanza bianca a livello sotto e soprattutto sovratentoriale con distribuzione prevalentemente profonda periventricolare; è invariato anche il coinvolgimento del corpo calloso che appare assottigliato. ‖ Non si rilevano alterazioni nella sequenza pesata in diffusione in corrispondenza delle lesioni demielinizzanti da riferire ad eventuali segni radiologici di "attività di placca". | Multiple aree di iperintensità nelle sequenze a TR lungo nel contesto della sostanza bianca sotto e soprattutto sovratentoriale, a distribuzione prevalentemente profonda periventricolare, ___ (invariate per numero, dimensioni e comportamento del segnale) rispetto al precedente del ___.<br>Nella sequenza pesata in diffusione, non alterazioni in corrispondenza delle lesioni demielinizzanti da riferire a segni di «attività di placca». |
| `parenchima/sclerosi-multipla (conclusione)` | - RM SENZA MDC - STABILITA'CARICO LESIONALE | Carico lesionale demielinizzante ___ rispetto al precedente. |
| `grigia-bianca (negativo)` | Sono regolari i rapporti anatomo-topografici tra sostanza grigia e sostanza bianca sottocorticale. | Regolari i rapporti anatomo-topografici tra sostanza grigia e sostanza bianca sottocorticale. |
| `diffusione (negativo)` | Nella sequenza eseguita con tecnica di diffusione non sono apprezzabili alterazioni della diffusività molecolare dell'acqua riferibili a lesioni vascolari ischemiche "recenti". | Nella sequenza in diffusione, non alterazioni della diffusività molecolare dell'acqua riferibili a lesioni vascolari ischemiche «recenti». |
| `emosiderina (negativo)` | E. non sono rilevabili immagini ipointense riconducibili a  depositi emosiderinici intraparenchimali. | Nella sequenza T2 GE, non immagini ipointense riconducibili a depositi emosiderinici intraparenchimali. |
| `tronco (negativo)` | Regolare per morfologia ed intensità di segnale il tronco encefalico. | Tronco encefalico regolare per morfologia e intensità di segnale. |
| `ipofisi (negativo)` | In esame non dedicato la ghiandola pituitaria non pare presentare significative alterazioni volumetriche. | In esame non dedicato, ghiandola pituitaria apparentemente senza significative alterazioni volumetriche. |
| `vasi (negativo)` | In esame non dedicato paiono regolarmente pervi i grossi vasi arteriosi della base cranica. | In esame non dedicato, grossi vasi arteriosi della base cranica e circolo venoso intracranico apparentemente pervi. |
| `ventricoli (negativo)` | Il sistema ventricolare presenta forma e dimensioni regolari. | Sistema ventricolare di forma e dimensioni regolari. |
| `linea-mediana (negativo)` | Le strutture della linea mediana sono in asse. | Strutture della linea mediana in asse. |
| `mdc/negativo-mdc` | Dopo somministrazione del mezzo di contrasto paramagnetico non si osservano impregnazioni contrastografiche di significato patologico. | Dopo somministrazione del mdc paramagnetico, non impregnazioni contrastografiche di significato patologico. |

#### Rachide lombosacrale (`rachide-lombosacrale`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | - RM RACHIDE LOMBOSACRALE | RM DEL RACHIDE LOMBOSACRALE |
| `(distretto).conclusioneNegativa` | Reperti RM nei limiti della norma. | RM del rachide lombosacrale nei limiti della norma. |
| `curvatura (negativo)` | Nelle condizioni d'esecuzione dell'esame (decubito supino) sono conservate le fisiologiche curvature. | Nelle condizioni d'esame (decubito supino), conservata la fisiologica lordosi lombare. |
| `curvatura/rettilineizzata` | Nelle condizioni d'esecuzione dell'esame (decubito supino) sono conservate le fisiologiche curvature. | Nelle condizioni d'esame (decubito supino), rettilineizzata la fisiologica lordosi lombare. |
| `metameri (negativo)` | I metameri vertebrali esaminati sono allineati con normale aspetto RM./ Segni di spondilo-artrosi con appuntimenti osteofitari margino somatici. | Metameri vertebrali allineati, di normale aspetto RM. |
| `metameri/spondiloartrosi` | I metameri vertebrali esaminati sono allineati con normale aspetto RM./ Segni di spondilo-artrosi con appuntimenti osteofitari margino somatici. | Metameri vertebrali allineati, con segni di spondiloartrosi e appuntimenti osteofitari margino-somatici. |
| `metameri/transizione` | Si osserva metamero di transizione al passaggio lombo-sacrale per verosimile lombarizzazione di S1. | Metamero di transizione al passaggio lombo-sacrale, per verosimile lombarizzazione di S1. |
| `metameri/crollo` | Il soma di D8 appare ridotto in altezza sul versante del sinistro dove appare deformato a "cuneo anteriore" in assenza di edema della spongiosa ossea. | Soma di ___ ridotto in altezza, deformato «a cuneo anteriore», ___ (senza/con) edema della spongiosa ossea. |
| `metameri/emangioma` | In   si osserva millimetrica e sfumate alterazione di segnale, iperintensa in T1 e T2, compatibile con osteoangioma. | In ___, millimetrica e sfumata alterazione di segnale, iperintensa in T1 e T2, compatibile con emangioma. |
| `metameri/modic` | Fenomeni degenerativi margino-somatici con ipointensità in T1 ed iperintensità in T2 da correlare a Modic I  / iperintensità margino-somatica in T1 e T2 da correlare a Modic II/ ipointensità in T1 e T2 da correlare a Modic III. | Fenomeni degenerativi margino-somatici in ___ ___ (Modic I: ipointensi in T1 e iperintensi in T2 / Modic II: iperintensi in T1 e T2 / Modic III: ipointensi in T1 e T2). |
| `dischi (negativo)` | Regolare per morfologia ed intensità di segnale il tronco encefalico. | Dischi intersomatici di regolare morfologia e intensità di segnale. |
| `dischi/disidratazione` | I dischi intersomatici presentano regolare morfologia ed intensità di segnale. / compresi tra x e y presentano disomogenea ipointensità in T2 in rapporto ad iniziali fenomeni disidratativi-degenerativi del nucleo polposo. | Dischi compresi tra ___ e ___ disomogeneamente ipointensi in T2, in rapporto a iniziali fenomeni disidratativo-degenerativi del nucleo polposo. |
| `protrusioni (negativo)` | Non si osservano immagini riferibili a protrusioni discali né segni di conflitto disco-radicolare, né anomale compressioni sul sacco durale. | Non protrusioni discali né segni di conflitto disco-radicolare o anomale compressioni sul sacco durale. |
| `protrusioni/bulging` | In L1-L2, si osserva bulging discale, che impronta il sacco durale in sede  , con estensione intraforaminale bilateralmente ed impronta sulla radice emergente a.... | In ___, bulging discale improntante il sacco durale, con estensione in sede intraforaminale ___ e improntamento della radice emergente ___. |
| `protrusioni/larga-base` | A livello di L5-S1 si osserva protrusione discale ad ampio raggio che si estende in sede intraforaminale bilaterale, in assenza di segni di conflitto disco-radicolare. | In ___, protrusione discale a larga base con estrinsecazione intraforaminale ___, ___ (senza/con) segni di conflitto disco-radicolare. |
| `protrusioni/osteofita` | A tale livello concomita osteofita postero-laterale sinistro che determina riduzione in ampiezza del forame di coniugazione omolaterale. | In ___, concomitante osteofita postero-laterale ___, con riduzione in ampiezza del forame di coniugazione omolaterale. |
| `canale (negativo)` | Il diametro antero-posteriore del canale rachideo è regolare. | Diametro antero-posteriore del canale vertebrale conservato. |
| `canale/stenosi` | Il diametro antero-posteriore del canale rachideo è conservato/Stenosi canalare marcata, con riduzione del diametro trasverso massimo è presente all'altezza di L4-L5, a tale livello il canale assume aspetto a trifoglio; la stenosi canalare è sostenuta da componente disco ligamentosa ipertrofica soprattutto a livello della componente giallo posteriore. | Stenosi marcata del canale vertebrale all'altezza di ___, con aspetto «a trifoglio», sostenuta da componente disco-legamentosa ipertrofica, soprattutto dei legamenti gialli. |
| `canale/stenosi (conclusione)` | Canale vertebrale cervicale di ampiezza regolare. | Stenosi del canale vertebrale in ___. |
| `cono (negativo)` | Il cono midollare è normalmente rappresentato a livello di D12-L1. | Cono midollare normalmente rappresentato a livello di D12-L1. |
| `cauda (negativo)` | Non si rilevano alterazioni della regione della cauda. | Assenti alterazioni della regione della cauda. |

#### Rachide cervicale (`rachide-cervicale`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | - RM RACHIDE CERVICALE | RM DEL RACHIDE CERVICALE |
| `(distretto).conclusioneNegativa` | Reperti RM nei limiti della norma. | RM del rachide cervicale nei limiti della norma. |
| `curvatura (negativo)` | Nelle condizioni d'esecuzione dell'esame (decubito supino) sono conservate le fisiologiche curvature. | Nelle condizioni d'esame (decubito supino), conservata la fisiologica lordosi cervicale. |
| `curvatura/rettilineizzata` | Nelle condizioni d'esecuzione dell'esame (decubito supino) sono conservate le fisiologiche curvature. | Nelle condizioni d'esame (decubito supino), ___ (ridotta/rettilineizzata) la fisiologica lordosi cervicale. |
| `metameri (negativo)` | I metameri vertebrali esaminati sono allineati con normale aspetto RM./ Segni di spondilo-artrosi con appuntimenti osteofitari margino somatici. | Metameri vertebrali allineati, di normale aspetto RM. |
| `metameri/spondiloartrosi` | Sono presenti discrete alterazioni spondilo - artrosiche. | Metameri vertebrali allineati, con discrete alterazioni spondilo-artrosiche. |
| `dischi (negativo)` | Regolare per morfologia ed intensità di segnale il tronco encefalico. | Dischi intersomatici di regolare morfologia e intensità di segnale. |
| `protrusioni (negativo)` | Non si osservano immagini riferibili a protrusioni discali né segni di conflitto disco-radicolare, né anomale compressioni sul sacco durale. | Non protrusioni discali né segni di conflitto disco-radicolare o anomale compressioni sul sacco durale. |
| `protrusioni/debordo` | In C3-C4, C4-C5 e C5-C6 si apprezza trascurabile debordo discale posteriore mediano in assenza di segni di conflitto disco - radicolare. | In ___, trascurabile debordo discale posteriore mediano, senza segni di conflitto disco-radicolare. |
| `protrusioni/protrusione` | Si osserva protrusione discale di parti del nucleo polposo, in sede mediana - paramediana stra che impronta lo spazio perimidollare in sede antero-laterale, senza segni di conflitto disco-radicolare né di compressione sulla superficie del midollo, il quale presenta normale segnale RM. | In ___, protrusione discale ___ (mediana/paramediana ___) improntante lo spazio perimidollare in sede antero-laterale, senza segni di conflitto disco-radicolare né compressione sulla superficie del midollo. |
| `canale (negativo)` | Il diametro antero-posteriore del canale rachideo è regolare. | Diametro antero-posteriore del canale vertebrale regolare. |
| `midollo (negativo)` | Il midollo spinale non presenta alterazioni di segnale focali né diffuse. | Midollo spinale senza alterazioni di segnale focali né diffuse. |
| `fossa-posteriore (negativo)` | Regolarmente rappresentate le strutture della fossa cranica posteriore. | Strutture della fossa cranica posteriore regolarmente rappresentate. |

#### Ginocchio (`ginocchio`)

| id | prima | dopo |
|---|---|---|
| `menischi (negativo)` | Non si osservano alterazioni morfostrutturali e di segnale a carico di entrambe le fibrocartilagini meniscali, dei legamenti crociati, dei legamenti collaterali e del tendine del popliteo. | Non alterazioni morfostrutturali e di segnale di entrambe le fibrocartilagini meniscali. |
| `legamenti (negativo)` | Non si osservano alterazioni morfostrutturali e di segnale a carico di entrambe le fibrocartilagini meniscali, dei legamenti crociati, dei legamenti collaterali e del tendine del popliteo. | Legamenti crociati, collaterali e tendine del popliteo senza alterazioni morfostrutturali e di segnale. |
| `cartilagine (negativo)` | La cartilagine di rivestimento articolare femoro-tibiale presenta spessore regolare. | Cartilagine di rivestimento articolare femoro-tibiale di spessore regolare. |
| `osso (negativo)` | Nei livelli esaminati non si osservano alterazioni del trofismo scheletrico. | Nei livelli esaminati, non alterazioni del trofismo scheletrico. |
| `versamento (negativo)` | Non si osserva significativo versamento intrarticolare. | Non significativo versamento intrarticolare. |

#### Caviglia (`caviglia`)

| id | prima | dopo |
|---|---|---|
| `achille (negativo)` | E' regolare il tendine achilleo e la sua inserzione in corrispondenza della porzione calcaneare superiore. | Regolare il tendine achilleo e la sua inserzione sulla porzione calcaneare superiore. |
| `fascia (negativo)` | E' regolare l'aponeurosi plantare e la sua inserzione in corrispondenza della regione calcaneare inferiore. | Regolare l'aponeurosi plantare e la sua inserzione calcaneare. |
| `legamenti (negativo)` | Non franche alterazioni a carico delle strutture ligamentose esaminate, in particolare a carico degli apparati ligamentosi della regione laterale e mediale di caviglia. | Non franche alterazioni delle strutture legamentose esaminate, in particolare dei comparti laterale e mediale di caviglia. |
| `versamento (negativo)` | Non falde fluide intrarticolari, in particolare non si rileva significativo versamento articolare in sede tibio-astragalica. | Assenti falde fluide intrarticolari, in particolare non significativo versamento tibio-astragalico. |
| `ossa (negativo)` | Non si rilevano alterazioni di morfologia e di segnale a carico dei segmenti scheletrici compresi nel volume d'esame, i quali presentano regolari rapporti articolari. | Segmenti scheletrici compresi nel volume d'esame senza alterazioni di morfologia e di segnale, con regolari rapporti articolari. |

#### Bacino (sacro-iliache) (`sacroiliache`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | Regolari le articolazioni sacro - iliache. | RM DEL BACINO (ARTICOLAZIONI SACRO-ILIACHE) |
| `(distretto).conclusioneNegativa` | - RM BACINO - SACROILIACHE | Non segni RM di sacroileite attiva. |
| `sacroiliache (negativo)` | Non sono presenti aree di ipersegnale nelle sequenze STIR pesate da riferire a fenomeni flogistici in atto a carico di entrambe le articolazioni sacro - iliache. | Non aree di ipersegnale nelle sequenze STIR da riferire a fenomeni flogistici in atto di entrambe le articolazioni sacro-iliache. |
| `coxofemorali (negativo)` | Regolari i rapporti articolari coxo - femorali bilateralmente con teste femorali normo - conformate. | Regolari i rapporti articolari coxo-femorali bilateralmente, con teste femorali normoconformate. |
| `versamento (negativo)` | Non versamento articolare in sede coxo - femorali bilateralmente. | Non versamento articolare coxo-femorale bilateralmente. |

#### Colangio-RM (`colangio`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | - RM COLANGIO | COLANGIO-RM |
| `(distretto).conclusioneNegativa` | Reperti RM nei limiti della norma. | Colangio-RM nei limiti della norma. |
| `colecisti (negativo)` | La colecisti è distesa, alitiasica/In esiti di colecistectomia, | Colecisti distesa, alitiasica. |
| `colecisti/colecistectomia` | La colecisti è distesa, alitiasica/In esiti di colecistectomia, | Esiti di colecistectomia. |
| `vie-biliari (negativo)` | Le vie biliari intra ed extra epatiche non sono dilatate. | Vie biliari intra ed extraepatiche non dilatate; epatocoledoco di circa ___ mm. |
| `litiasi (negativo)` | Non si evidenziano difetti di segnale di natura litiasica delle vie biliari. | Non difetti di segnale di natura litiasica delle vie biliari. |
| `addome (negativo)` | Regolare morfologia ed aspetto RM del pancreas, della milza, dei surreni e dei reni nei segmenti esplorabili. | Regolare morfologia e aspetto RM di pancreas, milza, surreni e reni nei segmenti esplorabili. |
| `addome/ectasia-dotti` | Nel corpo del pancreas, sul versante posteriore si cconferma millimetrica iperintensità di segnale delle dimensioni massime di 4 mm, compatibile con ectasia dei dotti secondari. | Nel ___ del pancreas, millimetrica iperintensità di segnale di ___ mm, compatibile con ectasia dei dotti secondari. |

### RX

#### Torace (PA e LL) (`torace`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | RX TORACE 1 P (AP) | RX DEL TORACE IN DUE PROIEZIONI |
| `(distretto).conclusioneNegativa` | Non addensamenti parenchimali in atto. | Non alterazioni pleuro-parenchimali in atto. |

#### Torace al letto (AP) (`torace-letto`)

| id | prima | dopo |
|---|---|---|
| `cuore (negativo)` | Compatibilmente con il decubito supino l'ombra cardiaca è apparentemente ingrandita. | Compatibilmente con il decubito supino, ombra cardiaca apparentemente ingrandita. |
| `presidi/tubo` | Presenza di tubo endotracheale con apice localizzato a circa  cm dalla carena. | Presenza di tubo endotracheale con apice localizzato a circa ___ cm dalla carena. |
| `presidi/cvc` | Presenza di CVC giugulare destro con apice localizzato proiettivamente alla giunzione cavo-atriale e di catetere di Swan-Ganz con accesso giugulare sinistro con estremo localizzato proiettivamente a livello della giunzione cavo-atriale. | Presenza di CVC giugulare ___ con apice localizzato proiettivamente alla giunzione cavo-atriale. |
| `presidi/swan-ganz` | Presenza di CVC giugulare destro con apice localizzato proiettivamente alla giunzione cavo-atriale e di catetere di Swan-Ganz con accesso giugulare sinistro con estremo localizzato proiettivamente a livello della giunzione cavo-atriale. | Presenza di catetere di Swan-Ganz con accesso giugulare ___ ed estremo localizzato proiettivamente a livello ___. |

#### Addome diretto (`addome`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | RX DIRETTA ADDOME IN FRONTALE E TANGENZIALE (MACRO: RADIOGRAFIA DELL'ADDOME) | RX DIRETTA DELL'ADDOME |
| `(distretto).conclusioneNegativa` | Non evidenti segni radiologici da riferire a rime fratturative ossee. | Non segni radiologici di occlusione né di pneumoperitoneo. |
| `vie-urinarie/negativo-litiasi` | Non evidenti radiopacità lungo il decorso delle vie urinarie da riferire a sicuri segni di litiasi calcifica delle vie urinarie. | Non evidenti radiopacità lungo il decorso delle vie urinarie da riferire a sicuri segni di litiasi calcifica. |

#### Rachide cervicale (`rachide-cervicale`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | RX RACHIDE CERVICALE | RX DEL RACHIDE CERVICALE |
| `(distretto).conclusioneNegativa` | RX RACHIDE CERVICALE (MACRO: RADIOGRAFIA CERVICALE) | Non segni radiologici di lesioni traumatiche del rachide cervicale. |
| `consiglio/tc` | In caso di trauma "maggiore" o se in presenza di significativa clinica o se in presenza di fattori di rischio rilevanti si consiglia approfondimento mediante TC rachide cervicale. | In caso di trauma «maggiore», clinica significativa o fattori di rischio rilevanti, consigliato approfondimento con TC del rachide cervicale. |

#### Bacino (`bacino`)

| id | prima | dopo |
|---|---|---|
| `teste-femorali/geodi` | Normoconformate le teste femorali. /Ovalizzazione delle teste femorali nel cui contesto si apprezza la presenza di alcune areole radiotrasparenti di verosimile natura geodica. | Ovalizzazione delle teste femorali, con alcune areole radiotrasparenti di verosimile natura geodica. |
| `acetaboli/sclerosi` | Regolari i tetti acetabolari. /Sclerosi dei tetti acetabolari con appuntimento dei cigli cotiloidei. | Sclerosi dei tetti acetabolari con appuntimento dei cigli cotiloidei. |
| `interlinea (negativo)` | Conservata/Ridotta l'interlinea articolare coxo-femorale. | Conservata l'interlinea articolare coxo-femorale. |
| `interlinea/ridotta` | Conservata/Ridotta l'interlinea articolare coxo-femorale. | Ridotta l'interlinea articolare coxo-femorale ___. |
| `fratture (negativo)` | Non si rilevano evidenti rime di frattura. | Non evidenti rime di frattura. |
| `tessuti-molli/calcificazioni` | Calcificazioni dei tessuti molli in corrispondenza del... | Calcificazioni dei tessuti molli in corrispondenza di ___. |

#### Segmento osseo (trauma) (`segmento-osseo`)

| id | prima | dopo |
|---|---|---|
| `(distretto).titolo` | (nessuna corrispondenza automatica affidabile nel documento) | RX DEL SEGMENTO ___ |
| `(distretto).intro` | Esame eseguito in regime di urgenza. | Esame eseguito in regime di urgenza. |
| `(distretto).conclusioneNegativa` | Non evidenti segni radiologici da riferire a rime fratturative ossee. | Non segni radiologici di fratture. |
| `fratture (negativo)` | Nei radiogrammi eseguiti non si apprezzano evidenti rime fratturative ossee apprezzabili con la metodica. | Nei radiogrammi eseguiti, non evidenti rime fratturative ossee apprezzabili con la metodica. |
| `fratture/controllo` | Presa visione del precedente esame RX analogo del , rispetto al quale si conferma buona composizione del focolaio di frattura trattato con mezzi di sintesi metallica e sotto tutela gessata. ‖ Si osserva iniziale reazione osteoriparativa. | Rispetto al precedente esame RX analogo del ___, buona composizione del focolaio di frattura trattato con mezzi di sintesi metallica e sotto tutela gessata.<br>Iniziale reazione osteoriparativa. |
| `articolazioni (negativo)` | Conservati i rapporti articolari . | Conservati i rapporti articolari. |

#### Emicostato (`emicostato`)

| id | prima | dopo |
|---|---|---|
| `fratture (negativo)` | Nei radiogrammi eseguiti non si apprezzano evidenti segni radiologici da riferire a fratture costali scomposte in atto. | Nei radiogrammi eseguiti, non evidenti segni radiologici da riferire a fratture costali scomposte in atto. |

## 3. «apparentemente» al posto di «pare/paiono»

**Nessuna sostituzione «pare/paiono» → «apparentemente» è stata ancora fatta**: la regola unica (punto 2 della richiesta precedente)
non è ancora applicata. Sotto, lo stato attuale: le frasi che contengono «apparentemente», con la frase del documento originale più
simile (per vedere se l'avverbio era già del medico), e le frasi che contengono ancora «pare/paiono/sembra/potrebbe»
(le tre frasi ecografiche già segnalate in precedenza).

### 3a. Frasi con «apparentemente» (6)

| metodica › distretto | id | frase attuale | originale più simile | nell'originale |
|---|---|---|---|---|
| Ecografia › Addome completo | `fegato/parziale` | Il fegato, esplorabile parzialmente, pare presentare dimensioni ai limiti superiori della norma, margini lievemente bozzuti ed ecogenicità diffusamente aumentata, apparentemente privo di lesioni focali. | Pertanto il fegato, esplorabile parzialmente, pare presentare dimensioni ai limiti superiori della norma, margini lievemente bozzuti ed ecogenicità diffusamente aumentata, apparentemente privo di lesioni focali. <br>_(«Referti Dott. Susino» (Drive))_ | pare, apparentemente |
| Ecografia › Linfonodi | `stazioni/aumentati` | In sede ___, alcuni linfonodi di dimensioni nettamente aumentate, a morfologia ovalare e con ilo adiposo apparentemente riconoscibile, delle dimensioni massime di circa ___ mm.<br>Reperti descritti meritevoli, in considerazione dell'anamnesi, di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza. | I reperti descritti, in considerazione dell'anamnesi, sono meritevoli di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza. <br>_(«Referti Dott. Susino» (Drive))_ | — |
| TC › Torace | `cuore (negativo)` | Cuore e grossi vasi apparentemente di regolare aspetto tomodensitometrico. | Il cuore ed i grossi vasi paiono presentare regolare aspetto tomodensitometrico. <br>_(«1. TC NEGATIVO STANDARD EL-DEA»)_ | paiono |
| RM › Encefalo | `ipofisi (negativo)` | In esame non dedicato, ghiandola pituitaria apparentemente senza significative alterazioni volumetriche. | In esame non dedicato la ghiandola pituitaria non pare presentare significative alterazioni volumetriche. <br>_(«4. RM NEGATIVO STANDARD EL-DEA»)_ | pare |
| RM › Encefalo | `vasi (negativo)` | In esame non dedicato, grossi vasi arteriosi della base cranica e circolo venoso intracranico apparentemente pervi. | In esame non dedicato paiono regolarmente pervi i grossi vasi arteriosi della base cranica. <br>_(«4. RM NEGATIVO STANDARD EL-DEA»)_ | paiono |
| RX › Torace al letto (AP) | `cuore (negativo)` | Compatibilmente con il decubito supino, ombra cardiaca apparentemente ingrandita. | Compatibilmente con il decubito supino l'ombra cardiaca è apparentemente ingrandita. <br>_(«2. RX NEGATIVO STANDARD EL-DEA»)_ | apparentemente |

### 3b. Frasi che contengono ancora «pare/paiono/sembra/potrebbe» (3)

- Ecografia › Addome completo › `fegato/parziale` — Il fegato, esplorabile parzialmente, pare presentare dimensioni ai limiti superiori della norma, margini lievemente bozzuti ed ecogenicità diffusamente aumentata, apparentemente privo di lesioni focali.
- Ecografia › Polso e mano › `articolazioni/rizoartrosi-dubbia` — Dubbia irregolarità corticale all'interfaccia ossea trapezio-metacarpale che, compatibilmente con la metodica non dedicata, potrebbe essere attribuibile a fenomeni degenerativi rizoartrosici; utile integrazione con esame RX.
- Ecografia › Caviglia e piede › `versamento/trauma` — Nella sede della tumefazione clinicamente obiettivabile pare apprezzarsi interruzione della corticale ossea del malleolo peroneale in presenza di versamento intra-articolare. ⏎ Reperto meritevole di valutazione con esame radiografico mirato ed eventuale completamento con esame RM.

## 4. Frasi accorpate o divise rispetto agli originali

Individuate **automaticamente**, da controllare a occhio:
- Ecografia: confronto esatto del numero di frasi tra versione precedente e attuale (stesso id).
- TC/RX/RM: **accorpata** = una frase del Refertario che contiene quasi tutte le parole di due o più frasi vicine del documento;
  **divisa** = una frase del documento ripresa da due o più frasi del Refertario nello stesso distretto.
- I candidati automatici sono stati riletti: scartati 2 falsi positivi (TC addome acuto `arterie`, RM bacino `coxofemorali`),
  e le coppie «negativo dell'organo / sua variante positiva» nate da una riga a scelta del documento (es. «Conservata/Ridotta»),
  che sono alternative e non divisioni. Possono sfuggire accorpamenti con parole molto cambiate.

### 4a. Accorpate (2)

| metodica › distretto | id | originale | Refertario | |
|---|---|---|---|---|
| TC › Addome acuto (DEA) | `perfusione (negativo)` | La perfusione degli organi parenchimatosi intraddominali è regolare, in assenza di evidenti aree ischemiche o ipoperfuse;  i vasi venosi mantengono regolare calibro in assenza di VCI appiattita o vene sovrepatiche filiformi; si rileva fisiologica escrezione renale di urinaiodata bilateralmente. ‖ Non si rilevano quindi evidenti segni riferibili a shock o ipoperfusione sistemica. | Regolare perfusione degli organi parenchimatosi intraddominali, senza evidenti aree ischemiche o ipoperfuse; vasi venosi di regolare calibro, senza appiattimento della VCI né vene sovraepatiche filiformi; fisiologica escrezione renale di urina iodata bilateralmente: non evidenti segni riferibili a shock o ipoperfusione sistemica. | 2 frasi → 1 |
| RM › Encefalo | `vasi (negativo)` | In esame non dedicato paiono regolarmente pervi i grossi vasi arteriosi della base cranica. ‖ In esame non dedicato pare regolarmente pervio il circolo venoso intra-cranico. | In esame non dedicato, grossi vasi arteriosi della base cranica e circolo venoso intracranico apparentemente pervi. | 2 frasi → 1 |

### 4b. Divise (2)

| metodica › distretto | originale | Refertario | |
|---|---|---|---|
| RM › Ginocchio | Non si osservano alterazioni morfostrutturali e di segnale a carico di entrambe le fibrocartilagini meniscali, dei legamenti crociati, dei legamenti collaterali e del tendine del popliteo. | Non alterazioni morfostrutturali e di segnale di entrambe le fibrocartilagini meniscali. ‖ Legamenti crociati, collaterali e tendine del popliteo senza alterazioni morfostrutturali e di segnale. | 1 frase → 2 (`menischi (negativo)`, `legamenti (negativo)`) |
| RX › Torace al letto (AP) | Presenza di CVC giugulare destro con apice localizzato proiettivamente alla giunzione cavo-atriale e di catetere di Swan-Ganz con accesso giugulare sinistro con estremo localizzato proiettivamente a livello della giunzione cavo-atriale. | Presenza di CVC giugulare ___ con apice localizzato proiettivamente alla giunzione cavo-atriale. ‖ Presenza di catetere di Swan-Ganz con accesso giugulare ___ ed estremo localizzato proiettivamente a livello ___. | 1 frase → 2 (`presidi/cvc`, `presidi/swan-ganz`) |

## 5. Traduzioni EN/ES identiche all'IT

Campi multilingua in cui il testo EN o ES coincide con l'italiano: **0**.

Campi senza traduzione in una lingua dichiarata dal distretto (`lingue`): **0**.

## 6. Linter su data.js e sui referti negativi composti

### 6a. `node lint-data.js` (frasi singole + avvisi tra frasi nei referti negativi composti)

```
Segnalazioni: 22 (frasi singole: 22, referti composti: 0)
Per tipo: verbo 3, ripetizione 19

- [verbo] Ecografia › Addome completo › fegato/parziale
    Forma verbale finita: «pare»
- [ripetizione] Ecografia › Addome completo › vie-biliari/dilatate
    Ripetizione nella stessa frase: «biliari» … «biliare»
- [ripetizione] Ecografia › Addome completo › vie-urinarie/calcoli-dx
    Ripetizione nella stessa frase: «calici» … «calico»
- [ripetizione] Ecografia › Addome completo › vie-urinarie/calcoli-sx
    Ripetizione nella stessa frase: «calice» … «calico»
- [ripetizione] Ecografia › Reni e vie urinarie › vie-urinarie/calcoli-dx
    Ripetizione nella stessa frase: «calici» … «calico»
- [ripetizione] Ecografia › Reni e vie urinarie › vie-urinarie/calcoli-sx
    Ripetizione nella stessa frase: «calice» … «calico»
- [ripetizione] Ecografia › Spalla › cuffia/entesopatia-sottoscapolare
    Ripetizione nella stessa frase: «inserzionali» … «inserzionale»
- [ripetizione] Ecografia › Spalla › cuffia/rottura-totale
    Ripetizione nella stessa frase: «tendinea» … «tendine»
- [ripetizione] Ecografia › Spalla › cuffia/rottura-totale
    Ripetizione nella stessa frase: «tendinea» … «tendine»
- [ripetizione] Ecografia › Gomito › tendini (negativo)
    Ripetizione nella stessa frase: «tendini» … «tendine»
- [ripetizione] Ecografia › Gomito › tessuti/tumefazione
    Ripetizione nella stessa frase: «massimo» … «massime»
- [verbo] Ecografia › Polso e mano › articolazioni/rizoartrosi-dubbia
    Forma verbale finita: «potrebbe»
- [ripetizione] Ecografia › Ginocchio › popliteo/baker-spot
    Ripetizione nella stessa frase: «fluida» … «fluido»
- [verbo] Ecografia › Caviglia e piede › versamento/trauma
    Forma verbale finita: «pare»
- [ripetizione] Ecografia › Tessuti molli (tumefazione) › sottocute/lipoma
    Ripetizione nella stessa frase: «margini» … «margine»
- [ripetizione] Ecografia › Tessuti molli (tumefazione) › sottocute/lipomi-multipli
    Ripetizione nella stessa frase: «adiposo» … «adiposa»
- [ripetizione] Ecografia › Doppler tronchi sovraortici › vertebrali/invertito
    Ripetizione nella stessa frase: «Arteria» … «arterie»
- [ripetizione] Ecografia › Doppler tronchi sovraortici › vertebrali/ipoplasica
    Ripetizione nella stessa frase: «vertebrali» … «vertebrale»
- [ripetizione] Ecografia › Doppler venoso arti inferiori › destra/insufficienza
    Ripetizione nella stessa frase: «safeno» … «safena»
- [ripetizione] Ecografia › Doppler venoso arti inferiori › destra/insufficienza
    Ripetizione nella stessa frase: «safeno» … «safena»
- [ripetizione] Ecografia › Doppler venoso arti inferiori › sinistra/insufficienza
    Ripetizione nella stessa frase: «safeno» … «safena»
- [ripetizione] Ecografia › Doppler venoso arti inferiori › sinistra/insufficienza
    Ripetizione nella stessa frase: «safeno» … «safena»
```

### 6b. Referto negativo composto di ogni distretto (tutti gli avvisi)

Per ogni distretto: tecnica, intro (lato «destra») e frasi negative in fila, passati interi al linter.

| metodica | distretto | righe | avvisi | dettaglio |
|---|---|---|---|---|
| Ecografia | Addome completo | 11 | 0 | — |
| Ecografia | Addome in urgenza (trauma) | 3 | 0 | — |
| Ecografia | Reni e vie urinarie | 4 | 0 | — |
| Ecografia | Tiroide | 7 | 0 | — |
| Ecografia | Linfonodi | 2 | 0 | — |
| Ecografia | Spalla | 7 | 0 | — |
| Ecografia | Gomito | 6 | 1 | [ripetizione] Ripetizione nella stessa frase: «tendini» … «tendine» |
| Ecografia | Polso e mano | 5 | 0 | — |
| Ecografia | Anca | 3 | 0 | — |
| Ecografia | Anca neonatale | 1 | 0 | — |
| Ecografia | Coscia e gamba (muscoli) | 4 | 0 | — |
| Ecografia | Ginocchio | 5 | 0 | — |
| Ecografia | Caviglia e piede | 6 | 0 | — |
| Ecografia | Tessuti molli (tumefazione) | 2 | 0 | — |
| Ecografia | Regione inguinale (ernia) | 3 | 0 | — |
| Ecografia | Parete addominale | 2 | 0 | — |
| Ecografia | Testicoli | 5 | 0 | — |
| Ecografia | Doppler tronchi sovraortici | 4 | 0 | — |
| Ecografia | Doppler venoso arti inferiori | 7 | 0 | — |
| Ecografia | Doppler arterioso arti inferiori | 3 | 0 | — |
| Ecografia | Doppler aorta e assi iliaci | 4 | 0 | — |
| Ecografia | Doppler arterie renali | 5 | 0 | — |
| Ecografia | Doppler trapianto renale | 6 | 0 | — |
| TC | Encefalo senza mdc | 6 | 0 | — |
| TC | Angio-TC encefalo (stroke) | 10 | 0 | — |
| TC | Massiccio facciale | 5 | 0 | — |
| TC | Collo | 7 | 0 | — |
| TC | Torace | 8 | 0 | — |
| TC | Angio-TC torace (embolia polmonare) | 6 | 0 | — |
| TC | Addome | 16 | 0 | — |
| TC | Addome acuto (DEA) | 29 | 0 | — |
| RM | Spalla | 8 | 0 | — |
| RM | Encefalo | 11 | 0 | — |
| RM | Rachide lombosacrale | 8 | 0 | — |
| RM | Rachide cervicale | 8 | 0 | — |
| RM | Ginocchio | 9 | 0 | — |
| RM | Caviglia | 7 | 0 | — |
| RM | Bacino (sacro-iliache) | 5 | 0 | — |
| RM | Colangio-RM | 7 | 0 | — |
| RX | Torace (PA e LL) | 4 | 0 | — |
| RX | Torace al letto (AP) | 5 | 0 | — |
| RX | Addome diretto | 4 | 0 | — |
| RX | Rachide cervicale | 8 | 0 | — |
| RX | Rachide dorsale | 4 | 0 | — |
| RX | Rachide lombosacrale | 4 | 0 | — |
| RX | Bacino | 6 | 0 | — |
| RX | Segmento osseo (trauma) | 3 | 0 | — |
| RX | Emicostato | 2 | 0 | — |

Totale avvisi sui referti negativi composti: **1**.

## 7. Test, parità CSV, id

### 7a. Test del linter (`node --test style/linter.test.js`)

```
# tests 14
# pass 14
# fail 0
# cancelled 0
# skipped 0
# todo 0
```

### 7b. Parità CSV (review.html nel browser vs `review_export.py`)

- `review.html` (Chromium headless, localStorage vuoto) → «Esporta CSV»: 921 righe di dati, nessun errore JavaScript.
- `python3 review_export.py`: 921 righe di dati, stesse colonne.
- Confronto byte per byte: **identici**, a parte il ritorno a capo finale (`\r\n`) che Python aggiunge dopo l'ultima riga e il browser no
  (differenza già presente nei confronti precedenti, ininfluente in Excel).
- Problemi automatici in entrambi: 713 righe, tutti **avvisi** (470 «frase riscritta», 234 «frase nuova», 178 «traduzione nuova»; più avvisi possono stare sulla stessa riga), **0 errori**.

### 7c. Id duplicati o mancanti

Controllati: 4 metodiche, 48 distretti, 267 organi, 380 reperti, 14 frasi comuni.

Esito: **nessun id duplicato o mancante**, nessun organo vuoto.

Anche la revisione automatica (stessi controlli in `review.html` e `review_export.py`) non riporta errori: solo avvisi
«frase nuova», «frase riscritta» e «traduzione nuova».
