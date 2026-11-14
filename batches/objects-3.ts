// Objects 3: instruments, phones, power, computers, film and photo, light.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const out: Icon[] = [];
const add = (u, n, draw) => out.push({ u, n, draw });
const MT = (lin) => lin([C.metalL, C.metal, C.metalD], "d");
const MH = (lin) => lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h");
const PAPER = (lin) => lin([C.paper, C.paperD]);
const reel = (lin, cx, cy, r) =>
  `<g ${Bs}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>` +
  [0, 1, 2].map((k) => { const a = (k * 2 * Math.PI) / 3 - Math.PI / 2; return `<circle cx="${(cx + r * 0.55 * Math.cos(a)).toFixed(1)}" cy="${(cy + r * 0.55 * Math.sin(a)).toFixed(1)}" r="${(r * 0.2).toFixed(1)}" fill="${C.navyD}" opacity=".75"/>`; }).join("") +
  `<circle cx="${cx}" cy="${cy}" r="${(r * 0.14).toFixed(1)}" fill="${C.navyD}" opacity=".8"/>`;

// ───────── instruments
add("1fa88", "flute", ({ lin }) => `
<g ${B}><g transform="rotate(-42 50 50)">
<rect x="-6" y="42" width="112" height="16" rx="8" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<rect x="-6" y="40.5" width="8" height="19" rx="3" fill="${lin([C.gold, C.goldD])}"/>
<rect x="96" y="40.5" width="8" height="19" rx="3" fill="${lin([C.gold, C.goldD])}"/>
<rect x="46" y="40.5" width="5" height="19" rx="2" fill="${lin([C.gold, C.goldD])}"/>
</g></g>
<g transform="rotate(-42 50 50)"><ellipse cx="14" cy="50" rx="3.6" ry="2.6" fill="${C.woodDD}" opacity=".85"/>
${[58, 66, 74, 83, 91].map((x) => `<circle cx="${x}" cy="50" r="2.7" fill="${C.woodDD}" opacity=".85"/>`).join("")}
<rect x="2" y="44.5" width="40" height="3" rx="1.5" fill="#fff" opacity=".22"/></g>`);

add("1fa89", "harp", ({ lin }) => {
  const q = (t) => [(1 - t) ** 2 * 22 + 2 * t * (1 - t) * 62 + t * t * 84, (1 - t) ** 2 * 10 + 2 * t * (1 - t) * 4 + t * t * 38];
  const strings = [0.2, 0.34, 0.48, 0.62, 0.76].map((t, i) => { const [x, y] = q(t); return `<path d="M${x.toFixed(1)} ${(y + 2).toFixed(1)} V${86 - i * 0}" stroke="${i % 2 ? C.paper : C.paperD}" stroke-width="1.7"/>`; }).join("");
  return `
<g ${B}>
<path d="M24 10 Q62 4 84 38 L82 88 H66 L70 50" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="0"/>
<path d="M17 12 C52 -2 88 14 92 50 L86 90 H68 L72 52 C68 36 46 22 28 24 V84 H17Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/>
<rect x="12" y="84" width="46" height="9" rx="4" fill="${lin([C.wood, C.woodD])}"/>
</g>
<g ${Bs}>${strings}</g>
<g fill="${C.redM}"><circle cx="34" cy="26" r="1.8"/></g>`;
});

// ───────── phones
const phone = (lin, x, y, w, h) => `
<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<rect x="${x + 4}" y="${y + 9}" width="${w - 8}" height="${h - 20}" rx="3.5" fill="${lin([C.sky, C.blue, C.blueM], "d")}"/>
<rect x="${x + w / 2 - 5}" y="${y + 3.6}" width="10" height="2.6" rx="1.3" fill="${C.navyD}" opacity=".7"/>
<circle cx="${x + w / 2}" cy="${y + h - 5.5}" r="2.4" fill="${C.sky}" opacity=".7"/>
${[0, 1, 2, 3].map((k) => `<rect x="${x + 8 + (k % 2) * (w / 2 - 6)}" y="${y + 15 + Math.floor(k / 2) * 14}" width="${w / 2 - 8}" height="10" rx="3" fill="${[C.gold, C.red, C.green, C.paper][k]}" opacity=".9"/>`).join("")}`;
add("1f4f1", "mobile phone", ({ lin }) => phone(lin, 27, 6, 46, 88));
add("1f4f2", "mobile phone with arrow", ({ lin }) => `${phone(lin, 12, 8, 44, 84)}
<g ${B}><polygon points="58,50 74,32 74,43 94,43 94,57 74,57 74,68" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>`);

