# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Magic: The Gathering players who have just watched a Cardboard Cultist short-form video on TikTok, Instagram Reels, or YouTube Shorts and tapped through to the link. They arrive on a phone, inside an in-app webview, mid-scroll, with no prior knowledge of the brand. They decide in roughly eight seconds whether this person is worth following.

**Secondary:** people who already follow and have come looking for something specific — the card-search tool, the storm counter, or the writing.

The two groups want opposite things: the first needs to be convinced, the second needs to be routed. The page serves the first without obstructing the second.

## Product Purpose

A single-page hub at **thecultist.it** that converts short-form video viewers into followers of the Cardboard Cultist social accounts.

The follow is the conversion. Secondary destinations — findthatcard.net, stormcount.gg, and the Screenhype writing — exist on the page but must not compete with it.

**Success metric:** social click-through rate — unique visitors who click any social CTA, divided by unique visitors — **targeting 30%** at three months. This isolates the page's own contribution; raw follower growth mostly measures video performance, not page performance. Secondary metric: share of visitors who reach the tools section.

## Positioning

**A senior software developer who plays Magic and makes content on stolen time, after his child's bedtime.**

That is the position, and it is not copyable. A full-time creator cannot claim it. A hobbyist cannot claim the engineering. It also explains the tools without needing to argue for them: findthatcard.net and stormcount.gg are not a side project bolted onto a content brand, they are what a senior developer does with a Magic problem and an hour to spare. The tools are evidence of the position, not an appendix to it.

**The content is deliberately broad, not a single format.** Memes, skits, rules explanations, MTG trivia. Framing this as "the rules guy" is wrong and narrows him to one of several things he does — the Instagram display name "MTG Rules & Facts" describes one lane, not the whole channel.

The voice is deadpan and absurdist. The philosophy is explicitly anti-gatekeeping — the opposite of the competitive-tier, "you should already know this" register common in MTG content. The motto is **"Magic without gatekeeping"**. The scarcity of time is part of the voice rather than an apology for it: someone making this after bedtime has no room to be precious about it.

## Operating Context

- Traffic arrives overwhelmingly from in-app browsers (TikTok, Instagram), not desktop Chrome. These webviews have quirks around scroll behaviour, viewport units, and font loading.
- The visit is short, one-handed, vertical, and often on a poor connection.
- The visitor has just seen a video, so they arrive with context about the *content* but none about the *brand*.
- The realistic outcome of a successful visit is a tap out to a social app, not extended time on page.

## Capabilities and Constraints

- Single page, scroll-driven. Motion is a first-class part of the design, not decoration.
- Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4, deployed on Vercel.
- **Domain `thecultist.it` is already owned, registered at Aruba.it — not Namecheap.** DNS is therefore managed in Aruba's control panel; the Namecheap host-records method named in the original brief does not apply. Exact records to be confirmed against Vercel's current documentation at deploy time.
- **Language: English throughout**, including the archived gaming material. The `.it` TLD is part of the name, not a locale signal.
- **Zero animation dependencies.** IntersectionObserver + CSS transitions for reveals, native CSS scroll-timelines for progress-linked effects. `motion/react` was evaluated against the settled section-by-section motion plan and is not needed; it may be added later if a specific effect genuinely requires it. Lenis is excluded deliberately — smooth-scroll hijacking degrades in the in-app webviews that supply most traffic.
- **Fully static.** No live embeds or feeds. A YouTube embed alone would cost the 95+ Performance target, and a stale "latest video" reads as abandonment. Freshness, if wanted, comes from a hand-edited typed data file.
- **Analytics:** Vercel Analytics + Speed Insights, with a custom event on every outbound social click. Cookieless, so no consent banner is required — which matters under GDPR on an `.it` domain, and a cookie wall in front of an eight-second conversion would be self-defeating. Tracked: outbound destination per click, scroll depth. Nothing else.
- No commercial content on this page. findthatcard.net monetises via affiliate links inside the tool itself, so no disclosure obligation falls on this site.

## Brand Commitments

- **Cardboard Cultist is the identity the visitor meets first.** It is the `<h1>`. `thecultist.it` is the address, not the brand shown to a stranger.
- The older *TheCultist* identity is not surfaced as an umbrella. The archived gaming work appears lower on the page, framed as history rather than as a live destination.
- Voice: deadpan, absurdist, anti-gatekeeping. Never earnest hype, never insider gatekeeping.
- The owner's real name, **Luigi Savinelli**, may appear on the page. The archive section names it openly to bridge the Screenhype byline, rather than letting the click land on an unexplained different name.
- The cult / occult-woodcut register, established by the recent rebrand, is the aesthetic anchor.
- **Binding anti-references** (stated by the owner, carried into all visual work): MTG creator sites that amount to a Linktree over a background image; AI-default SaaS landing pages — Inter everywhere, purple-to-blue gradients, cards nested in cards, rounded-square icon tiles above each heading.

## Evidence on Hand

