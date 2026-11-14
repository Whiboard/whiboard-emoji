// smileys-4: creatures (skull, poo, clown, oni, ghost, alien, robot), cat faces, three monkeys
import { B, Bs, C } from "../kit.mjs";
import { INK, MOUTH, TEETH, both, brow, drop, eye, head, left, ln, mouth, right } from "../facekit.mjs";

const mir = (s) => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
const dark = C.darkD;

// ---------- skull
const SKULL = "M50 8 C76 8 90 26 88 46 C87 56 80 60 76 64 V80 Q76 88 68 88 H32 Q24 88 24 80 V64 C20 60 13 56 12 46 C10 26 24 8 50 8Z";
const skull = (t, tr = "") => {
  const { lin } = t;
  return `<g ${B}><path transform="${tr}" d="${SKULL}" fill="${lin([C.paper, "#E4D7B8", "#BBA97F"], "d")}"/></g>
<g transform="${tr}"><ellipse cx="35" cy="46" rx="9.5" ry="10.5" fill="${dark}"/><ellipse cx="65" cy="46" rx="9.5" ry="10.5" fill="${dark}"/>
<path d="M50 56 L45 67 Q50 69 55 67Z" fill="${dark}"/>
<path d="M42 77 V88 M50 77 V88 M58 77 V88" stroke="#9E8A62" stroke-width="2.6" stroke-linecap="round"/>
<path d="M33 41 q2 -3 5 -2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".5"/></g>`;
};
const bone = (t, rot) => {
  const { lin } = t;
  return `<g ${B}><g transform="rotate(${rot} 50 68)"><rect x="14" y="63" width="72" height="10" rx="5" fill="${lin([C.paper, "#CDBE98"])}"/>${[[14, 61.5], [14, 74.5], [86, 61.5], [86, 74.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.4" fill="${lin([C.paper, "#CDBE98"])}"/>`).join("")}</g></g>`;
};

// ---------- mitten hand (monkey fur)
const hand = (t, x, y, rot = 0, s = 1) => {
  const { lin } = t;
  const tf = `translate(${x} ${y}) rotate(${rot}) scale(${s})`;
  return `<g ${Bs}><g transform="${tf}"><ellipse cx="0" cy="0" rx="13" ry="9.5" fill="${lin(["#F0D3AA", "#C99466"])}"/><ellipse cx="-4" cy="9" rx="5" ry="4.5" fill="${lin(["#F0D3AA", "#C99466"])}"/></g></g>
<g transform="${tf}" fill="none" stroke="${C.woodD}" stroke-width="1.5" stroke-linecap="round" opacity=".7"><path d="M5 -8 V0 M10 -6 V2 M0 -9 V-2"/></g>`;
};

// ---------- cat
function catFace(t, { fur = ["#FBC580", C.orange, "#D8742E"], stripe = "#A8501E", feat = "", mouthPart, nose = true } = {}) {
  const { lin } = t;
  const e1 = `<path d="M15 46 L16 14 Q17 9 22 12 L44 27Z" fill="${lin([fur[1], fur[2]])}"/>`;
  const w = (x, y, d, c) => [-5, 3].map((dy) => `<path d="M${x} ${y} L${x + d * 17} ${y + dy * 1.4}" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`).join("");
  return `<g ${B}>${e1}</g><g ${B}>${mir(e1)}</g>
