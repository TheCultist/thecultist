import Image from "next/image";

import { contact, socials } from "@/lib/links";

/**
 * Three bars, struck on exact column registration.
 *
 * `left`/`width` are twelfths of the measure, so every bar starts and ends on a
 * column edge. `top`/`height` are em, so the strikes scale with the type as the
 * display size clamps.
 *
 * Measured against the rendered glyphs rather than the box: with `line-height`
 * below 1 the letterforms overflow their line boxes, so line one's caps sit at
 * 0.048em–0.778em and line two's at 0.898em–1.628em. These offsets cross them.
 *
 * This must render *inside* the h1 — em resolves against the nearest element's
 * own font-size, so a sibling overlay would size these against body text.
 *
 * The bars invert the letterforms beneath rather than covering them, so the
 * page reads identically with JavaScript disabled and nothing is ever hidden
 * from assistive tech. Purely presentational.
 */
const BARS = [
  { left: "0%", width: "41.667%", top: "0.24em", reverse: false, range: "0 30svh" },
  // Ends on the glyph run. Running to 100% left a stub of bare bar past the
  // word with no letterform to invert — a stray rectangle, not a strike.
  { left: "50%", width: "41.667%", top: "0.57em", reverse: true, range: "7svh 40svh" },
  { left: "8.333%", width: "41.667%", top: "1.20em", reverse: false, range: "14svh 50svh" },
] as const;

function CensorBars() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 block">
      {BARS.map((bar, i) => (
        <span
          key={i}
          className={`censor-bar censor-bar--lift absolute ${bar.reverse ? "censor-bar--reverse" : ""}`}
          style={{
            left: bar.left,
            width: bar.width,
            top: bar.top,
            height: "0.13em",
            // Staggered so the three strikes leave in sequence.
            animationRange: bar.range,
          }}
        />
      ))}
    </span>
  );
}

/*
 * 66svh on phones, not a full viewport. At 92svh the hero still ended below the
 * fold, so ~370px of a 844px screen was empty stock with nothing signalling the
 * page continued — 44% of the first screen doing no work inside an 8-second
 * window. At 66svh the next beat's heading crosses the fold.
 *
 * A floor from md up rather than the full svh it used to hold, for the same
 * reason at a different size. Once the cluster stopped being centred, a hard
 * svh put every spare pixel underneath it: a 768x1024 portrait tablet ended on
 * 450px of empty stock, the identical failure this section already rejected on
 * phones. At 72svh the content sets the height wherever it exceeds the floor —
 * ~830px at 1440x900 — so the next beat crosses the fold at every width.
 */
/*
 * overflow-x: clip, not hidden — clip does not create a scroll container. The
 * reverse censor bar translates +115% as the hero exits, which put its right
 * edge 484px past a 1440 viewport and produced a horizontal scrollbar. Bars now
 * slide off the sheet edge instead.
 *
 * The ink band replaces a floating top-left mark: ink bleeding onto the sheet
 * from its top edge, rather than a logo sitting in a corner. Its ground is the
 * page's exact stock, so only the drips read and the band has no visible edge.
 *
 * Padding-top is in vw because the band's height scales with its own width.
 * The band is 30.9% of that width, and its dense ink ends at 38% of it — so
 * the type must clear 11.7vw. Padding, not margin or centring, is what
 * guarantees it: `my-auto` centres the cluster higher when vertical slack is
 * short, which at 1920x898 and 1280x700 put the wordmark inside the heavy ink.
 *
 * Capped at the 1728px measure because the band is `inset-x-0` inside this
 * section, not the viewport: past 1728 the artwork stops growing while raw vw
 * padding does not, so the gap between the dense ink and the wordmark ran away
 * with the screen — 83px of clear stock at 1920 and 179px at 2560, against the
 * 16px the phone layout holds. min() freezes both at their 1728 values.
 * Verified across eight viewports by scripts/collide.mjs.
 */
