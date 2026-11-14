// Polish pass 3: redraws that replace weak icons (files named 00-* win in the build).
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const gl = (lin, d = "h") => lin([[0, "#E9F5FB", 0.8], [0.5, "#CBE6F4", 0.7], [1, C.skyD, 0.9]], d);
const arrowD = `-7,0 7,0 7,26 17,26 0,46 -17,26 -7,26`;
const USD = "M6 -7 C4 -12 -6 -12 -6 -6 C-6 0 6 0 6 7 C6 13 -4 13 -6 8 M0 -15 V15";
const hline = (x, y, w, c, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="2.2" rx="1.1" fill="${c}" opacity="${o}"/>`;

// ── mailbox family: tunnel box on a post, door arch at the left, flag on the right side
const mbox = (lin, open, up) => {
  const flag = up
    ? `<g ${B}><rect x="75" y="12" width="5" height="34" rx="2" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/><rect x="79" y="6" width="17" height="16" rx="2.5" fill="${lin([C.red, C.redD], "d")}"/></g>`
    : `<g ${B}><rect x="71" y="38" width="11" height="24" rx="3" fill="${lin([C.red, C.redD], "d")}"/></g><g ${Bs}><circle cx="76.5" cy="42" r="3" fill="${lin([C.gold, C.goldD])}"/></g>`;
  const door = open
    ? `<path d="M15 62 V42 C15 33 21 28 29 28 C37 28 43 33 43 42 V62Z" fill="${C.darkD}"/>
<g transform="rotate(-8 29 50)"><rect x="20" y="42" width="19" height="16" rx="1.5" fill="${lin([C.paper, C.paperD])}"/><path d="M20.5 43 L29.5 51 L38.5 43" fill="none" stroke="${C.goldD}" stroke-width="1.6" stroke-linejoin="round"/></g>
<path d="M15 62 V42 C15 33 21 28 29 28 C37 28 43 33 43 42 V62" fill="none" stroke="${C.sky}" stroke-width="1.6" opacity=".7"/>`
    : `<path d="M15 60 V42 C15 33 21 28 29 28 C37 28 43 33 43 42 V60Z" fill="none" stroke="${C.navyD}" stroke-width="1.5" opacity=".5"/>
<ellipse cx="22" cy="38" rx="3.2" ry="7" transform="rotate(14 22 38)" fill="#fff" opacity=".28"/>
<g ${Bs}><rect x="23.5" y="49" width="11" height="6" rx="3" fill="${lin([C.gold, C.goldD])}"/></g>`;
  return `<g ${B}><rect x="43" y="60" width="14" height="34" fill="${lin([C.woodD, C.woodL, C.wood, C.woodD], "h")}"/><rect x="34" y="89" width="32" height="7" rx="3" fill="${lin([C.wood, C.woodDD])}"/></g>
<g ${B}><path d="M30 23 H78 C87 23 92 31 92 41 V62 H30Z" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<g ${B}><path d="M8 64 V42 C8 30 17 22 29 22 C41 22 50 30 50 42 V64Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
${door}
<g ${B}><rect x="6" y="62" width="88" height="9" rx="4.5" fill="${lin([C.blueM, C.blueD])}"/></g>
${flag}`;
};

const low = (x) => `<g transform="translate(50 50) scale(1.03) translate(-50 -59)">${x}</g>`;

// ── envelope family: cream paper with a firm edge and a darker flap
const env = (lin, x, y, w, h, seal = false) => {
  const r = x + w, b = y + h, m = x + w / 2;
  const fy = y + h * 0.6;
  return `<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${lin(["#F6EBCB", "#D3BF8E"], "d")}" stroke="#8F7A4E" stroke-width="1.8"/></g>
<path d="M${x + 2.5} ${b - 3} L${x + w * 0.4} ${y + h * 0.48} M${r - 2.5} ${b - 3} L${x + w * 0.6} ${y + h * 0.48}" stroke="#A8935F" stroke-width="1.8" stroke-linecap="round" fill="none"/>
<g ${Bs}><path d="M${x + 2.5} ${y + 3} L${m} ${fy} L${r - 2.5} ${y + 3}Z" fill="${lin(["#E6D6AA", "#BBA574"])}" stroke="#8F7A4E" stroke-width="1.8" stroke-linejoin="round"/></g>
${seal ? `<g ${Bs}><circle cx="${m}" cy="${fy - 1}" r="${Math.min(w, h) * 0.12}" fill="${lin([C.red, C.redD], "d")}"/></g>` : ""}`;
};

// ── lock helper copied from objects-5
function lock(lin, open, tf) {
  const t = tf ? ` transform="${tf}"` : "";
  const sh = open ? "M33 54 V27 a17 17 0 0 1 34 0 V35" : "M33 44 V30 a17 17 0 0 1 34 0 V44";
  return `<g ${B}><g${t}><path d="${sh}" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="9" stroke-linecap="round"/></g></g>
<g ${B}><g${t}><rect x="18" y="42" width="64" height="50" rx="9" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g${t}><rect x="23" y="46" width="54" height="3" rx="1.5" fill="#fff" opacity=".35"/><circle cx="50" cy="62" r="6.5" fill="${C.woodDD}"/><path d="M47 64 L45.5 78 H54.5 L53 64Z" fill="${C.woodDD}"/></g>`;
}

const keyShape = (lin) => {
  const g = lin([C.gold, C.goldM, C.goldD], "d");
  return `<path fill-rule="evenodd" d="M5 50 a19 19 0 1 0 38 0 a19 19 0 1 0 -38 0Z M17 50 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z" fill="${g}"/>
<rect x="40" y="45.5" width="64" height="9" rx="3" fill="${g}"/><path d="M80 54 h8 v11 h-8Z M92 54 h8 v8 h-8Z" fill="${g}"/>`;
};

// ── spiral calendar coils
const coil = (lin, x) => `<rect x="${x - 3.2}" y="5" width="6.4" height="20" rx="3.2" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>`;

const __batch: Icon[] = [
  { u: "1f4eb", n: "closed mailbox with raised flag", draw: ({ lin }) => mbox(lin, false, true) },
  { u: "1f4ea", n: "closed mailbox with lowered flag", draw: ({ lin }) => low(mbox(lin, false, false)) },
  { u: "1f4ec", n: "open mailbox with raised flag", draw: ({ lin }) => mbox(lin, true, true) },
  { u: "1f4ed", n: "open mailbox with lowered flag", draw: ({ lin }) => low(mbox(lin, true, false)) },

  { u: "2709-fe0f", n: "envelope", draw: ({ lin }) => env(lin, 6, 20, 88, 60, true) },
  { u: "1f4e7", n: "e mail", draw: ({ lin }) => `${env(lin, 5, 12, 78, 56)}
<g ${B}><circle cx="71" cy="70" r="23" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<circle cx="71" cy="70" r="5.4" fill="none" stroke="${C.paper}" stroke-width="2.6"/>
<path d="M76.4 70 v2.8 a3.4 3.4 0 0 0 6.8 0 V70 a12.2 12.2 0 1 0 -5 9.9" fill="none" stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round"/>` },
  { u: "1f4e8", n: "incoming envelope", draw: ({ lin }) => `${env(lin, 5, 36, 80, 56)}
<g ${B}><polygon points="${arrowD}" transform="translate(86 10) rotate(45) scale(.86)" fill="${lin([C.orange, C.orangeD], "d")}"/></g>` },
  { u: "1f4e9", n: "envelope with arrow", draw: ({ lin }) => `${env(lin, 8, 48, 84, 46)}
<g ${B}><polygon points="${arrowD}" transform="translate(50 4) scale(.92)" fill="${lin([C.orange, C.orangeD], "d")}"/></g>` },

  { u: "1f4b8", n: "money with wings", draw: ({ lin }) => {
    const f = "M0 0 C8 -9 26 -9 36 0 C26 9 8 9 0 0Z";
    const wing = (px, a) => a.map((r) => `<g ${B}><g transform="translate(${px} 52) rotate(${r}) scale(.78)"><path d="${f}" fill="${lin(["#F1F7FD", C.blue, C.blueM], "d")}" stroke="${C.blueD}" stroke-width="1.2"/></g></g>`).join("");
    return `${wing(33, [244, 214, 186])}${wing(67, [-64, -34, -6])}
<g ${B}><g transform="rotate(-8 50 50)"><rect x="25" y="32" width="50" height="36" rx="5" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><rect x="30" y="37" width="40" height="26" rx="3" fill="none" stroke="${C.paper}" stroke-width="1.2" stroke-dasharray="3 2.2" opacity=".75"/>
<circle cx="50" cy="50" r="10" fill="${C.paper}" opacity=".92"/><g transform="translate(50 50) scale(.55)" fill="none" stroke="${C.greenD}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="${USD}"/></g></g>`;
  } },

  { u: "1f3f7-fe0f", n: "label", draw: ({ lin }) => `<g transform="translate(50 52) rotate(38) scale(.9) translate(-50 -50)">
<path d="M50 24 C38 6 36 -2 50 -2 C64 -2 62 6 50 24" fill="none" stroke="${C.woodD}" stroke-width="4" stroke-linecap="round"/>
<g ${B}><path d="M50 10 L74 30 V86 a6 6 0 0 1 -6 6 H32 a6 6 0 0 1 -6 -6 V30Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<circle cx="50" cy="28" r="5.2" fill="${C.woodDD}"/>
<path d="M50 24 C40 12 38 4 50 4" fill="none" stroke="${C.woodD}" stroke-width="3.4" stroke-linecap="round"/>
<g ${Bs}><rect x="35" y="45" width="30" height="34" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
${hline(39, 52, 22, C.yellowD, 0.85)}${hline(39, 60, 16, C.yellowD, 0.6)}${hline(39, 68, 20, C.yellowD, 0.6)}</g>` },

  { u: "1f50f", n: "locked with pen", draw: ({ lin }) => `${lock(lin, false, "translate(-2 4) scale(.86)")}
<g ${B}><g transform="translate(68 66) rotate(40) scale(.62) translate(-50 -63)">
<path d="M50 112 L30 70 C24 56 34 40 36 26 H64 C66 40 76 56 70 70Z" fill="${lin([C.navyD, "#6F7DA6", C.navy, C.navyD], "h")}"/>
<rect x="34" y="12" width="32" height="16" rx="5" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
<rect x="33" y="40" width="34" height="7" fill="${lin([C.gold, C.goldD])}"/></g></g>
<g transform="translate(68 66) rotate(40) scale(.62) translate(-50 -63)"><path d="M50 66 V106" stroke="${C.paperD}" stroke-width="3.6" stroke-linecap="round"/><circle cx="50" cy="60" r="5" fill="${C.paperD}"/></g>` },

  { u: "1f510", n: "locked with key", draw: ({ lin }) => `${lock(lin, false, "translate(-3 1) scale(.84)")}
<g ${B}><g transform="translate(80 83) rotate(188) scale(.6) translate(-24 -50)">${keyShape(lin)}</g></g>` },

  { u: "1f5d3-fe0f", n: "spiral calendar", draw: ({ lin }) => {
    const xs = [21, 33, 45, 57, 69, 81];
    const cells: string[] = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const hot = r === 1 && c === 2;
      cells.push(`<rect x="${19 + c * 14}" y="${50 + r * 13}" width="10" height="9" rx="2" fill="${hot ? C.red : C.blueM}" opacity="${hot ? 1 : 0.55}"/>`);
    }
    return `<g ${B}><rect x="12" y="20" width="80" height="74" rx="7" fill="${lin([C.paperD, C.creamD])}"/></g>
<g ${B}><rect x="8" y="16" width="80" height="74" rx="7" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
<path d="M8 23 a7 7 0 0 1 7 -7 H81 a7 7 0 0 1 7 7 V42 H8Z" fill="${lin([C.blue, C.blueD])}"/>
${xs.map((x) => `<circle cx="${x - 2}" cy="22" r="3" fill="#17243f" opacity=".6"/>`).join("")}
${cells.join("")}
<g ${Bs}>${xs.map((x) => coil(lin, x - 2)).join("")}</g>` ;
  } },

  { u: "1f5c2-fe0f", n: "card index dividers", draw: ({ lin }) => {
    const card = (x, w, top, tx, c) => `<g ${B}><rect x="${x}" y="${top}" width="${w}" height="${66 - top}" rx="4" fill="${lin([C.paper, C.paperD])}" stroke="#B9A67A" stroke-width="1.2"/><rect x="${tx}" y="${top - 9}" width="22" height="13" rx="4" fill="${lin(c, "d")}"/></g><rect x="${x + 6}" y="${top + 8}" width="${w - 12}" height="3" rx="1.5" fill="${c[1]}" opacity=".55"/>`;
    return `${card(14, 72, 16, 60, [C.red, C.redD])}${card(10, 80, 30, 36, [C.green, C.greenD])}${card(14, 72, 44, 14, [C.blue, C.blueD])}
<g ${B}><path d="M6 58 H94 V86 a6 6 0 0 1 -6 6 H12 a6 6 0 0 1 -6 -6Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${Bs}><rect x="32" y="66" width="36" height="12" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>${hline(37, 70, 26, C.woodD, 0.7)}${hline(37, 74.2, 16, C.woodD, 0.5)}` ;
  } },

  { u: "2697-fe0f", n: "alembic", draw: ({ lin, clip }) => `
<g ${B}><path d="M79 54 V64 L70 88 a4 4 0 0 0 4 5 H92 a4 4 0 0 0 4 -5 L87 64 V54Z" fill="${gl(lin, "d")}" stroke="#7FA6C2" stroke-width="1.6"/></g>
<path d="M75 80 H91 L93 88 H73Z" fill="${lin([C.green, C.greenD])}" opacity=".9"/>
<g ${B}><path d="M52 46 C66 30 86 32 83 50" fill="none" stroke="#7FA6C2" stroke-width="11.5" stroke-linecap="round"/>
<path d="M52 46 C66 30 86 32 83 50" fill="none" stroke="${gl(lin, "d")}" stroke-width="9" stroke-linecap="round"/></g>
<g ${B}><rect x="28" y="24" width="12" height="18" fill="${gl(lin)}" stroke="#7FA6C2" stroke-width="1.6"/>
<circle cx="34" cy="64" r="28" fill="${gl(lin, "d")}" stroke="#7FA6C2" stroke-width="1.8"/></g>
<g ${clip('<circle cx="34" cy="64" r="27"/>')}><path d="M4 62 Q19 55 34 62 T66 62 V96 H4Z" fill="${lin([C.green, C.greenM, C.greenD])}" opacity=".92"/></g>
<circle cx="25" cy="76" r="3" fill="#fff" opacity=".65"/><circle cx="40" cy="82" r="2.2" fill="#fff" opacity=".65"/><circle cx="46" cy="70" r="1.8" fill="#fff" opacity=".6"/>
<ellipse cx="21" cy="52" rx="3.6" ry="8" transform="rotate(25 21 52)" fill="#fff" opacity=".6"/>
<g ${B}><rect x="27" y="11" width="14" height="15" rx="3" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${Bs}><path d="M83 60 C80 66 78 68 78 71 a5 5 0 0 0 10 0 C88 68 86 66 83 60Z" fill="${lin([C.green, C.greenD])}" opacity="0"/></g>` },

  { u: "1f9ec", n: "dna", draw: ({ lin }) => {
    const A = 19, N = 12, K = 4;
    const pt = (t, s) => [50 + s * A * Math.sin(2 * Math.PI * 2 * t), 7 + 86 * t];
    const seg = (k, s) => Array.from({ length: N + 1 }, (_, i) => pt((k + i / N) / K, s).map((v) => v.toFixed(1)).join(" ")).join(" L");
    const ra = lin([C.blue, C.blueM, C.blueD], "d"), rb = lin([C.pink, C.pinkD, C.redM], "d");
    const rot = (x) => `<g transform="rotate(-28 50 50)">${x}</g>`;
    let back = "", front = "";
    for (let k = 0; k < K; k++) {
      const sf = k % 2 ? -1 : 1;
      const pathF = `<path d="M${seg(k, sf)}" fill="none" stroke="${sf > 0 ? ra : rb}" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      const pathB = `<path d="M${seg(k, -sf)}" fill="none" stroke="${sf > 0 ? rb : ra}" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      back += `<g ${B}>${rot(pathB)}</g>`;
      front += `<g ${B}>${rot(pathF)}</g>`;
    }
    const rungs = [0.5, 1.5, 2.5, 3.5].flatMap((m) => [-0.2, 0.2].map((d) => (m + d) / K)).map((t) => {
      const p = pt(t, 1), q = pt(t, -1);
      return `M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
    }).join(" ");
    return `${back}<g ${Bs}>${rot(`<path d="${rungs}" stroke="${C.goldM}" stroke-width="5" stroke-linecap="round"/>`)}</g>${front}`;
  } },

  { u: "1f9f4", n: "lotion bottle", draw: ({ lin }) => `
<g ${B}><rect x="26" y="36" width="48" height="56" rx="13" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<ellipse cx="34" cy="52" rx="3.6" ry="9" transform="rotate(8 34 52)" fill="#fff" opacity=".28"/>
<g ${B}><rect x="39" y="28" width="22" height="10" rx="3" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/><rect x="45.5" y="16" width="9" height="14" rx="2" fill="${lin([C.red, C.redD], "h")}"/>
<path d="M22 8 H68 a8 8 0 0 1 8 8 a4 4 0 0 1 -4 4 H40 V16 H22Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><rect x="33" y="52" width="34" height="27" rx="5" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M50 56 C47 61 45 63 45 66.5 a5 5 0 0 0 10 0 C55 63 53 61 50 56Z" fill="${C.blueM}"/>
<rect x="38" y="72.4" width="24" height="2.4" rx="1.2" fill="${C.tealD}" opacity=".5"/>` },
];

export default __batch;
