import { ArrowOut } from "@/components/arrow-out";
import { SheetHeading } from "@/components/sheet-heading";
import { tools } from "@/lib/links";

/**
 * The tools section.
 *
 * findthatcard leads on prominence — it is the commercially important one — and
 * the two are deliberately not a matched pair: a symmetric two-card grid would
 * flatten a real difference between a utility and a game, and lands squarely on
 * the nested-cards anti-reference.
 *
 * Depth comes from the asymmetric placement, not from scroll parallax. See the
 * rule-draw note in globals.css.
 *
 * VOICE-CRITICAL COPY — drafted, meant to be overwritten by the owner.
 */

type ToolProps = {
  href: string;
  domain: string;
  heading: string;
  body: string;
  headingClass: string;
  className: string;
  /**
   * The commercially important product. Carries a heavier rule and a
   * flame-filled target.
   *
   * Rule weight, not hue, marks the lead: flame measures 2.6:1 on stock, so a
   * flame rule read *lighter* than the follower's ink rule and argued against
   * the hierarchy the heading scale sets up.
   */
  lead?: boolean;
  ruleClass?: string;
};

function Tool({
  href,
  domain,
  heading,
  body,
  headingClass,
  className,
  lead = false,
  ruleClass = "",
}: ToolProps) {
  return (
    <article className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        data-outbound={domain}
        data-section="tools"
        className="group block"
      >
        <span
          aria-hidden="true"
          className={`rule-draw block w-full origin-left bg-ink ${lead ? "h-[6px]" : "h-[3px]"} ${ruleClass}`}
        />
        <h3
          className={`mt-5 font-display font-bold uppercase leading-[1.05] tracking-[-0.02em] [font-stretch:75%] md:mt-7 ${headingClass}`}
        >
          {heading}
        </h3>
        <p className="mt-4 max-w-[52ch] font-body text-halftone">{body}</p>
        {/*
         * A bordered target, not a mono caption. The previous treatment carried
         * its only affordance in a hover state, which never fires on the phones
         * this page is built for — a secondary conversion goal shipping with no
         * default indication it was clickable.
         */}
        <span
          className={`mt-6 inline-flex min-h-11 items-center gap-2 border-[3px] border-ink px-4 py-2 font-doc text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-200 ${
            lead
              ? "bg-flame group-hover:bg-ink group-hover:text-stock group-focus-visible:bg-ink group-focus-visible:text-stock"
              : "group-hover:bg-flame group-focus-visible:bg-flame"
          }`}
        >
          <span translate="no">{domain}</span>
          <ArrowOut className="h-3.5 w-3.5" />
        </span>
      </a>
    </article>
  );
}

export function Tools() {
  return (
    <section
      id="tools"
      className="mx-auto w-full max-w-[1728px] overflow-x-clip px-5 pb-24 sm:px-8 md:px-12 md:pb-40"
    >
      <SheetHeading
        sheet="03"
        label="Tools"
        strike={{ left: "16.667%", width: "50%", top: "0.30em" }}
      >
        Two things I built instead of sleeping.
      </SheetHeading>

      <div className="mt-14 grid grid-cols-12 gap-y-16 md:mt-20 md:gap-y-28">
        <Tool
          className="col-span-12 md:col-span-9"
          lead
          href={tools.findThatCard.href}
          domain={tools.findThatCard.label}
          heading="Find cards by describing them."
          body="Type “blue thing that counters stuff for two” and it finds the card. Built because sometimes I can’t be bothered to remember how Scryfall works."
          headingClass="text-[clamp(1.75rem,5vw,4rem)]"
        />

        <Tool
          className="col-span-12 md:col-span-6 md:col-start-7"
          ruleClass="rule-draw--late"
          href={tools.stormCount.href}
          domain={tools.stormCount.label}
          heading="How high is your storm count?"
          body="A daily guessing game. Higher or lower on mana value. There is a leaderboard. You can climb it. And brag about it. You’re welcome."
          headingClass="text-[clamp(1.375rem,3vw,2.25rem)]"
        />
      </div>
    </section>
  );
}
