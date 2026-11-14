// food_drink-2: bakery, meat, fast food, wraps, egg dishes, pots and bowls.
import { B, Bs, C } from "../kit.mjs";

const hl = (cx, cy, rx, ry, rot = 0, o = 0.3) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#fff" opacity="${o}"/>`;
const steam = (x, y) => `<path d="M${x} ${y} c-4 -4 4 -7 0 -11 c-4 -4 4 -7 0 -11" fill="none" stroke="#9DB0C8" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>`;
const crust = (lin) => lin(["#E9B777", "#C98A4C", "#A0652F"]);

// blue-and-cream bowl; contents drawn by caller after it (interior colour given)
const bowl = (lin, inner) => `<g ${B}><path d="M9 46 H91 C91 74 74 90 50 90 C26 90 9 74 9 46Z" fill="${lin(["#8FACE6", "#5B7CC4", "#3F5A9E"], "d")}"/></g>
<path d="M12 60 Q50 74 88 60" fill="none" stroke="${C.cream}" stroke-width="3" stroke-linecap="round" opacity=".9"/>
<path d="M30 76 Q50 84 70 76" fill="none" stroke="${C.cream}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
<g ${B}><ellipse cx="50" cy="46" rx="41" ry="10" fill="${lin([C.paper, C.creamD])}"/></g>
<ellipse cx="50" cy="46.5" rx="35" ry="7.5" fill="${inner}"/>`;

// drumstick / bone-in meat, drawn pointing down-right
const leg = (lin, rad, cols, big) => `<g ${B}><g transform="translate(50 50) scale(1.15) translate(-50 -50) rotate(45 50 50)">
<rect x="52" y="45.5" width="28" height="9" rx="3" fill="${lin([C.paper, C.creamD, "#BBA678"])}"/>
<circle cx="84" cy="43" r="6.2" fill="${lin([C.paper, C.creamD])}"/><circle cx="84" cy="57" r="6.2" fill="${lin([C.paper, C.creamD])}"/>
<ellipse cx="${big ? 34 : 36}" cy="50" rx="${big ? 31 : 29}" ry="${big ? 25 : 23}" fill="${rad(cols, 0.34, 0.28, 0.85)}"/></g></g>
<g transform="translate(50 50) scale(1.15) translate(-50 -50) rotate(45 50 50)"><ellipse cx="29" cy="40" rx="14" ry="6" fill="#fff" opacity=".26"/><path d="M52 40 C57 46 57 54 52 60" fill="none" stroke="#6A3A1C" stroke-width="2" opacity=".35"/></g>`;

export default [
  { u: "1f35e", n: "bread", draw: ({ lin }) => `
<g ${B}><path d="M7 54 C-1 28 22 13 50 13 C78 13 101 28 93 54 V78 a9 9 0 0 1 -9 9 H16 a9 9 0 0 1 -9 -9Z" fill="${crust(lin)}"/></g>
<g ${Bs}><path d="M14 50 C10 32 28 22 50 22 C72 22 90 32 86 50Z" fill="${lin(["#F6D9A0", "#E7B876"])}"/></g>
<path d="M36 33 L42 45 M50 31 L56 44 M64 33 L70 45" stroke="${C.cream}" stroke-width="3.2" stroke-linecap="round" opacity=".85"/>
<path d="M18 64 H82" stroke="${C.woodDD}" stroke-width="1.4" opacity=".3"/>${hl(27, 36, 9, 4, -30, 0.35)}` },

  { u: "1f950", n: "croissant", draw: ({ lin }) => {
    const g = lin(["#F6CE86", "#DB9B4C", "#B26F30"]);
    const seg = (cx, cy, rx, ry, r) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${cx} ${cy})" fill="${g}"/>`;
    return `<g ${B}>${seg(15, 67, 11, 8, 62)}${seg(85, 67, 11, 8, -62)}</g>
<g ${B}>${seg(25, 50, 14.5, 11.5, 38)}${seg(75, 50, 14.5, 11.5, -38)}</g>
<g ${B}>${seg(50, 41, 22, 18.5, 0)}</g>
<path d="M36 25 C44 33 44 49 38 56 M64 25 C56 33 56 49 62 56 M16 40 C26 44 30 56 28 60 M84 40 C74 44 70 56 72 60" fill="none" stroke="#8A5424" stroke-width="1.6" opacity=".35"/>${hl(42, 30, 10, 4, -10, 0.38)}`;
  } },

  { u: "1f956", n: "baguette bread", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-40 50 50)"><rect x="0" y="39" width="100" height="22" rx="11" fill="${lin(["#EFC184", "#CD9150", "#A2662F"])}"/></g></g>
