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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si vedono i calcoli della colecisti?",
        a:
          "Sì. La colecisti (la cistifellea) è uno degli organi studiati e l’ecografia è l’esame usato di solito quando si sospetta una colica da calcoli.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho le analisi del fegato alterate: l’ecografia serve?",
        a:
          "Sì, è uno dei motivi per cui si richiede. Si guardano fegato, vie biliari e pancreas; il risultato va letto dal tuo medico insieme alle analisi del sangue.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Che differenza c’è con l’ecografia dell’addome completo?",
        a:
          "L’addome superiore comprende fegato, colecisti, vie biliari, pancreas, milza e la parte alta dei reni. L’addome completo aggiunge la vescica e, negli uomini, la prostata.",
        verificata: false,
      },
    ],
  },
  'addome-inferiore': {
    sintesi: 'Controllo della parte bassa dell’addome: reni, vescica, prostata e organi pelvici.',
    perche:
      'Utile per dolore in basso ventre, bruciore o infezioni urinarie di ripetizione, difficoltà a urinare o sangue nelle urine.',
    svolgimento:
      'Ti sdrai e si applica il gel sul basso ventre. La sonda passa sopra la vescica e la zona pelvica.',
    cosaControlla:
      'Guardiamo reni, vescica, prostata (negli uomini, da sopra il pube) e le strutture del bacino in quella zona.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho infezioni urinarie frequenti: l’ecografia serve?",
        a:
          "Sì, le infezioni urinarie che si ripetono sono una delle indicazioni. Si guardano reni e vescica per capire se c’è qualcosa che le favorisce, per esempio un ostacolo al passaggio dell’urina.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Che differenza c’è con l’ecografia dell’addome superiore?",
        a:
          "L’addome inferiore guarda reni, vescica, prostata negli uomini e il bacino, e richiede la vescica piena. L’addome superiore guarda fegato, colecisti, pancreas e milza, e richiede il digiuno.",
        verificata: false,
      },
    ],
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
    sintesi: 'Controllo dei reni e delle prime porzioni delle vie urinarie.',
    perche:
      'Indicata per dolore al fianco, sospetta colica da calcolo, sangue nelle urine o controllo di un rene già seguito, senza studiare tutta la vescica.',
    svolgimento:
      'Ti sdrai supino o di lato. Gel su fianco e schiena, sonda che passa sui reni.',
    cosaControlla:
      'Guardiamo dimensioni e struttura dei reni, la pelvi renale e l’inizio degli ureteri.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Che differenza c’è con l’ecografia dell’apparato urinario?",
        a:
          "L’ecografia renale studia i reni e l’inizio degli ureteri, senza la vescica. L’ecografia dell’apparato urinario comprende anche la vescica, e per questo va fatta a vescica piena.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Perché a volte mi fa girare sul fianco?",
        a:
          "Perché i reni stanno in profondità, verso la schiena. Appoggiando la sonda sul fianco e sulla schiena, da sdraiato sulla schiena o di lato, si vedono meglio.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si vedono i calcoli?",
        a:
          "I calcoli dentro il rene di solito sì, insieme all’eventuale dilatazione della pelvi renale. Quelli più in basso, lungo l’uretere, sono spesso nascosti dall’aria intestinale: il referto lo indica.",
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "La prostata si vede dall’esterno?",
        a:
          "Sì, appoggiando la sonda sopra il pube. La vescica piena fa da finestra e permette di valutare dimensioni e aspetto generale della prostata.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "E se la vescica non è abbastanza piena?",
        a:
          "Te lo dico all’inizio dell’esame. Di solito basta bere ancora un po’ d’acqua e aspettare qualche minuto prima di continuare.",
        verificata: false,
      },
    ],
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si fa anche per i controlli dopo un intervento al collo?",
        a:
          "Sì, il controllo nel tempo dopo un intervento chirurgico al collo è una delle indicazioni. Porta con te il referto dell’intervento e gli esami precedenti.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Devo togliere collane o sciarpe?",
        a:
          "Sì, conviene arrivare con il collo libero: la sonda deve scorrere sulla pelle di tutto il collo, davanti e ai lati.",
        verificata: false,
      },
    ],
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
    sintesi: 'Controllo di tendini e strutture morbide intorno all’anca.',
    perche:
      'Serve per dolore all’anca o all’inguine, infiammazione sul fianco (trocantere) o fastidi dopo un trauma.',
    svolgimento:
      'Gel su inguine, fianco o entrambi, a seconda del dolore. Muovi l’anca se necessario.',
    cosaControlla:
      'Valutiamo tendini del fianco, borse trocanteriche e strutture morbide attorno all’anca.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho dolore sul lato dell’anca: l’ecografia serve?",
        a:
          "Sì. Sul lato esterno dell’anca (la zona del trocantere) si studiano i tendini dei glutei e le borse trocanteriche, piccoli “cuscinetti” che possono infiammarsi.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "È lo stesso esame dell’ecografia delle anche del neonato?",
        a:
          "No. Nell’adulto si studiano tendini, borse e parti morbide attorno all’anca. Nel neonato si controlla invece lo sviluppo dell’articolazione: è un esame diverso, con una sua pagina.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Dovrò muovere la gamba durante l’esame?",
        a:
          "A volte sì. A seconda di dove senti dolore, la sonda passa sull’inguine, sul fianco o su entrambi, e può servire muovere l’anca per vedere meglio tendini e borse.",
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Serve per il “gomito del tennista”?",
        a:
          "Sì. L’ecografia studia i tendini che si attaccano all’esterno del gomito (epicondilo), coinvolti nel “gomito del tennista”, e quelli all’interno (epitroclea), coinvolti nel “gomito del golfista”.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho un gonfiore sulla punta del gomito: cosa si guarda?",
        a:
          "Si guarda la borsa olecranica, un piccolo “cuscinetto” sulla punta del gomito, sopra l’ulna. L’ecografia mostra se è infiammata o se contiene liquido.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si vede anche il tendine del bicipite?",
        a:
          "Sì, il tratto finale del tendine del bicipite, che si attacca nella piega del gomito, fa parte dell’esame.",
        verificata: false,
      },
    ],
  },
  'polso-mano': {
    sintesi: 'Controllo di tendini, nervi e articolazioni di polso e mano.',
    perche:
      'Utile se formicolii e intorpidimento di dita (sospetto tunnel carpale), dolore ai tendini o dopo un trauma.',
    svolgimento:
      'Mano e polso appoggiati, gel sulla pelle. A volte pieghi o estendi le dita.',
    cosaControlla:
      'Guardiamo tendini, nervo mediano al tunnel carpale, borse e articolazioni di polso e mano.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Serve per il tunnel carpale?",
        a:
          "Sì. Si valuta il nervo mediano nel punto in cui passa nel tunnel carpale, al polso. È utile se hai formicolio o intorpidimento delle dita.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Perché mi chiede di piegare le dita?",
        a:
          "Perché piegando ed estendendo le dita i tendini scorrono e si vede meglio come si muovono. Serve anche a riconoscere una tenosinovite, cioè l’infiammazione della guaina che avvolge il tendine.",
        verificata: false,
      },
    ],
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Dopo un colpo si vede un ematoma?",
        a:
          "Sì. Tra le cose che l’ecografia valuta ci sono gli ematomi, cioè raccolte di sangue sotto la pelle dopo un trauma: se ne vedono posizione ed estensione.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Devo indicare io dove si trova il gonfiore?",
        a:
          "Sì, mostrami il punto: la sonda si concentra su quella zona. Se il gonfiore si sente meglio in una certa posizione, dimmelo all’inizio dell’esame.",
        verificata: false,
      },
    ],
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho un aneurisma già noto: a cosa serve il controllo?",
        a:
          "Un aneurisma è una dilatazione dell’aorta. Il controllo ne misura le dimensioni e le confronta con quelle degli esami precedenti: porta con te i referti.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si vedono anche le arterie iliache?",
        a:
          "Sì, le iliache comuni, cioè le due arterie in cui l’aorta si divide nel bacino, fanno parte dell’esame.",
        verificata: false,
      },
    ],
  },
  'doppler-arterie-renali': {
    sintesi: 'Controllo del flusso nelle arterie che portano sangue ai reni.',
    perche:
      'Serve se hai pressione alta difficile da controllare e il medico sospetta un problema alle arterie renali.',
    svolgimento:
      'Ti sdrai, gel su fianco e addome. Sonda Doppler sui reni: sentirai il suono del flusso.',
    cosaControlla:
      'Guardiamo se le arterie renali sono libere o restringite e come arriva il sangue ai reni.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Perché si controllano le arterie renali se ho la pressione alta?",
        a:
          "Perché un restringimento delle arterie che portano sangue ai reni può essere una delle cause di una pressione alta difficile da controllare. L’esame valuta se le arterie sono libere.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Che cos’è il suono che sento durante l’esame?",
        a:
          "È il flusso del sangue nelle arterie, reso udibile dal Doppler. È normale e aiuta a valutare come scorre il sangue.",
        verificata: false,
      },
    ],
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
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Ho un braccio più gonfio dell’altro: l’esame serve?",
        a:
          "Sì, il gonfiore di un solo braccio è una delle indicazioni. Si controllano le vene per capire se c’è una trombosi, cioè un coagulo che ostacola il passaggio del sangue.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Si fa anche per la fistola della dialisi?",
        a:
          "Sì. La fistola per emodialisi è un collegamento tra un’arteria e una vena del braccio, usato per la dialisi: l’esame ne controlla il flusso.",
        verificata: false,
      },
    ],
  },
  linfonodi: {
    sintesi: 'Controllo di linfonodi ingranditi al collo, ascelle o inguine.',
    perche:
      'La fai se noti un rigonfiamento o un linfonodo ingrossato che non scompare, in caso di febbre persistente, o per controllare linfonodi già noti.',
    svolgimento:
      'Si applica il gel sulla zona interessata (collo, ascella o inguine) e si fa scorrere delicatamente la sonda.',
    cosaControlla:
      'Valutiamo dimensioni, forma e struttura interna del linfonodo per capire se ha caratteristiche benigne o se necessita di approfondimenti.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Quali zone si possono controllare?",
        a:
          "I linfonodi superficiali del collo, delle ascelle e dell’inguine. Di solito si esamina la zona indicata dal medico o quella in cui senti il rigonfiamento.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Se ho già fatto un’ecografia dei linfonodi, devo portarla?",
        a:
          "Sì. Confrontare dimensioni e forma dei linfonodi nel tempo è uno degli scopi del controllo: i referti precedenti rendono l’esame più utile.",
        verificata: false,
      },
    ],
  },
};
