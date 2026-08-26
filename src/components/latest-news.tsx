import Link from "next/link";

import { Media } from "@/components/media";
import { formatNewsDate } from "@/lib/site";
import type { NewsItem } from "@/lib/types";

/**
 * Anteprima delle ultime news in home, subito sotto l'hero.
 *
 * La prima notizia fa da storia principale; tutte le altre stanno nella
 * colonna di fianco, che scorre da sola quando non ci stanno. Il riquadro
 * della colonna è alto quanto la storia principale — è `.altre-wrap`, in
 * CSS, a tenerli allineati — quindi il numero di notizie non cambia
 * l'altezza della sezione: passane quante ne vuoi.
 */
export function LatestNews({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  const [lead, ...altre] = items;

  return (
    <section className="ultime-news">
      <div className="interno">
        <div className="intestazione">
          <div>
            <div className="eyebrow">Latest news</div>
            <h2>Interviews, projects and awards from the lab</h2>
          </div>
          <Link href="/news" className="tutte">
            All news
          </Link>
        </div>

        <div className="griglia">
          <article className="in-evidenza">
            <Link href={`/news/${lead.slug}`} className="foto">
              <Media
                url={lead.image_url}
                label={lead.image_label}
                fill
                sizes="(max-width: 960px) 100vw, 58vw"
              />
            </Link>
            <div className="corpo">
              <div className="data">
                {formatNewsDate(lead.published_at)} · {lead.category}
              </div>
              <h3>
                <Link href={`/news/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p>{lead.excerpt}</p>
              <Link href={`/news/${lead.slug}`} className="leggi">
                Read the story
              </Link>
            </div>
          </article>

          {altre.length > 0 && (
            <div className="altre-wrap">
              <div className="altre">
                {altre.map((item) => (
                  <article className="voce" key={item.id}>
                    <Link href={`/news/${item.slug}`} className="miniatura">
                      <Media
                        url={item.image_url}
                        label={item.image_label}
                        fill
                        sizes="(max-width: 600px) 96px, 132px"
                      />
                    </Link>
                    <div className="corpo">
                      <div className="data">
                        {formatNewsDate(item.published_at)} · {item.category}
                      </div>
                      <h3>
                        <Link href={`/news/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p>{item.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
