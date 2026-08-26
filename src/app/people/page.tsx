import type { Metadata } from "next";
import { Fragment } from "react";

import { Media } from "@/components/media";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { getPeople } from "@/lib/queries";
import { roleGroups } from "@/lib/site";

export const revalidate = 300;

const intro =
  "A team of researchers bringing together mechanics, materials and fluidics — from Bari, in dialogue with EPFL, the MIT Media Lab and the international soft-robotics community.";

export const metadata: Metadata = {
  title: "People",
  description: intro,
  alternates: { canonical: "/people" },
};

export default async function PeoplePage() {
  const { data: people, offline } = await getPeople();

  return (
    <main>
      <InnerHero eyebrow="People" title="The people behind the machines">
        {intro}
      </InnerHero>

      <Container>
        {roleGroups.map((group) => {
          const members = people.filter((p) => p.role_group === group.key);
          if (members.length === 0) return null;

          return (
            <Fragment key={group.key}>
              <h2 className="titolo-sezione">{group.label}</h2>
              <div className="griglia-people">
                {members.map((person) => (
                  <article className="card-persona" key={person.id}>
                    <div className="foto">
                      <Media
                        url={person.photo_url}
                        label={person.photo_label}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    </div>
                    <div className="info">
                      <div className="ruolo">{person.role}</div>
                      <h3>{person.name}</h3>
                      {person.bio && <p>{person.bio}</p>}
                      {person.profile_url && (
                        <a
                          className="link-profilo"
                          href={person.profile_url}
                          target="_blank"
                          rel="noopener"
                        >
                          Profile →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </Fragment>
          );
        })}
      </Container>

      <OfflineNotice show={offline} />
    </main>
  );
}
