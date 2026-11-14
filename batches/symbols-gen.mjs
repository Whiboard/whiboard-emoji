// Symbols that follow a pattern: arrows, media buttons, maths, marks, keycaps, letter buttons, shapes.
// Everything is built from symkit.mjs, so a family changes in one place. The small squares and
// diamonds stay small on purpose (their size is their meaning), so the checker's size warning
// does not apply to them.
import { readFileSync } from "node:fs";
import { B, Bs, C } from "../kit.mjs";
import { TONE, W, arcArrow, arrow, disc, head, ink, label, line, tile } from "../symkit.mjs";

const NAME = Object.fromEntries(JSON.parse(readFileSync(new URL("../data/symbols.json", import.meta.url), "utf8")).map((e) => [e.u, e.n]));
const out = [];
const add = (u, draw) => out.push({ u, n: NAME[u], draw });
const each = (rows, fn) => rows.forEach((r) => add(r[0], (t) => fn(t, ...r.slice(1))));

// ── arrows ───────────────────────────────────────────────────────────────────────────────────
each(
  [["2b06-fe0f", 0], ["2197-fe0f", 45], ["27a1-fe0f", 90], ["2198-fe0f", 135], ["2b07-fe0f", 180], ["2199-fe0f", 225], ["2b05-fe0f", 270], ["2196-fe0f", 315]],
  (t, deg) => tile(t, "blue") + ink(arrow(deg)),
);
add("2195-fe0f", (t) => tile(t, "blue") + ink(arrow(0, { two: true, s: 0.9 })));
add("2194-fe0f", (t) => tile(t, "blue") + ink(arrow(90, { two: true, s: 0.9 })));
add("21a9-fe0f", (t) => tile(t, "blue") + ink(line("M36 63 H60 A13.5 13.5 0 0 0 60 36 H42", { sw: 9 }) + head(20, 63, 270, { s: 11 })));
add("21aa-fe0f", (t) => tile(t, "blue") + ink(line("M64 63 H40 A13.5 13.5 0 0 1 40 36 H58", { sw: 9 }) + head(80, 63, 90, { s: 11 })));
add("2934-fe0f", (t) => tile(t, "blue") + ink(line("M24 71 H48 Q67 71 67 52 V40", { sw: 9 }) + head(67, 22, 0, { s: 11 })));
add("2935-fe0f", (t) => tile(t, "blue") + ink(line("M24 29 H48 Q67 29 67 48 V60", { sw: 9 }) + head(67, 78, 180, { s: 11 })));
add("1f503", (t) => tile(t, "blue") + ink(arcArrow(50, 50, 25, 205, 335) + arcArrow(50, 50, 25, 25, 155)));
add("1f504", (t) => tile(t, "blue") + ink(arcArrow(50, 50, 25, 65, -65) + arcArrow(50, 50, 25, 245, 115)));
each(
  [["1f519", "BACK", 270, false], ["1f51a", "END", 270, false], ["1f51b", "ON!", 90, true], ["1f51c", "SOON", 90, false], ["1f51d", "TOP", 0, false]],
  (t, word, deg, two) => tile(t, "slate") + ink(arrow(deg, { cy: 32, s: 0.5, two }) + label(word, { cy: 70, h: 19, maxW: 62, sw: 4.4 })),
);