add("260e-fe0f", "telephone", ({ lin }) => `
<g ${Bs}><rect x="22" y="36" width="10" height="22" fill="${lin([C.metalL, C.metalD], "h")}"/><rect x="68" y="36" width="10" height="22" fill="${lin([C.metalL, C.metalD], "h")}"/></g>
<g ${B}><path d="M8 88 Q8 84 10 78 L18 60 Q20 55 26 55 H74 Q80 55 82 60 L90 78 Q92 84 92 88 Q92 93 87 93 H13 Q8 93 8 88Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><path d="M7 30 Q7 14 22 14 H78 Q93 14 93 30 V36 Q93 40 88 40 H74 Q69 40 69 36 V33 H31 V36 Q31 40 26 40 H12 Q7 40 7 36Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<circle cx="50" cy="74" r="14.5" fill="${PAPER(lin)}"/>
${[0, 1, 2, 3, 4, 5, 6].map((k) => { const a = -2.2 + k * 0.62; return `<circle cx="${(50 + 9.5 * Math.cos(a)).toFixed(1)}" cy="${(74 + 9.5 * Math.sin(a)).toFixed(1)}" r="2.2" fill="${C.redD}" opacity=".75"/>`; }).join("")}
<circle cx="50" cy="74" r="3" fill="${C.redD}" opacity=".6"/>`);

add("1f4de", "telephone receiver", ({ lin }) => `
<g ${B}><g transform="rotate(40 50 50) translate(57 43) scale(1.06) translate(-50 -50)">
<path d="M10 70 V54 C10 24 90 24 90 54 V70 a7 7 0 0 1 -7 7 H70 a7 7 0 0 1 -7 -7 V60 C63 48 37 48 37 60 V70 a7 7 0 0 1 -7 7 H17 a7 7 0 0 1 -7 -7Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/>
</g></g>
<g ${Bs}><path d="M70 16 A18 18 0 0 1 86 32 M64 28 A9 9 0 0 1 72 36" transform="translate(6 -4)" fill="none" stroke="${C.gold}" stroke-width="4" stroke-linecap="round"/></g>`);

add("1f4df", "pager", ({ lin }) => `
<g ${B}><rect x="10" y="26" width="80" height="52" rx="9" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${Bs}><rect x="38" y="16" width="24" height="12" rx="3" fill="${MT(lin)}"/></g>
<rect x="18" y="33" width="64" height="23" rx="3.5" fill="${lin(["#D7EBA4", "#A7C67A"])}"/>
<path d="M24 40 H72 M24 47 H58" stroke="${C.greenD}" stroke-width="2.6" stroke-linecap="round" opacity=".75"/>
<g ${Bs}>${[26, 42, 58].map((x) => `<rect x="${x}" y="62" width="14" height="8" rx="4" fill="${lin([C.paper, C.paperD])}"/>`).join("")}<circle cx="76" cy="66" r="4.2" fill="${lin([C.red, C.redD])}"/></g>`);

