// Smileys 3: accessory, worried, shocked, sad, tired and devil faces. Built from facekit.ts.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";
import { INK, MOUTH, SKIN, TEETH, WATER, blush, both, brow, drop, eye, head, left, ln, mouth, right } from "../facekit.ts";

const arch = ({ clip }, { y = 74, w = 15, h = 12, teeth = false, tongue = false, cx = 50 } = {}) => {
  const s = `M${cx - w} ${y} Q${cx} ${y - h * 1.7} ${cx + w} ${y} Q${cx} ${y + 3} ${cx - w} ${y}Z`;
  return `<path d="${s}" fill="${MOUTH}"/><g ${clip(`<path d="${s}"/>`)}>${teeth ? `<rect x="${cx - w}" y="${y - h}" width="${w * 2}" height="${h * 0.45}" fill="${TEETH}"/>` : ""}${tongue ? `<ellipse cx="${cx}" cy="${y + 1}" rx="${w * 0.55}" ry="${h * 0.3}" fill="#F28E8C"/>` : ""}</g>`;
};
const puff = ({ lin }, x, y) => `<g ${Bs}><g fill="${lin(["#F4F7FA", "#CBD3DC", "#9CA6B4"], "d")}"><circle cx="${x}" cy="${y}" r="7"/><circle cx="${x + (x < 50 ? -6 : 6)}" cy="${y + 3}" r="5.5"/><circle cx="${x + (x < 50 ? -3 : 3)}" cy="${y - 5}" r="5"/></g></g>`;
const horns = ({ lin }) => {
  const h = (m) => `<path transform="${m}" d="M18 34 C10 22 11 12 13 5 C25 8 33 14 37 22Z" fill="${lin(["#D8C6F2", C.purple, C.purpleD], "d")}"/>`;
  return `<g ${B}>${h("")}${h("translate(100 0) scale(-1 1)")}</g>`;
};
const devil = (t, angry) =>
  horns(t) + head(t, "purple", 40) +
  (angry
    ? both(eye.dot, { y: 44, ry: 6 }) + both(brow, { y: 44, by: 11, tilt: 8, arch: 0 }) + mouth.curve({ y: 71, w: 14, d: -5 }) +
      `<g fill="${TEETH}"><path d="M40 72 L44 72 L42 78Z M56 72 L60 72 L58 78Z"/></g>`
    : both(eye.dot, { y: 43, ry: 6 }) + both(brow, { y: 43, by: 11, tilt: 7, arch: 0 }) + mouth.curve({ y: 62, w: 19, d: 9 }));
const lens = ({ lin }) => lin([C.navy, C.navyD, C.darkD]);
const sunglasses = (t) =>
  `<g ${Bs}><path d="M19 33 H47 V41 Q47 52 38 52 H29 Q19 52 19 42Z M53 33 H81 V42 Q81 52 71 52 H62 Q53 52 53 41Z" fill="${lens(t)}"/><path d="M47 36 Q50 33 53 36 V39 H47Z M12 34 L19 35 M88 34 L81 35" fill="${C.darkD}" stroke="${C.darkD}" stroke-width="3" stroke-linecap="round"/></g><path d="M24 38 L33 38 M58 38 L67 38" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`;
const ring = (t, x, y, r, col, sw = 3.4) => `<g ${Bs}><circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky}" fill-opacity=".35" stroke="${col}" stroke-width="${sw}"/></g>`;
const watery = (x, y) => ln(`M${x - 8} ${y + 5} Q${x} ${y + 13} ${x + 8} ${y + 5}`, 2.6, "#9CCBEF");
const cry = ({ lin }, x, y, r) => `<g ${Bs}><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 2.4}" fill="${lin(WATER)}"/></g>`;
const wideEyes = (o = {}) => both(eye.wide, { y: 41, ...o });

