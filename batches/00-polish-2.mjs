// Redraws of weak icons (build.mjs lets files named 00-* win).
import { B, Bs, C } from "../kit.mjs";

const gold = (lin, d = "v") => lin([C.gold, C.goldM, C.goldD], d);
const MH = (lin) => lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h");
const redG = (lin) => lin(["#F8887E", C.red, C.redD], "d");

const bell = (lin) => `
<g ${B}><g transform="rotate(-14 50 50)">
<rect x="44.5" y="4" width="11" height="27" rx="5.5" fill="${lin([C.woodD, C.woodL, C.wood, C.woodDD], "h")}"/>
<rect x="42.5" y="27" width="15" height="6.5" rx="2.4" fill="${lin([C.gold, C.goldD])}"/>
<circle cx="50" cy="87.5" r="5.6" fill="${lin([C.goldM, C.goldD])}"/></g></g>
<g ${B}><g transform="rotate(-14 50 50)">
<path d="M50 32 C36 32 32.5 47 30.5 62 C29.5 70 24.5 76 18 81 H82 C75.5 76 70.5 70 69.5 62 C67.5 47 64 32 50 32Z" fill="${lin(["#B27C1E", C.goldM, "#FCE595", C.gold, "#A9741A"], "h")}"/>
<rect x="14.5" y="78" width="71" height="7.5" rx="3.75" fill="${lin(["#B27C1E", C.gold, "#FCE595", C.goldM, "#A9741A"], "h")}"/></g></g>`;

