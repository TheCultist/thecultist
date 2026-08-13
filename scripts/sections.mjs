/**
 * Capture each section scrolled into view, at desktop and mobile.
 *
 * fullPage screenshots are useless for this page: they resize the viewport, so
 * every scroll-timeline evaluates at its before-state — covers appear stuck,
 * drawn rules appear missing. These captures show what a visitor actually sees.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = ".impeccable/review";
mkdirSync(outDir, { recursive: true });

const sections = ["hero", "positioning", "tools", "archive", "close"];
const browser = await chromium.launch();

for (const [name, width, height, dsf] of [
  ["desktop", 1440, 900, 1],
  ["mobile", 390, 844, 2],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: dsf,
    isMobile: name === "mobile",
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  for (let i = 0; i < sections.length; i++) {
    await page.evaluate((n) => {
      const el = document.querySelectorAll("main > section")[n];
      if (n === 0) window.scrollTo(0, 0);
      else el.scrollIntoView({ block: "center", behavior: "instant" });
    }, i);
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${outDir}/${name}-${i + 1}-${sections[i]}.png` });
  }

  console.log(`${name}: captured ${sections.length} sections`);
  await page.close();
}

await browser.close();
console.log(`wrote to ${outDir}`);