// ── media buttons ────────────────────────────────────────────────────────────────────────────
const triR = (x, w, h = 36) => `<path d="M${x} ${50 - h / 2} L${x + w} 50 L${x} ${50 + h / 2}Z" fill="${W}" stroke="${W}" stroke-width="5" stroke-linejoin="round"/>`;
const bar = (x, w = 8, h = 40) => `<rect x="${x}" y="${50 - h / 2}" width="${w}" height="${h}" rx="3" fill="${W}"/>`;
const turn = (deg, inner) => `<g transform="rotate(${deg} 50 50)">${inner}</g>`;
const AV = {
  play: triR(36, 33, 42),
  ff: triR(25, 23) + triR(53, 23),
  next: triR(24, 20) + triR(47, 20) + bar(70),
  playPause: triR(23, 23) + bar(56) + bar(70),
  pause: bar(31, 13, 42) + bar(56, 13, 42),
  stop: `<rect x="30" y="30" width="40" height="40" rx="6" fill="${W}"/>`,
  rec: `<circle cx="50" cy="50" r="21" fill="${W}"/>`,
  eject: `<path d="M50 27 L73 54 H27Z" fill="${W}" stroke="${W}" stroke-width="5" stroke-linejoin="round"/><rect x="24.5" y="64" width="51" height="10" rx="3.5" fill="${W}"/>`,
  shuffle: line("M21 36 H33 C50 36 50 64 67 64", { sw: 7 }) + head(82, 64, 90, { s: 8.5 }) + line("M21 64 H33 C50 64 50 36 67 36", { sw: 7 }) + head(82, 36, 90, { s: 8.5 }),
  repeat: line("M25 48 V45 A9 9 0 0 1 34 36 H65", { sw: 7 }) + head(80, 36, 90, { s: 8.5 }) + line("M75 52 V55 A9 9 0 0 1 66 64 H35", { sw: 7 }) + head(20, 64, 270, { s: 8.5 }),
};
each(
  [
    ["1f500", AV.shuffle], ["1f501", AV.repeat], ["1f502", AV.repeat + label("1", { h: 13, sw: 3.6 })],
    ["25b6-fe0f", AV.play], ["23e9", AV.ff], ["23ed-fe0f", AV.next], ["23ef-fe0f", AV.playPause],
    ["25c0-fe0f", turn(180, AV.play)], ["23ea", turn(180, AV.ff)], ["23ee-fe0f", turn(180, AV.next)],
    ["1f53c", turn(-90, AV.play)], ["23eb", turn(-90, AV.ff)], ["1f53d", turn(90, AV.play)], ["23ec", turn(90, AV.ff)],
    ["23f8-fe0f", AV.pause], ["23f9-fe0f", AV.stop], ["23fa-fe0f", AV.rec], ["23cf-fe0f", AV.eject],
  ],
  (t, glyph) => tile(t, "blue") + ink(glyph),
);

// ── maths and marks (no tile: chunky shapes in a tone) ───────────────────────────────────────
const PLUS = "M43 14 H57 V43 H86 V57 H57 V86 H43 V57 H14 V43 H43Z";
const plus = (g) => `<path d="${PLUS}" fill="${g}" stroke="${g}" stroke-width="6" stroke-linejoin="round"/>`;
const cross = (g, s = 1.2) => `<g transform="rotate(45 50 50) translate(50 50) scale(${s}) translate(-50 -50)">${plus(g)}</g>`;
const dark = ({ lin }) => lin(TONE.dark, "d");
add("2716-fe0f", (t) => `<g ${B}>${cross(dark(t))}</g>`);
add("2795", (t) => `<g ${B}>${plus(dark(t))}</g>`);
add("2796", (t) => `<g ${B}><rect x="11" y="40" width="78" height="20" rx="7" fill="${dark(t)}"/></g>`);
add("2797", (t) => {
  const g = dark(t);
  return `<g ${B}><rect x="11" y="42" width="78" height="16" rx="6" fill="${g}"/><circle cx="50" cy="21" r="10" fill="${g}"/><circle cx="50" cy="79" r="10" fill="${g}"/></g>`;
});
add("1f7f0", (t) => {
  const g = dark(t);
  return `<g ${B}><rect x="11" y="25" width="78" height="18" rx="6.5" fill="${g}"/><rect x="11" y="57" width="78" height="18" rx="6.5" fill="${g}"/></g>`;
});
add("267e-fe0f", (t) => `<g ${B}>${line("M50 50 C41 32 14 32 14 50 C14 68 41 68 50 50 C59 32 86 32 86 50 C86 68 59 68 50 50Z", { sw: 11, color: dark(t) })}</g>`);

