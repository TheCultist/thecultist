/**
 * Capture desktop + mobile screenshots of a running dev server.
 *
 * Writes to .impeccable/review/, which is where Impeccable's finish reviewer
 * looks for them. That reviewer has no browser of its own, so these captures
 * are the only way it can check anything visual.
 *
 *   node scripts/shot.mjs [url] [outDir]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".impeccable/review";
mkdirSync(outDir, { recursive: true });

const targets = [
  { name: "wide", width: 1920, height: 1080, dsf: 1 },
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
  { name: "mobile", width: 390, height: 844, dsf: 2 },
];

const browser = await chromium.launch();

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.width, height: t.height },
    deviceScaleFactor: t.dsf,
    isMobile: t.name === "mobile",
    hasTouch: t.name === "mobile",
  });
  const page = await ctx.newPage();

  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  await page.screenshot({ path: `${outDir}/${t.name}.png` });
  await page.screenshot({ path: `${outDir}/${t.name}-full.png`, fullPage: true });

  // Horizontal overflow is the failure these viewports exist to catch.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const h1 = await page.evaluate(() => {
    const el = document.querySelector("h1");
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      font: cs.fontFamily.split(",")[0],
      size: cs.fontSize,
      weight: cs.fontWeight,
      stretch: cs.fontStretch,
      box: `${Math.round(r.width)}x${Math.round(r.height)}`,
    };
  });

  console.log(
    `${t.name.padEnd(8)} ${t.width}x${t.height}  h-overflow=${overflow}px  h1=${JSON.stringify(h1)}`,
  );
  if (errors.length) console.log(`  console errors: ${errors.join(" | ")}`);

  await ctx.close();
}

await browser.close();
console.log(`\nwrote to ${outDir}`);
