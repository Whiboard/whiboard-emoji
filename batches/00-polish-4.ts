// Polish pass 4: redraws that replace weak icons (files named 00-* win in the build).
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const stone = (lin) => lin([C.paper, "#D3C39B"]);
const glass = (lin) => lin([C.sky, C.skyD]);
const base = (lin) => `<g ${B}><rect x="6" y="87" width="88" height="6" rx="2.5" fill="${lin(["#C4BEAE", "#8E887A"])}"/></g>`;
const wheel = (cx, cy, r, tw = 6) =>
  `<g ${B}><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.darkD}" stroke-width="${tw}"/></g><circle cx="${cx}" cy="${cy}" r="${r - tw / 2 - 1}" fill="none" stroke="${C.metal}" stroke-width="1.6" opacity=".8"/>`;
const hub = (lin, cx, cy, r) => `<g ${Bs}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${lin([C.metalL, C.metalD])}"/></g>`;

const __batch: Icon[] = [
  // ───────── derelict house
  { u: "1f3da-fe0f", n: "derelict house", draw: ({ lin }) => `<g transform="translate(0 -4)">
${base(lin)}
<g ${B}><rect x="12" y="50" width="76" height="38" fill="${lin(["#CDBFA8", "#A99A84", "#80736A"], "d")}"/></g>
<g ${B}><path d="M4 56 L40 18 L50 26 L58 20 L96 56Z" fill="${lin(["#8E8A9E", "#625E70", "#474356"], "d")}"/></g>
<path d="M54 40 L60 28 L68 33 L74 27 L80 44 L66 50Z" fill="#2B2328"/>
<path d="M56 42 L74 30 M62 48 L78 38" stroke="${C.woodL}" stroke-width="3" stroke-linecap="round"/>
<path d="M14 50 H20 M26 40 L32 33 M44 46 H50" stroke="#2B2328" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>
<rect x="20" y="60" width="18" height="16" fill="#2B2328"/><rect x="62" y="60" width="18" height="16" fill="#2B2328"/>
<g ${Bs}><path d="M17 62 L41 74 M17 74 L41 63" stroke="${C.wood}" stroke-width="3.6" stroke-linecap="round"/><path d="M60 69 L82 62" stroke="${C.wood}" stroke-width="3.6" stroke-linecap="round"/></g>
<g ${Bs}><path d="M41 88 V68 H59 V88Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<path d="M41 74 L59 79 M41 83 L59 77" stroke="${C.woodL}" stroke-width="3" stroke-linecap="round"/>
<g ${Bs}><path d="M8 88 C10 80 14 82 14 74 M18 88 C18 82 22 82 22 78 M80 88 C80 82 85 80 85 74 M90 88 C88 82 93 82 93 77" fill="none" stroke="${C.greenM}" stroke-width="2.6" stroke-linecap="round"/></g></g>` },

  // ───────── convenience store
  { u: "1f3ea", n: "convenience store", draw: ({ lin }) => `
${base(lin)}
<g ${B}><rect x="10" y="30" width="80" height="58" fill="${stone(lin)}"/></g>
<g ${B}><rect x="6" y="10" width="88" height="20" rx="4" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<path d="M26 17 h9 v6 h-9 v6 h9 M42 17 v6 h8 M50 17 v12 M66 14 H86 M66 25 H80" fill="none" stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<g ${B}><path d="M4 32 H96 L91 50 H9Z" fill="${C.paper}"/></g>
<path d="M4 32 H20 L22 50 H9Z M36 32 H52 L52 50 H37Z M68 32 H84 L83 50 H67Z" fill="${lin([C.red, C.redD])}"/>
<g ${Bs}><rect x="15" y="55" width="44" height="28" rx="3" fill="${glass(lin)}"/><rect x="65" y="55" width="21" height="33" rx="3" fill="${glass(lin)}"/></g>
<g fill="${C.orange}"><rect x="21" y="68" width="9" height="15" rx="2"/><rect x="34" y="63" width="9" height="20" rx="2" fill="${C.blueM}"/><rect x="47" y="72" width="8" height="11" rx="2" fill="${C.yellowM}"/></g>` },

  // ───────── building construction
  { u: "1f3d7-fe0f", n: "building construction", draw: ({ lin }) => {
    const g = lin(["#C9C4B8", "#8C877C"]), y = lin([C.yellow, C.yellowM, C.yellowD]);
    return `<g ${B}><rect x="5" y="85" width="90" height="8" rx="3" fill="${lin(["#C4BEAE", "#8E887A"])}"/></g>
<g ${B}><rect x="8" y="46" width="50" height="7" fill="${g}"/><rect x="8" y="62" width="50" height="7" fill="${g}"/><rect x="8" y="78" width="50" height="7" fill="${g}"/><rect x="9" y="46" width="6" height="39" fill="${g}"/><rect x="31" y="46" width="6" height="39" fill="${g}"/><rect x="52" y="46" width="6" height="39" fill="${g}"/></g>
<g ${B}><rect x="66" y="22" width="5" height="63" fill="${y}"/><rect x="82" y="22" width="5" height="63" fill="${y}"/><path d="M68 84 L85 66 L68 48 L85 30 M85 84 L68 66 L85 48 L68 30" fill="none" stroke="${C.yellowD}" stroke-width="3.4" stroke-linejoin="round"/></g>
<g ${B}><rect x="6" y="12" width="90" height="9" rx="2" fill="${y}"/><polygon points="68,2 85,2 90,12 64,12" fill="${y}"/><rect x="84" y="20" width="12" height="10" rx="2" fill="${lin([C.dark, C.darkD])}"/></g>
<path d="M22 21 V40" stroke="${C.darkD}" stroke-width="2"/>
<g ${B}><rect x="12" y="40" width="20" height="6" rx="2" fill="${lin([C.red, C.redD])}"/></g><path d="M16 40 L22 34 L28 40" fill="none" stroke="${C.darkD}" stroke-width="2" stroke-linejoin="round"/>`;
  } },

  // ───────── locomotive
  { u: "1f682", n: "locomotive", draw: ({ lin, rad }) => {
    const wh = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.dark}"/><circle cx="${x}" cy="${y}" r="${r * 0.42}" fill="${lin([C.metalL, C.metalD])}"/>`;
    const sm = () => rad(["#D3D0DA", "#9C98A8", "#6E6A7C"]);
    return `<g transform="translate(0 5)">
<g ${B}><circle cx="13" cy="15" r="6" fill="${sm()}"/><circle cx="23" cy="8" r="7" fill="${sm()}"/><circle cx="35" cy="10" r="5" fill="${sm()}"/></g>
<g ${B}><path d="M13 24 H25 L23 41 H15Z" fill="${lin([C.darkD, C.dark, C.darkD], "h")}"/><rect x="7" y="40" width="54" height="26" rx="6" fill="${lin([C.blueM, C.blue, C.blueD, C.navyD])}"/><rect x="62" y="22" width="30" height="48" rx="3" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><rect x="58" y="17" width="38" height="7" rx="2.5" fill="${lin([C.darkD, C.dark])}"/><path d="M33 40 C33 30 45 30 45 40Z" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/><path d="M6 66 H16 L8 80 H3Z" fill="${lin([C.metal, C.metalDD])}"/></g>
<rect x="68" y="30" width="18" height="16" rx="2" fill="${glass(lin)}"/>
<path d="M8 52 H61" stroke="${C.goldM}" stroke-width="2.4" opacity=".9"/><circle cx="8" cy="52" r="2" fill="#FFF6D0"/>
<g ${Bs}><rect x="8" y="66" width="86" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>${wh(32, 78, 8)}${wh(50, 76, 10)}${wh(76, 74, 12)}<path d="M50 76 H76" stroke="${C.metalL}" stroke-width="2"/></g></g>`;
  } },

  // ───────── kaaba
  { u: "1f54b", n: "kaaba", draw: ({ lin }) => `
<g ${B}><polygon points="6,25 50,41 50,91 6,75" fill="${lin(["#7D717B", "#5E535C", C.darkD])}"/></g>
<g ${B}><polygon points="50,41 94,25 94,75 50,91" fill="${lin(["#4F464D", "#3A3237"], "d")}"/></g>
<g ${B}><polygon points="6,25 50,9 94,25 50,41" fill="${lin(["#968A94", "#6F646D"], "d")}"/></g>
<g ${Bs}><polygon points="6,36 50,52 50,61 6,45" fill="${lin([C.gold, C.goldM, C.goldD])}"/><polygon points="50,52 94,36 94,45 50,61" fill="${lin([C.goldM, C.goldD])}"/></g>
<g ${Bs}><polygon points="60,67 75,61 75,78 60,84" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M12 50 L44 62 M56 70 V82" stroke="#fff" stroke-width="1.4" opacity=".12"/>` },

  // ───────── tram car
  { u: "1f68b", n: "tram car", draw: ({ lin }) => `
<g ${Bs}><rect x="3" y="4" width="94" height="3.4" rx="1.7" fill="${C.metalDD}"/></g>
<g ${B}><path d="M46 24 L66 8 L70 11 L52 26Z" fill="${lin([C.metalL, C.metalDD], "d")}"/><rect x="38" y="21" width="22" height="5" rx="2" fill="${lin([C.darkD, C.dark])}"/></g>
<circle cx="68" cy="9" r="3" fill="${C.gold}"/>
<g ${B}><rect x="6" y="26" width="88" height="46" rx="8" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${Bs}><rect x="13" y="33" width="12" height="15" rx="2" fill="${glass(lin)}"/><rect x="28" y="33" width="12" height="15" rx="2" fill="${glass(lin)}"/><rect x="43" y="33" width="12" height="15" rx="2" fill="${glass(lin)}"/><rect x="58" y="33" width="12" height="15" rx="2" fill="${glass(lin)}"/><rect x="73" y="33" width="14" height="15" rx="2" fill="${glass(lin)}"/></g>
<rect x="8" y="54" width="84" height="4.4" fill="${C.paper}" opacity=".9"/>
<g ${Bs}><rect x="8" y="64" width="84" height="9" rx="3" fill="${lin([C.darkD, C.dark])}"/><circle cx="10" cy="61" r="2.6" fill="${C.gold}"/></g>
<g ${Bs}><rect x="4" y="86" width="92" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g>
<circle cx="25" cy="79" r="7.5" fill="${C.dark}"/><circle cx="40" cy="79" r="7.5" fill="${C.dark}"/><circle cx="60" cy="79" r="7.5" fill="${C.dark}"/><circle cx="75" cy="79" r="7.5" fill="${C.dark}"/>
<circle cx="25" cy="79" r="3" fill="${C.metal}"/><circle cx="40" cy="79" r="3" fill="${C.metal}"/><circle cx="60" cy="79" r="3" fill="${C.metal}"/><circle cx="75" cy="79" r="3" fill="${C.metal}"/>` },

  // ───────── motorcycle
  { u: "1f3cd-fe0f", n: "motorcycle", draw: ({ lin, rad }) => `
${wheel(23, 64, 15)}${wheel(78, 64, 15)}
<path d="M23 64 H50 M50 62 L72 34" stroke="${C.metalD}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
<g ${B}><g transform="rotate(-6 30 70)"><rect x="5" y="66" width="42" height="8" rx="4" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g></g>
<g ${B}><rect x="34" y="50" width="28" height="22" rx="6" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<path d="M40 50 V44 M46 50 V44 M52 50 V44" stroke="${C.metalD}" stroke-width="3" stroke-linecap="round"/>
<path d="M39 58 H57 M39 64 H57" stroke="${C.metalDD}" stroke-width="1.6" opacity=".5"/>
<g ${B}><path d="M30 50 V42 C30 32 52 28 62 36 C66 40 66 46 66 50Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><rect x="8" y="40" width="26" height="9" rx="4.5" fill="${lin([C.dark, C.darkD])}"/></g>
<ellipse cx="42" cy="38" rx="7" ry="3" transform="rotate(-12 42 38)" fill="#fff" opacity=".3"/>
<g ${Bs}><path d="M72 34 L79 61" stroke="${C.metal}" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M63 28 H74" stroke="${C.darkD}" stroke-width="4" stroke-linecap="round"/></g>
<g ${Bs}><circle cx="78" cy="40" r="6.5" fill="${rad([C.yellow, C.goldM, C.goldD])}"/></g>
${hub(lin, 23, 64, 4)}${hub(lin, 78, 64, 4)}` },

  // ───────── motorized wheelchair
  { u: "1f9bc", n: "motorized wheelchair", draw: ({ lin }) => `
<g ${B}><rect x="22" y="62" width="52" height="11" rx="5" fill="${lin(["#8B93A6", C.metalDD])}"/></g>
<path d="M30 58 L18 72" stroke="${C.metalD}" stroke-width="4.4" stroke-linecap="round"/>
<g ${B}><rect x="5" y="72" width="22" height="6" rx="3" fill="${lin([C.dark, C.darkD])}"/></g>
${wheel(66, 72, 18, 7)}${hub(lin, 66, 72, 6)}
<g ${B}><circle cx="30" cy="85" r="7" fill="${C.darkD}"/></g>${hub(lin, 30, 85, 3)}
<g ${B}><g transform="rotate(-6 68 56)"><rect x="60" y="16" width="14" height="44" rx="7" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g></g>
<g ${B}><rect x="30" y="48" width="38" height="13" rx="6" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<g ${B}><rect x="32" y="38" width="30" height="6" rx="3" fill="${lin([C.dark, C.darkD])}"/></g>
<g ${B}><rect x="36" y="26" width="4.4" height="14" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/></g>
<g ${Bs}><circle cx="38.2" cy="23" r="5" fill="${lin([C.red, C.redD], "d")}"/></g>` },

  // ───────── canoe
  { u: "1f6f6", n: "canoe", draw: ({ lin }) => `
<g ${B}><ellipse cx="50" cy="82" rx="44" ry="6.5" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<g ${B}><path d="M5 46 C30 58 70 58 95 46 C90 70 68 80 50 80 C32 80 10 70 5 46Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}><path d="M5 46 C30 34 70 34 95 46 C70 58 30 58 5 46Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<path d="M50 38 V52" stroke="${C.wood}" stroke-width="3.6" stroke-linecap="round"/>
<path d="M12 56 C34 66 66 66 88 56" fill="none" stroke="${C.red}" stroke-width="2.4" opacity=".8"/>
<g ${B}><g transform="rotate(-38 50 48)"><rect x="14" y="45.6" width="62" height="4.8" rx="2.4" fill="${lin([C.woodL, C.wood])}"/><path d="M70 41 H86 a7 7 0 0 1 0 14 H70Z" fill="${lin([C.teal, C.tealM, C.tealD])}"/><rect x="10" y="43" width="7" height="10" rx="3.5" fill="${lin([C.woodL, C.wood])}"/></g></g>` },

  // ───────── mantelpiece clock
  { u: "1f570-fe0f", n: "mantelpiece clock", draw: ({ lin, rad }) => {
    const ticks = Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6, r1 = i % 3 ? 22 : 20, r2 = 25;
      return `M${(50 + r1 * Math.sin(a)).toFixed(1)} ${(47 - r1 * Math.cos(a)).toFixed(1)} L${(50 + r2 * Math.sin(a)).toFixed(1)} ${(47 - r2 * Math.cos(a)).toFixed(1)}`;
    }).join(" ");
    return `
<g ${B}><rect x="10" y="87" width="16" height="6" rx="2" fill="${lin([C.woodD, C.woodDD])}"/><rect x="74" y="87" width="16" height="6" rx="2" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g ${B}><path d="M8 88 V50 C8 26 26 10 50 10 C74 10 92 26 92 50 V88Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${Bs}><circle cx="50" cy="6.5" r="3.6" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${B}><circle cx="50" cy="47" r="30" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="47" r="26.5" fill="${rad([C.paper, C.paperD], 0.4, 0.35, 0.8)}"/>
<path d="${ticks}" stroke="${C.darkD}" stroke-width="2" stroke-linecap="round" fill="none"/>
<path d="M50 47 L40 38 M50 47 L66 40" stroke="${C.darkD}" stroke-width="3.2" stroke-linecap="round"/><circle cx="50" cy="47" r="3" fill="${C.red}"/>
<g ${Bs}><rect x="35" y="78" width="30" height="9" rx="4" fill="${lin([C.woodDD, C.darkD])}"/><circle cx="50" cy="82.5" r="3.6" fill="${lin([C.gold, C.goldD])}"/></g>`;
  } },

  // ───────── wind face
  { u: "1f32c-fe0f", n: "wind face", draw: ({ lin, rad }) => {
    const cl = (a, b) => rad(["#F6F8FB", "#CFDAE8", "#9DB0CB"], a, b, 0.85);
    return `
<g ${B}><circle cx="17" cy="32" r="14" fill="${cl(0.4, 0.3)}"/><circle cx="19" cy="68" r="13" fill="${cl(0.4, 0.3)}"/><circle cx="42" cy="15" r="12" fill="${cl(0.4, 0.3)}"/><circle cx="42" cy="85" r="12" fill="${cl(0.4, 0.3)}"/></g>
<g ${B}><circle cx="40" cy="50" r="31" fill="${rad(["#FBFCFE", "#D5E0EE", "#A3B5CF"], 0.36, 0.3, 0.85)}"/></g>
<path d="M21 44 C24 39 30 39 33 44 M41 42 C44 37 50 37 53 42" fill="none" stroke="${C.navyD}" stroke-width="3" stroke-linecap="round"/>
<circle cx="25" cy="56" r="5" fill="${C.pinkD}" opacity=".5"/><circle cx="50" cy="58" r="4" fill="${C.pinkD}" opacity=".35"/>
<ellipse cx="56" cy="53" rx="4.4" ry="3.4" fill="${C.redM}"/><ellipse cx="55" cy="52" rx="1.6" ry="1.1" fill="#fff" opacity=".5"/>
<g ${Bs}><path d="M63 47 H80 C93 47 93 31 82 33 C77 34 77 41 82 40" fill="none" stroke="${C.blueM}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M63 55 H84 C96 55 95 70 85 68 C80 67 81 62 85 62.6" fill="none" stroke="${C.blueM}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M60 63 H72 C80 63 79 76 71 74" fill="none" stroke="${C.blue}" stroke-width="4" stroke-linecap="round"/></g>`;
  } },

  // ───────── water wave
  { u: "1f30a", n: "water wave", draw: ({ lin }) => `
<g ${B}><path d="M4 90 C4 56 22 14 54 12 C80 11 94 28 92 46 C90 36 78 32 70 38 C58 46 62 62 76 66 C84 68 90 66 94 62 V90Z" fill="${lin([C.blue, C.blueM, C.blueD, C.navy], "d")}"/></g>
<path d="M60 40 C66 34 76 34 86 40 C78 40 70 44 66 50 C62 56 66 62 74 64 C62 62 54 50 60 40Z" fill="${C.navy}" opacity=".35"/>
<path d="M30 26 C40 16 62 12 78 20 C88 25 92 34 92 44" fill="none" stroke="${C.paper}" stroke-width="4.4" stroke-linecap="round"/>
<g ${Bs}><circle cx="89" cy="49" r="3.4" fill="${C.paper}"/><circle cx="93" cy="33" r="2.4" fill="${C.paper}"/><circle cx="82" cy="20" r="3" fill="${C.paper}"/><circle cx="60" cy="14" r="2.6" fill="${C.paper}"/></g>
<g ${B}><path d="M4 90 V76 C20 66 36 82 52 74 C68 66 82 76 94 71 V90Z" fill="${lin([C.sky, C.blue, C.blueM])}"/></g>
<path d="M12 80 C22 76 30 82 40 80 M58 78 C68 74 76 80 88 77" fill="none" stroke="${C.paper}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>` },

  // ───────── fog
  { u: "1f32b-fe0f", n: "fog", draw: ({ lin }) => `
<g ${B}><path d="M24 54 C8 54 6 32 24 31 C24 12 52 8 60 24 C74 14 94 26 86 40 C99 42 97 56 82 54Z" fill="${lin(["#D6DEEB", "#A3B0C6", "#74839F"], "d")}"/></g>
<g ${B}><rect x="8" y="62" width="70" height="8" rx="4" fill="${lin(["#C3CCDC", "#8794AE"])}"/><rect x="22" y="73.5" width="72" height="8" rx="4" fill="${lin(["#C3CCDC", "#8794AE"])}"/><rect x="8" y="85" width="56" height="7" rx="3.5" fill="${lin(["#C3CCDC", "#8794AE"])}"/></g>` },
];

export default __batch;
