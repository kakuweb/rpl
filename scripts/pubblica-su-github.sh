#!/bin/bash
# Crea il repository su GitHub e ci carica il progetto.
#
# Prima di lanciarlo serve essere autenticati una volta sola:
#   ~/.local/bin/gh auth login
# (scegli GitHub.com > HTTPS > autenticazione via browser)
#
# Uso:
#   ./scripts/pubblica-su-github.sh [nome-repo] [--public]
# Senza argomenti: repo "sito-multipagina", privato.

set -euo pipefail

# node e gh non sono nel PATH di sistema su questa macchina.
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"

cd "$(dirname "$0")/.."

NOME="${1:-sito-multipagina}"
VISIBILITA="--private"
[ "${2:-}" = "--public" ] && VISIBILITA="--public"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh non trovato. Attesa in ~/.local/bin/gh" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Non sei autenticato su GitHub. Lancia prima:" >&2
  echo "  ~/.local/bin/gh auth login" >&2
  exit 1
fi

UTENTE=$(gh api user --jq .login)
echo "Autenticato come: $UTENTE"
echo "Repository:       $UTENTE/$NOME ($VISIBILITA)"
echo

if git remote get-url origin >/dev/null 2>&1; then
  echo "Esiste già un remote 'origin': $(git remote get-url origin)"
  echo "Carico su quello invece di creare un repo nuovo."
  git push -u origin main
else
  gh repo create "$NOME" $VISIBILITA --source=. --remote=origin --push
fi

echo
echo "Fatto. Il repository è su:"
gh repo view --json url --jq .url
echo
echo "Per invitare il collaboratore:"
echo "  gh repo add-collaborator $UTENTE/$NOME <utente-github> --permission push"
