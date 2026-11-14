// objects-7: home, bathroom, cleaning, misc objects.
import { B, Bs, C } from "../kit.mjs";

const I = (u, n, draw) => ({ u, n, draw });
const stone = ["#D3CABB", "#A59B8B", "#7E7468"];

export default [
  I("1fa9f", "window", ({ lin }) => `
<g ${B}><rect x="12" y="6" width="76" height="82" rx="6" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><rect x="20" y="14" width="28" height="32" rx="2" fill="${lin([C.sky, C.skyD, C.blue], "d")}"/><rect x="52" y="14" width="28" height="32" rx="2" fill="${lin([C.sky, C.skyD, C.blue], "d")}"/><rect x="20" y="50" width="28" height="30" rx="2" fill="${lin([C.sky, C.skyD, C.blue], "d")}"/><rect x="52" y="50" width="28" height="30" rx="2" fill="${lin([C.sky, C.skyD, C.blue], "d")}"/></g>
<path d="M25 38 L35 19 M57 38 L67 19 M25 74 L35 55 M57 74 L67 55" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>
<g ${B}><rect x="6" y="84" width="88" height="10" rx="4" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>`),

  I("1f6cf-fe0f", "bed", ({ lin }) => `
<g transform="translate(0 -6)"><g ${B}><rect x="6" y="18" width="12" height="76" rx="5" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/><rect x="82" y="52" width="12" height="42" rx="5" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}><rect x="14" y="62" width="76" height="14" rx="4" fill="${lin([C.wood, C.woodD])}"/></g>
<g ${B}><rect x="16" y="46" width="70" height="22" rx="8" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><rect x="20" y="34" width="26" height="18" rx="9" fill="${lin([C.pink, C.pinkD], "d")}"/></g>
<g ${B}><path d="M42 50 H84 a6 6 0 0 1 6 6 V70 H42Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M44 58 H88" stroke="#fff" stroke-width="1.6" opacity=".4"/></g>`),

  I("1f6cb-fe0f", "couch and lamp", ({ lin }) => `
<g ${B}><rect x="12" y="34" width="56" height="34" rx="12" fill="${lin([C.purple, C.purpleD])}"/></g>
<g ${B}><rect x="14" y="54" width="52" height="22" rx="7" fill="${lin([C.purple, "#9378C8"])}"/></g>
<g ${B}><rect x="4" y="46" width="16" height="36" rx="8" fill="${lin([C.purple, C.purpleD], "d")}"/><rect x="60" y="46" width="16" height="36" rx="8" fill="${lin([C.purple, C.purpleD], "d")}"/></g>
<path d="M40 56 V74" stroke="${C.purpleD}" stroke-width="1.4" opacity=".6"/>
<g ${Bs}><rect x="9" y="82" width="6" height="8" rx="2" fill="${C.woodD}"/><rect x="65" y="82" width="6" height="8" rx="2" fill="${C.woodD}"/></g>
<g ${Bs}><rect x="86" y="38" width="4" height="48" fill="${C.goldD}"/><ellipse cx="88" cy="89" rx="9" ry="4" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${B}><path d="M82 12 H94 L97 38 H79Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "h")}"/></g>`),

  I("1fa91", "chair", ({ lin }) => {
    const w = lin([C.woodL, C.wood, C.woodD], "h");
    return `
<g ${B}><rect x="24" y="6" width="8" height="86" rx="3" fill="${w}"/><rect x="68" y="6" width="8" height="86" rx="3" fill="${w}"/></g>
<g ${B}><rect x="30" y="12" width="40" height="8" rx="3" fill="${lin([C.woodL, C.wood])}"/><rect x="30" y="28" width="40" height="8" rx="3" fill="${lin([C.woodL, C.wood])}"/></g>
<g ${B}><rect x="18" y="46" width="64" height="14" rx="5" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}><rect x="20" y="58" width="9" height="34" rx="3" fill="${w}"/><rect x="71" y="58" width="9" height="34" rx="3" fill="${w}"/></g>`;
  }),

  I("1f6bd", "toilet", ({ lin }) => {
    const p = lin(["#F4F6F8", "#CBD3DB", "#9BA6B3"], "d");
    return `
<g ${B}><rect x="14" y="6" width="42" height="34" rx="6" fill="${p}"/></g>
<g ${Bs}><rect x="10" y="4" width="50" height="8" rx="4" fill="${lin([C.metalL, C.metal])}"/><circle cx="46" cy="9" r="2.6" fill="${C.goldM}"/></g>
<g ${B}><path d="M24 62 H90 C90 78 78 84 66 84 V90 H34 V84 C28 80 24 72 24 62Z" fill="${p}"/></g>
<g ${B}><path d="M8 40 H92 C92 52 86 62 76 62 H24 C14 62 8 52 8 40Z" fill="${lin(["#F4F6F8", "#BFC8D2"])}"/></g>
<ellipse cx="46" cy="44" rx="30" ry="4.5" fill="${C.skyD}" opacity=".75"/>
<g ${B}><rect x="26" y="88" width="48" height="6" rx="3" fill="${lin([C.metal, C.metalD])}"/></g>`;
  }),

  I("1faa0", "plunger", ({ lin }) => `
<g ${B}><g transform="translate(9 -6) rotate(35 50 50)"><rect x="46" y="4" width="8" height="56" rx="4" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g></g>
<g ${B}><g transform="translate(9 -6) rotate(35 50 50)"><path d="M26 94 C26 72 34 56 50 56 C66 56 74 72 74 94 C60 98 40 98 26 94Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g></g>
<g transform="translate(9 -6) rotate(35 50 50)"><path d="M36 76 C38 68 42 63 47 61" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".4"/></g>`),

  I("1f6bf", "shower", ({ lin }) => `
<g ${B}><path d="M10 6 H18 V30 H44" fill="none" stroke="${C.metalD}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></g>
<g ${B}><g transform="rotate(14 66 30)"><path d="M38 38 C38 12 94 12 94 38Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/><rect x="40" y="36" width="52" height="7" rx="3.5" fill="${lin([C.metal, C.metalD])}"/></g></g>
<g stroke="${C.blueM}" stroke-width="3.6" stroke-linecap="round"><path d="M34 56 V66 M48 56 V74 M62 56 V68 M76 56 V74 M90 54 V64 M41 80 V90 M69 82 V92"/></g>
<g stroke="${C.sky}" stroke-width="1.4" stroke-linecap="round"><path d="M34 57 V60 M48 57 V62 M62 57 V60 M76 57 V62 M41 81 V84 M69 83 V86"/></g>`),

  I("1f6c1", "bathtub", ({ lin, rad }) => `
<g ${B}><path d="M88 42 V16 a8 8 0 0 0 -16 0" fill="none" stroke="${C.metalD}" stroke-width="6" stroke-linecap="round"/></g>
<g ${B}><path d="M6 46 H94 C94 72 84 84 70 84 H30 C16 84 6 72 6 46Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="4" y="42" width="92" height="9" rx="4.5" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${Bs}><circle cx="22" cy="90" r="4.5" fill="${C.goldM}"/><circle cx="78" cy="90" r="4.5" fill="${C.goldM}"/></g>
<g ${Bs}><circle cx="26" cy="30" r="9" fill="${rad([[0, "#fff", 0.8], [1, C.skyD, 0.9]])}"/><circle cx="46" cy="24" r="12" fill="${rad([[0, "#fff", 0.8], [1, C.skyD, 0.9]])}"/><circle cx="62" cy="34" r="7" fill="${rad([[0, "#fff", 0.8], [1, C.skyD, 0.9]])}"/></g>`),

  I("1faa4", "mouse trap", ({ lin }) => `
<g transform="translate(0 -7)"><g ${B}><rect x="6" y="30" width="88" height="54" rx="6" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<path d="M14 40 H70 V74 H14" fill="none" stroke="${C.metalD}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<g ${Bs}><circle cx="22" cy="57" r="8" fill="${lin([C.metalL, C.metalD], "d")}"/><circle cx="22" cy="57" r="3" fill="${C.metalDD}"/></g>
<g ${Bs}><rect x="38" y="48" width="8" height="18" rx="2" fill="${lin([C.metal, C.metalD])}"/></g>
<g ${B}><path d="M60 70 L90 62 V48 L68 40 Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<g fill="${C.yellowD}" opacity=".6"><circle cx="74" cy="52" r="2.4"/><circle cx="82" cy="60" r="2"/><circle cx="68" cy="62" r="1.8"/></g></g>`),

  I("1fa92", "razor", ({ lin }) => `
<g ${B}><g transform="translate(-8 5) rotate(32 50 50)"><rect x="42" y="30" width="16" height="66" rx="7" fill="${lin([C.blueD, C.blue, C.blueD], "h")}"/><rect x="44" y="26" width="12" height="10" fill="${lin([C.metal, C.metalD], "h")}"/></g></g>
<g ${B}><g transform="translate(-8 5) rotate(32 50 50)"><rect x="22" y="8" width="56" height="12" rx="5" fill="${lin([C.metalL, C.metal, C.metalD])}"/><rect x="22" y="18" width="56" height="8" rx="3" fill="${lin([C.metal, C.metalDD])}"/></g></g>
<g transform="translate(-8 5) rotate(32 50 50)" stroke="${C.navyD}" stroke-width="1.4" opacity=".55"><path d="M42 50 H58 M42 58 H58 M42 66 H58 M42 74 H58"/></g>`),

  I("1f9f4", "lotion bottle", ({ lin }) => `
<g ${B}><rect x="26" y="34" width="48" height="58" rx="13" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<g ${B}><rect x="41" y="22" width="18" height="14" rx="3" fill="${lin([C.paper, C.paperD], "h")}"/><path d="M38 8 H72 a5 5 0 0 1 0 10 H38Z" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><rect x="33" y="52" width="34" height="26" rx="5" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M50 56 C47 61 45 63 45 66 a5 5 0 0 0 10 0 C55 63 53 61 50 56Z" fill="${C.blueM}"/>`),

  I("1f9f7", "safety pin", ({ lin }) => `
<g ${B}><g transform="rotate(-35 50 50)"><circle cx="17" cy="50" r="10" fill="none" stroke="${C.metalD}" stroke-width="4"/><path d="M20 40 H80 M20 60 H74" stroke="${C.metalD}" stroke-width="4.5" stroke-linecap="round"/><rect x="72" y="32" width="22" height="36" rx="8" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g transform="rotate(-35 50 50)" stroke="${C.goldD}" stroke-width="1.4" opacity=".6"><path d="M82 38 V62 M87 38 V62"/></g>
<g transform="rotate(-35 50 50)" stroke="#fff" stroke-width="1.4" opacity=".6"><path d="M22 38 H70"/></g>`),

  I("1f9f9", "broom", ({ lin }) => `
<g ${B}><g transform="translate(6 -8) rotate(35 50 50)"><rect x="47" y="2" width="6" height="52" rx="3" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g></g>
<g ${B}><g transform="translate(6 -8) rotate(35 50 50)"><path d="M32 52 H68 L78 92 H22Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g></g>
<g ${B}><g transform="translate(6 -8) rotate(35 50 50)"><rect x="30" y="46" width="40" height="9" rx="3" fill="${lin([C.red, C.redD])}"/></g></g>
<g transform="translate(6 -8) rotate(35 50 50)" stroke="${C.yellowD}" stroke-width="1.4" opacity=".7"><path d="M40 60 L36 94 M50 60 V94 M60 60 L64 94"/></g>`),

  I("1f9fa", "basket", ({ lin }) => `
<g ${B}><path d="M22 44 C22 6 78 6 78 44" fill="none" stroke="${C.woodD}" stroke-width="6" stroke-linecap="round"/></g>
<g ${B}><path d="M10 46 H90 L80 90 H20Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><rect x="6" y="40" width="88" height="10" rx="5" fill="${lin([C.woodL, C.wood])}"/></g>
<g stroke="${C.woodDD}" stroke-width="1.6" opacity=".5"><path d="M13 62 H87 M16 76 H84 M32 52 L28 88 M50 52 V88 M68 52 L72 88"/></g>`),

  I("1f9fb", "roll of paper", ({ lin }) => `
<g transform="translate(-5 0)"><g ${B}><path d="M78 66 C90 70 92 82 96 94 H70Z" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><path d="M16 22 H84 V82 C84 92 16 92 16 82Z" fill="${lin([C.paper, C.paper, C.paperD], "h")}"/></g>
<g ${B}><ellipse cx="50" cy="22" rx="34" ry="12" fill="${lin([C.paper, C.paperD])}"/></g>
<ellipse cx="50" cy="22" rx="12" ry="4.5" fill="#A89874"/>
<path d="M20 46 C38 54 62 54 80 46 M20 64 C38 72 62 72 80 64" fill="none" stroke="${C.creamD}" stroke-width="1.4"/>
<path d="M40 14 H60" stroke="none"/></g>`),

  I("1faa3", "bucket", ({ lin }) => `
<g ${B}><path d="M14 30 C14 -2 86 -2 86 30" fill="none" stroke="${C.metalD}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}><path d="M16 30 L26 90 H74 L84 30Z" fill="${lin([C.blueD, C.blue, C.blueM, C.blueD], "h")}"/></g>
<g ${B}><ellipse cx="50" cy="30" rx="34" ry="9" fill="${lin([C.metalL, C.metalD])}"/></g>
<ellipse cx="50" cy="31" rx="29" ry="6" fill="${C.navyD}" opacity=".7"/>
<path d="M20 52 C40 60 60 60 80 52" fill="none" stroke="${C.navyD}" stroke-width="1.6" opacity=".4"/>
<path d="M22 46 L27 80" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".35"/>`),

  I("1f9fc", "soap", ({ lin, rad }) => `
<g ${B}><g transform="rotate(-12 50 62)"><rect x="12" y="46" width="76" height="40" rx="13" fill="${lin([C.pink, C.pinkD], "d")}"/></g></g>
<g transform="rotate(-12 50 62)"><rect x="24" y="56" width="52" height="20" rx="8" fill="${C.pinkD}" opacity=".3"/></g>
<g ${Bs}><circle cx="30" cy="32" r="10" fill="${rad([[0, "#fff", 0.85], [1, C.skyD, 0.9]])}"/><circle cx="54" cy="22" r="14" fill="${rad([[0, "#fff", 0.85], [1, C.skyD, 0.9]])}"/><circle cx="76" cy="36" r="8" fill="${rad([[0, "#fff", 0.85], [1, C.skyD, 0.9]])}"/></g>`),

  I("1fae7", "bubbles", ({ rad }) => {
    const f = rad([[0, "#fff", 0.15], [0.7, C.sky, 0.45], [1, C.blueM, 0.6]], 0.5, 0.5, 0.55);
    const b = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${C.blueM}" stroke-width="1.6" opacity=".95"/><path d="M${x - r * 0.6} ${y - r * 0.1} A${r * 0.62} ${r * 0.62} 0 0 1 ${x - r * 0.1} ${y - r * 0.6}" fill="none" stroke="#fff" stroke-width="${r > 12 ? 3 : 2}" stroke-linecap="round"/>`;
    return `<g ${Bs}>${b(38, 62, 28)}${b(72, 28, 18)}${b(78, 76, 12)}${b(24, 22, 10)}</g>`;
  }),

  I("1faa5", "toothbrush", ({ lin }) => `
<g ${B}><g transform="translate(0 8) rotate(-32 50 50)"><rect x="4" y="40" width="72" height="14" rx="7" fill="${lin([C.teal, C.tealM, C.tealD])}"/><rect x="68" y="42" width="31" height="10" rx="3" fill="${lin([C.tealM, C.tealD])}"/></g></g>
<g ${Bs}><g transform="translate(0 8) rotate(-32 50 50)"><rect x="74" y="29" width="4" height="14" rx="2" fill="${C.blueM}"/><rect x="80" y="29" width="4" height="14" rx="2" fill="${C.paper}"/><rect x="86" y="29" width="4" height="14" rx="2" fill="${C.blueM}"/><rect x="92" y="29" width="4" height="14" rx="2" fill="${C.paper}"/></g></g>
<g ${Bs}><g transform="translate(0 8) rotate(-32 50 50)"><path d="M72 28 C76 22 88 22 98 26 C98 30 94 30 90 29 C84 28 78 30 72 28Z" fill="${lin([C.pink, C.pinkD])}"/></g></g>`),

  I("1f9fd", "sponge", ({ lin }) => `
<g ${B}><g transform="rotate(-10 50 50)"><rect x="8" y="22" width="84" height="56" rx="10" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g></g>
<g ${B}><g transform="rotate(-10 50 50)"><rect x="8" y="60" width="84" height="20" rx="9" fill="${lin([C.green, C.greenM, C.greenD])}"/></g></g>
<g transform="rotate(-10 50 50)" fill="${C.yellowD}" opacity=".7"><ellipse cx="24" cy="36" rx="5" ry="3.4"/><ellipse cx="46" cy="32" rx="3.6" ry="2.6"/><ellipse cx="68" cy="38" rx="5.6" ry="3.6"/><ellipse cx="36" cy="50" rx="3.4" ry="2.6"/><ellipse cx="58" cy="50" rx="4.6" ry="3.2"/><ellipse cx="80" cy="52" rx="3.4" ry="2.6"/></g>`),

  I("1f9ef", "fire extinguisher", ({ lin }) => `
<g ${B}><path d="M62 18 C88 18 88 40 78 54 C74 60 72 64 70 70" fill="none" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><rect x="28" y="36" width="44" height="58" rx="15" fill="${lin([C.red, C.redM, C.redD], "h")}"/><rect x="42" y="24" width="16" height="14" fill="${lin([C.metal, C.metalD], "h")}"/></g>
<g ${B}><path d="M32 12 H58 a5 5 0 0 1 5 5 V24 H32Z" fill="${lin([C.metalL, C.metalD], "d")}"/><path d="M20 14 L52 12 V18 L20 22Z" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${Bs}><rect x="34" y="54" width="32" height="24" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M50 58 C45 64 44 68 47 72 C49 74 53 74 55 72 C57 68 54 64 50 58Z" fill="${C.orangeD}"/>`),

  I("1f6d2", "shopping cart", ({ lin }) => `
<g ${B}><path d="M24 26 H94 L84 62 H34Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M30 40 H90 M32 51 H87 M46 26 L42 62 M62 26 L60 62 M78 26 L77 62" stroke="#fff" stroke-width="1.8" opacity=".55"/>
<g ${B}><path d="M7 12 H16 L34 66 H84 M24 26 H34" fill="none" stroke="${C.metalD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><rect x="7" y="9" width="12" height="7" rx="3" fill="${lin([C.red, C.redD])}"/><circle cx="40" cy="84" r="7" fill="${lin([C.dark, C.darkD])}"/><circle cx="80" cy="84" r="7" fill="${lin([C.dark, C.darkD])}"/></g>
<circle cx="40" cy="84" r="2.4" fill="${C.metal}"/><circle cx="80" cy="84" r="2.4" fill="${C.metal}"/>`),

  I("1f6ac", "cigarette", ({ lin }) => `
<g ${B}><g transform="rotate(-31 50 50)"><rect x="4" y="41" width="88" height="18" rx="3" fill="${lin([C.paper, C.paperD])}"/></g></g>
<g ${B}><g transform="rotate(-31 50 50)"><rect x="8" y="41" width="28" height="18" rx="3" fill="${lin([C.orange, C.orangeD])}"/></g></g>
<g ${B}><g transform="rotate(-31 50 50)"><rect x="86" y="41" width="9" height="18" rx="3" fill="${lin(["#C9C2C0", "#8F8886"])}"/></g></g>
<g transform="rotate(-31 50 50)"><rect x="34" y="42" width="1.6" height="16" fill="${C.goldD}" opacity=".7"/><path d="M12 48 H32 M12 53 H32" stroke="${C.woodD}" stroke-width="1" opacity=".5"/></g>`),

  I("26b0-fe0f", "coffin", ({ lin }) => `
<g ${B}><polygon points="36,4 64,4 84,36 68,96 32,96 16,36" fill="${lin([C.wood, C.woodD, "#7A4E2B"], "d")}"/></g>
<polygon points="40,14 60,14 74,38 62,86 38,86 26,38" fill="none" stroke="${C.woodL}" stroke-width="2" opacity=".55"/>
<g ${Bs}><rect x="46" y="28" width="8" height="40" rx="2" fill="${lin([C.gold, C.goldD], "h")}"/><rect x="35" y="38" width="30" height="8" rx="2" fill="${lin([C.gold, C.goldD])}"/></g>`),

  I("1faa6", "headstone", ({ lin }) => `
<g ${B}><path d="M22 88 V38 C22 6 78 6 78 38 V88Z" fill="${lin(stone, "d")}"/></g>
<g ${B}><path d="M6 86 C20 80 30 90 50 86 C70 82 80 90 94 84 V94 H6Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}><rect x="46" y="22" width="8" height="34" rx="2" fill="${C.metalDD}" opacity=".6"/><rect x="38" y="30" width="24" height="8" rx="2" fill="${C.metalDD}" opacity=".6"/></g>
<path d="M32 62 H68 M36 70 H64" stroke="${C.metalDD}" stroke-width="2" stroke-linecap="round" opacity=".45"/>`),

  I("26b1-fe0f", "funeral urn", ({ lin }) => `
<g ${B}><path d="M24 36 C6 36 6 62 28 58 M76 36 C94 36 94 62 72 58" fill="none" stroke="${C.goldM}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><circle cx="50" cy="8" r="5" fill="${lin([C.gold, C.goldD], "d")}"/><path d="M32 26 C32 12 68 12 68 26Z" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><path d="M34 26 H66 C62 32 62 36 66 40 C80 48 80 70 66 78 C62 82 62 86 62 88 H38 C38 86 38 82 34 78 C20 70 20 48 34 40 C38 36 38 32 34 26Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${B}><rect x="28" y="88" width="44" height="7" rx="3" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M30 52 C42 60 58 60 70 52 M30 64 C42 70 58 70 70 64" fill="none" stroke="${C.gold}" stroke-width="2.2" opacity=".85"/>`),

  I("1f9ff", "nazar amulet", ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="50" r="43" fill="${rad([C.blueM, C.blueD, C.navyD], 0.36, 0.3, 0.9)}"/></g>
<g ${Bs}><circle cx="50" cy="50" r="33" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<g ${Bs}><circle cx="50" cy="50" r="23" fill="${rad([C.sky, C.blue, C.blueM])}"/></g>
<g ${Bs}><circle cx="50" cy="50" r="11" fill="${lin([C.navy, C.navyD], "d")}"/></g>
<circle cx="46" cy="46" r="3" fill="#fff" opacity=".6"/>`),

  I("1faac", "hamsa", ({ lin }) => {
    const f = lin([C.blue, C.blueM, C.blueD], "d");
    return `
<g ${B}><path d="M27 52 C12 40 6 50 9 64 C12 78 26 84 34 80Z" fill="${f}"/><path d="M73 52 C88 40 94 50 91 64 C88 78 74 84 66 80Z" fill="${f}"/></g>
<g ${B}><rect x="42" y="4" width="16" height="56" rx="8" fill="${f}"/><rect x="23" y="14" width="15" height="48" rx="7.5" fill="${f}"/><rect x="62" y="14" width="15" height="48" rx="7.5" fill="${f}"/></g>
<g ${B}><path d="M24 44 H76 C80 64 72 82 62 90 C56 95 44 95 38 90 C28 82 20 64 24 44Z" fill="${f}"/></g>
<g ${Bs}><ellipse cx="50" cy="64" rx="15" ry="10" fill="${lin([C.paper, C.paperD])}"/><circle cx="50" cy="64" r="7" fill="${C.navy}"/></g>
<circle cx="50" cy="64" r="2.6" fill="${C.navyD}"/><circle cx="47.5" cy="61.5" r="1.6" fill="#fff"/>`;
  }),

  I("1f5ff", "moai", ({ lin }) => `
<g ${B}><path d="M30 4 H70 C73 4 74 8 74 12 V56 C74 62 78 64 80 70 L84 94 H16 L20 70 C22 64 26 62 26 56 V12 C26 8 27 4 30 4Z" fill="${lin(stone, "d")}"/></g>
<rect x="26" y="26" width="48" height="8" fill="${C.metalDD}" opacity=".5"/>
<g ${B}><path d="M44 34 H56 L58 62 C58 66 42 66 42 62Z" fill="${lin(["#D8CFC0", "#A59B8B"], "d")}"/></g>
<rect x="31" y="36" width="12" height="6" rx="3" fill="${C.metalDD}" opacity=".65"/><rect x="57" y="36" width="12" height="6" rx="3" fill="${C.metalDD}" opacity=".65"/>
<path d="M36 74 H64" stroke="${C.metalDD}" stroke-width="3" stroke-linecap="round" opacity=".65"/>
<path d="M32 84 H68" stroke="${C.metalDD}" stroke-width="1.6" opacity=".35"/>`),

  I("1faa7", "placard", ({ lin }) => `
<g ${B}><rect x="45" y="56" width="10" height="38" rx="3" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}><rect x="8" y="6" width="84" height="56" rx="6" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<g ${Bs}><rect x="14" y="12" width="72" height="44" rx="3" fill="none" stroke="${C.redM}" stroke-width="3"/></g>
<path d="M26 26 H74 M26 36 H74 M26 46 H58" stroke="${C.redD}" stroke-width="3.6" stroke-linecap="round" opacity=".8"/>`),

  I("1faaa", "identification card", ({ lin }) => `
<g ${B}><rect x="5" y="16" width="90" height="68" rx="9" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${Bs}><rect x="13" y="28" width="28" height="34" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<circle cx="27" cy="41" r="6" fill="${C.blueD}"/><path d="M16 60 C16 50 38 50 38 60Z" fill="${C.blueD}"/>
<path d="M50 32 H84 M50 44 H84 M50 56 H72" stroke="${C.paper}" stroke-width="4" stroke-linecap="round" opacity=".9"/>
<rect x="13" y="68" width="74" height="4" rx="2" fill="${C.sky}" opacity=".5"/>`),
];
