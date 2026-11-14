// travel_places-2: buildings, scenes, rail.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const SLATE = (lin) => lin(["#7F8CAB", "#4A5673"]);
const WALL = (lin) => lin([C.paper, C.creamD]);
const STONE = (lin) => lin(["#E3DCC8", "#A9A28F"], "d");
const GLASS = (lin) => lin([C.sky, C.skyD]);
const base = (lin, x = 10, w = 80) => `<g ${B}><rect x="${x}" y="87" width="${w}" height="5" rx="2" fill="${lin(["#C4BEAE", "#8E887A"])}"/></g>`;
const arch = (lin, x, y, w, h) => `<g ${Bs}><path d="M${x} ${y + h} V${y + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V${y + h}Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>`;
const win = (lin, x, y, w, h) => `<path d="M${x} ${y + h} V${y + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V${y + h}Z" fill="${GLASS(lin)}"/>`;
const cross = (x, y, s, c) => `<path d="M${x} ${y} v${s} M${x - s * 0.38} ${y + s * 0.3} h${s * 0.76}" stroke="${c}" stroke-width="2.4" stroke-linecap="round" fill="none"/>`;

// ---- tile for scenes
const tile = (t, sky, inner) =>
  `<g ${B}><rect x="8" y="8" width="84" height="84" rx="14" fill="${sky}"/></g><g ${t.clip('<rect x="8" y="8" width="84" height="84" rx="14"/>')}>${inner}</g><rect x="8.8" y="8.8" width="82.4" height="82.4" rx="13.4" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.2"/>`;
const skyline = (items, fill, wc, wo = 0.9) => {
  let w = "";
  const r = items
    .map(([x, bw, top], i) => {
      for (let j = 0, y = top + 5; y < 84; j++, y += 6) for (let k = 0, xx = x + 3; xx + 2.4 < x + bw - 1; k++, xx += 5) if ((i * 7 + j * 3 + k * 5) % 3) w += `M${xx} ${y}h2.4v3h-2.4z`;
      return `<rect x="${x}" y="${top}" width="${bw}" height="${96 - top}"/>`;
    })
    .join("");
  return `<g fill="${fill}">${r}</g><path d="${w}" fill="${wc}" opacity="${wo}"/>`;
};

// ---- rail: one carriage helper
const NOSE = {
  flat: "M10 26 H90 a4 4 0 0 1 4 4 V68 a4 4 0 0 1 -4 4 H10 a4 4 0 0 1 -4 -4 V30 a4 4 0 0 1 4 -4Z",
  round: "M6 56 C6 35 16 26 32 26 H90 a4 4 0 0 1 4 4 V68 a4 4 0 0 1 -4 4 H10 a4 4 0 0 1 -4 -4Z",
  bullet: "M4 66 C6 46 22 28 46 26 H90 a4 4 0 0 1 4 4 V68 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4Z",
  long: "M3 68 C6 56 22 38 58 27 H90 a4 4 0 0 1 4 4 V68 a4 4 0 0 1 -4 4 H7 a4 4 0 0 1 -4 -4Z",
};
const CAB = { flat: "", round: "M9 50 C9 41 16 34 24 34 V49 H9Z", bullet: "M10 56 C14 44 26 36 38 34 V49 H10Z", long: "M12 58 C22 46 40 38 52 35 V49 H12Z" };
const WX = { flat: [13, 26.5, 40, 53.5, 67, 80.5], round: [27, 40, 53, 66, 79], bullet: [41, 54, 67, 80], long: [56, 68, 80] };
const train = (lin, o) => {
  const nose = o.nose || "flat";
  const tf = o.tf ? ` transform="${o.tf}"` : "";
  const g = (s) => `<g${tf}>${s}</g>`;
  const glass = GLASS(lin);
  const ws = WX[nose].map((x) => `<rect x="${x}" y="34" width="10" height="13" rx="2"/>`).join("");
  const wh = o.nowheels ? "" : [20, 34, 66, 80].map((x) => `<circle cx="${x}" cy="80" r="6" fill="${C.dark}"/><circle cx="${x}" cy="80" r="2.6" fill="${lin([C.metalL, C.metalD])}"/>`).join("");
  const pant = o.pant ? `<path d="M46 26 L56 16 L66 26 M56 16 H72" fill="none" stroke="${C.darkD}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` : "";
  const pole = o.pole ? `<path d="M80 26 L62 9" fill="none" stroke="${C.darkD}" stroke-width="2.2" stroke-linecap="round"/>` : "";
  return `<g ${B}>${g(`<path d="${NOSE[nose]}" fill="${lin(o.col)}"/>`)}</g>
${g(`<g fill="${glass}">${ws}<path d="${CAB[nose]}"/></g><rect x="10" y="56" width="84" height="5" fill="${o.band}" opacity=".9"/><ellipse cx="${nose === "flat" ? 8 : 7}" cy="64" rx="1.8" ry="2.8" fill="#FFF6D0"/>${o.sign || ""}`)}
<g ${Bs}>${g(`<rect x="8" y="72" width="84" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>${pant}${pole}${o.extra || ""}`)}</g>
<g ${Bs}>${g(wh)}</g>`;
};