export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[66svh] w-full max-w-[1728px] flex-col overflow-x-clip px-5 pb-6 pt-[15vw] sm:px-8 md:min-h-[72svh] md:px-12 md:pb-10 md:pt-[min(14vw,242px)]">
      <Image
        src="/ink-band.png"
        alt=""
        width={2560}
        height={790}
        sizes="100vw"
        /*
         * Eager, but deliberately not `priority`. Preloading this competed with
         * the display font's preload, and the wordmark is what should win that
         * race — it carries the message. Eager still starts the fetch during
         * parse, and at ~4KB it lands well inside the first paint.
         *
         * quality 45 because this is flat cream and hard black shapes with no
         * gradients or photographic detail: it survives aggressive compression
         * with no visible difference, and it dropped from 47KB to 4.4KB.
         */
        loading="eager"
        quality={45}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 w-full select-none"
      />

      {/*
       * pt compensates the ascender overhang: at line-height 0.85 the glyphs
       * paint ~0.122em above the h1's layout box. Font size is 16.5vw, so
       * 0.122em ≈ 2vw — in vw rather than em so it cannot collapse or shift the
       * bars, which are positioned against the h1's own box. Capped at the
       * measure for the same reason as the section's: the type it compensates
       * stops growing at 18rem, so this must stop too.
       *
       * Top-biased at every width. `md:my-auto` used to centre the cluster in
       * the full-svh section, but the section's own pt already holds the type
       * clear of the band's dense ink, so centring only added a second gap on
       * top of that one: measured clearance ran 49px at 1440x900 and 97px at
       * 1920x1080 against the 16px the phone layout gets. That surplus was the
       * empty stock at the top of the sheet. Anchored, the slack collects
       * under the CTAs instead, where the next section is what fills it.
       */}
      {/*
       * No z-index or isolation on this wrapper. Either would create a stacking
       * context that cuts the censor bars off from the ink band, and the bars
       * blend with whatever is behind them.
       */}
      <div className="mb-auto pt-[min(2vw,35px)]">
        {/* bg-stock gives the difference blend a defined backdrop inside the isolated group. */}
        {/*
         * The 18rem ceiling is derived, not guessed: at the 1728px container the
         * measure is 1632px, and Archivo condensed black runs ~0.571em per
         * character, so nine characters at 288px fill ~91% — the same fill the
         * type holds at every narrower width.
         */}
        {/*
         * No `isolate`, and no background. Both were here to give the
         * difference blend a defined backdrop, but an opaque cream background
         * spanning the full measure painted over the ink band's drips. Without
         * isolation the bars blend against the real page backdrop — page
         * ground, drips and glyphs alike — so a drip crossing a bar inverts
         * exactly as a letterform does.
         */}
        <h1 className="relative font-display text-[clamp(3.5rem,16.5vw,18rem)] font-black uppercase leading-[0.85] tracking-[-0.035em] [font-stretch:75%]">
          Cardboard
          <br />
          Cultist
          <CensorBars />
        </h1>

        {/*
         * The title block: motto ranged left, business target ranged right,
         * on one line. The right half of this line was empty stock — the
         * second wordmark line only runs to ~60% of the measure — so the
         * second CTA costs no vertical space and needs no scroll to reach.
         *
         * Ranging it opposite the motto is also what keeps the hierarchy
         * legible without weakening the target: it is a different audience
         * arriving for a different reason, so it is set apart by position
         * rather than by a lighter border, which in this system would read as
         * a dormant item rather than a live one.
         */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 md:mt-8">
          <p className="-rotate-2 border-[3px] border-ink bg-flame px-4 py-2 font-doc text-xs uppercase leading-none tracking-[0.16em] md:text-sm">
            Magic without gatekeeping
          </p>

          <a
            href={contact.href}
            data-outbound="email"
            data-section="hero"
            className="inline-flex min-h-11 items-center border-[3px] border-ink px-4 py-2 font-doc text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-flame focus-visible:bg-flame"
          >
            Collabs &amp; Business
            {/* Names the destination for screen readers; "Collabs & Business"
                alone does not say that activating it opens a mail client. */}
            <span className="sr-only"> — email {contact.email}</span>
          </a>
        </div>

        {/*
         * The CTAs belong to this cluster, not to the page foot. Pinned apart,
         * the pitch and the conversion end up at opposite ends of a phone
         * viewport with dead space between them.
         */}
        {/*
         * Two columns on phones, label stacked over handle. As a single
         * column the fourth account pushed the cluster 212px tall and ran the
         * last tile past the 66svh fold — and four full-width bordered rows
         * in a stack is the link-in-bio list this page is defined against.
         * Paired, the same four read as a filing block and cost 136px.
         *
         * From sm up there is room to set label and handle on one line, so
         * the tiles return to a wrapping row sized by their own content.
         */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:mt-10">
          {socials.map((social) => (
            <li key={social.label} className="min-w-0 sm:w-auto">
              <a
                href={social.href}
                target="_blank"
                rel="me noopener"
                data-outbound={social.label}
                data-section="hero"
                className="flex min-h-11 w-full flex-col justify-center gap-0.5 border-[3px] border-ink px-4 py-2 transition-colors duration-200 hover:bg-flame focus-visible:bg-flame sm:w-auto sm:flex-row sm:items-center sm:gap-3"
              >
                <span className="font-doc text-[0.7rem] uppercase tracking-[0.16em]">
                  {social.label}
                </span>
                <span className="truncate font-body text-sm" translate="no">
                  {social.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
