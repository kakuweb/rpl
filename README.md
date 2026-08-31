# RoboPhysics Laboratory — sito

Porting del wireframe `rpl-site-wireframe-en.html` da pagina singola a sito
multipagina: ogni sezione è diventata un URL vero, e i contenuti arrivano da
Supabase invece che dall'HTML.

Lo stile è quello del wireframe, invariato: `src/app/globals.css` è il suo CSS
preso così com'è, e i componenti riusano le stesse classi (`.hero`, `.panel`,
`.card-persona`, `.pub-item`…). Le uniche regole nuove sono in fondo al file,
per le pagine che il wireframe non aveva.

## Avvio

```bash
npm install
npm run dev          # http://localhost:3000
```

Il sito parte anche senza database: in quel caso serve i contenuti di
`src/lib/data/content.ts` e mostra una striscia gialla in fondo alle pagine.

Su questa macchina node e npm stanno in `~/.local/node/bin`, che non è nel
PATH: in una shell nuova va esportato prima, altrimenti `npm` non si trova.

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

### Tenere il sito sempre acceso

`npm run dev` vive quanto il terminale che l'ha lanciato: chiuso quello — o
chiusa la sessione che l'ha avviato — l'indirizzo non risponde più. Chiudere il
browser invece non c'entra: il server sta da un'altra parte.

Per sganciarlo dal terminale, una volta sola:

```bash
nohup npm run dev > .logs/dev.log 2>&1 &
```

Regge la chiusura del terminale e della sessione, **non il riavvio del Mac**.
Dopo un riavvio va rilanciato: il modo più rapido è il doppio clic su
`Avvia sito.command` nella cartella del progetto, che lo riaccende in
background e apre il browser.

#### Perché non c'è un avvio automatico al login

Ci sarebbe `scripts/com.rophysics.sito.plist`, un LaunchAgent che
partirebbe a ogni login. **Non funziona finché il progetto sta in
`~/Desktop`**: macOS protegge Desktop, Documenti e Download con TCC, e un
processo lanciato da `launchd` non ha quel permesso. Il servizio parte e
muore subito con:

```
Error: EPERM: process.cwd failed with error operation not permitted, uv_cwd
```

e con `KeepAlive` va in loop di riavvii. Per usarlo servirebbe spostare il
progetto fuori dalle cartelle protette (per esempio `~/Sites/`), poi:

```bash
cp scripts/com.rophysics.sito.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.rophysics.sito.plist
```

I percorsi assoluti dentro il plist vanno aggiornati alla nuova posizione.
Per fermarlo: `launchctl bootout gui/$(id -u)/com.rophysics.sito`.

I log stanno in `.logs/`.

## Collaborare

```bash
git clone <url-del-repo>
cd sito-multipagina
npm install
cp .env.local.example .env.local   # poi riempilo, vedi Database
npm run dev                        # http://localhost:3000
```

Il sito parte anche con `.env.local` vuoto: senza database serve i contenuti
di `src/lib/data/content.ts`, quindi si può lavorare su layout e testi senza
avere le credenziali.

Fuori dal repo restano tre cose, per scelta:

- `.env.local` — contiene le chiavi, fra cui la `service_role` che scavalca
  ogni policy. Non va mai committata: si passa a voce o da un gestore di
  password. Il modello delle variabili è `.env.local.example`.
- `img/` e `Carosello outing/` — foto originali, decine di megabyte, non
  usate dal sito (che legge `public/`). Si condividono a parte: git non
  dimentica, e ogni scatto aggiunto peserebbe per sempre su ogni clone.
- `node_modules/` e `.next/` — si rigenerano con `npm install` e
  `npm run build`.

### Pubblicare il repository

Il progetto è già sotto git. Per metterlo su GitHub serve autenticarsi una
volta sola — è un passaggio che richiede il browser, quindi va fatto a mano:

```bash
~/.local/bin/gh auth login      # GitHub.com > HTTPS > via browser
./scripts/pubblica-su-github.sh # crea il repo privato e carica
```

Lo script accetta un nome diverso e `--public`:
`./scripts/pubblica-su-github.sh nome-repo --public`.

