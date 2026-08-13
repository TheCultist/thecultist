import { chromium } from "playwright";

const browser = await chromium.launch();
const width = Number(process.argv[3] ?? 1440);
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(process.argv[2] ?? "http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const info = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const box = h1.getBoundingClientRect();
  const fs = parseFloat(getComputedStyle(h1).fontSize);

  // Real glyph bounds per line, via Range over each text node.
  const lines = [];
  for (const node of h1.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
    const r = document.createRange();
    r.selectNodeContents(node);
    const rect = r.getBoundingClientRect();
    lines.push({
      text: node.textContent.trim(),
      topEm: +((rect.top - box.top) / fs).toFixed(3),
      bottomEm: +((rect.bottom - box.top) / fs).toFixed(3),
      widthPct: +((rect.width / box.width) * 100).toFixed(1),
    });
  }

  const bars = [...document.querySelectorAll(".censor-bar")].map((b) => {
    const r = b.getBoundingClientRect();
    return {
      topEm: +((r.top - box.top) / fs).toFixed(3),
      heightEm: +(r.height / fs).toFixed(3),
      leftPct: +((r.left - box.left) / box.width * 100).toFixed(1),
      widthPct: +((r.width / box.width) * 100).toFixed(1),
      opacity: getComputedStyle(b).opacity,
      transform: getComputedStyle(b).transform,
    };
  });

  return { fontSize: fs, boxHeightEm: +(box.height / fs).toFixed(3), lines, bars };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
