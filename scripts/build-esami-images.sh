#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/images/esami"
ASSETS="/Users/salvatoresusino/.cursor/projects/empty-window/assets"

mkdir -p "$DEST"

normalize() {
  local src="$1"
  local dest="$2"
  local crop_offset="${3:-0}"

  if [[ ! -f "$src" ]]; then
    echo "Missing source: $src" >&2
    return 1
  fi

  sips -s format jpeg -Z 640 "$src" --out "$dest.tmp.jpg" >/dev/null
  sips -c 480 480 --cropOffset "$crop_offset" 0 "$dest.tmp.jpg" --out "$dest" >/dev/null
  rm -f "$dest.tmp.jpg"
}

build_one() {
  normalize "$1" "$DEST/$2.jpg" "${3:-0}"
}

rm -f "$DEST"/*.svg

build_one "$ASSETS/addome-completo.jpg" "addome-completo" 40
build_one "$ASSETS/addome-superiore.jpg" "addome-superiore" 60
build_one "$ASSETS/addome-inferiore.jpg" "addome-inferiore" 80
build_one "$ASSETS/apparato-urinario.jpg" "apparato-urinario" 0
build_one "$ASSETS/renale.jpg" "renale" 20
build_one "$ASSETS/vescico-prostatica.jpg" "vescico-prostatica" 50
build_one "$ASSETS/prostata-transrettale.jpg" "prostata-transrettale" 30
build_one "$ASSETS/scrotale-testicolare.jpg" "scrotale-testicolare" 0
build_one "$ASSETS/tiroide.jpg" "tiroide" 0
build_one "$ASSETS/collo.jpg" "collo" 40
build_one "$ASSETS/muscolo-scheletrica.jpg" "muscolo-scheletrica" 0
build_one "$ASSETS/spalla.jpg" "spalla" 0
build_one "$ASSETS/ginocchio.jpg" "ginocchio" 0
build_one "$ASSETS/anca.jpg" "anca" 0
build_one "$ASSETS/anca.jpg" "anca-neonatale" 110
build_one "$ASSETS/gomito.jpg" "gomito" 0
build_one "$ASSETS/polso-mano.jpg" "polso-mano" 0
build_one "$ASSETS/caviglia-piede.jpg" "caviglia-piede" 0
build_one "$ASSETS/parti-molli.jpg" "parti-molli" 0
build_one "$ASSETS/doppler-tsa.jpg" "doppler-tsa" 0
build_one "$ASSETS/addome-completo.jpg" "doppler-aorta" 100
build_one "$ASSETS/renale.jpg" "doppler-arterie-renali" 40
build_one "$ASSETS/doppler.jpg" "doppler-arti-inferiori" 20
build_one "$ASSETS/doppler.jpg" "doppler-arti-superiori" 80
build_one "$ASSETS/tiroide-anatomia.jpg" "linfonodi" 20

echo "Built 25 exam thumbnails in $DEST"
