import type { MetadataRoute } from "next";

import { getNews, getPapers } from "@/lib/queries";
import { navigation, site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: papers }, { data: news }] = await Promise.all([
    getPapers(),
    getNews(),
  ]);

  const url = (path: string) => new URL(path, site.url).toString();

  return [
    { url: url("/"), priority: 1 },
    ...navigation.map((item) => ({ url: url(item.href), priority: 0.8 })),
    ...papers.map((paper) => ({
      url: url(`/research/${paper.slug}`),
      priority: 0.7,
    })),
    ...news.map((item) => ({
      url: url(`/news/${item.slug}`),
      lastModified: new Date(item.published_at),
      priority: 0.6,
    })),
  ];
}
