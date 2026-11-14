// Parts for symbol emoji: coloured tiles, discs, a stroke font, arrows.
//
//   import { TONE, W, arrow, disc, ink, label, tile } from "../symkit.ts";
//   { u: "1f197", n: "OK button", draw: (t) => tile(t, "blue") + ink(label("OK", { h: 30 })) }
//
// The look of a sign: one tile (rounded square, 86 units) or disc (radius 43) in a tone from TONE,
// with the glyph in W on top, wrapped in ink() so it gets the small bevel. Tones follow meaning:
// blue = information / media / arrows, slate = neutral keys, red = alert / blood type, orange = caution,
// green = yes, purple = belief / zodiac, dark = "black", white = "white".
// Signs that have no tile in Unicode (✔ ➕ ♾ ❗ …) are drawn as chunky stand-alone shapes in a tone
// gradient, never in pure black or white.
import type { Tools } from "./kit.ts";
import { B, Bs, C } from "./kit.ts";

/** Gradient stops, light → dark. Use with lin(TONE.x, "d") or rad(TONE.x). */
export const TONE = {
  blue: ["#A9C1EE", C.blueM, C.blueD],
  slate: ["#A9B6D2", "#7686AE", "#55658F"],
  red: ["#F28B7F", C.redM, C.redD],
  orange: ["#FAC07E", "#EE963F", C.orangeD],
  yellow: ["#FDE690", C.yellowM, C.yellowD],
  green: ["#B4D7A4", C.greenM, C.greenD],
  teal: ["#A9DCD6", C.tealM, C.tealD],
  purple: ["#C8B4EA", "#9478CC", C.purpleD],
  pink: ["#FBCBD5", C.pinkD, "#C5607C"],
  brown: [C.woodL, C.wood, C.woodD],
  dark: ["#7A6D75", C.dark, C.darkD],
  white: [C.paper, C.cream, C.creamD],
  // "white" for a thin stand-alone glyph, which needs more body than a white tile to hold on paper
  chalk: ["#F6ECD6", "#DCCBA4", "#B5A176"],
};

export type Tone = keyof typeof TONE;

/** Glyph colour on a tile. */
export const W = C.paper;

/** Rounded-square tile. o: { size = 86, rx = 18 } */
export const tile = ({ lin }: Pick<Tools, "lin">, tone: Tone = "blue", { size = 86, rx = 18 } = {}): string =>
  `<g ${B}><rect x="${50 - size / 2}" y="${50 - size / 2}" width="${size}" height="${size}" rx="${rx}" fill="${lin(TONE[tone], "d")}"/></g>`;

/** Disc. */
export const disc = ({ rad }: Pick<Tools, "rad">, tone: Tone = "blue", r = 43): string => `<g ${B}><circle cx="50" cy="50" r="${r}" fill="${rad(TONE[tone])}"/></g>`;

/** Wraps glyph markup in the small bevel. Rotations go inside: ink(`<g transform="rotate(…)">…</g>`). */
export const ink = (inner: string): string => `<g ${Bs}>${inner}</g>`;

/** Scales and moves a path made of absolute M L H V C Q A Z commands. */
export function xf(d: string, sx: number, sy: number, ox: number, oy: number): string {
  const f = (v: number) => +v.toFixed(2);
  return d.replace(/([MLHVCQAZ])([^MLHVCQAZ]*)/g, (_: string, c: string, rest: string) => {
    const n = rest.trim().split(/[\s,]+/).filter(Boolean).map(Number);
    if (c === "Z") return "Z";
    if (c === "H") return `H${n.map((x) => f(ox + x * sx)).join(" ")}`;
    if (c === "V") return `V${n.map((y) => f(oy + y * sy)).join(" ")}`;
    if (c === "A") {
      const o: number[] = [];
      for (let i = 0; i < n.length; i += 7) o.push(f(n[i] * sx), f(n[i + 1] * sy), n[i + 2], n[i + 3], n[i + 4], f(ox + n[i + 5] * sx), f(oy + n[i + 6] * sy));
      return `A${o.join(" ")}`;
    }
    return c + n.map((v, i) => f(i % 2 ? oy + v * sy : ox + v * sx)).join(" ");
  });
}

