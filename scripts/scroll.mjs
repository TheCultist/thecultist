/**
 * Capture a scroll-driven section at several scroll positions, and report the
 * computed state of its un-redaction bars.
 *
 * The critical check is the resting state: once a line is fully in view its
 * cover must have retracted to scaleX(0). A cover stuck at scale 1 is content
 * hidden behind a permanent blindfold.
 *
 *   node scripts/scroll.mjs [url] [selector]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const selector = process.argv[3] ?? "section:nth-of-type(2)";
const outDir = ".impeccable/review";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate((sel) => {
    document.querySelector(sel).scrollIntoView({ block: "center", behavior: "instant" });
  }, selector);
  await page.waitForTimeout(500);

  await page.screenshot({ path: `${outDir}/section2-${name}.png` });

  const covers = await page.evaluate((sel) => {
    const lines = [...document.querySelectorAll(`${sel} .unredact`)];
    return lines.map((el) => {
      const after = getComputedStyle(el, "::after");
      const text = el.getBoundingClientRect();
      return {
        line: el.textContent.slice(0, 22),
        transform: after.transform,
        visible: text.top < window.innerHeight && text.bottom > 0,
      };
    });
  }, selector);

  console.log(`\n${name} ${width}x${height} — section centred`);
  for (const c of covers) {
    console.log(`  "${c.line}"  cover=${c.transform}  inView=${c.visible}`);
  }
  await page.close();
}

await browser.close();
console.log(`\nwrote to ${outDir}`);
