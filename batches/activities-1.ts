// activities-1: celebration objects, tickets, medals, trophy.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const tile = (t, sky, inner) =>
  `<g ${B}><rect x="8" y="8" width="84" height="84" rx="14" fill="${sky}"/></g><g ${t.clip('<rect x="8" y="8" width="84" height="84" rx="14"/>')}>${inner}</g><rect x="8.8" y="8.8" width="82.4" height="82.4" rx="13.4" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.2"/>`;

// burst of rays with dots at the tips
const burst = (cx, cy, r1, r2, n, col, rot = 0, dot = 1.9) =>
  Array.from({ length: n }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / n;
    const c = Math.cos(a), s = Math.sin(a);
    const f = (v) => v.toFixed(1);
    return `<path d="M${f(cx + r1 * c)} ${f(cy + r1 * s)} L${f(cx + r2 * c)} ${f(cy + r2 * s)}" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/><circle cx="${f(cx + (r2 + 4) * c)}" cy="${f(cy + (r2 + 4) * s)}" r="${dot}" fill="${col}"/>`;
  }).join("");

const sparkStar = (cx, cy, R) => star(cx, cy, R, R * 0.24, 4);

// sports medal, reused for 1st/2nd/3rd
const medal = (lin, rib, disc, ring, num, numCol, glyph) => `
<g ${B}><polygon points="22,5 41,5 57,45 40,49" fill="${lin(rib[0])}"/></g>
<polygon points="29.6,5 34.4,5 50.6,46.6 46,47.6" fill="${C.paper}" opacity=".9"/>
<g ${B}><polygon points="78,5 59,5 43,45 60,49" fill="${lin(rib[1])}"/></g>
<polygon points="70.4,5 65.6,5 49.4,46.6 54,47.6" fill="${C.paper}" opacity=".9"/>
<g ${B}><rect x="44" y="41" width="12" height="7" rx="2.5" fill="${lin(num)}"/><circle cx="50" cy="68" r="25" fill="${lin(disc, "d")}"/></g>
<circle cx="50" cy="68" r="19.5" fill="none" stroke="${ring}" stroke-width="1.5" opacity=".55"/>
<path d="${glyph}" fill="none" stroke="${numCol}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${glyph}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4" transform="translate(-.8 -.8)"/>`;
const G1 = "M45 63 L51.5 58 V78";
const G2 = "M43 62 C43 52 58 52 57 62 C56.5 68 45 72 43 78 H58";
const G3 = "M44 58 H57 L50 66 C58 65 60 77 50 78 C47 78 45 77 43 75";

// ticket outline with side notches
const tk = (x, y, w, h, r = 4.5) =>
  `M${x} ${y} H${x + w} V${y + h / 2 - r} A${r} ${r} 0 0 0 ${x + w} ${y + h / 2 + r} V${y + h} H${x} V${y + h / 2 + r} A${r} ${r} 0 0 0 ${x} ${y + h / 2 - r}Z`;

const bowLoops = (lin, cx, cy, s, c) => `
<g ${B}><path d="M${cx} ${cy} C${cx - 16 * s} ${cy - 26 * s} ${cx - 42 * s} ${cy - 22 * s} ${cx - 42 * s} ${cy - 6 * s} C${cx - 42 * s} ${cy + 10 * s} ${cx - 20 * s} ${cy + 8 * s} ${cx}  ${cy}Z" fill="${lin(c)}"/>
<path d="M${cx} ${cy} C${cx + 16 * s} ${cy - 26 * s} ${cx + 42 * s} ${cy - 22 * s} ${cx + 42 * s} ${cy - 6 * s} C${cx + 42 * s} ${cy + 10 * s} ${cx + 20 * s} ${cy + 8 * s} ${cx} ${cy}Z" fill="${lin(c)}"/></g>`;

