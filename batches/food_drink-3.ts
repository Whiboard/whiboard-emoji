// food_drink-3: snacks, rice and noodle dishes, sweets.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const steam = (x, y) => `<path d="M${x} ${y} c-4 -3.5 4 -6.5 0 -10 s-4 -6.5 0 -10" fill="none" stroke="#8C9BB8" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>`;
const bowl = (lin) => `<g ${Bs}><rect x="35" y="85" width="30" height="9" rx="3" fill="${lin([C.blueM, C.blueD])}"/></g>
<g ${B}><path d="M8 50 H92 C92 77 74 90 50 90 C26 90 8 77 8 50Z" fill="${lin([C.paper, C.paper, C.creamD], "h")}"/></g>
<path d="M10.5 62 Q50 75 89.5 62" fill="none" stroke="${C.blueM}" stroke-width="3.2"/><path d="M13 69 Q50 82 87 69" fill="none" stroke="${C.blueM}" stroke-width="1.4" stroke-dasharray="3 2.6"/>
<g ${Bs}><ellipse cx="50" cy="50" rx="42" ry="9.5" fill="${lin([C.paper, C.creamD], "d")}"/></g>`;
const spiral = (cx, cy, r, turns = 2.5, n = 56) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = t * turns * Math.PI * 2;
    d += `${i ? "L" : "M"}${(cx + r * t * Math.cos(a)).toFixed(1)} ${(cy + r * t * Math.sin(a)).toFixed(1)} `;
  }
  return d;
};
const cherry = (rad, x, y, r = 6.5) => `<path d="M${x} ${y - r + 1} q1 -7 6 -9" fill="none" stroke="${C.greenD}" stroke-width="1.6" stroke-linecap="round"/><g ${Bs}><circle cx="${x}" cy="${y}" r="${r}" fill="${rad(["#F58578", C.redM, C.redD])}"/></g><circle cx="${x - 2}" cy="${y - 2}" r="1.6" fill="#fff" opacity=".5"/>`;
const ciao = (a) => a;

