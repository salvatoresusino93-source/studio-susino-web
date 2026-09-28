/**
 * Domande pratiche per le pagine esame: dolore, durata, creme e abbigliamento.
 * (Controindicazioni e "dopo l'esame", uguali per tutti gli esami, stanno una
 * volta sola nella pagina Prenota.)
 *
 * Per ogni tema ci sono varianti per gruppo di esami e, nel muscolo-scheletrico,
 * per articolazione: cosi' ogni pagina ha testi propri e le pagine non si
 * somigliano. Ogni esame riceve al massimo una variante per tema: la prima
 * che corrisponde.
 *
 * - gruppi:  gruppi di esami (come in scripts/faq-gruppi.js)
 * - solo:    solo questi esami (id di js/esami-data.js)
 * - esclusi: non su questi esami
 *
 * Durate: medie riportate dai siti di strutture sanitarie italiane per ciascun
 * esame (settembre 2026), diverse da esame a esame.
 *
 * Una domanda compare nelle pagine solo con `verificata: true`. Dopo ogni
 * modifica rilanciare
 *   node scripts/genera-pagine-esami.js
 *   node scripts/faq-pagine-manuali.js
 */

const VESCICA_PIENA = ['addome-inferiore', 'apparato-urinario', 'vescico-prostatica'];
// Pagine che hanno gia' una domanda sul dolore
const HANNO_GIA_DOLORE = [
  'tiroide', 'addome-completo', 'muscolo-scheletrica', 'doppler-tsa', 'doppler-arti-inferiori',
  'anca-neonatale',
];
// Pagine scritte a mano che indicano gia' la durata nel testo
const HANNO_GIA_DURATA = ['tiroide', 'addome-completo', 'doppler-tsa', 'scrotale-testicolare', 'anca-neonatale', 'parti-molli'];

