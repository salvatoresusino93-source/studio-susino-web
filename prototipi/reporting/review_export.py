#!/usr/bin/env python3
"""
review_export.py — esporta in CSV i testi clinici di data.js, per la revisione
con Excel, LibreOffice o Google Fogli.

Produce le stesse colonne di review.html:
  esame;id_reperto;etichetta;lingua;testo_negativo;testo_positivo;
  conclusione;problemi;stato;note;revisore;data

Uso:
  python3 review_export.py                         # crea revisione-referti.csv
  python3 review_export.py -o revisione.csv        # nome del file a scelta
  python3 review_export.py --revisione backup.json # unisce stato/note dal backup
                                                   # esportato da review.html
  python3 review_export.py --sep ","               # separatore diverso da ";"

Nessuna dipendenza esterna: solo la libreria standard di Python 3.
data.js non viene modificato: il file viene solo letto.

Le regole di controllo sono le stesse di review.js: se ne cambi una,
aggiorna anche l'altra.
"""

import argparse
import csv
import json
import re
import sys
from pathlib import Path

CARTELLA = Path(__file__).resolve().parent
ID_RIGA_ESAME = "(esame)"
STATI = {"rivedere": "Da rivedere", "ok": "OK", "correggere": "Da correggere"}
COLONNE = [
    "esame", "id_reperto", "etichetta", "lingua", "testo_negativo", "testo_positivo",
    "conclusione", "problemi", "stato", "note", "revisore", "data",
]
SEGNAPOSTO = re.compile(
    r"\b(TODO|TBD|FIXME|XXX+)\b|da specificare|da definire|da completare|\?\?\?|lorem ipsum",
    re.IGNORECASE,
)
GRAFFE = re.compile(r"\{[^}]*\}")
MIN_LUNGHEZZA_COPIA = 20


# ---------------------------------------------------------------------------
# Lettore minimo di letterali JavaScript (oggetti, array, stringhe, numeri).
# Basta per data.js, che contiene solo dati: niente funzioni né espressioni.
# ---------------------------------------------------------------------------

class ErroreLettura(Exception):
    pass


