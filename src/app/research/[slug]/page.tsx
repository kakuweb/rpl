import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Media } from "@/components/media";
import { Button, OfflineNotice } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";
import { getPaperBySlug, getPapers } from "@/lib/queries";

export const revalidate = 300;

/** Prerenderizza a build time una pagina per ogni paper. */
export async function generateStaticParams() {
  const { data } = await getPapers();
  return data.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata(
  props: PageProps<"/research/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const { data: paper } = await getPaperBySlug(slug);

  if (!paper) return { title: "Paper not found" };

  return {
    title: paper.title,
    description: paper.abstract,
    alternates: { canonical: `/research/${paper.slug}` },
    openGraph: {
      title: `${paper.title} — ${paper.journal} ${paper.year}`,
      description: paper.abstract,
      type: "article",
    },
  };
}

export default async function PaperPage(props: PageProps<"/research/[slug]">) {
  const { slug } = await props.params;
  const [{ data: paper, offline }, { data: papers }] = await Promise.all([
    getPaperBySlug(slug),
    getPapers(),
  ]);

  if (!paper) notFound();

  const index = papers.findIndex((p) => p.slug === paper.slug);
  const previous = index > 0 ? papers[index - 1] : null;
  const next = index >= 0 && index < papers.length - 1 ? papers[index + 1] : null;

  return (
    <main>
      <section className="hero-paper">
        <div className="interno">
          <Link className="briciole" href="/research">
            ← Research / Milestones
          </Link>
          <div>
            <span className="rivista-badge">
              {paper.journal} · {paper.year}
            </span>
          </div>
          <h1>{paper.title}</h1>
          <div className="autori">
            {paper.authors_full}
            <br />
            {paper.citation}
          </div>
        </div>
      </section>

      {paper.facts.length > 0 && (
        <div className="fatti">
          {paper.facts.map((fact) => (
            <div className="fatto" key={fact.label}>
              <div className="numero">{fact.value}</div>
              <div className="didascalia">{fact.label}</div>
            </div>
          ))}
        </div>
      )}

      <article className="paper-corpo">
        {paper.sections.map((section, i) => {
          if (section.type === "heading") return <h2 key={i}>{section.text}</h2>;
          if (section.type === "paragraph") return <p key={i}>{section.text}</p>;

          if (section.type === "video") {
            return (
              <figure className="paper-media" key={i}>
                <div className="player">
                  <VideoEmbed
                    youtubeId={section.youtube_id}
                    title={section.label}
                    fallbackLabel={section.label}
                  />
                </div>
                <figcaption className="didascalia">{section.caption}</figcaption>
              </figure>
            );
          }

          return (
            <figure className="paper-media" key={i}>
              <Media
                url={section.url}
                label={section.label}
                width={section.width}
                height={section.height}
              />
              <figcaption className="didascalia">{section.caption}</figcaption>
            </figure>
          );
        })}

        <div className="paper-azioni">
          {paper.external_url && (
            <Button href={paper.external_url} external>
              {paper.external_label}
            </Button>
          )}
          {paper.extra_url && (
            <Button href={paper.extra_url} external>
              {paper.extra_label ?? "Learn more"}
            </Button>
          )}
          <Button href="/research">← Back to research</Button>
        </div>
      </article>

      <nav className="nav-papers" aria-label="Other papers">
        {previous ? (
          <Link href={`/research/${previous.slug}`}>
            <div className="dir">← Previous</div>
            <div className="tit">
              {previous.title} ({previous.journal}, {previous.year})
            </div>
          </Link>
        ) : (
          <Link href="/research">
            <div className="dir">← Overview</div>
            <div className="tit">All research</div>
          </Link>
        )}

        {next ? (
          <Link href={`/research/${next.slug}`}>
            <div className="dir">Next →</div>
            <div className="tit">
              {next.title} ({next.journal}, {next.year})
            </div>
          </Link>
        ) : (
          <Link href="/research">
            <div className="dir">Overview →</div>
            <div className="tit">All research</div>
          </Link>
        )}
      </nav>

      <OfflineNotice show={offline} />
    </main>
  );
}
