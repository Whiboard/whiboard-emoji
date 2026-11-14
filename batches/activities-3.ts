// activities-3: games, toys, card suits, masks, sewing.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const circ = (x, y, r) => `M${x - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

// matryoshka in local coords, centre x 0, bottom y 40, top y -40
const doll = (lin, x, s, a, b) => {
  const T = `transform="translate(${x} ${90 - 40 * s}) scale(${s})"`;
  return `<g ${B}><g ${T}><path d="M-22 38 C-26 10 -14 -6 -14 -22 C-14 -40 14 -40 14 -22 C14 -6 26 10 22 38 Q0 44 -22 38Z" fill="${lin(a, "d")}"/></g></g>
<g ${T}><ellipse cx="0" cy="-17" rx="10" ry="11" fill="${lin(["#FBE3C6", "#EBBF95"])}"/>
<path d="M-14 -20 C-14 -42 14 -42 14 -20 C8 -29 -8 -29 -14 -20Z" fill="${b}"/>
<ellipse cx="0" cy="19" rx="12" ry="15" fill="${lin([C.paper, C.paperD])}"/>
<circle cx="0" cy="17" r="4.6" fill="${C.redM}"/><circle cx="-6" cy="24" r="2.8" fill="${C.goldM}"/><circle cx="6" cy="24" r="2.8" fill="${C.blueM}"/>
<circle cx="-4" cy="-18" r="1.5" fill="${C.darkD}"/><circle cx="4" cy="-18" r="1.5" fill="${C.darkD}"/>
<circle cx="-7" cy="-12" r="2" fill="${C.pinkD}" opacity=".6"/><circle cx="7" cy="-12" r="2" fill="${C.pinkD}" opacity=".6"/></g>`;
};

const heartP = "M50 88 C20 66 8 48 8 32 C8 18 19 10 30 10 C40 10 47 16 50 24 C53 16 60 10 70 10 C81 10 92 18 92 32 C92 48 80 66 50 88Z";
const hl = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="9" transform="rotate(28 ${x} ${y})" fill="#fff" opacity=".28"/>`;

const __batch: Icon[] = [
  {
    u: "1f3af",
    n: "bullseye",
    draw: ({ lin }) => `
<g ${B}><circle cx="45" cy="55" r="37" fill="${lin([C.red, C.redM, C.redD], "d")}"/>
<circle cx="45" cy="55" r="28" fill="${lin([C.paper, C.paperD], "d")}"/>
<circle cx="45" cy="55" r="19.5" fill="${lin([C.red, C.redD], "d")}"/>
<circle cx="45" cy="55" r="11" fill="${lin([C.paper, C.paperD], "d")}"/>
<circle cx="45" cy="55" r="4.6" fill="${C.redM}"/></g>
<g ${Bs}><g transform="rotate(-45 45 55)"><rect x="45" y="53.6" width="50" height="2.8" fill="${C.woodD}"/>
<path d="M82 55 L92 47 H104 L98 55 L104 63 H92Z" fill="${lin([C.blue, C.blueD])}"/></g></g>`,
  },
  {
    u: "1fa80",
    n: "yo yo",
    draw: ({ lin, rad }) => `
<ellipse cx="50" cy="14" rx="9" ry="8" fill="none" stroke="${C.blueM}" stroke-width="2.6"/>
<path d="M50 22 V50" stroke="${C.blueD}" stroke-width="2.4"/>
<g ${B}><circle cx="50" cy="66" r="27" fill="${rad([C.red, C.redM, C.redD], 0.36, 0.3, 0.85)}"/></g>
<circle cx="50" cy="66" r="19" fill="none" stroke="${C.paper}" stroke-width="3" opacity=".85"/>
<circle cx="50" cy="66" r="19" fill="none" stroke="${C.redD}" stroke-width=".8" opacity=".6"/>
<g ${Bs}><circle cx="50" cy="66" r="8" fill="${rad([C.gold, C.goldM, C.goldD])}"/></g>
<ellipse cx="38" cy="52" rx="6" ry="3.4" transform="rotate(-35 38 52)" fill="#fff" opacity=".35"/>`,
  },
  {
    u: "1fa81",
    n: "kite",
    draw: ({ lin }) => `
