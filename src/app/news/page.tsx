import type { Metadata } from "next";
import Link from "next/link";

import { Media } from "@/components/media";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { getNews } from "@/lib/queries";
import { formatNewsDate } from "@/lib/site";

export const revalidate = 300;

const intro = "Publications, awards and stories from the RoboPhysics Laboratory.";

export const metadata: Metadata = {
  title: "News",
  description: intro,
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const { data: news, offline } = await getNews();

  return (
    <main>
      <InnerHero eyebrow="News" title="From the lab">
        {intro}
      </InnerHero>

      <Container>
        <div className="griglia-news">
          {news.map((item) => (
            <article className="card-news" key={item.id}>
              <div className="foto">
                <Media
                  url={item.image_url}
                  label={item.image_label}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                />
              </div>
              <div className="corpo">
                <div className="data">
                  {formatNewsDate(item.published_at)} · {item.category}
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={`/news/${item.slug}`}>Read the story</Link>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <OfflineNotice show={offline} />
    </main>
  );
}
