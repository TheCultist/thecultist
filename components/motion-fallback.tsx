"use client";

import { useEffect } from "react";

/**
 * Scroll-driven motion for engines without `animation-timeline`.
 *
 * Firefox has not shipped scroll-driven animations, so every effect on this
 * page was simply absent there: bars never lifted, copy never un-redacted,
 * rules never drew, and the mobile follow dock — a conversion aid, not
 * decoration — never appeared.
 *
 * This runs only where the CSS path is unavailable. Chrome and Safari keep the
 * zero-JS route untouched and never execute anything below the first line.
 *
 * The safety property is the same one the CSS holds: the covering styles live
 * behind `[data-motion-fallback]`, an attribute only this script sets. If the
 * script never runs, no cover is ever painted and the page is simply static and
 * readable. A failure cannot hide content.
 */
export function MotionFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;

    const root = document.documentElement;
    root.dataset.motionFallback = "";

    const reveals = document.querySelectorAll<HTMLElement>(
      ".unredact, .rule-draw, .stamp-land, .censor-bar--pass",
    );
    const bars = [...document.querySelectorAll<HTMLElement>(".censor-bar--lift")];
    const dock = document.querySelector<HTMLElement>(".follow-dock");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Reduced motion still has to arrive at the finished state, not sit at
      // the from-state with the page half-redacted.
      reveals.forEach((el) => el.classList.add("motion-in"));
      dock?.classList.add("motion-in");
      return () => {
        delete root.dataset.motionFallback;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("motion-in");
          observer.unobserve(entry.target);
        }
      },
      // Fires as the element clears the lower third, matching where the CSS
      // cover ranges resolve.
      { rootMargin: "0px 0px -32% 0px" },
    );
    reveals.forEach((el) => observer.observe(el));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const vh = window.innerHeight;
        const y = window.scrollY;

        bars.forEach((bar, i) => {
          // Mirrors the staggered CSS ranges: 0-30svh, 7-40svh, 14-50svh.
          const start = i * 0.07 * vh;
          const span = (0.3 + i * 0.03) * vh;
          const p = Math.min(1, Math.max(0, (y - start) / span));
          const dir = bar.classList.contains("censor-bar--reverse") ? 1 : -1;
          bar.style.transform = `translateX(${dir * p * 110}vw)`;
        });

        dock?.classList.toggle("motion-in", y > vh * 0.52);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
      delete root.dataset.motionFallback;
    };
  }, []);

  return null;
}
