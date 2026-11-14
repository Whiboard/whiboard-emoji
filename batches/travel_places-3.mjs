// travel_places-3: road vehicles, wheels, roadside things, fairground.
import { B, Bs, C, star } from "../kit.mjs";

const GL = (lin) => lin([C.sky, C.skyD]);
const wheels = (lin, list) => {
  const hub = lin([C.metalL, C.metalD]);
  return (
    list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 2.2}" fill="${C.darkD}" opacity=".55"/>`).join("") +
    `<g ${Bs}>${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.dark}"/><circle cx="${x}" cy="${y}" r="${(r * 0.46).toFixed(1)}" fill="${hub}"/>`).join("")}</g>`
  );
};
const Y = (lin) => lin([C.yellow, C.yellowM, C.yellowD]);
const R = (lin) => lin([C.red, C.redM, C.redD]);
const W = (lin) => lin([C.paper, C.paperD, "#CDBF9A"]);
const BL = (lin) => lin([C.blue, C.blueM, C.blueD]);

// ---- cars: side view, facing left
const carSide = (t, { c, ct = 30, dy = -5, top = "", mid = "" }) => {
  const { lin } = t;
  return `<g transform="translate(0 ${dy})">
<g ${B}><path d="M6 66 V57 Q6 52 11 51 L25 48 L34 ${ct + 4} Q36 ${ct} 41 ${ct} H66 Q70 ${ct} 73 ${ct + 4} L81 48 L90 51 Q94 53 94 58 V66 a4 4 0 0 1 -4 4 H10 a4 4 0 0 1 -4 -4Z" fill="${lin(c)}"/></g>
<path d="M29 47 L36 ${ct + 6} H50 V47Z M54 ${ct + 6} H66 Q68 ${ct + 6} 70 ${ct + 9} L77 47 H54Z" fill="${GL(lin)}"/>
<path d="M52 ${ct + 6} V66" stroke="${C.darkD}" stroke-width="1.1" opacity=".4"/>
${mid}
<ellipse cx="8.6" cy="57" rx="2.6" ry="3.6" fill="#FFF3C4"/><rect x="91.4" y="55" width="2.6" height="5" rx="1.2" fill="${C.red}"/>
${top}
${wheels(lin, [[28, 70, 9.5], [72, 70, 9.5]])}
</g>`;
};

// ---- cars: front view
const carFront = (t, { c, ct = 20, dy = -2, top = "", mid = "" }) => {
  const { lin } = t;
  return `<g transform="translate(0 ${dy})">
<g ${Bs}><rect x="12" y="62" width="13" height="22" rx="5" fill="${C.dark}"/><rect x="75" y="62" width="13" height="22" rx="5" fill="${C.dark}"/></g>
<g ${B}><path d="M17 62 V51 Q17 46 21 45 L27 ${ct + 6} Q29 ${ct} 36 ${ct} H64 Q71 ${ct} 73 ${ct + 6} L79 45 Q83 46 83 51 V72 a4 4 0 0 1 -4 4 H21 a4 4 0 0 1 -4 -4Z" fill="${lin(c)}"/></g>
<path d="M31 ${ct + 8} Q32 ${ct + 5} 36 ${ct + 5} H64 Q68 ${ct + 5} 69 ${ct + 8} L74 44 H26Z" fill="${GL(lin)}"/>
<g ${Bs}><rect x="9" y="39" width="7" height="5" rx="2" fill="${lin([c[1], c[2]])}"/><rect x="84" y="39" width="7" height="5" rx="2" fill="${lin([c[1], c[2]])}"/></g>
${mid}
<ellipse cx="27" cy="57" rx="6" ry="4.4" fill="#FFF3C4"/><ellipse cx="73" cy="57" rx="6" ry="4.4" fill="#FFF3C4"/>
<rect x="39" y="53" width="22" height="10" rx="2.5" fill="${C.darkD}" opacity=".85"/><path d="M43 55 V61 M47 55 V61 M51 55 V61 M55 55 V61 M59 55 V61" stroke="${C.metal}" stroke-width="1.1"/>
<g ${Bs}><rect x="15" y="68" width="70" height="8" rx="3.5" fill="${lin([C.metalL, C.metal, C.metalD])}"/><rect x="43" y="69.6" width="14" height="5" rx="1" fill="${C.paper}"/></g>
${top}
</g>`;
};

const lightBar = (lin) => (ct) => `<g ${Bs}><rect x="46" y="${ct - 6}" width="8" height="6" rx="2" fill="${lin([C.red, C.redD])}"/><rect x="54" y="${ct - 6}" width="8" height="6" rx="2" fill="${lin([C.blue, C.blueD])}"/></g>`;
const taxiSign = (ct) => `<g ${Bs}><rect x="46" y="${ct - 7}" width="16" height="7" rx="2" fill="#FFF3C4"/></g><rect x="49" y="${ct - 4.2}" width="10" height="1.6" fill="${C.goldD}"/>`;
const checks = (y) => Array.from({ length: 10 }, (_, i) => `<rect x="${12 + i * 7.6}" y="${y + (i % 2) * 2.6}" width="3.8" height="2.6" fill="${C.darkD}" opacity=".85"/>`).join("");

// ---- bus / van / truck pieces
const busSide = (t, { c, dy = -1.5, top = "" }) => {
  const { lin } = t;
  const g = GL(lin);
  return `<g transform="translate(0 ${dy})">
<g ${B}><path d="M6 30 a10 10 0 0 1 10 -10 H86 a8 8 0 0 1 8 8 V70 a3 3 0 0 1 -3 3 H9 a3 3 0 0 1 -3 -3Z" fill="${lin(c)}"/></g>
<path d="M9 28 Q10 24 14 24 H20 V50 H9Z" fill="${g}"/><rect x="23" y="27" width="10" height="33" rx="1.5" fill="${g}"/><path d="M28 27 V60" stroke="${c[2]}" stroke-width="1"/>
${[37, 51, 65, 79].map((x) => `<rect x="${x}" y="27" width="12" height="18" rx="2" fill="${g}"/>`).join("")}
<rect x="6" y="52" width="88" height="2.6" fill="${C.darkD}" opacity=".5"/>
<ellipse cx="8" cy="62" rx="2.2" ry="3.4" fill="#FFF3C4"/><rect x="91.4" y="60" width="2.6" height="5" rx="1.2" fill="${C.red}"/>
${top}
${wheels(lin, [[27, 73, 10], [75, 73, 10]])}
</g>`;
};

const vanSide = (t, { c, win = false, mid = "", top = "" }) => {
  const { lin } = t;
  const g = GL(lin);
  return `<g transform="translate(0 -1)">
