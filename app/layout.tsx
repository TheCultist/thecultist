import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Spectral, JetBrains_Mono } from "next/font/google";

import { MotionFallback } from "@/components/motion-fallback";
import { OutboundTracking } from "@/components/outbound-tracking";
import { archive, contact, socials, tools } from "@/lib/links";
import {
  CONTENT_UPDATED,
  PERSON_ID,
  PROFILE_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";

import "./globals.css";

/**
 * Archivo carries both a weight and a width axis, which is what lets the
 * display type reach the condensed black of the existing wordmark.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/*
 * All three faces stay preloaded. Dropping preload on the body and mono faces
 * was tried and measured worse — LCP 2.7s to 3.0s, and a font-swap reflow
 * introduced CLS where there had been none. Font discovery moving to CSS parse
 * time costs more than the extra preload bytes save.
 */
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

/**
 * theme-color matches the page ground so mobile browser chrome — including the
 * TikTok and Instagram in-app browsers most visitors arrive in — blends with
 * the page instead of framing it in white.
 */
export const viewport: Viewport = {
  themeColor: "#f1e4d8",
  colorScheme: "light",
};

const DESCRIPTION =
  "A senior developer who plays Magic: The Gathering and makes content on stolen time. Memes, skits, rules, trivia — and two tools built instead of sleeping.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cardboard Cultist — Magic without gatekeeping",
  description: DESCRIPTION,
  applicationName: "Cardboard Cultist",
  authors: [{ name: "Luigi Savinelli" }],
  /*
   * Both hostnames answer, so this names the one that counts — and it only
   * works if Vercel serves that one rather than redirecting to it. A canonical
   * pointing at a redirect is discarded, and the crawler picks for itself.
   */
  alternates: { canonical: "/" },
  /*
   * Defaults everywhere except image previews. `max-image-preview: large` is
   * the one that earns its place on a page built around a visual brand: it is
   * what makes the difference between a thumbnail and a full-width image in
   * Google Images and Discover.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Cardboard Cultist",
    title: "Cardboard Cultist — Magic without gatekeeping",
    description: DESCRIPTION,
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cardboard Cultist — a Magic card drawn as a lit candle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardboard Cultist — Magic without gatekeeping",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

/**
 * The direction contract. Impeccable requires this survive the production
 * build so the finished page can be audited against what it promised.
 */
const DIRECTION_CONTRACT = `<!--
THESIS: Magic hoards information behind embargoes and insider knowledge. This page is the leak that redacts nothing. It refuses the fantasy-art hero with a social icon row, and refuses the clean white sans page that is its opposite.
OWN-WORLD: Brand cream stock, toner black, flame orange as fill only. Archivo condensed black display matching the wordmark, Spectral body, JetBrains Mono document furniture. Zero radius, 1px or 3px rules, censor bars on exact column registration.
STORY: A stranger arriving from a short video learns this is Magic explained without gatekeeping, and follows.
FIRST VIEWPORT: "Cardboard Cultist" set full-width in condensed black caps. Three censor bars struck at column edges, inverting the type beneath rather than erasing it. Motto stamped on flame orange below. Four handles as the only unstruck text.
FORM: The Embargo Sheet, candidate 6 of 7, seed e2f79a43.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

/**
 * Structured data, stating only facts that are already on the page.
 *
 * A `@graph` rather than a single node, because the useful claims here are
 * about *relationships* and a lone node cannot express them. Two do the work:
 *
 * `sameAs` says this domain and these profiles are one identity — the whole
 * job of a creator hub. `author` on the two tool nodes says the same person
 * made findthatcard.net and stormcount.gg, which nothing else on the web
 * states. Without it three domains one person owns look unrelated, and none of
 * the recognition earned by any of them reaches the others.
 *
 * `sameAs` would be the wrong field for the tools: it asserts that two URLs
 * are the same entity, and a person is not their software.
 *
 * No ratings, no counts, no invented claims. `llms.txt` says the same thing in
 * prose, and the two must not disagree.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Luigi Savinelli",
      alternateName: "Cardboard Cultist",
      url: SITE_URL,
      email: contact.href,
      image: `${SITE_URL}/mark.png`,
      description: DESCRIPTION,
      /*
       * Only subjects the page itself claims. It is a statement of what this
       * person writes and builds about, not a keyword list — anything here
       * that the page does not back up is a claim waiting to be contradicted.
       */
      knowsAbout: [
        "Magic: The Gathering",
        "Commander",
        "Software development",
        "Games writing",
      ],
      sameAs: [
        ...socials.map((s) => s.href),
        archive.screenhype.href,
        archive.informTheGamers.href,
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Cardboard Cultist",
      description: DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": PROFILE_ID,
      url: SITE_URL,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      dateModified: CONTENT_UPDATED,
    },
    ...Object.values(tools).map((tool) => ({
      "@type": "WebApplication",
      "@id": `${tool.href}/#app`,
      name: tool.label,
      url: tool.href,
      description: tool.description,
      applicationCategory: tool.category,
      author: { "@id": PERSON_ID },
    })),
  ],
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      // Matches og:locale and the graph's inLanguage; all three said "en" or
      // "en_GB" independently of each other before.
      lang="en-GB"
      className={`${archivo.variable} ${spectral.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {children}
        <MotionFallback />
        <OutboundTracking />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