add("1f4e0", "fax machine", ({ lin }) => `
<g ${B}><rect x="26" y="10" width="46" height="36" fill="${PAPER(lin)}"/></g>
<path d="M32 19 H64 M32 26 H64 M32 33 H52" stroke="#9C8F74" stroke-width="1.8" opacity=".7"/>
<g ${B}><rect x="6" y="40" width="88" height="40" rx="7" fill="${lin(["#8E97AE", C.metalD, C.metalDD], "d")}"/></g>
<rect x="12" y="45" width="42" height="9" rx="2" fill="${C.navyD}" opacity=".55"/>
<g ${Bs}><rect x="12" y="58" width="28" height="16" rx="3" fill="${lin([C.sky, C.blue])}"/>
${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${52 + (k % 3) * 11}" y="${58 + Math.floor(k / 2.5) * 8}" width="8.5" height="6" rx="2" fill="${lin([C.paper, C.paperD])}"/>`).join("")}</g>
<circle cx="84" cy="50" r="2.4" fill="${C.green}"/>
<g ${B}><path d="M28 64 H70 V94 H28Z" fill="${PAPER(lin)}"/></g>
<path d="M34 74 H64 M34 82 H58" stroke="#9C8F74" stroke-width="1.8" opacity=".7"/>`);

// ───────── power
const cell = (lin, full) => `
<g ${B}><rect x="40" y="6" width="20" height="14" rx="4" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/>
<rect x="24" y="16" width="52" height="78" rx="10" fill="${MH(lin)}"/></g>
${full
  ? `<rect x="31" y="24" width="38" height="62" rx="5" fill="${lin([C.green, C.greenM, C.greenD], "h")}"/><path d="M36 30 V80" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/><path d="M31 44 H69 M31 58 H69 M31 72 H69" stroke="${C.greenD}" stroke-width="1.6" opacity=".55"/>`
  : `<rect x="31" y="24" width="38" height="62" rx="5" fill="${lin(["#6C7385", "#8E97AE"])}"/><rect x="31" y="70" width="38" height="16" rx="4" fill="${lin([C.red, C.redM, C.redD])}"/><path d="M36 30 V62" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".25"/>`}`;
add("1f50b", "battery", ({ lin }) => cell(lin, true));
add("1faab", "low battery", ({ lin }) => cell(lin, false));

add("1f50c", "electric plug", ({ lin }) => `
<g ${Bs}><g transform="translate(8 8) rotate(45 50 50) translate(50 50) scale(.9) translate(-50 -50)">
<rect x="35" y="2" width="7" height="32" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/><rect x="58" y="2" width="7" height="32" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/></g></g>
<g ${B}><g transform="translate(8 8) rotate(45 50 50) translate(50 50) scale(.9) translate(-50 -50)">
<rect x="28" y="30" width="44" height="34" rx="9" fill="${lin([C.red, C.redM, C.redD], "d")}"/>
<rect x="40" y="62" width="20" height="14" rx="4" fill="${lin([C.redM, C.redD])}"/>
</g></g>
<g ${Bs}><g transform="translate(8 8) rotate(45 50 50) translate(50 50) scale(.9) translate(-50 -50)"><path d="M50 74 V84 C50 98 30 96 30 108" fill="none" stroke="${C.dark}" stroke-width="7" stroke-linecap="round"/></g></g>`);

// ───────── computers
add("1f4bb", "laptop", ({ lin }) => `
<g ${B}><rect x="17" y="12" width="66" height="50" rx="6" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<rect x="23" y="18" width="54" height="38" rx="2.5" fill="${lin([C.sky, C.blue, C.blueM], "d")}"/>
<path d="M28 28 H52 M28 36 H44" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>
<g ${B}><path d="M6 68 H94 L90 82 Q89 86 84 86 H16 Q11 86 10 82Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<rect x="38" y="71" width="24" height="6" rx="2.5" fill="${C.metalDD}" opacity=".4"/>`);

add("1f5a5-fe0f", "desktop computer", ({ lin }) => `
<g ${B}><rect x="8" y="10" width="84" height="60" rx="7" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<rect x="14" y="16" width="72" height="42" rx="3" fill="${lin([C.sky, C.blue, C.blueM], "d")}"/>
<path d="M22 28 H50 M22 37 H40" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
<circle cx="50" cy="64" r="2" fill="${C.sky}" opacity=".7"/>
<g ${B}><path d="M42 70 H58 L62 86 H38Z" fill="${lin([C.metal, C.metalD], "h")}"/><rect x="26" y="84" width="48" height="9" rx="4.5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>`);

