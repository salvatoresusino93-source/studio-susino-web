/* DA VERIFICARE: iconaAlt = testo alternativo delle illustrazioni nelle pagine esame (descrizione anatomica). */
window.ESAMI = [
  {
    id: 'addome-completo',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/addome-completo.svg',
    iconaAlt: 'Illustration: abdominal organs',
    nome: 'Complete abdominal ultrasound',
    categoria: 'Abdomen',
    descrizione:
      'Assesses the liver, gallbladder, biliary tract, pancreas, spleen, kidneys, bladder, abdominal aorta and, in men, the prostate. ' +
      'Requested with a defined clinical question: abdominal pain, abnormal blood tests (liver, pancreas, kidneys), suspected gallstones or kidney stones, jaundice, fever of unknown origin or follow-up of known conditions.',
    prenotaNome: 'Ecografia addome completo',
  },
  {
    id: 'addome-superiore',
    icona: 'images/icone/addome-superiore.svg',
    iconaAlt: 'Illustration: liver and gallbladder, in the upper abdomen',
    nome: 'Upper abdominal ultrasound',
    categoria: 'Abdomen',
    descrizione:
      'Studies the liver, gallbladder, biliary tract, pancreas, spleen and kidneys. ' +
      'Indicated for pain in the upper quadrants, biliary colic, an enlarged liver or spleen, jaundice, abnormal transaminases, bilirubin, amylase/lipase or fever of unknown origin.',
    prenotaNome: 'Ecografia addome superiore',
  },
  {
    id: 'addome-inferiore',
    icona: 'images/icone/addome-inferiore.svg',
    iconaAlt: 'Illustration: bladder, in the lower abdomen',
    nome: 'Lower abdominal ultrasound',
    categoria: 'Abdomen',
    descrizione:
      'Explores the kidneys, bladder, prostate (suprapubic), large pelvic vessels and pelvic bowel. ' +
      'Useful for lower abdominal pain, microscopic blood in the urine, recurrent urinary infections, urinary retention or suspected kidney and bladder disease.',
    prenotaNome: 'Ecografia addome inferiore',
  },
  {
    id: 'apparato-urinario',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/apparato-urinario.svg',
    iconaAlt: 'Illustration: kidneys, urinary tract and bladder',
    nome: 'Urinary tract ultrasound',
    categoria: 'Urinary tract and urology',
    descrizione:
      'Assesses the kidneys, ureters, bladder and post-void residual urine. ' +
      'Prescribed for renal colic, blood in the urine, recurrent urinary infections, suspected obstruction of the urinary tract or monitoring of known kidney disease.',
    prenotaNome: 'Ecografia apparato urinario',
  },
  {
    id: 'renale',
    icona: 'images/icone/renale.svg',
    iconaAlt: 'Illustration: the two kidneys',
    nome: 'Kidney ultrasound',
    categoria: 'Urinary tract and urology',
    descrizione:
      'Studies the kidneys, renal pelvis and proximal ureters. ' +
      'Indicated for flank pain, renal colic, blood in the urine, monitoring of kidney stones or kidney follow-up when a full urinary tract study with the bladder is not needed.',
    prenotaNome: 'Ecografia renale',
  },
  {
    id: 'vescico-prostatica',
    icona: 'images/icone/vescico-prostatica.svg',
    iconaAlt: 'Illustration: bladder and prostate',
    nome: 'Bladder and prostate ultrasound',
    categoria: 'Urinary tract and urology',
    descrizione:
      'Suprapubic examination of the bladder and prostate. ' +
      'Indicated for urinary symptoms (weak stream, frequent urination, waking at night), suspected benign prostatic enlargement, assessment of post-void residual urine or urological follow-up; requires an adequately full bladder.',
    prenotaNome: 'Ecografia vescico-prostatica',
  },
  {
    id: 'scrotale-testicolare',
    icona: 'images/icone/scrotale-testicolare.svg',
    iconaAlt: 'Illustration: testicles',
    nome: 'Scrotal and testicular ultrasound',
    categoria: 'Urinary tract and urology',
    descrizione:
      'Studies the testicles, epididymis and spermatic cord. ' +
      'Requested for scrotal pain or swelling, a palpable lump, trauma, suspected testicular torsion (emergency), varicocele, hydrocele, orchitis/epididymitis or investigation of male infertility.',
    prenotaNome: 'Ecografia scrotale e testicolare',
  },
  {
    id: 'tiroide',
    icona: 'images/icone/tiroide.svg',
    iconaAlt: 'Illustration: thyroid, the gland at the base of the neck',
    nome: 'Thyroid ultrasound',
    categoria: 'Thyroid and neck',
    descrizione:
      'Assesses the volume, structure and any thyroid nodules. ' +
      'Indicated for goitre, a palpable nodule, hoarseness or difficulty swallowing, a family history of thyroid disease, thyroiditis or abnormal TSH, fT4 and anti-thyroid antibodies.',
    prenotaNome: 'Ecografia tiroide',
  },
  {
    id: 'collo',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/collo.svg',
    iconaAlt: 'Illustration: neck and salivary glands',
    nome: 'Neck ultrasound',
    categoria: 'Thyroid and neck',
    descrizione:
      'Examines the thyroid, salivary glands (parotid, submandibular), lateral cervical lymph nodes and the vascular structures of the neck. ' +
      'Useful for palpable swellings, enlarged lymph nodes, salivary gland disorders or post-surgical neck follow-up.',
    prenotaNome: 'Ecografia del collo',
  },
  {
    id: 'muscolo-scheletrica',
    icona: 'images/icone/muscolo-scheletrica.svg',
    iconaAlt: 'Illustration: a joint with muscles and tendons',
    nome: 'Musculoskeletal ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Ultrasound study of muscles, tendons, ligaments and bursae in the area indicated by the doctor. ' +
      'Indicated after trauma or overload to rule out muscle tears, tendinitis, sprains, haematomas and bursitis; it also allows assessment during movement.',
    prenotaNome: 'Ecografia muscolo-scheletrica',
  },
  {
    id: 'spalla',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/spalla.svg',
    iconaAlt: 'Illustration: shoulder joint',
    nome: 'Shoulder ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Assesses the rotator cuff, the supraspinatus tendon, the subacromial bursa and the long head of the biceps. ' +
      'Requested for pain when raising or abducting the arm, suspected tendinopathy or rotator cuff tear, subacromial bursitis or trauma.',
    prenotaNome: 'Ecografia spalla',
  },
  {
    id: 'ginocchio',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/ginocchio.svg',
    iconaAlt: 'Illustration: knee joint',
    nome: 'Knee ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Studies the tendons (patellar and quadriceps), the collateral ligaments, the bursae and any joint effusion. ' +
      'Indicated after a sprain or sports trauma, knee swelling or suspected effusion and tendinopathy; it has limits in studying the deep meniscus.',
    prenotaNome: 'Ecografia ginocchio',
  },
  {
    id: 'anca',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/anca.svg',
    iconaAlt: 'Illustration: hip joint',
    nome: 'Hip ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Assesses the peri-articular tendons (gluteal, iliopsoas), the trochanteric bursae and the soft-tissue structures of the hip in adults. ' +
      'Useful for trochanteric tendinopathy, bursitis, groin or lateral hip pain and post-trauma follow-up.',
    prenotaNome: 'Ecografia anca',
  },
  {
    id: 'anca-neonatale',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/anca-neonatale.svg',
    iconaAlt: 'Illustration: a newborn\'s hip',
    nome: 'Newborn hip ultrasound',
    categoria: 'Paediatric',
    descrizione:
      'Ultrasound screening of the hips in newborns and infants (Graf method) to rule out dislocation or developmental hip dysplasia. ' +
      'Indicated in the first weeks of life, in the presence of risk factors (breech birth, family history, oligohydramnios) or suspicious clinical findings; often repeated at follow-up.',
    prenotaNome: 'Ecografia anca neonatale',
  },
  {
    id: 'gomito',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/gomito.svg',
    iconaAlt: 'Illustration: elbow joint',
    nome: 'Elbow ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Examines the epicondylar and epitrochlear tendons, the distal biceps tendon and the olecranon bursa. ' +
      'Indicated for tennis or golfer\'s elbow, pain from repetitive movements, olecranon bursitis or functional limitation after trauma.',
    prenotaNome: 'Ecografia gomito',
  },
  {
    id: 'polso-mano',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/polso-mano.svg',
    iconaAlt: 'Illustration: wrist and hand',
    nome: 'Wrist and hand ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Studies the flexor and extensor tendons, the median nerve at the carpal tunnel, and the bursae and joints of the wrist and hand. ' +
      'Indicated for suspected carpal tunnel syndrome, tenosynovitis, overload pain or trauma.',
    prenotaNome: 'Ecografia polso e mano',
  },
  {
    id: 'caviglia-piede',
    icona: 'images/icone/caviglia-piede.svg',
    iconaAlt: 'Illustration: ankle and foot',
    nome: 'Ankle and foot ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Assesses the peri-malleolar ligaments, the Achilles tendon, the plantar fascia and the bursae of the foot. ' +
      'Requested after an ankle sprain, suspected ligament injury, Achilles tendinopathy or plantar pain.',
    prenotaNome: 'Ecografia caviglia e piede',
  },
  {
    id: 'parti-molli',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/parti-molli.svg',
    iconaAlt: 'Illustration: skin and the tissues beneath it',
    nome: 'Soft-tissue ultrasound',
    categoria: 'Musculoskeletal',
    descrizione:
      'Analyses subcutaneous swellings, cysts, lipomas, haematomas and superficial fluid collections. ' +
      'Useful for a palpable lump of uncertain origin, a suspected cyst or a post-traumatic lesion; it helps distinguish fluid from solid lesions.',
    prenotaNome: 'Ecografia parti molli',
  },
  {
    id: 'doppler-tsa',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-tsa.svg',
    iconaAlt: 'Illustration: carotid and vertebral arteries in the neck',
    nome: 'Carotid (supra-aortic) Doppler ultrasound',
    categoria: 'Vascular (Doppler)',
    descrizione:
      'Assesses the shape and flow of the carotid, vertebral and subclavian arteries (supra-aortic trunks). ' +
      'Indicated for prevention and monitoring of stroke risk: cardiovascular risk factors, a carotid bruit, previous TIA or stroke, vascular dizziness or known stenosis.',
    prenotaNome: 'Ecocolordoppler TSA (tronchi sovra-aortici)',
  },
  {
    id: 'doppler-aorta',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-aorta.svg',
    iconaAlt: 'Illustration: the aorta in the abdomen',
    nome: 'Abdominal aorta Doppler ultrasound',
    categoria: 'Vascular (Doppler)',
    descrizione:
      'Assesses the shape and flow of the abdominal aorta and the common iliac arteries. ' +
      'Indicated for follow-up of an aneurysm, suspected aortic dilation or known abdominal vascular disease.',
    prenotaNome: 'Ecocolordoppler aorta addominale',
  },
  {
    id: 'doppler-arterie-renali',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arterie-renali.svg',
    iconaAlt: 'Illustration: the arteries that carry blood to the kidneys',
    nome: 'Renal artery Doppler ultrasound',
    categoria: 'Vascular (Doppler)',
    descrizione:
      'Studies the flow and any narrowing of the renal arteries. ' +
      'Indicated for high blood pressure of renovascular origin, known or suspected stenosis, or follow-up after renal vascular procedures.',
    prenotaNome: 'Ecocolordoppler arterie renali',
  },
  {
    id: 'doppler-arti-inferiori',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arti-inferiori.svg',
    iconaAlt: 'Illustration: veins and arteries of the leg',
    nome: 'Lower-limb Doppler ultrasound',
    categoria: 'Vascular (Doppler)',
    descrizione:
      'Studies the arterial and/or venous circulation of the legs and feet. ' +
      'Arterial: intermittent claudication, suspected peripheral arterial disease, wounds that heal poorly. Venous: heavy legs, varicose veins, suspected deep vein thrombosis or venous insufficiency.',
    prenotaNome: 'Ecocolordoppler arti inferiori',
  },
  {
    id: 'doppler-arti-superiori',
    /* TEMP: icona provvisoria Health Icons, da sostituire con icona commissionata */
    icona: 'images/icone/doppler-arti-superiori.svg',
    iconaAlt: 'Illustration: veins and arteries of the arm',
    nome: 'Upper-limb Doppler ultrasound',
    categoria: 'Vascular (Doppler)',
    descrizione:
      'Assesses the arteries and veins of the arms and forearms. ' +
      'Indicated for asymmetric swelling or oedema, suspected upper-limb venous thrombosis, haemodialysis fistulas or changes in peripheral arterial flow.',
    prenotaNome: 'Ecocolordoppler arti superiori',
  },
  {
    id: 'linfonodi',
    icona: 'images/icone/linfonodi.svg',
    iconaAlt: 'Illustration: lymph nodes',
    nome: 'Lymph node ultrasound',
    categoria: 'Other',
    descrizione:
      'Assesses the superficial lymph nodes (neck, armpits, groin) for size, shape and internal structure. ' +
      'Requested for a persistent palpable lymph node, fever or reactive inflammation, follow-up of known disease or suspected lymphadenopathy.',
    prenotaNome: 'Ecografia linfonodi',
  },
];
