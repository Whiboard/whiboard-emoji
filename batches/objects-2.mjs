import { B, Bs, C, star } from "../kit.mjs";

const f = (n) => +n.toFixed(1);
const gold = (lin, d = "v") => lin([C.gold, C.goldM, C.goldD], d);
const goldH = (lin) => lin([C.goldD, C.goldM, "#FCE595", C.gold, C.goldD], "h");
const arcs = (rs, col, w = 5) =>
  rs.map((r) => `<path d="M${f(54 + r * 0.67)} ${f(50 - r * 0.74)} A${r} ${r} 0 0 1 ${f(54 + r * 0.67)} ${f(50 + r * 0.74)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`).join("");

const spk = (lin, kind) => `<g transform="${kind === "low" ? "translate(50 50) scale(1.15) translate(-27 -50)" : kind === "mid" ? "translate(50 50) scale(1.08) translate(-38.5 -50)" : ""}">
<g ${B}><path d="M20 37 L44 14 Q48 12 48 17 V83 Q48 88 44 86 L20 63Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="6" y="37" width="17" height="26" rx="3.5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${Bs}>${kind === "mute" ? `<path d="M64 38 L90 62 M90 38 L64 62" stroke="${C.red}" stroke-width="6.5" stroke-linecap="round"/>` : arcs(kind === "low" ? [] : kind === "mid" ? [14] : [12, 24, 36], gold(lin, "d"))}</g></g>`;

const horn = (lin) => `
<g ${B}><rect x="6" y="38" width="22" height="26" rx="5" fill="${lin([C.redM, C.redD])}"/>
<rect x="30" y="60" width="11" height="26" rx="4.5" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}><path d="M26 38 L68 14 V88 L26 64Z" fill="${lin([C.orange, C.orangeD, "#B8601C"])}"/></g>
<g ${B}><ellipse cx="68" cy="51" rx="7" ry="37" fill="${lin([C.paper, C.paperD], "h")}"/></g>
<ellipse cx="69" cy="51" rx="4" ry="30" fill="${C.woodDD}" opacity=".35"/>`;

const bell = (lin) => `
<g ${B}><g transform="rotate(-14 50 50)">
<rect x="44.5" y="4" width="11" height="27" rx="5.5" fill="${lin([C.woodD, C.woodL, C.wood, C.woodDD], "h")}"/>
<rect x="42.5" y="27" width="15" height="6.5" rx="2.4" fill="${lin([C.gold, C.goldD])}"/>
<circle cx="50" cy="87.5" r="5.6" fill="${lin([C.goldM, C.goldD])}"/></g></g>
<g ${B}><g transform="rotate(-14 50 50)">
<path d="M50 32 C36 32 32.5 47 30.5 62 C29.5 70 24.5 76 18 81 H82 C75.5 76 70.5 70 69.5 62 C67.5 47 64 32 50 32Z" fill="${lin(["#B27C1E", C.goldM, "#FCE595", C.gold, "#A9741A"], "h")}"/>
<rect x="14.5" y="78" width="71" height="7.5" rx="3.75" fill="${lin(["#B27C1E", C.gold, "#FCE595", C.goldM, "#A9741A"], "h")}"/></g></g>`;

const grille = (cx, cy, r) =>
  [-0.55, 0, 0.55].map((k) => { const d = k * r, h = Math.sqrt(r * r - d * d); return `M${f(cx - h)} ${f(cy + d)} H${f(cx + h)} M${f(cx + d)} ${f(cy - h)} V${f(cy + h)}`; }).join("");