export default [
  {
    u: "1f97f",
    n: "flat shoe",
    draw: ({ lin }) => `<g transform="translate(0 -17)">
<g ${B}><path d="M9 78 C8 64 10 52 16 49 C26 53 42 55 54 52 C70 50 84 58 92 70 C95 75 93 78 89 78Z" fill="${redG(lin)}"/></g>
<path d="M16 50 C28 58 44 60 56 53 C46 66 26 66 16 50Z" fill="${lin([C.darkD, C.dark])}"/>
<path d="M17 51 C28 58 44 60 55 53" fill="none" stroke="${C.pink}" stroke-width="2.2" stroke-linecap="round"/>
<g ${B}><path d="M9 76 H91 Q95 76 93 81 Q90 86 84 86 H15 Q9 86 9 80Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g ${Bs}><path d="M64 57 C58 50 56 60 62 63Z M64 57 C70 50 74 60 66 63Z" fill="${lin([C.pink, C.pinkD], "d")}"/><circle cx="64" cy="60" r="3.4" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<path d="M18 72 C32 70 50 68 76 72" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".3"/></g>`,
  },
  {
    u: "1f460",
    n: "high heeled shoe",
    draw: ({ lin }) => `<g transform="translate(-3 -9)">
<g ${B}><path d="M13 62 H26 L21 93 Q19 95 17 93Z" fill="${lin([C.redM, C.redD], "h")}"/></g>
<g ${B}><path d="M12 24 C9 38 11 52 14 63 C30 70 48 80 66 82 C80 83 93 82 93 76 C93 70 84 64 72 58 C58 52 46 46 38 38 C32 32 22 22 12 24Z" fill="${redG(lin)}"/></g>
<path d="M12 24 C22 23 32 32 38 38 C30 42 20 38 11 34Z" fill="${lin([C.darkD, C.dark])}"/>
<path d="M12 25 C22 24 32 32 38 38" fill="none" stroke="${C.pink}" stroke-width="2" stroke-linecap="round"/>
<g ${Bs}><path d="M14 63 C30 70 48 80 66 82 C80 83 93 82 93 76" fill="none" stroke="${C.woodDD}" stroke-width="3.4" stroke-linecap="round"/></g>
<path d="M52 58 C62 62 78 66 88 72" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".35"/>
<g ${Bs}><rect x="16.2" y="88" width="5" height="6" rx="1.5" fill="${C.darkD}"/></g></g>`,
  },
  {
    u: "1f97b",
    n: "sari",
    draw: ({ lin, clip }) => `
<g ${B}><path d="M27 50 H73 L92 93 Q50 99 8 93Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${clip('<path d="M27 50 H73 L92 93 Q50 99 8 93Z"/>')}><path d="M0 84 Q50 92 100 84 V100 H0Z" fill="${gold(lin)}"/></g>
<path d="M38 54 L26 90 M50 54 V92 M62 54 L74 90" stroke="${C.redD}" stroke-width="2" opacity=".5"/>
<g ${B}><rect x="31" y="34" width="38" height="18" rx="3" fill="${lin([C.woodL, C.wood])}"/></g>
<g ${B}><path d="M34 6 H66 L74 16 L90 24 L82 38 L70 32 V38 H30 V32 L18 38 L10 24 L26 16Z" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<path d="M42 7 Q50 20 58 7" fill="none" stroke="${C.tealD}" stroke-width="2.4"/>
<g ${B}><path d="M24 10 L36 6 L78 42 L88 94 H66 L66 58Z" fill="${lin([C.pink, C.pinkD, C.redM], "d")}"/></g>
<path d="M36 6 L78 42 L88 94" fill="none" stroke="${C.goldM}" stroke-width="3.4" stroke-linejoin="round"/>
<g ${Bs}><path d="M67 92 H87" stroke="${C.gold}" stroke-width="5"/></g>`,
  },
  {
    u: "1f9e2",
    n: "billed cap",
    draw: ({ lin }) => `
<g ${B}><path d="M6 68 C3 32 26 16 46 18 C66 20 76 40 76 68Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M46 18 C38 32 35 50 36 69 M46 18 C58 30 62 50 62 69" fill="none" stroke="${C.navyD}" stroke-width="1.8" opacity=".5"/>
<g ${B}><path d="M60 62 C78 56 97 62 98 74 C82 83 62 80 54 70Z" fill="${lin([C.sky, C.blue, C.blueM], "d")}"/></g>
<path d="M66 68 C78 64 90 68 94 73" fill="none" stroke="${C.navy}" stroke-width="1.4" stroke-dasharray="2.4 1.6" opacity=".7"/>
<g ${B}><path d="M5 66 H76 V74 Q40 80 5 74Z" fill="${lin([C.blueM, C.blueD])}"/></g>
<g ${Bs}><circle cx="46" cy="18" r="4.4" fill="${lin([C.gold, C.goldD], "d")}"/></g>
<g fill="${C.navyD}" opacity=".55"><circle cx="24" cy="40" r="1.6"/><circle cx="68" cy="44" r="1.6"/></g>`,
  },
  {
    u: "1f3bc",
    n: "musical score",
    draw: ({ lin }) => `
<g ${B}><rect x="6" y="14" width="88" height="72" rx="6" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M12 36 H88 M12 46 H88 M12 56 H88 M12 66 H88 M12 76 H88" stroke="#9C8F74" stroke-width="1.3" opacity=".85"/>
<g fill="none" stroke="${C.navyD}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
<path d="M31 79 C31 83 24 83 24 78 C24 74 30 74 31 78 L36 28 C37 20 42 20 43 24 C44 30 37 40 31 48 C24 57 28 68 36 67 C44 66 43 55 35 55 C30 55 28 60 31 62"/></g>
<g ${Bs}><ellipse cx="58" cy="68" rx="6" ry="4.4" transform="rotate(-20 58 68)" fill="${C.navyD}"/><ellipse cx="78" cy="58" rx="6" ry="4.4" transform="rotate(-20 78 58)" fill="${C.navyD}"/>
<path d="M63 66 V44 H83 V56" fill="none" stroke="${C.navyD}" stroke-width="3"/></g>`,
  },
  {
    u: "1f4ef",
    n: "postal horn",
    draw: ({ lin }) => `
<g ${B}><path d="M60 46 L86 6 C99 24 99 52 80 68 L62 60Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<ellipse cx="90" cy="36" rx="5" ry="25" transform="rotate(-12 90 36)" fill="${C.goldD}" opacity=".55"/>
<g ${B}><circle cx="40" cy="62" r="25" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="9"/></g>
<g ${B}><circle cx="40" cy="62" r="11" fill="none" stroke="${lin([C.goldM, C.goldD], "d")}" stroke-width="6.5"/>
<path d="M32 52 L16 22" stroke="${gold(lin, "d")}" stroke-width="6" stroke-linecap="round"/></g>
<g ${B}><rect x="8" y="12" width="16" height="9" rx="4" transform="rotate(30 16 16)" fill="${lin([C.metalL, C.metalD])}"/></g>
<g ${Bs}><path d="M64 52 C58 36 42 30 28 38" fill="none" stroke="${C.red}" stroke-width="2.6" stroke-linecap="round"/><circle cx="26" cy="39" r="3.2" fill="${C.red}"/></g>`,
  },
  {
    u: "1f3ba",
    n: "trumpet",
    draw: ({ lin }) => `<g transform="translate(50 50) scale(.9) translate(-50 -40)">
<g ${B}><g transform="rotate(-28 50 50)">
<path d="M18 44 V64 a8 8 0 0 0 8 8 H62 a8 8 0 0 0 8 -8 V46" fill="none" stroke="${gold(lin, "d")}" stroke-width="6.5"/>
<rect x="4" y="38" width="62" height="6.5" fill="${C.goldM}"/>
<rect x="30" y="26" width="30" height="20" rx="4" fill="${lin([C.goldM, C.goldD], "d")}"/>
<path d="M64 36 L94 12 V72 L64 46Z" fill="${lin([C.goldD, C.goldM, "#FCE595", C.gold, C.goldD], "h")}"/>
<rect x="1" y="35" width="9" height="12" rx="3" fill="${lin([C.metalL, C.metalD])}"/>
</g></g>
<g ${Bs}><g transform="rotate(-28 50 50)">
<circle cx="37" cy="20" r="4.4" fill="${lin([C.metalL, C.metalD], "d")}"/><circle cx="45" cy="20" r="4.4" fill="${lin([C.metalL, C.metalD], "d")}"/><circle cx="53" cy="20" r="4.4" fill="${lin([C.metalL, C.metalD], "d")}"/></g></g></g>`,
  },
  {
    u: "1f515",
    n: "bell with slash",
    draw: ({ lin }) => `${bell(lin)}
<path d="M12 12 L88 90" stroke="${C.paper}" stroke-width="10" stroke-linecap="round" opacity=".85"/>
<g ${Bs}><path d="M12 12 L88 90" stroke="${C.red}" stroke-width="5.4" stroke-linecap="round"/></g>`,
  },
  {
    u: "1fa89",
    n: "harp",
    draw: ({ lin, clip }) => {
      const inner = "M27 28 C44 16 68 20 80 40 L65 84 H27Z";
      const strings = [33, 39, 45, 51, 57, 63, 69, 75]
        .map((x, i) => `<path d="M${x} 10 V90" stroke="${i % 2 ? C.goldD : C.woodD}" stroke-width="1.8"/>`)
        .join("");
      return `
<g ${B}><path fill-rule="evenodd" d="M15 92 V20 C15 12 22 9 30 9 C60 2 90 14 94 42 L78 92Z ${inner}" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${clip(`<path d="${inner}"/>`)}><g ${Bs}>${strings}</g></g>
<g ${B}><rect x="8" y="88" width="76" height="8" rx="4" fill="${lin([C.wood, C.woodD])}"/></g>
<g fill="${C.red}"><circle cx="39" cy="30" r="1.7"/><circle cx="57" cy="30" r="1.7"/></g>`;
    },
  },
  {
    u: "1f5b1-fe0f",
    n: "computer mouse",
    draw: ({ lin }) => `
<g ${Bs}><path d="M50 30 C50 16 36 22 36 6" fill="none" stroke="${C.dark}" stroke-width="3.4" stroke-linecap="round"/></g>
<g ${B}><path d="M50 28 C70 28 76 44 76 58 V68 C76 84 66 96 50 96 C34 96 24 84 24 68 V58 C24 44 30 28 50 28Z" fill="${lin(["#B9C4D8", "#8E9DB8", "#627392"], "d")}"/></g>
<g ${Bs}><path d="M50 30 C32 30 26 44 26 56 H50Z" fill="${lin(["#DDE4F0", "#AEBBD2"], "d")}"/><path d="M50 30 C68 30 74 44 74 56 H50Z" fill="${lin(["#DDE4F0", "#AEBBD2"], "d")}"/></g>
<g ${Bs}><rect x="45" y="37" width="10" height="15" rx="5" fill="${lin([C.orange, C.orangeD])}"/></g>
<ellipse cx="38" cy="76" rx="5" ry="10" transform="rotate(14 38 76)" fill="#fff" opacity=".28"/>`,
  },
  {
    u: "1f4bf",
    n: "optical disk",
    draw: ({ lin, rad }) => `
<g ${B}><path fill-rule="evenodd" d="M50 6 A44 44 0 1 1 49.99 6Z M50 41 A9 9 0 1 0 50.01 41Z" fill="${rad(["#EEF3FA", "#AFC0DA", "#6E80A2"], 0.36, 0.3, 0.9)}"/></g>
<g fill="none" stroke-width="20" opacity=".5"><circle cx="50" cy="50" r="25" stroke="${C.pinkD}" stroke-dasharray="26 131" transform="rotate(-70 50 50)"/><circle cx="50" cy="50" r="25" stroke="${C.blueM}" stroke-dasharray="26 131" transform="rotate(20 50 50)"/><circle cx="50" cy="50" r="25" stroke="${C.greenM}" stroke-dasharray="26 131" transform="rotate(110 50 50)"/><circle cx="50" cy="50" r="25" stroke="${C.goldM}" stroke-dasharray="26 131" transform="rotate(200 50 50)"/></g>
<circle cx="50" cy="50" r="17" fill="none" stroke="#fff" stroke-width="5" opacity=".55"/>
<circle cx="50" cy="50" r="17" fill="none" stroke="${C.metalDD}" stroke-width="1.2" opacity=".6"/>
<circle cx="50" cy="50" r="43.5" fill="none" stroke="${C.metalDD}" stroke-width="1.6" opacity=".8"/>
<circle cx="50" cy="50" r="9" fill="none" stroke="${C.metalDD}" stroke-width="1.8" opacity=".9"/>`,
  },
  {
    u: "1f4fd-fe0f",
    n: "film projector",
    draw: ({ lin }) => {
      const reel = (cx, cy, r) =>
        `<g ${B}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>` +
        [0, 1, 2, 3, 4, 5].map((k) => { const a = (k * Math.PI) / 3; return `<circle cx="${(cx + r * 0.58 * Math.cos(a)).toFixed(1)}" cy="${(cy + r * 0.58 * Math.sin(a)).toFixed(1)}" r="${(r * 0.17).toFixed(1)}" fill="${C.darkD}" opacity=".7"/>`; }).join("") +
        `<circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(1)}" fill="${C.red}"/>`;
      return `<g transform="translate(50 50) scale(.95) translate(-51.5 -52.5)">
<path d="M86 56 L99 28 V90 L86 66Z" fill="${lin([[0, C.gold, 0.9], [1, C.gold, 0.2]], "h")}"/>
<g ${Bs}><path d="M20 78 L12 94 M56 78 L64 94" stroke="${C.metalD}" stroke-width="5.5" stroke-linecap="round"/></g>
<path d="M22 40 L20 58 M50 40 L52 56" stroke="${C.darkD}" stroke-width="2" opacity=".7"/>
<g ${B}><rect x="4" y="42" width="66" height="36" rx="6" fill="${lin(["#8B7F8A", C.dark, C.darkD], "d")}"/></g>
${reel(21, 24, 16)}${reel(54, 24, 16)}
<g ${B}><rect x="70" y="52" width="12" height="16" rx="3" fill="${MH(lin)}"/><rect x="80" y="48" width="7" height="24" rx="3" fill="${lin([C.goldM, C.goldD], "d")}"/></g>
<circle cx="14" cy="56" r="3.2" fill="${C.red}"/><rect x="24" y="62" width="34" height="3.4" rx="1.7" fill="${C.sky}" opacity=".5"/></g>`;
    },
  },
];
