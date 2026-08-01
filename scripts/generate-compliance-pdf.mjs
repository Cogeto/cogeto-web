/**
 * Generates public/documents/cogeto-compliance-onepager.pdf from the single
 * content source lib/compliance-content.json, the same file the /compliance
 * page renders. Page and PDF therefore cannot drift: both read this JSON.
 *
 * Self-contained: a tiny PDF writer using the base-14 fonts (Helvetica,
 * Helvetica-Bold, Helvetica-Oblique, Courier), so there are no dependencies and
 * nothing to embed. Deterministic: no clock or randomness is used; the document
 * date comes from the content file.
 *
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const content = JSON.parse(
  readFileSync(path.join(ROOT, "lib", "compliance-content.json"), "utf8"),
);

// --- Page geometry (A4) -----------------------------------------------------
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = { top: 64, bottom: 60, left: 58, right: 58 };
const CONTENT_W = PAGE_W - M.left - M.right;

// --- Brand colors (0..1 rgb) ------------------------------------------------
const NAVY = "0.110 0.129 0.314"; // #1c2150
const NAVY_DEEP = "0.078 0.094 0.200"; // #141833
const TEAL = "0.129 0.761 0.604"; // #21c29a
const TEAL_INK = "0.051 0.490 0.380"; // #0d7d61
const BODY = "0.200 0.220 0.340";
const MUTED = "0.478 0.502 0.678"; // #7a80ad
const WHITEISH = "0.92 0.94 0.98";

// --- Base-14 font metrics (widths per 1000 em, ASCII 32..126) ---------------
// prettier-ignore
const HELV = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
// prettier-ignore
const HELVB = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];

function charW(code, font, size) {
  if (font === "F4") return size * 0.6; // Courier is monospace, 600/1000
  const table = font === "F2" ? HELVB : HELV; // oblique shares regular widths
  const w = code >= 32 && code <= 126 ? table[code - 32] : 556;
  return (size * w) / 1000;
}
function textW(str, font, size) {
  let w = 0;
  for (let i = 0; i < str.length; i++) w += charW(str.charCodeAt(i), font, size);
  return w;
}

function esc(str) {
  return str.replace(/[\\()]/g, (c) => "\\" + c);
}

// --- Document builder -------------------------------------------------------
const pages = []; // each: array of content-stream operator strings
let ops = [];
let y = PAGE_H - M.top;

function pushPage() {
  if (ops.length) pages.push(ops);
  ops = [];
  y = PAGE_H - M.top;
}
function ensure(h) {
  if (y - h < M.bottom) pushPage();
}
function draw(x, baseline, str, font, color, size) {
  ops.push(
    `${color} rg BT /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(
      2,
    )} Tm (${esc(str)}) Tj ET`,
  );
}
function rect(x, yBottom, w, h, color) {
  ops.push(`${color} rg ${x.toFixed(2)} ${yBottom.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
}

function wrap(str, font, size, maxW) {
  const words = str.split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const word of words) {
    const test = cur ? cur + " " + word : word;
    if (textW(test, font, size) <= maxW || !cur) cur = test;
    else {
      lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

function paragraph(str, opts = {}) {
  const {
    font = "F1",
    size = 9.7,
    color = BODY,
    x = M.left,
    maxW = CONTENT_W,
    lh = null,
    gapAfter = 7,
    indent = 0,
  } = opts;
  const lineH = lh || size * 1.42;
  for (const ln of wrap(str, font, size, maxW - indent)) {
    ensure(lineH);
    draw(x + indent, y - size * 0.82, ln, font, color, size);
    y -= lineH;
  }
  y -= gapAfter;
}

/** Flow mixed-font runs (for bold label + regular text), wrapping at maxW. */
function flow(runs, opts = {}) {
  const { x = M.left, maxW = CONTENT_W, size = 9.7, lh = null, gapAfter = 4, hanging = 0 } = opts;
  const lineH = lh || size * 1.42;
  const tokens = [];
  for (const run of runs) {
    const parts = run.text.split(" ");
    parts.forEach((word, i) => {
      if (word) tokens.push({ word, font: run.font, color: run.color });
      if (i < parts.length - 1) tokens.push({ space: true, font: run.font });
    });
  }
  ensure(lineH);
  let cx = x;
  for (const t of tokens) {
    if (t.space) {
      cx += charW(32, t.font, size);
      continue;
    }
    const w = textW(t.word, t.font, size);
    if (cx + w > x + maxW && cx > x + hanging) {
      y -= lineH;
      ensure(lineH);
      cx = x + hanging;
    }
    draw(cx, y - size * 0.82, t.word, t.font, t.color, size);
    cx += w;
  }
  y -= lineH + gapAfter;
}