const __batch: Icon[] = [
  {
    u: "1f978", n: "disguised face",
    draw: (t) => head(t) + ln("M18 24 Q27 18 38 24 M62 24 Q73 18 82 24", 5.5) + ring(t, 33, 41, 11.5, C.darkD) + ring(t, 67, 41, 11.5, C.darkD) + `<path d="M44.5 41 Q50 37 55.5 41" fill="none" stroke="${C.darkD}" stroke-width="3"/>` + both(eye.dot, { dx: 17, rx: 3.6, ry: 5 }) +
      `<g ${Bs}><ellipse cx="50" cy="57" rx="10" ry="8" fill="${t.rad(["#FBC08A", "#F58E5A", "#D9703F"])}"/><path d="M18 68 Q30 58 50 66 Q70 58 82 68 Q72 76 60 70 Q50 68 40 70 Q28 76 18 68Z" fill="#6B4324"/></g>`,
  },
  { u: "1f60e", n: "smiling face with sunglasses", draw: (t) => head(t) + sunglasses(t) + mouth.curve({ y: 63, w: 18, d: 10 }) },
  {
    u: "1f913", n: "nerd face",
    draw: (t) => head(t) + both(eye.dot, { dx: 16, y: 42, rx: 3.8, ry: 5.4 }) + ring(t, 34, 42, 11.5, C.dark, 3.6) + ring(t, 66, 42, 11.5, C.dark, 3.6) + ln("M45.5 41 Q50 37 54.5 41 M22.5 40 L14 36 M77.5 40 L86 36", 3, C.dark) +
      mouth.curve({ y: 64, w: 15, d: 7 }) + `<g ${Bs}><rect x="45" y="65" width="10" height="9" rx="2" fill="${TEETH}"/></g><path d="M50 66 V73" stroke="${INK}" stroke-width="1.4" opacity=".5"/>`,
  },
  {
    u: "1f9d0", n: "face with monocle",
    draw: (t) => head(t) + left(eye.dot) + right(eye.dot, { rx: 5.2, ry: 7.4 }) + left(brow, { by: 14, arch: 3 }) + right(brow, { by: 19, arch: 4 }) +
      ring(t, 65, 41, 12, C.goldM, 3.6) + `<path d="M76 49 C82 58 80 72 74 82" fill="none" stroke="${C.goldD}" stroke-width="1.8" stroke-linecap="round"/>` + mouth.curve({ y: 69, w: 11, d: 2, cx: 47 }),
  },
  { u: "1f615", n: "confused face", draw: (t) => head(t) + both(eye.dot) + left(brow, { by: 11, arch: 0 }) + right(brow, { by: 17, arch: 4 }) + ln("M36 69 q4 -5 7 0 t7 0 t7 0 t7 0", 3.6) },
  { u: "1fae4", n: "face with diagonal mouth", draw: (t) => head(t) + both(eye.dot) + left(brow, { by: 11, arch: 0 }) + right(brow, { by: 17, arch: 4 }) + ln("M36 71 L64 63", 3.8) },
  { u: "1f61f", n: "worried face", draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, tilt: -7 }) + mouth.curve({ y: 71, w: 11, d: -4 }) },
  { u: "1f641", n: "slightly frowning face", draw: (t) => head(t) + both(eye.dot) + mouth.curve({ y: 71, w: 13, d: -5 }) },
  { u: "2639-fe0f", n: "frowning face", draw: (t) => head(t) + both(eye.dot) + mouth.curve({ y: 74, w: 17, d: -8 }) },
  { u: "1f62f", n: "hushed face", draw: (t) => head(t) + both(eye.dot, { ry: 7.4 }) + both(brow, { by: 15, arch: 4 }) + mouth.oh({ y: 69, rx: 5, ry: 6.5 }) },
  { u: "1f632", n: "astonished face", draw: (t) => head(t) + wideEyes({ r: 10.5, p: 3.6 }) + both(brow, { by: 16, arch: 4 }) + mouth.oh({ y: 70, rx: 8, ry: 11 }) },
  { u: "1f633", n: "flushed face", draw: (t) => head(t) + wideEyes({ r: 9.5, p: 3.2 }) + both(brow, { by: 16, arch: 4 }) + blush({ y: 57, dx: 28, ry: 5.5, o: 0.8 }) + mouth.flat({ y: 71, w: 11 }) },
  {
    u: "1f97a", n: "pleading face",
    draw: (t) => head(t) + wideEyes({ r: 10.5, p: 7, look: [0, 1] }) + both(brow, { by: 15, tilt: -7 }) + mouth.curve({ y: 72, w: 8, d: -3 }) + both((x, y) => `<circle cx="${x + 2.5}" cy="${y + 3}" r="1.6" fill="#fff" opacity=".85"/>`),
  },
  {
    u: "1f979", n: "face holding back tears",
    draw: (t) => head(t) + wideEyes({ r: 10.5, p: 6.4, look: [0, 1] }) + both(watery) + both(brow, { by: 15, tilt: -7 }) + mouth.curve({ y: 71, w: 9, d: -3 }),
  },
  { u: "1f626", n: "frowning face with open mouth", draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, tilt: -4 }) + mouth.oh({ y: 71, rx: 8, ry: 10 }) },
  { u: "1f627", n: "anguished face", draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, tilt: -8 }) + arch(t, { y: 76, w: 15, h: 11 }) },
  {
    u: "1f628", n: "fearful face",
    draw: (t) => head(t) + wideEyes({ r: 9.5, p: 4 }) + both(brow, { by: 16, tilt: -8 }) + arch(t, { y: 77, w: 15, h: 12, teeth: true }),
  },
  {
    u: "1f630", n: "anxious face with sweat",
    draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, tilt: -7 }) + arch(t, { y: 76, w: 14, h: 11, teeth: true }) + drop(t, 79, 33, { s: 0.85 }),
  },
  { u: "1f625", n: "sad but relieved face", draw: (t) => head(t) + both(eye.dot, { y: 44 }) + both(brow, { y: 44, by: 14, tilt: -7 }) + mouth.curve({ y: 72, w: 11, d: -4 }) + drop(t, 76, 33, { s: 0.95 }) },
  {
    u: "1f62d", n: "loudly crying face",
    draw: (t) => head(t) + cry(t, 24, 66, 4.5) + cry(t, 76, 66, 4.5) + both(eye.squeeze, { y: 42, w: 6.5, h: 5.5 }) + mouth.open(t, { y: 58, w: 16, d: 22, teeth: false }) + drop(t, 33, 52, { s: 0.7 }) + drop(t, 67, 52, { s: 0.7 }),
  },
  {
    u: "1f631", n: "face screaming in fear",
    draw: (t) => head(t, "blue") + wideEyes({ r: 10.5, p: 3.2 }) + both(brow, { by: 17, tilt: -6, arch: 4 }) + mouth.open(t, { y: 54, w: 15, d: 31, tongue: false }),
  },
  { u: "1f616", n: "confounded face", draw: (t) => head(t) + both(eye.squeeze, { y: 41, w: 7.5, h: 6.5 }) + mouth.wavy({ y: 70, w: 16, a: 3.5 }) },
  { u: "1f623", n: "persevering face", draw: (t) => head(t) + both(eye.squeeze, { y: 41, w: 7.5, h: 6.5 }) + mouth.curve({ y: 74, w: 14, d: -7 }) },
  { u: "1f61e", n: "disappointed face", draw: (t) => head(t) + both(eye.dot, { y: 45, ry: 6 }) + both(brow, { y: 45, by: 12, tilt: -7 }) + mouth.curve({ y: 73, w: 12, d: -5 }) },
  { u: "1f613", n: "downcast face with sweat", draw: (t) => head(t) + both(eye.dot, { y: 45, ry: 6 }) + both(brow, { y: 45, by: 12, tilt: -7 }) + mouth.curve({ y: 73, w: 12, d: -5 }) + drop(t, 22, 36, { s: 0.95 }) },
  {
    u: "1f629", n: "weary face",
    draw: (t) => head(t) + both(eye.squeeze, { y: 40, w: 8, h: 7 }) + arch(t, { y: 80, w: 20, h: 18, teeth: true, tongue: true }),
  },
  { u: "1f62b", n: "tired face", draw: (t) => head(t) + both(eye.squeeze, { y: 42, w: 8, h: 7 }) + arch(t, { y: 79, w: 17, h: 13, teeth: true }) },
  {
    u: "1f624", n: "face with steam from nose",
    draw: (t) => head(t) + both(eye.dot, { y: 43, ry: 6 }) + both(brow, { y: 43, by: 11, tilt: 8, arch: 0 }) + mouth.curve({ y: 72, w: 11, d: -4 }) + puff(t, 24, 62) + puff(t, 76, 62),
  },
  {
    u: "1f92c", n: "face with symbols on mouth",
    draw: (t) => head(t, "red") + both(eye.dot, { y: 41, ry: 6 }) + both(brow, { y: 41, by: 11, tilt: 8, arch: 0 }) +
      `<g ${Bs}><rect x="27" y="60" width="46" height="19" rx="6" fill="${t.lin([C.metalL, C.metal, C.metalD])}"/></g><path d="M35 66 L43 74 M43 66 L35 74 M31 70 H47 M60 65 V71 M72 66 q-4 -4 -8 0" fill="none" stroke="${C.darkD}" stroke-width="2.4" stroke-linecap="round"/><circle cx="60" cy="75" r="1.6" fill="${C.darkD}"/>`,
  },
  { u: "1f608", n: "smiling face with horns", draw: (t) => devil(t, false) },
  { u: "1f47f", n: "angry face with horns", draw: (t) => devil(t, true) },
];

export default __batch;
