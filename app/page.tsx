import Image from "next/image";

import { Archive } from "@/components/archive";
import { Follow } from "@/components/follow";
import { FollowDock } from "@/components/follow-dock";
import { Hero } from "@/components/hero";
import { Positioning } from "@/components/positioning";
import { Tools } from "@/components/tools";
import { contact } from "@/lib/links";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Positioning />
        <Tools />
        <Archive />
        <Follow />
      </main>

      {/*
       * The contact address lives in the footer rather than beside the social
       * CTAs: it serves a different visitor — someone with business to raise,
       * not someone deciding whether to follow — and the close is reserved for
       * the primary conversion.
       */}
      {/* Bottom padding clears the mobile follow dock, which is fixed. */}
      <footer className="mx-auto w-full max-w-[1728px] border-t border-rule px-5 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 font-doc text-[0.7rem] uppercase tracking-[0.16em] text-halftone sm:px-8 md:px-12 md:pb-10">
        <div className="flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:items-center sm:justify-between">
        {/*
         * The mark closes the page, answering the ink band that opens it: ink
         * bleeding in at the head, the candle stamped at the foot. It sits here
         * rather than in the hero, where it competed with the band.
         */}
        <span className="flex items-center gap-3">
          <Image
            src="/mark.png"
            alt=""
            width={1024}
            height={1024}
            sizes="40px"
            className="h-10 w-10 flex-none"
          />
          <span translate="no">thecultist.it — Cardboard Cultist</span>
        </span>

        <a
          href={contact.href}
          data-outbound="email"
          data-section="footer"
          className="inline-flex min-h-11 items-center self-start normal-case tracking-[0.06em] text-ink underline decoration-rule transition-colors duration-200 hover:bg-flame hover:decoration-ink focus-visible:bg-flame sm:self-auto"
          translate="no"
        >
            {contact.email}
          </a>
        </div>

        {/*
         * A proportionate privacy note rather than a policy page. This site
         * sets no cookies, has no forms, no accounts and no third-party
         * embeds; the only processing is cookieless, aggregated analytics.
         * Stating that plainly is more use to a visitor than a page of
         * boilerplate about data it does not collect.
         */}
        <p className="mt-8 max-w-[70ch] normal-case tracking-[0.06em]">
          No cookies, no accounts, no tracking across sites. Visits are counted
          anonymously and in aggregate so I can see whether this page works.
          Anything you want to know or removed, email me.
        </p>
      </footer>

      <FollowDock />
    </>
  );
}
