# Stile dei referti — Dr. Salvatore Susino

Questo file è l'**unica fonte** delle regole di stile. Lo usano:
- il **linter** (`linter.js`), che legge le sezioni marcate «(linter)» e gli esempi;
- in futuro, il **system prompt** delle chiamate al modello che generano o correggono referti
  (il file va inserito così com'è, esempi compresi).

Si può modificare liberamente. Per le sezioni «(linter)» mantenere il formato:
elenchi puntati `- ` e tabelle `| … |`. Lingua dei referti: italiano.

Lo stile riguarda **solo la forma**: non cambiare la logica clinica, non inventare contenuti.

## Sintassi
- Stile telegrafico, nominale, impersonale.
- NESSUNA forma verbale finita: niente «è», «sono», «presenta», «si osserva», «si apprezza», «si segnala», «risulta», «appare».
- Vietate tutte le costruzioni impersonali con «si».
- Consentiti i participi passati usati come aggettivi (es. «Colecisti distesa», «Linfonodo ingrandito», «Lume obliterato»).

## Negatività
- Usare «Assente/Assenti» oppure «Non + sostantivo» (es. «Non versamento», «Non dilatazione delle vie biliari»).
- Alternare le formule per evitare ripetizioni nel referto.
- «Assenza di» solo quando le altre forme non funzionano.

## Contenuto
- Riportare SOLO i reperti effettivamente dettati. Non aggiungere negatività, organi o voci non menzionati.
- Evitare ridondanze e ripetizioni di parole (es. NO «di maggiori dimensioni… la maggiore»).
- In urgenza: descrivere per primo il reperto urgente, poi gli altri; non seguire l'ordine cronologico della dettatura.

## Conclusioni
- Includere solo voci che aggiungono valore rispetto ai reperti: sintesi, gerarchia di importanza, indicazioni operative.
- Omettere tutto ciò che ripete semplicemente il corpo del referto.

## Lessico
- «addensamento» (es. dell'adipe) — MAI «densificazione».
- Materiale endobronchiale: «obliterazione mucosa» / «bronco obliterato» — MAI «impatto mucoide», MAI «occupazione».
- TC addome: il versamento pleurico va introdotto con «Nelle scansioni craniali passanti per le basi polmonari».

## RM rachide lombosacrale (convenzioni)
- Nomenclatura Fardon-Milette v2.0 (2014): «protrusione focale» (<25% della circonferenza), «protrusione a larga base» (25-50%), «bulging» / «debordo discale circonferenziale» (>50%). Evitare «protrusione ad ampio raggio».
- «fissurazione dell'anulus fibroso» (non «rottura»).
- «canale vertebrale» (non «canale midollare») in sede lombare.
- Variare le formule tra i livelli:
  - impegno foraminale → «impegno foraminale» / «estensione in sede intraforaminale» / «estrinsecazione intraforaminale»
  - grasso periradicolare → «obliterazione del piano di clivaggio adiposo disco-radicolare» / «cancellazione del piano adiposo periradicolare» / «riduzione di ampiezza del piano di clivaggio con le radici emergenti»

## Esempi (prima → dopo)
Formato: `- "prima" (contesto facoltativo) → "dopo" / "dopo alternativo"`.
I test verificano che ogni «prima» venga segnalato dal linter e ogni «dopo» no.

- "Il fegato è di normali dimensioni e presenta ecostruttura omogenea." → "Fegato di normali dimensioni, a ecostruttura omogenea."
- "Non si osservano lesioni focali." → "Non lesioni focali." / "Assenti lesioni focali."
- "Si apprezza una falda di versamento pleurico bilaterale." (tc-addome) → "Nelle scansioni craniali passanti per le basi polmonari, falda di versamento pleurico bilaterale."
- "Si nota densificazione del tessuto adiposo pericolecistico." → "Addensamento dell'adipe pericolecistico."
- "Impatto mucoide nel bronco lobare inferiore destro." → "Obliterazione mucosa del bronco lobare inferiore destro."
- "La colecisti risulta distesa." → "Colecisti distesa."
- "Il tendine del capo lungo del bicipite brachiale è in sede." → "Tendine del capo lungo del bicipite brachiale in sede."
- "La borsa subacromion-deltoidea presenta pareti regolari e non risulta distesa." → "Borsa subacromion-deltoidea a pareti regolari, non distesa."
- "Non si osservano linfoadenopatie." → "Non linfoadenopatie." / "Assenti linfoadenopatie."

---

# Regole per il linter

Il linter **segnala, non corregge**. Le voci qui sotto si possono ampliare.

## Forme verbali vietate (linter)
Forme finite da segnalare (una o più per riga, separate da virgole). I participi
usati come aggettivi (es. «distesa», «improntante») non vanno elencati.

- è, sono, era, erano, sarà, saranno, sia, siano
- ha, hanno, aveva
- presenta, presentano, mostra, mostrano, appare, appaiono, risulta, risultano
- osserva, osservano, apprezza, apprezzano, nota, notano, rileva, rilevano
- documenta, documentano, evidenzia, evidenziano, riconosce, riconoscono
- visualizza, visualizzano, segnala, segnalano, reperta, repertano
- pare, paiono, sembra, sembrano, rientra, rientrano
- misura, misurano, occupa, occupano, determina, determinano
- interessa, interessano, coinvolge, coinvolgono, contiene, contengono
- aggetta, aggettano, impronta, improntano, protrude, protrudono
- risale, risalgono, prosegue, proseguono, decorre, decorrono, raggiunge, raggiungono
- associa, associano, concomita, concomitano, estende, estendono
- consente, consentono, permette, permettono, potrebbe, potrebbero
- consiglia, consigliano, indica, indicano, rimanda, procede, esegue

## Eccezioni alle forme verbali (linter)
Espressioni in cui la parola NON è un verbo (es. «nota» aggettivo, «misura» sostantivo).

- la nota, della nota, alla nota, nella nota, dalla nota, sulla nota, una nota
- le note, delle note, alle note, nelle note
- in minor misura, in maggior misura, su misura

## Termini vietati (linter)
| Vietato | Usare invece | Nota |
|---|---|---|
| densificazione | addensamento | |
| densificazioni | addensamenti | |
| impatto mucoide | obliterazione mucosa / bronco obliterato | materiale endobronchiale |
| occupazione | obliterazione mucosa / bronco obliterato | materiale endobronchiale |
| canale midollare | canale vertebrale | in sede lombare |
| protrusione ad ampio raggio | protrusione a larga base / bulging | Fardon-Milette v2.0 |
| rottura dell'anulus | fissurazione dell'anulus fibroso | |

## Regole di contesto (linter)
Se nel contesto indicato compare il testo della seconda colonna, nella stessa frase deve
comparire anche quello della terza.

| Contesto | Se compare | Deve comparire anche |
|---|---|---|
| tc-addome | versamento pleurico | Nelle scansioni craniali passanti per le basi polmonari |

## Parole esenti dal controllo ripetizioni (linter)
- destra, destro, sinistra, sinistro, bilaterale, bilateralmente

## Soglie (linter)
- assenza_di_max: 1
- formula_consecutiva_max: 2
- radice_min: 6
