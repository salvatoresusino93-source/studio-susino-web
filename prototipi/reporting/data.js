/*
 * data.js — libreria dei referti standard (IT / EN / ES).
 *
 * ATTENZIONE: tutti i testi sono bozze originali scritte per il prototipo.
 * DA VERIFICARE dal medico prima di qualsiasi uso clinico.
 *
 * Struttura di un esame:
 *   {
 *     id:        identificativo univoco
 *     nome:      { it, en, es }  nome mostrato nel menu
 *     titolo:    { it, en, es }  intestazione del referto
 *     tecnica:   { it, en, es }  descrizione della tecnica
 *     reperti: [
 *       {
 *         id:          identificativo univoco nell'esame
 *         etichetta:   { it, en, es }  testo della checkbox
 *         negativo:    { it, en, es }  frase usata di default (reperto assente)
 *         positivo:    { it, en, es }  frase usata se la checkbox è selezionata
 *         conclusione: { it, en, es }  voce dell'elenco conclusioni (facoltativa:
 *                                      se manca si usa l'etichetta)
 *       }
 *     ],
 *     conclusioneNormale: { it, en, es }
 *   }
 *
 * Per aggiungere un esame basta aggiungere un oggetto all'array ESAMI.
 * Per aggiungere una lingua: una voce in LINGUE, in UI e in ogni testo.
 */

// Lingue disponibili (codice → nome mostrato nel menu)
const LINGUE = {
  it: 'Italiano',
  en: 'English',
  es: 'Español'
};

// Testi dell'interfaccia e parti fisse del referto
const UI = {
  it: {
    sottotitolo: 'Referti standard multilingua',
    esame: 'Esame', lingua: 'Lingua del referto', reperti: 'Reperti positivi',
    suggerimento: 'Tutto ciò che non selezioni viene refertato come negativo.',
    genera: 'Genera', copia: 'Copia', copiato: 'Copiato!', stampa: 'Stampa', reset: 'Reset',
    tecnica: 'Tecnica', descrizione: 'Descrizione', conclusioni: 'Conclusioni',
    vuoto: 'Scegli un esame, seleziona gli eventuali reperti positivi e premi «Genera».',
    avviso: 'Prototipo: testi standard da verificare prima dell\'uso clinico.',
    selezionati: 'selezionati'
  },
  en: {
    sottotitolo: 'Multilingual standard reports',
    esame: 'Exam', lingua: 'Report language', reperti: 'Positive findings',
    suggerimento: 'Anything you leave unchecked is reported as negative.',
    genera: 'Generate', copia: 'Copy', copiato: 'Copied!', stampa: 'Print', reset: 'Reset',
    tecnica: 'Technique', descrizione: 'Findings', conclusioni: 'Impression',
    vuoto: 'Choose an exam, tick any positive findings and press "Generate".',
    avviso: 'Prototype: standard texts must be reviewed before clinical use.',
    selezionati: 'selected'
  },
  es: {
    sottotitolo: 'Informes estándar multilingües',
    esame: 'Estudio', lingua: 'Idioma del informe', reperti: 'Hallazgos positivos',
    suggerimento: 'Todo lo que no marques se informa como negativo.',
    genera: 'Generar', copia: 'Copiar', copiato: '¡Copiado!', stampa: 'Imprimir', reset: 'Reiniciar',
    tecnica: 'Técnica', descrizione: 'Hallazgos', conclusioni: 'Conclusión',
    vuoto: 'Elige un estudio, marca los hallazgos positivos y pulsa «Generar».',
    avviso: 'Prototipo: textos estándar que deben revisarse antes del uso clínico.',
    selezionati: 'seleccionados'
  }
};

