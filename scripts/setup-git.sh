#!/bin/bash
# Da lanciare UNA VOLTA su ogni computer che lavora al progetto.
# La configurazione di git è locale alla copia del repo: non viaggia con i
# commit, quindi ogni macchina se la deve impostare.

set -e
cd "$(dirname "$0")/.."

git config pull.rebase true
git config rebase.autoStash true
git config push.autoSetupRemote true
git config merge.conflictStyle zdiff3

echo "Configurato:"
for k in pull.rebase rebase.autoStash push.autoSetupRemote merge.conflictStyle; do
  printf "  %-22s %s\n" "$k" "$(git config --get "$k")"
done
echo
echo "pull.rebase        i tuoi commit vengono rimessi sopra a quelli scaricati,"
echo "                   invece di creare un commit di merge a ogni aggiornamento"
echo "rebase.autoStash   puoi aggiornare anche con modifiche in corso"
echo "push.autoSetupRemote  i branch nuovi si pushano con un semplice 'git push'"
echo "merge.conflictStyle   nei conflitti mostra anche il punto di partenza comune"
