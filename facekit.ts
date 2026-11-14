// Parts for face emoji. Every face is the same head with parts from this file, so the whole
// family reads as one character:
//
//   import { blush, both, brow, drop, eye, head, left, mouth, right } from "../facekit.ts";
//   { u: "1f622", n: "crying face", draw: (t) =>
//       head(t) + both(eye.dot) + both(brow, { tilt: -5 }) + mouth.curve({ y: 74, w: 11, d: -5 }) + drop(t, 33, 61) }
//
// Geometry: the head is a disc of radius 43 on (50,50). Eyes sit at x = 50 ± 15, y = 41; the mouth
// is centred on x = 50 around y = 66. Keep these unless the emoji itself moves them (a tilted or
// upside-down face, a face looking sideways).
//
// Rules for a face:
//  - Features are flat INK on the head; they do not go in bevel groups. Things that stand off the
//    face (tears, tongue, hearts, glasses, hats, hands, horns) do get the small bevel (Bs).
//  - Use a part from here whenever one fits, with its options; write a new part in your batch file
//    only when none fits, in the same line weight (3.8) and the same colours.
//  - The head colour carries meaning: SKIN.yellow by default, another tone only when the emoji is
//    defined by it (red with rage, green with nausea, blue with cold, purple imp).
import type { Stop, Tools } from "./kit.ts";
import { B, Bs, star } from "./kit.ts";

/** Eyes, brows, mouth lines. */
export const INK = "#6B4324";
/** Inside of an open mouth. */
export const MOUTH = "#7C3A2B";
export const TEETH = "#FFF9EC";
export const TONGUE = "#F28E8C";
export const HEART = "#E4534E";
/** Gradient stops for tears, sweat, drool: lin(WATER). */
export const WATER = ["#E6F5FD", "#9CCBEF", "#5E97D2"];
/** Head tones, centre → rim: rad(SKIN.x, 0.38, 0.32, 0.75). */
export const SKIN = {
  yellow: ["#FFEB96", "#FBD45E", "#F0B43C", "#DC962C"],
  red: ["#F7A08E", "#EA6A5A", "#D04A44", "#B0362F"],
  hot: ["#FBC08A", "#F58E5A", "#E8623F", "#C94A30"],
  green: ["#DDE9A0", "#B5CF74", "#8EB257", "#6F9644"],
  blue: ["#D8EEFB", "#A3CFF0", "#78AEE0", "#5A8FCB"],
  purple: ["#D2BEF0", "#AC92DA", "#8A6CC4", "#6D50A6"],
};

export type Skin = keyof typeof SKIN;

export const EX = 15;
export const EY = 41;

/** The head. tone: a key of SKIN or an array of stops. */
export const head = ({ rad }: Pick<Tools, "rad">, tone: Skin | readonly Stop[] = "yellow", r = 43): string =>
  `<g ${B}><circle cx="50" cy="50" r="${r}" fill="${rad(typeof tone === "string" ? SKIN[tone] : tone, 0.38, 0.32, 0.75)}"/></g>`;

/** A feature line in the face's line weight. */
export const ln = (d: string, sw = 3.8, color: string = INK): string => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Which side of the face a part is drawn on: -1 left, 1 right. */
export type Side = -1 | 1;
/** An eye part or a brow: draws itself at (x, y) with its own options. */
export type Part<O> = (x: number, y: number, side: Side, o?: O) => string;
/** Where both() / left() / right() put a part: eye distance from the middle, eye line. */
interface At {
  dx?: number;
  y?: number;
}

/** Draws an eye part or a brow on both sides: both(eye.dot), both(eye.wide, { y: 43, dx: 17, r: 10 }). */
export const both = <O extends object>(part: Part<O>, o: O & At = {} as O & At): string => left(part, o) + right(part, o);
export const left = <O extends object>(part: Part<O>, o: O & At = {} as O & At): string => part(50 - (o.dx ?? EX), o.y ?? EY, -1, o);
export const right = <O extends object>(part: Part<O>, o: O & At = {} as O & At): string => part(50 + (o.dx ?? EX), o.y ?? EY, 1, o);

const r2 = (v: number): number => +v.toFixed(2);

