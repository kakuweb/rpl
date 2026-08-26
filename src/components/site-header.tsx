"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/" className="logo-lockup" aria-label={`${site.name} — home`}>
        <Image
          className="rpl"
          src="/rpl-logo.png"
          alt={site.name}
          width={248}
          height={101}
          priority
        />
        <Image
          className="poliba"
          src="/poliba-logo.png"
          alt={site.institution}
          width={252}
          height={240}
          priority
        />
      </Link>

      <nav aria-label="Main">
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
