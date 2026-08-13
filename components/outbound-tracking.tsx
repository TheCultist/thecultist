"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Outbound click tracking.
 *
 * Without this the Phase 3 success metric — social click-through rate — is
 * unmeasurable, since every conversion on this page is a navigation away from
 * it.
 *
 * Implemented as one delegated listener rather than per-link handlers so every
 * section stays a Server Component. Mounted once in the root layout.
 */
export function OutboundTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[data-outbound]");
      if (!(link instanceof HTMLAnchorElement)) return;

      track("outbound", {
        destination: link.dataset.outbound ?? link.hostname,
        section: link.dataset.section ?? "unknown",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