<path d="M36.5 73 C28 80 50 82 40 91" fill="none" stroke="${C.woodD}" stroke-width="1.8" stroke-linecap="round"/>
<g ${Bs}><path d="M33 79 l-5 -3 v8Z M33 79 l5 -3 v8Z" fill="${C.red}"/><path d="M45 85 l-5 -3 v8Z M45 85 l5 -3 v8Z" fill="${C.blueM}"/></g>
<g ${B}><g transform="rotate(22 50 40)">
<polygon points="50,6 22,40 50,40" fill="${lin([C.red, C.redD], "d")}"/>
<polygon points="50,6 78,40 50,40" fill="${lin([C.yellow, C.yellowD], "d")}"/>
<polygon points="22,40 50,76 50,40" fill="${lin([C.blue, C.blueD], "d")}"/>
<polygon points="78,40 50,76 50,40" fill="${lin([C.green, C.greenD], "d")}"/></g></g>
<g transform="rotate(22 50 40)" stroke="${C.darkD}" stroke-width="1.2" opacity=".4"><path d="M50 6 V76 M22 40 H78"/></g>`,
  },
  {
    u: "1f52b",
    n: "water pistol",
    draw: ({ lin }) => `
<g ${B}><rect x="46" y="15" width="36" height="17" rx="7" fill="${lin([C.orange, C.orangeD])}"/>
<path d="M50 50 H72 L79 82 a5 5 0 0 1 -5 7 H62 a5 5 0 0 1 -5 -4Z" fill="${lin([C.orange, C.orangeD], "d")}"/>
<rect x="5" y="31" width="14" height="19" rx="4" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><rect x="12" y="29" width="78" height="26" rx="9" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<rect x="20" y="34" width="56" height="4" rx="2" fill="#fff" opacity=".25"/>
<g ${Bs}><path d="M42 55 L47 56 L51 70 L45 71Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<circle cx="76" cy="44" r="3.2" fill="${C.greenD}" opacity=".6"/>`,
  },
  {
    u: "1f3b1",
    n: "pool 8 ball",
    draw: ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="50" r="42" fill="${rad(["#8793B8", C.navy, C.navyD], 0.36, 0.3, 0.85)}"/></g>
<circle cx="50" cy="42" r="19" fill="${rad([C.paper, C.paperD], 0.4, 0.3, 0.8)}"/>
<g fill="none" stroke="${C.navyD}" stroke-width="3" stroke-linecap="round"><circle cx="50" cy="36" r="4.4"/><circle cx="50" cy="48" r="5.4"/></g>
<ellipse cx="30" cy="26" rx="8" ry="4.5" transform="rotate(-40 30 26)" fill="#fff" opacity=".3"/>`,
  },
  {
    u: "1f52e",
    n: "crystal ball",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M22 91 H78 L70 76 H30Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="50" cy="44" r="35" fill="${rad(["#E6DAF8", C.purple, C.purpleD], 0.36, 0.3, 0.85)}"/></g>
<circle cx="50" cy="44" r="34" fill="none" stroke="#EEE6FB" stroke-width="1.2" opacity=".6"/>
<path d="M24 56 C36 46 48 62 62 50 C70 44 74 46 78 52" fill="none" stroke="${C.purpleD}" stroke-width="2" opacity=".5"/>
<g ${Bs}><polygon points="${star(50, 44, 12, 4.4, 4)}" fill="${lin(["#FFF3BF", C.gold])}"/><polygon points="${star(66, 62, 5, 2, 4)}" fill="${C.pink}"/><polygon points="${star(33, 58, 4.5, 1.8, 4)}" fill="${C.gold}"/></g>
<path d="M26 30 A24 24 0 0 1 42 18" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".7"/>`,
  },
  {
    u: "1fa84",
    n: "magic wand",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50)">
<rect x="-4" y="46" width="80" height="8" rx="4" fill="${lin(["#7385C2", C.navy, C.navyD])}"/>
<rect x="52" y="45.4" width="24" height="9.2" rx="3" fill="${lin([C.paper, C.creamD])}"/>
<rect x="-4" y="45.6" width="11" height="8.8" rx="3" fill="${lin([C.gold, C.goldD])}"/></g></g>
<g ${B}><polygon points="${star(74, 26, 18, 8)}" fill="${lin(["#FFF3BF", C.gold, C.goldM], "d")}"/></g>
<g ${Bs}><polygon points="${star(90, 56, 6, 2.4, 4)}" fill="${C.pinkD}"/><polygon points="${star(48, 12, 6.5, 2.6, 4)}" fill="${C.purple}"/><polygon points="${star(22, 30, 4.5, 1.8, 4)}" fill="${C.goldM}"/></g>`,
  },
  {
    u: "1f3ae",
    n: "video game",
    draw: ({ lin }) => `
