window.ESAMI_PAZIENTE = {
  'addome-completo': {
    sintesi: 'Controllo dell’addome: fegato, cistifellea, pancreas, milza, reni, vescica e altri organi.',
    perche:
      'Il medico te la prescrive se hai dolore o fastidi all’addome, analisi del sangue alterate, sospetta calcolosi o se serve un controllo di una patologia già nota.',
    svolgimento:
      'Ti sdrai sul lettino. Si applica del gel sull’addome e si muove la sonda. A volte ti chiederanno di trattenere un po’ il respiro. Dura in genere 15–20 minuti.',
    cosaControlla:
      'Guardiamo fegato, cistifellea e vie biliari, pancreas, milza, reni, vescica e l’aorta addominale. Negli uomini valutiamo anche la prostata.',
  },
  'addome-superiore': {
    sintesi: 'Controllo della parte alta dell’addome: fegato, cistifellea, pancreas, milza e reni.',
    perche:
      'Serve se hai dolore sotto le costole, sospetta colica della cistifellea, febbre senza causa chiara o analisi del fegato o del pancreas fuori norma.',
    svolgimento:
      'Sei disteso supino. Gel sulla pelle e sonda che scorre sulla parte alta dell’addome. A volte serve trattenere il respiro qualche secondo.',
    cosaControlla:
      'Controlliamo fegato, cistifellea, vie biliari, pancreas, milza e la parte alta dei reni.',
  },
  'addome-inferiore': {
    sintesi: 'Controllo della parte bassa dell’addome: reni, vescica, prostata e organi pelvici.',
    perche:
      'Utile per dolore in basso ventre, bruciore o infezioni urinarie di ripetizione, difficoltà a urinare o sangue nelle urine.',
    svolgimento:
      'Ti sdrai e si applica il gel sul basso ventre. La sonda passa sopra la vescica e la zona pelvica.',
    cosaControlla:
      'Guardiamo reni, vescica, prostata (negli uomini, da sopra il pube) e le strutture del bacino in quella zona.',
  },
  'apparato-urinario': {
    sintesi: 'Controllo di reni, vie urinarie e vescica, anche dopo aver urinato.',
    perche:
      'La fai se hai colica renale, sangue nelle urine, infezioni urinarie frequenti o il medico sospetta un ostacolo al passaggio dell’urina.',
    svolgimento:
      'Prima si guarda con la vescica piena; poi, se serve, ti chiederemo di urinare e si controlla quanta urina resta in vescica. Gel sulla pancia o sul fianco.',
    cosaControlla:
      'Valutiamo reni, ureteri e vescica, e misuriamo l’eventuale residuo di urina dopo la minzione.',
    faqExtra: [
      {
        q: 'Quanto devo bere e da che ora non devo urinare?',
        a:
          'Bevi circa un litro d’acqua nell’ora prima dell’esame e poi trattieni. La vescica piena fa da finestra: senza, la parte bassa non si valuta bene. Non serve invece il digiuno.',
      },
      {
        q: 'E se proprio non riesco a trattenere?',
        a:
          'Dimmelo appena arrivi, non è un problema. Iniziamo studiando reni e alta via urinaria, che non dipendono dalla vescica, e recuperiamo il resto appena possibile. Una parte dell’esame si fa comunque dopo aver urinato, per misurare quanta urina resta.',
      },
      {
        q: 'L’ecografia vede i calcoli?',
        a:
          'Vede bene i calcoli dentro il rene e l’eventuale dilatazione delle vie urinarie. I calcoli lungo l’uretere, che è profondo e circondato da aria intestinale, spesso non si vedono direttamente: in quel caso ne riconosco i segni indiretti e lo scrivo chiaramente nel referto.',
      },
    ],
  },
  renale: {
    sintesi: 'Controllo mirato di dimensioni, forma e struttura dei reni.',
    /* DA VERIFICARE: esempio di controllo nel tempo di una cisti o di un calcolo renale già noti,
       aggiunto per spiegare quando si sceglie questo esame invece dell’ecografia dell’apparato urinario. */
    perche:
      'Il medico te la prescrive per dolore al fianco o alla schiena, sospetta colica renale, sangue nelle urine, oppure per controllare nel tempo un rene già seguito, per esempio per una cisti o un calcolo già noti. Si sceglie questo esame, mirato solo ai reni, quando non serve guardare anche la vescica o il flusso del sangue.',
    svolgimento:
      'Ti sdrai sul lettino, prima supino e poi su un fianco e sull’altro. Metto un po’ di gel sulla schiena e sul fianco, dove si trovano i reni, e sposto la sonda per vederli da più lati. È indolore, come ogni ecografia.',
    /* DA VERIFICARE: elenco esplicito di calcoli, cisti e dilatazione delle vie urinarie
       come reperti tipici che si possono vedere con questo esame. */
    cosaControlla:
      'Guardiamo dimensioni, forma e posizione dei reni, lo spessore del tessuto renale e la pelvi renale, cioè la parte interna dove si raccoglie l’urina prima di scendere nell’uretere. Vediamo anche l’inizio degli ureteri, ma non la vescica. Notiamo se ci sono calcoli, cisti o un rene dilatato per un ostacolo al deflusso dell’urina.',
    faqExtra: [
      {
        q: 'Che differenza c’è tra questo esame e l’ecografia dell’apparato urinario?',
        a:
          'L’ecografia renale guarda solo i reni e l’inizio degli ureteri. L’ecografia dell’apparato urinario aggiunge lo studio della vescica e, se serve, misura quanta urina resta dopo aver urinato. Se non sai quale prenotare, guarda cosa ha scritto il medico sull’impegnativa oppure chiamaci.',
        verificata: false,
      },
      {
        q: 'Che differenza c’è con l’ecocolordoppler delle arterie renali?',
        a:
          'Sono due esami diversi. L’ecografia renale guarda la forma e la struttura dei reni. L’ecocolordoppler delle arterie renali guarda invece come scorre il sangue nelle arterie che portano sangue ai reni: si usa soprattutto per la pressione alta difficile da controllare.',
        verificata: false,
      },
      {
        q: 'Devo arrivare con la vescica piena, come per l’ecografia dell’apparato urinario?',
        a:
          'No. Per l’ecografia renale non serve avere la vescica piena né il digiuno: puoi mangiare, bere e urinare normalmente. La vescica piena serve solo quando si guarda anche quest’organo, come nell’ecografia dell’apparato urinario o vescico-prostatica.',
        verificata: false,
      },
    ],
  },
  'vescico-prostatica': {
    sintesi: 'Controllo di vescica e prostata dalla parte sopra il pube.',
    perche:
      'Serve se urini spesso, con getto debole, ti alzi di notte per urinare o il medico sospetta un ingrossamento della prostata.',
    svolgimento:
      'È importante arrivare con la vescica abbastanza piena. Ti sdrai, gel sul basso ventre, sonda sopra il pube.',
    cosaControlla:
      'Valutiamo vescica e prostata e, se serve, quanta urina resta dopo aver urinato.',
  },
  'scrotale-testicolare': {
    sintesi: 'Controllo di testicoli, epididimo e strutture dello scroto.',
    perche:
      'Serve per dolore o gonfiore ai testicoli, un nodulo che senti al tatto, un trauma o controlli legati a varicocele, idrocele o infertilità.',
    svolgimento:
      'Ti sdrai. Si applica gel sullo scroto e si passa la sonda delicatamente. In caso di dolore acuto va segnalato subito.',
    cosaControlla:
      'Valutiamo testicoli, epididimo e il funicolo spermatico, cercando cause di dolore, gonfiore o masse.',
    faqExtra: [
      {
        q: 'Quando bisogna correre subito, senza aspettare?',
        a:
          'Se il dolore è comparso all’improvviso ed è intenso, magari con gonfiore e nausea, non prenotare: vai in pronto soccorso. Può essere una torsione del testicolo, una condizione in cui le ore contano davvero.',
      },
      {
        q: 'Serve qualche preparazione?',
        a:
          'Nessuna. Non serve digiuno né vescica piena. È un esame rapido, si fa da sdraiati e dura pochi minuti.',
      },
      {
        q: 'Mi sono accorto di un gonfiore: cosa si riesce a distinguere?',
        a:
          'L’ecografia separa bene fra loro le cause più comuni: cisti dell’epididimo, idrocele, varicocele e formazioni solide del testicolo. È proprio questa distinzione a stabilire se basta un controllo nel tempo o se serve approfondire, e la sappiamo al termine dell’esame.',
      },
    ],
  },
  tiroide: {
    sintesi: 'Controllo della tiroide al collo: dimensioni, forma e eventuali noduli.',
    perche:
      'La fai se senti un gonfiore al collo, hai un nodulo palpabile, disturbi alla voce o analisi della tiroide alterate.',
    svolgimento:
      'Ti sdrai con il collo leggermente all’indietro. Gel sul collo, sonda che scorre sulla tiroide. Dura pochi minuti.',
    cosaControlla:
      'Guardiamo grandezza, struttura e presenza di noduli o altre alterazioni della tiroide.',
  },
  collo: {
    sintesi: 'Controllo di tiroide, ghiandole salivari, linfonodi e altre strutture del collo.',
    perche:
      'Utile se hai un gonfiore al collo, linfonodi ingrossati, problemi alle ghiandole salivari o controlli dopo un intervento.',
    svolgimento:
      'Stessa posizione dell’ecografia tiroide: disteso, gel sul collo, sonda che esplora la zona indicata dal medico.',
    cosaControlla:
      'Possiamo valutare tiroide, ghiandole salivari (sotto l’orecchio e sotto la mandibola), linfonodi e vasi del collo.',
  },
  'muscolo-scheletrica': {
    sintesi: 'Controllo di muscoli, tendini e legamenti nella zona che ti fa male.',
    perche:
      'Serve dopo un trauma, uno strappo, un sovraccarico sportivo o un dolore che non passa a un’articolazione o a un muscolo.',
    svolgimento:
      'Si mette gel sulla zona interessata. A volte ti chiederemo di muovere l’arto mentre guardiamo lo schermo.',
    cosaControlla:
      'Guardiamo muscoli, tendini, legamenti e borse nella regione indicata sulla ricetta.',
  },
  spalla: {
    sintesi: 'Controllo di tendini e strutture della spalla.',
    perche:
      'La fai se ti fa male alzare il braccio, dopo un trauma o se sospetti infiammazione o lesione alla spalla.',
    svolgimento:
      'Gel sulla spalla; a volte muovi il braccio su indicazione. La sonda passa davanti e lateralmente alla spalla.',
    cosaControlla:
      'Valutiamo i tendini della cuffia dei rotatori, la borsa sotto l’acromion e il tendine del bicipite.',
    faqExtra: [
      {
        q: 'L’ecografia della spalla vede la cuffia dei rotatori?',
        a:
          'Sì, ed è proprio il suo punto di forza. I tendini della cuffia, la borsa sotto l’acromion e il capo lungo del bicipite si studiano molto bene con gli ultrasuoni, sia per le infiammazioni sia per le lesioni.',
      },
      {
        q: 'Meglio l’ecografia o la risonanza per la spalla?',
        a:
          'Dipende dal sospetto. Per tendini, borsa e calcificazioni l’ecografia è di prima scelta, è rapida e permette di muovere il braccio durante l’esame. La risonanza serve quando il sospetto riguarda il labbro glenoideo, la cartilagine o l’osso, o quando si sta programmando un intervento.',
      },
      {
        q: 'Perché mi fate muovere il braccio durante l’esame?',
        a:
          'Perché la spalla si studia in movimento. Facendoti alzare e ruotare il braccio vedo i tendini scorrere sotto l’acromion: alcuni conflitti e certe lesioni si rendono evidenti solo così, mentre a braccio fermo passerebbero inosservati.',
      },
    ],
  },
  ginocchio: {
    sintesi: 'Controllo di tendini, legamenti e eventuale liquido nel ginocchio.',
    perche:
      'Utile dopo una distorsione, un infortunio durante lo sport, gonfiore del ginocchio o dolore davanti o ai lati.',
    svolgimento:
      'Ti sdrai o resti seduto con il ginocchio piegato. Gel e sonda sulla zona dolente. Possiamo chiederti piccoli movimenti.',
    cosaControlla:
      'Guardiamo tendini del ginocchio, legamenti laterali, borse e se c’è liquido dentro l’articolazione. I menischi profondi si vedono meno bene.',
    faqExtra: [
      {
        q: 'L’ecografia del ginocchio vede i menischi e i legamenti crociati?',
        a:
          'Solo in parte, ed è giusto saperlo prima. Menischi e crociati stanno in profondità dentro l’articolazione e l’esame di riferimento per loro è la risonanza magnetica. L’ecografia è invece molto valida per tendini, legamenti laterali, borse e liquido.',
      },
      {
        q: 'A cosa serve allora l’ecografia del ginocchio?',
        a:
          'Serve, e molto, per il tendine rotuleo e quello del quadricipite, per le borsiti, per i legamenti collaterali, per la cisti di Baker dietro al ginocchio e per quantificare il versamento articolare. Sono i problemi più frequenti dopo un sovraccarico sportivo o una distorsione.',
      },
      {
        q: 'Ho il ginocchio gonfio: l’ecografia serve?',
        a:
          'Sì, è uno dei casi in cui rende di più. Vedo subito se il gonfiore è liquido dentro l’articolazione, quanto ne c’è e dove si raccoglie, e se dietro si è formata una cisti di Baker. È un’informazione che indirizza la terapia già lo stesso giorno.',
      },
    ],
  },
  anca: {
    sintesi: 'Controllo di tendini e strutture morbide intorno all’anca, nell’adulto.',
    /* DA VERIFICARE: elenco di quadri clinici (tendinopatia dei glutei, borsite trocanterica,
       tendinopatia di ileopsoas e adduttori, anca a scatto, sport come corsa e calcio, controllo
       dei tessuti intorno a una protesi d’anca) e indicazione che per l’artrosi si preferisce la radiografia. */
    perche:
      'Il medico te la prescrive per dolore sul fianco dell’anca, spesso legato ai tendini dei glutei o alla borsa trocanterica, oppure per dolore all’inguine legato ai tendini più profondi (ileopsoas o adduttori). È utile anche se senti uno scatto o un click camminando, dopo un trauma, o per un fastidio comparso con lo sport, per esempio corsa o calcio. Si usa pure per controllare i tessuti molli intorno a una protesi d’anca già impiantata. Non è invece l’esame giusto per studiare l’osso o la cartilagine dell’articolazione: per l’artrosi dell’anca il medico userà più spesso una radiografia.',
    /* DA VERIFICARE: descrizione della posizione (fianco o pancia in giù) e della manovra dinamica
       (muovere la gamba) per lo studio dell’anca a scatto. */
    svolgimento:
      'Ti sdrai sul lettino. Metto il gel sull’inguine, sul fianco o su entrambi, a seconda di dove senti dolore: a volte ti chiedo di girarti su un fianco o di metterti a pancia in giù, per vedere bene anche la parte posteriore. Se sospetto uno scatto dell’anca, ti chiedo di muovere la gamba mentre guardo lo schermo, per vedere come si comporta il tendine. L’esame è indolore e dura pochi minuti.',
    /* DA VERIFICARE: elenco esplicito delle strutture valutate (glutei, ileopsoas, adduttori,
       eventuale liquido articolare, tessuti intorno a una protesi) e limite dell’ecografia
       rispetto a osso e cartilagine. */
    cosaControlla:
      'Valutiamo i tendini dei muscoli glutei e la borsa trocanterica sul fianco, i tendini dell’ileopsoas e degli adduttori all’inguine, ed eventuale liquido nell’articolazione dell’anca. Se hai una protesi, controlliamo anche i tessuti molli intorno all’impianto. Non vediamo bene l’osso in profondità né la cartilagine dell’articolazione: per quelli restano più adatte la radiografia o la risonanza.',
    faqExtra: [
      {
        q: 'Che differenza c’è tra questa ecografia e l’ecografia dell’anca del neonato?',
        a:
          'Sono due esami molto diversi. L’ecografia dell’anca nell’adulto guarda tendini, borse e tessuti molli intorno all’articolazione, per dolori o traumi. L’ecografia dell’anca neonatale è invece uno screening che si fa nei primi mesi di vita per controllare come si è formata l’articolazione stessa (metodo di Graf), non i tendini. Se cerchi il controllo per un neonato, prenota quella specifica.',
        verificata: false,
      },
      {
        q: 'Ho un dolore che si trasforma in uno scatto quando cammino: l’ecografia lo vede?',
        a:
          'Spesso sì. Quella che si chiama “anca a scatto” è spesso legata a un tendine, per esempio l’ileopsoas o la banda che passa sul trocantere, che scorre in modo anomalo sull’osso. Facendoti muovere la gamba durante l’esame, a volte riesco a vedere proprio il movimento che provoca lo scatto.',
        verificata: false,
      },
      {
        q: 'Ho una protesi d’anca: posso comunque fare l’ecografia?',
        a:
          'Sì. L’ecografia non usa radiazioni e può controllare i tendini e i tessuti molli intorno alla protesi, per esempio se sospetti una raccolta di liquido. Il metallo della protesi impedisce però di vedere in profondità la parte a contatto con l’osso: per quella serve un altro tipo di controllo, indicato dal tuo ortopedico.',
        verificata: false,
      },
      {
        q: 'L’ecografia vede l’artrosi dell’anca?',
        a:
          'Non è l’esame più adatto. L’artrosi riguarda soprattutto l’osso e la cartilagine dell’articolazione, che si vedono meglio con una radiografia. L’ecografia è invece utile per i tendini e i tessuti molli intorno all’anca, e per un eventuale versamento nell’articolazione.',
        verificata: false,
      },
    ],
  },
  'anca-neonatale': {
    sintesi: 'Controllo delle anche del neonato o del lattante piccolo.',
    perche:
      'Si fa nelle prime settimane di vita per escludere l’anca che non è formata bene o che esce dalla sede, soprattutto se ci sono fattori di rischio o se il pediatra lo chiede.',
    svolgimento:
      'Il bambino resta disteso o in braccio al genitore. Si passa una sonda piccola sulle anche, con gel.',
    cosaControlla:
      'Guardiamo se l’anca del bambino è matura e stabile, secondo il metodo usato in pediatria (Graf).',
    faqExtra: [
      {
        q: 'A che età si fa l’ecografia delle anche al neonato?',
        a:
          'Di norma fra la quarta e la sesta settimana di vita, comunque entro i primi tre mesi. Se in famiglia ci sono stati casi di displasia, se il parto è stato podalico o se il pediatra ha notato qualcosa alla visita, si fa prima.',
      },
      {
        q: 'Il bambino sente dolore durante l’esame?',
        a:
          'No, è del tutto indolore e non usa radiazioni. Si appoggia solo la sonda con un po’ di gel tiepido sull’anca. Dura pochi minuti e si può fare anche mentre dorme o poppa: porta pure il ciuccio o il biberon, aiuta a tenerlo tranquillo.',
      },
      {
        q: 'Perché è importante farla nei tempi giusti?',
        a:
          'Perché una displasia riconosciuta nelle prime settimane si corregge quasi sempre con un semplice divaricatore, mentre se viene scoperta tardi può richiedere trattamenti molto più impegnativi. È il motivo per cui questo controllo si fa anche quando il bambino sta benissimo.',
      },
    ],
  },
  gomito: {
    sintesi: 'Controllo di tendini e borse del gomito.',
    perche:
      'La fai se hai “gomito del tennista” o del golfista, dolore dopo movimenti ripetuti, gonfiore sul gomito o dopo un colpo.',
    svolgimento:
      'Gomito appoggiato o disteso, gel sulla pelle, sonda che esplora la zona dolente.',
    cosaControlla:
      'Valutiamo i tendini interni ed esterni del gomito, quello del bicipite e la borsa sull’ulna.',
  },
  'polso-mano': {
    sintesi: 'Controllo di tendini, nervi e articolazioni di polso e mano.',
    perche:
      'Utile se formicolii e intorpidimento di dita (sospetto tunnel carpale), dolore ai tendini o dopo un trauma.',
    svolgimento:
      'Mano e polso appoggiati, gel sulla pelle. A volte pieghi o estendi le dita.',
    cosaControlla:
      'Guardiamo tendini, nervo mediano al tunnel carpale, borse e articolazioni di polso e mano.',
  },
  'caviglia-piede': {
    sintesi: 'Controllo di legamenti, tendine di Achille e strutture del piede.',
    perche:
      'Serve dopo una distorsione di caviglia, dolore al tallone o alla pianta del piede, o sospetta lesione ai legamenti.',
    svolgimento:
      'Piede e caviglia con gel; a volte piccoli movimenti del piede.',
    cosaControlla:
      'Valutiamo legamenti della caviglia, tendine di Achille, fascia plantare e borse del piede.',
    faqExtra: [
      {
        q: 'Serve per il dolore al tallone?',
        a:
          'Sì, è l’esame di prima scelta. Nella fascite plantare misuro lo spessore della fascia al suo attacco sul calcagno e lo confronto con il lato sano: è un dato oggettivo, utile anche per seguire la risposta alla terapia nei controlli successivi.',
      },
      {
        q: 'Dopo una distorsione della caviglia è utile?',
        a:
          'Molto. Studio i legamenti esterni, in particolare il peroneo-astragalico anteriore che è quello che si lesiona più spesso, la presenza di versamento e lo stato dei tendini peronei. Se serve, valuto anche il tendine d’Achille.',
      },
      {
        q: 'Si vede il neuroma di Morton?',
        a:
          'Sì. Si cerca fra le teste dei metatarsi, dove dà quel dolore urente che si irradia alle dita. L’ecografia lo individua e ne misura le dimensioni, ed è un esame che si presta bene perché si può premere nel punto esatto in cui senti male.',
      },
    ],
  },
  'parti-molli': {
    sintesi: 'Controllo di un gonfiore o di una massa sotto la pelle.',
    perche:
      'La fai se senti un rigonfiamento sotto la pelle e il medico vuole capire se è una cisti, un lipoma, un ematoma o altro.',
    svolgimento:
      'Si applica il gel sulla zona del gonfiore e si fa scorrere delicatamente la sonda. Dura pochi minuti.',
    cosaControlla:
      'Guardiamo se la lesione è piena di liquido o solida, dove si trova e quanto è estesa.',
  },
  'doppler-tsa': {
    sintesi: 'Controllo del flusso del sangue nelle arterie del collo (carotidi).',
    perche:
      'Serve per prevenire l’ictus: se hai fattori di rischio, un soffio al collo, vertigini o hai già avuto un mini-ictus (TIA).',
    svolgimento:
      'Ti sdrai. Si passa gel sul collo e si usa la sonda Doppler: puoi sentire un suono simile al battito.',
    cosaControlla:
      'Guardiamo carotidi e altre arterie del collo, se il sangue passa bene o se ci sono restringimenti.',
  },
  'doppler-aorta': {
    sintesi: 'Controllo dell’aorta addominale e del flusso del sangue.',
    perche:
      'La fai se devi controllare un aneurisma già noto, una dilatazione dell’aorta o patologie dei vasi addominali.',
    svolgimento:
      'Disteso supino, gel sull’addome. La sonda Doppler mostra il flusso del sangue nell’aorta.',
    cosaControlla:
      'Valutiamo dimensioni dell’aorta addominale e delle iliache e come scorre il sangue.',
  },
  'doppler-arterie-renali': {
    sintesi: 'Controllo del flusso nelle arterie che portano sangue ai reni.',
    perche:
      'Serve se hai pressione alta difficile da controllare e il medico sospetta un problema alle arterie renali.',
    svolgimento:
      'Ti sdrai, gel su fianco e addome. Sonda Doppler sui reni: sentirai il suono del flusso.',
    cosaControlla:
      'Guardiamo se le arterie renali sono libere o restringite e come arriva il sangue ai reni.',
  },
  'doppler-arti-inferiori': {
    sintesi: 'Controllo di arterie e/o vene di gambe e piedi.',
    perche:
      'Arterie: dolore alle gambe quando si cammina, ferite che guariscono male. Vene: gambe pesanti, varici, sospetta trombosi o gonfiore.',
    svolgimento:
      'Ti sdrai. Gel su gambe e piedi, sonda Doppler che segue arterie o vene. Puoi sentire un suono.',
    cosaControlla:
      'Valutiamo se il sangue arriva bene alle gambe (arterioso) o se le vene portano il sangue verso il cuore come deve (venoso).',
  },
  'doppler-arti-superiori': {
    sintesi: 'Controllo di arterie e vene di braccia e avambracci.',
    perche:
      'Utile se un braccio è gonfio rispetto all’altro, sospetta trombosi, fistola per dialisi o problemi al flusso arterioso.',
    svolgimento:
      'Braccio appoggiato, gel e sonda Doppler lungo arterie e vene.',
    cosaControlla:
      'Guardiamo arterie e vene del braccio e se il flusso del sangue è regolare.',
  },
  linfonodi: {
    sintesi: 'Controllo di linfonodi ingranditi al collo, ascelle o inguine.',
    perche:
      'La fai se noti un rigonfiamento o un linfonodo ingrossato che non scompare, in caso di febbre persistente, o per controllare linfonodi già noti.',
    svolgimento:
      'Si applica il gel sulla zona interessata (collo, ascella o inguine) e si fa scorrere delicatamente la sonda.',
    cosaControlla:
      'Valutiamo dimensioni, forma e struttura interna del linfonodo per capire se ha caratteristiche benigne o se necessita di approfondimenti.',
  },
};
