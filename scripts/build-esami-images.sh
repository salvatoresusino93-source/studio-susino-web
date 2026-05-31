#!/bin/bash
# Genera miniature reali per l'elenco ecografie (solo schermate ecografiche vere).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/images/us-reali"
DEST="$ROOT/images/esami"

mkdir -p "$SRC" "$DEST"

# Fonti reali (schermate ecografiche già usate nelle pagine approfondimento)
for f in addome tiroide carotidi arti-inferiori muscolo-scheletrica; do
  if [[ ! -f "$SRC/$f.jpg" ]]; then
    case "$f" in
      addome) cp "$ROOT/images/esame-addome.jpg" "$SRC/addome.jpg" ;;
      tiroide) cp "$ROOT/images/esame-tiroide.jpg" "$SRC/tiroide.jpg" ;;
      carotidi) cp "$ROOT/images/esame-carotidi.jpg" "$SRC/carotidi.jpg" ;;
      arti-inferiori) cp "$ROOT/images/esame-arti-inferiori.jpg" "$SRC/arti-inferiori.jpg" ;;
      muscolo-scheletrica) cp "$ROOT/images/esame-muscolo-scheletrica.jpg" "$SRC/muscolo-scheletrica.jpg" ;;
    esac
  fi
done

normalize() {
  local src="$1"
  local dest="$2"
  local oy="${3:-0}"
  local ox="${4:-0}"

  sips -s format jpeg -Z 720 "$src" --out "$dest.tmp.jpg" >/dev/null
  sips -c 480 480 --cropOffset "$oy" "$ox" "$dest.tmp.jpg" --out "$dest" >/dev/null
  rm -f "$dest.tmp.jpg"
}

build() {
  normalize "$SRC/$1" "$DEST/$2.jpg" "${3:-0}" "${4:-0}"
}

build addome.jpg addome-completo 0 0
build addome.jpg addome-superiore 0 50
build addome.jpg addome-inferiore 40 0
build addome.jpg apparato-urinario 25 70
build addome.jpg renale 30 80
build addome.jpg vescico-prostatica 45 35
build addome.jpg prostata-transrettale 50 45
build addome.jpg scrotale-testicolare 55 25

build tiroide.jpg tiroide 0 0
build tiroide.jpg collo 0 45
build tiroide.jpg linfonodi 35 25

build muscolo-scheletrica.jpg muscolo-scheletrica 0 0
build muscolo-scheletrica.jpg spalla 0 0
build muscolo-scheletrica.jpg ginocchio 55 0
build muscolo-scheletrica.jpg anca 85 30
build muscolo-scheletrica.jpg anca-neonatale 45 55
build muscolo-scheletrica.jpg gomito 65 45
build muscolo-scheletrica.jpg polso-mano 75 70
build muscolo-scheletrica.jpg caviglia-piede 95 10
build muscolo-scheletrica.jpg parti-molli 25 90

build carotidi.jpg doppler-tsa 0 0
build addome.jpg doppler-aorta 15 25
build addome.jpg doppler-arterie-renali 28 75
build arti-inferiori.jpg doppler-arti-inferiori 0 0
build arti-inferiori.jpg doppler-arti-superiori 0 55

echo "Miniature reali generate: $(ls "$DEST"/*.jpg | wc -l | tr -d ' ')"
