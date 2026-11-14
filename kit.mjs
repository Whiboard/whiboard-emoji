// Shared kit for the Whiboard emoji set: palette, filters, gradient helpers.
//
// A batch file (batches/<name>.mjs) exports an array of icons:
//
//   import { B, Bs, C, star } from "../kit.mjs";
//   export default [
//     { u: "1f453", n: "glasses", draw: ({ lin, rad, clip }) => `<g ${B}>…</g>` },
//   ];
//
//   u     the picker's "unified" id, copied exactly from the assignment (e.g. "270f-fe0f")
//   n     English name
//   draw  returns the SVG body for a 100×100 viewBox (no <svg>, no <defs>)
//
// STYLE (soft storybook / watercolour objects, lit from the top-left)
//  - Fill the box: the larger side of the painted shape spans 84–92 units, centred on (50,50),
//    nothing outside 3…97. Long thin things (pen, ruler, tools) lie on a diagonal to fill it.
//  - One clear silhouette that still reads at 40 px. 6–25 shapes per icon; no tiny detail.
//  - Colours from C below (muted, warm). Light → dark gradients run top → bottom or
//    top-left → bottom-right: lin([light, mid, dark]) / lin([...], "d") / rad([...]).
//    Cylinders and metal: lin([dark, mid, highlight, mid, dark], "h").
//  - Icons sit on a dark keyboard (#1b1b1a) AND on light paper (#f4f1ea): nothing may be
//    near-black or near-white over a large area. "Black" things use C.dark / C.navy / "#5F6B8F",
//    "white" things use C.paper → C.creamD gradients. Glass = translucent fill + a light stroke.
//  - Every solid part goes in a bevel group: <g ${B}>…</g> (big parts) or <g ${Bs}>…</g>
//    (small parts, thin strokes). The bevel adds the rim light and the soft shade, so do not
//    draw outlines. Parts that should look separate get their own bevel group.
//  - Bevel groups must sit OUTSIDE any rotate / scale / mirror, or the light turns with it:
//    <g ${B}><g transform="rotate(-45 50 50)">…</g></g>, never the other way round.
//  - Flat detail on top of a part (lines, dots, labels, glyphs) stays outside bevel groups.
//
// RULES (check.mjs enforces them)
//  - No <text> (fonts differ per machine): letters and digits are stroke paths.
//  - No <image>, <use>, <style>, <script>, <foreignObject>, class=, style=, href=, id=.
//    Gradients and clip paths come only from lin() / rad() / clip(), which make unique ids.
//  - objectBoundingBox gradients break on a perfectly straight line (zero-width box):
//    give straight strokes a plain colour.
//  - Body ≤ 4 KB.

export const C = {
  cream: "#F7EEDB", creamD: "#D9C9A3", paper: "#FCF6E8", paperD: "#E4D7B8",
  woodL: "#E6BA85", wood: "#C48C55", woodD: "#935F34", woodDD: "#6B4324",
  gold: "#F6CF5E", goldM: "#E2AC36", goldD: "#B47E1E",
  red: "#EA6A60", redM: "#D04A44", redD: "#A2302E",
  pink: "#F7B6C4", pinkD: "#DF839B",
  blue: "#8FACE6", blueM: "#6A8BD0", blueD: "#4764AA", navy: "#44568F", navyD: "#2F3C68",
  green: "#9AC48C", greenM: "#6FA263", greenD: "#487745",
  yellow: "#FBDA6A", yellowM: "#F1BE40", yellowD: "#D49828",
  metalL: "#F0F3F6", metal: "#BEC5CE", metalD: "#828A97", metalDD: "#5A616D",
  dark: "#5A4F56", darkD: "#3A3237",
  purple: "#AC92DA", purpleD: "#7659B2",
  teal: "#86C8C2", tealM: "#55A39E", tealD: "#377B77",
  orange: "#F5A95C", orangeD: "#D47F2E",
  sky: "#C6E4F4", skyD: "#93C4E2",
};

/** Bevel for big parts. */
export const B = 'filter="url(#sk-bv)"';
/** Bevel for small parts and thin strokes. */
export const Bs = 'filter="url(#sk-bvs)"';

