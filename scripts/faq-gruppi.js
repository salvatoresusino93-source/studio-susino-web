/**
 * Domande frequenti per gruppo di esami (IT/EN), al posto delle 4 domande
 * generiche che prima erano identiche su tutte le pagine esame.
 *
 * Ogni pagina generata prende da qui 2-3 domande del proprio gruppo, a
 * rotazione, oltre alle sue domande specifiche (faqExtra in js/esami-paziente*.js).
 * Le pagine scritte a mano ne usano alcune direttamente (vedi docs/seo-fix-report.md).
 *
 * - solo:    la domanda compare solo su questi esami
 * - esclusi: la domanda non compare su questi esami
 *
 * Approvate dal medico il 29/09/2026 (verificata: true). Una domanda compare
 * nelle pagine SOLO se ha `verificata: true`: una domanda nuova si aggiunge
 * senza il campo (o con verificata: false) e resta nascosta finche' il medico
 * non la approva. Poi si rilanciano
 *   node scripts/genera-pagine-esami.js
 *   node scripts/faq-pagine-manuali.js
 */
const FAQ_GRUPPI = {
  addome: [
    {
      id: 'stomaco-intestino',
      verificata: true,
      esclusi: ['addome-inferiore'],
      it: {
        q: 'L’ecografia dell’addome vede anche stomaco e intestino?',
        a: 'Solo in parte. L’aria contenuta nello stomaco e nell’intestino ostacola gli ultrasuoni, per cui questi organi si valutano in modo limitato. Per studiarli a fondo il medico può indicare altri esami, come la gastroscopia o la colonscopia (esami con una sonda flessibile che guarda l’interno di stomaco e intestino).',
      },
      en: {
        q: 'Does abdominal ultrasound also show the stomach and bowel?',
        a: 'Only in part. The air inside the stomach and bowel blocks ultrasound, so these organs can only be assessed to a limited extent. To study them in depth your doctor may recommend other tests, such as gastroscopy or colonoscopy (tests using a flexible camera to look inside the stomach and bowel).',
      },
    },
    {
      id: 'tac-risonanza',
      verificata: true,
      it: {
        q: 'Ho già fatto una TAC o una risonanza: l’ecografia serve lo stesso?',
        a: 'Dipende dal quesito clinico. L’ecografia è spesso usata per i controlli nel tempo, perché è rapida e senza radiazioni. Porta con te referti e immagini degli esami precedenti: il confronto rende l’ecografia più utile.',
      },
      en: {
        q: 'I have already had a CT or MRI scan: is the ultrasound still useful?',
        a: 'It depends on the clinical question. Ultrasound is often used for follow-up checks because it is quick and radiation-free. Bring the reports and images of previous exams with you: comparing them makes the ultrasound more useful.',
      },
    },
    {
      id: 'prostata-sovrapubica',
      verificata: true,
      solo: ['addome-inferiore'],
      it: {
        q: 'Negli uomini si vede anche la prostata?',
        a: 'Sì, da sopra il pube e con la vescica piena: si valutano dimensioni e aspetto generale della prostata. Se serve uno studio più dettagliato, il medico può indicare altri esami.',
      },
      en: {
        q: 'In men, is the prostate also seen?',
        a: 'Yes, from above the pubic bone and with a full bladder: the size and general appearance of the prostate are assessed. If a more detailed study is needed, your doctor may recommend other tests.',
      },
    },
  ],

  'apparato-urinario': [
    {
      id: 'esami-sangue-urine',
      verificata: true,
      esclusi: ['scrotale-testicolare'],
      it: {
        q: 'L’ecografia sostituisce gli esami del sangue e delle urine?',
        a: 'No. L’ecografia mostra forma e dimensioni degli organi; gli esami del sangue e delle urine ne descrivono il funzionamento. Sono complementari e spesso il medico li richiede insieme.',
      },
      en: {
        q: 'Does the ultrasound replace blood and urine tests?',
        a: 'No. Ultrasound shows the shape and size of the organs; blood and urine tests describe how they work. They are complementary and doctors often request them together.',
      },
    },
    {
      id: 'residuo',
      verificata: true,
      solo: ['vescico-prostatica'],
      it: {
        q: 'Perché si controlla la vescica anche dopo aver urinato?',
        a: 'Per misurare quanta urina resta in vescica dopo la minzione, il cosiddetto residuo post-minzionale. Un residuo elevato può indicare che la vescica non si svuota bene, per esempio per un ingrossamento della prostata.',
      },
      en: {
        q: 'Why is the bladder also checked after urinating?',
        a: 'To measure how much urine remains in the bladder after urinating, the so-called post-void residual. A high residual may indicate that the bladder does not empty properly, for example because of an enlarged prostate.',
      },
    },
    {
      id: 'cisti-renale',
      verificata: true,
      solo: ['renale', 'apparato-urinario'],
      it: {
        q: 'Se nel rene si vede una cisti devo preoccuparmi?',
        a: 'Le cisti renali semplici sono un riscontro frequente e nella grande maggioranza dei casi benigno. L’ecografia ne descrive l’aspetto; il referto indica se servono controlli nel tempo o altri esami.',
      },
      en: {
        q: 'Should I worry if a cyst is seen in the kidney?',
        a: 'Simple kidney cysts are a common finding and in the vast majority of cases benign. The ultrasound describes their appearance; the report states whether follow-up checks or other tests are needed.',
      },
    },
  ],

  'tiroide-e-collo': [
    {
      id: 'collo-vs-tiroide',
      verificata: true,
      solo: ['collo'],
      it: {
        q: 'Che differenza c’è con l’ecografia della tiroide?',
        a: 'L’ecografia della tiroide si concentra sulla ghiandola; l’ecografia del collo allarga lo sguardo a ghiandole salivari, linfonodi e vasi. Se non sai quale prenotare, chiamaci: la scelta dipende dalla richiesta del medico.',
      },
      en: {
        q: 'How does it differ from a thyroid ultrasound?',
        a: 'A thyroid ultrasound focuses on the gland; a neck ultrasound also looks at the salivary glands, lymph nodes and vessels. If you are not sure which one to book, call us: the choice depends on your doctor’s request.',
      },
    },
    {
      id: 'gonfiore-collo',
      verificata: true,
      solo: ['collo'],
      it: {
        q: 'Ho un gonfiore sul collo: l’ecografia serve?',
        a: 'Sì, di solito è il primo esame. Permette di capire da quale struttura parte il gonfiore (linfonodo, ghiandola salivare, tiroide o altro) e se è liquido o solido. Il referto indica se servono altri accertamenti.',
      },
      en: {
        q: 'I have a swelling in my neck: is ultrasound useful?',
        a: 'Yes, it is usually the first exam. It shows which structure the swelling comes from (lymph node, salivary gland, thyroid or other) and whether it is fluid or solid. The report states whether further tests are needed.',
      },
    },
    {
      id: 'tiroide-esami-sangue',
      verificata: true,
      it: {
        q: 'L’ecografia sostituisce gli esami del sangue della tiroide?',
        a: 'No. L’ecografia mostra la forma della ghiandola e gli eventuali noduli; gli esami del sangue, come il TSH (l’ormone che regola la tiroide), dicono come funziona. Sono complementari.',
      },
      en: {
        q: 'Does the ultrasound replace thyroid blood tests?',
        a: 'No. Ultrasound shows the shape of the gland and any nodules; blood tests, such as TSH (the hormone that controls the thyroid), show how it is working. They are complementary.',
      },
    },
    {
      id: 'nodulo-dopo',
      verificata: true,
      esclusi: ['collo'],
      it: {
        q: 'Se viene trovato un nodulo, cosa succede dopo?',
        a: 'Il referto descrive dimensioni e caratteristiche del nodulo. In base a queste il medico curante o l’endocrinologo (lo specialista delle ghiandole) decide se basta un controllo nel tempo o se servono altri accertamenti.',
      },
      en: {
        q: 'If a nodule is found, what happens next?',
        a: 'The report describes the size and features of the nodule. Based on these, your GP or endocrinologist (the gland specialist) decides whether a follow-up check is enough or whether further tests are needed.',
      },
    },
  ],

  'muscolo-scheletrico': [
    {
      id: 'fratture',
      verificata: true,
      esclusi: ['parti-molli'],
      it: {
        q: 'L’ecografia vede le fratture?',
        a: 'L’ecografia vede bene tendini, muscoli, legamenti e la superficie dell’osso, ma non l’interno dell’osso. Se si sospetta una frattura, il primo esame è di solito la radiografia.',
      },
      en: {
        q: 'Can ultrasound see fractures?',
        a: 'Ultrasound shows tendons, muscles, ligaments and the surface of the bone well, but not the inside of the bone. If a fracture is suspected, the first exam is usually an X-ray.',
      },
    },
    {
      id: 'lato-sano',
      verificata: true,
      it: {
        q: 'Perché a volte si guarda anche il lato che non fa male?',
        a: 'Perché il confronto con il lato sano aiuta a capire se una differenza è significativa. Se serve lo faccio durante lo stesso esame, senza costi aggiuntivi.',
      },
      en: {
        q: 'Why is the side that does not hurt sometimes checked too?',
        a: 'Because comparing with the healthy side helps to tell whether a difference is significant. If needed I do it during the same appointment, at no extra cost.',
      },
    },
    {
      id: 'esami-precedenti',
      verificata: true,
      it: {
        q: 'Devo portare radiografie o risonanze già fatte?',
        a: 'Sì, se le hai. Il confronto con gli esami precedenti permette di capire come è cambiata la situazione e di concentrare l’ecografia sul punto giusto.',
      },
      en: {
        q: 'Should I bring X-rays or MRI scans I have already had?',
        a: 'Yes, if you have them. Comparing with previous exams shows how things have changed and helps focus the ultrasound on the right spot.',
      },
    },
    {
      id: 'abbigliamento',
      // Le articolazioni hanno gia' una domanda specifica su abiti e creme (scripts/faq-pratiche.js)
      esclusi: ['spalla', 'ginocchio', 'anca', 'gomito', 'polso-mano', 'caviglia-piede', 'parti-molli'],
      verificata: true,
      it: {
        q: 'Come conviene vestirsi?',
        a: 'Con abiti comodi che permettano di scoprire facilmente la zona da esaminare: per esempio pantaloncini per ginocchio e caviglia, una maglietta per spalla e gomito.',
      },
      en: {
        q: 'What should I wear?',
        a: 'Comfortable clothes that make it easy to uncover the area to be examined: for example shorts for the knee and ankle, a T-shirt for the shoulder and elbow.',
      },
    },
    {
      id: 'cisti-lipoma',
      verificata: true,
      solo: ['parti-molli'],
      it: {
        q: 'Si capisce se è una cisti o un lipoma?',
        a: 'L’ecografia distingue bene una raccolta di liquido, come una cisti, da una formazione solida, e ne descrive posizione e dimensioni. In molti casi, come per un lipoma, l’aspetto è tipico; quando non lo è, il referto indica gli approfondimenti utili.',
      },
      en: {
        q: 'Can it tell whether it is a cyst or a lipoma?',
        a: 'Ultrasound clearly distinguishes a fluid collection, such as a cyst, from a solid lump, and describes its position and size. In many cases, such as a lipoma, the appearance is typical; when it is not, the report suggests the appropriate further tests.',
      },
    },
  ],

  pediatrica: [],

  doppler: [
    {
      id: 'eco-vs-doppler',
      verificata: true,
      it: {
        q: 'Che differenza c’è tra ecografia ed ecocolordoppler?',
        a: 'L’ecocolordoppler è un’ecografia che, oltre all’immagine dei vasi, mostra il flusso del sangue: direzione e velocità. Serve a capire se ci sono restringimenti, dilatazioni o ostacoli al passaggio del sangue.',
      },
      en: {
        q: 'What is the difference between ultrasound and Doppler ultrasound?',
        a: 'Doppler ultrasound is an ultrasound that, in addition to the image of the vessels, shows the blood flow: its direction and speed. It helps to find narrowings, dilations or obstacles to blood flow.',
      },
    },
    {
      id: 'aghi-contrasto',
      verificata: true,
      it: {
        q: 'Si usano aghi o mezzo di contrasto?',
        a: 'No. Si appoggia solo la sonda sulla pelle con un po’ di gel: niente iniezioni, niente mezzo di contrasto, niente radiazioni.',
      },
      en: {
        q: 'Are needles or contrast dye used?',
        a: 'No. Only the probe is placed on the skin with a little gel: no injections, no contrast dye, no radiation.',
      },
    },
    {
      id: 'ripetere',
      verificata: true,
      it: {
        q: 'Ogni quanto va ripetuto il controllo?',
        a: 'Dipende da cosa emerge e dalla situazione di ciascuno: lo indicano il referto o il medico curante. Non usando radiazioni, si può ripetere tutte le volte che serve.',
      },
      en: {
        q: 'How often should the check be repeated?',
        a: 'It depends on the findings and on each person’s situation: the report or your doctor will say. As it uses no radiation, it can be repeated as often as needed.',
      },
    },
    {
      id: 'digiuno-vasi',
      verificata: true,
      solo: ['doppler-aorta', 'doppler-arterie-renali'],
      it: {
        q: 'Perché serve il digiuno per un esame dei vasi?',
        a: 'Perché l’aorta addominale e le arterie renali stanno in profondità, dietro l’intestino: l’aria intestinale, che aumenta dopo i pasti, può coprirle. A stomaco vuoto si vedono meglio.',
      },
      en: {
        q: 'Why is fasting needed for a scan of the blood vessels?',
        a: 'Because the abdominal aorta and renal arteries lie deep, behind the bowel: bowel gas, which increases after meals, can hide them. They are seen better on an empty stomach.',
      },
    },
  ],

  altro: [
    {
      id: 'linfonodo-ingrossato',
      verificata: true,
      solo: ['linfonodi'],
      it: {
        q: 'Un linfonodo ingrossato è sempre un problema?',
        a: 'No. Molto spesso i linfonodi si ingrossano in risposta a infezioni comuni, come un mal di gola. L’ecografia ne valuta forma, dimensioni e struttura; il referto indica se basta un controllo nel tempo o se servono altri accertamenti.',
      },
      en: {
        q: 'Is an enlarged lymph node always a problem?',
        a: 'No. Lymph nodes very often enlarge in response to common infections, such as a sore throat. Ultrasound assesses their shape, size and structure; the report states whether a follow-up check is enough or further tests are needed.',
      },
    },
    {
      id: 'quando-linfonodo',
      verificata: true,
      solo: ['linfonodi'],
      it: {
        q: 'Quando conviene fare l’ecografia di un linfonodo?',
        a: 'Quando un linfonodo resta palpabile nel tempo, oppure su indicazione del medico per seguire una condizione già nota. Se hai dubbi sull’esame da prenotare, chiamaci.',
      },
      en: {
        q: 'When is a lymph node ultrasound worth doing?',
        a: 'When a lymph node remains palpable over time, or on your doctor’s advice to monitor a known condition. If you are unsure which exam to book, call us.',
      },
    },
  ],
};

/**
 * Domande di gruppo per un esame: solo quelle verificate, filtrate per
 * solo/esclusi, e ruota la lista
 * in base alla posizione dell'esame nel gruppo, cosi' esami vicini non
 * ricevono tutti le stesse domande.
 */
function faqGruppo(gruppo, idEsame, posizione, quante, lingua) {
  const valide = (FAQ_GRUPPI[gruppo] || []).filter(
    (f) =>
      f.verificata === true &&
      (!f.solo || f.solo.includes(idEsame)) &&
      !(f.esclusi || []).includes(idEsame)
  );
  if (!valide.length) return [];
  const k = posizione % valide.length;
  return valide
    .slice(k)
    .concat(valide.slice(0, k))
    .slice(0, quante)
    .map((f) => f[lingua]);
}

/** Una domanda precisa, per le pagine scritte a mano (con il suo stato di verifica). */
function faqPerId(id, lingua) {
  for (const lista of Object.values(FAQ_GRUPPI)) {
    const f = lista.find((x) => x.id === id);
    if (f) return { ...f[lingua], verificata: f.verificata === true };
  }
  throw new Error('FAQ non trovata: ' + id);
}

module.exports = { FAQ_GRUPPI, faqGruppo, faqPerId };
