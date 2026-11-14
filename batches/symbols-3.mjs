// Symbols 3: loops, marks, stars, legal marks, splatter, Japanese buttons.
import { readFileSync } from "node:fs";
import { B, Bs, C } from "../kit.mjs";
import { TONE, W, disc, ink, label, line, tile } from "../symkit.mjs";

const NAME = Object.fromEntries(JSON.parse(readFileSync(new URL("../data/assign/symbols-3.json", import.meta.url), "utf8")).map((e) => [e.u, e.n]));
const out = [];
const add = (u, draw) => out.push({ u, n: NAME[u], draw });

// stand-alone curly loops
add("27b0", (t) => `<g ${B}>${line("M10 76 C34 84 52 66 52 46 C52 22 28 12 22 30 C16 50 42 70 66 56 C80 48 88 34 90 22", { sw: 10, color: t.lin(TONE.orange, "d") })}</g>`);
add("27bf", (t) => `<g ${B}>${line("M8 70 C22 76 36 66 36 48 C36 28 14 26 12 42 C10 58 34 66 50 52 C64 40 56 22 44 26 C34 30 40 56 60 64 C76 70 86 56 92 36", { sw: 9.5, color: t.lin(TONE.orange, "d") })}</g>`);
add("303d-fe0f", (t) => tile(t, "orange") + ink(line("M20 72 L34 26 C40 40 46 52 50 52 C54 52 60 40 66 26 L80 72", { sw: 9 })));

// asterisks and stars
const spokes = (n, len, sw) => Array.from({ length: n }, (_, i) => `<g transform="rotate(${(180 / n) * i} 50 50)">${line(`M50 ${50 - len / 2} V${50 + len / 2}`, { sw })}</g>`).join("");
add("2733-fe0f", (t) => tile(t, "green") + ink(spokes(4, 58, 9)));
const star = (n, ro, ri) =>
  "M" + Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n, r = i % 2 ? ri : ro;
    return `${(50 + r * Math.sin(a)).toFixed(1)} ${(50 - r * Math.cos(a)).toFixed(1)}`;
  }).join(" L") + "Z";
add("2734-fe0f", (t) => tile(t, "orange") + ink(`<path d="${star(8, 32, 17)}" fill="${W}" stroke="${W}" stroke-width="5" stroke-linejoin="round"/>`));
add("2747-fe0f", (t) => tile(t, "teal") + ink(`<path d="${star(4, 34, 7)}" fill="${W}" stroke="${W}" stroke-width="5" stroke-linejoin="round"/>` + [45, 135, 225, 315].map((a) => `<g transform="rotate(${a} 50 50)">${line("M50 24 V30", { sw: 8 })}</g>`).join("")));

// legal marks
add("00a9-fe0f", (t) => disc(t, "dark") + ink(label("C", { h: 38, sw: 8, cx: 50 })));
add("00ae-fe0f", (t) => disc(t, "dark") + ink(label("R", { h: 38, sw: 8, cx: 50 })));
add("2122-fe0f", (t) => tile(t, "dark") + ink(label("TM", { h: 28, sw: 6.4, maxW: 60 })));

// splatter
add("1fadf", (t) => {
  const g = t.rad(TONE.blue);
  const blobs = [[50, 48, 22], [30, 34, 12], [70, 30, 11], [77, 58, 13], [27, 64, 12], [52, 77, 12], [16, 46, 6], [86, 40, 5], [60, 11, 5], [88, 78, 4.5], [10, 82, 4]];
  return `<g ${B} fill="${g}">${blobs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}<path d="M44 66 H58 V90 A7 7 0 0 1 44 90Z"/></g><ellipse cx="42" cy="38" rx="9" ry="5" transform="rotate(-35 42 38)" fill="${C.paper}" opacity="0.55"/>`;
});

// Japanese buttons: stroke-by-stroke kana / kanji in W
const kj = (strokes, sw = 4.8) => ink(line(strokes.join(" "), { sw }));
const jp = (u, tone, strokes, sw, shape = tile) => add(u, (t) => shape(t, tone) + kj(strokes, sw));
const rect = (x, y, w, h) => `M${x} ${y} H${x + w} V${y + h} H${x}Z`;

