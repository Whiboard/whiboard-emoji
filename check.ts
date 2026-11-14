// Validate one batch file and render its contact sheet.
//
//   node check.ts batches/objects-1.ts                 → out/check/objects-1.png (all icons, dark + light)
//   node check.ts batches/objects-1.ts --only 1f453,1f97d   → out/check/objects-1-zoom.png (those icons, large)
//
// Exit code 1 when any icon has an ERROR. Warnings (size, centring, edges) should be fixed too.
import { mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import type { Assigned } from "./scripts/common.ts";
import { ROOT, assignment, inspect, launch, loadBatch, measure, report, sheetHtml } from "./scripts/common.ts";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
if (!file) {
  console.error("usage: node check.ts batches/<name>.ts [--only id,id]");
  process.exit(2);
}
const onlyAt = args.indexOf("--only");
const only = onlyAt >= 0 ? new Set((args[onlyAt + 1] ?? "").split(",")) : null;
const name = basename(file, ".ts");

const icons = await loadBatch(file);
const seen = new Set<string | undefined>();
let items = icons.map((ic) => inspect(ic, seen));

const want = assignment(file);
let missing: Assigned[] = [];
if (want) {
  const have = new Set(items.map((i) => i.id));
  missing = want.filter((w) => !have.has(w.u));
  const allowed = new Set(want.map((w) => w.u));
  for (const it of items) if (!it.id || !allowed.has(it.id)) it.errors.push("not in this batch's assignment (wrong u?)");
}
if (only) items = items.filter((i) => i.id !== undefined && only.has(i.id));

const browser = await launch();
const cols = only ? Math.min(4, Math.max(1, items.length)) : 8;
const cell = only ? 300 : 150;
const page = await browser.newPage({ viewport: { width: cols * cell, height: 600 }, deviceScaleFactor: only ? 1.5 : 1 });
await page.setContent("<!doctype html><html><body></body></html>");
await measure(page, items);
await page.setContent(sheetHtml(`${name}${only ? " (zoom)" : ""} — ${items.length} icons`, items, { cols, cell, big: !!only }));
await page.waitForTimeout(150);
mkdirSync(join(ROOT, "out/check"), { recursive: true });
const out = join(ROOT, "out/check", `${name}${only ? "-zoom" : ""}.png`);
await page.screenshot({ path: out, fullPage: true });
await browser.close();

const { errors, warns } = report(items);
if (missing.length) console.log(`\nMISSING ${missing.length}: ${missing.map((m) => `${m.u} ${m.n}`).join(", ")}`);
console.log(`\n${items.length} icons, ${errors} errors, ${warns} warnings${want ? `, ${missing.length} of ${want.length} assigned still missing` : ""}\nsheet: ${out}`);
// a zoom run looks at a few icons only: it must not replace the summary of the full run
if (!only) writeFileSync(join(ROOT, "out/check", `${name}.json`), JSON.stringify({ icons: items.length, errors, warns, missing: missing.map((m) => m.u) }));
process.exit(errors ? 1 : 0);
