#!/bin/bash
# Miniature elenco ecografie: una fonte dedicata per ogni esame (no ritagli a caso).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/images/us-reali"
DEST="$ROOT/images/esami"

mkdir -p "$SRC" "$DEST"

for pair in \
  "src-addome-rene:esame-addome.jpg" \
  "src-tiroide:esame-tiroide.jpg" \
  "src-carotidi:esame-carotidi.jpg" \
  "src-spalla-tendine:esame-muscolo-scheletrica.jpg" \
  "src-doppler-renale:esame-arti-inferiori.jpg" \
  "src-msk-generica:esame-muscolo-scheletrica.jpg"; do
  key="${pair%%:*}"
  file="${pair##*:}"
  if [[ ! -f "$SRC/$key.jpg" && -f "$ROOT/images/$file" ]]; then
    cp "$ROOT/images/$file" "$SRC/$key.jpg"
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

build_from() {
  local src="$1"
  local id="$2"
  local oy="${3:-0}"
  local ox="${4:-0}"
  normalize "$src" "$DEST/$id.jpg" "$oy" "$ox"
}

pick_src() {
  local candidate
  for candidate in "$@"; do
    if [[ -f "$SRC/$candidate" ]]; then
      echo "$SRC/$candidate"
      return 0
    fi
  done
  echo "Nessuna fonte per: $*" >&2
  return 1
}

echo "Generazione miniature per esame…"

build_from "$(pick_src src-addome-rene.jpg)" addome-completo 0 0
build_from "$(pick_src src-addome-rene.jpg src-rene.jpg src-colecisti.png)" addome-superiore 0 40
build_from "$(pick_src src-vescica.jpg src-addome-rene.jpg)" addome-inferiore 0 0
build_from "$(pick_src src-rene.jpg src-addome-rene.jpg)" apparato-urinario 20 60
build_from "$(pick_src src-rene.jpg src-addome-rene.jpg)" renale 25 70
build_from "$(pick_src src-vescico-prostatica.jpg src-vescica.jpg src-addome-rene.jpg)" vescico-prostatica 0 0
build_from "$(pick_src src-scrotale.jpg src-addome-rene.jpg)" scrotale-testicolare 0 0
build_from "$(pick_src src-tiroide.jpg)" tiroide 0 0
build_from "$(pick_src src-parotide.jpg src-tiroide.jpg)" collo 0 0
build_from "$(pick_src src-msk-generica.jpg src-spalla-tendine.jpg)" muscolo-scheletrica 80 0
build_from "$(pick_src src-spalla-tendine.jpg)" spalla 0 0
build_from "$(pick_src src-ginocchio.jpg src-spalla-tendine.jpg)" ginocchio 0 0
build_from "$(pick_src src-anca.jpg src-spalla-tendine.jpg)" anca 0 0
build_from "$(pick_src src-anca-neonatale.jpg src-anca.jpg src-spalla-tendine.jpg)" anca-neonatale 0 0
build_from "$(pick_src src-gomito.jpg src-spalla-tendine.jpg)" gomito 0 0
build_from "$(pick_src src-polso-mano.jpg src-spalla-tendine.jpg)" polso-mano 0 0
build_from "$(pick_src src-caviglia.jpg src-doppler-arti-inferiori.jpg src-spalla-tendine.jpg)" caviglia-piede 0 0
build_from "$(pick_src src-parti-molli.jpg src-colecisti.png src-addome-rene.jpg)" parti-molli 0 0
build_from "$(pick_src src-carotidi.jpg)" doppler-tsa 0 0
build_from "$(pick_src src-aorta.jpg src-addome-rene.jpg)" doppler-aorta 10 20
build_from "$(pick_src src-doppler-renale.jpg)" doppler-arterie-renali 0 0
build_from "$(pick_src src-doppler-arti-inferiori.jpg src-carotidi.jpg)" doppler-arti-inferiori 0 0
build_from "$(pick_src src-doppler-arti-superiori.png src-doppler-arti-inferiori.jpg src-carotidi.jpg)" doppler-arti-superiori 0 0
build_from "$(pick_src src-linfonodo.jpg src-parotide.jpg src-tiroide.jpg)" linfonodi 0 0

count="$(ls "$DEST"/*.jpg 2>/dev/null | wc -l | tr -d ' ')"
echo "Miniature generate: $count"
echo "Per immagini anatomicamente corrette su tutti gli esami: bash scripts/fetch-us-reali.sh && bash scripts/build-esami-images.sh"