<g ${B}><path d="M22 28 H78 C92 28 99 50 95 68 C92 80 80 83 74 72 L69 63 H31 L26 72 C20 83 8 80 5 68 C1 50 8 28 22 28Z" fill="${lin(["#9DB5EA", C.blueM, C.blueD], "d")}"/></g>
<g ${Bs}><path d="M21 38 H28 V45 H35 V52 H28 V59 H21 V52 H14 V45 H21Z" fill="${lin([C.navy, C.navyD])}"/>
<circle cx="72" cy="40" r="5" fill="${lin([C.red, C.redD])}"/><circle cx="82" cy="50" r="5" fill="${lin([C.yellow, C.yellowD])}"/><circle cx="62" cy="50" r="5" fill="${lin([C.green, C.greenD])}"/><circle cx="72" cy="60" r="5" fill="${lin([C.paper, C.creamD])}"/>
<rect x="40" y="42" width="7" height="5" rx="2.5" fill="${C.navyD}"/><rect x="50" y="42" width="7" height="5" rx="2.5" fill="${C.navyD}"/></g>`,
  },
  {
    u: "1f579-fe0f",
    n: "joystick",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="10" y="62" width="80" height="29" rx="9" fill="${lin([C.blue, C.navy, C.navyD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="62" rx="40" ry="9" fill="${lin(["#A9BCEC", C.blueM])}"/></g>
<g ${Bs}><circle cx="24" cy="78" r="4.6" fill="${lin([C.red, C.redD])}"/><circle cx="38" cy="78" r="4.6" fill="${lin([C.yellow, C.yellowD])}"/></g>
<g ${Bs}><rect x="46" y="26" width="8" height="38" fill="${C.metal}"/></g>
<g ${B}><circle cx="50" cy="24" r="17" fill="${rad(["#F58578", C.redM, C.redD], 0.36, 0.3, 0.85)}"/></g>
<ellipse cx="43" cy="17" rx="5" ry="3" transform="rotate(-35 43 17)" fill="#fff" opacity=".4"/>`,
  },
  {
    u: "1f3b0",
    n: "slot machine",
    draw: ({ lin }) => `
<g ${Bs}><path d="M74 52 L88 28" stroke="${C.metalD}" stroke-width="4.4" stroke-linecap="round"/><circle cx="88" cy="24" r="6" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><rect x="10" y="9" width="66" height="82" rx="9" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><rect x="18" y="15" width="50" height="14" rx="4" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<g fill="${C.paper}"><circle cx="28" cy="22" r="2.6"/><circle cx="43" cy="22" r="2.6"/><circle cx="58" cy="22" r="2.6"/></g>
<g ${Bs}><rect x="17" y="36" width="52" height="28" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M34.3 37 V63 M51.7 37 V63" stroke="${C.creamD}" stroke-width="1.4"/>
<circle cx="26" cy="52" r="5.4" fill="${C.redM}"/><path d="M26 47 q2 -4 5 -4" fill="none" stroke="${C.greenD}" stroke-width="1.6"/>
<polygon points="${star(43, 50, 8, 3.6)}" fill="${C.goldM}"/>
<path d="M54 44 H64 L58 58" fill="none" stroke="${C.blueD}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<g ${Bs}><rect x="22" y="72" width="38" height="12" rx="4" fill="${C.darkD}"/></g><rect x="30" y="76" width="22" height="3.4" rx="1.7" fill="${C.goldM}"/>`,
  },
  {
    u: "1f3b2",
    n: "game die",
    draw: ({ lin }) => {
      const d = (m, pts) => `<g transform="matrix(${m})" fill="${C.darkD}">${pts.map(([u, v]) => `<circle cx="${u}" cy="${v}" r=".085"/>`).join("")}</g>`;
      return `<g ${B}><polygon points="50,8 88,28 50,48 12,28" fill="${lin([C.paper, "#EDE3C8"], "d")}"/>
<polygon points="12,28 50,48 50,92 12,72" fill="${lin([C.paperD, C.creamD])}"/>
<polygon points="50,48 88,28 88,72 50,92" fill="${lin([C.creamD, "#B8A880"])}"/></g>
${d("38 20 38 -20 12 28", [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]])}
${d("38 20 0 44 12 28", [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]])}
${d("38 -20 0 44 50 48", [[0.3, 0.3], [0.7, 0.7]])}`;
    },
  },
  {
    u: "1f9e9",
    n: "puzzle piece",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-12 50 50) translate(50 50) scale(1.15) translate(-45 -54.5)"><path d="M18 32 H36 A9 9 0 1 1 54 32 H72 V50 A9 9 0 1 1 72 68 V86 H18 V68 A9.5 9.5 0 1 0 18 50Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>
