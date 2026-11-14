// Objects 1: eyewear, clothing, bags, shoes, hair pick, crown.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const P = (s) => s; // marker for readability

// shirt silhouette shared by t shirt and blouse
const SHIRT = "M34 12 Q50 26 66 12 L92 28 L82 48 L72 42 V88 H28 V42 L18 48 L8 28Z";

// sock shape (leg down, foot to the right)
const sock = (lin, dx, dy, c, cuff, hl) => `<g transform="translate(${dx} ${dy})">
<g ${B}><path d="M26 10 H52 V50 C52 58 58 60 66 63 C80 67 86 72 86 80 C86 88 80 90 74 90 H36 C28 90 26 84 26 76Z" fill="${lin(c, "d")}"/></g>
<g ${Bs}><rect x="26" y="10" width="26" height="13" rx="3" fill="${lin(cuff)}"/></g>
<path d="M26 33 H52 M26 41 H52" stroke="${cuff[1]}" stroke-width="3" opacity=".7"/>
<path d="M60 74 C68 72 76 76 78 82" fill="none" stroke="${hl}" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;

const slipper = (lin, rot, tx) => `<g ${B}><g transform="translate(${tx} 4) rotate(${rot} 50 50)">
<path d="M50 8 C66 8 72 24 70 44 C69 58 74 70 66 80 C58 90 42 90 34 80 C26 70 31 58 30 44 C28 24 34 8 50 8Z" fill="${lin(["#FBD3DD", C.pink, C.pinkD], "d")}"/></g></g>
<g transform="translate(${tx} 4) rotate(${rot} 50 50)"><ellipse cx="50" cy="74" rx="12" ry="7" fill="${C.pinkD}"/><ellipse cx="50" cy="73" rx="9" ry="4.6" fill="#B5607A" opacity=".55"/>
<path d="M50 20 V46 M42 26 Q50 32 58 26" fill="none" stroke="#fff" stroke-width="1.4" opacity=".6"/></g>`;

const LIST = [
  { u: "1f453", n: "glasses", draw: ({ lin }) => `
<g ${Bs}><path d="M14 46 L6 34 M86 46 L94 34" stroke="${C.navyD}" stroke-width="5" stroke-linecap="round" fill="none"/></g>
<g ${B}><circle cx="30" cy="56" r="19" fill="${lin([[0, "#fff", 0.7], [1, C.skyD, 0.5]], "d")}"/><circle cx="70" cy="56" r="19" fill="${lin([[0, "#fff", 0.7], [1, C.skyD, 0.5]], "d")}"/></g>
<g ${B}><circle cx="30" cy="56" r="17.5" fill="none" stroke="${lin([C.blueM, C.navyD], "d")}" stroke-width="5"/><circle cx="70" cy="56" r="17.5" fill="none" stroke="${lin([C.blueM, C.navyD], "d")}" stroke-width="5"/>
<path d="M45 50 Q50 43 55 50" fill="none" stroke="${C.navy}" stroke-width="5" stroke-linecap="round"/></g>
<path d="M20 50 Q24 44 30 43 M60 50 Q64 44 70 43" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>` },

  { u: "1f576-fe0f", n: "sunglasses", draw: ({ lin }) => `
<g ${Bs}><path d="M12 46 L7 33 M88 46 L93 33" stroke="${C.dark}" stroke-width="5" stroke-linecap="round" fill="none"/></g>
<g ${B}><path d="M10 40 H90 V46 H10Z" fill="${C.dark}"/>
<path d="M10 44 H46 V58 C46 72 36 80 27 80 C16 80 10 70 10 58Z" fill="${lin(["#7E8CB8", C.navy, C.navyD], "d")}"/>
<path d="M54 44 H90 V58 C90 70 84 80 73 80 C64 80 54 72 54 58Z" fill="${lin(["#7E8CB8", C.navy, C.navyD], "d")}"/>
<path d="M46 46 Q50 41 54 46" fill="none" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/></g>
<path d="M17 52 L28 50 M17 59 L22 58 M61 52 L72 50 M61 59 L66 58" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>` },

  { u: "1f97d", n: "goggles", draw: ({ lin }) => `
