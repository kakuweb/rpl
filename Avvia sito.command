#!/bin/bash
# Doppio clic su questo file per riaccendere il sito su http://localhost:3000
# Il server resta attivo anche dopo aver chiuso questa finestra.
# (Va rilanciato dopo ogni riavvio del Mac.)

cd "$(dirname "$0")"
export PATH="$HOME/.local/node/bin:$PATH"

if curl -s -o /dev/null --max-time 5 http://localhost:3000/; then
  echo "Il sito è già attivo."
else
  mkdir -p .logs
  nohup npm run dev > .logs/dev.log 2>&1 &
  disown $! 2>/dev/null
  printf "Avvio"
  for i in $(seq 1 25); do
    curl -s -o /dev/null --max-time 3 http://localhost:3000/ && break
    printf "."; sleep 1
  done
  echo
fi

echo
echo "  http://localhost:3000"
echo
open http://localhost:3000
echo "Puoi chiudere questa finestra: il sito resta acceso."
sleep 3