const note = (x, y, col) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="9.5" transform="rotate(-22 ${x} ${y})" fill="${col}"/>`;

const mara = (lin, rot, c, dots) => `<g ${B}><g transform="rotate(${rot} 50 50)">
<rect x="45" y="38" width="10" height="46" rx="4" fill="${lin([C.woodD, C.woodL, C.wood, C.woodDD], "h")}"/>
<circle cx="50" cy="88" r="5.5" fill="${lin([C.wood, C.woodD])}"/>
<ellipse cx="50" cy="24" rx="17" ry="20" fill="${lin(c, "d")}"/></g></g>
<g transform="rotate(${rot} 50 50)" fill="${dots}" opacity=".85"><circle cx="43" cy="18" r="2.6"/><circle cx="55" cy="26" r="2.6"/><circle cx="46" cy="31" r="2.2"/><path d="M33 24 Q50 32 67 24" fill="none" stroke="${dots}" stroke-width="2"/></g>`;

export default [
{ u: "1f452", n: "woman’s hat", draw: ({ lin }) => `
<g ${B}><ellipse cx="50" cy="64" rx="46" ry="21" fill="${lin([C.woodL, C.wood, "#B07A44"], "d")}"/></g>
<ellipse cx="50" cy="64" rx="37" ry="15" fill="none" stroke="${C.woodD}" stroke-width="1.2" stroke-dasharray="3 2" opacity=".5"/>
<g ${B}><path d="M24 62 C21 26 36 17 50 17 C64 17 79 26 76 62 C66 71 34 71 24 62Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><path d="M24 54 C36 63 64 63 76 54 L76.5 64 C64 73 36 73 23.5 64Z" fill="${lin([C.pink, C.red, C.redD])}"/>
<path d="M66 62 L88 48 L88 74Z M66 62 L84 80 L88 74Z" fill="${lin([C.red, C.redD], "d")}"/><circle cx="68" cy="63" r="5" fill="${lin([C.redM, C.redD])}"/></g>` },

{ u: "1f3a9", n: "top hat", draw: ({ lin }) => `
<g ${B}><ellipse cx="50" cy="78" rx="45" ry="13" fill="${lin(["#6E7FB4", C.navy, C.navyD])}"/></g>
<g ${B}><path d="M28 20 V74 C28 82 72 82 72 74 V20 C72 12 28 12 28 20Z" fill="${lin([C.navyD, "#6E7FB4", C.navy, C.navyD], "h")}"/></g>
<ellipse cx="50" cy="20" rx="22" ry="6" fill="#8D9BCB" opacity=".55"/>
<g ${Bs}><path d="M28 55 C34 62 66 62 72 55 V68 C66 75 34 75 28 68Z" fill="${lin([C.red, C.redD])}"/></g>` },

{ u: "1f9e2", n: "billed cap", draw: ({ lin }) => `
<g ${B}><path d="M48 64 C66 58 94 60 97 72 C80 79 60 77 46 71Z" fill="${lin([C.redD, "#7E2224"], "d")}"/></g>
<g ${B}><path d="M10 70 C8 34 32 19 54 21 C76 23 86 44 86 70 C60 76 34 76 10 70Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<path d="M54 21 C45 36 43 54 46 73 M54 21 C65 34 71 52 71 73" fill="none" stroke="${C.redD}" stroke-width="1.6" opacity=".55"/>
<g ${Bs}><circle cx="54" cy="21" r="4.4" fill="${lin([C.pink, C.redM])}"/></g>
<rect x="9" y="62" width="76" height="3" fill="#fff" opacity=".2"/>` },

{ u: "1fa96", n: "military helmet", draw: ({ lin }) => `
<g ${B}><path d="M9 64 C9 30 30 15 50 15 C70 15 91 30 91 64Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g fill="${C.greenD}" opacity=".5"><ellipse cx="36" cy="38" rx="9" ry="5" transform="rotate(-25 36 38)"/><ellipse cx="62" cy="30" rx="8" ry="4"/><ellipse cx="70" cy="50" rx="9" ry="4.5" transform="rotate(20 70 50)"/></g>
<g ${B}><rect x="4" y="60" width="92" height="12" rx="6" fill="${lin([C.greenM, C.greenD, "#2E5230"])}"/></g>
<g ${Bs}><path d="M24 72 C22 82 28 90 36 89 L38 72Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<rect x="8" y="62" width="84" height="2.4" fill="#fff" opacity=".18"/>` },

{ u: "26d1-fe0f", n: "rescue worker’s helmet", draw: ({ lin }) => `
<g ${B}><path d="M11 68 C11 30 30 13 50 13 C70 13 89 30 89 68Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><rect x="43" y="9" width="14" height="58" rx="7" fill="${lin([C.pink, C.red, C.redM], "h")}"/></g>
<g ${B}><path d="M5 66 H95 C96 77 90 82 80 82 H20 C10 82 4 77 5 66Z" fill="${lin([C.redM, C.redD, "#7E2224"])}"/></g>
<g ${B}><circle cx="50" cy="46" r="15" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M50 38 V54 M42 46 H58" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>` },