<g transform="rotate(-40 50 50)" stroke="${C.cream}" stroke-width="3.4" stroke-linecap="round" opacity=".85"><path d="M22 45 L28 55 M38 44 L44 55 M54 44 L60 55 M70 45 L76 55"/></g>
<g transform="rotate(-40 50 50)">${hl(40, 43, 28, 2.4, 0, 0.3)}</g>` },

  { u: "1fad3", n: "flatbread", draw: ({ lin, rad }) => `<g transform="translate(0 -6)">
<g ${B}><ellipse cx="50" cy="60" rx="41" ry="30" fill="${lin(["#C18A52", "#8E5A2C"])}"/><ellipse cx="50" cy="54" rx="41" ry="30" fill="${rad(["#F6DCA6", "#E3B573", "#C98F4F"], 0.38, 0.3, 0.85)}"/></g>
<g fill="#8A5424" opacity=".55"><ellipse cx="34" cy="44" rx="6" ry="3.6"/><ellipse cx="62" cy="40" rx="7" ry="3.8"/><ellipse cx="52" cy="62" rx="8" ry="4"/><ellipse cx="76" cy="60" rx="4.5" ry="2.8"/><ellipse cx="26" cy="62" rx="4.5" ry="2.8"/></g>
<path d="M30 54 Q50 48 70 52" fill="none" stroke="#fff" stroke-width="2" opacity=".3"/>${hl(32, 36, 12, 4, -20, 0.35)}</g>` },

  { u: "1f968", n: "pretzel", draw: ({ lin }) => `
<g ${B}><path d="M70 82 C92 62 94 20 68 17 C56 16 50 26 50 36 C50 26 44 16 32 17 C6 20 8 62 30 82" fill="none" stroke="${lin(["#D9A263", "#A8682F"])}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26 78 C42 68 58 56 72 40 M74 78 C58 68 42 56 28 40" fill="none" stroke="#C48B4D" stroke-width="9" stroke-linecap="round"/></g>
<path d="M18 34 C16 26 22 22 28 22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".35"/>
<g fill="#FCF6E8" opacity=".9"><ellipse cx="22" cy="46" rx="2.4" ry="1.4" transform="rotate(30 22 46)"/><ellipse cx="80" cy="46" rx="2.4" ry="1.4" transform="rotate(-30 80 46)"/><ellipse cx="68" cy="25" rx="2.4" ry="1.4"/><ellipse cx="33" cy="25" rx="2.4" ry="1.4"/><ellipse cx="50" cy="56" rx="2.4" ry="1.4"/><ellipse cx="38" cy="66" rx="2.4" ry="1.4" transform="rotate(-30 38 66)"/><ellipse cx="62" cy="66" rx="2.4" ry="1.4" transform="rotate(30 62 66)"/></g>` },

  { u: "1f96f", n: "bagel", draw: ({ lin, rad }) => `<g transform="translate(0 -5)">
<g ${B}><ellipse cx="50" cy="60" rx="42" ry="31" fill="${lin(["#B8793F", "#8A5628"])}"/>
<path fill-rule="evenodd" d="M8 52 a42 31 0 1 0 84 0 a42 31 0 1 0 -84 0Z M34 52 a16 10 0 1 0 32 0 a16 10 0 1 0 -32 0Z" fill="${rad(["#F2CC8F", "#DDA661", "#B97A3C"], 0.36, 0.28, 0.9)}"/></g>
<ellipse cx="50" cy="56" rx="16" ry="10" fill="#6B4324" opacity=".4"/>
<g fill="${C.cream}"><ellipse cx="24" cy="46" rx="2.6" ry="1.4" transform="rotate(-30 24 46)"/><ellipse cx="38" cy="30" rx="2.6" ry="1.4" transform="rotate(-20 38 30)"/><ellipse cx="62" cy="28" rx="2.6" ry="1.4" transform="rotate(20 62 28)"/><ellipse cx="78" cy="42" rx="2.6" ry="1.4" transform="rotate(30 78 42)"/><ellipse cx="74" cy="64" rx="2.6" ry="1.4"/><ellipse cx="50" cy="75" rx="2.6" ry="1.4"/><ellipse cx="27" cy="64" rx="2.6" ry="1.4"/><ellipse cx="50" cy="31" rx="2.6" ry="1.4"/></g>${hl(26, 38, 9, 3.4, -35, 0.38)}</g>` },

  { u: "1f95e", n: "pancakes", draw: ({ lin }) => {
    const side = (y, c) => `<g ${B}><path d="M8 ${y} C8 ${y - 6} 92 ${y - 6} 92 ${y} V${y + 13} C92 ${y + 21} 8 ${y + 21} 8 ${y + 13}Z" fill="${lin(c)}"/></g>`;
    return `${side(64, ["#D9A15E", "#A8692F"])}${side(48, ["#E5B070", "#B87A3C"])}
