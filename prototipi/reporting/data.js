/*
 * data.js — libreria dei referti nello stile del Dr. Susino.
 *
 * FONTE: i testi provengono dal documento "Referti Dott. Susino" (Google Drive,
 * cartella "Referti predefiniti ECOGRAFIA") e dai modelli di RefertEco.
 * Sono stati tolti i nomi propri e i valori numerici dei singoli casi,
 * sostituiti con ___ da completare.
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

const LINGUE = { it: "Italiano" };

/* Frasi comuni a tutti i distretti: in testa e in coda al referto */
const FRASI_COMUNI = {
  premessa: [
    { id: "quesito", etichetta: "Quesito clinico", testo: "Quesito clinico: ___." },
    { id: "precedente", etichetta: "Confronto con esame precedente", testo: "Si prende in visione il precedente esame del ___ eseguito presso altra Sede." },
    { id: "controlato", etichetta: "In comparazione con il controlato", testo: "Esame eseguito in comparazione con il controlato." },
    { id: "urgenza", etichetta: "Regime d'urgenza", testo: "Esame eseguito in regime d'urgenza." }
  ],
  chiusura: [
    { id: "controllo", etichetta: "Controllo a distanza", testo: "Si consiglia controllo ecografico a distanza di ___ mesi." },
    { id: "specialistica", etichetta: "Valutazione specialistica", testo: "Utile valutazione specialistica." },
    { id: "laboratorio", etichetta: "Esami di laboratorio", testo: "Utile integrazione con esami laboratoristici e valutazione clinico-specialistica." },
    { id: "persistere", etichetta: "Rivalutazione se persiste", testo: "Al persistere della sintomatologia utile rivalutazione clinico-strumentale." },
    { id: "followup", etichetta: "Follow-up", testo: "Si indica follow-up clinico-strumentale." },
    { id: "approfondimento", etichetta: "Approfondimento TC/RM/RX", testo: "Utile approfondimento diagnostico con esame ___ (TC/RM/RX)." }
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
              { id: "habitus", etichetta: "Limitato da habitus / collaborazione", testo: "Esame tecnicamente limitato dalla scarsa collaborazione del paziente e dall'habitus del paziente, e per la sovrapposizione di marcato meteorismo intestinale." }
            ]
          },
          {
            id: "fegato", nome: "Fegato",
            negativo: "Fegato di dimensioni nei limiti della norma, con margini regolari, ecostruttura omogenea e indenne da lesioni focali US risolvibili.",
            reperti: [
              { id: "steatosi", etichetta: "Steatosi", testo: "Il fegato appare ad ecostruttura iperriflettente come si osserva nei quadri di steatosi epatica, ha dimensioni ___ (nei limiti della norma/aumentate) ed è indenne da lesioni focali US risolvibili.", conclusione: "Steatosi epatica." },
              { id: "parziale", etichetta: "Esplorabile parzialmente", testo: "Il fegato, esplorabile parzialmente, pare presentare dimensioni ai limiti superiori della norma, margini lievemente bozzuti ed ecogenicità diffusamente aumentata, apparentemente privo di lesioni focali." },
              { id: "angioma", etichetta: "Angioma", testo: "Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.\nAl ___ segmento, in sede ___, presenza di focalità debolmente iperecogena di ___ mm, in prima ipotesi compatibile con angioma. Non si rilevano ulteriori evidenti lesioni focali.", conclusione: "Focalità epatica in prima ipotesi angiomatosa." },
              { id: "angioma-noto", etichetta: "Angioma noto (invariato)", testo: "Nel ___ segmento epatico si conferma la nota formazione iperecogena a margini polilobati, delle dimensioni massime di ___ x ___ mm, da riferire in prima ipotesi ad angioma. Non si rilevano ulteriori evidenti lesioni focali." },
              { id: "cisti", etichetta: "Cisti epatica", testo: "Fegato di dimensioni nei limiti della norma, con margini regolari ed ecostruttura omogenea.\nAl ___ segmento si documenta formazione anecogena a margini netti di ___ mm, a contenuto omogeneo, priva di setti interni e componente solida, di tipo cistico semplice.", conclusione: "Cisti epatica semplice." },
              { id: "solida", etichetta: "Formazione solida", testo: "Al ___ segmento epatico si documenta formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm. Al color-Doppler si documenta/non si documenta vascolarizzazione interna. Si consiglia correlazione clinica e approfondimento diagnostico.", conclusione: "Formazione epatica solida meritevole di approfondimento diagnostico." },
              { id: "secondarismi", etichetta: "Secondarismi", testo: "L'ecostruttura epatica è sovvertita per la presenza di plurime lesioni focali, variabili per aspetto e dimensioni, compatibili con secondarismi. Utile approfondimento diagnostico con esame TC.", conclusione: "Lesioni focali epatiche multiple compatibili con secondarismi." },
              { id: "cirrosi", etichetta: "Epatopatia cronica", nuovo: true, testo: "Fegato di dimensioni ___, con margini bozzuti ed ecostruttura grossolanamente disomogenea, come si osserva nei quadri di epatopatia cronica. Non evidenti lesioni focali US risolvibili.", conclusione: "Quadro ecografico di epatopatia cronica." }
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
              { id: "concrezioni", etichetta: "Minute concrezioni", testo: "La colecisti nel proprio lume presenta alcune minute concrezioni calcifiche.", conclusione: "Microlitiasi della colecisti." },
              { id: "polipo", etichetta: "Polipo", testo: "Lungo il profilo ___ del corpo colecistico aggetta nel lume una formazione di aspetto polipoide di ___ mm, meritevole di controllo ecografico a distanza di circa 4 - 6 mesi in considerazione del primo riscontro.", conclusione: "Formazione polipoide della colecisti." },
              { id: "colecistite", etichetta: "Colecistite acuta", nuovo: true, testo: "Colecisti distesa, con pareti ispessite (___ mm) e stratificate, con formazione litiasica incuneata nel collo e segno di Murphy ecografico positivo, come si osserva nei quadri di colecistite acuta.", conclusione: "Quadro ecografico compatibile con colecistite acuta: utile valutazione chirurgica." },
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
              { id: "accessoria", etichetta: "Milza accessoria", nuovo: true, testo: "Milza nei limiti morfo-volumetrici. All'ilo splenico si riconosce piccola formazione rotondeggiante isoecogena al parenchima splenico di ___ mm, compatibile con milza accessoria." }
            ]
          },
          {
            id: "reni", nome: "Reni",
            negativo: "Reni in sede, di dimensioni nei limiti della norma, con regolare spessore parenchimale e buona differenziazione cortico-midollare.",
            reperti: [
              { id: "cisti", etichetta: "Cisti renale", modo: "aggiunge", testo: "Al polo ___ del rene ___ si documenta una formazione ipoanecogena, con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm.", conclusione: "Cisti renale." },
              { id: "cisti-multiple", etichetta: "Cisti renali bilaterali", modo: "aggiunge", testo: "A livello dei reni si documentano alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___ di circa ___ mm.", conclusione: "Cisti renali bilaterali." },
              { id: "cisti-note", etichetta: "Cisti note invariate", modo: "aggiunge", testo: "Sono invariate le note cisti corticali renali in sede bilaterale, la maggiore sita al polo ___ di ___ del diametro massimo di circa ___ mm." },
              { id: "nefropatia", etichetta: "Nefropatia cronica", nuovo: true, testo: "Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come si osserva nei quadri di nefropatia cronica.", conclusione: "Segni ecografici di nefropatia cronica." }
            ]
          },
          {
            id: "vie-urinarie", nome: "Cavità calico-pieliche e calcoli",
            negativo: "Cavità calico-pieliche non dilatate. Non evidenti segni di nefrolitiasi.",
            reperti: [
              { id: "calcoli-dx", etichetta: "Calcoli rene destro", testo: "A destra si visualizzano ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi destra." },
              { id: "calcoli-sx", etichetta: "Calcoli rene sinistro", testo: "A sinistra si visualizzano ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; non sono dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi sinistra." },
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
              { id: "sedimento", etichetta: "Sedimento ematico", testo: "Vescica ben distesa nel cui lume si apprezza abbondante sedimento ematico; tale limite non consente un'adeguata valutazione delle pareti e pertanto si rimanda a valutazione specialistica." },
              { id: "sovradistesa", etichetta: "Sovradistesa", testo: "La vescica è sovradistesa con pareti sottili e lume libero; tale condizione non permette la valutazione della loggia prostatica." },
              { id: "vuota", etichetta: "Vuota", testo: "Vescica vuota: organi pelvici non valutabili." },
              { id: "pareti", etichetta: "Pareti ispessite", nuovo: true, testo: "Vescica distesa, con pareti diffusamente ispessite e trabecolate, come si osserva nei quadri di vescica da sforzo." },
              { id: "aggetto", etichetta: "Lesione aggettante", nuovo: true, testo: "Vescica distesa; lungo la parete ___ si documenta formazione aggettante nel lume di ___ mm, meritevole di approfondimento specialistico urologico.", conclusione: "Lesione vegetante vescicale meritevole di approfondimento urologico." }
            ]
          },
          {
            id: "prostata", nome: "Prostata", negativo: "",
            reperti: [
              { id: "ipertrofica", etichetta: "Ipertrofica con lobo medio", testo: "La prostata esplorata per via sovrapubica, ha ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; il lobo medio impronta la base vescicale; volume di circa ___ cc.", conclusione: "Ipertrofia prostatica." },
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
            negativo: "Non falde fluide nei recessi peritoneali esplorati.",
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
            negativo: "Non si osservano alterazioni ecostrutturali da riferire alla natura post-traumatica a carico di fegato, milza, reni.",
            reperti: [
              { id: "lesione", etichetta: "Sospetta lesione traumatica", nuovo: true, testo: "A carico di ___ si documenta area disomogenea di ___ mm, sospetta per lesione post-traumatica; utile approfondimento diagnostico con esame TC.", conclusione: "Sospetta lesione post-traumatica di ___: utile TC." }
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
              { id: "cisti", etichetta: "Cisti renale", modo: "aggiunge", testo: "Al polo ___ del rene ___ si documenta una formazione ipoanecogena, con debole rinforzo di parete posteriore, compatibile con cisti delle dimensioni massime di ___ mm.", conclusione: "Cisti renale." },
              { id: "cisti-multiple", etichetta: "Cisti renali bilaterali", modo: "aggiunge", testo: "A livello dei reni si documentano alcune formazioni cistiche bilaterali, la maggiore ___ (sepimentata) al terzo ___ di ___ di circa ___ mm.", conclusione: "Cisti renali bilaterali." },
              { id: "nefropatia", etichetta: "Nefropatia cronica", nuovo: true, testo: "Reni in sede, di dimensioni ___, con assottigliamento del parenchima e ridotta differenziazione cortico-midollare, come si osserva nei quadri di nefropatia cronica.", conclusione: "Segni ecografici di nefropatia cronica." }
            ]
          },
          {
            id: "vie-urinarie", nome: "Cavità calico-pieliche e calcoli",
            negativo: "Cavità calico-pieliche non dilatate. Non evidenti segni di nefrolitiasi.",
            reperti: [
              { id: "calcoli-dx", etichetta: "Calcoli rene destro", testo: "A destra si visualizzano ___ formazioni iperecogene con debole cono d'ombra posteriore, la maggiore nei calici ___ con diametro massimo di ___ mm; non dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi destra." },
              { id: "calcoli-sx", etichetta: "Calcoli rene sinistro", testo: "A sinistra si visualizzano ___ formazioni iperecogene caliceali compatibili con la natura litiasica, la maggiore di ___ mm in un calice ___; non sono dilatate le cavità calico-pieliche.", conclusione: "Nefrolitiasi sinistra." },
              { id: "idronefrosi", etichetta: "Dilatazione cavità (idronefrosi)", nuovo: true, testo: "Dilatazione delle cavità calico-pieliche del rene ___ di grado ___ (lieve/moderato/marcato).", conclusione: "Idronefrosi ___." }
            ]
          },
          {
            id: "vescica", nome: "Vescica",
            negativo: "Vescica distesa, con pareti regolari, indenne da evidenti lesioni aggettanti nel lume.",
            reperti: [
              { id: "sedimento", etichetta: "Sedimento ematico", testo: "Vescica ben distesa nel cui lume si apprezza abbondante sedimento ematico; tale limite non consente un'adeguata valutazione delle pareti e pertanto si rimanda a valutazione specialistica." },
              { id: "sovradistesa", etichetta: "Sovradistesa", testo: "La vescica è sovradistesa con pareti sottili e lume libero; tale condizione non permette la valutazione della loggia prostatica." },
              { id: "pareti", etichetta: "Pareti ispessite", nuovo: true, testo: "Vescica distesa, con pareti diffusamente ispessite e trabecolate, come si osserva nei quadri di vescica da sforzo." },
              { id: "residuo", etichetta: "Residuo post-minzionale", nuovo: true, testo: "Dopo minzione si documenta residuo vescicale di circa ___ cc." }
            ]
          },
          {
            id: "prostata", nome: "Prostata", negativo: "",
            reperti: [
              { id: "ipertrofica", etichetta: "Ipertrofica con lobo medio", testo: "La prostata esplorata per via sovrapubica, ha ecostruttura disomogenea per la presenza di millimetriche calcificazioni intraghiandolari; il lobo medio impronta la base vescicale; volume di circa ___ cc.\nVescica con pareti regolari, senza aggetti endoluminali, improntata sul pavimento dalla prostata ipertrofica.", conclusione: "Ipertrofia prostatica." },
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
        titolo: "ECOGRAFIA DELLA TIROIDE",
        organi: [
          {
            id: "dimensioni", nome: "Dimensioni",
            negativo: "Tiroide in sede, di dimensioni ai limiti della norma (diametro a-p del lobo destro di ___ mm; diametro a-p del lobo sinistro di ___ mm; istmo non ispessito).",
            reperti: [
              { id: "ingrandita", etichetta: "Ingrandita", testo: "Ghiandola tiroide ingrandita, con diametro AP del lobo destro di ___ mm e del lobo sinistro di ___ mm; margini della tiroide bozzuti.", conclusione: "Tiroide aumentata di volume." },
              { id: "limiti-superiori", etichetta: "Ai limiti superiori", testo: "Tiroide in sede, di dimensioni nei limiti superiori, con diametro AP del lobo destro di ___ mm e del sinistro di ___ mm, con istmo non ispessito." },
              { id: "lobo-dx", etichetta: "Ingrandimento di un lobo", testo: "Tiroide in sede, con ingrandimento del lobo ___ che mostra diametro AP massimo di ___ mm, e normali spessore e dimensioni di istmo e lobo controlaterale." },
              { id: "intratoracica", etichetta: "Impegno intratoracico", testo: "Tiroide in sede, di dimensioni diffusamente aumentate su tutto l'ambito, solo parzialmente esplorabile per impegno intratoracico caudalmente.", conclusione: "Gozzo con impegno intratoracico." },
              { id: "ridotta", etichetta: "Ridotta", testo: "Tiroide in sede, di dimensioni ridotte con diametro AP massimo di ___ mm a destra e ___ mm a sinistra." },
              { id: "tiroidectomia", etichetta: "Esiti di tiroidectomia", testo: "In esiti di tiroidectomia ___ (totale/parziale) non lesioni espansive nelle logge tiroidee." }
            ]
          },
          {
            id: "trachea", nome: "Trachea",
            negativo: "Trachea in asse.",
            reperti: [
              { id: "deviata", etichetta: "Deviata", testo: "Trachea lievemente deviata verso ___." }
            ]
          },
          {
            id: "ecostruttura", nome: "Ecostruttura e noduli",
            negativo: "L'ecostruttura ghiandolare è omogenea in assenza di formazioni nodulari.",
            reperti: [
              { id: "tiroidite", etichetta: "Tiroidite cronica", testo: "L'ecostruttura ghiandolare è disomogenea per la presenza di multiple formazioni ipoecogene confluenti, come si osserva nei quadri tiroiditici cronici.", conclusione: "Quadro ecografico di tiroidite cronica." },
              { id: "tiroidite-esiti", etichetta: "Tiroidite in esiti (fibrotica)", testo: "Ecostruttura sovvertita completamente e diffusamente ipoecogena e con strie iperecogene fibrotiche contestuali, come nei casi di tiroidite in esiti.\nNon franche nodularità.", conclusione: "Tiroidite in esiti." },
              { id: "nodulo", etichetta: "Nodulo singolo", testo: "Nel contesto del lobo ___ si apprezza nodulo ad ecostruttura ___ (iso/ipo/iperecogena), delle dimensioni massime di ___ x ___ mm, caratterizzato da vascolarizzazione ___ (perilesionale/intralesionale/mista) al color-Doppler.\nNon franche nodularità nel lobo controlaterale.", conclusione: "Nodulo tiroideo del lobo ___." },
              { id: "nodulo-orletto", etichetta: "Noduli con orletto", testo: "Presenza di noduli isoecogeni, con orletto ipoecogeno, del diametro massimo di ___ mm.\nAll'esame color-Doppler tali formazioni presentano una vascolarizzazione prevalentemente periferica." },
              { id: "multinodulare", etichetta: "Multinodulare", testo: "L'ecostruttura è sovvertita dalla presenza di numerose formazioni nodulari di differenti dimensioni ed ecostruttura prevalentemente mista, disomogeneamente ipo-isoecogena e con aree colloidocistiche contestuali, caratterizzate da vascolarizzazione mista, prevalentemente perilesionale.\nIl nodulo maggiore è sito al terzo ___ del lobo ___ e mostra dimensioni di ___ x ___ mm.", conclusione: "Tiroide multinodulare." },
              { id: "calcifico", etichetta: "Nodulo calcifico", testo: "Grossolana formazione nodulare parzialmente calcifica del diametro massimo longitudinale di ___ mm, al terzo ___ di ___." },
              { id: "conglomerato", etichetta: "Conglomerato pseudonodulare", testo: "Nel contesto del lobo ___ si apprezzano multiple aree pseudonodulari confluenti, a margini mal delimitabili, ad ecostruttura disomogeneamente iso-ipoecogena, costituenti un simil conglomerato di ___ x ___ mm sul piano trasversale e ___ mm sul piano longitudinale, disomogeneamente vascolarizzati." },
              { id: "lobo-occupato", etichetta: "Lobo occupato da nodulo", testo: "Il lobo ___ è sostanzialmente occupato in toto da una grossolana formazione nodulare ovalare, ben circoscritta, prevalentemente isoecogena e con alcune piccole componenti anecogene liquide contestuali, delle dimensioni massime assiali di ___ x ___ mm, caratterizzata da vascolarizzazione mista." }
            ]
          },
          {
            id: "vascolarizzazione", nome: "Vascolarizzazione",
            negativo: "La vascolarizzazione ghiandolare non è aumentata.",
            reperti: [
              { id: "aumentata", etichetta: "Aumentata", nuovo: true, testo: "La vascolarizzazione ghiandolare appare diffusamente aumentata all'integrazione con color-Doppler." }
            ]
          },
          {
            id: "linfonodi", nome: "Linfonodi laterocervicali",
            negativo: "Non si osservano linfoadenopatie in sede laterocervicale bilaterale.",
            reperti: [
              { id: "reattivi", etichetta: "Linfonodi reattivi", testo: "In sede latero-cervicale bilaterale si osservano alcuni linfonodi di tipo reattivo, il maggiore a ___ del diametro massimo di ___ mm." }
            ]
          },
          {
            id: "sottomandibolari", nome: "Ghiandole sottomandibolari",
            negativo: "Regolare ecostruttura delle ghiandole sottomandibolari.",
            reperti: [
              { id: "nodulo", etichetta: "Nodulo sottomandibolare", testo: "In corrispondenza della ghiandola sottomandibolare ___ si documenta formazione nodulare ipoecogena a margini netti di ___ x ___ mm, priva di segnali vascolari intralesionali, meritevole di ulteriore approfondimento diagnostico mediante agobiopsia.", conclusione: "Nodulo della ghiandola sottomandibolare ___ meritevole di approfondimento." }
            ]
          },
          {
            id: "consigli", nome: "Consigli", negativo: "",
            reperti: [
              { id: "laboratorio", etichetta: "Esami e valutazione specialistica", testo: "Utile integrazione con esami laboratoristici e valutazione clinico-specialistica." },
              { id: "endocrinologica", etichetta: "Valutazione endocrinologica", testo: "Utile valutazione specialistica endocrinologica." }
            ]
          }
        ],
        conclusioneNegativa: "Ecografia della tiroide nei limiti della norma."
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
              { id: "linfoadenectomia", etichetta: "Esiti di linfoadenectomia", testo: "In esiti di linfoadenectomia ___, non si riconoscono linfonodi ingranditi o con caratteristiche sospette nelle sedi esaminate." }
            ]
          },
          {
            id: "stazioni", nome: "Stazioni linfonodali",
            negativo: "Indagate le regioni laterocervicali, sovraclaveari ed ascellari bilateralmente: non linfonodi patologicamente ingranditi o con franche caratteristiche di sovvertimento strutturale.",
            reperti: [
              { id: "reattivi", etichetta: "Reattivi", testo: "Si documentano in queste sedi alcuni linfonodi ovalari, ipoecogeni, con ilo ben rappresentato e vascolarizzazione unipolare, tra i quali il maggiore localizzato in sede ___ delle dimensioni di ___ x ___ mm, tutti di aspetto ecografico reattivo-benigno." },
              { id: "reattivi-ingranditi", etichetta: "Reattivi lievemente ingranditi", testo: "In sede laterocervicale non linfonodi con caratteristiche di sovvertimento strutturale sospette per secondarietà.\nIn queste sedi si apprezzano alcuni linfonodi ipoecogeni, ovalari, con ilo ben rappresentato e vascolarizzazione unipolare, disposti in sede perigiugulare d'ambo i lati, i maggiori in sede ___, di aspetto reattivo-benigno, lievemente ingranditi con dimensioni massime di ___ x ___ mm.\nSi indica follow-up clinico-strumentale." },
              { id: "aumentati", etichetta: "Dimensioni nettamente aumentate", testo: "In sede ___ si riconoscono alcuni linfonodi di dimensioni nettamente aumentate, a morfologia ovalare e con ilo adiposo apparentemente riconoscibile, delle dimensioni massime di circa ___ mm.\nI reperti descritti, in considerazione dell'anamnesi, sono meritevoli di valutazione specialistica ed eventuale rivalutazione ecografica a breve distanza.", conclusione: "Linfonodi ___ di dimensioni aumentate meritevoli di valutazione specialistica." },
              { id: "inguinali", etichetta: "Inguinali con ilo adiposo", modo: "aggiunge", testo: "In sede inguinale bilaterale si riconoscono alcuni linfonodi ovalari, con ilo adiposo visibile, delle dimensioni massime di circa ___ mm." }
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
        intro: "È stata esaminata la spalla {lato}, sede della sintomatologia riferita.",
        introBilaterale: "Sono state esaminate entrambe le spalle.",
        organi: [
          {
            id: "acromion-claveare", nome: "Articolazione acromion-claveare",
            negativo: "L'articolazione acromion-claveare presenta morfologia conservata.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi", testo: "L'articolazione acromion-claveare appare lievemente irregolare, con modesto assottigliamento della rima articolare e piccoli rilievi osteofitosici marginali." },
              { id: "fibroartrosi", etichetta: "Iniziale fibro-artrosi", testo: "Iniziali segni di fibro-artrosi acromion-claveare." }
            ]
          },
          {
            id: "cuffia", nome: "Cuffia dei rotatori",
            negativo: "I tendini della cuffia dei rotatori (sovraspinato, sottospinato, sottoscapolare) appaiono regolari per spessore, margini ed ecostruttura fibrillare, senza evidenza di lesioni focali, discontinuità, calcificazioni o segni di tendinopatia; si osserva buon trofismo dei muscoli sovraspinato e infraspinato.",
            reperti: [
              { id: "tendinosi-lieve", etichetta: "Tendinosi lieve sovraspinato", testo: "Ha aspetto lievemente ipoecogeno il tendine sovraspinato in quadro compatibile con tendinosi.\nNon si apprezzano alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete.", conclusione: "Tendinosi del sovraspinato." },
              { id: "tendinopatia-cronica", etichetta: "Tendinopatia cronica", testo: "I tendini della cuffia dei rotatori, in particolare il sovraspinato, mostrano perdita della regolare struttura fibrillare ed aspetto ipoecogeno disomogeneo, in assenza di segni di avulsione, reperto compatibile con tendinopatia cronica.", conclusione: "Tendinopatia cronica della cuffia dei rotatori." },
              { id: "tendinosi-calcificazioni", etichetta: "Tendinosi con calcificazioni", testo: "Il tendine del sovraspinato appare marcatamente ispessito e disomogeneo, in particolare in sede inserzionale e pre-inserzionale come per tendinosi; nel suo contesto si osservano alcuni millimetrici spot iperecogeni da riferire a piccole calcificazioni.", conclusione: "Tendinosi calcifica del sovraspinato." },
              { id: "tendinosi-calcifica", etichetta: "Tendinosi calcifica (sovraspinato + sottoscapolare)", testo: "Modeste alterazioni tendinosiche a carico del tendine sovraspinato che appare ispessito e disomogeneo con alcune minute calcificazioni in sede preinserzionale; analoghi reperti, di minore entità, in corrispondenza del tendine sottoscapolare.\nRegolare ecostruttura fibrillare del tendine sottospinato.", conclusione: "Tendinosi calcifica del sovraspinato e del sottoscapolare." },
              { id: "calcificazioni", etichetta: "Calcificazioni inserzionali", testo: "I tendini della cuffia dei rotatori presentano regolare aspetto fibrillare in assenza di evidenti lesioni.\nMillimetriche calcificazioni sono riconoscibili all'inserzione del tendine ___." },
              { id: "entesopatia-sottoscapolare", etichetta: "Entesopatia calcifica sottoscapolare", testo: "Non evidenza di rotture tendinee, complete o parziali.\nÈ disomogeneo il tendine sottoscapolare con alcune calcificazioni inserzionali lineari (la maggiore di ___ mm), come da entesopatia inserzionale calcifica.\nNon si apprezzano alterazioni ecotomografiche a carico del sovraspinato e sottospinato.", conclusione: "Entesopatia inserzionale calcifica del sottoscapolare." },
              { id: "fissurazione-capsulare", etichetta: "Fissurazione versante capsulare", testo: "Il tendine sovraspinato mostra lungo il versante capsulare un difetto della struttura fibrillare di circa ___ mm compatibile con fissurazione.", conclusione: "Fissurazione del tendine sovraspinato." },
              { id: "fissurazione-spessore", etichetta: "Fissurazione a tutto spessore", testo: "Si riconosce aspetto ispessito del tendine sovraspinato che mostra una fissurazione lineare a tutto spessore della porzione anteriore con associata falda fluida intrarticolare.\nNon si apprezzano ulteriori alterazioni ecotomografiche a carico dei componenti della cuffia dei rotatori da riferire a lesioni parziali e/o complete.", conclusione: "Fissurazione a tutto spessore del sovraspinato." },
              { id: "rottura-parziale", etichetta: "Rottura parziale sovraspinato", testo: "Modeste alterazioni tendinosiche del sovraspinato che mostra una rottura non completa del fascio anteriore, interessante il tendine a tutto spessore.", conclusione: "Rottura parziale del tendine sovraspinato." },
              { id: "rottura-totale", etichetta: "Rottura totale cuffia", testo: "Rottura totale con retrazione mio-tendinea del tendine sovraspinato, sottoscapolare ed in minor misura del tendine infraspinato.", conclusione: "Rottura totale della cuffia dei rotatori." },
              { id: "rottura-sottoscapolare", etichetta: "Rottura sottoscapolare", testo: "Si osserva rottura pressoché completa del tendine del sottoscapolare.\nIl tendine del sovraspinato presenta aspetto marcatamente ipoecogeno ed ispessito, in quadro di tendinosi, in assenza di franche lesioni di continuità; concomitano microcalcificazioni in sede inserzionale.\nSi osservano alterazioni tendinosiche anche a carico del tendine del sottospinato.", conclusione: "Rottura del tendine sottoscapolare." }
            ]
          },
          {
            id: "clb", nome: "Capo lungo del bicipite",
            negativo: "Il tendine del capo lungo del bicipite brachiale è in sede, ben contenuto nella doccia bicipitale, con guaina peritendinea priva di distensione fluida.",
            reperti: [
              { id: "tenosinovite", etichetta: "Falda peritendinea (tenosinovite)", testo: "CLB in sede, in presenza di minima falda fluida peritendinea come per quadro di tenosinovite.", conclusione: "Tenosinovite del capo lungo del bicipite." },
              { id: "slaminamento", etichetta: "Slaminamento", testo: "CLB in sede, ispessito e ad ecostruttura finemente disomogenea con slaminamento fibrillare, in presenza di distensione fluida della guaina propria come per tenosinovite.", conclusione: "Tendinopatia con slaminamento del capo lungo del bicipite." },
              { id: "lussazione", etichetta: "Lussazione mediale", testo: "Lussazione mediale del tendine del capo lungo del bicipite omerale, ispessito come da tendinosi, con modesta falda fluida peritendinea.", conclusione: "Lussazione mediale del capo lungo del bicipite." }
            ]
          },
          {
            id: "borsa", nome: "Borsa subacromion-deltoidea",
            negativo: "La borsa subacromion-deltoidea presenta pareti regolari e non risulta significativamente distesa da fluido.",
            reperti: [
              { id: "minima", etichetta: "Minima distensione", testo: "Minima sovradistensione fluida della borsa subacromion-deltoidea." },
              { id: "conflitto", etichetta: "Ispessita (conflitto)", testo: "La borsa subacromion-deltoidea si presenta lievemente ispessita e ipoecogena, come frequentemente riscontrabile nei quadri di sindrome da conflitto subacromiale.", conclusione: "Borsite subacromion-deltoidea." }
            ]
          },
          {
            id: "versamento", nome: "Versamento e articolazione",
            negativo: "Non si rileva versamento nei recessi articolari esplorabili.",
            reperti: [
              { id: "artrosi-gleno", etichetta: "Artrosi scapolo-omerale", modo: "aggiunge", testo: "Diffuso quadro di artrosi scapolo-omerale." },
              { id: "epifisi", etichetta: "Alterazioni epifisi omerale", modo: "aggiunge", testo: "Si rilevano diffuse alterazioni degenerative a carico dell'epifisi prossimale omerale." },
              { id: "versamento", etichetta: "Versamento articolare", nuovo: true, testo: "Si apprezza falda di versamento nei recessi articolari esplorabili." }
            ]
          },
          {
            id: "dinamica", nome: "Valutazione dinamica",
            negativo: "Non si documentano segni dinamici di impingement subacromiale.",
            reperti: [
              { id: "impingement", etichetta: "Impingement", nuovo: true, testo: "Alle manovre dinamiche si documentano segni di conflitto subacromiale.", conclusione: "Segni dinamici di impingement subacromiale." }
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
              { id: "epicondilite", etichetta: "Epicondilite", testo: "Si documenta ecostruttura finemente disomogenea in sede pre-inserzionale del tendine comune degli estensori rispetto al controlato; all'integrazione con color-Doppler si apprezzano alcuni spot vascolari nel contesto; tali reperti sono compatibili in prima ipotesi con quadro di epicondilite.\nRegolari reperti ecografici a carico del tendine comune dei flessori e del tendine tricipitale.", conclusione: "Quadro compatibile con epicondilite." },
              { id: "epitrocleite", etichetta: "Epitrocleite", nuovo: true, testo: "Si documenta ecostruttura finemente disomogenea ed ispessimento in sede pre-inserzionale del tendine comune dei flessori rispetto al controlato, compatibile in prima ipotesi con quadro di epitrocleite.\nRegolari reperti ecografici a carico del tendine comune degli estensori e del tendine tricipitale.", conclusione: "Quadro compatibile con epitrocleite." },
              { id: "calcificazione", etichetta: "Calcificazione inserzionale", testo: "Nella norma l'aspetto del tendine comune dei flessori; una millimetrica calcificazione (___ mm) si riconosce all'inserzione.\nNella norma l'aspetto del tendine comune degli estensori.\nNella norma l'aspetto del tendine tricipite all'inserzione olecranica, con riscontro di calcificazione inserzionale." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non versamento liquido intra-articolare.",
            reperti: [
              { id: "versamento", etichetta: "Versamento corpuscolato", testo: "Si rileva una raccolta fluida corpuscolata nel contesto della capsula articolare del gomito, senza evidenti segnali vascolari all'integrazione con box colore, da versamento intrarticolare.\nReperto meritevole di integrazione con esami ematochimici ed eventuale RX per la valutazione dei capi ossei affrontati.", conclusione: "Versamento articolare." }
            ]
          },
          {
            id: "borsa-olecranica", nome: "Borsa olecranica",
            negativo: "Non distensione della borsa olecranica.",
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
              { id: "impingement", etichetta: "Impingement ulnare", testo: "L'esame ecografico evidenzia marcato ispessimento (___ mm) ipoecogeno, con perdita della normale fascicolazione, del nervo ulnare a livello della doccia ossea in quadro di impingement; i reperti sono da correlare con esame elettromiografico.\nNon segni di sublussazione del nervo durante le manovre dinamiche né formazioni cistiche-ossee nel canale ulnare.", conclusione: "Quadro compatibile con sofferenza del nervo ulnare al canale cubitale." }
            ]
          },
          {
            id: "tessuti", nome: "Tessuti molli", negativo: "",
            reperti: [
              { id: "tumefazione", etichetta: "Imbibizione con raccolta", testo: "Si documenta ispessimento ed imbibizione dei tessuti molli sottocutanei in sede sovrafasciale, dello spessore massimo di circa ___ mm, nel cui contesto si osserva raccolta fluida con alcuni tralci iperecogeni, a margini lievemente irregolari delle dimensioni massime di ___ x ___ mm, priva di segnali vascolari al color-Doppler." }
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
        intro: "Esame mirato alla valutazione del polso ___ (e della mano) {lato}, sede della sintomatologia riferita.",
        organi: [
          {
            id: "tunnel", nome: "Tunnel carpale e nervi",
            negativo: "Appaiono regolarmente rappresentate le strutture del tunnel carpale, in assenza di falde fluide all'interno o a monte dello stesso.\nRegolare diametro, ecogenicità e aspetto fibrillare dei nervi mediano e ulnare.",
            reperti: [
              { id: "tunnel-carpale", etichetta: "Sindrome del tunnel carpale", nuovo: true, testo: "Il nervo mediano appare ispessito ed ipoecogeno all'ingresso del canale carpale, con area di sezione trasversa di ___ mm², come si osserva nei quadri di sindrome del tunnel carpale; utile correlazione con esame elettromiografico.", conclusione: "Quadro compatibile con sindrome del tunnel carpale." }
            ]
          },
          {
            id: "tendini", nome: "Tendini flessori ed estensori",
            negativo: "Regolare spessore ed aspetto fibrillare dei tendini flessori ed estensori.",
            reperti: [
              { id: "de-quervain", etichetta: "Tenosinovite di de Quervain", testo: "Si documenta aspetto lievemente disomogeneo dei tendini abduttore lungo ed estensore breve del pollice, associato a minimo ispessimento del retinacolo, dello spessore massimo di circa ___ mm come da iniziale tenosinovite di de Quervain; utile valutazione specialistica.", conclusione: "Tenosinovite di de Quervain." },
              { id: "sclerosante", etichetta: "de Quervain sclerosante", testo: "Si documenta ispessimento del retinacolo degli estensori del I compartimento in assenza di falde fluide peritendinee come da tenosinovite sclerosante.", conclusione: "Tenosinovite stenosante di de Quervain." },
              { id: "de-quervain-negativo", etichetta: "de Quervain negativo (I dito)", testo: "È regolare l'aspetto ecografico dei tendini estensore breve ed abduttore lungo del pollice, senza fluido nelle relative guaine." },
              { id: "ii-compartimento", etichetta: "Falda II compartimento", testo: "Si osserva lieve distensione fluida della guaina dei tendini estensore radiale breve e lungo del carpo e, minima, dell'estensore breve del pollice.\nRegolari per ecostruttura i tendini del comparto degli estensori e flessori del polso.", conclusione: "Tenosinovite del II compartimento degli estensori." },
              { id: "frc", etichetta: "Fluido guaina flessore radiale carpo", testo: "Si rileva distensione fluida della guaina del tendine flessore radiale del carpo, che appare continuo.\nRegolare spessore ed aspetto fibrillare dei tendini estensori." },
              { id: "dito-scatto", etichetta: "Dito a scatto", nuovo: true, testo: "Si documenta ispessimento ipoecogeno della puleggia A1 del ___ dito, con tendine flessore lievemente ispessito e scorrimento a scatto alle manovre dinamiche.", conclusione: "Quadro compatibile con dito a scatto." }
            ]
          },
          {
            id: "cisti", nome: "Cisti", negativo: "",
            reperti: [
              { id: "articolare", etichetta: "Cisti articolare", testo: "Sul versante ___ del polso, in continuità con l'articolazione, è apprezzabile una formazione anecogena, corpuscolata, del diametro massimo di ___ x ___ mm: tale reperto è compatibile con cisti articolare.", conclusione: "Cisti articolare del polso." },
              { id: "tendinea", etichetta: "Cisti tendinea", testo: "Si riconosce formazione anecogena a contenuto in parte corpuscolato che avvolge la porzione più superficiale del tendine ___, delle dimensioni massime di circa ___ x ___ mm, a circa ___ mm di profondità dal piano cutaneo. La formazione, che appare priva di segnali vascolari al color-Doppler, è compatibile con cisti tendinea.", conclusione: "Cisti tendinea." },
              { id: "palmare", etichetta: "Cisti palmare mano", testo: "A livello della regione palmare della mano, in corrispondenza della tumefazione obiettivabile, si evidenzia formazione ipo-anecogena di aspetto cistico con morfologia ovalare delle dimensioni di ___ x ___ mm con piano di clivaggio rispetto al sottostante tendine flessore del ___ raggio." }
            ]
          },
          {
            id: "articolazioni", nome: "Articolazioni",
            negativo: "Non evidenti falde fluide intrarticolari.",
            reperti: [
              { id: "rizoartrosi", etichetta: "Rizoartrosi", testo: "Microcalcificazioni si riconoscono a livello dell'articolazione trapezio-metacarpale come per fenomeni degenerativi.\nNon si riconosce distensione fluida intrarticolare trapezio-metacarpale né metacarpo-falangea, né accentuata vascolarizzazione della capsula all'integrazione color-Doppler.", conclusione: "Rizoartrosi." },
              { id: "rizoartrosi-dubbia", etichetta: "Dubbia rizoartrosi (utile RX)", testo: "Dubbia irregolarità corticale all'interfaccia ossea trapezio-metacarpale che, compatibilmente con la metodica non dedicata, potrebbe essere attribuibile a fenomeni degenerativi rizoartrosici; utile integrazione con esame RX." },
              { id: "artrosi-carpo", etichetta: "Artrosi del carpo", testo: "Diffuse irregolarità dei profili corticali delle ossa del carpo ed in sede carpo-metacarpale, con distensione fluida articolare, in prima ipotesi di natura artrosico-degenerativa.", conclusione: "Fenomeni artrosico-degenerativi del carpo." }
            ]
          },
          {
            id: "dita", nome: "Dita e tessuti molli", negativo: "",
            reperti: [
              { id: "corpo-estraneo", etichetta: "Corpo estraneo", testo: "A livello del terzo ___ si riconosce una formazione lineare delle dimensioni di ___ x ___ mm compatibile con corpo estraneo, circondata da un alone di ipoecogenicità verosimilmente attribuibile a tessuto di granulazione.", conclusione: "Corpo estraneo nei tessuti molli." },
              { id: "imbibizione", etichetta: "Imbibizione edematosa", testo: "In tale sede si riconosce unicamente imbibizione edematosa dei tessuti molli.\nIntegro l'aspetto del tendine estensore del dito." }
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
        intro: "Sono state esaminate le regioni pertrocanteriche da ambo i lati.",
        organi: [
          {
            id: "borse", nome: "Borse trocanteriche",
            negativo: "Non si riconoscono distensioni fluide delle borse trocanteriche.",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia trocanterica", modo: "aggiunge", testo: "Fenomeni di entesopatia si riconoscono a livello di ___ (entrambi i grandi trocanteri)." },
              { id: "borsite", etichetta: "Borsite trocanterica", nuovo: true, testo: "Distensione fluida della borsa trocanterica ___, dello spessore di ___ mm, come da borsite.", conclusione: "Borsite trocanterica." }
            ]
          },
          {
            id: "coxofemorale", nome: "Articolazione coxo-femorale",
            negativo: "Non si riconoscono falde di versamento coxo-femorale bilateralmente.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi", modo: "aggiunge", testo: "Si documenta lieve irregolarità del profilo corticale osseo della testa femorale come per fenomeni degenerativo-artrosici di grado modesto." },
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
            negativo: "Proiezioni coronali standard secondo Graf evidenziano entrambe le anche in asse, con tetto acetabolare osseo ben conformato e normale copertura della testa femorale. A sinistra l'angolo α misura circa ___° e l'angolo β ___°, a destra l'angolo α è ___° e l'angolo β ___°. Questi valori rientrano nei parametri di un'anca di tipo I secondo Graf, compatibile con sviluppo articolare maturo.",
            reperti: [
              { id: "immatura", etichetta: "Anca non matura", nuovo: true, testo: "Proiezioni coronali standard secondo Graf. A destra l'angolo α misura circa ___° e l'angolo β ___°; a sinistra l'angolo α è ___° e l'angolo β ___°.\nL'anca ___ rientra nel tipo ___ secondo Graf; utile controllo ecografico a distanza di ___ settimane e valutazione specialistica ortopedica.", conclusione: "Anca ___ di tipo ___ secondo Graf." }
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
        intro: "È stata esaminata la regione ___ della ___ (coscia/gamba) {lato}, sede della sintomatologia riferita, anche in comparativa con il controlato.",
        organi: [
          {
            id: "muscoli", nome: "Strutture miotendinee",
            negativo: "Regolare spessore ed aspetto fibrillare delle strutture miotendinee esaminate, in assenza di alterazioni ecostrutturali sospette per la natura post-traumatica.",
            reperti: [
              { id: "lesione", etichetta: "Lesione muscolare", testo: "A livello del muscolo ___ si documenta alterazione ecostrutturale con area ___ (ipoecogena/anecogena/disomogenea) delle dimensioni di ___ x ___ mm, compatibile con lesione muscolare.", conclusione: "Lesione del muscolo ___." },
              { id: "retto-femorale", etichetta: "Retto femorale negativo (dettaglio)", testo: "È regolare la struttura del ventre muscolare del retto femorale, in assenza di immagini compatibili con rottura.\nÈ regolare l'inserzione prossimale del retto femorale sulla spina iliaca." },
              { id: "flessori", etichetta: "Flessori della coscia negativo (dettaglio)", testo: "Non si riconoscono alterazioni strutturali dei ventri dei muscoli flessori della coscia né delle giunzioni miotendinee.\nConservata la struttura fibrillare dei relativi tendini." }
            ]
          },
          {
            id: "falde", nome: "Falde fluide",
            negativo: "Non si rilevano falde fluide perimuscolari.",
            reperti: [
              { id: "ematoma", etichetta: "Ematoma", nuovo: true, testo: "Si documenta raccolta fluida disomogenea di ___ x ___ mm in sede ___, compatibile con ematoma." }
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
            negativo: "Si documenta regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, del tendine rotuleo e dei legamenti collaterali mediale (LCM) e laterale (LCL).",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia calcifica quadricipitale", testo: "Si documenta regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale, quest'ultimo in presenza di segni di entesopatia calcifica al polo rotuleo superiore.\nRegolari reperti il tendine rotuleo e i legamenti collaterali.", conclusione: "Entesopatia calcifica quadricipitale." },
              { id: "lcm", etichetta: "LCM ispessito", testo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale e del tendine rotuleo.\nContinuo ed in sede il LCM, con aspetto lievemente ispessito e disomogeneo a livello della sua porzione inserzionale e pre-inserzionale prossimale; regolare il LCL.", conclusione: "Ispessimento del legamento collaterale mediale." },
              { id: "rotuleo", etichetta: "Tendinopatia rotulea", nuovo: true, testo: "Regolare spessore ed aspetto fibrillare dell'inserzione distale del tendine quadricipitale.\nIl tendine rotuleo appare ispessito e disomogeneamente ipoecogeno in sede prossimale, come per tendinopatia.\nRegolari i legamenti collaterali.", conclusione: "Tendinopatia rotulea." }
            ]
          },
          {
            id: "menischi", nome: "Menischi",
            negativo: "Non estrusione delle fibro-cartilagini meniscali.",
            reperti: [
              { id: "laterale", etichetta: "Menisco protruso", testo: "Si segnala aspetto disomogeneo e protruso esternamente della porzione esplorabile del menisco ___; utile a giudizio clinico approfondimento diagnostico con esame RM." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non significativo versamento articolare.",
            reperti: [
              { id: "artrosi", etichetta: "Artrosi con falda sottoquadricipitale", testo: "Si osservano segni di degenerazione artrosica in presenza di sottile falda fluida nel recesso sottoquadricipitale.", conclusione: "Segni di gonartrosi." },
              { id: "infrapatellare", etichetta: "Borsa infrapatellare", testo: "Borsa infrapatellare minimamente distesa da falda parafisiologica." },
              { id: "versamento", etichetta: "Versamento significativo", nuovo: true, testo: "Si documenta versamento articolare nel recesso sottoquadricipitale, dello spessore di ___ mm.", conclusione: "Versamento articolare." }
            ]
          },
          {
            id: "popliteo", nome: "Cavo popliteo",
            negativo: "Non espansi nel cavo popliteo.",
            reperti: [
              { id: "baker", etichetta: "Cisti di Baker", testo: "Si documenta distensione fluida della borsa gastrocnemio-semimembranosa con contenuto ___ (finemente corpuscolato) (cisti di Baker) delle dimensioni massime di ___ x ___ mm.", conclusione: "Cisti di Baker." },
              { id: "baker-spot", etichetta: "Cisti di Baker con spot vascolari", testo: "Si conferma la presenza di distensione fluida della borsa del gastrocnemio-semimembranoso delle dimensioni massime di circa ___ x ___ mm, a contenuto fluido-corpuscolato, caratterizzato da alcuni spot vascolari nel contesto (sinoviali?).", conclusione: "Cisti di Baker." }
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
              { id: "falda", etichetta: "Falda peritendinea", testo: "Regolare ecostruttura fibrillare dei tendini peronei lungo e breve, che presentano sottile falda fluida peritendinea." }
            ]
          },
          {
            id: "legamenti-tibiali", nome: "Legamento PAA e tendini tibiali",
            negativo: "Regolare il legamento peroneo-astragalico anteriore e i tendini tibiale anteriore e posteriore.",
            reperti: [
              { id: "paa", etichetta: "Lesione legamento PAA", nuovo: true, testo: "Il legamento peroneo-astragalico anteriore appare ispessito e disomogeneamente ipoecogeno, con perdita della regolare struttura fibrillare, come per lesione ___ (parziale/completa).\nRegolari i tendini tibiale anteriore e posteriore.", conclusione: "Lesione del legamento peroneo-astragalico anteriore." },
              { id: "tibiale-posteriore", etichetta: "Fissurazione tibiale posteriore", testo: "Regolare il legamento peroneo-astragalico anteriore e il tendine tibiale anteriore.\nSi documenta aspetto disomogeneo ed ispessito del tendine tibiale posteriore in sede sottomalleolare, compatibile con fissurazione, associato alla presenza di una falda ipoecogena nella guaina propria, che posteriormente risale in sede retro-malleolare, compatibile con falda di ematoma.", conclusione: "Fissurazione del tendine tibiale posteriore." }
            ]
          },
          {
            id: "achille", nome: "Tendine d'Achille",
            negativo: "Regolare il tendine d'Achille.",
            reperti: [
              { id: "entesopatia", etichetta: "Entesopatia achillea", testo: "Nel tendine d'Achille, a livello preinserzionale calcaneare, sono riconoscibili tenui calcificazioni in quadro di entesopatia, senza segni di rottura.\nNon si riconoscono falde fluide peritendinee.", conclusione: "Entesopatia achillea." },
              { id: "tendinopatia", etichetta: "Tendinopatia con entesopatia calcifica", testo: "Si documenta ispessimento fusiforme del tendine d'Achille, dello spessore massimo di circa ___ mm (vs. ___ mm del controlato), di aspetto disomogeneamente ipoecogeno come si osserva nei casi di tendinopatia; la regione inserzionale è mal valutabile per la presenza di grossolane immagini calcifiche del diametro massimo complessivo di circa ___ mm.\nIl reperto è compatibile con entesopatia calcaneale calcifica; si consiglia integrazione con esame RX.", conclusione: "Tendinopatia achillea con entesopatia calcaneale calcifica." }
            ]
          },
          {
            id: "retrocalcaneare", nome: "Borsa retrocalcaneare", negativo: "",
            reperti: [
              { id: "falda", etichetta: "Minima falda", testo: "Una minima falda fluida si riconosce nella borsa retrocalcaneare." }
            ]
          },
          {
            id: "fascia", nome: "Fascia plantare",
            negativo: "Conservato lo spessore dell'aponeurosi plantare superficiale all'inserzione calcaneare.",
            reperti: [
              { id: "entesopatia", etichetta: "Iniziale entesopatia calcifica", testo: "Conservato lo spessore dell'aponeurosi plantare superficiale all'inserzione calcaneare in presenza di iniziali segni di entesopatia calcifica inserzionale." },
              { id: "ispessita", etichetta: "Fascia ispessita (sperone)", testo: "In quadro di entesopatia calcifica retro- e sottocalcaneare, risulta lievemente ispessita, senza segni di rottura, la fascia plantare.", conclusione: "Ispessimento della fascia plantare con entesopatia calcifica (sperone calcaneare)." }
            ]
          },
          {
            id: "versamento", nome: "Versamento",
            negativo: "Non falde fluide visualizzabili nel recesso tibio-peroneo-astragalico anteriore.",
            reperti: [
              { id: "trauma", etichetta: "Sospetta frattura (trauma)", testo: "Nella sede della tumefazione clinicamente obiettivabile pare apprezzarsi interruzione della corticale ossea del malleolo peroneale in presenza di versamento intra-articolare.\nIl reperto è meritevole di valutazione con esame radiografico mirato ed eventuale completamento con esame RM.", conclusione: "Sospetta interruzione corticale del malleolo peroneale: utile RX." }
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
            negativo: "In tale sede si evidenzia una regolare rappresentazione del tessuto adiposo sottocutaneo, in assenza di evidenti formazioni solide e/o liquide nel contesto.",
            reperti: [
              { id: "lipoma", etichetta: "Lipoma / fibrolipoma", testo: "A tale livello, nel contesto del tessuto sottocutaneo in sede sovrafasciale, si riconosce formazione ovalare a margini netti, ad ecostruttura mista prevalentemente ipoecogena con tralci iperecogeni nel contesto, delle dimensioni massime di ___ x ___ mm; la distanza tra il piano cutaneo ed il margine superficiale della lesione è di circa ___ mm.\nLa formazione, priva di significativi segnali vascolari al color-Doppler, è riferibile in prima ipotesi a fibrolipoma.", conclusione: "Formazione sottocutanea riferibile in prima ipotesi a fibrolipoma." },
              { id: "lipoma-intramuscolare", etichetta: "Lipoma intramuscolare", testo: "A tale livello, in sede sottofasciale, nel contesto della porzione ___ del muscolo ___, è presente formazione ovalare a margini netti, tenuemente iperecogena con tralci fibrosi nel contesto, delle dimensioni massime di circa ___ x ___ mm, priva di segnali vascolari al color-Doppler.\nLa porzione più superficiale della formazione è localizzata a circa ___ mm dal piano cutaneo.\nIl reperto è compatibile in prima ipotesi con lipoma intramuscolare; utile valutazione specialistica.", conclusione: "Lipoma intramuscolare." },
              { id: "lipomi-multipli", etichetta: "Lipomi multipli", testo: "Si riconoscono, nel contesto del tessuto adiposo sottocutaneo, formazioni ovalari a margini netti e struttura adiposa, con componente fibrosa variabile, privi di alterazioni vascolari all'esame color-Doppler e compatibili con lipomi.", conclusione: "Lipomi sottocutanei multipli." },
              { id: "cisti-sebacea", etichetta: "Cisti sebacea", testo: "Nel contesto del tessuto sottocutaneo si documenta formazione ovalare del diametro massimo di ___ mm, ad ecostruttura ipo-anecogena di aspetto cistico con componente in parte corpuscolata nel contesto, priva di segnali vascolari all'integrazione con color-Doppler.\nTale reperto è riferibile in prima ipotesi a cisti sebacea.", conclusione: "Cisti sebacea." },
              { id: "cisti", etichetta: "Cisti (monitoraggio)", testo: "Nel contesto dei tessuti molli sottocutanei si riconosce una formazione ___ (ovalare/polilobata) ipo-anecogena a margini netti di ___ x ___ mm, con rinforzo ecografico di parete posteriore, priva di segnali vascolari all'integrazione con box colore.\nLa formazione, di aspetto cistico, è meritevole di monitoraggio clinico.", conclusione: "Formazione cistica sottocutanea." },
              { id: "solida", etichetta: "Formazione solida generica", testo: "Si documenta formazione ___ (ipo/iso/iperecogena), a margini ___, di ___ x ___ mm, in sede ___. Al color-Doppler si documenta/non si documenta vascolarizzazione interna. Si consiglia correlazione clinica e approfondimento diagnostico.", conclusione: "Formazione solida dei tessuti molli meritevole di approfondimento." },
              { id: "adiposo", etichetta: "Solo adiposo più rappresentato", testo: "In tale sede non si riconoscono immagini compatibili con lipoma né formazioni cistiche. Appare unicamente maggiormente rappresentato il tessuto adiposo sottocutaneo a tale livello, in comparazione con il controlato." },
              { id: "esiti-chirurgici", etichetta: "Esiti chirurgici senza raccolte", testo: "Nella sede di recente intervento non si riscontrano raccolte. È riconoscibile unicamente modesta disomogeneità dei tessuti in esiti chirurgici." },
              { id: "raccolta", etichetta: "Raccolta / ascesso", nuovo: true, testo: "Si documenta raccolta fluida disomogenea, a margini irregolari, di ___ x ___ mm, con iperemia perilesionale al color-Doppler, in prima ipotesi di natura flogistica-ascessuale.", conclusione: "Raccolta fluida di probabile natura flogistica." }
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
        intro: "È stata esaminata la regione inguinale {lato}, sede di sospetta ernia.",
        introBilaterale: "Sono state esaminate le regioni inguinali bilateralmente, sede di sospetta ernia.",
        organi: [
          {
            id: "canale", nome: "Canale inguinale",
            negativo: "Non si riconoscono immagini compatibili con protrusioni erniarie neanche durante la manovra del ponzamento.\nNon si rilevano alterazioni del piano muscolo-fasciale inguinale.",
            reperti: [
              { id: "ernia", etichetta: "Ernia inguinale", testo: "Si riconosce tessuto adiposo addominale che si affaccia all'orifizio inguinale esterno durante la manovra del ponzamento eseguita in stazione supina, e spontaneamente in stazione eretta, e che si riduce al termine della manovra.\nNon si riconoscono falde fluide limitrofe all'ernia descritta.", conclusione: "Ernia inguinale." },
              { id: "controlaterale", etichetta: "Reperto analogo controlaterale", modo: "aggiunge", testo: "Controlateralmente è riconoscibile reperto analogo." }
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
            negativo: "Non si osserva diastasi dei muscoli retti.",
            reperti: [
              { id: "diastasi", etichetta: "Diastasi dei retti", testo: "In sede ___ la distanza massima dei muscoli retti è di ___ centimetri: il reperto è compatibile con ___ (lieve) diastasi dei muscoli retti.", conclusione: "Diastasi dei muscoli retti." }
            ]
          },
          {
            id: "linea-alba", nome: "Linea alba e ombelico",
            negativo: "Non si osserva interruzione della linea alba.",
            reperti: [
              { id: "interruzione", etichetta: "Piccola interruzione linea alba", testo: "Non si osserva interruzione della linea alba se non in sede ___, ove si segnala piccola interruzione (___ mm) in assenza di impegno mesenteriale." },
              { id: "ombelicale", etichetta: "Ernia ombelicale", testo: "In sede ombelicale si osserva impegno di materiale mesenteriale avente estensione di circa ___ cm che protrude attraverso l'ombelico, con porta erniaria di ___ mm, riducibile ___ (spontaneamente/dopo manovra di compressione).", conclusione: "Ernia ombelicale." }
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
              { id: "rete-testis", etichetta: "Ectasia rete testis", testo: "Didimi in sede, di regolari dimensioni ed ecostruttura, se si eccettuano alcune formazioni pseudocistiche/serpiginose a livello della rete testis di ___, in prima ipotesi da attribuire a ectasia tubulare.", conclusione: "Ectasia tubulare della rete testis." },
              { id: "microlitiasi", etichetta: "Microlitiasi", nuovo: true, testo: "Didimi regolari per morfologia e dimensioni, con multipli spot iperecogeni puntiformi diffusi nel parenchima, come da microlitiasi testicolare.", conclusione: "Microlitiasi testicolare." },
              { id: "lesione", etichetta: "Lesione focale", nuovo: true, testo: "Nel contesto del didimo ___ si documenta formazione ipoecogena di ___ mm, vascolarizzata al color-Doppler, meritevole di valutazione specialistica urologica urgente.", conclusione: "Lesione focale testicolare ___ meritevole di valutazione urologica urgente." }
            ]
          },
          {
            id: "epididimi", nome: "Epididimi",
            negativo: "Epididimi regolari per morfologia ed ecostruttura.",
            reperti: [
              { id: "cisti-coda", etichetta: "Cisti della coda", testo: "Si documenta formazione anecogena d'aspetto cistico in corrispondenza della coda dell'epididimo di ___ delle dimensioni di ___ mm." },
              { id: "cisti-testa", etichetta: "Cisti della testa", testo: "A livello della testa di ___ epididimo si documentano formazioni anecogene di aspetto cistico, a contenuto finemente corpuscolato, delle dimensioni di ___ x ___ mm." },
              { id: "epididimite", etichetta: "Epididimite", nuovo: true, testo: "Epididimo ___ ingrandito e disomogeneamente ipoecogeno, con aumentata vascolarizzazione al color-Doppler, come si osserva nei quadri di epididimite.", conclusione: "Quadro compatibile con epididimite ___." }
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
            negativo: "Non segni di varicocele né ectasie delle strutture venose, in particolare in corrispondenza dei poli inferiori.",
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
        titolo: "ECOCOLORDOPPLER DEI TRONCHI SOVRAORTICI",
        organi: [
          {
            id: "generale", nome: "Quadro generale", negativo: "",
            reperti: [
              { id: "angiosclerosi", etichetta: "Angiosclerosi diffusa", testo: "Si rileva diffusa angiosclerosi a carico del distretto esaminato." }
            ]
          },
          {
            id: "destra", nome: "Asse carotideo destro",
            negativo: "A destra: si documenta regolare pervietà della carotide comune, della carotide interna ed esterna in assenza di ateromi e/o di stenosi.",
            reperti: [
              { id: "minime", etichetta: "Ateromi, stenosi < 20%", testo: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nSottili ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%).", conclusione: "Ateromasia carotidea destra non emodinamicamente significativa." },
              { id: "lievi", etichetta: "Stenosi lieve (~30%)", testo: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa).", conclusione: "Stenosi carotidea interna destra di grado lieve." },
              { id: "moderate", etichetta: "Stenosi moderata (<50%)", testo: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%).", conclusione: "Stenosi carotidea interna destra di grado moderato." },
              { id: "significativa", etichetta: "Stenosi significativa", nuovo: true, testo: "A destra: regolare pervietà della carotide comune e della carotide esterna.\nPlacca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.", conclusione: "Stenosi emodinamicamente significativa della carotide interna destra." },
              { id: "tea", etichetta: "Esiti TEA", testo: "A destra: regolare pervietà dell'asse carotideo in esiti di rivascolarizzazione chirurgica senza evidenza di restenosi emodinamicamente significative.\nCarotide esterna pervia." }
            ]
          },
          {
            id: "sinistra", nome: "Asse carotideo sinistro",
            negativo: "A sinistra: si documenta regolare pervietà della carotide comune, della carotide interna ed esterna in assenza di ateromi e/o di stenosi.",
            reperti: [
              { id: "minime", etichetta: "Ateromi, stenosi < 20%", testo: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nSottili ateromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna, non determinanti stenosi significative (<20%).", conclusione: "Ateromasia carotidea sinistra non emodinamicamente significativa." },
              { id: "lievi", etichetta: "Stenosi lieve (~30%)", testo: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado lieve (30% circa).", conclusione: "Stenosi carotidea interna sinistra di grado lieve." },
              { id: "moderate", etichetta: "Stenosi moderata (<50%)", testo: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nAteromi fibrocalcifici si documentano alla biforcazione coinvolgenti l'origine della carotide interna e determinanti stenosi di grado moderato (<50%).", conclusione: "Stenosi carotidea interna sinistra di grado moderato." },
              { id: "significativa", etichetta: "Stenosi significativa", nuovo: true, testo: "A sinistra: regolare pervietà della carotide comune e della carotide esterna.\nPlacca ateromasica ___ alla biforcazione, coinvolgente l'origine della carotide interna e determinante stenosi emodinamicamente significativa, stimata del ___% (PSV ___ cm/s); utile valutazione specialistica chirurgo-vascolare.", conclusione: "Stenosi emodinamicamente significativa della carotide interna sinistra." },
              { id: "tea", etichetta: "Esiti TEA", testo: "A sinistra: regolare pervietà dell'asse carotideo in esiti di rivascolarizzazione chirurgica senza evidenza di restenosi emodinamicamente significative.\nCarotide esterna pervia." }
            ]
          },
          {
            id: "vertebrali", nome: "Arterie vertebrali",
            negativo: "Arterie vertebrali pervie con tracciati normodiretti.",
            reperti: [
              { id: "invertito", etichetta: "Flusso invertito / alternante", nuovo: true, testo: "Arteria vertebrale ___ con flusso ___ (invertito/alternante); utile studio delle arterie succlavie.", conclusione: "Alterazione del flusso vertebrale ___." },
              { id: "ipoplasica", etichetta: "Vertebrale ipoplasica", nuovo: true, testo: "Arterie vertebrali pervie con tracciati normodiretti; la vertebrale ___ appare di calibro ridotto, come per ipoplasia." }
            ]
          }
        ],
        conclusioneNegativa: "Ecocolordoppler dei tronchi sovraortici nei limiti della norma."
      },

      {
        id: "venoso-ai",
        nome: "Doppler venoso arti inferiori",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER VENOSO DEGLI ARTI INFERIORI",
        organi: [
          {
            id: "profondo", nome: "Sistema venoso profondo",
            negativo: "Regolare pervietà, calibro e continenza del sistema venoso profondo bilateralmente.\nIn particolare non si documentano segni di TVP in atto bilateralmente.",
            reperti: [
              { id: "tvp", etichetta: "Trombosi venosa profonda", nuovo: true, testo: "A ___ (destra/sinistra) la vena ___ risulta non comprimibile ed occupata da materiale ecogeno, in assenza di segnale di flusso al color-Doppler, come da trombosi venosa profonda ___ (occlusiva/non occlusiva).\nControlateralmente regolare pervietà, calibro e continenza del sistema venoso profondo.", conclusione: "Trombosi venosa profonda ___: comunicato al paziente / al curante per valutazione urgente." },
              { id: "esiti", etichetta: "Esiti di pregressa TVP", nuovo: true, testo: "A ___ la vena ___ appare ricanalizzata, con ispessimenti parietali e reflusso, come da esiti di pregressa trombosi.\nNon si documentano segni di TVP in atto.", conclusione: "Esiti di pregressa trombosi venosa profonda." }
            ]
          },
          {
            id: "destra", nome: "Safene destra",
            negativo: "A destra: regolare pervietà, calibro e continenza della safena interna ed esterna.\nNon si documentano segni di tromboflebite in atto.",
            reperti: [
              { id: "insufficienza", etichetta: "Insufficienza safena interna", nuovo: true, testo: "A destra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.\nNon si documentano segni di tromboflebite in atto.", conclusione: "Insufficienza della safena interna destra." },
              { id: "tromboflebite", etichetta: "Tromboflebite", nuovo: true, testo: "A destra: la safena ___ risulta non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.", conclusione: "Tromboflebite della safena ___ destra." }
            ]
          },
          {
            id: "sinistra", nome: "Safene sinistra",
            negativo: "A sinistra: regolare pervietà, calibro e continenza della safena interna ed esterna.\nNon si documentano segni di tromboflebite in atto.",
            reperti: [
              { id: "insufficienza", etichetta: "Insufficienza safena interna", nuovo: true, testo: "A sinistra: giunzione safeno-femorale incontinente con reflusso della safena interna esteso fino ___, calibro massimo ___ mm; regolare la safena esterna.\nNon si documentano segni di tromboflebite in atto.", conclusione: "Insufficienza della safena interna sinistra." },
              { id: "tromboflebite", etichetta: "Tromboflebite", nuovo: true, testo: "A sinistra: la safena ___ risulta non comprimibile ed occupata da materiale ecogeno per un tratto di circa ___ cm a livello ___, a ___ mm dalla giunzione, come da tromboflebite.", conclusione: "Tromboflebite della safena ___ sinistra." }
            ]
          },
          {
            id: "altro", nome: "Altri reperti", negativo: "",
            reperti: [
              { id: "baker", etichetta: "Cisti di Baker", testo: "Si riconosce una formazione cistica polilobata nel cavo popliteo di ___ attribuibile a cisti di Baker." },
              { id: "edema", etichetta: "Edema sottocutaneo", testo: "Imbibizione fluida sottocutanea diffusa da edema." }
            ]
          }
        ],
        conclusioneNegativa: "Non segni ecografici di trombosi venosa profonda né superficiale."
      },

      {
        id: "arterioso-ai",
        nome: "Doppler arterioso arti inferiori",
        gruppo: "Doppler",
        titolo: "ECOCOLORDOPPLER ARTERIOSO DEGLI ARTI INFERIORI",
        organi: [
          {
            id: "generale", nome: "Quadro generale",
            negativo: "Si documenta un quadro di modesta e diffusa ateromasia a carico del distretto esaminato.",
            reperti: [
              { id: "assente", etichetta: "Senza ateromasia", nuovo: true, testo: "Non si documentano significative alterazioni ateromasiche a carico del distretto esaminato." }
            ]
          },
          {
            id: "destra", nome: "Arto destro",
            negativo: "A destra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba che presentano tracciati di tipo trifasico in assenza di stenosi emodinamiche.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi / occlusione", nuovo: true, testo: "A destra: a livello ___ si documenta ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).", conclusione: "Arteriopatia obliterante dell'arto inferiore destro." }
            ]
          },
          {
            id: "sinistra", nome: "Arto sinistro",
            negativo: "A sinistra: regolare pervietà dell'asse femoro-popliteo e dei vasi di gamba che presentano tracciati di tipo trifasico in assenza di stenosi emodinamiche.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi / occlusione", nuovo: true, testo: "A sinistra: a livello ___ si documenta ___ (stenosi emodinamicamente significativa/occlusione), con tracciati a valle di tipo ___ (bifasico/monofasico).", conclusione: "Arteriopatia obliterante dell'arto inferiore sinistro." }
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
            negativo: "Aorta addominale ed assi iliaci pervi con calibro conservato.\nIn particolare non si documentano dilatazioni aneurismatiche né stenosi emodinamiche.",
            reperti: [
              { id: "aneurisma", etichetta: "Aneurisma", nuovo: true, testo: "Aorta addominale sottorenale sede di dilatazione aneurismatica con diametro massimo trasverso di ___ mm ed estensione longitudinale di circa ___ mm, con apposizione trombotica parietale ___; assi iliaci pervi con calibro conservato.", conclusione: "Aneurisma dell'aorta addominale sottorenale: utile valutazione chirurgo-vascolare." }
            ]
          },
          {
            id: "tracciati", nome: "Tracciati",
            negativo: "I tracciati sono di tipo regolarmente trifasico in tutto l'ambito esplorato.",
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
            negativo: "I reni, in sede, hanno regolari dimensioni ed ecostruttura con conservato gradiente cortico-midollare.\nLe vie escretrici urinarie non sono dilatate.",
            reperti: []
          },
          {
            id: "tecnica", nome: "Campionamento",
            negativo: "Si è proceduto al campionamento delle arterie renali all'origine e all'ilo e a campionamento dei vasi in sede intraparenchimale.",
            reperti: []
          },
          {
            id: "arterie", nome: "Arterie renali",
            negativo: "Le arterie renali sono regolarmente pervie senza evidenza di stenosi emodinamiche con indici di resistenza < 0.8.\nIl campionamento dei vasi intraparenchimali ha documentato un indice di resistenza < 0.7.",
            reperti: [
              { id: "stenosi", etichetta: "Stenosi arteria renale", nuovo: true, testo: "A livello dell'arteria renale ___ si documenta accelerazione del flusso all'origine (PSV ___ cm/s), con tracciati intraparenchimali a valle di tipo tardus-parvus, come per stenosi emodinamicamente significativa.\nRegolare l'arteria renale controlaterale.", conclusione: "Stenosi emodinamicamente significativa dell'arteria renale ___." }
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
            negativo: "Il rene presenta regolari dimensioni ed ecostruttura con conservata quota parenchimale corticale.\nLe vie escretrici urinarie non sono dilatate.",
            reperti: []
          },
          {
            id: "arteria", nome: "Arteria renale",
            negativo: "Regolare pervietà dell'arteria renale senza evidenza di stenosi anastomotica con IR ___.\nIl campionamento dei vasi intraparenchimali ha documentato regolare vascolarizzazione con IR < 0.7.",
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

  /* Metodiche in preparazione: i testi verranno dai documenti "REFERTI TC" e "REFERTI RX" */
  { id: "tc", nome: "TC", attiva: false, distretti: [] },
  { id: "rm", nome: "RM", attiva: false, distretti: [] },
  { id: "rx", nome: "RX", attiva: false, distretti: [] }
];