{ u: "1f4ff", n: "prayer beads", draw: ({ lin, rad }) => {
  const wd = rad([C.woodL, C.woodD, C.woodDD]), gd = rad([C.gold, C.goldM, C.goldD]);
  const n = 17, bs = Array.from({ length: n }, (_, i) => { const a = ((90 + 14 + i * (332 / (n - 1))) * Math.PI) / 180; return `<circle cx="${f(50 + 33 * Math.cos(a))}" cy="${f(44 + 33 * Math.sin(a))}" r="5.6" fill="${i % 4 === 2 ? gd : wd}"/>`; }).join("");
  return `<circle cx="50" cy="44" r="33" fill="none" stroke="${C.woodDD}" stroke-width="1.6"/><g ${Bs}>${bs}</g>
<g ${Bs}><path d="M45 84 L55 84 L58 97 H42Z" fill="${lin([C.red, C.redD])}"/><circle cx="50" cy="80" r="6.5" fill="${rad([C.gold, C.goldM, C.goldD])}"/></g>
<path d="M46.5 88 V96 M50 88 V96.5 M53.5 88 V96" stroke="${C.redD}" stroke-width=".9" opacity=".7"/>`; } },

{ u: "1f484", n: "lipstick", draw: ({ lin }) => `
<g ${B}><g transform="rotate(25 50 50)">
<rect x="36" y="56" width="28" height="36" rx="3.5" fill="${lin([C.goldD, C.gold, "#FCE595", C.goldM, C.goldD], "h")}"/>
<rect x="37" y="46" width="26" height="12" rx="2.5" fill="${lin([C.metalD, C.metalL, C.metal, C.metalD], "h")}"/>
<path d="M39 47 V27 C39 20 52 8 61 8 V47Z" fill="${lin([C.pink, C.red, C.redD], "d")}"/></g></g>
<g transform="rotate(25 50 50)" fill="${C.goldD}" opacity=".5"><rect x="36" y="72" width="28" height="1.6"/></g>` },

{ u: "1f48d", n: "ring", draw: ({ lin }) => `
<g ${B}><circle cx="50" cy="64" r="26" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="9"/></g>
<circle cx="50" cy="64" r="21" fill="none" stroke="${C.goldD}" stroke-width="1.2" opacity=".45"/>
<g ${B}><polygon points="33,14 67,14 78,28 50,52 22,28" fill="${lin(["#D6EEFA", C.blue, C.blueD], "d")}"/></g>
<polygon points="33,14 67,14 62,28 38,28" fill="#fff" opacity=".35"/><path d="M22 28 H78 M38 28 L50 52 L62 28 M33 14 L38 28 M67 14 L62 28" fill="none" stroke="${C.blueD}" stroke-width="1" opacity=".5"/>
<g ${Bs}><rect x="44" y="50" width="12" height="9" rx="3" fill="${lin([C.gold, C.goldD])}"/></g>` },

{ u: "1f48e", n: "gem stone", draw: ({ lin }) => `
<g ${B}><polygon points="28,14 72,14 94,38 50,90 6,38" fill="${lin(["#C7E6F8", C.blue, C.blueD], "d")}"/></g>
<polygon points="28,14 72,14 64,38 36,38" fill="#fff" opacity=".4"/>
<polygon points="6,38 28,14 36,38" fill="#fff" opacity=".18"/>
<polygon points="6,38 36,38 50,90" fill="${C.blueD}" opacity=".2"/>
<polygon points="94,38 64,38 50,90" fill="${C.navyD}" opacity=".35"/>
<polygon points="72,14 94,38 64,38" fill="${C.navy}" opacity=".18"/>
<path d="M6 38 H94 M36 38 L50 90 L64 38" fill="none" stroke="${C.navyD}" stroke-width="1" opacity=".4"/>
<ellipse cx="38" cy="26" rx="4" ry="2" fill="#fff" opacity=".8"/>` },

{ u: "1f507", n: "muted speaker", draw: ({ lin }) => spk(lin, "mute") },
{ u: "1f508", n: "speaker low volume", draw: ({ lin }) => spk(lin, "low") },
{ u: "1f509", n: "speaker medium volume", draw: ({ lin }) => spk(lin, "mid") },
{ u: "1f50a", n: "speaker high volume", draw: ({ lin }) => spk(lin, "high") },