add("1f5a8-fe0f", "printer", ({ lin }) => `
<g ${B}><rect x="24" y="8" width="52" height="36" fill="${PAPER(lin)}"/></g>
<path d="M31 17 H69 M31 24 H69 M31 31 H54" stroke="#9C8F74" stroke-width="1.8" opacity=".7"/>
<g ${B}><rect x="6" y="38" width="88" height="40" rx="9" fill="${lin(["#8E97AE", C.metalD, C.metalDD], "d")}"/></g>
<rect x="14" y="44" width="72" height="6" rx="3" fill="${C.navyD}" opacity=".5"/>
<circle cx="80" cy="63" r="3" fill="${C.green}"/><rect x="14" y="58" width="22" height="4" rx="2" fill="${C.sky}" opacity=".5"/>
<g ${B}><rect x="26" y="64" width="48" height="30" fill="${PAPER(lin)}"/></g>
<path d="M33 74 H67 M33 82 H58" stroke="#9C8F74" stroke-width="1.8" opacity=".7"/>`);

add("2328-fe0f", "keyboard", ({ lin }) => {
  const k = lin([C.paper, C.paperD]);
  const row = (n, x0, y) => Array.from({ length: n }, (_, i) => `<rect x="${(x0 + i * 8.6).toFixed(1)}" y="${y}" width="6.4" height="9" rx="2" fill="${k}"/>`).join("");
  return `<g ${B}><rect x="5" y="24" width="90" height="54" rx="8" fill="${lin(["#8E97AE", "#5F6B8F"], "d")}"/></g>
<g ${Bs}>${row(10, 10, 30)}${row(9, 13, 42)}${row(7, 18, 54)}<rect x="31" y="65" width="38" height="8" rx="3" fill="${k}"/></g>`;
});

add("1f5b1-fe0f", "computer mouse", ({ lin }) => `
<g ${Bs}><path d="M50 32 C50 16 38 22 38 6" fill="none" stroke="${C.dark}" stroke-width="3.4" stroke-linecap="round"/></g>
<g ${B}><path d="M50 28 C70 28 74 44 74 58 V68 C74 84 66 95 50 95 C34 95 26 84 26 68 V58 C26 44 30 28 50 28Z" fill="${lin(["#E3E8EE", C.metal, C.metalD], "d")}"/></g>
<path d="M26 56 H74 M50 30 V56" stroke="${C.metalDD}" stroke-width="1.6" opacity=".6"/>
<g ${Bs}><rect x="45.5" y="38" width="9" height="13" rx="4.5" fill="${lin([C.blue, C.blueD])}"/></g>`);

add("1f5b2-fe0f", "trackball", ({ lin, rad }) => `
<g ${B}><rect x="6" y="8" width="88" height="84" rx="14" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${Bs}><rect x="14" y="70" width="32" height="15" rx="6" fill="${lin([C.paper, C.paperD])}"/><rect x="54" y="70" width="32" height="15" rx="6" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><circle cx="50" cy="40" r="26" fill="${rad(["#F58578", C.redM, C.redD], 0.34, 0.3, 0.85)}"/></g>
<ellipse cx="40" cy="30" rx="6" ry="4" transform="rotate(-35 40 30)" fill="#fff" opacity=".4"/>`);

// ───────── disks
add("1f4bd", "computer disk", ({ lin, rad }) => `
<g ${B}><rect x="14" y="8" width="72" height="84" rx="8" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<g ${Bs}><rect x="22" y="14" width="56" height="20" rx="3" fill="${PAPER(lin)}"/></g>
<path d="M28 21 H70 M28 28 H56" stroke="${C.tealD}" stroke-width="2" opacity=".6"/>
<g ${B}><circle cx="50" cy="63" r="22" fill="${rad(["#fff", C.metalL, C.metal, C.metalD], 0.4, 0.3, 0.9)}"/></g>
<circle cx="50" cy="63" r="6.5" fill="${C.tealD}"/><circle cx="50" cy="63" r="3" fill="${C.metalL}" opacity=".8"/>`);

add("1f4be", "floppy disk", ({ lin }) => `
<g ${B}><path d="M10 14 Q10 8 16 8 H76 L92 24 V86 Q92 92 86 92 H16 Q10 92 10 86Z" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${B}><path d="M28 8 H68 V36 H28Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<rect x="55" y="13" width="8" height="18" rx="2" fill="${C.navyD}" opacity=".7"/>
<g ${Bs}><rect x="20" y="52" width="60" height="40" rx="2" fill="${PAPER(lin)}"/></g>
<path d="M27 63 H73 M27 72 H73 M27 81 H56" stroke="${C.blueM}" stroke-width="1.8" opacity=".6"/>`);

