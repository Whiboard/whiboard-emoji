import { B, Bs, C, star } from "../kit.mjs";

const M = (lin, d) => lin(["#DDE3EA", C.metal, C.metalD], d);
const rot = (a, s = 1) => `transform="translate(50 50) rotate(${a}) scale(${s}) translate(-50 -50)"`;
const gl = (lin, d = "h") => lin([[0, "#E9F5FB", 0.8], [0.5, "#CBE6F4", 0.7], [1, C.skyD, 0.9]], d);
const ring = (c, rt, l, w, g) => `<g transform="rotate(${rt} ${c[0]} ${c[1]})"><rect x="${c[0] - l / 2}" y="${c[1] - w / 2}" width="${l}" height="${w}" rx="${w / 2}" fill="none" stroke="${g}" stroke-width="7.5"/></g>`;
const gearPts = (cx, cy, n, R, r) => {
  const p = [];
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n, d = Math.PI / n;
    for (const [da, q] of [[-0.62, r], [-0.34, R], [0.34, R], [0.62, r]]) p.push(`${(cx + q * Math.cos(a + da * d * 2)).toFixed(1)},${(cy + q * Math.sin(a + da * d * 2)).toFixed(1)}`);
  }
  return p.join(" ");
};

const raw = [
  { u: "1f4a3", n: "bomb", draw: ({ lin, rad }) => `
<g ${B}><circle cx="42" cy="60" r="31" fill="${rad(["#8591BC", C.navy, C.navyD])}"/></g>
<g ${Bs}><rect x="57" y="29" width="17" height="13" rx="3" transform="rotate(45 65 35)" fill="${M(lin)}"/></g>
<path d="M70 28 C76 18 88 24 84 12" fill="none" stroke="${C.woodD}" stroke-width="3.5" stroke-linecap="round"/>
<ellipse cx="29" cy="47" rx="6" ry="10" transform="rotate(30 29 47)" fill="#fff" opacity=".28"/>
<g ${Bs}><polygon points="${star(85, 13, 10, 4, 6)}" fill="${lin([C.yellow, C.orange, C.red], "d")}"/></g>` },

  { u: "1fa83", n: "boomerang", draw: ({ lin }) => `
<g ${B}><path d="M15 28 Q86 12 80 86" fill="none" stroke="${lin([C.orange, C.orangeD])}" stroke-width="17" stroke-linecap="round"/></g>
<path d="M15 28 Q86 12 80 86" fill="none" stroke="${C.yellow}" stroke-width="3" stroke-dasharray="1 8" stroke-linecap="round"/>
<path d="M30 22 L28 36 M66 28 L64 40 M72 62 L84 60" stroke="${C.orangeD}" stroke-width="2.4" opacity=".55"/>` },

  { u: "1f3f9", n: "bow and arrow", draw: ({ lin }) => `
<line x1="24" y1="20" x2="80" y2="76" stroke="#B8A780" stroke-width="1.6"/>
<g ${B}><path d="M24 20 Q96 4 80 76" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="6.5" stroke-linecap="round"/></g>
<g ${Bs}><line x1="14" y1="86" x2="82" y2="18" stroke="${C.woodL}" stroke-width="3.5" stroke-linecap="round"/><line x1="12" y1="88" x2="27" y2="73" stroke="${C.red}" stroke-width="9"/>
<polygon points="91,9 84.5,24.5 75.5,15.5" fill="${M(lin, "d")}"/></g>
<line x1="19" y1="81" x2="23" y2="77" stroke="${C.redD}" stroke-width="2" opacity=".6"/>` },

  { u: "1f6e1-fe0f", n: "shield", draw: ({ lin }) => `
<g ${B}><path d="M50 6 L89 18 V47 C89 73 68 87 50 94 C32 87 11 73 11 47 V18Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><path d="M50 16 L79 25 V47 C79 66 65 77 50 84 C35 77 21 66 21 47 V25Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M50 16 L21 25 V47 C21 66 35 77 50 84Z" fill="#fff" opacity=".13"/>
<g ${Bs}><polygon points="${star(50, 50, 17, 7.5)}" fill="${lin([C.yellow, C.goldM], "d")}"/></g>` },

  { u: "1fa9a", n: "carpentry saw", draw: ({ lin }) => {
    let t = "-8,44 76,38 76,64";
    for (let i = 0; i <= 9; i++) t += ` ${(76 - i * 9.3).toFixed(1)},${i % 2 ? 64 : 70}`;
    return `<g ${B}><g ${rot(-35, 0.86)}>
<polygon points="${t}" fill="${M(lin)}"/>
<path d="M74 32 H100 a8 8 0 0 1 8 8 V60 a8 8 0 0 1 -8 8 H74Z M82 42 H96 a3 3 0 0 1 3 3 V55 a3 3 0 0 1 -3 3 H82Z" fill-rule="evenodd" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
</g></g>
<g ${rot(-35, 0.86)}><path d="M-6 47 L72 42" stroke="${C.metalDD}" stroke-width="1" opacity=".5"/><circle cx="68" cy="51" r="1.8" fill="${C.metalDD}"/></g>`;
  } },

  { u: "1f527", n: "wrench", draw: ({ lin }) => `
<g ${B}><g ${rot(135, 0.88)}>
<path d="M-11 43 H8 V57 H-11 A17 17 0 1 0 -11 43Z" transform="translate(17 0)" fill="${M(lin, "v")}"/>
<rect x="8" y="43.5" width="84" height="13" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<circle cx="97" cy="50" r="14" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/>
</g></g>
<g ${rot(135, 0.88)}><circle cx="97" cy="50" r="6" fill="${C.metalDD}" opacity=".6"/></g>` },

  { u: "1fa9b", n: "screwdriver", draw: ({ lin }) => `
<g ${B}><g ${rot(-45, 0.88)}>
<polygon points="-8,47 14,46 14,54 -8,53" fill="${M(lin)}"/>
<rect x="12" y="46.5" width="52" height="7" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<path d="M62 40 H72 L76 36 H104 a6 6 0 0 1 6 6 V58 a6 6 0 0 1 -6 6 H76 L72 60 H62Z" fill="${lin([C.orange, C.orangeD])}"/>
</g></g>
<g ${rot(-45, 0.88)} fill="${C.orangeD}" opacity=".6"><rect x="80" y="36" width="2" height="28"/><rect x="88" y="36" width="2" height="28"/><rect x="96" y="36" width="2" height="28"/></g>` },

  { u: "1f529", n: "nut and bolt", draw: ({ lin }) => `
<g ${B}><g ${rot(-45)}>
<rect x="8" y="39" width="72" height="22" fill="${lin([C.metal, C.metalD], "v")}"/>
<rect x="76" y="28" width="22" height="44" rx="4" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
</g></g>
<g ${B}><g ${rot(-45)}><rect x="26" y="29" width="20" height="42" rx="3" fill="${lin([C.goldD, C.gold, C.goldM, C.goldD])}"/></g></g>
<g ${rot(-45)} stroke="${C.metalDD}" stroke-width="1.3" opacity=".6"><path d="M52 40 V60 M58 40 V60 M64 40 V60 M70 40 V60 M14 40 V60 M20 40 V60"/><path d="M36 30 V70" stroke="#fff" stroke-width="1.5" opacity=".6"/></g>` },

  { u: "2699-fe0f", n: "gear", draw: ({ lin }) => `
<g ${B}><path d="M${gearPts(50, 50, 8, 44, 34).replace(/ /g, " L")}Z M38 50 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0Z" transform="" fill-rule="evenodd" fill="${lin(["#E4E9EF", C.metal, C.metalD], "d")}"/></g>
<circle cx="50" cy="50" r="24" fill="none" stroke="${C.metalDD}" stroke-width="1.4" opacity=".4"/>
<circle cx="50" cy="50" r="12" fill="none" stroke="${C.metalDD}" stroke-width="2" opacity=".35"/>` },

  { u: "1f5dc-fe0f", n: "clamp", draw: ({ lin }) => `
<g ${B}><rect x="20" y="18" width="18" height="70" rx="6" fill="${lin([C.blueM, C.blueD], "h")}"/>
<rect x="20" y="18" width="52" height="16" rx="6" fill="${lin([C.blue, C.blueM, C.blueD])}"/>
<rect x="20" y="72" width="58" height="16" rx="6" fill="${lin([C.blueM, C.blueD])}"/></g>
<g ${B}><rect x="53" y="10" width="10" height="54" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/>
<rect x="46" y="62" width="24" height="10" rx="3" fill="${lin([C.metal, C.metalDD])}"/></g>
<path d="M53 38 H63 M53 44 H63 M53 50 H63 M53 56 H63" stroke="${C.metalDD}" stroke-width="1.2" opacity=".6"/>
<g ${B}><rect x="38" y="4" width="40" height="9" rx="4.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>` },

  { u: "2696-fe0f", n: "balance scale", draw: ({ lin }) => `
<g ${B}><path d="M30 92 L36 80 H64 L70 92Z" fill="${lin([C.gold, C.goldD])}"/><rect x="46.5" y="16" width="7" height="66" fill="${lin([C.goldD, C.gold, C.goldD], "h")}"/>
<g transform="rotate(-8 50 25)"><rect x="16" y="21.5" width="68" height="7" rx="3.5" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<circle cx="50" cy="14" r="6.5" fill="${lin([C.yellow, C.goldD], "d")}"/></g>
<path d="M19 29.5 L7 64 M19 29.5 L33 64 M81 20.5 L67 55 M81 20.5 L94 55" stroke="${C.goldD}" stroke-width="1.5"/>
<g ${B}><path d="M5 64 A15 15 0 0 0 35 64Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/><path d="M66 55 A15 15 0 0 0 96 55Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>` },

  { u: "1f9af", n: "white cane", draw: ({ lin }) => `
<g ${B}><g ${rot(-45, 0.9)}>
<rect x="-10" y="46" width="98" height="8.5" rx="2" fill="${lin([C.paper, C.paperD, "#BFB08A"])}"/>
<rect x="-12" y="45" width="8" height="10" rx="3" fill="${C.dark}"/>
<path d="M88 43 H104 a8 8 0 0 1 8 8 V52 a8 8 0 0 1 -8 8 H88Z" fill="${lin(["#8A8190", C.dark, C.darkD])}"/>
</g></g>
<g ${rot(-45, 0.9)} fill="${C.red}"><rect x="6" y="46" width="9" height="8.5"/><rect x="28" y="46" width="9" height="8.5"/><rect x="50" y="46" width="9" height="8.5"/><rect x="72" y="46" width="9" height="8.5"/></g>` },

  { u: "1f517", n: "link", draw: ({ lin }) => `
<g ${B}>${ring([37, 63], -45, 50, 26, lin([C.metalL, C.metal, C.metalD], "d"))}</g>
<g ${B}>${ring([63, 37], -45, 50, 26, lin([C.blue, C.blueM, C.blueD], "d"))}</g>` },

  { u: "26d3-fe0f-200d-1f4a5", n: "broken chain", draw: ({ lin }) => `
<g ${B}>${ring([32, 68], -45, 40, 24, lin([C.metalL, C.metal, C.metalD], "d"))}</g>
<g ${B}>${ring([68, 32], -45, 40, 24, lin([C.blue, C.blueM, C.blueD], "d"))}</g>
<g ${B}><polygon points="${star(50, 50, 17, 7, 8)}" fill="${lin([C.yellow, C.orange, C.red], "d")}"/></g>` },

  { u: "26d3-fe0f", n: "chains", draw: ({ lin }) => `
<g ${B}>${ring([29, 71], -45, 42, 26, lin([C.metalL, C.metal, C.metalD], "d"))}</g>
<g ${B}>${ring([71, 29], -45, 42, 26, lin([C.metalL, C.metal, C.metalD], "d"))}</g>
<g ${B}><g transform="rotate(-45 50 50)"><rect x="30" y="43" width="40" height="14" rx="7" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g></g>` },

  { u: "1fa9d", n: "hook", draw: ({ lin }) => `
<g ${B}><path d="M50 26 V58 C50 98 14 96 14 62" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="9" stroke-linecap="round"/>
<polygon points="7,66 21,66 14,44" fill="${lin([C.metal, C.metalD])}"/>
<circle cx="50" cy="15" r="8" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="5"/></g>` },

  { u: "1f9f0", n: "toolbox", draw: ({ lin }) => `
<g ${B}><path d="M31 40 V24 a6 6 0 0 1 6 -6 H63 a6 6 0 0 1 6 6 V40" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="6"/></g>
<g ${B}><rect x="8" y="38" width="84" height="52" rx="9" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${B}><rect x="8" y="34" width="84" height="18" rx="7" fill="${lin(["#F28A80", C.red, C.redM])}"/></g>
<g ${Bs}><rect x="41" y="44" width="18" height="16" rx="3" fill="${lin([C.yellow, C.goldM, C.goldD])}"/></g>
<circle cx="50" cy="52" r="2.4" fill="${C.goldD}"/>
<path d="M14 70 H86" stroke="${C.redD}" stroke-width="1.5" opacity=".5"/>` },

  { u: "1f9f2", n: "magnet", draw: ({ lin }) => `
<g ${B}><path d="M25 30 V52 a25 25 0 0 0 50 0 V30" fill="none" stroke="${lin([C.red, C.redM, C.redD], "d")}" stroke-width="22"/></g>
<g ${B}><rect x="14" y="10" width="22" height="24" rx="3" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/><rect x="64" y="10" width="22" height="24" rx="3" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/></g>
<path d="M14 34 H36 M64 34 H86" stroke="${C.redD}" stroke-width="1.6" opacity=".5"/>` },

  { u: "1fa9c", n: "ladder", draw: ({ lin }) => `
<g ${B}><g transform="rotate(12 50 50)">
<rect x="27" y="7" width="10" height="86" rx="3" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/>
<rect x="63" y="7" width="10" height="86" rx="3" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/>
</g></g>
<g ${B}><g transform="rotate(12 50 50)">${[18, 33, 48, 63, 78].map((y) => `<rect x="35" y="${y}" width="30" height="7" rx="2" fill="${lin([C.woodL, C.wood])}"/>`).join("")}</g></g>` },

  { u: "1fa8f", n: "shovel", draw: ({ lin }) => `
<g ${B}><g ${rot(-45, 0.88)}>
<rect x="46" y="46" width="48" height="8" rx="2" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<path d="M92 38 H104 a8 8 0 0 1 8 8 V54 a8 8 0 0 1 -8 8 H92" fill="none" stroke="${lin([C.woodL, C.woodD])}" stroke-width="6"/>
<path d="M-12 50 C-12 36 4 32 30 36 H44 V64 H30 C4 68 -12 64 -12 50Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/>
<rect x="40" y="43" width="12" height="14" rx="2" fill="${lin([C.metal, C.metalDD])}"/>
</g></g>
<g ${rot(-45, 0.88)}><path d="M0 50 H34" stroke="${C.metalDD}" stroke-width="1.5" opacity=".4"/></g>` },

  { u: "2697-fe0f", n: "alembic", draw: ({ lin, clip }) => `
<g ${B}><path d="M50 46 C62 20 84 22 87 56" fill="none" stroke="${gl(lin, "d")}" stroke-width="10" stroke-linecap="round"/>
<circle cx="37" cy="64" r="29" fill="${gl(lin, "d")}" stroke="#8DB1C9" stroke-width="1.6"/></g>
<g ${clip('<circle cx="37" cy="64" r="28"/>')}><path d="M5 62 Q21 56 37 62 T70 62 V96 H5Z" fill="${lin([C.green, C.greenM, C.greenD])}" opacity=".9"/></g>
<circle cx="28" cy="74" r="3" fill="#fff" opacity=".6"/><circle cx="42" cy="80" r="2" fill="#fff" opacity=".6"/>
<ellipse cx="26" cy="52" rx="4" ry="8" transform="rotate(30 26 52)" fill="#fff" opacity=".55"/>
<g ${Bs}><path d="M87 66 C84 72 82 74 82 77 a5 5 0 0 0 10 0 C92 74 90 72 87 66Z" fill="${lin([C.green, C.greenD])}"/></g>
<g ${B}><rect x="52" y="40" width="9" height="7" rx="2" transform="rotate(-50 56 43)" fill="${lin([C.woodL, C.woodD])}"/></g>` },

  { u: "1f9ea", n: "test tube", draw: ({ lin, clip }) => `
<g ${B}><g transform="rotate(30 50 50)"><path d="M37 14 V80 a13 13 0 0 0 26 0 V14Z" fill="${gl(lin)}" stroke="#8DB1C9" stroke-width="1.6"/>
<rect x="33" y="8" width="34" height="8" rx="4" fill="${gl(lin)}" stroke="#8DB1C9" stroke-width="1.4"/></g></g>
<g transform="rotate(30 50 50)"><g ${clip('<path d="M38 14 V80 a12 12 0 0 0 24 0 V14Z"/>')}><path d="M30 50 Q40 46 50 50 T70 50 V100 H30Z" fill="${lin([C.pink, C.pinkD, C.red], "v")}" opacity=".92"/></g>
<circle cx="46" cy="66" r="3" fill="#fff" opacity=".6"/><circle cx="54" cy="76" r="2" fill="#fff" opacity=".6"/><rect x="41" y="18" width="3.5" height="44" rx="1.7" fill="#fff" opacity=".55"/></g>` },

  { u: "1f9eb", n: "petri dish", draw: ({ lin, rad, clip }) => `
<g ${B}><path d="M6 44 V66 A44 22 0 0 0 94 66 V44Z" fill="${gl(lin, "h")}"/></g>
<g ${B}><ellipse cx="50" cy="44" rx="44" ry="22" fill="${lin([[0, "#F1F8FC", 0.9], [1, C.skyD, 0.95]], "d")}" stroke="#8DB1C9" stroke-width="1.6"/></g>
<ellipse cx="50" cy="46" rx="35" ry="16.5" fill="${rad(["#F9D9A0", "#F0B870", "#D98F4A"], 0.4, 0.35, 0.8)}"/>
<g fill="${C.greenM}"><circle cx="38" cy="43" r="5"/><circle cx="58" cy="49" r="6.5"/><circle cx="66" cy="40" r="3.4"/><circle cx="46" cy="53" r="3"/></g>
<g fill="#fff" opacity=".55"><circle cx="36.5" cy="41.5" r="1.8"/><circle cx="56" cy="47" r="2.2"/></g>
<path d="M14 60 A38 17 0 0 0 40 76" fill="none" stroke="#fff" stroke-width="2.4" opacity=".6" stroke-linecap="round"/>` },

  { u: "1f9ec", n: "dna", draw: ({ lin }) => {
    const P = (t, s) => [18 + 64 * t + 14 * s * Math.sin(2 * Math.PI * 1.5 * t) * 0.707, 82 - 64 * t + 14 * s * Math.sin(2 * Math.PI * 1.5 * t) * 0.707];
    const N = 28, a = [], b = [], r = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = P(t, 1), q = P(t, -1);
      a.push(p.map((v) => v.toFixed(1)).join(" "));
      b.push(q.map((v) => v.toFixed(1)).join(" "));
      if (i % 3 === 1) r.push(`M${a[i]} L${b[i]}`);
    }
    return `<g ${Bs}><path d="${r.join(" ")}" stroke="${C.yellowM}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}><path d="M${a.join(" L")}" fill="none" stroke="${lin([C.blue, C.blueM, C.blueD], "d")}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><path d="M${b.join(" L")}" fill="none" stroke="${lin([C.pink, C.pinkD, C.redM], "d")}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  } },

  { u: "1f52d", n: "telescope", draw: ({ lin }) => `
<g ${B}><path d="M52 54 L34 92 M52 54 L72 92 M52 54 V92" stroke="${C.woodD}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><g transform="rotate(-35 50 50)">
<rect x="2" y="43" width="16" height="14" rx="3" fill="${C.dark}"/>
<rect x="16" y="39" width="32" height="22" fill="${lin([C.blue, C.blueM, C.blueD])}"/>
<rect x="46" y="34" width="32" height="32" fill="${lin([C.blue, C.blueM, C.blueD])}"/>
<rect x="76" y="30" width="22" height="40" rx="4" fill="${lin([C.navy, C.navyD])}"/>
</g></g>
<g transform="rotate(-35 50 50)"><rect x="44" y="34" width="4" height="32" fill="${C.gold}"/><rect x="14" y="39" width="4" height="22" fill="${C.gold}"/><ellipse cx="98" cy="50" rx="3" ry="17" fill="${C.sky}"/><rect x="50" y="39" width="22" height="5" fill="#fff" opacity=".25"/></g>` },

  { u: "1f4e1", n: "satellite antenna", draw: ({ lin }) => `
<g ${B}><rect x="14" y="85" width="46" height="8" rx="4" fill="${lin([C.metal, C.metalDD])}"/><rect x="26" y="68" width="10" height="20" fill="${lin([C.metalL, C.metalD], "h")}"/></g>
<g ${B}><path d="M20 30 A34 34 0 0 0 68 78Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${B}><ellipse cx="44" cy="54" rx="34" ry="11" transform="rotate(45 44 54)" fill="${lin([C.sky, C.skyD, C.blueM], "h")}"/></g>
<g ${Bs}><line x1="44" y1="54" x2="68" y2="30" stroke="${C.metalD}" stroke-width="3.5"/><circle cx="70" cy="28" r="5.5" fill="${lin([C.red, C.redD], "d")}"/></g>
<path d="M78 40 A22 22 0 0 0 60 22 M88 46 A32 32 0 0 0 54 12" fill="none" stroke="${C.blueM}" stroke-width="3.4" stroke-linecap="round"/>` },

  { u: "1f489", n: "syringe", draw: ({ lin }) => `
<g ${B}><g ${rot(-45, 0.9)}>
<rect x="-12" y="49" width="30" height="2.6" fill="${C.metalD}"/>
<rect x="16" y="44" width="12" height="12" rx="2" fill="${lin([C.blue, C.blueD])}"/>
<rect x="28" y="38" width="52" height="24" rx="3" fill="${gl(lin, "v")}" stroke="#8DB1C9" stroke-width="1.4"/>
<rect x="76" y="30" width="6" height="40" rx="2" fill="${lin([C.metalL, C.metalD])}"/>
<rect x="82" y="47" width="22" height="6" fill="${lin([C.metal, C.metalD])}"/>
<rect x="102" y="38" width="7" height="24" rx="3" fill="${lin([C.metalL, C.metalD])}"/>
</g></g>
<g ${rot(-45, 0.9)}><rect x="30" y="46" width="30" height="14" fill="${C.red}" opacity=".85"/><rect x="60" y="46" width="2" height="14" fill="${C.redD}"/><path d="M36 38 v5 M46 38 v5 M56 38 v5 M66 38 v5" stroke="${C.navyD}" stroke-width="1.2" opacity=".7"/></g>` },

  { u: "1fa78", n: "drop of blood", draw: ({ rad }) => `
<g ${B}><path d="M50 6 C50 6 20 44 20 66 a30 30 0 0 0 60 0 C80 44 50 6 50 6Z" fill="${rad(["#F58578", C.redM, "#8F2428"], 0.36, 0.45, 0.8)}"/></g>
<path d="M33 62 C32 70 37 78 44 80" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".45"/>
<ellipse cx="39" cy="52" rx="3.5" ry="7" transform="rotate(20 39 52)" fill="#fff" opacity=".4"/>` },

  { u: "1f48a", n: "pill", draw: ({ lin }) => `
<g ${B}><path d="M50 32 H22 a18 18 0 0 0 0 36 H50Z" transform="rotate(-45 50 50)" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${B}><path d="M50 32 H78 a18 18 0 0 1 0 36 H50Z" transform="rotate(-45 50 50)" fill="${lin([C.paper, C.paperD, "#C9B98F"])}"/></g>
<g transform="rotate(-45 50 50)"><rect x="12" y="36" width="34" height="4" rx="2" fill="#fff" opacity=".35"/><rect x="54" y="36" width="30" height="4" rx="2" fill="#fff" opacity=".5"/></g>` },

  { u: "1fa79", n: "adhesive bandage", draw: ({ lin }) => {
    const d = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { d.push(`<circle cx="${12 + i * 7 + (j % 2) * 3}" cy="${42 + j * 8}" r="1.3"/><circle cx="${75 + i * 7 + (j % 2) * 3}" cy="${42 + j * 8}" r="1.3"/>`); }
    return `<g ${B}><rect x="4" y="34" width="92" height="32" rx="16" transform="rotate(-45 50 50)" fill="${lin(["#F6D6AE", "#E8B685", "#CF935A"])}"/></g>
<g ${Bs}><rect x="34" y="37" width="32" height="26" rx="2" transform="rotate(-45 50 50)" fill="${lin([C.paper, C.paperD])}"/></g>
<g transform="rotate(-45 50 50)" fill="${C.woodD}" opacity=".5">${d.join("")}</g>
<g transform="rotate(-45 50 50)" fill="${C.metalD}" opacity=".5"><circle cx="42" cy="44" r="1"/><circle cx="50" cy="50" r="1"/><circle cx="58" cy="56" r="1"/><circle cx="42" cy="56" r="1"/><circle cx="58" cy="44" r="1"/></g>`;
  } },

  { u: "1fa7c", n: "crutch", draw: ({ lin }) => `
<g ${B}><g transform="rotate(14 50 50)">
<rect x="45.5" y="6" width="9" height="82" rx="3" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/>
<path d="M54 18 C84 18 84 48 54 50" fill="none" stroke="${lin([C.blue, C.blueD], "d")}" stroke-width="7"/>
<rect x="32" y="60" width="36" height="10" rx="5" fill="${lin([C.orange, C.orangeD])}"/>
<rect x="43" y="84" width="14" height="10" rx="4" fill="${C.dark}"/>
</g></g>` },

  { u: "1fa7a", n: "stethoscope", draw: ({ lin }) => `
<g ${B}><path d="M27 14 V36 C27 56 50 54 50 66" fill="none" stroke="${lin(["#8A97BC", C.navy, C.navyD], "d")}" stroke-width="5.5" stroke-linecap="round"/>
<path d="M73 14 V36 C73 56 50 54 50 66" fill="none" stroke="${lin(["#8A97BC", C.navy, C.navyD], "d")}" stroke-width="5.5" stroke-linecap="round"/>
<line x1="50" y1="64" x2="50" y2="76" stroke="${C.navy}" stroke-width="5.5"/></g>
<g ${Bs}><circle cx="27" cy="10" r="5.5" fill="${lin([C.metalL, C.metalD], "d")}"/><circle cx="73" cy="10" r="5.5" fill="${lin([C.metalL, C.metalD], "d")}"/></g>
<g ${B}><circle cx="50" cy="80" r="14" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="80" r="8.5" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/>` },

  { u: "1fa7b", n: "x ray", draw: ({ lin }) => {
    const rb = [0, 1, 2, 3].map((k) => { const y = 36 + k * 12; return `M46 ${y} Q27 ${y - 4} ${24 + k * 2} ${y + 12} M54 ${y} Q73 ${y - 4} ${76 - k * 2} ${y + 12}`; }).join(" ");
    return `<g ${B}><rect x="12" y="8" width="76" height="84" rx="7" fill="${lin([C.blueM, C.navy, C.navyD], "d")}"/></g>
<g ${Bs}><path d="${rb}" fill="none" stroke="#E3ECF7" stroke-width="3.6" stroke-linecap="round"/><path d="M47 24 Q34 22 26 28 M53 24 Q66 22 74 28" fill="none" stroke="#E3ECF7" stroke-width="3.6" stroke-linecap="round"/>
${[22, 33, 44, 55, 66, 77].map((y) => `<rect x="44" y="${y}" width="12" height="8" rx="2.5" fill="${lin(["#F4F8FD", "#B4C4DE"])}"/>`).join("")}</g>
<rect x="18" y="13" width="64" height="74" rx="4" fill="none" stroke="#fff" stroke-width="1" opacity=".2"/>`;
  } },

  { u: "1f6aa", n: "door", draw: ({ lin }) => `
<g ${B}><rect x="20" y="6" width="60" height="88" rx="3" fill="${lin([C.woodD, C.woodDD], "d")}"/></g>
<g ${B}><rect x="26" y="11" width="48" height="83" rx="2" fill="${lin([C.woodL, C.wood, "#B07A45"], "d")}"/></g>
<g ${Bs}><rect x="32" y="18" width="15" height="29" rx="2" fill="${lin([C.woodD, C.wood], "d")}"/><rect x="53" y="18" width="15" height="29" rx="2" fill="${lin([C.woodD, C.wood], "d")}"/><rect x="32" y="54" width="15" height="31" rx="2" fill="${lin([C.woodD, C.wood], "d")}"/><rect x="53" y="54" width="15" height="31" rx="2" fill="${lin([C.woodD, C.wood], "d")}"/></g>
<g ${Bs}><circle cx="64" cy="51" r="4.2" fill="${lin([C.yellow, C.goldD], "d")}"/></g>` },

  { u: "1f6d7", n: "elevator", draw: ({ lin }) => `
<g ${B}><rect x="12" y="6" width="76" height="88" rx="8" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${B}><rect x="21" y="14" width="58" height="20" rx="4" fill="${lin([C.navy, C.navyD])}"/></g>
<polygon points="35,17.5 43,29.5 27,29.5" fill="${C.gold}"/><polygon points="65,30.5 73,18.5 57,18.5" fill="${C.gold}" transform="translate(0 0)"/>
<g ${B}><rect x="21" y="40" width="27.5" height="46" rx="2" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/><rect x="51.5" y="40" width="27.5" height="46" rx="2" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/></g>
<path d="M50 40 V86" stroke="${C.metalDD}" stroke-width="1.6" opacity=".7"/>` },

  { u: "1fa9e", n: "mirror", draw: ({ lin }) => `
<g ${B}><path d="M32 78 L22 94 M68 78 L78 94" stroke="${lin([C.woodL, C.woodD])}" stroke-width="5.5" stroke-linecap="round"/></g>
<g ${B}><ellipse cx="50" cy="46" rx="33" ry="41" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="46" rx="25" ry="33" fill="${lin(["#E6F5FC", C.sky, C.skyD], "d")}"/></g>
<path d="M33 42 L47 24 M31 56 L55 28" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".75"/>
<g ${Bs}><circle cx="50" cy="6" r="4" fill="${lin([C.yellow, C.goldD], "d")}"/></g>` },
];

// [dx, dy, scale about the centre]
const fix = {
  "1f517": [0, 0, 1.1], "1f527": [5, -5, 1.12], "1fa9d": [17, 0, 1], "1f9ec": [0, 0, 1.14],
  "1f529": [-5, 5, 1], "1f52d": [0, 0, 0.94], "1f48a": [0, 0, 1.12], "1fa79": [0, 0, 1.13],
  "1fa7c": [-6, 0, 1], "1fa83": [2, -6, 1], "2697-fe0f": [1, -8, 1],
};
export default raw.map((ic) => {
  const f = fix[ic.u];
  if (!f) return ic;
  const [dx, dy, s] = f;
  return { ...ic, draw: (t) => `<g transform="translate(${50 + dx} ${50 + dy}) scale(${s}) translate(-50 -50)">${ic.draw(t)}</g>` };
});