<g ${B}><path d="M6 66 V54 Q6 49 11 48 L22 45 L29 29 Q31 24 36 24 H86 a8 8 0 0 1 8 8 V66 a3 3 0 0 1 -3 3 H9 a3 3 0 0 1 -3 -3Z" fill="${lin(c)}"/></g>
<path d="M25 44 L31 30 Q32 28 35 28 H46 V44Z" fill="${g}"/>
${win ? [50, 65, 80].map((x) => `<rect x="${x}" y="28" width="12" height="15" rx="2" fill="${g}"/>`).join("") : ""}
<path d="M47.5 28 V66" stroke="${c[2]}" stroke-width="1.1" opacity=".7"/>
${mid}
<ellipse cx="8" cy="57" rx="2.2" ry="3.4" fill="#FFF3C4"/><rect x="91.4" y="55" width="2.6" height="5" rx="1.2" fill="${C.red}"/>
${top}
${wheels(lin, [[26, 69, 9.5], [74, 69, 9.5]])}
</g>`;
};

const cross = (x, y, s, col) => `<path d="M${x - s} ${y - s / 3} H${x - s / 3} V${y - s} H${x + s / 3} V${y - s / 3} H${x + s} V${y + s / 3} H${x + s / 3} V${y + s} H${x - s / 3} V${y + s / 3} H${x - s}Z" fill="${col}"/>`;

const cab = (lin, c, x0, h = 66) => `<g ${B}><path d="M${x0} 66 V52 Q${x0} 48 ${x0 + 4} 47 L${x0 + 14} 45 L${x0 + 20} 30 Q${x0 + 21} 27 ${x0 + 25} 27 H${x0 + 34} V66Z" fill="${lin(c)}"/></g>
<path d="M${x0 + 17} 44 L${x0 + 22} 31.5 H${x0 + 31} V44Z" fill="${GL(lin)}"/><ellipse cx="${x0 + 3.2}" cy="57" rx="2" ry="3.2" fill="#FFF3C4"/>`;

const icons = [
  {
    u: "1f68c",
    n: "bus",
    draw: (t) => busSide(t, { c: [C.blue, C.blueM, C.blueD] }),
  },
  {
    u: "1f68d",
    n: "oncoming bus",
    draw: ({ lin }) => {
      const g = GL(lin);
      return `<g transform="translate(0 -1)">
<g ${Bs}><rect x="15" y="68" width="12" height="20" rx="5" fill="${C.dark}"/><rect x="73" y="68" width="12" height="20" rx="5" fill="${C.dark}"/></g>
<g ${Bs}><rect x="9" y="30" width="7" height="9" rx="2.5" fill="${C.blueD}"/><rect x="84" y="30" width="7" height="9" rx="2.5" fill="${C.blueD}"/></g>
<g ${B}><rect x="14" y="10" width="72" height="72" rx="12" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<rect x="21" y="23" width="58" height="30" rx="5" fill="${g}"/><path d="M50 23 V53" stroke="${C.blueD}" stroke-width="1.3"/>
<rect x="30" y="14" width="40" height="6" rx="2.5" fill="${C.darkD}"/><rect x="34" y="16" width="14" height="2" rx="1" fill="${C.gold}"/><rect x="52" y="16" width="10" height="2" rx="1" fill="${C.gold}"/>
<ellipse cx="26" cy="64" rx="6" ry="4.6" fill="#FFF3C4"/><ellipse cx="74" cy="64" rx="6" ry="4.6" fill="#FFF3C4"/>
<rect x="38" y="60" width="24" height="9" rx="2.5" fill="${C.darkD}" opacity=".8"/><path d="M42 62 V67 M46 62 V67 M50 62 V67 M54 62 V67 M58 62 V67" stroke="${C.metal}" stroke-width="1.1"/>
<g ${Bs}><rect x="14" y="73" width="72" height="8" rx="3.5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
</g>`;
    },
  },
  {
    u: "1f68e",
    n: "trolleybus",
    draw: (t) => {
      const { lin } = t;
      return `<path d="M14 11 H96" stroke="${C.metalDD}" stroke-width="1.8" stroke-linecap="round"/>
<path d="M56 27 L74 11 M62 27 L80 11" stroke="${C.metalD}" stroke-width="2.6" stroke-linecap="round"/>
${busSide(t, { c: [C.red, C.redM, C.redD], dy: 7, top: `<g ${Bs}><rect x="52" y="17" width="18" height="4" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g>` })}`;
    },
  },
  {
    u: "1f690",
    n: "minibus",
    draw: (t) => vanSide(t, { c: [C.teal, C.tealM, C.tealD], win: true, mid: `<rect x="6" y="52" width="88" height="2.6" fill="${C.darkD}" opacity=".4"/>` }),
  },
  {
    u: "1f691",
    n: "ambulance",
    draw: (t) => {
      const { lin } = t;
      return vanSide(t, {
        c: [C.paper, C.paperD, "#C9BB95"],
        mid: `<rect x="6" y="53" width="88" height="4.5" fill="${C.redM}" opacity=".9"/>${cross(68, 38, 8, C.red)}`,
        top: `<g ${Bs}><rect x="58" y="19" width="14" height="6" rx="3" fill="${lin([C.red, C.redD])}"/></g>`,
      });
    },
  },
  {
    u: "1f692",
    n: "fire engine",
    draw: ({ lin }) => {
      const metal = lin([C.metalL, C.metal, C.metalD]);
      return `<g transform="translate(0 0)">
