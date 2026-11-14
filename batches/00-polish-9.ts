// Polish 9: redraws of weak face / symbol emoji. Built on facekit.ts.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";
import { INK, MOUTH, SKIN, TEETH, both, brow, drop, eye, head, left, ln, mouth, right } from "../facekit.ts";

const HAND = ["#FFEB96", "#FBD45E", "#E3A332"];
const r1 = (v) => +v.toFixed(1);
// big open hand, fingers up, centred on (x, y); 4 fingers + thumb
const palm = ({ lin }, x, y, rot = 0, s = 1, flip = 1) =>
  `<g ${Bs}><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * flip} ${s})"><rect x="-10" y="-12" width="20" height="24" rx="8" fill="${lin(HAND, "d")}"/><ellipse cx="-10" cy="3" rx="4.2" ry="8" transform="rotate(-22 -10 3)" fill="${lin(HAND, "d")}"/></g></g>` +
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * flip} ${s})"><path d="M-3.4 -11 V-2 M0.2 -11.5 V-2 M3.8 -11 V-2" stroke="#B87A22" stroke-width="1.2" stroke-linecap="round" opacity=".6"/></g>`;
const wideEyes = (o = {}) => both(eye.wide, { y: 41, ...o });
const mir = (s) => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
const spark = (x, y, R, fill) => `<g ${Bs}><polygon points="${star(x, y, R, R * 0.3, 4)}" fill="${fill}" stroke="${fill}" stroke-width="2" stroke-linejoin="round"/></g>`;