// Stroke font: [width, path]; cap height 10 (y = 0 top … 10 baseline), absolute commands only.
const O = "M4 0 A4 5 0 1 0 4 10 A4 5 0 1 0 4 0Z";
const P = "M0 10 V0 H3.5 A3 3 0 0 1 3.5 6 H0";
export const FONT: Record<string, readonly [width: number, path: string]> = {
  A: [7, "M0 10 L3.5 0 L7 10 M1.3 6.5 H5.7"],
  B: [6.5, "M0 0 V10 M0 0 H3.5 A2.5 2.5 0 0 1 3.5 5 H0 M0 5 H4 A2.5 2.5 0 0 1 4 10 H0"],
  C: [7.2, "M7.06 1.79 A4 5 0 1 0 7.06 8.21"],
  D: [7, "M0 0 V10 H2.5 A4.5 5 0 0 0 2.5 0 H0"],
  E: [6, "M6 0 H0 V10 H6 M0 5 H5"],
  F: [6, "M6 0 H0 V10 M0 5 H5"],
  G: [8, "M7.06 1.79 A4 5 0 1 0 8 5.4 H4.8"],
  H: [7, "M0 0 V10 M7 0 V10 M0 5 H7"],
  I: [0, "M0 0 V10"],
  J: [5, "M5 0 V7 A2.5 3 0 0 1 0 7"],
  K: [6.5, "M0 0 V10 M6.5 0 L0 6 M2.4 3.9 L6.5 10"],
  L: [5.5, "M0 0 V10 H5.5"],
  M: [8.5, "M0 10 V0 L4.25 6.5 L8.5 0 V10"],
  N: [7, "M0 10 V0 L7 10 V0"],
  O: [8, O],
  P: [6.5, P],
  Q: [8, `${O} M5 7 L8 10.4`],
  R: [6.5, `${P} M3 6 L6.5 10`],
  S: [6.5, "M6.3 2 C5.5 0.3 3.9 0 3.2 0 C1.2 0 0.3 1.3 0.3 2.6 C0.3 6 6.4 4 6.4 7.4 C6.4 8.9 5.2 10 3.2 10 C1.6 10 0.5 9.3 0 8"],
  T: [7, "M0 0 H7 M3.5 0 V10"],
  U: [7, "M0 0 V6.5 A3.5 3.5 0 0 0 7 6.5 V0"],
  V: [7, "M0 0 L3.5 10 L7 0"],
  W: [10, "M0 0 L2.5 10 L5 2 L7.5 10 L10 0"],
  X: [7, "M0 0 L7 10 M7 0 L0 10"],
  Y: [7, "M0 0 L3.5 5 L7 0 M3.5 5 V10"],
  Z: [7, "M0 0 H7 L0 10 H7"],
  0: [6.5, "M3.25 0 A3.25 5 0 1 0 3.25 10 A3.25 5 0 1 0 3.25 0Z"],
  1: [3.5, "M0 2.4 L3.5 0 V10"],
  2: [6.5, "M0.3 2.6 C0.5 0.9 1.8 0 3.3 0 C5 0 6.3 1.1 6.3 2.8 C6.3 5 2.5 7 0 10 H6.5"],
  3: [6.5, "M0.4 1.6 C1.1 0.5 2.1 0 3.3 0 C5 0 6.1 1.1 6.1 2.5 C6.1 4 4.9 4.8 3 4.8 C5.1 4.8 6.5 5.7 6.5 7.3 C6.5 8.9 5.2 10 3.3 10 C1.8 10 0.6 9.4 0 8.2"],
  4: [7, "M5.2 10 V0 L0 7 H7"],
  5: [6.5, "M6 0 H1.2 L0.6 4.6 C1.4 3.9 2.3 3.6 3.3 3.6 C5.2 3.6 6.5 4.9 6.5 6.8 C6.5 8.7 5.2 10 3.2 10 C1.8 10 0.6 9.4 0 8.3"],
  6: [6.5, "M5.8 0.9 C5 0.3 4.3 0 3.6 0 C1.4 0 0 2.4 0 6 C0 8.6 1.2 10 3.3 10 C5.2 10 6.5 8.7 6.5 6.9 C6.5 5.1 5.2 3.9 3.4 3.9 C1.8 3.9 0.5 4.9 0 6.4"],
  7: [6.5, "M0 0 H6.5 L2.4 10"],
  8: [6.5, "M3.25 4.7 C1.6 4.7 0.6 3.7 0.6 2.4 C0.6 1 1.7 0 3.25 0 C4.8 0 5.9 1 5.9 2.4 C5.9 3.7 4.9 4.7 3.25 4.7 C1.3 4.7 0 5.8 0 7.4 C0 8.9 1.3 10 3.25 10 C5.2 10 6.5 8.9 6.5 7.4 C6.5 5.8 5.2 4.7 3.25 4.7Z"],
  9: [6.5, "M0.7 9.1 C1.5 9.7 2.2 10 2.9 10 C5.1 10 6.5 7.6 6.5 4 C6.5 1.4 5.3 0 3.2 0 C1.3 0 0 1.3 0 3.1 C0 4.9 1.3 6.1 3.1 6.1 C4.7 6.1 6 5.1 6.5 3.6"],
  "!": [0, "M0 0 V6.2 M0 9.8 V10"],
  "?": [5.5, "M0 2.4 C0.2 0.9 1.3 0 2.8 0 C4.4 0 5.5 1 5.5 2.5 C5.5 4.6 2.8 4.6 2.8 6.6 M2.8 9.8 V10"],
  "#": [7, "M2.6 0 L1.6 10 M5.6 0 L4.6 10 M0.3 3.3 H7 M0 6.7 H6.7"],
  "*": [6, "M3 1.5 V8.5 M0 3.2 L6 6.8 M6 3.2 L0 6.8"],
  "+": [6, "M3 2 V8 M0 5 H6"],
  "-": [5, "M0 5 H5"],
  "%": [6, "M0.4 10 L5.6 0 M0 1.7 A1.5 1.7 0 1 0 3 1.7 A1.5 1.7 0 1 0 0 1.7 M3 8.3 A1.5 1.7 0 1 0 6 8.3 A1.5 1.7 0 1 0 3 8.3"],
  a: [5, "M5 7 A2.5 3 0 1 1 0 7 A2.5 3 0 1 1 5 7 M5 4 V10"],
  b: [5, "M0 0 V10 M0 7 A2.5 3 0 1 1 5 7 A2.5 3 0 1 1 0 7"],
  c: [4.8, "M4.55 5.28 A2.5 3 0 1 0 4.55 8.72"],
  d: [5, "M5 0 V10 M5 7 A2.5 3 0 1 0 0 7 A2.5 3 0 1 0 5 7"],
  i: [0, "M0 4.2 V10 M0 0.4 V0.6"],
};