<g ${Bs}><rect x="34" y="17" width="58" height="3.4" rx="1.4" fill="${metal}"/><rect x="34" y="24" width="58" height="3.4" rx="1.4" fill="${metal}"/>${[40, 47, 54, 61, 68, 75, 82, 89].map((x) => `<rect x="${x}" y="20" width="1.8" height="4" fill="${C.metalD}"/>`).join("")}<rect x="38" y="26" width="3" height="5" fill="${C.metalD}"/><rect x="84" y="26" width="3" height="5" fill="${C.metalD}"/></g>
<g ${B}><rect x="36" y="30" width="58" height="40" rx="4" fill="${R(lin)}"/></g>
<rect x="42" y="38" width="20" height="26" rx="2" fill="${metal}"/><path d="M42 43 H62 M42 48 H62 M42 53 H62 M42 58 H62" stroke="${C.metalD}" stroke-width="1"/>
<g ${Bs}><circle cx="78" cy="50" r="9" fill="${lin([C.gold, C.goldD])}"/></g><circle cx="78" cy="50" r="5.2" fill="${C.goldD}" opacity=".7"/><circle cx="78" cy="50" r="2" fill="${C.gold}"/>
${cab(lin, [C.red, C.redM, C.redD], 3)}
<rect x="3" y="61" width="91" height="3" fill="${C.gold}" opacity=".9"/>
<g ${Bs}><rect x="16" y="22" width="12" height="6" rx="3" fill="${lin([C.red, C.redD])}"/></g>
${wheels(lin, [[22, 72, 10], [74, 72, 10]])}
</g>`;
    },
  },
  {
    u: "1f693",
    n: "police car",
    draw: (t) => {
      const { lin } = t;
      return carSide(t, { c: [C.blue, C.blueM, C.blueD], top: lightBar(lin)(30), mid: `<rect x="6" y="57" width="88" height="5" fill="${C.paper}" opacity=".9"/>` });
    },
  },
  {
    u: "1f694",
    n: "oncoming police car",
    draw: (t) => {
      const { lin } = t;
      return carFront(t, { c: [C.blue, C.blueM, C.blueD], top: `<g ${Bs}><rect x="36" y="14" width="14" height="6" rx="2" fill="${lin([C.red, C.redD])}"/><rect x="50" y="14" width="14" height="6" rx="2" fill="${lin([C.blue, C.blueD])}"/></g>`, mid: `<rect x="17" y="45" width="66" height="3" fill="${C.paper}" opacity=".85"/>` });
    },
  },
  {
    u: "1f695",
    n: "taxi",
    draw: (t) => carSide(t, { c: [C.yellow, C.yellowM, C.yellowD], top: taxiSign(30), mid: checks(58) }),
  },
  {
    u: "1f696",
    n: "oncoming taxi",
    draw: (t) => carFront(t, { c: [C.yellow, C.yellowM, C.yellowD], top: `<g ${Bs}><rect x="38" y="12" width="24" height="8" rx="2.5" fill="#FFF3C4"/></g><rect x="43" y="15" width="14" height="2" fill="${C.goldD}"/>`, mid: Array.from({ length: 8 }, (_, i) => `<rect x="${19 + i * 8}" y="${46 + (i % 2) * 2.4}" width="4" height="2.4" fill="${C.darkD}" opacity=".85"/>`).join("") }),
  },
  {
    u: "1f697",
    n: "automobile",
    draw: (t) => carSide(t, { c: [C.red, C.redM, C.redD] }),
  },
  {
    u: "1f698",
    n: "oncoming automobile",
    draw: (t) => carFront(t, { c: [C.red, C.redM, C.redD] }),
  },
  {
    u: "1f699",
    n: "sport utility vehicle",
    draw: (t) => {
      const { lin } = t;
      return carSide(t, { c: [C.green, C.greenM, C.greenD], ct: 24, dy: -2, top: `<g ${Bs}><rect x="40" y="19" width="28" height="3.2" rx="1.4" fill="${lin([C.metal, C.metalDD])}"/><rect x="43" y="21.5" width="3" height="3" fill="${C.metalD}"/><rect x="62" y="21.5" width="3" height="3" fill="${C.metalD}"/></g>` });
    },
  },
  {
    u: "1f6fb",
    n: "pickup truck",
    draw: ({ lin }) => `<g transform="translate(0 -3)">
<g ${B}><path d="M6 66 V56 Q6 52 10 51 L22 49 L31 32 Q33 28 38 28 H54 Q57 28 58 32 L60 48 V66Z" fill="${lin([C.orange, "#E8913F", C.orangeD])}"/></g>
<g ${B}><path d="M62 46 H92 Q94 46 94 48 V66 H62Z" fill="${lin([C.orange, "#E8913F", C.orangeD])}"/></g>
<rect x="64.5" y="48" width="27" height="6.5" fill="${C.woodDD}" opacity=".45"/>
<path d="M25 48 L33 34 H55 L57 48Z" fill="${GL(lin)}"/><path d="M44 34 V48" stroke="${C.orangeD}" stroke-width="1.2"/>
<ellipse cx="8" cy="58" rx="2.2" ry="3.4" fill="#FFF3C4"/><rect x="91.4" y="57" width="2.6" height="5" rx="1.2" fill="${C.red}"/>
${wheels(lin, [[26, 68, 10], [76, 68, 10]])}
</g>`,
  },
  {
    u: "1f69a",
    n: "delivery truck",
    draw: ({ lin }) => `<g transform="translate(0 -1)">
<g ${B}><rect x="40" y="18" width="56" height="50" rx="4" fill="${W(lin)}"/></g>
<rect x="40" y="50" width="56" height="5" fill="${C.blueM}" opacity=".85"/>
${cab(lin, [C.orange, "#E8913F", C.orangeD], 4)}
<g ${Bs}><rect x="4" y="66" width="92" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g>
${wheels(lin, [[22, 72, 9.5], [76, 72, 9.5]])}
</g>`,
  },
  {
    u: "1f69b",
    n: "articulated lorry",
    draw: ({ lin }) => `<g transform="translate(0 0)">
