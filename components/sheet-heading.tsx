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
  className?: string;
};

export function SheetHeading({
  children,
  sheet,
  label,
  strike,
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
          className="censor-bar plane-strike absolute"
          style={{ left: strike.left, width: strike.width, top: strike.top, height: "0.16em" }}
        />
      </h2>

      <div
        aria-hidden="true"
        className="plane-furniture col-span-12 mt-6 flex items-center gap-3 font-doc text-[0.65rem] uppercase tracking-[0.18em] text-halftone md:col-span-3 md:col-start-10 md:mt-2 md:flex-col md:items-end md:gap-1"
      >
        <RegistrationMark />
        <span translate="no">Sheet {sheet} / 05</span>
        <span>{label}</span>
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
