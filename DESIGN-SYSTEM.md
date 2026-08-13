# Design System — Cardboard Cultist

Status: **awaiting sign-off**. Written spec only; no implementation decisions are binding until approved.

Governs `thecultist.it`. Product truth lives in [PRODUCT.md](PRODUCT.md). `DESIGN.md` is deliberately **not** written yet — Impeccable requires it be recorded at finish from the built page, because a rulebook written before the build gets defended against reality instead of describing it.

---

## 1. The world

**The Embargo Sheet.** Seed `e2f79a43`, direction round resolved.

Magic's culture runs on withheld information — preview embargoes, spoiler season, insider knowledge, "you should already know this". This page is the leak that redacts nothing. Censor bars are struck across the type at exact registration and lift as you scroll, and they never come back.

The brand's pinned woodcut/occult anchor fuses with that world as a **censored proclamation**: a broadside printed to be nailed up in public, then struck through by someone who would rather it weren't read. That reconciles the two registers without diluting either — the ink-heavy historical type is the proclamation, the bars and stamps are the censor.

**What it refuses.** The full-bleed fantasy-art hero with a glowing logo and a social icon row, which is what this category always ships. And the clean white sans-serif startup page, which is its predictable opposite.

**Three raises**, each donated by a challenger this direction beat in the roll:
- **Structural redaction** *(from Kraków Secession)* — bars grow inward from the margins on fixed registration and recede as a section resolves. They are never scattered decoration.
- **Exact registration** *(from Łowicz Papercut)* — every bar and stamp aligns to a strict grid, the way real print censorship does.
- **Named depth planes** *(from Multiplane Cel)* — depth is a designed three-plane system, `bar` over `page` over `stamp`, not an arbitrary scroll offset.

**The honest risk, restated because it constrains everything below:** content must be readable with no JavaScript. **Bars therefore never hide information by default.** They lift emphasis, not content. If that line slips, this becomes a novelty filter over an ordinary page.

## 2. Colour

Cool document stock, deliberately **not** warm parchment — Impeccable names cream-ground-plus-serif-plus-terracotta as its single most common AI-default tell, and this palette is built to sit outside it.

**Every value below is sampled from the brand mark, not invented.**

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0D0E0C` | Body text, censor bars, rules. Sampled from the mark's linework |
| `--stock` | `#F1E4D8` | Page ground. The mark's own cream, median of a 3-unit spread |
| `--flame` | `#EF631E` | The candle flame. **Fill only — never text** |
| `--wax` | `#ECDFCF` | Secondary surface, sampled from the wax drip |
| `--halftone` | `#6E655C` | Secondary text, captions, metadata |
| `--rule` | `#D8C9B9` | Hairlines, registration marks, borders |

**Strategy: Restrained-plus-one.** Ink and stock own the page; `--stamp` is the single committed accent and is reserved for the primary action and stamp marks. Never introduce a fourth hue.

**Contrast, computed:**
- `--ink` on `--stock` ≈ **15.4:1** — far past AA
- `--halftone` on `--stock` ≈ **4.6:1** — passes AA, body-size minimum
- `--ink` on `--flame` ≈ **5.9:1** — passes AA. **This is the only way flame may carry text**
- `--flame` on `--stock` ≈ **2.6:1** — fails AA *and* the 3:1 large-text floor

**`--flame` is a fill, never a foreground.** Orange text on cream is unreadable at any size. It fills stamps, CTA hover states and graphic fields with `--ink` set on top. This is a hard rule, not a preference — it is the single easiest way to break this palette.

An earlier draft specced a cool grey stock with an embargo red accent, chosen to avoid the cream-plus-serif-plus-terracotta cluster Impeccable flags as its top AI-default tell. The brand assets overruled it. Impeccable's own first rule is that the brief wins over a saturated-pattern warning, and an existing logo is the strongest brand commitment there is. The cluster warning also does not apply here: it describes cream paired with a *high-contrast serif* display, and this system pairs cream with a condensed black grotesque.

**Light-first, justified.** The physical scene: a phone held one-handed in a lit room, arriving from a video, for eight seconds. The world is printed matter — proclamations, embargo sheets, photocopies — which is black ink on stock. Inverting it to dark would make the register borrowed rather than native, and dark is what every other creator page already chose.

## 3. Typography