<g ${B}><path d="M8 32 C8 22 92 22 92 32 V42 C92 50 8 50 8 42Z" fill="${lin(["#EDBE80", "#C58A47"])}"/><ellipse cx="50" cy="32" rx="41" ry="11" fill="${lin(["#F6D79C", "#E0A95F"], "d")}"/></g>
<g ${Bs}><path d="M30 34 C30 28 46 26 52 28 C70 30 70 44 62 50 C60 62 66 68 64 74 C60 78 56 68 56 58 C48 54 30 44 30 34Z" fill="${lin(["#E58A3C", "#B2561F"])}" opacity=".85"/></g>
<g ${Bs}><rect x="42" y="22" width="15" height="12" rx="2" transform="rotate(-8 50 28)" fill="${lin([C.yellow, C.yellowM])}"/></g>${hl(30, 30, 9, 2.6, -12, 0.4)}`;
  } },

  { u: "1f9c7", n: "waffle", draw: ({ lin }) => {
    const gl = [0, 1, 2, 3].map((i) => `M${28 + i * 15} 22 V78 M16 ${34 + i * 14} H86`).join(" ");
    return `<g ${B}><rect x="10" y="22" width="80" height="70" rx="12" fill="${lin(["#B8793F", "#8A5628"])}"/><rect x="10" y="14" width="80" height="70" rx="12" fill="${lin(["#F4D08E", "#DFA758", "#BE7F3F"], "d")}"/></g>
<path d="${gl.replace(/ V78/g, " V76").replace(/ 22 /g, " 22 ")}" fill="none" stroke="#9C6228" stroke-width="3" opacity=".6"/>
<g ${Bs}><rect x="38" y="34" width="20" height="16" rx="3" transform="rotate(-8 48 42)" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<path d="M62 44 C70 50 74 58 70 66" fill="none" stroke="#C8651F" stroke-width="3" stroke-linecap="round" opacity=".6"/>${hl(24, 26, 8, 2.4, -8, 0.4)}`;
  } },

  { u: "1f9c0", n: "cheese wedge", draw: ({ lin }) => `<g transform="translate(0 -10)">
<g ${B}><path d="M8 78 H92 V90 a4 4 0 0 1 -4 4 H12 a4 4 0 0 1 -4 -4Z" fill="${lin(["#F2B744", "#C9861F"])}"/></g>
<g ${B}><path d="M8 78 L92 34 V78Z" stroke="#F6CF5E" stroke-width="3" stroke-linejoin="round" fill="${lin(["#FBE38A", "#F6CF5E", "#E2AC36"], "d")}"/></g>
<g fill="#C78A22" opacity=".55"><circle cx="72" cy="58" r="5.4"/><circle cx="52" cy="70" r="4"/><circle cx="84" cy="70" r="3.2"/><circle cx="34" cy="73" r="2.6"/></g>
<path d="M14 76 L62 52" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>
<g fill="#C78A22" opacity=".5"><circle cx="30" cy="86" r="2.6"/><circle cx="62" cy="86" r="3.4"/></g></g>` },

  { u: "1f356", n: "meat on bone", draw: ({ lin, rad }) => leg(lin, rad, ["#E58A6A", "#C2563F", "#8E2F28"], true) },

  { u: "1f357", n: "poultry leg", draw: ({ lin, rad }) => leg(lin, rad, ["#F2C27A", "#D08A3F", "#9C5A24"], false) },

  { u: "1f969", n: "cut of meat", draw: ({ lin, rad }) => `<g transform="translate(50 50) scale(1.1) translate(-50 -50)">
