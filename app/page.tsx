import Image from "next/image";

import { Archive } from "@/components/archive";
import { Follow } from "@/components/follow";
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
      <footer className="mx-auto flex w-full max-w-[1728px] flex-col gap-x-6 gap-y-4 border-t border-rule px-5 pb-10 pt-6 font-doc text-[0.7rem] uppercase tracking-[0.16em] text-halftone sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12">
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
      </footer>
    </>
  );
}
