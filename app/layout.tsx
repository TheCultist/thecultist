import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Spectral, JetBrains_Mono } from "next/font/google";

import { OutboundTracking } from "@/components/outbound-tracking";
import { archive, contact, socials } from "@/lib/links";

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
  metadataBase: new URL("https://thecultist.it"),
  title: "Cardboard Cultist — Magic without gatekeeping",
  description: DESCRIPTION,
  applicationName: "Cardboard Cultist",
  authors: [{ name: "Luigi Savinelli" }],
  // Apex and www both resolve; this tells search engines which one counts.
  alternates: { canonical: "/" },
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
FIRST VIEWPORT: "Cardboard Cultist" set full-width in condensed black caps. Three censor bars struck at column edges, inverting the type beneath rather than erasing it. Motto stamped on flame orange below. Three handles as the only unstruck text.
FORM: The Embargo Sheet, candidate 6 of 7, seed e2f79a43.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

/**
 * Structured data, stating only facts that are already on the page.
 *
 * `sameAs` is the part that earns its place: it tells search engines that this
 * domain and these social profiles are one identity, which is the whole job of
 * a creator hub. No ratings, no counts, no invented claims.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Luigi Savinelli",
    alternateName: "Cardboard Cultist",
    url: "https://thecultist.it",
    email: contact.href,
    description: DESCRIPTION,
    sameAs: [
      ...socials.map((s) => s.href),
      archive.screenhype.href,
      archive.informTheGamers.href,
    ],
  },
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spectral.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {children}
        <OutboundTracking />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
