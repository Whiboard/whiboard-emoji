// Smileys 2: neutral, sleepy, sick, dizzy and party faces. Built on facekit.ts.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";
import { INK, MOUTH, SKIN, TEETH, WATER, blush, both, brow, drop, eye, head, left, ln, mouth, right } from "../facekit.ts";

const r1 = (v) => +v.toFixed(1);
/** half-lidded eye: dark oval under a flat lid line. { look } shifts the pupil sideways */
const lidded = (x, y, _s, { look = 0, lid = 3.4 } = {}) =>
  `<ellipse cx="${x + look}" cy="${y + 2.5}" rx="4.7" ry="4.6" fill="${INK}"/>` + ln(`M${x - 8} ${y - 2.5} H${x + 8}`, lid);
/** small bubble / cloud puff */
const puff = ({ lin }, cx, cy, r) =>
  `<g ${Bs}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${lin([C.paper, C.sky, C.skyD])}"/></g>`;
/** the cloud bank: circles in one bevel group */
const cloud = ({ lin }, cs) =>
  `<g ${B}><g fill="${lin([C.paper, "#DCE6EE", "#A9BDCC"])}">${cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g></g>`;
/** the Z of a sleeping face */
const zed = (x, y, s) => ln(`M${x} ${y} H${x + s} L${x} ${y + s * 1.1} H${x + s}`, 4.2, C.navy);
const zzz = () => `<g ${Bs}>${zed(60, 22, 11)}${zed(74, 10, 8)}</g>`;
const spiral = (cx, cy, R, dir = 1) => {
  const N = 26;
  let d = "";
  for (let i = 0; i <= N; i++) {
    const a = dir * (i / N) * 2.3 * 2 * Math.PI;
    const r = (R * i) / N;
    d += `${i ? "L" : "M"}${r1(cx + r * Math.cos(a))} ${r1(cy + r * Math.sin(a))}`;
  }
  return ln(d, 3.2);
};
/** ghost head for shaking faces */
const ghost = ({ rad }, dx, r = 37) => `<circle cx="${50 + dx}" cy="50" r="${r}" fill="${rad(SKIN.yellow, 0.38, 0.32, 0.75)}" opacity=".42"/>`;
const arcs = (v) => (v ? [[36, 7, 64, 7, 50, 1.5], [36, 93, 64, 93, 50, 98.5]] : [[]]);
const side = (h) => (h ? ln("M12 36 Q4 50 12 64", 3.6, C.wood) + ln("M88 36 Q96 50 88 64", 3.6, C.wood) : ln("M36 12 Q50 4 64 12", 3.6, C.wood) + ln("M36 88 Q50 96 64 88", 3.6, C.wood));