{ u: "1f4e2", n: "loudspeaker", draw: ({ lin }) => `<g transform="translate(-4 0) scale(.92 .92) translate(4 4)">${horn(lin)}</g>
<g ${Bs}><path d="M82 30 L90 25 M83 51 H93 M82 72 L90 77" stroke="${gold(lin, "d")}" stroke-width="5" stroke-linecap="round" fill="none"/></g>` },

{ u: "1f4e3", n: "megaphone", draw: ({ lin }) => `<g transform="translate(-9 4)">
<g ${B}><g transform="rotate(-32 50 50)">
<rect x="14" y="42" width="16" height="22" rx="5" fill="${lin([C.blueM, C.blueD])}"/>
<rect x="30" y="62" width="10" height="22" rx="4" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/>
<path d="M28 42 L72 18 V88 L28 64Z" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/>
<ellipse cx="72" cy="53" rx="6" ry="35" fill="${lin([C.red, C.redD], "h")}"/></g></g>
<g transform="rotate(-32 50 50)" fill="${C.red}" opacity=".85"><path d="M44 38 L46 66 L51 68 L49 36Z M57 32 L59 72 L63 74 L61 30Z"/></g>
<g ${Bs}><path d="M80 14 L84 5 M90 28 L98 22 M91 44 L99 44" stroke="${gold(lin, "d")}" stroke-width="4.6" stroke-linecap="round" fill="none"/></g></g>` },

{ u: "1f4ef", n: "postal horn", draw: ({ lin }) => `
<g ${B}><path d="M52 46 L90 10 C98 30 96 52 82 64 L58 62Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="38" cy="60" r="27" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="9"/></g>
<circle cx="38" cy="60" r="18" fill="none" stroke="${C.goldD}" stroke-width="1" opacity=".5"/>
<g ${B}><circle cx="38" cy="60" r="11" fill="none" stroke="${lin([C.goldM, C.goldD], "d")}" stroke-width="5"/>
<rect x="8" y="22" width="15" height="7" rx="3" transform="rotate(35 15 25)" fill="${lin([C.metalL, C.metalD])}"/></g>
<g ${Bs}><path d="M28 36 Q50 24 62 44" fill="none" stroke="${C.red}" stroke-width="2.6" stroke-linecap="round"/><circle cx="26" cy="36" r="3" fill="${C.red}"/></g>` },

{ u: "1f515", n: "bell with slash", draw: ({ lin }) => `${bell(lin)}
<path d="M16 14 L86 88" stroke="${C.redD}" stroke-width="10.5" stroke-linecap="round"/>
<g ${Bs}><path d="M16 14 L86 88" stroke="${C.red}" stroke-width="6.5" stroke-linecap="round"/></g>` },

{ u: "1f3bc", n: "musical score", draw: ({ lin }) => `
<g ${B}><rect x="8" y="20" width="84" height="60" rx="5" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M14 38 H86 M14 46 H86 M14 54 H86 M14 62 H86 M14 70 H86" stroke="#9C8F74" stroke-width="1.2" opacity=".8"/>
<g fill="none" stroke="${C.navyD}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M28 32 C36 38 34 50 25 58 C18 65 24 74 31 70 C37 66 33 56 26 57 C21 58 20 66 24 68"/><path d="M28 28 V74"/></g>
<g ${Bs}><ellipse cx="53" cy="58" rx="5.5" ry="4" transform="rotate(-20 53 58)" fill="${C.navyD}"/><ellipse cx="73" cy="50" rx="5.5" ry="4" transform="rotate(-20 73 50)" fill="${C.navyD}"/>
<path d="M57.600 56.800 V38 H77.600 V48.800" fill="none" stroke="${C.navyD}" stroke-width="2.4"/></g>` },

{ u: "1f3b5", n: "musical note", draw: ({ lin }) => `
<g ${B}>${note(32, 80, lin([C.purple, C.purpleD], "d")).replace(/rx="13" ry="9.5"/, 'rx="19" ry="14"')}
<rect x="46" y="8" width="9" height="72" rx="3" fill="${lin([C.purple, C.purpleD], "h")}"/>
<path d="M53 8 C62 30 90 30 86 62 C82 46 68 44 53 40Z" fill="${lin([C.purple, C.purpleD], "d")}"/></g>` },

