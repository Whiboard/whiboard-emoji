// food_drink-4: drinks, cutlery, jars.
import { B, Bs, C, star } from "../kit.mjs";

const GF = "#DCECF6";
const GL = "#9EC5DD";
const STEAM = "#8E9DB8";
const steam = (x, y) => `<path d="M${x} ${y} q-4 -4 0 -8 q4 -4 0 -8" fill="none" stroke="${STEAM}" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>`;

// fork / knife in a canonical frame: centred on x=0, spanning y 6..94
const forkP = "M-11 6 H-6 V26 H-2 V6 H2 V26 H6 V6 H11 V28 C11 38 4 40 3.4 46 V89 a3.4 3.4 0 0 1 -6.8 0 V46 C-4 40 -11 38 -11 28Z";
const knifeBlade = "M-5 6 C10 10 12 34 6 54 H-5Z";
const knifeHandle = "M-5 52 H6 V88 a5.5 5.5 0 0 1 -11 0Z";

const mugA = (lin) => `<path d="M14 -6 H19 a5 5 0 0 1 5 5 V12 a5 5 0 0 1 -5 5 H14" fill="none" stroke="${C.goldM}" stroke-width="5"/>
<rect x="-14" y="-22" width="28" height="52" rx="5" fill="${lin(["#FBD468", C.goldM, "#C98A1E"])}"/>`;
const mugF = (lin) => {
  const f = lin([C.paper, C.paperD]);
  return `<rect x="-14" y="-26" width="28" height="10" fill="${f}"/><circle cx="-8" cy="-27" r="8" fill="${f}"/><circle cx="3" cy="-31" r="9" fill="${f}"/><circle cx="11" cy="-26" r="7" fill="${f}"/>`;
};
const mugD = `<rect x="-10" y="-12" width="3.4" height="36" rx="1.7" fill="#fff" opacity=".3"/><circle cx="4" cy="2" r="1.4" fill="#fff" opacity=".6"/><circle cx="8" cy="14" r="1.1" fill="#fff" opacity=".6"/>`;

const flute = (lin, clip) => {
  const d = "M-9 -38 H9 C9 -12 7 4 0 8 C-7 4 -9 -12 -9 -38Z";
  return `<path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="-12" y="-24" width="24" height="40" fill="${lin(["#FBE38A", C.goldM, "#C98A1E"])}"/></g></g>
<circle cx="-2" cy="-10" r="1.3" fill="#fff" opacity=".8"/><circle cx="2" cy="-2" r="1.1" fill="#fff" opacity=".8"/><circle cx="1" cy="-17" r="1" fill="#fff" opacity=".8"/>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2" stroke-linejoin="round"/>
<g ${Bs}><rect x="-1.6" y="8" width="3.2" height="27" fill="${GF}" fill-opacity=".7" stroke="${GL}" stroke-width="1"/><ellipse cx="0" cy="36" rx="11" ry="3" fill="${GF}" fill-opacity=".8" stroke="${GL}" stroke-width="1.2"/></g>
<path d="M-5.5 -32 V-14" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
};

const tallCup = (lin, clip, drink, extra, lid) => {
  const body = "M22 32 H78 L71 90 a3 3 0 0 1 -3 2.5 H32 a3 3 0 0 1 -3 -2.5Z";
  return `<path d="${body}" fill="${GF}" fill-opacity=".34"/>
<g ${B}><g ${clip(`<path d="${body}"/>`)}><rect x="15" y="44" width="70" height="52" fill="${drink}"/></g></g>
${extra}
<path d="${body}" fill="none" stroke="${GL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M30 40 L34 84" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>
${lid}`;
};

export default [
  {
    u: "1f37c",
    n: "baby bottle",
    draw: ({ lin, clip }) => {
      const body = "M32 40 H68 V84 a8 8 0 0 1 -8 8 H40 a8 8 0 0 1 -8 -8Z";
      return `<path d="${body}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${body}"/>`)}><rect x="28" y="52" width="44" height="42" fill="${lin(["#FFFEF6", "#E8DDBF"])}"/></g></g>
<path d="M32 58 h9 M32 68 h5 M32 78 h9" stroke="${C.blueM}" stroke-width="1.8" opacity=".8"/>
<path d="${body}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M38 46 V82" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>
<g ${B}><path d="M41 31 C41 18 45 8 50 8 C55 8 59 18 59 31Z" fill="${lin(["#F7DEB4", "#D9AE78"], "h")}"/>
<rect x="29" y="30" width="42" height="13" rx="4" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<rect x="34" y="33" width="32" height="2.4" rx="1.2" fill="#fff" opacity=".3"/>`;
    },
  },
  {
    u: "1f95b",
    n: "glass of milk",
    draw: ({ lin, clip }) => {
      const body = "M24 16 H76 L70 86 a5 5 0 0 1 -5 5 H35 a5 5 0 0 1 -5 -5Z";
      return `<path d="${body}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${body}"/>`)}><rect x="20" y="28" width="60" height="66" fill="${lin(["#FFFEF6", "#EFE5C8", "#D9CBA3"])}"/></g></g>
