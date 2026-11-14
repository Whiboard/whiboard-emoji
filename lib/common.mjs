// Shared by check.mjs and build.mjs: load batches, validate icons, drive the browser.
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FILTERS, emojiChar, iconId, render } from "../kit.mjs";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Headless Chromium (`bunx playwright install chromium` once). */
export async function launch() {
  const { chromium } = await import("playwright");
  return chromium.launch();
}

export async function loadBatch(file) {
  const abs = resolve(file);
  const mod = await import(`${pathToFileURL(abs).href}?t=${Date.now()}`);
  if (!Array.isArray(mod.default)) throw new Error(`${file}: default export must be an array of icons`);
  return mod.default;
}

/** The emoji a batch file is expected to hold (data/assign/<name>.json), if any. */
export function assignment(file) {
  const p = join(ROOT, "data/assign", `${basename(file, ".mjs")}.json`);
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
}

const FORBIDDEN = [
  [/<(text|tspan|image|use|style|script|foreignObject|a|animate\w*|set)\b/i, "forbidden element"],
  [/\s(class|style|href|xlink:href|id|on\w+)\s*=/i, "forbidden attribute"],
  [/url\(\s*["']?(?!#)/i, "external url()"],
];

/** Static checks + render. Returns { id, n, u, r?, errors[], warns[] }. */
export function inspect(ic, seen) {
  const out = { id: iconId(ic), u: ic.u, n: ic.n ?? ic.key ?? "?", errors: [], warns: [] };
  if (!out.id) out.errors.push("missing u");
  if (!ic.n) out.errors.push("missing n");
  if (typeof ic.draw !== "function") {
    out.errors.push("missing draw()");
    return out;
  }
  if (seen.has(out.id)) out.errors.push("duplicate id in this file");
  seen.add(out.id);
  try {
    out.r = render(ic);
  } catch (e) {
    out.errors.push(`draw() threw: ${e.message}`);
    return out;
  }
  const { body, defs } = out.r;
  for (const [re, msg] of FORBIDDEN) {
    const m = body.match(re);
    if (m) out.errors.push(`${msg}: ${m[0].trim()}`);
  }
  if (/undefined|NaN|\[object/.test(body + defs)) out.errors.push("body contains undefined / NaN / [object …]");
  const ids = new Set([...defs.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const m of body.matchAll(/url\(#([^)]+)\)/g)) {
    if (!ids.has(m[1]) && !/^sk-bvs?$/.test(m[1])) out.errors.push(`unknown reference url(#${m[1]})`);
  }
  if (!/sk-bv/.test(body)) out.warns.push("no bevel group (B / Bs)");
  const kb = Buffer.byteLength(body + defs) / 1024;
  out.kb = kb;
  if (kb > 5) out.errors.push(`too big: ${kb.toFixed(1)} KB (max 5 with gradients)`);
  return out;
}

/** In the page: XML-parse every icon and measure what it paints (user units). */
export async function measure(page, items) {
  const svgs = items.map((it) =>
    it.r
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="240" height="240"><defs>${FILTERS}${it.r.defs}</defs><g filter="url(#sk-tx)">${it.r.body}</g></svg>`
      : null,
  );
  const res = await page.evaluate(async (list) => {
    const out = [];
    for (const svg of list) {
      if (!svg) {
        out.push(null);
        continue;
      }
      const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
      const bad = doc.querySelector("parsererror");
      if (bad) {
        out.push({ xml: bad.textContent.replace(/\s+/g, " ").slice(0, 200) });
        continue;
      }
      const img = new Image();
      const ok = await new Promise((res) => {
        img.onload = () => res(true);
        img.onerror = () => res(false);
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      });
      if (!ok) {
        out.push({ xml: "image failed to load" });
        continue;
      }
      const c = document.createElement("canvas");
      c.width = c.height = 240;
      const g = c.getContext("2d", { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, 240, 240).data;
      let x0 = 240, y0 = 240, x1 = -1, y1 = -1, area = 0;
      for (let y = 0; y < 240; y++)
        for (let x = 0; x < 240; x++)
          if (d[(y * 240 + x) * 4 + 3] > 24) {
            area++;
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
      out.push(x1 < 0 ? { empty: true } : { x0: x0 / 2 - 10, y0: y0 / 2 - 10, x1: (x1 + 1) / 2 - 10, y1: (y1 + 1) / 2 - 10, area: area / 4 });
    }
    return out;
  }, svgs);
  items.forEach((it, i) => {
    const m = res[i];
    if (!m) return;
    if (m.xml) return void it.errors.push(`invalid XML: ${m.xml}`);
    if (m.empty) return void it.errors.push("paints nothing");
    it.box = m;
    const w = m.x1 - m.x0, h = m.y1 - m.y0;
    if (m.x0 < -0.5 || m.y0 < -0.5 || m.x1 > 100.5 || m.y1 > 100.5) it.errors.push("paints outside the 0…100 box (would be cut off)");
    else if (m.x0 < 2 || m.y0 < 2 || m.x1 > 98 || m.y1 > 98) it.warns.push("touches the edge: keep within 3…97");
    if (Math.max(w, h) < 78) it.warns.push(`small: larger side ${Math.max(w, h).toFixed(0)}, scale up to 84–92`);
    const dx = (m.x0 + m.x1) / 2 - 50, dy = (m.y0 + m.y1) / 2 - 50;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) it.warns.push(`off centre by (${dx.toFixed(0)}, ${dy.toFixed(0)})`);
  });
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Contact sheet: every icon on the dark keyboard ground and on light paper, with the system emoji for reference. */
export function sheetHtml(title, items, { cols = 8, cell = 150, big = false } = {}) {
  const size = big ? cell - 40 : cell - 36;
  const block = (cls) =>
    `<div class="blk ${cls}">${items
      .map((it) => {
        const ref = it.u ? `<span class="ref">${emojiChar(it.u)}</span>` : "";
        const art = it.r ? `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><defs>${it.r.defs}</defs><g filter="url(#sk-tx)">${it.r.body}</g></svg>` : `<div class="err">ERROR</div>`;
        return `<div class="c${it.errors.length ? " bad" : ""}">${art}<div class="l">${ref}<span>${esc(it.n)}</span></div></div>`;
      })
      .join("")}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;background:#1b1b1a;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif}
h1{margin:0;padding:10px 14px;font-size:14px;font-weight:600;color:#c9c6c0}
.blk{display:grid;grid-template-columns:repeat(${cols},${cell}px);padding:6px 0 10px}
.dark{background:#1b1b1a;color:#a5a29c}.light{background:#f4f1ea;color:#5d5a55}
.c{height:${cell + 14}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
.c.bad{outline:2px solid #ff5a4f;outline-offset:-4px}
.c svg{overflow:visible}
.l{display:flex;align-items:center;gap:5px;font-size:11px;max-width:${cell - 8}px}
.l span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ref{font-size:${big ? 30 : 20}px;line-height:1}
.err{width:${size}px;height:${size}px;display:grid;place-items:center;color:#ff5a4f;font-weight:700}
</style></head><body style="width:${cols * cell}px">
<svg width="0" height="0" style="position:absolute"><defs>${FILTERS}</defs></svg>
<h1>${esc(title)}</h1>${block("dark")}${block("light")}</body></html>`;
}

export function report(items) {
  let errors = 0, warns = 0;
  for (const it of items) {
    const b = it.box ? `${it.box.x0.toFixed(0)},${it.box.y0.toFixed(0)} → ${it.box.x1.toFixed(0)},${it.box.y1.toFixed(0)}` : "—";
    const flags = [...it.errors.map((e) => `ERROR ${e}`), ...it.warns.map((w) => `warn ${w}`)];
    errors += it.errors.length;
    warns += it.warns.length;
    console.log(`${String(it.id).padEnd(14)} ${String(it.n).slice(0, 30).padEnd(30)} ${b.padEnd(16)} ${(it.kb ?? 0).toFixed(1)}K ${flags.length ? `\n    ${flags.join("\n    ")}` : "ok"}`);
  }
  return { errors, warns };
}