class LettoreJS:
    def __init__(self, testo, inizio=0):
        self.t = testo
        self.i = inizio

    def errore(self, messaggio):
        riga = self.t.count("\n", 0, self.i) + 1
        raise ErroreLettura(f"data.js, riga {riga}: {messaggio}")

    def salta_spazi(self):
        """Salta spazi e commenti // e /* */."""
        while self.i < len(self.t):
            c = self.t[self.i]
            if c.isspace():
                self.i += 1
            elif self.t.startswith("//", self.i):
                fine = self.t.find("\n", self.i)
                self.i = len(self.t) if fine == -1 else fine + 1
            elif self.t.startswith("/*", self.i):
                fine = self.t.find("*/", self.i + 2)
                if fine == -1:
                    self.errore("commento /* non chiuso")
                self.i = fine + 2
            else:
                break

    def valore(self):
        self.salta_spazi()
        if self.i >= len(self.t):
            self.errore("fine del file inattesa")
        c = self.t[self.i]
        if c == "{":
            return self.oggetto()
        if c == "[":
            return self.lista()
        if c in "'\"`":
            return self.stringa()
        if c in "-+.0123456789":
            return self.numero()
        nome = self.identificatore()
        costanti = {"true": True, "false": False, "null": None, "undefined": None}
        if nome in costanti:
            return costanti[nome]
        self.errore(f"valore non supportato '{nome}' (data.js deve contenere solo dati)")

    def oggetto(self):
        self.i += 1  # {
        risultato = {}
        while True:
            self.salta_spazi()
            if self.t.startswith("}", self.i):
                self.i += 1
                return risultato
            c = self.t[self.i]
            if c in "'\"":
                chiave = self.stringa()
            elif c.isdigit():
                chiave = str(self.numero())
            else:
                chiave = self.identificatore()
            self.salta_spazi()
            if not self.t.startswith(":", self.i):
                self.errore(f"atteso ':' dopo la chiave '{chiave}'")
            self.i += 1
            risultato[chiave] = self.valore()
            self.salta_spazi()
            if self.t.startswith(",", self.i):
                self.i += 1
            elif not self.t.startswith("}", self.i):
                self.errore("attesa ',' o '}' nell'oggetto")

    def lista(self):
        self.i += 1  # [
        risultato = []
        while True:
            self.salta_spazi()
            if self.t.startswith("]", self.i):
                self.i += 1
                return risultato
            risultato.append(self.valore())
            self.salta_spazi()
            if self.t.startswith(",", self.i):
                self.i += 1
            elif not self.t.startswith("]", self.i):
                self.errore("attesa ',' o ']' nella lista")

    def stringa(self):
        apice = self.t[self.i]
        self.i += 1
        parti = []
        escape = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}
        while self.i < len(self.t):
            c = self.t[self.i]
            if c == apice:
                self.i += 1
                return "".join(parti)
            if apice == "`" and self.t.startswith("${", self.i):
                self.errore("template con ${...} non supportato")
            if c == "\\":
                s = self.t[self.i + 1]
                if s in escape:
                    parti.append(escape[s])
                    self.i += 2
                elif s == "u":
                    if self.t[self.i + 2] == "{":
                        fine = self.t.index("}", self.i)
                        parti.append(chr(int(self.t[self.i + 3:fine], 16)))
                        self.i = fine + 1
                    else:
                        parti.append(chr(int(self.t[self.i + 2:self.i + 6], 16)))
                        self.i += 6
                elif s == "x":
                    parti.append(chr(int(self.t[self.i + 2:self.i + 4], 16)))
                    self.i += 4
                elif s == "\n":  # continuazione di riga
                    self.i += 2
                else:
                    parti.append(s)
                    self.i += 2
                continue
            if c == "\n" and apice != "`":
                self.errore("stringa non chiusa")
            parti.append(c)
            self.i += 1
        self.errore("stringa non chiusa")

    def numero(self):
        m = re.compile(r"[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?").match(self.t, self.i)
        if not m:
            self.errore("numero non valido")
        self.i = m.end()
        testo = m.group(0)
        return float(testo) if any(x in testo for x in ".eE") else int(testo)

    def identificatore(self):
        m = re.compile(r"[A-Za-z_$][\w$]*").match(self.t, self.i)
        if not m:
            self.errore(f"carattere inatteso '{self.t[self.i]}'")
        self.i = m.end()
        return m.group(0)


def leggi_costante(testo, nome):
    """Trova `const NOME = ...` in data.js e ne legge il valore."""
    m = re.search(r"\b(?:const|let|var)\s+" + nome + r"\s*=", testo)
    if not m:
        raise ErroreLettura(f"costante {nome} non trovata in data.js")
    return LettoreJS(testo, m.end()).valore()


# ---------------------------------------------------------------------------
# Controlli automatici (stesse regole di review.js)
# ---------------------------------------------------------------------------

def testo_in(campo, lingua):
    """Testo in una lingua, oppure None se il campo o la lingua mancano."""
    if not isinstance(campo, dict) or lingua not in campo:
        return None
    valore = campo[lingua]
    return "" if valore is None else str(valore)


def controlla_campo(problemi, campo, lingua, nome, obbligatorio):
    if campo is None:
        if obbligatorio:
            problemi.append(("errore", f"{nome}: campo assente"))
        return
    if not isinstance(campo, dict):
        problemi.append(("errore", f"{nome}: formato non valido"))
        return
    valore = testo_in(campo, lingua)
    if valore is None:
        problemi.append(("errore", f"{nome}: traduzione {lingua.upper()} mancante"))
        return
    if not valore.strip():
        problemi.append(("errore", f"{nome}: vuoto"))
        return
    if SEGNAPOSTO.search(valore):
        problemi.append(("errore", f"{nome}: contiene un segnaposto (TODO, XXX, da specificare…)"))
    if GRAFFE.search(valore):
        problemi.append(("avviso", f"{nome}: graffe {{…}} non sostituite"))
    it = testo_in(campo, "it")
    if lingua != "it" and it and valore.strip() == it.strip() and len(valore) >= MIN_LUNGHEZZA_COPIA:
        problemi.append(("avviso", f"{nome}: identico all'italiano (non tradotto?)"))


