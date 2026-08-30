/**
 * Builds app/favicon.ico from app/icon.png.
 *
 * The committed favicon was a single 1024x1024 frame weighing 1.27MB — about
 * sixteen times the page's own HTML, and declared in the head as
 * `sizes="1024x1024"`, so a browser choosing the largest icon fetched all of
 * it. Nothing renders a favicon above 48px, and the genuinely large icon cases
 * are already covered by icon.png and apple-icon.png, which Next serves
 * separately.
 *
 * ICO is a container format, and every browser since IE11 reads PNG frames
 * inside one. So this writes the directory structure by hand around three
 * sharp-encoded PNGs rather than adding an encoder dependency for what amounts
 * to 54 bytes of header.
 *
 *   node scripts/favicon.mjs
 */
import { readFile, writeFile } from "node:fs/promises";

import sharp from "sharp";

const SOURCE = "app/icon.png";
const OUT = "app/favicon.ico";
const SIZES = [16, 32, 48];

const HEADER_BYTES = 6;
const ENTRY_BYTES = 16;

const source = await readFile(SOURCE);

const frames = await Promise.all(
  SIZES.map(async (size) => ({
    size,
    /*
     * Forced to 8-bit RGBA. sharp will happily emit a palette or an alpha-less
     * PNG for an image this small and flat, and Turbopack's ICO decoder
     * rejects both — it reads frames as RGBA only, and the build fails with
     * "The PNG is not in RGBA format".
     */
    png: await sharp(source)
      .resize(size, size, { fit: "contain" })
      .toColorspace("srgb")
      .ensureAlpha()
      .png({ compressionLevel: 9, palette: false })
      .toBuffer(),
  })),
);

const header = Buffer.alloc(HEADER_BYTES);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);

// Image data begins after the header and one directory entry per frame.
let offset = HEADER_BYTES + ENTRY_BYTES * frames.length;

const entries = frames.map(({ size, png }) => {
  const entry = Buffer.alloc(ENTRY_BYTES);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});

const ico = Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
await writeFile(OUT, ico);

console.log(`${OUT}  ${SIZES.join("/")}px  ${(ico.length / 1024).toFixed(1)}KB`);