function bulletItem(label, text) {
  const size = 9.7;
  const lineH = size * 1.42;
  ensure(lineH);
  const startBaseline = y - size * 0.82;
  rect(M.left + 3, startBaseline + 1.4, 2.6, 2.6, TEAL);
  flow(
    [
      { text: label + ":", font: "F2", color: NAVY },
      { text: " " + text, font: "F1", color: BODY },
    ],
    { x: M.left + 14, maxW: CONTENT_W - 14, size, gapAfter: 3, hanging: 0 },
  );
}

function noteBox(text) {
  const size = 9;
  const lineH = size * 1.4;
  const pad = 9;
  const runs = wrap("Honest limitation. " + text, "F1", size, CONTENT_W - 2 * pad - 6);
  const h = runs.length * lineH + 2 * pad;
  ensure(h + 6);
  const top = y;
  rect(M.left, top - h, CONTENT_W, h, "0.960 0.965 0.984"); // surface
  rect(M.left, top - h, 2.4, h, TEAL); // left accent
  let ty = top - pad;
  runs.forEach((ln, i) => {
    // Bold the leading "Honest limitation." on the first line only.
    if (i === 0 && ln.startsWith("Honest limitation.")) {
      const lead = "Honest limitation.";
      draw(M.left + pad + 4, ty - size * 0.82, lead, "F2", NAVY, size);
      const rest = ln.slice(lead.length);
      draw(
        M.left + pad + 4 + textW(lead, "F2", size),
        ty - size * 0.82,
        rest,
        "F1",
        BODY,
        size,
      );
    } else {
      draw(M.left + pad + 4, ty - size * 0.82, ln, "F1", BODY, size);
    }
    ty -= lineH;
  });
  y = top - h - 9;
}

function receiptBox(caption, obj, note) {
  // Caption
  ensure(16);
  draw(M.left, y - 9 * 0.82, caption, "F2", NAVY, 9.5);
  y -= 15;

  const jsonLines = JSON.stringify(obj, null, 2).split("\n");
  const size = 7.6;
  const lineH = size * 1.5;
  const pad = 10;
  const h = jsonLines.length * lineH + 2 * pad;
  ensure(h + 4);
  const top = y;
  rect(M.left, top - h, CONTENT_W, h, NAVY_DEEP);
  let ty = top - pad;
  for (const ln of jsonLines) {
    draw(M.left + pad, ty - size * 0.82, ln, "F4", WHITEISH, size);
    ty -= lineH;
  }
  y = top - h - 8;

  for (const ln of wrap(note, "F1", 8.6, CONTENT_W)) {
    ensure(8.6 * 1.4);
    draw(M.left, y - 8.6 * 0.82, ln, "F3", MUTED, 8.6);
    y -= 8.6 * 1.4;
  }
  y -= 8;
}

function heading(text) {
  const size = 13;
  ensure(size * 1.5 + 6);
  y -= 6; // extra space before a section
  draw(M.left, y - size * 0.82, text, "F2", NAVY, size);
  y -= size * 1.5;
}

function tag(text) {
  const size = 7.6;
  ensure(size * 1.6);
  draw(M.left, y - size * 0.82, text, "F3", MUTED, size);
  y -= size * 1.9;
}

// --- Compose the document ---------------------------------------------------

// Title block
draw(M.left, y - 20 * 0.82, "Cogeto", "F2", NAVY, 20);
y -= 26;
for (const ln of wrap(content.subtitle, "F2", 13, CONTENT_W)) {
  draw(M.left, y - 13 * 0.82, ln, "F2", NAVY, 13);
  y -= 13 * 1.35;
}
y -= 2;
draw(M.left, y - 9 * 0.82, `${content.title} · Last updated ${content.updated} · cogeto.eu`, "F1", MUTED, 9);
y -= 16;
rect(M.left, y, CONTENT_W, 2, TEAL); // brand rule
y -= 16;

paragraph(content.intro, { size: 9.7, gapAfter: 12 });

