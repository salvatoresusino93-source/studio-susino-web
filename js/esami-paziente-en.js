window.ESAMI_PAZIENTE = {
  'addome-completo': {
    sintesi: 'A check of the abdomen: liver, gallbladder, pancreas, spleen, kidneys, bladder and other organs.',
    perche:
      'Your doctor requests it if you have abdominal pain or discomfort, abnormal blood tests, suspected stones, or to check a condition that is already known.',
    svolgimento:
      'You lie down on the couch. I apply gel to the abdomen and move the probe over it. Sometimes I ask you to hold your breath briefly. It usually takes 15–30 minutes, typically about 20.',
    cosaControlla:
      'I look at the liver, gallbladder and biliary tract, pancreas, spleen, kidneys, bladder and the abdominal aorta. In men I also assess the prostate.',
  },
  'addome-superiore': {
    sintesi: 'A check of the upper abdomen: liver, gallbladder, pancreas, spleen and kidneys.',
    perche:
      'Useful if you have pain below the ribs, suspected gallbladder colic, fever with no clear cause, or abnormal liver or pancreas blood tests.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'You lie on your back. I put gel on the upper abdomen and move the probe over the subcostal region, on the right and on the left. Sometimes I ask you to hold your breath for a few seconds or turn on your side.',
    cosaControlla:
      'I check the liver, gallbladder, bile ducts, pancreas, spleen and both kidneys.',
    faqExtra: [
      {
        q: "Can gallstones be seen?",
        a:
          "Yes. For cholelithiasis (stones in the gallbladder) ultrasound is the first-choice exam. Stones in the main bile duct (the common bile duct) are harder to see: if the suspicion remains, your doctor may recommend other tests.",
        verificata: true,
      },
      {
        q: "My liver blood tests are abnormal: is the ultrasound useful?",
        a:
          "Yes, abnormal liver function tests (transaminases, bilirubin) or pancreatic enzymes (amylase, lipase) are one of the indications. The liver, bile ducts and pancreas are assessed, for example for steatosis (fat in the liver) or dilated bile ducts. Your doctor interprets the result together with the blood tests.",
        verificata: true,
      },
      {
        q: "How does it differ from a complete abdominal ultrasound?",
        a:
          /* DA VERIFICARE: come nella versione italiana */
          "The upper abdomen covers the liver, gallbladder, bile ducts, pancreas, spleen and kidneys, and needs fasting. The complete abdomen adds the bladder, the abdominal aorta and, in men, the prostate: this is why it needs a full bladder as well as fasting.",
        verificata: true,
      },
    ],
  },
  'addome-inferiore': {
    /* DA VERIFICARE: come nella versione italiana */
    sintesi: 'A check of the lower abdomen: bladder, prostate (in men), uterus and ovaries (in women) and other pelvic structures seen from above the pubic bone.',
    perche:
      'Useful for lower abdominal pain, burning or recurrent urinary infections, difficulty urinating or blood in the urine.',
    svolgimento:
      'You need to arrive with a full bladder. You lie on your back, I put gel on the lower abdomen and move the probe over the bladder and the pelvis, on both sides. From this position I can also see the prostate in men, and the uterus and ovaries in women.',
    cosaControlla:
      /* DA VERIFICARE: come nella versione italiana */
      'I look at the bladder, the prostate (in men), the uterus and ovaries (in women) and the other pelvic structures seen from above the pubic bone. When your doctor asks for it, for example if appendicitis or diverticulitis is suspected, I also look at the lower bowel.',
    faqExtra: [
      {
        q: "I have recurrent urinary infections: is the ultrasound useful?",
        a:
          "It can be, on your doctor’s advice. The kidneys and bladder are assessed for conditions that favour infections: hydronephrosis (dilation of the kidney’s collecting system), stones, a high post-void residual (urine left in the bladder after voiding) or bladder diverticula. It is not needed in every case.",
        verificata: true,
      },
      {
        q: "How does it differ from an upper abdominal ultrasound?",
        a:
          "The lower abdomen covers the bladder, the prostate in men, the uterus and ovaries in women and other pelvic structures, and needs a full bladder. The upper abdomen covers the liver, gallbladder, bile ducts, pancreas, spleen and kidneys, and needs fasting.",
        verificata: true,
      },
    ],
  },
  'apparato-urinario': {
    sintesi: 'A check of the kidneys, urinary tract and bladder; if requested, also after urinating.',
    perche:
      'You have it if you have renal colic, blood in the urine, frequent urinary infections, or your doctor suspects an obstruction to the flow of urine.',
    svolgimento:
      'First I look with a full bladder. Then, only if the doctor who prescribed the scan asks for it, I ask you to urinate and check how much urine remains in the bladder. I put gel on the abdomen and flanks, where the kidneys are.',
    cosaControlla:
      /* DA VERIFICARE: come nella versione italiana */
      'I assess the kidneys, ureters and bladder and, if your doctor requests it, measure the urine left after you have urinated.',
    faqExtra: [
      {
        q: "How much should I drink, and from when should I stop urinating?",
        a:
          "Finish drinking about a litre of water an hour before your appointment and do not urinate after that. A full bladder acts as a window: without it the lower urinary tract cannot be assessed properly. No fasting is needed: you can eat normally.",
      },
      {
        q: "What if I really can't hold on?",
        a:
          "Tell me as soon as you arrive, it is not a problem. I start with the kidneys and upper urinary tract, which do not depend on the bladder, and complete the rest as soon as possible. If your doctor has also asked for the measurement of the urine left after you urinate, that part is done anyway.",
      },
      {
        q: "Can the ultrasound see stones?",
        a:
          "It clearly shows stones inside the kidney and any dilation of the urinary tract. Stones along the ureter, which lies deep and is surrounded by bowel gas, often cannot be seen directly: in that case I look for the indirect signs and state this clearly in the report.",
      },
    ],
  },
  renale: {
    sintesi: 'A focused check of the kidneys: their size, shape and structure.',
    perche:
      'Your doctor requests it for flank or back pain, suspected renal colic, blood in the urine, or to follow up a kidney already monitored, for example because of a cyst or a stone that is already known. This scan, focused only on the kidneys, is chosen when there is no need to also check the bladder or blood flow.',
    svolgimento:
      'You lie on the couch, first on your back and then on each side. I apply a little gel to your back and flank, where the kidneys are, and move the probe to see them from different angles. It is painless, like any ultrasound scan.',
    cosaControlla:
      'I check the size, shape and position of the kidneys, the thickness of the kidney tissue and the renal pelvis, the inner part where urine collects before flowing into the ureter. I also see the start of the ureters, but not the bladder. I look for stones, cysts or a kidney that is dilated because of an obstruction to urine flow.',
    faqExtra: [
      {
        q: "How does it differ from the urinary tract ultrasound?",
        a:
          "Kidney ultrasound studies the kidneys, the renal pelvis (the cavity that collects urine inside the kidney) and the first part of the ureters. The urinary tract ultrasound also includes the bladder, which is why it needs a full bladder; if your doctor asks for it, it also measures the urine left after you urinate.",
        verificata: true,
      },
      {
        q: "Can stones be seen?",
        a:
          "Kidney stones usually can, although stones of just a few millimetres may be missed. Ureteral stones are rarely seen directly: the indirect sign is hydronephrosis, a dilation of the kidney’s collecting system above the blockage. The report states the limits of the scan.",
        verificata: true,
      },
      {
        q: 'What is the difference from the renal artery Doppler ultrasound?',
        a:
          'They are two different exams. A kidney ultrasound looks at the shape and structure of the kidneys. The renal artery Doppler ultrasound instead looks at how blood flows in the arteries that supply the kidneys: it is mainly used for high blood pressure that is hard to control.',
        verificata: true,
      },
      {
        q: "Do I need to fast? Do I need a full bladder?",
        a:
          "Yes, 6–8 hours of fasting (see above, under “Do I need to prepare?”). A full bladder is not needed, because the bladder is not part of this scan.",
        verificata: true,
      },
    ],
  },
  'vescico-prostatica': {
    sintesi: 'A check of the bladder and prostate from above the pubic bone.',
    perche:
      'Useful if you urinate often, with a weak stream, get up at night to urinate, or your doctor suspects an enlarged prostate.',
    svolgimento:
      'It is important to arrive with a reasonably full bladder. You lie on your back, I put gel on the lower abdomen and place the probe above the pubic bone.',
    cosaControlla:
      'I assess the bladder and prostate and, if your doctor requests it, how much urine remains after you have urinated.',
    faqExtra: [
      {
        q: "Can the prostate be seen with the probe on the abdomen?",
        a:
          "Yes, with the suprapubic (transabdominal) approach: the full bladder acts as an acoustic window and allows the prostate volume to be estimated and its general appearance assessed. For a detailed study of its internal structure there are dedicated exams, such as transrectal ultrasound or MRI, on the urologist’s advice.",
        verificata: true,
      },
      {
        q: "What if my bladder is not full enough?",
        a:
          "With a bladder that is not full enough I cannot see the bladder and prostate well. Usually I ask you to drink more water and repeat the scan once the bladder has filled, typically after 30–60 minutes; if that is not possible, we arrange a new appointment.",
        verificata: true,
      },
    ],
  },
  'scrotale-testicolare': {
    sintesi: 'A check of the testicles, epididymis and scrotal structures.',
    perche:
      'Useful for pain or swelling of the testicles, a lump you can feel, trauma, or checks related to varicocele, hydrocele or infertility.',
    svolgimento:
      'You lie down and I put gel on the scrotum; I move the probe gently, with little pressure. If you feel pain during the scan, tell me straight away. If the pain came on suddenly, read the question below about the emergency department first.',
    cosaControlla:
      'I assess the testicles, epididymis and spermatic cord, looking for causes of pain, swelling or lumps.',
    faqExtra: [
      {
        q: "When should I go straight away, without waiting?",
        a:
          "If the pain came on suddenly and is severe, perhaps with swelling and nausea, do not book: go to the emergency department. It may be testicular torsion, a condition in which hours really matter.",
      },
      {
        q: "Is any preparation needed?",
        a:
          "None. No fasting and no full bladder. It is done lying down and usually takes 10–20 minutes.",
      },
      {
        q: "I have noticed a swelling: what can be told apart?",
        a:
          "Ultrasound distinguishes well between the most common causes: epididymal cysts, hydrocele (fluid around the testicle), varicocele (dilated veins) and solid lumps of the testicle. The report describes what is seen; with it, your doctor or urologist decides whether a follow-up check is enough or further tests are needed.",
      },
    ],
  },
  tiroide: {
    sintesi: 'A check of the thyroid in the neck: size, shape and any nodules.',
    perche:
      'You have it if you notice a swelling in the neck, a palpable nodule, voice problems or abnormal thyroid blood tests.',
    svolgimento:
      'You lie down with your neck tilted slightly back. I put gel on the neck and glide the probe over the thyroid. It usually takes 15–20 minutes.',
    cosaControlla:
      'I look at the size, structure and presence of nodules or other changes in the thyroid.',
  },
  collo: {
    sintesi: 'A check of the thyroid, salivary glands, lymph nodes and other neck structures.',
    perche:
      'Useful if you have a swelling in the neck, enlarged lymph nodes, salivary gland problems or checks after surgery.',
    svolgimento:
      'You lie down with your neck tilted slightly back, with no necklaces or scarves. I apply gel and move the probe over the whole neck, front and sides, focusing on the area indicated by your doctor or where you feel the swelling.',
    cosaControlla:
      'I can assess the thyroid, salivary glands (below the ear and below the jaw), lymph nodes and neck vessels.',
    faqExtra: [
      {
        q: "Is it also done for check-ups after neck surgery?",
        a:
          "Yes. After a thyroidectomy (removal of the thyroid) or other neck surgery, ultrasound checks the thyroid bed, the area where the gland used to be, and the lymph nodes of the neck. Bring the surgery report, the histology report and previous scans with you.",
        verificata: true,
      },
      {
        q: "Should I take off necklaces or scarves?",
        a:
          "Yes, it is best to arrive with your neck uncovered: the probe needs to examine the whole neck, front and sides, down to the areas above the collarbones.",
        verificata: true,
      },
    ],
  },
  'muscolo-scheletrica': {
    sintesi: 'A check of muscles, tendons and ligaments in the area that hurts.',
    perche:
      'Useful after trauma, a tear, sports overload or pain that won\'t go away in a joint or muscle.',
    svolgimento:
      'I apply gel to the affected area. Sometimes I ask you to move the limb while I look at the screen.',
    cosaControlla:
      'I look at muscles, tendons, ligaments and bursae in the region indicated on the referral.',
  },
  spalla: {
    sintesi: 'A check of the tendons and structures of the shoulder.',
    perche:
      'You have it if it hurts to raise your arm, after trauma, or if you suspect inflammation or an injury to the shoulder.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'With your shoulder uncovered, I apply gel and move the probe over the front, side and back of the shoulder. I will ask you to raise, rotate and put your arm behind your back: the tendons are seen better in motion.',
    cosaControlla:
      'I assess the rotator cuff tendons, the bursa under the acromion (the bony tip at the top of the shoulder) and the biceps tendon.',
    faqExtra: [
      {
        q: "Can shoulder ultrasound see the rotator cuff?",
        a:
          "Yes, and that is its strong point. The cuff tendons, the bursa under the acromion and the long head of the biceps are studied very well with ultrasound, both for inflammation and for tears.",
      },
      {
        q: "Is ultrasound or MRI better for the shoulder?",
        a:
          "It depends on what is suspected. For tendons, bursa and calcifications ultrasound is the first choice: it is quick and lets you move your arm during the scan. MRI is needed when the suspicion concerns the glenoid labrum (the cartilage rim of the shoulder socket), cartilage or bone, or when surgery is being planned.",
      },
      {
        q: "Why do you ask me to move my arm during the scan?",
        a:
          "Because the shoulder is studied in motion. By having you raise and rotate your arm I can see the tendons slide under the acromion: some impingements (the tendon catching against the bone) and certain tears only become visible this way, while with the arm still they would go unnoticed.",
      },
      {
        q: "Can shoulder calcifications be seen?",
        a:
          "Yes. In calcific tendinopathy, calcium deposits form in the rotator cuff tendons, most often in the supraspinatus. Ultrasound shows their position and size and helps to tell compact calcifications from those being reabsorbed, which is often the most painful phase. An X-ray is a complementary exam.",
        verificata: true,
      },
      {
        q: "What is subacromial-subdeltoid bursitis?",
        a:
          "It is inflammation of the subacromial-subdeltoid bursa, a small fluid-filled sac that reduces friction, lying between the rotator cuff, the acromion and the deltoid muscle. Ultrasound shows whether the bursa is thickened or contains fluid (effusion). It may occur on its own or together with a rotator cuff tendinopathy.",
        verificata: true,
      },
      {
        q: "Can a torn shoulder tendon be seen?",
        a:
          "Yes. Ultrasound detects tears of the rotator cuff tendons, in particular the supraspinatus, and distinguishes a full-thickness tear (the tendon is interrupted all the way through) from a partial tear. The report states their position and extent, which help the orthopaedic surgeon decide on treatment.",
        verificata: true,
      },
    ],
  },
  ginocchio: {
    sintesi: 'A check of the tendons, ligaments and any fluid in the knee.',
    perche:
      'Useful after a sprain, a sports injury, knee swelling or pain at the front or sides.',
    svolgimento:
      'You lie down or stay seated with the knee bent. I put gel on the painful area and move the probe over it. I may ask for small movements.',
    cosaControlla:
      'I look at the knee tendons, collateral ligaments, bursae and whether there is fluid inside the joint. The deep menisci are less easily seen.',
    faqExtra: [
      {
        q: "Can knee ultrasound see the menisci and cruciate ligaments?",
        a:
          "Only in part, and it is right to know this beforehand. The menisci and cruciate ligaments lie deep inside the joint and the reference exam for them is MRI. Ultrasound, on the other hand, is very good for tendons, collateral ligaments, bursae and fluid.",
      },
      {
        q: "So what is knee ultrasound useful for?",
        a:
          "It is very useful for the patellar and quadriceps tendons, bursitis, the collateral ligaments, a Baker's cyst (a pocket of fluid behind the knee) and for measuring joint effusion. These are the most common problems after sports overload or a sprain.",
      },
      {
        q: "My knee is swollen: will ultrasound help?",
        a:
          "Yes, it is one of the cases where it helps most. I can see straight away whether the swelling is fluid inside the joint, how much there is and where it collects, and whether a Baker's cyst has formed behind the knee. This information helps your doctor or orthopaedic specialist decide how to proceed.",
      },
    ],
  },
  anca: {
    sintesi: 'A check of the tendons and soft-tissue structures around the hip, in adults.',
    perche:
      'Your doctor requests it for pain on the side of the hip, often linked to the gluteal tendons or the trochanteric bursa, or for groin pain linked to the deeper tendons (iliopsoas or adductors). It is also useful if you feel a snap or click when walking, after a trauma, or for discomfort that started with sport, for example running or football. It is also used to check the soft tissue around a hip replacement already in place. It is not the right exam to study the bone or the cartilage of the joint: for hip arthritis your doctor will more often use an X-ray.',
    svolgimento:
      'You lie on the couch. I apply gel to the groin, the side of the hip or both, depending on where it hurts: sometimes I ask you to turn on your side or lie face down, so I can see the back of the hip well too. If a snapping hip is suspected, I ask you to move your leg while I watch the screen, to see how the tendon behaves. The scan is painless and usually takes 15–20 minutes.',
    cosaControlla:
      'I assess the gluteal tendons and the trochanteric bursa on the side, the iliopsoas and adductor tendons in the groin, and any fluid in the hip joint. If you have a hip replacement, I also check the soft tissue around the implant. I cannot see the bone in depth or the joint cartilage well: X-ray or MRI remain more suitable for those.',
    faqExtra: [
      {
        q: "I have pain on the side of my hip: is ultrasound useful?",
        a:
          "Yes. Pain on the outer side of the hip, around the greater trochanter, is called greater trochanteric pain syndrome. Ultrasound assesses the gluteus medius and gluteus minimus tendons and the trochanteric bursa: the cause is often a tendinopathy (overload damage of the tendon) rather than bursitis.",
        verificata: true,
      },
      {
        q: "Is it the same as the newborn hip ultrasound?",
        a:
          "No. In adults the tendons, bursae and soft tissues around the joint are studied. In newborns the shape of the joint itself is assessed, to detect developmental dysplasia of the hip: it is a different exam, with its own page.",
        verificata: true,
      },
      {
        q: "Will I have to move my leg during the scan?",
        a:
          "Sometimes, yes. As well as scans at rest, a dynamic assessment, during movement of the hip, may be needed to see how the tendons glide. The probe is placed on the groin, on the side of the hip or both, depending on where the pain is.",
        verificata: true,
      },
      {
        q: 'I have a hip replacement: can I still have an ultrasound?',
        a:
          "Yes. Ultrasound uses no radiation and can assess everything lying over the prosthesis: tendons, muscles, bursae and any fluid collections. The metal surface of the prosthesis, like bone, reflects the ultrasound beam, so what lies beyond it cannot be seen, but everything more superficial is visible.",
        verificata: true,
      },
      {
        q: 'Can ultrasound see hip arthritis?',
        a:
          'It is not the best exam for that. Arthritis mainly involves the bone and cartilage of the joint, which are better seen with an X-ray. Ultrasound is instead useful for the tendons and soft tissue around the hip, and for any fluid in the joint.',
        verificata: true,
      },
    ],
  },
  'anca-neonatale': {
    sintesi: 'A check of the hips of a newborn or young infant.',
    perche:
      'Done in the first weeks of life to rule out a hip that has not formed well or that comes out of place, especially if there are risk factors or the paediatrician requests it.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'The baby lies on one side, with the nappy open, while you stay beside them and keep them calm. I place a small probe on the hip with a little warm gel, first on one side and then on the other. It can be done while the baby feeds or sleeps.',
    cosaControlla:
      'I check whether the hip is well formed and stable, measuring its angles with the Graf method, the one normally used for newborns.',
    faqExtra: [
      {
        q: "At what age is the newborn hip ultrasound done?",
        a:
          "Usually between the fourth and sixth week of life, and in any case within the first three months. If there have been cases of dysplasia in the family, if the baby was born in breech position or if the paediatrician noticed something at the check-up, it is done earlier.",
      },
      {
        q: "Does the baby feel any pain during the scan?",
        a:
          "No, it is completely painless and uses no radiation. The probe is simply placed on the hip with a little warm gel. It usually takes 10–15 minutes and can even be done while the baby sleeps or feeds: feel free to bring a dummy or bottle, it helps keep the baby calm.",
      },
      {
        q: "Why is it important to do it at the right time?",
        a:
          /* DA VERIFICARE: come nella versione italiana */
          "Because, if the hip needs help to develop properly, acting in the first months is simpler: often a brace (abduction splint), prescribed and followed up by the paediatric orthopaedic specialist, is enough. That is why this check is done even when the baby is perfectly well.",
      },
    ],
  },
  gomito: {
    sintesi: 'A check of the tendons and bursae of the elbow.',
    perche:
      'You have it if you have tennis or golfer\'s elbow, pain after repeated movements, swelling on the elbow or after a knock.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'You sit or lie down with your elbow resting, slightly bent. I put gel on the skin and move the probe over the outer side, the inner side and the crease of the elbow. Sometimes I ask you to clench your fist or turn your forearm.',
    cosaControlla:
      'I assess the inner and outer tendons of the elbow, the biceps tendon and the bursa on the tip of the elbow.',
    faqExtra: [
      {
        q: "Is it useful for epicondylitis (“tennis elbow”)?",
        a:
          "Yes. In lateral epicondylitis (“tennis elbow”) the common extensor tendon, attached to the lateral epicondyle, the bony bump on the outer side of the elbow, is assessed. In medial epicondylitis (“golfer’s elbow”) the common flexor-pronator tendon, attached to the medial epicondyle on the inner side of the elbow, is assessed. The scan looks for thickening, changes in tendon structure and any partial tears.",
        verificata: true,
      },
      {
        q: "I have a swelling on the tip of my elbow: what is assessed?",
        a:
          "The olecranon bursa is assessed: a small fluid-filled sac that reduces friction, lying over the olecranon, the tip of the elbow. Ultrasound shows whether it contains fluid (effusion), whether its walls are thickened and how large it is: these are the signs of olecranon bursitis.",
        verificata: true,
      },
      {
        q: "Is the biceps tendon assessed too?",
        a:
          "Yes. The distal biceps tendon, which attaches to the radius in the crease of the elbow, is part of the scan: its continuity and structure are assessed.",
        verificata: true,
      },
    ],
  },
  'polso-mano': {
    sintesi: 'A check of the tendons, nerves and joints of the wrist and hand.',
    perche:
      'Useful for tingling or numbness in the fingers, when carpal tunnel syndrome is suspected. ' +
      'It is also useful for pain or swelling along the tendons of the wrist and hand, for example in De Quervain’s tenosynovitis, on the thumb side of the wrist. ' +
      'Other reasons include a lump on the back of the wrist, often a tendon cyst (called a ganglion), and a finger that gets stuck bent (trigger finger). ' +
      'It is also done for pain in the small finger joints or ongoing pain after a wrist injury.',
    svolgimento:
      'You rest your hand and wrist on the couch, on a small support cushion. I put gel on the skin and move the probe over the area that hurts. ' +
      'Sometimes I ask you to bend or straighten your fingers, or move your thumb: seeing the tendons move helps assess them better. ' +
      'If carpal tunnel syndrome is suspected, I often examine both wrists.',
    cosaControlla:
      'I look at the flexor tendons, on the palm side, and the extensor tendons, on the back of the hand: their structure and the sheath that surrounds them (the lining that lets them glide). ' +
      'I check the median nerve where it enters the carpal tunnel, at the wrist. ' +
      'I assess the small joints of the wrist and fingers, the bursae (small fluid-filled sacs that reduce friction) and any tendon cysts. ' +
      'After an injury, I also look at the tendons and ligaments near the painful area.',
    faqExtra: [
      {
        q: "Is it useful for carpal tunnel syndrome?",
        a:
          "Yes. The median nerve is assessed at the entrance of the carpal tunnel, at the wrist, by measuring its cross-sectional area: an enlarged nerve is one of the signs of the syndrome. Ultrasound complements, but does not replace, nerve conduction studies, which your doctor may request.",
        verificata: true,
      },
      {
        q: "I have a lump on the back of my wrist: what is it?",
        a:
          "A lump on the back of the wrist often has a benign cause, such as a tendon cyst (ganglion). Ultrasound helps work out what it is and measures it.",
        verificata: true,
      },
      {
        q: "One of my fingers gets stuck bent: could it be trigger finger?",
        a:
          "It could be. In trigger finger, the flexor tendon has trouble gliding through its sheath, often because of thickening near the base of the finger. Ultrasound shows the tendon and the pulley (the ring that holds it close to the bone) at that point. Your doctor will decide on the treatment.",
        verificata: true,
      },
      {
        q: "I have pain at the base of my thumb, near the wrist: could it be De Quervain’s tenosynovitis?",
        a:
          "It is one of the possible causes. In De Quervain’s tenosynovitis, the tendons that move the thumb become inflamed, where they pass on the thumb side of the wrist. Ultrasound assesses the thickness of the sheath and whether there is fluid around the tendons. The same pain can also come from the joint at the base of the thumb (osteoarthritis): ultrasound helps tell the two apart.",
        verificata: true,
      },
    ],
  },
  'caviglia-piede': {
    sintesi: 'A check of the ligaments, Achilles tendon and structures of the foot.',
    perche:
      'Useful after an ankle sprain, heel or sole pain, or suspected ligament injury.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'You lie on the couch with your foot uncovered. I put gel on the ankle or the sole of the foot, where it hurts, and move the probe. Sometimes I ask you to move your foot or point to the exact spot that hurts, to see the tendons and ligaments in motion.',
    cosaControlla:
      'I assess the ankle ligaments, the Achilles tendon, the plantar fascia and the bursae of the foot.',
    faqExtra: [
      {
        q: "Is it useful for heel pain?",
        a:
          /* DA VERIFICARE: come nella versione italiana */
          "Often, yes. The most common cause is plantar fasciitis (inflammation of the band of tissue supporting the sole): I measure the thickness of the fascia where it attaches to the heel bone and compare it with the other side. I also look at the Achilles tendon and nearby bursae. If the pain comes from the bone, your doctor may suggest an X-ray.",
      },
      {
        q: "Is it useful after an ankle sprain?",
        a:
          "Very. I study the outer ligaments, in particular the anterior talofibular ligament, on the outer side of the ankle, the one most often injured, any effusion (fluid in the joint) and the state of the peroneal tendons, which run behind the outer ankle bone. If needed, I also assess the Achilles tendon.",
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
      'I apply gel to the area of the swelling and gently move the probe over it. It usually takes 15–20 minutes.',
    cosaControlla:
      'I look at whether the lump contains fluid (like a cyst) or is solid (like a lipoma), exactly where it is, how large it is and how it relates to nearby muscles and vessels.',
    faqExtra: [
      {
        q: "Can a haematoma be seen after an injury?",
        a:
          "Yes. A haematoma is a collection of blood in the soft tissues after an injury. Ultrasound shows its position, size and the appearance of its contents, which change over time as it is reabsorbed; this is why a follow-up scan is sometimes needed.",
        verificata: true,
      },
    ],
  },
  'doppler-tsa': {
    sintesi: 'A check of the blood flow in the neck arteries (carotids).',
    perche:
      'It helps assess the risk of stroke: if you have risk factors, a bruit (a sound the doctor hears) in the neck, dizziness or have already had a mini-stroke (TIA).',
    svolgimento:
      'You lie down. I apply gel to the neck and use the Doppler probe: you may hear a sound like a heartbeat.',
    cosaControlla:
      'I look at the carotid and other neck arteries, whether the blood flows well or there are any narrowings.',
  },
  'doppler-aorta': {
    sintesi: 'A check of the abdominal aorta and the blood flow.',
    perche:
      'You have it to monitor an aneurysm, that is a widening of the aorta, that has already been found, or if your doctor suspects the aorta is enlarged or there is a problem with the large vessels of the abdomen.',
    svolgimento:
      /* DA VERIFICARE: come nella versione italiana */
      'You lie on your back with your abdomen uncovered. I apply gel and follow the aorta with the probe from the stomach down to the lower abdomen, measuring its diameter at several points. Sometimes I ask you to hold your breath for a few seconds; you may hear the sound of the flow.',
    cosaControlla:
      'I measure the diameter of the abdominal aorta at several points and of the iliac arteries, the two branches it divides into in the lower abdomen, and look at how the blood flows.',
    faqExtra: [
      {
        q: "I have a known aneurysm: what is the check for?",
        a:
          "An abdominal aortic aneurysm is a permanent widening of the aorta, usually defined as a diameter of 3 cm or more. The check measures the maximum diameter and compares it with previous scans: bring your reports with you. How often checks are needed depends on the diameter and is decided by the specialist.",
        verificata: true,
      },
      {
        q: "Are the iliac arteries assessed too?",
        a:
          "Yes. The common iliac arteries are the two branches into which the aorta divides (aortic bifurcation) in the lower abdomen: their size and flow are assessed.",
        verificata: true,
      },
    ],
  },
  'doppler-arterie-renali': {
    sintesi: 'A check of the flow in the arteries that supply the kidneys.',
    perche:
      'Useful if you have high blood pressure that is hard to control and the doctor suspects a problem with the renal arteries.',
    svolgimento:
      'You lie down. I put gel on the flank and abdomen and move the Doppler probe over the kidneys: you will hear the sound of the flow.',
    cosaControlla:
      'I look at whether the renal arteries are clear or narrowed (stenosis) and how the blood reaches the kidneys.',
    faqExtra: [
      {
        q: "Why are the renal arteries checked if I have high blood pressure?",
        a:
          "Because a stenosis (narrowing) of a renal artery can cause renovascular hypertension, high blood pressure due to reduced blood flow to the kidney, often hard to control with medication. The Doppler measures blood velocity in the artery: a marked increase at the narrowing is the sign of stenosis.",
        verificata: true,
      },
      {
        q: "What is the sound I hear during the scan?",
        a:
          "It is the Doppler signal: the machine turns the speed of the blood in the vessel into sound, and the pitch changes with the speed of the flow. It is normal and part of the assessment.",
        verificata: true,
      },
    ],
  },
  'doppler-arti-inferiori': {
    sintesi: 'A check of the arteries and/or veins of the legs and feet.',
    perche:
      'Arteries: leg pain when walking, wounds that heal poorly. Veins: heavy legs, varicose veins, suspected thrombosis or swelling.',
    svolgimento:
      'You lie down. I put gel on the legs and feet and follow the arteries or veins with the Doppler probe. You may hear a sound.',
    cosaControlla:
      'I assess whether the blood reaches the legs well (arterial) or whether the veins carry the blood back to the heart as they should (venous).',
  },
  'doppler-arti-superiori': {
    sintesi: 'A check of the arteries and veins of the arms and forearms.',
    perche:
      'Useful if one arm is swollen compared with the other, suspected thrombosis, a dialysis fistula or problems with arterial flow.',
    svolgimento:
      'You lie or sit with your arm resting and uncovered up to the shoulder. I apply gel and follow the arteries or veins with the probe from the shoulder to the hand. You may hear the sound of the blood flow.',
    cosaControlla:
      'I look at the arteries and veins of the arm and whether the blood flow is normal.',
    faqExtra: [
      {
        q: "One arm is more swollen than the other: is the scan useful?",
        a:
          "Yes, swelling (oedema) of one arm is one of the indications. The scan looks for deep vein thrombosis, a thrombus (clot) in a deep vein: with compression ultrasound a normal vein flattens under the probe, a thrombosed vein does not. If the swelling came on suddenly, with pain, contact your doctor straight away.",
        verificata: true,
      },
      {
        q: "Is it also done for a dialysis fistula?",
        a:
          "Yes. A haemodialysis arteriovenous fistula is a surgically created connection between an artery and a vein in the arm. Doppler ultrasound measures its flow volume (how much blood passes through it each minute) and looks for any stenosis, that is, narrowing.",
        verificata: true,
      },
    ],
  },
  linfonodi: {
    sintesi: 'A check of enlarged lymph nodes in the neck, armpits or groin.',
    perche:
      'You have it if you notice a swelling or an enlarged lymph node that does not go away, in case of persistent fever, or to check lymph nodes already known.',
    svolgimento:
      'I apply gel to the area (neck, armpit or groin) and gently move the probe over it.',
    cosaControlla:
      'I assess the size, shape and internal structure of the lymph node and describe them in the report: based on these, your doctor decides whether a follow-up check is enough or further tests are needed.',
    faqExtra: [
      {
        q: "Which lymph node areas can be checked?",
        a:
          "The superficial ones: the sides of the neck (cervical nodes), the armpits (axillary nodes) and the groin (inguinal nodes). Usually the area indicated by your doctor, or where you feel the swelling, is examined, compared if needed with the other side.",
        verificata: true,
      },
      {
        q: "If I have had a lymph node ultrasound before, should I bring it?",
        a:
          "Yes. Comparing size, shape and internal structure over time (in particular the hilum, the central part of the node) is one of the main elements in interpreting the scan: previous reports make it more useful.",
        verificata: true,
      },
    ],
  },
};