<g ${B}><path d="M14 52 C8 30 26 14 52 16 C80 14 94 34 88 56 C84 78 62 90 40 86 C22 82 16 70 14 52Z" fill="${lin(["#FBE6DA", "#F0C2B2", "#D99A8A"])}"/></g>
<g ${B}><path d="M24 52 C20 36 34 25 52 26 C72 25 82 40 78 56 C74 72 58 78 42 75 C30 72 26 64 24 52Z" fill="${rad(["#F08470", "#CC4A44", "#9A2C30"], 0.36, 0.3, 0.85)}"/></g>
<path d="M36 38 C44 44 52 44 60 38 M34 58 C46 54 58 60 68 52 M50 66 C56 64 62 66 66 62" fill="none" stroke="#F8D6CC" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>
<g ${Bs}><circle cx="46" cy="52" r="5.6" fill="${lin([C.paper, C.creamD])}"/></g>${hl(36, 34, 9, 3.4, -25, 0.4)}</g>` },

  { u: "1f953", n: "bacon", draw: ({ lin }) => {
    const strip = (dy, r) => `<g transform="translate(0 ${dy})"><g ${B}><path d="M17 34 C28 20 38 46 50 34 S72 22 83 34" fill="none" stroke="${C.red}" stroke-width="22" stroke-linecap="round"/></g>
<path d="M17 34 C28 20 38 46 50 34 S72 22 83 34" fill="none" stroke="${C.paper}" stroke-width="5.5" stroke-linecap="round" opacity=".92"/>
<path d="M20 27 C30 14 38 40 50 28 S70 16 80 27" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".3"/></g>`;
    return strip(-2) + strip(34);
  } },

  { u: "1f354", n: "hamburger", draw: ({ lin }) => `
<g ${B}><path d="M12 74 H88 C88 90 76 90 70 90 H30 C24 90 12 90 12 74Z" fill="${crust(lin)}"/></g>
<g ${B}><rect x="10" y="60" width="80" height="14" rx="7" fill="${lin(["#9A5C3A", "#693A22"])}"/></g>
<g ${Bs}><path d="M8 52 H92 L82 62 L70 56 L58 66 L46 56 L30 62Z" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/></g>
<g ${Bs}><path d="M8 48 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 V54 H8Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}><rect x="14" y="44" width="72" height="7" rx="3.5" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><path d="M10 44 C8 18 30 8 50 8 C70 8 92 18 90 44Z" fill="${lin(["#F1BF7F", "#CF9150", "#A8682F"])}"/></g>
<g fill="${C.cream}"><ellipse cx="32" cy="22" rx="3" ry="1.6" transform="rotate(-25 32 22)"/><ellipse cx="50" cy="16" rx="3" ry="1.6"/><ellipse cx="68" cy="22" rx="3" ry="1.6" transform="rotate(25 68 22)"/><ellipse cx="42" cy="32" rx="3" ry="1.6" transform="rotate(-10 42 32)"/><ellipse cx="60" cy="32" rx="3" ry="1.6" transform="rotate(10 60 32)"/><ellipse cx="78" cy="34" rx="3" ry="1.6" transform="rotate(35 78 34)"/><ellipse cx="22" cy="34" rx="3" ry="1.6" transform="rotate(-35 22 34)"/></g>${hl(28, 20, 10, 3.4, -25, 0.4)}` },

  { u: "1f35f", n: "french fries", draw: ({ lin }) => {
    const f = (x, y, h, r) => `<g transform="rotate(${r} ${x + 5} 60)"><rect x="${x}" y="${y}" width="10" height="${h}" rx="2" fill="${lin(["#FBE38A", C.yellowM, C.yellowD], "d")}"/></g>`;
    return `<g ${Bs}>${f(18, 14, 50, -14)}${f(66, 16, 50, 14)}${f(30, 8, 56, -6)}${f(54, 8, 56, 6)}${f(42, 4, 60, 0)}</g>
<g ${B}><path d="M16 50 H84 L76 92 H24Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><path d="M20 66 Q50 78 80 66 V78 Q50 90 20 78Z" fill="${lin([C.yellow, C.yellowD])}"/></g>${hl(28, 58, 6, 2, -10, 0.3)}`;
  } },

  { u: "1f355", n: "pizza", draw: ({ lin }) => `
<g ${B}><path d="M12 30 Q50 14 88 30 L50 94Z" fill="${lin(["#FBE38A", "#F2B845", "#D98F2B"])}"/></g>
<g ${B}><path d="M10 28 Q50 8 90 28" fill="none" stroke="${lin(["#E9B777", "#B87A3C"])}" stroke-width="10" stroke-linecap="round"/></g>
<g ${Bs}><circle cx="36" cy="38" r="7" fill="${lin([C.red, C.redD], "d")}"/><circle cx="62" cy="40" r="6.4" fill="${lin([C.red, C.redD], "d")}"/><circle cx="50" cy="58" r="6.6" fill="${lin([C.red, C.redD], "d")}"/><circle cx="50" cy="76" r="4" fill="${lin([C.red, C.redD], "d")}"/></g>
<path d="M44 46 q3 -4 6 0 M30 52 q3 -4 6 0 M60 52 q3 -4 6 0" stroke="${C.greenD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M18 30 Q40 20 58 22" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>` },

  { u: "1f32d", n: "hot dog", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-35 50 50)"><rect x="6" y="38" width="88" height="26" rx="13" fill="${lin(["#C48C55", "#8E5A2C"])}"/></g></g>