<path d="M20 38 L20 22 L33 30Z" fill="${C.pinkD}" opacity=".5"/><path d="M80 38 L80 22 L67 30Z" fill="${C.pinkD}" opacity=".5"/>
<g ${B}><ellipse cx="50" cy="57" rx="39" ry="31" fill="${lin(fur, "d")}"/></g>
<path d="M50 28 V38 M41 30 L43 38 M59 30 L57 38" stroke="${stripe}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
<ellipse cx="22" cy="66" rx="5" ry="3.5" fill="${C.pinkD}" opacity=".32"/><ellipse cx="78" cy="66" rx="5" ry="3.5" fill="${C.pinkD}" opacity=".32"/>
${feat}
<path d="M45.6 62 Q50 59.8 54.4 62 Q50 67.3 45.6 62Z" fill="${C.pinkD}"/>
${mouthPart ?? ln("M42 72 Q46 77 50 70 Q54 77 58 72", 2.8)}
${w(21, 66, -0.85, C.metalDD)}${w(79, 66, 0.85, C.metalDD)}`;
}
const ey = (part, o = {}) => both(part, { y: 53, dx: 16, ...o });
const CAT_RED = ["#F7A08E", "#EA6A5A", "#B0362F"];
const catOpen = (t, o = {}) => mouth.open(t, { y: 69, w: 11, d: 13, ...o });

// ---------- monkey
const mEye = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="4.2" fill="${dark}"/><circle cx="${x - 1.1}" cy="${y - 1.5}" r="1.1" fill="#fff"/>`;
const monkey = (t, { eyes = true } = {}) => {
  const { lin } = t;
  return `<g ${B}><circle cx="15" cy="54" r="10" fill="${lin([C.wood, C.woodD])}"/></g><g ${B}><circle cx="85" cy="54" r="10" fill="${lin([C.wood, C.woodD])}"/></g>
<circle cx="15" cy="54" r="5" fill="${C.pinkD}" opacity=".6"/><circle cx="85" cy="54" r="5" fill="${C.pinkD}" opacity=".6"/>
<g ${B}><circle cx="50" cy="50" r="36" fill="${lin([C.wood, C.woodD, "#7C4F2B"], "d")}"/></g>
<g ${B}><path d="M50 36 C58 28 76 34 74 52 C73 66 66 84 50 84 C34 84 27 66 26 52 C24 34 42 28 50 36Z" fill="${lin([C.cream, "#E8C79B"])}"/></g>
${eyes ? mEye(38, 50) + mEye(62, 50) : ""}
<ellipse cx="30" cy="64" rx="5" ry="3.5" fill="${C.pinkD}" opacity=".32"/><ellipse cx="70" cy="64" rx="5" ry="3.5" fill="${C.pinkD}" opacity=".32"/>
<ellipse cx="46.5" cy="62" rx="1.4" ry="1.8" fill="${dark}"/><ellipse cx="53.5" cy="62" rx="1.4" ry="1.8" fill="${dark}"/>
<path d="M42 71 Q46 75.6 50 71 Q54 75.6 58 71" fill="none" stroke="${C.woodD}" stroke-width="1.8" stroke-linecap="round"/>`;
};

// ---------- oni horns
const horn = (t) => `<path d="M24 26 Q16 10 26 3 Q40 8 44 24Z" fill="${t.lin([C.gold, C.goldM, C.goldD], "d")}"/>`;
const fang = (x, up) => `<path d="M${x - 3.5} ${up ? 80 : 62} H${x + 3.5} L${x} ${up ? 70 : 72}Z" fill="${TEETH}"/>`;

