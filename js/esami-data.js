/* DA VERIFICARE: iconaAlt = testo alternativo delle illustrazioni nelle pagine esame (descrizione anatomica). */
window.ESAMI = [
  {
    id: 'addome-completo',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/addome-completo.svg',
    iconaAlt: 'Illustrazione: organi dell\'addome',
    nome: 'Ecografia addome completo',
    categoria: 'Addome',
    descrizione:
      'Valuta fegato, colecisti (cistifellea), vie biliari, pancreas, milza, reni, vescica, aorta addominale e, negli uomini, la prostata. ' +
      'Il medico la richiede per dolore all’addome, analisi del sangue alterate (fegato, pancreas, reni), sospetti calcoli alla colecisti o ai reni, ittero (colorito giallo della pelle), febbre senza causa chiara, o per controllare nel tempo una malattia già nota.',
    prenotaNome: 'Ecografia addome completo',
  },
  {
    id: 'addome-superiore',
    icona: 'images/icone/addome-superiore.svg',
    iconaAlt: 'Illustrazione: fegato e colecisti, nella parte alta dell\'addome',
    nome: 'Ecografia addome superiore',
    categoria: 'Addome',
    descrizione:
      'Studia fegato, colecisti (cistifellea), vie biliari, pancreas, milza e reni. ' +
      'Il medico la richiede per dolore nella parte alta dell’addome, colica biliare (dolore forte dovuto ai calcoli della colecisti), fegato o milza ingrossati, ittero (colorito giallo della pelle), analisi del sangue alterate (transaminasi, bilirubina, amilasi/lipasi) o febbre senza causa chiara.',
    prenotaNome: 'Ecografia addome superiore',
  },
  {
    id: 'addome-inferiore',
    icona: 'images/icone/addome-inferiore.svg',
    iconaAlt: 'Illustrazione: vescica, nella parte bassa dell\'addome',
    nome: 'Ecografia addome inferiore',
    categoria: 'Addome',
    descrizione:
      'Esplora vescica, prostata (dall’esterno, sopra il pube), utero e ovaie, grossi vasi del bacino e, nei casi indicati, l’intestino del bacino. ' +
      'Il medico la richiede per dolore al basso ventre, tracce di sangue nelle urine, infezioni urinarie che si ripetono, difficoltà a svuotare la vescica o sospetta malattia della vescica.',
    prenotaNome: 'Ecografia addome inferiore',
  },
  {
    id: 'apparato-urinario',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/apparato-urinario.svg',
    iconaAlt: 'Illustrazione: reni, vie urinarie e vescica',
    nome: 'Ecografia apparato urinario',
    categoria: 'Apparato urinario e urologia',
    descrizione:
      'Valuta reni, ureteri (i canali che portano l’urina dai reni alla vescica), vescica e, se il medico lo richiede, l’urina che resta in vescica dopo aver urinato (residuo post-minzionale). ' +
      'Si prescrive per colica renale, sangue nelle urine (ematuria), infezioni urinarie che si ripetono, sospetto ostacolo al passaggio dell’urina o controllo di una malattia dei reni già nota.',
    prenotaNome: 'Ecografia apparato urinario',
  },
  {
    id: 'renale',
    icona: 'images/icone/renale.svg',
    iconaAlt: 'Illustrazione: i due reni',
    nome: 'Ecografia renale',
    categoria: 'Apparato urinario e urologia',
    descrizione:
      'Studia i reni, la pelvi renale (la parte del rene in cui si raccoglie l’urina) e il primo tratto degli ureteri. ' +
      'Indicata per dolore al fianco, colica renale, sangue nelle urine (ematuria), controllo di calcoli o di una malattia dei reni già nota, quando non serve lo studio completo dell’apparato urinario con la vescica.',
    prenotaNome: 'Ecografia renale',
  },
  {
    id: 'vescico-prostatica',
    icona: 'images/icone/vescico-prostatica.svg',
    iconaAlt: 'Illustrazione: vescica e prostata',
    nome: 'Ecografia vescico-prostatica',
    categoria: 'Apparato urinario e urologia',
    descrizione:
      'Esame di vescica e prostata fatto dall’esterno, sopra il pube. ' +
      'Indicata per disturbi nell’urinare (getto debole, bisogno frequente, risvegli notturni), sospetto ingrossamento benigno della prostata, misura dell’urina che resta in vescica dopo aver urinato o controlli urologici nel tempo; richiede la vescica ben piena.',
    prenotaNome: 'Ecografia vescico-prostatica',
  },
  {
    id: 'scrotale-testicolare',
    icona: 'images/icone/scrotale-testicolare.svg',
    iconaAlt: 'Illustrazione: testicoli',
    nome: 'Ecografia scrotale e testicolare',
    categoria: 'Apparato urinario e urologia',
    descrizione:
      'Studia testicoli, epididimi (i piccoli canali dietro ogni testicolo) e funicolo spermatico. ' +
      'Si richiede per dolore o gonfiore dello scroto, un nodulo che si sente al tatto, un trauma, sospetta torsione del testicolo (urgenza), varicocele (vene dilatate), idrocele (raccolta di liquido), infiammazione del testicolo o dell’epididimo, o nello studio dell’infertilità maschile.',
    prenotaNome: 'Ecografia scrotale e testicolare',
  },
  {
    id: 'tiroide',
    icona: 'images/icone/tiroide.svg',
    iconaAlt: 'Illustrazione: tiroide, ghiandola alla base del collo',
    nome: 'Ecografia tiroide',
    categoria: 'Tiroide e collo',
    descrizione:
      'Valuta volume, struttura ed eventuali noduli della tiroide. ' +
      'Indicata per gozzo (tiroide ingrossata), un nodulo che si sente al tatto, voce rauca o difficoltà a deglutire, familiari con malattie della tiroide, tiroidite o analisi alterate (TSH, fT4, anticorpi anti-tiroide).',
    prenotaNome: 'Ecografia tiroide',
  },
  {
    id: 'collo',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/collo.svg',
    iconaAlt: 'Illustrazione: collo e ghiandole salivari',
    nome: 'Ecografia del collo',
    categoria: 'Tiroide e collo',
    descrizione:
      'Esamina tiroide, ghiandole salivari (parotide e sottomandibolare), linfonodi e vasi del collo. ' +
      'Utile per gonfiori che si sentono al tatto, linfonodi ingrossati, malattie delle ghiandole salivari o controlli dopo un intervento al collo.',
    prenotaNome: 'Ecografia del collo',
  },
  {
    id: 'muscolo-scheletrica',
    icona: 'images/icone/muscolo-scheletrica.svg',
    iconaAlt: 'Illustrazione: articolazione con muscoli e tendini',
    nome: 'Ecografia muscolo-scheletrica',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Studio ecografico di muscoli, tendini, legamenti e borse (piccole sacche di liquido che riducono l’attrito) nella zona indicata dal medico. ' +
      'Indicata dopo un trauma o uno sforzo ripetuto per escludere strappi muscolari, tendiniti, distorsioni, ematomi e borsiti; permette di valutare la zona anche durante il movimento.',
    prenotaNome: 'Ecografia muscolo-scheletrica',
  },
  {
    id: 'spalla',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/spalla.svg',
    iconaAlt: 'Illustrazione: articolazione della spalla',
    nome: 'Ecografia spalla',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Valuta i tendini della cuffia dei rotatori (i tendini che muovono la spalla), in particolare il sovraspinato, la borsa sottoacromiale e il tendine del bicipite. ' +
      'Si richiede per dolore nel sollevare o allargare il braccio, sospetta tendinopatia o lesione della cuffia, borsite (infiammazione della borsa) o trauma.',
    prenotaNome: 'Ecografia spalla',
  },
  {
    id: 'ginocchio',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/ginocchio.svg',
    iconaAlt: 'Illustrazione: articolazione del ginocchio',
    nome: 'Ecografia ginocchio',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Studia tendini (rotuleo e quadricipitale), legamenti collaterali, borse ed eventuale versamento articolare (liquido dentro l’articolazione). ' +
      'Indicata dopo distorsione o trauma sportivo, gonfiore del ginocchio, sospetto versamento o tendinopatia; vede meno bene la parte profonda dei menischi.',
    prenotaNome: 'Ecografia ginocchio',
  },
  {
    id: 'anca',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/anca.svg',
    iconaAlt: 'Illustrazione: articolazione dell\'anca',
    nome: 'Ecografia anca',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Valuta i tendini intorno all’anca (glutei, ileopsoas), le borse trocanteriche (sul fianco dell’anca) e i tessuti molli dell’anca nell’adulto. ' +
      'Utile per tendinopatia del trocantere, borsite, dolore all’inguine o sul fianco dell’anca e controlli dopo un trauma.',
    prenotaNome: 'Ecografia anca',
  },
  {
    id: 'anca-neonatale',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/anca-neonatale.svg',
    iconaAlt: 'Illustrazione: anca del neonato',
    nome: 'Ecografia anca neonatale',
    categoria: 'Pediatrica',
    descrizione:
      'Controllo con ultrasuoni delle anche del neonato e del lattante (metodo di Graf), per vedere se le anche si stanno formando bene e riconoscere presto la displasia evolutiva dell’anca, cioè un’anca che non si è formata bene o che tende a uscire dalla sua sede. ' +
      'Si fa nelle prime settimane di vita, soprattutto se ci sono fattori di rischio (parto podalico, casi in famiglia, poco liquido amniotico in gravidanza) o se il pediatra ha notato qualcosa alla visita. A volte il pediatra chiede di ripeterla dopo qualche settimana per seguire la crescita dell’anca.',
    prenotaNome: 'Ecografia anca neonatale',
  },
  {
    id: 'gomito',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/gomito.svg',
    iconaAlt: 'Illustrazione: articolazione del gomito',
    nome: 'Ecografia gomito',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Esamina i tendini che si attaccano sul lato esterno (epicondilo) e interno (epitroclea) del gomito, il tendine del bicipite nella piega del gomito e la borsa sulla punta del gomito (borsa olecranica). ' +
      'Indicata per epicondilite (il «gomito del tennista») o epitrocleite (il «gomito del golfista»), dolore da movimenti ripetuti, borsite olecranica o difficoltà a muovere il gomito dopo un trauma.',
    prenotaNome: 'Ecografia gomito',
  },
  {
    id: 'polso-mano',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/polso-mano.svg',
    iconaAlt: 'Illustrazione: polso e mano',
    nome: 'Ecografia polso e mano',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Studia i tendini che piegano e raddrizzano le dita, il nervo mediano nel tunnel carpale (il passaggio al polso), le borse e le articolazioni di polso e mano. ' +
      'Indicata per sospetta sindrome del tunnel carpale (formicolio e dolore alle dita), tenosinovite (infiammazione della guaina dei tendini), dolore da sforzo ripetuto o trauma.',
    prenotaNome: 'Ecografia polso e mano',
  },
  {
    id: 'caviglia-piede',
    icona: 'images/icone/caviglia-piede.svg',
    iconaAlt: 'Illustrazione: caviglia e piede',
    nome: 'Ecografia caviglia e piede',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Valuta i legamenti intorno alla caviglia (malleoli), il tendine di Achille, la fascia plantare (la fascia sotto la pianta del piede) e le borse del piede. ' +
      'Si richiede dopo una distorsione della caviglia, per sospetta lesione dei legamenti, tendinopatia dell’Achille o dolore alla pianta del piede.',
    prenotaNome: 'Ecografia caviglia e piede',
  },
  {
    id: 'parti-molli',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/parti-molli.svg',
    iconaAlt: 'Illustrazione: pelle e tessuti sotto la pelle',
    nome: 'Ecografia parti molli',
    categoria: 'Muscolo-scheletrico',
    descrizione:
      'Analizza gonfiori sotto la pelle, cisti, lipomi (noduli di grasso), ematomi e raccolte di liquido superficiali. ' +
      'Utile per una massa che si sente al tatto e di cui non si conosce l’origine, una sospetta cisti o una lesione dopo un trauma; aiuta a distinguere le lesioni piene di liquido da quelle solide.',
    prenotaNome: 'Ecografia parti molli',
  },
  {
    id: 'doppler-tsa',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-tsa.svg',
    iconaAlt: 'Illustrazione: arterie carotidi e vertebrali del collo',
    nome: 'Ecocolordoppler carotidi',
    categoria: 'Vascolare (Doppler)',
    descrizione:
      'Valuta forma e flusso di carotidi, vertebrali e succlavie, le grandi arterie che dal cuore portano il sangue alla testa e alle braccia (sull’impegnativa anche «TSA», tronchi sovra-aortici). ' +
      'Indicata per valutare e seguire nel tempo il rischio di ictus: fattori di rischio cardiovascolare, soffio carotideo (rumore che il medico sente con lo stetoscopio), TIA (disturbo simile all’ictus che passa in poco tempo) o ictus precedenti, vertigini di origine vascolare o restringimenti già noti.',
    prenotaNome: 'Ecocolordoppler TSA (tronchi sovra-aortici)',
  },
  {
    id: 'doppler-aorta',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-aorta.svg',
    iconaAlt: 'Illustrazione: aorta nell\'addome',
    nome: 'Ecocolordoppler aorta addominale',
    categoria: 'Vascolare (Doppler)',
    descrizione:
      'Valuta forma e flusso dell’aorta addominale (la grande arteria che attraversa l’addome) e delle arterie iliache comuni, in cui si divide. ' +
      'Indicata per seguire nel tempo un aneurisma (dilatazione dell’arteria), per sospetta dilatazione dell’aorta o per una malattia dei vasi dell’addome già nota.',
    prenotaNome: 'Ecocolordoppler aorta addominale',
  },
  {
    id: 'doppler-arterie-renali',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arterie-renali.svg',
    iconaAlt: 'Illustrazione: arterie che portano il sangue ai reni',
    nome: 'Ecocolordoppler arterie renali',
    categoria: 'Vascolare (Doppler)',
    descrizione:
      'Studia il flusso e gli eventuali restringimenti (stenosi) delle arterie che portano il sangue ai reni. ' +
      'Indicata per pressione alta causata da un restringimento delle arterie del rene (ipertensione renovascolare), restringimento già noto o sospetto, controlli dopo un intervento sui vasi del rene.',
    prenotaNome: 'Ecocolordoppler arterie renali',
  },
  {
    id: 'doppler-arti-inferiori',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arti-inferiori.svg',
    iconaAlt: 'Illustrazione: vene e arterie della gamba',
    nome: 'Ecocolordoppler arti inferiori',
    categoria: 'Vascolare (Doppler)',
    descrizione:
      /* DA VERIFICARE: glosse di arteriopatia periferica e trombosi venosa profonda (31/10/2026) */
      'Studia la circolazione delle arterie e/o delle vene di gambe e piedi. ' +
      'Arterie: claudicatio intermittente (dolore alle gambe camminando, che passa con il riposo), sospetta arteriopatia periferica (restringimento delle arterie delle gambe), ferite che guariscono male. Vene: gambe pesanti, varici, sospetta trombosi venosa profonda (coagulo in una vena della gamba) o insufficienza venosa.',
    prenotaNome: 'Ecocolordoppler arti inferiori',
  },
  {
    id: 'doppler-arti-superiori',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arti-superiori.svg',
    iconaAlt: 'Illustrazione: vene e arterie del braccio',
    nome: 'Ecocolordoppler arti superiori',
    categoria: 'Vascolare (Doppler)',
    descrizione:
      'Valuta arterie e vene di braccia e avambracci. ' +
      'Indicata per gonfiore di un solo braccio, sospetta trombosi delle vene del braccio, controllo della fistola per la dialisi o alterazioni del flusso nelle arterie del braccio.',
    prenotaNome: 'Ecocolordoppler arti superiori',
  },
  {
    id: 'linfonodi',
    icona: 'images/icone/linfonodi.svg',
    iconaAlt: 'Illustrazione: linfonodi',
    nome: 'Ecografia linfonodi',
    categoria: 'Altro',
    descrizione:
      'Valuta i linfonodi superficiali (collo, ascelle, inguine) per dimensioni, forma e struttura interna. ' +
      'Si richiede per un linfonodo che si sente al tatto e non scompare, febbre o infiammazioni in corso, controllo di una malattia già nota o sospetto di linfonodi ingrossati.',
    prenotaNome: 'Ecografia linfonodi',
  },
];