<g ${B}><rect x="4" y="38" width="92" height="26" rx="10" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<path d="M8 51 H18 M82 51 H92" stroke="${C.navyD}" stroke-width="1.4" stroke-dasharray="2 2" opacity=".6"/>
<g ${B}><rect x="14" y="26" width="35" height="44" rx="14" fill="${lin([C.orange, C.orangeD], "d")}"/><rect x="51" y="26" width="35" height="44" rx="14" fill="${lin([C.orange, C.orangeD], "d")}"/>
<rect x="46" y="42" width="8" height="10" rx="3" fill="${C.orangeD}"/></g>
<rect x="19.5" y="31.5" width="24" height="33" rx="9.5" fill="${lin([[0, "#fff", 0.75], [1, C.skyD, 0.85]], "d")}"/>
<rect x="56.5" y="31.5" width="24" height="33" rx="9.5" fill="${lin([[0, "#fff", 0.75], [1, C.skyD, 0.85]], "d")}"/>
<path d="M24 40 Q25 36 30 35 M61 40 Q62 36 67 35" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>` },

  { u: "1f97c", n: "lab coat", draw: ({ lin }) => `
<polygon points="38,10 62,10 50,42" fill="${lin([C.blue, C.blueD])}"/>
<g ${B}><path d="M38 10 L50 34 L62 10 L82 18 L94 62 L80 68 L74 44 V92 H26 V44 L20 68 L6 62 L18 18Z" fill="${lin(["#FFFBF0", C.paper, "#D8C9A0"], "d")}"/></g>
<g ${Bs}><path d="M38 10 L50 34 L44 52 L28 30Z M62 10 L50 34 L56 52 L72 30Z" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M50 52 V90" stroke="#B8A780" stroke-width="1.5"/>
<g fill="none" stroke="#B8A780" stroke-width="1.6"><path d="M30 66 H42 V78 H30Z M58 66 H70 V78 H58Z"/></g>
<circle cx="50" cy="60" r="2.2" fill="${C.metalD}"/><circle cx="50" cy="74" r="2.2" fill="${C.metalD}"/>
<rect x="31" y="56" width="2" height="6" fill="${C.redM}"/>` },

  { u: "1f9ba", n: "safety vest", draw: ({ lin, clip }) => `
<g ${B}><path d="M28 10 H40 L50 34 L60 10 H72 L74 38 Q70 50 76 62 L78 92 H22 L24 62 Q30 50 26 38Z" fill="${lin(["#F9B96C", C.orange, C.orangeD], "d")}"/></g>
<g ${clip('<path d="M28 10 H40 L50 34 L60 10 H72 L74 38 Q70 50 76 62 L78 92 H22 L24 62 Q30 50 26 38Z"/>')}>
<g fill="${lin([C.yellow, C.metalL, C.yellow])}"><rect x="30" y="10" width="7" height="82" transform="rotate(-6 33 40)"/><rect x="63" y="10" width="7" height="82" transform="rotate(6 66 40)"/><rect x="20" y="66" width="60" height="8"/></g>
<path d="M44 40 V92" stroke="${C.orangeD}" stroke-width="1.4"/><path d="M56 40 V92" stroke="${C.orangeD}" stroke-width="1.4" opacity="0"/></g>
<path d="M50 36 V92" stroke="#B35F1B" stroke-width="1.6" opacity=".7"/>` },

  { u: "1f454", n: "necktie", draw: ({ lin, clip }) => `
<g ${B}><path d="M37 26 H63 L72 80 L50 95 L28 80Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${clip('<path d="M37 26 H63 L72 80 L50 95 L28 80Z"/>')}><g stroke="${C.gold}" stroke-width="4" opacity=".85"><path d="M20 40 L80 62 M20 56 L80 78 M20 72 L80 94"/></g></g>
<g ${B}><path d="M39 6 H61 L65 26 H35Z" fill="${lin([C.red, C.redD], "d")}"/></g>
<path d="M44 9 L42 24 M56 9 L58 24" stroke="${C.redD}" stroke-width="1.6" opacity=".6"/>` },

  { u: "1f455", n: "t shirt", draw: ({ lin }) => `
<g ${B}><path d="${SHIRT}" fill="${lin(["#A5BFF0", C.blueM, C.blueD], "d")}"/></g>
<path d="M34 12 Q50 28 66 12" fill="none" stroke="${C.navyD}" stroke-width="5" stroke-linecap="round" opacity=".8"/>
<path d="M18 48 L28 42 M82 48 L72 42" stroke="${C.navyD}" stroke-width="1.6" opacity=".5"/>
<path d="M32 54 V84" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".18"/>` },

  { u: "1f456", n: "jeans", draw: ({ lin }) => `