const disc = (lin, rad, tint, label) => `
<g ${B}><path d="M50 7 A43 43 0 1 1 49.99 7Z M50 41 A9 9 0 1 0 50.01 41Z" fill-rule="evenodd" fill="${rad(tint, 0.36, 0.3, 0.9)}"/></g>
<g fill="none" stroke-width="20" opacity=".34"><circle cx="50" cy="50" r="24" stroke="${C.pinkD}" stroke-dasharray="26 125" transform="rotate(-70 50 50)"/><circle cx="50" cy="50" r="24" stroke="${C.blueM}" stroke-dasharray="26 125" transform="rotate(20 50 50)"/><circle cx="50" cy="50" r="24" stroke="${C.greenM}" stroke-dasharray="26 125" transform="rotate(110 50 50)"/></g>
<circle cx="50" cy="50" r="16" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/>
<circle cx="50" cy="50" r="42.5" fill="none" stroke="${C.metalD}" stroke-width="1.4" opacity=".9"/>${label}`;
add("1f4bf", "optical disk", ({ lin, rad }) => disc(lin, rad, ["#FFFFFF", "#DCE6F2", C.metal, C.metalD], ""));
add("1f4c0", "dvd", ({ lin, rad }) => disc(lin, rad, ["#FFF4C8", "#F1D88A", C.goldM, "#9C7424"], `<path d="M30 66 h3 a5 5 0 0 1 0 10 H30z M42 66 l5 10 5-10 M56 66 h3 a5 5 0 0 1 0 10 H56z" fill="none" stroke="${C.goldD}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`));

// ───────── film
add("1f3a5", "movie camera", ({ lin }) => `
<g ${B}><circle cx="30" cy="27" r="19" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/><circle cx="64" cy="25" r="17" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
${[[30, 27, 19], [64, 25, 17]].map(([x, y, r]) => [0, 1, 2].map((k) => { const a = (k * 2 * Math.PI) / 3 - Math.PI / 2; return `<circle cx="${(x + r * 0.55 * Math.cos(a)).toFixed(1)}" cy="${(y + r * 0.55 * Math.sin(a)).toFixed(1)}" r="${(r * 0.2).toFixed(1)}" fill="${C.navyD}" opacity=".7"/>`; }).join("")).join("")}
<g ${B}><rect x="8" y="42" width="60" height="42" rx="7" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${B}><path d="M68 52 L92 40 V84 L68 74Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<circle cx="20" cy="54" r="3.2" fill="${C.red}"/><rect x="28" y="62" width="30" height="3.4" rx="1.7" fill="${C.sky}" opacity=".5"/>`);

add("1f39e-fe0f", "film frames", ({ lin }) => {
  const holes = (y) => Array.from({ length: 8 }, (_, i) => `<rect x="${(13 + i * 9.4).toFixed(1)}" y="${y}" width="5" height="5" rx="1.2"/>`).join("");
  const frs = [[C.sky, C.blueM], [C.yellow, C.orange], [C.green, C.greenD]];
  return `<g ${B}><g transform="rotate(-24 50 50)"><rect x="9" y="26" width="82" height="48" rx="5" fill="${lin(["#8B7F8A", C.dark])}"/></g></g>
<g transform="rotate(-24 50 50)"><g fill="${C.paper}" opacity=".85">${holes(29)}${holes(66)}</g>
${frs.map((c, i) => `<rect x="${15 + i * 26}" y="38" width="22" height="24" rx="2" fill="${lin(c, "d")}"/>`).join("")}</g>`;
});

add("1f4fd-fe0f", "film projector", ({ lin }) => `
<path d="M80 52 L98 36 V82 L80 66Z" fill="${C.gold}" opacity=".55"/>
${reel(lin, 26, 26, 18)}${reel(lin, 58, 24, 16)}
<g ${B}><rect x="8" y="42" width="66" height="34" rx="6" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/>
<rect x="70" y="50" width="14" height="18" rx="3" fill="${MH(lin)}"/></g>
<g ${Bs}><path d="M24 76 L16 94 M58 76 L66 94" stroke="${C.metalD}" stroke-width="5" stroke-linecap="round"/></g>
<circle cx="19" cy="55" r="3" fill="${C.red}"/><rect x="28" y="56" width="30" height="3.4" rx="1.7" fill="${C.sky}" opacity=".5"/>`);