/** Eye parts: (x, y, side, options). Call them through both() / left() / right(). */
export const eye = {
  /** plain dark oval with a light dot. { rx, ry } */
  dot: (x: number, y: number, _s: Side, { rx = 4.7, ry = 6.8 } = {}) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${INK}"/><circle cx="${r2(x - rx * 0.3)}" cy="${r2(y - ry * 0.42)}" r="${r2(rx * 0.3)}" fill="#fff" opacity=".8"/>`,
  /** happy closed eye, an arch ∩. { w, h } */
  arch: (x: number, y: number, _s: Side, { w = 7.5, h = 6, sw = 3.8 } = {}) => ln(`M${x - w} ${r2(y + h * 0.5)} Q${x} ${r2(y - h * 1.4)} ${x + w} ${r2(y + h * 0.5)}`, sw),
  /** calm closed eye, a bowl ∪. { w, h } */
  bowl: (x: number, y: number, _s: Side, { w = 7.5, h = 5, sw = 3.8 } = {}) => ln(`M${x - w} ${r2(y - h * 0.3)} Q${x} ${r2(y + h * 1.3)} ${x + w} ${r2(y - h * 0.3)}`, sw),
  /** flat line. { w } */
  line: (x: number, y: number, _s: Side, { w = 7, sw = 3.8 } = {}) => ln(`M${x - w} ${y} H${x + w}`, sw),
  /** squeezed shut: > on the left, < on the right. { w, h } */
  squeeze: (x: number, y: number, s: Side, { w = 7, h = 6, sw = 3.8 } = {}) => ln(`M${x + s * w} ${y - h} L${r2(x - s * w * 0.7)} ${y} L${x + s * w} ${y + h}`, sw),
  /** crossed out ×. { r } */
  cross: (x: number, y: number, _s: Side, { r = 5.5, sw = 3.8 } = {}) => ln(`M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`, sw),
  /** wide open: a white ball with a pupil; look = [dx, dy] moves the pupil. { r, p, look } */
  wide: (x: number, y: number, _s: Side, { r = 9.5, p = 4.6, look = [0, 0] } = {}) =>
    `<g ${Bs}><circle cx="${x}" cy="${y}" r="${r}" fill="${TEETH}"/></g><circle cx="${x + look[0]}" cy="${y + look[1]}" r="${p}" fill="${INK}"/><circle cx="${r2(x + look[0] - p * 0.3)}" cy="${r2(y + look[1] - p * 0.35)}" r="${r2(p * 0.3)}" fill="#fff" opacity=".8"/>`,
  /** heart for an eye. { size } */
  heart: (x: number, y: number, _s: Side, { size = 20 } = {}) => `<g ${Bs}><path d="${heartPath(x, y, size)}" fill="${HEART}"/></g>`,
  /** star for an eye. { R } */
  star: (x: number, y: number, _s: Side, { R = 11 } = {}) => `<g ${Bs}><polygon points="${star(x, y, R, R * 0.48)}" fill="#F3922E" stroke="#F3922E" stroke-width="2" stroke-linejoin="round"/></g>`,
};

/**
 * Eyebrow, used like an eye part: both(brow, { tilt: 6 }).
 * tilt > 0 angry (inner end low), tilt < 0 worried (inner end high); arch lifts the middle;
 * by = distance above the eye line.
 */
export const brow = (x: number, y: number, s: Side, { by = 13, w = 7.5, tilt = 0, arch = 2.5, sw = 3.4 } = {}) =>
  ln(`M${x + s * w} ${r2(y - by - tilt * 0.5)} Q${x} ${r2(y - by - arch)} ${x - s * w} ${r2(y - by + tilt * 0.5)}`, sw);

