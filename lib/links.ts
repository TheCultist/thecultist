/**
 * Every outbound destination on the page.
 *
 * Handles are owner-confirmed but NOT machine-verified: TikTok requires login,
 * YouTube redirects to a GDPR consent wall, Screenhype returns 403 to bots.
 * Each one needs a manual click-through before launch.
 */

export type Social = {
  readonly label: string;
  readonly handle: string;
  readonly href: string;
};

export const socials: readonly Social[] = [
  {
    label: "Instagram",
    handle: "@cardboard.cultist",
    href: "https://www.instagram.com/cardboard.cultist/",
  },
  {
    label: "TikTok",
    handle: "@cardboard.cultist",
    href: "https://www.tiktok.com/@cardboard.cultist",
  },
  {
    label: "YouTube",
    handle: "@card_cultist",
    href: "https://www.youtube.com/@card_cultist",
  },
  {
    label: "Moxfield",
    handle: "@TheCultist",
    href: "https://moxfield.com/users/TheCultist",
  },
] as const;

/**
 * Published as a plain mailto, deliberately. Obfuscating it would cost the
 * no-JS guarantee and break "copy link address", and a domain-based address is
 * trivially filtered at the mailbox anyway.
 */
export const contact = {
  email: "luigi.savinelli@thecultist.it",
  href: "mailto:luigi.savinelli@thecultist.it",
} as const;

/**
 * `description` and `category` exist for the structured data, not the page.
 *
 * The copy rendered in the tools section is written in the site's voice; these
 * are the plain form, matching what public/llms.txt already says, for the
 * schema.org nodes that attribute both products to their author. Keeping them
 * beside the hrefs means the two descriptions of one tool cannot drift apart.
 */
export const tools = {
  findThatCard: {
    label: "findthatcard.net",
    href: "https://findthatcard.net",
    description:
      "Search Magic: The Gathering cards by describing them in natural language rather than by exact name.",
    category: "ReferenceApplication",
  },
  stormCount: {
    label: "stormcount.gg",
    href: "https://stormcount.gg",
    description:
      "A daily guessing game on whether a hidden card's mana value beats a revealed one, with a leaderboard.",
    category: "GameApplication",
  },
} as const;

/**
 * The contact strip: a curated showcase, deliberately NOT a live feed.
 *
 * Framed as "some things I made" rather than "latest", so it cannot read as
 * stale — which is why this is hand-curated rather than pulled from the
 * Instagram Graph API. That API needs a Meta app and a 60-day access token
 * refreshed on a schedule; when the token lapses the section breaks, on a page
 * whose whole point is that it does not.
 *
 * TO REPLACE: for each entry set `href` to the reel permalink, save its cover
 * frame to public/reels/ at 9:16 (1080x1920 is Instagram's native size) and
 * point `thumb` at it, then write `alt` describing what is in the frame.
 * Delete any entry you do not have — the section renders nothing when this
 * array is empty rather than showing gaps.
 */
export type Reel = {
  readonly href: string;
  readonly thumb: string;
  readonly alt: string;
  /** Remove once real content replaces the placeholder. */
  readonly placeholder?: boolean;
};

/**
 * Cover frames are stored locally, not hotlinked. Instagram's CDN URLs carry
 * expiring signatures, so linking them directly would leave the strip broken
 * some weeks later with nothing in the repo to explain why.
 *
 * To refresh: fetch the reel URL with a link-preview user agent, read its
 * og:image, download it and save it here at 9:16.
 */
export const reels: readonly Reel[] = [
  {
    href: "https://www.instagram.com/reel/DLxbX4_C2NL/",
    thumb: "/reels/reel-1.jpg",
    alt: "Luigi to camera in an “algorithm” T-shirt, captioned: when you find the perfect upgrade for your deck but…",
  },
  {
    href: "https://www.instagram.com/reel/DJ9OJUSiS5o/",
    thumb: "/reels/reel-2.jpg",
    alt: "The Magic card Mystic Remora, captioned: why not a creature?",
  },
  {
    href: "https://www.instagram.com/reel/DbVRSafTc0E/",
    thumb: "/reels/reel-3.jpg",
    alt: "A Zimone, Mystery Unraveler card held to camera, captioned: spicy tech for Zimone",
  },
  {
    href: "https://www.instagram.com/reel/Da7ezwFzyLd/",
    thumb: "/reels/reel-4.jpg",
    alt: "Luigi wide-eyed in black and white, captioned: five stages of grief, Commander edition",
  },
  {
    href: "https://www.instagram.com/reel/DZ-RRkKTCAN/",
    thumb: "/reels/reel-5.jpg",
    alt: "Luigi to camera, captioned: essential items to bring to any MTG event",
  },
  {
    href: "https://www.instagram.com/reel/DWRZx9BE4XV/",
    thumb: "/reels/reel-6.jpg",
    alt: "The Centurion Commander logo, captioned: competitive 1v1, made in Italy, regular Commander",
  },
] as const;

export const archive = {
  screenhype: {
    label: "Screenhype",
    href: "https://www.screenhype.co.uk/author/luigi-savinelli/",
  },
  informTheGamers: {
    label: "Inform the Gamers",
    href: "https://www.youtube.com/@TheCultist",
  },
} as const;
