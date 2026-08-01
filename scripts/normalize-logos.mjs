// Normalize client/partner logos so they carry equal visual weight.
//
// Source logos arrive with arbitrary transparent padding, sizes, and aspect
// ratios. This script trims the transparent border, then scales each mark to
// a common geometric-mean size (so wide wordmarks and square emblems look
// equally "big") and centers it on a uniform 480x240 transparent canvas.
// Overwrites the PNGs in public/clients-partners/ in place; run it after
// dropping in a new logo:  node scripts/normalize-logos.mjs
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "clients-partners");
const CANVAS_W = 480;
const CANVAS_H = 240;
const MAX_W = 440; // hard bounds inside the canvas
const MAX_H = 200;
const TARGET_GEOMEAN = 150; // sqrt(w*h) every logo aims for

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const full = path.join(DIR, file);
  // Trim transparent (and near-white) borders around the actual mark.
  const trimmed = await sharp(full).trim({ threshold: 10 }).png().toBuffer();
  const { width: w, height: h } = await sharp(trimmed).metadata();

  const scale = Math.min(TARGET_GEOMEAN / Math.sqrt(w * h), MAX_W / w, MAX_H / h);
  const outW = Math.max(1, Math.round(w * scale));
  const outH = Math.max(1, Math.round(h * scale));

  const resized = await sharp(trimmed)
    .resize(outW, outH, { fit: "fill" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(full + ".tmp")
    .then(async () => {
      const { rename } = await import("node:fs/promises");
      await rename(full + ".tmp", full);
    });

  console.log(`${file}: trimmed ${w}x${h} -> ${outW}x${outH} on ${CANVAS_W}x${CANVAS_H}`);
}
