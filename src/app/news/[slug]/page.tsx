import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Media } from "@/components/media";
import { Button, OfflineNotice } from "@/components/ui";
import { getNews, getNewsBySlug } from "@/lib/queries";
import { formatFullDate } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const { data } = await getNews();
  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const { data: item } = await getNewsBySlug(slug);

  if (!item) return { title: "Story not found" };

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      publishedTime: item.published_at,
    },
  };
}

export default async function NewsArticlePage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const { data: item, offline } = await getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <main>
      <section className="hero-interno">
        <div className="eyebrow">
          {formatFullDate(item.published_at)} · {item.category}
        </div>
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
      </section>

      <article className="articolo">
        <div className="foto-apertura">
          <Media url={item.image_url} label={item.image_label} />
        </div>

        {item.body
          .split("\n\n")
          .filter(Boolean)
          .map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

        {/* Le foto in più, per le news che hanno un reportage dietro. */}
        {item.gallery.length > 0 && (
          <div className="galleria">
            {item.gallery.map((photo) => (
              <figure key={photo.url}>
                <Media url={photo.url} label={photo.label} fill sizes="(max-width: 700px) 100vw, 400px" />
              </figure>
            ))}
          </div>
        )}

        <div className="azioni">
          <Button href="/news">← All news</Button>
          {item.source_url && (
            <Button href={item.source_url} external>
              {item.source_label ?? "See the original post"}
            </Button>
          )}
        </div>
      </article>

      <OfflineNotice show={offline} />
    </main>
  );
}