const __batch: Icon[] = [
  {
    u: "1f910",
    n: "zipper mouth face",
    draw: (t) =>
      head(t) + both(eye.dot) +
      `<g ${Bs}><rect x="26" y="62" width="48" height="8" rx="4" fill="${t.lin([C.metalL, C.metal, C.metalD])}"/></g>` +
      `<path d="M32 63v6M38 63v6M44 63v6M50 63v6M56 63v6M62 63v6" stroke="${C.metalDD}" stroke-width="2" stroke-linecap="round"/>` +
      `<g ${Bs}><rect x="66" y="58" width="12" height="16" rx="4" fill="${t.lin([C.gold, C.goldM, C.goldD])}"/></g><circle cx="72" cy="68" r="2" fill="${C.goldD}"/>`,
  },
  {
    u: "1f928",
    n: "face with raised eyebrow",
    draw: (t) => head(t) + both(eye.dot) + left(brow, { by: 11, arch: 0, tilt: 3 }) + right(brow, { by: 18, arch: 5, tilt: -2 }) + mouth.flat({ y: 68, w: 11 }),
  },
  { u: "1f611", n: "expressionless face", draw: (t) => head(t) + both(eye.line, { y: 43, w: 7.5 }) + mouth.flat({ y: 68 }) },
  { u: "1f636", n: "face without mouth", draw: (t) => head(t) + both(eye.dot, { y: 46 }) },
  {
    u: "1fae5",
    n: "dotted line face",
    draw: (t) => {
      const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.wood}"/>`;
      return `<circle cx="50" cy="50" r="42" fill="${SKIN.yellow[0]}" opacity=".8"/>` +
        `<g ${Bs}><circle cx="50" cy="50" r="41" fill="none" stroke="${C.wood}" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 10.2"/></g>` +
        dot(35, 42, 4.4) + dot(65, 42, 4.4) + dot(38, 67, 3.2) + dot(46, 68, 3.2) + dot(54, 68, 3.2) + dot(62, 67, 3.2);
    },
  },
  {
    u: "1f636-200d-1f32b-fe0f",
    n: "face in clouds",
    draw: (t) => head(t) + both(eye.bowl, { y: 40 }) + cloud(t, [[26, 68, 14], [74, 68, 14], [38, 74, 17], [62, 74, 17], [50, 62, 15], [50, 82, 12]]),
  },
  {
    u: "1f60f",
    n: "smirking face",
    draw: (t) => head(t) + both(lidded, { y: 43, look: 2.5, lid: 3.4 }) + right(brow, { by: 15, arch: 4, tilt: -2 }) + ln("M34 68 Q50 71 66 63") + ln("M66 63 q3 -1.5 4.5 -4.5", 3.4),
  },
  {
    u: "1f612",
    n: "unamused face",
    draw: (t) => head(t) + both(lidded, { y: 44, look: -3 }) + both(brow, { by: 12, tilt: 4, arch: 0 }) + mouth.curve({ y: 72, w: 11, d: -4 }),
  },
  {
    u: "1f644",
    n: "face with rolling eyes",
    draw: (t) => head(t) + both(eye.wide, { y: 40, dx: 16, r: 10.5, p: 4.6, look: [0, -5.4] }) + both(brow, { y: 40, by: 16, arch: 4 }) + mouth.flat({ y: 70, w: 10 }),
  },
  {
    u: "1f62e-200d-1f4a8",
    n: "face exhaling",
    draw: (t) =>
      head(t) + both(eye.squeeze, { y: 42, w: 6.5, h: 5 }) + mouth.oh({ cx: 38, y: 67, rx: 6, ry: 7 }) +
      puff(t, 66, 70, 8) + puff(t, 78, 76, 10) + puff(t, 87, 64, 6.5),
  },
  {
    u: "1f925",
    n: "lying face",
    draw: (t) =>
      head(t) + both(eye.dot) + left(brow, { by: 12, arch: 2 }) + right(brow, { by: 16, arch: 4 }) + ln("M30 70 Q40 66 52 71") +
      `<g ${Bs}><path d="M46 54 L86 50 Q94 52 94 57 Q94 63 86 62 L46 62Z" fill="${t.lin([C.orange, C.orangeD])}"/></g>`,
  },
  {
    u: "1fae8",
    n: "shaking face",
    draw: (t) => ghost(t, -9) + ghost(t, 9) + head(t, "yellow", 37) + both(eye.dot, { dx: 14 }) + mouth.wavy({ y: 66, w: 13 }),
  },
  {
    u: "1f642-200d-2194-fe0f",
    n: "head shaking horizontally",
    draw: (t) => head(t, "yellow", 36) + both(eye.dot, { dx: 14 }) + mouth.curve({ y: 66, w: 13, d: 5 }) + side(true),
  },
  {
    u: "1f642-200d-2195-fe0f",
    n: "head shaking vertically",
    draw: (t) => head(t, "yellow", 36) + both(eye.dot, { dx: 14 }) + mouth.curve({ y: 66, w: 13, d: 5 }) + side(false),
  },
  { u: "1f60c", n: "relieved face", draw: (t) => head(t) + both(eye.bowl, { y: 43 }) + blush() + mouth.curve({ y: 65, w: 13, d: 6 }) },
  {
    u: "1f614",
    n: "pensive face",
    draw: (t) => head(t) + both(lidded, { y: 46 }) + both(brow, { y: 46, by: 12, tilt: -5, arch: 1 }) + mouth.curve({ y: 73, w: 10, d: -4 }),
  },
  {
    u: "1f62a",
    n: "sleepy face",
    draw: (t) =>
      head(t) + both(eye.bowl, { y: 42 }) + mouth.oh({ cx: 42, y: 70, rx: 5, ry: 4 }) +
      `<g ${Bs}><circle cx="60" cy="60" r="9" fill="${t.lin([C.paper, C.sky, C.skyD], "d")}" stroke="${C.skyD}" stroke-width="1.4"/></g><circle cx="57" cy="56.5" r="2.4" fill="#fff" opacity=".85"/>` +
      drop(t, 80, 33, { s: 0.85 }),
  },
  {
    u: "1f924",
    n: "drooling face",
    draw: (t) => head(t) + both(eye.dot, { y: 40 }) + both(brow, { y: 40, by: 13, arch: 3 }) + mouth.curve({ y: 62, w: 17, d: 9 }) +
      `<g ${Bs}><path d="M63 69 Q64 80 64 84" fill="none" stroke="${C.sky}" stroke-width="4.4" stroke-linecap="round"/></g>` + drop(t, 64, 87, { s: 0.95, rot: 180 }),
  },
  {
    u: "1f634",
    n: "sleeping face",
    draw: (t) => head(t) + both(eye.line, { y: 46, w: 7.5 }) + mouth.oh({ y: 70, rx: 5, ry: 5 }) + zzz(),
  },
  {
    u: "1fae9",
    n: "face with bags under eyes",
    draw: (t) => {
      const bag = (x) => ln(`M${x - 8} 51 Q${x} 58 ${x + 8} 51`, 3, "#B77C57") + ln(`M${x - 5} 55 Q${x} 59.5 ${x + 5} 55`, 2.2, "#C7946A");
      return head(t) + both(lidded, { y: 41 }) + bag(35) + bag(65) + mouth.curve({ y: 71, w: 10, d: -3 });
    },
  },
  {
    u: "1f637",
    n: "face with medical mask",
    draw: (t) =>
      head(t) + both(eye.dot, { y: 40 }) + both(brow, { y: 40, by: 12, tilt: -2, arch: 2 }) +
      ln("M26 60 L10 56 M74 60 L90 56 M26 72 L12 76 M74 72 L88 76", 2.4, C.paperD) +
      `<g ${B}><path d="M24 55 Q50 49 76 55 Q82 66 74 76 Q50 90 26 76 Q18 66 24 55Z" fill="${t.lin(["#E9F4FB", C.sky, C.skyD])}"/></g>` +
      `<path d="M30 63 Q50 68 70 63 M30 71 Q50 76 70 71" fill="none" stroke="#6FA5C8" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`,
  },
  {
    u: "1f912",
    n: "face with thermometer",
    draw: (t) =>
      head(t) + both(lidded, { y: 41 }) + both(brow, { y: 41, by: 11, tilt: -5, arch: 1 }) + ln("M32 72 Q39 69 46 72", 3.8) +
      `<g ${Bs}><g transform="rotate(24 48 68)"><rect x="44" y="64" width="48" height="8" rx="4" fill="${t.lin([C.paper, "#CFDDE6", C.metal])}"/><rect x="48" y="66.2" width="24" height="3.6" rx="1.8" fill="${C.red}"/><circle cx="48" cy="68" r="5.4" fill="${t.rad([C.red, C.redD])}"/></g></g>` +
      drop(t, 80, 30, { s: 0.8 }),
  },
  {
    u: "1f915",
    n: "face with head bandage",
    draw: (t) =>
      head(t) + both(eye.dot, { y: 46 }) + both(brow, { y: 46, by: 11, tilt: -6, arch: 0 }) + mouth.curve({ y: 73, w: 11, d: -4 }) +
      `<g ${t.clip('<circle cx="50" cy="50" r="43"/>')}><g ${B}><g transform="rotate(-14 50 50)"><rect x="0" y="19" width="100" height="17" fill="${t.lin([C.paper, C.cream, C.creamD])}"/></g></g>` +
      `<g transform="rotate(-14 50 50)"><rect x="39" y="21" width="22" height="13" rx="2" fill="${C.paperD}"/><path d="M50 22v11M44 27.500h12" stroke="${C.creamD}" stroke-width="2.4"/><path d="M4 22h28M68 22h28M4 33h28M68 33h28" stroke="${C.creamD}" stroke-width="1.4" opacity=".7"/></g></g>`,
  },
  {
    u: "1f922",
    n: "nauseated face",
    draw: (t) =>
      head(t, "green") + both(eye.squeeze, { y: 41, w: 6.5, h: 5.5 }) + both(brow, { y: 41, by: 12, tilt: -5 }) + mouth.wavy({ y: 68, w: 14 }) + drop(t, 82, 34, { s: 0.75 }),
  },
  {
    u: "1f92e",
    n: "face vomiting",
    draw: (t) => {
      const g = t.lin(["#D3E8A0", C.green, C.greenM]);
      return head(t, "green") + both(eye.squeeze, { y: 38, w: 6.5, h: 5.5 }) + both(brow, { y: 38, by: 11, tilt: -5 }) +
        mouth.open(t, { y: 52, w: 14, d: 19, teeth: false, tongue: false }) +
        `<g ${Bs}><path d="M38 60 Q50 68 62 60 L68 82 Q70 94 62 94 Q57 94 55 88 Q52 96 46 94 Q40 92 42 84 Q36 90 33 84 Q30 76 38 60Z" fill="${g}"/></g>` +
        `<circle cx="48" cy="76" r="2" fill="#E6EFB8"/><circle cx="58" cy="82" r="1.6" fill="#E6EFB8"/>`;
    },
  },
  {
    u: "1f927",
    n: "sneezing face",
    draw: (t) =>
      head(t) + both(eye.squeeze, { y: 40, w: 6.5, h: 5.5 }) + both(brow, { y: 40, by: 12, tilt: -3 }) +
      `<g ${B}><path d="M24 62 Q31 52 42 58 Q50 51 59 58 Q70 52 77 62 Q82 74 72 84 Q60 91 48 88 Q32 90 26 80 Q20 70 24 62Z" fill="${t.lin([C.paper, "#E6DDC6", C.paperD], "d")}"/></g>` +
      `<path d="M34 66 Q42 72 50 66 M46 80 Q56 76 66 80 M60 64 Q64 70 70 68" fill="none" stroke="${C.creamD}" stroke-width="2.2" stroke-linecap="round"/>` +
      drop(t, 86, 50, { s: 0.55, rot: 70 }) + drop(t, 90, 66, { s: 0.5, rot: 100 }),
  },
  {
    u: "1f975",
    n: "hot face",
    draw: (t) =>
      head(t, "hot") + both(eye.squeeze, { y: 40, w: 6.5, h: 5 }) + both(brow, { y: 40, by: 12, tilt: -5 }) +
      mouth.open(t, { y: 58, w: 15, d: 17, teeth: false, tongue: false }) + mouth.tongue({ y: 70, w: 8, h: 21 }) +
      drop(t, 20, 32, { s: 0.85 }) + drop(t, 82, 28, { s: 0.85 }) + drop(t, 84, 58, { s: 0.7 }),
  },
  {
    u: "1f976",
    n: "cold face",
    draw: (t) => {
      const sp = (x, y, R) => `<g ${Bs}><polygon points="${star(x, y, R, R * 0.28, 4)}" fill="${t.lin([C.paper, C.sky, C.skyD], "d")}"/></g>`;
      return head(t, "blue") + both(eye.dot, { y: 41 }) + both(brow, { y: 41, by: 12, tilt: -5 }) + mouth.teeth({ y: 67, w: 15, h: 11 }) +
        blush({ y: 56, o: 0.35 }) + sp(20, 22, 9) + sp(84, 20, 7) + sp(80, 80, 8);
    },
  },
  {
    u: "1f974",
    n: "woozy face",
    draw: (t) =>
      head(t) + left(eye.dot, { y: 41, rx: 5.6, ry: 8 }) + right(eye.dot, { y: 43, rx: 4.2, ry: 5.2 }) + left(brow, { by: 15, arch: 4 }) +
      right(brow, { y: 43, by: 10, arch: 1, tilt: 3 }) + blush({ o: 0.4 }) + mouth.wavy({ y: 68, w: 15 }),
  },
  {
    u: "1f635",
    n: "face with crossed out eyes",
    draw: (t) => head(t) + both(eye.cross, { y: 41, r: 6.5, dx: 16 }) + mouth.open(t, { y: 62, w: 12, d: 13, teeth: false, tongue: true }),
  },
  {
    u: "1f635-200d-1f4ab",
    n: "face with spiral eyes",
    draw: (t) => head(t) + spiral(34, 40, 10, 1) + spiral(66, 40, 10, -1) + mouth.wavy({ y: 69, w: 15 }),
  },
  {
    u: "1f92f",
    n: "exploding head",
    draw: (t) => {
      const f = t.rad(["#FFE98A", C.orange, C.red], 0.5, 0.5, 0.7);
      return `<g ${B}><g fill="${f}"><circle cx="28" cy="22" r="11"/><circle cx="72" cy="22" r="11"/><circle cx="50" cy="15" r="13"/><circle cx="14" cy="32" r="6"/><circle cx="86" cy="32" r="6"/></g></g>` +
        `<g transform="translate(0 8)">${head(t, "yellow", 36)}${both(eye.wide, { y: 40, dx: 14, r: 8.5, p: 3.8 })}${both(brow, { y: 40, by: 14, arch: 4 })}${mouth.oh({ y: 68, rx: 6.5, ry: 8 })}</g>` +
        `<g ${Bs}><circle cx="40" cy="13" r="4" fill="#FFE98A"/><circle cx="60" cy="10" r="3.5" fill="#FFE98A"/></g>`;
    },
  },
  {
    u: "1f920",
    n: "cowboy hat face",
    draw: (t) =>
      head(t) + both(eye.dot, { y: 52 }) + mouth.curve({ y: 71, w: 16, d: 8 }) +
      `<g ${B}><path d="M28 38 Q24 8 38 8 Q50 14 62 8 Q76 8 72 38Z" fill="${t.lin([C.woodL, C.wood, C.woodD])}"/></g>` +
      `<path d="M28 31 Q50 37 72 31 L72 38 Q50 44 28 38Z" fill="${C.woodDD}"/>` +
      `<g ${B}><path d="M3 30 Q8 44 50 44 Q92 44 97 30 Q94 20 80 30 Q50 38 20 30 Q6 20 3 30Z" fill="${t.lin([C.woodL, C.wood, C.woodD])}"/></g>`,
  },
  {
    u: "1f973",
    n: "partying face",
    draw: (t) => {
      const conf = [[10, 36, C.red], [90, 40, C.blue], [86, 84, C.green], [12, 80, C.purple], [30, 91, C.gold]]
        .map(([x, y, c]: any[], i) => `<rect x="${x - 3}" y="${y - 2}" width="6" height="4" rx="1.4" fill="${c}" transform="rotate(${i * 40} ${x} ${y})"/>`).join("");
      return head(t) + both(eye.dot, { y: 46 }) + both(brow, { y: 46, by: 12, arch: 3 }) + mouth.open(t, { y: 62, w: 18, d: 18 }) +
        `<g ${Bs}><g transform="rotate(22 48 28)"><path d="M28 28 L68 28 L48 6Z" fill="${t.lin([C.purple, C.pinkD, C.red], "d")}"/></g></g>` +
        `<path d="M37 21 L58 17 M42 13 L53 11" stroke="${C.gold}" stroke-width="3" stroke-linecap="round" transform="rotate(22 48 28)"/>` +
        `<g ${Bs}><circle cx="58.500" cy="9" r="4.800" fill="${C.gold}"/></g>` + conf;
    },
  },
];

export default __batch;