const BANG = `<path d="M50 9 C59 9 62 15 61 24 L56 60 Q50 67 44 60 L39 24 C38 15 41 9 50 9Z"/><circle cx="50" cy="81" r="9.5"/>`;
const QUEST = (g) => `${line("M33 31 C33 19 40 12 50 12 C60 12 67 19 67 29 C67 43 50 42 50 59", { sw: 13, color: g })}<circle cx="50" cy="81" r="9.5" fill="${g}"/>`;
const at = (dx, s, inner) => `<g transform="translate(${50 + dx} 50) scale(${s}) translate(-50 -50)">${inner}</g>`;
add("203c-fe0f", (t) => `<g ${B} fill="${t.lin(TONE.red)}">${at(-19, 0.94, BANG)}${at(19, 0.94, BANG)}</g>`);
add("2049-fe0f", (t) => {
  const g = t.lin(TONE.red);
  return `<g ${B} fill="${g}">${at(-25, 0.94, BANG)}${at(13, 0.94, QUEST(g))}</g>`;
});
add("2753", (t) => `<g ${B}>${QUEST(t.lin(TONE.red))}</g>`);
add("2754", (t) => `<g ${B}>${QUEST(t.lin(TONE.chalk))}</g>`);
add("2755", (t) => `<g ${B} fill="${t.lin(TONE.chalk)}">${BANG}</g>`);
add("2757", (t) => `<g ${B} fill="${t.lin(TONE.red)}">${BANG}</g>`);
add("3030-fe0f", (t) => `<g ${B}>${line("M11 55 C18 35 30 35 38 50 C46 66 56 66 63 50 C70 35 82 35 89 46", { sw: 11, color: dark(t) })}</g>`);

const CHECK = "M27 52 L43 68 L74 32";
add("2b55", (t) => `<g ${B}><circle cx="50" cy="50" r="37" fill="none" stroke="${t.lin(TONE.red, "d")}" stroke-width="12"/></g>`);
add("2705", (t) => tile(t, "green") + ink(line(CHECK, { sw: 11 })));
add("2611-fe0f", (t) => `${tile(t, "slate")}<g ${Bs}><rect x="19" y="19" width="62" height="62" rx="11" fill="${t.lin(TONE.white)}"/></g>${line("M32 51 L45 64 L69 35", { sw: 10, color: C.navyD })}`);
add("2714-fe0f", (t) => `<g ${B}>${line("M16 54 L39 77 L84 24", { sw: 14, color: dark(t) })}</g>`);
add("274c", (t) => `<g ${B}>${cross(t.lin(TONE.red, "h"))}</g>`);
add("274e", (t) => tile(t, "green") + ink(cross(W, 0.66)));

// ── keycaps ──────────────────────────────────────────────────────────────────────────────────
const key = (t, s, h = 36) =>
  `<g ${B}><rect x="7" y="7" width="86" height="86" rx="18" fill="${t.lin(["#7C8BB3", C.navy, C.navyD], "d")}"/></g><g ${Bs}><rect x="16" y="14" width="68" height="64" rx="13" fill="${t.lin(["#9FAED0", "#6F80AB"])}"/></g>${ink(label(s, { cy: 46, h, maxW: 46, sw: 6.4 }))}`;
each(
  [["0023-fe0f-20e3", "#"], ["002a-fe0f-20e3", "*"], ...Array.from({ length: 10 }, (_, i) => [`003${i}-fe0f-20e3`, String(i)]), ["1f51f", "10", 32]],
  (t, s, h) => key(t, s, h),
);

