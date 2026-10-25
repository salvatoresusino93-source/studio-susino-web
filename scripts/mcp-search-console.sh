#!/bin/sh
# Avvia il server MCP di Google Search Console (AminForou/mcp-gsc, pacchetto PyPI
# "mcp-search-console") con un service account, in sola lettura.
#
# La chiave JSON del service account NON sta nel repository. Viene letta da:
#   1. GSC_CREDENTIALS_PATH  = percorso del file JSON (uso sul Mac del medico), oppure
#   2. GSC_SERVICE_ACCOUNT_JSON = contenuto del JSON (segreto dell'ambiente cloud):
#      viene scritto in un file temporaneo leggibile solo dall'utente corrente.
# Strumenti distruttivi (add_site, delete_site, delete_sitemap) disattivati.
set -eu

if [ -z "${GSC_CREDENTIALS_PATH:-}" ]; then
  if [ -n "${GSC_SERVICE_ACCOUNT_JSON:-}" ]; then
    dir="${XDG_RUNTIME_DIR:-${TMPDIR:-/tmp}}"
    GSC_CREDENTIALS_PATH="$dir/studio-susino-gsc-key.json"
    umask 077
    printf '%s' "$GSC_SERVICE_ACCOUNT_JSON" > "$GSC_CREDENTIALS_PATH"
  else
    echo "mcp-search-console: manca GSC_CREDENTIALS_PATH (file) o GSC_SERVICE_ACCOUNT_JSON (contenuto). Vedi CLAUDE.md, sezione Search Console." >&2
    exit 1
  fi
fi
export GSC_CREDENTIALS_PATH
export GSC_SKIP_OAUTH="${GSC_SKIP_OAUTH:-true}"
export GSC_ALLOW_DESTRUCTIVE="${GSC_ALLOW_DESTRUCTIVE:-false}"

if command -v uvx >/dev/null 2>&1; then
  exec uvx mcp-search-console
elif command -v pipx >/dev/null 2>&1; then
  exec pipx run mcp-search-console
else
  echo "mcp-search-console: serve 'uv' (https://docs.astral.sh/uv/) oppure 'pipx' per avviare il server." >&2
  exit 1
fi
