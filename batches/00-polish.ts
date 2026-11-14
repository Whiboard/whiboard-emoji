// Redraws that replace an icon from another batch (build.ts lets files named 00-* win).
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const __batch: Icon[] = [
  {
    u: "1f461",
    n: "woman’s sandal",
    draw: ({ lin }) => `<g transform="translate(0 -5)">
<g ${B}><path d="M77 47 L90 44 L88 88 H80Z" fill="${lin([C.wood, C.woodD])}"/></g>
<g ${B}><path d="M6 76 C24 82 40 80 52 66 C61 55 72 45 88 42 Q93 43 91 49 C76 52 68 62 59 73 C46 88 24 90 8 85 Q3 82 6 76Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}>
<path d="M13 80 C14 60 34 58 39 78" fill="none" stroke="${lin([C.pink, C.red, C.redM])}" stroke-width="7" stroke-linecap="round"/>
<path d="M80 45 C68 26 86 14 91 42" fill="none" stroke="${lin([C.pink, C.red, C.redM])}" stroke-width="5.5" stroke-linecap="round"/>
</g>
<g ${Bs}><rect x="70.5" y="24" width="8" height="8" rx="2" transform="rotate(-28 74.5 28)" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M12 81 C28 85 42 82 53 70" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".3"/></g>`,
  },
  {
    u: "1f527",
    n: "wrench",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50) translate(50 50) scale(1.14) translate(-52.5 -50)">
<path fill-rule="evenodd" d="M7 50 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0Z M13 50 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<rect x="25" y="44" width="46" height="12" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<path d="M96.4 43 A16 16 0 1 0 96.4 57 L81 57 Q77 50 81 43Z" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
</g></g>
<g transform="rotate(-45 50 50) translate(50 50) scale(1.14) translate(-52.5 -50)"><rect x="31" y="48.4" width="34" height="3.2" rx="1.6" fill="${C.metalDD}" opacity=".3"/></g>`,
  },
  {
    u: "1fa7c",
    n: "crutch",
    draw: ({ lin }) => `<g transform="translate(-6 3)">
<g ${B}><g transform="rotate(24 50 50)">
<rect x="47.4" y="58" width="5.2" height="32" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
<path d="M36 14 L46.5 62 H53.5 L64 14 H58.6 L50 54 L41.4 14Z" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/>
<rect x="41" y="36" width="18" height="6" rx="3" fill="${lin([C.dark, C.darkD])}"/>
</g></g>
<g ${B}><g transform="rotate(24 50 50)">
<rect x="31" y="4" width="38" height="11" rx="5.5" fill="${lin(["#7A6D75", C.dark, C.darkD])}"/>
<rect x="45.4" y="87" width="9.2" height="9" rx="3" fill="${lin([C.dark, C.darkD])}"/>
<rect x="46" y="56" width="8" height="7" rx="2" fill="${lin([C.metal, C.metalDD])}"/>
</g></g></g>`,
  },
  {
    u: "1faa4",
    n: "mouse trap",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-10 50 50)"><rect x="6" y="28" width="88" height="48" rx="6" fill="${lin([C.woodL, "#D6A066", C.wood], "d")}"/></g></g>
<g transform="rotate(-10 50 50)" stroke="${C.woodD}" stroke-width="1" opacity=".35"><path d="M12 40 H88 M12 64 H88"/></g>
<g ${Bs}><g transform="rotate(-10 50 50)">
<path d="M48 36 H20 a4 4 0 0 0 -4 4 V64 a4 4 0 0 0 4 4 H48" fill="none" stroke="${C.metal}" stroke-width="3.6" stroke-linecap="round"/>
<rect x="44" y="33" width="11" height="38" rx="3" fill="${lin([C.metalL, C.metal, C.metalD], "h")}"/>
<path d="M54 52 L84 37" fill="none" stroke="${C.metalD}" stroke-width="2.6" stroke-linecap="round"/>
</g></g>
<g transform="rotate(-10 50 50)" fill="${C.metalDD}" opacity=".45">${[38, 43, 48, 53, 58, 63].map((y) => `<rect x="44" y="${y}" width="11" height="1.4"/>`).join("")}</g>
<g ${Bs}><g transform="rotate(-10 50 50)">
<rect x="62" y="48" width="24" height="20" rx="2.5" fill="${lin([C.metal, C.metalD])}"/>
<path d="M64 65 L84 53 V66 a2 2 0 0 1 -2 2 H66Z" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/>
</g></g>
<g transform="rotate(-10 50 50)" fill="${C.yellowD}"><circle cx="78" cy="62.6" r="1.6"/><circle cx="72" cy="65" r="1.1"/></g>`,
  },
  {
    u: "1fae7",
    n: "bubbles",
    draw: ({ rad }) => {
      const bubbles = [[40, 60, 27], [74, 31, 16], [22, 22, 10], [80, 76, 9]];
      const glass = rad([[0, "#F4FBFF", 0.62], [0.6, "#B9DCF5", 0.42], [1, "#7FB3E3", 0.62]], 0.36, 0.3, 0.75);
      return `${bubbles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${glass}"/>`).join("")}
<g ${Bs}>${bubbles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#8FBDEB" stroke-width="${r > 12 ? 2.4 : 1.8}"/>`).join("")}</g>
${bubbles.map(([x, y, r]) => `<path d="M${(x - r * 0.62).toFixed(1)} ${(y - r * 0.1).toFixed(1)} A${(r * 0.64).toFixed(1)} ${(r * 0.64).toFixed(1)} 0 0 1 ${(x - r * 0.1).toFixed(1)} ${(y - r * 0.62).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(r * 0.13 + 0.8).toFixed(1)}" stroke-linecap="round" opacity=".85"/><circle cx="${(x + r * 0.42).toFixed(1)}" cy="${(y + r * 0.46).toFixed(1)}" r="${(r * 0.1).toFixed(1)}" fill="#fff" opacity=".6"/>`).join("")}`;
    },
  },
];

export default __batch;
