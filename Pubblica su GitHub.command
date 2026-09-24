#!/bin/bash
# Doppio clic: autentica su GitHub (una volta sola) e carica il progetto su
# https://github.com/robophysics-poliba/rpl
#
# L'autenticazione passa dal browser, perciò va fatta da qui e non può essere
# automatizzata: GitHub apre una pagina dove confermi con il tuo account.

cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"

echo "== Pubblicazione su GitHub =="
echo

if ! command -v gh >/dev/null 2>&1; then
  echo "gh non trovato in ~/.local/bin. Interrompo."
  echo; read -n 1 -s -r -p "Premi un tasto per chiudere."; exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Non risulti autenticato. Parte ora la procedura:"
  echo "  scegli  GitHub.com  >  HTTPS  >  Login with a web browser"
  echo
  gh auth login || {
    echo; echo "Autenticazione non completata. Interrompo."
    echo; read -n 1 -s -r -p "Premi un tasto per chiudere."; exit 1
  }
  echo
fi

echo "Autenticato come: $(gh api user --jq .login 2>/dev/null)"
echo "Remote:           $(git remote get-url origin 2>/dev/null)"
echo

echo "Carico $(git rev-list --count HEAD) commit..."
if git push -u origin main; then
  echo
  echo "Fatto. Il progetto è su:"
  echo "  https://github.com/robophysics-poliba/rpl"
  echo
  echo "Per invitare un collaboratore:"
  echo "  gh repo add-collaborator robophysics-poliba/rpl <utente-github> --permission push"
else
  echo
  echo "Il push è fallito. Il messaggio di errore è qui sopra."
fi

echo
read -n 1 -s -r -p "Premi un tasto per chiudere."
