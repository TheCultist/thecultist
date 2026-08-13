@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`thecultist` is a single-page, scroll-driven hub for the **Cardboard Cultist** MTG brand, deploying to **thecultist.it**. Primary conversion goal is follows on the Cardboard Cultist socials; web products (findthatcard.net, stormcount.gg) and the gaming section (Screenhype writing + the archived *TheCultist – Inform the Gamers* channel) are secondary.

Requirements are being locked via a structured phase process before implementation. See the brief in the session plan; `PRODUCT.md`, `DESIGN.md`, and `DESIGN-SYSTEM.md` will land as those phases complete.

## Commands

```bash
npm run dev      # dev server (Turbopack) on localhost:3000
npm run build    # production build
npm run lint     # eslint
npm start        # serve production build
```

There is no test suite yet.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 — CSS-first config via `@theme` in `app/globals.css`; there is no `tailwind.config.ts`
- Deployed on Vercel; DNS via Namecheap host records (A + CNAME)

## Conventions

- App Router only — never add a `pages/` directory
- Server Components by default; Client Components only where interactivity demands it
- Tailwind utility classes only — no CSS modules, no styled-components; avoid arbitrary values unless genuinely unavoidable
- Import alias is `@/*`, rooted at the repo root (no `src/` directory)
- Env vars go in `.env.local` and are typed in `env.ts` (not yet created — no env vars exist yet)

## Motion

Motion-led page, but layered by cost:

1. **Reveal-on-enter** — IntersectionObserver + CSS transitions (0 kb)
2. **Progress-linked / parallax** — native CSS `animation-timeline: scroll()` / `view()` (0 kb, off main thread)
3. **Orchestrated / spring** — `motion/react`, only where CSS genuinely cannot express the choreography

**Lenis is deliberately excluded** — smooth-scroll hijacking degrades badly in the iOS TikTok/Instagram in-app browsers that supply most traffic.

Non-negotiables: every scroll effect respects `prefers-reduced-motion`; content is readable without JS; keyboard navigable with visible focus throughout; the LCP element is never animated in; one `<h1>`; real semantic HTML.

## Note on Next.js 16

Per `AGENTS.md`, this Next.js version has breaking changes relative to model training data. Consult `node_modules/next/dist/docs/` before writing framework-level code.
