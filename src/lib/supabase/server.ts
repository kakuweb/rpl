import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Finché le variabili d'ambiente non sono compilate il sito gira lo stesso,
 * servendo i contenuti di src/lib/data/content.ts (vedi lib/queries.ts).
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Client per le letture pubbliche lato server.
 *
 * Volutamente senza cookie: il sito legge solo dati pubblici con la chiave
 * anon, e leggere i cookie renderebbe ogni pagina dinamica, buttando via la
 * prerenderizzazione statica. Se un domani servirà un'area riservata, quella
 * userà un client separato basato su @supabase/ssr.
 */
export async function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase non configurato: mancano NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    );
  }

  return createSupabaseClient(url!, anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
