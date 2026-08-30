import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The named AI agents are declarative, not functional.
 *
 * The wildcard rule below already permits every one of them — each was
 * verified to be receiving the full page — so these groups change no crawler's
 * behaviour today. They are here to state consent explicitly, so that it reads
 * as a decision rather than as something nobody got round to restricting, and
 * so removing one later is a deliberate edit rather than a new rule.
 *
 * Google-Extended and Applebot-Extended are training-corpus tokens only;
 * neither affects search ranking in either direction.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
];

/**
 * Everything is crawlable. There is one page, and nothing on it is private.
 *
 * No `host` field. It is a Yandex-only directive that Google and Bing ignore,
 * and while the apex and www both answer it could only ever add a fifth voice
 * to a question the canonical tag already answers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