const ESAMI = [
  /* ================================================================ */
  {
    id: 'rx-torace',
    nome: { it: 'Rx torace', en: 'Chest X-ray', es: 'Radiografía de tórax' },
    titolo: {
      it: 'RADIOGRAFIA DEL TORACE (PA E LATERALE)',
      en: 'CHEST RADIOGRAPH (PA AND LATERAL)',
      es: 'RADIOGRAFÍA DE TÓRAX (PA Y LATERAL)'
    },
    tecnica: {
      it: 'Esame eseguito in proiezione postero-anteriore e laterale, in ortostatismo e in inspirazione.',
      en: 'Posteroanterior and lateral views obtained in the upright position at full inspiration.',
      es: 'Proyecciones posteroanterior y lateral en bipedestación y en inspiración.'
    },
    reperti: [
      {
        id: 'addensamento',
        etichetta: { it: 'Addensamento parenchimale', en: 'Airspace consolidation', es: 'Consolidación parenquimatosa' },
        negativo: {
          it: 'Non addensamenti parenchimali in atto.',
          en: 'No airspace consolidation.',
          es: 'No se observan consolidaciones parenquimatosas.'
        },
        positivo: {
          it: 'Area di addensamento parenchimale al campo polmonare inferiore destro, con broncogramma aereo.',
          en: 'Area of consolidation in the right lower zone, with air bronchograms.',
          es: 'Área de consolidación en el campo pulmonar inferior derecho, con broncograma aéreo.'
        },
        conclusione: {
          it: 'Addensamento parenchimale basale destro, da correlare con il quadro clinico (processo flogistico?).',
          en: 'Right basal consolidation; correlate clinically (infection?).',
          es: 'Consolidación basal derecha; correlacionar con la clínica (¿proceso infeccioso?).'
        }
      },
      {
        id: 'versamento',
        etichetta: { it: 'Versamento pleurico', en: 'Pleural effusion', es: 'Derrame pleural' },
        negativo: {
          it: 'Seni costo-frenici liberi.',
          en: 'Costophrenic angles are clear.',
          es: 'Senos costofrénicos libres.'
        },
        positivo: {
          it: 'Obliterazione del seno costo-frenico sinistro, come da modesto versamento pleurico.',
          en: 'Blunting of the left costophrenic angle, consistent with a small pleural effusion.',
          es: 'Obliteración del seno costofrénico izquierdo, compatible con derrame pleural escaso.'
        },
        conclusione: {
          it: 'Modesto versamento pleurico sinistro.',
          en: 'Small left pleural effusion.',
          es: 'Derrame pleural izquierdo escaso.'
        }
      },
      {
        id: 'pneumotorace',
        etichetta: { it: 'Pneumotorace', en: 'Pneumothorax', es: 'Neumotórax' },
        negativo: {
          it: 'Non segni di pneumotorace.',
          en: 'No pneumothorax.',
          es: 'Sin signos de neumotórax.'
        },
        positivo: {
          it: 'Linea pleurica viscerale visibile all\'apice destro, senza trama polmonare periferica, come da pneumotorace.',
          en: 'Visceral pleural line at the right apex with no peripheral lung markings, consistent with pneumothorax.',
          es: 'Línea pleural visceral visible en el vértice derecho, sin trama pulmonar periférica, compatible con neumotórax.'
        },
        conclusione: {
          it: 'Pneumotorace apicale destro: comunicato al medico curante.',
          en: 'Right apical pneumothorax: referring clinician informed.',
          es: 'Neumotórax apical derecho: comunicado al médico solicitante.'
        }
      },
      {
        id: 'cardiomegalia',
        etichetta: { it: 'Ombra cardiaca aumentata', en: 'Enlarged cardiac silhouette', es: 'Silueta cardiaca aumentada' },
        negativo: {
          it: 'Ombra cardiaca nei limiti per dimensioni e morfologia.',
          en: 'Cardiac silhouette is normal in size and shape.',
          es: 'Silueta cardiaca de tamaño y morfología normales.'
        },
        positivo: {
          it: 'Ombra cardiaca aumentata di volume (indice cardio-toracico superiore a 0,5).',
          en: 'Enlarged cardiac silhouette (cardiothoracic ratio above 0.5).',
          es: 'Silueta cardiaca aumentada de tamaño (índice cardiotorácico superior a 0,5).'
        },
        conclusione: {
          it: 'Aumento dell\'ombra cardiaca.',
          en: 'Cardiomegaly.',
          es: 'Cardiomegalia.'
        }
      },
      {
        id: 'congestione',
        etichetta: { it: 'Congestione del piccolo circolo', en: 'Pulmonary venous congestion', es: 'Congestión vascular pulmonar' },
        negativo: {
          it: 'Disegno vascolare polmonare nei limiti.',
          en: 'Pulmonary vasculature is normal.',
          es: 'Patrón vascular pulmonar normal.'
        },
        positivo: {
          it: 'Ridistribuzione del flusso verso i campi superiori e ispessimento dell\'interstizio, come da congestione del piccolo circolo.',
          en: 'Upper-lobe blood diversion and interstitial thickening, consistent with pulmonary venous congestion.',
          es: 'Redistribución vascular hacia los campos superiores y engrosamiento intersticial, compatible con congestión pulmonar.'
        },
        conclusione: {
          it: 'Segni di congestione del piccolo circolo.',
          en: 'Signs of pulmonary venous congestion.',
          es: 'Signos de congestión vascular pulmonar.'
        }
      },
      {
        id: 'nodulo',
        etichetta: { it: 'Nodulo polmonare', en: 'Pulmonary nodule', es: 'Nódulo pulmonar' },
        negativo: {
          it: 'Non lesioni nodulari evidenti.',
          en: 'No discrete pulmonary nodule.',
          es: 'No se identifican lesiones nodulares.'
        },
        positivo: {
          it: 'Opacità nodulare di circa 1 cm al campo polmonare medio sinistro.',
          en: 'Nodular opacity of about 1 cm in the left mid zone.',
          es: 'Opacidad nodular de aproximadamente 1 cm en el campo pulmonar medio izquierdo.'
        },
        conclusione: {
          it: 'Nodulo polmonare sinistro: si consiglia approfondimento con TC.',
          en: 'Left pulmonary nodule: CT recommended for further assessment.',
          es: 'Nódulo pulmonar izquierdo: se recomienda completar el estudio con TC.'
        }
      }
    ],
    conclusioneNormale: {
      it: 'Non alterazioni pleuro-parenchimali in atto. Quadro cardio-mediastinico nei limiti.',
      en: 'No acute cardiopulmonary abnormality.',
      es: 'Sin alteraciones pleuroparenquimatosas agudas. Silueta cardiomediastínica normal.'
    }
  },

  /* ================================================================ */
  {
    id: 'tc-addome',
    nome: { it: 'TC addome', en: 'CT abdomen', es: 'TC de abdomen' },
    titolo: {
      it: 'TC DELL\'ADDOME E DELLA PELVI CON MEZZO DI CONTRASTO',
      en: 'CT ABDOMEN AND PELVIS WITH CONTRAST',
      es: 'TC DE ABDOMEN Y PELVIS CON CONTRASTE'
    },
    tecnica: {
      it: 'Esame eseguito prima e dopo somministrazione endovenosa di mezzo di contrasto iodato, in fase portale, con ricostruzioni multiplanari.',
      en: 'Images acquired before and after intravenous iodinated contrast, in the portal venous phase, with multiplanar reconstructions.',
      es: 'Estudio realizado antes y después de contraste yodado intravenoso, en fase portal, con reconstrucciones multiplanares.'
    },
    reperti: [
      {
        id: 'fegato',
        etichetta: { it: 'Lesione epatica', en: 'Liver lesion', es: 'Lesión hepática' },
        negativo: {
          it: 'Fegato di dimensioni nei limiti, a densità omogenea, senza lesioni focali.',
          en: 'Liver normal in size and homogeneous in attenuation, without focal lesions.',
          es: 'Hígado de tamaño normal, de densidad homogénea, sin lesiones focales.'
        },
        positivo: {
          it: 'Al VII segmento epatico lesione ipodensa di circa 2 cm, a margini netti, senza enhancement, come da cisti.',
          en: 'Well-defined non-enhancing hypodense lesion of about 2 cm in liver segment VII, consistent with a cyst.',
          es: 'En el segmento VII hepático, lesión hipodensa de unos 2 cm, bien delimitada y sin realce, compatible con quiste.'
        },
        conclusione: {
          it: 'Cisti epatica al VII segmento.',
          en: 'Hepatic cyst in segment VII.',
          es: 'Quiste hepático en el segmento VII.'
        }
      },
      {
        id: 'colecisti',
        etichetta: { it: 'Calcoli della colecisti', en: 'Gallstones', es: 'Litiasis biliar' },
        negativo: {
          it: 'Colecisti normodistesa, a pareti regolari. Vie biliari non dilatate.',
          en: 'Gallbladder normally distended with regular walls. No biliary dilatation.',
          es: 'Vesícula biliar normodistendida, de paredes regulares. Vía biliar no dilatada.'
        },
        positivo: {
          it: 'Colecisti contenente alcuni calcoli iperdensi; pareti non ispessite. Vie biliari non dilatate.',
          en: 'Several hyperdense gallstones; gallbladder wall not thickened. No biliary dilatation.',
          es: 'Vesícula con varios cálculos hiperdensos; pared no engrosada. Vía biliar no dilatada.'
        },
        conclusione: {
          it: 'Calcolosi della colecisti senza segni di colecistite.',
          en: 'Cholelithiasis without signs of cholecystitis.',
          es: 'Colelitiasis sin signos de colecistitis.'
        }
      },
      {
        id: 'rene',
        etichetta: { it: 'Calcolo renale / idronefrosi', en: 'Renal stone / hydronephrosis', es: 'Litiasis renal / hidronefrosis' },
        negativo: {
          it: 'Reni in sede, di dimensioni nei limiti, con regolare impregnazione contrastografica. Non dilatazione delle vie escretrici.',
          en: 'Kidneys normal in position and size with symmetrical enhancement. No hydronephrosis.',
          es: 'Riñones en posición y tamaño normales, con captación simétrica. Sin dilatación de la vía excretora.'
        },
        positivo: {
          it: 'Calcolo di 6 mm all\'uretere prossimale sinistro, con dilatazione a monte delle cavità calico-pieliche.',
          en: '6 mm stone in the proximal left ureter with upstream pelvicalyceal dilatation.',
          es: 'Cálculo de 6 mm en el uréter proximal izquierdo, con dilatación pielocalicial proximal.'
        },
        conclusione: {
          it: 'Calcolo ureterale sinistro con idronefrosi a monte.',
          en: 'Left ureteric stone with hydronephrosis.',
          es: 'Litiasis ureteral izquierda con hidronefrosis.'
        }
      },
      {
        id: 'appendice',
        etichetta: { it: 'Appendicite', en: 'Appendicitis', es: 'Apendicitis' },
        negativo: {
          it: 'Appendice ciecale di calibro regolare.',
          en: 'Normal appendix.',
          es: 'Apéndice cecal de calibre normal.'
        },
        positivo: {
          it: 'Appendice ciecale ispessita (diametro 11 mm), con iperemia parietale e imbibizione del grasso circostante.',
          en: 'Thickened appendix (11 mm diameter) with mural hyperenhancement and periappendiceal fat stranding.',
          es: 'Apéndice engrosado (11 mm de diámetro), con hiperrealce parietal y alteración de la grasa adyacente.'
        },
        conclusione: {
          it: 'Quadro compatibile con appendicite acuta.',
          en: 'Findings consistent with acute appendicitis.',
          es: 'Hallazgos compatibles con apendicitis aguda.'
        }
      },
      {
        id: 'diverticolite',
        etichetta: { it: 'Diverticolite', en: 'Diverticulitis', es: 'Diverticulitis' },
        negativo: {
          it: 'Anse intestinali di calibro regolare, senza ispessimenti parietali.',
          en: 'Bowel loops of normal calibre without wall thickening.',
          es: 'Asas intestinales de calibre normal, sin engrosamiento parietal.'
        },
        positivo: {
          it: 'Diverticoli del sigma con ispessimento parietale segmentario e infiltrazione del grasso pericolico, senza raccolte né aria libera.',
          en: 'Sigmoid diverticula with segmental wall thickening and pericolic fat stranding, without collection or free air.',
          es: 'Divertículos de sigma con engrosamiento parietal segmentario y afectación de la grasa pericólica, sin colecciones ni aire libre.'
        },
        conclusione: {
          it: 'Diverticolite del sigma non complicata.',
          en: 'Uncomplicated sigmoid diverticulitis.',
          es: 'Diverticulitis de sigma no complicada.'
        }
      },
      {
        id: 'linfonodi',
        etichetta: { it: 'Linfonodi aumentati', en: 'Enlarged lymph nodes', es: 'Adenopatías' },
        negativo: {
          it: 'Non linfoadenomegalie addominali o pelviche.',
          en: 'No abdominal or pelvic lymphadenopathy.',
          es: 'Sin adenopatías abdominales ni pélvicas.'
        },
        positivo: {
          it: 'Alcuni linfonodi lombo-aortici aumentati di dimensioni, il maggiore di 15 mm di asse corto.',
          en: 'Several enlarged para-aortic lymph nodes, the largest measuring 15 mm in short axis.',
          es: 'Varias adenopatías paraaórticas, la mayor de 15 mm de eje corto.'
        },
        conclusione: {
          it: 'Linfoadenomegalie lombo-aortiche da approfondire.',
          en: 'Para-aortic lymphadenopathy requiring further assessment.',
          es: 'Adenopatías paraaórticas que requieren estudio adicional.'
        }
      },
      {
        id: 'liquido',
        etichetta: { it: 'Versamento libero', en: 'Free fluid', es: 'Líquido libre' },
        negativo: {
          it: 'Non versamento libero né aria libera in addome.',
          en: 'No free fluid or free air.',
          es: 'Sin líquido ni aire libre intraabdominal.'
        },
        positivo: {
          it: 'Modesta falda di versamento libero nello scavo pelvico.',
          en: 'Small amount of free fluid in the pelvis.',
          es: 'Escasa cantidad de líquido libre en la pelvis.'
        },
        conclusione: {
          it: 'Modesto versamento libero pelvico.',
          en: 'Small volume pelvic free fluid.',
          es: 'Escaso líquido libre pélvico.'
        }
      }
    ],
    conclusioneNormale: {
      it: 'Non alterazioni di rilievo a carico degli organi addominali e pelvici esaminati.',
      en: 'No significant abnormality of the abdominal and pelvic organs.',
      es: 'Sin alteraciones significativas de los órganos abdominopélvicos estudiados.'
    }
  },

  /* ================================================================ */
  {
    id: 'rm-encefalo',
    nome: { it: 'RM encefalo', en: 'MRI brain', es: 'RM de cerebro' },
    titolo: {
      it: 'RISONANZA MAGNETICA DELL\'ENCEFALO',
      en: 'MRI OF THE BRAIN',
      es: 'RESONANCIA MAGNÉTICA CEREBRAL'
    },
    tecnica: {
      it: 'Esame eseguito con sequenze T1, T2, FLAIR, diffusione (DWI) e T2* su piani multipli.',
      en: 'Multiplanar T1, T2, FLAIR, diffusion-weighted (DWI) and T2* sequences.',
      es: 'Secuencias T1, T2, FLAIR, difusión (DWI) y T2* en varios planos.'
    },
    reperti: [
      {
        id: 'ischemia-acuta',
        etichetta: { it: 'Lesione ischemica acuta', en: 'Acute infarct', es: 'Lesión isquémica aguda' },
        negativo: {
          it: 'Non aree di restrizione della diffusione.',
          en: 'No restricted diffusion.',
          es: 'Sin áreas de restricción de la difusión.'
        },
        positivo: {
          it: 'Area di restrizione della diffusione in sede cortico-sottocorticale frontale sinistra, come da lesione ischemica acuta.',
          en: 'Area of restricted diffusion in the left frontal cortex and subcortical white matter, consistent with an acute infarct.',
          es: 'Área de restricción de la difusión corticosubcortical frontal izquierda, compatible con lesión isquémica aguda.'
        },
        conclusione: {
          it: 'Lesione ischemica acuta frontale sinistra.',
          en: 'Acute left frontal infarct.',
          es: 'Lesión isquémica aguda frontal izquierda.'
        }
      },
      {
        id: 'leucopatia',
        etichetta: { it: 'Alterazioni della sostanza bianca', en: 'White matter changes', es: 'Alteraciones de la sustancia blanca' },
        negativo: {
          it: 'Sostanza bianca sopratentoriale di intensità di segnale regolare.',
          en: 'Supratentorial white matter of normal signal.',
          es: 'Sustancia blanca supratentorial de señal normal.'
        },
        positivo: {
          it: 'Alcune piccole iperintensità nella sostanza bianca periventricolare e sottocorticale in FLAIR, di probabile origine vascolare cronica.',
          en: 'Scattered small FLAIR hyperintensities in the periventricular and subcortical white matter, probably of chronic small-vessel origin.',
          es: 'Pequeñas hiperintensidades en FLAIR en la sustancia blanca periventricular y subcortical, de probable origen vascular crónico.'
        },
        conclusione: {
          it: 'Segni di sofferenza vascolare cronica della sostanza bianca.',
          en: 'Chronic small-vessel white matter changes.',
          es: 'Signos de enfermedad de pequeño vaso crónica.'
        }
      },
      {
        id: 'atrofia',
        etichetta: { it: 'Atrofia cerebrale', en: 'Cerebral atrophy', es: 'Atrofia cerebral' },
        negativo: {
          it: 'Sistema ventricolare e spazi subaracnoidei di ampiezza nei limiti per l\'età.',
          en: 'Ventricles and sulci are appropriate for age.',
          es: 'Sistema ventricular y espacios subaracnoideos de amplitud normal para la edad.'
        },
        positivo: {
          it: 'Ampliamento dei solchi corticali e del sistema ventricolare superiore a quanto atteso per l\'età.',
          en: 'Sulcal and ventricular enlargement greater than expected for age.',
          es: 'Ampliación de surcos y sistema ventricular mayor de lo esperado para la edad.'
        },
        conclusione: {
          it: 'Atrofia cerebrale diffusa.',
          en: 'Generalised cerebral atrophy.',
          es: 'Atrofia cerebral difusa.'
        }
      },
      {
        id: 'emorragia',
        etichetta: { it: 'Microemorragie', en: 'Microbleeds', es: 'Microhemorragias' },
        negativo: {
          it: 'Non segni di sanguinamento nelle sequenze T2*.',
          en: 'No evidence of haemorrhage on T2* sequences.',
          es: 'Sin signos de sangrado en secuencias T2*.'
        },
        positivo: {
          it: 'Alcuni piccoli foci ipointensi nelle sequenze T2* in sede lobare, come da microemorragie.',
          en: 'A few small lobar hypointense foci on T2*, consistent with microbleeds.',
          es: 'Algunos pequeños focos hipointensos lobares en T2*, compatibles con microhemorragias.'
        },
        conclusione: {
          it: 'Microemorragie lobari.',
          en: 'Lobar microbleeds.',
          es: 'Microhemorragias lobares.'
        }
      },
      {
        id: 'massa',
        etichetta: { it: 'Lesione espansiva', en: 'Space-occupying lesion', es: 'Lesión ocupante de espacio' },
        negativo: {
          it: 'Non lesioni espansive né effetto massa. Strutture mediane in asse.',
          en: 'No mass lesion or mass effect. Midline structures are central.',
          es: 'Sin lesiones ocupantes de espacio ni efecto de masa. Línea media centrada.'
        },
        positivo: {
          it: 'Formazione extra-assiale a base durale in sede parietale destra di circa 2 cm, con lieve effetto compressivo sul parenchima adiacente.',
          en: 'Dural-based extra-axial lesion of about 2 cm in the right parietal region, with mild mass effect on the adjacent brain.',
          es: 'Lesión extraaxial de base dural parietal derecha de unos 2 cm, con leve efecto compresivo sobre el parénquima adyacente.'
        },
        conclusione: {
          it: 'Lesione extra-assiale parietale destra (meningioma?): si consiglia completamento con mezzo di contrasto.',
          en: 'Right parietal extra-axial lesion (meningioma?): contrast-enhanced study recommended.',
          es: 'Lesión extraaxial parietal derecha (¿meningioma?): se recomienda completar con contraste.'
        }
      },
      {
        id: 'seni',
        etichetta: { it: 'Ispessimento mucoso dei seni', en: 'Sinus mucosal thickening', es: 'Engrosamiento mucoso sinusal' },
        negativo: {
          it: 'Seni paranasali e celle mastoidee regolarmente pneumatizzati.',
          en: 'Paranasal sinuses and mastoid air cells are clear.',
          es: 'Senos paranasales y celdillas mastoideas bien neumatizados.'
        },
        positivo: {
          it: 'Ispessimento della mucosa dei seni mascellari.',
          en: 'Mucosal thickening of the maxillary sinuses.',
          es: 'Engrosamiento mucoso de los senos maxilares.'
        },
        conclusione: {
          it: 'Ispessimento mucoso dei seni mascellari.',
          en: 'Maxillary sinus mucosal thickening.',
          es: 'Engrosamiento mucoso de senos maxilares.'
        }
      }
    ],
    conclusioneNormale: {
      it: 'Esame RM dell\'encefalo nei limiti della norma.',
      en: 'Normal MRI of the brain.',
      es: 'RM cerebral dentro de la normalidad.'
    }
  },

  /* ================================================================ */
  {
    id: 'eco-addome',
    nome: { it: 'Ecografia addome', en: 'Abdominal ultrasound', es: 'Ecografía abdominal' },
    titolo: {
      it: 'ECOGRAFIA DELL\'ADDOME COMPLETO',
      en: 'COMPLETE ABDOMINAL ULTRASOUND',
      es: 'ECOGRAFÍA ABDOMINAL COMPLETA'
    },
    tecnica: {
      it: 'Esame eseguito con sonda convex, paziente a digiuno.',
      en: 'Examination performed with a curved-array probe, patient fasting.',
      es: 'Estudio realizado con sonda convex, paciente en ayunas.'
    },
    reperti: [
      {
        id: 'steatosi',
        etichetta: { it: 'Steatosi epatica', en: 'Fatty liver', es: 'Esteatosis hepática' },
        negativo: {
          it: 'Fegato di dimensioni nei limiti, a ecostruttura omogenea, senza lesioni focali.',
          en: 'Liver normal in size and homogeneous in echotexture, without focal lesions.',
          es: 'Hígado de tamaño normal y ecoestructura homogénea, sin lesiones focales.'
        },
        positivo: {
          it: 'Fegato di dimensioni nei limiti, con diffuso aumento dell\'ecogenicità, come da steatosi. Non lesioni focali.',
          en: 'Liver normal in size with diffusely increased echogenicity, consistent with steatosis. No focal lesions.',
          es: 'Hígado de tamaño normal con aumento difuso de la ecogenicidad, compatible con esteatosis. Sin lesiones focales.'
        },
        conclusione: {
          it: 'Steatosi epatica.',
          en: 'Hepatic steatosis.',
          es: 'Esteatosis hepática.'
        }
      },
      {
        id: 'calcoli',
        etichetta: { it: 'Calcoli della colecisti', en: 'Gallstones', es: 'Litiasis biliar' },
        negativo: {
          it: 'Colecisti normodistesa, a pareti sottili e contenuto anecogeno. Vie biliari non dilatate.',
          en: 'Gallbladder normally distended, thin-walled, with anechoic content. Bile ducts not dilated.',
          es: 'Vesícula normodistendida, de paredes finas y contenido anecoico. Vía biliar no dilatada.'
        },
        positivo: {
          it: 'Colecisti con alcune formazioni iperecogene declivi con cono d\'ombra posteriore, come da calcoli. Pareti sottili. Vie biliari non dilatate.',
          en: 'Several dependent shadowing echogenic foci in the gallbladder, consistent with stones. Thin wall. Bile ducts not dilated.',
          es: 'Vesícula con varias imágenes ecogénicas declives con sombra acústica posterior, compatibles con cálculos. Pared fina. Vía biliar no dilatada.'
        },
        conclusione: {
          it: 'Calcolosi della colecisti.',
          en: 'Cholelithiasis.',
          es: 'Colelitiasis.'
        }
      },
      {
        id: 'cisti-renale',
        etichetta: { it: 'Cisti renale', en: 'Renal cyst', es: 'Quiste renal' },
        negativo: {
          it: 'Reni in sede, di dimensioni nei limiti, con normale differenziazione cortico-midollare.',
          en: 'Kidneys normal in position and size, with normal corticomedullary differentiation.',
          es: 'Riñones en posición y tamaño normales, con diferenciación corticomedular conservada.'
        },
        positivo: {
          it: 'Al polo superiore del rene destro cisti corticale semplice di circa 2 cm. Per il resto reni nei limiti.',
          en: 'Simple cortical cyst of about 2 cm at the upper pole of the right kidney. Kidneys otherwise unremarkable.',
          es: 'Quiste cortical simple de unos 2 cm en el polo superior del riñón derecho. Por lo demás, riñones normales.'
        },
        conclusione: {
          it: 'Cisti renale semplice destra.',
          en: 'Simple right renal cyst.',
          es: 'Quiste renal simple derecho.'
        }
      },
      {
        id: 'idronefrosi',
        etichetta: { it: 'Dilatazione delle vie urinarie', en: 'Hydronephrosis', es: 'Hidronefrosis' },
        negativo: {
          it: 'Non dilatazione delle cavità calico-pieliche né calcoli evidenti.',
          en: 'No hydronephrosis or visible calculi.',
          es: 'Sin dilatación pielocalicial ni litiasis visible.'
        },
        positivo: {
          it: 'Lieve dilatazione delle cavità calico-pieliche del rene sinistro.',
          en: 'Mild left pelvicalyceal dilatation.',
          es: 'Leve dilatación pielocalicial del riñón izquierdo.'
        },
        conclusione: {
          it: 'Lieve idronefrosi sinistra.',
          en: 'Mild left hydronephrosis.',
          es: 'Hidronefrosis izquierda leve.'
        }
      },
      {
        id: 'splenomegalia',
        etichetta: { it: 'Milza aumentata', en: 'Splenomegaly', es: 'Esplenomegalia' },
        negativo: {
          it: 'Milza di dimensioni nei limiti ed ecostruttura omogenea. Pancreas, per quanto esplorabile, nei limiti.',
          en: 'Spleen normal in size and echotexture. Pancreas unremarkable where visualised.',
          es: 'Bazo de tamaño y ecoestructura normales. Páncreas normal en lo visible.'
        },
        positivo: {
          it: 'Milza aumentata di volume (diametro longitudinale 14 cm), a ecostruttura omogenea. Pancreas, per quanto esplorabile, nei limiti.',
          en: 'Enlarged spleen (14 cm long) with homogeneous echotexture. Pancreas unremarkable where visualised.',
          es: 'Bazo aumentado de tamaño (14 cm de eje longitudinal), de ecoestructura homogénea. Páncreas normal en lo visible.'
        },
        conclusione: {
          it: 'Splenomegalia.',
          en: 'Splenomegaly.',
          es: 'Esplenomegalia.'
        }
      },
      {
        id: 'aorta',
        etichetta: { it: 'Aorta dilatata', en: 'Dilated aorta', es: 'Aorta dilatada' },
        negativo: {
          it: 'Aorta addominale di calibro regolare. Non versamento libero.',
          en: 'Abdominal aorta of normal calibre. No free fluid.',
          es: 'Aorta abdominal de calibre normal. Sin líquido libre.'
        },
        positivo: {
          it: 'Aorta addominale sottorenale dilatata, con diametro massimo di 3,4 cm. Non versamento libero.',
          en: 'Dilated infrarenal abdominal aorta, maximum diameter 3.4 cm. No free fluid.',
          es: 'Aorta abdominal infrarrenal dilatada, con diámetro máximo de 3,4 cm. Sin líquido libre.'
        },
        conclusione: {
          it: 'Dilatazione dell\'aorta addominale sottorenale: si consiglia valutazione specialistica.',
          en: 'Infrarenal abdominal aortic dilatation: specialist referral advised.',
          es: 'Dilatación de la aorta abdominal infrarrenal: se recomienda valoración especializada.'
        }
      }
    ],
    conclusioneNormale: {
      it: 'Ecografia dell\'addome completo nei limiti della norma.',
      en: 'Normal complete abdominal ultrasound.',
      es: 'Ecografía abdominal completa dentro de la normalidad.'
    }
  }
];