const __batch: Icon[] = [
  {
    u: "1f383",
    n: "jack o lantern",
    draw: ({ lin, rad }) => `
<g ${Bs}><path d="M46 28 C46 20 49 15 56 10 L62 14 C57 18 55 22 55 30Z" fill="${lin([C.green, C.greenD], "h")}"/></g>
<g ${B}><ellipse cx="24" cy="58" rx="20" ry="28" fill="${rad([C.orange, C.orangeD, "#A85A1C"], 0.4, 0.3, 0.9)}"/><ellipse cx="76" cy="58" rx="20" ry="28" fill="${rad([C.orange, C.orangeD, "#A85A1C"], 0.4, 0.3, 0.9)}"/>
<ellipse cx="38" cy="56" rx="22" ry="31" fill="${rad(["#FBC07A", C.orange, C.orangeD], 0.4, 0.3, 0.9)}"/><ellipse cx="62" cy="56" rx="22" ry="31" fill="${rad(["#FBC07A", C.orange, C.orangeD], 0.4, 0.3, 0.9)}"/></g>
<path d="M50 27 C42 40 42 74 50 86 C58 74 58 40 50 27Z" fill="${rad(["#F9B66C", C.orange, C.orangeD], 0.4, 0.3, 0.9)}"/>
<path d="M38 30 C28 44 28 70 38 85 M62 30 C72 44 72 70 62 85" fill="none" stroke="#A85A1C" stroke-width="1.6" opacity=".45"/>
<g fill="${C.yellow}" stroke="${C.woodDD}" stroke-width="2" stroke-linejoin="round"><polygon points="26,48 40,48 33,60"/><polygon points="60,48 74,48 67,60"/><path d="M30 66 L38 72 L44 66 L50 73 L56 66 L62 72 L70 66 L68 76 C60 86 40 86 32 76Z"/></g>
<ellipse cx="22" cy="46" rx="4" ry="8" transform="rotate(20 22 46)" fill="#fff" opacity=".3"/>`,
  },
  {
    u: "1f384",
    n: "Christmas tree",
    draw: ({ lin }) => `
<g ${Bs}><rect x="43" y="80" width="14" height="14" rx="2" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}><path d="M50 40 L84 82 Q86 86 80 86 H20 Q14 86 16 82Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g ${B}><path d="M50 22 L78 60 Q80 64 74 64 H26 Q20 64 22 60Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g ${B}><path d="M50 14 L70 40 Q72 44 66 44 H34 Q28 44 30 40Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<path d="M30 52 Q50 60 74 50 M22 74 Q50 82 80 72" fill="none" stroke="${C.gold}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 4.5"/>
<g ${Bs}><circle cx="40" cy="58" r="4.2" fill="${lin([C.red, C.redD])}"/><circle cx="62" cy="52" r="3.6" fill="${lin([C.blue, C.blueD])}"/><circle cx="28" cy="80" r="4" fill="${lin([C.gold, C.goldD])}"/><circle cx="52" cy="76" r="4.4" fill="${lin([C.red, C.redD])}"/><circle cx="72" cy="78" r="3.8" fill="${lin([C.blue, C.blueD])}"/><circle cx="48" cy="32" r="3.2" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${B}><polygon points="${star(50, 14, 8.5, 3.8)}" fill="${lin(["#FFE89A", C.gold, C.goldD], "d")}"/></g>`,
  },
  {
    u: "1f386",
    n: "fireworks",
    draw: (t) => {
      const { lin, rad } = t;
      return tile(
        t,
        lin(["#232C58", "#4B5A94"]),
        `<g fill="${C.paper}"><circle cx="16" cy="20" r="1.2"/><circle cx="82" cy="16" r="1.3"/><circle cx="84" cy="62" r="1.2"/><circle cx="18" cy="60" r="1.2"/></g>
<g fill="none">${burst(38, 38, 5, 17, 10, C.gold, 0.2)}${burst(68, 56, 4, 12, 8, C.pink, 0.4, 1.7)}${burst(76, 26, 3, 8, 7, "#8FE0D8", 0.1, 1.4)}</g>
<circle cx="38" cy="38" r="4" fill="${C.yellow}"/><circle cx="68" cy="56" r="3" fill="${C.pink}"/>
<path d="M0 90 L12 78 L22 86 L34 74 L50 88 L64 76 L78 86 L100 72 V100 H0Z" fill="#1C2347"/>
<g fill="${C.yellow}" opacity=".85"><rect x="20" y="82" width="3" height="3"/><rect x="40" y="84" width="3" height="3"/><rect x="70" y="82" width="3" height="3"/></g>`,
      );
    },
  },
  {
    u: "1f387",
    n: "sparkler",
    draw: (t) => {
      const { lin } = t;
      return tile(
        t,
        lin(["#232C58", "#4B5A94"]),
        `<path d="M18 86 L56 46" stroke="${C.metalD}" stroke-width="4" stroke-linecap="round"/><path d="M34 70 L56 46" stroke="${C.woodD}" stroke-width="5.5" stroke-linecap="round"/>
<g fill="none">${burst(62, 40, 8, 24, 12, C.yellow, 0.15, 2.2)}${burst(62, 40, 6, 13, 12, C.orange, 0.45, 1.4)}</g>
<polygon points="${sparkStar(62, 40, 13)}" fill="${C.paper}"/><circle cx="62" cy="40" r="3.4" fill="${C.yellow}"/>
<g fill="${C.gold}"><circle cx="24" cy="26" r="1.6"/><circle cx="82" cy="78" r="1.6"/><circle cx="20" cy="50" r="1.2"/><circle cx="84" cy="62" r="1.2"/></g>`,
      );
    },
  },
  {
    u: "1f9e8",
    n: "firecracker",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-40 50 50)">
<rect x="6" y="38" width="72" height="26" rx="5" fill="${lin([C.red, C.redM, C.redD])}"/>
<rect x="6" y="38" width="9" height="26" rx="3" fill="${lin([C.gold, C.goldD], "h")}"/><rect x="69" y="38" width="9" height="26" rx="3" fill="${lin([C.gold, C.goldD], "h")}"/>
</g></g>
<g ${Bs}><g transform="rotate(-40 50 50)"><path d="M78 51 C84 51 84 44 90 44" fill="none" stroke="${C.dark}" stroke-width="3" stroke-linecap="round"/>
<polygon points="${star(95, 44, 9, 3.8, 6)}" fill="${lin([C.yellow, C.orange, C.orangeD], "d")}"/></g></g>
<g transform="rotate(-40 50 50)"><rect x="24" y="38" width="3" height="26" fill="${C.gold}" opacity=".8"/><rect x="40" y="38" width="3" height="26" fill="${C.gold}" opacity=".8"/><rect x="16" y="42" width="48" height="4" rx="2" fill="#fff" opacity=".22"/><polygon points="${star(33, 51, 5, 2.2)}" fill="${C.gold}"/></g>`,
  },
  {
    u: "2728",
    n: "sparkles",
    draw: ({ lin }) => `
<g ${B}><polygon points="${sparkStar(44, 58, 36)}" fill="${lin(["#FFE48A", C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><polygon points="${sparkStar(78, 24, 19)}" fill="${lin(["#FFE48A", C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${Bs}><polygon points="${sparkStar(18, 20, 12)}" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>`,
  },
  {
    u: "1f388",
    n: "balloon",
    draw: ({ lin, rad }) => `
<path d="M50 80 C40 86 60 90 50 97" fill="none" stroke="${C.dark}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
<g ${B}><path d="M50 6 C74 6 83 27 78 46 C73 63 59 73 50 75 C41 73 27 63 22 46 C17 27 26 6 50 6Z" fill="${rad(["#F58578", C.redM, C.redD], 0.36, 0.3, 0.85)}"/></g>
<g ${Bs}><path d="M50 73 L44 82 H56Z" fill="${lin([C.redM, C.redD])}"/><rect x="43" y="80" width="14" height="3.4" rx="1.7" fill="${C.redD}"/></g>
<ellipse cx="35" cy="30" rx="6" ry="11" transform="rotate(24 35 30)" fill="#fff" opacity=".35"/>`,
  },
  {
    u: "1f389",
    n: "party popper",
    draw: ({ lin }) => `<g transform="translate(-8 0)">
<g ${B}><g transform="rotate(40 50 70)"><path d="M50 98 L24 44 A26 8 0 0 0 76 44Z" fill="${lin([C.gold, C.orange, C.orangeD], "d")}"/></g></g>
<g transform="rotate(40 50 70)"><path d="M50 98 L37 63 M50 98 L50 55 M50 98 L63 63" stroke="${C.redM}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/><ellipse cx="50" cy="44" rx="26" ry="8" fill="${C.woodD}"/></g>
<g fill="none" stroke-width="3" stroke-linecap="round"><path d="M64 44 C58 28 74 24 70 10" stroke="${C.redM}"/><path d="M72 52 C84 44 78 34 92 30" stroke="${C.blueM}"/><path d="M58 38 C48 30 56 18 46 12" stroke="${C.greenM}"/></g>
<g ${Bs}><circle cx="84" cy="16" r="3.4" fill="${C.purple}"/><rect x="80" y="44" width="6" height="6" transform="rotate(25 83 47)" fill="${lin([C.red, C.redD])}"/><circle cx="30" cy="20" r="3.2" fill="${lin([C.blue, C.blueD])}"/><polygon points="${star(88, 62, 6, 2.6)}" fill="${lin([C.goldM, C.goldD])}"/><rect x="58" y="8" width="5" height="5" transform="rotate(20 60 10)" fill="${lin([C.green, C.greenD])}"/></g></g>`,
  },
  {
    u: "1f38a",
    n: "confetti ball",
    draw: ({ lin, rad, clip }) => `
<g fill="none" stroke-width="3.2" stroke-linecap="round"><path d="M42 24 C30 14 40 6 28 8" stroke="${C.blueM}"/><path d="M52 22 C60 10 72 14 74 6" stroke="${C.redM}"/><path d="M62 28 C78 22 84 30 92 20" stroke="${C.greenM}"/></g>
<g ${B}><circle cx="46" cy="62" r="32" fill="${rad(["#D3BEF0", C.purple, C.purpleD], 0.36, 0.3, 0.85)}"/></g>
<g ${clip('<circle cx="46" cy="62" r="32"/>')}>
<g fill="${C.yellow}"><rect x="24" y="44" width="7" height="7" transform="rotate(20 27 47)"/><rect x="58" y="78" width="7" height="7" transform="rotate(-20 61 81)"/><circle cx="64" cy="52" r="3.6"/></g>
<g fill="${C.red}"><rect x="48" y="40" width="6" height="6" transform="rotate(35 51 43)"/><circle cx="30" cy="70" r="3.6"/><rect x="66" y="66" width="6" height="6" transform="rotate(10 69 69)"/></g>
<g fill="${C.teal}"><circle cx="40" cy="58" r="3.4"/><rect x="38" y="80" width="6" height="6" transform="rotate(-30 41 83)"/><rect x="72" y="50" width="5" height="5"/></g>
<circle cx="46" cy="62" r="32" fill="${rad([[0, "#fff", 0.25], [0.5, "#fff", 0], [1, "#2A1A55", 0.4]], 0.34, 0.28, 0.82)}"/></g>
<g ${Bs}><polygon points="${star(86, 60, 6, 2.6)}" fill="${lin([C.goldM, C.goldD])}"/><circle cx="84" cy="82" r="3.2" fill="${lin([C.red, C.redD])}"/><rect x="10" y="30" width="5.5" height="5.5" transform="rotate(25 12 32)" fill="${lin([C.blue, C.blueD])}"/></g>`,
  },
  {
    u: "1f38b",
    n: "tanabata tree",
    draw: ({ lin }) => {
      const strip = (x, y, w, h, c) => `<path d="M${x + w / 2} ${y - 6} V${y}" stroke="${C.dark}" stroke-width="1" /><g ${Bs}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.4" fill="${lin(c)}"/></g><path d="M${x + w / 2} ${y + 4} V${y + h - 4}" stroke="${C.darkD}" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>`;
      return `
<g ${B}><path d="M35 92 C37 68 46 40 58 9" fill="none" stroke="${C.greenD}" stroke-width="6" stroke-linecap="round"/></g>
<path d="M39 64 H44 M44 38 H49 M51 22 H55" stroke="${C.greenD}" stroke-width="1.4" opacity=".7"/>
<g ${Bs}><path d="M40 60 C54 52 62 40 80 38 C70 54 56 62 40 60Z" fill="${lin([C.green, C.greenD], "d")}"/><path d="M46 42 C34 38 26 28 14 30 C24 44 36 48 46 42Z" fill="${lin([C.green, C.greenD], "d")}"/><path d="M54 22 C64 16 74 8 88 10 C82 22 66 28 54 22Z" fill="${lin([C.green, C.greenD], "d")}"/></g>
${strip(60, 52, 9, 26, [C.pink, C.pinkD])}${strip(74, 46, 9, 22, [C.yellow, C.yellowD])}${strip(20, 40, 9, 28, [C.blue, C.blueD])}${strip(44, 70, 9, 24, [C.orange, C.orangeD])}${strip(82, 24, 9, 22, [C.purple, C.purpleD])}${strip(22, 76, 8, 16, [C.green, C.greenD])}`;
    },
  },
  {
    u: "1f38d",
    n: "pine decoration",
    draw: ({ lin }) => {
      const bamboo = (x, top, c) => `<g ${B}><path d="M${x} ${top + 5} L${x + 15} ${top} V86 H${x}Z" fill="${lin([c[0], c[1], c[2], c[1], c[0]], "h")}"/></g><ellipse cx="${x + 7.5}" cy="${top + 2.4}" rx="6.5" ry="2.6" transform="rotate(-18 ${x + 7.5} ${top + 2.4})" fill="${C.paper}" opacity=".85"/><path d="M${x} ${top + 30} H${x + 15} M${x} ${top + 54} H${x + 15}" stroke="${C.greenD}" stroke-width="1.6" opacity=".7"/>`;
      return `
<g ${B}><path d="M10 52 C16 30 26 24 36 30 L38 62Z" fill="${lin([C.greenM, C.greenD], "d")}"/><path d="M90 52 C84 30 74 24 64 30 L62 62Z" fill="${lin([C.greenM, C.greenD], "d")}"/><path d="M4 66 C10 54 26 52 38 62 L30 74Z" fill="${lin([C.green, C.greenD], "d")}"/><path d="M96 66 C90 54 74 52 62 62 L70 74Z" fill="${lin([C.green, C.greenD], "d")}"/></g>
<g stroke="${C.greenD}" stroke-width="1.2" opacity=".6" fill="none"><path d="M16 50 L30 36 M22 52 L34 42 M84 50 L70 36 M78 52 L66 42"/></g>
${bamboo(27, 34, [C.greenD, C.greenM, C.green])}${bamboo(43, 10, [C.greenD, C.greenM, C.green])}${bamboo(59, 26, [C.greenD, C.greenM, C.green])}
<g ${B}><path d="M16 70 H84 V90 a4 4 0 0 1 -4 4 H20 a4 4 0 0 1 -4 -4Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<path d="M16 76 H84 M16 84 H84" stroke="${C.woodDD}" stroke-width="1.6" opacity=".6"/><g ${Bs}><rect x="45" y="68" width="10" height="26" rx="2" fill="${lin([C.red, C.redD])}"/></g>`;
    },
  },
  {
    u: "1f38e",
    n: "Japanese dolls",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="6" y="84" width="88" height="10" rx="3" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><path d="M10 84 C10 62 14 50 26 46 H38 C50 50 54 62 54 84Z" fill="${lin([C.navy, C.navyD], "d")}"/></g>
<path d="M26 46 L32 62 L38 46" fill="${C.paper}"/><path d="M24 70 H40" stroke="${C.gold}" stroke-width="2.4" opacity=".8"/>
<g ${B}><circle cx="32" cy="32" r="12" fill="${rad([C.paper, C.cream, C.creamD])}"/><path d="M22 24 L26 4 H38 L42 24 Q32 16 22 24Z" fill="${lin([C.dark, C.darkD])}"/></g>
<g fill="${C.darkD}"><circle cx="28" cy="33" r="1.4"/><circle cx="36" cy="33" r="1.4"/></g><path d="M26 76 L30 60 H34 L38 76Z" fill="${C.gold}" opacity=".0"/>
<g ${B}><path d="M46 84 C46 62 50 50 62 46 H74 C86 50 90 62 90 84Z" fill="${lin([C.pink, C.red, C.redD], "d")}"/></g>
<path d="M62 46 L68 64 L74 46" fill="${C.paper}"/><path d="M52 74 H84" stroke="${C.gold}" stroke-width="2.4" opacity=".85"/>
<g ${B}><circle cx="68" cy="32" r="12" fill="${rad([C.paper, C.cream, C.creamD])}"/><path d="M54 36 C52 14 60 8 68 8 C76 8 84 14 82 36 C80 24 76 22 68 22 C60 22 56 24 54 36Z" fill="${lin([C.dark, C.darkD])}"/></g>
<g fill="${C.darkD}"><circle cx="64" cy="33" r="1.4"/><circle cx="72" cy="33" r="1.4"/></g><g ${Bs}><rect x="58" y="6" width="20" height="5" rx="2.5" fill="${lin([C.gold, C.goldD])}"/></g>`,
  },
  {
    u: "1f38f",
    n: "carp streamer",
    draw: ({ lin }) => {
      const carp = (y, s, c, belly) => `<g ${B}><g transform="translate(0 ${y}) scale(1 ${s})"><path d="M24 22 C40 8 62 12 76 26 L94 16 L90 34 L94 52 L76 42 C62 56 40 54 24 42 C19 36 19 28 24 22Z" fill="${lin(c)}"/></g></g>
<path d="M30 ${y + 36 * s} C46 ${y + 48 * s} 62 ${y + 48 * s} 76 ${y + 38 * s}" fill="none" stroke="${belly}" stroke-width="5" stroke-linecap="round" opacity=".7"/>
<g fill="none" stroke="#fff" stroke-width="1.3" opacity=".5" stroke-linecap="round">${[44, 54, 64].map((x) => `<path d="M${x} ${y + 16 * s} q5 ${9 * s} 0 ${18 * s}"/>`).join("")}</g>
<circle cx="32" cy="${y + 26 * s}" r="4" fill="${C.paper}"/><circle cx="31" cy="${y + 26 * s}" r="2" fill="${C.darkD}"/>`;
      return `
<g ${B}><rect x="8" y="4" width="5" height="92" rx="2" fill="${lin([C.woodD, C.wood, C.woodD], "h")}"/><circle cx="10.5" cy="7" r="5" fill="${lin([C.gold, C.goldD])}"/></g>
${carp(-2, 0.8, [C.blue, C.blueM, C.blueD], C.paper)}${carp(44, 0.8, [C.red, C.redM, C.redD], C.pink)}`;
    },
  },
  {
    u: "1f390",
    n: "wind chime",
    draw: ({ lin, rad }) => `
<path d="M50 4 V26" stroke="${C.dark}" stroke-width="1.6"/><circle cx="50" cy="7" r="3.2" fill="none" stroke="${C.metalDD}" stroke-width="1.8"/>
<g ${Bs}><rect x="38" y="24" width="24" height="7" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${B}><path d="M24 62 C24 40 36 30 50 30 C64 30 76 40 76 62 C76 66 72 66 70 62 C66 68 34 68 30 62 C28 66 24 66 24 62Z" fill="${rad(["#EAF6FC", C.sky, C.skyD], 0.36, 0.3, 0.9)}"/></g>
<path d="M24 62 C24 40 36 30 50 30 C64 30 76 40 76 62" fill="none" stroke="${C.blueM}" stroke-width="1.6" opacity=".6"/>
<circle cx="50" cy="48" r="6" fill="${C.red}" opacity=".8"/><circle cx="50" cy="48" r="2.4" fill="${C.paper}" opacity=".7"/>
<ellipse cx="36" cy="44" rx="3" ry="7" transform="rotate(20 36 44)" fill="#fff" opacity=".6"/>
<path d="M50 62 V74" stroke="${C.dark}" stroke-width="1.4"/><g ${Bs}><circle cx="50" cy="66" r="3" fill="${lin([C.gold, C.goldD])}"/><rect x="40" y="72" width="20" height="24" rx="2" fill="${lin([C.pink, C.pinkD])}"/></g>
<path d="M50 77 V91" stroke="${C.redD}" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>`,
  },
  {
    u: "1f391",
    n: "moon viewing ceremony",
    draw: (t) => {
      const { lin, rad } = t;
      const gr = (x, h, lean) => `<path d="M${x} 96 C${x + lean / 2} ${96 - h / 2} ${x + lean} ${96 - h + 8} ${x + lean * 1.3} ${96 - h}" stroke="#2A3A4A" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="${x + lean * 1.3}" cy="${96 - h - 4}" rx="2.6" ry="7" transform="rotate(${lean * 2} ${x + lean * 1.3} ${96 - h})" fill="${C.creamD}"/>`;
      return tile(
        t,
        lin(["#1E2A58", "#4A5A92"]),
        `<g fill="${C.paper}"><circle cx="18" cy="22" r="1.2"/><circle cx="82" cy="40" r="1.3"/><circle cx="24" cy="48" r="1"/><circle cx="76" cy="14" r="1"/></g>
<circle cx="52" cy="38" r="22" fill="${rad(["#FFF6C8", C.yellow, C.yellowM], 0.4, 0.35, 0.85)}"/>
<g fill="${C.yellowD}" opacity=".35"><circle cx="45" cy="34" r="4"/><circle cx="58" cy="46" r="3"/><circle cx="60" cy="30" r="2"/></g>
<ellipse cx="26" cy="54" rx="22" ry="3" fill="#8F9CC8" opacity=".5"/>
<g>${gr(16, 34, 6)}${gr(26, 26, 4)}${gr(80, 34, -6)}${gr(70, 24, -4)}</g>
<rect x="0" y="82" width="100" height="18" fill="#1B2547"/>
<g ${Bs}><rect x="40" y="76" width="22" height="14" rx="2" fill="${lin([C.woodL, C.woodD])}"/></g><g fill="${C.paper}"><circle cx="46" cy="72" r="4"/><circle cx="56" cy="72" r="4"/><circle cx="51" cy="66" r="4"/></g>`,
      );
    },
  },
  {
    u: "1f9e7",
    n: "red envelope",
    draw: ({ lin }) => `
<g ${B}><rect x="22" y="8" width="56" height="84" rx="6" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><path d="M22 14 a6 6 0 0 1 6 -6 H72 a6 6 0 0 1 6 6 V40 C68 56 32 56 22 40Z" fill="${lin(["#F28880", C.red, C.redM])}"/></g>
<g ${B}><circle cx="50" cy="50" r="12" fill="${lin(["#FFE89A", C.gold, C.goldD], "d")}"/></g>
<rect x="45" y="45" width="10" height="10" fill="none" stroke="${C.goldD}" stroke-width="1.8"/>
<path d="M50 41 V59 M41 50 H59" stroke="${C.goldD}" stroke-width="1.4" opacity=".6"/>
<g fill="none" stroke="${C.gold}" stroke-width="2" stroke-linecap="round" opacity=".85"><path d="M34 70 H66 M40 79 H60"/></g>`,
  },
  {
    u: "1f380",
    n: "ribbon",
    draw: ({ lin }) => `<g transform="translate(0 -7)">
<g ${B}><path d="M44 54 L26 94 L40 86 L47 94 L54 58Z" fill="${lin([C.pink, C.pinkD])}"/><path d="M56 54 L74 94 L60 86 L53 94 L46 58Z" fill="${lin([C.pink, C.pinkD])}"/></g>
${bowLoops(lin, 50, 42, 1, [C.pink, "#EB9DB1", C.pinkD])}
<path d="M26 22 C34 18 40 26 46 38 M74 22 C66 18 60 26 54 38" fill="none" stroke="${C.pinkD}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<g ${B}><rect x="42" y="32" width="16" height="20" rx="5" fill="${lin([C.pink, C.pinkD, "#C96B86"], "d")}"/></g>
<ellipse cx="46" cy="38" rx="2" ry="4" fill="#fff" opacity=".45"/></g>`,
  },
  {
    u: "1f381",
    n: "wrapped gift",
    draw: ({ lin }) => `<g transform="translate(0 -6)">
<g ${B}><rect x="16" y="46" width="68" height="46" rx="4" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="10" y="34" width="80" height="16" rx="4" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="43" y="34" width="14" height="58" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/></g>
${bowLoops(lin, 50, 32, 0.62, [C.gold, C.goldM, C.goldD])}
<g ${B}><circle cx="50" cy="31" r="5" fill="${lin([C.gold, C.goldD], "d")}"/></g></g>`,
  },
  {
    u: "1f397-fe0f",
    n: "reminder ribbon",
    draw: ({ lin }) => `
<g ${B}><path d="M50 12 C26 10 24 36 40 52 L66 90" fill="none" stroke="${lin([C.red, C.redM, C.redD], "d")}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><path d="M50 12 C74 10 76 36 60 52 L34 90" fill="none" stroke="${lin([C.red, C.redM, C.redD], "u")}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M50 12 C31 11 29 33 42 47" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".35"/>`,
  },
  {
    u: "1f39f-fe0f",
    n: "admission tickets",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-14 50 50)"><path d="${tk(8, 22, 80, 44)}" fill="${lin([C.pink, C.pinkD], "d")}"/></g></g>
