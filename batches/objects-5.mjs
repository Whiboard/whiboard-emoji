// objects-5: office, locks, keys, tools, weapons.
import { B, Bs, C, star } from "../kit.mjs";

const P = (lin) => lin([C.paper, C.paperD]);
const hline = (x, y, w, c = "#9C8F74", o = 0.7) => `<rect x="${x}" y="${y}" width="${w}" height="1.8" rx=".9" fill="${c}" opacity="${o}"/>`;

// folder: open=false closed manila folder, open=true open folder with papers
const folder = (lin, open) => open
  ? `<g ${B}><path d="M8 24 a4 4 0 0 1 4 -4 H36 L43 27 H84 a4 4 0 0 1 4 4 V80 H8Z" fill="${lin([C.yellowD, "#C98A22"])}"/></g>
<g ${Bs}><rect x="20" y="30" width="58" height="42" rx="2" fill="${P(lin)}" transform="rotate(-4 50 50)"/></g>
<g transform="rotate(-4 50 50)">${hline(27, 40, 40)}${hline(27, 47, 30)}${hline(27, 54, 36)}</g>
<g ${B}><path d="M14 46 a3 3 0 0 1 3 -2.4 H96 a3 3 0 0 1 2.9 3.6 L90 82 a4 4 0 0 1 -4 3 H8 a3 3 0 0 1 -2.9 -3.6Z" transform="translate(-1 3)" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>`
  : `<g ${B}><path d="M6 22 a5 5 0 0 1 5 -5 H35 a5 5 0 0 1 4 2 L44 26 H89 a5 5 0 0 1 5 5 V80 a5 5 0 0 1 -5 5 H11 a5 5 0 0 1 -5 -5Z" fill="${lin([C.yellowM, C.yellowD])}"/></g>
<g ${B}><rect x="6" y="34" width="88" height="51" rx="5" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<rect x="14" y="40" width="72" height="2" rx="1" fill="#fff" opacity=".3"/>
<g ${Bs}><rect x="38" y="52" width="24" height="13" rx="2.5" fill="${P(lin)}"/></g>${hline(43, 57, 14)}`;