**Available:**
- Woodcut-style logo — a linocut Magic card drawn as a lit candle, wax running down one side. **Raster only (PNG). No vector source exists**, so it cannot be scaled arbitrarily large, recoloured as line art, or treated as live vector texture. Anything needing it huge or theme-reactive requires the owner to produce a vector first.
  - `branding/logo_no_background.png` — 1024×1024, **genuine alpha**. The card mark alone. Best asset; shipped as `public/mark.png`
  - `branding/logo_circle_thin.png` — 1150×1150, alpha. The full badge lockup (mark + wordmark), circular-cropped from `logo_circle.png` to thin its black ring from 95px to 45px. Shipped as `public/badge.png`
  - `branding/logo_circle.png` — 1181×1181, the original badge. Ring inner radius 530, outer 625; the circle overflows the canvas and is clipped at the four cardinal points
  - `branding/1000068656.png` — **unusable.** Named as transparent but is 24-bit with the checkerboard baked in as real pixels; an export of a transparency preview
  - `branding/1000068657.png` / `1000068658.png` — byte-identical duplicates. Mark on a cream ground, no wordmark
  - `branding/1000068639.jpg` — a Canva screenshot with phone chrome. Not an asset; useful only as a reference for the intended lockup
- **The existing wordmark is heavy condensed grotesque caps**, not a serif. The woodcut character of this brand lives in its imagery, not its lettering — which is why the display face is a condensed black grotesque rather than a period serif.
- Brand colours, sampled from the mark rather than chosen: ink `#0D0E0C`, cream `#F1E4D8`, flame `#EF631E`, wax `#ECDFCF`.
- A **2560×1440 YouTube channel cover** carrying the logo and the motto **"Magic without gatekeeping"**. Note it is a YouTube banner, so its composition sits inside the 1546×423 safe area with surrounding margin intended to be cropped.
- Two live, working web products, and they are different in kind:
  - **findthatcard.net** — a utility: natural-language MTG card search. **Commercially the more important of the two** (affiliate links inside), so it takes the greater prominence on the page despite being the harder of the two to make a cold visitor care about.
  - **stormcount.gg** — a game: guess whether a hidden card's mana value beats a revealed one. Daily seeded challenge, endless mode, leaderboard. Headline "How high is your storm count?". Already dark-themed.
- **Owner-confirmed social handles** (not machine-verifiable — TikTok requires login, YouTube redirects to a GDPR consent wall; re-check manually before launch):
  - Instagram — `@cardboard.cultist` *(independently confirmed live; display name "Cardboard Cultist | MTG Rules & Facts")*
  - TikTok — `@cardboard.cultist`
  - YouTube — `@card_cultist`
- Published writing at **Screenhype**: `https://www.screenhype.co.uk/author/luigi-savinelli/`. **Published under the owner's real name, Luigi Savinelli — not under the Cardboard Cultist brand.** A visitor clicking through lands on a page bylined with a different name than the one they arrived for, so the archive copy must bridge that gap rather than let it read as a broken link.
- An archived Italian videogame channel, *TheCultist – Inform the Gamers*: `https://www.youtube.com/@TheCultist`. No longer updated. Note this is a **separate channel** from the active MTG channel at `@card_cultist`.

**Photography — this changed late and the old note was wrong.** Six Instagram
reel cover frames are now stored at `public/reels/`, pulled from each post's
`og:image` and saved locally because Instagram's CDN URLs expire. Three show
the owner on camera; one shows a Magic card held to camera. So the page is no
longer purely typographic — it has real photographic material, and the earlier
statement that none existed no longer holds.

To refresh a cover: request the reel URL with a link-preview user agent, read
its `og:image`, download and save at 9:16.

**Still explicitly absent — must not be invented:**
- No studio or product photography beyond those cover frames.
- No follower counts, view counts, testimonials, press mentions, or awards have been confirmed. None may be fabricated or used as placeholder.
- No URL in this document has been machine-verified except `findthatcard.net`, `stormcount.gg`, and the Instagram profile. TikTok, both YouTube channels, and Screenhype are all behind login walls, GDPR consent interstitials, or bot protection. **Every link needs one manual click-through before launch.**

The practical consequence: **the page has no photographic material and no human face.** It must carry itself on typography, graphic form, motion, and a single raster logo.

## Product Principles

1. **The follow is the product.** Every section competes with the primary conversion. Anything that does not serve it must justify the scroll distance it consumes.
2. **Eight seconds, one hand, bad connection.** The value proposition must land on a phone in an in-app webview before any motion has finished playing.
3. **Anti-gatekeeping is structural, not a slogan.** No assumed insider knowledge, no jargon walls, no formats that reward the already-initiated.
4. **Nothing fabricated.** No invented metrics, social proof, or claims — the evidence list above is the whole of what is true.
5. **The archive is history, not a destination.** Abandoned work is presented honestly as past, never dressed as active.

## Accessibility & Inclusion

- Every scroll effect respects `prefers-reduced-motion`.
- Content is readable without JavaScript; motion is enhancement only.
- Keyboard navigable end to end with visible focus states throughout.
- Real semantic HTML: `<main>`, `<section>`, exactly one `<h1>`.
- The LCP element is never animated in.
- Target: 95+ Lighthouse Performance and Accessibility.
