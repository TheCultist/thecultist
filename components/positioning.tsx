/**
 * The positioning beat: what this is, for a stranger who arrived from a video.
 *
 * Each line ships under an ink bar that retracts as it enters the viewport, so
 * the section performs the thesis rather than describing it.
 *
 * VOICE-CRITICAL COPY — drafted, meant to be overwritten by the owner.
 * The three statement lines and the closing "candle" aside carry the deadpan;
 * everything else is structure.
 *
 * Position: a senior developer who makes Magic content on stolen time after his
 * child's bedtime — NOT "the rules guy". The content is deliberately broad
 * (memes, skits, rules, trivia); narrowing it to rules explanation misrepresents
 * the channel. See PRODUCT.md § Positioning.
 */
const STATEMENT = [
  "I write software for a living.",
  "I make Magic content after my kid falls asleep.",
  "Memes, skits, rules, trivia. Rarely a plan.",
] as const;

/* Tighter top padding on phones so this beat breaks the hero's fold. */
export function Positioning() {
  return (
    <section className="mx-auto w-full max-w-[1728px] px-5 pb-24 pt-14 sm:px-8 md:px-12 md:py-40">
      <div className="grid grid-cols-12 items-start gap-x-6">
        <div className="col-span-12 md:col-span-10">
          {/*
           * 3.3vw is measured, not chosen for looks: the longest statement
           * needs the font at or below 53px in a 1116px column at 1440, 36px at
           * 1024 and 26px at 768. Anything larger wraps, and a wrapped
           * statement uncovers both its rows at once rather than one per row.
           */}
          <h2 className="plane-type font-display text-[clamp(1.75rem,3.2vw,4rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] [font-stretch:75%]">
            {STATEMENT.map((line) => (
              // Outer block stacks the statements; the inner element stays
              // inline so its cover can clone per wrapped line fragment.
              <span key={line} className="block">
                <span className="unredact">{line}</span>
              </span>
            ))}
          </h2>

          <p className="mt-10 max-w-[58ch] font-body text-halftone md:mt-14">
            None of this is a full-time operation. It is a senior developer with
            a bedtime routine and a stubborn opinion that Magic should be easier
            to get into than people make it. No tier lists. No &ldquo;well,
            actually&rdquo;. Occasionally a candle.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="plane-furniture hidden md:col-span-2 md:col-start-11 md:mt-2 md:block md:border-l md:border-rule md:pl-4"
        >
          <dl className="font-doc text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-halftone">
            <dd translate="no">Sheet 02 / 05</dd>
            <dd className="text-ink">Position</dd>
            <dd className="mt-3 border-t border-rule pt-3">Unrestricted</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