{ u: "1f3b6", n: "musical notes", draw: ({ lin }) => `
<g ${B}>${note(28, 76, lin([C.blue, C.blueD], "d"))}${note(70, 66, lin([C.blue, C.blueD], "d"))}
<rect x="35" y="22" width="7" height="54" rx="2.5" fill="${lin([C.blue, C.blueD], "h")}"/><rect x="77" y="12" width="7" height="54" rx="2.5" fill="${lin([C.blue, C.blueD], "h")}"/>
<polygon points="35,18 84,6 84,24 35,36" fill="${lin([C.blueM, C.navy], "d")}"/></g>` },

{ u: "1f399-fe0f", n: "studio microphone", draw: ({ lin }) => `
<g ${B}><path d="M22 42 V50 A28 28 0 0 0 78 50 V42" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="6" stroke-linecap="round"/>
<rect x="47" y="76" width="6" height="12" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/>
<rect x="26" y="86" width="48" height="8" rx="4" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><rect x="34" y="6" width="32" height="56" rx="16" fill="${lin([C.metalD, C.metalL, C.metal, C.metalD], "h")}"/></g>
<path d="M36 22 H64 M35 34 H65 M36 46 H64 M42 8 V60 M50 6 V62 M58 8 V60" stroke="${C.metalDD}" stroke-width="1.2" opacity=".45"/>
<g ${Bs}><rect x="33" y="30" width="34" height="6" rx="3" fill="${lin([C.red, C.redD])}"/></g>` },

{ u: "1f39a-fe0f", n: "level slider", draw: ({ lin }) => `
<g ${B}><rect x="24" y="6" width="52" height="88" rx="8" fill="${lin(["#7F8FC2", C.navy, C.navyD], "d")}"/></g>
<rect x="46" y="16" width="8" height="68" rx="4" fill="${C.darkD}"/>
<path d="M30 20 H40 M30 32 H40 M30 44 H40 M30 56 H40 M30 68 H40 M30 80 H40 M60 20 H70 M60 32 H70 M60 44 H70 M60 56 H70 M60 68 H70 M60 80 H70" stroke="${C.paper}" stroke-width="1.6" opacity=".7"/>
<g ${B}><rect x="31" y="50" width="38" height="20" rx="5" fill="${lin([C.pink, C.red, C.redD])}"/></g>
<rect x="34" y="59" width="32" height="2.6" rx="1.3" fill="${C.paper}"/>` },

{ u: "1f39b-fe0f", n: "control knobs", draw: ({ lin, rad }) => {
  const kn = (x, y, a) => `<g ${B}><circle cx="${x}" cy="${y}" r="15" fill="${rad([C.metalL, C.metal, C.metalD])}"/></g><path d="M${x} ${y} L${f(x + 11 * Math.sin(a))} ${f(y - 11 * Math.cos(a))}" stroke="${C.redM}" stroke-width="3.2" stroke-linecap="round"/>`;
  return `<g ${B}><rect x="6" y="8" width="88" height="84" rx="10" fill="${lin(["#7F8FC2", C.navy, C.navyD], "d")}"/></g>
<g fill="${C.paper}" opacity=".7"><circle cx="16" cy="18" r="1.6"/><circle cx="84" cy="18" r="1.6"/><circle cx="16" cy="82" r="1.6"/><circle cx="84" cy="82" r="1.6"/></g>
${kn(32, 32, -0.8)}${kn(68, 32, 0.9)}${kn(32, 68, 0.3)}${kn(68, 68, -0.4)}`; } },

