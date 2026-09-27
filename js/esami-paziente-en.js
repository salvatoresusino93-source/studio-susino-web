window.ESAMI_PAZIENTE = {
  'addome-completo': {
    sintesi: 'A check of the abdomen: liver, gallbladder, pancreas, spleen, kidneys, bladder and other organs.',
    perche:
      'Your doctor requests it if you have abdominal pain or discomfort, abnormal blood tests, suspected stones, or to check a condition that is already known.',
    svolgimento:
      'You lie down on the couch. Gel is applied to the abdomen and the probe is moved over it. Sometimes you will be asked to hold your breath briefly. It usually takes 15–20 minutes.',
    cosaControlla:
      'We look at the liver, gallbladder and biliary tract, pancreas, spleen, kidneys, bladder and the abdominal aorta. In men we also assess the prostate.',
  },
  'addome-superiore': {
    sintesi: 'A check of the upper abdomen: liver, gallbladder, pancreas, spleen and kidneys.',
    perche:
      'Useful if you have pain below the ribs, suspected gallbladder colic, fever with no clear cause, or abnormal liver or pancreas blood tests.',
    svolgimento:
      'You lie on your back. Gel on the skin and the probe gliding over the upper abdomen. Sometimes you need to hold your breath for a few seconds.',
    cosaControlla:
      'We check the liver, gallbladder, biliary tract, pancreas, spleen and the upper part of the kidneys.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can gallstones be seen?",
        a:
          "Yes. For cholelithiasis (stones in the gallbladder) ultrasound is the first-choice exam. Stones in the main bile duct (the common bile duct) are harder to see: if the suspicion remains, your doctor may recommend other tests.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "My liver blood tests are abnormal: is the ultrasound useful?",
        a:
          "Yes, abnormal liver function tests (transaminases, bilirubin) or pancreatic enzymes (amylase, lipase) are one of the indications. The liver, bile ducts and pancreas are assessed, for example for steatosis (fat in the liver) or dilated bile ducts. Your doctor interprets the result together with the blood tests.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "How does it differ from a complete abdominal ultrasound?",
        a:
          "The upper abdomen covers the liver, gallbladder, bile ducts, pancreas, spleen and kidneys. The complete abdomen also includes the bladder and, in men, the prostate with a suprapubic approach.",
        verificata: false,
      },
    ],
  },
  'addome-inferiore': {
    sintesi: 'A check of the lower abdomen: kidneys, bladder, prostate and pelvic organs.',
    perche:
      'Useful for lower abdominal pain, burning or recurrent urinary infections, difficulty urinating or blood in the urine.',
    svolgimento:
      'You lie down and gel is applied to the lower abdomen. The probe passes over the bladder and pelvic area.',
    cosaControlla:
      'We look at the kidneys, bladder, prostate (in men, from above the pubic bone) and the pelvic structures in that area.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "I have recurrent urinary infections: is the ultrasound useful?",
        a:
          "It can be, on your doctor’s advice. The kidneys and bladder are assessed for conditions that favour infections: hydronephrosis (dilation of the kidney’s collecting system), stones, a high post-void residual (urine left in the bladder after voiding) or bladder diverticula. It is not needed in every case.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "How does it differ from an upper abdominal ultrasound?",
        a:
          "The lower abdomen covers the kidneys, bladder, prostate in men and pelvic organs, and needs a full bladder. The upper abdomen covers the liver, gallbladder, bile ducts, pancreas and spleen, and needs fasting.",
        verificata: false,
      },
    ],
  },
  'apparato-urinario': {
    sintesi: 'A check of the kidneys, urinary tract and bladder, including after urinating.',
    perche:
      'You have it if you have renal colic, blood in the urine, frequent urinary infections, or your doctor suspects an obstruction to the flow of urine.',
    svolgimento:
      'First we look with a full bladder; then, if needed, we ask you to urinate and check how much urine remains in the bladder. Gel on the abdomen or flank.',
    cosaControlla:
      'We assess the kidneys, ureters and bladder, and measure any urine left after voiding.',
    faqExtra: [
      {
        q: "How much should I drink, and from when should I stop urinating?",
        a:
          "Drink about a litre of water in the hour before the scan and then hold on. A full bladder acts as a window: without it the lower part cannot be assessed properly. Fasting, on the other hand, is not needed.",
      },
      {
        q: "What if I really can't hold on?",
        a:
          "Tell me as soon as you arrive, it is not a problem. We start with the kidneys and upper urinary tract, which do not depend on the bladder, and complete the rest as soon as possible. Part of the scan is done after you have urinated anyway, to measure how much urine is left.",
      },
      {
        q: "Can the ultrasound see stones?",
        a:
          "It clearly shows stones inside the kidney and any dilation of the urinary tract. Stones along the ureter, which lies deep and is surrounded by bowel gas, often cannot be seen directly: in that case I look for the indirect signs and state this clearly in the report.",
      },
    ],
  },
  renale: {
    sintesi: 'A check of the kidneys and the first part of the urinary tract.',
    perche:
      'Indicated for flank pain, suspected colic from a stone, blood in the urine, or follow-up of a kidney already monitored, without studying the whole bladder.',
    svolgimento:
      'You lie on your back or your side. Gel on the flank and back, the probe gliding over the kidneys.',
    cosaControlla:
      'We look at the size and structure of the kidneys, the renal pelvis and the start of the ureters.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "How does it differ from the urinary tract ultrasound?",
        a:
          "Kidney ultrasound studies the kidneys, the renal pelvis (the cavity that collects urine inside the kidney) and the first part of the ureters. The urinary tract ultrasound also includes the bladder and the post-void residual measurement, which is why it needs a full bladder.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can stones be seen?",
        a:
          "Kidney stones usually can, although stones of just a few millimetres may be missed. Ureteral stones are rarely seen directly: the indirect sign is hydronephrosis, a dilation of the kidney’s collecting system above the blockage. The report states the limits of the scan.",
        verificata: false,
      },
    ],
  },
  'vescico-prostatica': {
    sintesi: 'A check of the bladder and prostate from above the pubic bone.',
    perche:
      'Useful if you urinate often, with a weak stream, get up at night to urinate, or your doctor suspects an enlarged prostate.',
    svolgimento:
      'It is important to arrive with a reasonably full bladder. You lie down, gel on the lower abdomen, the probe above the pubic bone.',
    cosaControlla:
      'We assess the bladder and prostate and, if needed, how much urine remains after voiding.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can the prostate be seen with the probe on the abdomen?",
        a:
          "Yes, with the suprapubic (transabdominal) approach: the full bladder acts as an acoustic window and allows the prostate volume to be estimated and its general appearance assessed. For a detailed study of its internal structure there are dedicated exams, such as transrectal ultrasound or MRI, on the urologist’s advice.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "What if my bladder is not full enough?",
        a:
          "With an under-filled bladder the scan is not reliable. Usually you drink more water and the scan is repeated once the bladder has filled, typically after 30–60 minutes; if this is not possible, a new appointment is arranged.",
        verificata: false,
      },
    ],
  },
  'scrotale-testicolare': {
    sintesi: 'A check of the testicles, epididymis and scrotal structures.',
    perche:
      'Useful for pain or swelling of the testicles, a lump you can feel, trauma, or checks related to varicocele, hydrocele or infertility.',
    svolgimento:
      'You lie down. Gel is applied to the scrotum and the probe is passed gently. Any acute pain should be reported straight away.',
    cosaControlla:
      'We assess the testicles, epididymis and spermatic cord, looking for causes of pain, swelling or lumps.',
    faqExtra: [
      {
        q: "When should I go straight away, without waiting?",
        a:
          "If the pain came on suddenly and is severe, perhaps with swelling and nausea, do not book: go to the emergency department. It may be testicular torsion, a condition in which hours really matter.",
      },
      {
        q: "Is any preparation needed?",
        a:
          "None. No fasting and no full bladder. It is a quick scan, done lying down, and it takes a few minutes.",
      },
      {
        q: "I have noticed a swelling: what can be told apart?",
        a:
          "Ultrasound distinguishes well between the most common causes: epididymal cysts, hydrocele, varicocele and solid lumps of the testicle. This distinction is what decides whether a follow-up check is enough or further tests are needed, and we know it at the end of the scan.",
      },
    ],
  },
  tiroide: {
    sintesi: 'A check of the thyroid in the neck: size, shape and any nodules.',
    perche:
      'You have it if you notice a swelling in the neck, a palpable nodule, voice problems or abnormal thyroid blood tests.',
    svolgimento:
      'You lie down with your neck tilted slightly back. Gel on the neck, the probe gliding over the thyroid. It takes a few minutes.',
    cosaControlla:
      'We look at the size, structure and presence of nodules or other changes in the thyroid.',
  },
  collo: {
    sintesi: 'A check of the thyroid, salivary glands, lymph nodes and other neck structures.',
    perche:
      'Useful if you have a swelling in the neck, enlarged lymph nodes, salivary gland problems or checks after surgery.',
    svolgimento:
      'Same position as the thyroid ultrasound: lying down, gel on the neck, the probe exploring the area indicated by the doctor.',
    cosaControlla:
      'We can assess the thyroid, salivary glands (below the ear and below the jaw), lymph nodes and neck vessels.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is it also done for check-ups after neck surgery?",
        a:
          "Yes. After a thyroidectomy (removal of the thyroid) or other neck surgery, ultrasound checks the thyroid bed, the area where the gland used to be, and the lymph nodes of the neck. Bring the surgery report, the histology report and previous scans with you.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Should I take off necklaces or scarves?",
        a:
          "Yes, it is best to arrive with your neck uncovered: the probe needs to examine the whole neck, front and sides, down to the areas above the collarbones.",
        verificata: false,
      },
    ],
  },
  'muscolo-scheletrica': {
    sintesi: 'A check of muscles, tendons and ligaments in the area that hurts.',
    perche:
      'Useful after trauma, a tear, sports overload or pain that won\'t go away in a joint or muscle.',
    svolgimento:
      'Gel is applied to the affected area. Sometimes we ask you to move the limb while we look at the screen.',
    cosaControlla:
      'We look at muscles, tendons, ligaments and bursae in the region indicated on the referral.',
  },
  spalla: {
    sintesi: 'A check of the tendons and structures of the shoulder.',
    perche:
      'You have it if it hurts to raise your arm, after trauma, or if you suspect inflammation or an injury to the shoulder.',
    svolgimento:
      'Gel on the shoulder; sometimes you move your arm as directed. The probe passes in front of and to the side of the shoulder.',
    cosaControlla:
      'We assess the rotator cuff tendons, the bursa under the acromion and the biceps tendon.',
    faqExtra: [
      {
        q: "Can shoulder ultrasound see the rotator cuff?",
        a:
          "Yes, and that is its strong point. The cuff tendons, the bursa under the acromion and the long head of the biceps are studied very well with ultrasound, both for inflammation and for tears.",
      },
      {
        q: "Is ultrasound or MRI better for the shoulder?",
        a:
          "It depends on what is suspected. For tendons, bursa and calcifications ultrasound is the first choice: it is quick and lets you move your arm during the scan. MRI is needed when the suspicion concerns the glenoid labrum, cartilage or bone, or when surgery is being planned.",
      },
      {
        q: "Why do you ask me to move my arm during the scan?",
        a:
          "Because the shoulder is studied in motion. By having you raise and rotate your arm I can see the tendons slide under the acromion: some impingements and certain tears only become visible this way, while with the arm still they would go unnoticed.",
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can shoulder calcifications be seen?",
        a:
          "Yes. In calcific tendinopathy, calcium deposits form in the rotator cuff tendons, most often in the supraspinatus. Ultrasound shows their position and size and helps to tell compact calcifications from those being reabsorbed, which is often the most painful phase. An X-ray is a complementary exam.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "What is subacromial-subdeltoid bursitis?",
        a:
          "It is inflammation of the subacromial-subdeltoid bursa, a small fluid-filled sac that reduces friction, lying between the rotator cuff, the acromion and the deltoid muscle. Ultrasound shows whether the bursa is thickened or contains fluid (effusion). It may occur on its own or together with a rotator cuff tendinopathy.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can a torn shoulder tendon be seen?",
        a:
          "Yes. Ultrasound detects tears of the rotator cuff tendons, in particular the supraspinatus, and distinguishes a full-thickness tear (the tendon is interrupted all the way through) from a partial tear. The report states their position and extent, which help the orthopaedic surgeon decide on treatment.",
        verificata: false,
      },
    ],
  },
  ginocchio: {
    sintesi: 'A check of the tendons, ligaments and any fluid in the knee.',
    perche:
      'Useful after a sprain, a sports injury, knee swelling or pain at the front or sides.',
    svolgimento:
      'You lie down or stay seated with the knee bent. Gel and probe on the painful area. We may ask for small movements.',
    cosaControlla:
      'We look at the knee tendons, collateral ligaments, bursae and whether there is fluid inside the joint. The deep menisci are less easily seen.',
    faqExtra: [
      {
        q: "Can knee ultrasound see the menisci and cruciate ligaments?",
        a:
          "Only in part, and it is right to know this beforehand. The menisci and cruciate ligaments lie deep inside the joint and the reference exam for them is MRI. Ultrasound, on the other hand, is very good for tendons, collateral ligaments, bursae and fluid.",
      },
      {
        q: "So what is knee ultrasound useful for?",
        a:
          "It is very useful for the patellar and quadriceps tendons, bursitis, the collateral ligaments, a Baker's cyst behind the knee and for measuring joint effusion. These are the most common problems after sports overload or a sprain.",
      },
      {
        q: "My knee is swollen: will ultrasound help?",
        a:
          "Yes, it is one of the cases where it helps most. I can see straight away whether the swelling is fluid inside the joint, how much there is and where it collects, and whether a Baker's cyst has formed behind the knee. It is information that guides treatment on the same day.",
      },
    ],
  },
  anca: {
    sintesi: 'A check of the tendons and soft-tissue structures around the hip.',
    perche:
      'Useful for hip or groin pain, inflammation on the side (trochanter) or discomfort after trauma.',
    svolgimento:
      'Gel on the groin, the side or both, depending on the pain. You move the hip if needed.',
    cosaControlla:
      'We assess the hip tendons, trochanteric bursae and the soft-tissue structures around the hip.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "I have pain on the side of my hip: is ultrasound useful?",
        a:
          "Yes. Pain on the outer side of the hip, around the greater trochanter, is called greater trochanteric pain syndrome. Ultrasound assesses the gluteus medius and gluteus minimus tendons and the trochanteric bursa: the cause is often a tendinopathy (overload damage of the tendon) rather than bursitis.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is it the same as the newborn hip ultrasound?",
        a:
          "No. In adults the tendons, bursae and soft tissues around the joint are studied. In newborns the shape of the joint itself is assessed, to detect developmental dysplasia of the hip: it is a different exam, with its own page.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Will I have to move my leg during the scan?",
        a:
          "Sometimes, yes. As well as scans at rest, a dynamic assessment, during movement of the hip, may be needed to see how the tendons glide. The probe is placed on the groin, on the side of the hip or both, depending on where the pain is.",
        verificata: false,
      },
    ],
  },
  'anca-neonatale': {
    sintesi: 'A check of the hips of a newborn or young infant.',
    perche:
      'Done in the first weeks of life to rule out a hip that has not formed well or that comes out of place, especially if there are risk factors or the paediatrician requests it.',
    svolgimento:
      'The baby stays lying down or in the parent\'s arms. A small probe is passed over the hips, with gel.',
    cosaControlla:
      'We check whether the baby\'s hip is mature and stable, using the method used in paediatrics (Graf).',
    faqExtra: [
      {
        q: "At what age is the newborn hip ultrasound done?",
        a:
          "Usually between the fourth and sixth week of life, and in any case within the first three months. If there have been cases of dysplasia in the family, if the baby was born in breech position or if the paediatrician noticed something at the check-up, it is done earlier.",
      },
      {
        q: "Does the baby feel any pain during the scan?",
        a:
          "No, it is completely painless and uses no radiation. The probe is simply placed on the hip with a little warm gel. It takes a few minutes and can even be done while the baby sleeps or feeds: feel free to bring a dummy or bottle, it helps keep the baby calm.",
      },
      {
        q: "Why is it important to do it at the right time?",
        a:
          "Because dysplasia recognised in the first weeks can almost always be corrected with a simple abduction brace, whereas if it is discovered late it may require much more demanding treatment. That is why this check is done even when the baby is perfectly well.",
      },
    ],
  },
  gomito: {
    sintesi: 'A check of the tendons and bursae of the elbow.',
    perche:
      'You have it if you have tennis or golfer\'s elbow, pain after repeated movements, swelling on the elbow or after a knock.',
    svolgimento:
      'Elbow resting or extended, gel on the skin, the probe exploring the painful area.',
    cosaControlla:
      'We assess the inner and outer tendons of the elbow, the biceps tendon and the bursa over the ulna.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is it useful for epicondylitis (“tennis elbow”)?",
        a:
          "Yes. In lateral epicondylitis (“tennis elbow”) the common extensor tendon, attached to the lateral epicondyle, is assessed. In medial epicondylitis (“golfer’s elbow”) the common flexor-pronator tendon, attached to the medial epicondyle on the inner side of the elbow, is assessed. The scan looks for thickening, changes in tendon structure and any partial tears.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "I have a swelling on the tip of my elbow: what is assessed?",
        a:
          "The olecranon bursa is assessed: a small fluid-filled sac that reduces friction, lying over the olecranon, the tip of the elbow. Ultrasound shows whether it contains fluid (effusion), whether its walls are thickened and how large it is: these are the signs of olecranon bursitis.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is the biceps tendon assessed too?",
        a:
          "Yes. The distal biceps tendon, which attaches to the radius in the crease of the elbow, is part of the scan: its continuity and structure are assessed.",
        verificata: false,
      },
    ],
  },
  'polso-mano': {
    sintesi: 'A check of the tendons, nerves and joints of the wrist and hand.',
    perche:
      'Useful for tingling and numbness in the fingers (suspected carpal tunnel), tendon pain or after trauma.',
    svolgimento:
      'Hand and wrist resting, gel on the skin. Sometimes you bend or straighten your fingers.',
    cosaControlla:
      'We look at the tendons, the median nerve at the carpal tunnel, and the bursae and joints of the wrist and hand.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is it useful for carpal tunnel syndrome?",
        a:
          "Yes. The median nerve is assessed at the entrance of the carpal tunnel, at the wrist, by measuring its cross-sectional area: an enlarged nerve is one of the signs of the syndrome. Ultrasound complements, but does not replace, nerve conduction studies, which your doctor may request.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Why am I asked to bend my fingers?",
        a:
          "For a dynamic assessment: when you bend and straighten your fingers, the flexor and extensor tendons glide inside their sheaths, showing whether the movement is smooth. It helps to recognise tenosynovitis, an inflammation of the synovial sheath around the tendon.",
        verificata: false,
      },
    ],
  },
  'caviglia-piede': {
    sintesi: 'A check of the ligaments, Achilles tendon and structures of the foot.',
    perche:
      'Useful after an ankle sprain, heel or sole pain, or suspected ligament injury.',
    svolgimento:
      'Foot and ankle with gel; sometimes small movements of the foot.',
    cosaControlla:
      'We assess the ankle ligaments, the Achilles tendon, the plantar fascia and the bursae of the foot.',
    faqExtra: [
      {
        q: "Is it useful for heel pain?",
        a:
          "Yes, it is the first-choice exam. In plantar fasciitis I measure the thickness of the fascia where it attaches to the heel bone and compare it with the healthy side: it is an objective measurement, also useful for following the response to treatment at later checks.",
      },
      {
        q: "Is it useful after an ankle sprain?",
        a:
          "Very. I study the outer ligaments, in particular the anterior talofibular ligament, which is the one most often injured, any effusion and the state of the peroneal tendons. If needed, I also assess the Achilles tendon.",
      },
      {
        q: "Can a Morton's neuroma be seen?",
        a:
          "Yes. It is looked for between the heads of the metatarsals, where it causes that burning pain radiating to the toes. Ultrasound detects it and measures its size, and it is well suited to the task because pressure can be applied at the exact spot where it hurts.",
      },
    ],
  },
  'parti-molli': {
    sintesi: 'A check of a swelling or lump under the skin.',
    perche:
      'You have it if you feel a lump under the skin and the doctor wants to understand whether it is a cyst, a lipoma, a haematoma or something else.',
    svolgimento:
      'Gel is applied to the area of the swelling and the probe is gently moved over it. It takes a few minutes.',
    cosaControlla:
      'We look at whether the lesion is fluid-filled or solid, where it is and how large it is.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Can a haematoma be seen after an injury?",
        a:
          "Yes. A haematoma is a collection of blood in the soft tissues after an injury. Ultrasound shows its position, size and the appearance of its contents, which change over time as it is reabsorbed; this is why a follow-up scan is sometimes needed.",
        verificata: false,
      },
    ],
  },
  'doppler-tsa': {
    sintesi: 'A check of the blood flow in the neck arteries (carotids).',
    perche:
      'Used to prevent stroke: if you have risk factors, a bruit in the neck, dizziness or have already had a mini-stroke (TIA).',
    svolgimento:
      'You lie down. Gel is applied to the neck and the Doppler probe is used: you may hear a sound like a heartbeat.',
    cosaControlla:
      'We look at the carotid and other neck arteries, whether the blood flows well or there are any narrowings.',
  },
  'doppler-aorta': {
    sintesi: 'A check of the abdominal aorta and the blood flow.',
    perche:
      'You have it to monitor a known aneurysm, a dilation of the aorta or diseases of the vessels in the abdomen.',
    svolgimento:
      'Lying on your back, gel on the abdomen. The Doppler probe shows the blood flow in the aorta.',
    cosaControlla:
      'We assess the size of the abdominal aorta and iliac arteries and how the blood flows.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "I have a known aneurysm: what is the check for?",
        a:
          "An abdominal aortic aneurysm is a permanent widening of the aorta, usually defined as a diameter of 3 cm or more. The check measures the maximum diameter and compares it with previous scans: bring your reports with you. How often checks are needed depends on the diameter and is decided by the specialist.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Are the iliac arteries assessed too?",
        a:
          "Yes. The common iliac arteries are the two branches into which the aorta divides (aortic bifurcation) in the lower abdomen: their size and flow are assessed.",
        verificata: false,
      },
    ],
  },
  'doppler-arterie-renali': {
    sintesi: 'A check of the flow in the arteries that supply the kidneys.',
    perche:
      'Useful if you have high blood pressure that is hard to control and the doctor suspects a problem with the renal arteries.',
    svolgimento:
      'You lie down, gel on the flank and abdomen. Doppler probe over the kidneys: you will hear the sound of the flow.',
    cosaControlla:
      'We look at whether the renal arteries are clear or narrowed and how the blood reaches the kidneys.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Why are the renal arteries checked if I have high blood pressure?",
        a:
          "Because a stenosis (narrowing) of a renal artery can cause renovascular hypertension, high blood pressure due to reduced blood flow to the kidney, often hard to control with medication. The Doppler measures blood velocity in the artery: a marked increase at the narrowing is the sign of stenosis.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "What is the sound I hear during the scan?",
        a:
          "It is the Doppler signal: the machine turns the speed of the blood in the vessel into sound, and the pitch changes with the speed of the flow. It is normal and part of the assessment.",
        verificata: false,
      },
    ],
  },
  'doppler-arti-inferiori': {
    sintesi: 'A check of the arteries and/or veins of the legs and feet.',
    perche:
      'Arteries: leg pain when walking, wounds that heal poorly. Veins: heavy legs, varicose veins, suspected thrombosis or swelling.',
    svolgimento:
      'You lie down. Gel on the legs and feet, the Doppler probe following the arteries or veins. You may hear a sound.',
    cosaControlla:
      'We assess whether the blood reaches the legs well (arterial) or whether the veins carry the blood back to the heart as they should (venous).',
  },
  'doppler-arti-superiori': {
    sintesi: 'A check of the arteries and veins of the arms and forearms.',
    perche:
      'Useful if one arm is swollen compared with the other, suspected thrombosis, a dialysis fistula or problems with arterial flow.',
    svolgimento:
      'Arm resting, gel and Doppler probe along the arteries and veins.',
    cosaControlla:
      'We look at the arteries and veins of the arm and whether the blood flow is normal.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "One arm is more swollen than the other: is the scan useful?",
        a:
          "Yes, swelling (oedema) of one arm is one of the indications. The scan looks for deep vein thrombosis, a thrombus (clot) in a deep vein: with compression ultrasound a normal vein flattens under the probe, a thrombosed vein does not. If the swelling came on suddenly, with pain, contact your doctor straight away.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Is it also done for a dialysis fistula?",
        a:
          "Yes. A haemodialysis arteriovenous fistula is a surgically created connection between an artery and a vein in the arm. Doppler ultrasound measures its flow volume (how much blood passes through it each minute) and looks for any stenosis, that is, narrowing.",
        verificata: false,
      },
    ],
  },
  linfonodi: {
    sintesi: 'A check of enlarged lymph nodes in the neck, armpits or groin.',
    perche:
      'You have it if you notice a swelling or an enlarged lymph node that does not go away, in case of persistent fever, or to check lymph nodes already known.',
    svolgimento:
      'Gel is applied to the area (neck, armpit or groin) and the probe is gently moved over it.',
    cosaControlla:
      'We assess the size, shape and internal structure of the lymph node to understand whether it has benign features or requires further investigation.',
    faqExtra: [
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "Which lymph node areas can be checked?",
        a:
          "The superficial ones: the sides of the neck (cervical nodes), the armpits (axillary nodes) and the groin (inguinal nodes). Usually the area indicated by your doctor, or where you feel the swelling, is examined, compared if needed with the other side.",
        verificata: false,
      },
      /* DA VERIFICARE: FAQ nuova (settembre 2026), rivedere e poi mettere verificata: true */
      {
        q: "If I have had a lymph node ultrasound before, should I bring it?",
        a:
          "Yes. Comparing size, shape and internal structure over time (in particular the hilum, the central part of the node) is one of the main elements in interpreting the scan: previous reports make it more useful.",
        verificata: false,
      },
    ],
  },
};
