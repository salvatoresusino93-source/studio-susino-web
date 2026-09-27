---
description: Solo controllo SEO tecnico di studiosusino.it, senza modificare nulla
argument-hint: "[testo facoltativo da Search Console]"
allowed-tools: Agent, Task, Read, Grep, Glob, Bash(ls:*), Bash(du:*), Bash(find:*), Bash(git log:*), Bash(curl -sI:*), Bash(npx --yes html-validate:*), WebFetch
---

Esegui solo il controllo, **senza modificare alcun file** (nemmeno `docs/seo-log.md`).

1. Lancia il subagent `seo-auditor` chiedendogli l'audit completo del sito, confrontato con l'ultima voce di `docs/seo-log.md`.
2. Se qui sotto c'è testo incollato da Google Search Console, passalo all'auditor e chiedigli di controllare per primi gli URL e i problemi lì citati (pagine escluse, "Duplicata, Google ha scelto un canonical diverso", 404, "Scansionata ma non indicizzata", ecc.).
3. Mostrami il report così com'è, poi in coda aggiungi:
   - le 3 correzioni più urgenti;
   - quali di queste `/seo-periodico` applicherebbe da solo (sicure) e quali richiedono una mia decisione.

Testo da Search Console (può essere vuoto):
$ARGUMENTS
