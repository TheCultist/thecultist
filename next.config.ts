import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * AVIF first, WebP as the fallback. The optimizer only emitted WebP by
     * default, and the payload here is six 9:16 photographic reel frames plus
     * the ink band — the case AVIF is best at. Browsers that cannot take it
     * still get the WebP, so this costs nothing but build time.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