/** Mouths, centred on x = 50 (shift with cx). */
export const mouth = {
  /** curved line: d > 0 smiles, d < 0 frowns (then give a lower y). { y, w, d, cx } */
  curve: ({ y = 65, w = 17, d = 9, sw = 3.8, cx = 50 } = {}) => ln(`M${cx - w} ${y} Q${cx} ${y + d * 2} ${cx + w} ${y}`, sw),
  /** flat line. { y, w, cx } */
  flat: ({ y = 68, w = 12, sw = 3.8, cx = 50 } = {}) => ln(`M${cx - w} ${y} H${cx + w}`, sw),
  /** laughing mouth, flat on top and round below; needs the tools: mouth.open(t, { y, w, d, teeth, tongue }) */
  open: ({ clip }: Pick<Tools, "clip">, { y = 57, w = 23, d = 24, teeth = true, tongue = true, cx = 50 } = {}) => {
    const shape = `M${cx - w} ${y} Q${cx} ${y + 3} ${cx + w} ${y} C${cx + w} ${r2(y + d * 0.72)} ${r2(cx + w * 0.55)} ${y + d} ${cx} ${y + d} C${r2(cx - w * 0.55)} ${y + d} ${cx - w} ${r2(y + d * 0.72)} ${cx - w} ${y}Z`;
    return `<path d="${shape}" fill="${MOUTH}"/><g ${clip(`<path d="${shape}"/>`)}>${teeth ? `<rect x="${cx - w}" y="${y - 2}" width="${w * 2}" height="${r2(d * 0.3 + 3)}" fill="${TEETH}"/>` : ""}${tongue ? `<ellipse cx="${cx}" cy="${r2(y + d * 1.04)}" rx="${r2(w * 0.6)}" ry="${r2(d * 0.4)}" fill="${TONGUE}"/>` : ""}</g>`;
  },
  /** round open mouth of surprise. { y, rx, ry, cx } */
  oh: ({ y = 70, rx = 7.5, ry = 9.5, cx = 50 } = {}) => `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="${MOUTH}"/>`,
  /** grimace: a bar of clenched teeth. { y, w, h } */
  teeth: ({ y = 67, w = 18, h = 12, cx = 50 } = {}) =>
    `<rect x="${cx - w}" y="${y - h / 2}" width="${w * 2}" height="${h}" rx="${r2(h * 0.42)}" fill="${TEETH}" stroke="${INK}" stroke-width="2.8"/><path d="M${cx - w + 2} ${y} H${cx + w - 2} M${cx} ${y - h / 2} V${y + h / 2} M${r2(cx - w / 2)} ${y - h / 2} V${y + h / 2} M${r2(cx + w / 2)} ${y - h / 2} V${y + h / 2}" stroke="${INK}" stroke-width="1.5" opacity=".55"/>`,
  /** wavy line: dizzy, woozy, confounded. { y, w, a } */
  wavy: ({ y = 68, w = 16, a = 3.5, sw = 3.8, cx = 50 } = {}) => ln(`M${cx - w} ${y} q${w / 4} ${-a * 2} ${w / 2} 0 t${w / 2} 0 t${w / 2} 0 t${w / 2} 0`, sw),
  /** tongue sticking out; draw it after the mouth it hangs from. { y, w, h, cx } */
  tongue: ({ y = 70, w = 7.5, h = 13, cx = 50 } = {}) =>
    `<g ${Bs}><path d="M${cx - w} ${y} H${cx + w} V${y + h - w} A${w} ${w} 0 0 1 ${cx - w} ${y + h - w}Z" fill="${TONGUE}"/></g><path d="M${cx} ${y + 1.5} V${r2(y + h * 0.55)}" stroke="#C9595C" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`,
};

/** Rosy cheeks. { y, dx, rx, ry, o } */
export const blush = ({ y = 58, dx = 26, rx = 7.5, ry = 4.8, o = 0.5 } = {}) =>
  [50 - dx, 50 + dx].map((x) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#F0786E" opacity="${o}"/>`).join("");

/** Water drop, point up, centred on (x, y): tear, sweat, drool. { s = scale, rot = degrees } */
export const drop = ({ lin }: Pick<Tools, "lin">, x: number, y: number, { s = 1, rot = 0 } = {}) =>
  `<g ${Bs}><path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 -10 C4.5 -3.5 7 0.5 7 4 A7 7 0 0 1 -7 4 C-7 0.5 -4.5 -3.5 0 -10Z" fill="${lin(WATER)}"/></g>`;

/** Heart outline centred on (cx, cy), `size` units wide; fill it yourself. */
export function heartPath(cx: number, cy: number, size: number): string {
  const k = size / 86;
  const p = (x: number, y: number) => `${r2(cx + (x - 50) * k)} ${r2(cy + (y - 50) * k)}`;
  return `M${p(50, 89)} C${p(16, 63)} ${p(3, 44)} ${p(8, 27)} C${p(14, 9)} ${p(39, 7)} ${p(50, 28)} C${p(61, 7)} ${p(86, 9)} ${p(92, 27)} C${p(97, 44)} ${p(84, 63)} ${p(50, 89)}Z`;
}
