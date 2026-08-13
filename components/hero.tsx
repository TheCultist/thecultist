import Image from "next/image";

import { socials } from "@/lib/links";

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
  { left: "0%", width: "41.667%", top: "0.24em", reverse: false },
  // Ends on the glyph run. Running to 100% left a stub of bare bar past the
  // word with no letterform to invert — a stray rectangle, not a strike.
  { left: "50%", width: "41.667%", top: "0.57em", reverse: true },
  { left: "8.333%", width: "41.667%", top: "1.20em", reverse: false },
] as const;

function CensorBars() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 block">
      {BARS.map((bar, i) => (
        <span
          key={i}
          className={`censor-bar absolute ${bar.reverse ? "censor-bar--reverse" : ""}`}
          style={{
            left: bar.left,
            width: bar.width,
            top: bar.top,
            height: "0.13em",
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
 * Padding-top is in vw because the band's height scales with viewport width.
 * The band is 30.9% of its width, and its dense ink ends at 38% of that — so
 * the type must clear 11.7vw. Padding, not margin or centring, is what
 * guarantees it: `my-auto` centres the cluster higher when vertical slack is
 * short, which at 1920x898 and 1280x700 put the wordmark inside the heavy ink.
 * Verified across seven viewports by scripts/collide.mjs.
 */
export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[66svh] w-full max-w-[1728px] flex-col overflow-x-clip px-5 pb-6 pt-[15vw] sm:px-8 md:min-h-svh md:px-12 md:pb-10 md:pt-[14vw]">
      <Image
        src="/ink-band.png"
        alt=""
        width={2560}
        height={790}
        sizes="100vw"
        priority
        className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full select-none"
      />

      {/*
       * pt compensates the ascender overhang: at line-height 0.85 the glyphs
       * paint ~0.122em above the h1's layout box. Font size is 16.5vw, so
       * 0.122em ≈ 2vw — in vw rather than em so it cannot collapse or shift the
       * bars, which are positioned against the h1's own box.
       *
       * Top-biased on phones (mb-auto), centred from md up.
       */}
      <div className="relative z-10 mb-auto pt-[2vw] md:my-auto">
        {/* bg-stock gives the difference blend a defined backdrop inside the isolated group. */}
        {/*
         * The 18rem ceiling is derived, not guessed: at the 1728px container the
         * measure is 1632px, and Archivo condensed black runs ~0.571em per
         * character, so nine characters at 288px fill ~91% — the same fill the
         * type holds at every narrower width.
         */}
        <h1 className="relative isolate bg-stock font-display text-[clamp(3.5rem,16.5vw,18rem)] font-black uppercase leading-[0.85] tracking-[-0.035em] [font-stretch:75%]">
          Cardboard
          <br />
          Cultist
          <CensorBars />
        </h1>

        <p className="mt-6 inline-block -rotate-2 border-[3px] border-ink bg-flame px-4 py-2 font-doc text-xs uppercase leading-none tracking-[0.16em] md:mt-8 md:text-sm">
          Magic without gatekeeping
        </p>

        {/*
         * The CTAs belong to this cluster, not to the page foot. Pinned apart,
         * the pitch and the conversion end up at opposite ends of a phone
         * viewport with dead space between them.
         */}
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
          {socials.map((social) => (
            <li key={social.label} className="sm:w-auto">
              <a
                href={social.href}
                target="_blank"
                rel="me noopener"
                data-outbound={social.label}
                data-section="hero"
                className="flex min-h-11 w-full items-center gap-3 border-[3px] border-ink px-4 py-2 transition-colors duration-200 hover:bg-flame focus-visible:bg-flame sm:w-auto"
              >
                <span className="font-doc text-[0.7rem] uppercase tracking-[0.16em]">
                  {social.label}
                </span>
                <span className="font-body text-sm" translate="no">
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