{ u: "1f3a4", n: "microphone", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(-40 50 50)">
<path d="M40 42 H60 L56 91 a6 6 0 0 1 -12 0Z" fill="${lin([C.metalDD, C.metalD, C.metal, C.metalDD], "h")}"/>
<rect x="39" y="36" width="22" height="9" rx="3" fill="${lin([C.gold, C.goldD])}"/>
<circle cx="50" cy="22" r="20" fill="${rad([C.metalL, C.metal, C.metalD])}"/></g></g>
<g transform="rotate(-40 50 50)"><path d="${grille(50, 22, 18.5)}" stroke="${C.metalDD}" stroke-width="1.3" opacity=".5" fill="none"/><rect x="46" y="64" width="8" height="3" rx="1.5" fill="${C.red}"/></g>` },

{ u: "1f3a7", n: "headphone", draw: ({ lin }) => `
<g ${B}><path d="M17 62 V50 A33 33 0 0 1 83 50 V62" fill="none" stroke="${lin([C.navy, C.navyD], "d")}" stroke-width="8" stroke-linecap="round"/></g>
<g ${B}><rect x="8" y="50" width="24" height="42" rx="10" fill="${lin([C.red, C.redM, C.redD], "d")}"/><rect x="68" y="50" width="24" height="42" rx="10" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><rect x="22" y="56" width="11" height="30" rx="5.5" fill="${lin([C.pink, C.pinkD])}"/><rect x="67" y="56" width="11" height="30" rx="5.5" fill="${lin([C.pink, C.pinkD])}"/></g>` },

{ u: "1f4fb", n: "radio", draw: ({ lin, rad }) => `
<path d="M70 32 L88 8" stroke="${C.metalDD}" stroke-width="3" stroke-linecap="round"/><circle cx="88" cy="8" r="3" fill="${C.metalD}"/>
<g ${B}><rect x="6" y="30" width="88" height="60" rx="10" fill="${lin([C.orange, C.orangeD, "#B8601C"], "d")}"/></g>
<g ${B}><circle cx="33" cy="60" r="19" fill="${rad([C.creamD, C.woodL, C.wood])}"/></g>
<circle cx="33" cy="60" r="13" fill="none" stroke="${C.woodDD}" stroke-width="1.4" stroke-dasharray="2 2.6" opacity=".7"/><circle cx="33" cy="60" r="6" fill="none" stroke="${C.woodDD}" stroke-width="1.4" opacity=".6"/>
<g ${Bs}><rect x="58" y="40" width="28" height="12" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M62 52 V40 M70 52 V40" stroke="${C.woodDD}" stroke-width="1" opacity=".5"/><path d="M76 52 V40" stroke="${C.red}" stroke-width="1.8"/>
<g ${B}><circle cx="65" cy="71" r="6.5" fill="${rad([C.metalL, C.metal, C.metalD])}"/><circle cx="82" cy="71" r="6.5" fill="${rad([C.metalL, C.metal, C.metalD])}"/></g>` },

{ u: "1f3b7", n: "saxophone", draw: ({ lin }) => `<g transform="translate(-3 3)">
<g ${B}><path d="M38 20 V62 C38 88 74 88 74 62 V46" fill="none" stroke="${gold(lin, "d")}" stroke-width="13" stroke-linecap="butt"/></g>
<g ${B}><path d="M66.500 52 H81.500 L94 32 H54Z" fill="${goldH(lin)}"/><ellipse cx="74" cy="32" rx="20" ry="5" fill="${lin([C.goldD, "#7A4F10"])}"/></g>
<g ${B}><path d="M38 20 L22 10" stroke="${C.darkD}" stroke-width="7" stroke-linecap="round"/><rect x="33" y="13" width="10" height="7" fill="${lin([C.goldM, C.goldD])}"/></g>
<g ${Bs} fill="${lin([C.metalL, C.metalD])}"><circle cx="38" cy="36" r="4"/><circle cx="38" cy="50" r="4"/><circle cx="38" cy="64" r="4"/></g>
<path d="M33 30 V70" stroke="#fff" stroke-width="1.6" opacity=".35"/></g>` },

{ u: "1f3ba", n: "trumpet", draw: ({ lin }) => `<g transform="translate(0 9)">
<g ${B}><g transform="rotate(-30 50 50)">
<path d="M24 38 V64 a8 8 0 0 0 8 8 H62 a8 8 0 0 0 8 -8 V44" fill="none" stroke="${gold(lin, "d")}" stroke-width="6"/>
<path d="M10 38 H70" stroke="${C.goldM}" stroke-width="6"/>
<path d="M64 36 L93 15 V67 L64 46Z" fill="${goldH(lin)}"/>
<rect x="5" y="34" width="9" height="8" rx="2.5" fill="${lin([C.metalL, C.metalD])}"/>
<rect x="32" y="22" width="7" height="16" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/><rect x="44" y="22" width="7" height="16" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/><rect x="56" y="22" width="7" height="16" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/>
<ellipse cx="93" cy="41" rx="4.5" ry="26" fill="${lin([C.goldD, "#7A4F10"], "h")}"/></g></g></g>` },

{ u: "1fa97", n: "accordion", draw: ({ lin }) => {
  const a = lin([C.red, C.redD], "h"), b = lin([C.redD, C.red], "h");
  const strips = Array.from({ length: 7 }, (_, i) => `<rect x="${25 + i * 7.1}" y="${24 + (i % 2) * 0}" width="7.2" height="52" fill="${i % 2 ? b : a}"/>`).join("");
  return `<g ${B}>${strips}</g>
<g ${B}><rect x="5" y="16" width="22" height="68" rx="6" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/><rect x="73" y="16" width="22" height="68" rx="6" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${Bs}><rect x="10" y="24" width="12" height="52" rx="2" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M10 37 H22 M10 50 H22 M10 63 H22" stroke="${C.woodDD}" stroke-width="1.2" opacity=".6"/>
<g ${Bs} fill="${gold(lin, "d")}"><circle cx="80" cy="28" r="3.6"/><circle cx="89" cy="28" r="3.6"/><circle cx="80" cy="39" r="3.6"/><circle cx="89" cy="39" r="3.6"/><circle cx="80" cy="50" r="3.6"/><circle cx="89" cy="50" r="3.6"/><circle cx="80" cy="61" r="3.6"/><circle cx="89" cy="61" r="3.6"/><circle cx="84.500" cy="72" r="3.6"/></g>`; } },

{ u: "1f3b8", n: "guitar", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(40 50 50)">
<rect x="45" y="12" width="10" height="46" fill="${lin([C.woodDD, C.woodD, C.woodDD], "h")}"/>
<path d="M44 0 H56 L58 14 H42Z" fill="${lin([C.darkD, C.dark])}"/>
<path d="M50 44 C60 44 66 49 66 58 C66 64 61 66 61 71 C61 73 70 76 70 84 C70 93 62 97 50 97 C38 97 30 93 30 84 C30 76 39 73 39 71 C39 66 34 64 34 58 C34 49 40 44 50 44Z" fill="${rad([C.orange, C.orangeD, "#9A5420"])}"/></g></g>
<g transform="rotate(40 50 50)"><circle cx="50" cy="70" r="7.500" fill="${C.darkD}"/><circle cx="50" cy="70" r="9.500" fill="none" stroke="${C.woodDD}" stroke-width="1.5"/><rect x="42" y="84" width="16" height="3.500" rx="1.5" fill="${C.woodDD}"/>
<path d="M48 14 V84 M52 14 V84" stroke="${C.metalL}" stroke-width=".8" opacity=".7"/><path d="M45 24 H55 M45 33 H55 M45 42 H55" stroke="${C.metal}" stroke-width="1"/></g>` },

{ u: "1f3b9", n: "musical keyboard", draw: ({ lin }) => {
  const w = Array.from({ length: 7 }, (_, i) => `<rect x="${f(11 + i * 11.15)}" y="32" width="10.8" height="50" rx="2" fill="${lin([C.paper, C.paper, C.paperD])}"/>`).join("");
  const bl = [0, 1, 3, 4, 5].map((i) => `<rect x="${f(11 + (i + 1) * 11.15 - 3.8)}" y="32" width="7.6" height="30" rx="2" fill="${lin(["#6E7FB4", C.navyD])}"/>`).join("");
  return `<g ${B}><rect x="5" y="18" width="90" height="68" rx="7" fill="${lin([C.blueM, C.navy, C.navyD], "d")}"/></g>
<rect x="11" y="24" width="30" height="5" rx="2" fill="${C.paper}" opacity=".35"/><circle cx="78" cy="26.500" r="2.500" fill="${C.gold}"/><circle cx="86" cy="26.500" r="2.500" fill="${C.red}"/>
<g ${Bs}>${w}</g><g ${Bs}>${bl}</g>`; } },