Three families. None appear on Impeccable's banned training-data-default list, which rules out Inter, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Fraunces, Space Grotesk, Space Mono, IBM Plex, DM Sans, DM Serif, Outfit, Plus Jakarta Sans and Instrument Sans — and separately satisfies your own ban on Inter, DM Sans and Poppins.

| Role | Face | Usage |
|---|---|---|
| **Display** | **Archivo** — variable, `wght` + `wdth` | `<h1>`, section heads. Set at weight 900, width 75%, to match the existing wordmark's condensed black caps |
| **Body** | **Spectral** — 400 / 600 + italic | Paragraphs, link text. Screen-designed serif that survives small sizes in a webview |
| **Document** | **JetBrains Mono** — 500 | Stamps, labels, captions, metadata. Uppercase, tracked `+0.16em` |

**Why a grotesque and not a serif.** The wordmark in the existing lockup is heavy condensed grotesque caps, and the woodcut quality of this brand lives in its *imagery* — the linocut candle-card — not its lettering. Pairing that mark with a gothic serif would double down on "old"; pairing it with a modern condensed black gives contrast and matches what the brand already says about itself.

Archivo's width axis is what makes this work: it reaches condensed black, so headings match the wordmark while keeping a full weight range for hierarchy. Verified live against the Google Fonts API — 400/700/900 at `wdth 75` all resolve.

This replaced two earlier proposals: IM Fell English (rejected — no bold) and Grenze (rejected — a serif, once the real wordmark surfaced).

The mono has a semantic payoff worth stating: it echoes MTG rules-text boxes, so the "Rules & Facts" positioning lands typographically rather than by assertion.

**Scale** (fluid via `clamp()`, ratio ≈ 1.5 at desktop, tightening to ≈ 1.333 on mobile):

| Step | Mobile → Desktop | Face |
|---|---|---|
| Display | `clamp(3.5rem, 14vw, 9rem)` | Grenze |
| H2 | `clamp(2rem, 6vw, 3.5rem)` | Grenze |
| H3 | `clamp(1.25rem, 3vw, 1.75rem)` | Grenze |
| Body | `1.0625rem` → `1.125rem` | Spectral |
| Small | `0.9375rem` | Spectral |
| Label | `0.75rem`, uppercase, tracked | JetBrains Mono |

Body line-height `1.6`. Display line-height `0.95` — tight, so the censor bars read as struck across a solid block. Measure capped at `66ch`.

**Loading budget:** one Archivo variable file covering both axes, plus Spectral 400 + 600 and JetBrains Mono 500. Self-hosted automatically by `next/font/google`, which downloads at build time and serves from our own origin — there is no runtime request to Google. `latin` subset, `font-display: swap`. Self-hosting is not optional: in-app webviews are where runtime font fetches flash worst.

## 4. Spacing and grid

8px base. Scale: `4 · 8 · 16 · 24 · 40 · 64 · 104 · 168` (spacious, matching a marketing surface rather than a dashboard).

**Registration grid.** 12 columns desktop, 4 mobile, `24px` gutters, `1440px` max with `24px` minimum page margin. Every censor bar, stamp and rule **snaps to a column edge** — the exact-registration raise is enforced here or it isn't enforced anywhere.

Rhythm: more space above a heading than below it, always. One dense passage earns one quiet one.

**Radius: `0` everywhere. Borders: `1px` hairline or `3px` heavy — nothing between.** Printed matter has no rounded corners; this single rule does most of the work of keeping the page out of SaaS-template territory.

## 5. Components

Every component is drawn in the world's vocabulary. A stock rounded button inside this page is a lapse.

- **Censor bar** — solid `--ink` rectangle on the `bar` plane, snapped to columns, `0` radius. Sits *over* type without hiding it from assistive tech (`aria-hidden`, purely presentational, never wrapping content).
- **Stamp** — `--stamp` outlined block, JetBrains Mono uppercase, rotated `-2deg` to `-4deg`, slight edge erosion. Used for the motto and section labels.
- **Rule row** — the archive and tools links: a hairline `--rule` above, mono label left, content right. No card, no container, no shadow.
- **Primary CTA (social)** — heavy `3px` `--ink` border, `--stamp` fill on hover/focus, `--stock` text. Minimum `44px` touch target. Never a pill.
- **Persistent element (mobile only)** — a `1px` marginal rule carrying the three handles, entering after the hero exits. **Drawn as a carved margin, never a floating pill bar.** Dies at Phase 7 if Impeccable's polish pass reads it as a Linktree.
- **Registration marks** — corner crop marks at section boundaries, `--rule`, purely structural furniture.

