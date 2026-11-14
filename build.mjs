// Merge every batch into the set.
//
//   node build.mjs                 → dist/svg/<unified>.svg, dist/extra/<key>.svg, coverage per category
//   node build.mjs --sheets objects   → also dist/sheets/objects-01.png … (keyboard pages, 40 icons each)
//   node build.mjs --sheets all       → pages for every category that has icons, plus the school set
//   node build.mjs --overview         → dist/sheets/all.png, every emoji in one picture
//   node build.mjs --sprites          → dist/sprites/<group>.webp (one sheet per group, 80 px cells)
//                                       + dist/index.json (groups, names, keywords, sheet layout)
//   node build.mjs --docs             → docs/overview.jpg, docs/keyboard.jpg (shown in the README)
//   node build.mjs --install <dir>    → an app's copy of the set in <dir>: <code points>.svg per
//                                       emoji, sprites/<group>.webp, index.json. Stale files there
//                                       are removed.
//
// An icon with an ERROR is left out and listed. When two batches draw the same emoji the first file
// (alphabetical) wins and the clash is listed. Redraw files (00-*) win silently, the newest first.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { FILTERS, fileSvg, inlineSvg } from "./kit.mjs";
import { ROOT, inspect, launch, loadBatch } from "./lib/common.mjs";
import { TAB, keyboardHtml } from "./lib/keyboard.mjs";

const args = process.argv.slice(2);
const sheetsAt = args.indexOf("--sheets");
const sheets = sheetsAt >= 0 ? (args[sheetsAt + 1] ?? "all") : null;

const set = new Map();
const problems = [];
const perFile = [];
// redraw files (00-*) go first so they win; among them the latest (highest number) wins
const redrawNo = (f) => Number(f.match(/-(\d+)\.mjs$/)?.[1] ?? 1);
const batchFiles = readdirSync(join(ROOT, "batches"))
  .filter((f) => f.endsWith(".mjs"))
  .sort((a, b) => {
    const ra = a.startsWith("00-");
    if (ra !== b.startsWith("00-")) return ra ? -1 : 1;
    return ra ? redrawNo(b) - redrawNo(a) : a < b ? -1 : 1;
  });
for (const f of batchFiles) {
  let icons;
  try {
    icons = await loadBatch(join(ROOT, "batches", f));
  } catch (e) {
    problems.push(`${f}: cannot load (${e.message.split("\n")[0]})`);
    continue;
  }
  const seen = new Set();
  let ok = 0;
  for (const ic of icons) {
    const it = inspect(ic, seen);
    if (it.errors.length) {
      problems.push(`${f} ${it.id} ${it.n}: ${it.errors.join("; ")}`);
      continue;
    }
    if (set.has(it.id)) {
      // 00-* files are deliberate redraws; any other clash is a mistake
      if (!set.get(it.id).file.startsWith("00-")) problems.push(`${f} ${it.id} ${it.n}: already drawn in ${set.get(it.id).file}`);
      continue;
    }
    set.set(it.id, { ...it, file: f, order: set.size });
    ok++;
  }
  perFile.push([f, ok, icons.length]);
}

for (const d of ["dist/svg", "dist/extra"]) {
  rmSync(join(ROOT, d), { recursive: true, force: true });
  mkdirSync(join(ROOT, d), { recursive: true });
}
for (const it of set.values()) writeFileSync(join(ROOT, it.u ? "dist/svg" : "dist/extra", `${it.id}.svg`), fileSvg(it.r, it.n));

console.log(perFile.map(([f, ok, n]) => `${f.padEnd(24)} ${ok}/${n}`).join("\n"));
const cats = readdirSync(join(ROOT, "data")).filter((f) => f.endsWith(".json")).map((f) => basename(f, ".json"));
const lists = Object.fromEntries(cats.map((c) => [c, JSON.parse(readFileSync(join(ROOT, "data", `${c}.json`), "utf8"))]));
console.log("\ncoverage");
for (const c of cats) {
  const miss = lists[c].filter((e) => !set.has(e.u));
  console.log(`  ${c.padEnd(18)} ${lists[c].length - miss.length}/${lists[c].length}${miss.length && miss.length <= 24 ? `  missing: ${miss.map((m) => m.e).join(" ")}` : ""}`);
}
console.log(`  total ${[...set.values()].filter((i) => i.u).length} emoji + ${[...set.values()].filter((i) => !i.u).length} extras`);
if (problems.length) console.log(`\nproblems (${problems.length})\n  ${problems.join("\n  ")}`);

