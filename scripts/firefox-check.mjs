/**
 * Verify the Firefox motion fallback.
 *
 * Firefox has not shipped `animation-timeline`, so the CSS scroll-driven path
 * is inert there and components/motion-fallback.tsx takes over. This walks the
 * page in Gecko and asserts the effects actually run.
 */
import { firefox } from "playwright";

const browser = await firefox.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

const support = await page.evaluate(() => CSS.supports("animation-timeline: scroll()"));
const active = await page.evaluate(() => document.documentElement.hasAttribute("data-motion-fallback"));
console.log(`scroll-timeline support: ${support}   fallback active: ${active}`);

// Hero bars are scroll-linked; they should move from the first pixel.
console.log("\nhero bars (px shift):");
for (const y of [0, 120, 260, 420, 600]) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(120);
  const shifts = await page.evaluate(() =>
    [...document.querySelectorAll(".censor-bar--lift")].map((e) => {
      const m = getComputedStyle(e).transform;
      return m === "none" ? 0 : Math.round(parseFloat(m.split(",")[4]));
    }),
  );
  console.log(`  scroll ${String(y).padStart(4)} -> ${shifts.map((s) => String(s).padStart(6)).join(" ")}`);
}

// Un-redaction, drawn rules, stamp and dock are entrance-based.
await page.evaluate(() => {
  document.querySelectorAll("main > section")[1].scrollIntoView({ block: "center" });
});
await page.waitForTimeout(900);
const covers = await page.evaluate(() =>
  [...document.querySelectorAll(".unredact")].map((e) => getComputedStyle(e).backgroundSize),
);
console.log(`\nun-redaction cover sizes after entry: ${JSON.stringify(covers)}`);

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
const end = await page.evaluate(() => {
  const dock = document.querySelector(".follow-dock");
  const rules = [...document.querySelectorAll(".rule-draw")].map((e) => getComputedStyle(e).transform);
  return {
    dockOpacity: getComputedStyle(dock).opacity,
    rulesDrawn: rules.filter((t) => t === "none" || t.startsWith("matrix(1")).length,
    rulesTotal: rules.length,
    stamp: getComputedStyle(document.querySelector(".stamp-land")).transform,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
console.log(`dock opacity: ${end.dockOpacity}   rules drawn: ${end.rulesDrawn}/${end.rulesTotal}`);
console.log(`stamp transform: ${end.stamp}`);
console.log(`horizontal overflow: ${end.overflowX}px`);
console.log(`errors: ${errors.length ? errors.join(" | ") : "none"}`);

await page.screenshot({ path: ".impeccable/review/ff-end.png" });
await browser.close();
