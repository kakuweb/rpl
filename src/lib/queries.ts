import "server-only";

import * as offline from "@/lib/data/content";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { NewsItem, Paper, Person, ResearchLine, Video } from "@/lib/types";

type Db = Awaited<ReturnType<typeof createClient>>;

/**
 * Ogni lettura prova Supabase e, se il database non è configurato o non
 * risponde, ripiega sui contenuti offline invece di far esplodere la pagina.
 * `offline: true` nel risultato è ciò che accende l'avviso in fondo al sito.
 */
export type Result<T> = { data: T; offline: boolean };

async function read<T>(fallback: T, run: (db: Db) => Promise<T>): Promise<Result<T>> {
  if (!isSupabaseConfigured) return { data: fallback, offline: true };

  try {
    return { data: await run(await createClient()), offline: false };
  } catch (error) {
    console.warn(
      "[queries] Supabase non raggiungibile, uso i contenuti offline:",
      error instanceof Error ? error.message : error,
    );
    return { data: fallback, offline: true };
  }
}

function rows<T>({ data, error }: { data: T[] | null; error: unknown }): T[] {
  if (error) throw error;
  return data ?? [];
}

function row<T>({ data, error }: { data: T | null; error: unknown }): T | null {
  if (error) throw error;
  return data;
}

// ------------------------------------------------------------------ people --

export function getPeople() {
  return read(offline.people, async (db) =>
    rows<Person>(
      await db
        .from("people")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ),
  );
}

// ------------------------------------------------------------------ papers --

export function getPapers() {
  return read(offline.papers, async (db) =>
    rows<Paper>(
      await db
        .from("papers")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ),
  );
}

export function getPaperBySlug(slug: string) {
  const fallback = offline.papers.find((p) => p.slug === slug) ?? null;

  return read(fallback, async (db) =>
    row<Paper>(
      await db
        .from("papers")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    ),
  );
}

/** Slug di tutti i paper: serve a generateStaticParams e alla sitemap. */
export async function getPaperSlugs(): Promise<string[]> {
  const { data } = await getPapers();
  return data.map((p) => p.slug);
}

// ---------------------------------------------------------- research lines --

export function getResearchLines() {
  return read(offline.researchLines, async (db) =>
    rows<ResearchLine>(
      await db
        .from("research_lines")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ),
  );
}

// -------------------------------------------------------------------- news --

export function getNews(limit?: number) {
  const fallback = limit ? offline.news.slice(0, limit) : offline.news;

  return read(fallback, async (db) => {
    const query = db
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    return rows<NewsItem>(await (limit ? query.limit(limit) : query));
  });
}

export function getNewsBySlug(slug: string) {
  const fallback = offline.news.find((n) => n.slug === slug) ?? null;

  return read(fallback, async (db) =>
    row<NewsItem>(
      await db
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle(),
    ),
  );
}

export async function getNewsSlugs(): Promise<string[]> {
  const { data } = await getNews();
  return data.map((n) => n.slug);
}

// ------------------------------------------------------------------ videos --

export function getVideos() {
  return read(offline.videos, async (db) =>
    rows<Video>(
      await db
        .from("videos")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ),
  );
}