for (const section of content.sections) {
  heading(section.heading);
  if (section.organisational) tag("Organisational or contractual control");
  for (const p of section.body) paragraph(p);
  if (section.points) {
    for (const pt of section.points) bulletItem(pt.label, pt.text);
    y -= 3;
  }
  if (section.note) noteBox(section.note);

  if (section.id === "deletion") {
    receiptBox(content.receipt.caption, content.receipt.value, content.receipt.note);
  }
  if (section.id === "export") {
    paragraph(`Published schema: ${content.links.passportSchema}`, {
      font: "F1",
      size: 8.8,
      color: TEAL_INK,
      gapAfter: 6,
    });
  }
  if (section.id === "regulatory") {
    paragraph(`Live trust score: cogeto.eu/trust`, {
      font: "F1",
      size: 8.8,
      color: TEAL_INK,
      gapAfter: 6,
    });
  }
  y -= 6;
}

// Closing
y -= 4;
paragraph(content.closing, { font: "F3", size: 9.5, color: NAVY, gapAfter: 6 });
paragraph(
  `Whitepaper: cogeto.eu${content.links.whitepaper}    Source: ${content.links.repo}`,
  { font: "F1", size: 8.6, color: MUTED, gapAfter: 0 },
);

pushPage();

// --- Footers (page x of N) --------------------------------------------------
const N = pages.length;
pages.forEach((pageOps, i) => {
  const fy = 40;
  pageOps.push(`${MUTED} rg ${M.left} ${fy + 12} ${CONTENT_W} 0.6 re f`);
  pageOps.push(
    `${MUTED} rg BT /F1 8 Tf 1 0 0 1 ${M.left} ${fy} Tm (Cogeto: Compliance one-pager) Tj ET`,
  );
  const right = `Page ${i + 1} of ${N}`;
  const rx = PAGE_W - M.right - textW(right, "F1", 8);
  pageOps.push(`${MUTED} rg BT /F1 8 Tf 1 0 0 1 ${rx.toFixed(2)} ${fy} Tm (${esc(right)}) Tj ET`);
});

// --- Serialize to a PDF file ------------------------------------------------
const objects = [];
function setObj(num, body) {
  objects[num] = body;
}

const CATALOG = 1;
const PAGES = 2;
const F1 = 3;
const F2 = 4;
const F3 = 5;
const F4 = 6;
const base = 7;

const pageNums = pages.map((_, i) => base + i * 2 + 1);

setObj(CATALOG, `<< /Type /Catalog /Pages ${PAGES} 0 R >>`);
setObj(
  PAGES,
  `<< /Type /Pages /Kids [${pageNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${N} >>`,
);
setObj(F1, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
setObj(F2, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
setObj(F3, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);
setObj(F4, `<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>`);

pages.forEach((pageOps, i) => {
  const contentNum = base + i * 2;
  const pageNum = base + i * 2 + 1;
  const stream = pageOps.join("\n");
  const len = Buffer.byteLength(stream, "latin1");
  setObj(contentNum, `<< /Length ${len} >>\nstream\n${stream}\nendstream`);
  setObj(
    pageNum,
    `<< /Type /Page /Parent ${PAGES} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Contents ${contentNum} 0 R /Resources << /Font << /F1 ${F1} 0 R /F2 ${F2} 0 R /F3 ${F3} 0 R /F4 ${F4} 0 R >> >> >>`,
  );
});

let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
const offsets = [];
for (let n = 1; n < objects.length; n++) {
  offsets[n] = Buffer.byteLength(pdf, "latin1");
  pdf += `${n} 0 obj\n${objects[n]}\nendobj\n`;
}
const xrefStart = Buffer.byteLength(pdf, "latin1");
const count = objects.length; // objects are 1..count-1, plus free object 0
pdf += `xref\n0 ${count}\n`;
pdf += `0000000000 65535 f \n`;
for (let n = 1; n < count; n++) {
  pdf += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${count} /Root ${CATALOG} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

const outDir = path.join(ROOT, "public", "documents");
mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "cogeto-compliance-onepager.pdf");
writeFileSync(outPath, Buffer.from(pdf, "latin1"));
console.log(
  `Wrote ${outPath} (${N} page${N === 1 ? "" : "s"}, ${(Buffer.byteLength(pdf, "latin1") / 1024).toFixed(1)} KB)`,
);
