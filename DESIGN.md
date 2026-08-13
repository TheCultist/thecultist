---
name: Cardboard Cultist
description: A five-sheet embargo document that redacts nothing — brand cream stock, toner black, flame orange as fill only.
colors:
  ink: "#0d0e0c"
  stock: "#f1e4d8"
  flame: "#ef631e"
  halftone: "#6e655c"
  rule: "#d8c9b9"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 16.5vw, 18rem)"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 6vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  subtitle:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  entry:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.125rem, 2.2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
  furniture:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.625
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  column-gap: "24px"
  block: "40px"
  section: "96px"
  section-lg: "160px"
components:
  target-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
    height: "44px"
  target-link-hover:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.ink}"
  target-link-lead:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
    height: "44px"
  target-link-lead-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  follow-tile:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
    height: "44px"
  follow-tile-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  stamp-filled:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  stamp-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
---

# Design System: Cardboard Cultist

## Overview

**Creative North Star: "The Embargo Sheet"**

This is a printed document that leaked. It is set on brand cream stock in toner black, ruled with hard 1px and 3px lines, numbered in its own margin ("Sheet 03 / 05"), and struck through with censor bars that register exactly on column edges. The redaction is the signature device and the joke: every bar is a `mix-blend-mode: difference` panel, so it inverts the letterforms underneath instead of erasing them. The page is about a category that hoards information behind embargoes, and it withholds nothing — the strikes are theatre you can read straight through, and the copy is legible with JavaScript off, with scroll-timelines unsupported, and under reduced motion.

Density is high and deliberately uneven. Nothing is centred, nothing is a matched pair, nothing has a rounded corner, and there is not a single shadow in the build. Depth is carried by a named four-plane z-system and by asymmetric column placement, never by parallax or elevation. Two visual rejections are confirmed in the artifact: the fantasy-art hero with a row of social icons, and the clean white sans page that is its opposite. A third is confirmed by reversion: a symmetric two-card grid for the tools, which flattened a real difference between a utility and a game.

The type does the shouting. Archivo at weight 900 and width 75% is set to the wordmark's own proportion and fills roughly 91% of the measure at every viewport; Spectral carries all running prose at a comfortable serif measure; JetBrains Mono is confined to document furniture — sheet numbers, classifications, domains, labels. Flame orange appears only as a filled ground, never as ink and never as a line.

**Key Characteristics:**
- Cream stock ground, toner-black ink, zero radius anywhere
- Censor bars that invert rather than cover, registered on twelfths
- Three faces with three fixed jobs: condensed display, serif prose, mono furniture
- Rules at 1px (hairline), 3px (standard), 6px (lead) — no other weights
- Flame orange as fill only, never text, never a rule, never a border
- Static named planes; no parallax, no shadows, no elevation
- Every motion effect double-guarded, with the unanimated state fully readable

## Colors

Sampled from the brand mark rather than chosen: three hues and two neutrals, all of them printing inks.

### Primary
- **Toner Black** (`{colors.ink}`): Every glyph that matters, every rule, every border, and the inverted ground of a hovered target. It is not pure black — it is a warm near-black that sits on cream without vibrating.

### Secondary
- **Flame Orange** (`{colors.flame}`): Fill only. The motto stamp, the lead tool's target, the three follow tiles, the selection highlight, and the tap-highlight tint. Ink on flame measures 5.9:1 and passes; flame on stock measures 2.6:1 and fails, which is why it is never permitted to carry a letterform or a line.

### Neutral
- **Brand Cream Stock** (`{colors.stock}`): The page ground, the browser theme-color, the censor bar's own fill, and the reversed text colour on ink grounds. Also painted explicitly behind any heading that hosts a strike, so the difference blend has a defined backdrop inside its isolated group.
- **Halftone Grey** (`{colors.halftone}`): All secondary prose, all margin furniture, the dormant archive entry's heading and border, and the scrollbar thumb. It is the "printed lighter" voice, not a disabled state.
- **Rule Cream** (`{colors.rule}`): Hairlines only — the margin furniture's left rule, its internal divider, and the dormant entry's 1px rule. Never used for text.

### Named Rules
**The Fill-Only Rule.** Flame is a ground, never a mark. It may fill a box that ink sits on; it may never be text, a rule, a border, an icon stroke, or a hairline. Audit test: if you can delete the flame and the shape still has an outline, it was used correctly.