<ellipse cx="50" cy="28" rx="25" ry="3.2" fill="#fff" opacity=".7"/>
<path d="${body}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M33 34 L37 80" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".6"/>
<rect x="31" y="80" width="38" height="5" rx="2" fill="${GL}" opacity=".35"/>`;
    },
  },
  {
    u: "2615",
    n: "hot beverage",
    draw: ({ lin }) => `
<g ${B}><ellipse cx="50" cy="85" rx="40" ry="8" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${B}><path d="M70 48 C92 44 92 70 66 70" fill="none" stroke="${C.paperD}" stroke-width="6"/>
<path d="M16 42 V58 C16 74 30 85 46 85 C62 85 74 74 74 58 V42Z" fill="${lin([C.paper, C.paperD, C.creamD], "h")}"/>
<ellipse cx="45" cy="42" rx="29" ry="7.5" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M16.5 56 Q45 68 73.5 56" fill="none" stroke="${C.blueM}" stroke-width="3.4"/>
<ellipse cx="45" cy="42" rx="25" ry="5.4" fill="${lin(["#8A5A36", "#5E361C"])}"/>
<ellipse cx="38" cy="41" rx="8" ry="1.6" fill="#fff" opacity=".25"/>
${steam(34, 30)}${steam(47, 28)}${steam(60, 30)}`,
  },
  {
    u: "1fad6",
    n: "teapot",
    draw: ({ lin }) => `<g transform="translate(0 -5)">
<g ${B}><path d="M26 72 C14 72 14 52 6 44 L12 38 C26 46 32 54 34 62Z" fill="${lin([C.blue, C.blueD], "d")}"/>
<path d="M76 46 C98 42 98 80 74 78" fill="none" stroke="${C.blueD}" stroke-width="6.5"/></g>
<g ${B}><rect x="32" y="82" width="36" height="9" rx="3" fill="${lin([C.blueM, C.navyD])}"/>
<ellipse cx="50" cy="62" rx="29" ry="24" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M22 56 Q50 67 78 56" fill="none" stroke="${C.paper}" stroke-width="3.2"/>
<g fill="${C.paper}"><circle cx="38" cy="70" r="2.4"/><circle cx="50" cy="73" r="2.4"/><circle cx="62" cy="70" r="2.4"/></g>
<ellipse cx="36" cy="52" rx="4" ry="8" transform="rotate(25 36 52)" fill="#fff" opacity=".3"/>
<g ${B}><path d="M33 40 C33 28 67 28 67 40Z" fill="${lin([C.paper, C.creamD])}"/><circle cx="50" cy="26" r="5" fill="${lin([C.paper, C.creamD], "d")}"/></g></g>`,
  },
  {
    u: "1f375",
    n: "teacup without handle",
    draw: ({ lin }) => `