const stripes = (x, y, w, h, a, b) => {
  let s = "";
  for (let i = 0; i < w / 12 + 1; i++) s += `<polygon points="${x + i * 16},${y} ${x + i * 16 + 8},${y} ${x + i * 16 - 2},${y + h} ${x + i * 16 - 10},${y + h}" fill="${i % 2 ? a : b}"/>`;
  return s;
};
add("1f3ac", "clapper board", ({ lin, clip }) => `
<g ${B}><rect x="8" y="46" width="84" height="46" rx="5" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${B}><g ${clip('<rect x="8" y="36" width="84" height="12"/>')}><rect x="8" y="36" width="84" height="12" fill="${C.paper}"/>${stripes(14, 36, 84, 12, C.navyD, C.paper)}</g></g>
<g ${B}><g transform="rotate(-10 8 34)"><g ${clip('<rect x="8" y="18" width="84" height="15" rx="2"/>')}><rect x="8" y="18" width="84" height="15" fill="${C.paper}"/>${stripes(14, 18, 84, 15, C.navyD, C.paper)}</g></g></g>
<g stroke="${C.sky}" stroke-width="2.4" stroke-linecap="round" opacity=".7"><path d="M16 60 H48 M16 70 H34 M56 60 H84 M56 70 H72"/></g>
<circle cx="80" cy="82" r="3.6" fill="${C.gold}"/>`);

add("1f4fa", "television", ({ lin }) => `
<g ${Bs}><path d="M50 26 L28 6 M50 26 L72 6" fill="none" stroke="${C.metalD}" stroke-width="3" stroke-linecap="round"/></g>
<g ${B}><rect x="6" y="24" width="88" height="66" rx="10" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><rect x="13" y="31" width="56" height="52" rx="8" fill="${lin([C.sky, C.blue, C.blueM], "d")}"/></g>
<path d="M21 42 H44 M21 50 H34" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
<g ${Bs}><circle cx="81" cy="44" r="6" fill="${lin([C.metalL, C.metalD], "d")}"/><circle cx="81" cy="62" r="6" fill="${lin([C.metalL, C.metalD], "d")}"/></g>
<path d="M76 76 H86" stroke="${C.woodDD}" stroke-width="2" opacity=".6"/>`);

// ───────── cameras
const cam = (lin, rad, flash) => `
<g ${B}><path d="M30 28 L36 16 H64 L70 28Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<rect x="6" y="26" width="88" height="62" rx="11" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<rect x="6" y="26" width="88" height="14" rx="7" fill="${C.metalL}" opacity=".35"/>
<g ${B}><circle cx="50" cy="58" r="23" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<circle cx="50" cy="58" r="16" fill="${rad(["#6F86C4", C.navy, C.navyD], 0.4, 0.3, 0.9)}"/>
<circle cx="50" cy="58" r="7" fill="${C.navyD}" opacity=".6"/><ellipse cx="43.5" cy="51.5" rx="4.4" ry="2.8" transform="rotate(-40 43.5 51.5)" fill="#fff" opacity=".7"/>
<circle cx="80" cy="36" r="3.4" fill="${C.gold}"/>${flash}`;
add("1f4f7", "camera", ({ lin, rad }) => cam(lin, rad, ""));
add("1f4f8", "camera with flash", ({ lin, rad }) => cam(lin, rad, `<g ${Bs}><path d="M14 8 V2 M6 12 L1 10" stroke="${C.gold}" stroke-width="0"/><polygon points="20,4 24,12 33,12 26,17 28,25 20,20 12,25 14,17 7,12 16,12" fill="${lin([C.yellow, C.yellowD])}" transform="translate(0 -2) scale(.95)"/></g>`));

