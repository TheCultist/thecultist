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