**The Weight-Not-Hue Rule.** Hierarchy between two peer items is signalled by rule weight and heading scale, never by recolouring one of them. The lead tool carries a 6px ink rule against the follower's 3px. A flame rule was built here and reverted: at 2.6:1 it read *lighter* than the follower's ink rule and argued against the hierarchy the type had already established.

**The Two-Ink Rule.** Dormancy is drawn in halftone and hairline (1px `{colors.rule}`), currency in ink and 3px. Presenting an archived thing and a live thing alike either abandons the live one or resurrects the dead one.

## Typography

**Display Font:** Archivo variable, weight and width axes (with Arial Narrow)
**Body Font:** Spectral 400/600 (with Georgia)
**Label/Mono Font:** JetBrains Mono 500 (with ui-monospace)

**Character:** A condensed black poster face pulled to the wordmark's own proportion, set against a warm bookish serif and a clipped monospace that behaves like a form field. It reads as a document that got shouted at.

### Hierarchy
- **Display** (900, `clamp(3.5rem, 16.5vw, 18rem)`, 0.85, `-0.035em`, width 75%, caps): The wordmark only, once per page. The 18rem ceiling is derived, not picked: inside the 1728px container the measure is 1632px, Archivo at 900/75% runs ~0.571em per character, so nine characters at 288px fill ~91% — the same fill the type holds at every narrower width.
- **Headline** (900, `clamp(2rem, 6vw, 5rem)`, 0.95, `-0.03em`, caps): The closing statement, the only other place weight 900 appears.
- **Title** (700, `clamp(1.75rem, 5vw, 4rem)`, 1.08, `-0.02em`, caps): The positioning statement and the lead tool's heading — the two most important non-wordmark sentences.
- **Subtitle** (700, `clamp(1.5rem, 3.5vw, 2.75rem)`, 1.1, `-0.02em`, caps): Sheet headings. A secondary tool step sits between this and Entry at `clamp(1.375rem, 3vw, 2.25rem)`.
- **Entry** (700, `clamp(1.125rem, 2.2vw, 1.75rem)`, 1.15, `-0.01em`, caps): Archive items, and the handle inside a follow tile at a fixed 1.125/1.25rem.
- **Body** (400, 1.0625rem, 1.6; 1.125rem from 48rem up): All running prose, in Spectral, held to a 46–58ch measure depending on column width.
- **Label** (500, 0.7rem, `0.16em`, caps): Target links, social platform names, the footer.
- **Furniture** (500, 0.65rem, `0.18em`, caps): Margin apparatus only — sheet number, section name, classification.

### Named Rules
**The Three-Voice Rule.** Archivo is always uppercase, always width 75%, always negatively tracked, and never sets a sentence of prose. Spectral never sets a heading. JetBrains Mono never sets prose — it labels, numbers, classifies, and names domains. The three jobs do not swap.

**The Tighter-As-Bigger Rule.** Tracking scales inversely with size: `-0.035em` at display, `-0.03em` at headline, `-0.02em` at title and subtitle, `-0.01em` at entry, and positive `0.16–0.18em` on mono labels. Line-height moves with it: 0.85 at display up to 1.6 at body.

**The Measured-Glyph Rule.** Below line-height 1 the letterforms overflow their line boxes. Any element positioned against display type — strikes, ascender clearance — is offset against the *rendered glyph extents*, not the layout box, and the compensating pad is expressed in the same unit as the font size so it cannot drift.

## Layout

A single 1728px-max centred container runs the whole page, with gutters stepping 20px → 32px (40rem) → 48px (48rem). Inside it, a 12-column grid with a 24px column gap governs both content placement and, critically, strike geometry: every censor bar's `left` and `width` are twelfths of the measure, so a strike always begins and ends on a column edge.

Columns are deliberately asymmetric. Content takes 8 or 9 of 12 from `md` up; the secondary tool is offset to `col-start-7` at 6 wide, so it hangs under the lead rather than beside it. On phones every block collapses to a full 12 and stacks.

Vertical rhythm is section-scale: 96px bottom padding on phones, 160px from `md` up, with the positioning beat taking a tighter 56px top pad specifically so its heading crosses the hero's fold. The hero itself is `66svh` on phones — not a full viewport, because at `92svh` roughly 44% of the first screen was empty stock with nothing signalling that the page continued. From `md` up it takes the full `svh`.

Internal rhythm inside a block runs 12 / 16 / 20 / 24 / 32 / 40px and jumps to 48–112px between grouped elements. Interactive targets are never below 44px tall.