add("1f4f9", "video camera", ({ lin, rad }) => `
<g ${B}><rect x="6" y="26" width="64" height="48" rx="9" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/>
<path d="M70 44 L94 28 V76 L70 60Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${Bs}><rect x="16" y="14" width="30" height="13" rx="5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<circle cx="38" cy="52" r="14" fill="${rad(["#6F86C4", C.navy, C.navyD], 0.4, 0.3, 0.9)}"/>
<ellipse cx="33" cy="46.5" rx="4" ry="2.6" transform="rotate(-40 33 46.5)" fill="#fff" opacity=".65"/>
<circle cx="15" cy="35" r="3.4" fill="${C.red}"/>
<g ${Bs}><rect x="14" y="76" width="44" height="9" rx="4" fill="${lin([C.metal, C.metalD])}"/></g>`);

add("1f4fc", "videocassette", ({ lin }) => `
<g ${B}><rect x="5" y="20" width="90" height="62" rx="7" fill="${lin(["#7A8BC0", C.navy, C.navyD], "d")}"/></g>
<g ${Bs}><rect x="13" y="26" width="74" height="26" rx="3" fill="${PAPER(lin)}"/></g>
<rect x="13" y="26" width="74" height="7" fill="${C.red}" opacity=".85"/>
<path d="M20 42 H66 M20 47 H52" stroke="#9C8F74" stroke-width="1.8" opacity=".7"/>
<rect x="28" y="57" width="44" height="18" rx="9" fill="${C.navyD}" opacity=".8"/>
<circle cx="39" cy="66" r="5.4" fill="${C.paper}"/><circle cx="61" cy="66" r="5.4" fill="${C.paper}"/>
<circle cx="39" cy="66" r="2" fill="${C.navyD}"/><circle cx="61" cy="66" r="2" fill="${C.navyD}"/>`);

// ───────── light
add("1f50e", "magnifying glass tilted right", ({ lin, rad }) => `
<g ${B}><g transform="rotate(-45 39 61)">
<rect x="1" y="55" width="36" height="12" rx="6" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<rect x="32" y="56.2" width="9" height="9.6" rx="2" fill="${lin([C.gold, C.goldD])}"/>
</g></g>
<circle cx="60" cy="40" r="25" fill="${rad([[0, "#F2FAFF", 0.6], [1, "#8EC0E6", 0.36]], 0.36, 0.3, 0.8)}"/>
<g ${B}><circle cx="60" cy="40" r="27" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="6.5"/></g>
<path d="M43.5 37 A17 17 0 0 1 57 23.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".75"/>`);

add("1f56f-fe0f", "candle", ({ lin, rad }) => `
<g ${B}><rect x="36" y="40" width="28" height="40" rx="3" fill="${lin([C.creamD, C.paper, C.cream, C.creamD], "h")}"/>
<path d="M36 41 H64 V47 C60 52 58 46 54 49 C50 53 46 47 42 50 C38 52 36 47 36 47Z" fill="${C.paper}"/>
<path d="M12 72 H26 Q30 72 30 76 V80 Q30 86 36 86 H64 Q70 86 70 80 V76 Q70 72 74 72 H88 Q86 94 74 94 H26 Q14 94 12 72Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<path d="M50 40 V32" stroke="${C.dark}" stroke-width="2.2" stroke-linecap="round"/>
<path d="M50 31 C38 22 44 12 50 4 C56 12 62 22 50 31Z" fill="${rad(["#FFF3B0", C.yellowM, C.orange], 0.5, 0.75, 0.9)}"/>
<ellipse cx="50" cy="25" rx="3.2" ry="5" fill="#fff" opacity=".7"/>`);

