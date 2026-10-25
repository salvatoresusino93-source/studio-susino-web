# Checklist del medico — cose da fare dopo la sessione del 25 ottobre 2026

In ordine di priorità. Ogni voce dice dove cliccare e cosa riportare in chat all'assistente. Nessuna di queste richiede modifiche al repository: le fa l'assistente dopo.

## 1. Inoltro delle email di Google dall'account .md (sblocca la diagnosi della scheda e dell'indicizzazione)

Perché: Google Business Profile e Search Console scrivono a salvatoresusino.md@gmail.com, che non è collegato all'assistente. Il connettore Gmail collega un solo account alla volta, quindi si inoltrano solo le email utili all'account salvatore.susino93@gmail.com.

Nell'account **salvatoresusino.md@gmail.com**:
1. Ingranaggio → "Visualizza tutte le impostazioni" → scheda **Inoltro e POP/IMAP** → "Aggiungi un indirizzo di inoltro" → `salvatore.susino93@gmail.com`. Google manda un codice al 93: aprirlo lì e confermare. Lasciare "Disattiva inoltro" come impostazione generale.
2. Scheda **Filtri e indirizzi bloccati** → "Crea un nuovo filtro" → campo **Da**, incollare esattamente:
   ```
   businessprofile-noreply@google.com OR business-noreply@google.com OR sc-noreply@google.com OR google-maps-noreply@google.com OR noreply-maps-issues@google.com OR maps-noreply@google.com
   ```
3. "Crea filtro" → spuntare **Inoltra a: salvatore.susino93@gmail.com** e **Applica l'etichetta: Google Studio** (crearla) e **Applica il filtro anche alle conversazioni corrispondenti**.

Nell'account **salvatore.susino93@gmail.com**:
4. Crea un filtro con campo **A** = `salvatoresusino.md@gmail.com`, azioni "Applica l'etichetta: Google Studio" e "Non archiviare mai".

Da riportare in chat: "inoltro attivo". L'assistente cerca `label:google-studio` e riferisce. Se si vuole fare prima, cercare nel .md le parole `sospeso`, `verifica`, `chiusa`, `contenuti rifiutati`, `azione manuale`, `problemi di indicizzazione` e incollare il testo delle email trovate.

## 2. Stripe: quale account alimenta RefertEco (sblocca i testi su pagamento online e rimborso)

Situazione: due account. `acct_1Td6063SkceELMsi` ha incassato 80 € il 31/05/2026 ("Ecografia addome completo — pagamento visita", telefono +39 351 374 6102, email .md). `acct_1UTyItDZndlvdLlo` è stato creato il 24/10/2026 con "Accedi con Google" dal 93, è in sandbox e non verificato.

Con ciascuna delle due Gmail su dashboard.stripe.com:
1. Selettore account in alto a sinistra: elenca gli account del login. Per ciascuno, Impostazioni → Dettagli account: l'ID `acct_...`.
2. Nell'account di maggio: Pagamenti → filtro 31 maggio 2026 → pagamento di 80 €; badge in alto "Live". Sviluppatori → **Webhook**: se c'è un endpoint con `referteco-production.up.railway.app` o `conferma.studiosusino.it`, è lui ad alimentare RefertEco. Sviluppatori → Chiavi API: annotare i primi 12 caratteri della chiave pubblicabile `pk_live_...`.
3. Su railway.app → progetto "beautiful-surprise" → servizio RefertEco → **Variables**: le variabili con "STRIPE" nel nome. I primi caratteri di `STRIPE_PUBLISHABLE_KEY` devono coincidere con il punto 2; se `STRIPE_SECRET_KEY` inizia con `sk_test_`, RefertEco è in prova.
4. Completare la verifica (documento, IBAN, partita IVA) solo sull'account che alimenta RefertEco; chiudere l'altro se è un doppione.

Da riportare in chat, una parola: **A** (Stripe non attivo in live: il sito dirà "pagamento in studio") oppure **B** (Stripe live e collegato: il sito tiene il pagamento online e dice tempi e modalità di rimborso). Le due versioni sono già pronte come PR in bozza; l'assistente unisce quella scelta e chiude l'altra. Per la B vanno confermati anche i tempi di rimborso proposti (entro 5 giorni lavorativi) e la presenza di Google Pay.

## 3. Pubblicazione della scheda Google Business Profile

Testi pronti in `docs/google-business-profile.md`, con la checklist operativa in fondo (sezione 9). Prima di pubblicare, tre verifiche: numeri di telefono, avvertenza clinica sul post dell'addome (elenco degli organi e "l'acqua è permessa"), lunghezza della descrizione istituzionale.

Dove: business.google.com con l'account salvatoresusino.md@gmail.com. Ordine: avvisi in alto → informazioni → servizi → foto → post → recensioni → domande e risposte.

Da riportare in chat: "scheda pubblicata" e, se Google ha mostrato un avviso, il suo testo.

## 4. Foto dell'ingresso e tempi di percorrenza (pagina Come arrivare)

Foto: scattarla di giorno al portone di Via dell'Arno 34 con l'insegna di Arcobaleno Dentisti e il civico. Salvarla come `images/ingresso-arcobaleno-dentisti.jpg` (JPEG, 1200×800 px, sotto 200 KB, senza volti). Poi in `come-arrivare.html` e `come-arrivare-en.html` togliere il commento intorno al blocco `<figure>` (istruzioni nel commento stesso) oppure mandare la foto in chat e lo fa l'assistente.

Tempi: nella pagina sono indicativi e marcati DA VERIFICARE (Ispica 15 min, Modica 25, Scicli 30 in auto; porto circa 30 min a piedi; stazione 10-15 min a piedi). Confermare o correggere in chat.

## 5. MioDottore

Il profilo non è più usato e non è citato dal sito. Sulla piattaforma risultano prezzi diversi dall'onorario del sito (100/90/80 €) e una voce con indirizzo "Via Ronchi 7, Rosolini, consulto online 50 €". Decidere se chiudere il profilo o allinearlo; nel repository non c'è nulla da fare.

## 6. Alt delle icone (decisione piccola)

Proposta in PR bozza: le icone in cima alle pagine esame sono decorative (alt vuoto), perché il titolo accanto nomina già l'esame. Da riportare in chat: "icone decorative, ok" oppure "icone informative", e in quel caso i testi alternativi da approvare sono in `docs/alt-icone-da-verificare.md`.

## Cosa fa l'assistente da solo

Ogni lunedì mattina controlla la PR "SEO settimanale" e la unisce se è puro SEO; se tocca testi clinici, pagamenti o Stripe la lascia aperta e riferisce. Le regole fisse: nessun testo clinico nuovo senza approvazione del medico, nessun dato inventato, nessuna PR unita se non è verde.
