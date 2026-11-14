import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const M = (lin) => lin([C.metalL, C.metal, C.metalD]);
const wheel = (lin, x, y, r) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.dark}"/><circle cx="${x}" cy="${y}" r="${(r * 0.45).toFixed(1)}" fill="${lin([C.metalL, C.metalD])}"/>`;

// hourglass: top / bottom = sand fill state
const hourglass = (full) => ({ lin, clip }) => {
  const glass = "M30 16 H70 C70 36 56 42 54 50 C56 58 70 64 70 84 H30 C30 64 44 58 46 50 C44 42 30 36 30 16Z";
  const sand = lin([C.gold, C.goldM, C.goldD]);
  const inner = full
    ? `<path d="M30 84 H70 C69 72 60 66 50 61 C40 66 31 72 30 84Z" fill="${sand}"/>`
    : `<path d="M31 17 H69 C68 29 58 36 50 41 C42 36 32 29 31 17Z" fill="${sand}"/><path d="M49.2 44 H50.8 V70 H49.2Z" fill="${C.goldM}"/><path d="M30 84 H70 C69 78 60 76 50 70 C40 76 31 78 30 84Z" fill="${sand}"/>`;
  return `<g ${B}><path d="${glass}" fill="${lin([[0, "#DCEEF8", 0.9], [1, C.skyD, 0.9]], "d")}"/></g>
<g ${clip(`<path d="${glass}"/>`)}><g ${Bs}>${inner}</g></g>
<path d="M34 20 C34 30 40 36 47 42" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>
<g ${B}><rect x="20" y="7" width="60" height="9" rx="3.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/><rect x="20" y="84" width="60" height="9" rx="3.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>`;
};

// traffic light housing
const light = (horiz) => ({ lin, rad }) => {
  const cols = [[C.red, C.redD], [C.yellow, C.yellowD], [C.green, C.greenD]];
  const lamps = cols
    .map(([a, b], i) => {
      const [x, y] = horiz ? [27 + i * 23, 50] : [50, 26 + i * 24];
      return `<circle cx="${x}" cy="${y}" r="9" fill="${C.darkD}"/><circle cx="${x}" cy="${y}" r="7.4" fill="${rad([a, b])}"/><ellipse cx="${x - 2.3}" cy="${y - 2.8}" rx="2.4" ry="1.5" fill="#fff" opacity=".5"/>`;
    })
    .join("");
  const body = horiz
    ? `<rect x="6" y="30" width="88" height="40" rx="20" fill="${lin(["#7A8AB8", C.navy, C.navyD])}"/>`
    : `<rect x="26" y="5" width="48" height="76" rx="18" fill="${lin(["#7A8AB8", C.navy, C.navyD], "d")}"/>`;
  const post = horiz ? "" : `<g ${B}><rect x="45" y="80" width="10" height="14" fill="${M(lin)}"/><rect x="34" y="90" width="32" height="5" rx="2.5" fill="${lin([C.metal, C.metalDD])}"/></g>`;
  return `${post}<g ${B}>${body}</g><g ${Bs}>${lamps}</g>`;
};

// boats
const waves = (lin, y = 80) =>
  `<g ${Bs}><path d="M4 ${y} C14 ${y - 5} 22 ${y + 5} 32 ${y} C42 ${y - 5} 50 ${y + 5} 60 ${y} C70 ${y - 5} 78 ${y + 5} 88 ${y} L96 ${y - 3} V${y + 10} Q50 ${y + 14} 4 ${y + 10}Z" fill="${lin([C.skyD, C.blueM])}" opacity=".95"/></g>`;
const portholes = (xs, y) => xs.map((x) => `<circle cx="${x}" cy="${y}" r="2" fill="${C.blueD}"/>`).join("");

// flying: side-view plane facing right, tilt in degrees
const plane = (lin, rot, tx = 0, ty = 0) => {
  const body = lin([C.metalL, C.metal, C.metalD]);
  return `<g ${B}><g transform="translate(${tx} ${ty}) rotate(${rot} 50 50)">
<path d="M12 40 L27 24 H36 L28 48Z" fill="${lin([C.red, C.redD], "d")}"/>
<path d="M8 50 C8 41 22 40 40 40 H70 C84 40 93 46 93 52 C93 58 84 60 70 60 H24 C14 60 8 56 8 50Z" fill="${lin([C.paper, C.paperD, "#B9AC8C"])}"/>
<path d="M38 52 L58 52 L44 84 H33Z" fill="${body}"/>
<path d="M42 44 L58 44 L48 20 H41Z" fill="${lin([C.metalL, C.metal])}"/>
</g></g>
<g transform="translate(${tx} ${ty}) rotate(${rot} 50 50)"><path d="M78 43 C84 43 89 46 91 50 H76Z" fill="${C.blueM}"/><g fill="${C.blueD}">${[24, 32, 40, 48, 56, 64].map((x) => `<circle cx="${x}" cy="49" r="1.6"/>`).join("")}</g></g>`;
};