<g ${B}><g transform="rotate(-35 50 50)"><rect x="-2" y="35" width="104" height="16" rx="8" fill="${lin(["#E58A6A", "#C0503F", "#8E2F28"])}"/></g></g>
<g ${B}><g transform="rotate(-35 50 50)"><path d="M10 50 H90 a10 10 0 0 1 -10 14 H20 a10 10 0 0 1 -10 -14Z" fill="${lin(["#F1C98F", "#D89D5E"])}"/></g></g>
<g transform="rotate(-35 50 50)"><path d="M12 43 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5" fill="none" stroke="${C.yellow}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${hl(40, 38, 24, 1.8, 0, 0.35)}</g>` },

  { u: "1f96a", n: "sandwich", draw: ({ lin }) => `
<g ${B}><path d="M10 74 H90 V84 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6Z" fill="${lin(["#F6E2B6", "#D8B67A"])}"/></g>
<g ${Bs}><rect x="8" y="64" width="84" height="11" rx="5" fill="${lin([C.pink, C.pinkD])}"/></g>
<g ${Bs}><path d="M10 54 H90 L82 64 L68 57 L54 66 L40 57 L26 64Z" fill="${lin([C.yellow, C.yellowD])}"/></g>
<g ${Bs}><rect x="12" y="46" width="76" height="8" rx="4" fill="${lin([C.red, C.redD])}"/></g>
<g ${Bs}><path d="M6 44 q7 -7 14 0 q7 7 14 0 q7 -7 14 0 q7 7 14 0 q7 -7 14 0 q7 7 14 0 V50 H6Z" fill="${lin([C.green, C.greenD])}"/></g>
<g ${B}><path d="M10 40 C4 22 22 14 50 14 C78 14 96 22 90 40Z" fill="${lin(["#F6E2B6", "#E2BE82", "#C79A5C"])}"/></g>
<path d="M14 36 C10 24 24 20 50 20 C76 20 90 24 86 36" fill="none" stroke="#C48C55" stroke-width="2" opacity=".7"/>${hl(30, 24, 11, 3, -12, 0.45)}` },

  { u: "1f32e", n: "taco", draw: ({ lin }) => `
<g ${B}><path d="M6 46 A44 44 0 0 0 94 46Z" fill="${lin(["#FBE38A", "#F1BE40", "#C98F2B"], "d")}"/></g>
<g ${Bs}><path d="M10 48 C6 30 18 22 26 30 C30 14 46 14 50 26 C58 14 74 16 76 30 C86 22 96 32 90 48Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}><circle cx="34" cy="36" r="5.4" fill="${lin([C.red, C.redD])}"/><circle cx="58" cy="34" r="5.4" fill="${lin([C.red, C.redD])}"/><circle cx="76" cy="40" r="4.4" fill="${lin([C.red, C.redD])}"/></g>
<path d="M22 42 l6 3 M46 42 l6 3 M66 44 l6 2" stroke="${C.orange}" stroke-width="3" stroke-linecap="round"/>
<path d="M14 58 C22 76 36 82 48 82" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>
<path d="M12 52 H88" stroke="#C98F2B" stroke-width="1.6" opacity=".5"/>` },

  { u: "1f32f", n: "burrito", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(-35 50 50)"><rect x="10" y="34" width="82" height="32" rx="14" fill="${lin(["#F6E2B6", "#E2BE82", "#C79A5C"])}"/></g></g>
<g ${B}><g transform="rotate(-35 50 50)"><ellipse cx="13" cy="50" rx="9" ry="15" fill="${rad(["#9AC48C", "#B8793F", "#6B4324"], 0.5, 0.5, 0.8)}"/></g></g>
<g transform="rotate(-35 50 50)"><g fill="${C.red}"><circle cx="11" cy="46" r="2.6"/><circle cx="14" cy="55" r="2.4"/></g>
<path d="M34 36 C42 44 42 56 34 64 M60 34 C68 44 68 56 60 66" fill="none" stroke="#B07A3A" stroke-width="2" stroke-linecap="round" opacity=".6"/>
<g fill="#A8682F" opacity=".5"><ellipse cx="48" cy="42" rx="4" ry="2"/><ellipse cx="76" cy="58" rx="4" ry="2"/><ellipse cx="52" cy="60" rx="3" ry="1.6"/></g>${hl(52, 38, 22, 2.4, 0, 0.4)}</g>` },

  { u: "1fad4", n: "tamale", draw: ({ lin }) => {
    const husk = lin(["#F6E7BC", "#E2C98A", "#C4A262"]);
    return `<g ${B}><g transform="translate(50 50) scale(.9) translate(-50 -50) rotate(-30 50 50)">
<path d="M26 38 L5 26 C2 40 2 60 5 74 L26 62Z" fill="${lin(["#E9D5A0", "#C4A262"])}"/><path d="M74 38 L95 26 C98 40 98 60 95 74 L74 62Z" fill="${lin(["#E9D5A0", "#C4A262"])}"/>
<rect x="22" y="30" width="56" height="40" rx="12" fill="${husk}"/></g></g>
<g transform="translate(50 50) scale(.9) translate(-50 -50) rotate(-30 50 50)"><path d="M32 33 V67 M42 31 V69 M52 31 V69 M62 31 V69 M71 33 V67" stroke="#B8975A" stroke-width="1.4" opacity=".55"/>
<path d="M5 34 L22 44 M5 50 H22 M5 66 L22 56 M95 34 L78 44 M95 50 H78 M95 66 L78 56" stroke="#B8975A" stroke-width="1.4" opacity=".5"/></g>
<g ${Bs}><g transform="translate(50 50) scale(.9) translate(-50 -50) rotate(-30 50 50)"><rect x="22" y="31" width="5" height="38" rx="2" fill="${lin([C.green, C.greenD])}"/><rect x="73" y="31" width="5" height="38" rx="2" fill="${lin([C.green, C.greenD])}"/></g></g>
<g transform="translate(50 50) scale(.9) translate(-50 -50) rotate(-30 50 50)">${hl(46, 38, 20, 2.6, 0, 0.4)}</g>`;
  } },

  { u: "1f959", n: "stuffed flatbread", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-14 50 50)"><path d="M8 44 H92 C92 72 74 90 50 90 C26 90 8 72 8 44Z" fill="${lin(["#F6E2B6", "#E2BE82", "#BC8C50"], "d")}"/></g></g>
<g ${Bs}><g transform="rotate(-14 50 50)"><path d="M10 46 C4 28 16 20 24 28 C28 12 44 12 48 24 C56 10 72 14 74 28 C84 20 98 30 90 46Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g></g>
<g ${Bs}><g transform="rotate(-14 50 50)"><circle cx="32" cy="34" r="5.4" fill="${lin([C.red, C.redD])}"/><circle cx="58" cy="30" r="5.4" fill="${lin([C.red, C.redD])}"/><rect x="40" y="34" width="22" height="7" rx="3.5" fill="${lin(["#B8793F", "#7A4A28"])}"/><rect x="70" y="36" width="14" height="6" rx="3" fill="${lin(["#B8793F", "#7A4A28"])}"/></g></g>
<g transform="rotate(-14 50 50)"><path d="M18 52 C26 74 40 82 50 82 M14 48 H86" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".4"/><path d="M20 40 C30 48 40 36 52 44" fill="none" stroke="${C.purpleD}" stroke-width="2.6" stroke-linecap="round" opacity=".8"/></g>` },

  { u: "1f9c6", n: "falafel", draw: ({ lin, rad }) => {
    const ball = (x, y, r, cut) => `<g ${B}><circle cx="${x}" cy="${y}" r="${r}" fill="${rad(["#D9A465", "#A8682F", "#6B4324"], 0.36, 0.3, 0.85)}"/></g>${cut ? `<g ${Bs}><circle cx="${x + 2}" cy="${y + 2}" r="${r * 0.62}" fill="${rad(["#C5D49A", "#8DB070", "#5E8A4F"], 0.4, 0.35, 0.8)}"/></g>` : ""}`;
    return `${ball(28, 68, 22, false)}${ball(72, 68, 22, true)}${ball(50, 32, 22, false)}
<g fill="${C.cream}" opacity=".85"><ellipse cx="20" cy="62" rx="2.4" ry="1.3"/><ellipse cx="36" cy="76" rx="2.4" ry="1.3"/><ellipse cx="44" cy="24" rx="2.4" ry="1.3"/><ellipse cx="58" cy="38" rx="2.4" ry="1.3"/><ellipse cx="40" cy="38" rx="2.4" ry="1.3"/></g>${hl(42, 22, 8, 3.4, -30, 0.4)}${hl(20, 58, 7, 3, -30, 0.35)}`;
  } },

  { u: "1f95a", n: "egg", draw: ({ rad }) => `
<g ${B}><path d="M50 7 C72 7 83 38 83 60 C83 78 68 92 50 92 C32 92 17 78 17 60 C17 38 28 7 50 7Z" fill="${rad(["#FFF8E6", "#EBD9AE", "#C9B07F"], 0.36, 0.3, 0.85)}"/></g>
${hl(36, 36, 7, 14, 22, 0.55)}<path d="M72 62 C72 72 64 80 54 82" fill="none" stroke="#B89B65" stroke-width="2" stroke-linecap="round" opacity=".4"/>` },

  { u: "1f373", n: "cooking", draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(35 50 50)"><rect x="66" y="44" width="40" height="12" rx="6" fill="${lin(["#B07A4A", C.woodDD])}"/></g></g>
<g ${B}><circle cx="43" cy="46" r="38" fill="${lin(["#8A929E", "#5A616D", "#3F4650"], "d")}"/></g>
<circle cx="43" cy="46" r="31" fill="${lin(["#4A515C", "#6B7380"], "d")}"/>
<g ${B}><path d="M24 40 C20 26 34 18 46 22 C56 14 70 24 66 36 C76 42 68 58 56 58 C48 68 28 64 28 54 C20 52 20 44 24 40Z" fill="${lin([C.paper, "#E9DDBE"], "d")}"/></g>
<g ${B}><circle cx="46" cy="42" r="10.5" fill="${rad(["#FFE98A", "#F5B93A", "#D98A1E"], 0.38, 0.3, 0.85)}"/></g>${hl(42, 37, 3.6, 2.2, -30, 0.7)}
<path d="M24 28 C30 18 40 14 48 15" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".3"/>` },

  { u: "1f958", n: "shallow pan of food", draw: ({ lin, rad }) => `<g transform="translate(0 -9)">
<g ${B}><rect x="2" y="48" width="12" height="7" rx="3.5" fill="${lin([C.metal, C.metalDD])}"/><rect x="86" y="48" width="12" height="7" rx="3.5" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><ellipse cx="50" cy="64" rx="43" ry="28" fill="${lin(["#8A929E", "#4F5662"])}"/><ellipse cx="50" cy="56" rx="43" ry="29" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<ellipse cx="50" cy="57" rx="36" ry="23" fill="${C.metalDD}" opacity=".7"/>
<ellipse cx="50" cy="57" rx="34" ry="21.5" fill="${rad(["#FDE68A", "#F1BE40", "#D49828"], 0.4, 0.3, 0.9)}"/>
<g ${Bs}><path d="M24 54 C26 40 40 38 42 48 C40 54 32 58 24 54Z" fill="${lin([C.orange, C.orangeD])}"/><path d="M58 40 C70 36 80 46 74 56 C68 52 60 48 58 40Z" fill="${lin([C.orange, C.orangeD])}"/><path d="M42 64 C52 58 64 62 66 70 C58 74 46 72 42 64Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${Bs}><circle cx="48" cy="46" r="3" fill="${C.greenM}"/><circle cx="36" cy="64" r="3" fill="${C.greenM}"/><circle cx="76" cy="62" r="3" fill="${C.greenM}"/><circle cx="56" cy="54" r="2.6" fill="${C.greenM}"/></g>
<g ${Bs}><rect x="30" y="68" width="16" height="4.5" rx="2.2" transform="rotate(-20 38 70)" fill="${lin([C.red, C.redD])}"/><rect x="62" y="48" width="14" height="4.5" rx="2.2" transform="rotate(25 69 50)" fill="${lin([C.red, C.redD])}"/></g>
<g ${Bs}><path d="M42 36 a10 10 0 0 1 14 0 L49 42Z" fill="${lin(["#FFF3A8", C.yellowM])}"/></g>${hl(26, 42, 10, 3, -25, 0.3)}</g>` },

  { u: "1f372", n: "pot of food", draw: ({ lin }) => `
<g ${B}><rect x="2" y="50" width="14" height="8" rx="4" fill="${lin([C.metal, C.metalDD])}"/><rect x="84" y="50" width="14" height="8" rx="4" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><path d="M10 52 H90 V74 C90 86 80 90 70 90 H30 C20 90 10 86 10 74Z" fill="${lin(["#B0382F", C.redM, "#F08070", C.redM, "#A2302E"], "h")}"/></g>
<g ${B}><ellipse cx="50" cy="52" rx="40" ry="10" fill="${lin([C.metalL, C.metalD])}"/></g>
<ellipse cx="50" cy="52.5" rx="35" ry="7.4" fill="${lin(["#E58A3C", "#B2561F"])}"/>
<g ${Bs}><circle cx="34" cy="52" r="3.4" fill="${C.orange}"/><circle cx="52" cy="54" r="3" fill="${C.greenM}"/><circle cx="64" cy="51" r="3.4" fill="${C.paper}"/><circle cx="44" cy="50" r="2.4" fill="${C.greenM}"/></g>
<path d="M18 70 H82" stroke="${C.cream}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
${steam(34, 40)}${steam(52, 34)}${steam(68, 40)}` },

  { u: "1fad5", n: "fondue", draw: ({ lin, rad }) => `
<g ${B}><path d="M30 78 H70 L76 92 H24Z" fill="${lin([C.metal, C.metalDD])}"/></g>
<path d="M46 80 C42 74 48 70 50 64 C52 70 58 74 54 80Z" fill="${lin([C.yellow, C.orange, C.red])}" transform="translate(0 2)"/>
<g ${B}><path d="M14 44 H86 C86 66 72 80 50 80 C28 80 14 66 14 44Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="44" rx="36" ry="8" fill="${lin([C.metalL, C.metalD])}"/></g>
<ellipse cx="50" cy="44.5" rx="32" ry="6" fill="${lin(["#FBE38A", "#E2AC36"])}"/>
<path d="M26 62 C40 72 60 72 74 62" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>
<path d="M94 8 L58 44" stroke="${C.metalDD}" stroke-width="3" stroke-linecap="round"/>
<g ${B}><rect x="42" y="30" width="16" height="16" rx="3" transform="rotate(-8 50 38)" fill="${lin(["#F6E2B6", "#D8B67A"], "d")}"/></g>
<path d="M44 46 C44 52 50 52 52 46" fill="none" stroke="#F6CF5E" stroke-width="3" stroke-linecap="round"/>` },

  { u: "1f963", n: "bowl with spoon", draw: ({ lin }) => `${bowl(lin, "#FDF8EE")}
<g fill="none" stroke="${C.yellowD}" stroke-width="3.2"><circle cx="30" cy="46" r="3.2"/><circle cx="44" cy="49" r="3.2"/><circle cx="56" cy="45" r="3.2"/><circle cx="68" cy="48" r="3.2"/><circle cx="50" cy="42" r="3"/></g>
<g ${Bs}><path d="M92 10 L66 40" stroke="${C.metalDD}" stroke-width="4" stroke-linecap="round"/><ellipse cx="62" cy="45" rx="10" ry="6.5" transform="rotate(-48 62 45)" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>` },

  { u: "1f957", n: "green salad", draw: ({ lin }) => `${bowl(lin, C.green)}
<g ${B}><path d="M10 46 C4 30 14 22 24 28 C26 12 42 8 48 20 C54 8 70 10 74 24 C86 18 98 30 90 46 C70 54 30 54 10 46Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}><circle cx="32" cy="36" r="6.6" fill="${lin([C.red, C.redD])}"/><circle cx="64" cy="30" r="6.6" fill="${lin([C.red, C.redD])}"/><circle cx="50" cy="46" r="6" fill="${lin([C.red, C.redD])}"/></g>
<g ${Bs}><circle cx="78" cy="42" r="6" fill="${lin(["#E6F3C9", C.green])}"/><circle cx="20" cy="42" r="5.4" fill="${lin(["#E6F3C9", C.green])}"/></g>
<path d="M44 26 q4 -4 8 0 M70 38 q4 4 8 0" stroke="${C.purpleD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<g fill="${C.orange}"><rect x="52" y="22" width="9" height="3.6" rx="1.8" transform="rotate(30 56 24)"/><rect x="22" y="30" width="9" height="3.6" rx="1.8" transform="rotate(-20 26 32)"/></g>` },
];
