import type { NextConfig } from "next";

/**
 * Il sito si costruisce in due modi.
 *
 *   normale        `npm run dev` / `npm run build` — server Next completo:
 *                  immagini ottimizzate, rigenerazione ogni 5 minuti, e le
 *                  Server Action funzionano.
 *   GitHub Pages   attivato impostando NEXT_PUBLIC_BASE_PATH (lo fa il
 *                  workflow in .github/workflows/pages.yml). Genera HTML
 *                  statico in out/, servito da
 *                  robophysics-poliba.github.io/rpl.
 *
 * Una sola variabile comanda tutto, ed è la stessa che src/lib/site.ts usa
 * per `asset()`: così il prefisso delle pagine e quello delle immagini non
 * possono divergere. In locale, senza variabile, nulla cambia.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const perPages = basePath !== "";

const nextConfig: NextConfig = {
  images: {
    // Miniature dei video YouTube (i.ytimg.com/vi/<id>/maxresdefault.jpg).
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
    // Senza server non c'è ottimizzatore: le immagini si servono come sono.
    unoptimized: perPages,
  },
  ...(perPages
    ? {
        output: "export" as const,
        basePath,
        // Genera out/news/index.html invece di out/news.html: Pages serve le
        // cartelle, non i percorsi senza estensione.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
