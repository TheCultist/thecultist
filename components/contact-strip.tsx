import Image from "next/image";

import { reels } from "@/lib/links";

/**
 * A contact strip of frames — the format a sheet of film is proofed on, so the
 * work appears in the page's own world rather than as a generic card grid.
 *
 * Sits between the closing stamp and the CTAs: it proves the claim immediately
 * before the conversion, and leaves the CTAs as the last thing read.
 *
 * Renders nothing when `reels` is empty, so removing entries degrades to
 * absence rather than to gaps.
 */
export function ContactStrip() {
  if (reels.length === 0) return null;

  const hasPlaceholders = reels.some((reel) => reel.placeholder);

  return (
    <div className="mt-10 md:mt-12">
      <ul className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {reels.map((reel) => (
          <li key={reel.thumb}>
            <a
              href={reel.href}
              target="_blank"
              rel="noopener"
              data-outbound="instagram-reel"
              data-section="contact-strip"
              className="group block border-[3px] border-ink transition-colors duration-200 hover:border-flame focus-visible:border-flame"
            >
              <Image
                src={reel.thumb}
                alt={reel.alt}
                width={540}
                height={960}
                sizes="(min-width: 768px) 16vw, 30vw"
                className="aspect-[9/16] w-full object-cover"
              />
            </a>
          </li>
        ))}
      </ul>

      {hasPlaceholders ? (
        <p className="mt-3 font-doc text-[0.65rem] uppercase tracking-[0.18em] text-halftone">
          Placeholder frames — replace before launch
        </p>
      ) : null}
    </div>
  );
}
