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
      <footer className="mx-auto flex w-full max-w-[1728px] flex-col gap-x-6 gap-y-1 border-t border-rule px-5 pb-10 pt-6 font-doc text-[0.7rem] uppercase tracking-[0.16em] text-halftone sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12">
        <span translate="no">thecultist.it — Cardboard Cultist</span>

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
