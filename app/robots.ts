import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://thecultist.it/sitemap.xml",
    host: "https://thecultist.it",
  };
}