const __batch: Icon[] = [
  {
    u: "1f631",
    n: "face screaming in fear",
    draw: (t) =>
      head(t, "blue", 38) + wideEyes({ r: 9.5, p: 3.2, dx: 14, y: 38 }) + both(brow, { y: 38, by: 16, tilt: -6, arch: 4, dx: 14 }) +
      mouth.open(t, { y: 52, w: 14, d: 32, tongue: false }) +
      palm(t, 23, 62, 12, 1.25) + palm(t, 77, 62, -12, 1.25, -1),
  },
  {
    u: "1fae3",
    n: "face with peeking eye",
    draw: (t) => {
      const f = (x, y0, rot, h) =>
        `<g ${Bs}><g transform="rotate(${rot} ${x + 6} 56)"><rect x="${x}" y="${y0}" width="12" height="${h}" rx="6" fill="${t.lin(HAND, "d")}"/></g></g>`;
      return head(t) + right(eye.wide, { r: 8.5, p: 4.2, y: 42, dx: 15, look: [-1, 1] }) + mouth.curve({ y: 78, w: 12, d: 3 }) +
        f(14, 24, -8, 36) + f(27, 18, -3, 42) + f(40, 18, 1, 42) + f(70, 24, 8, 36) +
        `<g ${Bs}><path d="M18 52 H80 a7 7 0 0 1 7 7 V62 a12 12 0 0 1 -12 12 H30 a12 12 0 0 1 -12 -12Z" fill="${t.lin(HAND, "d")}"/></g>` +
        `<path d="M27 58 V69 M60 58 V69" stroke="#B87A22" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>`;
    },
  },
  {
    u: "1fae1",
    n: "saluting face",
    draw: (t) => {
      const g = t.lin(HAND, "d");
      return head(t, "yellow", 41) + both(eye.dot) + left(brow, { by: 14, arch: 2 }) + right(brow, { by: 15, arch: 2, tilt: 3 }) + mouth.curve({ y: 64, w: 12, d: 5 }) +
        `<g ${Bs}><g transform="translate(71 24) rotate(-24) scale(1.25)"><rect x="-22" y="-6.5" width="40" height="13" rx="6.5" fill="${g}"/><ellipse cx="-2" cy="7" rx="10" ry="3.8" fill="${g}"/></g></g>` +
        `<g transform="translate(71 24) rotate(-24) scale(1.25)"><path d="M-20 -2 H-8 M-20 2.500 H-8" stroke="#B87A22" stroke-width="1" stroke-linecap="round" opacity=".45"/></g>`;
    },
  },
  {
    u: "1f917",
    n: "smiling face with open hands",
    draw: (t) =>
      head(t, "yellow", 38) + both(eye.arch, { y: 41 }) + [-1, 1].map((s) => `<ellipse cx="${50 + s * 25}" cy="56" rx="6.5" ry="4.2" fill="#F0786E" opacity=".5"/>`).join("") +
      mouth.curve({ y: 57, w: 15, d: 8 }) + palm(t, 24, 72, 22, 1.5) + palm(t, 76, 72, -22, 1.5, -1),
  },
  {
    u: "1f92f",
    n: "exploding head",
    draw: (t) => {
      const f = t.rad(["#FFE98A", C.orange, C.red], 0.4, 0.35, 0.8);
      const puff = [[27, 29, 14], [50, 21, 16], [73, 29, 14], [16, 39, 8], [84, 39, 8], [50, 38, 12]];
      const hd = `M25.8 50 L32 44 L40 51 L50 43 L60 51 L68 44 L74.2 50 A29 29 0 1 1 25.8 50Z`;
      return `<g ${B}><g fill="${f}">${puff.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g></g>` +
        `<g fill="#FFF3B0" opacity=".55"><circle cx="46" cy="14" r="6"/><circle cx="22" cy="25" r="4"/></g>` +
        `<g ${B}><path d="${hd}" fill="${t.rad(SKIN.yellow, 0.38, 0.4, 0.75)}"/></g>` +
        both(eye.wide, { y: 66, dx: 13, r: 8, p: 3.6 }) + mouth.oh({ y: 84, rx: 6, ry: 6.5 }) +
        spark(12, 14, 7, C.gold) + spark(88, 14, 7, C.gold) + spark(91, 62, 5, C.orange) + spark(9, 62, 5, C.orange);
    },
  },
  {
    u: "1f973",
    n: "partying face",
    draw: (t) => {
      const conf = [[8, 26, C.red], [93, 36, C.blue], [90, 88, C.green], [9, 86, C.purple], [70, 6, C.pinkD], [10, 56, C.gold]]
        .map(([x, y, c]: any, i) => `<rect x="${x - 3}" y="${y - 1.8}" width="6" height="3.6" rx="1.2" fill="${c}" transform="rotate(${i * 40} ${x} ${y})"/>`).join("");
      const cone = "M28 33 H64 L46 5Z";
      return `<g transform="translate(0 7)">${head(t, "yellow", 38)}</g>` +
        both(eye.dot, { y: 50, rx: 4.4, ry: 6.2 }) + both(brow, { y: 50, by: 12, arch: 3 }) + mouth.curve({ y: 73, w: 13, d: 8 }) +
        `<g ${Bs}><g transform="rotate(-22 46 33)"><path d="${cone}" fill="${t.lin([C.purple, C.pinkD, C.red], "d")}"/></g></g>` +
        `<g transform="rotate(-22 46 33)" ${t.clip(`<path d="${cone}"/>`)}><rect x="20" y="14" width="52" height="4.5" fill="${C.gold}"/><rect x="20" y="23" width="52" height="4.5" fill="${C.gold}"/><circle cx="40" cy="30" r="1.4" fill="#fff"/><circle cx="52" cy="30" r="1.4" fill="#fff"/><circle cx="46" cy="10" r="1.4" fill="#fff"/></g>` +
        `<g ${Bs}><circle cx="35.500" cy="7" r="5" fill="${t.rad([C.paper, C.gold, C.goldD])}"/></g>` +
        `<g ${Bs}><path d="M52 75 Q68 78 77 71" fill="none" stroke="${C.blueM}" stroke-width="5" stroke-linecap="round"/><path d="M77 71 C87 67 86 54 79 56 C75 57 75 63 79 63" fill="none" stroke="${C.red}" stroke-width="3.4" stroke-linecap="round"/></g>` +
        conf;
    },
  },
  {
    u: "1f927",
    n: "sneezing face",
    draw: (t) =>
      head(t, "yellow", 41) + both(eye.squeeze, { y: 40, w: 6.5, h: 5.5 }) + both(brow, { y: 40, by: 12, tilt: -3 }) +
      `<g ${B}><g transform="rotate(-8 48 66)"><path d="M26 56 H68 Q72 58 72 62 V80 Q72 84 68 84 H30 Q26 84 26 80Z" fill="${t.lin([C.paper, "#DDE6EE", "#AFC0D0"], "d")}"/></g></g>` +
      `<g transform="rotate(-8 48 68)"><path d="M26 66 H72 M26 75 H72" stroke="#9FB0C2" stroke-width="1.6" opacity=".7"/><path d="M26 58 H46 L26 70Z" fill="#fff" opacity=".6"/><path d="M36 61 q3 3 6 0 M52 71 q3 3 6 0" fill="none" stroke="#B5C4D3" stroke-width="1.6" stroke-linecap="round"/></g>` +
      palm(t, 72, 77, -28, 1.35) + drop(t, 12, 76, { s: 0.55, rot: -80 }) + drop(t, 8, 62, { s: 0.45, rot: -60 }) + drop(t, 17, 85, { s: 0.4, rot: -100 }),
  },
  {
    u: "1f4a8",
    n: "dashing away",
    draw: ({ lin }) => {
      const g = lin([C.paper, "#C9D4E6", "#8E9DBC"], "d");
      const tail = (y, x0, h) => `<path d="M${x0} ${y} Q${x0 + 18} ${y - h * 0.5} 46 ${y - h} L46 ${y + h} Q${x0 + 18} ${y + h * 0.5} ${x0} ${y}Z" fill="${lin(["#9FB0D2", "#D4DEF0"], "h")}"/>`;
      const bumps = [-50, 10, 70, 130, 190, 250].map((a) => [64 + 21 * Math.cos((a * Math.PI) / 180), 50 + 21 * Math.sin((a * Math.PI) / 180)]);
      let sp = "";
      for (let i = 0; i <= 30; i++) {
        const a = (i / 30) * 2.2 * 2 * Math.PI, r = (i / 30) * 15;
        sp += `${i ? "L" : "M"}${r1(64 + r * Math.cos(a))} ${r1(50 + r * Math.sin(a))}`;
      }
      return `<g ${Bs}>${tail(28, 6, 4.5)}${tail(50, 4, 5.5)}${tail(72, 10, 4.5)}</g>` +
        `<g ${B}><g fill="${g}">${bumps.map(([x, y]) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="10"/>`).join("")}<circle cx="64" cy="50" r="22"/></g></g>` +
        `<path d="${sp}" fill="none" stroke="#8E9DBC" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
    },
  },
  {
    u: "1f4ab",
    n: "dizzy",
    draw: ({ lin }) => {
      const o = lin([C.orange, C.goldM, C.orangeD], "h");
      return `<g ${Bs}><g transform="rotate(-25 50 50)"><path d="M8 50 A42 15 0 0 1 92 50" fill="none" stroke="${o}" stroke-width="5" stroke-linecap="round"/></g></g>` +
        `<g ${B}><g transform="rotate(-10 50 50)"><polygon points="${star(50, 50, 27, 12.5)}" fill="${lin([C.yellow, C.gold, C.goldD], "d")}" stroke="${C.gold}" stroke-width="5" stroke-linejoin="round"/></g></g>` +
        `<g ${Bs}><g transform="rotate(-25 50 50)"><path d="M92 50 A42 15 0 0 1 28 64.4" fill="none" stroke="${o}" stroke-width="5" stroke-linecap="round"/></g></g>` +
        spark(14, 18, 10, C.goldM) + spark(87, 84, 8, C.goldM) + spark(86, 18, 6, C.orange);
    },
  },
  {
    u: "1f479",
    n: "ogre",
    draw: (t) => {
      const horn = (m) => `<path transform="${m}" d="M22 36 C16 24 16 12 24 3.500 C33 11 41 18 46 27Z" fill="${t.lin(["#FFE48A", C.goldM, C.goldD], "d")}"/>`;
      return `<g ${B}>${horn("")}${horn("translate(100 0) scale(-1 1)")}</g>` +
        `<path d="M22 22 q4 -1 7 1 M24 14 q3 0 6 2 M78 22 q-4 -1 -7 1 M76 14 q-3 0 -6 2" fill="none" stroke="${C.goldD}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>` +
        head(t, "red", 39) +
        both(eye.wide, { y: 44, dx: 14, r: 7.2, p: 3.3, look: [0, 1.5] }) +
        both(brow, { y: 44, by: 11, tilt: 12, arch: 0, sw: 5, w: 10, dx: 14 }) +
        `<ellipse cx="45.500" cy="55" rx="1.8" ry="2.2" fill="${MOUTH}"/><ellipse cx="54.500" cy="55" rx="1.8" ry="2.2" fill="${MOUTH}"/>` +
        mouth.open(t, { y: 62, w: 24, d: 22, teeth: false, tongue: false }) +
        `<path d="M32 79 H40 L36 67Z M60 79 H68 L64 67Z" fill="${TEETH}"/>`;
    },
  },
];

export default __batch;