<g ${B}><g transform="rotate(8 50 50)"><path d="${tk(12, 38, 80, 46)}" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g></g>
<g transform="rotate(8 50 50)"><path d="M70 40 V82" stroke="${C.woodD}" stroke-width="1.6" stroke-dasharray="2.6 2.6" opacity=".7"/><polygon points="${star(41, 61, 12, 5)}" fill="${C.red}"/><rect x="76" y="48" width="9" height="2.4" rx="1.2" fill="${C.woodD}" opacity=".6"/><rect x="76" y="54" width="9" height="2.4" rx="1.2" fill="${C.woodD}" opacity=".6"/></g>`,
  },
  {
    u: "1f3ab",
    n: "ticket",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-30 50 50)"><path d="${tk(8, 28, 84, 44, 5.5)}" fill="${lin([C.orange, C.orangeD], "d")}"/></g></g>
<g transform="rotate(-30 50 50)"><path d="M71 30 V70" stroke="#fff" stroke-width="1.8" stroke-dasharray="3 3" opacity=".75"/><polygon points="${star(34, 50, 13, 5.4)}" fill="${C.paper}"/><rect x="55" y="42" width="10" height="2.6" rx="1.3" fill="#fff" opacity=".7"/><rect x="55" y="49" width="10" height="2.6" rx="1.3" fill="#fff" opacity=".7"/><rect x="76" y="38" width="10" height="2.6" rx="1.3" fill="#fff" opacity=".7"/></g>`,
  },
  {
    u: "1f396-fe0f",
    n: "military medal",
    draw: ({ lin }) => `
<g ${B}><path d="M30 4 H70 V34 L50 46 L30 34Z" fill="${lin([C.paper, C.paperD])}"/></g>
<g fill="${C.greenD}"><rect x="30" y="4" width="10" height="30"/><rect x="60" y="4" width="10" height="30"/></g><g fill="${C.red}"><rect x="46" y="4" width="8" height="38"/></g>
<g ${B}><polygon points="${star(50, 66, 31, 16)}" fill="${lin(["#FFE89A", C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="66" r="11" fill="${lin([C.red, C.redD])}"/><circle cx="50" cy="66" r="11" fill="none" stroke="${C.goldD}" stroke-width="1.6"/>
<polygon points="${star(50, 66.6, 7.4, 3.2)}" fill="${C.paper}"/>`,
  },
  {
    u: "1f3c6",
    n: "trophy",
    draw: ({ lin }) => `
<g ${B}><path d="M27 18 H10 C8 40 18 52 32 54" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M73 18 H90 C92 40 82 52 68 54" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><path d="M24 8 H76 V34 C76 54 62 62 50 62 C38 62 24 54 24 34Z" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/></g>
<g ${B}><rect x="43" y="60" width="14" height="18" fill="${lin([C.goldD, C.gold, C.goldD], "h")}"/></g>
<g ${B}><path d="M24 78 H76 a4 4 0 0 1 4 4 V90 H20 V82 a4 4 0 0 1 4 -4Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<rect x="38" y="82" width="24" height="4.4" rx="2" fill="${C.gold}"/>
<g ${Bs}><polygon points="${star(50, 33, 12, 5.2)}" fill="${lin(["#FFF3BF", C.paper])}"/></g>
<path d="M31 14 V36 C31 46 36 52 42 55" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>`,
  },
  {
    u: "1f947",
    n: "1st place medal",
    draw: ({ lin }) => medal(lin, [[C.redM, C.redD], [C.red, C.redM]], ["#FCE595", C.gold, C.goldM, C.goldD], "#A9741A", [C.gold, C.goldD], C.goldD, G1),
  },
  {
    u: "1f948",
    n: "2nd place medal",
    draw: ({ lin }) => medal(lin, [[C.blueM, C.blueD], [C.blue, C.blueM]], ["#F4F7FA", C.metal, "#9EA6B2", C.metalD], C.metalDD, [C.metal, C.metalD], C.metalDD, G2),
  },
  {
    u: "1f949",
    n: "3rd place medal",
    draw: ({ lin }) => medal(lin, [[C.greenM, C.greenD], [C.green, C.greenM]], ["#F2C49A", "#D9915A", "#B76E3C", "#8C4E26"], "#6B3A1A", ["#D9915A", "#8C4E26"], "#6B3A1A", G3),
  },
];

export default __batch;
