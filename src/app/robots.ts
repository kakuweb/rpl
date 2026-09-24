import type { MetadataRoute } from "next";

// Richiesto da `output: "export"`: senza server non c'è nulla da
// rigenerare a runtime, il file si scrive una volta a build.
export const dynamic = "force-static";

import { pageUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: pageUrl("/sitemap.xml"),
  };
}
