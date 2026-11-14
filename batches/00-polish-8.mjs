// Polish 8: biohazard, two prohibition signs, baby sign, six Japanese buttons.
import { B, Bs, C } from "../kit.mjs";
import { TONE, W, disc, ink, line, tile } from "../symkit.mjs";

const out = [];
const add = (u, n, draw) => out.push({ u, n, draw });
const D = C.dark;
const pol = (r, a, cx = 50, cy = 50) => [+(cx + r * Math.cos((a * Math.PI) / 180)).toFixed(2), +(cy + r * Math.sin((a * Math.PI) / 180)).toFixed(2)];

// ── biohazard: three crescent horns, centre ring, broken outer ring ───────────────────────────
function crescent(a, d1, R1, d2, R2) {
  const [x1, y1] = pol(d1, a);
  const [x2, y2] = pol(d2, a);
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const al = (R1 * R1 - R2 * R2 + d * d) / (2 * d);
  const h = Math.sqrt(R1 * R1 - al * al);
  const mx = x1 + (al * dx) / d, my = y1 + (al * dy) / d;
  const p1 = [mx + (h * dy) / d, my - (h * dx) / d];
  const p2 = [mx - (h * dy) / d, my + (h * dx) / d];
  const f = (p) => p.map((v) => +v.toFixed(2)).join(" ");
  return `M${f(p1)} A${R1} ${R1} 0 1 0 ${f(p2)} A${R2} ${R2} 0 0 1 ${f(p1)}Z`;
}
add("2623-fe0f", "biohazard", (t) => {
  const A = [-90, 30, 150];
  const horns = A.map((a) => `<path d="${crescent(a, 23, 14.5, 29, 11.5)}" fill="${C.darkD}"/>`).join("");
  const tails = A.map((a) => { const [x0, y0] = pol(6, a), [x1, y1] = pol(15, a); return line(`M${x0} ${y0} L${x1} ${y1}`, { sw: 5, color: C.darkD }); }).join("");
  const ring = A.map((a) => {
    const [x0, y0] = pol(33, a + 44), [x1, y1] = pol(33, a + 76);
    return line(`M${x0} ${y0} A33 33 0 0 1 ${x1} ${y1}`, { sw: 4.4, color: C.darkD });
  }).join("");
  return disc(t, "orange") + ink(horns + tails + ring + `<circle cx="50" cy="50" r="5" fill="none" stroke="${C.darkD}" stroke-width="4.4"/>`);
});

// ── prohibition signs ────────────────────────────────────────────────────────────────────────
const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -49)">${inner}</g>`;
const pg = (inner, s = 0.6, dx = 0, dy = 0) => `<g transform="translate(${50 + dx} ${50 + dy}) scale(${s}) translate(-50 -50)">${inner}</g>`;
const prohib = (t, pict) =>
  `<g ${B}><circle cx="50" cy="50" r="43" fill="${t.lin([C.paper, C.paperD], "d")}"/></g>${ink(pict)}${ink(`<circle cx="50" cy="50" r="35.5" fill="none" stroke="${C.redM}" stroke-width="9"/>${line("M25 25 L75 75", { sw: 9, color: C.redM })}`)}`;

// tap: handle on top, pipe, spout down, drop (same tap as potable water, dark)
const tap = (col) =>
  line("M28 22 H64 M46 22 V38", { sw: 9, color: col }) +
  `<path d="M14 40 H76 V66 H58 V56 H14Z" fill="${col}" stroke="${col}" stroke-width="6" stroke-linejoin="round"/>` +
  `<path d="M67 73 C60 80 58 84 58 86 A9 9 0 0 0 76 86 C76 84 74 80 67 73Z" fill="${col}"/>`;
add("1f6b1", "non-potable water", (t) => prohib(t, pg(tap(D), 0.7, 1, -4)));

