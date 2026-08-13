import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redacted — Cardboard Cultist",
  robots: { index: false, follow: true },
};

/**
 * The 404, in the page's own world.
 *
 * Everywhere else the censor bars lift and nothing stays hidden — so the one
 * page that genuinely is missing is the one place the joke lands. The bar here
 * is static and opaque rather than a difference blend: this page is the
 * exception that proves the rest of the site's rule.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[1728px] flex-col justify-center px-5 py-10 sm:px-8 md:px-12">
      <p className="font-doc text-[0.7rem] uppercase tracking-[0.18em] text-halftone">
        Error 404
      </p>

      <h1 className="relative mt-6 max-w-[14ch] font-display text-[clamp(2.5rem,9vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] [font-stretch:75%]">
        This one really is redacted.
        <span
          aria-hidden="true"
          className="absolute bg-ink"
          style={{ left: "0%", width: "58.333%", top: "0.34em", height: "0.16em" }}
        />
      </h1>

      <p className="mt-8 max-w-[46ch] font-body text-halftone">
        There is nothing at this address. Everything that does exist is on the
        front page, and none of it is hidden.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 w-fit items-center border-[3px] border-ink bg-flame px-5 py-3 font-doc text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-ink hover:text-stock focus-visible:bg-ink focus-visible:text-stock"
      >
        Back to the front page
      </Link>
    </main>
  );
}
