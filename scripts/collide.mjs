/**
 * The hero's ink band is absolutely positioned behind the content, so it is
 * meant to overlap the wordmark — long drips running past it is the effect.
 * What must NOT happen is the wordmark colliding with the band's *dense* ink at
 * the top, where drips are thick and continuous.
 *
 * 75% of the drips end by y=300 of the 790px source, so the dense zone is the
 * top 38% of the band's rendered height. This reports the wordmark's clearance
 * below that line; negative means the type is sitting in the heavy ink.
 */
import { chromium } from "playwright";

const DENSE_FRACTION = 300 / 790;

const sizes = [
  // Past the 1728px measure the band stops widening while vw padding does not,
  // so the widest viewport is the one that catches runaway clearance.
  [2560, 1440],
  [1920, 1080],
  [1920, 898],
  [1440, 900],
  [1440, 760],
  [1280, 700],
  [390, 844],
  [390, 667],
];

const browser = await chromium.launch();
for (const [width, height] of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(process.argv[2] ?? "http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const gap = await page.evaluate((denseFraction) => {
    const band = document.querySelector("section img");
    const h1 = document.querySelector("h1");
    const denseBottom = band.getBoundingClientRect().height * denseFraction;

    const range = document.createRange();
    range.selectNodeContents(h1.firstChild);
    const glyph = range.getBoundingClientRect();
    const fs = parseFloat(getComputedStyle(h1).fontSize);
    // Cap top sits ~0.048em below the range top for Archivo.
    return Math.round(glyph.top + 0.048 * fs - denseBottom);
  }, DENSE_FRACTION);

  console.log(
    `${String(width).padStart(4)}x${String(height).padEnd(5)} clearance=${String(gap).padStart(5)}px ${gap < 0 ? "  <-- type in dense ink" : gap < 16 ? "  <-- tight" : ""}`,
  );
  await page.close();
}
await browser.close();
