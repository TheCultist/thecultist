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
  { left: "50%", width: "50%", top: "0.57em", reverse: true },
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

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-svh w-full max-w-[1728px] flex-col px-5 py-6 sm:px-8 md:px-12 md:py-10">
      {/*
       * The mark stays in flow. Positioned absolutely it cannot see the centred
       * cluster below it, and the two collide on any short viewport — measurably
       * so at 1920x898 and below. `my-auto` on the cluster centres it in the
       * space the mark leaves, which cannot overlap by construction.
       */}
      <Image
        src="/mark.png"
        alt=""
        width={1024}
        height={1024}
        sizes="(min-width: 768px) 96px, 64px"
        className="h-16 w-16 flex-none md:h-24 md:w-24"
      />

      {/*
       * pt compensates the ascender overhang: at line-height 0.85 the glyphs
       * paint ~0.122em above the h1's layout box, so correct flow layout still
       * lets them encroach on the mark. Font size is 16.5vw, so 0.122em ≈ 2vw —
       * expressed in vw rather than em so it cannot collapse or shift the bars,
       * which are positioned against the h1's own box.
       */}
      <div className="my-auto pt-[2vw]">
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
