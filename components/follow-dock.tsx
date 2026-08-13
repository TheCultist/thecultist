import { socials } from "@/lib/links";

/**
 * The persistent follow element, decided in Phase 3: mobile only, appearing
 * once the hero has left, and drawn as a carved marginal rule rather than a
 * floating pill — a floating rounded bar is the Linktree register the brief
 * named as a binding anti-reference.
 *
 * So: full-bleed, zero radius, a 3px ink rule along its top edge and hairline
 * divisions between cells, like the ruled foot of a printed sheet.
 *
 * Motion and hidden-by-default behaviour live in globals.css.
 */
export function FollowDock() {
  return (
    <nav
      aria-label="Follow"
      className="follow-dock fixed inset-x-0 bottom-0 z-50 border-t-[3px] border-ink bg-stock pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-3">
        {socials.map((social, i) => (
          <li key={social.label} className={i > 0 ? "border-l border-rule" : ""}>
            <a
              href={social.href}
              target="_blank"
              rel="me noopener"
              data-outbound={social.label}
              data-section="dock"
              className="flex min-h-12 items-center justify-center px-2 py-3 font-doc text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-flame focus-visible:bg-flame"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
