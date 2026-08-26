import type { Metadata } from "next";
import Link from "next/link";

import { Media } from "@/components/media";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { getPapers } from "@/lib/queries";

export const revalidate = 300;

const intro =
  "Selected publications from the RoboPhysics Laboratory and its principal investigator. Each entry links to the original paper on the publisher's site.";

export const metadata: Metadata = {
  title: "Publications",
  description: intro,
  alternates: { canonical: "/publications" },
};

export default async function PublicationsPage() {
  const { data: papers, offline } = await getPapers();

  return (
    <main>
      <InnerHero eyebrow="Publications" title="Peer-reviewed research">
        {intro}
      </InnerHero>

      <Container>
        <div className="pub-list">
          {papers.map((paper) => (
            <article className="pub-item" key={paper.id}>
              <div className="anteprima">
                <Media
                  url={paper.media_url}
                  label={paper.media_label.replace(/^Image —/, "Preview —")}
                  fill
                  sizes="(max-width: 960px) 100vw, 230px"
                />
              </div>
              <div className="dettagli">
                <span className="rivista">
                  {paper.journal} · {paper.year}
                </span>
                <h3>{paper.title}</h3>
                <div className="autori-pub">
                  {paper.authors_full} · {paper.citation}
                </div>
                <p>{paper.abstract}</p>
                <div className="azioni-pub">
                  {paper.external_url && (
                    <a
                      className="link-pub"
                      href={paper.external_url}
                      target="_blank"
                      rel="noopener"
                    >
                      Read publication →
                    </a>
                  )}
                  <Link className="link-pub soft" href={`/research/${paper.slug}`}>
                    Details on this site →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <OfflineNotice show={offline} />
    </main>
  );
}