`gh` sta in `~/.local/bin`, che come `~/.local/node/bin` non è nel PATH:
lo script se lo aggiunge da sé.

Prima di aprire una pull request:

```bash
npm run typecheck
npm run lint
npm run build
```

## Database

Le variabili stanno in `.env.local` (vedi `.env.local.example`).

```bash
npm run db:setup            # crea le tabelle e carica i contenuti
npm run db:setup schema     # solo le tabelle
npm run db:setup seed       # solo i contenuti
```

`db:setup` usa `SUPABASE_DB_URL`, la connection string Postgres: le chiavi
anon e service_role passano da PostgREST, che esegue query ma non `create
table`. In alternativa si incollano `supabase/schema.sql` e `supabase/seed.sql`
nel SQL Editor di Supabase.

### Tabelle

| Tabella            | Alimenta                                         |
| ------------------ | ------------------------------------------------ |
| `people`           | `/people`, raggruppata per `role_group`          |
| `papers`           | `/research`, `/publications`, `/research/[slug]` |
| `research_lines`   | i quattro riquadri ERC RoboFluid in `/research`  |
| `news`             | `/news` e `/news/[slug]`                         |
| `videos`           | `/videos`                                        |
| `contact_messages` | ci scrive il form di `/contacts`                 |

Le prime cinque sono in sola lettura pubblica e mostrano solo le righe con
`published = true`; `contact_messages` accetta insert ma non è leggibile dal
sito — i messaggi si consultano dal Table Editor di Supabase. Le policy sono in
`supabase/schema.sql`: sono loro a proteggere i dati, non la segretezza della
chiave anon, che è pubblica per definizione e finisce nel bundle del browser.

Un paper è una riga sola che alimenta tre viste diverse. Il corpo
dell'approfondimento sta nella colonna `sections`, un array JSON di blocchi
`heading` / `paragraph` / `media`, così si aggiunge una sezione senza toccare
il codice.

## URL

| URL                | Pagina                                  |
| ------------------ | --------------------------------------- |
| `/`                | Home                                    |
| `/people`          | People                                  |
| `/research`        | Research: milestones + linee di ricerca |
| `/research/[slug]` | Approfondimento paper (3)               |
| `/publications`    | Publications                            |
| `/videos`          | Videos                                  |
| `/news`            | News                                    |
| `/news/[slug]`     | Articolo (3)                            |
| `/contacts`        | Contacts + form                         |

Più `/sitemap.xml` e `/robots.txt`, generati dai dati.

Le pagine sono prerenderizzate e si rinfrescano ogni 5 minuti
(`export const revalidate = 300`): modifichi un contenuto su Supabase e entro
cinque minuti è online, senza rebuild. `/research/[slug]` e `/news/[slug]`
generano una pagina statica per riga tramite `generateStaticParams`.

## Cosa manca

- **Immagini.** Home, Research e News sono complete. In `/people` mancano
  undici ritratti su tredici (`people.photo_url`), e manca una figura del paper
  Nature 2019. Basta valorizzare la colonna: il componente `<Media>` mostra
  l'immagine se c'è un URL e il segnaposto se manca, senza toccare il codice
  della pagina.
- **Biografie.** Simone De Carolis, Angelica De Michele e Nicola Creanza hanno
  `bio` vuota: la card mostra nome, ruolo e link al profilo. Riempire `bio`
  la fa comparire.
- **Video.** `videos.youtube_id` è `null` su tutte le righe della pagina
  `/videos`: finché è vuoto la card resta un segnaposto. Con l'ID di 11
  caratteri il player parte al click. Un video è già collegato: nella home e
  nella pagina del paper Science Robotics, tramite un blocco `video` fra le
  `sections`.
- **Diritti sulle immagini.** Tutto ciò che è pubblicato viene da
  `img/`, materiale del laboratorio. Le figure pubblicate su Nature, Science e
  Science Robotics non sono state riprese dai siti degli editori: ripubblicarle
  richiede una licenza, che va verificata caso per caso.
- **Mappa.** `/contacts` ha il segnaposto al posto dell'embed di Google Maps.
- **Uno slot vuoto** ereditato dal wireframe: la persona `[Name Surname]` in
  `/people`.
