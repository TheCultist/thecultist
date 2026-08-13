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

export function Positioning() {
  return (
    <section className="mx-auto w-full max-w-[1728px] px-5 py-24 sm:px-8 md:px-12 md:py-40">
      <h2 className="font-display text-[clamp(1.75rem,5vw,4rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] [font-stretch:75%]">
        {STATEMENT.map((line) => (
          <span key={line} className="unredact block w-fit">
            {line}
          </span>
        ))}
      </h2>

      <p className="mt-10 max-w-[58ch] font-body text-halftone md:mt-14">
        None of this is a full-time operation. It is a senior developer with a
        bedtime routine and a stubborn opinion that Magic should be easier to get
        into than people make it. No tier lists. No &ldquo;well, actually&rdquo;.
        Occasionally a candle.
      </p>
    </section>
  );
}
