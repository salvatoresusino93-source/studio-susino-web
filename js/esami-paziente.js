window.ESAMI_PAZIENTE = {
  'addome-completo': {
    sintesi: 'Controllo dell’addome: fegato, colecisti (cistifellea), pancreas, milza, reni, vescica e altri organi.',
    perche:
      'Il medico la prescrive in caso di dolore o fastidi all’addome, analisi del sangue alterate, sospetta calcolosi o se serve un controllo di una patologia già nota.',
    svolgimento:
      'Il paziente si sdraia sul lettino. Si applica il gel sull’addome e si muove la sonda. A volte viene chiesto di trattenere un po’ il respiro. Dura in genere 15–30 minuti, di solito circa 20.',
    cosaControlla:
      'Si valutano fegato, colecisti e vie biliari, pancreas, milza, reni, vescica e l’aorta addominale. Negli uomini si valuta anche la prostata.',
  },
  'addome-superiore': {
    sintesi: 'Controllo della parte alta dell’addome: fegato, colecisti (cistifellea), pancreas, milza e reni.',
    perche:
      'Serve in caso di dolore sotto le costole, sospetta colica della colecisti, febbre senza causa chiara o analisi del fegato o del pancreas fuori norma.',
    svolgimento:
      /* DA VERIFICARE: posizione e manovre descritte (respiro, fianco) da confermare con il modo di lavorare del medico */
      'Il paziente si sdraia sulla schiena. Si applica il gel sulla parte alta dell’addome e si fa scorrere la sonda sotto le costole, a destra e a sinistra. A volte viene chiesto di trattenere il respiro qualche secondo o di girarsi su un fianco.',
    cosaControlla:
      'Si controllano fegato, colecisti, vie biliari, pancreas, milza e i due reni.',
    faqExtra: [
      {
        q: "Si vedono i calcoli della colecisti (cistifellea)?",
        a:
          "Sì: per i calcoli nella colecisti (colelitiasi) l’ecografia è l’esame di prima scelta. I calcoli nella via biliare principale (il coledoco) sono invece più difficili da vedere: se il sospetto rimane, il medico può indicare altri esami.",
        verificata: true,
      },
      {
        q: "Ho le analisi del fegato alterate: l’ecografia serve?",
        a:
          "Sì, l’alterazione degli indici di funzionalità epatica (transaminasi, bilirubina) o degli enzimi pancreatici (amilasi, lipasi) è una delle indicazioni. Si valutano fegato, vie biliari e pancreas, per esempio la presenza di steatosi (accumulo di grasso nel fegato) o di dilatazione delle vie biliari. Il risultato va interpretato dal medico insieme alle analisi.",
        verificata: true,
      },
      {
        q: "Che differenza c’è con l’ecografia dell’addome completo?",
        a:
          /* DA VERIFICARE: perimetro dell’addome completo (aorta, prostata) e vescica piena, come indicato dal medico il 31/10/2026 */
          "L’addome superiore comprende fegato, colecisti, vie biliari, pancreas, milza e reni, e richiede il digiuno. L’addome completo aggiunge la vescica, l’aorta addominale e, negli uomini, la prostata: per questo richiede, oltre al digiuno, anche la vescica piena.",
        verificata: true,
      },
    ],
  },
  'addome-inferiore': {
    /* DA VERIFICARE: perimetro dell’addome inferiore come indicato dal medico il 31/10/2026 (reni nell’addome superiore) */
    /* DA VERIFICARE: utero e ovaie nominati su decisione del medico del 31/10/2026 (visione da sopra il pube, non ecografia ginecologica) */
    sintesi: 'Controllo della parte bassa dell’addome: vescica, prostata (negli uomini), utero e ovaie (nelle donne) e altre strutture del bacino visibili da sopra il pube.',
    perche:
      'Utile per dolore in basso ventre, bruciore o infezioni urinarie di ripetizione, difficoltà a urinare o sangue nelle urine.',
    svolgimento:
      'Serve arrivare con la vescica piena. Il paziente si sdraia sulla schiena, si applica il gel sul basso ventre e si passa la sonda sopra la vescica e sul bacino, da un lato e dall’altro. Da questa posizione si vedono anche la prostata negli uomini, l’utero e le ovaie nelle donne.',
    cosaControlla:
      /* DA VERIFICARE: casi particolari (sospetta appendicite o diverticolite) indicati dal medico il 31/10/2026 */
      'Si valutano vescica, prostata (negli uomini), utero e ovaie (nelle donne) e le altre strutture del bacino visibili da sopra il pube. Nei casi indicati dal medico, per esempio se si sospetta un’appendicite o una diverticolite, si valuta anche la parte bassa dell’intestino.',
    faqExtra: [
      {
        q: "Ho infezioni urinarie ricorrenti: l’ecografia serve?",
        a:
          "Può servire, su indicazione del medico. Si valutano reni e vescica per cercare condizioni che favoriscono le infezioni: idronefrosi (dilatazione delle cavità del rene), calcoli, un residuo post-minzionale elevato (urina che resta in vescica dopo la minzione) o diverticoli della vescica. Non è necessaria in tutti i casi.",
        verificata: true,
      },
      {
        q: "Che differenza c’è con l’ecografia dell’addome superiore?",
        a:
          "L’addome inferiore studia vescica, prostata negli uomini, utero e ovaie nelle donne e altre strutture del bacino, e richiede la vescica piena. L’addome superiore studia fegato, colecisti, vie biliari, pancreas, milza e reni, e richiede il digiuno.",
        verificata: true,
      },
    ],
  },
  'apparato-urinario': {
    sintesi: 'Controllo di reni, vie urinarie e vescica; se richiesto, anche dopo aver urinato.',
    perche:
      'Si fa in caso di colica renale, sangue nelle urine, infezioni urinarie frequenti o il medico sospetta un ostacolo al passaggio dell’urina.',
    svolgimento:
      'L’esame inizia con la vescica piena. Poi, solo se il medico che ha prescritto l’esame lo richiede, viene chiesto di urinare e si controlla quanta urina resta in vescica. Si applica il gel sull’addome e sui fianchi, dove si trovano i reni.',
    cosaControlla:
      /* DA VERIFICARE: residuo post-minzionale solo su richiesta del medico curante (indicazione del 31/10/2026) */
      'Si valutano reni, ureteri e vescica e, se richiesto dal medico, si misura l’urina che resta dopo aver urinato.',
    faqExtra: [
      {
        q: 'Quanto devo bere e da che ora non devo urinare?',
        a:
          'Finire di bere circa un litro d’acqua un’ora prima dell’appuntamento e da quel momento non urinare. La vescica piena fa da finestra: senza, la parte bassa dell’apparato urinario non si valuta bene. Non serve il digiuno: si può mangiare normalmente.',
      },
      {
        q: 'E se proprio non riesco a trattenere?',
        a:
          'Basta dirlo all’arrivo, non è un problema. Si inizia studiando reni e alta via urinaria, che non dipendono dalla vescica, e si recupera il resto appena possibile. Se il medico ha chiesto anche la misura dell’urina che resta dopo aver urinato, quella parte si fa comunque.',
      },
      {
        q: 'L’ecografia vede i calcoli?',
        a:
          'Vede bene i calcoli dentro il rene e l’eventuale dilatazione delle vie urinarie. I calcoli lungo l’uretere, che è profondo e circondato da aria intestinale, spesso non si vedono direttamente: in quel caso se ne riconoscono i segni indiretti, indicati chiaramente nel referto.',
      },
    ],
  },
  renale: {
    sintesi: 'Controllo mirato di dimensioni, forma e struttura dei reni.',
    perche:
      'Il medico la prescrive per dolore al fianco o alla schiena, sospetta colica renale, sangue nelle urine, oppure per controllare nel tempo un rene già seguito, per esempio per una cisti o un calcolo già noti. Si sceglie questo esame, mirato solo ai reni, quando non serve guardare anche la vescica o il flusso del sangue.',
    svolgimento:
      'Il paziente si sdraia sul lettino, prima supino e poi su un fianco e sull’altro. Si applica un po’ di gel sulla schiena e sul fianco, dove si trovano i reni, e si sposta la sonda per vederli da più lati. È indolore, come ogni ecografia.',
    cosaControlla:
      'Si valutano dimensioni, forma e posizione dei reni, lo spessore del tessuto renale e la pelvi renale, cioè la parte interna dove si raccoglie l’urina prima di scendere nell’uretere. Si vede anche l’inizio degli ureteri, ma non la vescica. Si nota se ci sono calcoli, cisti o un rene dilatato per un ostacolo al deflusso dell’urina.',
    faqExtra: [
      {
        q: "Che differenza c’è con l’ecografia dell’apparato urinario?",
        a:
          "L’ecografia renale studia i reni, le pelvi renali (le cavità che raccolgono l’urina nel rene) e il tratto iniziale degli ureteri. L’ecografia dell’apparato urinario comprende anche la vescica, e per questo richiede la vescica piena; se il medico lo chiede, misura anche l’urina che resta dopo aver urinato.",
        verificata: true,
      },
      {
        q: "Si vedono i calcoli?",
        a:
          "I calcoli nel rene in genere sì, anche se quelli di pochi millimetri possono sfuggire. I calcoli dell’uretere raramente si vedono direttamente: il segno indiretto è l’idronefrosi, cioè la dilatazione delle cavità del rene a monte dell’ostruzione. Il referto indica i limiti dell’esame.",
        verificata: true,
      },
      {
        q: 'Che differenza c’è con l’ecocolordoppler delle arterie renali?',
        a:
          'Sono due esami diversi. L’ecografia renale guarda la forma e la struttura dei reni. L’ecocolordoppler delle arterie renali guarda invece come scorre il sangue nelle arterie che portano sangue ai reni: si usa soprattutto per la pressione alta difficile da controllare.',
        verificata: true,
      },
      {
        q: "Devo essere a digiuno? Serve la vescica piena?",
        a:
          "Sì, il digiuno da 6–8 ore (come indicato sopra, alla voce «Serve preparazione?»). La vescica piena invece non serve, perché la vescica non fa parte di questo esame.",
        verificata: true,
      },
    ],
  },
  'vescico-prostatica': {
    sintesi: 'Controllo di vescica e prostata dalla parte sopra il pube.',
    perche:
      'Serve se si urina spesso, con getto debole, se ci si alza di notte per urinare o il medico sospetta un ingrossamento della prostata.',
    svolgimento:
      'È importante arrivare con la vescica abbastanza piena. Il paziente si sdraia sulla schiena, si applica il gel sul basso ventre e si appoggia la sonda sopra il pube.',
    cosaControlla:
      'Si valutano vescica e prostata e, se il medico lo richiede, quanta urina resta dopo aver urinato.',
    faqExtra: [
      {
        q: "La prostata si vede con la sonda sull’addome?",
        a:
          "Sì, con l’approccio sovrapubico (transaddominale): la vescica piena fa da finestra acustica e permette di stimare il volume della prostata e valutarne l’aspetto generale. Per uno studio dettagliato della struttura interna esistono esami dedicati, come l’ecografia transrettale o la risonanza magnetica, su indicazione dell’urologo.",
        verificata: true,
      },
      {
        q: "E se la vescica non è abbastanza piena?",
        a:
          "Con la vescica poco piena, vescica e prostata si vedono male. In genere si beve altra acqua e si ripete l’esame quando la vescica si è riempita, di solito dopo 30–60 minuti; se non è possibile, fissiamo un nuovo appuntamento.",
        verificata: true,
      },
    ],
  },
  'scrotale-testicolare': {
    sintesi: 'Controllo di testicoli, epididimo e strutture dello scroto.',
    perche:
      'Serve per dolore o gonfiore ai testicoli, un nodulo che si sente al tatto, un trauma o controlli legati a varicocele, idrocele o infertilità.',
    svolgimento:
      'Il paziente si sdraia e si applica il gel sullo scroto; si passa la sonda con delicatezza, con poca pressione. Se durante l’esame si sente dolore, è importante dirlo subito. Se il dolore è comparso all’improvviso, leggere prima la domanda qui sotto sul pronto soccorso.',
    cosaControlla:
      'Si valutano testicoli, epididimo e il funicolo spermatico, cercando cause di dolore, gonfiore o masse.',
    faqExtra: [
      {
        q: 'Quando bisogna correre subito, senza aspettare?',
        a:
          'Se il dolore è comparso all’improvviso ed è intenso, magari con gonfiore e nausea, non prenotare: andare al pronto soccorso. Può essere una torsione del testicolo, una condizione in cui le ore contano davvero.',
      },
      {
        q: 'Serve qualche preparazione?',
        a:
          'Nessuna. Non serve digiuno né vescica piena. Si fa da sdraiati e dura in genere 10–20 minuti.',
      },
      {
        q: 'Mi sono accorto di un gonfiore: cosa si riesce a distinguere?',
        a:
          'L’ecografia distingue bene le cause più comuni: cisti dell’epididimo, idrocele (liquido intorno al testicolo), varicocele (vene dilatate) e formazioni solide del testicolo. Il referto descrive cosa si vede; con quello, il medico curante o l’urologo decide se basta un controllo nel tempo o se servono altri accertamenti.',
      },
    ],
  },
  tiroide: {
    sintesi: 'Controllo della tiroide al collo: dimensioni, forma ed eventuali noduli.',
    perche:
      'Si fa in caso di gonfiore al collo, nodulo palpabile, disturbi alla voce o analisi della tiroide alterate.',
    svolgimento:
      'Il paziente si sdraia con il collo leggermente all’indietro. Si applica il gel sul collo e si fa scorrere la sonda sulla tiroide. Dura in genere 15–20 minuti.',
    cosaControlla:
      'Si valutano grandezza, struttura e presenza di noduli o altre alterazioni della tiroide.',
  },
  collo: {
    sintesi: 'Controllo di tiroide, ghiandole salivari, linfonodi e altre strutture del collo.',
    perche:
      'Utile in caso di gonfiore al collo, linfonodi ingrossati, problemi alle ghiandole salivari o controlli dopo un intervento.',
    svolgimento:
      'Il paziente si sdraia con il collo leggermente all’indietro, senza collane né sciarpe. Si applica il gel e si passa la sonda su tutto il collo, davanti e ai lati, soffermandosi sulla zona indicata dal medico o dove si avverte il gonfiore.',
    cosaControlla:
      'Si possono valutare tiroide, ghiandole salivari (sotto l’orecchio e sotto la mandibola), linfonodi e vasi del collo.',
    faqExtra: [
      {
        q: "Si fa anche per i controlli dopo un intervento al collo?",
        a:
          "Sì. Dopo una tiroidectomia (asportazione della tiroide) o un altro intervento sul collo, l’ecografia controlla la loggia tiroidea, cioè la zona in cui si trovava la ghiandola, e i linfonodi del collo. Portare con sé il referto dell’intervento, l’esame istologico e le ecografie precedenti.",
        verificata: true,
      },
      {
        q: "Devo togliere collane o sciarpe?",
        a:
          "Sì, conviene arrivare con il collo libero: la sonda deve esplorare tutto il collo, davanti e ai lati, fino alle regioni sopra le clavicole.",
        verificata: true,
      },
    ],
  },
  'muscolo-scheletrica': {
    sintesi: 'Controllo di muscoli, tendini e legamenti nella zona che fa male.',
    perche:
      'Serve dopo un trauma, uno strappo, un sovraccarico sportivo o un dolore che non passa a un’articolazione o a un muscolo.',
    svolgimento:
      'Si applica il gel sulla zona interessata. A volte viene chiesto di muovere l’arto mentre si osserva lo schermo.',
    cosaControlla:
      'Si valutano muscoli, tendini, legamenti e borse nella regione indicata nella richiesta del medico.',
  },
  spalla: {
    sintesi: 'Controllo di tendini e strutture della spalla.',
    perche:
      'Si fa se alzare il braccio fa male, dopo un trauma o se si sospetta un’infiammazione o una lesione alla spalla.',
    svolgimento:
      /* DA VERIFICARE: posizione e manovre descritte da confermare con il modo di lavorare del medico */
      'Il paziente si siede su uno sgabello con la spalla scoperta. Si applica il gel e si passa la sonda davanti, di lato e dietro la spalla. Viene chiesto di alzare, ruotare e portare dietro la schiena il braccio: i tendini si vedono meglio in movimento.',
    cosaControlla:
      /* DA VERIFICARE: glossa anatomica (acromion) */
      'Si valutano i tendini della cuffia dei rotatori, la borsa sotto l’acromion (la sporgenza ossea in cima alla spalla) e il tendine del bicipite.',
    faqExtra: [
      {
        q: 'L’ecografia della spalla vede la cuffia dei rotatori?',
        a:
          'Sì, ed è proprio il suo punto di forza. I tendini della cuffia, la borsa sotto l’acromion e il capo lungo del bicipite si studiano molto bene con gli ultrasuoni, sia per le infiammazioni sia per le lesioni.',
      },
      {
        q: 'Meglio l’ecografia o la risonanza per la spalla?',
        a:
          'Dipende dal sospetto. Per tendini, borsa e calcificazioni l’ecografia è di prima scelta, è rapida e permette di muovere il braccio durante l’esame. La risonanza serve quando il sospetto riguarda il labbro glenoideo (il bordo di cartilagine della cavità in cui ruota la testa dell’omero), la cartilagine o l’osso, o quando si sta programmando un intervento.',
      },
      {
        q: 'Perché mi fa muovere il braccio durante l’esame?',
        a:
          'Perché la spalla si studia in movimento. Facendo alzare e ruotare il braccio si vedono i tendini scorrere sotto l’acromion: alcuni attriti fra tendine e osso (i cosiddetti conflitti) e certe lesioni si rendono evidenti solo così, mentre a braccio fermo passerebbero inosservati.',
      },
      {
        q: "Si vedono le calcificazioni della spalla?",
        a:
          "Sì. Nella tendinopatia calcifica si formano depositi di calcio nei tendini della cuffia dei rotatori, più spesso nel sovraspinato. L’ecografia ne indica sede e dimensioni e aiuta a distinguere le calcificazioni compatte da quelle in fase di riassorbimento, che spesso è la fase più dolorosa. La radiografia è un esame complementare.",
        verificata: true,
      },
      {
        q: "Che cos’è la borsite subacromion-deltoidea?",
        a:
          "È l’infiammazione della borsa subacromion-deltoidea, una borsa sierosa (piccola sacca che riduce l’attrito) posta tra la cuffia dei rotatori, l’acromion e il muscolo deltoide. L’ecografia mostra se la borsa è ispessita o contiene liquido (versamento). Può essere isolata o accompagnare una tendinopatia della cuffia.",
        verificata: true,
      },
      {
        q: "Si vede se un tendine della spalla è rotto?",
        a:
          "Sì. L’ecografia riconosce le lesioni dei tendini della cuffia dei rotatori, in particolare del sovraspinato, e distingue una lesione a tutto spessore (il tendine è interrotto da parte a parte) da una lesione parziale. Il referto ne indica sede ed estensione, utili all’ortopedico per decidere il trattamento.",
        verificata: true,
      },
    ],
  },
  ginocchio: {
    sintesi: 'Controllo di tendini, legamenti e eventuale liquido nel ginocchio.',
    perche:
      'Utile dopo una distorsione, un infortunio durante lo sport, gonfiore del ginocchio o dolore davanti o ai lati.',
    svolgimento:
      'Il paziente si sdraia o resta seduto con il ginocchio piegato. Si applica il gel e si passa la sonda sulla zona dolente. Possono essere richiesti piccoli movimenti.',
    cosaControlla:
      'Si valutano tendini del ginocchio, legamenti laterali, borse e se c’è liquido dentro l’articolazione. I menischi profondi si vedono meno bene.',
    faqExtra: [
      {
        q: 'L’ecografia del ginocchio vede i menischi e i legamenti crociati?',
        a:
          'Solo in parte, ed è giusto saperlo prima. Menischi e crociati stanno in profondità dentro l’articolazione e l’esame di riferimento per loro è la risonanza magnetica. L’ecografia è invece molto valida per tendini, legamenti laterali, borse e liquido.',
      },
      {
        q: 'A cosa serve allora l’ecografia del ginocchio?',
        a:
          'Serve, e molto, per il tendine rotuleo e quello del quadricipite, per le borsiti, per i legamenti collaterali, per la cisti di Baker (una sacca di liquido che si forma dietro al ginocchio) e per quantificare il versamento articolare. Sono i problemi più frequenti dopo un sovraccarico sportivo o una distorsione.',
      },
      {
        q: 'Ho il ginocchio gonfio: l’ecografia serve?',
        a:
          'Sì, è uno dei casi in cui rende di più. Si vede subito se il gonfiore è liquido dentro l’articolazione, quanto ne c’è e dove si raccoglie, e se dietro si è formata una cisti di Baker. È un’informazione utile al medico curante o all’ortopedico per decidere come procedere.',
      },
    ],
  },
  anca: {
    sintesi: 'Controllo di tendini e strutture morbide intorno all’anca, nell’adulto.',
    perche:
      'Il medico la prescrive per dolore sul fianco dell’anca, spesso legato ai tendini dei glutei o alla borsa trocanterica, oppure per dolore all’inguine legato ai tendini più profondi (ileopsoas o adduttori). È utile anche se si avverte uno scatto o un click camminando, dopo un trauma, o per un fastidio comparso con lo sport, per esempio corsa o calcio. Si usa pure per controllare i tessuti molli intorno a una protesi d’anca già impiantata. Non è invece l’esame giusto per studiare l’osso o la cartilagine dell’articolazione: per l’artrosi dell’anca il medico userà più spesso una radiografia.',
    svolgimento:
      'Il paziente si sdraia sul lettino. Si applica il gel sull’inguine, sul fianco o su entrambi, a seconda di dove si avverte dolore: a volte viene chiesto di girarsi su un fianco o di mettersi a faccia in giù, per vedere bene anche la parte posteriore. Se si sospetta uno scatto dell’anca, viene chiesto di muovere la gamba mentre si osserva lo schermo, per vedere come si comporta il tendine. L’esame è indolore e dura in genere 15–20 minuti.',
    cosaControlla:
      'Si valutano i tendini dei muscoli glutei e la borsa trocanterica sul fianco, i tendini dell’ileopsoas e degli adduttori all’inguine, ed eventuale liquido nell’articolazione dell’anca. Se è presente una protesi, si controllano anche i tessuti molli intorno all’impianto. Non si vedono bene l’osso in profondità né la cartilagine dell’articolazione: per quelli restano più adatte la radiografia o la risonanza.',
    faqExtra: [
      {
        q: "Ho dolore sul lato dell’anca: l’ecografia serve?",
        a:
          "Sì. Il dolore sul lato esterno dell’anca, nella regione del grande trocantere, si chiama sindrome dolorosa del grande trocantere. L’ecografia valuta i tendini del gluteo medio e del gluteo minimo e la borsa trocanterica: spesso la causa è una tendinopatia (alterazione da sovraccarico del tendine) più che una borsite.",
        verificata: true,
      },
      {
        q: "È lo stesso esame dell’ecografia delle anche del neonato?",
        a:
          "No. Nell’adulto si studiano tendini, borse e tessuti molli attorno all’articolazione. Nel neonato si valuta invece la conformazione dell’articolazione, per riconoscere la displasia evolutiva dell’anca: è un esame diverso, con una sua pagina.",
        verificata: true,
      },
      {
        q: "Dovrò muovere la gamba durante l’esame?",
        a:
          "A volte sì. Oltre alle scansioni a riposo può servire una valutazione dinamica, cioè durante il movimento dell’anca, per vedere meglio lo scorrimento dei tendini. La sonda si appoggia sulla regione inguinale, su quella laterale o su entrambe, secondo la sede del dolore.",
        verificata: true,
      },
      {
        q: 'Ho una protesi d’anca: posso comunque fare l’ecografia?',
        a:
          "Sì. L’ecografia non usa radiazioni e permette di valutare tutto ciò che si trova sopra la protesi: tendini, muscoli, borse ed eventuali raccolte di liquido. La superficie metallica della protesi, come quella dell’osso, riflette gli ultrasuoni: per questo non si può vedere cosa c’è oltre, ma tutto ciò che sta più in superficie è visibile.",
        verificata: true,
      },
      {
        q: 'L’ecografia vede l’artrosi dell’anca?',
        a:
          'Non è l’esame più adatto. L’artrosi riguarda soprattutto l’osso e la cartilagine dell’articolazione, che si vedono meglio con una radiografia. L’ecografia è invece utile per i tendini e i tessuti molli intorno all’anca, e per un eventuale versamento nell’articolazione.',
        verificata: true,
      },
    ],
  },
  'anca-neonatale': {
    sintesi: 'Controllo delle anche del neonato o del lattante piccolo.',
    perche:
      'Si fa nelle prime settimane di vita per escludere l’anca che non è formata bene o che esce dalla sede, soprattutto se ci sono fattori di rischio o se il pediatra lo chiede.',
    svolgimento:
      /* DA VERIFICARE: posizione del neonato e modalità dell’esame da confermare con il medico */
      'Il bambino viene sdraiato su un fianco, con il pannolino aperto, mentre il genitore gli sta accanto e lo tiene tranquillo. Si appoggia una sonda piccola sull’anca con un po’ di gel tiepido, prima da un lato e poi dall’altro. Si può fare anche mentre poppa o dorme.',
    cosaControlla:
      'Si valuta se l’anca è ben formata e stabile, misurandone gli angoli secondo il metodo di Graf, quello usato di norma per i neonati.',
    faqExtra: [
      {
        q: 'A che età si fa l’ecografia delle anche al neonato?',
        a:
          'Di norma fra la quarta e la sesta settimana di vita, comunque entro i primi tre mesi. Se in famiglia ci sono stati casi di displasia, se il parto è stato podalico o se il pediatra ha notato qualcosa alla visita, si fa prima.',
      },
      {
        q: 'Il bambino sente dolore durante l’esame?',
        a:
          'No, è del tutto indolore e non usa radiazioni. Si appoggia solo la sonda con un po’ di gel tiepido sull’anca. Dura in genere 10–15 minuti e si può fare anche mentre dorme o poppa: si può portare il ciuccio o il biberon, aiuta a tenerlo tranquillo.',
      },
      {
        q: 'Perché è importante farla nei tempi giusti?',
        a:
          /* DA VERIFICARE: riformulazione prudente (tutore indicato e seguito dall’ortopedico pediatrico) */
          'Perché, se l’anca ha bisogno di aiuto per formarsi bene, intervenire nei primi mesi è più semplice: spesso basta un tutore (divaricatore) che l’ortopedico pediatrico indica e segue nel tempo. Per questo il controllo si fa anche quando il bambino sta benissimo.',
      },
    ],
  },
  gomito: {
    sintesi: 'Controllo di tendini e borse del gomito.',
    perche:
      'Si fa in caso di “gomito del tennista” o del golfista, dolore dopo movimenti ripetuti, gonfiore sul gomito o dopo un colpo.',
    svolgimento:
      /* DA VERIFICARE: posizione e manovre descritte da confermare con il modo di lavorare del medico */
      'Il paziente si siede o si sdraia con il gomito appoggiato, un po’ piegato. Si applica il gel e si passa la sonda sul lato esterno, su quello interno e sulla piega del gomito. A volte viene chiesto di stringere il pugno o ruotare l’avambraccio.',
    cosaControlla:
      'Si valutano i tendini interni ed esterni del gomito, quello del bicipite e la borsa sulla punta del gomito.',
    faqExtra: [
      {
        q: "Serve per l’epicondilite (“gomito del tennista”)?",
        a:
          "Sì. Nell’epicondilite laterale (“gomito del tennista”) si valuta il tendine comune degli estensori, che si inserisce sull’epicondilo, la sporgenza ossea sul lato esterno del gomito. Nell’epitrocleite (“gomito del golfista”) si valuta il tendine comune dei flessori-pronatori, che si inserisce sull’epitroclea, la sporgenza ossea sul lato interno del gomito. Si cercano ispessimento, alterazioni della struttura del tendine ed eventuali lesioni parziali.",
        verificata: true,
      },
      {
        q: "Ho un gonfiore sulla punta del gomito: cosa si valuta?",
        a:
          "Si valuta la borsa olecranica, una borsa sierosa (piccola sacca che riduce l’attrito) posta sopra l’olecrano, la punta del gomito. L’ecografia mostra se contiene liquido (versamento), se le pareti sono ispessite e quanto è estesa: sono i segni della borsite olecranica.",
        verificata: true,
      },
      {
        q: "Si valuta anche il tendine del bicipite?",
        a:
          "Sì. Il tendine distale del bicipite brachiale, che si inserisce sul radio nella piega del gomito, fa parte dell’esame: si valutano la sua continuità e la sua struttura.",
        verificata: true,
      },
    ],
  },
  'polso-mano': {
    sintesi: 'Controllo di tendini, nervi e articolazioni di polso e mano.',
    perche:
      'Utile per formicolii o intorpidimento delle dita, quando si sospetta una sindrome del tunnel carpale. ' +
      'Si fa anche per dolore o gonfiore lungo i tendini, per esempio nella tendinite di de Quervain, sul lato del pollice. ' +
      'Altre indicazioni sono un nodulo sul dorso del polso, spesso una cisti tendinea (detta ganglio), e un dito che resta bloccato piegato (dito a scatto). ' +
      'Si esegue anche per dolore alle piccole articolazioni delle dita o dolore persistente dopo un trauma al polso.',
    svolgimento:
      'La mano e il polso si appoggiano sul lettino, con un piccolo cuscino di sostegno. Si applica il gel sulla pelle e si passa la sonda sulla zona indicata dal dolore. ' +
      'A volte viene chiesto di piegare o distendere le dita, oppure di muovere il pollice: vedere i tendini in movimento aiuta a valutarli meglio. ' +
      'Se si sospetta una sindrome del tunnel carpale, si esaminano spesso entrambi i polsi.',
    cosaControlla:
      'Si valutano i tendini flessori, sul palmo, e i tendini estensori, sul dorso della mano: la loro struttura e la guaina che li avvolge (la membrana che li fa scorrere). ' +
      'Si controlla il nervo mediano nel punto in cui entra nel tunnel carpale, al polso. ' +
      'Si valutano le piccole articolazioni di polso e dita, le borse (piccole sacche che riducono l’attrito) ed eventuali cisti tendinee. ' +
      'Dopo un trauma si osservano anche i tendini e i legamenti vicini al punto dolente.',
    faqExtra: [
      {
        q: "Serve per la sindrome del tunnel carpale?",
        a:
          "Sì. Si valuta il nervo mediano all’ingresso del tunnel carpale, al polso, misurandone l’area di sezione: un nervo ingrossato è uno dei segni della sindrome. L’ecografia completa, non sostituisce, l’elettroneurografia (l’esame che misura la conduzione del nervo), che il medico può richiedere.",
        verificata: true,
      },
      {
        q: "Ho un rigonfiamento sul dorso del polso: cos’è?",
        a:
          "Un rigonfiamento sul dorso del polso ha spesso cause benigne, come una cisti tendinea. L’ecografia serve a capire di cosa si tratta e a misurarlo.",
        verificata: true,
      },
      {
        q: "Un dito mi si blocca piegato: può essere un dito a scatto?",
        a:
          "Può essere. Nel dito a scatto il tendine flessore fatica a scorrere nella sua guaina, spesso per un ispessimento vicino alla base del dito. L’ecografia mostra il tendine e la puleggia (l’anello che lo tiene aderente all’osso) in quel punto. Il medico curante deciderà la cura.",
        verificata: true,
      },
      {
        q: "Ho dolore alla base del pollice, vicino al polso: può essere tendinite di de Quervain?",
        a:
          "È una delle cause possibili. Nella tendinite di de Quervain si infiammano i tendini che muovono il pollice, nel punto in cui passano sul lato del polso vicino al pollice. L’ecografia valuta lo spessore della guaina e la presenza di liquido intorno ai tendini. Lo stesso dolore può dipendere anche dall’articolazione alla base del pollice (artrosi): l’ecografia aiuta a distinguere le due cose.",
        verificata: true,
      },
    ],
  },
  'caviglia-piede': {
    sintesi: 'Controllo di legamenti, tendine di Achille e strutture del piede.',
    perche:
      'Serve dopo una distorsione di caviglia, dolore al tallone o alla pianta del piede, o sospetta lesione ai legamenti.',
    svolgimento:
      /* DA VERIFICARE: posizione e manovre descritte da confermare con il modo di lavorare del medico */
      'Il paziente si sdraia sul lettino con il piede scoperto. Si applica il gel sulla caviglia o sulla pianta del piede, dove si avverte dolore, e si passa la sonda. A volte viene chiesto di muovere il piede o di indicare il punto esatto che fa male, per vedere tendini e legamenti in movimento.',
    cosaControlla:
      'Si valutano legamenti della caviglia, tendine di Achille, fascia plantare e borse del piede.',
    faqExtra: [
      {
        q: 'Serve per il dolore al tallone?',
        a:
          /* DA VERIFICARE: «spesso sì» e rimando alla radiografia se il dolore viene dall’osso */
          'Spesso sì. La causa più frequente è la fascite plantare (infiammazione della fascia che sostiene la pianta del piede): si misura lo spessore della fascia dove si attacca al calcagno e lo si confronta con l’altro lato. Si valutano anche il tendine d’Achille e le borse vicine. Se il dolore viene dall’osso, il medico può indicare una radiografia.',
      },
      {
        q: 'Dopo una distorsione della caviglia è utile?',
        a:
          'Molto. Si studiano i legamenti esterni, in particolare il legamento peroneo-astragalico anteriore, quello sul lato esterno della caviglia che si lesiona più spesso, la presenza di versamento (liquido nell’articolazione) e lo stato dei tendini peronei, che passano dietro il malleolo esterno. Se serve, si valuta anche il tendine d’Achille.',
      },
      {
        q: 'Si vede il neuroma di Morton?',
        a:
          'Sì. Si cerca fra le teste dei metatarsi, dove dà quel dolore bruciante che si irradia alle dita. L’ecografia lo individua e ne misura le dimensioni, ed è un esame che si presta bene perché si può premere nel punto esatto in cui fa male.',
      },
    ],
  },
  'parti-molli': {
    sintesi: 'Controllo di un gonfiore o di una massa sotto la pelle.',
    perche:
      'Si fa se si avverte un rigonfiamento sotto la pelle e il medico vuole capire se è una cisti, un lipoma, un ematoma o altro.',
    svolgimento:
      'Si applica il gel sulla zona del gonfiore e si fa scorrere delicatamente la sonda. Dura in genere 15–20 minuti.',
    cosaControlla:
      'Si valuta se il rigonfiamento contiene liquido (come una cisti) o è solido (come un lipoma), dove si trova esattamente, quanto è grande e com’è il rapporto con muscoli e vasi vicini.',
    faqExtra: [
      {
        q: "Dopo un trauma si vede un ematoma?",
        a:
          "Sì. L’ematoma è una raccolta di sangue nei tessuti molli dopo un trauma. L’ecografia ne indica sede, dimensioni e aspetto del contenuto, che cambia nel tempo man mano che l’ematoma si riassorbe; per questo a volte serve un controllo successivo.",
        verificata: true,
      },
    ],
  },
  'doppler-tsa': {
    sintesi: 'Controllo del flusso del sangue nelle arterie del collo (carotidi).',
    perche:
      'Aiuta a valutare il rischio di ictus: si fa in presenza di fattori di rischio, di un soffio al collo, di vertigini o se si è già avuto un mini-ictus (TIA).',
    svolgimento:
      'Il paziente si sdraia. Si applica il gel sul collo e si usa la sonda Doppler: si può sentire un suono simile al battito.',
    cosaControlla:
      'Si valutano carotidi e altre arterie del collo, se il sangue passa bene o se ci sono restringimenti.',
  },
  'doppler-aorta': {
    sintesi: 'Controllo dell’aorta addominale e del flusso del sangue.',
    perche:
      'Si fa per controllare nel tempo un aneurisma, cioè una dilatazione dell’aorta, già riscontrato, oppure se il medico sospetta un allargamento dell’aorta o un problema dei grossi vasi dell’addome.',
    svolgimento:
      /* DA VERIFICARE: manovre descritte (misura in più punti, respiro) da confermare con il medico */
      'Il paziente si sdraia sulla schiena e scopre l’addome. Si applica il gel e si segue l’aorta con la sonda dallo stomaco fino al basso ventre, misurandone il diametro in più punti. A volte viene chiesto di trattenere il respiro qualche secondo; si potrà sentire il suono del flusso.',
    cosaControlla:
      'Si misura il diametro dell’aorta addominale in più punti e delle arterie iliache, i due rami in cui si divide nel basso addome, e si valuta come scorre il sangue.',
    faqExtra: [
      {
        q: "Ho un aneurisma già noto: a cosa serve il controllo?",
        a:
          "L’aneurisma dell’aorta addominale è una dilatazione permanente dell’aorta, in genere definita da un diametro di almeno 3 cm. Il controllo misura il diametro massimo e lo confronta con quello degli esami precedenti: portare con sé i referti. La frequenza dei controlli dipende dal diametro e la stabilisce lo specialista.",
        verificata: true,
      },
      {
        q: "Si valutano anche le arterie iliache?",
        a:
          "Sì. Le arterie iliache comuni sono i due rami in cui l’aorta si divide (biforcazione aortica) nella parte bassa dell’addome: se ne valutano calibro e flusso.",
        verificata: true,
      },
    ],
  },
  'doppler-arterie-renali': {
    sintesi: 'Controllo del flusso nelle arterie che portano sangue ai reni.',
    perche:
      'Serve in caso di pressione alta difficile da controllare e il medico sospetta un problema alle arterie renali.',
    svolgimento:
      'Il paziente si sdraia. Si applica il gel sul fianco e sull’addome e si passa la sonda Doppler sui reni: si sentirà il suono del flusso.',
    cosaControlla:
      'Si valuta se le arterie renali sono libere o presentano restringimenti (stenosi) e come arriva il sangue ai reni.',
    faqExtra: [
      {
        q: "Perché si controllano le arterie renali se ho la pressione alta?",
        a:
          "Perché la stenosi (restringimento) di un’arteria renale può causare un’ipertensione renovascolare, cioè una pressione alta dovuta al ridotto afflusso di sangue al rene, spesso difficile da controllare con i farmaci. Il Doppler misura la velocità del sangue nell’arteria: un aumento marcato nel punto del restringimento è il segno della stenosi.",
        verificata: true,
      },
      {
        q: "Che cos’è il suono che sento durante l’esame?",
        a:
          "È il segnale Doppler: l’apparecchio trasforma in suono la velocità del sangue nel vaso, e la tonalità cambia con la velocità del flusso. È normale e fa parte della valutazione.",
        verificata: true,
      },
    ],
  },
  'doppler-arti-inferiori': {
    sintesi: 'Controllo di arterie e/o vene di gambe e piedi.',
    perche:
      'Arterie: dolore alle gambe quando si cammina, ferite che guariscono male. Vene: gambe pesanti, varici, sospetta trombosi o gonfiore.',
    svolgimento:
      'Il paziente si sdraia. Si applica il gel su gambe e piedi e si seguono arterie o vene con la sonda Doppler. Si può sentire un suono.',
    cosaControlla:
      'Si valuta se il sangue arriva bene alle gambe (arterioso) o se le vene portano il sangue verso il cuore come deve (venoso).',
  },
  'doppler-arti-superiori': {
    sintesi: 'Controllo di arterie e vene di braccia e avambracci.',
    perche:
      'Utile se un braccio è gonfio rispetto all’altro, sospetta trombosi, fistola per dialisi o problemi al flusso arterioso.',
    svolgimento:
      'Il paziente si sdraia o si siede con il braccio appoggiato e scoperto fino alla spalla. Si applica il gel e si seguono con la sonda le arterie o le vene dalla spalla alla mano. Si potrà sentire il suono del flusso del sangue.',
    cosaControlla:
      'Si valutano arterie e vene del braccio e se il flusso del sangue è regolare.',
    faqExtra: [
      {
        q: "Ho un braccio più gonfio dell’altro: l’esame serve?",
        a:
          "Sì, il gonfiore (edema) asimmetrico di un braccio è una delle indicazioni. Si cerca una trombosi venosa profonda, cioè un trombo (coagulo) in una vena profonda: con l’ecografia con compressione una vena normale si schiaccia sotto la sonda, una vena trombizzata no. Se il gonfiore è comparso all’improvviso, con dolore, rivolgersi subito al medico.",
        verificata: true,
      },
      {
        q: "Si fa anche per la fistola della dialisi?",
        a:
          "Sì. La fistola artero-venosa per emodialisi è un collegamento creato chirurgicamente tra un’arteria e una vena del braccio. L’ecocolordoppler ne misura la portata (quanto sangue vi scorre ogni minuto) e cerca eventuali stenosi, cioè restringimenti.",
        verificata: true,
      },
    ],
  },
  linfonodi: {
    sintesi: 'Controllo di linfonodi ingrossati al collo, alle ascelle o all’inguine.',
    perche:
      'Si fa se si nota un rigonfiamento o un linfonodo ingrossato che non scompare, in caso di febbre persistente, o per controllare linfonodi già noti.',
    svolgimento:
      'Si applica il gel sulla zona interessata (collo, ascella o inguine) e si fa scorrere delicatamente la sonda.',
    cosaControlla:
      'Si valutano dimensioni, forma e struttura interna del linfonodo , descritti nel referto: in base a questi elementi il medico curante decide se basta un controllo nel tempo o se servono altri accertamenti.',
    faqExtra: [
      {
        q: "Quali stazioni linfonodali si possono controllare?",
        a:
          "Le stazioni superficiali: laterocervicali (ai lati del collo), ascellari e inguinali. Di solito si esamina la sede indicata dal medico o quella in cui si avverte il rigonfiamento, confrontandola se serve con il lato opposto.",
        verificata: true,
      },
      {
        q: "Se ho già fatto un’ecografia dei linfonodi, devo portarla?",
        a:
          "Sì. Il confronto nel tempo di dimensioni, forma e struttura interna (in particolare dell’ilo, la parte centrale del linfonodo) è uno degli elementi principali per interpretare l’esame: i referti precedenti lo rendono più utile.",
        verificata: true,
      },
    ],
  },
};
