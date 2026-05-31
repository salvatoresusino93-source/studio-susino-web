#!/bin/bash
# Scarica schermate ecografiche reali da Radiopaedia.org (una per esame).
# Eseguire: bash scripts/fetch-us-reali.sh && bash scripts/build-esami-images.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Download immagini da Radiopaedia.org…"
node scripts/fetch-radiopaedia-us.mjs

echo ""
echo "→ Rigenerazione miniature…"
bash scripts/build-esami-images.sh