export default [
  { u: "1f480", n: "skull", draw: (t) => skull(t) },
  {
    u: "2620-fe0f",
    n: "skull and crossbones",
    draw: (t) => bone(t, 28) + bone(t, -28) + skull(t, "translate(18.8 3) scale(.62)"),
  },
  {
    u: "1f4a9",
    n: "pile of poo",
    draw: (t) => {
      const { lin } = t;
      const g = () => lin(["#B07A48", "#8A5630", "#5F3A20"], "d");
      return `<g ${B}><ellipse cx="50" cy="77" rx="42" ry="16" fill="${g()}"/></g>
<g ${B}><ellipse cx="50" cy="55" rx="32" ry="15" fill="${g()}"/></g>
<g ${B}><path d="M30 38 C28 26 42 22 48 12 C52 6 62 8 64 14 C62 22 70 26 70 38 C70 46 30 46 30 38Z" fill="${g()}"/></g>
${left(eye.wide, { y: 57, dx: 11, r: 6.3, p: 3.3 })}${right(eye.wide, { y: 57, dx: 11, r: 6.3, p: 3.3 })}
${mouth.open(t, { y: 66, w: 11, d: 10, tongue: false, cx: 50 })}`;
    },
  },
  {
    u: "1f921",
    n: "clown face",
    draw: (t) => {
      const { lin } = t;
      const hair = ([x, y, r]) => `<g ${B}><circle cx="${x}" cy="${y}" r="${r}" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>`;
      return [[15, 32, 10], [13, 52, 9.5], [85, 32, 10], [87, 52, 9.5], [27, 14, 9], [73, 14, 9]].map(hair).join("") +
        head(t, ["#FFFDF5", "#FCF6E8", "#E8DCC0", "#CDBE98"]) +
        both(eye.dot, { y: 40 }) + both(brow, { by: 12, arch: 4, sw: 3.4 }) +
        `<ellipse cx="26" cy="56" rx="6.5" ry="4.5" fill="#EA6A60" opacity=".45"/><ellipse cx="74" cy="56" rx="6.5" ry="4.5" fill="#EA6A60" opacity=".45"/>` +
        ln("M29 63 Q50 86 71 63", 5, C.redM) +
        `<g ${Bs}><circle cx="50" cy="54" r="9.5" fill="${t.rad([C.red, C.redM, C.redD])}"/></g><circle cx="46.5" cy="50.5" r="2.6" fill="#fff" opacity=".6"/>`;
    },
  },
  {
    u: "1f479",
    n: "ogre",
    draw: (t) =>
      `<g ${B}>${horn(t)}</g><g ${B}>${mir(horn(t))}</g>` +
      head(t, "red", 39).replace('r="39"', 'r="39"') +
      both(eye.dot, { y: 44, ry: 5.5, dx: 14 }) +
      both(brow, { y: 44, by: 11, tilt: 11, arch: 0, sw: 4.6, w: 9, dx: 14 }) +
      mouth.open(t, { y: 62, w: 22, d: 20, tongue: false }) +
      fang(33, true) + fang(67, true) + fang(33, false).replace("62", "62") ,
  },
  {
    u: "1f47a",
    n: "goblin",
    draw: (t) => {
      const { lin } = t;
      return head(t, "hot", 43) +
        both(eye.wide, { y: 38, dx: 15, r: 7.5, p: 3.6, look: [0, 1.5] }) +
        both((x, y, s, o) => ln(`M${x + s * 9} ${y - 7} L${x - s * 9} ${y + 2}`, 4.6, "#FFF9EC"), { y: 30, dx: 15 }).replace(/stroke-width="4.6"/g, 'stroke-width="4.6"') +
        `<g ${B}><path d="M41 44 Q50 38 59 44 Q66 62 50 74 Q34 62 41 44Z" fill="${lin(["#F9B06E", "#EE7A4A", "#C94A30"], "d")}"/></g>
<ellipse cx="45" cy="66" rx="2" ry="2.6" fill="${MOUTH}"/><ellipse cx="55" cy="66" rx="2" ry="2.6" fill="${MOUTH}"/>` +
        mouth.teeth({ y: 83, w: 15, h: 9 });
    },
  },
  {
    u: "1f47b",
    n: "ghost",
    draw: (t) => {
      const { lin } = t;
      return `<g ${B}><path d="M16 88 V44 C16 22 30 6 50 6 C70 6 84 22 84 44 V88 Q84 94 78 91 Q72 88 67 90 Q60 96 55 90 Q50 86 45 90 Q40 96 33 90 Q28 88 22 91 Q16 94 16 88Z" fill="${lin(["#FFFDF6", "#E3E6F0", "#B4BDD8"], "d")}"/></g>` +
        both(eye.dot, { y: 40, rx: 5, ry: 8 }) +
        `<ellipse cx="29" cy="58" rx="6" ry="4" fill="#F0786E" opacity=".4"/><ellipse cx="71" cy="58" rx="6" ry="4" fill="#F0786E" opacity=".4"/>` +
        mouth.oh({ y: 62, rx: 6, ry: 8 });
    },
  },
  {
    u: "1f47d",
    n: "alien",
    draw: (t) => {
      const { lin } = t;
      const e = (x, s) => `<ellipse cx="${x}" cy="48" rx="12" ry="7.5" transform="rotate(${s * 28} ${x} 48)" fill="${dark}"/><circle cx="${x - s * 4}" cy="44" r="2.4" fill="#fff" opacity=".7" transform="rotate(${s * 28} ${x} 48)"/>`;
      return `<g ${B}><path d="M50 6 C82 6 94 28 85 52 C78 70 62 90 50 92 C38 90 22 70 15 52 C6 28 18 6 50 6Z" fill="${lin([C.green, "#78AE68", C.greenD], "d")}"/></g>` +
        e(31, -1) + e(69, 1) +
        `<path d="M46 66 h0 M54 66 h0" stroke="${C.greenD}" stroke-width="2.6" stroke-linecap="round"/>` + ln("M43 76 Q50 80 57 76", 3, C.greenD);
    },
  },
  {
    u: "1f47e",
    n: "alien monster",
    draw: (t) => {
      const rows = ["00100000100", "00010001000", "00111111100", "01101110110", "11111111111", "10111111101", "10100000101", "00011011000"];
      const c = 8;
      const d = rows.map((r, j) => [...r].map((v, i) => (v === "1" ? `M${6 + i * c} ${18 + j * c}h${c}v${c}h${-c}z` : "")).join("")).join("");
      return `<g ${B}><path d="${d}" fill="${t.lin([C.purple, "#8C70C6", C.purpleD], "d")}"/></g>`;
    },
  },
  {
    u: "1f916",
    n: "robot",
    draw: (t) => {
      const { lin } = t;
      const mt = () => lin([C.metalL, C.metal, C.metalD], "d");
      return `<path d="M50 12 V28" stroke="${C.metalDD}" stroke-width="4" stroke-linecap="round"/><g ${Bs}><circle cx="50" cy="10" r="6" fill="${t.rad([C.red, C.redM, C.redD])}"/></g>
<g ${Bs}><rect x="4" y="46" width="12" height="22" rx="5" fill="${mt()}"/><rect x="84" y="46" width="12" height="22" rx="5" fill="${mt()}"/></g>
<g ${B}><rect x="12" y="24" width="76" height="66" rx="16" fill="${mt()}"/></g>
<g ${Bs}><rect x="21" y="35" width="58" height="30" rx="12" fill="${lin([C.navy, C.navyD])}"/></g>
<circle cx="36" cy="50" r="6.5" fill="${C.sky}"/><circle cx="64" cy="50" r="6.5" fill="${C.sky}"/><circle cx="34.2" cy="48" r="2" fill="#fff" opacity=".8"/><circle cx="62.2" cy="48" r="2" fill="#fff" opacity=".8"/>
<path d="M30 77 H70" stroke="${C.metalDD}" stroke-width="5" stroke-linecap="round"/><path d="M40 74 V80 M50 74 V80 M60 74 V80" stroke="${C.metalL}" stroke-width="2" stroke-linecap="round"/>`;
    },
  },
  { u: "1f63a", n: "grinning cat", draw: (t) => catFace(t, { feat: ey(eye.dot, { rx: 3.8, ry: 5 }), mouthPart: catOpen(t) }) },
  { u: "1f638", n: "grinning cat with smiling eyes", draw: (t) => catFace(t, { feat: ey(eye.arch, { w: 6, h: 5 }), mouthPart: catOpen(t, { tongue: false }) }) },
  {
    u: "1f639",
    n: "cat with tears of joy",
    draw: (t) => catFace(t, { feat: ey(eye.squeeze, { w: 6, h: 5 }), mouthPart: catOpen(t) }) + drop(t, 17, 52, { s: 0.75, rot: -55 }) + drop(t, 83, 52, { s: 0.75, rot: 55 }),
  },
  { u: "1f63b", n: "smiling cat with heart eyes", draw: (t) => catFace(t, { feat: ey(eye.heart, { size: 16, y: 51 }), mouthPart: catOpen(t, { teeth: false }) }) },
  {
    u: "1f63c",
    n: "cat with wry smile",
    draw: (t) => catFace(t, { feat: ey(eye.dot, { rx: 3.8, ry: 5 }) + right(brow, { y: 53, dx: 16, by: 12, tilt: 3, w: 6 }), mouthPart: ln("M41 74 Q50 76 59 68", 2.8) }),
  },
  {
    u: "1f63d",
    n: "kissing cat",
    draw: (t) => catFace(t, { feat: ey(eye.bowl, { w: 6, h: 5, y: 51 }), mouthPart: `<ellipse cx="50" cy="75" rx="3.4" ry="4" fill="${MOUTH}"/>` }),
  },
  {
    u: "1f640",
    n: "weary cat",
    draw: (t) => catFace(t, { feat: ey(eye.wide, { r: 7.5, p: 3.6, y: 52 }) + both(brow, { y: 52, dx: 16, by: 13, tilt: -5, w: 6 }), mouthPart: mouth.oh({ y: 76, rx: 6, ry: 8 }) }),
  },
  {
    u: "1f63f",
    n: "crying cat",
    draw: (t) => catFace(t, { feat: ey(eye.dot, { rx: 3.8, ry: 5, y: 55 }) + both(brow, { y: 55, dx: 16, by: 12, tilt: -6, w: 6 }), mouthPart: ln("M43 79 Q50 72 57 79", 2.8) }) + drop(t, 26, 70, { s: 0.8 }),
  },
  {
    u: "1f63e",
    n: "pouting cat",
    draw: (t) => catFace(t, { fur: CAT_RED, stripe: "#7A1F1C", feat: ey(eye.dot, { rx: 3.8, ry: 4.4, y: 56 }) + both(brow, { y: 56, dx: 16, by: 9, tilt: 8, arch: 0, w: 6 }), mouthPart: ln("M42 78 Q50 71 58 78", 2.8) }),
  },
  { u: "1f648", n: "see no evil monkey", draw: (t) => monkey(t, { eyes: false }) + hand(t, 36, 49, -6, 1.05) + hand(t, 64, 49, 6, 1.05).replace(/translate\(64 49\) rotate\(6\) scale\(1.05\)/g, "translate(64 49) rotate(6) scale(-1.05 1.05)") },
  { u: "1f649", n: "hear no evil monkey", draw: (t) => monkey(t) + hand(t, 14, 54, -90, 1.05) + hand(t, 86, 54, 90, 1.05) },
  { u: "1f64a", n: "speak no evil monkey", draw: (t) => monkey(t) + hand(t, 50, 72, 0, 1.15) },
];