const lineWire = `<path d="M4 9 H96" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>`;

// ---- weather-free helpers for scenes
const M = (c, w = 2) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

const __batch: Icon[] = [
  // ───────── buildings
  {
    u: "1f3ed",
    n: "factory",
    draw: ({ lin }) => {
      const teeth = [14, 32, 50, 68].map((x) => `<path d="M${x} 42 L${x + 18} 56 v5 L${x} 47Z" fill="${SLATE(lin)}"/>`).join("");
      return `<g ${B}><rect x="20" y="22" width="10" height="26" fill="${lin([C.metalD, C.metal, C.metalDD], "h")}"/></g>
<g fill="${lin([C.paper, C.creamD])}"><circle cx="30" cy="14" r="5"/><circle cx="39" cy="9" r="5.5"/><circle cx="49" cy="8" r="4.2"/></g>
${base(lin)}
<g ${B}><path d="M14 87 V42 L32 56 V42 L50 56 V42 L68 56 V42 L86 56 V87Z" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${Bs}>${teeth}</g>
<g fill="${GLASS(lin)}"><rect x="20" y="64" width="10" height="10" rx="1.5"/><rect x="35" y="64" width="10" height="10" rx="1.5"/><rect x="50" y="64" width="10" height="10" rx="1.5"/></g>
<g ${Bs}><rect x="66" y="64" width="16" height="23" rx="1.5" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<path d="M66 70 H82 M66 76 H82 M66 82 H82" stroke="${C.metalDD}" stroke-width="1" opacity=".6"/>`;
    },
  },
  {
    u: "1f3ef",
    n: "Japanese castle",
    draw: ({ lin }) => {
      const roof = (x1, x2, yt, yb) => {
        const w = x2 - x1;
        return `M${x1} ${yb - 3} Q${x1 + w * 0.25} ${yb + 1} ${x1 + w * 0.3} ${yt} H${x2 - w * 0.3} Q${x2 - w * 0.25} ${yb + 1} ${x2} ${yb - 3} Q${(x1 + x2) / 2} ${yb + 6} ${x1} ${yb - 3}Z`;
      };
      const wl = lin([C.paper, C.creamD]);
      const sl = lin(["#7FA08F", "#3F6B5B"]);
      const wn = (x, y) => `<rect x="${x}" y="${y}" width="5" height="6" rx="1" fill="${C.dark}" opacity=".75"/>`;
      return `<g ${B}><path d="M12 87 L17 74 H83 L88 87Z" fill="${lin(["#8E8A82", "#5A5750"])}"/></g>
<g ${B}><rect x="20" y="60" width="60" height="16" fill="${wl}"/><rect x="31" y="42" width="38" height="16" fill="${wl}"/><rect x="40" y="26" width="20" height="14" fill="${wl}"/></g>
${wn(30, 64)}${wn(47.5, 64)}${wn(65, 64)}${wn(40, 46)}${wn(55, 46)}${wn(47.5, 29)}
<g ${B}><path d="${roof(6, 94, 52, 63)}" fill="${sl}"/><path d="${roof(20, 80, 35, 45)}" fill="${sl}"/><path d="${roof(31, 69, 19, 29)}" fill="${sl}"/></g>
<g ${Bs}><path d="M50 19 C45 14 44 9 47 6 C48 9 50 9 50 11 C50 9 52 9 53 6 C56 9 55 14 50 19Z" fill="${lin([C.gold, C.goldD])}"/></g>`;
    },
  },
  {
    u: "1f3f0",
    n: "castle",
    draw: ({ lin }) => {
      const st = lin(["#E9E2CE", "#B3AC98"], "d");
      const cone = lin([C.red, C.redM, C.redD], "d");
      const tw = (x, y) => `<g ${B}><rect x="${x}" y="${y}" width="20" height="${87 - y}" fill="${st}"/></g><g ${B}><polygon points="${x - 3},${y + 2} ${x + 10},${y - 20} ${x + 23},${y + 2}" fill="${cone}"/></g>`;
      return `${base(lin)}
<g ${B}><path d="M30 87 V60 h4 v-4 h5 v4 h5 v-4 h6 v4 h5 v-4 h5 v4 h4 V87Z" fill="${st}"/></g>
${tw(8, 48)}${tw(72, 48)}
<g ${B}><rect x="38" y="34" width="24" height="26" fill="${st}"/><polygon points="35,36 50,12 65,36" fill="${cone}"/></g>
<path d="M50 12 V3" stroke="${C.woodDD}" stroke-width="1.6"/><g ${Bs}><path d="M50 3 L60 6 L50 9Z" fill="${C.gold}"/></g>
${win(lin, 46, 40, 8, 12)}${win(lin, 14, 58, 8, 12)}${win(lin, 78, 58, 8, 12)}
${arch(lin, 43, 66, 14, 21)}`;
    },
  },
  {
    u: "1f492",
    n: "wedding",
    draw: ({ lin }) => `<g ${B}><polygon points="10,56 50,26 90,56" fill="${SLATE(lin)}"/></g>
${base(lin)}
<g ${B}><path d="M17 87 V54 L50 31 L83 54 V87Z" fill="${WALL(lin)}"/></g>
<g ${B}><path d="M12 57 L50 29 L88 57 L84 61 L50 37 L16 61Z" fill="${SLATE(lin)}"/></g>
${cross(50, 6, 15, C.goldM)}
<g ${Bs}><path d="M50 56 C44 49 40 46 40 42.5 C40 39 43 38 45.5 38 C47.5 38 49.4 39.4 50 41 C50.6 39.4 52.5 38 54.5 38 C57 38 60 39 60 42.5 C60 46 56 49 50 56Z" fill="${lin([C.red, C.redD], "d")}"/></g>
${win(lin, 23, 62, 11, 18)}${win(lin, 66, 62, 11, 18)}${arch(lin, 41, 66, 18, 21)}
<path d="M50 70 V87" stroke="${C.woodDD}" stroke-width="1"/>`,
  },
  {
    u: "1f5fc",
    n: "Tokyo tower",
    draw: ({ lin }) => {
      const red = lin([C.red, C.redM, C.redD], "h");
      return `<path d="M50 4 V26" stroke="${C.metalDD}" stroke-width="2.4" stroke-linecap="round"/>
<g ${B}><path d="M45 26 H55 L59 56 H41Z" fill="${red}"/><path d="M41 56 H59 L75 91 H60 L50 76 L40 91 H25Z" fill="${red}"/></g>
<path d="M46 28 L58 54 M54 28 L42 54 M43 62 L63 88 M57 62 L37 88" stroke="${C.paper}" stroke-width="1.5" opacity=".85"/>
<g ${B}><rect x="39" y="52" width="22" height="6" rx="2.2" fill="${lin([C.paper, C.creamD])}"/><rect x="43" y="22" width="14" height="5" rx="2" fill="${lin([C.paper, C.creamD])}"/></g>
<rect x="43" y="53.5" width="14" height="3" fill="${C.redM}" opacity=".8"/>`;
    },
  },
  {
    u: "1f5fd",
    n: "Statue of Liberty",
    draw: ({ lin }) => {
      const cu = lin([C.teal, C.tealM, C.tealD], "d");
      return `<g ${B}><rect x="26" y="76" width="48" height="14" fill="${STONE(lin)}"/><rect x="32" y="64" width="36" height="13" fill="${STONE(lin)}"/></g>
<g ${B}><path d="M36 66 C34 54 36 44 41 37 H58 C64 47 66 58 66 66Z" fill="${cu}"/><path d="M57 38 C63 30 66 24 64 16" ${M(C.tealM, 6.5)}/></g>
<g ${Bs}><circle cx="49" cy="29" r="7.2" fill="${lin([C.teal, C.tealM])}"/><path d="M31 49 L41 46 L43 61 L33 64Z" fill="${lin([C.tealM, C.tealD])}"/></g>
<path d="M41 24 L36 18 M45 21 L43 14 M50 20 V13 M54 21 L57 14 M58 24 L63 19" stroke="${C.tealM}" stroke-width="2.2" stroke-linecap="round"/>
<g ${Bs}><rect x="60" y="13" width="9" height="4" rx="1.5" fill="${lin([C.gold, C.goldD])}"/><path d="M64.5 4 C70 9 69 12 64.5 13 C60 12 59 9 64.5 4Z" fill="${lin([C.yellow, C.goldM])}"/></g>
<path d="M44 40 C46 52 46 60 45 66 M52 40 C54 50 56 58 57 66" stroke="${C.tealD}" stroke-width="1.2" fill="none" opacity=".6"/>`;
    },
  },
  {
    u: "26ea",
    n: "church",
    draw: ({ lin }) => {
      const sl = SLATE(lin);
      return `${base(lin)}
<g ${B}><path d="M13 87 V66 L28 58 H72 L87 66 V87Z" fill="${WALL(lin)}"/></g>
<g ${B}><path d="M10 68 L30 56 H70 L90 68 L86 70 L68 60 H32 L14 70Z" fill="${sl}"/></g>
<g ${B}><rect x="37" y="34" width="26" height="53" fill="${WALL(lin)}"/><polygon points="34,36 50,12 66,36" fill="${sl}"/></g>
${cross(50, 5, 10, C.goldM)}
<circle cx="50" cy="45" r="5.2" fill="${C.paper}" stroke="${C.goldD}" stroke-width="1.5"/><circle cx="50" cy="45" r="2.2" fill="${C.blueM}"/>
${win(lin, 18, 66, 8, 12)}${win(lin, 74, 66, 8, 12)}${arch(lin, 43, 62, 14, 25)}`;
    },
  },
  {
    u: "1f54c",
    n: "mosque",
    draw: ({ lin, rad }) => {
      const mn = (x) => `<g ${B}><rect x="${x}" y="32" width="10" height="55" fill="${WALL(lin)}"/><rect x="${x - 2}" y="44" width="14" height="4" rx="1.5" fill="${lin([C.gold, C.goldD])}"/><polygon points="${x - 1},32 ${x + 5},12 ${x + 11},32" fill="${lin([C.tealM, C.tealD])}"/></g>`;
      return `${base(lin, 5, 90)}
${mn(8)}${mn(82)}
<g ${B}><rect x="24" y="58" width="52" height="29" fill="${WALL(lin)}"/></g>
<g ${B}><path d="M28 58 C28 36 40 28 50 28 C60 28 72 36 72 58Z" fill="${rad([C.teal, C.tealM, C.tealD])}"/></g>
<g ${Bs}><path d="M50 28 V23" stroke="${C.goldM}" stroke-width="2"/><path d="M54 11 A6.5 6.5 0 1 0 54 23 A5 5 0 1 1 54 11Z" fill="${lin([C.gold, C.goldD])}" transform="translate(-4 -3) rotate(10 50 17)"/></g>
${win(lin, 30, 64, 8, 12)}${win(lin, 62, 64, 8, 12)}${arch(lin, 43, 66, 14, 21)}
<path d="M12.5 56 V87 M86.5 56 V87" stroke="${C.creamD}" stroke-width="1" opacity=".0"/>`;
    },
  },
  {
    u: "1f6d5",
    n: "hindu temple",
    draw: ({ lin }) => {
      const sd = lin([C.orange, "#E2924A", C.orangeD], "d");
      const tier = (x1, x2, y1, y2) => `<path d="M${x1} ${y2} L${x1 + 2} ${y1} H${x2 - 2} L${x2} ${y2}Z"/>`;
      return `${base(lin)}
<g ${B}><rect x="14" y="74" width="72" height="13" fill="${lin([C.woodL, C.wood])}"/></g>
<g ${B}><g fill="${sd}">${tier(20, 80, 60, 75)}${tier(27, 73, 46, 61)}${tier(34, 66, 33, 47)}${tier(40, 60, 22, 34)}</g></g>
<g ${B}><path d="M42 24 C42 14 46 11 50 6 C54 11 58 14 58 24Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<path d="M22 66 H78 M29 52 H71 M36 39 H64 M42 28 H58" stroke="${C.woodDD}" stroke-width="1.4" opacity=".35"/>
<g ${Bs}><rect x="48.5" y="2" width="3" height="8" fill="${C.goldM}"/><path d="M51.5 2.5 L61 5.5 L51.5 8.5Z" fill="${lin([C.red, C.redD])}"/></g>
${arch(lin, 42, 70, 16, 17)}<circle cx="50" cy="80" r="0.01"/>
<g fill="${C.gold}"><circle cx="26" cy="80" r="2"/><circle cx="74" cy="80" r="2"/></g>`;
    },
  },
  {
    u: "1f54d",
    n: "synagogue",
    draw: ({ lin }) => {
      const st = `<polygon points="50,27 56,37.5 44,37.5"/><polygon points="50,43 44,32.5 56,32.5"/>`;
      return `${base(lin)}
<g ${B}><rect x="16" y="48" width="68" height="39" fill="${lin(["#EFE9DA", "#C9C0AA"])}"/></g>
<g ${B}><polygon points="9,50 50,17 91,50" fill="${lin([C.blueM, C.blueD])}"/></g>
<g ${B}><polygon points="50,25 61,34 50,43 39,34" fill="none"/><g fill="${lin([C.gold, C.goldM, C.goldD])}">${st}</g></g>
<g ${B}><rect x="22" y="50" width="6" height="37" fill="${lin([C.creamD, C.paper, C.creamD], "h")}"/><rect x="72" y="50" width="6" height="37" fill="${lin([C.creamD, C.paper, C.creamD], "h")}"/></g>
${win(lin, 32, 58, 8, 16)}${win(lin, 60, 58, 8, 16)}${arch(lin, 42, 63, 16, 24)}`;
    },
  },
  {
    u: "26e9-fe0f",
    n: "shinto shrine",
    draw: ({ lin }) => {
      const pil = lin([C.redD, C.red, C.redM], "h");
      return `<g transform="translate(0 -4)"><g ${B}><rect x="21" y="32" width="9" height="58" fill="${pil}"/><rect x="70" y="32" width="9" height="58" fill="${pil}"/><rect x="17" y="44" width="66" height="6.5" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><rect x="45" y="34" width="10" height="11" fill="${lin([C.dark, C.darkD])}"/><rect x="12" y="29" width="76" height="5.5" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><path d="M6 21 Q50 35 94 21 L90 30 Q50 40 10 30Z" fill="${lin(["#6B6068", C.dark, C.darkD])}"/></g>
<g ${Bs}><rect x="18" y="86" width="16" height="5" rx="1.5" fill="${lin([C.dark, C.darkD])}"/><rect x="66" y="86" width="16" height="5" rx="1.5" fill="${lin([C.dark, C.darkD])}"/></g></g>`;
    },
  },
  {
    u: "1f54b",
    n: "kaaba",
    draw: ({ lin }) => {
      const bk = lin(["#7A6E76", C.dark, C.darkD], "d");
      return `<g transform="translate(0 -9)">${base(lin, 5, 90)}
<g ${B}><path d="M8 34 H58 V87 H8Z" fill="${bk}"/><path d="M58 34 L92 27 V80 L58 87Z" fill="${lin([C.dark, C.darkD])}"/><path d="M8 34 L42 27 H92 L58 34Z" fill="${lin(["#8A7F87", C.dark])}"/></g>
<g ${Bs}><rect x="8" y="43" width="50" height="9" fill="${lin([C.gold, C.goldM, C.goldD])}"/><path d="M58 43 L92 36 V45 L58 52Z" fill="${lin([C.goldM, C.goldD])}"/><rect x="36" y="62" width="15" height="25" rx="1.5" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M13 47.5 H20 M25 47.5 H32 M37 47.5 H44 M49 47.5 H54" stroke="${C.goldD}" stroke-width="1.6" stroke-dasharray="3 2.4"/></g>`;
    },
  },
  {
    u: "26f2",
    n: "fountain",
    draw: ({ lin }) => {
      const wt = lin([C.sky, C.blue, C.blueM]);
      return `<g ${B}><path d="M8 72 H92 C92 84 76 92 50 92 C24 92 8 84 8 72Z" fill="${STONE(lin)}"/></g>
<ellipse cx="50" cy="73" rx="40" ry="6" fill="${wt}"/>
<g ${B}><rect x="44" y="46" width="12" height="28" fill="${lin([C.creamD, C.paper, C.creamD], "h")}"/><path d="M26 44 H74 C74 56 62 62 50 62 C38 62 26 56 26 44Z" fill="${STONE(lin)}"/></g>
<ellipse cx="50" cy="44.5" rx="24" ry="3.6" fill="${wt}"/>
<path d="M50 44 V12 M50 14 C38 14 28 26 26 44 M50 14 C62 14 72 26 74 44 M50 18 C42 20 36 30 36 44 M50 18 C58 20 64 30 64 44" ${M(C.blue, 2.6)}/>
<path d="M50 44 V12" ${M("#DFF0FA", 1.4)}/>
<g fill="${C.sky}"><circle cx="50" cy="8" r="2.4"/><circle cx="22" cy="42" r="1.8"/><circle cx="78" cy="42" r="1.8"/><circle cx="16" cy="64" r="1.6"/><circle cx="84" cy="64" r="1.6"/></g>`;
    },
  },
  {
    u: "26fa",
    n: "tent",
    draw: ({ lin }) => `<g ${B}><path d="M6 86 L50 12 L94 86Z" fill="${lin([C.orange, "#E58F45", C.orangeD], "d")}"/></g>
<g ${B}><path d="M50 12 L94 86 H70 Z" fill="${lin(["#E58F45", "#B66A24"], "d")}" opacity=".85"/></g>
<g ${B}><path d="M50 40 L66 86 H34Z" fill="${lin([C.navy, C.navyD])}"/></g>
<path d="M50 40 L34 86 M50 40 L66 86" stroke="${C.paper}" stroke-width="1.6" fill="none" opacity=".8"/>
<g ${Bs}><rect x="48.5" y="6" width="3" height="10" rx="1.5" fill="${lin([C.woodL, C.woodD])}"/><path d="M51.5 5 L62 8.5 L51.5 12Z" fill="${lin([C.red, C.redD])}"/><rect x="4" y="86" width="92" height="5" rx="2.5" fill="${lin([C.green, C.greenD])}"/></g>`,
  },

  // ───────── scenes
  {
    u: "1f301",
    n: "foggy",
    draw: (t) => {
      const { lin } = t;
      return tile(
        t,
        lin(["#C9D5DF", "#E4E4DF"]),
        `<g fill="${lin([C.redM, C.redD], "h")}"><rect x="26" y="26" width="7" height="50"/><rect x="67" y="26" width="7" height="50"/></g>
<path d="M2 62 Q18 62 29.5 28 Q50 70 70.5 28 Q82 62 98 62" ${M(C.redD, 2.2)}/><path d="M12 60 V62 M20 52 V62 M40 58 V62 M60 58 V62 M80 52 V62 M88 60 V62" stroke="${C.redD}" stroke-width="1"/>
<rect x="2" y="62" width="96" height="4" fill="${C.darkD}" opacity=".7"/>
<rect x="2" y="66" width="96" height="30" fill="${lin(["#8FA6B8", "#6E8499"])}"/>
<ellipse cx="30" cy="36" rx="42" ry="9" fill="#fff" opacity=".55"/><ellipse cx="74" cy="52" rx="44" ry="8" fill="#fff" opacity=".6"/><ellipse cx="30" cy="68" rx="44" ry="8" fill="#fff" opacity=".55"/><ellipse cx="70" cy="82" rx="40" ry="7" fill="#fff" opacity=".45"/>`,
      );
    },
  },
  {
    u: "1f303",
    n: "night with stars",
    draw: (t) => {
      const { lin } = t;
      return tile(
        t,
        lin(["#2B3566", "#56629C"]),
        `<g fill="${C.paper}"><polygon points="${star(26, 24, 5, 2, 4)}"/><polygon points="${star(70, 20, 6, 2.4, 4)}"/><polygon points="${star(50, 40, 4, 1.6, 4)}"/><circle cx="84" cy="40" r="1.4"/><circle cx="14" cy="46" r="1.4"/><circle cx="40" cy="14" r="1.2"/></g>
${skyline([[10, 18, 56], [27, 16, 44], [42, 18, 62], [59, 15, 38], [73, 20, 54]], "#252D58", C.yellow, 0.85)}`,
      );
    },
  },
  {
    u: "1f3d9-fe0f",
    n: "cityscape",
    draw: (t) => {
      const { lin } = t;
      return tile(
        t,
        lin(["#9CC7EA", "#E3F1F8"]),
        `<g fill="#fff" opacity=".85"><ellipse cx="70" cy="26" rx="14" ry="5"/><ellipse cx="62" cy="22" rx="8" ry="5"/><ellipse cx="22" cy="36" rx="10" ry="3.6"/></g>
${skyline([[10, 20, 52], [60, 18, 46], [78, 20, 58]], "#8CA2CB", "#fff", 0.55)}
${skyline([[14, 22, 44], [36, 16, 22], [52, 20, 50], [72, 16, 36]], lin([C.blueM, C.blueD]), "#EAF4FB", 0.85)}`,
      );
    },
  },
  {
    u: "1f304",
    n: "sunrise over mountains",
    draw: (t) => {
      const { lin, rad } = t;
      return tile(
        t,
        lin(["#8FACE6", "#F7B6C4", "#FBDA6A"]),
        `<circle cx="50" cy="58" r="17" fill="${rad([C.paper, C.yellow, C.goldM])}"/>
<path d="M0 78 L24 42 L40 62 L58 36 L100 80 V100 H0Z" fill="${lin(["#8E86C6", "#6A68A8"])}"/>
<path d="M58 36 L50 48 L55 46 L60 50 L65 44Z M24 42 L18 52 L23 50 L27 54Z" fill="${C.paper}" opacity=".9"/>
<path d="M0 86 C20 66 34 72 52 78 C70 62 86 66 100 76 V100 H0Z" fill="${lin([C.greenM, C.greenD])}"/>`,
      );
    },
  },
  {
    u: "1f305",
    n: "sunrise",
    draw: (t) => {
      const { lin, rad } = t;
      return tile(
        t,
        lin(["#9BB3E6", "#F5B6BF", "#FBD27A"]),
        `<g stroke="${C.paper}" stroke-width="2.4" stroke-linecap="round" opacity=".8"><path d="M50 30 V20 M30 38 L24 30 M70 38 L76 30 M18 52 H10 M82 52 H90"/></g>
<path d="M28 62 A22 22 0 0 1 72 62Z" fill="${rad([C.paper, C.yellow, C.goldM])}"/>
<rect x="0" y="62" width="100" height="40" fill="${lin([C.blueM, C.blueD])}"/>
<path d="M36 68 H64 M40 74 H60 M43 80 H57 M10 66 H22 M78 70 H90" stroke="${C.gold}" stroke-width="2" stroke-linecap="round" opacity=".85"/>`,
      );
    },
  },
  {
    u: "1f306",
    n: "cityscape at dusk",
    draw: (t) => {
      const { lin, rad } = t;
      return tile(
        t,
        lin(["#6A5FA6", "#C98AAE", "#F5A95C"]),
        `<circle cx="70" cy="54" r="12" fill="${rad([C.paper, C.yellow, C.orange])}" opacity=".95"/>
${skyline([[8, 18, 54], [28, 14, 40], [44, 20, 58], [64, 14, 34], [80, 18, 50]], "#4C477E", C.yellow, 0.9)}`,
      );
    },
  },
  {
    u: "1f307",
    n: "sunset",
    draw: (t) => {
      const { lin, rad } = t;
      return tile(
        t,
        lin(["#E58A7E", "#F5A95C", "#FBDA6A"]),
        `<circle cx="50" cy="56" r="22" fill="${rad([C.paper, C.yellow, C.orange])}"/>
${skyline([[10, 20, 62], [32, 14, 52], [47, 18, 66], [66, 14, 46], [80, 16, 60]], "#8C4A48", "#FBDA6A", 0.75)}`,
      );
    },
  },
  {
    u: "1f309",
    n: "bridge at night",
    draw: (t) => {
      const { lin } = t;
      return tile(
        t,
        lin(["#26305E", "#5A66A0"]),
        `<g fill="${C.paper}"><polygon points="${star(22, 24, 5, 2, 4)}"/><circle cx="46" cy="16" r="1.3"/><circle cx="76" cy="30" r="1.5"/><circle cx="12" cy="44" r="1.3"/></g>
<circle cx="72" cy="22" r="8" fill="${C.yellow}"/>
<rect x="0" y="66" width="100" height="40" fill="${lin(["#2F3C68", "#1F2850"])}"/>
<path d="M4 62 Q50 14 96 62" fill="none" stroke="${C.metal}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M18 52 V62 M30 42 V62 M42 36 V62 M58 36 V62 M70 42 V62 M82 52 V62" stroke="${C.metalL}" stroke-width="1.2"/>
<rect x="0" y="62" width="100" height="5" fill="#7480B0"/>
<g fill="${C.yellow}"><circle cx="18" cy="63" r="1.4"/><circle cx="34" cy="63" r="1.4"/><circle cx="50" cy="63" r="1.4"/><circle cx="66" cy="63" r="1.4"/><circle cx="82" cy="63" r="1.4"/></g>
<path d="M18 72 V76 M34 74 V80 M50 72 V78 M66 74 V80 M82 72 V76" stroke="${C.yellow}" stroke-width="2" stroke-linecap="round" opacity=".6"/>`,
      );
    },
  },
  {
    u: "2668-fe0f",
    n: "hot springs",
    draw: ({ lin }) => `<g ${B}><path d="M10 68 H90 C90 82 76 90 50 90 C24 90 10 82 10 68Z" fill="${STONE(lin)}"/></g>
<ellipse cx="50" cy="69" rx="40" ry="6" fill="${lin([C.sky, C.blue, C.blueM])}"/>
<g ${B}><path d="M26 58 C18 48 34 42 26 30 C20 22 28 16 26 10" ${M(C.red, 7)}/><path d="M50 58 C42 48 58 42 50 30 C44 22 52 16 50 10" ${M(C.redM, 7)}/><path d="M74 58 C66 48 82 42 74 30 C68 22 76 16 74 10" ${M(C.red, 7)}/></g>`,
  },

  // ───────── rail
  {
    u: "1f682",
    n: "locomotive",
    draw: ({ lin }) => {
      const wh = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.dark}"/><circle cx="${x}" cy="${y}" r="${r * 0.42}" fill="${lin([C.metalL, C.metalD])}"/>`;
      return `<g transform="translate(0 5)"><g fill="${lin([C.paper, C.creamD])}"><circle cx="14" cy="14" r="5"/><circle cx="22" cy="8" r="5.5"/><circle cx="32" cy="9" r="4"/></g>
<g ${B}><path d="M13 24 H25 L23 41 H15Z" fill="${lin([C.darkD, C.dark, C.darkD], "h")}"/><rect x="7" y="40" width="54" height="26" rx="6" fill="${lin([C.blueM, C.blue, C.blueD, C.navyD])}"/><rect x="62" y="22" width="30" height="48" rx="3" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><rect x="58" y="17" width="38" height="7" rx="2.5" fill="${lin([C.darkD, C.dark])}"/><path d="M33 40 C33 30 45 30 45 40Z" fill="${lin([C.gold, C.goldM, C.goldD], "h")}"/><path d="M6 66 H16 L8 80 H3Z" fill="${lin([C.metal, C.metalDD])}"/></g>
<rect x="68" y="30" width="18" height="16" rx="2" fill="${GLASS(lin)}"/>
<path d="M8 52 H61" stroke="${C.goldM}" stroke-width="2.4" opacity=".9"/><circle cx="8" cy="52" r="2" fill="#FFF6D0"/>
<g ${Bs}><rect x="8" y="66" width="86" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>${wh(32, 78, 8)}${wh(50, 76, 10)}${wh(76, 74, 12)}<path d="M50 76 H76" stroke="${C.metalL}" stroke-width="2"/></g></g>`;
    },
  },
  { u: "1f683", n: "railway car", draw: ({ lin }) => train(lin, { nose: "flat", col: [C.red, C.redM, C.redD], band: C.paper, pant: true, tf: "translate(0 -1)" }) },
  { u: "1f684", n: "high speed train", draw: ({ lin }) => train(lin, { nose: "bullet", col: [C.paper, "#E9DFC6", "#BFB28F"], band: C.blueM, tf: "translate(0 -4)" }) },
  { u: "1f685", n: "bullet train", draw: ({ lin }) => train(lin, { nose: "long", col: [C.paper, "#E9DFC6", "#BFB28F"], band: C.redM, tf: "translate(0 -4)" }) },
  { u: "1f686", n: "train", draw: ({ lin }) => train(lin, { nose: "round", col: [C.blue, C.blueM, C.blueD], band: C.paper, tf: "translate(0 -4)" }) },
  {
    u: "1f687",
    n: "metro",
    draw: ({ lin }) =>
      train(lin, {
        nose: "flat",
        col: [C.blue, C.blueM, C.blueD],
        band: C.blueD,
        tf: "translate(0 -4)",
        sign: `<circle cx="50" cy="55" r="8" fill="${C.paper}"/><path d="M45 59.5 V51 L50 56.5 L55 51 V59.5" ${M(C.redM, 2)}/>`,
      }),
  },
  { u: "1f688", n: "light rail", draw: ({ lin }) => train(lin, { nose: "round", col: [C.green, C.greenM, C.greenD], band: C.paper, pant: true, tf: "translate(0 -1)" }) },
  {
    u: "1f689",
    n: "station",
    draw: ({ lin }) => `${base(lin, 4, 92)}
<g ${B}><rect x="14" y="52" width="72" height="35" fill="${lin([C.woodL, C.wood])}"/><rect x="38" y="30" width="24" height="57" fill="${WALL(lin)}"/><polygon points="34,32 50,14 66,32" fill="${SLATE(lin)}"/></g>
<g ${B}><path d="M6 52 H94 L88 44 H12Z" fill="${lin([C.red, C.redD])}"/></g>
<circle cx="50" cy="40" r="6.5" fill="${C.paper}" stroke="${C.goldD}" stroke-width="1.6"/><path d="M50 40 V35.4 M50 40 H53.6" stroke="${C.darkD}" stroke-width="1.3" stroke-linecap="round"/>
<g fill="${GLASS(lin)}"><rect x="20" y="60" width="14" height="12" rx="1.5"/><rect x="66" y="60" width="14" height="12" rx="1.5"/></g>
${arch(lin, 43, 62, 14, 25)}
<g ${Bs}><rect x="11" y="20" width="26" height="9" rx="2" fill="${lin([C.blueM, C.blueD])}"/></g><path d="M16 24.5 H32" stroke="${C.paper}" stroke-width="2" stroke-linecap="round"/>`,
  },
  { u: "1f68a", n: "tram", draw: ({ lin }) => train(lin, { nose: "round", col: [C.yellow, C.yellowM, C.yellowD], band: C.redM, pant: true, tf: "translate(0 3)", extra: lineWire }) },
  { u: "1f69d", n: "monorail", draw: ({ lin }) => train(lin, { nose: "bullet", col: [C.teal, C.tealM, C.tealD], band: C.paper, nowheels: true, tf: "translate(0 -10)", extra: `<rect x="2" y="82" width="96" height="9" rx="3" fill="${lin([C.metal, C.metalDD])}"/>` }) },
  {
    u: "1f69e",
    n: "mountain railway",
    draw: ({ lin }) => train(lin, { nose: "round", col: [C.orange, C.orangeD, "#A85F1E"], band: C.paper, tf: "translate(55 40) rotate(12) scale(.8) translate(-50 -48)", extra: `<rect x="-2" y="86" width="104" height="5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>` }),
  },
  { u: "1f68b", n: "tram car", draw: ({ lin }) => train(lin, { nose: "flat", col: [C.red, C.redM, C.redD], band: C.paper, pole: true, tf: "translate(0 3)", extra: lineWire }) },
];

export default __batch;