Margin furniture — registration mark, sheet number, section name, classification — occupies `col-start-10` at 3 wide, ranged left against a 1px hairline, and exists **only** from `md` up.

### Named Rules
**The Twelfths Rule.** Strike geometry is expressed in twelfths (`8.333%`, `16.667%`, `41.667%`, `50%`) so the redaction registers against the same grid as the type. Arbitrary percentages break the registration that is the whole conceit.

**The Margin-Needs-A-Margin Rule.** Document furniture is desktop-only by design. There is no margin on a phone, and in flow it reads as a caption under the heading — in the close it physically interrupted the path between the pitch and the conversion. It is not "hidden for space"; it is absent because its container does not exist.

## Elevation & Depth

There are no shadows in this system, at any weight, in any state. Depth is a static, named four-plane z-index system applied consistently: the sheet and its margin furniture sit behind, the type sits in front of them, and the redaction strikes sit above everything, because a censor is applied last. The planes are `--plane-sheet: 0`, `--plane-furniture: 1`, `--plane-type: 2`, `--plane-strike: 3`, exposed as the `.plane-*` utilities.

The system is deliberately not scroll parallax. A parallax layer was built on the tool blocks and cut: translating text by fractional pixels costs subpixel antialiasing, and the drifting copy rendered visibly softer than the copy beside it. Depth there is carried by asymmetric column placement and by rule weight instead. Note honestly: a finish review scored this plane system *partial*, because three of the four planes never visually overlap — furniture and type occupy different columns. The overlap was **declined**, not deferred: making planes cross for the sake of demonstrating them would be decoration.

### Named Rules
**The No-Shadow Rule.** Surfaces are flat at rest and flat in every state. A raised or offset shadow is foreign to this world — separation comes from a 3px border, a rule, or a plane assignment.

**The Applied-Last Rule.** Nothing renders above `--plane-strike`. If a new element needs to sit over a censor bar, the element is wrong, not the plane.

## Shapes

Zero radius, everywhere, without exception — boxes, targets, stamps, tiles, images. The form language is entirely rectangles and straight rules.

Line weights are a closed set of three: **1px hairline** (`{colors.rule}` or `{colors.halftone}`, for margin rules, dividers, and dormant items), **3px standard** (ink, for every border and every live rule), and **6px lead** (ink, for the single commercially-leading item on the page). Borders are always solid ink at 3px; there is no thin border and no ghost border.

Two rotations exist, both `-2deg`, both on stamps: the flame-filled motto in the hero and the outlined closing stamp. Rotation is a stamping gesture reserved for those; nothing else on the page is off-axis.

Icons are drawn as inline SVG with `currentColor` strokes at the same weights as the rules — a 2px-stroke outbound arrow and a 1px-stroke print registration mark. There are no icon fonts, no unicode glyph arrows, and no social logo marks.

## Components

### Target Links (the primary button form)
A bordered rectangle, mono-lettered, that reads as a stamped form field rather than a button.
- **Shape:** Zero radius, 3px solid ink border (0px)
- **Default:** Transparent on stock, ink label at 0.7rem / `0.16em` caps, 16px horizontal / 8px vertical padding, minimum 44px tall
- **Lead variant:** Flame-filled by default. Reserved for the single commercially-leading item
- **Hover / Focus:** Standard fills flame; lead inverts to an ink ground with stock text. Both transition `background-color` over 200ms and both fire on `:focus-visible` identically to `:hover`
- **Dormant variant:** Halftone border instead of ink, paired with a halftone heading and a 1px rule

**The Default-Affordance Rule.** A target's clickability is visible before interaction. Most traffic arrives in iOS in-app browsers where hover never fires; an affordance that only exists in a hover state ships as no affordance at all.

### Follow Tiles
The page's primary conversion, at greater weight than the hero's version of the same links.
- **Shape:** Zero radius, 3px ink border, flame-filled *by default*
- **Content:** Mono platform label above a condensed-display handle, outbound arrow ranged right
- **Padding:** 20px horizontal / 16px vertical, rising to 24px / 20px from `md`
- **Hover / Focus:** Inverts to ink ground, stock text, 200ms
- **Layout:** One column on phones, three equal columns from 40rem

### Stamps
A rotated, hard-bordered slab of mono caps, used exactly twice and never as a repeat of itself.
- **Filled:** Flame ground, 3px ink border, `-2deg` — the motto, in the first viewport
- **Outlined:** No fill, 3px ink border, `-2deg` — the closing line, which is the redaction lifted rather than the assertion restated