/**
 * A word in the stroke font, centred on (cx, cy). h = cap height; the word is squeezed sideways
 * when wider than maxW. Returns one <path>; wrap it in ink().
 * o: { cx = 50, cy = 50, h = 30, maxW = 62, sw = stroke width, gap = 0.24 (× h), color = W }
 */
export interface LabelOptions {
  cx?: number;
  cy?: number;
  /** cap height */
  h?: number;
  maxW?: number;
  /** stroke width; default follows the height */
  sw?: number;
  /** space between letters, × h */
  gap?: number;
  color?: string;
}

export function label(str: string | number, { cx = 50, cy = 50, h = 30, maxW = 62, sw, gap = 0.24, color = W }: LabelOptions = {}): string {
  const s = h / 10;
  const gs = [...String(str)].map((ch) => FONT[ch] ?? FONT["-"]);
  const width = sw ?? Math.max(3, h * 0.17);
  // letters never touch: the gap is at least the stroke plus some air, and only the letters are squeezed
  const g = Math.max(gap * h, width + 2.6);
  const raw = gs.reduce((a, [gw]) => a + gw * s, 0);
  const room = maxW - g * (gs.length - 1);
  const k = raw > room ? room / raw : 1;
  let x = cx - (raw * k + g * (gs.length - 1)) / 2;
  const d = gs
    .map(([gw, p]) => {
      const out = xf(p, s * k, s, x, cy - h / 2);
      x += gw * s * k + g;
      return out;
    })
    .join(" ");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${+width.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const ARROW = "M50 19 L76 48 H60 V80 H40 V48 H24Z";
const ARROW2 = "M50 13 L71 37 H58.5 V63 H71 L50 87 L29 63 H41.5 V37 H29Z";

/**
 * Straight block arrow. deg: 0 = up, 90 = right, 45 = up-right …; two = double-headed.
 * o: { cx = 50, cy = 50, s = 1 (scale), color = W }. Already rotated: wrap in ink().
 */
export const arrow = (deg = 0, { cx = 50, cy = 50, s = 1, color = W, two = false } = {}) =>
  `<g transform="translate(${cx} ${cy}) rotate(${deg}) scale(${s}) translate(-50 -50)"><path d="${two ? ARROW2 : ARROW}" fill="${color}" stroke="${color}" stroke-width="5" stroke-linejoin="round"/></g>`;

/** Arrow head (triangle) with its tip at (x, y), pointing along deg (0 = up, 90 = right). */
export const head = (x: number, y: number, deg: number, { s = 10, color = W } = {}) =>
  `<path transform="translate(${x} ${y}) rotate(${deg})" d="M0 0 L${s} ${s * 1.25} H${-s}Z" fill="${color}" stroke="${color}" stroke-width="${+(s * 0.36).toFixed(1)}" stroke-linejoin="round"/>`;

/** Stroked line for curved arrows and loops. */
export const line = (d: string, { sw = 8, color = W } = {}) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

/**
 * Arc with an arrow head at its end. Angles in degrees, 0 = top, clockwise; a1 < a0 runs counter-clockwise.
 */
export function arcArrow(cx: number, cy: number, r: number, a0: number, a1: number, { sw = 8, hs = 9, color = W } = {}) {
  const pt = (a: number, q = r): [number, number] => [cx + q * Math.sin((a * Math.PI) / 180), cy - q * Math.cos((a * Math.PI) / 180)];
  const cw = a1 > a0;
  const lead = ((hs * 1.25) / r) * (180 / Math.PI); // the head covers this much of the arc
  const end = a1 - (cw ? lead : -lead);
  const [x0, y0] = pt(a0);
  const [x1, y1] = pt(end);
  const [tx, ty] = pt(a1);
  const large = Math.abs(end - a0) > 180 ? 1 : 0;
  // head direction: along the chord from the arc end to the tip
  const deg = (Math.atan2(tx - x1, -(ty - y1)) * 180) / Math.PI;
  return `${line(`M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} ${cw ? 1 : 0} ${x1.toFixed(2)} ${y1.toFixed(2)}`, { sw, color })}${head(+tx.toFixed(2), +ty.toFixed(2), +deg.toFixed(1), { s: hs, color })}`;
}