**Banned outright:** rounded-square icon tiles above headings, cards nested in cards, gradients of any kind, drop shadows, glassmorphism, emoji as icons. Icons are SVG drawn in the world's own line grammar, or there are no icons.

## 6. Motion

Locked in Phase 3, expressed here in the world. **Zero animation dependencies** — no `motion/react`, no Lenis, no GSAP.

| Section | Behaviour | Mechanism |
|---|---|---|
| Hero | Static on arrival. Bars slide off horizontally as it scrolls away | CSS scroll-timeline |
| Positioning | Staggered line reveal, `60ms` apart | IntersectionObserver + CSS transition |
| Tools | findthatcard leads; each rule draws itself left to right, staggered | CSS scroll-timeline |
| Archive | Rules draw; dormant entry permanently muted | CSS scroll-timeline + static |
| Follow close | Reveal with weight; stamp lands last | IntersectionObserver |

**No pinning, no horizontal scroll, anywhere.** Both depend on stable viewport height, which is exactly what in-app webviews do not provide.

**Two motion decisions changed during the build, both away from scroll effects:**

- *Tools* was specced as a scroll-linked depth offset between the two blocks. Built and cut: fractional `translateY` on text-bearing elements costs subpixel antialiasing, and the drifting copy rendered visibly softer than the copy beside it. The direction's own plane raise asked for "a designed plane system with named layers, **not an arbitrary scroll offset on the tools section**" — the asymmetric placement is that system. Replaced with a rule that draws itself.
- *Archive* was specced as scroll-linked desaturation. Cut as dishonest: this palette is three hues on cream, so a saturation ramp is very nearly a no-op and would have been an effect that appears to do something while doing nothing. "Receding into the past" is instead carried semantically — the dormant entry gets a hairline rule and halftone type against the live entry's 3px ink, permanently, plus past-tense copy.

Duration `200–320ms`, easing `cubic-bezier(0.2, 0, 0, 1)`. Exits faster than entrances.

**`prefers-reduced-motion: reduce` → all bars render already-lifted, all content at final opacity and position.** No fade-only fallback: the reduced state is the finished state.

## 7. Section structure

| # | Section | Carries |
|---|---|---|
| 1 | **Hero** | `<h1>` "Cardboard Cultist" in Display, three bars struck at registration. "MAGIC WITHOUT GATEKEEPING" stamped beneath. Three social CTAs as the only fully clear text. **LCP element, never animated in** |
| 2 | **Positioning** | What this is, in your voice. Staggered reveal |
| 3 | **Tools** | findthatcard.net at greater prominence, stormcount.gg secondary. Asymmetric, not a matched pair. Both `target="_blank"` |
| 4 | **Gaming archive** | Most compressed section. Screenhype present-tense, naming Luigi Savinelli openly to bridge the byline; *Inform the Gamers* explicitly past-tense |
| 5 | **Follow close** | The conversion restated. Stamp lands last |

## 8. Accessibility floor

Non-negotiable, from `PRODUCT.md`:

- One `<h1>`. Real `<main>`, `<section>`, `<nav>`, `<footer>`
- Full content readable with JS disabled — **censor bars must degrade to nothing, never to hidden content**
- Keyboard navigable end to end; visible focus ring, `2px` `--stamp` offset `2px`, never removed
- Minimum `44×44px` touch targets, `8px` apart
- `svh`/`dvh` units only, never `vh`
- Social links `rel="me noopener"`, `target="_blank"`
- All decorative bars, stamps and registration marks `aria-hidden="true"`
- Target: Lighthouse 95+ Performance and Accessibility

## 9. Resolved

1. **Display face** — IM Fell English rejected for having no bold; **Grenze** adopted, 400/700/900 + italic, weights verified against the live API.
2. **Highlighter yellow** — cut. Three hues plus two greys, no fourth.
3. **Copy** — drafted by Claude, voice-critical lines overwritten by the owner.

Nothing outstanding. Cleared for Phase 5.
