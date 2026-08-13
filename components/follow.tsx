import { ArrowOut } from "@/components/arrow-out";
import { socials } from "@/lib/links";

/**
 * The close: the conversion restated, at greater weight than the hero's.
 *
 * This is the last thing a visitor who scrolled the whole page sees, so the CTAs
 * are larger here than in the first viewport and the stamp lands after them.
 *
 * VOICE-CRITICAL COPY — drafted, meant to be overwritten by the owner.
 */
export function Follow() {
  return (
    <section className="mx-auto w-full max-w-[1728px] px-5 pb-20 sm:px-8 md:px-12 md:pb-28">
      <span aria-hidden="true" className="rule-draw block h-[3px] w-full origin-left bg-ink" />

      <div className="mt-10 grid grid-cols-12 items-start gap-x-6 md:mt-14">
        <div className="col-span-12 md:col-span-8">
          <h2 className="plane-type relative isolate max-w-[16ch] bg-stock font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] [font-stretch:75%]">
            That’s the whole site.
            <span
              aria-hidden="true"
              className="censor-bar plane-strike absolute"
              // Ends at 50%; the first line's glyphs end at 55.8%. Measured, not
              // guessed — 58.333% left an 11% stub past "THAT'S THE".
              style={{ left: "8.333%", width: "41.667%", top: "0.30em", height: "0.15em" }}
            />
          </h2>

          <p className="mt-6 max-w-[46ch] font-body text-halftone">
            The actual work is on the socials. This was the polite introduction.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="plane-furniture hidden font-doc text-[0.65rem] uppercase tracking-[0.18em] text-halftone md:col-span-3 md:col-start-10 md:mt-2 md:flex md:flex-col md:items-end md:gap-1"
        >
          <span translate="no">Sheet 05 / 05</span>
          <span>Follow</span>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="me noopener"
              data-outbound={social.label}
              data-section="close"
              // Flame by default, not on hover. These are the page's primary
              // conversion and hover does not exist on the phones most visitors
              // arrive on. Ink on flame is 5.9:1.
              className="group flex min-h-11 items-center justify-between gap-3 border-[3px] border-ink bg-flame px-5 py-4 transition-colors duration-200 hover:bg-ink hover:text-stock focus-visible:bg-ink focus-visible:text-stock md:px-6 md:py-5"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-doc text-[0.7rem] uppercase tracking-[0.16em]">
                  {social.label}
                </span>
                <span
                  className="truncate font-display text-lg font-bold uppercase tracking-[-0.01em] [font-stretch:75%] md:text-xl"
                  translate="no"
                >
                  {social.handle}
                </span>
              </span>
              <ArrowOut className="h-4 w-4 flex-none md:h-5 md:w-5" />
            </a>
          </li>
        ))}
      </ul>

      {/*
       * A different act from the hero stamp, not a repeat of it. The opening
       * stamp asserts the motto on flame; this one is the redaction lifted —
       * outlined, unfilled, struck through — and says something else.
       */}
      <p className="stamp-land mt-12 inline-block -rotate-2 border-[3px] border-ink px-4 py-2 font-doc text-xs uppercase leading-none tracking-[0.16em] md:mt-16 md:text-sm">
        Now go watch something
      </p>
    </section>
  );
}