export default [
  { u: "1f5f3-fe0f", n: "ballot box with ballot", draw: ({ lin }) => `
<g ${Bs}><g transform="rotate(-8 50 30)"><rect x="29" y="6" width="38" height="46" rx="2.5" fill="${P(lin)}"/></g></g>
<path d="M38 27 L46 36 L61 17" fill="none" stroke="${C.greenD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 50 30)"/>
<g ${B}><rect x="14" y="44" width="72" height="46" rx="5" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="9" y="38" width="82" height="13" rx="4.5" fill="${lin([C.blueM, C.blueD])}"/></g>
<rect x="31" y="42.5" width="38" height="4.2" rx="2.1" fill="${C.navyD}"/>
<g ${Bs}><rect x="34" y="59" width="32" height="22" rx="3" fill="${P(lin)}"/></g>
<polygon points="${star(50, 70, 7, 3)}" fill="${C.goldM}"/>` },

  { u: "2712-fe0f", n: "black nib", draw: ({ lin }) => `
<g ${B}><g transform="rotate(45 50 50)">
<path d="M50 112 L30 70 C24 56 34 40 36 26 H64 C66 40 76 56 70 70Z" fill="${lin([C.navyD, "#5F6B8F", C.navy, C.navyD], "h")}"/>
<rect x="34" y="14" width="32" height="14" rx="4" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
</g></g>
<g transform="rotate(45 50 50)" fill="none" stroke="${C.paperD}" stroke-width="2.2" stroke-linecap="round"><path d="M50 62 V108"/><circle cx="50" cy="56" r="4.6" fill="${C.paperD}" stroke="none"/><path d="M40 36 C40 46 33 56 37 66 M60 36 C60 46 67 56 63 66" opacity=".45" stroke-width="1.6"/></g>` },

  { u: "1f58a-fe0f", n: "pen", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50)">
<polygon points="-8,50 12,43 12,57" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
<rect x="12" y="41" width="14" height="18" fill="${lin([C.darkD, C.dark], "h")}"/>
<rect x="26" y="40" width="54" height="20" rx="2" fill="${lin([C.blue, C.blueM, C.blueD])}"/>
<rect x="80" y="41.5" width="12" height="17" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<rect x="92" y="44" width="10" height="12" rx="3" fill="${lin([C.metalL, C.metalD])}"/>
</g></g>
<g transform="rotate(-45 50 50)"><rect x="30" y="45" width="38" height="5" rx="2.5" fill="#fff" opacity=".22"/>
<g ${Bs}><rect x="48" y="34" width="38" height="5.5" rx="2.7" fill="${lin([C.metalL, C.metalD])}"/></g></g>` },

  { u: "1f58d-fe0f", n: "crayon", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50)">
<polygon points="-8,50 14,40 14,60" fill="${lin([C.red, C.redM])}"/>
<rect x="14" y="40" width="80" height="20" rx="2" fill="${lin([C.red, C.redM, C.redD])}"/>
<rect x="26" y="39" width="56" height="22" fill="${lin([C.paper, C.paperD])}"/>
<rect x="94" y="41" width="3" height="18" fill="${C.redD}"/>
</g></g>
<g transform="rotate(-45 50 50)"><rect x="26" y="43.5" width="56" height="3" fill="${C.redM}"/><rect x="26" y="53.5" width="56" height="3" fill="${C.redM}"/>
<path d="M36 50 H72" stroke="${C.redD}" stroke-width="2.2" stroke-dasharray="3 3" opacity=".7"/><rect x="14" y="43" width="80" height="4" fill="#fff" opacity=".16"/></g>` },

  { u: "1f4dd", n: "memo", draw: ({ lin }) => `
<g ${B}><rect x="10" y="8" width="58" height="84" rx="5" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<rect x="10" y="8" width="58" height="12" rx="5" fill="${C.blueM}"/>
${[0, 1, 2, 3, 4].map((i) => hline(19, 30 + i * 11, 38 - (i === 4 ? 14 : 0), C.blueM, 0.55)).join("")}
<g ${B}><g transform="translate(-9 -5) rotate(40 70 62)">
<polygon points="64,100 70,86 76,100" fill="#EBCB9A"/><polygon points="67,95 70,86 73,95" fill="${C.dark}"/>
<rect x="64" y="34" width="12" height="52" fill="${lin([C.yellow, C.yellowM, C.yellowD], "h")}"/>
<rect x="64" y="26" width="12" height="9" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/><path d="M64 20 a6 6 0 0 1 12 0 V26 H64Z" fill="${lin([C.pink, C.pinkD])}"/>
</g></g>` },

  { u: "1f4bc", n: "briefcase", draw: ({ lin }) => `
<g ${B}><path d="M36 28 V20 a5 5 0 0 1 5 -5 H59 a5 5 0 0 1 5 5 V28" fill="none" stroke="${lin([C.woodD, C.woodDD])}" stroke-width="6"/></g>
<g ${B}><rect x="6" y="26" width="88" height="62" rx="9" fill="${lin([C.wood, C.woodD, C.woodDD], "d")}"/></g>
<rect x="6" y="50" width="88" height="3" fill="${C.woodDD}" opacity=".6"/>
<rect x="12" y="31" width="76" height="3" rx="1.5" fill="#fff" opacity=".2"/>
<g ${Bs}><rect x="42" y="43" width="16" height="17" rx="3" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<rect x="48" y="49" width="4" height="6" rx="2" fill="${C.goldD}"/>` },

  { u: "1f4c1", n: "file folder", draw: ({ lin }) => folder(lin, false) },
  { u: "1f4c2", n: "open file folder", draw: ({ lin }) => folder(lin, true) },

  { u: "1f5c2-fe0f", n: "card index dividers", draw: ({ lin }) => {
    const card = (y, tx, c) => `<g ${B}><rect x="10" y="${y}" width="80" height="${92 - y}" rx="5" fill="${lin(c, "d")}"/><rect x="${tx}" y="${y - 9}" width="26" height="14" rx="4" fill="${lin(c, "d")}"/></g>`;
    return `${card(22, 12, [C.blue, C.blueD])}${card(40, 37, [C.green, C.greenD])}${card(58, 62, [C.yellow, C.yellowM, C.yellowD])}
<rect x="19" y="66" width="0" height="0"/>${hline(20, 70, 34, C.woodD, 0.5)}${hline(20, 77, 24, C.woodD, 0.4)}`;
  } },

  { u: "1f4c5", n: "calendar", draw: ({ lin }) => cal(lin, 0) },
  { u: "1f4c6", n: "tear off calendar", draw: ({ lin }) => cal(lin, 1) },
  { u: "1f5d2-fe0f", n: "spiral notepad", draw: ({ lin }) => `
<g ${B}><g transform="rotate(4 50 50)"><rect x="14" y="14" width="72" height="78" rx="5" fill="${lin(["#FFF2B8", "#F3D874"], "d")}"/></g></g>
<g transform="rotate(4 50 50)">${[0, 1, 2, 3, 4].map((i) => hline(24, 36 + i * 11, i === 4 ? 30 : 52, C.blueM, 0.6)).join("")}<rect x="22" y="22" width="0" height="0"/>
<g ${Bs}>${coils(lin, 6, 20, 12, 12)}</g></g>` },
  { u: "1f5d3-fe0f", n: "spiral calendar", draw: ({ lin }) => cal(lin, 2) },

  { u: "1f4c7", n: "card index", draw: ({ lin }) => `
<g ${B}><rect x="14" y="14" width="72" height="56" rx="5" fill="${lin([C.blue, C.blueD], "d")}"/><rect x="58" y="7" width="26" height="14" rx="4" fill="${lin([C.blue, C.blueD], "d")}"/></g>
<g ${B}><rect x="8" y="32" width="84" height="58" rx="5" fill="${P(lin)}"/></g>
<rect x="8" y="32" width="84" height="11" rx="5" fill="${C.red}"/><rect x="8" y="38" width="84" height="5" fill="${C.red}"/>
<g ${Bs}><circle cx="29" cy="60" r="6.5" fill="${lin([C.pinkD, C.red])}"/><path d="M17 82 C17 70 41 70 41 82Z" fill="${lin([C.blueM, C.blueD])}"/></g>
${hline(50, 54, 32, C.woodD, 0.6)}${hline(50, 62, 24, C.woodD, 0.5)}${hline(50, 70, 30, C.woodD, 0.5)}${hline(50, 78, 18, C.woodD, 0.4)}` },

  { u: "1f4c8", n: "chart increasing", draw: ({ lin }) => chart(lin, 1) },
  { u: "1f4c9", n: "chart decreasing", draw: ({ lin }) => chart(lin, 0) },
  { u: "1f4ca", n: "bar chart", draw: ({ lin }) => {
    const bars = [[18, 24, C.blue, C.blueD], [36, 42, C.green, C.greenD], [54, 32, C.yellow, C.yellowD], [72, 56, C.red, C.redD]];
    return `<g ${B}><rect x="6" y="8" width="88" height="84" rx="7" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M16 18 V80 H86" fill="none" stroke="${C.dark}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<g ${Bs}>${bars.map(([x, h, a, b]) => `<rect x="${x + 2}" y="${79 - h}" width="13" height="${h}" rx="2" fill="${lin([a, b])}"/>`).join("")}</g>`;
  } },

  { u: "1f4cb", n: "clipboard", draw: ({ lin }) => `
<g ${B}><rect x="14" y="10" width="72" height="82" rx="8" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><rect x="23" y="20" width="54" height="68" rx="3" fill="${P(lin)}"/></g>
<path d="M30 38 l3 3 l6 -7 M30 53 l3 3 l6 -7 M30 68 l3 3 l6 -7" fill="none" stroke="${C.greenD}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
${hline(45, 36, 24, C.blueM, 0.6)}${hline(45, 51, 24, C.blueM, 0.6)}${hline(45, 66, 18, C.blueM, 0.6)}
<g ${B}><path d="M35 9 a4 4 0 0 1 4 -4 H61 a4 4 0 0 1 4 4 V24 H35Z" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/></g>
<rect x="43" y="10" width="14" height="5" rx="2.5" fill="${C.metalDD}" opacity=".7"/>` },

  { u: "1f4cd", n: "round pushpin", draw: ({ lin, rad }) => `
<g ${Bs}><g transform="rotate(30 50 50)"><polygon points="48.2,52 51.8,52 50.4,97 49.6,97" fill="${lin([C.metalL, C.metalD], "h")}"/></g></g>
<g ${B}><g transform="rotate(30 50 50)">
<rect x="38" y="42" width="24" height="12" rx="3" fill="${lin([C.redD, C.red, C.redM, C.redD], "h")}"/>
<circle cx="50" cy="28" r="22" fill="${rad(["#F9A79C", C.red, C.redD], 0.36, 0.3, 0.85)}"/>
</g></g>
<ellipse cx="38" cy="20" rx="6" ry="3.4" transform="rotate(-40 38 20)" fill="#fff" opacity=".5"/>` },

  { u: "1f587-fe0f", n: "linked paperclips", draw: ({ lin }) => {
    const d = "M62 36 V68 A12 12 0 0 1 38 68 V28 A9 9 0 0 1 56 28 V64 A6 6 0 0 1 44 64 V36";
    const clip = (dx, c) => `<g ${Bs}><g transform="rotate(36 50 50) translate(${dx} 0) translate(50 49.5) scale(1.12) translate(-50 -49.5)"><path d="${d}" fill="none" stroke="${lin(c, "d")}" stroke-width="4.4" stroke-linecap="round"/></g></g>`;
    return `${clip(-13, [C.metalL, C.metal, C.metalD])}${clip(13, [C.goldM, C.gold, C.goldD])}`;
  } },

  { u: "1f5c3-fe0f", n: "card file box", draw: ({ lin }) => {
    const card = (x, y, r, c) => `<g ${Bs}><g transform="rotate(${r} ${x + 11} ${y + 20})"><rect x="${x}" y="${y}" width="24" height="40" rx="2.5" fill="${lin(c)}"/></g></g>`;
    return `${card(20, 8, -8, [C.paper, C.paperD])}${card(38, 6, 2, [C.blue, C.blueD])}${card(56, 9, 9, [C.paper, C.paperD])}
<g ${B}><path d="M8 40 H92 V84 a6 6 0 0 1 -6 6 H14 a6 6 0 0 1 -6 -6Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}><rect x="5" y="34" width="90" height="14" rx="5" fill="${lin([C.wood, C.woodD])}"/></g>
<g ${Bs}><rect x="34" y="58" width="32" height="20" rx="3" fill="${P(lin)}"/></g><rect x="43" y="66" width="14" height="5" rx="2.5" fill="${C.woodDD}" opacity=".7"/>`;
  } },

  { u: "1f5c4-fe0f", n: "file cabinet", draw: ({ lin }) => {
    const dr = (y, h) => `<g ${B}><rect x="26" y="${y}" width="48" height="${h}" rx="3.5" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${Bs}><rect x="38" y="${y + 6}" width="24" height="9" rx="2" fill="${P(lin)}"/></g>${hline(42, y + 10, 16, C.blueM, 0.7)}
<g ${Bs}><rect x="40" y="${y + h - 13}" width="20" height="5" rx="2.5" fill="${lin([C.goldM, C.goldD])}"/></g>`;
    return `<g ${B}><rect x="18" y="5" width="64" height="90" rx="6" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>${dr(12, 38)}${dr(54, 34)}`;
  } },

  { u: "1f5d1-fe0f", n: "wastebasket", draw: ({ lin }) => `
<g ${B}><path d="M20 34 H80 L74 86 a6 6 0 0 1 -6 5 H32 a6 6 0 0 1 -6 -5Z" fill="${lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h")}"/></g>
<path d="M36 42 L38 84 M46 42 V86 M54 42 V86 M64 42 L62 84" stroke="${C.metalDD}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
<g ${B}><rect x="38" y="12" width="24" height="10" rx="4" fill="${lin([C.metalL, C.metalD])}"/><rect x="11" y="21" width="78" height="13" rx="5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>` },

  { u: "1f512", n: "locked", draw: ({ lin }) => lock(lin, false, "") },
  { u: "1f513", n: "unlocked", draw: ({ lin }) => lock(lin, true, "") },
  { u: "1f50f", n: "locked with pen", draw: ({ lin }) => `${lock(lin, false, "translate(-5 -3)")}
<g ${B}><g transform="translate(72 73) rotate(-25) scale(.5) translate(-50 -64)">${nibShape(lin)}</g></g>
<g transform="translate(72 73) rotate(-25) scale(.5) translate(-50 -64)">${nibLines()}</g>` },
  { u: "1f510", n: "locked with key", draw: ({ lin }) => `${lock(lin, false, "translate(-5 -4)")}
<g ${B}><g transform="translate(73 80) rotate(-135) scale(.6) translate(-24 -50)">${keyShape(lin, false)}</g></g>` },
  { u: "1f511", n: "key", draw: ({ lin }) => `<g ${B}><g transform="rotate(45 50 50) translate(50 50) scale(1.04) translate(-52 -50)">${keyShape(lin, false)}</g></g>` },
  { u: "1f5dd-fe0f", n: "old key", draw: ({ lin }) => `<g ${B}><g transform="rotate(45 50 50) translate(50 50) scale(.98) translate(-52 -55)">${keyShape(lin, true)}</g></g>` },

  { u: "1f528", n: "hammer", draw: ({ lin }) => `<g ${B}><g transform="translate(8 8) rotate(-45 50 50) translate(50 50) scale(.93) translate(-50 -50)">${handle(lin)}${hammerHead(lin)}</g></g>` },
  { u: "1fa93", n: "axe", draw: ({ lin }) => `<g ${B}><g transform="translate(0 8) rotate(45 50 50)">${handle(lin)}
<path d="M45 6 C20 -4 2 14 4 40 C14 34 28 36 45 40Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/>
<rect x="42" y="4" width="16" height="40" rx="3" fill="${lin([C.metal, C.metalD, C.metalDD], "h")}"/></g></g>` },
  { u: "26cf-fe0f", n: "pick", draw: ({ lin }) => `<g ${B}><g transform="translate(-9 8) rotate(45 50 50)">${handle(lin)}${pickHead(lin)}</g></g>` },
  { u: "2692-fe0f", n: "hammer and pick", draw: ({ lin }) => `<g ${B}><g transform="translate(2 8) rotate(-45 50 50) translate(50 50) scale(.84) translate(-50 -50)">${handle(lin)}${hammerHead(lin)}</g></g>
<g ${B}><g transform="translate(2 8) rotate(45 50 50) translate(50 50) scale(.84) translate(-50 -50)">${handle(lin)}${pickHead(lin)}</g></g>` },
  { u: "1f6e0-fe0f", n: "hammer and wrench", draw: ({ lin }) => `<g ${B}><g transform="translate(8 7) rotate(45 50 50) translate(50 50) scale(.9) translate(-50 -50)">${wrench(lin)}</g></g>
<g ${B}><g transform="translate(8 7) rotate(-45 50 50) translate(50 50) scale(.9) translate(-50 -50)">${handle(lin)}${hammerHead(lin)}</g></g>` },
  { u: "1f5e1-fe0f", n: "dagger", draw: ({ lin }) => `<g ${B}><g transform="rotate(45 50 50) translate(50 50) scale(1.08) translate(-50 -50)">${sword(lin, 1.5)}</g></g>` },
  { u: "2694-fe0f", n: "crossed swords", draw: ({ lin }) => `<g ${B}><g transform="rotate(-45 50 50) translate(50 50) scale(.96) translate(-50 -50)">${sword(lin, 1.3)}</g></g>
<g ${B}><g transform="rotate(45 50 50) translate(50 50) scale(.96) translate(-50 -50)">${sword(lin, 1.3)}</g></g>` },
];

