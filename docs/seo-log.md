# Registro SEO — studiosusino.it

Voci in ordine dalla più recente. Ogni voce la scrive `/seo-periodico` (in locale o dal workflow del lunedì).
Gli agenti leggono la voce più recente per segnalare solo novità e regressioni: non cancellare le voci vecchie.
Quando decidi su una proposta o un "Da verificare", spunta la casella e aggiungi una nota (es. "scartata: non offriamo l'esame").

<!-- NUOVE VOCI SOTTO QUESTA RIGA -->

## 2026-09-28 — Title, contenuti sottili, FAQ differenziate

**Fonte dati:** report `docs/seo-fix-report.md` (Search Console: 30 pagine "Scansionata ma non indicizzata").

### Modifiche fatte
- Title ≤ 60 e description ≤ 160 su tutte le pagine indicizzabili (generatore + 16 pagine a mano); controllo aggiunto a `verifica-seo.js`.
- Ampliate chi-sono, studio, contatti (IT/EN) con sole informazioni già presenti sul sito; 4 FAQ su contatti.
- Tolte le 4 FAQ generiche identiche dalle pagine esame; nuove FAQ per gruppo (`scripts/faq-gruppi.js`) a rotazione; tradotte in EN le 18 FAQ specifiche esistenti.
- FAQPage ricostruito dalle FAQ visibili su 17 pagine (15 non coincidevano); controllo aggiunto a `verifica-seo.js`.
- Somiglianza tra pagine esame: coppie > 50% da 42 a 0, massimo da 61% a 45%.

### Da verificare per il medico
- [ ] 22 FAQ di gruppo in `scripts/faq-gruppi.js` (commenti `DA VERIFICARE` in 44 pagine): dopo la revisione `verificata: true` e rigenerare.
- [ ] Traduzioni EN delle FAQ specifiche in `js/esami-paziente-en.js`.
- [ ] Prenota e tariffe: una FAQ in meno nella versione EN (preesistente).
- [ ] FAQ specifiche (`faqExtra`) per gli esami che non le hanno ancora (elenco nel report).

## 2026-09-27 — Impianto del sistema

**Fonte dati:** nessun audit ancora eseguito.

### Modifiche fatte
- Creati gli agenti `seo-auditor`, `content-editor`, `seo-strategist`, `design-curator` e i comandi `/seo-periodico`, `/seo-audit`.
- Creato il workflow `.github/workflows/seo-settimanale.yml` (lunedì mattina, apre una PR).

### Da verificare per il medico
- [ ] Configurare i secret del repository (vedi CLAUDE.md, sezione "Automazione settimanale").