def lingue_non_dichiarate(campi, lingue):
    extra = set()
    for c in campi:
        if isinstance(c, dict):
            extra.update(k for k in c if k not in lingue)
    return sorted(extra)


def costruisci_righe(esami, lingue):
    """Una riga '(esame)' e una riga per reperto, per ogni lingua."""
    righe = []
    conta_esami = {}
    for e in esami:
        if isinstance(e, dict) and e.get("id"):
            conta_esami[e["id"]] = conta_esami.get(e["id"], 0) + 1

    for n_esame, esame in enumerate(esami, 1):
        esame = esame if isinstance(esame, dict) else {}
        esame_id = esame.get("id") or f"(senza id #{n_esame})"
        reperti = esame.get("reperti") if isinstance(esame.get("reperti"), list) else []
        conta_reperti = {}
        for r in reperti:
            if isinstance(r, dict) and r.get("id"):
                conta_reperti[r["id"]] = conta_reperti.get(r["id"], 0) + 1

        # Riga dell'esame: titolo, tecnica, conclusione normale
        for lingua in lingue:
            problemi = []
            if not esame.get("id"):
                problemi.append(("errore", "esame senza id"))
            elif conta_esami.get(esame["id"], 0) > 1:
                problemi.append(("errore", f"id esame duplicato: {esame['id']}"))
            if not reperti:
                problemi.append(("errore", "esame senza reperti"))
            controlla_campo(problemi, esame.get("nome"), lingua, "nome esame", True)
            controlla_campo(problemi, esame.get("titolo"), lingua, "titolo", True)
            controlla_campo(problemi, esame.get("tecnica"), lingua, "tecnica", True)
            controlla_campo(problemi, esame.get("conclusioneNormale"), lingua, "conclusione normale", True)
            if lingua == lingue[0]:
                extra = lingue_non_dichiarate(
                    [esame.get(k) for k in ("nome", "titolo", "tecnica", "conclusioneNormale")], lingue)
                if extra:
                    problemi.append(("avviso", "lingue non dichiarate in LINGUE: " + ", ".join(extra)))
            righe.append({
                "esame": esame_id,
                "id_reperto": ID_RIGA_ESAME,
                "etichetta": testo_in(esame.get("titolo"), lingua),
                "lingua": lingua,
                "testo_negativo": testo_in(esame.get("tecnica"), lingua),
                "testo_positivo": None,
                "conclusione": testo_in(esame.get("conclusioneNormale"), lingua),
                "_problemi": problemi,
            })

        # Righe dei reperti
        for n_rep, r in enumerate(reperti, 1):
            r = r if isinstance(r, dict) else {}
            rep_id = r.get("id") or f"(senza id #{n_rep})"
            for lingua in lingue:
                problemi = []
                if not r.get("id"):
                    problemi.append(("errore", "reperto senza id"))
                elif conta_reperti.get(r["id"], 0) > 1:
                    problemi.append(("errore", "id reperto duplicato nell'esame"))
                controlla_campo(problemi, r.get("etichetta"), lingua, "etichetta", True)
                controlla_campo(problemi, r.get("negativo"), lingua, "negativo", True)
                controlla_campo(problemi, r.get("positivo"), lingua, "positivo", True)
                controlla_campo(problemi, r.get("conclusione"), lingua, "conclusione", False)
                if r.get("conclusione") is None:
                    problemi.append(("avviso", "conclusione assente: nel referto si usa l'etichetta"))
                neg = testo_in(r.get("negativo"), lingua)
                pos = testo_in(r.get("positivo"), lingua)
                if neg and pos and neg.strip() == pos.strip():
                    problemi.append(("errore", "testo negativo e positivo identici"))
                if lingua == lingue[0]:
                    extra = lingue_non_dichiarate(
                        [r.get(k) for k in ("etichetta", "negativo", "positivo", "conclusione")], lingue)
                    if extra:
                        problemi.append(("avviso", "lingue non dichiarate in LINGUE: " + ", ".join(extra)))
                righe.append({
                    "esame": esame_id,
                    "id_reperto": rep_id,
                    "etichetta": testo_in(r.get("etichetta"), lingua),
                    "lingua": lingua,
                    "testo_negativo": neg,
                    "testo_positivo": pos,
                    "conclusione": testo_in(r.get("conclusione"), lingua),
                    "_problemi": problemi,
                })
    return righe


