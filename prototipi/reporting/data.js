/*
 * data.js — libreria dei referti nello stile del Dr. Susino.
 *
 * FONTE: i testi provengono dal documento "Referti Dott. Susino" (Google Drive,
 * cartella "Referti predefiniti ECOGRAFIA") e dai modelli di RefertEco.
 * Sono stati tolti i nomi propri e i valori numerici dei singoli casi,
 * sostituiti con ___ da completare.
 *
 * TC, RX, RM: frasi negative dai documenti «TC/RX/RM NEGATIVO STANDARD EL-DEA» del medico,
 * riscritte nello stile telegrafico (riscritta: true).
 *
 * Le frasi marcate  nuovo: true  NON vengono dall'archivio del medico: le ha
 * scritte Claude nello stesso stile per coprire reperti frequenti mancanti.
 * DA VERIFICARE: tutte le frasi "nuovo: true" prima dell'uso con pazienti.
 *
 * Struttura:
 *   METODICHE = [ { id, nome, attiva, distretti: [ distretto ] } ]
 *   distretto = {
 *     id, nome, gruppo, titolo,
 *     lati:  ["destra","sinistra"]   (facoltativo: mostra la scelta del lato)
 *     intro: "... {lato} ..."        (facoltativo: prima riga, {lato} = lato scelto)
 *     introBilaterale: "..."         (facoltativo: prima riga se si sceglie "bilaterale")
 *     organi: [ organo ],
 *     conclusioneNegativa: "..."     (usata solo se si attivano le conclusioni)
 *     contesto: "tc-addome"          (facoltativo: contesto per le regole del linter; predefinito "metodica-id")
 *   }
 *   organo = {
 *     id, nome,
 *     negativo: "frase scritta se nessun reperto è selezionato" ("" = nessuna frase),
 *     stessaRiga: true      (facoltativo: la frase continua la riga precedente),
 *     soloSeNegativo: true  (facoltativo: frase scritta solo se l'intero distretto è negativo),
 *     reperti: [ reperto ]
 *   }
 *   reperto = {
 *     id, etichetta, testo,
 *     modo: "sostituisce" (predefinito: prende il posto del negativo dell'organo)
 *         | "aggiunge"     (lascia il negativo e aggiunge la frase dopo),
 *     conclusione: "..."   (facoltativa, per le conclusioni),
 *     nuovo: true          (frase non presente nell'archivio del medico)
 *   }
 * Nei testi:  ___  = valore da completare;  \n = a capo.
 * Le metodiche con attiva: false compaiono come "in arrivo".
 */

const LINGUE = { it: "Italiano", en: "English", es: "Español" };

/* Frasi comuni a tutti i distretti: in testa e in coda al referto */
const FRASI_COMUNI = {
  lingue: ["it", "en", "es"],
  traduzioniDaVerificare: true, /* DA VERIFICARE: traduzioni EN/ES */
  premessa: [
    { id: "quesito", etichetta: "Quesito clinico", testo: { it: "Quesito clinico: ___.", en: "Clinical question: ___.", es: "Indicación clínica: ___." } },
    { id: "precedente", etichetta: "Confronto con esame precedente", riscritta: true, testo: { it: "Presa visione del precedente esame del ___, eseguito presso altra Sede.", en: "Previous examination of ___, performed at another facility, reviewed.", es: "Revisado el estudio previo del ___, realizado en otro centro." } },
    { id: "controlato", etichetta: "In comparazione con il controlato", testo: { it: "Esame eseguito in comparazione con il controlato.", en: "Examination performed with comparison to the contralateral side.", es: "Estudio realizado en comparación con el lado contralateral." } },
    { id: "urgenza", etichetta: "Regime d'urgenza", testo: { it: "Esame eseguito in regime d'urgenza.", en: "Examination performed as an emergency.", es: "Estudio realizado con carácter urgente." } },
    { id: "precedente-analogo", etichetta: "Confronto con precedente analogo", riscritta: true, testo: { it: "Confronto con il precedente esame analogo del ___.", en: "Comparison with the previous similar examination of ___.", es: "Comparación con el estudio previo similar del ___." } },
    { id: "dea", etichetta: "Lettura in urgenza-emergenza (DEA)", riscritta: true, testo: { it: "Esame eseguito e refertato in regime di urgenza ed emergenza, con valutazione mirata al quadro e al quesito clinico indicati.", en: "Examination performed and reported as an emergency, with assessment focused on the clinical picture and question provided.", es: "Estudio realizado e informado en régimen de urgencia y emergencia, con valoración dirigida al cuadro y a la indicación clínica señalados." } },
  ],
  chiusura: [
    { id: "controllo", etichetta: "Controllo a distanza", riscritta: true, testo: { it: "Consigliato controllo ecografico a distanza di ___ mesi.", en: "Follow-up ultrasound recommended in ___ months.", es: "Control ecográfico recomendado en ___ meses." } },
    { id: "specialistica", etichetta: "Valutazione specialistica", testo: { it: "Utile valutazione specialistica.", en: "Specialist assessment advised.", es: "Aconsejable valoración especializada." } },
    { id: "laboratorio", etichetta: "Esami di laboratorio", testo: { it: "Utile integrazione con esami laboratoristici e valutazione clinico-specialistica.", en: "Correlation with laboratory tests and clinical-specialist assessment advised.", es: "Aconsejable completar con pruebas de laboratorio y valoración clínica especializada." } },
    { id: "persistere", etichetta: "Rivalutazione se persiste", testo: { it: "Al persistere della sintomatologia utile rivalutazione clinico-strumentale.", en: "If symptoms persist, clinical and imaging reassessment advised.", es: "Si persisten los síntomas, aconsejable revaloración clínica y por imagen." } },
    { id: "followup", etichetta: "Follow-up", riscritta: true, testo: { it: "Indicato follow-up clinico-strumentale.", en: "Clinical and imaging follow-up indicated.", es: "Indicado seguimiento clínico y por imagen." } },
    { id: "approfondimento", etichetta: "Approfondimento TC/RM/RX", testo: { it: "Utile approfondimento diagnostico con esame ___ (TC/RM/RX).", en: "Further assessment with ___ (CT/MRI/X-ray) advised.", es: "Aconsejable completar el estudio con ___ (TC/RM/RX)." } },
    { id: "addendum", etichetta: "Reperti collaterali in seguito (DEA)", riscritta: true, testo: { it: "Valutazione dei reperti collaterali in un secondo momento, con eventuale addendum.", en: "Incidental findings to be assessed at a later stage, with a possible addendum.", es: "Valoración de los hallazgos colaterales en un segundo momento, con eventual adenda." } },
    { id: "null-altro", etichetta: "Null'altro in urgenza (DEA)", testo: { it: "Null'altro da segnalare in regime di urgenza ed emergenza.", en: "Nothing else to report in the emergency setting.", es: "Nada más que señalar en régimen de urgencia y emergencia." } },
  ]
};