function coils(lin, n, x0, y, gap) {
  return Array.from({ length: n }, (_, i) => `<rect x="${x0 + i * gap}" y="${y - 6}" width="4.4" height="13" rx="2.2" fill="${lin([C.metalL, C.metalD])}"/>`).join("");
}

function chart(lin, up) {
  const pts = up ? "20,70 38,52 52,60 76,28" : "20,28 38,46 52,38 76,68";
  const col = up ? C.greenM : C.redM;
  const [x, y] = up ? [76, 28] : [76, 68];
  const head = up ? `${x + 6},${y - 6} ${x - 9},${y - 4} ${x + 3},${y + 9}` : `${x + 6},${y + 6} ${x - 9},${y + 4} ${x + 3},${y - 9}`;
  return `<g ${B}><rect x="6" y="8" width="88" height="84" rx="7" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M16 18 V80 H86" fill="none" stroke="${C.dark}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<g ${Bs}><polyline points="${pts}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><polygon points="${head}" fill="${col}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/></g>`;
}

function cal(lin, k) {
  const hd = k === 2 ? [C.blue, C.blueD] : [C.red, C.redD];
  const cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    if (k === 1) continue;
    const hot = r === 1 && c === 2;
    cells.push(`<rect x="${19 + c * 13}" y="${46 + r * 14}" width="9" height="9" rx="2" fill="${hot ? C.red : C.blueM}" opacity="${hot ? 1 : 0.5}"/>`);
  }
  const big = k === 1 ? `<path d="M36 46 H64 L47 82" fill="none" stroke="${C.dark}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` : "";
  const under = k === 1 ? `<g ${Bs}><rect x="14" y="20" width="76" height="72" rx="6" fill="${lin([C.paperD, C.creamD])}"/></g>` : "";
  const rings = k === 2 ? `<g ${Bs}>${coils(lin, 7, 17, 12, 11)}</g>` : `<g ${Bs}><rect x="27" y="6" width="5" height="16" rx="2.5" fill="${lin([C.metalL, C.metalD])}"/><rect x="68" y="6" width="5" height="16" rx="2.5" fill="${lin([C.metalL, C.metalD])}"/></g>`;
  return `${under}<g ${B}><rect x="8" y="${k === 1 ? 12 : 14}" width="84" height="${k === 1 ? 74 : 76}" rx="7" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M8 ${k === 1 ? 19 : 21} a7 7 0 0 1 7 -7 H85 a7 7 0 0 1 7 7 V36 H8Z" fill="${lin(hd)}"/>
${cells.join("")}${big}${rings}`;
}

