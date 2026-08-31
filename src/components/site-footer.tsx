import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";
import { asset, navigation, site, social } from "@/lib/site";

const icone = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
} as const;

export function SiteFooter() {
  return (
    <footer>
      <Image
        className="loghi-istituzionali"
        src={asset("/institutional-logos.png")}
        alt="Politecnico di Bari · European Research Council"
        width={520}
        height={130}
      />

      <ul className="social">
        {social.map((profilo) => {
          const Icona = icone[profilo.name];

          return (
            <li key={profilo.name}>
              <a
                href={profilo.url}
                target="_blank"
                rel="noopener"
                aria-label={`${site.name} on ${profilo.name} (opens in a new tab)`}
              >
                <Icona />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="spinoff">
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
      </div>

      <div className="colofone">
        <span>
          © {new Date().getFullYear()} {site.name} — {site.institution}
        </span>
        <span>
          {navigation.map((item, i) => (
            <Fragment key={item.href}>
              {i > 0 && " | "}
              <Link href={item.href}>{item.label}</Link>
            </Fragment>
          ))}
        </span>
      </div>
    </footer>
  );
}
