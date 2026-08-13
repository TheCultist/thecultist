/**
 * The hero's mark is positioned out of flow while the content block is
 * vertically centred, so short viewports can drive them into each other.
 * Reports the gap at a spread of heights; negative means overlap.
 */
import { chromium } from "playwright";

const sizes = [
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

  const gap = await page.evaluate(() => {
    const mark = document.querySelector("section img");
    const h1 = document.querySelector("h1");
    const m = mark.getBoundingClientRect();
    const r = document.createRange();
    r.selectNodeContents(h1.firstChild);
    const glyph = r.getBoundingClientRect();
    const fs = parseFloat(getComputedStyle(h1).fontSize);
    // Cap top sits ~0.048em below the range top for Archivo.
    return Math.round(glyph.top + 0.048 * fs - m.bottom);
  });

  console.log(
    `${String(width).padStart(4)}x${String(height).padEnd(5)} gap=${String(gap).padStart(5)}px ${gap < 24 ? (gap < 0 ? "  <-- OVERLAP" : "  <-- tight") : ""}`,
  );
  await page.close();
}
await browser.close();
