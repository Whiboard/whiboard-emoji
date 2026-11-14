// Split one emoji category into batch assignments.
//
//   node assign.ts objects 7   → data/objects.json + data/assign/objects-1.json … objects-7.json
//   node assign.ts smileys_people 5 --first 169 --as smileys
//                                 → only the first 169 emoji of that picker category (the faces and
//                                   hearts, not the people), saved under the name "smileys"
//
// Emoji already drawn in any batches/*.ts are left out, and the list keeps the picker's order,
// so neighbours (all the books, all the tools) land in the same batch.
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { emojiChar, iconId } from "./kit.ts";
import type { Assigned } from "./scripts/common.ts";
import { ROOT, loadBatch } from "./scripts/common.ts";

const argv = process.argv.slice(2);
const opt = (k: string) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : undefined);
const [cat = "", nArg] = argv;
const first = Number(opt("--first") ?? Number.POSITIVE_INFINITY);
const name = opt("--as") ?? cat;
const require = createRequire(import.meta.url);
/** emoji-picker-react's data: per category, `u` = code points, `n` = keywords with the name last. */
const data: { emojis: Record<string, Array<{ u: string; n: string[] }>> } = require("emoji-picker-react/dist/data/emojis-en.json");
const list = data.emojis[cat];
if (!list) {
  console.error(`unknown category; one of: ${Object.keys(data.emojis).join(", ")}`);
  process.exit(2);
}

const all: Assigned[] = list.slice(0, first).map((e) => ({ u: e.u, n: e.n[e.n.length - 1] ?? "", e: emojiChar(e.u), k: e.n.slice(0, -1).join(", ") }));
mkdirSync(join(ROOT, "data/assign"), { recursive: true });
writeFileSync(join(ROOT, "data", `${name}.json`), `${JSON.stringify(all, null, 1)}\n`);

const done = new Set<string | undefined>();
for (const f of readdirSync(join(ROOT, "batches")).filter((f) => f.endsWith(".ts"))) {
  for (const ic of await loadBatch(join(ROOT, "batches", f))) done.add(iconId(ic));
}
const todo = all.filter((e) => !done.has(e.u));
const n = Number(nArg && !nArg.startsWith("--") ? nArg : Math.ceil(todo.length / 36));
const per = Math.ceil(todo.length / n);
for (let i = 0; i < n; i++) {
  const part = todo.slice(i * per, (i + 1) * per);
  writeFileSync(join(ROOT, "data/assign", `${name}-${i + 1}.json`), `${JSON.stringify(part, null, 1)}\n`);
  console.log(`${name}-${i + 1}: ${part.length}  ${part.map((p) => p.e).join("")}`);
}
console.log(`${name}: ${all.length} emoji, ${all.length - todo.length} already drawn, ${todo.length} assigned to ${n} batches`);
