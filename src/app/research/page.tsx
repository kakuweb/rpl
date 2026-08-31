import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Media } from "@/components/media";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { getPapers, getResearchLines } from "@/lib/queries";
import { asset, site } from "@/lib/site";

export const revalidate = 300;

const intro =
  "We move intelligence from software into matter: pumps, muscles and fibers that generate motion from electricity alone — no motors, compressors or rigid parts.";

export const metadata: Metadata = {
  title: "Research",
  description: intro,
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const [papersResult, linesResult] = await Promise.all([
    getPapers(),
    getResearchLines(),
  ]);

  return (
    <main>
      <InnerHero eyebrow="Research" title="Physical intelligence">
        {intro}
      </InnerHero>

      {/* I figli restano fratelli diretti di .contenitore: è da lì che
          .card-ricerca:nth-child(even) ricava l'alternanza delle colonne. */}
      <Container>
        <h2 className="titolo-sezione">Milestones</h2>

        {papersResult.data.map((paper) => (
          <Link
            className="card-ricerca"
            href={`/research/${paper.slug}`}
            key={paper.id}
          >
            <div className="media">
              <Media
                url={paper.media_url}
                label={paper.media_label}
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
              />
            </div>
            <div className="corpo">
              <span className="rivista">
                {paper.journal} · {paper.year}
              </span>
              <h3>{paper.title}</h3>
              <p>{paper.summary}</p>
              <p>{paper.authors_short}</p>
              <span className="leggi-di-piu">Learn more →</span>
            </div>
          </Link>
        ))}

        <h2 className="titolo-sezione">
          Research lines — ERC RoboFluid project
        </h2>
        <div className="linee">
          {linesResult.data.map((line) => (
            <article className="linea" key={line.id}>
              <div className="num">{line.number}</div>
              <h4>{line.title}</h4>
              <p>{line.description}</p>
            </article>
          ))}
        </div>
      </Container>

      <section className="cta-spinoff">
        <a
          href={site.spinoff.url}
          target="_blank"
          rel="noopener"
          aria-label={`${site.spinoff.name} — spin-off (opens in a new tab)`}
        >
          <Image
            src={asset("/omnigrasp.png")}
            alt={`${site.spinoff.name}, spin-off of the laboratory`}
            width={252}
            height={193}
          />
        </a>
      </section>

      <OfflineNotice show={papersResult.offline || linesResult.offline} />
    </main>
  );
}
