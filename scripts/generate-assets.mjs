// Generates the OG image and favicon set from the brand SVGs in public/brand.
// The SVGs are rendered as-is (never redrawn) — see public/brand/README.md.
// Run: npm run assets
import { readFile, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";

const NAVY_DEEP = "#141833"; // background baked into cogeto-final-logo-dark.svg

// og.png — 1200×630, dark logo variant centered on its own navy-deep ground.
const logoDark = await sharp("public/brand/cogeto-final-logo-dark.svg", { density: 300 })
  .resize({ width: 840 })
  .png()
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: NAVY_DEEP },
})
  .composite([{ input: logoDark, gravity: "centre" }])
  .png()
  .toFile("public/og.png");

// Favicons — SVG passthrough for modern browsers, PNG/ICO renders for the rest.
await copyFile("public/brand/cogeto-final-favicon.svg", "app/icon.svg");

await sharp("public/brand/cogeto-final-icon-tile.svg", { density: 300 })
  .resize(180, 180)
  .png()
  .toFile("app/apple-icon.png");

// favicon.ico: an ICO container wrapping a single 32×32 PNG (valid since Vista).
const png32 = await sharp("public/brand/cogeto-final-favicon.svg", { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();

const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
await writeFile("app/favicon.ico", Buffer.concat([header, png32]));

console.log("Generated: public/og.png, app/icon.svg, app/apple-icon.png, app/favicon.ico");

// Case study OG images — 1200×630, dark logo top-left, page title as SVG text.
// Text is site chrome (not brand artwork); the logo itself stays verbatim.
const CASE_OG = [
  ["case-medical-devices", "Technical file consistency", "for medical devices"],
  ["case-defense", "Air gapped AI", "for defense documentation"],
  ["case-automotive-paint", "Paint shop process knowledge,", "kept and verified"],
  ["case-engineering-teams", "An engineering knowledge base", "that proves itself"],
];

const logoSmall = await sharp("public/brand/cogeto-final-logo-dark.svg", { density: 300 })
  .resize({ width: 360 })
  .png()
  .toBuffer();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
for (const [name, line1, line2] of CASE_OG) {
  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="600" fill="#ffffff">${esc(line1)}</text>
      <text x="80" y="480" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="600" fill="#21C29A">${esc(line2)}</text>
      <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#9aa0c3">cogeto.eu, a case study</text>
    </svg>`,
  );
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: NAVY_DEEP },
  })
    .composite([
      { input: logoSmall, top: 80, left: 80 },
      { input: text, top: 0, left: 0 },
    ])
    .png()
    .toFile(`public/og/${name}.png`);
}
console.log("Generated: public/og/case-*.png");