<g ${B}><rect x="34" y="14" width="62" height="52" rx="3" fill="${lin([C.paper, C.paperD, "#C9BB95"])}"/></g>
<rect x="34" y="40" width="62" height="5" fill="${C.redM}" opacity=".85"/><rect x="34" y="48" width="62" height="2" fill="${C.redM}" opacity=".5"/>
<g ${B}><path d="M3 66 V50 Q3 46 7 45 L14 43 L18 27 Q19 25 22 25 H32 V66Z" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<path d="M13 42 L17 29.5 H29 V42Z" fill="${GL(lin)}"/><ellipse cx="5.4" cy="55" rx="1.8" ry="3" fill="#FFF3C4"/>
<g ${Bs}><rect x="3" y="65" width="93" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g>
${wheels(lin, [[18, 72, 9], [67, 72, 9], [83, 72, 9]])}
</g>`,
  },
  {
    u: "1f69c",
    n: "tractor",
    draw: ({ lin, rad }) => {
      const hub = rad([C.yellow, C.yellowD]);
      const gr = lin([C.green, C.greenM, C.greenD]);
      return `<g transform="translate(0 -1)">
<g ${Bs}><rect x="19" y="18" width="5.5" height="30" rx="2" fill="${lin([C.metalL, C.metalDD], "h")}"/><rect x="17" y="15" width="9.5" height="5" rx="2" fill="${C.metalD}"/></g>
<g ${B}><path d="M6 62 V50 Q6 46 10 46 H52 V66 H8 Q6 66 6 62Z" fill="${gr}"/></g>
<g ${B}><rect x="47" y="21" width="36" height="43" rx="4" fill="${gr}"/><rect x="43" y="14" width="46" height="8" rx="3.5" fill="${lin([C.greenM, C.greenD])}"/></g>
<rect x="52" y="26" width="26" height="25" rx="2" fill="${GL(lin)}"/><path d="M65 26 V51" stroke="${C.greenD}" stroke-width="1.2"/>
<path d="M9 50 H15 M9 54 H15 M9 58 H15" stroke="${C.greenD}" stroke-width="1.2"/>
<g ${Bs}><circle cx="67" cy="66" r="21" fill="${C.dark}"/><circle cx="22" cy="76" r="11" fill="${C.dark}"/><circle cx="67" cy="66" r="11" fill="${hub}"/><circle cx="22" cy="76" r="5.4" fill="${hub}"/></g>
<circle cx="67" cy="66" r="18.6" fill="none" stroke="${C.darkD}" stroke-width="2.4" stroke-dasharray="3 3.6" opacity=".75"/>
<circle cx="67" cy="66" r="4.4" fill="${lin([C.metalL, C.metalD])}"/><circle cx="22" cy="76" r="2.2" fill="${C.metalDD}"/>
</g>`;
    },
  },
  {
    u: "1f3ce-fe0f",
    n: "racing car",
    draw: ({ lin }) => `<g transform="translate(0 -4)">
<g ${Bs}><rect x="80" y="28" width="15" height="4.4" rx="2.2" fill="${lin([C.navy, C.navyD])}"/><rect x="84" y="32" width="2.6" height="20" fill="${C.metalD}"/><rect x="90" y="32" width="2.6" height="20" fill="${C.metalD}"/></g>
<g ${B}><path d="M6 66 L9 59 L34 53 Q40 44 50 43 H64 L76 50 H88 V66 Q88 70 84 70 H10 Q6 70 6 66Z" fill="${R(lin)}"/></g>
<rect x="9" y="61" width="70" height="2.6" fill="${C.paper}" opacity=".75"/>
<circle cx="37" cy="62" r="5.4" fill="${C.paper}"/><path d="M35.4 61 L37.6 59.4 V65" fill="none" stroke="${C.darkD}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<g ${Bs}><circle cx="57" cy="41" r="7" fill="${lin([C.blue, C.blueD], "d")}"/></g><path d="M52 40 H61 V43.4 H52Z" fill="${C.sky}"/>
<g ${Bs}><rect x="3" y="69" width="21" height="4.4" rx="2.2" fill="${lin([C.navy, C.navyD])}"/></g>
${wheels(lin, [[27, 69, 11.5], [76, 69, 11.5]])}
</g>`,
  },
  {
    u: "1f3cd-fe0f",
    n: "motorcycle",
    draw: ({ lin }) => {
      const ring = (x) => `<circle cx="${x}" cy="68" r="14.5" fill="none" stroke="${C.dark}" stroke-width="6"/>`;
      const hub = lin([C.metalL, C.metalD]);
      return `<g transform="translate(0 -5)">
<g ${Bs}>${ring(20)}${ring(80)}</g>
<g fill="none" stroke="${C.metal}" stroke-width="1" opacity=".8"><circle cx="20" cy="68" r="11"/><circle cx="80" cy="68" r="11"/><path d="M20 57 V79 M9 68 H31 M80 57 V79 M69 68 H91"/></g>
<circle cx="20" cy="68" r="3.6" fill="${hub}"/><circle cx="80" cy="68" r="3.6" fill="${hub}"/>
<g ${Bs}><path d="M21 66 L31 34" fill="none" stroke="${C.metalD}" stroke-width="4.6" stroke-linecap="round"/><path d="M50 60 L80 68" fill="none" stroke="${C.metalD}" stroke-width="4" stroke-linecap="round"/><path d="M44 66 L74 64" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD])}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><rect x="36" y="46" width="28" height="20" rx="5" fill="${lin([C.metal, C.metalDD], "d")}"/></g>
<g ${B}><path d="M33 45 Q35 30 52 31 Q65 32 65 45Z" fill="${R(lin)}"/></g>
<g ${Bs}><path d="M62 35 H84 Q91 35 88 42 H62Z" fill="${C.dark}"/><path d="M31 34 L40 27" fill="none" stroke="${C.dark}" stroke-width="3.6" stroke-linecap="round"/><ellipse cx="25" cy="40" rx="4.6" ry="6.4" fill="#FFF3C4"/><path d="M8 58 Q20 46 32 58" fill="none" stroke="${C.redM}" stroke-width="3" stroke-linecap="round"/></g>
</g>`;
    },
  },
  {
    u: "1f6f5",
    n: "motor scooter",
    draw: ({ lin }) => {
      const tl = lin([C.teal, C.tealM, C.tealD]);
      return `<g transform="translate(0 -3)">