// one figure dropping one piece
add("1f6af", "no littering", (t) => {
  const fig =
    `<circle cx="34" cy="16" r="10" fill="${D}"/><rect x="21" y="31" width="26" height="36" rx="11" fill="${D}"/>` +
    line("M25 38 V62", { sw: 8, color: D }) + line("M43 38 L62 49", { sw: 8, color: D }) +
    line("M29 66 V88 M40 66 V88", { sw: 11, color: D });
  return prohib(t, pg(fig + `<rect x="66" y="62" width="15" height="15" rx="4" fill="${D}" transform="rotate(20 73 69)"/>`, 0.68, 0, -2));
});

// ── baby sign ────────────────────────────────────────────────────────────────────────────────
add("1f6bc", "baby symbol", (t) =>
  tile(t, "blue") +
  ink(
    `<circle cx="50" cy="27" r="13" fill="${W}"/>` +
      line("M46 15 Q52 12 55 17", { sw: 3, color: C.blueM }) +
      line("M35 49 L19 40 M65 49 L81 40", { sw: 8 }) +
      line("M41 68 L30 83 M59 68 L70 83", { sw: 9 }) +
      `<rect x="33" y="42" width="34" height="34" rx="14" fill="${W}"/>` +
      line("M34 58 H66", { sw: 3, color: C.blueM }),
  ),
);

// ── Japanese buttons ─────────────────────────────────────────────────────────────────────────
const kj = (strokes, sw, k = 1) => ink(`<g transform="translate(50 50) scale(${k}) translate(-50 -50)">${line(strokes.join(" "), { sw: sw / k })}</g>`);
const jp = (u, n, tone, strokes, sw, shape = tile, k = 1) => add(u, n, (t) => shape(t, tone) + kj(strokes, sw, k));

// 指  扌 + 旨 (匕 over 日)
jp("1f22f", "reserved", "green", [
  "M14 38 H38", "M27 18 V78 Q27 84 19 82", "M14 62 L38 48",
  "M64 12 L52 32", "M52 30 H76 V40 Q76 43 71 43",
  "M52 52 H80 V84 H52Z", "M52 68 H80",
], 4.8);
// 得  彳 + 日 / 一 / 寸
jp("1f250", "bargain", "red", [
  "M34 12 L18 28", "M34 34 L18 50", "M28 46 V86",
  "M50 14 H80 V36 H50Z", "M50 25 H80", "M46 46 H86",
  "M46 60 H86", "M66 46 V82 Q66 88 58 86", "M76 70 L80 77",
], 4.6);
// 祝  礻 + 兄 (口 over 儿)
jp("3297-fe0f", "congratulations", "red", [
  "M24 14 L31 22", "M14 34 H36 L20 50", "M26 40 V86", "M33 58 L38 66",
  "M50 16 H80 V40 H50Z",
  "M58 50 V72 Q58 82 48 86", "M74 50 V78 Q74 86 84 84",
], 5, disc, 0.84);
// 秘  禾 + 必
jp("3299-fe0f", "secret", "red", [
  "M38 12 L20 22", "M14 36 H42", "M28 24 V86", "M28 48 C26 58 22 64 14 68", "M30 48 C33 58 39 64 46 68",
  "M54 58 L58 68", "M65 48 V72 Q65 84 78 82", "M72 44 L75 52", "M82 56 L86 64",
  "M84 14 C78 32 68 46 54 52",
], 4.8, disc, 0.8);
// 営  ⺍ / 冖 / 呂
jp("1f23a", "open for business", "orange", [
  "M32 12 L38 22", "M50 10 V22", "M68 12 L62 22",
  "M20 40 V32 H80 V40",
  "M34 46 H66 V62 H34Z", "M34 68 H66 V84 H34Z",
], 4.6, tile, 0.94);
// 満  氵 + 艹 / 両
jp("1f235", "no vacancy", "red", [
  "M24 14 L30 21", "M20 34 L26 41", "M32 56 L18 78",
  "M44 22 H86", "M57 12 V30", "M73 12 V30",
  "M46 38 H86", "M50 38 V82", "M82 38 V80 Q82 87 74 86",
  "M57 48 V70 H73 V48", "M65 44 V76",
], 4.2);

export default out;
