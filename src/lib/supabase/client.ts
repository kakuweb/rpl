"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client per i Client Component. Nessuna pagina lo usa oggi — il sito legge
 * tutto lato server — ma serve appena aggiungi qualcosa di interattivo
 * (realtime, filtri live, upload).
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