// ── letter buttons ───────────────────────────────────────────────────────────────────────────
const two = (a, b) => label(a, { cy: 32, h: 22, gap: 0.5, sw: 4.6 }) + label(b, { cy: 68, h: 22, gap: 0.5, sw: 4.6 });
each(
  [["1f520", two("AB", "CD")], ["1f521", two("ab", "cd")], ["1f522", two("12", "34")], ["1f523", two("%#", "?!")], ["1f524", label("abc", { h: 30, gap: 0.3, sw: 5.4 })]],
  (t, glyph) => tile(t, "blue") + ink(glyph),
);
each(
  [
    ["1f170-fe0f", "red", "A", 46], ["1f18e", "red", "AB", 36], ["1f171-fe0f", "red", "B", 46], ["1f191", "red", "CL", 36],
    ["1f192", "blue", "COOL", 22], ["1f193", "blue", "FREE", 22], ["2139-fe0f", "blue", "i", 48], ["1f194", "purple", "ID", 38],
    ["1f195", "blue", "NEW", 26], ["1f196", "blue", "NG", 36], ["1f17e-fe0f", "red", "O", 46], ["1f197", "blue", "OK", 36],
    ["1f17f-fe0f", "blue", "P", 46], ["1f198", "red", "SOS", 27], ["1f199", "blue", "UP!", 30], ["1f19a", "orange", "VS", 36],
  ],
  (t, tone, s, h) => tile(t, tone) + ink(label(s, { h, maxW: 64, sw: Math.min(9, Math.max(4.6, h * 0.19)) })),
);
add("24c2-fe0f", (t) => disc(t, "blue") + ink(label("M", { h: 38, sw: 7.4 })));

// ── shapes ───────────────────────────────────────────────────────────────────────────────────
each(
  [["1f534", "red"], ["1f7e0", "orange"], ["1f7e1", "yellow"], ["1f7e2", "green"], ["1f535", "blue"], ["1f7e3", "purple"], ["1f7e4", "brown"], ["26ab", "dark"], ["26aa", "white"]],
  (t, tone) => disc(t, tone),
);
each(
  [["1f7e5", "red"], ["1f7e7", "orange"], ["1f7e8", "yellow"], ["1f7e9", "green"], ["1f7e6", "blue"], ["1f7ea", "purple"], ["1f7eb", "brown"], ["2b1b", "dark"], ["2b1c", "white"]],
  (t, tone) => tile(t, tone, { rx: 10 }),
);
each(
  [["25fc-fe0f", "dark", 66], ["25fb-fe0f", "white", 66], ["25fe", "dark", 50], ["25fd", "white", 50], ["25aa-fe0f", "dark", 34], ["25ab-fe0f", "white", 34]],
  (t, tone, size) => tile(t, tone, { size, rx: +(size * 0.12).toFixed(1) }),
);
const diamond = (t, tone, size, f = B) =>
  `<g ${f}><g transform="rotate(45 50 50)"><rect x="${50 - size / 2}" y="${50 - size / 2}" width="${size}" height="${size}" rx="${+(size * 0.1).toFixed(1)}" fill="${t.lin(Array.isArray(tone) ? tone : TONE[tone], "h")}"/></g></g>`;
each([["1f536", "orange", 62], ["1f537", "blue", 62], ["1f538", "orange", 38], ["1f539", "blue", 38]], (t, tone, size) => diamond(t, tone, size));
add("1f53a", (t) => {
  const g = t.lin(TONE.red);
  return `<g ${B}><path d="M50 13 L89 81 H11Z" fill="${g}" stroke="${g}" stroke-width="9" stroke-linejoin="round"/></g>`;
});
add("1f53b", (t) => {
  const g = t.lin(TONE.red);
  return `<g ${B}><path d="M11 19 H89 L50 87Z" fill="${g}" stroke="${g}" stroke-width="9" stroke-linejoin="round"/></g>`;
});
add("1f4a0", (t) => `${diamond(t, "blue", 62)}${diamond(t, ["#EAF1FD", "#B4C9F0"], 34, Bs)}<circle cx="50" cy="50" r="7" fill="${C.blueD}"/>`);
add("1f518", (t) => `${disc(t, "white")}<g ${Bs}><circle cx="50" cy="50" r="23" fill="${t.rad(TONE.slate)}"/></g>`);
add("1f533", (t) => `${tile(t, "dark", { rx: 14 })}<g ${Bs}><rect x="20" y="20" width="60" height="60" rx="8" fill="${t.lin(TONE.white, "d")}"/></g>`);
add("1f532", (t) => `${tile(t, "white", { rx: 14 })}<g ${Bs}><rect x="20" y="20" width="60" height="60" rx="8" fill="${t.lin(TONE.dark, "d")}"/></g>`);

export default out;