### Censor Bar (signature component)
A stock-coloured rectangle under `mix-blend-mode: difference`. Over empty stock it renders black; over letterforms it knocks them to light, so the redaction is readable straight through. It is `aria-hidden`, pointer-inert, and purely presentational — the page reads identically with JS disabled and nothing is ever hidden from assistive tech.
- **Geometry:** `left` and `width` in twelfths; `top` and `height` in `em` (0.13–0.16em) so strikes scale with the type as it clamps
- **Placement:** Renders *inside* the heading it strikes, inside an `isolate` group with an explicit stock background

**The Em-Resolves-Locally Rule.** A strike must be a child of the element whose font-size it is measured against. `em` resolves against the nearest element's own font-size — a sibling overlay sized these against body text and rendered them roughly 13× too small.

**The Strike-Ends-In-The-Glyph-Run Rule.** A bar must terminate inside the letterforms it crosses. Overhang past the last glyph is a stray rectangle, not a redaction. Shipped measurements: tools bar ends at 66.7% against glyphs reaching 79.9%; archive 41.7% against 53.3%; close 50% against 55.8%. This defect was introduced twice; measure against rendered glyphs before changing a strike.

### Margin Furniture
Desktop-only document apparatus: a 1px registration crop mark over a definition list giving sheet number, section name, and a hairline-separated classification, all in 0.65rem mono caps at `0.18em`, ranged left against a hairline in the tenth column. `aria-hidden` throughout — it is printed matter, not information.

### Motion
All motion is CSS `animation-timeline` — no animation library, no JS observers, nothing on the main thread. Four effects total: censor bars lifting off the hero on `exit`, ink covers retracting rightward on `entry` (staggered by child index), rules drawing left-to-right on `entry`, and the closing stamp landing on `cover`. Hover and focus transitions are a flat 200ms `background-color`.

**The Double-Guard Rule.** Every scroll effect lives inside *both* `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. This is a safety rule, not a stylistic one: a covering bar exists only inside the guards, so where the feature is unsupported or motion is reduced, no cover is ever drawn and the text is simply visible. A blindfold must never be able to become permanent.

**The Transform-Only-At-The-Foot Rule.** Never animate opacity from 0 on an element near the end of the document. The closing stamp did, on an `entry` range that cannot complete with only a footer beneath it, and `fill: both` pinned it at `opacity: 0` — the last element on the page shipped permanently invisible. It animates transform only, on a `cover 0%–30%` range, so an incomplete range degrades to a slightly different angle rather than to nothing.

## Do's and Don'ts

### Do:
- **Do** treat flame (`{colors.flame}`) as a ground only — ink on flame is 5.9:1 and passes; flame on stock is 2.6:1 and fails.
- **Do** register every censor bar on twelfths, and terminate it inside the glyph run it crosses.
- **Do** render a strike as a child of the element whose font-size sizes it, inside an `isolate` group with an explicit stock background.
- **Do** wrap every scroll-linked effect in both the `@supports` and the `prefers-reduced-motion` guard, and make the unguarded state the fully-visible one.
- **Do** mark hierarchy with rule weight (1px / 3px / 6px) and heading scale, never with hue.
- **Do** set display type uppercase at width 75% with negative tracking, and measure positions against rendered glyph extents when line-height drops below 1.
- **Do** give every interactive target a visible affordance at rest and a 44px minimum height; mirror every `:hover` treatment on `:focus-visible`.
- **Do** draw icons as inline SVG strokes at the system's line weights.

### Don't:
- **Don't** use flame for text, a rule, a border, an icon stroke, or a hairline.
- **Don't** add a border radius. Zero is the value, everywhere.
- **Don't** add a shadow of any kind — this system has none, and separation comes from borders, rules, and named planes.
- **Don't** animate a text plane's position on scroll: fractional `translateY` costs subpixel antialiasing and renders drifting copy visibly softer than its neighbours.
- **Don't** animate opacity from 0 on any element near the foot of the document.
- **Don't** introduce a line weight outside 1px / 3px / 6px, or a rotation outside the `-2deg` stamp gesture.
- **Don't** place margin furniture in the content flow on phones — it reads as a stray caption and, on the close, interrupts the conversion path.
- **Don't** present two peer items as a matched symmetric pair when one genuinely leads; and don't present a dormant item at the same weight as a live one.
- **Don't** use a unicode glyph, an icon font, or a social logo mark where a drawn SVG stroke belongs.
