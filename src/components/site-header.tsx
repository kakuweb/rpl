"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { asset, navigation, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [aperto, setAperto] = useState(false);

  // Esc chiude, come ci si aspetta da un pannello sovrapposto.
  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperto(false);
    };
    window.addEventListener("keydown", suTasto);
    return () => window.removeEventListener("keydown", suTasto);
  }, [aperto]);

  return (
    <header data-menu-aperto={aperto}>
      <Link href="/" className="logo-lockup" aria-label={`${site.name} — home`}>
        <Image
          className="rpl"
          src={asset("/rpl-logo.png")}
          alt={site.name}
          width={248}
          height={101}
          priority
        />
        <Image
          className="poliba"
          src={asset("/poliba-logo.png")}
          alt={site.institution}
          width={500}
          height={240}
          priority
        />
      </Link>

      {/* Visibile solo sotto i 960px: sopra, la navigazione sta in riga. */}
      <button
        type="button"
        className="apri-menu"
        aria-expanded={aperto}
        aria-controls="menu-principale"
        aria-label={aperto ? "Close menu" : "Open menu"}
        onClick={() => setAperto((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden focusable={false}>
          {aperto ? (
            <path d="M5 5l14 14M19 5L5 19" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      <nav id="menu-principale" aria-label="Main">
        {navigation.map((item, index) => {
          // /research resta attiva anche sugli approfondimenti /research/[slug].
          const attiva =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Fragment key={item.href}>
              {index > 0 && <span className="sep">|</span>}
              <Link
                href={item.href}
                className={attiva ? "attiva" : undefined}
                aria-current={attiva ? "page" : undefined}
                // Chiude il pannello: altrimenti resterebbe aperto sopra la
                // pagina appena raggiunta.
                onClick={() => setAperto(false)}
              >
                {item.label}
              </Link>
            </Fragment>
          );
        })}
      </nav>
    </header>
  );
}
