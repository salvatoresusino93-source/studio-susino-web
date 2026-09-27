/**
 * Domande pratiche (dolore, durata, creme e gioielli, controindicazioni,
 * dopo l'esame): le stesse che i siti di ecografia riportano per ogni esame.
 *
 * Per ogni tema ci sono varianti per gruppo di esami, cosi' il testo e'
 * adatto all'esame e non e' identico su tutte le pagine. Ogni esame riceve
 * al massimo una variante per tema: la prima che corrisponde.
 *
 * - gruppi:  gruppi di esami (come in scripts/faq-gruppi.js)
 * - solo:    solo questi esami (id di js/esami-data.js)
 * - esclusi: non su questi esami (es. pagine che hanno gia' "Fa male?")
 *
 * DA VERIFICARE: testi nuovi (settembre 2026). Compaiono nelle pagine solo
 * con `verificata: true`, dopo la revisione del medico; poi rilanciare
 *   node scripts/genera-pagine-esami.js
 *   node scripts/faq-pagine-manuali.js
 */

const ECOGRAFIE = ['addome', 'apparato-urinario', 'tiroide-e-collo', 'muscolo-scheletrico', 'altro'];
const TUTTI = ECOGRAFIE.concat(['doppler']);
const DIGIUNO = ['addome-completo', 'addome-superiore', 'doppler-aorta', 'doppler-arterie-renali'];
const VESCICA_PIENA = ['addome-inferiore', 'apparato-urinario', 'vescico-prostatica'];
// Pagine che hanno gia' una domanda sul dolore
const HANNO_GIA_DOLORE = [
  'tiroide', 'addome-completo', 'muscolo-scheletrica', 'doppler-tsa', 'doppler-arti-inferiori',
  'anca-neonatale', 'scrotale-testicolare',
];