const FAQ_PRATICHE = [
  {
    tema: 'fa-male',
    varianti: [
      {
        id: 'fa-male',
        verificata: true,
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "Fa male?",
          a: "No, l’ecografia non fa male. È un esame indolore: la sonda scorre sulla pelle con un po’ di gel. In alcuni casi la pressione della sonda può dare un lieve fastidio, per esempio su una zona già infiammata, su una vescica molto piena o su un’articolazione dolente. In situazioni rare, come un’appendicite, l’esame può essere più fastidioso, ma sono casi rari e la pressione si adatta a quello che tolleri. Se senti dolore, dimmelo: ci si ferma subito.",
        },
        en: {
          q: "Does it hurt?",
          a: "No, ultrasound does not hurt. It is a painless exam: the probe glides over the skin with a little gel. In some cases the pressure of the probe may cause slight discomfort, for example on an area that is already inflamed, on a very full bladder or on a painful joint. In rare situations, such as appendicitis, the scan may be more uncomfortable, but these cases are rare and the pressure is adapted to what you can tolerate. If you feel pain, tell me: we stop straight away.",
        },
      },
    ],
  },
  {
    tema: 'durata',
    varianti: [
      {
        id: 'durata-spalla',
        verificata: true,
        solo: ['spalla'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia della spalla?",
          a: "Circa 15–20 minuti: si esaminano i tendini della cuffia dei rotatori, il capo lungo del bicipite e le borse, anche con il braccio in movimento. Può arrivare a 30 minuti se il quadro è complesso.",
        },
        en: {
          q: "How long does a shoulder ultrasound take?",
          a: "About 15–20 minutes: the rotator cuff tendons, the long head of the biceps and the bursae are examined, also with the arm moving. It may take up to 30 minutes in complex cases.",
        },
      },
      {
        id: 'durata-ginocchio',
        verificata: true,
        solo: ['ginocchio'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia del ginocchio?",
          a: "Circa 15–20 minuti, fino a 30 nei casi più complessi: si studiano tendini, legamenti collaterali, borse ed eventuale versamento, con il ginocchio disteso e flesso.",
        },
        en: {
          q: "How long does a knee ultrasound take?",
          a: "About 15–20 minutes, up to 30 in more complex cases: tendons, collateral ligaments, bursae and any effusion are studied, with the knee straight and bent.",
        },
      },
      {
        id: 'durata-anca',
        verificata: true,
        solo: ['anca'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia dell’anca?",
          a: "Circa 15–20 minuti, con scansioni sulla regione inguinale e su quella laterale; fino a 30 se il quadro è complesso.",
        },
        en: {
          q: "How long does a hip ultrasound take?",
          a: "About 15–20 minutes, with views over the groin and the side of the hip; up to 30 in complex cases.",
        },
      },
      {
        id: 'durata-gomito',
        verificata: true,
        solo: ['gomito'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia del gomito?",
          a: "Circa 15–20 minuti (fino a 30 se complesso): si esaminano i tendini sul lato esterno e interno, il tendine distale del bicipite e la borsa olecranica.",
        },
        en: {
          q: "How long does an elbow ultrasound take?",
          a: "About 15–20 minutes (up to 30 if complex): the tendons on the outer and inner side, the distal biceps tendon and the olecranon bursa are examined.",
        },
      },
      {
        id: 'durata-polso',
        verificata: true,
        solo: ['polso-mano'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia di polso e mano?",
          a: "Circa 15–20 minuti; fino a 30 se vanno studiati entrambi i polsi, come spesso accade nel sospetto di tunnel carpale.",
        },
        en: {
          q: "How long does a wrist and hand ultrasound take?",
          a: "About 15–20 minutes; up to 30 if both wrists need to be studied, as is often the case when carpal tunnel syndrome is suspected.",
        },
      },
      {
        id: 'durata-caviglia',
        verificata: true,
        solo: ['caviglia-piede'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia di caviglia e piede?",
          a: "Circa 15–20 minuti; fino a 30 se vanno esaminati sia la caviglia sia il piede, per esempio legamenti e tallone.",
        },
        en: {
          q: "How long does an ankle and foot ultrasound take?",
          a: "About 15–20 minutes; up to 30 if both the ankle and the foot need to be examined, for example ligaments and heel.",
        },
      },
      {
        id: 'durata-msk',
        verificata: true,
        solo: ['muscolo-scheletrica'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "Circa 15–20 minuti per una singola articolazione; fino a 30 se l’esame è più complesso o le zone sono più d’una.",
        },
        en: {
          q: "How long does it take?",
          a: "About 15–20 minutes for a single joint; up to 30 if the scan is more complex or covers more than one area.",
        },
      },
      {
        id: 'durata-addome-superiore',
        verificata: true,
        solo: ['addome-superiore'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia dell’addome superiore?",
          a: "Circa 15–20 minuti: si esaminano fegato, colecisti, vie biliari, pancreas, milza e reni.",
        },
        en: {
          q: "How long does an upper abdominal ultrasound take?",
          a: "About 15–20 minutes: the liver, gallbladder, bile ducts, pancreas, spleen and kidneys are examined.",
        },
      },
      {
        id: 'durata-addome-inferiore',
        verificata: true,
        solo: ['addome-inferiore'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia dell’addome inferiore?",
          a: "Circa 15–20 minuti a vescica piena; qualche minuto in più se serve controllare la vescica dopo la minzione.",
        },
        en: {
          q: "How long does a lower abdominal ultrasound take?",
          a: "About 15–20 minutes with a full bladder; a few minutes more if the bladder needs checking after urinating.",
        },
      },
      {
        id: 'durata-urinario',
        verificata: true,
        solo: ['apparato-urinario'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia dell’apparato urinario?",
          a: "Circa 15–20 minuti, compreso il controllo della vescica dopo la minzione (residuo post-minzionale).",
        },
        en: {
          q: "How long does a urinary tract ultrasound take?",
          a: "About 15–20 minutes, including the bladder check after urinating (post-void residual).",
        },
      },
      {
        id: 'durata-renale',
        verificata: true,
        solo: ['renale'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia renale?",
          a: "Circa 15–20 minuti: si esaminano entrambi i reni, le pelvi renali e il tratto iniziale degli ureteri.",
        },
        en: {
          q: "How long does a kidney ultrasound take?",
          a: "About 15–20 minutes: both kidneys, the renal pelvis and the first part of the ureters are examined.",
        },
      },
      {
        id: 'durata-vescico-prostatica',
        verificata: true,
        solo: ['vescico-prostatica'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia vescico-prostatica?",
          a: "Circa 10–15 minuti, compresa la misura del residuo post-minzionale dopo che hai urinato.",
        },
        en: {
          q: "How long does a bladder and prostate ultrasound take?",
          a: "About 10–15 minutes, including the post-void residual measurement after you have urinated.",
        },
      },
      {
        id: 'durata-collo',
        verificata: true,
        solo: ['collo'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia del collo?",
          a: "Circa 15–20 minuti: oltre alla zona indicata dal medico si controllano tiroide, ghiandole salivari e linfonodi del collo.",
        },
        en: {
          q: "How long does a neck ultrasound take?",
          a: "About 15–20 minutes: as well as the area indicated by your doctor, the thyroid, salivary glands and neck lymph nodes are checked.",
        },
      },
      {
        id: 'durata-linfonodi',
        verificata: true,
        solo: ['linfonodi'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecografia dei linfonodi?",
          a: "Circa 15–20 minuti; fino a 30 se vanno studiate molte stazioni linfonodali.",
        },
        en: {
          q: "How long does a lymph node ultrasound take?",
          a: "About 15–20 minutes; up to 30 if many lymph node areas need to be studied.",
        },
      },
      {
        id: 'durata-aorta',
        verificata: true,
        solo: ['doppler-aorta'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecocolordoppler dell’aorta?",
          a: "In genere 15–20 minuti: si misura il diametro dell’aorta in più punti, dal tratto sotto il diaframma fino alle arterie iliache, e se ne valuta il flusso.",
        },
        en: {
          q: "How long does an aortic Doppler take?",
          a: "Usually 15–20 minutes: the diameter of the aorta is measured at several points, from just below the diaphragm down to the iliac arteries, and its flow is assessed.",
        },
      },
      {
        id: 'durata-renali',
        verificata: true,
        solo: ['doppler-arterie-renali'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecocolordoppler delle arterie renali?",
          a: "In genere 20–30 minuti: per ciascun rene si misura la velocità del sangue lungo l’arteria renale e all’interno del rene stesso.",
        },
        en: {
          q: "How long does a renal artery Doppler take?",
          a: "Usually 20–30 minutes: for each kidney, blood velocity is measured along the renal artery and inside the kidney itself.",
        },
      },
      {
        id: 'durata-arti-superiori',
        verificata: true,
        solo: ['doppler-arti-superiori'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura l’ecocolordoppler degli arti superiori?",
          a: "In genere 15–20 minuti; qualcosa in più se si studiano sia le vene sia le arterie, o entrambe le braccia.",
        },
        en: {
          q: "How long does an upper limb Doppler take?",
          a: "Usually 15–20 minutes; a little longer if both veins and arteries, or both arms, are studied.",
        },
      },
      {
        id: 'durata-arti-inferiori',
        verificata: true,
        solo: ['doppler-arti-inferiori'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti, a seconda che si studino le vene, le arterie o entrambe.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes, depending on whether veins, arteries or both are studied.",
        },
      },
    ],
  },
  {
    tema: 'creme-gioielli',
    varianti: [
      {
        id: 'creme-arti-inferiori',
        verificata: true,
        solo: ['doppler-arti-inferiori'],
        it: {
          q: "Devo togliere calze, creme o gioielli?",
          a: "Sì: togli calze elastiche e collant, ed evita creme sulle gambe il giorno dell’esame. Conviene un abbigliamento che permetta di scoprire facilmente le gambe.",
        },
        en: {
          q: "Should I remove stockings, creams or jewellery?",
          a: "Yes: remove compression stockings and tights, and avoid creams on your legs on the day of the scan. Wear clothes that let you uncover your legs easily.",
        },
      },
      {
        id: 'creme-arti-superiori',
        verificata: true,
        solo: ['doppler-arti-superiori'],
        it: {
          q: "Devo togliere creme o gioielli?",
          a: "Sì: togli bracciali, anelli e orologio dal braccio da esaminare ed evita creme sulla pelle il giorno dell’esame. Conviene una maglia che permetta di scoprire tutto il braccio.",
        },
        en: {
          q: "Should I remove creams or jewellery?",
          a: "Yes: remove bracelets, rings and your watch from the arm to be examined and avoid creams on the skin on the day of the scan. Wear a top that lets you uncover the whole arm.",
        },
      },
      {
        id: 'creme-collo',
        verificata: true,
        solo: ['tiroide', 'doppler-tsa'],
        it: {
          q: "Devo togliere creme o gioielli?",
          a: "Sì: togli collane e orecchini lunghi ed evita creme sul collo il giorno dell’esame, così il gel aderisce bene alla pelle.",
        },
        en: {
          q: "Should I remove creams or jewellery?",
          a: "Yes: remove necklaces and long earrings and avoid creams on your neck on the day of the scan, so the gel adheres well to the skin.",
        },
      },
      {
        id: 'creme-spalla',
        verificata: true,
        solo: ['spalla'],
        it: {
          q: "Come devo vestirmi? Devo evitare creme?",
          a: "Evita creme e oli sulla spalla il giorno dell’esame. Conviene una canottiera o una maglia facile da togliere, perché la spalla va scoperta del tutto; togli collane lunghe.",
        },
        en: {
          q: "What should I wear? Should I avoid creams?",
          a: "Avoid creams and oils on the shoulder on the day of the scan. Wear a vest or a top that is easy to take off, because the whole shoulder needs to be uncovered; remove long necklaces.",
        },
      },
      {
        id: 'creme-ginocchio',
        verificata: true,
        solo: ['ginocchio'],
        it: {
          q: "Come devo vestirmi? Devo evitare creme?",
          a: "Evita creme sul ginocchio il giorno dell’esame. Conviene indossare pantaloncini o pantaloni larghi che si arrotolino sopra il ginocchio; le ginocchiere si tolgono, i tutori prescritti solo se il medico è d’accordo.",
        },
        en: {
          q: "What should I wear? Should I avoid creams?",
          a: "Avoid creams on the knee on the day of the scan. Wear shorts or loose trousers that roll up above the knee; knee supports are removed, prescribed braces only if your doctor agrees.",
        },
      },
      {
        id: 'creme-anca',
        verificata: true,
        solo: ['anca'],
        it: {
          q: "Come devo vestirmi? Devo evitare creme?",
          a: "Evita creme su fianco e inguine il giorno dell’esame. Conviene un abbigliamento comodo, per esempio pantaloni con elastico, che permetta di scoprire facilmente fianco e inguine.",
        },
        en: {
          q: "What should I wear? Should I avoid creams?",
          a: "Avoid creams on the hip and groin on the day of the scan. Wear comfortable clothes, for example trousers with an elastic waist, that let you uncover the hip and groin easily.",
        },
      },
      {
        id: 'creme-gomito',
        verificata: true,
        solo: ['gomito'],
        it: {
          q: "Come devo vestirmi? Devo evitare creme?",
          a: "Evita creme sul gomito il giorno dell’esame e indossa una maglia a maniche corte o con maniche larghe; le fasce per epicondilite si tolgono, i tutori prescritti solo se il medico è d’accordo.",
        },
        en: {
          q: "What should I wear? Should I avoid creams?",
          a: "Avoid creams on the elbow on the day of the scan and wear a short-sleeved top or one with loose sleeves; tennis elbow straps are removed, prescribed braces only if your doctor agrees.",
        },
      },
      {
        id: 'creme-polso',
        verificata: true,
        solo: ['polso-mano'],
        it: {
          q: "Devo togliere anelli, bracciali o creme?",
          a: "Sì: togli anelli, bracciali e orologio ed evita creme sulle mani il giorno dell’esame. Se non riesci a sfilare un anello, dimmelo all’inizio.",
        },
        en: {
          q: "Should I remove rings, bracelets or creams?",
          a: "Yes: remove rings, bracelets and your watch and avoid creams on your hands on the day of the scan. If you cannot take a ring off, tell me at the start.",
        },
      },
      {
        id: 'creme-caviglia',
        verificata: true,
        solo: ['caviglia-piede'],
        it: {
          q: "Come devo vestirmi? Devo evitare creme?",
          a: "Evita creme su caviglia e piede il giorno dell’esame. Togli calze e cavigliere; conviene un pantalone che si arrotoli facilmente sopra la caviglia.",
        },
        en: {
          q: "What should I wear? Should I avoid creams?",
          a: "Avoid creams on the ankle and foot on the day of the scan. Remove socks and ankle supports; wear trousers that roll up easily above the ankle.",
        },
      },
      {
        id: 'creme-parti-molli',
        verificata: true,
        solo: ['parti-molli'],
        it: {
          q: "Devo evitare creme o pomate?",
          a: "Sì, evita creme o pomate sulla zona della tumefazione il giorno dell’esame e scegli abiti che permettano di scoprirla facilmente.",
        },
        en: {
          q: "Should I avoid creams or ointments?",
          a: "Yes, avoid creams or ointments on the lump on the day of the scan and wear clothes that let you uncover it easily.",
        },
      },
      {
        id: 'creme-msk',
        verificata: true,
        gruppi: ['muscolo-scheletrico'],
        it: {
          q: "Devo togliere creme, gioielli o fasciature?",
          a: "Evita creme, pomate o oli sulla zona da esaminare il giorno dell’esame e togli anelli, bracciali od orologio se la zona è la mano o il polso. Le fasciature semplici si tolgono in studio; tutori o bendaggi prescritti vanno rimossi solo se il medico che li ha indicati è d’accordo.",
        },
        en: {
          q: "Should I remove creams, jewellery or bandages?",
          a: "Avoid creams, ointments or oils on the area to be examined on the day of the scan, and remove rings, bracelets or your watch if the area is the hand or wrist. Simple bandages are removed at the practice; prescribed braces or dressings should only be removed if the doctor who prescribed them agrees.",
        },
      },
      {
        id: 'creme-linfonodi',
        verificata: true,
        gruppi: ['altro'],
        it: {
          q: "Devo togliere creme o gioielli?",
          a: "Evita creme e deodoranti sulla zona da esaminare, per esempio le ascelle, e togli collane o gioielli se la zona è il collo.",
        },
        en: {
          q: "Should I remove creams or jewellery?",
          a: "Avoid creams and deodorants on the area to be examined, for example the armpits, and remove necklaces or jewellery if the area is the neck.",
        },
      },
      {
        id: 'creme-addome',
        verificata: true,
        gruppi: ['addome', 'apparato-urinario', 'doppler'],
        esclusi: ['scrotale-testicolare'],
        it: {
          q: "Devo evitare creme o vestirmi in un certo modo?",
          a: "Evita creme o oli sull’addome il giorno dell’esame e scegli un abbigliamento comodo, che permetta di scoprire facilmente l’addome.",
        },
        en: {
          q: "Should I avoid creams or wear anything in particular?",
          a: "Avoid creams or oils on your abdomen on the day of the scan and wear comfortable clothes that let you uncover your abdomen easily.",
        },
      },
    ],
  },
];

const vale = (v, gruppo, idEsame) =>
  (!v.gruppi || v.gruppi.includes(gruppo)) &&
  (!v.solo || v.solo.includes(idEsame)) &&
  !(v.esclusi || []).includes(idEsame);

/**
 * Domande pratiche per un esame, una per tema. `tutte` = true le restituisce
 * anche se non verificate (serve solo per mostrarle al medico).
 */
function faqPratiche(gruppo, idEsame, lingua, tutte = false) {
  const out = [];
  for (const t of FAQ_PRATICHE) {
    const v = t.varianti.find((x) => vale(x, gruppo, idEsame));
    if (v && (tutte || v.verificata === true)) out.push({ ...v[lingua], id: v.id });
  }
  return out;
}

module.exports = { FAQ_PRATICHE, faqPratiche };
