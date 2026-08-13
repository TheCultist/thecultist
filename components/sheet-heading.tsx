import type { ReactNode } from "react";

/**
 * A section heading struck by the same censor device as the hero, plus the
 * margin furniture that composes the right field.
 *
 * The finish review found the Embargo Sheet stopping at the second screen —
 * everything below it was a plain editorial column belonging to no world. This
 * carries the redaction and the document apparatus down the page on the same
 * twelfths registration.
 *
 * The strike inverts the letterforms rather than covering them, exactly as the
 * hero does, so nothing is ever hidden.
 */

type SheetHeadingProps = {
  children: ReactNode;
  /** Sheet number, e.g. "03". The page is a five-sheet document. */
  sheet: string;
  /** Short name for this sheet, shown in the margin. */
  label: string;
  /** Strike geometry in twelfths, matching the hero's registration. */
  strike: { left: string; width: string; top: string };
  /** Slide the strike right instead of left as it clears. */
  reverse?: boolean;
  className?: string;
};

export function SheetHeading({
  children,
  sheet,
  label,
  strike,
  reverse = false,
  className = "",
}: SheetHeadingProps) {
  return (
    <div className="grid grid-cols-12 items-start gap-x-6">
      <h2
        className={`plane-type relative isolate col-span-12 max-w-[20ch] bg-stock font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] [font-stretch:75%] md:col-span-8 ${className}`}
      >
        {children}
        <span
          aria-hidden="true"
          className={`censor-bar censor-bar--pass plane-strike absolute ${reverse ? "censor-bar--reverse" : ""}`}
          style={{ left: strike.left, width: strike.width, top: strike.top, height: "0.16em" }}
        />
      </h2>

      {/*
       * Desktop only. Margin apparatus needs a margin: on a phone this dropped
       * into the content flow, reading as a label under the heading and, in the
       * close, interrupting the path between the pitch and the CTAs.
       *
       * Ranged left against a hairline, the way a printed sheet annotates its
       * own margin. Right-aligned and floating, it read as a stray label rather
       * than structure.
       */}
      <div
        aria-hidden="true"
        className="plane-furniture hidden md:col-span-3 md:col-start-10 md:mt-2 md:block md:border-l md:border-rule md:pl-4"
      >
        <RegistrationMark />
        <dl className="mt-3 font-doc text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-halftone">
          <dt className="sr-only">Sheet</dt>
          <dd translate="no">Sheet {sheet} / 05</dd>
          <dt className="sr-only">Section</dt>
          <dd className="text-ink">{label}</dd>
          <dt className="sr-only">Classification</dt>
          <dd className="mt-3 border-t border-rule pt-3">Unrestricted</dd>
        </dl>
      </div>
    </div>
  );
}

/** Print crop mark — the "exact registration" raise, drawn rather than implied. */
function RegistrationMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      className="h-4 w-4 flex-none"
    >
      <path d="M8 0v6M8 10v6M0 8h6M10 8h6" />
      <circle cx="8" cy="8" r="3.5" />
    </svg>
  );
}
