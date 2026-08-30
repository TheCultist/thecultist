/**
 * The site's own identity, in one place.
 *
 * The origin used to be written out separately in the layout metadata, the
 * sitemap, robots and the structured data. Nothing forced those four to agree,
 * which is exactly how they came to name a hostname that only redirects. Any
 * code that needs to state where this site lives imports it from here.
 *
 * This must match the hostname Vercel serves, not one it redirects from. The
 * apex is primary; www redirects to it. See DEPLOY.md § 3.
 */
export const SITE_URL = "https://thecultist.it";

/**
 * The last date the page's *content* changed — copy, links or reel frames.
 * Bump it when that happens, and only then.
 *
 * This was `new Date()`, so a CSS-only deploy still announced that the content
 * had changed. Search engines discount a lastmod they find unreliable, and a
 * one-page sitemap has nothing to gain by spending that credibility. A date
 * that moves rarely and honestly is worth more than a fresh one that lies.
 */
export const CONTENT_UPDATED = "2026-08-23";

/**
 * Stable schema.org node identifiers.
 *
 * Fragment `@id`s are what let the graph's nodes reference one entity rather
 * than restating it — the site, the profile page and both tools all point at
 * the same person through `PERSON_ID`. Without them each node is an island and
 * nothing connects the three domains this person owns.
 */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_ID = `${SITE_URL}/#profile`;
