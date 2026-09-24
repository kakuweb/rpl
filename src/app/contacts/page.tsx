import type { Metadata } from "next";

import { Container, InnerHero } from "@/components/ui";
import { site } from "@/lib/site";

// Pin e indicazioni puntano alle stesse coordinate di site.ts: prima
// l'indirizzo era riscritto a mano qui, e poteva divergere da quello mostrato.
const mapQuery = `${site.coords.lat},${site.coords.lng}`;

const intro =
  "The lab is open to collaborations with companies, thesis students, PhD candidates and research institutions.";

export const metadata: Metadata = {
  title: "Contacts",
  description: intro,
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <main>
      <InnerHero eyebrow="Contacts" title="Come and visit us">
        {intro}
      </InnerHero>

      <Container>
        <div className="contatti">
          <div className="blocco-contatti">
            <h3>{site.name}</h3>

            <div className="riga-contatto">
              <div className="etichetta">Where we are</div>
              <div className="valore">
                {site.department}
                <br />
                {site.address}
              </div>
            </div>

            <div className="riga-contatto">
              <div className="etichetta">Email</div>
              <div className="valore">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>

            <div className="riga-contatto">
              <div className="etichetta">Theses and PhDs</div>
              <div className="valore">
                We are always looking for motivated students and researchers:
                write to us with your CV and a short note on your interests.
              </div>
            </div>

            <div className="riga-contatto">
              <div className="etichetta">Companies and technology transfer</div>
              <div className="valore">
                For industrial applications of our technologies, visit our
                spin-off{" "}
                <a href={site.spinoff.url} target="_blank" rel="noopener">
                  omnigrasp.com
                </a>
                .
              </div>
            </div>
          </div>

          <div className="mappa">
            {/* L'iframe di Google Maps scrive cookie di terze parti: se il
                sito adotterà un banner di consenso, questo va dietro. */}
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title={`Map — ${site.name}, ${site.institution}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="indicazioni"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener"
            >
              Get directions →
            </a>
          </div>
        </div>

        <h2 className="titolo-sezione">Write to us</h2>
        {/* Il form vero è in _form-disabilitato/: è una Server Action e non
            funziona su un sito statico. Vedi il LEGGIMI lì dentro. */}
        <div className="blocco-contatti invito-email">
          <p>
            Write to us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> — tell us who you
            are and what you are interested in. For theses and PhD positions,
            attach your CV.
          </p>
          <a className="btn-blu" href={`mailto:${site.email}`}>
            Send an email
          </a>
        </div>
      </Container>
    </main>
  );
}