if (sheets) {
  const groups = [];
  if (sheets === "all" || sheets === "school") groups.push(["school", [...set.values()].filter((i) => i.file === "school.mjs")]);
  for (const c of cats) if (sheets === "all" || sheets === c) groups.push([c, lists[c].map((e) => set.get(e.u)).filter(Boolean)]);
  mkdirSync(join(ROOT, "dist/sheets"), { recursive: true });
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1295, height: 1214 }, deviceScaleFactor: 2 });
  for (const [name, items] of groups) {
    for (const f of existsSync(join(ROOT, "dist/sheets")) ? readdirSync(join(ROOT, "dist/sheets")) : []) {
      if (f.startsWith(`${name}-`)) rmSync(join(ROOT, "dist/sheets", f));
    }
    for (let p = 0; p * 40 < items.length; p++) {
      await page.setContent(keyboardHtml(items.slice(p * 40, p * 40 + 40).map((i) => inlineSvg(i.r)), TAB[name] ?? "cap"));
      await page.waitForTimeout(120);
      const out = join(ROOT, "dist/sheets", `${name}-${String(p + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: out });
      console.log(`sheet ${out}`);
    }
  }
  await browser.close();
}

// picker order of the categories, with the names an app shows
const GROUPS = {
  smileys: "Smileys",
  animals_nature: "Animals & nature",
  food_drink: "Food & drink",
  activities: "Activities",
  travel_places: "Travel & places",
  objects: "Objects",
  symbols: "Symbols",
};
/** Side of one cell in a sprite sheet, in pixels (a 40 px picker cell at 2×). */
const CELL = 80;

/** The drawn emoji per group, in picker order: [{ id, label, cols, stickers: [{ u, n, k, it }] }]. */
function catalog() {
  return Object.keys(GROUPS)
    .filter((c) => lists[c])
    .map((c) => {
      const stickers = lists[c].filter((e) => set.has(e.u)).map((e) => ({ u: e.u, n: e.n, k: e.k ?? "", it: set.get(e.u) }));
      return { id: c.replace(/_/g, "-"), label: GROUPS[c], cols: Math.ceil(Math.sqrt(stickers.length)), stickers };
    })
    .filter((g) => g.stickers.length);
}

/** index.json: what a picker needs. One sticker per line: [code points, name, keywords]. */
function indexJson(groups) {
  const body = groups
    .map(
      (g) =>
        `    {\n      "id": ${JSON.stringify(g.id)},\n      "label": ${JSON.stringify(g.label)},\n      "sprite": "sprites/${g.id}.webp",\n      "cols": ${g.cols},\n      "stickers": [\n${g.stickers
          .map((s) => `        [${[s.u, s.n, s.k].map((v) => JSON.stringify(v)).join(", ")}]`)
          .join(",\n")}\n      ]\n    }`,
    )
    .join(",\n");
  return `{\n  "cell": ${CELL},\n  "groups": [\n${body}\n  ]\n}\n`;
}

/**
 * One WebP sheet per group, stickers in index order, `cols` per row. A picker shows hundreds of
 * stickers at once; as SVG each one is painted through the filters, as a sprite cell it is free.
 */
async function writeSprites(groups, dir) {
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".webp")) rmSync(join(dir, f));
  const browser = await launch();
  const page = await browser.newPage();
  await page.setContent("<!doctype html><html><body></body></html>");
  let bytes = 0;
  for (const g of groups) {
    const url = await page.evaluate(
      async ({ svgs, cols, cell }) => {
        const c = document.createElement("canvas");
        c.width = cols * cell;
        c.height = Math.ceil(svgs.length / cols) * cell;
        const ctx = c.getContext("2d");
        for (let i = 0; i < svgs.length; i++) {
          const img = new Image();
          img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgs[i])}`;
          await img.decode();
          ctx.drawImage(img, (i % cols) * cell, Math.floor(i / cols) * cell, cell, cell);
        }
        return c.toDataURL("image/webp", 0.9);
      },
      { svgs: g.stickers.map((s) => fileSvg(s.it.r, s.n, CELL)), cols: g.cols, cell: CELL },
    );
    const buf = Buffer.from(url.slice(url.indexOf(",") + 1), "base64");
    bytes += buf.length;
    writeFileSync(join(dir, `${g.id}.webp`), buf);
  }
  await browser.close();
  return bytes;
}

