/**
 * Crea le tabelle e carica i contenuti su Supabase.
 *
 *   npm run db:setup        schema.sql + seed.sql
 *   npm run db:setup schema  solo lo schema
 *   npm run db:setup seed    solo i contenuti
 *
 * Serve SUPABASE_DB_URL in .env.local — la connection string Postgres che
 * trovi in Supabase alla voce Connect > Session pooler. Non è la chiave anon
 * né la service_role: quelle parlano con PostgREST, che non esegue DDL.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import pg from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

process.loadEnvFile?.(join(root, ".env.local"));

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  console.error(
    "\n  Manca SUPABASE_DB_URL in .env.local.\n\n" +
      "  Dashboard Supabase > Connect > Session pooler > URI, poi sostituisci\n" +
      "  [YOUR-PASSWORD] con la password del database.\n",
  );
  process.exit(1);
}

const which = process.argv[2];
const steps = [
  { name: "schema.sql", file: "supabase/schema.sql" },
  { name: "seed.sql", file: "supabase/seed.sql" },
].filter((step) => !which || step.name.startsWith(which));

if (steps.length === 0) {
  console.error(`  Passo sconosciuto: "${which}". Usa "schema" o "seed".`);
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();

  for (const step of steps) {
    process.stdout.write(`  ${step.name} … `);
    await client.query(readFileSync(join(root, step.file), "utf8"));
    console.log("ok");
  }

  const { rows } = await client.query(`
    select 'people' as tabella, count(*)::int from public.people
    union all select 'papers', count(*)::int from public.papers
    union all select 'research_lines', count(*)::int from public.research_lines
    union all select 'news', count(*)::int from public.news
    union all select 'videos', count(*)::int from public.videos
    union all select 'contact_messages', count(*)::int from public.contact_messages
    order by 1
  `);

  console.log("\n  Righe per tabella:");
  for (const r of rows) console.log(`    ${r.tabella.padEnd(18)} ${r.count}`);
  console.log();
} catch (error) {
  console.error("\n  Errore:", error.message, "\n");
  process.exitCode = 1;
} finally {
  await client.end();
}