add("1f4a1", "light bulb", ({ lin, rad }) => `
<g ${Bs}><path d="M14 16 L20 22 M86 16 L80 22 M5 44 H13 M95 44 H87 M50 6 V10" stroke="${C.goldM}" stroke-width="4" stroke-linecap="round" fill="none"/></g>
<g ${B}><path d="M50 12 C70 12 79 26 79 40 C79 52 70 58 66 68 V72 H34 V68 C30 58 21 52 21 40 C21 26 30 12 50 12Z" fill="${rad(["#FFF6BE", C.yellow, C.yellowD], 0.38, 0.3, 0.85)}"/></g>
<path d="M40 58 L45 44 L50 52 L55 44 L60 58" fill="none" stroke="${C.orangeD}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity=".85"/>
<ellipse cx="36" cy="30" rx="4.5" ry="8" transform="rotate(25 36 30)" fill="#fff" opacity=".55"/>
<g ${B}><rect x="34" y="70" width="32" height="8" rx="2.5" fill="${MH(lin)}"/><rect x="35" y="78" width="30" height="8" rx="2.5" fill="${MH(lin)}"/><path d="M40 86 H60 Q60 94 50 94 Q40 94 40 86Z" fill="${lin([C.metalD, C.metalDD])}"/></g>`);

add("1f526", "flashlight", ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50) translate(50 50) scale(.95) translate(-50 -50)">
<rect x="-6" y="41" width="70" height="18" rx="6" fill="${lin([C.blue, C.blueM, C.blueD])}"/>
<polygon points="62,38 86,28 86,72 62,62" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<rect x="84" y="26" width="7" height="48" rx="3" fill="${lin([C.metal, C.metalD], "h")}"/>
</g></g>
<g transform="rotate(-45 50 50) translate(50 50) scale(.95) translate(-50 -50)">
<ellipse cx="90" cy="50" rx="2.6" ry="19" fill="${C.yellow}"/>
<path d="M10 45 H44 M10 55 H44" stroke="${C.blueD}" stroke-width="1.6" opacity=".45"/></g>
<g ${Bs}><g transform="rotate(-45 50 50) translate(50 50) scale(.95) translate(-50 -50)"><rect x="26" y="37" width="10" height="5" rx="2.5" fill="${lin([C.gold, C.goldD])}"/></g></g>`);

add("1f3ee", "red paper lantern", ({ lin, rad }) => `
<path d="M50 5 V14" stroke="${C.goldD}" stroke-width="2.4"/>
<g ${B}><ellipse cx="50" cy="50" rx="40" ry="31" fill="${rad(["#F58578", C.redM, C.redD], 0.36, 0.3, 0.9)}"/></g>
<path d="M50 19 C34 30 34 70 50 81 M50 19 C66 30 66 70 50 81 M50 19 V81" fill="none" stroke="${C.redD}" stroke-width="1.8" opacity=".55"/>
<ellipse cx="32" cy="38" rx="6" ry="9" transform="rotate(28 32 38)" fill="#fff" opacity=".28"/>
<g ${B}><rect x="30" y="12" width="40" height="9" rx="3" fill="${lin([C.gold, C.goldM, C.goldD])}"/><rect x="30" y="79" width="40" height="9" rx="3" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<g ${Bs}><path d="M42 88 V94 M50 88 V94 M58 88 V94" stroke="${C.goldM}" stroke-width="3.2" stroke-linecap="round"/></g>`);

add("1fa94", "diya lamp", ({ lin, rad }) => `
<g ${B}><path d="M6 48 C20 46 80 46 94 48 C94 76 74 90 50 90 C26 90 6 76 6 48Z" fill="${lin([C.orange, "#C9692A", C.woodD], "d")}"/>
<rect x="36" y="86" width="28" height="8" rx="3" fill="${lin([C.wood, C.woodDD])}"/></g>
<ellipse cx="50" cy="49" rx="42" ry="6" fill="${lin([C.gold, C.goldD])}" opacity=".85"/>
<g ${Bs}><path d="M12 49 C20 51 80 51 88 49" fill="none" stroke="${C.goldM}" stroke-width="3" stroke-linecap="round"/></g>
<g fill="${C.gold}" opacity=".9"><circle cx="30" cy="68" r="2.6"/><circle cx="50" cy="74" r="2.6"/><circle cx="70" cy="68" r="2.6"/></g>
<path d="M50 46 V40" stroke="${C.dark}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M50 40 C36 30 44 18 50 4 C56 18 64 30 50 40Z" fill="${rad(["#FFF3B0", C.yellowM, C.orange], 0.5, 0.78, 0.9)}"/>
<ellipse cx="50" cy="32" rx="3.2" ry="6" fill="#fff" opacity=".7"/>`);

const __batch: Icon[] = out;

export default __batch;
