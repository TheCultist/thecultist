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
] as const;

export const tools = {
  findThatCard: {
    label: "findthatcard.net",
    href: "https://findthatcard.net",
  },
  stormCount: {
    label: "stormcount.gg",
    href: "https://stormcount.gg",
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

export const reels: readonly Reel[] = [
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-1.png", alt: "Placeholder frame 1", placeholder: true },
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-2.png", alt: "Placeholder frame 2", placeholder: true },
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-3.png", alt: "Placeholder frame 3", placeholder: true },
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-4.png", alt: "Placeholder frame 4", placeholder: true },
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-5.png", alt: "Placeholder frame 5", placeholder: true },
  { href: "https://www.instagram.com/cardboard.cultist/", thumb: "/reels/placeholder-6.png", alt: "Placeholder frame 6", placeholder: true },
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
