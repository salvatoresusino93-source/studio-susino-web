# Google Business Profile API — domanda di "Basic API Access"

Bozza del 25/10/2026, solo documentazione. Serve al medico per decidere se avviare la richiesta. Nessun codice, nessuna credenziale.

## Perché serve
Le API di Google Business Profile (per leggere e modificare la scheda da un programma, per esempio da un server MCP) restano bloccate finché Google non approva il progetto Cloud: la quota parte da **0 richieste al minuto** e sale a 300 solo dopo l'approvazione. L'API delle **Domande e risposte è stata dismessa il 3 novembre 2025**, senza sostituto: le 6 domande preparate in `docs/google-business-profile.md` si pubblicano comunque a mano dalla scheda.

Finché la quota è 0, la scheda si gestisce a mano su business.google.com. La domanda si può avviare in parallelo: non blocca nulla e non costa.

## Cosa serve prima di compilare il modulo
1. Un **progetto Google Cloud** creato con l'account che possiede la scheda (salvatoresusino.md@gmail.com): console.cloud.google.com → "Nuovo progetto", nome a piacere (es. "Studio Susino GBP"). Annotare il **numero del progetto** (card "Informazioni sul progetto" nella Dashboard).
2. La scheda deve essere **verificata** e il richiedente deve essere **proprietario** della scheda, non solo gestore.
3. Il **sito web** della scheda deve corrispondere a quello indicato nel modulo: https://studiosusino.it/. **Rischio probabile, non requisito ufficiale:** la corrispondenza tra il dominio dell'email usata nel modulo e il dominio del sito non è una regola documentata da Google, ma un pattern riportato da molti utenti: le richieste inviate da una Gmail vengono spesso respinte o rallentate. Una casella del tipo `info@studiosusino.it` (Aruba la offre con il dominio) riduce il rischio. Da valutare prima di inviare.
4. Una **privacy policy** raggiungibile sul sito: c'è, `https://studiosusino.it/privacy.html`.

## Come si invia
1. Aprire il modulo di contatto delle Business Profile APIs: developers.google.com/my-business → "Contact us" / "Request access" (il link esatto è nella pagina "Prerequisites" della documentazione ufficiale).
2. Nel menu a tendina scegliere **"Application for Basic API Access"**. Non chiedere un aumento di quota: con quota 0 va chiesto l'accesso base.
3. Compilare: numero del progetto Cloud; email del proprietario della scheda; nome dell'attività (Studio Ecografico Dr. Salvatore Susino); sito web; descrizione dell'uso.

Descrizione dell'uso, da incollare (in inglese, come chiede il modulo):

```
Single-location medical ultrasound practice in Pozzallo (RG), Italy, managing its own Business Profile. Intended use: read-only access to the profile's information, reviews and performance data for the practice owner, and keeping opening hours, services and website link consistent with the practice website (https://studiosusino.it/). No third-party clients, no resale, no automated posting of marketing content. One location, one profile, low request volume.
```

4. Inviare e annotare la data. Google risponde per email all'indirizzo indicato.

## Cosa aspettarsi
- Tempi: le fonti non concordano; le guide citano da alcuni giorni a qualche settimana, con un riferimento a 14 giorni nelle FAQ di Google. Nessuna garanzia.
- Esito: si vede in Cloud Console → "API e servizi" → "Quote" cercando "Business Profile": quota 0 = non approvato, 300 = approvato. Solo dopo l'approvazione compaiono le API nella Libreria per essere abilitate.
- Il processo è pensato per agenzie e catene con molte sedi: una richiesta da un singolo studio, soprattutto con una Gmail, può essere respinta senza motivazione (rischio riportato dagli utenti, non regola di Google). In quel caso la scheda resta a mano, come adesso, senza alcuna perdita.
- Anche dopo l'approvazione: le API usano solo OAuth 2.0 (niente chiavi API), e le Domande e risposte restano fuori.

## Decisione per il medico
- Avviare la richiesta: sì se si vuole provare, a costo zero, sapendo che può richiedere settimane e può essere respinta.
- Non avviarla: nessuna conseguenza, la scheda si cura a mano con `docs/google-business-profile.md`.