{ u: "1f3bb", n: "violin", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(28 50 50)">
<rect x="46" y="14" width="8" height="40" fill="${lin([C.darkD, C.dark])}"/>
<circle cx="50" cy="11" r="6.5" fill="${rad([C.wood, C.woodD, C.woodDD])}"/>
<path d="M50 40 C60 40 66 44 66 52 C66 58 60 59 60 62 C60 65 70 66 70 76 C70 88 60 94 50 94 C40 94 30 88 30 76 C30 66 40 65 40 62 C40 59 34 58 34 52 C34 44 40 40 50 40Z" fill="${rad([C.orange, C.orangeD, "#8A4820"])}"/></g></g>
<g transform="rotate(28 50 50)" fill="none" stroke="${C.darkD}" stroke-linecap="round"><path d="M43 52 q-2 6 0 11 M57 52 q2 6 0 11" stroke-width="2.200"/><path d="M48 24 V82 M52 24 V82" stroke="${C.metalL}" stroke-width=".8" opacity=".8"/><rect x="42" y="82" width="16" height="3" rx="1.500" fill="${C.darkD}" stroke="none"/></g>
<g ${Bs}><path d="M12 84 L90 14" stroke="${C.woodD}" stroke-width="3.400" stroke-linecap="round"/></g>` },

{ u: "1fa95", n: "banjo", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(40 50 50)">
<rect x="45" y="0" width="10" height="56" fill="${lin([C.woodDD, C.woodD, C.woodDD], "h")}"/>
<path d="M43 -2 H57 L58 12 H42Z" fill="${lin([C.darkD, C.dark])}"/>
<circle cx="50" cy="72" r="25" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g></g>
<g ${B}><g transform="rotate(40 50 50)"><circle cx="50" cy="72" r="20" fill="${rad([C.paper, C.paperD, "#C9B98F"])}"/></g></g>
<g transform="rotate(40 50 50)"><path d="M48 10 V80 M52 10 V80" stroke="${C.metalDD}" stroke-width=".9" opacity=".7"/><rect x="40" y="76" width="20" height="3.500" rx="1.500" fill="${C.woodDD}"/><rect x="38" y="90" width="24" height="3" rx="1.500" fill="${C.woodDD}" opacity=".0"/>
<circle cx="50" cy="72" r="23" fill="none" stroke="${C.metalDD}" stroke-width="1.300" stroke-dasharray="1.800 3.400" opacity=".6"/><path d="M47 22 H53 M47 32 H53 M47 42 H53" stroke="${C.metal}" stroke-width="1.200"/></g>` },

