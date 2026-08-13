import { ArrowOut } from "@/components/arrow-out";
import { SheetHeading } from "@/components/sheet-heading";
import { archive } from "@/lib/links";

/**
 * The gaming archive — the most compressed section on the page, and the one
 * furthest from the conversion.
 *
 * The two entries are deliberately not equal. Screenhype is current, so it gets
 * ink and the present tense. Inform the Gamers is dormant, so it gets a hairline
 * and the past tense. Presenting them alike would either make the live writing
 * look abandoned or make a dead channel look active — PRODUCT.md principle 5.
 *
 * VOICE-CRITICAL COPY — drafted, meant to be overwritten by the owner.
 */

type EntryProps = {
  href: string;
  domain: string;
  heading: string;
  body: string;
  note?: string;
  dormant?: boolean;
};

function Entry({ href, domain, heading, body, note, dormant = false }: EntryProps) {
  return (
    <article>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        data-outbound={domain}
        data-section="archive"
        className="group block"
      >
        <span
          aria-hidden="true"
          className={`rule-draw block w-full origin-left ${
            dormant ? "h-px bg-rule rule-draw--late" : "h-[3px] bg-ink"
          }`}
        />
        <h3
          className={`mt-4 font-display text-[clamp(1.125rem,2.2vw,1.75rem)] font-bold uppercase leading-[1.15] tracking-[-0.01em] [font-stretch:75%] md:mt-6 ${
            dormant ? "text-halftone" : ""
          }`}
        >
          {heading}
        </h3>
        <p className="mt-3 max-w-[54ch] font-body text-sm text-halftone md:text-base">
          {body}
        </p>
        <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            className={`inline-flex min-h-11 items-center gap-2 border-[3px] px-4 py-2 font-doc text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-200 group-hover:bg-flame group-focus-visible:bg-flame ${
              dormant ? "border-halftone" : "border-ink"
            }`}
            translate="no"
          >
            {domain}
            <ArrowOut className="h-3.5 w-3.5" />
          </span>
          {note ? (
            <span className="font-doc text-[0.65rem] uppercase tracking-[0.18em] text-halftone">
              {note}
            </span>
          ) : null}
        </span>
      </a>
    </article>
  );
}

export function Archive() {
  return (
    <section className="mx-auto w-full max-w-[1728px] overflow-x-clip px-5 pb-24 sm:px-8 md:px-12 md:pb-40">
      <SheetHeading
        sheet="04"
        label="Archive"
        reverse
        strike={{ left: "0%", width: "41.667%", top: "0.62em" }}
      >
        Elsewhere, and before.
      </SheetHeading>

      <div className="mt-12 grid max-w-[52rem] grid-cols-1 gap-y-12 md:mt-16 md:gap-y-16">
        <Entry
          href={archive.screenhype.href}
          domain="screenhype.co.uk"
          heading="I occasionally write about games at Screenhype."
          body="Under my own name, Luigi Savinelli, which is the one on the byline when you get there."
        />

        <Entry
          dormant
          href={archive.informTheGamers.href}
          domain="youtube.com/@TheCultist"
          note="No longer updated"
          heading="TheCultist — Inform the Gamers."
          body="An Italian gaming channel I ran, until I didn’t have time anymore. Want to see it come back? Let me know!"
        />
      </div>

      <p className="mt-12 max-w-[54ch] font-body text-sm text-halftone md:mt-16">
        Formerly a gaming writer for TechRaptor and mmo.it.
      </p>
    </section>
  );
}
