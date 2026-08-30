import type { MetadataRoute } from "next";

import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * One page, one entry.
 *
 * `changeFrequency` and `priority` are gone rather than set: Google has
 * ignored both for years, and on a single-URL sitemap a priority of 1 says
 * nothing at all — there is nothing to be higher priority than.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_UPDATED,
    },
  ];
}