function lock(lin, open, tf) {
  const t = tf ? ` transform="${tf}"` : "";
  const sh = open ? "M33 54 V27 a17 17 0 0 1 34 0 V35" : "M33 44 V30 a17 17 0 0 1 34 0 V44";
  return `<g ${B}><g${t}><path d="${sh}" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="9" stroke-linecap="round"/></g></g>
<g ${B}><g${t}><rect x="18" y="42" width="64" height="50" rx="9" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g${t}><rect x="23" y="46" width="54" height="3" rx="1.5" fill="#fff" opacity=".35"/><circle cx="50" cy="62" r="6.5" fill="${C.woodDD}"/><path d="M47 64 L45.5 78 H54.5 L53 64Z" fill="${C.woodDD}"/></g>`;
}

function nibShape(lin) {
  return `<path d="M50 112 L30 70 C24 56 34 40 36 26 H64 C66 40 76 56 70 70Z" fill="${lin([C.navyD, "#5F6B8F", C.navy, C.navyD], "h")}"/><rect x="34" y="14" width="32" height="14" rx="4" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>`;
}
function nibLines() {
  return `<path d="M50 62 V108" stroke="${C.paperD}" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="56" r="4.6" fill="${C.paperD}"/>`;
}

// horizontal key: bow at left (centre 24,50), shaft to the right
function keyShape(lin, old) {
  const g = lin(old ? ["#E8B550", C.goldM, C.goldD] : [C.gold, C.goldM, C.goldD], "d");
  if (old) {
    return `<path fill-rule="evenodd" d="M24 28 a11 11 0 0 1 11 11 a11 11 0 0 1 11 11 a11 11 0 0 1 -11 11 a11 11 0 0 1 -11 11 a11 11 0 0 1 -11 -11 a11 11 0 0 1 -11 -11 a11 11 0 0 1 11 -11 a11 11 0 0 1 11 -11Z M24 50 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0Z" fill="${g}"/>
<rect x="44" y="45.5" width="60" height="9" rx="2.5" fill="${g}"/><rect x="52" y="41" width="6" height="18" rx="2" fill="${g}"/><rect x="60" y="43" width="4" height="14" rx="2" fill="${g}"/>
<path d="M92 54 h12 v12 h-5 v-6 h-3 v6 h-4Z" fill="${g}"/>`;
  }
  return `<path fill-rule="evenodd" d="M5 50 a19 19 0 1 0 38 0 a19 19 0 1 0 -38 0Z M17 50 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z" fill="${g}"/>
<rect x="40" y="45.5" width="64" height="9" rx="3" fill="${g}"/><path d="M80 54 h8 v11 h-8Z M92 54 h8 v8 h-8Z" fill="${g}"/>`;
}