<g transform="rotate(-12 50 50) translate(50 50) scale(1.15) translate(-45 -54.5)"><path d="M24 38 H34 M24 38 V48" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".4"/></g>`,
  },
  {
    u: "1f9f8",
    n: "teddy bear",
    draw: ({ lin, rad }) => {
      const f = lin([C.woodL, C.wood, C.woodD], "d");
      return `<g ${B}><circle cx="28" cy="22" r="11" fill="${f}"/><circle cx="72" cy="22" r="11" fill="${f}"/>
<ellipse cx="50" cy="72" rx="25" ry="21" fill="${f}"/>
<ellipse cx="25" cy="66" rx="8" ry="14" transform="rotate(35 25 66)" fill="${f}"/><ellipse cx="75" cy="66" rx="8" ry="14" transform="rotate(-35 75 66)" fill="${f}"/>
<ellipse cx="33" cy="86" rx="11" ry="8" fill="${f}"/><ellipse cx="67" cy="86" rx="11" ry="8" fill="${f}"/>
<circle cx="50" cy="42" r="25" fill="${rad([C.woodL, C.wood, C.woodD], 0.36, 0.3, 0.85)}"/></g>
<circle cx="28" cy="22" r="5.4" fill="#F0C9A3"/><circle cx="72" cy="22" r="5.4" fill="#F0C9A3"/>
<ellipse cx="50" cy="74" rx="14" ry="13" fill="${lin([C.cream, C.creamD])}"/>
<ellipse cx="50" cy="51" rx="11.5" ry="9" fill="${lin([C.cream, C.creamD])}"/>
<ellipse cx="50" cy="46.5" rx="4" ry="3" fill="${C.darkD}"/>
<path d="M50 49.5 V53 M50 53 q-3.6 3 -6.4 0 M50 53 q3.6 3 6.4 0" fill="none" stroke="${C.darkD}" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="40" cy="37" r="2.8" fill="${C.darkD}"/><circle cx="60" cy="37" r="2.8" fill="${C.darkD}"/>
<g ${Bs}><path d="M50 66 L36 59 V73Z M50 66 L64 59 V73Z" fill="${lin([C.red, C.redD])}"/><circle cx="50" cy="66" r="4" fill="${C.redM}"/></g>`;
    },
  },
  {
    u: "1fa85",
    n: "piñata",
    draw: ({ lin, clip }) => {
      const col = [C.red, C.yellowM, C.greenM, C.blueM];
      const band = (y0, h, x0, w) => col.map((c, i) => `<rect x="${x0}" y="${y0 + (i * h) / 4}" width="${w}" height="${h / 4 + 0.6}" fill="${c}"/>`).join("");
      return `<path d="M52 5 V34" stroke="${C.woodD}" stroke-width="2"/>