const FAQ_PRATICHE = [
  {
    tema: 'fa-male',
    varianti: [
      {
        id: 'fa-male-msk',
        gruppi: ['muscolo-scheletrico'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, l’ecografia è indolore. Se la zona è già infiammata, la pressione della sonda o i movimenti richiesti durante la valutazione dinamica possono dare un lieve fastidio: dimmelo e adeguo la pressione.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, ultrasound is painless. If the area is already inflamed, the pressure of the probe or the movements needed for the dynamic assessment may cause slight discomfort: tell me and I will adjust the pressure.',
        },
      },
      {
        id: 'fa-male-vescica',
        solo: VESCICA_PIENA,
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, è indolore. Con la vescica piena la pressione della sonda sul basso addome può aumentare lo stimolo a urinare: è un fastidio passeggero, e subito dopo la prima parte dell’esame puoi andare in bagno.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, it is painless. With a full bladder, the pressure of the probe on the lower abdomen can increase the urge to urinate: this is temporary, and you can go to the toilet as soon as the first part of the scan is done.',
        },
      },
      {
        id: 'fa-male-addome',
        gruppi: ['addome', 'apparato-urinario'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, è indolore. La sonda si appoggia con una leggera pressione, che può dare un po’ di fastidio solo se la zona è già dolente.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, it is painless. The probe is placed with light pressure, which may cause some discomfort only if the area is already tender.',
        },
      },
      {
        id: 'fa-male-collo',
        gruppi: ['tiroide-e-collo'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, è indolore. Si sta sdraiati con il collo leggermente esteso, a volte con un cuscino sotto le spalle: chi ha dolori cervicali può trovare la posizione un po’ scomoda, basta dirlo.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, it is painless. You lie down with your neck slightly extended, sometimes with a pillow under your shoulders: if you have neck pain the position may feel a little uncomfortable, just say so.',
        },
      },
      {
        id: 'fa-male-doppler',
        gruppi: ['doppler'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, è indolore. In alcuni momenti la sonda viene premuta un po’ di più, per esempio sull’addome o sulle vene per verificare che si comprimano: può dare un lieve fastidio, che passa subito.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, it is painless. At times the probe is pressed a little harder, for example on the abdomen or on the veins to check that they compress: this may cause slight discomfort, which passes straight away.',
        },
      },
      {
        id: 'fa-male-linfonodi',
        gruppi: ['altro'],
        esclusi: HANNO_GIA_DOLORE,
        it: {
          q: 'L’esame fa male?',
          a: 'No, è indolore. Se il linfonodo è infiammato, la pressione della sonda può dare un lieve fastidio.',
        },
        en: {
          q: 'Does the scan hurt?',
          a: 'No, it is painless. If the lymph node is inflamed, the pressure of the probe may cause slight discomfort.',
        },
      },
    ],
  },
  {
    tema: 'durata',
    varianti: [
      {
        id: 'durata-doppler',
        gruppi: ['doppler'],
        it: {
          q: 'Quanto dura?',
          a: 'In genere 20–30 minuti: oltre alle immagini dei vasi si misura il flusso del sangue in più punti. Il referto ti viene consegnato al termine.',
        },
        en: {
          q: 'How long does it take?',
          a: 'Usually 20–30 minutes: as well as imaging the vessels, blood flow is measured at several points. You receive the report at the end.',
        },
      },
      {
        id: 'durata-ecografia',
        gruppi: ECOGRAFIE,
        it: {
          q: 'Quanto dura?',
          a: 'In genere 15–20 minuti, a seconda di quante strutture vanno esaminate e di cosa emerge. Il referto ti viene consegnato al termine.',
        },
        en: {
          q: 'How long does it take?',
          a: 'Usually 15–20 minutes, depending on how many structures need to be examined and on the findings. You receive the report at the end.',
        },
      },
    ],
  },
  {
    tema: 'creme-gioielli',
    varianti: [
      {
        id: 'creme-arti-inferiori',
        solo: ['doppler-arti-inferiori'],
        it: {
          q: 'Devo togliere calze, creme o gioielli?',
          a: 'Sì: togli calze elastiche e collant, ed evita creme sulle gambe il giorno dell’esame. Conviene un abbigliamento che permetta di scoprire facilmente le gambe.',
        },
        en: {
          q: 'Should I remove stockings, creams or jewellery?',
          a: 'Yes: remove compression stockings and tights, and avoid creams on your legs on the day of the scan. Wear clothes that let you uncover your legs easily.',
        },
      },
      {
        id: 'creme-arti-superiori',
        solo: ['doppler-arti-superiori'],
        it: {
          q: 'Devo togliere creme o gioielli?',
          a: 'Sì: togli bracciali, anelli e orologio dal braccio da esaminare ed evita creme sulla pelle il giorno dell’esame. Conviene una maglia che permetta di scoprire tutto il braccio.',
        },
        en: {
          q: 'Should I remove creams or jewellery?',
          a: 'Yes: remove bracelets, rings and your watch from the arm to be examined and avoid creams on the skin on the day of the scan. Wear a top that lets you uncover the whole arm.',
        },
      },
      {
        id: 'creme-collo',
        solo: ['tiroide', 'doppler-tsa'],
        it: {
          q: 'Devo togliere creme o gioielli?',
          a: 'Sì: togli collane e orecchini lunghi ed evita creme sul collo il giorno dell’esame, così il gel aderisce bene alla pelle.',
        },
        en: {
          q: 'Should I remove creams or jewellery?',
          a: 'Yes: remove necklaces and long earrings and avoid creams on your neck on the day of the scan, so the gel adheres well to the skin.',
        },
      },
      {
        id: 'creme-msk',
        gruppi: ['muscolo-scheletrico'],
        it: {
          q: 'Devo togliere creme, gioielli o fasciature?',
          a: 'Evita creme, pomate o oli sulla zona da esaminare il giorno dell’esame e togli anelli, bracciali od orologio se la zona è la mano o il polso. Le fasciature semplici si tolgono in studio; tutori o bendaggi prescritti vanno rimossi solo se il medico che li ha indicati è d’accordo.',
        },
        en: {
          q: 'Should I remove creams, jewellery or bandages?',
          a: 'Avoid creams, ointments or oils on the area to be examined on the day of the scan, and remove rings, bracelets or your watch if the area is the hand or wrist. Simple bandages are removed at the practice; prescribed braces or dressings should only be removed if the doctor who prescribed them agrees.',
        },
      },
      {
        id: 'creme-linfonodi',
        gruppi: ['altro'],
        it: {
          q: 'Devo togliere creme o gioielli?',
          a: 'Evita creme e deodoranti sulla zona da esaminare, per esempio le ascelle, e togli collane o gioielli se la zona è il collo.',
        },
        en: {
          q: 'Should I remove creams or jewellery?',
          a: 'Avoid creams and deodorants on the area to be examined, for example the armpits, and remove necklaces or jewellery if the area is the neck.',
        },
      },
      {
        id: 'creme-addome',
        gruppi: ['addome', 'apparato-urinario', 'doppler'],
        esclusi: ['scrotale-testicolare'],
        it: {
          q: 'Devo evitare creme o vestirmi in un certo modo?',
          a: 'Evita creme o oli sull’addome il giorno dell’esame e scegli un abbigliamento comodo, che permetta di scoprire facilmente l’addome.',
        },
        en: {
          q: 'Should I avoid creams or wear anything in particular?',
          a: 'Avoid creams or oils on your abdomen on the day of the scan and wear comfortable clothes that let you uncover your abdomen easily.',
        },
      },
    ],
  },
  {
    tema: 'controindicazioni',
    varianti: [
      {
        id: 'controindicazioni-uomo',
        solo: ['vescico-prostatica', 'scrotale-testicolare'],
        it: {
          q: 'Ci sono controindicazioni?',
          a: 'No. L’ecografia usa ultrasuoni, non radiazioni ionizzanti: non ha controindicazioni e si può ripetere tutte le volte che serve.',
        },
        en: {
          q: 'Are there any contraindications?',
          a: 'No. Ultrasound uses sound waves, not ionising radiation: it has no contraindications and can be repeated as often as needed.',
        },
      },
      {
        id: 'controindicazioni',
        gruppi: TUTTI,
        it: {
          q: 'Ci sono controindicazioni? Si può fare in gravidanza?',
          a: 'Non ci sono controindicazioni. L’ecografia usa ultrasuoni, non radiazioni ionizzanti: si può eseguire anche in gravidanza e ripetere tutte le volte che serve.',
        },
        en: {
          q: 'Are there any contraindications? Can it be done during pregnancy?',
          a: 'There are no contraindications. Ultrasound uses sound waves, not ionising radiation: it can also be done during pregnancy and repeated as often as needed.',
        },
      },
    ],
  },
  {
    tema: 'dopo',
    varianti: [
      {
        id: 'dopo-digiuno',
        solo: DIGIUNO,
        it: {
          q: 'Dopo l’esame posso tornare alle mie attività?',
          a: 'Sì, subito, anche alla guida: si toglie il gel e non serve alcun periodo di recupero. Se eri a digiuno, puoi mangiare appena finito.',
        },
        en: {
          q: 'Can I go back to my usual activities after the scan?',
          a: 'Yes, straight away, including driving: the gel is wiped off and no recovery time is needed. If you were fasting, you can eat as soon as it is over.',
        },
      },
      {
        id: 'dopo',
        gruppi: TUTTI,
        it: {
          q: 'Dopo l’esame posso tornare alle mie attività?',
          a: 'Sì, subito, anche alla guida: si toglie il gel e non serve alcun periodo di recupero.',
        },
        en: {
          q: 'Can I go back to my usual activities after the scan?',
          a: 'Yes, straight away, including driving: the gel is wiped off and no recovery time is needed.',
        },
      },
    ],
  },
];

const valeFor = (v, gruppo, idEsame) =>
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
    const v = t.varianti.find((x) => valeFor(x, gruppo, idEsame));
    if (v && (tutte || v.verificata === true)) out.push({ ...v[lingua], id: v.id });
  }
  return out;
}

module.exports = { FAQ_PRATICHE, faqPratiche };
