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

      <h2 className="mt-10 max-w-[16ch] font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] [font-stretch:75%] md:mt-14">
        That’s the whole site.
      </h2>

      <p className="mt-6 max-w-[46ch] font-body text-halftone">
        The actual work is on the socials. This was the polite introduction.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="me noopener"
              data-outbound={social.label}
              data-section="close"
              className="group flex min-h-11 items-center justify-between gap-3 border-[3px] border-ink px-5 py-4 transition-colors duration-200 hover:bg-flame focus-visible:bg-flame md:px-6 md:py-5"
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

      <p className="stamp-land mt-12 inline-block -rotate-2 border-[3px] border-ink bg-flame px-4 py-2 font-doc text-xs uppercase leading-none tracking-[0.16em] md:mt-16 md:text-sm">
        Magic without gatekeeping
      </p>
    </section>
  );
}