{ u: "1f941", n: "drum", draw: ({ lin }) => `<g transform="translate(0 5)">
<g ${B}><path d="M14 52 V76 C14 90 86 90 86 76 V52Z" fill="${lin([C.redD, C.red, C.redM, C.redD], "h")}"/></g>
<path d="M14 54 L26 80 L38 56 L50 83 L62 56 L74 80 L86 54" fill="none" stroke="${C.paperD}" stroke-width="2.200" stroke-linejoin="round" opacity=".85"/>
<g ${B}><ellipse cx="50" cy="52" rx="36" ry="13" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<ellipse cx="50" cy="52" rx="30" ry="9.500" fill="${lin([C.paper, C.paperD], "d")}"/>
<g ${B}><path d="M22 6 L50 40 M78 6 L50 40" stroke="${C.woodL}" stroke-width="5.500" stroke-linecap="round"/><circle cx="21" cy="6.500" r="4.500" fill="${C.wood}"/><circle cx="79" cy="6.500" r="4.500" fill="${C.wood}"/></g></g>` },

{ u: "1fa98", n: "long drum", draw: ({ lin }) => `<g transform="translate(2 -5)">
<g ${B}><g transform="rotate(-14 50 50)">
<path d="M25 24 C18 54 26 78 32 94 H68 C74 78 82 54 75 24Z" fill="${lin([C.woodD, C.wood, C.woodL, C.wood, C.woodDD], "h")}"/>
<path d="M22 54 H78 V64 H22Z" fill="none"/></g></g>
<g transform="rotate(-14 50 50)"><path d="M21 48 Q50 56 79 48 V56 Q50 64 21 56Z" fill="${C.redM}" opacity=".9"/><path d="M30 64 V92 M50 66 V94 M70 64 V92" stroke="${C.woodDD}" stroke-width="1.200" opacity=".5"/></g>
<g ${B}><g transform="rotate(-14 50 50)"><ellipse cx="50" cy="24" rx="27" ry="9" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g></g>
<g ${B}><g transform="rotate(-14 50 50)"><ellipse cx="50" cy="24" rx="22" ry="6.500" fill="${lin([C.paper, C.paperD], "d")}"/></g></g></g>` },

{ u: "1fa87", n: "maracas", draw: ({ lin }) => `${mara(lin, -34, [C.red, C.redM, C.redD], C.paper)}${mara(lin, 34, [C.blue, C.blueM, C.blueD], C.paper)}` },
];
