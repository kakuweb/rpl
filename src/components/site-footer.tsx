import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <Image
        className="loghi-istituzionali"
        src="/institutional-logos.png"
        alt="Politecnico di Bari · European Research Council"
        width={520}
        height={130}
      />

      <div className="spinoff">
        <a
          href={site.spinoff.url}
          target="_blank"
          rel="noopener"
          aria-label={`${site.spinoff.name} — spin-off (opens in a new tab)`}
        >
          <Image
            src="/omnigrasp.png"
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