<g ${Bs}><path d="M28 36 L23 74" fill="none" stroke="${C.metalD}" stroke-width="4.4" stroke-linecap="round"/></g>
<g ${B}><path d="M50 42 Q50 34 58 34 H78 Q90 34 90 50 V66 Q90 74 80 74 H56 Q50 74 50 66Z" fill="${tl}"/><rect x="28" y="64" width="28" height="7" rx="3.5" fill="${tl}"/><path d="M27 38 L36 36 L43 68 H34Z" fill="${tl}"/></g>
<g ${Bs}><rect x="52" y="27" width="32" height="9" rx="4.5" fill="${C.dark}"/><path d="M22 25 H40" stroke="${C.dark}" stroke-width="3.8" stroke-linecap="round"/><ellipse cx="22" cy="33" rx="3.4" ry="4.6" fill="#FFF3C4"/></g>
<path d="M57 44 H84" stroke="${C.tealD}" stroke-width="1.4" opacity=".6"/><rect x="86" y="46" width="3.4" height="7" rx="1.6" fill="${C.red}"/>
${wheels(lin, [[22, 76, 9], [76, 76, 10]])}
</g>`;
    },
  },
  {
    u: "1f9bd",
    n: "manual wheelchair",
    draw: ({ lin }) => {
      const sp = Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return `M58 64 L${(58 + 17 * Math.cos(a)).toFixed(1)} ${(64 + 17 * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      return `<g transform="translate(46 50) scale(1.1) translate(-46 -50)"><g ${Bs}><path d="M34 46 L21 74" fill="none" stroke="${C.metalD}" stroke-width="4.2" stroke-linecap="round"/><path d="M64 14 H81" stroke="${C.dark}" stroke-width="4.4" stroke-linecap="round"/><path d="M33 33 H58" stroke="${C.metalD}" stroke-width="3.6" stroke-linecap="round"/><rect x="9" y="75" width="16" height="4.4" rx="2.2" fill="${C.dark}"/></g>
<g ${B}><rect x="30" y="40" width="38" height="8" rx="4" fill="${BL(lin)}"/><rect x="62" y="14" width="7" height="36" rx="3.5" fill="${BL(lin)}"/></g>
<path d="M52 34 V41" stroke="${C.metalD}" stroke-width="3"/>
<g ${Bs}><circle cx="58" cy="64" r="22" fill="none" stroke="${C.dark}" stroke-width="5"/></g>
<circle cx="58" cy="64" r="17.5" fill="none" stroke="${C.metal}" stroke-width="1.8"/><path d="${sp}" stroke="${C.metal}" stroke-width="1" opacity=".85"/>
<g ${Bs}><circle cx="58" cy="64" r="4.2" fill="${lin([C.metalL, C.metalD])}"/><circle cx="31" cy="82" r="6.5" fill="${C.dark}"/></g><circle cx="31" cy="82" r="2.6" fill="${C.metal}"/></g>`;
    },
  },
  {
    u: "1f9bc",
    n: "motorized wheelchair",
    draw: ({ lin }) => `<g ${Bs}><path d="M42 54 L24 74" fill="none" stroke="${C.metalD}" stroke-width="4.2" stroke-linecap="round"/><rect x="9" y="74" width="18" height="4.4" rx="2.2" fill="${C.dark}"/><path d="M62 12 H80" stroke="${C.dark}" stroke-width="4.4" stroke-linecap="round"/></g>
<g ${B}><rect x="38" y="44" width="36" height="9" rx="4" fill="${BL(lin)}"/><rect x="66" y="14" width="8" height="40" rx="4" fill="${BL(lin)}"/><rect x="44" y="52" width="20" height="14" fill="${lin([C.navy, C.navyD])}"/><rect x="26" y="62" width="56" height="16" rx="8" fill="${lin(["#6A7BB8", C.navy, C.navyD])}"/></g>
<g ${Bs}><rect x="30" y="37" width="30" height="5" rx="2.5" fill="${C.dark}"/><rect x="35" y="27" width="3" height="11" fill="${C.metalD}"/><circle cx="36.5" cy="26" r="3.6" fill="${lin([C.red, C.redD])}"/></g>
${wheels(lin, [[68, 76, 11], [34, 82, 7]])}`,
  },
  {
    u: "1f6fa",
    n: "auto rickshaw",
    draw: ({ lin }) => `<g ${B}><path d="M10 56 Q10 50 16 50 H90 Q96 50 96 56 V66 a5 5 0 0 1 -5 5 H16 Q10 71 10 65Z" fill="${Y(lin)}"/></g>
<rect x="31" y="27" width="62" height="24" fill="${C.darkD}" opacity=".5"/><g ${Bs}><rect x="56" y="36" width="34" height="14" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M20 30 L30 28 V50 H12Z" fill="${GL(lin)}"/>
<g ${Bs}><rect x="29" y="26" width="3" height="26" fill="${C.metalDD}"/><rect x="92" y="26" width="3" height="26" fill="${C.metalDD}"/></g>
<g ${B}><path d="M18 30 Q20 12 42 12 H88 Q97 12 97 20 V27 H26Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<ellipse cx="12.5" cy="59" rx="2.2" ry="3.2" fill="#FFF3C4"/><path d="M12 64 H90" stroke="${C.yellowD}" stroke-width="1.2" opacity=".7"/>
${wheels(lin, [[24, 74, 9], [76, 74, 9.5]])}`,
  },
  {
    u: "1f6b2",
    n: "bicycle",
    draw: ({ lin }) => {
      const sp = (x) => Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return `M${x} 66 L${(x + 16 * Math.cos(a)).toFixed(1)} ${(66 + 16 * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      return `<g transform="translate(0 -7)">
<g ${Bs}><circle cx="24" cy="66" r="19" fill="none" stroke="${C.dark}" stroke-width="5"/><circle cx="76" cy="66" r="19" fill="none" stroke="${C.dark}" stroke-width="5"/></g>
<path d="${sp(24)} ${sp(76)}" stroke="${C.metal}" stroke-width=".9" opacity=".85"/>
<g ${Bs}><path d="M50 66 L58 36 M34 38 H60 M34 38 L50 66 M58 36 L76 66 M50 66 H76 M34 36 L24 66" fill="none" stroke="${C.redM}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${Bs}><rect x="49" y="25" width="17" height="5.6" rx="2.8" fill="${C.dark}"/><path d="M28 27 H41 M34 36 L34 27" fill="none" stroke="${C.dark}" stroke-width="3.6" stroke-linecap="round"/><path d="M45 71 L55 61" stroke="${C.metalDD}" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="66" r="3.6" fill="${lin([C.metalL, C.metalD])}"/><circle cx="76" cy="66" r="3.6" fill="${lin([C.metalL, C.metalD])}"/></g>
</g>`;
    },
  },
  {
    u: "1f6f4",
    n: "kick scooter",
    draw: ({ lin }) => `<g transform="translate(0 -1)">
<g ${Bs}><path d="M25 76 L32 16" fill="none" stroke="${C.metalD}" stroke-width="4.4" stroke-linecap="round"/><path d="M70 72 Q80 58 90 72" fill="none" stroke="${C.red}" stroke-width="3.4" stroke-linecap="round"/></g>
<g ${B}><rect x="26" y="68" width="62" height="8" rx="4" fill="${lin([C.teal, C.tealM, C.tealD])}"/></g>
<g ${Bs}><path d="M22 15 H46" stroke="${C.dark}" stroke-width="4" stroke-linecap="round"/><rect x="18" y="12" width="8" height="6" rx="3" fill="${C.orange}"/><rect x="42" y="12" width="8" height="6" rx="3" fill="${C.orange}"/></g>
${wheels(lin, [[24, 79, 8], [82, 79, 7.5]])}
</g>`,
  },
  {
    u: "1f6f9",
    n: "skateboard",
    draw: ({ lin }) => `<g ${Bs}><g transform="rotate(-30 50 50)"><rect x="20" y="29" width="14" height="8" rx="4" fill="${C.dark}"/><rect x="66" y="29" width="14" height="8" rx="4" fill="${C.dark}"/><rect x="20" y="63" width="14" height="8" rx="4" fill="${C.dark}"/><rect x="66" y="63" width="14" height="8" rx="4" fill="${C.dark}"/><rect x="25" y="34" width="4" height="32" fill="${C.metalD}"/><rect x="71" y="34" width="4" height="32" fill="${C.metalD}"/></g></g>
<g ${B}><g transform="rotate(-30 50 50)"><rect x="4" y="38" width="92" height="24" rx="12" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g></g>
<g transform="rotate(-30 50 50)"><rect x="16" y="48.6" width="68" height="2.8" rx="1.4" fill="${C.yellow}" opacity=".9"/><polygon points="${star(50, 50, 6, 2.8)}" fill="${C.yellow}"/></g>`,
  },
  {
    u: "1f6fc",
    n: "roller skate",
    draw: ({ lin }) => `<g transform="translate(0 3)">
<g ${B}><path d="M50 14 H80 Q83 14 83 18 V56 H12 V48 Q12 40 24 38 Q44 36 48 30Z" fill="${lin([C.pink, "#F09BB0", C.pinkD], "d")}"/></g>
<path d="M50 20 H83" stroke="${C.paper}" stroke-width="5"/><path d="M28 39 L31 34 M35 38 L38 32 M42 36 L45 30" stroke="${C.paper}" stroke-width="2" stroke-linecap="round"/>
<g ${B}><rect x="10" y="55" width="76" height="7" rx="3.5" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><rect x="14" y="62" width="28" height="5" rx="1.5" fill="${C.metalD}"/><rect x="58" y="62" width="28" height="5" rx="1.5" fill="${C.metalD}"/><circle cx="9" cy="52" r="4.6" fill="${lin([C.gold, C.goldD])}"/></g>
${wheels(lin, [[20, 72, 7], [36, 72, 7], [62, 72, 7], [78, 72, 7]])}
</g>`,
  },
  {
    u: "1f68f",
    n: "bus stop",
    draw: ({ lin }) => `<g ${Bs}><ellipse cx="50" cy="90" rx="20" ry="4.4" fill="${C.metalD}"/></g>
<g ${B}><rect x="46" y="30" width="8" height="60" rx="3" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/></g>
<g ${B}><rect x="16" y="6" width="68" height="42" rx="9" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<g ${Bs}><rect x="29" y="14" width="42" height="21" rx="6" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="34" y="19" width="8" height="7" rx="1.5" fill="${C.skyD}"/><rect x="46" y="19" width="8" height="7" rx="1.5" fill="${C.skyD}"/><rect x="58" y="19" width="8" height="7" rx="1.5" fill="${C.skyD}"/>
<circle cx="39" cy="36" r="3.8" fill="${C.blueD}"/><circle cx="61" cy="36" r="3.8" fill="${C.blueD}"/>
<g ${Bs}><rect x="58" y="56" width="26" height="24" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M62 62 H80 M62 67 H76 M62 72 H80" stroke="${C.blueM}" stroke-width="1.6" stroke-linecap="round"/>`,
  },
  {
    u: "1f6e3-fe0f",
    n: "motorway",
    draw: ({ lin }) => {
      const dash = (y1, y2) => {
        const w = (y) => 0.7 + (y - 14) * 0.05;
        return `<polygon points="${50 - w(y1)},${y1} ${50 + w(y1)},${y1} ${50 + w(y2)},${y2} ${50 - w(y2)},${y2}" fill="${C.gold}"/>`;
      };
      return `<g ${B}><path d="M10 88 L38 12 H62 L90 88Z" fill="${lin([C.green, C.greenM, C.greenD])}" stroke="${C.greenM}" stroke-width="7" stroke-linejoin="round"/></g>
<g ${B}><path d="M24 90 L43 14 H57 L76 90Z" fill="${lin(["#8A838C", "#625A63"])}" stroke="#6C656D" stroke-width="3" stroke-linejoin="round"/></g>
<path d="M27.5 86 L44.4 18 M72.5 86 L55.6 18" stroke="${C.paper}" stroke-width="1.5" opacity=".85"/>
${dash(76, 90)}${dash(58, 68)}${dash(43, 51)}${dash(30, 36)}${dash(20, 24)}`;
    },
  },
  {
    u: "1f6e4-fe0f",
    n: "railway track",
    draw: ({ lin }) => {
      const hw = (y) => 10 + (y - 10) * 0.244;
      const sl = [20, 30, 41, 53, 66, 80].map((y) => `<rect x="${(50 - hw(y) - 5).toFixed(1)}" y="${y}" width="${(2 * hw(y) + 10).toFixed(1)}" height="${(2.2 + (y - 10) * 0.05).toFixed(1)}" rx="1" fill="${lin([C.woodL, C.woodD])}"/>`).join("");
      return `<g ${B}><path d="M20 92 L40 10 H60 L80 92Z" fill="${lin(["#C4BDAD", "#8E887A"])}" stroke="#A59E8E" stroke-width="4" stroke-linejoin="round"/></g>
<g ${Bs}>${sl}</g>
<g ${Bs}><polygon points="44.2,10 45.8,10 32,92 28.5,92" fill="${C.metal}"/><polygon points="55.8,10 54.2,10 68,92 71.5,92" fill="${C.metal}"/></g>`;
    },
  },
  {
    u: "1f6e2-fe0f",
    n: "oil drum",
    draw: ({ lin }) => {
      const d = lin(["#6C7BB0", "#8EA0D6", "#5F6B8F", "#47527C"], "h");
      return `<g ${B}><rect x="22" y="14" width="56" height="74" rx="7" fill="${d}"/></g>
<g ${Bs}><rect x="20.5" y="28" width="59" height="5" rx="2.5" fill="${lin(["#5B6896", "#7F8DBF", "#47527C"], "h")}"/><rect x="20.5" y="68" width="59" height="5" rx="2.5" fill="${lin(["#5B6896", "#7F8DBF", "#47527C"], "h")}"/></g>
<g ${B}><ellipse cx="50" cy="16" rx="28" ry="7.5" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<circle cx="40" cy="16" r="3" fill="${C.metalDD}"/><circle cx="58" cy="15.5" r="2.4" fill="${C.metalD}"/>
<g ${Bs}><rect x="22" y="39" width="56" height="23" fill="${lin([C.yellow, C.yellowD])}"/></g>
<path d="M50 43 C45 49 43 52 43 54.6 a7 7 0 0 0 14 0 C57 52 55 49 50 43Z" fill="${C.darkD}"/>`;
    },
  },
  {
    u: "1f3a0",
    n: "carousel horse",
    draw: ({ lin }) => {
      const wood = "#D9A56B";
      return `<g ${B}>
<path d="M38 60 L26 66 L24 79 M47 62 L49 83 M72 60 L80 74 L76 85 M64 62 L62 84" fill="none" stroke="${wood}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M84 40 C97 42 97 64 84 72 C90 62 88 52 81 47Z" fill="${lin([C.pink, C.pinkD])}"/>
<path d="M84 40 C76 32 58 34 48 38 C44 30 40 22 36 14 L34 6 L30 16 C24 18 18 26 14 34 C10 38 9 44 14 45 C18 46 24 42 28 38 C30 44 28 52 32 58 C38 66 46 66 54 64 C64 66 76 62 82 56 C88 50 90 44 84 40Z" fill="${lin([C.woodL, wood, C.wood], "d")}"/>
</g>
<g ${Bs}><path d="M46 36 C42 28 38 20 36 14 L32 22 C36 30 38 36 44 42Z" fill="${lin([C.pink, C.pinkD])}"/></g>
<circle cx="22" cy="29" r="1.9" fill="${C.darkD}"/><circle cx="12" cy="42" r="1.1" fill="${C.woodDD}"/>
<g ${B}><rect x="58" y="6" width="5" height="86" rx="2.2" fill="${lin([C.goldD, C.gold, C.goldD], "h")}"/><circle cx="60.5" cy="7" r="4.6" fill="${lin([C.gold, C.goldD])}"/><ellipse cx="60.5" cy="92" rx="11" ry="3.6" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${B}><path d="M44 36 Q60 30 76 38 L74 50 Q60 46 46 50Z" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<path d="M46 49 Q60 45 74 49" fill="none" stroke="${C.gold}" stroke-width="1.6"/>`;
    },
  },
  {
    u: "1f6dd",
    n: "playground slide",
    draw: ({ lin }) => `<g ${Bs}><path d="M62 70 L66 90" stroke="${C.blueD}" stroke-width="3.4" stroke-linecap="round"/><rect x="14" y="24" width="4.6" height="66" rx="2" fill="${lin([C.blue, C.blueD], "h")}"/><rect x="36" y="24" width="4.6" height="66" rx="2" fill="${lin([C.blue, C.blueD], "h")}"/>${[36, 48, 60, 72, 84].map((y) => `<rect x="17" y="${y}" width="21" height="3.4" rx="1.4" fill="${C.yellowM}"/>`).join("")}</g>
<g ${Bs}><path d="M14 20 V7 H41 V20" fill="none" stroke="${C.blueM}" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"/></g>
<g ${B}><path d="M42 28 Q62 28 70 56 Q76 74 94 74 V85 H78 Q60 85 54 64 Q48 42 42 40Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/><rect x="9" y="19" width="36" height="8" rx="3.5" fill="${Y(lin)}"/></g>
<path d="M45 32 Q60 32 66 56" fill="none" stroke="${C.paper}" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>`,
  },
  {
    u: "1f3a1",
    n: "ferris wheel",
    draw: ({ lin }) => {
      const cols = [C.red, C.yellow, C.green, C.blue];
      const sp = [];
      const cab = Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4 + Math.PI / 8;
        const x = 50 + 30 * Math.cos(a);
        const y = 38 + 30 * Math.sin(a);
        sp.push(`M50 38 L${x.toFixed(1)} ${y.toFixed(1)}`);
        const c = cols[i % 4];
        return `<rect x="${(x - 4.6).toFixed(1)}" y="${(y + 0.5).toFixed(1)}" width="9.2" height="8" rx="2.6" fill="${c}"/>`;
      }).join("");
      return `<g ${Bs}><path d="M50 38 L26 91 M50 38 L74 91 M33 70 H67" fill="none" stroke="${C.woodD}" stroke-width="4.6" stroke-linecap="round"/><rect x="12" y="90" width="76" height="4.4" rx="2.2" fill="${lin([C.greenM, C.greenD])}"/></g>
<path d="${sp.join(" ")}" stroke="${C.blueM}" stroke-width="1.4" opacity=".9"/>
<g ${Bs}><circle cx="50" cy="38" r="30" fill="none" stroke="${C.blueM}" stroke-width="3.4"/><circle cx="50" cy="38" r="17" fill="none" stroke="${C.blue}" stroke-width="1.8"/>${cab}<circle cx="50" cy="38" r="5.4" fill="${lin([C.gold, C.goldD])}"/></g>`;
    },
  },
  {
    u: "1f3a2",
    n: "roller coaster",
    draw: ({ lin, clip }) => {
      const T = "M6 78 C18 78 22 24 40 24 C56 24 54 66 68 66 C80 66 84 40 94 36";
      const sup = [12, 22, 32, 42, 52, 62, 72, 82, 92].map((x) => `<path d="M${x} 20 V90" stroke="${C.woodD}" stroke-width="2.4"/>`).join("") + `<path d="M12 80 L22 62 L32 40 L42 62 L52 44 L62 70 L72 74 L82 56" fill="none" stroke="${C.woodD}" stroke-width="1.4" opacity=".8"/>`;
      return `<g ${clip(`<path d="${T} V90 H6Z"/>`)}><path d="${T} V90 H6Z" fill="${C.woodL}" opacity=".3"/>${sup}</g>
<rect x="6" y="88" width="88" height="4.6" rx="2.3" fill="${lin([C.greenM, C.greenD])}"/>
<g ${Bs}><path d="${T}" fill="none" stroke="${lin([C.red, C.redD], "d")}" stroke-width="5.4" stroke-linecap="round"/></g>
<g ${Bs}><circle cx="36" cy="12" r="4.6" fill="${C.pink}"/><circle cx="46" cy="12" r="4.6" fill="${C.pinkD}"/><rect x="28" y="14" width="26" height="10" rx="4.5" fill="${Y(lin)}"/></g>`;
    },
  },
  {
    u: "1f488",
    n: "barber pole",
    draw: ({ lin, clip }) => {
      const bands = [0, 1, 2, 3].map((k) => `<rect x="-30" y="${2 + 27 * k}" width="160" height="8.5" fill="${C.redM}"/><rect x="-30" y="${15.5 + 27 * k}" width="160" height="8.5" fill="${C.blueM}"/>`).join("");
      return `<g transform="translate(0 5)"><g ${B}><g ${clip('<rect x="36" y="22" width="28" height="56" rx="3"/>')}>
<rect x="36" y="22" width="28" height="56" fill="${lin([C.paper, C.paperD])}"/><g transform="rotate(-35 50 50)">${bands}</g>
<rect x="36" y="22" width="28" height="56" fill="${lin([[0, "#3A1C10", 0.32], [0.3, "#fff", 0.3], [0.55, "#fff", 0], [1, "#3A1C10", 0.4]], "h")}"/></g></g>
<g ${B}><rect x="32" y="14" width="36" height="12" rx="5" fill="${lin([C.gold, C.goldM, C.goldD])}"/><rect x="32" y="74" width="36" height="12" rx="5" fill="${lin([C.gold, C.goldM, C.goldD])}"/><circle cx="50" cy="9" r="5.4" fill="${lin([C.gold, C.goldD], "d")}"/></g></g>`;
    },
  },
  {
    u: "1f3aa",
    n: "circus tent",
    draw: ({ lin, clip }) => {
      const wedge = Array.from({ length: 6 }, (_, i) => `<polygon points="50,14 ${8 + 14 * i},52 ${22 + 14 * i},52" fill="${i % 2 ? C.paper : C.redM}"/>`).join("");
      const scal = Array.from({ length: 6 }, (_, i) => `<circle cx="${15 + 14 * i}" cy="52" r="7" fill="${i % 2 ? C.paper : C.redM}"/>`).join("");
      const wall = Array.from({ length: 3 }, (_, i) => `<rect x="${22 + 28 * i}" y="52" width="14" height="36" fill="${C.redM}"/>`).join("");
      return `<g ${Bs}><path d="M50 15 V3" stroke="${C.woodD}" stroke-width="2" stroke-linecap="round"/><polygon points="50,3 66,8 50,13" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><rect x="14" y="52" width="72" height="36" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${clip('<rect x="14" y="52" width="72" height="36"/>')}>${wall}<path d="M8 88 H92 V52 H8Z" fill="none"/></g>
<g ${B}><g ${clip('<polygon points="50,14 8,52 92,52"/>')}>${wedge}</g>${scal}</g>
<g ${Bs}><path d="M41 88 V70 Q50 56 59 70 V88Z" fill="${C.darkD}"/></g>
<path d="M41 88 L45 72 Q50 66 50 66 L50 88Z M59 88 L55 72 Q50 66 50 66 L50 88Z" fill="${C.redD}" opacity=".85"/>
<g ${Bs}><rect x="8" y="87" width="84" height="5.4" rx="2.4" fill="${lin(["#C4BEAE", "#8E887A"])}"/></g>`;
    },
  },
];

export default icons;