const icons = [
  {
    u: "1f37f",
    n: "popcorn",
    draw: ({ lin, rad, clip }) => {
      const L = (y) => 22 + ((y - 48) * 7) / 44;
      const R = (y) => 78 - ((y - 48) * 7) / 44;
      const stripe = (a, b) => `<polygon points="${22 + 56 * a},48 ${22 + 56 * b},48 ${29 + 42 * b},92 ${29 + 42 * a},92"/>`;
      const puffs = [[26, 34, 12], [42, 24, 13], [60, 22, 13], [74, 34, 12], [34, 46, 11], [52, 38, 13], [68, 48, 10]];
      return `${puffs.map(([x, y, r]) => `<g ${Bs}><circle cx="${x}" cy="${y}" r="${r}" fill="${rad(["#FFF8E4", "#F3DFA2", "#CDA85C"])}"/></g>`).join("")}
<g fill="${C.goldM}" opacity=".7"><ellipse cx="42" cy="22" rx="3.4" ry="2"/><ellipse cx="62" cy="34" rx="3" ry="1.8"/><ellipse cx="28" cy="38" rx="2.6" ry="1.6"/><ellipse cx="72" cy="30" rx="2.6" ry="1.6"/></g>
<g ${B}><path d="M22 48 H78 L71 92 H29Z" fill="${lin([C.paper, C.creamD], "h")}"/></g>
<g ${clip('<path d="M22 48 H78 L71 92 H29Z"/>')}><g fill="${lin([C.red, C.redD], "h")}">${stripe(0, 0.2)}${stripe(0.4, 0.6)}${stripe(0.8, 1)}</g></g>
<g ${Bs}><rect x="19" y="45" width="62" height="8" rx="4" fill="${lin([C.red, C.redD])}"/></g>${L(0) + R(0) ? "" : ""}`;
    },
  },
  {
    u: "1f9c8",
    n: "butter",
    draw: ({ lin }) => `
<g ${B}>
<polygon points="8,40 26,24 92,24 66,40" fill="${lin(["#FFF1B0", "#F8DC7A"], "d")}"/>
<polygon points="66,40 92,24 92,66 66,82" fill="${lin([C.yellowM, C.yellowD])}"/>
<rect x="8" y="40" width="58" height="42" fill="${lin([C.yellow, C.yellowM])}"/>
</g>
<g ${B}>
<polygon points="8,40 26,24 48,24 30,40" fill="${lin([C.sky, C.skyD], "d")}"/>
<rect x="8" y="40" width="22" height="42" fill="${lin([C.sky, C.blue])}"/>
</g>
<path d="M12 50 H26 M12 58 H24 M12 66 H26" stroke="${C.blueD}" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>
<rect x="36" y="46" width="22" height="4" rx="2" fill="#fff" opacity=".35"/>
<path d="M30 40 L48 24" stroke="${C.blueD}" stroke-width="1.6" opacity=".6"/>`,
  },
  {
    u: "1f9c2",
    n: "salt",
    draw: ({ lin, rad, clip }) => {
      const body = "M30 36 H70 L75 82 C75 88 71 91 65 91 H35 C29 91 25 88 25 82Z";
      return `<path d="${body}" fill="#DCECF6" fill-opacity=".4"/>
<g ${B}><g ${clip(`<path d="${body}"/>`)}><rect x="20" y="50" width="60" height="45" fill="${lin(["#F5F0E2", "#E4DAC0", "#C9BD9C"])}"/></g></g>
<ellipse cx="50" cy="50" rx="23" ry="3" fill="#FFFBF0" opacity=".8"/>
<g fill="#B7AA88" opacity=".6"><circle cx="40" cy="66" r="1.3"/><circle cx="55" cy="60" r="1.2"/><circle cx="60" cy="76" r="1.4"/><circle cx="44" cy="82" r="1.2"/><circle cx="52" cy="71" r="1"/></g>
<path d="${body}" fill="none" stroke="#8FB0CB" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M32 46 L30 76" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
<g ${B}><path d="M28 36 C28 20 36 11 50 11 C64 11 72 20 72 36Z" fill="${lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h")}"/><rect x="26" y="32" width="48" height="8" rx="3" fill="${lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h")}"/></g>
<g fill="${C.metalDD}" opacity=".8"><circle cx="43" cy="22" r="2"/><circle cx="50" cy="19" r="2"/><circle cx="57" cy="22" r="2"/><circle cx="46" cy="28" r="2"/><circle cx="54" cy="28" r="2"/></g>`;
    },
  },
  {
    u: "1f96b",
    n: "canned food",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M22 26 V80 C22 92 78 92 78 80 V26Z" fill="${lin([C.metalD, C.metal, C.metalL, C.metal, C.metalD], "h")}"/></g>
<path d="M22 38 V74 C22 84 78 84 78 74 V38 C78 46 22 46 22 38Z" fill="${lin(["#F6D9A8", C.paper, "#E6CD9E"], "h")}"/>
<path d="M22 38 C22 46 78 46 78 38 M22 74 C22 84 78 84 78 74" fill="none" stroke="${C.red}" stroke-width="3.4"/>
<g ${Bs}><ellipse cx="50" cy="26" rx="28" ry="8.5" fill="${lin([C.metalL, C.metal], "d")}"/></g>
<ellipse cx="50" cy="26" rx="21" ry="5.4" fill="none" stroke="${C.metalD}" stroke-width="1.3" opacity=".6"/>
<g ${Bs}><ellipse cx="57" cy="25.4" rx="7" ry="2.7" fill="none" stroke="${C.metalD}" stroke-width="2.2"/></g>
<g ${Bs}><circle cx="50" cy="62" r="10.5" fill="${rad(["#F58578", C.redM, C.redD])}"/></g>
<path d="M44 54 q6 3 6 -1 q0 4 6 1 q-3 4 -6 3 q-3 1 -6 -3Z" fill="${C.greenM}"/>
<ellipse cx="46" cy="58" rx="2.3" ry="1.5" fill="#fff" opacity=".5"/>`,
  },
  {
    u: "1f371",
    n: "bento box",
    draw: ({ lin, rad }) => `
<g ${B}><rect x="8" y="26" width="84" height="64" rx="11" fill="${lin([C.redM, C.redD])}"/></g>
<g ${B}><rect x="8" y="22" width="84" height="58" rx="11" fill="${lin([C.red, C.redM], "d")}"/></g>
<rect x="15" y="28" width="70" height="46" rx="5" fill="#6B4324"/>
<g ${Bs}><rect x="17" y="30" width="32" height="42" rx="5" fill="${lin([C.paper, C.creamD], "d")}"/></g>
<g stroke="${C.creamD}" stroke-width="1.6" stroke-linecap="round"><path d="M23 40 l3 2 M34 38 l3 2 M26 52 l3 -2 M38 50 l3 2 M24 62 l3 2 M36 64 l3 -1 M30 46 l2 3"/></g>
<circle cx="33" cy="52" r="5.2" fill="${rad(["#F58578", C.redD])}"/>
<g ${Bs}><rect x="52" y="30" width="31" height="19" rx="4" fill="${lin([C.yellow, C.yellowM])}"/></g>
<path d="M62 31 V48 M72 31 V48" stroke="${C.yellowD}" stroke-width="1.4" opacity=".7"/>
<g ${Bs}><rect x="52" y="52" width="31" height="20" rx="4" fill="${lin([C.green, C.greenM])}"/>
<circle cx="60" cy="58" r="5.2" fill="${rad([C.green, C.greenD])}"/><circle cx="68" cy="56" r="4.6" fill="${rad([C.green, C.greenD])}"/>
<ellipse cx="72" cy="66" rx="7.5" ry="4.4" transform="rotate(-12 72 66)" fill="${lin(["#FBB878", "#E7704F"])}"/></g>`,
  },
  {
    u: "1f358",
    n: "rice cracker",
    draw: ({ lin, rad, clip }) => `
<g ${B}><circle cx="50" cy="50" r="41" fill="${rad(["#F7D9A0", "#E3AD5E", "#B87A33"], 0.34, 0.3, 0.85)}"/></g>
<g fill="#A66A2C" opacity=".55"><circle cx="24" cy="38" r="1.8"/><circle cx="30" cy="68" r="1.6"/><circle cx="72" cy="30" r="1.7"/><circle cx="76" cy="70" r="1.8"/><circle cx="44" cy="22" r="1.5"/><circle cx="60" cy="82" r="1.6"/></g>
<g ${clip('<circle cx="50" cy="50" r="41"/>')}><g ${Bs}><g transform="rotate(-22 50 50)"><rect x="0" y="38" width="100" height="24" fill="${lin(["#5E8F72", "#3E6B52", "#315A44"])}"/></g></g></g>
<g transform="rotate(-22 50 50)" stroke="#9BC4A6" stroke-width="1" opacity=".5"><path d="M10 45 H90 M10 52 H90 M10 57 H90"/></g>
<ellipse cx="30" cy="28" rx="9" ry="4.4" transform="rotate(-38 30 28)" fill="#fff" opacity=".28"/>`,
  },
  {
    u: "1f359",
    n: "rice ball",
    draw: ({ lin, clip }) => {
      const body = "M50 10 C58 10 64 20 72 34 C80 48 90 66 90 77 C90 87 80 91 70 91 H30 C20 91 10 87 10 77 C10 66 20 48 28 34 C36 20 42 10 50 10Z";
      return `<g ${B}><path d="${body}" fill="${lin([C.paper, "#EFE3C6", C.creamD], "d")}"/></g>
<g stroke="${C.creamD}" stroke-width="1.7" stroke-linecap="round"><path d="M42 30 l3 3 M56 36 l3 -2 M34 48 l3 2 M64 52 l3 3 M46 44 l2 3 M26 64 l3 -2 M72 66 l-3 2"/></g>
<g ${Bs}><g ${clip(`<path d="${body}"/>`)}><rect x="28" y="56" width="44" height="40" rx="3" fill="${lin(["#5E8F72", "#3E6B52", "#2E5642"])}"/></g></g>
<path d="M36 64 V90 M44 62 V90 M52 62 V90 M60 62 V90" stroke="#9BC4A6" stroke-width="1" opacity=".45"/>
<ellipse cx="38" cy="30" rx="5" ry="9" transform="rotate(28 38 30)" fill="#fff" opacity=".4"/>`;
    },
  },
  {
    u: "1f35a",
    n: "cooked rice",
    draw: ({ lin, rad }) => `${bowl(lin)}
<g ${B}><path d="M13 50 C13 12 87 12 87 50 C87 58 13 58 13 50Z" fill="${rad(["#FFFDF4", C.paper, C.creamD], 0.36, 0.28, 0.85)}"/></g>
<g stroke="${C.creamD}" stroke-width="1.8" stroke-linecap="round"><path d="M30 38 l3 3 M44 24 l3 3 M58 30 l3 -2 M70 42 l-3 3 M38 50 l3 2 M52 42 l2 3 M62 52 l3 1 M24 50 l3 1 M76 50 l-3 1"/></g>
<ellipse cx="38" cy="28" rx="6" ry="3.2" transform="rotate(-28 38 28)" fill="#fff" opacity=".6"/>`,
  },
  {
    u: "1f35b",
    n: "curry rice",
    draw: ({ lin, rad }) => `
<g ${B}><ellipse cx="50" cy="66" rx="45" ry="29" fill="${lin([C.paper, C.creamD], "d")}"/></g>
<ellipse cx="50" cy="66" rx="36" ry="21" fill="${lin([C.paperD, C.paper], "d")}" opacity=".9"/>
<ellipse cx="50" cy="66" rx="40" ry="25" fill="none" stroke="${C.blueM}" stroke-width="2.2"/>
<g ${B}><path d="M46 46 C58 34 84 42 84 62 C84 76 64 84 48 78 C60 70 56 54 46 46Z" fill="${lin(["#E0A040", "#B8701F", "#8E4F1B"], "d")}"/></g>
<g ${Bs}><rect x="60" y="48" width="9" height="9" rx="2" transform="rotate(14 64 52)" fill="${lin([C.gold, C.goldD])}"/><circle cx="74" cy="62" r="5" fill="${lin([C.orange, C.orangeD])}"/><circle cx="62" cy="68" r="4.4" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><path d="M14 66 C10 36 34 22 48 36 C56 48 52 72 40 78 C26 80 16 76 14 66Z" fill="${rad([C.paper, "#EFE3C6", C.creamD], 0.36, 0.28, 0.9)}"/></g>
<g stroke="${C.creamD}" stroke-width="1.7" stroke-linecap="round"><path d="M26 44 l3 3 M36 38 l3 2 M30 58 l3 -2 M42 52 l2 3 M22 62 l3 2 M38 68 l3 -1"/></g>
<ellipse cx="28" cy="40" rx="5" ry="3" transform="rotate(-30 28 40)" fill="#fff" opacity=".55"/>`,
  },
  {
    u: "1f35c",
    n: "steaming bowl",
    draw: ({ lin, rad, clip }) => `${steam(26, 36)}${steam(40, 32)}
<g ${Bs}><path d="M58 40 L90 10 M66 44 L94 18" stroke="${C.wood}" stroke-width="3.6" stroke-linecap="round" fill="none"/></g>
${bowl(lin)}
<ellipse cx="50" cy="50" rx="37" ry="7.2" fill="${lin(["#E9A64A", "#BE7A2B"])}"/>
<g ${Bs}><path d="M16 50 C18 34 82 34 84 50 C72 58 28 58 16 50Z" fill="${lin([C.yellow, C.yellowM])}"/></g>
<g fill="none" stroke="${C.yellowD}" stroke-width="1.5" stroke-linecap="round" opacity=".8"><path d="M22 47 C32 40 38 54 48 45 S64 42 78 47"/><path d="M26 52 C36 46 44 58 54 50 S68 49 76 53"/></g>
<g ${Bs}><ellipse cx="34" cy="44" rx="9" ry="6.4" fill="${lin([C.paper, C.creamD])}"/><circle cx="34" cy="44" r="3.4" fill="${lin([C.gold, C.orangeD])}"/>
<circle cx="64" cy="44" r="7.4" fill="${lin(["#FBD0DA", C.pinkD])}"/><path d="M64 44 m-4 0 a4 4 0 1 1 4 4" fill="none" stroke="${C.paper}" stroke-width="1.4"/>
<rect x="46" y="36" width="10" height="13" rx="1.5" transform="rotate(8 51 42)" fill="${lin(["#5E8F72", "#2E5642"])}"/></g>
<g fill="${C.greenM}"><circle cx="48" cy="52" r="1.8"/><circle cx="54" cy="54" r="1.7"/><circle cx="43" cy="55" r="1.6"/><circle cx="75" cy="52" r="1.6"/></g>`,
  },
  {
    u: "1f35d",
    n: "spaghetti",
    draw: ({ lin, rad }) => `
<g ${B}><ellipse cx="50" cy="66" rx="46" ry="28" fill="${lin([C.paper, C.creamD], "d")}"/></g>
<ellipse cx="50" cy="66" rx="40" ry="23" fill="none" stroke="${C.blueM}" stroke-width="2.2"/>
<g ${B}><path d="M18 64 C16 38 84 38 82 64 C82 78 18 78 18 64Z" fill="${lin(["#FBE08A", C.yellow, C.yellowM], "d")}"/></g>
<g fill="none" stroke="${C.yellowD}" stroke-width="1.6" stroke-linecap="round" opacity=".7"><path d="M22 62 C38 46 58 76 78 58"/><path d="M24 70 C40 56 60 80 76 68"/><path d="M30 50 C44 60 56 44 72 52"/></g>
<g ${Bs}><path d="M30 46 C32 32 68 30 70 46 C68 56 32 56 30 46Z" fill="${lin(["#F58578", C.redM, C.redD], "d")}"/>
<circle cx="40" cy="38" r="8.4" fill="${rad([C.wood, C.woodD, C.woodDD])}"/><circle cx="58" cy="36" r="8.4" fill="${rad([C.wood, C.woodD, C.woodDD])}"/></g>
<path d="M44 30 q4 -10 14 -14 q2 10 -8 16 q-4 0 -6 -2Z" fill="${C.greenM}"/><path d="M46 30 Q52 24 56 19" stroke="${C.greenD}" stroke-width="1" fill="none"/>
<ellipse cx="37" cy="35" rx="2.6" ry="1.6" fill="#fff" opacity=".4"/>`,
  },
  {
    u: "1f360",
    n: "roasted sweet potato",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-32 50 50)">
<path d="M3 52 C5 38 28 33 52 34 C74 35 92 40 97 52 C92 64 74 69 52 69 C28 69 6 66 3 52Z" fill="${lin(["#C9809E", "#A0527A", "#7A3A5E"])}"/>
<path d="M68 36 C84 36 97 42 97 52 C97 62 84 67 68 67 C76 58 76 45 68 36Z" fill="${lin(["#FFE08A", "#F5A95C"], "d")}"/>
</g></g>
<g transform="rotate(-32 50 50)" fill="none" stroke="#6E3355" stroke-linecap="round" opacity=".55"><path d="M12 46 C24 42 34 44 46 42 M10 58 C22 62 34 60 48 62 M30 52 C38 50 46 52 56 50" stroke-width="1.6"/></g>
<g transform="rotate(-32 50 50)" fill="#E7922F" opacity=".6"><circle cx="82" cy="46" r="1.6"/><circle cx="86" cy="54" r="1.6"/><circle cx="80" cy="58" r="1.4"/></g>
<g transform="rotate(-32 50 50)"><ellipse cx="30" cy="40" rx="14" ry="3" fill="#fff" opacity=".3"/></g>`,
  },
  {
    u: "1f362",
    n: "oden",
    draw: ({ lin, rad }) => `
<g ${Bs}><g transform="rotate(-45 50 50)"><path d="M-9 48.2 H109 L112 50 L109 51.8 H-9Z" fill="${C.woodL}"/><rect x="-9" y="48.2" width="118" height="3.6" fill="${lin([C.woodL, C.wood])}"/></g></g>
<g ${B}><g transform="rotate(-45 50 50)"><path d="M10 68 L38 68 L24 30Z" fill="${lin(["#FDE6DA", "#F2BFA8", "#D99478"])}" stroke="#E5A98E" stroke-width="3" stroke-linejoin="round"/></g></g>
<g ${B}><g transform="rotate(-45 50 50)"><circle cx="55" cy="50" r="13" fill="${rad([C.paper, "#E6D6B0", C.creamD])}"/></g></g>
<g transform="rotate(-45 50 50)" fill="none" stroke="#B9A57A" stroke-width="1.3" opacity=".8"><circle cx="55" cy="50" r="7.6"/><path d="M55 37 V63 M42 50 H68" opacity=".5"/></g>
<g ${B}><g transform="rotate(-45 50 50)"><ellipse cx="84" cy="50" rx="11" ry="13.5" fill="${rad(["#EAD5A4", "#C9A66A", "#9F7A40"])}"/></g></g>
<g transform="rotate(-45 50 50)"><ellipse cx="80" cy="44" rx="4" ry="2.4" fill="#fff" opacity=".45"/></g>`,
  },
  {
    u: "1f363",
    n: "sushi",
    draw: ({ lin, clip }) => `
<g ${B}><path d="M10 62 C10 48 20 44 30 44 H70 C80 44 90 48 90 62 C90 76 80 80 70 80 H30 C20 80 10 76 10 62Z" fill="${lin([C.paper, "#EFE3C6", C.creamD])}"/></g>
<g stroke="${C.creamD}" stroke-width="1.5" stroke-linecap="round"><path d="M16 66 l3 2 M28 72 l3 -1 M70 72 l3 1 M82 66 l-3 2 M20 56 l3 -1"/></g>
<g ${B}><path d="M7 52 C7 34 28 24 50 24 C72 24 93 34 93 52 C93 58 80 55 50 57 C20 55 7 58 7 52Z" fill="${lin(["#FBB878", "#F08A55", "#DD6A44"])}"/></g>
<g fill="none" stroke="${C.paper}" stroke-width="2.4" stroke-linecap="round" opacity=".75"><path d="M22 32 C27 38 29 46 26 54 M64 28 C68 36 69 44 67 54 M80 38 C83 43 84 48 83 53"/></g>
<g ${Bs}><rect x="43" y="26" width="13" height="58" rx="2" fill="${lin(["#5E8F72", "#3E6B52", "#2E5642"], "h")}"/></g>
<ellipse cx="32" cy="32" rx="9" ry="3" transform="rotate(-14 32 32)" fill="#fff" opacity=".35"/>`,
  },
  {
    u: "1f364",
    n: "fried shrimp",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(0 72 62)">
<ellipse cx="72" cy="80" rx="5.8" ry="13" transform="rotate(-28 72 62)" fill="${lin([C.orange, C.red])}"/>
<ellipse cx="72" cy="80" rx="5.8" ry="13" fill="${lin([C.orange, C.redM])}"/>
<ellipse cx="72" cy="80" rx="5.8" ry="13" transform="rotate(28 72 62)" fill="${lin([C.orange, C.red])}"/>
</g></g>
<g ${B}><path d="M20 72 C8 44 30 18 58 26 C74 31 80 48 72 64" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="25" stroke-linecap="round"/></g>
<path d="M7 45 L29 52 M26 21 L38 41" stroke="${C.goldD}" stroke-width="2" stroke-linecap="round" opacity=".6" fill="none"/>
<path d="M50 14 L52 36 M62 22 L58 40" stroke="${C.goldD}" stroke-width="2" stroke-linecap="round" opacity=".55" fill="none"/>
<g fill="${C.goldD}" opacity=".55"><circle cx="16" cy="60" r="1.6"/><circle cx="28" cy="30" r="1.5"/><circle cx="46" cy="36" r="1.4"/><circle cx="70" cy="46" r="1.5"/><circle cx="14" cy="48" r="1.3"/></g>
<path d="M14 36 C20 26 30 20 42 19" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".4"/>`,
  },
  {
    u: "1f365",
    n: "fish cake with swirl",
    draw: ({ lin, rad }) => {
      const scal = Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return `<circle cx="${(50 + 35 * Math.cos(a)).toFixed(1)}" cy="${(50 + 35 * Math.sin(a)).toFixed(1)}" r="8.6"/>`;
      }).join("");
      return `<g ${B}><g fill="${lin([C.paper, C.creamD], "d")}">${scal}<circle cx="50" cy="50" r="36"/></g></g>
<g ${Bs}><circle cx="50" cy="50" r="30" fill="${rad([C.paper, "#F2E6CC", C.creamD], 0.36, 0.3, 0.85)}"/></g>
<path d="${spiral(50, 50, 25, 2.2)}" fill="none" stroke="${C.pinkD}" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${spiral(50, 50, 25, 2.2)}" fill="none" stroke="#FBD0DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`;
    },
  },
  {
    u: "1f96e",
    n: "moon cake",
    draw: ({ lin, rad }) => {
      const petals = Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-17" rx="6" ry="11" transform="rotate(${i * 45})"/>`).join("");
      return `<g ${B}><ellipse cx="50" cy="56" rx="43" ry="36" fill="${C.woodDD}"/><ellipse cx="50" cy="46" rx="43" ry="36" fill="${rad(["#EDB26A", "#C98238", "#8E5428"], 0.36, 0.3, 0.85)}"/></g>
<g transform="translate(50 46) scale(1 .84)"><circle r="34" fill="none" stroke="#7B4A22" stroke-width="2" opacity=".5"/><g fill="#F6D29A" opacity=".5">${petals}</g><circle r="9" fill="#8E5428" opacity=".6"/><circle r="5" fill="#F6D29A" opacity=".6"/></g>
<ellipse cx="28" cy="26" rx="9" ry="3.6" transform="rotate(-30 28 26)" fill="#fff" opacity=".3"/>`;
    },
  },
  {
    u: "1f361",
    n: "dango",
    draw: ({ lin, rad }) => `
<g ${Bs}><g transform="rotate(40 50 50)"><rect x="47.4" y="-4" width="5.2" height="108" rx="2.6" fill="${lin([C.woodL, C.wood], "h")}"/></g></g>
<g ${B}><g transform="rotate(40 50 50)"><circle cx="50" cy="80" r="15.5" fill="${rad(["#EAF4D8", C.green, C.greenM])}"/></g></g>
<g ${B}><g transform="rotate(40 50 50)"><circle cx="50" cy="50" r="15.5" fill="${rad([C.paper, "#EFE3C6", C.creamD])}"/></g></g>
<g ${B}><g transform="rotate(40 50 50)"><circle cx="50" cy="20" r="15.5" fill="${rad(["#FDDCE4", C.pink, C.pinkD])}"/></g></g>`,
  },
  {
    u: "1f95f",
    n: "dumpling",
    draw: ({ lin, clip }) => {
      const body = "M7 64 C7 36 32 25 50 25 C68 25 93 36 93 64 C93 77 78 81 50 81 C22 81 7 77 7 64Z";
      return `<g ${B}><path d="${body}" fill="${lin(["#FFFBF0", C.paper, C.creamD], "d")}"/></g>
<g ${clip(`<path d="${body}"/>`)}><ellipse cx="50" cy="84" rx="48" ry="12" fill="${C.goldM}" opacity=".5"/></g>
<g stroke="#C9B788" stroke-width="2" stroke-linecap="round" fill="none"><path d="M20 46 C22 50 25 54 26 56 M31 37 C34 41 35 46 36 50 M42 31 C44 36 44 40 44 45 M54 30 C54 35 54 40 54 45 M65 33 C64 38 63 42 62 47 M76 39 C74 44 72 48 70 52 M85 49 C82 53 80 56 77 58"/></g>
<path d="M12 62 C30 70 70 70 88 62" stroke="#B89F6C" stroke-width="1.6" fill="none" opacity=".5"/>
<ellipse cx="28" cy="40" rx="8" ry="3" transform="rotate(-36 28 40)" fill="#fff" opacity=".55"/>`;
    },
  },
  {
    u: "1f960",
    n: "fortune cookie",
    draw: ({ lin }) => `
<g ${B}><path d="M4 44 C14 18 86 18 96 44 C80 57 20 57 4 44Z" fill="${lin([C.goldD, C.goldM, C.gold])}"/></g>
<path d="M14 40 C30 28 70 28 86 40" fill="none" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round" opacity=".45"/>
<g ${B}><g transform="rotate(-34 50 44)"><rect x="44" y="37" width="50" height="13" fill="${lin([C.paper, C.paperD])}"/></g></g>
<g transform="rotate(-34 50 44)" stroke="${C.redM}" stroke-width="1.8" stroke-linecap="round"><path d="M58 41.5 H68 M72 41.5 H86 M58 46 H78"/></g>
<g ${B}><path d="M4 44 C22 58 78 58 96 44 C100 66 76 86 50 86 C24 86 0 66 4 44Z" fill="${lin(["#F8D878", C.gold, C.goldM, C.goldD], "d")}"/></g>
<path d="M52 56 C45 66 45 76 51 85" stroke="${C.goldD}" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".75"/>
<path d="M14 54 C18 66 28 74 40 77 M60 70 C66 66 72 62 78 56" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".4"/>`,
  },
  {
    u: "1f961",
    n: "takeout box",
    draw: ({ lin }) => `
<path d="M28 36 C26 10 74 10 72 36" fill="none" stroke="${C.metalD}" stroke-width="2.4" stroke-linecap="round"/>
<g ${Bs}><path d="M46 34 L74 4 M54 34 L84 10" stroke="${C.wood}" stroke-width="3.6" stroke-linecap="round" fill="none"/></g>
<g ${B}><path d="M21 38 H79 L70 92 H30Z" fill="${lin([C.paper, C.creamD], "h")}"/></g>
<g ${B}><polygon points="21,38 79,38 72,26 28,26" fill="${lin([C.paperD, C.creamD])}"/></g>
<path d="M24 54 H76 L74 62 H26Z" fill="${lin([C.red, C.redD], "h")}"/>
<path d="M29 74 L36 68 L43 74 L50 68 L57 74 L64 68 L71 74" fill="none" stroke="${C.redM}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M28 26 L50 38 L72 26" fill="none" stroke="#B89F6C" stroke-width="1.4" opacity=".7"/>
<g ${Bs}><circle cx="23" cy="38" r="2.8" fill="${C.metalD}"/><circle cx="77" cy="38" r="2.8" fill="${C.metalD}"/></g>`,
  },
  {
    u: "1f366",
    n: "soft ice cream",
    draw: ({ lin, rad }) => {
      const cream = lin(["#FFF6D8", "#F0E0B0", "#D6BE86"], "d");
      return `<g ${B}><polygon points="25,54 75,54 50,96" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<path d="M33 60 L58 88 M43 58 L62 80 M54 56 L68 72 M67 58 L36 90 M57 58 L42 76 M47 58 L52 64" stroke="${C.woodDD}" stroke-width="1.3" opacity=".55" fill="none"/>
<g ${B}><rect x="20" y="42" width="60" height="19" rx="9.5" fill="${cream}"/></g>
<g ${B}><rect x="28" y="28" width="44" height="18" rx="9" fill="${cream}"/></g>
<g ${B}><rect x="36" y="15" width="28" height="16" rx="8" fill="${cream}"/></g>
<g ${B}><path d="M42 18 C42 10 52 8 58 3 C57 9 61 13 58 18Z" fill="${cream}"/></g>
<path d="M26 50 Q40 55 56 48 M33 36 Q47 40 60 34" fill="none" stroke="#C8AE78" stroke-width="1.4" opacity=".6"/>`;
    },
  },
  {
    u: "1f367",
    n: "shaved ice",
    draw: ({ lin, rad, clip }) => `
<g ${Bs}><rect x="45" y="80" width="10" height="11" fill="#E1EFF8" opacity=".9"/><ellipse cx="50" cy="92" rx="19" ry="4.4" fill="#DCECF6"/></g>
<g ${B}><path d="M12 54 C8 22 92 22 88 54Z" fill="${lin(["#F6FBFF", "#D3E4F0", "#A9C4D8"], "d")}"/></g>
<path d="M18 46 C24 28 76 28 82 46 C78 54 74 46 68 55 C63 48 58 56 52 48 C46 57 40 48 35 55 C30 47 24 54 18 46Z" fill="${lin([C.red, C.redM])}" opacity=".92"/>
<path d="M12 54 H88 C88 76 72 82 58 82 H42 C28 82 12 76 12 54Z" fill="#DCECF6" fill-opacity=".5"/>
<path d="M12 54 H88 C88 76 72 82 58 82 H42 C28 82 12 76 12 54Z" fill="none" stroke="#8FB0CB" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M20 58 C22 68 28 74 34 76" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>
${cherry(rad, 50, 22, 6.5)}`,
  },
  {
    u: "1f368",
    n: "ice cream",
    draw: ({ lin, rad }) => `
<g ${Bs}><rect x="45" y="76" width="10" height="13" fill="#E1EFF8" opacity=".9"/><ellipse cx="50" cy="91" rx="20" ry="4.6" fill="#DCECF6"/></g>
<g ${B}><circle cx="33" cy="52" r="17" fill="${rad(["#FDDCE4", C.pink, C.pinkD])}"/><circle cx="67" cy="52" r="17" fill="${rad(["#B98A62", C.woodD, C.woodDD])}"/></g>
<g ${B}><circle cx="50" cy="35" r="17" fill="${rad([C.paper, "#EFE3C6", C.creamD])}"/></g>
<path d="M12 56 H88 C88 76 72 82 58 82 H42 C28 82 12 76 12 56Z" fill="#DCECF6" fill-opacity=".5"/>
<path d="M12 56 H88 C88 76 72 82 58 82 H42 C28 82 12 76 12 56Z" fill="none" stroke="#8FB0CB" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M19 60 C21 68 27 74 33 76" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>
${cherry(rad, 50, 14, 5.5)}`,
  },
  {
    u: "1f369",
    n: "doughnut",
    draw: ({ lin, rad }) => {
      const sp = [[30, 40, 20, C.blue], [42, 31, -30, C.yellow], [60, 32, 35, C.green], [73, 42, -15, C.purple], [30, 56, -40, C.yellow], [70, 58, 25, C.blue], [52, 64, 10, C.purple], [20, 50, 60, C.green]];
      return `<g ${B}><path fill-rule="evenodd" d="M6 56 a44 38 0 1 0 88 0 a44 38 0 1 0 -88 0Z M38 59 a12 9 0 1 0 24 0 a12 9 0 1 0 -24 0Z" fill="${lin(["#EDBC84", C.wood, C.woodD], "d")}"/></g>
<g ${B}><path fill-rule="evenodd" d="M9 50 a41 35 0 1 0 82 0 a41 35 0 1 0 -82 0Z M37 52 a13 9.5 0 1 0 26 0 a13 9.5 0 1 0 -26 0Z" fill="${lin(["#FBD0DA", C.pink, C.pinkD], "d")}"/></g>
${sp.map(([x, y, a, c]: any[]) => `<rect x="${x - 4}" y="${y - 1.2}" width="8" height="2.6" rx="1.3" transform="rotate(${a} ${x} ${y})" fill="${c}"/>`).join("")}
<ellipse cx="26" cy="34" rx="9" ry="3.4" transform="rotate(-34 26 34)" fill="#fff" opacity=".45"/>`;
    },
  },
  {
    u: "1f36a",
    n: "cookie",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M50 8 C66 6 78 14 86 26 C94 38 96 54 88 68 C80 82 66 92 50 92 C34 92 20 84 12 70 C4 56 6 38 14 26 C22 14 36 10 50 8Z" fill="${rad(["#F2CB96", C.woodL, C.wood, "#A8713F"], 0.34, 0.3, 0.88)}"/></g>
<g ${Bs}>
<path d="M28 30 l9 -3 l4 8 l-7 5 l-7 -4Z" fill="${lin([C.woodD, C.woodDD])}"/>
<path d="M62 24 l8 2 l1 8 l-8 2 l-4 -6Z" fill="${lin([C.woodD, C.woodDD])}"/>
<path d="M44 48 l10 -2 l3 9 l-9 5 l-6 -6Z" fill="${lin([C.woodD, C.woodDD])}"/>
<path d="M72 54 l9 1 l1 8 l-8 3 l-4 -6Z" fill="${lin([C.woodD, C.woodDD])}"/>
<path d="M22 58 l8 -3 l5 6 l-6 7 l-8 -3Z" fill="${lin([C.woodD, C.woodDD])}"/>
<path d="M50 72 l8 -1 l3 7 l-8 4 l-5 -5Z" fill="${lin([C.woodD, C.woodDD])}"/>
</g>
<g fill="#A8713F" opacity=".5"><circle cx="40" cy="20" r="1.6"/><circle cx="82" cy="42" r="1.6"/><circle cx="16" cy="44" r="1.6"/><circle cx="66" cy="76" r="1.6"/><circle cx="30" cy="80" r="1.5"/></g>
<ellipse cx="30" cy="20" rx="9" ry="3.4" transform="rotate(-34 30 20)" fill="#fff" opacity=".35"/>`,
  },
  {
    u: "1f382",
    n: "birthday cake",
    draw: ({ lin, rad }) => {
      const cand = [[38, C.blue, C.blueD], [50, C.red, C.redD], [62, C.yellow, C.yellowD]];
      return `${cand.map(([x, a, b]: any[]) => `<g ${Bs}><rect x="${x - 2.4}" y="18" width="4.8" height="17" rx="1.2" fill="${lin([a, b], "h")}"/></g><path d="M${x} 6 C${x - 4.4} 11 ${x - 3} 16.5 ${x} 16.5 C${x + 3} 16.5 ${x + 4.4} 11 ${x} 6Z" fill="${lin([C.yellow, C.orange])}"/>`).join("")}
<g ${B}><rect x="10" y="60" width="80" height="31" rx="6" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<rect x="10" y="74" width="80" height="5" fill="${C.paper}" opacity=".9"/>
<g ${B}><rect x="24" y="34" width="52" height="28" rx="5" fill="${lin(["#FBD0DA", C.pink, C.pinkD])}"/></g>
<rect x="24" y="47" width="52" height="4" fill="${C.paper}" opacity=".85"/>
<g ${B}><path d="M8 60 C8 52 14 50 18 52 H82 C86 50 92 52 92 60 C92 66 88 68 86 63 C84 60 82 64 80 68 C78 72 74 70 74 64 C72 60 70 62 68 65 C66 68 62 67 62 62 C60 58 58 60 56 64 C54 68 50 67 50 62 C48 58 46 60 44 65 C42 69 38 67 38 62 C36 58 34 60 32 65 C30 69 26 67 26 62 C24 58 20 62 18 65 C14 68 8 67 8 60Z" fill="${lin([C.paper, C.paperD])}"/></g>
<g fill="${C.red}"><circle cx="30" cy="85" r="2"/><circle cx="50" cy="84" r="2"/><circle cx="70" cy="85" r="2"/></g>`;
    },
  },
  {
    u: "1f370",
    n: "shortcake",
    draw: ({ lin, rad }) => {
      const lay = [[44, 48, "#FFF6D8", "#E2D4AE"], [48, 56, C.yellow, C.yellowM], [56, 62, C.paper, C.creamD], [62, 76, C.yellow, C.yellowM], [76, 82, C.paper, C.creamD], [82, 90, C.yellow, C.yellowM]];
      const dy = (y) => y;
      return `<g ${B}>
<polygon points="8,44 26,28 92,28 66,44" fill="${lin(["#FFFBF0", C.paper], "d")}"/>
<polygon points="66,44 92,28 92,74 66,90" fill="${lin([C.yellowM, C.yellowD])}"/>
<rect x="8" y="44" width="58" height="46" fill="${lin([C.yellow, C.yellowM])}"/>
</g>
${lay.slice(2).map(([a, b, c1]: any[]) => `<rect x="8" y="${a}" width="58" height="${b - a}" fill="${c1}"/><polygon points="66,${a} 92,${a - 16} 92,${b - 16} 66,${b}" fill="${c1}" opacity=".75"/>`).join("")}
<rect x="8" y="62" width="58" height="2" fill="${C.red}" opacity=".7"/>
<rect x="8" y="44" width="58" height="5" fill="${C.paper}" opacity=".0"/>
<g ${Bs}><path d="M48 24 C58 22 62 28 58 38 C55 44 52 46 50 47 C46 44 40 36 42 29 C43 26 45 25 48 24Z" fill="${rad(["#F58578", C.redM, C.redD])}"/></g>
<path d="M47 24 l3 4 l3 -4 l-1 5 l-5 0Z" fill="${C.greenM}"/>
<g fill="${C.gold}" opacity=".9"><circle cx="49" cy="32" r=".9"/><circle cx="54" cy="35" r=".9"/><circle cx="50" cy="40" r=".9"/></g>${dy(0) ? "" : ""}`;
    },
  },
  {
    u: "1f9c1",
    n: "cupcake",
    draw: ({ lin, rad }) => {
      const pl = [1, 2, 3, 4, 5].map((i) => `M${22 + (56 * i) / 6} 54 L${30 + (40 * i) / 6} 92`).join(" ");
      return `<g ${B}><path d="M21 52 H79 L70 92 H30Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="${pl}" stroke="${C.navyD}" stroke-width="1.6" opacity=".35"/>
<g ${B}><ellipse cx="50" cy="52" rx="35" ry="11" fill="${lin(["#FBD0DA", C.pink, C.pinkD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="40" rx="27" ry="10" fill="${lin(["#FBD0DA", C.pink, C.pinkD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="29" rx="18" ry="9" fill="${lin(["#FBD0DA", C.pink, C.pinkD], "d")}"/></g>
<g ${B}><path d="M40 28 C40 20 48 18 52 12 C54 18 60 20 60 28Z" fill="${lin(["#FBD0DA", C.pink, C.pinkD], "d")}"/></g>
<g fill="none" stroke="${C.pinkD}" stroke-width="1.4" opacity=".6"><path d="M20 53 Q50 60 80 53 M28 41 Q50 48 72 41"/></g>
<g stroke-width="2.4" stroke-linecap="round"><path d="M32 50 l4 -2" stroke="${C.yellowM}"/><path d="M60 54 l4 2" stroke="${C.blueM}"/><path d="M72 48 l3 -3" stroke="${C.greenM}"/><path d="M42 38 l4 1" stroke="${C.purple}"/><path d="M58 36 l4 -2" stroke="${C.yellowM}"/></g>
${cherry(rad, 50, 11, 5.2)}`;
    },
  },
  {
    u: "1f967",
    n: "pie",
    draw: ({ lin, rad, clip }) => {
      const flute = Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2;
        return `<circle cx="${(50 + 40 * Math.cos(a)).toFixed(1)}" cy="${(50 + 29 * Math.sin(a)).toFixed(1)}" r="5.2"/>`;
      }).join("");
      const lat = [-48, -30, -12, 6, 24, 42].map((o) => `M${o + 14} 14 L${o + 74} 86 M${o + 86} 14 L${o + 26} 86`).join(" ");
      return `<g ${B}><ellipse cx="50" cy="60" rx="45" ry="32" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g ${B}><g fill="${lin(["#F0BE72", "#D4954A", "#A86A30"], "d")}">${flute}<ellipse cx="50" cy="50" rx="39" ry="28"/></g></g>
<ellipse cx="50" cy="50" rx="31" ry="21" fill="${rad([C.red, C.redM, C.redD])}"/>
<g ${clip('<ellipse cx="50" cy="50" rx="31" ry="21"/>')}><path d="${lat}" stroke="${C.wood}" stroke-width="4.6" fill="none"/><path d="${lat}" stroke="${C.woodL}" stroke-width="1.6" fill="none" opacity=".7" transform="translate(-1 -1)"/></g>
<ellipse cx="50" cy="50" rx="31" ry="21" fill="none" stroke="${C.woodD}" stroke-width="2.2"/>
<ellipse cx="30" cy="36" rx="8" ry="2.8" transform="rotate(-26 30 36)" fill="#fff" opacity=".35"/>`;
    },
  },
  {
    u: "1f36b",
    n: "chocolate bar",
    draw: ({ lin }) => {
      const sq: string[] = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) sq.push(`<rect x="${29 + c * 21.5}" y="${13 + r * 14.5}" width="20" height="13.4" rx="2.4" fill="${lin(["#A86A3E", "#7A4A2A", "#5E3820"], "d")}"/>`);
      return `<g ${Bs}><g transform="rotate(-28 50 50)">${sq.join("")}</g></g>
<g transform="rotate(-28 50 50)"><path d="M32 17 H46 M53 17 H64 M32 31.5 H44 M53 46 H66" stroke="#D9A070" stroke-width="1.6" stroke-linecap="round" opacity=".55"/></g>
<g ${B}><g transform="rotate(-28 50 50)"><rect x="28" y="50" width="44" height="38" rx="3" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g></g>
<g ${Bs}><g transform="rotate(-28 50 50)"><rect x="29" y="45" width="42" height="9" rx="2" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g></g>
<g transform="rotate(-28 50 50)"><rect x="28" y="66" width="44" height="7" fill="${C.gold}"/><polygon points="${star(50, 69.5, 5.4, 2.4)}" fill="${C.redD}"/></g>`;
    },
  },
  {
    u: "1f36c",
    n: "candy",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(-30 50 50)">
<path d="M34 50 L13 32 Q9 50 13 68Z" fill="${lin(["#C9DAF7", C.blueM])}"/>
<path d="M66 50 L87 32 Q91 50 87 68Z" fill="${lin(["#C9DAF7", C.blueM])}"/>
</g></g>
<g transform="rotate(-30 50 50)" stroke="${C.blueD}" stroke-width="1.4" opacity=".55" fill="none"><path d="M33 50 L14 40 M33 50 L12 50 M33 50 L14 60 M67 50 L86 40 M67 50 L88 50 M67 50 L86 60"/></g>
<g ${B}><g transform="rotate(-30 50 50)"><ellipse cx="50" cy="50" rx="21" ry="18" fill="${rad(["#FDDCE4", C.pink, C.pinkD, "#C96485"], 0.36, 0.3, 0.9)}"/></g></g>
<g transform="rotate(-30 50 50)" stroke="${C.paper}" stroke-width="3.2" stroke-linecap="round" fill="none" opacity=".9"><path d="M42 36 C46 46 46 54 42 64 M54 34 C58 46 58 54 54 66"/></g>
<g ${Bs}><g transform="rotate(-30 50 50)"><rect x="27" y="45" width="6" height="10" rx="2" fill="${C.pinkD}"/><rect x="67" y="45" width="6" height="10" rx="2" fill="${C.pinkD}"/></g></g>`,
  },
  {
    u: "1f36d",
    n: "lollipop",
    draw: ({ lin, rad }) => `
<g ${Bs}><path d="M54 54 L88 88" stroke="${C.creamD}" stroke-width="6.4" stroke-linecap="round" fill="none"/></g>
<g ${B}><circle cx="40" cy="38" r="31" fill="${rad(["#FDDCE4", C.pink, C.pinkD, "#C96485"], 0.36, 0.3, 0.9)}"/></g>
<path d="${spiral(40, 38, 25, 2.5)}" fill="none" stroke="${C.paper}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
<path d="${spiral(40, 38, 25, 2.5)}" fill="none" stroke="${C.red}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".55" transform="translate(0 0)"/>
<g ${Bs}><path d="M60 60 L46 56 L52 70Z M60 60 L74 64 L68 50Z" fill="${lin([C.blue, C.blueD])}"/><circle cx="60" cy="60" r="4.2" fill="${lin([C.blue, C.blueD])}"/></g>
<ellipse cx="22" cy="22" rx="8" ry="3.4" transform="rotate(-42 22 22)" fill="#fff" opacity=".5"/>`,
  },
  {
    u: "1f36e",
    n: "custard",
    draw: ({ lin, rad }) => `
<g ${B}><ellipse cx="50" cy="84" rx="44" ry="10" fill="${lin([C.paper, C.creamD], "d")}"/></g>
<ellipse cx="50" cy="83" rx="36" ry="6.4" fill="none" stroke="${C.blueM}" stroke-width="1.8"/>
<g ${B}><path d="M22 82 L30 40 H70 L78 82 C60 90 40 90 22 82Z" fill="${lin(["#FDE79A", C.yellow, C.yellowM], "h")}"/></g>
<g ${B}><path d="M28 42 C26 28 74 28 72 42 C72 50 68 46 66 56 C64 62 60 56 60 50 C58 46 54 52 52 60 C50 66 46 60 46 52 C44 46 40 48 38 56 C36 60 32 54 32 48 C30 46 28 48 28 42Z" fill="${lin(["#E0963A", "#B3631F", "#8E4A19"])}"/></g>
<ellipse cx="42" cy="36" rx="9" ry="2.6" transform="rotate(-8 42 36)" fill="#fff" opacity=".35"/>
${cherry(rad, 50, 24, 6)}`,
  },
  {
    u: "1f36f",
    n: "honey pot",
    draw: ({ lin, rad }) => `
<g ${Bs}><g transform="rotate(38 76 28)"><rect x="73" y="-2" width="6" height="34" rx="2" fill="${lin([C.woodL, C.wood], "h")}"/><g fill="${C.woodD}" opacity=".6"><rect x="73" y="2" width="6" height="2"/><rect x="73" y="8" width="6" height="2"/><rect x="73" y="14" width="6" height="2"/></g><ellipse cx="76" cy="38" rx="7" ry="9" fill="${lin([C.woodL, C.wood])}"/></g></g>
<g ${B}><path d="M20 44 C10 62 16 90 50 91 C84 90 90 62 80 44Z" fill="${rad(["#FBE089", C.gold, C.goldM, C.goldD], 0.34, 0.34, 0.9)}"/></g>
<g ${B}><ellipse cx="50" cy="44" rx="30" ry="9" fill="${lin([C.woodL, C.wood])}"/></g>
<ellipse cx="50" cy="44" rx="25" ry="6" fill="${lin(["#F8C24A", "#D9901F"])}"/>
<g ${B}><path d="M24 44 C24 52 30 52 30 60 C30 66 36 66 36 58 C36 50 38 48 40 46Z" fill="${lin(["#F8C24A", "#D9901F"])}"/></g>
<g ${Bs}><ellipse cx="53" cy="68" rx="17" ry="12" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M53 62 l5 3 v6 l-5 3 l-5 -3 v-6Z" fill="none" stroke="${C.goldD}" stroke-width="2"/>
<ellipse cx="30" cy="62" rx="3" ry="8" transform="rotate(10 30 62)" fill="#fff" opacity=".4"/>`,
  },
];

// per-icon framing: [dx, dy, scale about the centre]
const fit = {
  "1f96b": [0, 0, 1.16], "1f371": [0, -6, 1], "1f35a": [0, -8, 1], "1f35b": [0, -12, 1], "1f368": [0, 0, 0.93],
  "1f370": [0, -7, 1], "1f9c1": [0, 5, 1], "1f36f": [-6, 3, 1],
};
const __batch: Icon[] = icons.map((ic) => {
  const f = fit[ic.u];
  if (!f) return ic;
  const [dx, dy, k] = f;
  return { ...ic, draw: (t) => `<g transform="translate(${50 + dx} ${50 + dy}) scale(${k}) translate(-50 -50)">${ic.draw(t)}</g>` };
});

export default __batch;