// ココ
jp("1f201", "blue", ["M18 32 H44 V68 H18", "M54 32 H80 V68 H54"], 6);
// サ
jp("1f202-fe0f", "blue", ["M20 42 H80", "M36 24 V50", "M64 24 V50", "M50 52 V66 Q50 78 28 82"], 5.6);
// 月
jp("1f237-fe0f", "orange", ["M36 16 V80 Q36 85 29 84", "M36 16 H66 V76 Q66 85 58 83", "M36 36 H66", "M36 56 H66"], 5.4);
// 有
jp("1f236", "orange", ["M18 30 H82", "M48 14 C44 34 34 46 20 54", "M34 48 V84", "M34 48 H68 V80 Q68 86 60 84", "M34 62 H68", "M34 74 H68"], 4.6);
// 指
jp("1f22f", "green", ["M26 18 V80 Q26 85 19 83", "M14 38 H36", "M14 60 L36 48", "M52 18 L46 34", "M46 32 H66 Q66 40 60 40", "M48 50 H80 V82 H48Z", "M48 66 H80"], 4.4);
// 得
jp("1f250", "red", ["M30 14 L18 28", "M30 34 L18 48", "M26 46 V84", "M46 16 H74 V34 H46Z", "M46 25 H74", "M44 44 H82", "M44 58 H82", "M64 46 V80 Q64 86 56 84", "M74 68 L77 74"], 4.4);
// 割
jp("1f239", "green", ["M38 12 V18", "M18 28 V22 H58 V28", "M26 36 H52", "M26 45 H52", "M39 30 V52", "M26 58 H52 V82 H26Z", "M70 36 V68", "M82 14 V80 Q82 85 75 84"], 4.4);
// 無
jp("1f21a", "red", ["M34 12 L22 24", "M22 28 H78", "M30 42 H70", "M22 54 H78", "M50 14 V62", "M38 28 V54", "M62 28 V54", "M24 70 L19 82", "M42 70 V82", "M58 70 V82", "M76 70 L81 82"], 4.4);
// 禁
jp("1f232", "red", ["M14 24 H44", "M29 14 V50", "M29 26 L16 46", "M29 26 L44 46", "M56 24 H86", "M71 14 V50", "M71 26 L58 46", "M71 26 L86 46", "M30 58 H70", "M20 68 H80", "M50 68 V84 Q50 87 45 86", "M36 76 L26 86", "M64 76 L74 86"], 4.4);
// 可
jp("1f251", "green", ["M18 24 H82", "M66 24 V78 Q66 86 56 84", "M24 44 H50 V66 H24Z"], 5.4);
// 申
jp("1f238", "orange", ["M26 28 H74 V64 H26Z", "M26 46 H74", "M50 14 V86"], 5.4);
// 合
jp("1f234", "red", ["M50 14 L20 42", "M50 14 L80 42", "M30 50 H70", "M30 60 H70 V84 H30Z"], 5.2);
// 空
jp("1f233", "blue", ["M50 10 V18", "M22 34 V26 H78 V34", "M44 40 L34 54", "M56 40 L66 54", "M32 62 H68", "M50 62 V84", "M24 85 H76"], 4.6);
// 祝 (disc)
jp("3297-fe0f", "red", ["M26 16 L32 22", "M16 33 H36 L24 44", "M26 40 V82", "M17 62 L22 70", "M48 18 H78 V38 H48Z", "M56 46 V72 Q56 82 48 84", "M72 46 V76 Q72 84 82 82"], 4.4, disc);
// 秘 (disc)
jp("3299-fe0f", "red", ["M38 14 L20 24", "M16 38 H42", "M29 26 V84", "M29 48 C26 58 22 62 16 66", "M30 48 C34 58 38 62 44 66", "M52 56 L55 66", "M62 50 V74 Q62 84 74 82", "M70 48 L74 58", "M80 54 L84 62", "M82 20 C76 34 68 42 58 48"], 4.2, disc);
// 営
jp("1f23a", "orange", ["M36 10 L40 18", "M50 8 V18", "M64 10 L60 18", "M24 34 V26 H76 V34", "M36 42 H64 V58 H36Z", "M36 64 H64 V80 H36Z"], 4.6);
// 満
jp("1f235", "red", ["M22 20 L28 26", "M20 40 L26 46", "M32 78 L20 62", "M46 22 H84", "M56 12 V28", "M74 12 V28", "M48 36 H80 V80 Q80 86 74 85", "M48 36 V80", "M58 46 L53 72", "M70 46 L65 72", "M48 56 H80"], 4.2);

export default NAME ? order(out) : out;

function order(list) {
  const ids = Object.keys(NAME);
  return ids.map((u) => list.find((x) => x.u === u)).filter(Boolean);
}