def impronta(riga):
    """Stessa impronta FNV-1a di review.js (calcolata sui caratteri UTF-16)."""
    s = "␞".join(riga[k] or "" for k in ("etichetta", "testo_negativo", "testo_positivo", "conclusione"))
    h = 2166136261
    dati = s.encode("utf-16-le")
    for i in range(0, len(dati), 2):
        h ^= dati[i] | (dati[i + 1] << 8)
        h = (h * 16777619) & 0xFFFFFFFF
    return format(h, "x")


# ---------------------------------------------------------------------------
# Programma principale
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Esporta in CSV i testi di data.js per la revisione.")
    parser.add_argument("--data", default=str(CARTELLA / "data.js"), help="percorso di data.js")
    parser.add_argument("-o", "--output", default="revisione-referti.csv", help="file CSV da creare")
    parser.add_argument("--revisione", help="backup JSON esportato da review.html (stato, note, revisore, data)")
    parser.add_argument("--sep", default=";", help="separatore delle colonne (predefinito ';' per Excel in italiano)")
    args = parser.parse_args()

    try:
        testo = Path(args.data).read_text(encoding="utf-8")
        esami = leggi_costante(testo, "ESAMI")
        try:
            lingue = list(leggi_costante(testo, "LINGUE").keys())
        except ErroreLettura:
            lingue = ["it"]
    except (OSError, ErroreLettura) as e:
        sys.exit(f"Errore: {e}")

    if not isinstance(esami, list):
        sys.exit("Errore: ESAMI in data.js non è un array.")

    revisione = {}
    if args.revisione:
        try:
            revisione = json.loads(Path(args.revisione).read_text(encoding="utf-8")).get("revisione", {})
        except (OSError, ValueError, AttributeError) as e:
            sys.exit(f"Errore nel file di revisione: {e}")

    righe = costruisci_righe(esami, lingue)
    n_problemi = 0
    with open(args.output, "w", encoding="utf-8-sig", newline="") as f:  # BOM per Excel
        scrittore = csv.writer(f, delimiter=args.sep, quoting=csv.QUOTE_MINIMAL)
        scrittore.writerow(COLONNE)
        for riga in righe:
            chiave = f"{riga['esame']}|{riga['id_reperto']}|{riga['lingua']}"
            voce = revisione.get(chiave) or {}
            stato = voce.get("stato") if voce.get("stato") in STATI else "rivedere"
            problemi = list(riga["_problemi"])
            if stato != "rivedere" and voce.get("impronta") and voce["impronta"] != impronta(riga):
                problemi.append(("errore", f"testo modificato dopo la revisione del {voce.get('data') or '?'}"))
            if problemi:
                n_problemi += 1
            scrittore.writerow([
                riga["esame"], riga["id_reperto"], riga["etichetta"] or "", riga["lingua"],
                riga["testo_negativo"] or "", riga["testo_positivo"] or "", riga["conclusione"] or "",
                " | ".join(f"{livello.upper()}: {t}" for livello, t in problemi),
                STATI[stato], voce.get("note", ""), voce.get("revisore", ""), voce.get("data", ""),
            ])

    print(f"Creato {args.output}: {len(righe)} righe ({len(esami)} esami, lingue: {', '.join(lingue)}), "
          f"{n_problemi} con problemi automatici.")


if __name__ == "__main__":
    main()