// rim light (top-left) + soft shade (bottom-right) + painterly grain; all in user units
export const FILTERS = `
<filter id="sk-bv" filterUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120" color-interpolation-filters="sRGB">
<feOffset in="SourceAlpha" dx="1.5" dy="1.8" result="o1"/><feComposite in="SourceAlpha" in2="o1" operator="out" result="hl"/>
<feGaussianBlur in="hl" stdDeviation="1.1" result="hlb"/><feFlood flood-color="#FFF8E4" flood-opacity=".6" result="hf"/><feComposite in="hf" in2="hlb" operator="in" result="hlc"/>
<feOffset in="SourceAlpha" dx="-2.2" dy="-2.6" result="o2"/><feComposite in="SourceAlpha" in2="o2" operator="out" result="sh"/>
<feGaussianBlur in="sh" stdDeviation="1.5" result="shb"/><feFlood flood-color="#3A1C10" flood-opacity=".36" result="sf"/><feComposite in="sf" in2="shb" operator="in" result="shc"/>
<feComposite in="shc" in2="SourceGraphic" operator="atop" result="a1"/><feComposite in="hlc" in2="a1" operator="atop"/>
</filter>
<filter id="sk-bvs" filterUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120" color-interpolation-filters="sRGB">
<feOffset in="SourceAlpha" dx=".8" dy="1" result="o1"/><feComposite in="SourceAlpha" in2="o1" operator="out" result="hl"/>
<feGaussianBlur in="hl" stdDeviation=".6" result="hlb"/><feFlood flood-color="#FFF8E4" flood-opacity=".55" result="hf"/><feComposite in="hf" in2="hlb" operator="in" result="hlc"/>
<feOffset in="SourceAlpha" dx="-1.1" dy="-1.4" result="o2"/><feComposite in="SourceAlpha" in2="o2" operator="out" result="sh"/>
<feGaussianBlur in="sh" stdDeviation=".8" result="shb"/><feFlood flood-color="#3A1C10" flood-opacity=".32" result="sf"/><feComposite in="sf" in2="shb" operator="in" result="shc"/>
<feComposite in="shc" in2="SourceGraphic" operator="atop" result="a1"/><feComposite in="hlc" in2="a1" operator="atop"/>
</filter>
<filter id="sk-tx" filterUnits="userSpaceOnUse" x="-6" y="-6" width="112" height="112" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="3" seed="11" result="n1"/>
<feColorMatrix in="n1" type="matrix" values="2.6 0 0 0 -.8  2.6 0 0 0 -.8  2.6 0 0 0 -.8  0 0 0 0 .3" result="c1"/>
<feComposite in="c1" in2="SourceAlpha" operator="in" result="g1"/><feBlend in="g1" in2="SourceGraphic" mode="soft-light" result="b1"/>
<feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="2" seed="5" result="n2"/>
<feColorMatrix in="n2" type="matrix" values="1.9 0 0 0 -.45  1.9 0 0 0 -.45  1.9 0 0 0 -.45  0 0 0 0 .2" result="c2"/>
<feComposite in="c2" in2="SourceAlpha" operator="in" result="g2"/><feBlend in="g2" in2="b1" mode="soft-light"/>
</filter>`;

/** Per-icon helpers; `key` prefixes every generated id. */
export function tools(key) {
  const defs = [];
  let n = 0;
  const id = () => `${key}-${(n++).toString(36)}`;
  const stops = (arr) =>
    arr
      .map((s, i) => {
        const [o, c, a] = Array.isArray(s) ? s : [arr.length === 1 ? 0 : i / (arr.length - 1), s];
        return `<stop offset="${+(+o).toFixed(3)}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`;
      })
      .join("");
  const DIR = { v: [0, 0, 0, 1], h: [0, 0, 1, 0], d: [0, 0, 1, 1], u: [0, 1, 1, 0] };
  /** Linear gradient. arr = colours, or [offset, colour, opacity?] stops. dir: v ↓, h →, d ↘, u ↗. */
  const lin = (arr, dir = "v") => {
    const i = id();
    const [x1, y1, x2, y2] = DIR[dir];
    defs.push(`<linearGradient id="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops(arr)}</linearGradient>`);
    return `url(#${i})`;
  };
  /** Radial gradient, centre → edge; the default centre is the top-left light spot. */
  const rad = (arr, cx = 0.36, cy = 0.3, r = 0.8) => {
    const i = id();
    defs.push(`<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${r}">${stops(arr)}</radialGradient>`);
    return `url(#${i})`;
  };
  /** Clip path from SVG markup; returns the whole attribute: <g ${clip('<circle …/>')}>. */
  const clip = (inner) => {
    const i = id();
    defs.push(`<clipPath id="${i}">${inner}</clipPath>`);
    return `clip-path="url(#${i})"`;
  };
  return { lin, rad, clip, defs };
}

/** Points of a star polygon. */
export const star = (cx, cy, R, r, n = 5) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const q = i % 2 ? r : R;
    return `${(cx + q * Math.cos(a)).toFixed(2)},${(cy + q * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

/** Stable id of an icon: its unified code, else its key. */
export const iconId = (ic) => ic.u ?? ic.key;

/** Runs an icon's draw() → { defs, body }. */
export function render(ic) {
  const t = tools(`e${iconId(ic)}`);
  const body = String(ic.draw(t)).trim();
  return { defs: t.defs.join(""), body };
}

/** Markup for inlining many icons in one page (filters defined once per page). */
export const inlineSvg = (r) => `<svg viewBox="0 0 100 100"><defs>${r.defs}</defs><g filter="url(#sk-tx)">${r.body}</g></svg>`;

/** A self-contained .svg file. */
export const fileSvg = (r, title, size = 256) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"><title>${title.replace(/[<&>]/g, "")}</title><defs>${FILTERS}${r.defs}</defs><g filter="url(#sk-tx)">${r.body}</g></svg>\n`;

export const emojiChar = (u) => String.fromCodePoint(...u.split("-").map((h) => Number.parseInt(h, 16)));
