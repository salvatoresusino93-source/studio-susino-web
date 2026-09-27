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
 * Una domanda compare nelle pagine solo con `verificata: true`. Approvate dal
 * medico il 29/09/2026 (durata 20-30 minuti per tutti gli esami). Dopo ogni
 * modifica rilanciare
 *   node scripts/genera-pagine-esami.js
 *   node scripts/faq-pagine-manuali.js
 */

const VESCICA_PIENA = ['addome-inferiore', 'apparato-urinario', 'vescico-prostatica'];
// Pagine che hanno gia' una domanda sul dolore
const HANNO_GIA_DOLORE = [
  'tiroide', 'addome-completo', 'muscolo-scheletrica', 'doppler-tsa', 'doppler-arti-inferiori',
  'anca-neonatale', 'scrotale-testicolare',
];
// Pagine scritte a mano che indicano gia' la durata nel testo
const HANNO_GIA_DURATA = ['tiroide', 'addome-completo', 'doppler-tsa'];

const FAQ_PRATICHE = [
  {
    tema: 'fa-male',
    varianti: [
      {
        id: 'fa-male-aorta',
        verificata: true,
        solo: ['doppler-aorta'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. La sonda si appoggia sull’addome, dalla parte alta fino all’ombelico, a volte con una pressione più decisa per spostare l’aria intestinale che copre l’aorta: può dare un lieve fastidio, che passa subito.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The probe is placed on the abdomen, from the upper part down to the navel, sometimes with firmer pressure to move aside the bowel gas covering the aorta: this may cause slight discomfort, which passes straight away.",
        },
      },
      {
        id: 'fa-male-renali',
        verificata: true,
        solo: ['doppler-arterie-renali'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Le arterie renali sono sottili e profonde: per raggiungerle la sonda si appoggia su addome e fianchi con una pressione a volte più decisa, che può dare un lieve fastidio.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The renal arteries are thin and deep: to reach them the probe is placed on the abdomen and flanks, sometimes with firmer pressure, which may cause slight discomfort.",
        },
      },
      {
        id: 'fa-male-spalla',
        verificata: true,
        solo: ['spalla'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, l’ecografia è indolore. Durante la valutazione dinamica ti chiedo di alzare e ruotare il braccio: se la spalla è infiammata alcuni movimenti possono fare male, e ci si ferma al limite che tolleri.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, ultrasound is painless. During the dynamic assessment I ask you to raise and rotate your arm: if the shoulder is inflamed some movements may hurt, and we stop at the limit you can tolerate.",
        },
      },
      {
        id: 'fa-male-ginocchio',
        verificata: true,
        solo: ['ginocchio'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Il ginocchio si esamina prima disteso e poi flesso: se è gonfio o dolente la flessione può dare fastidio, e la posizione si adatta a quello che riesci a fare.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The knee is examined first straight and then bent: if it is swollen or sore, bending may be uncomfortable, and the position is adapted to what you can manage.",
        },
      },
      {
        id: 'fa-male-anca',
        verificata: true,
        solo: ['anca'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Per studiare la regione del grande trocantere si sta sdraiati sul fianco opposto a quello dolente, così non si appoggia il peso sulla zona infiammata; la pressione della sonda sul punto dolente può dare un lieve fastidio.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. To study the greater trochanter area you lie on the side opposite the painful one, so no weight rests on the inflamed area; the pressure of the probe on the sore spot may cause slight discomfort.",
        },
      },
      {
        id: 'fa-male-gomito',
        verificata: true,
        solo: ['gomito'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Il gomito si esamina appoggiato, prima esteso e poi flesso; se l’epicondilo o l’epitroclea sono infiammati, la pressione della sonda in quel punto può dare un lieve fastidio.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The elbow is examined resting on a support, first straight and then bent; if the lateral or medial epicondyle is inflamed, the pressure of the probe there may cause slight discomfort.",
        },
      },
      {
        id: 'fa-male-polso',
        verificata: true,
        solo: ['polso-mano'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. La mano resta appoggiata sul lettino; la pressione della sonda sul tunnel carpale o su un tendine infiammato può dare un lieve fastidio, che dura solo il tempo della scansione.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. Your hand rests on the couch; the pressure of the probe over the carpal tunnel or an inflamed tendon may cause slight discomfort, lasting only as long as the scan.",
        },
      },
      {
        id: 'fa-male-caviglia',
        verificata: true,
        solo: ['caviglia-piede'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Nel dolore al tallone o dopo una distorsione, la pressione della sonda sul punto dolente può dare un lieve fastidio; il piede si appoggia in modo da non caricare il peso.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. With heel pain or after a sprain, the pressure of the probe on the sore spot may cause slight discomfort; the foot is positioned so that no weight is placed on it.",
        },
      },
      {
        id: 'fa-male-parti-molli',
        verificata: true,
        solo: ['parti-molli'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. La sonda scorre con delicatezza sulla tumefazione; se è infiammata o dolente, si riduce la pressione.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The probe glides gently over the lump; if it is inflamed or sore, the pressure is reduced.",
        },
      },
      {
        id: 'fa-male-vescica',
        verificata: true,
        solo: VESCICA_PIENA,
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Con la vescica piena la pressione della sonda sul basso addome può aumentare lo stimolo a urinare: è un fastidio passeggero, e dopo la prima parte dell’esame puoi andare in bagno.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. With a full bladder, the pressure of the probe on the lower abdomen can increase the urge to urinate: this is temporary, and after the first part of the scan you can go to the toilet.",
        },
      },
      {
        id: 'fa-male-addome',
        verificata: true,
        gruppi: ['addome', 'apparato-urinario'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. La sonda si appoggia sull’addome o sul fianco con una leggera pressione, che può dare un po’ di fastidio solo se la zona è già dolente.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. The probe is placed on the abdomen or flank with light pressure, which may cause some discomfort only if the area is already tender.",
        },
      },
      {
        id: 'fa-male-collo',
        verificata: true,
        gruppi: ['tiroide-e-collo'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Si sta sdraiati con il collo leggermente esteso, a volte con un cuscino sotto le spalle: chi ha dolori cervicali può trovare la posizione un po’ scomoda, basta dirlo.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. You lie down with your neck slightly extended, sometimes with a pillow under your shoulders: if you have neck pain the position may feel a little uncomfortable, just say so.",
        },
      },
      {
        id: 'fa-male-doppler',
        verificata: true,
        gruppi: ['doppler'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. In alcuni momenti la sonda viene premuta un po’ di più, per esempio sull’addome o sulle vene per verificare che si comprimano: può dare un lieve fastidio, che passa subito.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. At times the probe is pressed a little harder, for example on the abdomen or on the veins to check that they compress: this may cause slight discomfort, which passes straight away.",
        },
      },
      {
        id: 'fa-male-linfonodi',
        verificata: true,
        gruppi: ['altro'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: "L’esame fa male?",
          a: "No, è indolore. Se il linfonodo è infiammato, la pressione della sonda può dare un lieve fastidio.",
        },
        en: {
          q: "Does the scan hurt?",
          a: "No, it is painless. If the lymph node is inflamed, the pressure of the probe may cause slight discomfort.",
        },
      },
    ],
  },
  {
    tema: 'durata',
    varianti: [
      {
        id: 'durata-aorta',
        verificata: true,
        solo: ['doppler-aorta'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: si misura il diametro dell’aorta in più punti, dal tratto sotto il diaframma fino alle arterie iliache, e si valuta il flusso. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: the diameter of the aorta is measured at several points, from just below the diaphragm down to the iliac arteries, and the flow is assessed. You receive the report at the end.",
        },
      },
      {
        id: 'durata-renali',
        verificata: true,
        solo: ['doppler-arterie-renali'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: per ciascun rene si misura la velocità del sangue lungo l’arteria renale e all’interno del rene stesso. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: for each kidney, blood velocity is measured along the renal artery and inside the kidney itself. You receive the report at the end.",
        },
      },
      {
        id: 'durata-doppler',
        verificata: true,
        gruppi: ['doppler'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: oltre alle immagini dei vasi si misurano il flusso e la velocità del sangue in più punti. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: as well as imaging the vessels, blood flow and velocity are measured at several points. You receive the report at the end.",
        },
      },
      {
        id: 'durata-msk',
        verificata: true,
        gruppi: ['muscolo-scheletrico'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: si esaminano tendini, legamenti e borse della zona, a riposo e in movimento, e se serve anche il lato opposto per confronto. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: the tendons, ligaments and bursae of the area are examined at rest and in motion and, if needed, the other side for comparison. You receive the report at the end.",
        },
      },
      {
        id: 'durata-vescica',
        verificata: true,
        solo: VESCICA_PIENA,
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti, compreso il controllo della vescica dopo che hai urinato, quando è richiesto. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes, including the bladder check after you have urinated, when required. You receive the report at the end.",
        },
      },
      {
        id: 'durata-addome',
        verificata: true,
        gruppi: ['addome', 'apparato-urinario'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: si esaminano più organi, a volte in posizioni diverse e con respiri profondi. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: several organs are examined, sometimes in different positions and with deep breaths. You receive the report at the end.",
        },
      },
      {
        id: 'durata-collo',
        verificata: true,
        gruppi: ['tiroide-e-collo'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti: oltre alla zona indicata dal medico si controllano le altre strutture del collo, come linfonodi e ghiandole salivari. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes: as well as the area indicated by your doctor, the other neck structures are checked, such as lymph nodes and salivary glands. You receive the report at the end.",
        },
      },
      {
        id: 'durata-linfonodi',
        verificata: true,
        gruppi: ['altro'],
        esclusi: HANNO_GIA_DURATA,
        it: {
          q: "Quanto dura?",
          a: "In genere 20–30 minuti, a seconda di quante stazioni linfonodali vanno esaminate. Il referto ti viene consegnato al termine.",
        },
        en: {
          q: "How long does it take?",
          a: "Usually 20–30 minutes, depending on how many lymph node areas need to be examined. You receive the report at the end.",
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