<g ${B}><ellipse cx="54" cy="55" rx="29" ry="20" fill="${lin([C.pink, C.pinkD], "d")}"/>
<rect x="33" y="64" width="10" height="26" rx="4" fill="${lin([C.yellow, C.yellowD])}"/><rect x="45" y="68" width="9" height="22" rx="4" fill="${lin([C.blue, C.blueD])}"/>
<rect x="62" y="68" width="9" height="22" rx="4" fill="${lin([C.green, C.greenD])}"/><rect x="73" y="64" width="10" height="26" rx="4" fill="${lin([C.red, C.redD])}"/>
<path d="M14 28 C12 20 18 14 26 16 L34 40 L24 52 C14 52 10 40 14 28Z" fill="${lin([C.pink, C.pinkD], "d")}"/>
<ellipse cx="22" cy="14" rx="4.2" ry="9" transform="rotate(-18 22 14)" fill="${lin([C.pink, C.pinkD])}"/><ellipse cx="33" cy="15" rx="4.2" ry="9" transform="rotate(10 33 15)" fill="${lin([C.pink, C.pinkD])}"/></g>
<g ${clip('<ellipse cx="54" cy="55" rx="29" ry="20"/>')}>${band(35, 40, 20, 70)}</g>
<g ${Bs}><path d="M82 48 C92 46 96 56 92 66 L86 64 C88 58 86 54 82 54Z" fill="${C.blueM}"/></g>
<circle cx="22" cy="30" r="2" fill="${C.darkD}"/><ellipse cx="17" cy="42" rx="3.4" ry="2.4" fill="${C.darkD}" opacity=".7"/>
<ellipse cx="30" cy="54" rx="2" ry="1.4" fill="#fff" opacity="0"/>`;
    },
  },
  {
    u: "1faa9",
    n: "mirror ball",
    draw: ({ lin, rad, clip }) => {
      const lat = [-22, -11, 0, 11, 22].map((dy) => { const hw: any = Math.sqrt(34 * 34 - dy * dy).toFixed(1); return `M${(50 - hw).toFixed(1)} ${56 + dy} Q50 ${56 + dy + 8} ${(50 + +hw).toFixed(1)} ${56 + dy}`; }).join(" ");
      const mer = [11, 23].map((rx) => `<ellipse cx="50" cy="56" rx="${rx}" ry="34"/>`).join("") + '<path d="M50 22 V90"/>';
      const tiles = [[36, 34, C.sky], [56, 42, C.pink], [28, 58, C.gold], [60, 64, C.sky], [44, 76, C.pink], [66, 30, C.gold]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="9" height="9" rx="1.5" fill="${c}" opacity=".85"/>`).join("");
      return `<path d="M50 3 V12" stroke="${C.metalDD}" stroke-width="2"/>
<g ${Bs}><rect x="42" y="9" width="16" height="10" rx="3" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${B}><circle cx="50" cy="56" r="34" fill="${rad([C.metalL, C.metal, C.metalD], 0.36, 0.3, 0.85)}"/></g>
<g ${clip('<circle cx="50" cy="56" r="34"/>')}>${tiles}<g fill="none" stroke="${C.metalDD}" stroke-width="1" opacity=".55"><path d="${lat}"/>${mer}</g></g>
<g ${Bs}><polygon points="${star(12, 28, 8, 3, 4)}" fill="${C.goldM}"/><polygon points="${star(90, 38, 7, 2.8, 4)}" fill="${C.pinkD}"/><polygon points="${star(88, 82, 6, 2.4, 4)}" fill="${C.goldM}"/><polygon points="${star(12, 80, 5.5, 2.2, 4)}" fill="${C.blueM}"/></g>`;
    },
  },
  {
    u: "1fa86",
    n: "nesting dolls",
    draw: ({ lin }) =>
      doll(lin, 27, 1, [C.red, C.redM, C.redD], C.goldM) +
      doll(lin, 62, 0.74, [C.green, C.greenM, C.greenD], C.redM) +
      doll(lin, 84, 0.5, [C.blue, C.blueM, C.blueD], C.yellowM),
  },
  {
    u: "2660-fe0f",
    n: "spade suit",
    draw: ({ lin }) => `
<g ${B}><path d="M50 8 C50 8 12 36 12 56 C12 68 22 74 31 74 C38 74 43 70 46 66 C46 76 42 84 34 90 H66 C58 84 54 76 54 66 C57 70 62 74 69 74 C78 74 88 68 88 56 C88 36 50 8 50 8Z" fill="${lin(["#7385C2", C.navy, C.navyD], "d")}"/></g>
<ellipse cx="33" cy="44" rx="5" ry="9" transform="rotate(32 33 44)" fill="#fff" opacity=".28"/>`,
  },
  {
    u: "2665-fe0f",
    n: "heart suit",
    draw: ({ lin }) => `<g ${B}><path d="${heartP}" fill="${lin(["#F58578", C.red, C.redM, C.redD], "d")}"/></g>${hl(27, 30)}`,
  },
  {
    u: "2666-fe0f",
    n: "diamond suit",
    draw: ({ lin }) => `
<g ${B}><path d="M50 6 Q58 30 86 50 Q58 70 50 94 Q42 70 14 50 Q42 30 50 6Z" fill="${lin(["#F58578", C.red, C.redM, C.redD], "d")}"/></g>${hl(38, 36)}`,
  },
  {
    u: "2663-fe0f",
    n: "club suit",
    draw: ({ lin }) => `
<g ${B}><path d="${circ(50, 28, 19)} ${circ(27, 59, 19)} ${circ(73, 59, 19)} M50 55 C50 72 46 82 36 90 H64 C54 82 50 72 50 55Z" fill="${lin(["#7385C2", C.navy, C.navyD], "d")}"/></g>
<ellipse cx="43" cy="22" rx="4.6" ry="7" transform="rotate(30 43 22)" fill="#fff" opacity=".28"/>`,
  },
  {
    u: "265f-fe0f",
    n: "chess pawn",
    draw: ({ lin, rad }) => {
      const g = lin(["#7385C2", C.navy, C.navyD], "h");
      return `<g ${B}><rect x="21" y="79" width="58" height="10" rx="5" fill="${g}"/>
<path d="M40 42 H60 C60 58 66 68 70 80 H30 C34 68 40 58 40 42Z" fill="${g}"/>
<rect x="32" y="37" width="36" height="8" rx="4" fill="${g}"/>
<circle cx="50" cy="23" r="15" fill="${rad(["#8793B8", C.navy, C.navyD], 0.36, 0.3, 0.85)}"/></g>
<ellipse cx="44" cy="17" rx="4" ry="2.6" transform="rotate(-35 44 17)" fill="#fff" opacity=".35"/>`;
    },
  },
  {
    u: "1f0cf",
    n: "joker",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-8 50 50)"><rect x="22" y="6" width="56" height="88" rx="7" fill="${lin([C.paper, C.paperD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><rect x="27" y="11" width="46" height="78" rx="4" fill="none" stroke="${C.redM}" stroke-width="1.2" opacity=".7"/>
<g ${Bs}><path d="M33 56 C32 44 28 36 30 28 C38 34 46 44 50 56Z" fill="${lin([C.red, C.redD], "d")}"/>
<path d="M67 56 C68 44 72 36 70 28 C62 34 54 44 50 56Z" fill="${lin([C.blue, C.blueD], "d")}"/>
<path d="M42 56 C44 42 48 30 50 20 C52 30 56 42 58 56Z" fill="${lin([C.yellow, C.yellowD], "d")}"/>
<rect x="31" y="54" width="38" height="9" rx="4.5" fill="${lin([C.navy, C.navyD])}"/>
<circle cx="30" cy="26" r="3.6" fill="${C.goldM}"/><circle cx="50" cy="17" r="3.6" fill="${C.goldM}"/><circle cx="70" cy="26" r="3.6" fill="${C.goldM}"/>
<polygon points="${star(50, 77, 9, 4)}" fill="${lin([C.red, C.redD])}"/></g></g>`,
  },
  {
    u: "1f004",
    n: "mahjong red dragon",
    draw: ({ lin }) => `
<g ${B}><rect x="24" y="14" width="58" height="80" rx="8" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g ${B}><rect x="18" y="6" width="58" height="80" rx="8" fill="${lin([C.paper, "#EDE3C8"], "d")}"/></g>
<rect x="23" y="11" width="48" height="70" rx="4" fill="none" stroke="${C.creamD}" stroke-width="1.2"/>
<g fill="none" stroke="${C.redM}" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"><rect x="33" y="33" width="28" height="22"/><path d="M47 22 V66"/></g>`,
  },
  {
    u: "1f3b4",
    n: "flower playing cards",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(14 50 50)"><rect x="34" y="7" width="52" height="84" rx="6" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g></g>
<g transform="rotate(14 50 50)" fill="none" stroke="${C.paper}" stroke-width="1.6" opacity=".8"><rect x="40" y="13" width="40" height="72" rx="3"/><path d="M60 24 L74 49 L60 74 L46 49Z"/></g>
<g ${B}><g transform="rotate(-8 50 50)"><rect x="14" y="8" width="52" height="84" rx="6" fill="${lin([C.paper, C.paperD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><rect x="20" y="14" width="40" height="72" rx="3" fill="${lin([C.navy, C.navyD])}"/>
<path d="M40 82 C40 70 38 62 40 56" fill="none" stroke="${C.greenM}" stroke-width="2.4"/>
<path d="M40 72 C32 70 28 64 30 60 C36 60 40 64 40 72Z M40 68 C48 66 52 60 50 56 C44 56 40 60 40 68Z" fill="${C.greenM}"/>
<g ${Bs}>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(40 + 10 * Math.cos(((a - 90) * Math.PI) / 180)).toFixed(1)}" cy="${(40 + 10 * Math.sin(((a - 90) * Math.PI) / 180)).toFixed(1)}" r="7.4" fill="${rad([C.pink, C.red], 0.4, 0.35, 0.8)}"/>`).join("")}<circle cx="40" cy="40" r="4.6" fill="${lin([C.gold, C.goldD])}"/></g></g>`,
  },
  {
    u: "1f3ad",
    n: "performing arts",
    draw: ({ lin }) => {
      const m = "M0 -28 C16 -32 28 -28 30 -24 C30 2 22 26 0 32 C-22 26 -30 2 -30 -24 C-28 -28 -16 -32 0 -28Z";
      const T1 = 'transform="translate(66 58) rotate(16) scale(.88)"';
      const T2 = 'transform="translate(36 42) rotate(-14) scale(.96)"';
      return `<g ${B}><g ${T1}><path d="${m}" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g></g>
<g ${T1} fill="${C.darkD}"><ellipse cx="-11" cy="-8" rx="6.4" ry="3.6" transform="rotate(20 -11 -8)"/><ellipse cx="11" cy="-8" rx="6.4" ry="3.6" transform="rotate(-20 11 -8)"/>
<path d="M-12 22 Q0 10 12 22" fill="none" stroke="${C.darkD}" stroke-width="3" stroke-linecap="round"/></g>
<g ${B}><g ${T2}><path d="${m}" fill="${lin(["#FCE595", C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g ${T2} fill="${C.darkD}"><ellipse cx="-11" cy="-8" rx="6.4" ry="3.6" transform="rotate(-18 -11 -8)"/><ellipse cx="11" cy="-8" rx="6.4" ry="3.6" transform="rotate(18 11 -8)"/>
<path d="M-14 10 Q0 28 14 10" fill="none" stroke="${C.darkD}" stroke-width="3" stroke-linecap="round"/></g>`;
    },
  },
  {
    u: "1f5bc-fe0f",
    n: "framed picture",
    draw: ({ lin, clip }) => `
<g ${B}><rect x="7" y="13" width="86" height="74" rx="5" fill="${lin(["#FCE595", C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${Bs}><rect x="15" y="21" width="70" height="58" rx="2" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${clip('<rect x="20" y="26" width="60" height="48"/>')}>
<rect x="20" y="26" width="60" height="48" fill="${lin([C.sky, "#E9F3F8"])}"/>
<circle cx="65" cy="40" r="8" fill="${C.yellow}"/>
<path d="M18 62 C30 44 42 48 54 58 C62 52 72 50 82 56 V76 H18Z" fill="${lin([C.blueM, C.blueD])}"/>
<path d="M18 68 C32 58 48 64 60 66 C70 64 76 62 82 64 V76 H18Z" fill="${lin([C.green, C.greenD])}"/></g>
<rect x="20" y="26" width="60" height="48" fill="none" stroke="${C.goldD}" stroke-width="1.4" opacity=".7"/>`,
  },
  {
    u: "1f9f5",
    n: "thread",
    draw: ({ lin }) => `<g transform="translate(-3 0)">
<path d="M72 64 C88 62 94 80 82 88 C74 92 64 86 72 80" fill="none" stroke="${C.redM}" stroke-width="3.2" stroke-linecap="round"/>
<g ${B}><rect x="21" y="9" width="58" height="13" rx="5" fill="${lin([C.woodL, C.wood, C.woodD])}"/><rect x="21" y="78" width="58" height="13" rx="5" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<rect x="27" y="20" width="46" height="60" rx="3" fill="${lin([C.red, C.redM, C.redD], "h")}"/></g>
<g fill="none" stroke="${C.redD}" stroke-width="1.3" opacity=".55"><path d="M27 28 L73 22 M27 38 L73 32 M27 48 L73 42 M27 58 L73 52 M27 68 L73 62 M27 78 L73 72"/></g>
<rect x="34" y="22" width="5" height="56" rx="2.5" fill="#fff" opacity=".22"/></g>`,
  },
  {
    u: "1faa1",
    n: "sewing needle",
    draw: ({ lin }) => `
<g ${Bs}><g transform="rotate(-45 50 50)"><path d="M-4 50 L24 47 H104 V53 H24Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g></g>
<g transform="rotate(-45 50 50)"><ellipse cx="94" cy="50" rx="5.6" ry="1.5" fill="${C.metalDD}"/>
<path d="M94 50 C102 58 96 72 82 70 C68 68 74 54 58 56 C46 58 46 70 36 72" fill="none" stroke="${C.red}" stroke-width="2.8" stroke-linecap="round"/></g>`,
  },
  {
    u: "1f9f6",
    n: "yarn",
    draw: ({ lin, rad, clip }) => `
<path d="M68 80 C86 84 96 76 90 66" fill="none" stroke="${C.redM}" stroke-width="3.4" stroke-linecap="round"/>
<g ${B}><circle cx="46" cy="52" r="38" fill="${rad(["#F9A79C", C.redM, C.redD], 0.36, 0.3, 0.85)}"/></g>
<g ${clip('<circle cx="46" cy="52" r="38"/>')}><g fill="none" stroke-linecap="round">
<path d="M6 40 Q40 10 86 50 M6 56 Q40 26 86 66 M10 70 Q44 40 84 80 M18 28 Q50 60 80 24 M10 50 Q40 84 90 56" stroke="${C.redD}" stroke-width="2" opacity=".5"/>
<path d="M8 36 Q42 6 88 46 M12 66 Q46 36 86 76 M24 22 Q54 54 80 18" stroke="#fff" stroke-width="1.6" opacity=".3"/></g></g>`,
  },
  {
    u: "1faa2",
    n: "knot",
    draw: ({ lin }) => {
      const f = (t) => [Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t)];
      const N = 720;
      const P = Array.from({ length: N }, (_, i) => f((i / N) * 2 * Math.PI));
      const ex = [Math.min(...P.map((q) => q[0])), Math.max(...P.map((q) => q[0]))];
      const ey = [Math.min(...P.map((q) => q[1])), Math.max(...P.map((q) => q[1]))];
      const k = 82 / Math.max(ex[1] - ex[0], ey[1] - ey[0]);
      const X = (q) => 50 + (q[0] - (ex[0] + ex[1]) / 2) * k;
      const Y = (q) => 50 + (q[1] - (ey[0] + ey[1]) / 2) * k;
      const pt = (i) => { const q = P[((i % N) + N) % N]; return [X(q), Y(q)]; };
      const path = (i0, i1, st) => {
        const pts: any[] = [];
        for (let i = i0; i <= i1; i += st) pts.push(pt(i));
        let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[Math.max(i - 1, 0)], b = pts[i], c = pts[i + 1], e = pts[Math.min(i + 2, pts.length - 1)];
          d += `C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
        }
        return d;
      };
      const pass: any[] = [];
      for (let i = 0; i < N; i++) for (let j = i + 20; j < N; j++) {
        const a = pt(i), b = pt(j);
        if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.9 && !pass.some(([x, y]) => (Math.abs(x - i) < 12 || Math.abs(x - j) < 12) && (Math.abs(y - i) < 12 || Math.abs(y - j) < 12))) pass.push([i, j]);
      }
      const ps = pass.flat().sort((a, b) => a - b);
      const over = [ps[0], ps[2], ps[4]].filter((v) => v != null);
      const base = path(0, N, 24);
      const win = over.map((c) => path(c - 70, c + 70, 20)).join("");
      return `<g ${B}><path d="${base}" fill="none" stroke="${C.woodDD}" stroke-width="13" stroke-linecap="round"/><path d="${base}" fill="none" stroke="#D9A56A" stroke-width="9" stroke-linecap="round"/>
${over.map((c) => `<path d="${path(c - 34, c + 34, 17)}" fill="none" stroke="${C.woodDD}" stroke-width="13" stroke-linecap="butt"/>`).join("")}${over.map((c) => `<path d="${path(c - 70, c + 70, 20)}" fill="none" stroke="#E6BA85" stroke-width="9" stroke-linecap="butt"/>`).join("")}</g>`;
    },
  },
];

export default __batch;
