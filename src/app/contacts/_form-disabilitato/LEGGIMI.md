# Form contatti — disattivato

Il codice del form è intatto qui dentro, non è stato cancellato.

È fuori uso perché `actions.ts` è una **Server Action**: ha bisogno di un
server che riceva l'invio e scriva su Supabase. Il sito è pubblicato su
GitHub Pages, che serve solo file statici — con `output: "export"` Next si
ferma con «Server Actions are not supported with static export».

Al suo posto, in `../page.tsx`, c'è un pulsante che apre il client di posta.

## Per riattivarlo

Serve un hosting che esegua Next.js (Vercel, piano gratuito). Poi:

1. riporta i tre file in `src/app/contacts/`
   (`git mv src/app/contacts/_form-disabilitato/{actions.ts,contact-state.ts,contact-form.tsx} src/app/contacts/`)
2. in `page.tsx`: rimetti `import { ContactForm } from "./contact-form";` e
   sostituisci il blocco `.invito-email` con `<ContactForm />`
3. il form scrive in `contact_messages`: servono le variabili Supabase in
   `.env.local` e le policy di `supabase/schema.sql`

La cartella inizia con `_`: Next la considera privata e non ne fa una rotta.