// rail cabin hanging (suspension / cable)
const cabin = (lin, x, y, w, h, c) =>
  `<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${lin(c)}"/></g><rect x="${x + 5}" y="${y + 6}" width="${w - 10}" height="${(h * 0.38).toFixed(1)}" rx="3" fill="${lin([C.sky, C.skyD])}"/><path d="M${x + w / 2} ${y + 6} v${(h * 0.38).toFixed(1)}" stroke="${C.paper}" stroke-width="1.4"/>`;

const adj = (draw, k, dx = 0, dy = 0) => (a) => `<g transform="translate(${(50 - 50 * k + dx).toFixed(2)} ${(50 - 50 * k + dy).toFixed(2)}) scale(${k})">${draw(a)}</g>`;
const FIT = {"26fd":[.96,-4,0],"1f6d1":[.95,0,2],"1f6f6":[1,0,8],"1f6a4":[.92,-2,-15],"1f6f3-fe0f":[.93,0,-1],"1f6a2":[.93,0,-2],"1f6e5-fe0f":[1,0,-5],"2708-fe0f":[1.12,6.7,-6.7],"1fa82":[.94,0,-1],"1f6a0":[.93,0,-3],"1f680":[1.1,8,-8],"1f6f8":[1,0,-8],"1f69f":[1,0,6]};
const LIST = [
  {
    u: "26fd",
    n: "fuel pump",
    draw: ({ lin }) => `
<g ${B}><path d="M70 30 H78 a8 8 0 0 1 8 8 V66 a5 5 0 0 0 10 0 V40 L84 24" fill="none" stroke="${C.dark}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><rect x="10" y="88" width="62" height="6" rx="3" fill="${lin([C.metal, C.metalDD])}"/><path d="M16 88 V14 a7 7 0 0 1 7 -7 H55 a7 7 0 0 1 7 7 V88Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><rect x="22" y="15" width="34" height="24" rx="3" fill="${lin([C.sky, C.skyD])}"/></g>
<rect x="27" y="22" width="24" height="9" rx="1.5" fill="${C.greenD}" opacity=".75"/>
<g ${Bs}><rect x="24" y="48" width="30" height="20" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="29" y="54" width="20" height="3" rx="1.5" fill="${C.redM}"/><rect x="29" y="60" width="13" height="3" rx="1.5" fill="${C.dark}" opacity=".5"/>
<g ${Bs}><path d="M62 42 H72 V30 H66 a4 4 0 0 0 -4 4Z" fill="${lin([C.metal, C.metalDD])}"/></g>`,
  },
  {
    u: "1f6de",
    n: "wheel",
    draw: ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="50" r="42" fill="${rad(["#8A7C84", C.dark, C.darkD], 0.36, 0.3, 0.9)}"/></g>
<circle cx="50" cy="50" r="36" fill="none" stroke="${C.darkD}" stroke-width="3.4" stroke-dasharray="6 4" opacity=".6"/>
<g ${B}><circle cx="50" cy="50" r="28" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${Bs}><circle cx="50" cy="50" r="22" fill="${lin([C.metalD, C.metalDD], "d")}"/></g>
<g stroke="${C.metalL}" stroke-width="5" stroke-linecap="round">${[0, 72, 144, 216, 288].map((a) => `<path d="M50 31 V50" transform="rotate(${a} 50 50)"/>`).join("")}</g>
<g ${Bs}><circle cx="50" cy="50" r="9" fill="${lin([C.metalL, C.metalD], "d")}"/></g>
<circle cx="50" cy="50" r="3" fill="${C.metalDD}"/>`,
  },
  {
    u: "1f6a8",
    n: "police car light",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="14" y="78" width="72" height="14" rx="5" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><path d="M22 78 V54 C22 30 34 20 50 20 C66 20 78 30 78 54 V78Z" fill="${lin([[0, "#F7968E"], [0.5, C.redM], [0.5, C.blue], [1, C.blueD]], "h")}"/></g>
<path d="M50 20 V78" stroke="${C.paper}" stroke-width="2" opacity=".8"/>
<ellipse cx="34" cy="42" rx="4" ry="10" transform="rotate(14 34 42)" fill="#fff" opacity=".45"/>
<g ${Bs}><rect x="30" y="68" width="40" height="11" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<g stroke="${C.redM}" stroke-width="4" stroke-linecap="round"><path d="M12 36 L20 42 M22 12 L28 22"/></g>
<g stroke="${C.blueM}" stroke-width="4" stroke-linecap="round"><path d="M88 36 L80 42 M78 12 L72 22"/></g>
<path d="M50 6 V13" stroke="${C.goldM}" stroke-width="4" stroke-linecap="round"/>`,
  },
  { u: "1f6a5", n: "horizontal traffic light", draw: light(true) },
  { u: "1f6a6", n: "vertical traffic light", draw: light(false) },
  {
    u: "1f6d1",
    n: "stop sign",
    draw: ({ lin }) => {
      const oct = (r, cx, cy) => Array.from({ length: 8 }, (_, i) => `${(cx + r * Math.cos(((22.5 + i * 45) * Math.PI) / 180)).toFixed(1)},${(cy + r * Math.sin(((22.5 + i * 45) * Math.PI) / 180)).toFixed(1)}`).join(" ");
      return `<g ${B}><rect x="44.5" y="70" width="11" height="24" fill="${M(lin)}"/></g>
<g ${B}><polygon points="${oct(47, 50, 45)}" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<g ${B}><polygon points="${oct(41, 50, 45)}" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g fill="none" stroke="${C.paper}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M33 45 H67"/><path d="M34 31 H66 M34 59 H66" stroke-width="2" opacity=".7"/></g>`;
    },
  },
  {
    u: "1f6a7",
    n: "construction",
    draw: ({ lin }) => {
      const stripes = (x, y, w) =>
        Array.from({ length: Math.ceil(w / 14) + 1 }, (_, i) => `<path d="M${x + i * 14 - 2} ${y + 16} L${x + i * 14 + 8} ${y} h6 L${x + i * 14 - 2 + 14} ${y + 16}Z"/>`).join("");
      return `<g ${B}><rect x="14" y="22" width="9" height="70" rx="2" fill="${lin([C.metal, C.metalDD], "h")}"/><rect x="77" y="22" width="9" height="70" rx="2" fill="${lin([C.metal, C.metalDD], "h")}"/></g>
<g ${B}><rect x="6" y="14" width="88" height="17" rx="3" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><rect x="6" y="40" width="88" height="17" rx="3" fill="${lin([C.orange, C.orangeD])}"/></g>
<g fill="${C.paper}">${[0, 1, 2, 3, 4, 5].map((i) => `<polygon points="${10 + i * 15},31 ${17 + i * 15},14 ${22 + i * 15},14 ${15 + i * 15},31"/><polygon points="${10 + i * 15},57 ${17 + i * 15},40 ${22 + i * 15},40 ${15 + i * 15},57"/>`).join("")}</g>
<g ${Bs}><rect x="8" y="70" width="84" height="12" rx="3" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>`;
    },
  },
  {
    u: "2693",
    n: "anchor",
    draw: ({ lin }) => `
<g ${B}>
<circle cx="50" cy="16" r="8.5" fill="none" stroke="${lin([C.blue, C.blueD], "d")}" stroke-width="5.5"/>
<rect x="28" y="30" width="44" height="6" rx="3" fill="${lin([C.blue, C.blueD])}"/>
<rect x="46.5" y="22" width="7" height="68" rx="3.5" fill="${lin([C.blueM, C.blue, C.blueD], "h")}"/>
<path d="M10 56 C12 82 32 90 50 90 C68 90 88 82 90 56 L77 66 C73 76 62 80 50 80 C38 80 27 76 23 66Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/>
<path d="M6 54 L16 46 L22 60Z M94 54 L84 46 L78 60Z" fill="${lin([C.blue, C.blueD])}"/>
</g>`,
  },
  {
    u: "1f6df",
    n: "ring buoy",
    draw: ({ lin }) => `
<g ${B}><circle cx="50" cy="50" r="33" fill="none" stroke="${lin([C.paper, C.paperD], "d")}" stroke-width="22"/></g>
<g ${B}><circle cx="50" cy="50" r="33" fill="none" stroke="${C.red}" stroke-width="22" stroke-dasharray="25.9 51.8" transform="rotate(-20 50 50)"/></g>
<circle cx="50" cy="50" r="33" fill="none" stroke="${C.redD}" stroke-width="22" stroke-dasharray="25.9 51.8" transform="rotate(-20 50 50)" opacity=".2"/>
<g ${Bs}><path d="M18 24 C6 40 6 62 18 76 M82 24 C94 40 94 62 82 76" fill="none" stroke="${C.woodL}" stroke-width="2.4" stroke-linecap="round" opacity="0"/></g>`,
  },
  {
    u: "26f5",
    n: "sailboat",
    draw: ({ lin }) => `
<g ${B}><path d="M10 74 H90 C86 86 78 90 68 90 H32 C22 90 14 86 10 74Z" fill="${lin([C.redM, C.redD])}"/></g>
<g ${B}><rect x="48.5" y="8" width="3.4" height="68" rx="1.5" fill="${lin([C.woodL, C.woodD], "h")}"/></g>
<g ${B}><path d="M53 10 C70 28 80 50 84 68 H53Z" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<g ${B}><path d="M46 26 C36 42 28 56 20 68 H46Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<path d="M12 80 H88" stroke="${C.paper}" stroke-width="1.6" opacity=".7"/>`,
  },
  {
    u: "1f6f6",
    n: "canoe",
    draw: ({ lin }) => `
<g ${B}><path d="M4 56 C20 72 36 76 50 76 C64 76 80 72 96 56 C80 60 64 62 50 62 C36 62 20 60 4 56Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<path d="M12 59 C26 66 38 67 50 67 C62 67 74 66 88 59" fill="none" stroke="${C.paper}" stroke-width="2" opacity=".7"/>
<g ${B}><rect x="30" y="58" width="5" height="9" rx="1" fill="${lin([C.woodL, C.woodD])}"/><rect x="62" y="58" width="5" height="9" rx="1" fill="${lin([C.woodL, C.woodD])}"/></g>
<g ${B}><g transform="rotate(-38 54 38)"><rect x="52" y="4" width="4.4" height="68" rx="2" fill="${lin([C.woodL, C.woodD], "h")}"/><path d="M48 2 H60.4 V20 H48Z M45 66 H63 V92 H45Z" fill="none"/><ellipse cx="54.2" cy="9" rx="6.5" ry="9" fill="${lin([C.wood, C.woodD])}"/><ellipse cx="54.2" cy="66" rx="6.5" ry="9" fill="${lin([C.wood, C.woodD])}"/></g></g>`,
  },
  {
    u: "1f6a4",
    n: "speedboat",
    draw: ({ lin }) => `
<g ${B}><path d="M4 50 H44 L56 38 H72 L78 50 H94 C90 68 80 76 66 76 H28 C16 76 8 66 4 50Z" fill="${lin([C.paper, C.paperD, "#BBAE8E"])}"/></g>
<g ${B}><path d="M4 50 L12 62 H88 L94 50Z" fill="${lin([C.red, C.redD])}"/></g>
<g ${Bs}><path d="M46 49 L57 39.5 H69 L74 49Z" fill="${lin([C.sky, C.skyD])}"/></g>
<path d="M60 39.5 L57 49" stroke="${C.paper}" stroke-width="1.4"/>
${waves(lin, 82)}
<path d="M82 70 C90 66 96 70 98 74" fill="none" stroke="${C.paper}" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
  },
  {
    u: "1f6f3-fe0f",
    n: "passenger ship",
    draw: ({ lin }) => `
<g ${B}><path d="M6 60 H94 C90 76 80 84 68 84 H30 C18 84 10 76 6 60Z" fill="${lin([C.navy, C.navyD])}"/></g>
<g ${B}><rect x="16" y="42" width="68" height="18" rx="2" fill="${lin([C.paper, C.paperD])}"/><rect x="24" y="26" width="52" height="16" rx="2" fill="${lin([C.paper, C.paperD])}"/><rect x="32" y="12" width="36" height="14" rx="2" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><rect x="42" y="2" width="16" height="12" rx="2" fill="${lin([C.red, C.redD])}"/></g>
${portholes([22, 31, 40, 49, 58, 67, 76], 51)}${portholes([32, 42, 52, 62, 70], 34)}${portholes([40, 50, 60], 19)}
<path d="M8 66 H92" stroke="${C.red}" stroke-width="3"/>
${waves(lin, 88)}`,
  },
  {
    u: "26f4-fe0f",
    n: "ferry",
    draw: ({ lin }) => `
<g ${B}><path d="M4 56 H96 C92 74 82 84 70 84 H30 C18 84 8 74 4 56Z" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${B}><rect x="10" y="38" width="80" height="18" rx="2" fill="${lin([C.paper, C.paperD])}"/><rect x="54" y="20" width="30" height="18" rx="2" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><rect x="30" y="8" width="14" height="18" rx="2" fill="${lin([C.blue, C.blueD])}"/></g>
<rect x="30" y="26" width="14" height="12" fill="${C.blueD}" opacity=".0"/>
${[14, 22, 30, 38, 46].map((x) => `<rect x="${x}" y="44" width="5" height="7" rx="1" fill="${C.blueD}"/>`).join("")}
<rect x="58" y="25" width="22" height="8" rx="2" fill="${lin([C.sky, C.skyD])}"/>
${[64, 72, 80].map((x) => `<circle cx="${x}" cy="47" r="2" fill="${C.blueD}"/>`).join("")}
<path d="M30 17 H44" stroke="${C.gold}" stroke-width="2.4"/>
${waves(lin, 86)}`,
  },
  {
    u: "1f6e5-fe0f",
    n: "motor boat",
    draw: ({ lin }) => `
<g ${B}><path d="M4 54 H96 C90 74 80 82 66 82 H30 C16 82 8 72 4 54Z" fill="${lin([C.paper, C.paperD, "#BBAE8E"])}"/></g>
<g ${B}><path d="M5 58 H95 L92 64 H8Z" fill="${lin([C.blue, C.blueD])}"/></g>
<g ${B}><path d="M30 54 L38 30 H70 L78 54Z" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${Bs}><path d="M40 35 H68 L72 49 H34Z" fill="${lin([C.sky, C.skyD])}"/></g>
<path d="M54 35 V49" stroke="${C.paper}" stroke-width="1.6"/>
<g ${B}><rect x="49" y="18" width="3" height="12" fill="${M(lin)}"/><rect x="42" y="14" width="18" height="5" rx="2" fill="${lin([C.red, C.redD])}"/></g>
${waves(lin, 86)}`,
  },
  {
    u: "1f6a2",
    n: "ship",
    draw: ({ lin }) => {
      const box = (x, y, c) => `<rect x="${x}" y="${y}" width="14" height="11" rx="1.5" fill="${lin(c)}"/>`;
      return `<g ${B}><path d="M4 54 H96 C92 74 82 84 70 84 H28 C16 84 8 74 4 54Z" fill="${lin([C.navy, C.navyD])}"/></g>
<path d="M7 62 H93" stroke="${C.red}" stroke-width="3.4"/>
<g ${B}>${box(10, 43, [C.red, C.redD])}${box(25, 43, [C.gold, C.goldD])}${box(40, 43, [C.green, C.greenD])}${box(17, 32, [C.blue, C.blueD])}${box(32, 32, [C.red, C.redD])}</g>
<g ${B}><rect x="62" y="30" width="26" height="24" rx="2" fill="${lin([C.paper, C.paperD])}"/><rect x="66" y="18" width="18" height="12" rx="2" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><rect x="72" y="6" width="9" height="13" rx="1.5" fill="${lin([C.red, C.redD])}"/></g>
${[66, 72, 78, 84].map((x) => `<rect x="${x - 1.5}" y="36" width="3.4" height="4.4" fill="${C.blueD}"/>`).join("")}
<rect x="69" y="21.5" width="12" height="4" rx="1" fill="${C.blueD}"/>
${waves(lin, 88)}`;
    },
  },
  {
    u: "2708-fe0f",
    n: "airplane",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(45 50 50)">
<path d="M42 38 L42 16 C42 6 58 6 58 16 L58 38 L92 58 V68 L58 58 L58 78 L68 88 V94 L50 89 L32 94 V88 L42 78 L42 58 L8 68 V58Z" fill="${lin([C.paper, C.paperD, "#AEA286"], "h")}"/>
</g></g>
<g transform="rotate(45 50 50)"><path d="M46 12 C46 8 54 8 54 12 V18 H46Z" fill="${C.blueM}"/><path d="M50 22 V80" stroke="${C.paperD}" stroke-width="1.2" opacity=".0"/><g fill="${C.blueD}">${[26, 32, 38].map((y) => `<circle cx="50" cy="${y}" r="1.5"/>`).join("")}</g></g>`,
  },
  {
    u: "1f6e9-fe0f",
    n: "small airplane",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(45 50 50)">
<path d="M43 36 L43 18 C43 9 57 9 57 18 L57 36 L96 44 V56 L57 56 L57 76 L68 84 V90 L50 86 L32 90 V84 L43 76 L43 56 L4 56 V44Z" fill="${lin([C.paper, C.paperD, "#AEA286"], "h")}"/>
</g></g>
<g transform="rotate(45 50 50)"><path d="M46 17 C46 12 54 12 54 17 V24 H46Z" fill="${C.blueM}"/><path d="M4 44 H20 V56 H4Z M80 44 H96 V56 H80Z" fill="${C.red}"/><circle cx="50" cy="9" r="0" /></g>
<g transform="rotate(45 50 50)"><rect x="47" y="2" width="6" height="2" fill="${C.dark}" opacity="0"/></g>`,
  },
  {
    u: "1f6eb",
    n: "airplane departure",
    draw: ({ lin }) => `
<g ${B}><path d="M6 86 H94 V92 H6Z" fill="${lin([C.metal, C.metalDD])}"/></g>
<path d="M14 89 H26 M38 89 H50 M62 89 H74 M84 89 H90" stroke="${C.paper}" stroke-width="1.6"/>
${plane(lin, -28, -2, -10)}`,
  },
  {
    u: "1f6ec",
    n: "airplane arrival",
    draw: ({ lin }) => `
<g ${B}><path d="M6 86 H94 V92 H6Z" fill="${lin([C.metal, C.metalDD])}"/></g>
<path d="M14 89 H26 M38 89 H50 M62 89 H74 M84 89 H90" stroke="${C.paper}" stroke-width="1.6"/>
${plane(lin, 20, 0, -12)}`,
  },
  {
    u: "1fa82",
    n: "parachute",
    draw: ({ lin }) => `
<g stroke="${C.dark}" stroke-width="1.4" opacity=".8"><path d="M10 40 L46 76 M30 44 L46 76 M50 44 L50 76 M70 44 L54 76 M90 40 L54 76"/></g>
<g ${B}><path d="M6 42 C6 16 26 6 50 6 C74 6 94 16 94 42 C86 34 78 34 72 42 C66 34 58 34 50 42 C42 34 34 34 28 42 C22 34 14 34 6 42Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<path d="M50 6 C42 14 40 30 44 41 M50 6 C58 14 60 30 56 41" fill="none" stroke="${C.paper}" stroke-width="5" opacity=".85"/>
<g ${B}><circle cx="50" cy="78" r="5" fill="${lin([C.woodL, C.wood])}"/><rect x="45" y="82" width="10" height="9" rx="3" fill="${lin([C.blue, C.blueD])}"/><path d="M45 91 L43 97 M55 91 L57 97" stroke="${C.dark}" stroke-width="3" stroke-linecap="round"/></g>`,
  },
  {
    u: "1f4ba",
    n: "seat",
    draw: ({ lin }) => `
<g ${B}><rect x="14" y="76" width="64" height="12" rx="3" fill="${lin([C.metal, C.metalDD])}"/><rect x="26" y="66" width="8" height="12" fill="${C.metalD}"/></g>
<g ${B}><path d="M20 12 C20 4 44 4 44 12 L52 62 H26Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="18" y="58" width="68" height="18" rx="8" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<g ${Bs}><rect x="38" y="46" width="42" height="9" rx="4" fill="${lin([C.blue, C.blueD])}"/></g>
<rect x="25" y="14" width="14" height="4" rx="2" fill="${C.paper}" opacity=".6"/>`,
  },
  {
    u: "1f681",
    n: "helicopter",
    draw: ({ lin }) => `
<g ${B}><path d="M76 44 L96 34 V46 L80 60Z" fill="${lin([C.red, C.redD])}"/><path d="M10 70 H70 M30 78 V62 M54 78 V62" fill="none" stroke="${C.metalDD}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}><path d="M6 50 C6 30 24 24 42 24 C62 24 80 32 84 52 C84 64 74 68 56 68 H24 C12 68 6 60 6 50Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><path d="M10 50 C10 36 24 30 36 30 V54 H10Z" fill="${lin([C.sky, C.skyD])}"/></g>
<rect x="40" y="34" width="18" height="12" rx="2" fill="${lin([C.sky, C.skyD])}"/>
<g ${B}><rect x="45" y="16" width="5" height="10" fill="${C.metalD}"/><rect x="4" y="11" width="82" height="5" rx="2.5" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><rect x="89" y="24" width="3.4" height="22" rx="1.7" fill="${C.metalD}"/></g>`,
  },
  {
    u: "1f69f",
    n: "suspension railway",
    draw: ({ lin }) => `
<g ${B}><rect x="4" y="8" width="92" height="9" rx="4" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><rect x="26" y="16" width="6" height="14" fill="${C.metalD}"/><rect x="68" y="16" width="6" height="14" fill="${C.metalD}"/></g>
<g ${B}><path d="M10 40 C10 32 16 30 24 30 H76 C84 30 90 32 90 40 V70 C90 76 86 80 80 80 H20 C14 80 10 76 10 70Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
${[16, 36, 56].map((x) => `<rect x="${x}" y="38" width="20" height="18" rx="3" fill="${lin([C.sky, C.skyD])}"/>`).join("")}
<rect x="10" y="62" width="80" height="3" fill="${C.paper}" opacity=".8"/>`,
  },
  {
    u: "1f6a0",
    n: "mountain cableway",
    draw: ({ lin }) => `
<g ${B}><path d="M0 92 L26 52 L40 70 L62 34 L100 92Z" fill="${lin([C.greenM, C.greenD], "d")}" opacity=".95"/></g>
<path d="M4 16 L96 40" stroke="${C.dark}" stroke-width="2.4"/>
<path d="M50 28.4 V42" stroke="${C.dark}" stroke-width="2.4"/>
${cabin(lin, 32, 40, 36, 30, [C.red, C.redM, C.redD])}
<path d="M2 68 L98 90" stroke="${C.dark}" stroke-width="0"/>`,
  },
  {
    u: "1f6a1",
    n: "aerial tramway",
    draw: ({ lin }) => `
<path d="M4 8 L96 18 M4 18 L96 8" stroke="${C.dark}" stroke-width="2.4"/>
<g ${B}><path d="M30 14 L50 8 L70 14 L50 22Z" fill="${C.metalD}"/><rect x="47" y="13" width="6" height="14" fill="${C.metalDD}"/></g>
${cabin(lin, 10, 26, 80, 52, [C.blue, C.blueM, C.blueD])}
<rect x="14" y="62" width="72" height="4" fill="${C.paper}" opacity=".7"/>
<g ${B}><rect x="14" y="78" width="72" height="8" rx="3" fill="${lin([C.metal, C.metalDD])}"/></g>`,
  },
  {
    u: "1f6f0-fe0f",
    n: "satellite",
    draw: ({ lin }) => {
      const panel = `<rect x="-14" y="-9" width="28" height="18" rx="1.5" fill="${lin([C.blueM, C.blueD, C.navyD], "d")}"/><path d="M-5 -9 V9 M5 -9 V9 M-14 0 H14" stroke="${C.sky}" stroke-width="1" opacity=".7"/>`;
      return `<g ${B}><g transform="rotate(-45 50 50)"><rect x="3" y="41" width="30" height="18" rx="1.5" fill="${lin([C.blueM, C.blueD, C.navyD], "d")}"/><rect x="67" y="41" width="30" height="18" rx="1.5" fill="${lin([C.blueM, C.blueD, C.navyD], "d")}"/><rect x="33" y="48.5" width="34" height="3" fill="${C.metalD}"/><rect x="36" y="34" width="28" height="32" rx="5" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g transform="rotate(-45 50 50)" stroke="${C.sky}" stroke-width="1" opacity=".7"><path d="M13 41 V59 M23 41 V59 M77 41 V59 M87 41 V59 M3 50 H33 M67 50 H97"/></g>
<g ${B}><g transform="rotate(-45 50 50)"><path d="M50 34 V24" stroke="${C.metalD}" stroke-width="3"/><ellipse cx="50" cy="22" rx="8" ry="4" fill="${lin([C.metalL, C.metalD])}"/><circle cx="50" cy="75" r="4" fill="${C.red}"/></g></g>`;
    },
  },
  {
    u: "1f680",
    n: "rocket",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(45 50 50)">
<path d="M38 80 C36 90 44 98 50 100 C56 98 64 90 62 80Z" fill="${lin([C.yellow, C.orange, C.red])}"/>
<path d="M36 52 L16 74 V86 L38 74Z M64 52 L84 74 V86 L62 74Z" fill="${lin([C.red, C.redD])}"/>
<path d="M50 2 C66 16 68 40 64 80 H36 C32 40 34 16 50 2Z" fill="${lin([C.paper, C.paperD, "#B9AC8C"], "h")}"/>
<path d="M50 2 C58 8 63 16 65 26 H35 C37 16 42 8 50 2Z" fill="${lin([C.red, C.redD], "h")}"/>
</g></g>
<g transform="rotate(45 50 50)"><circle cx="50" cy="44" r="8" fill="${C.metalD}"/><circle cx="50" cy="44" r="6" fill="${rad([C.sky, C.blueM, C.blueD])}"/></g>`,
  },
  {
    u: "1f6f8",
    n: "flying saucer",
    draw: ({ lin, rad }) => `
<path d="M38 68 L20 96 H80 L62 68Z" fill="${lin([[0, C.yellow, 0.7], [1, C.yellow, 0.05]])}"/>
<g ${B}><path d="M28 44 C28 12 72 12 72 44Z" fill="${lin([[0, "#DCEEF8", 0.95], [1, C.skyD, 0.95]], "d")}"/></g>
<g ${Bs}><circle cx="50" cy="36" r="6" fill="${rad([C.green, C.greenD])}"/><circle cx="48" cy="34" r="1" fill="${C.darkD}"/><circle cx="52.5" cy="34" r="1" fill="${C.darkD}"/></g>
<g ${B}><ellipse cx="50" cy="52" rx="46" ry="16" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${Bs}>${[[20, 54, C.red], [38, 60, C.gold], [62, 60, C.green], [80, 54, C.blue]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`).join("")}</g>`,
  },
  {
    u: "1f6ce-fe0f",
    n: "bellhop bell",
    draw: ({ lin }) => `