const METODICHE = [
  {
    id: "eco",
    nome: "Ecografia",
    attiva: true,
    distretti: [

      /* ============================================================ ADDOME */
      {
        id: "addome",
        nome: "Addome completo",
        gruppo: "Addome",
        titolo: "ECOGRAFIA DELL'ADDOME COMPLETO",
        organi: [
          {
            id: "limiti", nome: "Limiti tecnici", negativo: "",
            reperti: [
              { id: "meteorismo", etichetta: "Limitato da meteorismo", testo: "Esame tecnicamente limitato per l'interposizione di marcato meteorismo intestinale." },
              { id: "habitus", etichetta: "Limitato da habitus / collaborazione", riscritta: true, testo: "Esame tecnicamente limitato dalla scarsa collaborazione e dall'habitus del paziente, e per la sovrapposizione di marcato meteorismo intestinale." }
            ]
          },
          {
            id: "fegato", nome: "Fegato",
            negativo: "Fegato di dimensioni nei limiti della norma, con margini regolari, ecostruttura omogenea e indenne da lesioni focali US risolvibili.",
            reperti: [
              { id: "steatosi", etichetta: "Steatosi", riscritta: true, testo: "Fegato ad ecostruttura iperriflettente, come nei quadri di steatosi epatica, di dimensioni ___ (nei limiti della norma/aumentate) e indenne da lesioni focali US risolvibili.", conclusione: "Steatosi epatica." },
              { id: "parziale", etichetta: "Esplorabile parzialmente", testo: "Il fegato, esplorabile parzialmente, pare presentare dimensioni ai limiti superiori della norma, margini lievemente bozzuti ed ecogenicità diffusamente aumentata, apparentemente privo di lesioni focali." },
              { id: "angioma", etichetta: "Angioma", riscritta: true, testo: "Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.\nAl ___ segmento, in sede ___, presenza di focalità debolmente iperecogena di ___ mm, in prima ipotesi compatibile con angioma. Non ulteriori evidenti lesioni focali.", conclusione: "Focalità epatica in prima ipotesi angiomatosa." },
              { id: "angioma-noto", etichetta: "Angioma noto (invariato)", riscritta: true, testo: "Nel ___ segmento epatico, conferma della nota formazione iperecogena a margini polilobati, delle dimensioni massime di ___ x ___ mm, da riferire in prima ipotesi ad angioma. Assenti ulteriori evidenti lesioni focali." },
              { id: "cisti", etichetta: "Cisti epatica", riscritta: true, testo: "Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.\nAl ___ segmento, formazione anecogena a margini netti di ___ mm, a contenuto omogeneo, priva di setti interni e componente solida, di tipo cistico semplice.", conclusione: "Cisti epatica semplice." },
              { id: "solida", etichetta: "Formazione solida", riscritta: true, testo: "Al ___ segmento epatico, formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm. Al color-Doppler, presenza/assenza di vascolarizzazione interna. Consigliati correlazione clinica e approfondimento diagnostico.", conclusione: "Formazione epatica solida meritevole di approfondimento diagnostico." },
              { id: "secondarismi", etichetta: "Secondarismi", riscritta: true, testo: "Ecostruttura epatica sovvertita per la presenza di plurime lesioni focali, variabili per aspetto e dimensioni, compatibili con secondarismi. Utile approfondimento diagnostico con esame TC.", conclusione: "Lesioni focali epatiche multiple compatibili con secondarismi." },
              { id: "cirrosi", etichetta: "Epatopatia cronica", nuovo: true, riscritta: true, testo: "Fegato di dimensioni ___, con margini bozzuti ed ecostruttura grossolanamente disomogenea, come nei quadri di epatopatia cronica. Non evidenti lesioni focali US risolvibili.", conclusione: "Quadro ecografico di epatopatia cronica." }
            ]
          },
          {
            id: "vasi", nome: "Vene sovraepatiche e porta",
            negativo: "Regolare calibro e pervietà delle vene sovraepatiche e della vena porta.",
            reperti: [
              { id: "porta", etichetta: "Porta in dettaglio (ipertensione portale)", testo: "Pervia e di calibro regolare, con flusso epatopeto, la vena porta all'ilo epatico; pervi i principali rami portali intraepatici." },
              { id: "porta-dilatata", etichetta: "Porta dilatata", nuovo: true, testo: "Vena porta pervia, di calibro aumentato all'ilo epatico (___ mm), con flusso ___ (epatopeto/epatofugo).", conclusione: "Dilatazione della vena porta." }
            ]
          },
          {
            id: "colecisti", nome: "Colecisti",
            negativo: "Colecisti distesa, indenne da calcoli endoluminali.",
            reperti: [
              { id: "calcoli", etichetta: "Calcolosi", testo: "Colecisti distesa, con evidenza nel contesto di ___ formazioni litiasiche calcifiche, la maggiore delle dimensioni di circa ___ mm.", conclusione: "Calcolosi della colecisti." },
              { id: "concrezioni", etichetta: "Minute concrezioni", riscritta: true, testo: "Colecisti con alcune minute concrezioni calcifiche nel lume.", conclusione: "Microlitiasi della colecisti." },
              { id: "polipo", etichetta: "Polipo", riscritta: true, testo: "Lungo il profilo ___ del corpo colecistico, formazione di aspetto polipoide di ___ mm aggettante nel lume, meritevole di controllo ecografico a distanza di circa 4 - 6 mesi in considerazione del primo riscontro.", conclusione: "Formazione polipoide della colecisti." },
              { id: "colecistite", etichetta: "Colecistite acuta", nuovo: true, riscritta: true, testo: "Colecisti distesa, con pareti ispessite (___ mm) e stratificate, con formazione litiasica incuneata nel collo e segno di Murphy ecografico positivo, come nei quadri di colecistite acuta.", conclusione: "Quadro ecografico compatibile con colecistite acuta: utile valutazione chirurgica." },
              { id: "contratta", etichetta: "Contratta (non a digiuno)", nuovo: true, testo: "Colecisti contratta, non valutabile (paziente non a digiuno)." },
              { id: "colecistectomia", etichetta: "Colecistectomia", nuovo: true, testo: "Esiti di colecistectomia." }
            ]
          },
          {
            id: "vie-biliari", nome: "Vie biliari", stessaRiga: true,
            negativo: "Vie biliari non dilatate.",
            reperti: [
              { id: "dilatate", etichetta: "Vie biliari dilatate", nuovo: true, testo: "Dilatazione delle vie biliari intraepatiche e della via biliare principale, di calibro pari a ___ mm; utile approfondimento diagnostico.", conclusione: "Dilatazione delle vie biliari." }
            ]
          },
          {
            id: "pancreas", nome: "Pancreas",
            negativo: "Non tumefazioni pancreatiche a carico delle porzioni esplorabili.",
            reperti: [
              { id: "parziale", etichetta: "Esplorabile parzialmente", testo: "Non tumefazioni pancreatiche a carico delle porzioni esplorabili (parte della testa e del corpo)." },
              { id: "non-esplorabile", etichetta: "Non esplorabile", testo: "Pancreas non esplorabile, mascherato da meteorismo." },
              { id: "wirsung", etichetta: "Wirsung dilatato", nuovo: true, testo: "Dotto di Wirsung dilatato (calibro ___ mm); utile approfondimento diagnostico.", conclusione: "Dilatazione del dotto di Wirsung." }
            ]
          },
          {
            id: "milza", nome: "Milza",
            negativo: "Milza nei limiti morfo-volumetrici.",
            reperti: [
              { id: "splenomegalia", etichetta: "Splenomegalia", nuovo: true, testo: "Milza aumentata di volume (diametro bipolare ___ mm), ad ecostruttura omogenea.", conclusione: "Splenomegalia." },
              { id: "accessoria", etichetta: "Milza accessoria", nuovo: true, riscritta: true, testo: "Milza nei limiti morfo-volumetrici. All'ilo splenico, piccola formazione rotondeggiante isoecogena al parenchima splenico di ___ mm, compatibile con milza accessoria." }
            ]
          },
          {
            id: "reni", nome: "Reni",
            negativo: "Reni in sede, di dimensioni nei limiti della norma, con regolare spessore parenchimale e buona differenziazione cortico-midollare.",
            reperti: [
              { id: "cisti", etichetta: "Cisti renale", modo: "aggiunge", riscritta: true, testo: "Al polo ___ del rene ___, formazione ipoanecogena con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm.", conclusione: "Cisti renale." },
              { id: "cisti-multiple", etichetta: "Cisti renali bilaterali", modo: "aggiunge", riscritta: true, testo: "A livello dei reni, alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___, di circa ___ mm.", conclusione: "Cisti renali bilaterali." },
              { id: "cisti-note", etichetta: "Cisti note invariate", modo: "aggiunge", riscritta: true, testo: "Invariate le note cisti corticali renali in sede bilaterale, la maggiore sita al polo ___ di ___, del diametro massimo di circa ___ mm." },
              { id: "nefropatia", etichetta: "Nefropatia cronica", nuovo: true, riscritta: true, testo: "Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica.", conclusione: "Segni ecografici di nefropatia cronica." }
            ]
          },
          {
            id: "vie-urinarie", nome: "Cavità calico-pieliche e calcoli",
            negativo: "Cavità calico-pieliche non dilatate. Non evidenti segni di nefrolitiasi.",
            reperti: [
              { id: "calcoli-dx", etichetta: "Calcoli rene destro", riscritta: true, testo: "A destra, ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi destra." },
              { id: "calcoli-sx", etichetta: "Calcoli rene sinistro", riscritta: true, testo: "A sinistra, ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; cavità calico-pieliche non dilatate.", conclusione: "Nefrolitiasi sinistra." },
              { id: "idronefrosi", etichetta: "Dilatazione cavità (idronefrosi)", nuovo: true, testo: "Dilatazione delle cavità calico-pieliche del rene ___ di grado ___ (lieve/moderato/marcato).", conclusione: "Idronefrosi ___." }
            ]
          },
          {
            id: "aorta", nome: "Aorta addominale",
            negativo: "Non dilatazioni aneurismatiche nelle porzioni esplorabili dell'aorta addominale.",
            reperti: [
              { id: "ateromasia", etichetta: "Ateromasia", modo: "aggiunge", testo: "Diffusa ateromasia fibrocalcifica a carico del distretto esaminato." },
              { id: "ectasia", etichetta: "Ectasia", nuovo: true, testo: "Aorta addominale sottorenale ectasica, con diametro massimo trasverso di ___ mm, senza franche dilatazioni aneurismatiche.", conclusione: "Ectasia dell'aorta addominale." },
              { id: "aneurisma", etichetta: "Aneurisma", nuovo: true, testo: "Dilatazione aneurismatica dell'aorta addominale sottorenale, con diametro massimo trasverso di ___ mm ed estensione longitudinale di circa ___ mm, con apposizione trombotica parietale ___; utile valutazione specialistica chirurgo-vascolare.", conclusione: "Aneurisma dell'aorta addominale sottorenale." }
            ]
          },
          {
            id: "vescica", nome: "Vescica",
            negativo: "Vescica distesa, con pareti regolari, indenne da evidenti lesioni aggettanti nel lume.",
            reperti: [
              { id: "sedimento", etichetta: "Sedimento ematico", riscritta: true, testo: "Vescica ben distesa, con abbondante sedimento ematico nel lume: pareti non adeguatamente valutabili per tale limite; indicata valutazione specialistica." },
              { id: "sovradistesa", etichetta: "Sovradistesa", riscritta: true, testo: "Vescica sovradistesa, a pareti sottili e lume libero; loggia prostatica non valutabile per tale condizione." },
              { id: "vuota", etichetta: "Vuota", testo: "Vescica vuota: organi pelvici non valutabili." },
              { id: "pareti", etichetta: "Pareti ispessite", nuovo: true, riscritta: true, testo: "Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo." },
              { id: "aggetto", etichetta: "Lesione aggettante", nuovo: true, riscritta: true, testo: "Vescica distesa; lungo la parete ___, formazione aggettante nel lume di ___ mm, meritevole di approfondimento specialistico urologico.", conclusione: "Lesione vegetante vescicale meritevole di approfondimento urologico." }
            ]
          },
          {
            id: "prostata", nome: "Prostata", negativo: "",
            reperti: [
              { id: "ipertrofica", etichetta: "Ipertrofica con lobo medio", riscritta: true, testo: "Prostata, esplorata per via sovrapubica, ad ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; lobo medio improntante la base vescicale; volume di circa ___ cc.", conclusione: "Ipertrofia prostatica." },
              { id: "lieve", etichetta: "Lievemente disomogenea", testo: "Prostata, esplorata con approccio sovrapubico, lievemente disomogenea, con volume di ___ cc, con ipertrofia del lobo medio improntante il pavimento vescicale." },
              { id: "normale", etichetta: "Nei limiti (con volume)", nuovo: true, testo: "Prostata, esplorata per via sovrapubica, di dimensioni nei limiti della norma (volume di circa ___ cc) ed ecostruttura omogenea." }
            ]
          },
          {
            id: "pelvi", nome: "Utero e ovaie", negativo: "",
            reperti: [
              { id: "cisti-ovaio", etichetta: "Cisti funzionali ovaio", testo: "Regolare per dimensioni ed ecostruttura l'utero.\nOvaio ___ di dimensioni regolari, con ___ cisti funzionali sub-centimetriche; non valutabile l'ovaio ___ mascherato da meteorismo." }
            ]
          },
          {
            id: "peritoneo", nome: "Falde fluide",
            riscritta: true, negativo: "Assenti falde fluide nei recessi peritoneali esplorati.",
            reperti: [
              { id: "versamento", etichetta: "Versamento libero", nuovo: true, testo: "Falda fluida libera ___ (nello scavo pelvico/periepatica/perisplenica/diffusa nei recessi peritoneali).", conclusione: "Versamento libero endoaddominale." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "addome-urgenza",
        nome: "Addome in urgenza (trauma)",
        gruppo: "Addome",
        titolo: "ECOGRAFIA DELL'ADDOME IN URGENZA",
        intro: "Esame eseguito in regime d'urgenza.",
        organi: [
          {
            id: "parenchimi", nome: "Fegato, milza, reni",
            riscritta: true, negativo: "Non alterazioni ecostrutturali da riferire alla natura post-traumatica a carico di fegato, milza, reni.",
            reperti: [
              { id: "lesione", etichetta: "Sospetta lesione traumatica", nuovo: true, riscritta: true, testo: "A carico di ___, area disomogenea di ___ mm, sospetta per lesione post-traumatica; utile approfondimento diagnostico con esame TC.", conclusione: "Sospetta lesione post-traumatica di ___: utile TC." }
            ]
          },
          {
            id: "peritoneo", nome: "Cavità peritoneale",
            negativo: "Cavità peritoneale libera da versamento.",
            reperti: [
              { id: "versamento", etichetta: "Versamento libero", nuovo: true, testo: "Falda fluida libera ___ (nello spazio di Morison/perisplenica/nello scavo pelvico).", conclusione: "Versamento libero endoaddominale." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni ecografici di lesioni post-traumatiche degli organi parenchimatosi."
      },

      {
        id: "urinario",
        nome: "Reni e vie urinarie",
        gruppo: "Addome",
        titolo: "ECOGRAFIA DELL'APPARATO URINARIO",
        organi: [
          {
            id: "reni", nome: "Reni",
            negativo: "Reni in sede, di dimensioni nei limiti della norma, con regolare spessore parenchimale e buona differenziazione cortico-midollare.",
            reperti: [
              { id: "cisti", etichetta: "Cisti renale", modo: "aggiunge", riscritta: true, testo: "Al polo ___ del rene ___, formazione ipoanecogena con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm.", conclusione: "Cisti renale." },
              { id: "cisti-multiple", etichetta: "Cisti renali bilaterali", modo: "aggiunge", riscritta: true, testo: "A livello dei reni, alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___, di circa ___ mm.", conclusione: "Cisti renali bilaterali." },
              { id: "nefropatia", etichetta: "Nefropatia cronica", nuovo: true, riscritta: true, testo: "Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come nei quadri di nefropatia cronica.", conclusione: "Segni ecografici di nefropatia cronica." }
            ]
          },
          {
            id: "vie-urinarie", nome: "Cavità calico-pieliche e calcoli",
            negativo: "Cavità calico-pieliche non dilatate. Non evidenti segni di nefrolitiasi.",
            reperti: [
              { id: "calcoli-dx", etichetta: "Calcoli rene destro", riscritta: true, testo: "A destra, ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi destra." },
              { id: "calcoli-sx", etichetta: "Calcoli rene sinistro", riscritta: true, testo: "A sinistra, ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; cavità calico-pieliche non dilatate.", conclusione: "Nefrolitiasi sinistra." },
              { id: "idronefrosi", etichetta: "Dilatazione cavità (idronefrosi)", nuovo: true, testo: "Dilatazione delle cavità calico-pieliche del rene ___ di grado ___ (lieve/moderato/marcato).", conclusione: "Idronefrosi ___." }
            ]
          },
          {
            id: "vescica", nome: "Vescica",
            negativo: "Vescica distesa, con pareti regolari, indenne da evidenti lesioni aggettanti nel lume.",
            reperti: [
              { id: "sedimento", etichetta: "Sedimento ematico", riscritta: true, testo: "Vescica ben distesa, con abbondante sedimento ematico nel lume: pareti non adeguatamente valutabili per tale limite; indicata valutazione specialistica." },
              { id: "sovradistesa", etichetta: "Sovradistesa", riscritta: true, testo: "Vescica sovradistesa, a pareti sottili e lume libero; loggia prostatica non valutabile per tale condizione." },
              { id: "pareti", etichetta: "Pareti ispessite", nuovo: true, riscritta: true, testo: "Vescica distesa, con pareti diffusamente ispessite e trabecolate, come nei quadri di vescica da sforzo." },
              { id: "residuo", etichetta: "Residuo post-minzionale", nuovo: true, riscritta: true, testo: "Residuo vescicale post-minzionale di circa ___ cc." }
            ]
          },
          {
            id: "prostata", nome: "Prostata", negativo: "",
            reperti: [
              { id: "ipertrofica", etichetta: "Ipertrofica con lobo medio", riscritta: true, testo: "Prostata, esplorata per via sovrapubica, ad ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; lobo medio improntante la base vescicale; volume di circa ___ cc.\nVescica con pareti regolari, senza aggetti endoluminali, improntata sul pavimento dalla prostata ipertrofica.", conclusione: "Ipertrofia prostatica." },
              { id: "normale", etichetta: "Nei limiti (con volume)", nuovo: true, testo: "Prostata, esplorata per via sovrapubica, di dimensioni nei limiti della norma (volume di circa ___ cc) ed ecostruttura omogenea." }
            ]
          },
          {
            id: "falde", nome: "Falde fluide",
            negativo: "Non falde fluide perirenali e nello scavo pelvico.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      /* ============================================================ COLLO */
      {
        id: "tiroide",
        nome: "Tiroide",
        gruppo: "Collo",
        titolo: { it: "ECOGRAFIA DELLA TIROIDE", en: "THYROID ULTRASOUND", es: "ECOGRAFÍA TIROIDEA" },
        lingue: ["it", "en", "es"],
        traduzioniDaVerificare: true, /* DA VERIFICARE: traduzioni EN/ES */
        /* DA VERIFICARE: tecnica nuova, non presente nell'archivio */
        tecnicaNuova: true,
        tecnica: { it: "Esame eseguito con sonda lineare ad alta frequenza, con integrazione color-Doppler.", en: "Examination performed with a high-frequency linear probe, with colour Doppler.", es: "Estudio realizado con sonda lineal de alta frecuencia, con Doppler color." },
        organi: [
          {
            id: "dimensioni", nome: "Dimensioni",
            negativo: { it: "Tiroide in sede, di dimensioni ai limiti della norma (diametro a-p del lobo destro di ___ mm; diametro a-p del lobo sinistro di ___ mm; istmo non ispessito).", en: "Thyroid in normal position, of size within normal limits (AP diameter of the right lobe ___ mm; AP diameter of the left lobe ___ mm; isthmus not thickened).", es: "Tiroides en posición normal, de tamaño dentro de los límites normales (diámetro AP del lóbulo derecho ___ mm; diámetro AP del lóbulo izquierdo ___ mm; istmo no engrosado)." },
            reperti: [
              { id: "ingrandita", etichetta: "Ingrandita", testo: { it: "Ghiandola tiroide ingrandita, con diametro AP del lobo destro di ___ mm e del lobo sinistro di ___ mm; margini della tiroide bozzuti.", en: "Enlarged thyroid gland, AP diameter of the right lobe ___ mm and of the left lobe ___ mm; lobulated thyroid margins.", es: "Glándula tiroides aumentada de tamaño, con diámetro AP del lóbulo derecho de ___ mm y del lóbulo izquierdo de ___ mm; contornos tiroideos abollonados." }, conclusione: { it: "Tiroide aumentata di volume.", en: "Enlarged thyroid.", es: "Tiroides aumentada de volumen." } },
              { id: "limiti-superiori", etichetta: "Ai limiti superiori", testo: { it: "Tiroide in sede, di dimensioni nei limiti superiori, con diametro AP del lobo destro di ___ mm e del sinistro di ___ mm, con istmo non ispessito.", en: "Thyroid in normal position, of size at the upper limits of normal, AP diameter of the right lobe ___ mm and of the left ___ mm, isthmus not thickened.", es: "Tiroides en posición normal, de tamaño en el límite superior de la normalidad, con diámetro AP del lóbulo derecho de ___ mm y del izquierdo de ___ mm, istmo no engrosado." } },
              { id: "lobo-dx", etichetta: "Ingrandimento di un lobo", riscritta: true, testo: { it: "Tiroide in sede, con ingrandimento del lobo ___ (diametro AP massimo di ___ mm) e normali spessore e dimensioni di istmo e lobo controlaterale.", en: "Thyroid in normal position, with enlargement of the ___ lobe (maximum AP diameter ___ mm) and normal thickness and size of the isthmus and contralateral lobe.", es: "Tiroides en posición normal, con aumento de tamaño del lóbulo ___ (diámetro AP máximo de ___ mm) y grosor y tamaño normales del istmo y del lóbulo contralateral." } },
              { id: "intratoracica", etichetta: "Impegno intratoracico", testo: { it: "Tiroide in sede, di dimensioni diffusamente aumentate su tutto l'ambito, solo parzialmente esplorabile per impegno intratoracico caudalmente.", en: "Thyroid in normal position, diffusely enlarged throughout, only partially assessable owing to caudal intrathoracic extension.", es: "Tiroides en posición normal, difusamente aumentada de tamaño, solo parcialmente valorable por extensión intratorácica caudal." }, conclusione: { it: "Gozzo con impegno intratoracico.", en: "Goitre with intrathoracic extension.", es: "Bocio con extensión intratorácica." } },
              { id: "ridotta", etichetta: "Ridotta", testo: { it: "Tiroide in sede, di dimensioni ridotte con diametro AP massimo di ___ mm a destra e ___ mm a sinistra.", en: "Thyroid in normal position, of reduced size, maximum AP diameter ___ mm on the right and ___ mm on the left.", es: "Tiroides en posición normal, de tamaño reducido, con diámetro AP máximo de ___ mm a la derecha y ___ mm a la izquierda." } },
              { id: "tiroidectomia", etichetta: "Esiti di tiroidectomia", testo: { it: "In esiti di tiroidectomia ___ (totale/parziale) non lesioni espansive nelle logge tiroidee.", en: "Status post ___ (total/partial) thyroidectomy; no space-occupying lesions in the thyroid beds.", es: "Tiroidectomía ___ (total/parcial) previa; sin lesiones expansivas en los lechos tiroideos." } }
            ]
          },
          {
            id: "trachea", nome: "Trachea",
            negativo: { it: "Trachea in asse.", en: "Trachea midline.", es: "Tráquea centrada." },
            reperti: [
              { id: "deviata", etichetta: "Deviata", testo: { it: "Trachea lievemente deviata verso ___.", en: "Trachea slightly deviated to the ___.", es: "Tráquea levemente desviada hacia la ___." } }
            ]
          },
          {
            id: "ecostruttura", nome: "Ecostruttura e noduli",
            riscritta: true, negativo: { it: "Ecostruttura ghiandolare omogenea, senza formazioni nodulari.", en: "Homogeneous glandular echotexture, without nodules.", es: "Ecoestructura glandular homogénea, sin formaciones nodulares." },
            reperti: [
              { id: "tiroidite", etichetta: "Tiroidite cronica", riscritta: true, testo: { it: "Ecostruttura ghiandolare disomogenea per la presenza di multiple formazioni ipoecogene confluenti, come nei quadri tiroiditici cronici.", en: "Heterogeneous glandular echotexture due to multiple confluent hypoechoic areas, as in chronic thyroiditis.", es: "Ecoestructura glandular heterogénea por múltiples formaciones hipoecoicas confluentes, como en los cuadros de tiroiditis crónica." }, conclusione: { it: "Quadro ecografico di tiroidite cronica.", en: "Ultrasound appearance of chronic thyroiditis.", es: "Cuadro ecográfico de tiroiditis crónica." } },
              { id: "tiroidite-esiti", etichetta: "Tiroidite in esiti (fibrotica)", testo: { it: "Ecostruttura sovvertita completamente e diffusamente ipoecogena e con strie iperecogene fibrotiche contestuali, come nei casi di tiroidite in esiti.\nNon franche nodularità.", en: "Completely disrupted, diffusely hypoechoic echotexture with intervening hyperechoic fibrotic strands, as in burnt-out thyroiditis.\nNo definite nodules.", es: "Ecoestructura completamente alterada, difusamente hipoecoica, con tractos hiperecoicos fibróticos, como en las tiroiditis evolucionadas.\nSin nódulos definidos." }, conclusione: { it: "Tiroidite in esiti.", en: "Burnt-out thyroiditis.", es: "Tiroiditis evolucionada." } },
              { id: "nodulo", etichetta: "Nodulo singolo", riscritta: true, testo: { it: "Nel contesto del lobo ___, nodulo ad ecostruttura ___ (iso/ipo/iperecogena), delle dimensioni massime di ___ x ___ mm, caratterizzato da vascolarizzazione ___ (perilesionale/intralesionale/mista) al color-Doppler.\nNon franche nodularità nel lobo controlaterale.", en: "In the ___ lobe, ___ (iso/hypo/hyperechoic) nodule measuring up to ___ x ___ mm, with ___ (perinodular/intranodular/mixed) vascularity on colour Doppler.\nNo definite nodules in the contralateral lobe.", es: "En el lóbulo ___, nódulo ___ (iso/hipo/hiperecoico), de dimensiones máximas de ___ x ___ mm, con vascularización ___ (perinodular/intranodular/mixta) en el Doppler color.\nSin nódulos definidos en el lóbulo contralateral." }, conclusione: { it: "Nodulo tiroideo del lobo ___.", en: "Thyroid nodule in the ___ lobe.", es: "Nódulo tiroideo en el lóbulo ___." } },
              { id: "nodulo-orletto", etichetta: "Noduli con orletto", riscritta: true, testo: { it: "Presenza di noduli isoecogeni, con orletto ipoecogeno, del diametro massimo di ___ mm.\nAll'esame color-Doppler, vascolarizzazione prevalentemente periferica di tali formazioni.", en: "Isoechoic nodules with a hypoechoic halo, maximum diameter ___ mm.\nOn colour Doppler, predominantly peripheral vascularity of these nodules.", es: "Nódulos isoecoicos con halo hipoecoico, de diámetro máximo de ___ mm.\nEn el Doppler color, vascularización predominantemente periférica de dichas formaciones." } },
              { id: "multinodulare", etichetta: "Multinodulare", riscritta: true, testo: { it: "Ecostruttura sovvertita dalla presenza di numerose formazioni nodulari di differenti dimensioni ed ecostruttura prevalentemente mista, disomogeneamente ipo-isoecogena e con aree colloidocistiche contestuali, caratterizzate da vascolarizzazione mista, prevalentemente perilesionale.\nNodulo maggiore sito al terzo ___ del lobo ___, di ___ x ___ mm.", en: "Echotexture disrupted by numerous nodules of different sizes and predominantly mixed, heterogeneously hypo-isoechoic echotexture with intervening colloid-cystic areas, with mixed, predominantly perinodular vascularity.\nLargest nodule in the ___ third of the ___ lobe, measuring ___ x ___ mm.", es: "Ecoestructura alterada por numerosos nódulos de distinto tamaño y ecoestructura predominantemente mixta, heterogéneamente hipo-isoecoica, con áreas coloidoquísticas, con vascularización mixta, predominantemente perinodular.\nNódulo mayor en el tercio ___ del lóbulo ___, de ___ x ___ mm." }, conclusione: { it: "Tiroide multinodulare.", en: "Multinodular thyroid.", es: "Tiroides multinodular." } },
              { id: "calcifico", etichetta: "Nodulo calcifico", testo: { it: "Grossolana formazione nodulare parzialmente calcifica del diametro massimo longitudinale di ___ mm, al terzo ___ di ___.", en: "Large, partially calcified nodule, maximum longitudinal diameter ___ mm, in the ___ third of the ___.", es: "Nódulo grosero parcialmente calcificado, de diámetro máximo longitudinal de ___ mm, en el tercio ___ del ___." } },
              { id: "conglomerato", etichetta: "Conglomerato pseudonodulare", riscritta: true, testo: { it: "Nel contesto del lobo ___, multiple aree pseudonodulari confluenti, a margini mal delimitabili, ad ecostruttura disomogeneamente iso-ipoecogena, costituenti un simil conglomerato di ___ x ___ mm sul piano trasversale e ___ mm sul piano longitudinale, disomogeneamente vascolarizzati.", en: "In the ___ lobe, multiple confluent pseudonodular areas with ill-defined margins and heterogeneously iso-hypoechoic echotexture, forming a conglomerate-like area of ___ x ___ mm in the transverse plane and ___ mm in the longitudinal plane, with heterogeneous vascularity.", es: "En el lóbulo ___, múltiples áreas pseudonodulares confluentes, de márgenes mal definidos y ecoestructura heterogéneamente iso-hipoecoica, que forman un pseudoconglomerado de ___ x ___ mm en el plano transversal y ___ mm en el longitudinal, con vascularización heterogénea." } },
              { id: "lobo-occupato", etichetta: "Lobo occupato da nodulo", riscritta: true, testo: { it: "Lobo ___ sostanzialmente occupato in toto da una grossolana formazione nodulare ovalare, ben circoscritta, prevalentemente isoecogena e con alcune piccole componenti anecogene liquide contestuali, delle dimensioni massime assiali di ___ x ___ mm, caratterizzata da vascolarizzazione mista.", en: "___ lobe almost entirely occupied by a large, well-circumscribed oval nodule, predominantly isoechoic with a few small anechoic fluid components, maximum axial dimensions ___ x ___ mm, with mixed vascularity.", es: "Lóbulo ___ ocupado casi en su totalidad por un nódulo ovalado grosero, bien delimitado, predominantemente isoecoico, con algunos pequeños componentes anecoicos líquidos, de dimensiones axiales máximas de ___ x ___ mm, con vascularización mixta." } }
            ]
          },
          {
            id: "vascolarizzazione", nome: "Vascolarizzazione",
            riscritta: true, negativo: { it: "Vascolarizzazione ghiandolare non aumentata.", en: "Glandular vascularity not increased.", es: "Vascularización glandular no aumentada." },
            reperti: [
              { id: "aumentata", etichetta: "Aumentata", nuovo: true, riscritta: true, testo: { it: "Vascolarizzazione ghiandolare diffusamente aumentata all'integrazione con color-Doppler.", en: "Diffusely increased glandular vascularity on colour Doppler.", es: "Vascularización glandular difusamente aumentada en el Doppler color." } }
            ]
          },
          {
            id: "linfonodi", nome: "Linfonodi laterocervicali",
            riscritta: true, negativo: { it: "Assenti linfoadenopatie in sede laterocervicale bilaterale.", en: "No lymphadenopathy in either lateral cervical region.", es: "Sin adenopatías laterocervicales bilaterales." },
            reperti: [
              { id: "reattivi", etichetta: "Linfonodi reattivi", riscritta: true, testo: { it: "In sede latero-cervicale bilaterale, alcuni linfonodi di tipo reattivo, il maggiore a ___ del diametro massimo di ___ mm.", en: "A few reactive-type lymph nodes in both lateral cervical regions, the largest on the ___, maximum diameter ___ mm.", es: "En región laterocervical bilateral, algunos ganglios de aspecto reactivo, el mayor en el lado ___, de diámetro máximo de ___ mm." } }
            ]
          },
          {
            id: "sottomandibolari", nome: "Ghiandole sottomandibolari",
            negativo: { it: "Regolare ecostruttura delle ghiandole sottomandibolari.", en: "Normal echotexture of the submandibular glands.", es: "Ecoestructura normal de las glándulas submandibulares." },
            reperti: [
              { id: "nodulo", etichetta: "Nodulo sottomandibolare", riscritta: true, testo: { it: "In corrispondenza della ghiandola sottomandibolare ___, formazione nodulare ipoecogena a margini netti di ___ x ___ mm, priva di segnali vascolari intralesionali, meritevole di ulteriore approfondimento diagnostico mediante agobiopsia.", en: "In the ___ submandibular gland, well-defined hypoechoic nodule of ___ x ___ mm, without intralesional vascular signals, warranting further assessment with needle biopsy.", es: "En la glándula submandibular ___, nódulo hipoecoico de márgenes nítidos de ___ x ___ mm, sin señal vascular intralesional, que requiere completar el estudio mediante biopsia con aguja." }, conclusione: { it: "Nodulo della ghiandola sottomandibolare ___ meritevole di approfondimento.", en: "Nodule of the ___ submandibular gland requiring further assessment.", es: "Nódulo de la glándula submandibular ___ que requiere estudio adicional." } }
            ]
          },
          {
            id: "consigli", nome: "Consigli", negativo: "",
            reperti: [
              { id: "laboratorio", etichetta: "Esami e valutazione specialistica", testo: { it: "Utile integrazione con esami laboratoristici e valutazione clinico-specialistica.", en: "Correlation with laboratory tests and clinical-specialist assessment advised.", es: "Aconsejable completar con pruebas de laboratorio y valoración clínica especializada." } },
              { id: "endocrinologica", etichetta: "Valutazione endocrinologica", testo: { it: "Utile valutazione specialistica endocrinologica.", en: "Endocrinology assessment advised.", es: "Aconsejable valoración endocrinológica." } }
            ]
          }
        ],
        conclusioneNegativa: { it: "Ecografia della tiroide nei limiti della norma.", en: "Normal thyroid ultrasound.", es: "Ecografía tiroidea dentro de la normalidad." }
      },

      {
        id: "linfonodi",
        nome: "Linfonodi",
        gruppo: "Collo",
        titolo: "ECOGRAFIA DELLE STAZIONI LINFONODALI",
        organi: [
          {
            id: "premessa", nome: "Motivo dell'esame", negativo: "",
            reperti: [
              { id: "follow-up", etichetta: "Follow-up oncologico", testo: "Esame mirato alla valutazione dei linfonodi ___ come da richiesta d'invio per follow-up di ___." },
              { id: "linfoadenectomia", etichetta: "Esiti di linfoadenectomia", riscritta: true, testo: "In esiti di linfoadenectomia ___, non linfonodi ingranditi o con caratteristiche sospette nelle sedi esaminate." }
            ]
          },
          {
            id: "stazioni", nome: "Stazioni linfonodali",
            negativo: "Indagate le regioni laterocervicali, sovraclaveari ed ascellari bilateralmente: non linfonodi patologicamente ingranditi o con franche caratteristiche di sovvertimento strutturale.",
            reperti: [
              { id: "reattivi", etichetta: "Reattivi", riscritta: true, testo: "In queste sedi, alcuni linfonodi ovalari, ipoecogeni, con ilo ben rappresentato e vascolarizzazione unipolare, tra i quali il maggiore localizzato in sede ___, delle dimensioni di ___ x ___ mm, tutti di aspetto ecografico reattivo-benigno." },
              { id: "reattivi-ingranditi", etichetta: "Reattivi lievemente ingranditi", riscritta: true, testo: "In sede laterocervicale non linfonodi con caratteristiche di sovvertimento strutturale sospette per secondarietà.\nIn queste sedi, alcuni linfonodi ipoecogeni, ovalari, con ilo ben rappresentato e vascolarizzazione unipolare, disposti in sede perigiugulare d'ambo i lati, i maggiori in sede ___, di aspetto reattivo-benigno, lievemente ingranditi con dimensioni massime di ___ x ___ mm.\nIndicato follow-up clinico-strumentale." },
              { id: "aumentati", etichetta: "Dimensioni nettamente aumentate", riscritta: true, testo: "In sede ___, alcuni linfonodi di dimensioni nettamente aumentate, a morfologia ovalare e con ilo adiposo apparentemente riconoscibile, delle dimensioni massime di circa ___ mm.\nReperti descritti meritevoli, in considerazione dell'anamnesi, di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza.", conclusione: "Linfonodi ___ di dimensioni aumentate meritevoli di valutazione specialistica." },
              { id: "inguinali", etichetta: "Inguinali con ilo adiposo", modo: "aggiunge", riscritta: true, testo: "In sede inguinale bilaterale, alcuni linfonodi ovalari, con ilo adiposo visibile, delle dimensioni massime di circa ___ mm." }
            ]
          },
          {
            id: "salivari", nome: "Ghiandole salivari",
            negativo: "Ghiandole salivari maggiori sottomandibolari e parotidi regolari per dimensioni ed aspetto US.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non linfoadenopatie nelle stazioni esaminate."
      },

      /* ============================================================ MUSCOLO-SCHELETRICO */
      {
        id: "spalla",
        nome: "Spalla",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DELLA SPALLA",
        lati: ["destra", "sinistra"],
        riscritta: true, intro: "Esame mirato alla spalla {lato}, sede della sintomatologia riferita.",
        introBilaterale: "Esame di entrambe le spalle.",
        organi: [
          {
            id: "acromion-claveare", nome: "Articolazione acromion-claveare",
            riscritta: true, negativo: "Articolazione acromion-claveare a morfologia conservata.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi", riscritta: true, testo: "Articolazione acromion-claveare lievemente irregolare, con modesto assottigliamento della rima articolare e piccoli rilievi osteofitosici marginali." },
              { id: "fibroartrosi", etichetta: "Iniziale fibro-artrosi", testo: "Iniziali segni di fibro-artrosi acromion-claveare." }
            ]
          },
          {
            id: "cuffia", nome: "Cuffia dei rotatori",
            riscritta: true, negativo: "Tendini della cuffia dei rotatori (sovraspinato, sottospinato, sottoscapolare) regolari per spessore, margini ed ecostruttura fibrillare, senza evidenza di lesioni focali, discontinuità, calcificazioni o segni di tendinopatia; buon trofismo dei muscoli sovraspinato e infraspinato.",
            reperti: [
              { id: "tendinosi-lieve", etichetta: "Tendinosi lieve sovraspinato", riscritta: true, testo: "Tendine sovraspinato di aspetto lievemente ipoecogeno, in quadro compatibile con tendinosi.\nNon alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete.", conclusione: "Tendinosi del sovraspinato." },
              { id: "tendinopatia-cronica", etichetta: "Tendinopatia cronica", riscritta: true, testo: "Tendini della cuffia dei rotatori, in particolare il sovraspinato, con perdita della regolare struttura fibrillare ed aspetto ipoecogeno disomogeneo, senza segni di avulsione: reperto compatibile con tendinopatia cronica.", conclusione: "Tendinopatia cronica della cuffia dei rotatori." },
              { id: "tendinosi-calcificazioni", etichetta: "Tendinosi con calcificazioni", riscritta: true, testo: "Tendine del sovraspinato marcatamente ispessito e disomogeneo, in particolare in sede inserzionale e pre-inserzionale, come per tendinosi; nel suo contesto, alcuni millimetrici spot iperecogeni da riferire a piccole calcificazioni.", conclusione: "Tendinosi calcifica del sovraspinato." },
              { id: "tendinosi-calcifica", etichetta: "Tendinosi calcifica (sovraspinato + sottoscapolare)", riscritta: true, testo: "Modeste alterazioni tendinosiche a carico del tendine sovraspinato, ispessito e disomogeneo, con alcune minute calcificazioni in sede preinserzionale; analoghi reperti, di minore entità, in corrispondenza del tendine sottoscapolare.\nRegolare ecostruttura fibrillare del tendine sottospinato.", conclusione: "Tendinosi calcifica del sovraspinato e del sottoscapolare." },
              { id: "calcificazioni", etichetta: "Calcificazioni inserzionali", riscritta: true, testo: "Tendini della cuffia dei rotatori di regolare aspetto fibrillare, senza evidenti lesioni.\nMillimetriche calcificazioni all'inserzione del tendine ___." },
              { id: "entesopatia-sottoscapolare", etichetta: "Entesopatia calcifica sottoscapolare", riscritta: true, testo: "Non evidenza di rotture tendinee, complete o parziali.\nTendine sottoscapolare disomogeneo, con alcune calcificazioni inserzionali lineari (la maggiore di ___ mm), come da entesopatia inserzionale calcifica.\nAssenti alterazioni ecotomografiche a carico del sovraspinato e sottospinato.", conclusione: "Entesopatia inserzionale calcifica del sottoscapolare." },
              { id: "fissurazione-capsulare", etichetta: "Fissurazione versante capsulare", riscritta: true, testo: "Tendine sovraspinato con difetto della struttura fibrillare lungo il versante capsulare, di circa ___ mm, compatibile con fissurazione.", conclusione: "Fissurazione del tendine sovraspinato." },
              { id: "fissurazione-spessore", etichetta: "Fissurazione a tutto spessore", riscritta: true, testo: "Tendine sovraspinato ispessito, con fissurazione lineare a tutto spessore della porzione anteriore e associata falda fluida intrarticolare.\nNon ulteriori alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete.", conclusione: "Fissurazione a tutto spessore del sovraspinato." },
              { id: "rottura-parziale", etichetta: "Rottura parziale sovraspinato", riscritta: true, testo: "Modeste alterazioni tendinosiche del sovraspinato, con rottura non completa del fascio anteriore, interessante il tendine a tutto spessore.", conclusione: "Rottura parziale del tendine sovraspinato." },
              { id: "rottura-totale", etichetta: "Rottura totale cuffia", testo: "Rottura totale con retrazione mio-tendinea del tendine sovraspinato, sottoscapolare ed in minor misura del tendine infraspinato.", conclusione: "Rottura totale della cuffia dei rotatori." },
              { id: "rottura-sottoscapolare", etichetta: "Rottura sottoscapolare", riscritta: true, testo: "Rottura pressoché completa del tendine del sottoscapolare.\nTendine del sovraspinato marcatamente ipoecogeno ed ispessito, in quadro di tendinosi, senza franche lesioni di continuità; concomitanti microcalcificazioni in sede inserzionale.\nAlterazioni tendinosiche anche a carico del tendine del sottospinato.", conclusione: "Rottura del tendine sottoscapolare." }
            ]
          },
          {
            id: "clb", nome: "Capo lungo del bicipite",
            riscritta: true, negativo: "Tendine del capo lungo del bicipite brachiale in sede, ben contenuto nella doccia bicipitale, con guaina peritendinea priva di distensione fluida.",
            reperti: [
              { id: "tenosinovite", etichetta: "Falda peritendinea (tenosinovite)", testo: "CLB in sede, in presenza di minima falda fluida peritendinea come per quadro di tenosinovite.", conclusione: "Tenosinovite del capo lungo del bicipite." },
              { id: "slaminamento", etichetta: "Slaminamento", testo: "CLB in sede, ispessito e ad ecostruttura finemente disomogenea con slaminamento fibrillare, in presenza di distensione fluida della guaina propria come per tenosinovite.", conclusione: "Tendinopatia con slaminamento del capo lungo del bicipite." },
              { id: "lussazione", etichetta: "Lussazione mediale", testo: "Lussazione mediale del tendine del capo lungo del bicipite omerale, ispessito come da tendinosi, con modesta falda fluida peritendinea.", conclusione: "Lussazione mediale del capo lungo del bicipite." }
            ]
          },
          {
            id: "borsa", nome: "Borsa subacromion-deltoidea",
            riscritta: true, negativo: "Borsa subacromion-deltoidea a pareti regolari, non significativamente distesa da fluido.",
            reperti: [
              { id: "minima", etichetta: "Minima distensione", testo: "Minima sovradistensione fluida della borsa subacromion-deltoidea." },
              { id: "conflitto", etichetta: "Ispessita (conflitto)", riscritta: true, testo: "Borsa subacromion-deltoidea lievemente ispessita e ipoecogena, come frequentemente riscontrabile nei quadri di sindrome da conflitto subacromiale.", conclusione: "Borsite subacromion-deltoidea." }
            ]
          },
          {
            id: "versamento", nome: "Versamento e articolazione",
            riscritta: true, negativo: "Non versamento nei recessi articolari esplorabili.",
            reperti: [
              { id: "artrosi-gleno", etichetta: "Artrosi scapolo-omerale", modo: "aggiunge", testo: "Diffuso quadro di artrosi scapolo-omerale." },
              { id: "epifisi", etichetta: "Alterazioni epifisi omerale", modo: "aggiunge", riscritta: true, testo: "Diffuse alterazioni degenerative a carico dell'epifisi prossimale omerale." },
              { id: "versamento", etichetta: "Versamento articolare", nuovo: true, riscritta: true, testo: "Falda di versamento nei recessi articolari esplorabili." }
            ]
          },
          {
            id: "dinamica", nome: "Valutazione dinamica",
            riscritta: true, negativo: "Assenti segni dinamici di impingement subacromiale.",
            reperti: [
              { id: "impingement", etichetta: "Impingement", nuovo: true, riscritta: true, testo: "Alle manovre dinamiche, segni di conflitto subacromiale.", conclusione: "Segni dinamici di impingement subacromiale." }
            ]
          },
          {
            id: "sintesi", nome: "Sintesi (solo se negativo)", soloSeNegativo: true,
            negativo: "In sintesi, quadro ecografico nei limiti della norma.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "gomito",
        nome: "Gomito",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DEL GOMITO",
        lati: ["destro", "sinistro"],
        intro: "Esame mirato alla valutazione del gomito {lato}, sede della sintomatologia riferita.",
        organi: [
          {
            id: "tendini", nome: "Tendini",
            negativo: "Regolari reperti ecografici a livello dei tendini comuni estensori e flessori delle dita e del tendine tricipite.",
            reperti: [
              { id: "epicondilite", etichetta: "Epicondilite", riscritta: true, testo: "Ecostruttura finemente disomogenea in sede pre-inserzionale del tendine comune degli estensori rispetto al controlato; all'integrazione con color-Doppler, alcuni spot vascolari nel contesto: reperti compatibili in prima ipotesi con quadro di epicondilite.\nRegolari reperti ecografici a carico del tendine comune dei flessori e del tendine tricipitale.", conclusione: "Quadro compatibile con epicondilite." },
              { id: "epitrocleite", etichetta: "Epitrocleite", nuovo: true, riscritta: true, testo: "Ecostruttura finemente disomogenea ed ispessimento in sede pre-inserzionale del tendine comune dei flessori rispetto al controlato, compatibili in prima ipotesi con quadro di epitrocleite.\nRegolari reperti ecografici a carico del tendine comune degli estensori e del tendine tricipitale.", conclusione: "Quadro compatibile con epitrocleite." },
              { id: "calcificazione", etichetta: "Calcificazione inserzionale", riscritta: true, testo: "Nella norma l'aspetto del tendine comune dei flessori, con millimetrica calcificazione (___ mm) all'inserzione.\nRegolare il tendine comune degli estensori.\nNella norma l'aspetto del tendine tricipite all'inserzione olecranica, con riscontro di calcificazione inserzionale." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non versamento liquido intra-articolare.",
            reperti: [
              { id: "versamento", etichetta: "Versamento corpuscolato", riscritta: true, testo: "Raccolta fluida corpuscolata nel contesto della capsula articolare del gomito, senza evidenti segnali vascolari all'integrazione con box colore, da versamento intrarticolare.\nReperto meritevole di integrazione con esami ematochimici ed eventuale RX per la valutazione dei capi ossei affrontati.", conclusione: "Versamento articolare." }
            ]
          },
          {
            id: "borsa-olecranica", nome: "Borsa olecranica",
            riscritta: true, negativo: "Borsa olecranica non distesa.",
            reperti: [
              { id: "borsite", etichetta: "Borsite olecranica", nuovo: true, testo: "Distensione fluida della borsa olecranica, delle dimensioni di ___ x ___ mm, come da borsite.", conclusione: "Borsite olecranica." }
            ]
          },
          {
            id: "borsa-bicipito", nome: "Borsa bicipito-radiale",
            negativo: "Non distensione della borsa bicipito-radiale.",
            reperti: []
          },
          {
            id: "ulnare", nome: "Nervo ulnare",
            negativo: "Regolare il calibro del nervo ulnare al passaggio nel canale cubitale.",
            reperti: [
              { id: "impingement", etichetta: "Impingement ulnare", riscritta: true, testo: "Marcato ispessimento (___ mm) ipoecogeno, con perdita della normale fascicolazione, del nervo ulnare a livello della doccia ossea, in quadro di impingement; reperti da correlare con esame elettromiografico.\nNon segni di sublussazione del nervo durante le manovre dinamiche né formazioni cistiche-ossee nel canale ulnare.", conclusione: "Quadro compatibile con sofferenza del nervo ulnare al canale cubitale." }
            ]
          },
          {
            id: "tessuti", nome: "Tessuti molli", negativo: "",
            reperti: [
              { id: "tumefazione", etichetta: "Imbibizione con raccolta", riscritta: true, testo: "Ispessimento ed imbibizione dei tessuti molli sottocutanei in sede sovrafasciale, dello spessore massimo di circa ___ mm, nel cui contesto raccolta fluida con alcuni tralci iperecogeni, a margini lievemente irregolari delle dimensioni massime di ___ x ___ mm, priva di segnali vascolari al color-Doppler." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "polso-mano",
        nome: "Polso e mano",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DEL POLSO E DELLA MANO",
        lati: ["destro", "sinistro"],
        riscritta: true, intro: "Esame mirato alla valutazione del polso (e della mano) {lato}, sede della sintomatologia riferita.",
        organi: [
          {
            id: "tunnel", nome: "Tunnel carpale e nervi",
            riscritta: true, negativo: "Strutture del tunnel carpale regolarmente rappresentate, senza falde fluide all'interno o a monte dello stesso.\nRegolare diametro, ecogenicità e aspetto fibrillare dei nervi mediano e ulnare.",
            reperti: [
              { id: "tunnel-carpale", etichetta: "Sindrome del tunnel carpale", nuovo: true, riscritta: true, testo: "Nervo mediano ispessito ed ipoecogeno all'ingresso del canale carpale, con area di sezione trasversa di ___ mm², come nei quadri di sindrome del tunnel carpale; utile correlazione con esame elettromiografico.", conclusione: "Quadro compatibile con sindrome del tunnel carpale." }
            ]
          },
          {
            id: "tendini", nome: "Tendini flessori ed estensori",
            negativo: "Regolare spessore ed aspetto fibrillare dei tendini flessori ed estensori.",
            reperti: [
              { id: "de-quervain", etichetta: "Tenosinovite di de Quervain", riscritta: true, testo: "Aspetto lievemente disomogeneo dei tendini abduttore lungo ed estensore breve del pollice, associato a minimo ispessimento del retinacolo, dello spessore massimo di circa ___ mm come da iniziale tenosinovite di de Quervain; utile valutazione specialistica.", conclusione: "Tenosinovite di de Quervain." },
              { id: "sclerosante", etichetta: "de Quervain sclerosante", riscritta: true, testo: "Ispessimento del retinacolo degli estensori del I compartimento, senza falde fluide peritendinee, come da tenosinovite sclerosante.", conclusione: "Tenosinovite stenosante di de Quervain." },
              { id: "de-quervain-negativo", etichetta: "de Quervain negativo (I dito)", riscritta: true, testo: "Regolare l'aspetto ecografico dei tendini estensore breve ed abduttore lungo del pollice, senza fluido nelle relative guaine." },
              { id: "ii-compartimento", etichetta: "Falda II compartimento", riscritta: true, testo: "Lieve distensione fluida della guaina dei tendini estensore radiale breve e lungo del carpo e, minima, dell'estensore breve del pollice.\nRegolari per ecostruttura i tendini del comparto degli estensori e flessori del polso.", conclusione: "Tenosinovite del II compartimento degli estensori." },
              { id: "frc", etichetta: "Fluido guaina flessore radiale carpo", riscritta: true, testo: "Distensione fluida della guaina del tendine flessore radiale del carpo, tendine continuo.\nRegolare spessore ed aspetto fibrillare dei tendini estensori." },
              { id: "dito-scatto", etichetta: "Dito a scatto", nuovo: true, riscritta: true, testo: "Ispessimento ipoecogeno della puleggia A1 del ___ dito, con tendine flessore lievemente ispessito e scorrimento a scatto alle manovre dinamiche.", conclusione: "Quadro compatibile con dito a scatto." }
            ]
          },
          {
            id: "cisti", nome: "Cisti", negativo: "",
            reperti: [
              { id: "articolare", etichetta: "Cisti articolare", riscritta: true, testo: "Sul versante ___ del polso, in continuità con l'articolazione, formazione anecogena, corpuscolata, del diametro massimo di ___ x ___ mm, compatibile con cisti articolare.", conclusione: "Cisti articolare del polso." },
              { id: "tendinea", etichetta: "Cisti tendinea", riscritta: true, testo: "Formazione anecogena a contenuto in parte corpuscolato, avvolgente la porzione più superficiale del tendine ___, delle dimensioni massime di circa ___ x ___ mm, a circa ___ mm di profondità dal piano cutaneo. Formazione priva di segnali vascolari al color-Doppler, compatibile con cisti tendinea.", conclusione: "Cisti tendinea." },
              { id: "palmare", etichetta: "Cisti palmare mano", riscritta: true, testo: "A livello della regione palmare della mano, in corrispondenza della tumefazione obiettivabile, formazione ipo-anecogena di aspetto cistico con morfologia ovalare delle dimensioni di ___ x ___ mm con piano di clivaggio rispetto al sottostante tendine flessore del ___ raggio." }
            ]
          },
          {
            id: "articolazioni", nome: "Articolazioni",
            negativo: "Non evidenti falde fluide intrarticolari.",
            reperti: [
              { id: "rizoartrosi", etichetta: "Rizoartrosi", riscritta: true, testo: "Microcalcificazioni a livello dell'articolazione trapezio-metacarpale, come per fenomeni degenerativi.\nNon distensione fluida intrarticolare trapezio-metacarpale né metacarpo-falangea, né accentuata vascolarizzazione della capsula all'integrazione color-Doppler.", conclusione: "Rizoartrosi." },
              { id: "rizoartrosi-dubbia", etichetta: "Dubbia rizoartrosi (utile RX)", testo: "Dubbia irregolarità corticale all'interfaccia ossea trapezio-metacarpale che, compatibilmente con la metodica non dedicata, potrebbe essere attribuibile a fenomeni degenerativi rizoartrosici; utile integrazione con esame RX." },
              { id: "artrosi-carpo", etichetta: "Artrosi del carpo", testo: "Diffuse irregolarità dei profili corticali delle ossa del carpo ed in sede carpo-metacarpale, con distensione fluida articolare, in prima ipotesi di natura artrosico-degenerativa.", conclusione: "Fenomeni artrosico-degenerativi del carpo." }
            ]
          },
          {
            id: "dita", nome: "Dita e tessuti molli", negativo: "",
            reperti: [
              { id: "corpo-estraneo", etichetta: "Corpo estraneo", riscritta: true, testo: "A livello del terzo ___, formazione lineare delle dimensioni di ___ x ___ mm compatibile con corpo estraneo, circondata da un alone di ipoecogenicità verosimilmente attribuibile a tessuto di granulazione.", conclusione: "Corpo estraneo nei tessuti molli." },
              { id: "imbibizione", etichetta: "Imbibizione edematosa", riscritta: true, testo: "In tale sede, unicamente imbibizione edematosa dei tessuti molli.\nIntegro l'aspetto del tendine estensore del dito." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "anca",
        nome: "Anca",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DELLE ANCHE",
        riscritta: true, intro: "Esame delle regioni pertrocanteriche da ambo i lati.",
        organi: [
          {
            id: "borse", nome: "Borse trocanteriche",
            riscritta: true, negativo: "Non distensioni fluide delle borse trocanteriche.",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia trocanterica", modo: "aggiunge", riscritta: true, testo: "Fenomeni di entesopatia a livello di ___ (entrambi i grandi trocanteri)." },
              { id: "borsite", etichetta: "Borsite trocanterica", nuovo: true, testo: "Distensione fluida della borsa trocanterica ___, dello spessore di ___ mm, come da borsite.", conclusione: "Borsite trocanterica." }
            ]
          },
          {
            id: "coxofemorale", nome: "Articolazione coxo-femorale",
            riscritta: true, negativo: "Assenti falde di versamento coxo-femorale bilateralmente.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi", modo: "aggiunge", riscritta: true, testo: "Lieve irregolarità del profilo corticale osseo della testa femorale, come per fenomeni degenerativo-artrosici di grado modesto." },
              { id: "versamento", etichetta: "Versamento", nuovo: true, testo: "Falda di versamento coxo-femorale ___ dello spessore di ___ mm.", conclusione: "Versamento coxo-femorale." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "anca-neonatale",
        nome: "Anca neonatale",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DELLE ANCHE NEONATALI",
        organi: [
          {
            id: "graf", nome: "Studio secondo Graf",
            riscritta: true, negativo: "Proiezioni coronali standard secondo Graf: entrambe le anche in asse, con tetto acetabolare osseo ben conformato e normale copertura della testa femorale. A sinistra angolo α di circa ___° e angolo β di ___°, a destra angolo α di ___° e angolo β di ___°. Valori nei parametri di un'anca di tipo I secondo Graf, compatibile con sviluppo articolare maturo.",
            reperti: [
              { id: "immatura", etichetta: "Anca non matura", nuovo: true, riscritta: true, testo: "Proiezioni coronali standard secondo Graf. A destra angolo α di circa ___° e angolo β di ___°; a sinistra angolo α di ___° e angolo β di ___°.\nAnca ___ di tipo ___ secondo Graf; utile controllo ecografico a distanza di ___ settimane e valutazione specialistica ortopedica.", conclusione: "Anca ___ di tipo ___ secondo Graf." }
            ]
          }
        ],
        conclusioneNegativa: "Anche di tipo I secondo Graf bilateralmente."
      },

      {
        id: "coscia-gamba",
        nome: "Coscia e gamba (muscoli)",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA MUSCOLARE",
        lati: ["destra", "sinistra"],
        riscritta: true, intro: "Esame mirato alla regione ___ della ___ (coscia/gamba) {lato}, sede della sintomatologia riferita, anche in comparativa con il controlato.",
        organi: [
          {
            id: "muscoli", nome: "Strutture miotendinee",
            negativo: "Regolare spessore ed aspetto fibrillare delle strutture miotendinee esaminate, in assenza di alterazioni ecostrutturali sospette per la natura post-traumatica.",
            reperti: [
              { id: "lesione", etichetta: "Lesione muscolare", riscritta: true, testo: "A livello del muscolo ___, alterazione ecostrutturale con area ___ (ipoecogena/anecogena/disomogenea) delle dimensioni di ___ x ___ mm, compatibile con lesione muscolare.", conclusione: "Lesione del muscolo ___." },
              { id: "retto-femorale", etichetta: "Retto femorale negativo (dettaglio)", riscritta: true, testo: "Regolare la struttura del ventre muscolare del retto femorale, senza immagini compatibili con rottura.\nNella norma l'inserzione prossimale del retto femorale sulla spina iliaca." },
              { id: "flessori", etichetta: "Flessori della coscia negativo (dettaglio)", riscritta: true, testo: "Non alterazioni strutturali dei ventri dei muscoli flessori della coscia né delle giunzioni miotendinee.\nConservata la struttura fibrillare dei relativi tendini." }
            ]
          },
          {
            id: "falde", nome: "Falde fluide",
            riscritta: true, negativo: "Assenti falde fluide perimuscolari.",
            reperti: [
              { id: "ematoma", etichetta: "Ematoma", nuovo: true, riscritta: true, testo: "Raccolta fluida disomogenea di ___ x ___ mm in sede ___, compatibile con ematoma." }
            ]
          },
          {
            id: "sottocute", nome: "Tessuto sottocutaneo",
            negativo: "Non formazioni solide o liquide a livello del tessuto sottocutaneo.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "ginocchio",
        nome: "Ginocchio",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DEL GINOCCHIO",
        lati: ["destro", "sinistro"],
        intro: "Esame mirato alla valutazione del ginocchio {lato}.",
        introBilaterale: "Esame mirato alla valutazione delle ginocchia bilateralmente.",
        organi: [
          {
            id: "tendini", nome: "Tendini e legamenti collaterali",
            riscritta: true, negativo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, del tendine rotuleo e dei legamenti collaterali mediale (LCM) e laterale (LCL).",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia calcifica quadricipitale", riscritta: true, testo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, quest'ultimo con segni di entesopatia calcifica al polo rotuleo superiore.\nRegolari il tendine rotuleo e i legamenti collaterali.", conclusione: "Entesopatia calcifica quadricipitale." },
              { id: "lcm", etichetta: "LCM ispessito", testo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale e del tendine rotuleo.\nContinuo ed in sede il LCM, con aspetto lievemente ispessito e disomogeneo a livello della sua porzione inserzionale e pre-inserzionale prossimale; regolare il LCL.", conclusione: "Ispessimento del legamento collaterale mediale." },
              { id: "rotuleo", etichetta: "Tendinopatia rotulea", nuovo: true, riscritta: true, testo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale.\nTendine rotuleo ispessito e disomogeneamente ipoecogeno in sede prossimale, come per tendinopatia.\nRegolari i legamenti collaterali.", conclusione: "Tendinopatia rotulea." }
            ]
          },
          {
            id: "menischi", nome: "Menischi",
            riscritta: true, negativo: "Fibro-cartilagini meniscali non estruse.",
            reperti: [
              { id: "laterale", etichetta: "Menisco protruso", riscritta: true, testo: "Aspetto disomogeneo e protruso esternamente della porzione esplorabile del menisco ___; utile a giudizio clinico approfondimento diagnostico con esame RM." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non significativo versamento articolare.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi con falda sottoquadricipitale", riscritta: true, testo: "Segni di degenerazione artrosica, con sottile falda fluida nel recesso sottoquadricipitale.", conclusione: "Segni di gonartrosi." },
              { id: "infrapatellare", etichetta: "Borsa infrapatellare", testo: "Borsa infrapatellare minimamente distesa da falda parafisiologica." },
              { id: "versamento", etichetta: "Versamento significativo", nuovo: true, riscritta: true, testo: "Versamento articolare nel recesso sottoquadricipitale, dello spessore di ___ mm.", conclusione: "Versamento articolare." }
            ]
          },
          {
            id: "popliteo", nome: "Cavo popliteo",
            negativo: "Non espansi nel cavo popliteo.",
            reperti: [
              { id: "baker", etichetta: "Cisti di Baker", riscritta: true, testo: "Distensione fluida della borsa gastrocnemio-semimembranosa con contenuto ___ (finemente corpuscolato) (cisti di Baker) delle dimensioni massime di ___ x ___ mm.", conclusione: "Cisti di Baker." },
              { id: "baker-spot", etichetta: "Cisti di Baker con spot vascolari", riscritta: true, testo: "Confermata la distensione fluida della borsa del gastrocnemio-semimembranoso delle dimensioni massime di circa ___ x ___ mm, a contenuto fluido-corpuscolato, caratterizzato da alcuni spot vascolari nel contesto (sinoviali?).", conclusione: "Cisti di Baker." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      {
        id: "caviglia-piede",
        nome: "Caviglia e piede",
        gruppo: "Muscolo-scheletrico",
        titolo: "ECOGRAFIA DELLA CAVIGLIA",
        lati: ["destra", "sinistra"],
        intro: "Esame mirato alla valutazione della caviglia {lato}, sede della sintomatologia riferita.",
        organi: [
          {
            id: "peronei", nome: "Tendini peronei",
            negativo: "Regolare ecostruttura fibrillare dei tendini peronei lungo e breve.",
            reperti: [
              { id: "falda", etichetta: "Falda peritendinea", riscritta: true, testo: "Regolare ecostruttura fibrillare dei tendini peronei lungo e breve, con sottile falda fluida peritendinea." }
            ]
          },
          {
            id: "legamenti-tibiali", nome: "Legamento PAA e tendini tibiali",
            riscritta: true, negativo: "Legamento peroneo-astragalico anteriore e tendini tibiale anteriore e posteriore nella norma.",
            reperti: [
              { id: "paa", etichetta: "Lesione legamento PAA", nuovo: true, riscritta: true, testo: "Legamento peroneo-astragalico anteriore ispessito e disomogeneamente ipoecogeno, con perdita della regolare struttura fibrillare, come per lesione ___ (parziale/completa).\nRegolari i tendini tibiale anteriore e posteriore.", conclusione: "Lesione del legamento peroneo-astragalico anteriore." },
              { id: "tibiale-posteriore", etichetta: "Fissurazione tibiale posteriore", riscritta: true, testo: "Regolare il legamento peroneo-astragalico anteriore e il tendine tibiale anteriore.\nTendine tibiale posteriore disomogeneo ed ispessito in sede sottomalleolare, compatibile con fissurazione, associato alla presenza di una falda ipoecogena nella guaina propria, estesa posteriormente in sede retro-malleolare, compatibile con falda di ematoma.", conclusione: "Fissurazione del tendine tibiale posteriore." }
            ]
          },
          {
            id: "achille", nome: "Tendine d'Achille",
            negativo: "Regolare il tendine d'Achille.",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia achillea", riscritta: true, testo: "Nel tendine d'Achille, a livello preinserzionale calcaneare, tenui calcificazioni in quadro di entesopatia, senza segni di rottura.\nNon falde fluide peritendinee.", conclusione: "Entesopatia achillea." },
              { id: "tendinopatia", etichetta: "Tendinopatia con entesopatia calcifica", riscritta: true, testo: "Ispessimento fusiforme del tendine d'Achille, dello spessore massimo di circa ___ mm (vs. ___ mm del controlato), di aspetto disomogeneamente ipoecogeno come nei casi di tendinopatia; regione inserzionale mal valutabile per la presenza di grossolane immagini calcifiche del diametro massimo complessivo di circa ___ mm.\nReperto compatibile con entesopatia calcaneale calcifica; consigliata integrazione con esame RX.", conclusione: "Tendinopatia achillea con entesopatia calcaneale calcifica." }
            ]
          },
          {
            id: "retrocalcaneare", nome: "Borsa retrocalcaneare", negativo: "",
            reperti: [
              { id: "falda", etichetta: "Minima falda", riscritta: true, testo: "Minima falda fluida nella borsa retrocalcaneare." }
            ]
          },
          {
            id: "fascia", nome: "Fascia plantare",
            negativo: "Conservato lo spessore dell'aponeurosi plantare superficiale all'inserzione calcaneare.",
            reperti: [
              { id: "entesopatia", etichetta: "Iniziale entesopatia calcifica", testo: "Conservato lo spessore dell'aponeurosi plantare superficiale all'inserzione calcaneare in presenza di iniziali segni di entesopatia calcifica inserzionale." },
              { id: "ispessita", etichetta: "Fascia ispessita (sperone)", riscritta: true, testo: "In quadro di entesopatia calcifica retro- e sottocalcaneare, fascia plantare lievemente ispessita, senza segni di rottura.", conclusione: "Ispessimento della fascia plantare con entesopatia calcifica (sperone calcaneare)." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non falde fluide visualizzabili nel recesso tibio-peroneo-astragalico anteriore.",
            reperti: [
              { id: "trauma", etichetta: "Sospetta frattura (trauma)", riscritta: true, testo: "Nella sede della tumefazione clinicamente obiettivabile pare apprezzarsi interruzione della corticale ossea del malleolo peroneale in presenza di versamento intra-articolare.\nReperto meritevole di valutazione con esame radiografico mirato ed eventuale completamento con esame RM.", conclusione: "Sospetta interruzione corticale del malleolo peroneale: utile RX." }
            ]
          },
          {
            id: "piede", nome: "Piede", negativo: "",
            reperti: [
              { id: "artrosi-edema", etichetta: "Artrosi ed edema", testo: "Regolari reperti a livello delle strutture tendinee estensorie del piede con segni di artrosi tarso-metatarsale e metatarso-falangea.\nAbbondante edema del pannicolo adiposo sottocutaneo." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      /* ============================================================ TESSUTI MOLLI E PARETE */
      {
        id: "tessuti-molli",
        nome: "Tessuti molli (tumefazione)",
        gruppo: "Tessuti molli e parete",
        titolo: "ECOGRAFIA DEI TESSUTI MOLLI",
        intro: "Esame mirato alla valutazione della regione ___, sede della tumefazione clinicamente obiettivabile.",
        organi: [
          {
            id: "sottocute", nome: "Reperto",
            riscritta: true, negativo: "In tale sede, regolare rappresentazione del tessuto adiposo sottocutaneo, senza evidenti formazioni solide e/o liquide nel contesto.",
            reperti: [
              { id: "lipoma", etichetta: "Lipoma / fibrolipoma", riscritta: true, testo: "A tale livello, nel contesto del tessuto sottocutaneo in sede sovrafasciale, formazione ovalare a margini netti, ad ecostruttura mista prevalentemente ipoecogena con tralci iperecogeni nel contesto, delle dimensioni massime di ___ x ___ mm; distanza tra il piano cutaneo ed il margine superficiale della lesione di circa ___ mm.\nFormazione priva di significativi segnali vascolari al color-Doppler, riferibile in prima ipotesi a fibrolipoma.", conclusione: "Formazione sottocutanea riferibile in prima ipotesi a fibrolipoma." },
              { id: "lipoma-intramuscolare", etichetta: "Lipoma intramuscolare", riscritta: true, testo: "A tale livello, in sede sottofasciale, nel contesto della porzione ___ del muscolo ___, formazione ovalare a margini netti, tenuemente iperecogena con tralci fibrosi nel contesto, delle dimensioni massime di circa ___ x ___ mm, priva di segnali vascolari al color-Doppler.\nPorzione più superficiale della formazione a circa ___ mm dal piano cutaneo.\nReperto compatibile in prima ipotesi con lipoma intramuscolare; utile valutazione specialistica.", conclusione: "Lipoma intramuscolare." },
              { id: "lipomi-multipli", etichetta: "Lipomi multipli", riscritta: true, testo: "Nel contesto del tessuto adiposo sottocutaneo, formazioni ovalari a margini netti e struttura adiposa, con componente fibrosa variabile, prive di alterazioni vascolari all'esame color-Doppler e compatibili con lipomi.", conclusione: "Lipomi sottocutanei multipli." },
              { id: "cisti-sebacea", etichetta: "Cisti sebacea", riscritta: true, testo: "Nel contesto del tessuto sottocutaneo, formazione ovalare del diametro massimo di ___ mm, ad ecostruttura ipo-anecogena di aspetto cistico con componente in parte corpuscolata nel contesto, priva di segnali vascolari all'integrazione con color-Doppler.\nReperto riferibile in prima ipotesi a cisti sebacea.", conclusione: "Cisti sebacea." },
              { id: "cisti", etichetta: "Cisti (monitoraggio)", riscritta: true, testo: "Nel contesto dei tessuti molli sottocutanei, formazione ___ (ovalare/polilobata) ipo-anecogena a margini netti di ___ x ___ mm, con rinforzo ecografico di parete posteriore, priva di segnali vascolari all'integrazione con box colore.\nFormazione di aspetto cistico, meritevole di monitoraggio clinico.", conclusione: "Formazione cistica sottocutanea." },
              { id: "solida", etichetta: "Formazione solida generica", riscritta: true, testo: "Formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm, in sede ___. Al color-Doppler, presenza/assenza di vascolarizzazione interna. Consigliati correlazione clinica e approfondimento diagnostico.", conclusione: "Formazione solida dei tessuti molli meritevole di approfondimento." },
              { id: "adiposo", etichetta: "Solo adiposo più rappresentato", riscritta: true, testo: "In tale sede, non immagini compatibili con lipoma né formazioni cistiche. Unicamente maggiore rappresentazione del tessuto adiposo sottocutaneo a tale livello, in comparazione con il controlato." },
              { id: "esiti-chirurgici", etichetta: "Esiti chirurgici senza raccolte", riscritta: true, testo: "Nella sede di recente intervento, assenti raccolte. Unicamente modesta disomogeneità dei tessuti in esiti chirurgici." },
              { id: "raccolta", etichetta: "Raccolta / ascesso", nuovo: true, riscritta: true, testo: "Raccolta fluida disomogenea, a margini irregolari, di ___ x ___ mm, con iperemia perilesionale al color-Doppler, in prima ipotesi di natura flogistica-ascessuale.", conclusione: "Raccolta fluida di probabile natura flogistica." }
            ]
          }
        ],
        conclusioneNegativa: "Non formazioni solide o liquide nella sede esaminata."
      },

      {
        id: "inguine",
        nome: "Regione inguinale (ernia)",
        gruppo: "Tessuti molli e parete",
        titolo: "ECOGRAFIA DELLA REGIONE INGUINALE",
        lati: ["destra", "sinistra"],
        riscritta: true, intro: "Esame mirato alla regione inguinale {lato}, sede di sospetta ernia.",
        introBilaterale: "Esame delle regioni inguinali bilateralmente, sede di sospetta ernia.",
        organi: [
          {
            id: "canale", nome: "Canale inguinale",
            riscritta: true, negativo: "Non immagini compatibili con protrusioni erniarie, neanche durante la manovra del ponzamento.\nAssenti alterazioni del piano muscolo-fasciale inguinale.",
            reperti: [
              { id: "ernia", etichetta: "Ernia inguinale", riscritta: true, testo: "Tessuto adiposo addominale affacciato all'orifizio inguinale esterno durante la manovra del ponzamento eseguita in stazione supina, e spontaneamente in stazione eretta, con riduzione al termine della manovra.\nNon falde fluide limitrofe all'ernia descritta.", conclusione: "Ernia inguinale." },
              { id: "controlaterale", etichetta: "Reperto analogo controlaterale", modo: "aggiunge", riscritta: true, testo: "Controlateralmente, reperto analogo." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni ecografici di ernia inguinale."
      },

      {
        id: "parete",
        nome: "Parete addominale",
        gruppo: "Tessuti molli e parete",
        titolo: "ECOGRAFIA DELLA PARETE ADDOMINALE",
        organi: [
          {
            id: "retti", nome: "Muscoli retti",
            riscritta: true, negativo: "Non diastasi dei muscoli retti.",
            reperti: [
              { id: "diastasi", etichetta: "Diastasi dei retti", riscritta: true, testo: "In sede ___, distanza massima dei muscoli retti di ___ centimetri: reperto compatibile con ___ (lieve) diastasi dei muscoli retti.", conclusione: "Diastasi dei muscoli retti." }
            ]
          },
          {
            id: "linea-alba", nome: "Linea alba e ombelico",
            riscritta: true, negativo: "Assente interruzione della linea alba.",
            reperti: [
              { id: "interruzione", etichetta: "Piccola interruzione linea alba", riscritta: true, testo: "Non interruzione della linea alba se non in sede ___, con piccola interruzione (___ mm), senza impegno mesenteriale." },
              { id: "ombelicale", etichetta: "Ernia ombelicale", riscritta: true, testo: "In sede ombelicale, impegno di materiale mesenteriale di circa ___ cm di estensione, protrudente attraverso l'ombelico, con porta erniaria di ___ mm, riducibile ___ (spontaneamente/dopo manovra di compressione).", conclusione: "Ernia ombelicale." }
            ]
          }
        ],
        conclusioneNegativa: "Parete addominale nei limiti della norma."
      },

      /* ============================================================ TESTICOLI */
      {
        id: "testicoli",
        nome: "Testicoli",
        gruppo: "Addome",
        titolo: "ECOGRAFIA TESTICOLARE",
        organi: [
          {
            id: "didimi", nome: "Didimi",
            negativo: "Didimi regolari per morfologia, dimensioni (dx: ___ x ___ x ___ mm; sn: ___ x ___ x ___ mm) ed ecostruttura omogenea, priva di calcificazioni.",
            reperti: [
              { id: "rete-testis", etichetta: "Ectasia rete testis", riscritta: true, testo: "Didimi in sede, di regolari dimensioni ed ecostruttura, eccetto alcune formazioni pseudocistiche/serpiginose a livello della rete testis di ___, in prima ipotesi da attribuire a ectasia tubulare.", conclusione: "Ectasia tubulare della rete testis." },
              { id: "microlitiasi", etichetta: "Microlitiasi", nuovo: true, testo: "Didimi regolari per morfologia e dimensioni, con multipli spot iperecogeni puntiformi diffusi nel parenchima, come da microlitiasi testicolare.", conclusione: "Microlitiasi testicolare." },
              { id: "lesione", etichetta: "Lesione focale", nuovo: true, riscritta: true, testo: "Nel contesto del didimo ___, formazione ipoecogena di ___ mm, vascolarizzata al color-Doppler, meritevole di valutazione specialistica urologica urgente.", conclusione: "Lesione focale testicolare ___ meritevole di valutazione urologica urgente." }
            ]
          },
          {
            id: "epididimi", nome: "Epididimi",
            negativo: "Epididimi regolari per morfologia ed ecostruttura.",
            reperti: [
              { id: "cisti-coda", etichetta: "Cisti della coda", riscritta: true, testo: "Formazione anecogena d'aspetto cistico in corrispondenza della coda dell'epididimo di ___ delle dimensioni di ___ mm." },
              { id: "cisti-testa", etichetta: "Cisti della testa", riscritta: true, testo: "A livello della testa di ___ epididimo, formazioni anecogene di aspetto cistico, a contenuto finemente corpuscolato, delle dimensioni di ___ x ___ mm." },
              { id: "epididimite", etichetta: "Epididimite", nuovo: true, riscritta: true, testo: "Epididimo ___ ingrandito e disomogeneamente ipoecogeno, con aumentata vascolarizzazione al color-Doppler, come nei quadri di epididimite.", conclusione: "Quadro compatibile con epididimite ___." }
            ]
          },
          {
            id: "vascolarizzazione", nome: "Vascolarizzazione",
            negativo: "Regolare la vascolarizzazione parenchimale all'integrazione con color-Doppler.",
            reperti: []
          },
          {
            id: "idrocele", nome: "Idrocele",
            negativo: "Non idrocele rilevabile.",
            reperti: [
              { id: "grossolano", etichetta: "Idrocele bilaterale grossolano", testo: "Grossolano idrocele bilateralmente.\nImbibizione parietale del sacco scrotale.", conclusione: "Idrocele bilaterale." },
              { id: "minimo", etichetta: "Minima falda", testo: "Minima falda di idrocele bilateralmente, più evidente a ___." }
            ]
          },
          {
            id: "varicocele", nome: "Varicocele",
            riscritta: true, negativo: "Assenti segni di varicocele ed ectasie delle strutture venose, in particolare in corrispondenza dei poli inferiori.",
            reperti: [
              { id: "varicocele", etichetta: "Varicocele", nuovo: true, testo: "Ectasia delle vene del plesso pampiniforme a ___, con calibro massimo di ___ mm e reflusso durante la manovra di Valsalva, come da varicocele.", conclusione: "Varicocele ___." }
            ]
          }
        ],
        conclusioneNegativa: "Quadro ecografico nei limiti della norma."
      },

      /* ============================================================ DOPPLER */
      {
        id: "tsa",
        nome: "Doppler tronchi sovraortici",
        gruppo: "Doppler",
        titolo: { it: "ECOCOLORDOPPLER DEI TRONCHI SOVRAORTICI", en: "COLOUR DOPPLER ULTRASOUND OF THE SUPRA-AORTIC TRUNKS", es: "ECO-DOPPLER COLOR DE TRONCOS SUPRAAÓRTICOS" },
        lingue: ["it", "en", "es"],
        traduzioniDaVerificare: true, /* DA VERIFICARE: traduzioni EN/ES */
        /* DA VERIFICARE: tecnica nuova, non presente nell'archivio */
        tecnicaNuova: true,
        tecnica: { it: "Esame eseguito con sonda lineare, studio B-mode, color-Doppler e Doppler pulsato.", en: "Examination performed with a linear probe: B-mode, colour Doppler and pulsed-wave Doppler.", es: "Estudio realizado con sonda lineal: modo B, Doppler color y Doppler pulsado." },
        organi: [
          {
            id: "generale", nome: "Quadro generale", negativo: "",
            reperti: [
              { id: "angiosclerosi", etichetta: "Angiosclerosi diffusa", riscritta: true, testo: { it: "Diffusa angiosclerosi a carico del distretto esaminato.", en: "Diffuse atherosclerotic changes in the examined territory.", es: "Angiosclerosis difusa del territorio examinado." } }
            ]
          },
          {
            id: "destra", nome: "Asse carotideo destro",
            riscritta: true, negativo: { it: "A destra: regolare pervietà della carotide comune, della carotide interna ed esterna, senza ateromi e/o stenosi.", en: "Right: normal patency of the common, internal and external carotid arteries, without plaques and/or stenosis.", es: "Lado derecho: permeabilidad normal de las arterias carótida común, interna y externa, sin ateromas y/o estenosis." },
            reperti: [
              { id: "minime", etichetta: "Ateromi, stenosi < 20%", riscritta: true, testo: { it: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nSottili ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%).", en: "Right: normal patency of the common and external carotid arteries.\nThin fibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery, without significant stenosis (<20%).", es: "Lado derecho: permeabilidad normal de las arterias carótida común y externa.\nFinas placas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna, sin estenosis significativa (<20%)." }, conclusione: { it: "Ateromasia carotidea destra non emodinamicamente significativa.", en: "Haemodynamically non-significant right carotid atheromatous disease.", es: "Ateromatosis carotídea derecha sin repercusión hemodinámica." } },
              { id: "lievi", etichetta: "Stenosi lieve (~30%)", riscritta: true, testo: { it: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa).", en: "Right: normal patency of the common and external carotid arteries.\nFibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery and causing mild stenosis (approximately 30%).", es: "Lado derecho: permeabilidad normal de las arterias carótida común y externa.\nPlacas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna y determinan estenosis leve (30% aproximadamente)." }, conclusione: { it: "Stenosi carotidea interna destra di grado lieve.", en: "Mild right internal carotid stenosis.", es: "Estenosis leve de la carótida interna derecha." } },
              { id: "moderate", etichetta: "Stenosi moderata (<50%)", riscritta: true, testo: { it: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%).", en: "Right: normal patency of the common and external carotid arteries.\nFibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery and causing moderate stenosis (<50%).", es: "Lado derecho: permeabilidad normal de las arterias carótida común y externa.\nPlacas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna y determinan estenosis moderada (<50%)." }, conclusione: { it: "Stenosi carotidea interna destra di grado moderato.", en: "Moderate right internal carotid stenosis.", es: "Estenosis moderada de la carótida interna derecha." } },
              { id: "significativa", etichetta: "Stenosi significativa", nuovo: true, testo: { it: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nPlacca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.", en: "Right: normal patency of the common and external carotid arteries.\n___ atheromatous plaque at the bifurcation, involving the origin of the internal carotid artery and causing haemodynamically significant stenosis, estimated at ___% (PSV ___ cm/s); vascular surgery assessment advised.", es: "Lado derecho: permeabilidad normal de las arterias carótida común y externa.\nPlaca ateromatosa ___ en la bifurcación, que afecta al origen de la carótida interna y determina estenosis hemodinámicamente significativa, estimada en ___% (VPS ___ cm/s); aconsejable valoración por cirugía vascular." }, conclusione: { it: "Stenosi emodinamicamente significativa della carotide interna destra.", en: "Haemodynamically significant stenosis of the right internal carotid artery.", es: "Estenosis hemodinámicamente significativa de la carótida interna derecha." } },
              { id: "tea", etichetta: "Esiti TEA", testo: { it: "A destra: regolare pervietà dell'asse carotideo in esiti di rivascolarizzazione chirurgica senza evidenza di restenosi emodinamicamente significative.\nCarotide esterna pervia.", en: "Right: normal patency of the carotid axis after surgical revascularisation, without evidence of haemodynamically significant restenosis.\nExternal carotid artery patent.", es: "Lado derecho: permeabilidad normal del eje carotídeo tras revascularización quirúrgica, sin evidencia de reestenosis hemodinámicamente significativa.\nCarótida externa permeable." } }
            ]
          },
          {
            id: "sinistra", nome: "Asse carotideo sinistro",
            riscritta: true, negativo: { it: "A sinistra: regolare pervietà della carotide comune, della carotide interna ed esterna; assenti ateromi e/o stenosi.", en: "Left: normal patency of the common, internal and external carotid arteries; no plaques and/or stenosis.", es: "Lado izquierdo: permeabilidad normal de las arterias carótida común, interna y externa; ausencia de ateromas y/o estenosis." },
            reperti: [
              { id: "minime", etichetta: "Ateromi, stenosi < 20%", riscritta: true, testo: { it: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nSottili ateromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%).", en: "Left: normal patency of the common and external carotid arteries.\nThin fibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery, without significant stenosis (<20%).", es: "Lado izquierdo: permeabilidad normal de las arterias carótida común y externa.\nFinas placas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna, sin estenosis significativa (<20%)." }, conclusione: { it: "Ateromasia carotidea sinistra non emodinamicamente significativa.", en: "Haemodynamically non-significant left carotid atheromatous disease.", es: "Ateromatosis carotídea izquierda sin repercusión hemodinámica." } },
              { id: "lievi", etichetta: "Stenosi lieve (~30%)", riscritta: true, testo: { it: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa).", en: "Left: normal patency of the common and external carotid arteries.\nFibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery and causing mild stenosis (approximately 30%).", es: "Lado izquierdo: permeabilidad normal de las arterias carótida común y externa.\nPlacas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna y determinan estenosis leve (30% aproximadamente)." }, conclusione: { it: "Stenosi carotidea interna sinistra di grado lieve.", en: "Mild left internal carotid stenosis.", es: "Estenosis leve de la carótida interna izquierda." } },
              { id: "moderate", etichetta: "Stenosi moderata (<50%)", riscritta: true, testo: { it: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici alla biforcazione, coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%).", en: "Left: normal patency of the common and external carotid arteries.\nFibrocalcific plaques at the bifurcation, involving the origin of the internal carotid artery and causing moderate stenosis (<50%).", es: "Lado izquierdo: permeabilidad normal de las arterias carótida común y externa.\nPlacas fibrocalcificadas en la bifurcación, que afectan al origen de la carótida interna y determinan estenosis moderada (<50%)." }, conclusione: { it: "Stenosi carotidea interna sinistra di grado moderato.", en: "Moderate left internal carotid stenosis.", es: "Estenosis moderada de la carótida interna izquierda." } },
              { id: "significativa", etichetta: "Stenosi significativa", nuovo: true, testo: { it: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nPlacca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.", en: "Left: normal patency of the common and external carotid arteries.\n___ atheromatous plaque at the bifurcation, involving the origin of the internal carotid artery and causing haemodynamically significant stenosis, estimated at ___% (PSV ___ cm/s); vascular surgery assessment advised.", es: "Lado izquierdo: permeabilidad normal de las arterias carótida común y externa.\nPlaca ateromatosa ___ en la bifurcación, que afecta al origen de la carótida interna y determina estenosis hemodinámicamente significativa, estimada en ___% (VPS ___ cm/s); aconsejable valoración por cirugía vascular." }, conclusione: { it: "Stenosi emodinamicamente significativa della carotide interna sinistra.", en: "Haemodynamically significant stenosis of the left internal carotid artery.", es: "Estenosis hemodinámicamente significativa de la carótida interna izquierda." } },
              { id: "tea", etichetta: "Esiti TEA", testo: { it: "A sinistra: regolare pervietà dell'asse carotideo in esiti di rivascolarizzazione chirurgica senza evidenza di restenosi emodinamicamente significative.\nCarotide esterna pervia.", en: "Left: normal patency of the carotid axis after surgical revascularisation, without evidence of haemodynamically significant restenosis.\nExternal carotid artery patent.", es: "Lado izquierdo: permeabilidad normal del eje carotídeo tras revascularización quirúrgica, sin evidencia de reestenosis hemodinámicamente significativa.\nCarótida externa permeable." } }
            ]
          },
          {
            id: "vertebrali", nome: "Arterie vertebrali",
            negativo: { it: "Arterie vertebrali pervie con tracciati normodiretti.", en: "Vertebral arteries patent, with antegrade flow.", es: "Arterias vertebrales permeables, con flujo anterógrado." },
            reperti: [
              { id: "invertito", etichetta: "Flusso invertito / alternante", nuovo: true, testo: { it: "Arteria vertebrale ___ con flusso ___ (invertito/alternante); utile studio delle arterie succlavie.", en: "___ vertebral artery with ___ (reversed/alternating) flow; assessment of the subclavian arteries advised.", es: "Arteria vertebral ___ con flujo ___ (invertido/alternante); aconsejable estudio de las arterias subclavias." }, conclusione: { it: "Alterazione del flusso vertebrale ___.", en: "Abnormal ___ vertebral artery flow.", es: "Alteración del flujo vertebral ___." } },
              { id: "ipoplasica", etichetta: "Vertebrale ipoplasica", nuovo: true, riscritta: true, testo: { it: "Arterie vertebrali pervie con tracciati normodiretti; vertebrale ___ di calibro ridotto, come per ipoplasia.", en: "Vertebral arteries patent, with antegrade flow; ___ vertebral artery of small calibre, consistent with hypoplasia.", es: "Arterias vertebrales permeables, con flujo anterógrado; vertebral ___ de calibre reducido, como por hipoplasia." } }
            ]
          }
        ],
        conclusioneNegativa: { it: "Ecocolordoppler dei tronchi sovraortici nei limiti della norma.", en: "Normal colour Doppler ultrasound of the supra-aortic trunks.", es: "Eco-Doppler color de troncos supraaórticos dentro de la normalidad." }
      },

      {
        id: "venoso-ai",
        nome: "Doppler venoso arti inferiori",
        gruppo: "Doppler",
        titolo: { it: "ECOCOLORDOPPLER VENOSO DEGLI ARTI INFERIORI", en: "COLOUR DOPPLER ULTRASOUND OF THE LOWER LIMB VEINS", es: "ECO-DOPPLER COLOR VENOSO DE MIEMBROS INFERIORES" },
        lingue: ["it", "en", "es"],
        traduzioniDaVerificare: true, /* DA VERIFICARE: traduzioni EN/ES */
        /* DA VERIFICARE: tecnica nuova, non presente nell'archivio */
        tecnicaNuova: true,
        tecnica: { it: "Esame eseguito con sonda lineare, in clinostatismo e ortostatismo, con manovre di compressione e di Valsalva.", en: "Examination performed with a linear probe, supine and standing, with compression and Valsalva manoeuvres.", es: "Estudio realizado con sonda lineal, en decúbito y en bipedestación, con maniobras de compresión y de Valsalva." },
        organi: [
          {
            id: "profondo", nome: "Sistema venoso profondo",
            riscritta: true, negativo: { it: "Regolare pervietà, calibro e continenza del sistema venoso profondo bilateralmente.\nIn particolare, non segni di TVP in atto bilateralmente.", en: "Normal patency, calibre and competence of the deep venous system bilaterally.\nIn particular, no signs of ongoing DVT bilaterally.", es: "Permeabilidad, calibre y continencia normales del sistema venoso profundo bilateral.\nEn particular, sin signos de TVP en curso bilateral." },
            reperti: [
              { id: "tvp", etichetta: "Trombosi venosa profonda", nuovo: true, riscritta: true, testo: { it: "A ___ (destra/sinistra), vena ___ non comprimibile ed occupata da materiale ecogeno, senza segnale di flusso al color-Doppler, come da trombosi venosa profonda ___ (occlusiva/non occlusiva).\nControlateralmente regolare pervietà, calibro e continenza del sistema venoso profondo.", en: "On the ___ (right/left), ___ vein non-compressible and filled with echogenic material, without colour Doppler flow signal, consistent with ___ (occlusive/non-occlusive) deep vein thrombosis.\nContralateral deep venous system with normal patency, calibre and competence.", es: "En el lado ___ (derecho/izquierdo), vena ___ no compresible y ocupada por material ecogénico, sin señal de flujo en el Doppler color, compatible con trombosis venosa profunda ___ (oclusiva/no oclusiva).\nSistema venoso profundo contralateral con permeabilidad, calibre y continencia normales." }, conclusione: { it: "Trombosi venosa profonda ___: comunicato al paziente / al curante per valutazione urgente.", en: "___ deep vein thrombosis: patient / referring physician informed for urgent assessment.", es: "Trombosis venosa profunda ___: comunicado al paciente / al médico solicitante para valoración urgente." } },
              { id: "esiti", etichetta: "Esiti di pregressa TVP", nuovo: true, riscritta: true, testo: { it: "A ___, vena ___ ricanalizzata, con ispessimenti parietali e reflusso, come da esiti di pregressa trombosi.\nNon segni di TVP in atto.", en: "On the ___, recanalised ___ vein with wall thickening and reflux, consistent with previous thrombosis.\nNo signs of ongoing DVT.", es: "En el lado ___, vena ___ recanalizada, con engrosamiento parietal y reflujo, como secuela de trombosis previa.\nSin signos de TVP en curso." }, conclusione: { it: "Esiti di pregressa trombosi venosa profonda.", en: "Sequelae of previous deep vein thrombosis.", es: "Secuelas de trombosis venosa profunda previa." } }
            ]
          },
          {
            id: "destra", nome: "Safene destra",
            riscritta: true, negativo: { it: "A destra: regolare pervietà, calibro e continenza della safena interna ed esterna.\nAssenti segni di tromboflebite in atto.", en: "Right: normal patency, calibre and competence of the great and small saphenous veins.\nNo signs of ongoing thrombophlebitis.", es: "Lado derecho: permeabilidad, calibre y continencia normales de las venas safena mayor y menor.\nSin signos de tromboflebitis en curso." },
            reperti: [
              { id: "insufficienza", etichetta: "Insufficienza safena interna", nuovo: true, riscritta: true, testo: { it: "A destra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.\nAssenti segni di tromboflebite in atto.", en: "Right: incompetent saphenofemoral junction with great saphenous vein reflux extending to ___, maximum diameter ___ mm; normal small saphenous vein.\nNo signs of ongoing thrombophlebitis.", es: "Lado derecho: unión safenofemoral incompetente con reflujo de la safena mayor que se extiende hasta ___, calibre máximo ___ mm; safena menor normal.\nSin signos de tromboflebitis en curso." }, conclusione: { it: "Insufficienza della safena interna destra.", en: "Right great saphenous vein incompetence.", es: "Insuficiencia de la vena safena mayor derecha." } },
              { id: "tromboflebite", etichetta: "Tromboflebite", nuovo: true, riscritta: true, testo: { it: "A destra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.", en: "Right: ___ saphenous vein non-compressible and filled with echogenic material over a segment of about ___ cm at the level of ___, ___ mm from the junction, consistent with thrombophlebitis.", es: "Lado derecho: safena ___ no compresible y ocupada por material ecogénico en un tramo de unos ___ cm a nivel de ___, a ___ mm de la unión, compatible con tromboflebitis." }, conclusione: { it: "Tromboflebite della safena ___ destra.", en: "Thrombophlebitis of the right ___ saphenous vein.", es: "Tromboflebitis de la vena safena ___ derecha." } }
            ]
          },
          {
            id: "sinistra", nome: "Safene sinistra",
            riscritta: true, negativo: { it: "A sinistra: regolare pervietà, calibro e continenza della safena interna ed esterna.\nNon segni di tromboflebite in atto.", en: "Left: normal patency, calibre and competence of the great and small saphenous veins.\nNo signs of ongoing thrombophlebitis.", es: "Lado izquierdo: permeabilidad, calibre y continencia normales de las venas safena mayor y menor.\nSin signos de tromboflebitis en curso." },
            reperti: [
              { id: "insufficienza", etichetta: "Insufficienza safena interna", nuovo: true, riscritta: true, testo: { it: "A sinistra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.\nNon segni di tromboflebite in atto.", en: "Left: incompetent saphenofemoral junction with great saphenous vein reflux extending to ___, maximum diameter ___ mm; normal small saphenous vein.\nNo signs of ongoing thrombophlebitis.", es: "Lado izquierdo: unión safenofemoral incompetente con reflujo de la safena mayor que se extiende hasta ___, calibre máximo ___ mm; safena menor normal.\nSin signos de tromboflebitis en curso." }, conclusione: { it: "Insufficienza della safena interna sinistra.", en: "Left great saphenous vein incompetence.", es: "Insuficiencia de la vena safena mayor izquierda." } },
              { id: "tromboflebite", etichetta: "Tromboflebite", nuovo: true, riscritta: true, testo: { it: "A sinistra: safena ___ non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.", en: "Left: ___ saphenous vein non-compressible and filled with echogenic material over a segment of about ___ cm at the level of ___, ___ mm from the junction, consistent with thrombophlebitis.", es: "Lado izquierdo: safena ___ no compresible y ocupada por material ecogénico en un tramo de unos ___ cm a nivel de ___, a ___ mm de la unión, compatible con tromboflebitis." }, conclusione: { it: "Tromboflebite della safena ___ sinistra.", en: "Thrombophlebitis of the left ___ saphenous vein.", es: "Tromboflebitis de la vena safena ___ izquierda." } }
            ]
          },
          {
            id: "altro", nome: "Altri reperti", negativo: "",
            reperti: [
              { id: "baker", etichetta: "Cisti di Baker", riscritta: true, testo: { it: "Formazione cistica polilobata nel cavo popliteo di ___, attribuibile a cisti di Baker.", en: "Polylobulated cystic lesion in the ___ popliteal fossa, consistent with a Baker's cyst.", es: "Formación quística polilobulada en el hueco poplíteo ___, atribuible a quiste de Baker." } },
              { id: "edema", etichetta: "Edema sottocutaneo", testo: { it: "Imbibizione fluida sottocutanea diffusa da edema.", en: "Diffuse subcutaneous fluid infiltration due to oedema.", es: "Infiltración líquida subcutánea difusa por edema." } }
            ]
          }
        ],
        conclusioneNegativa: { it: "Non segni ecografici di trombosi venosa profonda né superficiale.", en: "No ultrasound signs of deep or superficial vein thrombosis.", es: "Sin signos ecográficos de trombosis venosa profunda ni superficial." }
      },

      {
        id: "arterioso-ai",
        nome: "Doppler arterioso arti inferiori",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER ARTERIOSO DEGLI ARTI INFERIORI",
        organi: [
          {
            id: "generale", nome: "Quadro generale",
            riscritta: true, negativo: "Quadro di modesta e diffusa ateromasia a carico del distretto esaminato.",
            reperti: [
              { id: "assente", etichetta: "Senza ateromasia", nuovo: true, riscritta: true, testo: "Non significative alterazioni ateromasiche a carico del distretto esaminato." }
            ]
          },
          {
            id: "destra", nome: "Arto destro",
            riscritta: true, negativo: "A destra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba, con tracciati di tipo trifasico, senza stenosi emodinamiche.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi / occlusione", nuovo: true, riscritta: true, testo: "A destra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).", conclusione: "Arteriopatia obliterante dell'arto inferiore destro." }
            ]
          },
          {
            id: "sinistra", nome: "Arto sinistro",
            riscritta: true, negativo: "A sinistra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba, con tracciati di tipo trifasico; assenti stenosi emodinamiche.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi / occlusione", nuovo: true, riscritta: true, testo: "A sinistra: a livello ___, ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).", conclusione: "Arteriopatia obliterante dell'arto inferiore sinistro." }
            ]
          }
        ],
        conclusioneNegativa: "Non stenosi emodinamicamente significative nel distretto esaminato."
      },

      {
        id: "aorta-iliache",
        nome: "Doppler aorta e assi iliaci",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER DELL'AORTA ADDOMINALE E DEGLI ASSI ILIACI",
        organi: [
          {
            id: "ateromasia", nome: "Ateromasia",
            negativo: "Diffusa ateromasia fibrocalcifica a carico del distretto esaminato.",
            reperti: []
          },
          {
            id: "calibro", nome: "Calibro e pervietà",
            riscritta: true, negativo: "Aorta addominale ed assi iliaci pervi con calibro conservato.\nIn particolare, non dilatazioni aneurismatiche né stenosi emodinamiche.",
            reperti: [
              { id: "aneurisma", etichetta: "Aneurisma", nuovo: true, testo: "Aorta addominale sottorenale sede di dilatazione aneurismatica con diametro massimo trasverso di ___ mm ed estensione longitudinale di circa ___ mm, con apposizione trombotica parietale ___; assi iliaci pervi con calibro conservato.", conclusione: "Aneurisma dell'aorta addominale sottorenale: utile valutazione chirurgo-vascolare." }
            ]
          },
          {
            id: "tracciati", nome: "Tracciati",
            riscritta: true, negativo: "Tracciati di tipo regolarmente trifasico in tutto l'ambito esplorato.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Reperti nei limiti di normalità."
      },

      {
        id: "arterie-renali",
        nome: "Doppler arterie renali",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER DELLE ARTERIE RENALI",
        organi: [
          {
            id: "reni", nome: "Reni",
            riscritta: true, negativo: "Reni in sede, di regolari dimensioni ed ecostruttura, con conservato gradiente cortico-midollare.\nVie escretrici urinarie non dilatate.",
            reperti: []
          },
          {
            id: "tecnica", nome: "Campionamento",
            riscritta: true, negativo: "Campionamento delle arterie renali all'origine e all'ilo e dei vasi in sede intraparenchimale.",
            reperti: []
          },
          {
            id: "arterie", nome: "Arterie renali",
            riscritta: true, negativo: "Arterie renali regolarmente pervie, senza evidenza di stenosi emodinamiche, con indici di resistenza < 0.8.\nAl campionamento dei vasi intraparenchimali, indice di resistenza < 0.7.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi arteria renale", nuovo: true, riscritta: true, testo: "A livello dell'arteria renale ___, accelerazione del flusso all'origine (PSV ___ cm/s), con tracciati intraparenchimali a valle di tipo tardus-parvus, come per stenosi emodinamicamente significativa.\nRegolare l'arteria renale controlaterale.", conclusione: "Stenosi emodinamicamente significativa dell'arteria renale ___." }
            ]
          },
          {
            id: "conclusioni", nome: "Conclusioni (solo se negativo)", soloSeNegativo: true,
            negativo: "Conclusioni: reperti nei limiti di normalità.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Reperti nei limiti di normalità."
      },

      {
        id: "trapianto-renale",
        nome: "Doppler trapianto renale",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER DEL TRAPIANTO RENALE",
        intro: "Controllo in esiti di trapianto renale in fossa iliaca di ___.",
        organi: [
          {
            id: "rene", nome: "Rene trapiantato",
            riscritta: true, negativo: "Rene di regolari dimensioni ed ecostruttura, con conservata quota parenchimale corticale.\nVie escretrici urinarie non dilatate.",
            reperti: []
          },
          {
            id: "arteria", nome: "Arteria renale",
            riscritta: true, negativo: "Regolare pervietà dell'arteria renale senza evidenza di stenosi anastomotica con IR ___.\nAl campionamento dei vasi intraparenchimali, regolare vascolarizzazione con IR < 0.7.",
            reperti: []
          },
          {
            id: "vena", nome: "Vena renale",
            negativo: "Regolare pervietà della vena renale.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Reperti nei limiti di normalità."
      }
    ]
  },

  /* ============================================================ TC
   * Frasi negative: dal documento «TC NEGATIVO STANDARD EL-DEA», riscritte nello stile
   * telegrafico (riscritta: true; senza flag se identiche all'originale).
   * DA VERIFICARE: reperti positivi e conclusioni marcati nuovo: true (non presenti nel documento). */
  {
    id: "tc",
    nome: "TC",
    attiva: true,
    distretti: [
      {
        id: "encefalo",
        nome: "Encefalo senza mdc",
        gruppo: "Neuro",
        titolo: "TC DELL'ENCEFALO SENZA MDC",
        riscritta: true,
        tecnica: "Esame eseguito unicamente in condizioni di base.",
        organi: [
          {
            id: "emorragia", nome: "Emorragie", riscritta: true,
            negativo: "Non evidenti iperdensità di natura ematica in sede intracranica.",
            reperti: [
              { id: "ematoma", etichetta: "Ematoma intraparenchimale", nuovo: true, testo: "Iperdensità di natura ematica intraparenchimale in sede ___, di circa ___ x ___ mm, con edema perilesionale ___ ed effetto massa ___.", conclusione: "Ematoma intraparenchimale ___." },
              { id: "esa", etichetta: "Emorragia subaracnoidea", nuovo: true, testo: "Iperdensità di natura ematica negli spazi liquorali ___ (solchi della convessità/cisterne della base/scissure), come da emorragia subaracnoidea.", conclusione: "Emorragia subaracnoidea." },
              { id: "subdurale", etichetta: "Ematoma subdurale", nuovo: true, testo: "Falda iperdensa extra-assiale a semiluna lungo la convessità ___, dello spessore massimo di ___ mm, come da ematoma subdurale ___ (acuto/subacuto/cronico).", conclusione: "Ematoma subdurale ___." },
              { id: "epidurale", etichetta: "Ematoma epidurale", nuovo: true, testo: "Raccolta iperdensa extra-assiale biconvessa in sede ___, dello spessore massimo di ___ mm, come da ematoma epidurale.", conclusione: "Ematoma epidurale ___." }
            ]
          },
          {
            id: "parenchima", nome: "Parenchima", riscritta: true,
            negativo: "Non ulteriori alterazioni tomodensitometriche del tessuto nervoso in sede sovra e sottotentoriale.",
            reperti: [
              { id: "leucoaraiosi", etichetta: "Vasculopatia cronica (anziano)", riscritta: true, testo: "Diffusa ipodensità della sostanza bianca periventricolare in rapporto a vasculopatia cronica.", conclusione: "Segni di vasculopatia cronica della sostanza bianca." },
              { id: "esiti-ischemici", etichetta: "Esiti ischemici non recenti", riscritta: true, testo: "In sede ___, lesione ipodensa rotondeggiante in verosimili esiti ischemici non recenti." },
              { id: "ischemia", etichetta: "Lesione ischemica in evoluzione", nuovo: true, testo: "Area ipodensa ___ (corticale/cortico-sottocorticale) in sede ___, con perdita della differenziazione tra sostanza grigia e bianca, come per lesione ischemica in evoluzione nel territorio dell'arteria ___.", conclusione: "Lesione ischemica in evoluzione nel territorio dell'arteria ___." },
              { id: "contusione", etichetta: "Focolai contusivi", nuovo: true, testo: "Focolai contusivi in sede ___, con componente emorragica ___.", conclusione: "Focolai contusivi ___." }
            ]
          },
          {
            id: "ventricoli", nome: "Sistema ventricolare", riscritta: true,
            negativo: "Sistema ventricolare regolare per sede, dimensioni e morfologia.",
            reperti: [
              { id: "atrofia", etichetta: "Fenomeni regressivo-atrofici", riscritta: true, testo: "Lieve aumento delle dimensioni del sistema ventricolare e dell'ampiezza degli spazi subaracnoidei della volta, in rapporto a fenomeni regressivo-atrofici." },
              { id: "idrocefalo", etichetta: "Idrocefalo", nuovo: true, testo: "Dilatazione del sistema ventricolare sovratentoriale ___, con ipodensità periventricolare da riassorbimento transependimale ___, come da idrocefalo ___.", conclusione: "Idrocefalo ___." },
              { id: "emoventricolo", etichetta: "Emoventricolo", nuovo: true, testo: "Iperdensità ematica nel lume ventricolare ___, come da emoventricolo.", conclusione: "Emoventricolo." }
            ]
          },
          {
            id: "linea-mediana", nome: "Linea mediana", riscritta: true,
            negativo: "Strutture della linea mediana in asse.",
            reperti: [
              { id: "shift", etichetta: "Deviazione della linea mediana", nuovo: true, testo: "Deviazione delle strutture della linea mediana verso ___ di circa ___ mm.", conclusione: "Deviazione della linea mediana di ___ mm." }
            ]
          },
          {
            id: "ossa", nome: "Teca e base cranica", riscritta: true,
            negativo: "Allo studio con finestra per osso, non alterazioni ossee della teca e della base cranica.",
            reperti: [
              { id: "frattura", etichetta: "Frattura cranica", nuovo: true, testo: "Allo studio con finestra per osso, rima di frattura ___ (composta/scomposta) a carico di ___.", conclusione: "Frattura ___ di ___." }
            ]
          },
          {
            id: "tessuti-molli", nome: "Tessuti molli extracranici", negativo: "",
            reperti: [
              { id: "tumefazione", etichetta: "Tumefazione dei tessuti molli", riscritta: true, testo: "Tumefazione dei tessuti molli extracranici in sede ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non alterazioni encefaliche di significato acuto."
      },

      {
        id: "encefalo-angio",
        nome: "Angio-TC encefalo (stroke)",
        gruppo: "Neuro",
        titolo: "TC DELL'ENCEFALO SENZA E CON MDC E ANGIO-TC",
        riscritta: true,
        tecnica: "Esame eseguito in regime d'urgenza, prima e dopo infusione ev di MdC iodato (___), con protocollo Angio-TC spirale per lo studio del circolo arterioso intracranico.",
        organi: [
          {
            id: "basale", nome: "Esame basale", riscritta: true,
            negativo: "All'esame basale, non evidenti alterazioni tomodensitometriche del tessuto nervoso di significato attuale, in particolare non evidenti ipodensità focali di significato ischemico recente.",
            reperti: [
              { id: "ischemia", etichetta: "Lesione ischemica recente", nuovo: true, testo: "All'esame basale, ipodensità ___ in sede ___, con perdita della differenziazione cortico-sottocorticale (ASPECTS ___), come per lesione ischemica recente nel territorio dell'arteria ___.", conclusione: "Lesione ischemica recente nel territorio dell'arteria ___ (ASPECTS ___)." }
            ]
          },
          {
            id: "emorragia", nome: "Emorragie", riscritta: true,
            negativo: "Non franche iperdensità focali di natura emorragica attuale in sede intracranica.",
            reperti: [
              { id: "ematoma", etichetta: "Emorragia intracranica", nuovo: true, testo: "Iperdensità focale di natura emorragica in sede ___, di circa ___ x ___ mm.", conclusione: "Emorragia intracranica ___." }
            ]
          },
          {
            id: "ventricoli", nome: "Sistema ventricolare", riscritta: true,
            negativo: "Sistema ventricolare regolare per sede, dimensioni e morfologia.",
            reperti: []
          },
          {
            id: "linea-mediana", nome: "Linea mediana", riscritta: true,
            negativo: "Strutture della linea sagittale mediana in asse.",
            reperti: []
          },
          {
            id: "ossa", nome: "Teca e base cranica", riscritta: true,
            negativo: "Allo studio con finestra per osso, non alterazioni ossee della teca e della base cranica.",
            reperti: []
          },
          {
            id: "tsa", nome: "Arco aortico e TSA", riscritta: true,
            negativo: "Dopo iniezione ev di MdC, regolari calibro e pervietà dell'arco aortico e dei TSA (___, diffusamente ateromasici).",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi carotidea", nuovo: true, testo: "Dopo iniezione ev di MdC, placca ateromasica ___ all'origine della carotide interna ___, con stenosi stimata del ___% (criteri NASCET); regolare pervietà dei restanti TSA.", conclusione: "Stenosi della carotide interna ___ del ___%." }
            ]
          },
          {
            id: "intracranici", nome: "Arterie intracraniche", riscritta: true,
            negativo: "Principali vasi arteriosi intracranici pervi e di calibro nei limiti della norma; non malformazioni aneurismatiche e/o artero-venose.",
            reperti: [
              { id: "occlusione", etichetta: "Occlusione arteriosa", nuovo: true, testo: "Mancata opacizzazione del tratto ___ dell'arteria ___ (carotide interna/M1/M2/basilare), come per occlusione trombo-embolica.", conclusione: "Occlusione dell'arteria ___ (tratto ___)." },
              { id: "aneurisma", etichetta: "Aneurisma", nuovo: true, testo: "Dilatazione aneurismatica sacciforme dell'arteria ___, con colletto di ___ mm e sacca di ___ x ___ mm.", conclusione: "Aneurisma dell'arteria ___." }
            ]
          },
          {
            id: "collaterali", nome: "Circoli collaterali", riscritta: true,
            negativo: "Sistema collaterale leptomeningeo ben rappresentato, categorizzabile come buono.",
            reperti: [
              { id: "scarso", etichetta: "Collaterali ridotti", nuovo: true, testo: "Sistema collaterale leptomeningeo ridotto nel territorio ___, categorizzabile come ___ (moderato/scarso)." }
            ]
          },
          {
            id: "venoso", nome: "Deflusso venoso", riscritta: true,
            negativo: "Deflusso venoso regolarmente rappresentato.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non segni TC di lesioni ischemiche o emorragiche acute; circolo arterioso intracranico pervio."
      },

      {
        id: "massiccio-facciale",
        nome: "Massiccio facciale",
        gruppo: "Testa-collo",
        titolo: "TC DEL MASSICCIO FACCIALE",
        riscritta: true,
        tecnica: "Esame eseguito in tecnica spirale senza somministrazione di mdc, con scansioni dal palato duro al seno frontale e successive ricostruzioni a strato sottile sui piani coronale e sagittale.",
        organi: [
          {
            id: "turbinati", nome: "Turbinati", riscritta: true,
            negativo: "Turbinati nasali di regolare aspetto, con spazi coanali di normali dimensioni.",
            reperti: [
              { id: "ipertrofia", etichetta: "Ipertrofia dei turbinati", riscritta: true, testo: "Ipertrofia dei turbinati medi e inferiori, con associata riduzione dei corrispettivi spazi coanali." }
            ]
          },
          {
            id: "seni", nome: "Seni paranasali",
            negativo: "Regolare rappresentazione dei complessi ostio-meatali e pneumatizzazione dei seni paranasali.",
            reperti: [
              { id: "ispessimento", etichetta: "Ispessimento mucoso", riscritta: true, testo: "Ispessimento della mucosa dei seni mascellari ___, di verosimile significato flogistico, da correlare con la clinica e l'anamnesi.\nRegolare rappresentazione dei complessi ostio-meatali e pneumatizzazione dei restanti seni paranasali." },
              { id: "sinusite", etichetta: "Sinusite acuta", nuovo: true, testo: "Livello idroaereo nel seno ___, come per sinusite acuta.", conclusione: "Sinusite acuta ___." },
              { id: "ipoplasia", etichetta: "Ipoplasia/agenesia seno frontale", riscritta: true, modo: "aggiunge", testo: "Ipoplasia del seno frontale ___ ed agenesia del controlaterale." },
              { id: "onodi", etichetta: "Cellette di Onodi", riscritta: true, modo: "aggiunge", testo: "Cellette sfeno-etmoidali (cellette di Onodi) bilateralmente." }
            ]
          },
          {
            id: "setto", nome: "Setto nasale",
            negativo: "Setto nasale in asse.",
            reperti: [
              { id: "deviazione", etichetta: "Deviazione del setto", riscritta: true, testo: "Deviazione del setto nasale verso ___." },
              { id: "sperone", etichetta: "Sperone osseo", riscritta: true, testo: "Setto nasale sostanzialmente in asse, con piccolo sperone osseo in sede mediana verso ___." }
            ]
          },
          {
            id: "ossa", nome: "Strutture ossee", nuovo: true,
            negativo: "Non rime di frattura delle strutture ossee del massiccio facciale.",
            reperti: [
              { id: "frattura", etichetta: "Frattura", nuovo: true, testo: "Rima di frattura ___ (composta/scomposta) a carico di ___.", conclusione: "Frattura ___ di ___." }
            ]
          }
        ],
        conclusioneNegativa: "TC del massiccio facciale nei limiti della norma."
      },

      {
        id: "collo",
        nome: "Collo",
        gruppo: "Testa-collo",
        titolo: "TC DEL COLLO",
        riscritta: true,
        tecnica: "Esame eseguito ___ (senza/senza e con) somministrazione ev di mezzo di contrasto organoiodato.",
        organi: [
          {
            id: "linfonodi", nome: "Linfonodi", riscritta: true,
            negativo: "Non linfoadenopatie in corrispondenza dei livelli linfonodali.",
            reperti: [
              { id: "adenopatie", etichetta: "Linfoadenopatie", nuovo: true, testo: "Linfonodi di dimensioni aumentate al livello ___, il maggiore di ___ mm in asse corto, ___ (omogenei/con aree di necrosi colliquativa).", conclusione: "Linfoadenopatie laterocervicali ___." }
            ]
          },
          {
            id: "faringe", nome: "Rino e orofaringe", riscritta: true,
            negativo: "Rinofaringe e orofaringe di regolare aspetto tomodensitometrico.",
            reperti: [
              { id: "ascesso", etichetta: "Ascesso", nuovo: true, testo: "Raccolta ipodensa a margini con enhancement in sede ___ (peritonsillare/retrofaringea/parafaringea), di ___ x ___ mm, come per ascesso.", conclusione: "Ascesso ___." }
            ]
          },
          {
            id: "parafaringei", nome: "Spazi parafaringei", riscritta: true,
            negativo: "Conservati i piani adiposi parafaringei.",
            reperti: []
          },
          {
            id: "laringe", nome: "Laringe e trachea", riscritta: true,
            negativo: "Regolare la colonna aerea laringo-tracheale.",
            reperti: []
          },
          {
            id: "tiroide", nome: "Tiroide", riscritta: true,
            negativo: "Tiroide di normale aspetto TC.",
            reperti: [
              { id: "nodulo", etichetta: "Nodulo tiroideo", nuovo: true, testo: "Nodulo tiroideo ipodenso di ___ mm nel lobo ___, da caratterizzare con ecografia.", conclusione: "Nodulo tiroideo ___: utile ecografia." }
            ]
          },
          {
            id: "ossa", nome: "Strutture ossee", riscritta: true,
            negativo: "Allo studio con finestra per osso, non alterazioni ossee compatibili con lesioni con caratteristiche di evolutività.",
            reperti: []
          }
        ],
        conclusioneNegativa: "TC del collo nei limiti della norma."
      },

      {
        id: "torace",
        nome: "Torace",
        gruppo: "Torace",
        titolo: "TC DEL TORACE",
        riscritta: true,
        tecnica: "Esame eseguito ___ (senza/senza e con) somministrazione ev di mezzo di contrasto organoiodato.",
        organi: [
          {
            id: "polmoni", nome: "Polmoni", riscritta: true,
            negativo: "Non alterazioni polmonari con caratteristiche evolutive.",
            reperti: [
              { id: "polmonite", etichetta: "Focolaio broncopneumonico", nuovo: true, testo: "Area di consolidazione parenchimale ___ (sede), con broncogramma aereo, di verosimile natura flogistica.", conclusione: "Focolaio broncopneumonico ___." },
              { id: "interstiziale", etichetta: "Polmonite interstiziale", riscritta: true, testo: "Diffuse aree di iperdensità parenchimale con aspetto a vetro smerigliato, a chiazze in parte confluenti, prevalentemente in sede periferica, nei lobi ___ (superiori/inferiori/in entrambi i lobi).\nIspessimento dei setti intra- e interlobulari con quadro di «crazy paving».\nAree di consolidazione parenchimale ___ (con/senza) broncogramma aereo.", conclusione: "Reperti indicativi di polmonite interstiziale di possibile eziologia infettiva." },
              { id: "scompenso", etichetta: "Edema interstiziale (scompenso)", riscritta: true, testo: "Diffuso ispessimento dell'interstizio cuffiale peribroncovascolare, prevalentemente a livello del grosso interstizio centrale in sede perilare, e diffuso ispessimento delle scissure e dei setti interlobulari, con maggiore evidenza a livello medio-basale.\nAlcune sfumate aree tenuemente iperdense, di aspetto simil vetro smerigliato, diffuse in entrambi i polmoni.\nCalibro vascolare diffusamente maggiore rispetto a quello bronchiale.", conclusione: "Reperti compatibili con scompenso cardiaco sinistro congestizio con iniziali segni di edema interstizio-alveolare; utile integrazione con i dati clinico-laboratoristici." },
              { id: "nodulo", etichetta: "Nodulo polmonare", nuovo: true, testo: "Nodulo polmonare ___ (solido/subsolido/a vetro smerigliato) di ___ mm nel lobo ___.", conclusione: "Nodulo polmonare ___: follow-up secondo le linee guida." },
              { id: "massa", etichetta: "Formazione espansiva", nuovo: true, testo: "Formazione espansiva solida del lobo ___, di ___ x ___ mm, a margini ___ (spiculati/lobulati/netti).", conclusione: "Formazione espansiva polmonare ___: utile approfondimento." },
              { id: "enfisema", etichetta: "Enfisema", nuovo: true, testo: "Aree di enfisema ___ (centrolobulare/parasettale/panlobulare), prevalenti ___.", conclusione: "Enfisema polmonare ___." }
            ]
          },
          {
            id: "vie-aeree", nome: "Trachea e bronchi", riscritta: true,
            negativo: "Trachea e grossi bronchi pervi.",
            reperti: [
              { id: "obliterazione", etichetta: "Obliterazione mucosa", nuovo: true, testo: "Obliterazione mucosa del bronco ___.", conclusione: "Bronco ___ obliterato." }
            ]
          },
          {
            id: "pleura", nome: "Cavità pleuriche", riscritta: true,
            negativo: "Cavità pleuriche libere da versamento.",
            reperti: [
              { id: "versamento", etichetta: "Versamento pleurico", nuovo: true, testo: "Falda di versamento pleurico ___ (destro/sinistro/bilaterale), dello spessore massimo di ___ mm.", conclusione: "Versamento pleurico ___." },
              { id: "pnx", etichetta: "Pneumotorace", nuovo: true, testo: "Pneumotorace ___, con falda aerea dello spessore massimo di ___ mm all'apice.", conclusione: "Pneumotorace ___." }
            ]
          },
          {
            id: "pericardio", nome: "Pericardio", riscritta: true,
            negativo: "Non versamento pericardico.",
            reperti: [
              { id: "versamento", etichetta: "Versamento pericardico", nuovo: true, testo: "Falda di versamento pericardico dello spessore massimo di ___ mm.", conclusione: "Versamento pericardico." }
            ]
          },
          {
            id: "linfonodi", nome: "Linfonodi", riscritta: true,
            negativo: "Non linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare.",
            reperti: [
              { id: "limiti-smdc", etichetta: "Negativo con i limiti senza mdc", riscritta: true, testo: "Con i limiti dati dall'assenza di somministrazione contrastografica, non linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare." },
              { id: "adenopatie", etichetta: "Linfoadenopatie", nuovo: true, testo: "Linfonodi di dimensioni aumentate in sede ___, il maggiore di ___ mm in asse corto.", conclusione: "Linfoadenopatie ___." }
            ]
          },
          {
            id: "cuore", nome: "Cuore e grossi vasi", riscritta: true,
            negativo: "Cuore e grossi vasi apparentemente di regolare aspetto tomodensitometrico.",
            reperti: [
              { id: "ateromasia", etichetta: "Ateromasia aorto-coronarica", riscritta: true, testo: "Diffusi segni di ateromasia parietale calcifica aorto-coronarica, con maggiore evidenza a carico ___." }
            ]
          },
          {
            id: "ossa", nome: "Strutture ossee", riscritta: true,
            negativo: "Allo studio con finestra per osso, non alterazioni ossee compatibili con lesioni con caratteristiche di evolutività.",
            reperti: [
              { id: "frattura-costale", etichetta: "Frattura costale", nuovo: true, testo: "Allo studio con finestra per osso, rima di frattura ___ (composta/scomposta) dell'arco ___ della ___ costa ___.", conclusione: "Frattura costale ___." }
            ]
          }
        ],
        conclusioneNegativa: "TC del torace nei limiti della norma."
      },

      {
        id: "torace-tepa",
        nome: "Angio-TC torace (embolia polmonare)",
        gruppo: "Torace",
        titolo: "ANGIO-TC DEL TORACE PER EMBOLIA POLMONARE",
        riscritta: true,
        tecnica: "Esame eseguito in regime di urgenza senza e con somministrazione ev di MdC organoiodato (___), con protocollo di studio per embolia polmonare mirato alla valutazione del circolo arterioso polmonare.",
        organi: [
          {
            id: "arterie-polmonari", nome: "Arterie polmonari", riscritta: true,
            negativo: "Non difetti di riempimento endoluminali ipodensi delle arterie polmonari e delle principali diramazioni compatibili con fenomeni tromboembolici.",
            reperti: [
              { id: "tep", etichetta: "Tromboembolia polmonare", nuovo: true, testo: "Difetti di riempimento endoluminali ipodensi a carico ___ (tronco dell'arteria polmonare/rami lobari/segmentari/subsegmentari ___), come da tromboembolia polmonare.", conclusione: "Tromboembolia polmonare ___." },
              { id: "sovraccarico", etichetta: "Sovraccarico ventricolare destro", nuovo: true, testo: "Rapporto tra ventricolo destro e ventricolo sinistro di ___, con reflusso di mdc in vena cava inferiore e nelle vene sovraepatiche, come per sovraccarico ventricolare destro.", conclusione: "Segni di sovraccarico ventricolare destro." },
              { id: "infarto", etichetta: "Infarto polmonare", nuovo: true, modo: "aggiunge", testo: "Area di consolidazione periferica cuneiforme a base pleurica nel lobo ___, come per infarto polmonare.", conclusione: "Infarto polmonare ___." }
            ]
          },
          {
            id: "polmoni", nome: "Polmoni", riscritta: true,
            negativo: "Non alterazioni polmonari con caratteristiche evolutive.",
            reperti: []
          },
          {
            id: "vie-aeree", nome: "Trachea e bronchi", riscritta: true,
            negativo: "Trachea e grossi bronchi pervi.",
            reperti: []
          },
          {
            id: "pleura", nome: "Pleura e pericardio", riscritta: true,
            negativo: "Non versamenti pleuro-pericardici.",
            reperti: [
              { id: "versamento", etichetta: "Versamento pleurico", nuovo: true, testo: "Falda di versamento pleurico ___, dello spessore massimo di ___ mm; non versamento pericardico.", conclusione: "Versamento pleurico ___." }
            ]
          },
          {
            id: "linfonodi", nome: "Linfonodi", riscritta: true,
            negativo: "Assenti linfonodi di dimensioni aumentate in sede ilo-mediastinica e ascellare.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non segni TC di tromboembolia polmonare."
      },

      {
        id: "addome",
        nome: "Addome",
        gruppo: "Addome",
        titolo: "TC DELL'ADDOME",
        riscritta: true,
        tecnica: "Esame eseguito ___ (senza/senza e con) somministrazione ev di mezzo di contrasto organoiodato.",
        organi: [
          {
            id: "fegato", nome: "Fegato", riscritta: true,
            negativo: "Fegato di dimensioni nei limiti di norma, a profili regolari, indenne da lesioni focali.",
            reperti: [
              { id: "limiti-smdc", etichetta: "Senza mdc (con i limiti)", riscritta: true, testo: "Fegato di dimensioni nei limiti di norma, a profili regolari, di aspetto tomodensitometrico omogeneo con i limiti dati dall'assenza di somministrazione contrastografica." },
              { id: "steatosi", etichetta: "Steatosi", nuovo: true, testo: "Fegato di dimensioni ___, con diffusa riduzione della densità parenchimale, come per steatosi.", conclusione: "Steatosi epatica." },
              { id: "cisti", etichetta: "Cisti epatica", nuovo: true, testo: "Al ___ segmento, formazione ipodensa di ___ mm, a margini netti, priva di enhancement, di tipo cistico.", conclusione: "Cisti epatica." },
              { id: "secondarismi", etichetta: "Secondarismi", nuovo: true, testo: "Plurime lesioni focali ipodense epatiche di diverse dimensioni, la maggiore di ___ mm al ___ segmento, compatibili con secondarismi.", conclusione: "Lesioni epatiche compatibili con secondarismi." }
            ]
          },
          {
            id: "colecisti", nome: "Colecisti", riscritta: true,
            negativo: "Colecisti priva di calcoli calcifici endoluminali.",
            reperti: [
              { id: "calcoli", etichetta: "Calcoli", nuovo: true, testo: "Colecisti con ___ calcoli calcifici endoluminali, il maggiore di ___ mm.", conclusione: "Colelitiasi." },
              { id: "colecistite", etichetta: "Colecistite", nuovo: true, testo: "Colecisti distesa, a pareti ispessite (___ mm), con addensamento dell'adipe pericolecistico, come per colecistite acuta.", conclusione: "Colecistite acuta." }
            ]
          },
          {
            id: "vie-biliari", nome: "Vie biliari", riscritta: true,
            negativo: "Vie biliari non dilatate.",
            reperti: [
              { id: "dilatate", etichetta: "Vie biliari dilatate", nuovo: true, testo: "Dilatazione delle vie biliari intraepatiche e del coledoco (calibro ___ mm).", conclusione: "Dilatazione delle vie biliari." }
            ]
          },
          {
            id: "milza-pancreas", nome: "Milza, pancreas, surreni", riscritta: true,
            negativo: "Milza, pancreas e surreni di normale aspetto tomodensitometrico.",
            reperti: [
              { id: "pancreatite", etichetta: "Pancreatite acuta", nuovo: true, testo: "Pancreas tumefatto, con addensamento dell'adipe peripancreatico ___ e raccolte fluide ___, come per pancreatite acuta ___ (edematosa/necrotico-emorragica).", conclusione: "Pancreatite acuta ___." },
              { id: "splenomegalia", etichetta: "Splenomegalia", nuovo: true, testo: "Milza aumentata di volume (diametro bipolare ___ mm).", conclusione: "Splenomegalia." },
              { id: "adenoma", etichetta: "Nodulo surrenalico", nuovo: true, testo: "Nodulo surrenalico ___ di ___ mm, ipodenso (densità basale ___ HU), come per adenoma.", conclusione: "Nodulo surrenalico ___ compatibile con adenoma." }
            ]
          },
          {
            id: "reni", nome: "Reni", riscritta: true,
            negativo: "Reni in sede, di dimensioni nella norma, di regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare.",
            reperti: [
              { id: "cisti", etichetta: "Cisti renale", nuovo: true, modo: "aggiunge", testo: "Cisti corticale semplice di ___ mm al polo ___ del rene ___." },
              { id: "pielonefrite", etichetta: "Pielonefrite", nuovo: true, testo: "Aree cuneiformi ipoperfuse nel rene ___, come per focolai pielonefritici.", conclusione: "Pielonefrite ___." }
            ]
          },
          {
            id: "escrezione", nome: "Escrezione renale", riscritta: true,
            negativo: "Escrezione renale di urina organoiodata in tempi fisiologici.",
            reperti: []
          },
          {
            id: "vie-urinarie", nome: "Vie urinarie", riscritta: true,
            negativo: "Vie escretrici urinarie non dilatate.",
            reperti: [
              { id: "calcolo-ureterale", etichetta: "Calcolo ureterale", nuovo: true, testo: "Calcolo di ___ mm nell'uretere ___ (prossimale/medio/distale), con dilatazione delle vie escretrici a monte.", conclusione: "Calcolo ureterale ___ con idronefrosi." },
              { id: "calcoli-renali", etichetta: "Calcoli renali", nuovo: true, testo: "Calcoli caliceali ___, il maggiore di ___ mm, senza dilatazione delle vie escretrici.", conclusione: "Nefrolitiasi ___." }
            ]
          },
          {
            id: "vescica", nome: "Vescica", riscritta: true,
            negativo: "Vescica regolarmente distesa, priva di lesioni organiche.",
            reperti: []
          },
          {
            id: "utero-annessi", nome: "Utero e annessi", riscritta: true,
            negativo: "Non tumefazioni utero-annessiali.",
            reperti: []
          },
          {
            id: "prostata", nome: "Prostata", riscritta: true,
            negativo: "Prostata di dimensioni conservate.",
            reperti: []
          },
          {
            id: "aorta", nome: "Asse aorto-iliaco", riscritta: true,
            negativo: "Asse aorto-iliaco femorale pervio, di regolare calibro.",
            reperti: [
              { id: "aneurisma", etichetta: "Aneurisma aortico", nuovo: true, testo: "Dilatazione aneurismatica dell'aorta addominale sottorenale, con diametro massimo di ___ mm ed estensione longitudinale di ___ mm, con trombosi parietale ___.", conclusione: "Aneurisma dell'aorta addominale sottorenale." }
            ]
          },
          {
            id: "linfonodi", nome: "Linfonodi", riscritta: true,
            negativo: "Non linfonodi patologicamente ingranditi in sede retro e intraperitoneale.",
            reperti: []
          },
          {
            id: "peritoneo", nome: "Cavità peritoneale", riscritta: true,
            negativo: "Cavità peritoneale libera da versamento.",
            reperti: [
              { id: "versamento", etichetta: "Versamento", nuovo: true, testo: "Falda di versamento libero ___ (periepatico/perisplenico/nello scavo pelvico/diffuso).", conclusione: "Versamento peritoneale." }
            ]
          },
          {
            id: "basi-polmonari", nome: "Basi polmonari", riscritta: true,
            negativo: "Nelle scansioni craniali passanti per le basi polmonari, non alterazioni parenchimali in atto.",
            reperti: [
              { id: "versamento-pleurico", etichetta: "Versamento pleurico", nuovo: true, testo: "Nelle scansioni craniali passanti per le basi polmonari, falda di versamento pleurico ___ (destro/sinistro/bilaterale)." }
            ]
          },
          {
            id: "ossa", nome: "Strutture ossee", riscritta: true,
            negativo: "Alla valutazione con finestra per osso, non immagini attribuibili a localizzazioni scheletriche di malattia.",
            reperti: []
          }
        ],
        conclusioneNegativa: "TC dell'addome nei limiti della norma."
      },

      {
        id: "addome-acuto",
        nome: "Addome acuto (DEA)",
        gruppo: "Addome",
        titolo: "TC DELL'ADDOME SENZA E CON MDC (ADDOME ACUTO)",
        contesto: "tc-addome",
        riscritta: true,
        tecnica: "Esame eseguito in regime di urgenza senza e con somministrazione ev di mezzo di contrasto organoiodato.",
        organi: [
          {
            id: "pneumoperitoneo", nome: "Pneumoperitoneo",
            negativo: "Non segni di pneumoperitoneo da riferire a perforazione viscerale endoaddominale.",
            reperti: [
              { id: "perforazione", etichetta: "Perforazione", nuovo: true, testo: "Bolle aeree libere extraluminali ___ (sottodiaframmatiche/in sede ___), come per perforazione di viscere cavo ___.", conclusione: "Pneumoperitoneo da perforazione di viscere cavo ___." }
            ]
          },
          {
            id: "fegato", nome: "Fegato", riscritta: true,
            negativo: "Fegato di dimensioni nei limiti di norma, a profili regolari e di normale aspetto tomodensitometrico, indenne da lesioni focali.",
            reperti: []
          },
          {
            id: "sovraepatiche", nome: "Vene sovraepatiche", riscritta: true,
            negativo: "Vene sovraepatiche regolari per calibro e pervietà.",
            reperti: []
          },
          {
            id: "porta", nome: "Vena porta", riscritta: true,
            negativo: "Vena porta e principali diramazioni intraepatiche regolari per calibro e pervietà, senza edema periportale.",
            reperti: []
          },
          {
            id: "colecisti", nome: "Colecisti", riscritta: true,
            negativo: "Colecisti normodistesa, priva di calcoli calcifici endoluminali, a pareti non ispessite, senza falde fluide pericolecistiche da riferire a colecistite acuta.",
            reperti: [
              { id: "colecistite", etichetta: "Colecistite acuta", nuovo: true, testo: "Colecisti distesa, a pareti ispessite (___ mm), con addensamento dell'adipe pericolecistico e falda fluida perivescicolare, ___ (con calcoli endoluminali), come per colecistite acuta.", conclusione: "Colecistite acuta." }
            ]
          },
          {
            id: "vie-biliari", nome: "Vie biliari", riscritta: true,
            negativo: "Vie biliari non dilatate, senza alterazioni tomodensitometriche riferibili a colangite acuta.",
            reperti: []
          },
          {
            id: "milza-surreni", nome: "Milza e surreni", riscritta: true,
            negativo: "Milza e surreni di normale aspetto tomodensitometrico.",
            reperti: []
          },
          {
            id: "pancreas", nome: "Pancreas", riscritta: true,
            negativo: "Pancreas non tumefatto, con adipe periviscerale regolarmente ipodenso, senza segni di infiltrazione flogistica o raccolte limitrofe riferibili a pancreatite acuta.",
            reperti: [
              { id: "pancreatite", etichetta: "Pancreatite acuta", nuovo: true, testo: "Pancreas tumefatto, con addensamento dell'adipe peripancreatico ___ e raccolte fluide ___, come per pancreatite acuta ___ (edematosa/necrotico-emorragica).", conclusione: "Pancreatite acuta ___." }
            ]
          },
          {
            id: "reni", nome: "Reni", riscritta: true,
            negativo: "Reni in sede, di dimensioni nella norma, di regolare aspetto tomodensitometrico, con regolare spessore della corticale e conservata differenziazione corticomidollare; non aree ipoperfuse da riferire a focolai pielonefritici.",
            reperti: [
              { id: "pielonefrite", etichetta: "Pielonefrite", nuovo: true, testo: "Reni in sede, di dimensioni nella norma; aree cuneiformi ipoperfuse nel rene ___, come per focolai pielonefritici.", conclusione: "Pielonefrite ___." }
            ]
          },
          {
            id: "escrezione", nome: "Escrezione renale", riscritta: true,
            negativo: "Escrezione renale di urina organoiodata in tempi fisiologici.",
            reperti: []
          },
          {
            id: "vie-urinarie", nome: "Vie urinarie", riscritta: true,
            negativo: "Vie escretrici urinarie non dilatate.",
            reperti: [
              { id: "calcolo-ureterale", etichetta: "Calcolo ureterale", nuovo: true, testo: "Calcolo di ___ mm nell'uretere ___ (prossimale/medio/distale), con dilatazione delle vie escretrici a monte.", conclusione: "Calcolo ureterale ___ con idronefrosi." }
            ]
          },
          {
            id: "vescica", nome: "Vescica", riscritta: true,
            negativo: "Vescica regolarmente distesa, priva di lesioni parietali aggettanti nel lume, di aspetto tomodensitometrico omogeneo.",
            reperti: []
          },
          {
            id: "calcoli", nome: "Calcolosi urinaria", riscritta: true,
            negativo: "Non formazioni calcifiche da riferire a calcolosi urinaria.",
            reperti: []
          },
          {
            id: "utero-annessi", nome: "Utero e annessi", riscritta: true,
            negativo: "Non tumefazioni utero-annessiali.",
            reperti: []
          },
          {
            id: "prostata", nome: "Prostata", riscritta: true,
            negativo: "Prostata di dimensioni conservate.",
            reperti: []
          },
          {
            id: "appendice", nome: "Appendice", riscritta: true,
            negativo: "Non grossolane tumefazioni, raccolte fluide o addensamento del grasso in regione appendicolare da riferire ad appendicite acuta.",
            reperti: [
              { id: "appendicite", etichetta: "Appendicite acuta", nuovo: true, testo: "Appendice ciecale ispessita (diametro ___ mm), con iperenhancement parietale e addensamento dell'adipe periappendicolare ___ (con appendicolita/raccolta/bolle aeree extraluminali), come per appendicite acuta ___.", conclusione: "Appendicite acuta ___." }
            ]
          },
          {
            id: "sigma", nome: "Sigma", riscritta: true,
            negativo: "Sigma senza ispessimento parietale, addensamento dell'adipe circostante o raccolte essudative perisigmoidee da riferire a diverticolite acuta.",
            reperti: [
              { id: "diverticolite", etichetta: "Diverticolite acuta", nuovo: true, testo: "Diverticoli del sigma con ispessimento parietale segmentario e addensamento dell'adipe pericolico ___ (con raccolta/bolle aeree extraluminali), come per diverticolite acuta ___ (Hinchey ___).", conclusione: "Diverticolite acuta del sigma ___." }
            ]
          },
          {
            id: "anse", nome: "Anse intestinali", riscritta: true,
            negativo: "Anse intestinali non significativamente dilatate, senza livelli idroaerei da riferire a fenomeni di subocclusione-occlusione.",
            reperti: [
              { id: "occlusione", etichetta: "Occlusione intestinale", nuovo: true, testo: "Distensione delle anse ___ (tenuali/coliche) fino a ___ mm, con livelli idroaerei e passaggio di calibro in sede ___, come per occlusione intestinale ___.", conclusione: "Occlusione intestinale ___." }
            ]
          },
          {
            id: "pareti", nome: "Pareti intestinali", riscritta: true,
            negativo: "Anse del piccolo e grosso intestino senza significativi ispessimenti parietali focali o diffusi né variazioni dell'enhancement contrastografico.",
            reperti: [
              { id: "ischemia", etichetta: "Sofferenza ischemica", nuovo: true, testo: "Ispessimento parietale delle anse ___ con ridotto enhancement ___, come per sofferenza ischemica.", conclusione: "Sofferenza ischemica intestinale ___." }
            ]
          },
          {
            id: "pneumatosi", nome: "Pneumatosi", riscritta: true,
            negativo: "Non segni riferibili a pneumatosi intraparietale intestinale né nel lume dell'asse venoso spleno-porto-mesenterico.",
            reperti: []
          },
          {
            id: "versamento", nome: "Versamento peritoneale", riscritta: true,
            negativo: "Assenti falde libere di versamento peritoneale.",
            reperti: [
              { id: "versamento", etichetta: "Versamento", nuovo: true, testo: "Falda di versamento libero ___ (periepatico/perisplenico/nello scavo pelvico/diffuso).", conclusione: "Versamento peritoneale." }
            ]
          },
          {
            id: "mesentere", nome: "Mesentere", riscritta: true,
            negativo: "Fodero adiposo mesenteriale normotrasparente, senza segni di infiltrazione e imbibizione edematoso-flogistica.",
            reperti: []
          },
          {
            id: "linfonodi", nome: "Linfonodi", riscritta: true,
            negativo: "Non linfonodi patologicamente ingranditi in sede retro e intraperitoneale.",
            reperti: []
          },
          {
            id: "arterie", nome: "Arterie", riscritta: true,
            negativo: "Asse arterioso aorto-iliaco femorale pervio, di regolare calibro, così come le principali derivazioni splancniche (tronco celiaco, mesenterica superiore e inferiore), senza evidenti segni dissecativi o occlusivi tromboembolici.",
            reperti: [
              { id: "ams", etichetta: "Occlusione mesenterica", nuovo: true, testo: "Difetto di opacizzazione dell'arteria mesenterica superiore ___ (a ___ mm dall'origine), come per occlusione trombo-embolica.", conclusione: "Occlusione dell'arteria mesenterica superiore." }
            ]
          },
          {
            id: "vene", nome: "Asse venoso portale", riscritta: true,
            negativo: "Asse venoso porto-spleno-mesenterico regolarmente pervio, senza evidenti segni occlusivi tromboembolici.",
            reperti: []
          },
          {
            id: "perfusione", nome: "Perfusione e segni di shock", riscritta: true,
            negativo: "Regolare perfusione degli organi parenchimatosi intraddominali, senza evidenti aree ischemiche o ipoperfuse; vasi venosi di regolare calibro, senza appiattimento della VCI né vene sovraepatiche filiformi; fisiologica escrezione renale di urina iodata bilateralmente: non evidenti segni riferibili a shock o ipoperfusione sistemica.",
            reperti: []
          },
          {
            id: "basi-polmonari", nome: "Basi polmonari", riscritta: true,
            negativo: "Nelle scansioni craniali passanti per le basi polmonari, non alterazioni pleuro-parenchimali in atto.",
            reperti: [
              { id: "versamento-pleurico", etichetta: "Versamento pleurico", nuovo: true, testo: "Nelle scansioni craniali passanti per le basi polmonari, falda di versamento pleurico ___ (destro/sinistro/bilaterale)." }
            ]
          },
          {
            id: "ossa", nome: "Strutture ossee", riscritta: true,
            negativo: "Alla valutazione con finestra per osso, non immagini attribuibili a localizzazioni scheletriche di malattia.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non segni TC di addome acuto."
      }
    ]
  },
  {
    id: "rm",
    nome: "RM",
    attiva: true,
    distretti: [

      /* ============================================================ RM SPALLA
       * Frasi negative e tecnica: dal modello «RM SPALLA» del documento «RM NEGATIVO STANDARD EL-DEA»,
       * riscritte nello stile telegrafico (riscritta: true).
       * DA VERIFICARE: titolo, intro, reperti positivi, conclusioni (nuovo: true) e traduzioni EN/ES. */
      {
        id: "spalla",
        nome: "Spalla",
        gruppo: "Muscolo-scheletrico",
        nuovo: true,
        titolo: { it: "RM DELLA SPALLA", en: "MRI OF THE SHOULDER", es: "RM DE HOMBRO" },
        lingue: ["it", "en", "es"],
        traduzioniDaVerificare: true,
        tecnica: { it: "Esame eseguito in condizioni basali.", en: "Examination performed under baseline conditions (without contrast).", es: "Estudio realizado en condiciones basales." },
        lati: [
          { it: "destra", en: "right", es: "derecho" },
          { it: "sinistra", en: "left", es: "izquierdo" }
        ],
        intro: { it: "Esame mirato alla spalla {lato}.", en: "MRI of the {lato} shoulder.", es: "Estudio del hombro {lato}." },
        organi: [
          {
            id: "cuffia", nome: "Cuffia dei rotatori", riscritta: true,
            negativo: { it: "Non alterazioni morfologiche e di segnale dei tendini sovraspinoso, sottospinoso e sottoscapolare.\nConservato il trofismo dei ventri muscolari.", en: "No morphological or signal abnormalities of the supraspinatus, infraspinatus and subscapularis tendons.\nPreserved muscle belly trophism.", es: "Sin alteraciones morfológicas ni de señal de los tendones supraespinoso, infraespinoso y subescapular.\nTrofismo conservado de los vientres musculares." },
            reperti: [
              { id: "tendinosi", etichetta: "Tendinosi sovraspinato", nuovo: true, testo: { it: "Tendine sovraspinato ispessito, con iperintensità di segnale intratendinea nelle sequenze DP, senza lesioni di continuità, come per tendinosi.", en: "Thickened supraspinatus tendon with increased intratendinous signal on PD-weighted images, without tear, consistent with tendinosis.", es: "Tendón supraespinoso engrosado, con hiperintensidad de señal intratendinosa en las secuencias DP, sin roturas, compatible con tendinosis." }, conclusione: { it: "Tendinosi del sovraspinato.", en: "Supraspinatus tendinosis.", es: "Tendinosis del supraespinoso." } },
              { id: "lesione-parziale", etichetta: "Lesione parziale sovraspinato", nuovo: true, testo: { it: "Lesione parziale del tendine sovraspinato sul versante ___ (articolare/bursale), di circa ___ mm.", en: "Partial-thickness tear of the supraspinatus tendon on the ___ (articular/bursal) side, about ___ mm.", es: "Rotura parcial del tendón supraespinoso en la vertiente ___ (articular/bursal), de unos ___ mm." }, conclusione: { it: "Lesione parziale del tendine sovraspinato.", en: "Partial-thickness supraspinatus tear.", es: "Rotura parcial del tendón supraespinoso." } },
              { id: "lesione-completa", etichetta: "Lesione a tutto spessore sovraspinato", nuovo: true, testo: { it: "Lesione a tutto spessore del tendine sovraspinato, con retrazione del moncone di circa ___ mm; trofismo del ventre muscolare ___ (conservato/ridotto, con infiltrazione adiposa).", en: "Full-thickness tear of the supraspinatus tendon, with retraction of the tendon stump of about ___ mm; muscle belly trophism ___ (preserved/reduced, with fatty infiltration).", es: "Rotura de espesor completo del tendón supraespinoso, con retracción del muñón de unos ___ mm; trofismo del vientre muscular ___ (conservado/reducido, con infiltración grasa)." }, conclusione: { it: "Lesione a tutto spessore del tendine sovraspinato.", en: "Full-thickness supraspinatus tear.", es: "Rotura de espesor completo del tendón supraespinoso." } },
              { id: "calcifica", etichetta: "Tendinopatia calcifica", nuovo: true, testo: { it: "Calcificazione di ___ mm nel contesto del tendine ___, ipointensa in tutte le sequenze, come per tendinopatia calcifica.", en: "Calcification of ___ mm within the ___ tendon, hypointense on all sequences, consistent with calcific tendinopathy.", es: "Calcificación de ___ mm en el tendón ___, hipointensa en todas las secuencias, compatible con tendinopatía calcificante." }, conclusione: { it: "Tendinopatia calcifica del ___.", en: "Calcific tendinopathy of the ___.", es: "Tendinopatía calcificante del ___." } }
            ]
          },
          {
            id: "clb", nome: "Capo lungo del bicipite", riscritta: true,
            negativo: { it: "Tendine del capo lungo del bicipite continuo e in sede.", en: "Long head of biceps tendon continuous and in normal position.", es: "Tendón de la porción larga del bíceps continuo y en su posición." },
            reperti: [
              { id: "tenosinovite", etichetta: "Tenosinovite", nuovo: true, testo: { it: "Tendine del capo lungo del bicipite in sede, con distensione fluida della guaina, come per tenosinovite.", en: "Long head of biceps tendon in normal position, with fluid distension of the tendon sheath, consistent with tenosynovitis.", es: "Tendón de la porción larga del bíceps en su posición, con distensión líquida de la vaina, compatible con tenosinovitis." }, conclusione: { it: "Tenosinovite del capo lungo del bicipite.", en: "Long head of biceps tenosynovitis.", es: "Tenosinovitis de la porción larga del bíceps." } }
            ]
          },
          {
            id: "labbro", nome: "Cercine glenoideo", riscritta: true,
            negativo: { it: "Cercine glenoideo regolarmente inserito.", en: "Glenoid labrum normally attached.", es: "Rodete glenoideo normalmente insertado." },
            reperti: [
              { id: "lesione", etichetta: "Lesione del cercine", nuovo: true, testo: { it: "Iperintensità lineare nel contesto del cercine glenoideo ___ (superiore/anteriore/posteriore), come per lesione.", en: "Linear hyperintensity within the ___ (superior/anterior/posterior) glenoid labrum, consistent with a tear.", es: "Hiperintensidad lineal en el rodete glenoideo ___ (superior/anterior/posterior), compatible con rotura." }, conclusione: { it: "Lesione del cercine glenoideo ___.", en: "Tear of the ___ glenoid labrum.", es: "Rotura del rodete glenoideo ___." } }
            ]
          },
          {
            id: "acromion-claveare", nome: "Articolazione acromion-claveare", riscritta: true,
            negativo: { it: "Regolare l'articolazione acromion-claveare.", en: "Normal acromioclavicular joint.", es: "Articulación acromioclavicular normal." },
            reperti: [
              { id: "artrosi", etichetta: "Artrosi acromion-claveare", nuovo: true, testo: { it: "Articolazione acromion-claveare con ipertrofia capsulo-osteofitosica e improntamento del versante bursale del sovraspinato, come per artrosi.", en: "Acromioclavicular joint with capsular and osteophytic hypertrophy indenting the bursal side of the supraspinatus, consistent with osteoarthritis.", es: "Articulación acromioclavicular con hipertrofia capsular y osteofitaria que impronta la vertiente bursal del supraespinoso, compatible con artrosis." }, conclusione: { it: "Artrosi acromion-claveare.", en: "Acromioclavicular osteoarthritis.", es: "Artrosis acromioclavicular." } }
            ]
          },
          {
            id: "articolazione", nome: "Versamento articolare", riscritta: true,
            negativo: { it: "Non versamento articolare.", en: "No joint effusion.", es: "Sin derrame articular." },
            reperti: []
          },
          {
            id: "borsa", nome: "Borsa subacromion-deltoidea", negativo: "",
            reperti: [
              { id: "minima-flogosi", etichetta: "Minima flogosi della borsa", testo: { it: "Minima flogosi della borsa subacromion-deltoidea.", en: "Minimal inflammation of the subacromial-subdeltoid bursa.", es: "Mínima inflamación de la bursa subacromio-subdeltoidea." } },
              { id: "borsite", etichetta: "Borsite", nuovo: true, testo: { it: "Distensione fluida della borsa subacromion-deltoidea, come per borsite.", en: "Fluid distension of the subacromial-subdeltoid bursa, consistent with bursitis.", es: "Distensión líquida de la bursa subacromio-subdeltoidea, compatible con bursitis." }, conclusione: { it: "Borsite subacromion-deltoidea.", en: "Subacromial-subdeltoid bursitis.", es: "Bursitis subacromio-subdeltoidea." } }
            ]
          }
        ],
        conclusioneNegativa: { it: "Quadro RM della spalla nei limiti della norma.", en: "Normal MRI of the shoulder.", es: "RM de hombro dentro de la normalidad." }
      },
      /* RM: frasi negative dal documento «RM NEGATIVO STANDARD EL-DEA», riscritte nello stile
       * telegrafico (riscritta: true). DA VERIFICARE: reperti positivi marcati nuovo: true. */
      {
        id: "encefalo",
        nome: "Encefalo",
        gruppo: "Neuro",
        titolo: "RM DELL'ENCEFALO",
        riscritta: true,
        tecnica: "Esame eseguito con sequenze T1 e T2 dipendenti su piani ortogonali dello spazio, integrato con sequenze in diffusione ___ (e completato con somministrazione ev di mdc paramagnetico).",
        organi: [
          {
            id: "parenchima", nome: "Parenchima", riscritta: true,
            negativo: "Non significative aree di alterato segnale del parenchima encefalico in sede sovra o sottotentoriale.",
            reperti: [
              { id: "gliosi", etichetta: "Gliosi vascolare aspecifica", riscritta: true, testo: "Multipli piccoli focolai di ipersegnale nelle sequenze T2 dipendenti nel contesto della sostanza bianca sovratentoriale di entrambi gli emisferi cerebrali, da riferire a gliosi da generica sofferenza vascolare aspecifica.", conclusione: "Gliosi da sofferenza vascolare aspecifica." },
              { id: "sclerosi-multipla", etichetta: "Lesioni demielinizzanti (controllo)", riscritta: true, testo: "Multiple aree di iperintensità nelle sequenze a TR lungo nel contesto della sostanza bianca sotto e soprattutto sovratentoriale, a distribuzione prevalentemente profonda periventricolare, ___ (invariate per numero, dimensioni e comportamento del segnale) rispetto al precedente del ___.\nNella sequenza pesata in diffusione, non alterazioni in corrispondenza delle lesioni demielinizzanti da riferire a segni di «attività di placca».", conclusione: "Carico lesionale demielinizzante ___ rispetto al precedente." },
              { id: "lesione-espansiva", etichetta: "Lesione espansiva", nuovo: true, testo: "Formazione espansiva ___ (intra/extra-assiale) in sede ___, di ___ x ___ mm, ___ (iperintensa/ipointensa) in T2, con enhancement ___ dopo mdc ed edema perilesionale ___.", conclusione: "Lesione espansiva ___: utile valutazione specialistica." }
            ]
          },
          {
            id: "grigia-bianca", nome: "Sostanza grigia e bianca", riscritta: true,
            negativo: "Regolari i rapporti anatomo-topografici tra sostanza grigia e sostanza bianca sottocorticale.",
            reperti: []
          },
          {
            id: "diffusione", nome: "Diffusione", riscritta: true,
            negativo: "Nella sequenza in diffusione, non alterazioni della diffusività molecolare dell'acqua riferibili a lesioni vascolari ischemiche «recenti».",
            reperti: [
              { id: "ischemia-acuta", etichetta: "Lesione ischemica acuta", nuovo: true, testo: "Nella sequenza in diffusione, area di restrizione della diffusività in sede ___, come per lesione ischemica acuta nel territorio dell'arteria ___.", conclusione: "Lesione ischemica acuta nel territorio dell'arteria ___." }
            ]
          },
          {
            id: "emosiderina", nome: "Depositi emosiderinici", riscritta: true,
            negativo: "Nella sequenza T2 GE, non immagini ipointense riconducibili a depositi emosiderinici intraparenchimali.",
            reperti: [
              { id: "microsanguinamenti", etichetta: "Microsanguinamenti", nuovo: true, testo: "Nella sequenza T2 GE, piccoli foci ipointensi in sede ___, riconducibili a depositi emosiderinici da microsanguinamenti.", conclusione: "Microsanguinamenti ___." }
            ]
          },
          {
            id: "tronco", nome: "Tronco encefalico", riscritta: true,
            negativo: "Tronco encefalico regolare per morfologia e intensità di segnale.",
            reperti: []
          },
          {
            id: "fossa-posteriore", nome: "Fossa cranica posteriore",
            negativo: "Regolare aspetto della fossa cranica posteriore.",
            reperti: []
          },
          {
            id: "ipofisi", nome: "Ipofisi", riscritta: true,
            negativo: "In esame non dedicato, ghiandola pituitaria apparentemente senza significative alterazioni volumetriche.",
            reperti: []
          },
          {
            id: "vasi", nome: "Vasi intracranici", riscritta: true,
            negativo: "In esame non dedicato, grossi vasi arteriosi della base cranica e circolo venoso intracranico apparentemente pervi.",
            reperti: []
          },
          {
            id: "ventricoli", nome: "Sistema ventricolare", riscritta: true,
            negativo: "Sistema ventricolare di forma e dimensioni regolari.",
            reperti: []
          },
          {
            id: "linea-mediana", nome: "Linea mediana", riscritta: true,
            negativo: "Strutture della linea mediana in asse.",
            reperti: []
          },
          {
            id: "mdc", nome: "Dopo mdc", negativo: "",
            reperti: [
              { id: "negativo-mdc", etichetta: "Negativo dopo mdc", riscritta: true, testo: "Dopo somministrazione del mdc paramagnetico, non impregnazioni contrastografiche di significato patologico." },
              { id: "enhancement", etichetta: "Enhancement patologico", nuovo: true, testo: "Dopo somministrazione del mdc paramagnetico, impregnazione contrastografica ___ (nodulare/anulare/leptomeningea) in sede ___.", conclusione: "Enhancement patologico ___." }
            ]
          }
        ],
        conclusioneNegativa: "RM dell'encefalo nei limiti della norma."
      },

      {
        id: "rachide-lombosacrale",
        nome: "Rachide lombosacrale",
        gruppo: "Rachide",
        titolo: "RM DEL RACHIDE LOMBOSACRALE",
        riscritta: true,
        tecnica: "Esame eseguito con sequenze T1, T2 e STIR sui piani sagittale e assiale.",
        organi: [
          {
            id: "curvatura", nome: "Lordosi", riscritta: true,
            negativo: "Nelle condizioni d'esame (decubito supino), conservata la fisiologica lordosi lombare.",
            reperti: [
              { id: "rettilineizzata", etichetta: "Lordosi rettilineizzata", riscritta: true, testo: "Nelle condizioni d'esame (decubito supino), rettilineizzata la fisiologica lordosi lombare." }
            ]
          },
          {
            id: "metameri", nome: "Metameri", riscritta: true,
            negativo: "Metameri vertebrali allineati, di normale aspetto RM.",
            reperti: [
              { id: "spondiloartrosi", etichetta: "Spondiloartrosi", riscritta: true, testo: "Metameri vertebrali allineati, con segni di spondiloartrosi e appuntimenti osteofitari margino-somatici." },
              { id: "transizione", etichetta: "Metamero di transizione", riscritta: true, modo: "aggiunge", testo: "Metamero di transizione al passaggio lombo-sacrale, per verosimile lombarizzazione di S1." },
              { id: "crollo", etichetta: "Crollo somatico", riscritta: true, modo: "aggiunge", testo: "Soma di ___ ridotto in altezza, deformato «a cuneo anteriore», ___ (senza/con) edema della spongiosa ossea." },
              { id: "emangioma", etichetta: "Emangioma vertebrale", riscritta: true, modo: "aggiunge", testo: "In ___, millimetrica e sfumata alterazione di segnale, iperintensa in T1 e T2, compatibile con emangioma." },
              { id: "modic", etichetta: "Alterazioni tipo Modic", riscritta: true, modo: "aggiunge", testo: "Fenomeni degenerativi margino-somatici in ___ ___ (Modic I: ipointensi in T1 e iperintensi in T2 / Modic II: iperintensi in T1 e T2 / Modic III: ipointensi in T1 e T2)." }
            ]
          },
          {
            id: "dischi", nome: "Dischi intersomatici", riscritta: true,
            negativo: "Dischi intersomatici di regolare morfologia e intensità di segnale.",
            reperti: [
              { id: "disidratazione", etichetta: "Disidratazione discale", riscritta: true, testo: "Dischi compresi tra ___ e ___ disomogeneamente ipointensi in T2, in rapporto a iniziali fenomeni disidratativo-degenerativi del nucleo polposo." }
            ]
          },
          {
            id: "protrusioni", nome: "Protrusioni ed ernie", riscritta: true,
            negativo: "Non protrusioni discali né segni di conflitto disco-radicolare o anomale compressioni sul sacco durale.",
            reperti: [
              { id: "bulging", etichetta: "Bulging (>50%)", riscritta: true, testo: "In ___, bulging discale improntante il sacco durale, con estensione in sede intraforaminale ___ e improntamento della radice emergente ___." },
              { id: "larga-base", etichetta: "Protrusione a larga base (25-50%)", riscritta: true, testo: "In ___, protrusione discale a larga base con estrinsecazione intraforaminale ___, ___ (senza/con) segni di conflitto disco-radicolare." },
              { id: "focale", etichetta: "Protrusione focale (<25%)", nuovo: true, testo: "In ___, protrusione discale focale ___ (mediana/paramediana ___/foraminale ___), improntante il sacco durale, con obliterazione del piano di clivaggio adiposo disco-radicolare ___.", conclusione: "Protrusione discale focale ___ in ___." },
              { id: "ernia", etichetta: "Ernia discale", nuovo: true, testo: "In ___, ernia discale ___ (contenuta/espulsa/migrata ___), con cancellazione del piano adiposo periradicolare e compressione della radice ___.", conclusione: "Ernia discale ___ in ___ con conflitto radicolare ___." },
              { id: "fissurazione", etichetta: "Fissurazione dell'anulus", nuovo: true, modo: "aggiunge", testo: "In ___, fissurazione dell'anulus fibroso posteriore." },
              { id: "osteofita", etichetta: "Osteofita foraminale", riscritta: true, modo: "aggiunge", testo: "In ___, concomitante osteofita postero-laterale ___, con riduzione in ampiezza del forame di coniugazione omolaterale." }
            ]
          },
          {
            id: "canale", nome: "Canale vertebrale", riscritta: true,
            negativo: "Diametro antero-posteriore del canale vertebrale conservato.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi del canale", riscritta: true, testo: "Stenosi marcata del canale vertebrale all'altezza di ___, con aspetto «a trifoglio», sostenuta da componente disco-legamentosa ipertrofica, soprattutto dei legamenti gialli.", conclusione: "Stenosi del canale vertebrale in ___." }
            ]
          },
          {
            id: "cono", nome: "Cono midollare", riscritta: true,
            negativo: "Cono midollare normalmente rappresentato a livello di D12-L1.",
            reperti: []
          },
          {
            id: "cauda", nome: "Cauda", riscritta: true,
            negativo: "Assenti alterazioni della regione della cauda.",
            reperti: []
          }
        ],
        conclusioneNegativa: "RM del rachide lombosacrale nei limiti della norma."
      },

      {
        id: "rachide-cervicale",
        nome: "Rachide cervicale",
        gruppo: "Rachide",
        titolo: "RM DEL RACHIDE CERVICALE",
        riscritta: true,
        tecnica: "Esame eseguito con sequenze T1, T2 e STIR sui piani sagittale e assiale.",
        organi: [
          {
            id: "curvatura", nome: "Lordosi", riscritta: true,
            negativo: "Nelle condizioni d'esame (decubito supino), conservata la fisiologica lordosi cervicale.",
            reperti: [
              { id: "rettilineizzata", etichetta: "Lordosi ridotta", riscritta: true, testo: "Nelle condizioni d'esame (decubito supino), ___ (ridotta/rettilineizzata) la fisiologica lordosi cervicale." }
            ]
          },
          {
            id: "metameri", nome: "Metameri", riscritta: true,
            negativo: "Metameri vertebrali allineati, di normale aspetto RM.",
            reperti: [
              { id: "spondiloartrosi", etichetta: "Spondiloartrosi", riscritta: true, testo: "Metameri vertebrali allineati, con discrete alterazioni spondilo-artrosiche." }
            ]
          },
          {
            id: "dischi", nome: "Dischi intersomatici", riscritta: true,
            negativo: "Dischi intersomatici di regolare morfologia e intensità di segnale.",
            reperti: []
          },
          {
            id: "protrusioni", nome: "Protrusioni ed ernie", riscritta: true,
            negativo: "Non protrusioni discali né segni di conflitto disco-radicolare o anomale compressioni sul sacco durale.",
            reperti: [
              { id: "debordo", etichetta: "Debordo discale trascurabile", riscritta: true, testo: "In ___, trascurabile debordo discale posteriore mediano, senza segni di conflitto disco-radicolare." },
              { id: "protrusione", etichetta: "Protrusione discale", riscritta: true, testo: "In ___, protrusione discale ___ (mediana/paramediana ___) improntante lo spazio perimidollare in sede antero-laterale, senza segni di conflitto disco-radicolare né compressione sulla superficie del midollo." },
              { id: "ernia", etichetta: "Ernia con conflitto", nuovo: true, testo: "In ___, ernia discale ___ (paramediana/foraminale ___), con estrinsecazione intraforaminale e conflitto con la radice emergente ___.", conclusione: "Ernia discale ___ in ___ con conflitto radicolare." }
            ]
          },
          {
            id: "canale", nome: "Canale vertebrale", riscritta: true,
            negativo: "Diametro antero-posteriore del canale vertebrale regolare.",
            reperti: []
          },
          {
            id: "midollo", nome: "Midollo spinale", riscritta: true,
            negativo: "Midollo spinale senza alterazioni di segnale focali né diffuse.",
            reperti: [
              { id: "mielopatia", etichetta: "Mielopatia compressiva", nuovo: true, testo: "Area di iperintensità di segnale in T2 nel midollo spinale a livello di ___, in corrispondenza della compressione discale, come per mielopatia compressiva.", conclusione: "Mielopatia compressiva a livello di ___." }
            ]
          },
          {
            id: "fossa-posteriore", nome: "Fossa cranica posteriore", riscritta: true,
            negativo: "Strutture della fossa cranica posteriore regolarmente rappresentate.",
            reperti: []
          }
        ],
        conclusioneNegativa: "RM del rachide cervicale nei limiti della norma."
      },

      {
        id: "ginocchio",
        nome: "Ginocchio",
        gruppo: "Muscolo-scheletrico",
        titolo: "RM DEL GINOCCHIO",
        nuovo: true,
        lati: ["destro", "sinistro"],
        intro: "Esame mirato al ginocchio {lato}.",
        tecnica: "Esame eseguito con sequenze SE T1, FSE T2, GRE T1 e STIR sui tre piani obliqui dello spazio, con apparecchiatura ___ (___ Tesla).",
        organi: [
          {
            id: "menischi", nome: "Menischi", riscritta: true,
            negativo: "Non alterazioni morfostrutturali e di segnale di entrambe le fibrocartilagini meniscali.",
            reperti: [
              { id: "lesione", etichetta: "Lesione meniscale", nuovo: true, testo: "Iperintensità lineare nel corno ___ del menisco ___, raggiungente la superficie articolare ___, come per lesione ___ (orizzontale/verticale/complessa).", conclusione: "Lesione del corno ___ del menisco ___." },
              { id: "degenerazione", etichetta: "Degenerazione meniscale", nuovo: true, testo: "Iperintensità intrameniscale globulare del corno ___ del menisco ___, senza estensione alla superficie articolare, come per degenerazione mucoide." }
            ]
          },
          {
            id: "legamenti", nome: "Legamenti e popliteo", riscritta: true,
            negativo: "Legamenti crociati, collaterali e tendine del popliteo senza alterazioni morfostrutturali e di segnale.",
            reperti: [
              { id: "lca", etichetta: "Lesione LCA", nuovo: true, testo: "Discontinuità delle fibre del legamento crociato anteriore, con iperintensità di segnale, come per lesione ___ (completa/parziale).", conclusione: "Lesione ___ del legamento crociato anteriore." },
              { id: "lcm", etichetta: "Distrazione LCM", nuovo: true, testo: "Ispessimento e iperintensità del legamento collaterale mediale, con edema dei tessuti periligamentosi, come per distrazione di grado ___.", conclusione: "Distrazione del legamento collaterale mediale." }
            ]
          },
          {
            id: "cartilagine", nome: "Cartilagine", riscritta: true,
            negativo: "Cartilagine di rivestimento articolare femoro-tibiale di spessore regolare.",
            reperti: [
              { id: "condropatia", etichetta: "Condropatia", nuovo: true, testo: "Assottigliamento della cartilagine di rivestimento articolare ___ (femoro-tibiale mediale/laterale/femoro-rotulea), con alterazioni di segnale dell'osso subcondrale ___.", conclusione: "Condropatia ___." }
            ]
          },
          {
            id: "osso", nome: "Osso", riscritta: true,
            negativo: "Nei livelli esaminati, non alterazioni del trofismo scheletrico.",
            reperti: [
              { id: "edema", etichetta: "Edema osseo (bone bruise)", nuovo: true, testo: "Area di edema della spongiosa ossea ___ (condilo femorale/piatto tibiale ___), iperintensa in STIR, come per contusione ossea.", conclusione: "Contusione ossea ___." }
            ]
          },
          {
            id: "rotula", nome: "Rotula",
            negativo: "Rotula in asse, con spessore cartilagineo regolare.",
            reperti: []
          },
          {
            id: "hoffa", nome: "Corpo di Hoffa",
            negativo: "Regolare aspetto RM del corpo di Hoffa.",
            reperti: []
          },
          {
            id: "versamento", nome: "Versamento", riscritta: true,
            negativo: "Non significativo versamento intrarticolare.",
            reperti: [
              { id: "versamento", etichetta: "Versamento", nuovo: true, testo: "Versamento intrarticolare ___ (modesto/abbondante), con distensione del recesso sovrapatellare.", conclusione: "Versamento articolare." },
              { id: "baker", etichetta: "Cisti di Baker", nuovo: true, modo: "aggiunge", testo: "Distensione fluida della borsa gastrocnemio-semimembranosa (cisti di Baker), di ___ x ___ mm.", conclusione: "Cisti di Baker." }
            ]
          }
        ],
        conclusioneNegativa: "RM del ginocchio nei limiti della norma."
      },

      {
        id: "caviglia",
        nome: "Caviglia",
        gruppo: "Muscolo-scheletrico",
        titolo: "RM DELLA CAVIGLIA",
        nuovo: true,
        lati: ["destra", "sinistra"],
        intro: "Esame mirato alla caviglia {lato}.",
        tecnica: "Esame eseguito con sequenze T1, T2 e STIR sui tre piani dello spazio, con protocollo dedicato allo studio della caviglia.",
        organi: [
          {
            id: "achille", nome: "Tendine d'Achille", riscritta: true,
            negativo: "Regolare il tendine achilleo e la sua inserzione sulla porzione calcaneare superiore.",
            reperti: [
              { id: "tendinopatia", etichetta: "Tendinopatia achillea", nuovo: true, testo: "Tendine achilleo ispessito, con iperintensità intratendinea ___ (preinserzionale/inserzionale), come per tendinopatia.", conclusione: "Tendinopatia achillea." }
            ]
          },
          {
            id: "fascia", nome: "Aponeurosi plantare", riscritta: true,
            negativo: "Regolare l'aponeurosi plantare e la sua inserzione calcaneare.",
            reperti: [
              { id: "fascite", etichetta: "Fascite plantare", nuovo: true, testo: "Aponeurosi plantare ispessita all'inserzione calcaneare, con edema dei tessuti perifasciali, come per fascite plantare.", conclusione: "Fascite plantare." }
            ]
          },
          {
            id: "legamenti", nome: "Legamenti", riscritta: true,
            negativo: "Non franche alterazioni delle strutture legamentose esaminate, in particolare dei comparti laterale e mediale di caviglia.",
            reperti: [
              { id: "paa", etichetta: "Lesione PAA", nuovo: true, testo: "Discontinuità delle fibre del legamento peroneo-astragalico anteriore, con edema periligamentoso, come per lesione ___ (parziale/completa).", conclusione: "Lesione del legamento peroneo-astragalico anteriore." }
            ]
          },
          {
            id: "versamento", nome: "Versamento", riscritta: true,
            negativo: "Assenti falde fluide intrarticolari, in particolare non significativo versamento tibio-astragalico.",
            reperti: [
              { id: "versamento", etichetta: "Versamento", nuovo: true, testo: "Versamento articolare tibio-astragalico ___." }
            ]
          },
          {
            id: "ossa", nome: "Segmenti scheletrici", riscritta: true,
            negativo: "Segmenti scheletrici compresi nel volume d'esame senza alterazioni di morfologia e di segnale, con regolari rapporti articolari.",
            reperti: [
              { id: "edema", etichetta: "Edema osseo", nuovo: true, testo: "Area di edema della spongiosa ossea ___ (astragalo/calcagno/malleolo ___), iperintensa in STIR, come per contusione ossea.", conclusione: "Contusione ossea ___." }
            ]
          }
        ],
        conclusioneNegativa: "RM della caviglia nei limiti della norma."
      },

      {
        id: "sacroiliache",
        nome: "Bacino (sacro-iliache)",
        gruppo: "Muscolo-scheletrico",
        titolo: "RM DEL BACINO (ARTICOLAZIONI SACRO-ILIACHE)",
        riscritta: true,
        tecnica: "Esame del bacino eseguito in condizioni basali, mirato alla valutazione delle articolazioni sacro-iliache.",
        organi: [
          {
            id: "sacroiliache", nome: "Articolazioni sacro-iliache", riscritta: true,
            negativo: "Non aree di ipersegnale nelle sequenze STIR da riferire a fenomeni flogistici in atto di entrambe le articolazioni sacro-iliache.",
            reperti: [
              { id: "sacroileite", etichetta: "Sacroileite attiva", nuovo: true, testo: "Edema della spongiosa ossea subcondrale ___ (iliaca/sacrale) dell'articolazione sacro-iliaca ___, iperintenso in STIR, come per sacroileite attiva.", conclusione: "Sacroileite attiva ___." }
            ]
          },
          {
            id: "coxofemorali", nome: "Coxo-femorali", riscritta: true,
            negativo: "Regolari i rapporti articolari coxo-femorali bilateralmente, con teste femorali normoconformate.",
            reperti: []
          },
          {
            id: "versamento", nome: "Versamento", riscritta: true,
            negativo: "Non versamento articolare coxo-femorale bilateralmente.",
            reperti: []
          },
          {
            id: "muscoli", nome: "Strutture muscolari",
            negativo: "Regolari le strutture muscolari perischeletriche incluse nel campo di vista.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non segni RM di sacroileite attiva."
      },

      {
        id: "colangio",
        nome: "Colangio-RM",
        gruppo: "Addome",
        titolo: "COLANGIO-RM",
        riscritta: true,
        tecnica: "Esame eseguito con sequenze SSh e B-TFE T2 pesate sul piano assiale e sequenze SSh e MRCP 2D e 3D T2 Fat Sat per lo studio delle vie biliari.",
        organi: [
          {
            id: "colecisti", nome: "Colecisti", riscritta: true,
            negativo: "Colecisti distesa, alitiasica.",
            reperti: [
              { id: "colecistectomia", etichetta: "Colecistectomia", riscritta: true, testo: "Esiti di colecistectomia." },
              { id: "calcoli", etichetta: "Calcoli della colecisti", nuovo: true, testo: "Colecisti distesa, con ___ difetti di segnale endoluminali di natura litiasica, il maggiore di ___ mm.", conclusione: "Colelitiasi." }
            ]
          },
          {
            id: "vie-biliari", nome: "Vie biliari", riscritta: true,
            negativo: "Vie biliari intra ed extraepatiche non dilatate; epatocoledoco di circa ___ mm.",
            reperti: [
              { id: "dilatazione", etichetta: "Dilatazione", nuovo: true, testo: "Dilatazione delle vie biliari intra ed extraepatiche; epatocoledoco di circa ___ mm.", conclusione: "Dilatazione delle vie biliari." }
            ]
          },
          {
            id: "litiasi", nome: "Difetti litiasici", riscritta: true,
            negativo: "Non difetti di segnale di natura litiasica delle vie biliari.",
            reperti: [
              { id: "coledocolitiasi", etichetta: "Coledocolitiasi", nuovo: true, testo: "Difetti di segnale endoluminali nel coledoco ___ (prossimale/medio/distale), il maggiore di ___ mm, come da coledocolitiasi.", conclusione: "Coledocolitiasi." }
            ]
          },
          {
            id: "fegato", nome: "Fegato",
            negativo: "Non alterazioni focali del parenchima epatico.",
            reperti: []
          },
          {
            id: "addome", nome: "Pancreas, milza, surreni, reni", riscritta: true,
            negativo: "Regolare morfologia e aspetto RM di pancreas, milza, surreni e reni nei segmenti esplorabili.",
            reperti: [
              { id: "ectasia-dotti", etichetta: "Ectasia dei dotti secondari", riscritta: true, modo: "aggiunge", testo: "Nel ___ del pancreas, millimetrica iperintensità di segnale di ___ mm, compatibile con ectasia dei dotti secondari." }
            ]
          },
          {
            id: "liquido", nome: "Liquido libero",
            negativo: "Non liquido libero nei recessi peritoneali esplorati.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Colangio-RM nei limiti della norma."
      }
    ]
  },
  /* ============================================================ RX
   * Frasi negative: dal documento «RX NEGATIVO STANDARD EL-DEA», riscritte nello stile
   * telegrafico (riscritta: true; senza flag se identiche all'originale).
   * DA VERIFICARE: reperti positivi e conclusioni marcati nuovo: true. */
  {
    id: "rx",
    nome: "RX",
    attiva: true,
    distretti: [
      {
        id: "torace",
        nome: "Torace (PA e LL)",
        gruppo: "Torace",
        titolo: "RX DEL TORACE IN DUE PROIEZIONI",
        riscritta: true,
        tecnica: "Esame eseguito nelle due proiezioni ortogonali in ortostatismo.",
        organi: [
          {
            id: "parenchima", nome: "Parenchima polmonare",
            negativo: "Non addensamenti parenchimali in atto.",
            reperti: [
              { id: "addensamento", etichetta: "Addensamento", nuovo: true, testo: "Addensamento parenchimale ___ (sede), di verosimile natura flogistica.", conclusione: "Addensamento parenchimale ___." },
              { id: "nodulo", etichetta: "Opacità nodulare", nuovo: true, testo: "Opacità nodulare di ___ mm al campo polmonare ___, meritevole di approfondimento con TC.", conclusione: "Opacità nodulare ___: utile TC." },
              { id: "stasi", etichetta: "Stasi del piccolo circolo", nuovo: true, testo: "Accentuazione della trama interstiziale e ridistribuzione del circolo verso i campi superiori, come per stasi del piccolo circolo.", conclusione: "Segni di stasi del piccolo circolo." },
              { id: "pnx", etichetta: "Pneumotorace", nuovo: true, testo: "Linea pleurica viscerale all'apice ___, senza trama polmonare periferica, come per pneumotorace.", conclusione: "Pneumotorace ___." }
            ]
          },
          {
            id: "pleura", nome: "Cavità pleuriche",
            negativo: "Cavità pleuriche libere da versamento.",
            reperti: [
              { id: "versamento", etichetta: "Versamento pleurico", nuovo: true, testo: "Obliterazione del seno costofrenico ___, come per falda di versamento pleurico.", conclusione: "Versamento pleurico ___." }
            ]
          },
          {
            id: "cuore", nome: "Immagine cardiaca",
            negativo: "Immagine cardiaca nei limiti di norma.",
            reperti: [
              { id: "ingrandita", etichetta: "Immagine cardiaca ingrandita", nuovo: true, testo: "Immagine cardiaca ingrandita (indice cardio-toracico ___).", conclusione: "Aumento dell'immagine cardiaca." }
            ]
          }
        ],
        conclusioneNegativa: "Non alterazioni pleuro-parenchimali in atto."
      },

      {
        id: "torace-letto",
        nome: "Torace al letto (AP)",
        gruppo: "Torace",
        titolo: "RX DEL TORACE AL LETTO",
        tecnica: "Esame eseguito in un'unica proiezione AP a paziente supino.",
        organi: [
          {
            id: "parenchima", nome: "Parenchima e PNX",
            negativo: "Non addensamenti parenchimali né evidenti falde di PNX.",
            reperti: [
              { id: "addensamento", etichetta: "Addensamento", nuovo: true, testo: "Addensamento parenchimale ___ (sede); non evidenti falde di PNX.", conclusione: "Addensamento parenchimale ___." },
              { id: "pnx", etichetta: "Pneumotorace", nuovo: true, testo: "Non addensamenti parenchimali; falda di PNX ___ (sede).", conclusione: "Pneumotorace ___." }
            ]
          },
          {
            id: "pleura", nome: "Versamento pleurico",
            negativo: "Non versamenti pleurici.",
            reperti: [
              { id: "versamento", etichetta: "Versamento pleurico", nuovo: true, testo: "Velatura ___ dell'emitorace ___, come per versamento pleurico in decubito supino.", conclusione: "Versamento pleurico ___." }
            ]
          },
          {
            id: "circolo", nome: "Circolo polmonare",
            negativo: "Regolare la distribuzione del circolo polmonare.",
            reperti: []
          },
          {
            id: "cuore", nome: "Ombra cardiaca", riscritta: true,
            negativo: "Compatibilmente con il decubito supino, ombra cardiaca apparentemente ingrandita.",
            reperti: []
          },
          {
            id: "presidi", nome: "Presidi ed esiti chirurgici", negativo: "",
            reperti: [
              { id: "sternotomia", etichetta: "Sternotomia e plastica mitralica", testo: "Esiti di sternotomia e di plastica valvolare mitralica." },
              { id: "clips", etichetta: "Clips mediastiniche", testo: "Presenza di clips chirurgiche mediastiniche." },
              { id: "tubo", etichetta: "Tubo endotracheale", riscritta: true, testo: "Presenza di tubo endotracheale con apice localizzato a circa ___ cm dalla carena." },
              { id: "drenaggi", etichetta: "Drenaggi toraco-mediastinici", testo: "Presenza di drenaggi toraco-mediastinici." },
              { id: "cvc", etichetta: "CVC giugulare", riscritta: true, testo: "Presenza di CVC giugulare ___ con apice localizzato proiettivamente alla giunzione cavo-atriale." },
              { id: "swan-ganz", etichetta: "Catetere di Swan-Ganz", riscritta: true, testo: "Presenza di catetere di Swan-Ganz con accesso giugulare ___ ed estremo localizzato proiettivamente a livello ___." },
              { id: "contropulsatore", etichetta: "Contropulsatore aortico", testo: "Presenza di contropulsatore aortico con estremo distale proiettivamente al II arco cardiaco di sinistra." },
              { id: "sng", etichetta: "Sondino naso-gastrico", testo: "Presenza di SNG con estremo distale in epigastrio." }
            ]
          }
        ],
        conclusioneNegativa: "Non addensamenti parenchimali né falde di PNX."
      },

      {
        id: "addome",
        nome: "Addome diretto",
        gruppo: "Addome",
        titolo: "RX DIRETTA DELL'ADDOME",
        riscritta: true,
        tecnica: "Esame eseguito in proiezione frontale ___ (in ortostatismo/e tangenziale/a paziente supino).",
        organi: [
          {
            id: "livelli", nome: "Livelli idroaerei",
            negativo: "Non significativi livelli idroaerei.",
            reperti: [
              { id: "occlusione", etichetta: "Quadro occlusivo", nuovo: true, testo: "Multipli livelli idroaerei ___ (tenuali/colici), con distensione delle anse fino a ___ mm, come per quadro ___ (occlusivo/subocclusivo).", conclusione: "Quadro radiologico ___ (occlusivo/subocclusivo)." }
            ]
          },
          {
            id: "aria-libera", nome: "Aria libera",
            negativo: "Non evidenti falde aeree libere sottodiaframmatiche.",
            reperti: [
              { id: "pneumoperitoneo", etichetta: "Pneumoperitoneo", nuovo: true, testo: "Falda aerea libera sottodiaframmatica ___, come da pneumoperitoneo.", conclusione: "Pneumoperitoneo." }
            ]
          },
          {
            id: "anse", nome: "Distensione delle anse",
            negativo: "Normale distensione delle anse intestinali.",
            reperti: []
          },
          {
            id: "vie-urinarie", nome: "Vie urinarie (quesito litiasi)", negativo: "",
            reperti: [
              { id: "negativo-litiasi", etichetta: "Negativo per litiasi", riscritta: true, testo: "Non evidenti radiopacità lungo il decorso delle vie urinarie da riferire a sicuri segni di litiasi calcifica." },
              { id: "litiasi", etichetta: "Radiopacità sospetta", nuovo: true, testo: "Radiopacità di ___ mm proiettivamente ___ (all'area renale/al decorso ureterale ___), sospetta per litiasi calcifica.", conclusione: "Radiopacità sospetta per litiasi ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di occlusione né di pneumoperitoneo."
      },

      {
        id: "rachide-cervicale",
        nome: "Rachide cervicale",
        gruppo: "Rachide",
        titolo: "RX DEL RACHIDE CERVICALE",
        riscritta: true,
        tecnica: "Esame eseguito nelle proiezioni standard A-P e L-L ___ (integrate da oblique/transorale).",
        organi: [
          {
            id: "visualizzazione", nome: "Visualizzazione",
            negativo: "Rachide cervicale indagabile in proiezione L-L sino al soma di C7.",
            reperti: []
          },
          {
            id: "lordosi", nome: "Lordosi",
            negativo: "Conservata la fisiologica lordosi cervicale.",
            reperti: [
              { id: "rettilineizzazione", etichetta: "Rettilineizzazione", nuovo: true, testo: "Rettilineizzazione della fisiologica lordosi cervicale." }
            ]
          },
          {
            id: "muri", nome: "Muri somatici posteriori",
            negativo: "Muri somatici posteriori in asse.",
            reperti: []
          },
          {
            id: "spazi", nome: "Spazi intersomatici",
            negativo: "Spazi intersomatici di regolare ampiezza.",
            reperti: [
              { id: "spondiloartrosi", etichetta: "Spondiloartrosi", nuovo: true, testo: "Riduzione in ampiezza degli spazi intersomatici ___, con osteofitosi margino-somatica, come per spondiloartrosi.", conclusione: "Spondiloartrosi cervicale." }
            ]
          },
          {
            id: "altezza", nome: "Altezza dei somi",
            negativo: "Regolare l'altezza dei muri somatici.",
            reperti: []
          },
          {
            id: "forami", nome: "Forami di coniugazione",
            negativo: "Pervi i forami di coniugazione cervicali bilateralmente.",
            reperti: []
          },
          {
            id: "fratture", nome: "Fratture",
            negativo: "Non evidenti segni radiologici da riferire a rime fratturative ossee.",
            reperti: [
              { id: "frattura", etichetta: "Frattura", nuovo: true, testo: "Rima di frattura ___ (composta/scomposta) a carico di ___.", conclusione: "Frattura ___ di ___: utile TC." }
            ]
          },
          {
            id: "consiglio", nome: "Consiglio TC", negativo: "",
            reperti: [
              { id: "tc", etichetta: "Consiglio TC (trauma maggiore)", riscritta: true, testo: "In caso di trauma «maggiore», clinica significativa o fattori di rischio rilevanti, consigliato approfondimento con TC del rachide cervicale." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di lesioni traumatiche del rachide cervicale."
      },

      {
        id: "rachide-dorsale",
        nome: "Rachide dorsale",
        gruppo: "Rachide",
        titolo: "RX DEL RACHIDE DORSALE",
        tecnica: "Esame eseguito nelle proiezioni standard A-P e L-L.",
        organi: [
          {
            id: "visualizzazione", nome: "Visualizzazione", negativo: "",
            reperti: [
              { id: "somi-prossimali", etichetta: "Somi prossimali mal visualizzabili", testo: "Mal visualizzabili i somi dorsali prossimali per la sovrapposizione con gli altri segmenti ossei." }
            ]
          },
          {
            id: "cifosi", nome: "Cifosi",
            negativo: "Conservata la fisiologica cifosi dorsale.",
            reperti: [
              { id: "accentuata", etichetta: "Cifosi accentuata", nuovo: true, testo: "Accentuazione della fisiologica cifosi dorsale." }
            ]
          },
          {
            id: "muri", nome: "Muri somatici posteriori",
            negativo: "Muri somatici posteriori in asse.",
            reperti: []
          },
          {
            id: "fratture", nome: "Fratture",
            negativo: "Non evidenti segni radiologici da riferire a rime fratturative ossee.",
            reperti: [
              { id: "crollo", etichetta: "Crollo vertebrale", nuovo: true, testo: "Riduzione in altezza del soma di ___ con deformazione a cuneo anteriore, di verosimile natura ___ (osteoporotica/post-traumatica).", conclusione: "Crollo vertebrale di ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di lesioni traumatiche del rachide dorsale."
      },

      {
        id: "rachide-lombosacrale",
        nome: "Rachide lombosacrale",
        gruppo: "Rachide",
        titolo: "RX DEL RACHIDE LOMBOSACRALE",
        tecnica: "Esame eseguito nelle proiezioni standard A-P e L-L.",
        organi: [
          {
            id: "lordosi", nome: "Lordosi",
            negativo: "Conservata la fisiologica lordosi lombosacrale.",
            reperti: [
              { id: "rettilineizzazione", etichetta: "Rettilineizzazione", nuovo: true, testo: "Rettilineizzazione della fisiologica lordosi lombosacrale." }
            ]
          },
          {
            id: "muri", nome: "Muri somatici posteriori",
            negativo: "Muri somatici posteriori in asse.",
            reperti: [
              { id: "listesi", etichetta: "Listesi", nuovo: true, testo: "___ (Antero/Retro)listesi di ___ su ___ di grado ___ secondo Meyerding.", conclusione: "Listesi di ___ su ___." }
            ]
          },
          {
            id: "artrosi", nome: "Spondiloartrosi", negativo: "",
            reperti: [
              { id: "spondiloartrosi", etichetta: "Spondiloartrosi", nuovo: true, testo: "Segni di spondiloartrosi, con osteofitosi margino-somatica e riduzione in ampiezza degli spazi intersomatici ___.", conclusione: "Spondiloartrosi lombare." }
            ]
          },
          {
            id: "fratture", nome: "Fratture",
            negativo: "Non evidenti segni radiologici da riferire a rime fratturative ossee.",
            reperti: [
              { id: "crollo", etichetta: "Crollo vertebrale", nuovo: true, testo: "Riduzione in altezza del soma di ___ con deformazione a cuneo anteriore, di verosimile natura ___ (osteoporotica/post-traumatica).", conclusione: "Crollo vertebrale di ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di lesioni traumatiche del rachide lombosacrale."
      },

      {
        id: "bacino",
        nome: "Bacino",
        gruppo: "Scheletro",
        titolo: "RX DEL BACINO",
        tecnica: "Esame eseguito in unica proiezione A-P.",
        organi: [
          {
            id: "teste-femorali", nome: "Teste femorali",
            negativo: "Normoconformate le teste femorali.",
            reperti: [
              { id: "geodi", etichetta: "Ovalizzazione con geodi", riscritta: true, testo: "Ovalizzazione delle teste femorali, con alcune areole radiotrasparenti di verosimile natura geodica." }
            ]
          },
          {
            id: "acetaboli", nome: "Tetti acetabolari",
            negativo: "Regolari i tetti acetabolari.",
            reperti: [
              { id: "sclerosi", etichetta: "Sclerosi acetabolare", riscritta: true, testo: "Sclerosi dei tetti acetabolari con appuntimento dei cigli cotiloidei." }
            ]
          },
          {
            id: "interlinea", nome: "Interlinea coxo-femorale", riscritta: true,
            negativo: "Conservata l'interlinea articolare coxo-femorale.",
            reperti: [
              { id: "ridotta", etichetta: "Interlinea ridotta", riscritta: true, testo: "Ridotta l'interlinea articolare coxo-femorale ___." }
            ]
          },
          {
            id: "sacroiliache", nome: "Sacro-iliache e sinfisi",
            negativo: "Regolari le sincondrosi sacro-iliache e la sinfisi pubica.",
            reperti: []
          },
          {
            id: "fratture", nome: "Fratture", riscritta: true,
            negativo: "Non evidenti rime di frattura.",
            reperti: [
              { id: "femore-prossimale", etichetta: "Frattura femore prossimale", nuovo: true, testo: "Rima di frattura ___ (sottocapitata/mediocervicale/basicervicale/pertrocanterica) del femore ___, ___ (composta/scomposta).", conclusione: "Frattura ___ del femore ___." },
              { id: "branche", etichetta: "Frattura branche pubiche", nuovo: true, testo: "Rima di frattura della branca ___ (ileo/ischio)-pubica ___.", conclusione: "Frattura della branca ___ pubica ___." }
            ]
          },
          {
            id: "tessuti-molli", nome: "Tessuti molli", negativo: "",
            reperti: [
              { id: "calcificazioni", etichetta: "Calcificazioni dei tessuti molli", riscritta: true, testo: "Calcificazioni dei tessuti molli in corrispondenza di ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di lesioni traumatiche del bacino."
      },

      {
        id: "segmento-osseo",
        nome: "Segmento osseo (trauma)",
        gruppo: "Scheletro",
        titolo: "RX DEL SEGMENTO ___",
        riscritta: true,
        intro: "Esame eseguito in regime di urgenza.",
        organi: [
          {
            id: "fratture", nome: "Fratture", riscritta: true,
            negativo: "Nei radiogrammi eseguiti, non evidenti rime fratturative ossee apprezzabili con la metodica.",
            reperti: [
              { id: "frattura", etichetta: "Frattura", nuovo: true, testo: "Rima di frattura ___ (composta/scomposta) a carico di ___.", conclusione: "Frattura ___ di ___." },
              { id: "controllo", etichetta: "Controllo frattura trattata", riscritta: true, testo: "Rispetto al precedente esame RX analogo del ___, buona composizione del focolaio di frattura trattato con mezzi di sintesi metallica e sotto tutela gessata.\nIniziale reazione osteoriparativa." }
            ]
          },
          {
            id: "articolazioni", nome: "Rapporti articolari", riscritta: true,
            negativo: "Conservati i rapporti articolari.",
            reperti: [
              { id: "lussazione", etichetta: "Lussazione", nuovo: true, testo: "Perdita dei rapporti articolari ___, come per lussazione ___.", conclusione: "Lussazione ___." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni radiologici di fratture."
      },

      {
        id: "emicostato",
        nome: "Emicostato",
        gruppo: "Torace",
        titolo: "RX DELL'EMICOSTATO",
        organi: [
          {
            id: "fratture", nome: "Fratture costali", riscritta: true,
            negativo: "Nei radiogrammi eseguiti, non evidenti segni radiologici da riferire a fratture costali scomposte in atto.",
            reperti: [
              { id: "frattura", etichetta: "Frattura costale", nuovo: true, testo: "Rima di frattura ___ (composta/scomposta) dell'arco ___ della ___ costa ___.", conclusione: "Frattura costale ___." }
            ]
          },
          {
            id: "consiglio", nome: "Consiglio",
            negativo: "Al persistere della sintomatologia algica utile riesecuzione dell'indagine.",
            reperti: []
          }
        ],
        conclusioneNegativa: "Non segni radiologici di fratture costali scomposte."
      }
    ]
  }
];