<g ${B}><path d="M26 6 H74 L82 94 H55 L50 44 L45 94 H18Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${Bs}><rect x="26" y="6" width="48" height="10" fill="${lin([C.blueM, C.blueD])}"/></g>
<g fill="none" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="3 2"><path d="M27 20 H49 M51 20 H73 M50 20 V44 M28 24 Q38 34 44 24"/><path d="M72 24 Q62 34 56 24"/></g>
<circle cx="29" cy="22" r="2" fill="${C.goldM}"/><circle cx="71" cy="22" r="2" fill="${C.goldM}"/>
<circle cx="50" cy="11" r="2.6" fill="${C.goldM}"/>
<path d="M22 86 H42 M58 86 H78" stroke="${C.navyD}" stroke-width="1.4" opacity=".4"/>` },

  { u: "1f9e3", n: "scarf", draw: ({ lin, clip }) => {
    const t1 = "M48 38 L72 38 L78 88 L52 90Z";
    const t2 = "M24 40 L46 42 L46 76 L28 76Z";
    const stripes = (x) => `<path d="M${x} 56 H${x + 34} M${x} 70 H${x + 34}" stroke="${C.paper}" stroke-width="4" opacity=".9"/>`;
    return `
<g ${B}><path d="${t1}" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${clip(`<path d="${t1}"/>`)}>${stripes(40)}<path d="M40 80 H90" stroke="${C.paper}" stroke-width="4" opacity=".9"/></g>
<path d="M54 90 V97 M60 90 V97 M66 90 V96 M72 89 V96 M77 88 V95" stroke="${C.redD}" stroke-width="2" stroke-linecap="round"/>
<g ${B}><path d="${t2}" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${clip(`<path d="${t2}"/>`)}><path d="M20 62 H50 M20 70 H50" stroke="${C.paper}" stroke-width="4" opacity=".9"/></g>
<g ${B}><path d="M17 30 Q50 56 83 30" fill="none" stroke="${lin([C.red, C.redM, C.redD])}" stroke-width="20" stroke-linecap="round"/></g>
<path d="M22 28 Q50 46 78 28" fill="none" stroke="${C.paper}" stroke-width="3" stroke-dasharray="6 5" opacity=".7"/>`;
  } },

  { u: "1f9e4", n: "gloves", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-12 50 55)">
<rect x="24" y="22" width="12" height="46" rx="6" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="36" y="12" width="12" height="52" rx="6" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="48" y="14" width="12" height="52" rx="6" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="60" y="24" width="12" height="44" rx="6" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="22" y="46" width="52" height="34" rx="12" fill="${lin(["#F9BF80", C.orange, C.orangeD], "d")}"/>
<rect x="6" y="42" width="30" height="13" rx="6.5" transform="rotate(38 21 48)" fill="${lin([C.orange, C.orangeD], "d")}"/></g></g>
<g ${B}><g transform="rotate(-12 50 55)"><rect x="26" y="76" width="44" height="18" rx="4" fill="${lin([C.paper, C.creamD])}"/></g></g>
<g transform="rotate(-12 50 55)" stroke="${C.orangeD}" stroke-width="2" opacity=".55"><path d="M32 78 V92 M40 78 V92 M48 78 V92 M56 78 V92 M64 78 V92"/></g>` },

  { u: "1f9e5", n: "coat", draw: ({ lin }) => `
<g ${B}><path d="M36 8 L50 24 L64 8 L82 16 L92 72 L78 76 L74 42 V94 H26 V42 L22 76 L8 72 L18 16Z" fill="${lin(["#E9C597", C.wood, C.woodD], "d")}"/></g>
<g ${Bs}><path d="M36 8 L50 24 L64 8 L72 14 L50 44 L28 14Z" fill="${lin([C.woodL, C.wood], "d")}"/></g>
<path d="M50 44 V94" stroke="${C.woodDD}" stroke-width="1.6" opacity=".6"/>
<circle cx="45" cy="58" r="2.6" fill="${C.woodDD}"/><circle cx="45" cy="74" r="2.6" fill="${C.woodDD}"/>
<path d="M30 70 H40 M60 70 H70" stroke="${C.woodDD}" stroke-width="2" stroke-linecap="round" opacity=".6"/>` },

  { u: "1f9e6", n: "socks", draw: ({ lin }) =>
    sock(lin, -12, -2, [C.paper, C.creamD], [C.blue, C.blueD], C.blueM) + sock(lin, 6, 4, ["#FBC9D2", C.pink, C.pinkD], [C.red, C.redD], C.paper) },

  { u: "1f457", n: "dress", draw: ({ lin }) => `
<g ${B}><path d="M34 6 H40 L42 26 H58 L60 6 H66 L66 34 L62 48 L86 92 Q50 98 14 92 L38 48 L34 34Z" fill="${lin(["#FBC9D2", C.pink, C.pinkD], "d")}"/></g>
<g ${Bs}><path d="M37 46 H63 L65 54 H35Z" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M44 62 L34 90 M50 62 V93 M56 62 L66 90" stroke="${C.pinkD}" stroke-width="1.8" opacity=".6"/>
<path d="M42 26 Q50 34 58 26" fill="none" stroke="${C.pinkD}" stroke-width="2" opacity=".7"/>` },

  { u: "1f458", n: "kimono", draw: ({ lin }) => `
<g ${B}><path d="M30 8 H70 V94 H30Z" fill="${lin([C.purple, C.purpleD], "d")}"/>
<path d="M6 22 L30 16 V66 H6Z" fill="${lin([C.purple, C.purpleD], "d")}"/>
<path d="M94 22 L70 16 V66 H94Z" fill="${lin([C.purple, C.purpleD], "d")}"/></g>
<g stroke="${C.paper}" stroke-width="5" stroke-linecap="round" opacity=".95"><path d="M38 8 L56 54 M62 8 L44 54" fill="none"/></g>
<g ${B}><rect x="28" y="50" width="44" height="20" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<path d="M28 60 H72" stroke="${C.goldD}" stroke-width="1.6" opacity=".6"/>
<g fill="${C.pink}" opacity=".85"><circle cx="17" cy="38" r="3"/><circle cx="83" cy="38" r="3"/><circle cx="17" cy="52" r="2.2"/><circle cx="83" cy="52" r="2.2"/><circle cx="40" cy="82" r="2.6"/><circle cx="60" cy="82" r="2.6"/></g>` },

  { u: "1f97b", n: "sari", draw: ({ lin, clip }) => `
<g ${B}><path d="M30 42 H70 L88 94 H12Z" fill="${lin([C.orange, C.redM, C.redD], "d")}"/></g>
<g ${clip('<path d="M30 42 H70 L88 94 H12Z"/>')}><rect x="0" y="82" width="100" height="8" fill="${C.gold}"/></g>
<path d="M42 56 L34 90 M52 56 V92 M62 56 L70 90" stroke="${C.redD}" stroke-width="1.6" opacity=".5"/>
<g ${B}><path d="M32 8 H68 L72 44 H28Z" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<g ${B}><path d="M40 12 L74 50 L78 88" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD])}" stroke-width="13" stroke-linecap="butt" stroke-linejoin="round"/></g>
<path d="M40 12 L74 50 L78 88" fill="none" stroke="${C.red}" stroke-width="4" stroke-dasharray="2 3.5" stroke-linejoin="round"/>` },

  { u: "1fa71", n: "one piece swimsuit", draw: ({ lin }) => `
<g ${B}><path d="M30 6 H38 L40 32 Q50 42 60 32 L62 6 H70 L70 38 L74 56 Q72 70 62 84 H38 Q28 70 26 56 L30 38Z" fill="${lin([C.blue, C.blueM, C.navy], "d")}"/></g>
<path d="M32 50 Q50 58 68 50 M30 60 Q50 68 70 60" fill="none" stroke="${C.paper}" stroke-width="2.6" opacity=".85"/>
<circle cx="50" cy="48" r="0" fill="none"/>
<path d="M32 76 Q50 84 68 76" fill="none" stroke="${C.paper}" stroke-width="2.6" opacity=".85"/>` },

  { u: "1fa72", n: "briefs", draw: ({ lin, clip }) => `
<g ${B}><path d="M8 22 H92 L88 44 C76 60 64 72 58 84 H42 C36 72 24 60 12 44Z" fill="${lin(["#C9B2EC", C.purple, C.purpleD], "d")}"/></g>
<g ${Bs}><rect x="8" y="22" width="84" height="9" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M12 44 C26 56 36 66 42 84 M88 44 C74 56 64 66 58 84" fill="none" stroke="${C.paper}" stroke-width="2.4" stroke-dasharray="3 2.5" opacity=".8"/>
<path d="M42 40 Q50 52 58 40" fill="none" stroke="${C.purpleD}" stroke-width="1.8" opacity=".6"/>` },

  { u: "1fa73", n: "shorts", draw: ({ lin }) => `
<g ${B}><path d="M14 16 H86 L94 78 H56 L50 44 L44 78 H6Z" fill="${lin(["#B2D8A5", C.greenM, C.greenD], "d")}"/></g>
<g ${Bs}><rect x="14" y="16" width="72" height="11" fill="${lin([C.green, C.greenM])}"/></g>
<path d="M44 22 Q40 36 38 40 M56 22 Q60 36 62 40" fill="none" stroke="${C.paper}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M10 70 H44 M56 70 H90" stroke="${C.greenD}" stroke-width="1.4" stroke-dasharray="3 2" opacity=".6"/>` },

  { u: "1f459", n: "bikini", draw: ({ lin }) => `
<path d="M24 28 Q50 -2 76 28" fill="none" stroke="${C.redM}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M18 62 Q10 66 5 76 M82 62 Q90 66 95 76" fill="none" stroke="${C.redM}" stroke-width="3.4" stroke-linecap="round"/>
<g ${B}><polygon points="14,28 46,28 30,56" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/><polygon points="54,28 86,28 70,56" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<g ${B}><path d="M16 62 H84 L50 94Z" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<g fill="${C.paper}" opacity=".9"><circle cx="30" cy="36" r="2.2"/><circle cx="70" cy="36" r="2.2"/><circle cx="50" cy="72" r="2.2"/><circle cx="38" cy="68" r="1.8"/><circle cx="62" cy="68" r="1.8"/></g>` },

  { u: "1f45a", n: "woman’s clothes", draw: ({ lin }) => `
<g ${B}><path d="M34 10 Q50 26 66 10 L92 26 L84 46 L72 42 L76 88 H24 L28 42 L16 46 L8 26Z" fill="${lin(["#FBC9D2", C.pink, C.pinkD], "d")}"/></g>
<g ${Bs}><path d="M34 10 L50 40 L42 44 L28 18Z M66 10 L50 40 L58 44 L72 18Z" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M50 42 V86" stroke="${C.pinkD}" stroke-width="1.6" opacity=".7"/>
<circle cx="50" cy="54" r="2.2" fill="${C.gold}"/><circle cx="50" cy="66" r="2.2" fill="${C.gold}"/><circle cx="50" cy="78" r="2.2" fill="${C.gold}"/>
<path d="M18 32 L26 40 M82 32 L74 40" stroke="${C.pinkD}" stroke-width="1.4" opacity=".5"/>` },

  { u: "1faad", n: "folding hand fan", draw: ({ lin }) => {
    const px = 50, py = 73, R = 46, r0 = 14;
    const pt = (r, a) => `${(px + r * Math.sin((a * Math.PI) / 180)).toFixed(1)} ${(py - r * Math.cos((a * Math.PI) / 180)).toFixed(1)}`;
    const secs = [-60, -40, -20, 0, 20, 40]
      .map((a, i) => `<path d="M${pt(r0, a)} L${pt(R, a)} A${R} ${R} 0 0 1 ${pt(R, a + 20)} L${pt(r0, a + 20)}Z" fill="${lin(i % 2 ? [C.pink, C.pinkD] : ["#F8887E", C.redM], "d")}"/>`)
      .join("");
    const sticks = [-60, -40, -20, 0, 20, 40, 60].map((a) => `M${pt(0, a)} L${pt(R + 2, a)}`).join(" ");
    return `<g ${B}>${secs}</g>
<path d="${sticks}" stroke="${C.woodD}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
<g ${B}><path d="M${pt(2, -60)} L${pt(R + 4, -60)} M${pt(2, 60)} L${pt(R + 4, 60)}" stroke="${C.wood}" stroke-width="5" stroke-linecap="round" fill="none"/></g>
<path d="M${pt(R - 6, -58)} A${R - 6} ${R - 6} 0 0 1 ${pt(R - 6, 58)}" fill="none" stroke="${C.gold}" stroke-width="2.2" stroke-dasharray="3 3"/>
<g ${Bs}><circle cx="${px}" cy="${py}" r="5" fill="${lin([C.gold, C.goldD], "d")}"/></g>`;
  } },

  { u: "1f45b", n: "purse", draw: ({ lin }) => `
<g ${Bs}><path d="M30 46 C26 8 74 8 70 46" fill="none" stroke="${C.redD}" stroke-width="4.5" stroke-linecap="round"/></g>
<g ${B}><path d="M10 62 C10 40 26 34 50 34 C74 34 90 40 90 62 C90 84 74 92 50 92 C26 92 10 84 10 62Z" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<g ${B}><path d="M24 40 C32 36 68 36 76 40 L72 50 C60 54 40 54 28 50Z" fill="${lin([C.red, C.redM])}"/></g>
<g ${Bs}><circle cx="50" cy="52" r="6" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M22 70 Q28 82 40 84" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>` },

  { u: "1f45c", n: "handbag", draw: ({ lin }) => `
<g ${Bs}><path d="M32 40 C26 4 74 4 68 40" fill="none" stroke="${C.woodD}" stroke-width="5.5" stroke-linecap="round"/></g>
<g ${B}><path d="M10 40 H90 L96 88 Q96 94 90 94 H10 Q4 94 4 88Z" fill="${lin([C.orange, C.orangeD, "#A85F22"], "d")}"/></g>
<g ${B}><path d="M10 40 H90 L86 60 Q50 74 14 60Z" fill="${lin(["#F9BF80", C.orange], "d")}"/></g>
<g ${Bs}><rect x="44" y="52" width="12" height="12" rx="3" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M12 78 H88" stroke="#A85F22" stroke-width="1.4" stroke-dasharray="3 2" opacity=".6"/>` },

  { u: "1f45d", n: "clutch bag", draw: ({ lin }) => `
<g ${B}><rect x="6" y="26" width="88" height="58" rx="10" fill="${lin(["#C9B2EC", C.purple, C.purpleD], "d")}"/></g>
<g ${B}><path d="M6 36 C6 28 10 26 16 26 H84 C90 26 94 28 94 36 L50 62Z" fill="${lin(["#D7C4F2", C.purple], "d")}"/></g>
<g ${Bs}><circle cx="50" cy="60" r="6" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M14 78 H86" stroke="${C.purpleD}" stroke-width="1.4" stroke-dasharray="3 2" opacity=".6"/>
<g ${Bs}><path d="M70 26 C70 12 90 12 90 26" fill="none" stroke="${C.gold}" stroke-width="3.5" stroke-linecap="round"/></g>` },

  { u: "1f6cd-fe0f", n: "shopping bags", draw: ({ lin }) => `
<g ${Bs}><path d="M24 30 C22 6 52 6 50 30" fill="none" stroke="${C.blueD}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}><path d="M8 28 H62 L66 90 H8Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${Bs}><path d="M52 40 C50 16 80 16 78 40" fill="none" stroke="${C.redD}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}><path d="M36 38 H92 L94 94 H34Z" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<g ${Bs}><polygon points="${[0, 1, 2, 3, 4].map((i) => [63 + 9 * Math.sin((i * 72 * Math.PI) / 180), 66 - 9 * Math.cos((i * 72 * Math.PI) / 180)].map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="${lin([C.yellow, C.yellowD])}"/></g>
<path d="M12 78 H58" stroke="${C.paper}" stroke-width="3" stroke-linecap="round" opacity=".6"/>` },

  { u: "1fa74", n: "thong sandal", draw: ({ lin }) => `
<g ${B}><path d="M50 4 C68 4 76 20 72 38 C70 50 66 58 66 72 C66 88 60 96 50 96 C40 96 34 88 34 72 C34 58 30 50 28 38 C24 20 32 4 50 4Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><path d="M30 56 L50 30 L70 56 M50 30 V14" fill="none" stroke="${lin([C.teal, C.tealD], "d")}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M44 84 C42 76 42 70 44 66" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".35"/>` },

  { u: "1f45e", n: "man’s shoe", draw: ({ lin }) => `
<g ${B}><path d="M8 24 C8 18 12 16 18 16 H30 C34 16 32 30 40 38 C50 48 66 46 82 54 C92 58 94 66 94 74 V80 H8Z" fill="${lin(["#D9A471", C.wood, C.woodD], "d")}"/></g>
<g ${B}><path d="M6 76 H96 V86 Q96 92 88 92 H14 Q6 92 6 86Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round" opacity=".9"><path d="M36 38 L44 32 M42 44 L50 38 M50 48 L58 42"/></g>
<path d="M66 58 C74 56 86 60 90 68" fill="none" stroke="${C.woodDD}" stroke-width="1.6" stroke-dasharray="3 2" opacity=".7"/>
<path d="M14 26 C14 22 14 22 18 22 V60" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".3"/>` },

  { u: "1f45f", n: "running shoe", draw: ({ lin }) => `
<g ${B}><path d="M8 34 C8 28 12 26 18 28 L30 34 C36 36 42 26 50 26 L54 32 C56 42 66 48 78 52 C90 56 94 62 94 70 V76 H8Z" fill="${lin(["#A5BFF0", C.blueM, C.blueD], "d")}"/></g>
<g ${B}><path d="M6 70 H94 V80 Q94 90 84 90 H16 Q6 90 6 80Z" fill="${lin([C.paper, C.creamD, "#B8A780"])}"/></g>
<path d="M18 60 C34 64 58 50 82 64" fill="none" stroke="${C.orange}" stroke-width="5" stroke-linecap="round"/>
<g stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round"><path d="M36 38 L46 34 M42 44 L52 40 M50 48 L58 44"/></g>
<path d="M13 40 V60" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".3"/>` },

  { u: "1f97e", n: "hiking boot", draw: ({ lin }) => `
<g ${B}><path d="M14 8 H46 L48 36 C52 46 68 46 80 54 C92 58 94 64 94 72 V78 H14Z" fill="${lin(["#D9A471", C.wood, C.woodD], "d")}"/></g>
<g ${B}><rect x="14" y="8" width="32" height="10" rx="3" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><path d="M10 74 H96 V86 Q96 94 88 94 H18 Q10 94 10 86Z" fill="${lin([(C.darkD as any) === 0 ? C.dark : C.dark, C.darkD])}"/></g>
<path d="M18 86 H88" stroke="${C.metalD}" stroke-width="1.6" stroke-dasharray="3 3" opacity=".7"/>
<g stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round"><path d="M24 24 L40 28 M24 34 L42 38 M26 44 L46 46 M40 52 L56 52"/></g>
<path d="M60 62 C70 60 84 62 90 70" fill="none" stroke="${C.woodDD}" stroke-width="1.6" stroke-dasharray="3 2" opacity=".7"/>` },

  { u: "1f97f", n: "flat shoe", draw: ({ lin }) => `
<g ${B}><path d="M8 62 C8 50 14 40 22 38 C30 36 36 50 48 52 C62 54 78 54 90 64 C94 68 92 74 86 76 H14 C10 76 8 70 8 62Z" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<g ${B}><path d="M10 74 H88 Q92 74 90 80 Q88 84 82 84 H16 Q10 84 10 78Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<ellipse cx="22" cy="46" rx="8" ry="4.5" transform="rotate(30 22 46)" fill="${C.redD}" opacity=".8"/>
<g ${Bs}><path d="M64 56 L74 52 L74 66 L64 62Z M74 52 L86 58 L86 62 L74 66Z" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M30 60 C40 66 56 66 70 70" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".3"/>` },

  { u: "1f460", n: "high heeled shoe", draw: ({ lin }) => `
<g ${B}><path d="M8 14 C18 10 26 18 30 32 C36 48 50 54 64 62 C80 68 94 70 94 80 C94 86 88 86 80 84 C62 82 46 76 32 64 L24 58 L22 94 H13 L13 40 C8 32 6 20 8 14Z" fill="${lin(["#F8887E", C.red, C.redD], "d")}"/></g>
<path d="M13 40 L22 58" stroke="${C.redD}" stroke-width="1.6" opacity=".6"/>
<path d="M14 22 C18 22 22 28 24 36" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".4"/>
<g ${Bs}><rect x="12" y="86" width="12" height="8" rx="2" fill="${C.darkD}"/></g>
<path d="M70 72 C78 72 88 74 90 80" fill="none" stroke="${C.redD}" stroke-width="1.6" opacity=".6"/>` },

  { u: "1f461", n: "woman’s sandal", draw: ({ lin }) => `
<g ${B}><path d="M8 64 H68 C86 64 94 67 94 73 C94 79 86 80 72 80 H8Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/>
<rect x="8" y="78" width="14" height="18" rx="2" fill="${lin([C.wood, C.woodD], "h")}"/></g>
<g ${B}><rect x="9" y="30" width="8" height="34" rx="3" fill="${lin([C.pink, C.pinkD], "h")}"/>
<path d="M20 68 C28 40 52 34 64 68" fill="none" stroke="${lin([C.pink, C.pinkD], "d")}" stroke-width="6" stroke-linecap="butt"/>
<path d="M68 70 C70 50 84 50 88 70" fill="none" stroke="${lin([C.pink, C.pinkD], "d")}" stroke-width="6" stroke-linecap="butt"/></g>
<g ${Bs}><rect x="9" y="32" width="10" height="9" rx="2" fill="${lin([C.gold, C.goldD], "d")}"/></g>
` },

  { u: "1fa70", n: "ballet shoes", draw: ({ lin }) => `${slipper(lin, -14, -16)}${slipper(lin, 14, 16)}
<path d="M30 62 Q44 80 62 94 M70 62 Q56 80 38 94" fill="none" stroke="${C.pinkD}" stroke-width="3" stroke-linecap="round" opacity="0"/>` },

  { u: "1f462", n: "woman’s boot", draw: ({ lin }) => `
<g ${B}><path d="M22 8 H54 V44 C56 54 68 56 80 62 C90 66 94 72 94 78 V84 H18 V8Z" fill="${lin(["#C9B2EC", C.purple, C.purpleD], "d")}"/></g>
<g ${B}><rect x="22" y="8" width="32" height="10" rx="3" fill="${lin([C.gold, C.goldD])}"/><rect x="16" y="82" width="14" height="14" rx="2" fill="${lin([C.dark, C.darkD], "h")}"/>
<path d="M18 82 H94 V88 Q94 90 90 90 H30 V82Z" fill="${C.dark}"/></g>
<path d="M44 20 V74" stroke="${C.goldM}" stroke-width="2" stroke-dasharray="2 2.4"/>
<path d="M28 24 V64" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".3"/>` },

  { u: "1faae", n: "hair pick", draw: ({ lin }) => `
<g ${B}><path d="M36 20 C36 8 64 8 64 20 V34 H36Z" fill="${lin([C.orange, C.orangeD], "d")}"/>
<rect x="14" y="30" width="72" height="14" rx="6" fill="${lin([C.orange, C.orangeD], "v")}"/>
<rect x="14" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="27" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="40" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="53" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="66" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/>
<rect x="77" y="40" width="9" height="54" rx="4.5" fill="${lin([C.orange, C.orangeD], "h")}"/></g>
<ellipse cx="50" cy="20" rx="5" ry="4" fill="${C.orangeD}" opacity=".8"/>
<path d="M44 14 Q50 10 56 14" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>` },

  { u: "1f451", n: "crown", draw: ({ lin }) => `
<g ${B}><path d="M10 78 L14 30 L34 52 L50 22 L66 52 L86 30 L90 78Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/>
<rect x="9" y="76" width="82" height="15" rx="4" fill="${lin([C.goldM, C.goldD])}"/>
<circle cx="14" cy="28" r="5" fill="${lin([C.gold, C.goldM], "d")}"/><circle cx="50" cy="18" r="5.5" fill="${lin([C.gold, C.goldM], "d")}"/><circle cx="86" cy="28" r="5" fill="${lin([C.gold, C.goldM], "d")}"/></g>
<g ${Bs}><circle cx="28" cy="83.5" r="3.6" fill="${C.red}"/><circle cx="50" cy="83.5" r="4.2" fill="${C.blueM}"/><circle cx="72" cy="83.5" r="3.6" fill="${C.greenM}"/></g>
<path d="M22 70 L24 46 M50 62 V40" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".4"/>` },
];

const SHIFT = { "1f9e3": [0, -6], "1f9e4": [9, -6], "1f45f": [0, -8], "1f97f": [0, -11], "1f461": [0, -13], "1f576-fe0f": [0, -5] };
const __batch: Icon[] = LIST.map((ic) => {
  const s = SHIFT[ic.u];
  return s ? { ...ic, draw: (t) => `<g transform="translate(${s[0]} ${s[1]})">${ic.draw(t)}</g>` } : ic;
});

export default __batch;
