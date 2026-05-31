#!/bin/bash
# Scarica schermate ecografiche reali (CC / uso medico-educativo) per ogni esame.
# Eseguire una volta: bash scripts/fetch-us-reali.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/images/us-reali"
UA="StudioSusinoBot/1.0 (https://studiosusino.it; contact salvatoresusino.md@gmail.com)"

mkdir -p "$DEST"

download() {
  local url="$1"
  local out="$2"
  if curl -sfL -A "$UA" "$url" -o "$DEST/$out"; then
    local size
    size=$(wc -c < "$DEST/$out" | tr -d ' ')
    if [[ "$size" -lt 5000 ]]; then
      echo "WARN $out troppo piccolo ($size byte) — controllare URL"
      return 1
    fi
    echo "OK   $out"
  else
    echo "FAIL $out"
    return 1
  fi
}

echo "→ Copia scansioni già presenti nel sito…"
cp "$ROOT/images/esame-addome.jpg" "$DEST/src-addome-rene.jpg"
cp "$ROOT/images/esame-tiroide.jpg" "$DEST/src-tiroide.jpg"
cp "$ROOT/images/esame-carotidi.jpg" "$DEST/src-carotidi.jpg"
cp "$ROOT/images/esame-muscolo-scheletrica.jpg" "$DEST/src-spalla-tendine.jpg"
cp "$ROOT/images/esame-arti-inferiori.jpg" "$DEST/src-doppler-renale.jpg"

echo "→ Download immagini specifiche (Wikimedia Commons)…"
fail=0

download "https://upload.wikimedia.org/wikipedia/commons/4/42/Kidney_ultrasound_110315132820_1329070.jpg" "src-rene.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/a/af/Gallstones.PNG" "src-colecisti.png" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/3/3c/Ultrasound_of_trabeculated_urinary_bladder.jpg" "src-vescica.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/9/9d/Ultrasound_of_prostate.jpg" "src-vescico-prostatica.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ultrasound_of_human_scrotum.jpg" "src-scrotale.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/f/f8/Pleomorphic_adenoma_%281%29_parotid_gland.jpg" "src-parotide.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/a/ad/Enlarged_right_neck_lymph_node_with_loss_of_fatty_hilum_as_shown_on_ultrasound_neck.jpg" "src-linfonodo.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/8/8e/Simple_cyst_with_posterior_enhancement.jpg" "src-parti-molli.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/4/4a/Aorta_ultrasound_ND_110315142332_1434220.jpg" "src-aorta.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/b/b8/Ultrasonography_of_deep_vein_thrombosis_of_the_femoral_vein.jpg" "src-doppler-arti-inferiori.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/b/bd/DVTUS.PNG" "src-doppler-arti-superiori.png" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ultrasonography_of_hip_joint_injection_by_anterolateral_approach.jpg" "src-anca.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/7/79/Ultrasound_-_normal_newborn_right_hip_%28Graf_type_Ib%29.jpg" "src-anca-neonatale.jpg" || fail=1
download "https://upload.wikimedia.org/wikipedia/commons/a/a5/Ultrasonography_of_thrombosis_of_the_fibular_veins%2C_axial_plane.jpg" "src-caviglia.jpg" || fail=1

# Ginocchio / gomito / polso: su Commons le ecografie MSK sono poche.
# Se non trovi file adatti, sostituisci manualmente src-ginocchio.jpg, src-gomito.jpg, src-polso-mano.jpg
# con schermate del tuo ecografo (tendine rotuleo, epicondilo, nervo mediano).

download "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ultrasonography_of_a_suspected_malignant_lymph_node.jpg" "src-polso-mano.jpg" || fail=1

# MSK generica: crop diverso dalla spalla
cp "$DEST/src-spalla-tendine.jpg" "$DEST/src-msk-generica.jpg"

if [[ "$fail" -ne 0 ]]; then
  echo ""
  echo "Alcuni download sono falliti. Controlla la connessione e rilancia."
  echo "Puoi comunque rigenerare le miniature con: bash scripts/build-esami-images.sh"
  exit 1
fi

echo ""
echo "Fatto. Ora: bash scripts/build-esami-images.sh"