<g ${B}><rect x="36" y="85" width="28" height="7" rx="3" fill="${lin([C.paperD, C.creamD])}"/>
<path d="M18 40 H82 V54 C82 76 68 87 50 87 C32 87 18 76 18 54Z" fill="${lin([C.paper, C.paperD, C.creamD], "h")}"/>
<ellipse cx="50" cy="40" rx="32" ry="8" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M18.5 56 Q50 68 81.5 56" fill="none" stroke="${C.blueM}" stroke-width="3.4"/>
<g fill="${C.blueM}"><circle cx="34" cy="72" r="2"/><circle cx="50" cy="76" r="2"/><circle cx="66" cy="72" r="2"/></g>
<ellipse cx="50" cy="40" rx="28" ry="6" fill="${lin(["#C2D879", "#8DAE55"])}"/>
<ellipse cx="42" cy="39" rx="9" ry="1.7" fill="#fff" opacity=".3"/>
${steam(38, 29)}${steam(52, 27)}${steam(65, 29)}`,
  },
  {
    u: "1f376",
    n: "sake",
    draw: ({ lin }) => `
<g ${B}><path d="M10 40 C10 32 19 30 20 22 V14 H32 V22 C33 30 42 32 42 40 V82 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8Z" fill="${lin([C.blue, C.blueM, C.blueD], "h")}"/>
<rect x="16" y="10" width="20" height="7" rx="3" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><rect x="10" y="48" width="32" height="22" fill="${lin([C.paper, C.paperD])}"/></g>
<circle cx="26" cy="59" r="5.5" fill="${C.redM}"/>
<path d="M16 34 V46" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".35"/>
<g ${B}><path d="M52 60 H90 C90 77 82 90 71 90 C60 90 52 77 52 60Z" fill="${lin([C.paper, C.paperD, C.creamD], "d")}"/></g>
<ellipse cx="71" cy="60" rx="19" ry="4.6" fill="${lin(["#E4F0F0", "#B9D8DC"])}"/>
<path d="M53 70 Q71 77 89 70" fill="none" stroke="${C.blueM}" stroke-width="3"/>`,
  },
  {
    u: "1f37e",
    n: "bottle with popping cork",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(32 40 60)">
<path d="M28 44 C28 36 35 34 35 24 V14 H45 V24 C45 34 52 36 52 44 V86 a6 6 0 0 1 -6 6 H34 a6 6 0 0 1 -6 -6Z" fill="${lin([C.greenD, C.greenM, C.greenD], "h")}"/>
<rect x="33.5" y="9" width="13" height="6" rx="2" fill="${lin([C.gold, C.goldD])}"/>
<rect x="34.5" y="15" width="11" height="16" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/></g></g>
<g transform="rotate(32 40 60)"><rect x="29" y="58" width="22" height="19" rx="2" fill="${C.paper}"/><circle cx="40" cy="67.5" r="4.6" fill="${C.goldM}"/><rect x="31" y="46" width="3" height="36" rx="1.5" fill="#fff" opacity=".25"/></g>
<g ${B}><g transform="rotate(32 77 11)"><rect x="72.5" y="4" width="9" height="13" rx="2.5" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g></g>
<g ${B}><circle cx="67" cy="19" r="4" fill="${C.paper}"/><circle cx="72" cy="24" r="3.4" fill="${C.paper}"/><circle cx="63" cy="23" r="3" fill="${C.paper}"/></g>
<circle cx="80" cy="30" r="1.8" fill="${C.skyD}"/><circle cx="86" cy="22" r="1.5" fill="${C.skyD}"/><circle cx="58" cy="12" r="1.6" fill="${C.skyD}"/>`,
  },
  {
    u: "1f377",
    n: "wine glass",
    draw: ({ lin, clip }) => {
      const d = "M28 10 H72 C74 40 68 58 50 58 C32 58 26 40 28 10Z";
      return `<path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="24" y="28" width="52" height="34" fill="${lin(["#C2453F", C.redD, "#7D1F2A"])}"/></g></g>
<ellipse cx="50" cy="28" rx="22" ry="2.6" fill="#E88A82" opacity=".7"/>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M34 16 C34 32 37 42 41 49" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
<g ${Bs}><rect x="48" y="58" width="4" height="27" fill="${GF}" fill-opacity=".75" stroke="${GL}" stroke-width="1"/>
<ellipse cx="50" cy="88" rx="19" ry="4.6" fill="${GF}" fill-opacity=".85" stroke="${GL}" stroke-width="1.2"/></g>`;
    },
  },
  {
    u: "1f378",
    n: "cocktail glass",
    draw: ({ lin, clip, rad }) => {
      const d = "M8 16 H92 L50 58Z";
      return `<path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="4" y="26" width="92" height="36" fill="${lin(["#EEF5BC", "#BCD67E"])}"/></g></g>
<g ${Bs}><ellipse cx="54" cy="38" rx="7" ry="5.6" fill="${rad([C.green, C.greenD])}"/></g>
<circle cx="57" cy="38" r="2.2" fill="${C.redM}"/>
<path d="M28 6 L68 46" stroke="${C.woodD}" stroke-width="2.6" stroke-linecap="round"/>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M18 21 L40 43" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".5"/>
<g ${Bs}><rect x="48.4" y="58" width="3.2" height="26" fill="${GF}" fill-opacity=".75" stroke="${GL}" stroke-width="1"/>
<ellipse cx="50" cy="88" rx="19" ry="4.6" fill="${GF}" fill-opacity=".85" stroke="${GL}" stroke-width="1.2"/></g>`;
    },
  },
  {
    u: "1f379",
    n: "tropical drink",
    draw: ({ lin, clip, rad }) => {
      const d = "M20 32 H80 C80 54 66 62 58 66 V80 H68 V88 H32 V80 H42 V66 C34 62 20 54 20 32Z";
      return `<path d="M46 50 L40 6" stroke="${C.tealM}" stroke-width="4.4" stroke-linecap="round"/>
<path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="16" y="40" width="68" height="34" fill="${lin(["#FCD05A", C.orange, "#E8654F"])}"/></g></g>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M27 38 C27 48 32 54 38 58" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5" fill="none"/>
<g ${B}><path d="M12 32 A15 15 0 0 1 42 32Z" fill="${lin([C.yellow, C.yellowM])}"/></g>
<path d="M18 32 A9 9 0 0 1 36 32" fill="none" stroke="${C.yellowD}" stroke-width="1.5" opacity=".7"/>
<path d="M66 18 L60 50" stroke="${C.woodD}" stroke-width="2" stroke-linecap="round"/>
<g ${B}><path d="M50 18 A16 12 0 0 1 82 18 Q74 13 66 18 Q58 13 50 18Z" fill="${lin([C.pink, C.pinkD])}"/></g>
<g ${Bs}><circle cx="72" cy="30" r="5" fill="${rad([C.red, C.redD])}"/></g>`;
    },
  },
  {
    u: "1f37a",
    n: "beer mug",
    draw: ({ lin }) => `
<g ${B}><path d="M64 38 H77 a9 9 0 0 1 9 9 V67 a9 9 0 0 1 -9 9 H64" fill="none" stroke="${C.goldM}" stroke-width="7"/>
<rect x="12" y="24" width="52" height="66" rx="8" fill="${lin(["#FBD468", C.goldM, "#C98A1E"])}"/>
<path d="M10 32 C6 16 20 8 28 14 C34 6 50 6 54 14 C66 12 70 26 64 34Z" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="20" y="40" width="5.5" height="44" rx="2.7" fill="#fff" opacity=".3"/>
<rect x="12" y="80" width="52" height="9" rx="4" fill="#fff" opacity=".13"/>
<g fill="#fff" opacity=".6"><circle cx="40" cy="50" r="2"/><circle cx="50" cy="62" r="1.6"/><circle cx="36" cy="70" r="1.5"/><circle cx="48" cy="44" r="1.2"/></g>`,
  },
  {
    u: "1f37b",
    n: "clinking beer mugs",
    draw: ({ lin }) => `
<g ${B}><g transform="translate(33 62) rotate(10) scale(-1 1)">${mugA(lin)}</g></g>
<g ${B}><g transform="translate(67 62) rotate(-10)">${mugA(lin)}</g></g>
<g transform="translate(33 62) rotate(10) scale(-1 1)">${mugD}</g><g transform="translate(67 62) rotate(-10)">${mugD}</g>
<g ${B}><g transform="translate(33 62) rotate(10) scale(-1 1)">${mugF(lin)}</g></g>
<g ${B}><g transform="translate(67 62) rotate(-10)">${mugF(lin)}</g></g>
<circle cx="50" cy="16" r="2" fill="${C.skyD}"/><circle cx="43" cy="9" r="1.6" fill="${C.skyD}"/><circle cx="58" cy="10" r="1.6" fill="${C.skyD}"/>`,
  },
  {
    u: "1f942",
    n: "clinking glasses",
    draw: ({ lin, clip }) => `
<g transform="translate(36 56) rotate(18)">${flute(lin, clip)}</g>
<g transform="translate(64 56) rotate(-18)">${flute(lin, clip)}</g>
<g ${Bs}><polygon points="${star(50, 14, 7, 2.6, 4)}" fill="${lin(["#FFF3BF", C.gold])}"/><polygon points="${star(36, 8, 3.6, 1.4, 4)}" fill="${C.gold}"/><polygon points="${star(64, 8, 3.6, 1.4, 4)}" fill="${C.gold}"/></g>`,
  },
  {
    u: "1f943",
    n: "tumbler glass",
    draw: ({ lin, clip }) => {
      const d = "M9 20 H91 L84 86 a5 5 0 0 1 -5 5 H21 a5 5 0 0 1 -5 -5Z";
      return `<g transform="translate(0 -5)"><path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="5" y="34" width="90" height="60" fill="${lin(["#EDB254", "#C27A24", "#8F5217"])}"/></g></g>
<ellipse cx="50" cy="34" rx="37" ry="3.4" fill="#F6D18A" opacity=".7"/>
<g ${B}><g transform="rotate(-14 42 54)"><rect x="28" y="40" width="28" height="28" rx="6" fill="${lin(["#F2FAFE", "#B4D8EC"], "d")}" fill-opacity=".9"/></g>
<g transform="rotate(18 67 65)"><rect x="58" y="56" width="19" height="19" rx="5" fill="${lin(["#F2FAFE", "#B4D8EC"], "d")}" fill-opacity=".9"/></g></g>
<rect x="22" y="78" width="56" height="7" rx="3" fill="#fff" opacity=".18"/>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M19 30 L23 76" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".5"/></g>`;
    },
  },
  {
    u: "1fad7",
    n: "pouring liquid",
    draw: ({ lin, clip }) => {
      const d = "M-17 -28 H17 L13 28 H-13Z";
      const w = lin(["#B4DEF6", "#5DA6DB"]);
      return `<g transform="translate(-6 0)"><g ${B}><ellipse cx="48" cy="90" rx="30" ry="6" fill="${w}"/>
<path d="M47 67 L58 64 C56 74 56 82 55 90 H41 C45 82 46 74 47 67Z" fill="${w}"/></g>
<g transform="translate(64 36) rotate(-130)"><path d="${d}" fill="${GF}" fill-opacity=".3"/>
<g ${B}><g ${clip(`<path d="${d}"/>`)}><rect x="-20" y="-30" width="40" height="26" fill="${w}"/></g></g>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M-9 -4 L-7 22" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/></g>
<path d="M44 84 Q46 76 47 70" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6" fill="none"/>
<circle cx="24" cy="80" r="2.2" fill="#8EC6EA"/><circle cx="74" cy="82" r="1.8" fill="#8EC6EA"/></g>`;
    },
  },
  {
    u: "1f964",
    n: "cup with straw",
    draw: ({ lin, clip }) =>
      `<path d="M56 46 L63 8 L74 5" fill="none" stroke="${C.red}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>` +
      tallCup(lin, clip, lin(["#F7A15A", C.orange, "#E0663F"]), "", `<g ${B}><rect x="19" y="26" width="62" height="8" rx="3.5" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M56 46 L63 8 L74 5" fill="none" stroke="${C.paper}" stroke-width="4.4" stroke-dasharray="4 4" stroke-linecap="butt" opacity=".75"/>`),
  },
  {
    u: "1f9cb",
    n: "bubble tea",
    draw: ({ lin, clip }) => {
      const pearls = [[34, 85], [44, 87], [54, 86], [64, 84], [39, 77], [50, 78], [60, 76], [45, 69], [55, 68]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.3" fill="${C.dark}"/><circle cx="${x - 1.4}" cy="${y - 1.4}" r="1.1" fill="#fff" opacity=".5"/>`)
        .join("");
      return (
        tallCup(lin, clip, lin(["#E8CBA0", "#C9996A", "#A87648"]), pearls, `<path d="M20 32 C22 14 78 14 80 32Z" fill="${GF}" fill-opacity=".5" stroke="${GL}" stroke-width="2"/>
<g ${B}><rect x="19" y="29" width="62" height="6" rx="3" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><path d="M57 58 L67 8" stroke="${C.pinkD}" stroke-width="6.5"/></g>`)
      );
    },
  },
  {
    u: "1f9c3",
    n: "beverage box",
    draw: ({ lin, rad }) => `
<g ${B}>
<polygon points="20,36 62,36 78,27 36,27" fill="${lin(["#FCE0A0", "#F5C072"])}"/>
<polygon points="62,36 78,27 78,83 62,92" fill="${lin([C.orangeD, "#A8601F"])}"/>
<rect x="20" y="36" width="42" height="56" fill="${lin(["#FAC27A", C.orange, C.orangeD], "d")}"/></g>
<g ${Bs}><path d="M50 31 L55 8 L68 5" fill="none" stroke="${C.blueM}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
<circle cx="41" cy="63" r="14" fill="${C.paper}"/>
<g ${Bs}><circle cx="41" cy="64" r="9" fill="${rad([C.yellow, C.orange, C.orangeD])}"/></g>
<path d="M41 55 q1 -4 5 -5 q0 4 -5 5Z" fill="${C.greenM}"/>
<path d="M24 40 H58" stroke="#fff" stroke-width="2" opacity=".3"/>`,
  },
  {
    u: "1f9c9",
    n: "mate",
    draw: ({ lin }) => `
<g ${B}><path d="M22 40 C18 70 32 92 50 92 C68 92 82 70 78 40Z" fill="${lin(["#C48C55", "#935F34", "#6B4324"], "d")}"/>
<ellipse cx="50" cy="40" rx="30" ry="7.5" fill="${lin([C.metalL, C.metalD])}"/></g>
<path d="M21.5 60 Q50 72 78.5 60" fill="none" stroke="${C.gold}" stroke-width="4"/>
<ellipse cx="50" cy="40" rx="25.5" ry="5.2" fill="#4E6B2B"/>
<g ${B}><path d="M24 40 C28 26 40 24 50 28 C60 24 72 26 76 40 C66 44 34 44 24 40Z" fill="${lin(["#A5BF6C", "#6E8F3E"])}"/></g>
<path d="M30 74 C32 80 36 84 40 86" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".3" fill="none"/>
<g ${Bs}><path d="M46 36 L77 9" stroke="${C.metal}" stroke-width="3.6" stroke-linecap="round"/><circle cx="78" cy="8" r="4.2" fill="${lin([C.metalL, C.metalD], "d")}"/></g>`,
  },
  {
    u: "1f9ca",
    n: "ice",
    draw: ({ lin }) => `
<g ${B}>
<polygon points="50,10 88,29 50,48 12,29" fill="${lin(["#F6FCFF", "#BCE0F3"], "d")}"/>
<polygon points="12,29 50,48 50,92 12,72" fill="${lin(["#B4DAEF", "#7DB5D8"])}"/>
<polygon points="88,29 50,48 50,92 88,72" fill="${lin(["#8FC0E0", "#5D93BF"])}"/></g>
<path d="M50 10 L88 29 L88 72 L50 92 L12 72 L12 29Z" fill="none" stroke="#6FA6CB" stroke-width="1.6" stroke-linejoin="round" opacity=".7"/>
<polygon points="50,18 72,29 50,40 28,29" fill="#fff" opacity=".4"/>
<path d="M19 40 V62" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
<g fill="#fff" opacity=".6"><circle cx="66" cy="62" r="2.4"/><circle cx="74" cy="52" r="1.6"/><circle cx="62" cy="75" r="1.5"/></g>`,
  },
  {
    u: "1f962",
    n: "chopsticks",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50) translate(50 50) scale(.94) translate(-50 -50)">
<polygon points="-8,46 -8,48.4 108,42.5 108,36.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<polygon points="-8,54 -8,51.6 108,57.5 108,63.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<polygon points="82,38.63 108,36.5 108,42.5 82,43.82" fill="${lin([C.red, C.redD])}"/>
<polygon points="82,61.37 108,63.5 108,57.5 82,56.18" fill="${lin([C.red, C.redD])}"/>
</g></g>
<g transform="rotate(-45 50 50) translate(50 50) scale(.94) translate(-50 -50)" fill="${C.gold}"><polygon points="81,38.5 83.4,38.3 83.4,43.9 81,44"/><polygon points="81,61.5 83.4,61.7 83.4,56.1 81,56"/></g>`,
  },
  {
    u: "1f37d-fe0f",
    n: "fork and knife with plate",
    draw: ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="50" r="28" fill="${rad([C.paper, C.paperD, C.creamD], 0.36, 0.3, 0.85)}"/></g>
<circle cx="50" cy="50" r="22" fill="none" stroke="${C.blueM}" stroke-width="2.4"/>
<g ${Bs}><circle cx="50" cy="50" r="17" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<ellipse cx="42" cy="42" rx="5" ry="2.6" transform="rotate(-40 42 42)" fill="#fff" opacity=".5"/>
<g ${B}><path transform="translate(14 0) scale(.7 1)" d="${forkP}" fill="${lin([C.metalD, C.metalL, C.metal, C.metalD], "h")}"/></g>
<g ${B}><g transform="translate(86 0) scale(.7 1)"><path d="${knifeBlade}" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/><path d="${knifeHandle}" fill="${lin([C.metalD, C.metalL, C.metal, C.metalD], "h")}"/></g></g>`,
  },
  {
    u: "1f374",
    n: "fork and knife",
    draw: ({ lin }) => {
      const m = lin([C.metalD, C.metalL, C.metal, C.metalD], "h");
      return `<g ${B}><g transform="rotate(-38 50 50) translate(50 50) scale(1.14) translate(0 -50)"><path d="${forkP}" fill="${m}"/></g></g>
<g ${B}><g transform="rotate(38 50 50) translate(50 50) scale(1.14) translate(0 -50)"><path d="${knifeBlade}" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/><path d="${knifeHandle}" fill="${m}"/></g></g>`;
    },
  },
  {
    u: "1f944",
    n: "spoon",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(42 50 50) translate(50 50) scale(1.12) translate(0 -50)">
<path d="M-3 38 L-4.2 88 a4.2 4.2 0 0 0 8.4 0 L3 38Z" fill="${lin([C.metalD, C.metalL, C.metal, C.metalD], "h")}"/>
<ellipse cx="0" cy="22" rx="15" ry="19" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g></g>
<g transform="rotate(42 50 50) translate(50 50) scale(1.12) translate(0 -50)"><ellipse cx="0" cy="23" rx="10.5" ry="14" fill="${C.metalD}" opacity=".35"/><ellipse cx="-3" cy="18" rx="4" ry="7" fill="#fff" opacity=".5"/></g>`,
  },
  {
    u: "1f52a",
    n: "kitchen knife",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(45 50 50) translate(50 50) scale(1.1) translate(0 -50)">
<path d="M-9 4 C12 20 14 44 10 66 H-9Z" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
<rect x="-9" y="64" width="19" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>
<rect x="-7" y="68" width="15" height="28" rx="5" fill="${lin([C.woodD, C.woodDD], "h")}"/></g></g>
<g transform="rotate(45 50 50) translate(50 50) scale(1.1) translate(0 -50)"><circle cx="0.5" cy="76" r="2" fill="${C.gold}"/><circle cx="0.5" cy="87" r="2" fill="${C.gold}"/><path d="M-5 14 C-5 30 -5 46 -5 60" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5" fill="none"/></g>`,
  },
  {
    u: "1fad9",
    n: "jar",
    draw: ({ lin }) => {
      const d = "M28 28 H72 C72 34 78 36 78 44 V84 a8 8 0 0 1 -8 8 H30 a8 8 0 0 1 -8 -8 V44 C22 36 28 34 28 28Z";
      return `<path d="${d}" fill="${GF}" fill-opacity=".34"/>
<rect x="26" y="78" width="48" height="8" rx="4" fill="#fff" opacity=".2"/>
<path d="${d}" fill="none" stroke="${GL}" stroke-width="2.6" stroke-linejoin="round"/>
<g ${Bs}><rect x="30" y="50" width="40" height="24" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M35 58 H65 M35 65 H56" stroke="${C.blueM}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
<path d="M29 40 L28 82" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".55"/>
<g ${B}><rect x="22" y="10" width="56" height="18" rx="5" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<path d="M32 13 V25 M40 13 V25 M48 13 V25 M56 13 V25 M64 13 V25 M72 13 V25" stroke="${C.goldD}" stroke-width="1.2" opacity=".5"/>`;
    },
  },
  {
    u: "1f3fa",
    n: "amphora",
    draw: ({ lin }) => {
      const clay = lin(["#E69552", C.orangeD, "#A8561F"], "h");
      return `<g ${B}><path d="M38 22 C16 20 12 42 28 46 M62 22 C84 20 88 42 72 46" fill="none" stroke="${C.orangeD}" stroke-width="5.5" stroke-linecap="round"/>
<path d="M34 12 H66 C64 22 62 26 68 36 C84 48 80 78 64 86 L62 91 H38 L36 86 C20 78 16 48 32 36 C38 26 36 22 34 12Z" fill="${clay}"/>
<ellipse cx="50" cy="12" rx="17" ry="4.6" fill="${lin(["#F0A664", C.orangeD])}"/></g>
<ellipse cx="50" cy="12" rx="12" ry="2.6" fill="#7A3F1C"/>
<path d="M20.5 56 Q50 63 79.5 56 V62 Q50 69 20.5 62Z" fill="${C.darkD}" opacity=".85"/>
<path d="M22 66 Q50 73 78 66" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-dasharray="3 2.4" opacity=".7"/>
<path d="M30 50 C24 58 24 70 30 78" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".28"/>
<g fill="${C.darkD}" opacity=".85"><polygon points="${star(50, 44, 6, 2.6, 5)}"/></g>`;
    },
  },
];
