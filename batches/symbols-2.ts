// Religion, zodiac, currency, medical, recycling and emblem symbols.
import type { Icon } from "../kit.ts";
import { readFileSync } from "node:fs";
import { B, Bs, C, star } from "../kit.ts";
import { TONE, W, arcArrow, head, ink, label, line, tile } from "../symkit.ts";

const NAME = Object.fromEntries(JSON.parse(readFileSync(new URL("../data/assign/symbols-2.json", import.meta.url), "utf8")).map((e) => [e.u, e.n]));
const out: Icon[] = [];
const add = (u, draw) => out.push({ u, n: NAME[u], draw });

const L = (d, sw = 7) => line(d, { sw });
const fillW = (d) => `<path d="${d}" fill="${W}" stroke="${W}" stroke-width="3" stroke-linejoin="round"/>`;
const ring = (cx, cy, r, sw = 6) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${W}" stroke-width="${sw}"/>`;
const dot = (cx, cy, r, c = W) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`;
const sign = (tone, glyph) => (t) => tile(t, tone) + ink(glyph);
const pts = (cx, cy, R, a0, n) => Array.from({ length: n }, (_, i) => {
  const a = ((a0 + (360 / n) * i) * Math.PI) / 180;
  return [+(cx + R * Math.sin(a)).toFixed(2), +(cy - R * Math.cos(a)).toFixed(2)];
});

// ── religion ─────────────────────────────────────────────────────────────────────────────────
add("1f6d0", sign("purple",
  L("M50 14 V26", 5) + fillW("M26 52 A24 24 0 0 1 74 52Z") +
  `<rect x="29" y="56" width="8" height="18" rx="2" fill="${W}"/><rect x="46" y="56" width="8" height="18" rx="2" fill="${W}"/><rect x="63" y="56" width="8" height="18" rx="2" fill="${W}"/>` +
  `<rect x="21" y="76" width="58" height="8" rx="3" fill="${W}"/>`));

add("269b-fe0f", sign("purple",
  [0, 60, 120].map((a) => `<ellipse cx="50" cy="50" rx="31" ry="12" transform="rotate(${a} 50 50)" fill="none" stroke="${W}" stroke-width="5"/>`).join("") + dot(50, 50, 7)));

add("1f549-fe0f", sign("purple",
  L("M26 36 C28 22 46 24 44 36 C43 42 36 44 33 44 C52 42 62 52 60 63 C58 77 38 80 30 69 C26 62 33 57 41 61", 6.5) +
  L("M46 43 C60 38 72 46 71 58 C70 66 66 69 71 75", 6.5) +
  L("M58 29 A9 9 0 0 0 76 29", 5.5) + dot(67, 17, 4)));

add("2721-fe0f", sign("purple",
  `<g fill="none" stroke="${W}" stroke-width="6.5" stroke-linejoin="round"><path d="M50 21 L76 66 H24Z"/><path d="M50 80 L24 35 H76Z"/></g>`));

add("2638-fe0f", sign("purple",
  ring(50, 50, 21, 6) + dot(50, 50, 7) +
  pts(50, 50, 21, 0, 8).map(([x, y]) => L(`M50 50 L${x} ${y}`, 5)).join("") +
  pts(50, 50, 31, 0, 8).map(([x, y]) => dot(x, y, 4.5)).join("")));

add("262f-fe0f", sign("purple",
  dot(50, 50, 30) + `<path d="M50 20 A30 30 0 0 0 50 80Z" fill="${C.darkD}"/>` +
  dot(50, 35, 15, C.darkD) + dot(50, 65, 15) + dot(50, 35, 4.5) + dot(50, 65, 4.5, C.darkD)));

add("271d-fe0f", sign("purple", L("M50 18 V82", 10) + L("M33 38 H67", 10)));

add("2626-fe0f", sign("purple", L("M50 18 V82", 8) + L("M39 29 H61", 7) + L("M30 44 H70", 8) + L("M39 72 L61 62", 7)));

add("262a-fe0f", (t) => tile(t, "purple") + ink(fillW("M52 25 A26 26 0 1 0 52 75 A26.6 26.6 0 0 1 52 25Z") + `<polygon points="${star(69, 50, 12, 5.2)}" fill="${W}" stroke="${W}" stroke-width="2" stroke-linejoin="round"/>`));

add("262e-fe0f", sign("teal", ring(50, 50, 27, 6.5) + L("M50 23 V77", 6.5) + L("M50 50 L31 69", 6.5) + L("M50 50 L69 69", 6.5)));

add("1f54e", sign("purple",
  L("M21 55 H79", 5) + L("M50 28 V82", 5.5) + L("M36 82 H64", 6) +
  Array.from({ length: 9 }, (_, k) => {
    const x = 21 + k * 7.25, mid = k === 4, top = mid ? 33 : 41;
    return L(`M${x} ${top} V55`, 4) + dot(x, top - 6, 2.6);
  }).join("")));

add("1f52f", sign("purple",
  `<g fill="none" stroke="${W}" stroke-width="5.5" stroke-linejoin="round"><path d="M50 19 L77 65 H23Z"/><path d="M50 81 L23 35 H77Z"/></g>` + dot(50, 50, 6)));

add("1faaf", sign("purple",
  fillW("M50 14 L58 32 V58 L50 64 L42 58 V32Z") + ring(50, 45, 15, 4.5) +
  L("M50 64 V84", 7) +
  L("M30 78 C16 66 18 46 28 28", 6.5) + L("M70 78 C84 66 82 46 72 28", 6.5)));

// ── zodiac ───────────────────────────────────────────────────────────────────────────────────
const Z = (u, d) => add(u, sign("purple", d));
Z("2648", L("M50 78 V44 C50 28 40 22 32 24 C24 26 22 38 28 44", 7.5) + L("M50 78 V44 C50 28 60 22 68 24 C76 26 78 38 72 44", 7.5));
Z("2649", L("M26 24 A24 20 0 0 0 74 24", 7) + ring(50, 63, 16, 7));
Z("264a", L("M36 30 V70", 7.5) + L("M64 30 V70", 7.5) + L("M24 24 Q50 36 76 24", 7) + L("M24 76 Q50 64 76 76", 7));
const crab = ring(31, 38, 7, 6) + L("M38 37 C44 24 66 22 75 36", 6.5);
Z("264b", crab + `<g transform="rotate(180 50 50)">${crab}</g>`);
Z("264c", ring(32, 62, 9, 6.5) + L("M41 58 C42 34 52 24 62 25 C74 26 76 42 66 48 C62 52 62 64 66 72 C69 77 76 77 79 71", 6.5));
Z("264d", L("M22 28 V70", 6.5) + L("M22 38 C22 26 42 26 42 38 V70", 6.5) + L("M42 38 C42 26 62 26 62 38 V62 C62 80 82 78 80 64 C78 54 66 56 62 64", 6.5));
Z("264e", L("M22 78 H78", 7) + L("M22 64 H38 C28 56 28 34 50 34 C72 34 72 56 62 64 H78", 7));
Z("264f", L("M22 30 V72", 6.5) + L("M22 40 C22 28 42 28 42 40 V72", 6.5) + L("M42 40 C42 28 62 28 62 40 V68 C62 80 77 80 79 70 V62", 6.5) + head(79, 52, 0, { s: 7 }));
Z("2650", L("M24 77 L72 29", 7.5) + head(78, 23, 45, { s: 11 }) + L("M27 50 L50 73", 7.5));
Z("2651", L("M22 30 C28 30 32 36 34 46 L40 72 L52 36 C56 26 70 28 70 40 C70 52 56 62 56 70 C56 82 78 82 78 68 C78 58 66 58 64 66", 6.5));
Z("2652", L("M20 40 L32 30 L44 40 L56 30 L68 40 L80 30", 6.5) + L("M20 68 L32 58 L44 68 L56 58 L68 68 L80 58", 6.5));
Z("2653", L("M32 20 C20 34 20 66 32 80", 7) + L("M68 20 C80 34 80 66 68 80", 7) + L("M22 50 H78", 7));
Z("26ce", L("M24 78 H38 C26 70 24 54 30 46 C36 38 64 38 70 46 C76 54 74 70 62 78 H76", 6.5) + L("M36 20 V32 Q36 44 50 44 Q64 44 64 32 V20", 6.5));

// ── money, medicine, recycling ───────────────────────────────────────────────────────────────
const dollar = (cx, cy, h, sw) => label("S", { cx, cy, h, sw }) + line(`M${cx} ${cy - h * 0.66} V${cy + h * 0.66}`, { sw: sw * 0.7 });
const yen = (cx, cy, h, sw) => label("Y", { cx, cy, h, sw, maxW: 30 }) + line(`M${cx - h * 0.3} ${cy + 1} H${cx + h * 0.3} M${cx - h * 0.3} ${cy + h * 0.24} H${cx + h * 0.3}`, { sw: sw * 0.7 });
add("1f4b1", (t) => tile(t, "green") + ink(
  dollar(28, 35, 24, 4.6) + L("M43 35 H70", 7.5) + head(80, 35, 90, { s: 9 }) +
  yen(72, 66, 24, 4.6) + L("M57 66 H30", 7.5) + head(20, 66, 270, { s: 9 })));

add("1f4b2", (t) => {
  const g = t.lin(TONE.green);
  return `<g ${B}><rect x="45.5" y="6" width="9" height="88" rx="4.5" fill="${g}"/>${label("S", { h: 64, sw: 15, color: g, maxW: 50 })}</g>`;
});

add("2695-fe0f", (t) => tile(t, "blue") + ink(L("M50 20 V82", 7) + L("M36 28 H64", 5) + L("M37 40 C62 38 62 50 50 52 C38 54 38 66 62 64", 6.5) + dot(37, 40, 4)));

add("267b-fe0f", (t) => tile(t, "green") + ink(arcArrow(50, 50, 24, 12, 112, { sw: 8, hs: 9 }) + arcArrow(50, 50, 24, 132, 232, { sw: 8, hs: 9 }) + arcArrow(50, 50, 24, 252, 352, { sw: 8, hs: 9 })));

// ── emblems ──────────────────────────────────────────────────────────────────────────────────
add("269c-fe0f", (t) => {
  const g = t.lin(["#F6CF5E", C.goldM, C.goldD], "d");
  const petal = "M44 56 C38 36 12 30 14 50 C15 60 26 62 36 57 C28 58 26 52 30 48";
  return `<g ${B} fill="${g}"><path d="M50 8 C64 22 64 44 50 60 C36 44 36 22 50 8Z"/>` +
    `<path d="${petal} L44 62Z"/><g transform="translate(100 0) scale(-1 1)"><path d="${petal} L44 62Z"/></g>` +
    `<rect x="27" y="60" width="46" height="10" rx="5"/>` +
    `<path d="M43 72 C42 80 36 86 26 88 C36 88 44 88 50 94 C56 88 64 88 74 88 C64 86 58 80 57 72Z"/></g>`;
});

add("1f531", (t) => {
  const g = t.lin(["#F6CF5E", C.goldM, C.goldD], "d");
  return `<g ${B}><path d="M24 24 V46 C24 62 38 66 50 66 C62 66 76 62 76 46 V24" fill="none" stroke="${g}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<rect x="45.5" y="26" width="9" height="66" rx="4" fill="${g}"/>` +
    `<path d="M50 6 L61 30 H39Z" fill="${g}" stroke="${g}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M24 10 L33 30 H15Z" fill="${g}" stroke="${g}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M76 10 L85 30 H67Z" fill="${g}" stroke="${g}" stroke-width="4" stroke-linejoin="round"/></g>`;
});

add("1f4db", (t) => tile(t, "red") + `<g ${Bs}><rect x="16" y="27" width="68" height="46" rx="10" fill="${t.lin(TONE.white, "d")}"/></g>` +
  line("M30 43 H70", { sw: 6, color: C.dark }) + line("M30 58 H56", { sw: 6, color: C.dark }));

add("1f530", (t) => {
  const g = t.rad(TONE.green);
  return `<g ${B}><path d="M50 7 L88 26 V52 C88 72 70 86 50 94 C30 86 12 72 12 52 V26Z" fill="${g}" stroke="${g}" stroke-width="4" stroke-linejoin="round"/></g>` +
    `<g ${Bs}>${line("M25 36 L50 52 L75 36", { sw: 12, color: t.lin(TONE.yellow) })}${line("M25 57 L50 73 L75 57", { sw: 12, color: t.lin(TONE.yellow) })}</g>`;
});

const __batch: Icon[] = out;

export default __batch;