if (args.includes("--sprites")) {
  const groups = catalog();
  const bytes = await writeSprites(groups, join(ROOT, "dist/sprites"));
  writeFileSync(join(ROOT, "dist/index.json"), indexJson(groups));
  console.log(`sprites ${groups.length} sheets, ${(bytes / 1024).toFixed(0)} KB → dist/sprites, dist/index.json`);
}

const installAt = args.indexOf("--install");
if (installAt >= 0) {
  const dir = resolve(args[installAt + 1] ?? "");
  if (!args[installAt + 1] || !existsSync(resolve(dir, ".."))) {
    console.error("usage: node build.mjs --install <folder of the app that uses the set>");
    process.exit(2);
  }
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".svg")) rmSync(join(dir, f));
  const groups = catalog();
  let n = 0;
  for (const g of groups) {
    for (const s of g.stickers) {
      writeFileSync(join(dir, `${s.u}.svg`), fileSvg(s.it.r, s.n));
      n++;
    }
  }
  const bytes = await writeSprites(groups, join(dir, "sprites"));
  writeFileSync(join(dir, "index.json"), indexJson(groups));
  console.log(`installed ${n} stickers + ${groups.length} sprite sheets (${(bytes / 1024).toFixed(0)} KB) → ${dir}`);
}

/** Every emoji in one picture, category after category. */
async function overview(file, { cell, scale, type }) {
  const all = catalog().flatMap((g) => g.stickers.map((s) => s.it));
  const cols = 36;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#1b1b1a}
.g{display:grid;grid-template-columns:repeat(${cols},${cell}px);padding:14px}.g svg{width:${cell - 10}px;height:${cell - 10}px;margin:5px;overflow:visible}</style></head>
<body style="width:${cols * cell + 28}px"><svg width="0" height="0" style="position:absolute"><defs>${FILTERS}</defs></svg><div class="g">${all.map((i) => inlineSvg(i.r)).join("")}</div></body></html>`;
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: cols * cell + 28, height: 800 }, deviceScaleFactor: scale });
  await page.setContent(html);
  await page.waitForTimeout(500);
  await page.screenshot({ path: file, fullPage: true, type, ...(type === "jpeg" ? { quality: 86 } : {}) });
  await browser.close();
  console.log(`overview ${all.length} icons → ${file}`);
}

if (args.includes("--overview")) {
  mkdirSync(join(ROOT, "dist/sheets"), { recursive: true });
  await overview(join(ROOT, "dist/sheets", "all.png"), { cell: 64, scale: 2, type: "png" });
}

// the pictures the README shows
if (args.includes("--docs")) {
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  await overview(join(ROOT, "docs", "overview.jpg"), { cell: 48, scale: 1, type: "jpeg" });
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1295, height: 1214 }, deviceScaleFactor: 1 });
  const pick = (id, from) => catalog().find((g) => g.id === id)?.stickers.slice(from, from + 8) ?? [];
  // one row from each of five groups, so the page shows the range of the set
  const rows = [pick("smileys", 0), pick("animals-nature", 0), pick("food-drink", 0), pick("travel-places", 56), pick("objects", 96)].flat();
  await page.setContent(keyboardHtml(rows.map((s) => inlineSvg(s.it.r)), "smile"));
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(ROOT, "docs", "keyboard.jpg"), type: "jpeg", quality: 88 });
  await browser.close();
  console.log("docs/keyboard.jpg");
}
