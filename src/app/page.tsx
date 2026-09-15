import type { Metadata } from "next";
import Image from "next/image";

import { LatestNews } from "@/components/latest-news";
import { Button, OfflineNotice } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";
import { getNews, getPapers } from "@/lib/queries";
import { asset, site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  // Le due letture non dipendono l'una dall'altra: in parallelo la home non
  // paga due giri di rete in fila.
  // Le news arrivano tutte: in home la prima fa da storia principale e le
  // altre riempiono la colonna scorrevole di fianco.
  const [papersResult, newsResult] = await Promise.all([getPapers(), getNews()]);

  const { data: papers } = papersResult;
  const { data: news } = newsResult;
  const latest = papers[0];

  // Basta che una delle due sia ripiegata sui contenuti offline perché
  // l'avviso in fondo alla pagina abbia senso.
  const offline = papersResult.offline || newsResult.offline;

  return (
    <main>
      <section className="hero">
        <Image
          src={asset("/team-hero.jpg")}
          alt="The RoboPhysics Laboratory team on a dry-stone wall at sunset"
          fill
          priority
          sizes="100vw"
        />
        <h1>
          “We use robots to hack
          <br />
          the laws of physics”
        </h1>
      </section>

      <LatestNews items={news} />

      <section className="statement">
        <p>
          We study physical intelligence to build soft robots, artificial muscles
          and wearable devices designed to work alongside people.
        </p>
      </section>

      <div className="panel-wrap">
        <div className="panel">
          <div className="testo">
            <p>
              At the RoboPhysics Laboratory we investigate how matter can move,
              adapt and respond without the rigid, bulky motors of conventional
              robotics. We combine mechanics, fluidics and soft materials to give
              machines the same fluidity as living bodies.
            </p>
            <p>
              Led by Prof. Vito Cacucciolo and supported by an ERC Starting Grant,
              our research has delivered some of the field&apos;s landmark
              results: the world&apos;s first stretchable pumps for fluidic
              muscles (Nature, 2019), two-millimetre fiber pumps for textile
              exosuits and haptic feedback (Science, 2023), and electrofluidic
              muscles developed with the MIT Media Lab (Science Robotics, 2026).
            </p>
            <p>
              From soft robotics to rehabilitation medicine, we turn the
              principles of physics into technologies that ease human effort and
              extend the capabilities of the body — from Bari, out to the world.
            </p>
            <Button href="/research" variant="outline">
              Explore the research
            </Button>
          </div>
          <div className="illustrazione">
            {/* Animata: Next non ottimizza le immagini animate, quindi il file
                è già stato ridotto e convertito in WebP a monte. */}
            <Image
              src={asset("/untethered-woven.webp")}
              alt="An untethered woven muscle pair contracting and extending in a loop"
              width={760}
              height={428}
              unoptimized
            />
          </div>
        </div>
      </div>

      <section className="statement bianco">
        <p>
          Artificial muscles in fiber form: silent, electric, with no external
          pumps. Like biological muscle, they weave together to adapt to any task.
        </p>
      </section>

      <section className="demo">
        <div className="colonna-testo">
          <div className="eyebrow">
            Electrofluidic Fiber Muscles — Science Robotics, 2026
          </div>
          <h2>Wide range of motion and back&#8209;stretchability</h2>
          <p>
            A pair of woven muscles in an antagonistic configuration: when one
            fiber contracts, the other extends — like the biceps and triceps in
            the human arm. Each muscle integrates two electrohydrodynamic fiber
            pumps braided with ten McKibben actuators in a closed fluidic circuit,
            with no external compressors or tubes.
          </p>
        </div>
        <div className="colonna-video">
          <VideoEmbed
            youtubeId="_tOTOjzNouU"
            start={6}
            title="Electrofluidic Fiber Muscles, Science Robotics, 2026"
            fallbackLabel={"Video still — woven muscle pair\n(side view)"}
          >
            <span className="tag tr">side view</span>
            <span className="tag bl">1x speed</span>
            <span className="tag br">10 cm</span>
          </VideoEmbed>
        </div>
      </section>

      <section className="wearable">
        <div className="foto">
          <Image
            src={asset("/fiber-pump-two-hands.jpg")}
            alt="Two hands holding an electrofluidic fiber muscle: a translucent fiber a couple of millimetres thick, coiled into loops against a white background"
            width={2000}
            height={1176}
            sizes="(max-width: 960px) 100vw, 55vw"
          />
        </div>
        <div className="testo">
          <p className="claim">
            Fibers no thicker than a toothpick, weighing a few grams, woven
            directly into textiles.
          </p>
          <p className="body">
            Fiber pumps generate pressure and flow by injecting charge into a
            dielectric fluid, with no moving parts: the system is silent,
            lightweight and scalable. At under 2 mm in diameter they produce up to
            900 kPa/m, opening the way to textile exosuits, haptic gloves and
            devices that restore or augment the dexterity of the hand.
          </p>
        </div>
      </section>

      {/* L'ultima pubblicazione arriva dal database: è la prima riga di papers. */}
      {latest && (
        <section className="pub">
          <div className="rif">Latest publication</div>
          <h3>
            {latest.title}
            {latest.extra_url && " — developed with the MIT Media Lab"}
          </h3>
          <p>
            Published in {latest.journal}, the work is authored by{" "}
            {latest.authors_full}, with the support of the European Research
            Council. {latest.abstract}
          </p>
          <Button href="/publications">See all publications</Button>
        </section>
      )}

      <OfflineNotice show={offline} />
    </main>
  );
}