<g ${B}><rect x="8" y="78" width="84" height="12" rx="5" fill="${lin([C.goldM, C.goldD])}"/></g>
<g ${B}><path d="M14 78 C14 44 30 28 50 28 C70 28 86 44 86 78Z" fill="${lin(["#B27C1E", C.goldM, "#FCE595", C.gold, "#A9741A"], "h")}"/></g>
<ellipse cx="34" cy="52" rx="3.6" ry="12" transform="rotate(14 34 52)" fill="#fff" opacity=".4"/>
<g ${B}><rect x="46" y="14" width="8" height="16" fill="${lin([C.goldM, C.goldD])}"/><circle cx="50" cy="12" r="8" fill="${lin([C.gold, C.goldD], "d")}"/></g>`,
  },
  {
    u: "1f9f3",
    n: "luggage",
    draw: ({ lin }) => `
<g ${B}><path d="M36 26 V16 a6 6 0 0 1 6 -6 H58 a6 6 0 0 1 6 6 V26" fill="none" stroke="${C.dark}" stroke-width="5"/>
<rect x="24" y="86" width="9" height="8" rx="3" fill="${C.dark}"/><rect x="67" y="86" width="9" height="8" rx="3" fill="${C.dark}"/></g>
<g ${B}><rect x="10" y="24" width="80" height="64" rx="10" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><rect x="24" y="24" width="9" height="64" fill="${lin([C.redM, C.redD], "h")}"/><rect x="67" y="24" width="9" height="64" fill="${lin([C.redM, C.redD], "h")}"/></g>
<g ${Bs}><rect x="44" y="46" width="12" height="10" rx="2" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M12 40 H88" stroke="${C.woodDD}" stroke-width="1.4" opacity=".45"/>`,
  },
  { u: "231b", n: "hourglass done", draw: hourglass(true) },
  { u: "23f3", n: "hourglass not done", draw: hourglass(false) },
  {
    u: "231a",
    n: "watch",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="30" y="2" width="40" height="30" rx="6" fill="${lin([C.blue, C.blueD])}"/><rect x="30" y="68" width="40" height="30" rx="6" fill="${lin([C.blue, C.blueD])}"/></g>
<g ${B}><circle cx="50" cy="50" r="31" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="50" cy="50" r="25" fill="${rad([C.paper, C.paperD])}"/></g>
<g stroke="${C.dark}" stroke-width="1.8" stroke-linecap="round">${[0, 90, 180, 270].map((a) => `<path d="M50 29 V33" transform="rotate(${a} 50 50)"/>`).join("")}</g>
<g stroke="${C.darkD}" stroke-linecap="round"><path d="M50 50 V36" stroke-width="2.6" transform="rotate(60 50 50)"/><path d="M50 50 V33" stroke-width="2" transform="rotate(-10 50 50)"/></g>
<circle cx="50" cy="50" r="2.4" fill="${C.redM}"/>
<g ${Bs}><rect x="80" y="44" width="6" height="12" rx="2.5" fill="${lin([C.gold, C.goldD])}"/></g>`,
  },
  {
    u: "23f1-fe0f",
    n: "stopwatch",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="43" y="4" width="14" height="10" rx="3" fill="${lin([C.metal, C.metalDD])}"/><rect x="47" y="12" width="6" height="8" fill="${C.metalD}"/><g transform="rotate(40 50 56)"><rect x="46" y="14" width="8" height="8" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g></g>
<g ${B}><circle cx="50" cy="57" r="36" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${B}><circle cx="50" cy="57" r="29" fill="${rad([C.paper, C.paperD])}"/></g>
<g stroke="${C.dark}" stroke-width="1.8" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => `<path d="M50 32 V${i % 3 ? 35 : 37}" transform="rotate(${i * 30} 50 57)"/>`).join("")}</g>
<path d="M50 57 L50 57 L50 57 A0 0 0 0 1 50 57Z" fill="none"/>
<path d="M50 57 V30 A27 27 0 0 1 70 38Z" fill="${C.redM}" opacity=".3"/>
<path d="M50 57 L64 38" stroke="${C.redD}" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="50" cy="57" r="3" fill="${C.redD}"/>`,
  },
  {
    u: "23f2-fe0f",
    n: "timer clock",
    draw: ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="52" r="42" fill="${lin([C.orange, C.orangeD], "d")}"/></g>
<g ${B}><circle cx="50" cy="52" r="33" fill="${rad([C.paper, C.paperD])}"/></g>
<g stroke="${C.dark}" stroke-width="1.8" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => `<path d="M50 24 V${i % 3 ? 27 : 29.5}" transform="rotate(${i * 30} 50 52)"/>`).join("")}</g>
<path d="M50 52 V24 A28 28 0 0 1 77 59Z" fill="${C.redM}" opacity=".45"/>
<path d="M50 52 L77 59 M50 52 V24" stroke="${C.redD}" stroke-width="0"/>
<path d="M50 52 L68 36" stroke="${C.darkD}" stroke-width="2.8" stroke-linecap="round"/>
<g ${Bs}><circle cx="50" cy="52" r="4" fill="${lin([C.metalL, C.metalD], "d")}"/></g>
<g ${B}><rect x="40" y="3" width="20" height="9" rx="4" fill="${lin([C.orange, C.orangeD])}"/></g>`,
  },
];
const __batch: Icon[] = LIST.map((ic) => (FIT[ic.u] ? { ...ic, draw: adj(ic.draw, ...(FIT[ic.u] as [number, number, number])) } : ic));

export default __batch;