const handle = (lin) => `<rect x="43" y="14" width="14" height="86" rx="5" fill="${lin([C.woodD, C.woodL, C.wood, C.woodDD], "h")}"/>`;
const hammerHead = (lin) => `<path d="M20 4 H70 a10 10 0 0 1 10 10 V22 a10 10 0 0 1 -10 10 H20Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<path d="M20 5 C10 6 3 12 -2 26 C8 21 14 22 20 25Z" fill="${lin([C.metal, C.metalD], "d")}"/><rect x="68" y="3" width="13" height="30" rx="3" fill="${lin([C.metalD, C.metalDD], "h")}"/>`;
const pickHead = (lin) => `<path d="M-2 30 C8 6 32 0 50 0 C68 0 92 6 102 30 C88 18 70 14 50 14 C30 14 12 18 -2 30Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/><rect x="42" y="2" width="16" height="22" rx="3" fill="${lin([C.metal, C.metalD, C.metalDD], "h")}"/>`;
const wrench = (lin) => `<path d="M43 3.3 L43 19 H57 V3.3 A20 20 0 1 1 43 3.3Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/><rect x="42" y="34" width="16" height="66" rx="8" fill="${lin([C.metalD, C.metalL, C.metal, C.metalDD], "h")}"/>`;
const sword = (lin, w) => `<polygon points="50,-4 ${50 - 7 * w},66 50,66" fill="${lin([C.metalL, C.metal])}"/><polygon points="50,-4 ${50 + 7 * w},66 50,66" fill="${lin([C.metal, C.metalD])}"/>
<rect x="24" y="64" width="52" height="9" rx="4.5" fill="${lin([C.goldM, C.goldD])}"/><rect x="45.5" y="73" width="9" height="22" rx="2" fill="${lin([C.woodL, C.woodD], "h")}"/><circle cx="50" cy="99" r="6.5" fill="${lin([C.gold, C.goldD])}"/>`;
