// objects-4: paper, books, money, mail.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const P = {
  usd: "M6 -7 C4 -12 -6 -12 -6 -6 C-6 0 6 0 6 7 C6 13 -4 13 -6 8 M0 -15 V15",
  yen: "M-8 -13 L0 0 L8 -13 M0 0 V14 M-7 3 H7 M-7 8.5 H7",
  eur: "M8 -9 A10 10 0 1 0 8 9 M-10 -3 H3 M-10 3 H3",
  gbp: "M7 -10 C3 -15 -6 -14 -6 -6 V6 C-6 10 -8 12 -10 13 H8 M-9 0 H3",
};
const sign = (k, x, y, s, col, w = 2.6) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="${P[k]}"/></g>`;

const book = (lin, c, extra = "") => `
<g ${B}><rect x="26" y="12" width="54" height="80" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M78 18 V88 M74 90 H26" stroke="#B8A780" stroke-width=".9" opacity=".7"/>
<g ${B}><rect x="20" y="8" width="56" height="80" rx="5" fill="${lin(c, "d")}"/></g>
<rect x="20" y="8" width="11" height="80" rx="5" fill="#000" opacity=".16"/>${extra}`;

const bands = `<g ${Bs}><rect x="38" y="22" width="29" height="5" rx="2.5" fill="${C.paper}"/><rect x="38" y="31" width="19" height="3.5" rx="1.7" fill="${C.paper}"/><rect x="38" y="74" width="29" height="3.5" rx="1.7" fill="${C.paper}"/></g>`;

const note = (lin, c, k, col, rot = -7) => `
<g ${B}><g transform="rotate(${-rot} 50 50)"><rect x="9" y="24" width="82" height="50" rx="5" fill="${lin([c[1], c[2]], "d")}"/></g></g>
<g ${B}><g transform="rotate(${rot} 50 50)"><rect x="9" y="25" width="82" height="50" rx="5" fill="${lin(c, "d")}"/></g></g>
<g transform="rotate(${rot} 50 50)">
<rect x="15" y="31" width="70" height="38" rx="3" fill="none" stroke="${C.paper}" stroke-width="1.3" stroke-dasharray="3 2.2" opacity=".75"/>
<circle cx="50" cy="50" r="14" fill="${C.paper}" opacity=".9"/>${sign(k, 50, 50, 0.8, col)}
<circle cx="23" cy="41" r="3.2" fill="${C.paper}" opacity=".7"/><circle cx="77" cy="59" r="3.2" fill="${C.paper}" opacity=".7"/></g>`;

const env = (lin, x = 8, y = 22, w = 84, h = 58) => {
  const r = x + w, b = y + h, m = x + w / 2;
  return `<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
<path d="M${x + 2} ${b - 3} L${x + w * 0.4} ${y + h * 0.5} M${r - 2} ${b - 3} L${x + w * 0.6} ${y + h * 0.5}" stroke="${C.creamD}" stroke-width="1.6" stroke-linecap="round" fill="none"/>
<g ${Bs}><path d="M${x + 2} ${y + 3} L${m} ${y + h * 0.62} L${r - 2} ${y + 3}Z" fill="${lin(["#EDE2C4", "#C9BB94"])}" stroke="${C.creamD}" stroke-width="2" stroke-linejoin="round"/></g>`;
};

const arrowD = `-7,0 7,0 7,26 17,26 0,46 -17,26 -7,26`;
const arrowU = `-7,0 7,0 7,-26 17,-26 0,-46 -17,-26 -7,-26`;

const tray = (lin, up) => `
<g ${B}><path d="M12 46 H88 V76 H12Z" fill="${lin([C.navyD, C.navy])}"/></g>
<g ${B}><polygon points="${up ? arrowU : arrowD}" transform="translate(50 ${up ? 58 : 10})" fill="${lin([C.orange, C.orangeD], "d")}"/></g>
<g ${B}><rect x="8" y="52" width="84" height="9" rx="4.5" fill="${lin([C.blue, C.blueM])}"/><rect x="8" y="58" width="84" height="32" rx="7" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<rect x="38" y="68" width="24" height="3.4" rx="1.7" fill="${C.paper}" opacity=".85"/>`;

const mbox = (lin, open, up) => {
  const body = "M8 66 V40 C8 24 20 16 38 16 C56 16 68 24 68 40 V66Z";
  const flag = up
    ? `<rect x="80" y="14" width="4" height="38" fill="${C.metal}"/><rect x="84" y="12" width="13" height="16" rx="2" fill="${lin([C.red, C.redD], "d")}"/>`
    : `<rect x="80" y="48" width="4" height="36" fill="${C.metal}"/><rect x="84" y="70" width="13" height="16" rx="2" fill="${lin([C.red, C.redD], "d")}"/>`;
  return `<g ${B}><rect x="32" y="62" width="12" height="32" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}><rect x="66" y="45" width="16" height="8" rx="3" fill="${C.metalD}"/>${flag}</g>
<g ${B}><path d="${body}" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
${open ? `<path d="M15 66 V42 C15 31 24 24 38 24 C52 24 61 31 61 42 V66Z" fill="${C.darkD}" opacity=".9"/><path d="M15 66 V42 C15 31 24 24 38 24 C52 24 61 31 61 42 V66" fill="none" stroke="${C.sky}" stroke-width="1.5" opacity=".6"/>`
: `<path d="M15 66 V42 C15 31 24 24 38 24 C52 24 61 31 61 42 V66" fill="none" stroke="${C.navyD}" stroke-width="1.4" opacity=".55"/><g ${Bs}><rect x="32" y="49" width="12" height="5" rx="2.5" fill="${lin([C.gold, C.goldD])}"/></g>`}
<g ${B}><rect x="4" y="64" width="68" height="8" rx="4" fill="${lin([C.blueM, C.blueD])}"/></g>`;
};

const lines = (xs, y, ws, col = "#9AA4BE", gap = 8) =>
  ws.map((w, i) => `<rect x="${xs}" y="${y + i * gap}" width="${w}" height="2.4" rx="1.2" fill="${col}" opacity=".8"/>`).join("");

const __batch: Icon[] = [
  { u: "1f4d4", n: "notebook with decorative cover", draw: ({ lin }) => book(lin, [C.pink, C.purple, C.purpleD], `
<rect x="37" y="17" width="34" height="54" rx="3" fill="none" stroke="${C.gold}" stroke-width="1.8"/>
<g ${Bs}><polygon points="${star(54, 44, 12, 5.4)}" fill="${lin([C.gold, C.goldD])}"/></g>
<g fill="${C.gold}"><circle cx="45" cy="25" r="1.8"/><circle cx="63" cy="25" r="1.8"/><circle cx="45" cy="63" r="1.8"/><circle cx="63" cy="63" r="1.8"/></g>`) },
  { u: "1f4d5", n: "closed book", draw: ({ lin }) => book(lin, [C.red, C.redM, C.redD], bands) },
  { u: "1f4d7", n: "green book", draw: ({ lin }) => book(lin, [C.green, C.greenM, C.greenD], bands) },
  { u: "1f4d8", n: "blue book", draw: ({ lin }) => book(lin, [C.blue, C.blueM, C.blueD], bands) },
  { u: "1f4d9", n: "orange book", draw: ({ lin }) => book(lin, ["#FAC584", C.orange, C.orangeD], bands) },
  { u: "1f4d3", n: "notebook", draw: ({ lin }) => book(lin, ["#7684B8", C.navy, C.navyD], `
<path d="M35 12 V84" stroke="${C.paper}" stroke-width="1.2" stroke-dasharray="3 2.4" opacity=".6"/>
<g ${Bs}><rect x="40" y="22" width="30" height="24" rx="2.5" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="44" y="28" width="22" height="2.6" rx="1.3" fill="${C.navy}" opacity=".7"/><rect x="44" y="34.5" width="14" height="2.6" rx="1.3" fill="${C.navy}" opacity=".5"/>
<g ${Bs}><rect x="66" y="8" width="5" height="80" fill="${lin([C.darkD, C.dark], "h")}"/></g>`) },
  { u: "1f4d2", n: "ledger", draw: ({ lin }) => book(lin, [C.yellow, C.yellowM, C.yellowD], `
<g ${Bs}><path d="M20 13 a5 5 0 0 1 5 -5 H35 V88 H25 a5 5 0 0 1 -5 -5Z" fill="${lin([C.red, C.redD], "h")}"/></g>
<g ${Bs}><rect x="42" y="20" width="28" height="30" rx="2.5" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="46" y="26" width="20" height="2.6" rx="1.3" fill="${C.redM}" opacity=".8"/>${lines(46, 34, [20, 14], C.yellowD, 6)}
<path d="M42 62 H70 M42 70 H70 M42 78 H62" stroke="${C.yellowD}" stroke-width="1.4" opacity=".8"/>`) },
  { u: "1f4c3", n: "page with curl", draw: ({ lin }) => `
<g ${B}><path d="M22 8 H78 V58 L52 90 H26 a4 4 0 0 1 -4 -4Z" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
${lines(30, 18, [40, 44, 34, 44, 28, 34], "#9AA4BE", 7.5)}
<g ${B}><path d="M78 58 L52 90 C45 80 45 70 50 62 Q64 62 78 58Z" fill="${lin(["#EDE2C4", "#C2B38A"], "d")}"/></g>` },
  { u: "1f4c4", n: "page facing up", draw: ({ lin }) => `
<g ${B}><path d="M22 8 H62 L80 26 V86 a4 4 0 0 1 -4 4 H26 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4Z" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
<g ${Bs}><path d="M62 8 L80 26 H66 a4 4 0 0 1 -4 -4Z" fill="${lin(["#EDE2C4", "#C2B38A"], "d")}"/></g>
<rect x="30" y="20" width="24" height="3.2" rx="1.6" fill="${C.blueM}" opacity=".85"/>${lines(30, 34, [42, 36, 42, 30, 42, 36], "#9AA4BE", 8)}` },
  { u: "1f4f0", n: "newspaper", draw: ({ lin }) => `
<g ${B}><rect x="16" y="22" width="76" height="70" rx="4" fill="${lin([C.creamD, "#B9A87E"], "d")}"/></g>
<g ${B}><rect x="8" y="14" width="76" height="70" rx="4" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
<rect x="14" y="20" width="64" height="9" rx="2" fill="${C.dark}"/>
<g ${Bs}><rect x="14" y="35" width="28" height="22" rx="2" fill="${lin([C.sky, C.blueM], "d")}"/></g>
<path d="M14 57 L24 46 L31 52 L36 47 L42 53 V57Z" fill="${C.blueD}" opacity=".6"/>
<g fill="${C.dark}" opacity=".75"><rect x="47" y="36" width="31" height="3.4" rx="1.7"/><rect x="47" y="43" width="31" height="3.4" rx="1.7"/><rect x="47" y="50" width="22" height="3.4" rx="1.7"/></g>
${lines(14, 63, [64, 64, 44], "#9AA4BE", 6.5)}` },
  { u: "1f5de-fe0f", n: "rolled up newspaper", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-32 50 50)">
<rect x="6" y="30" width="80" height="40" rx="3" fill="${lin(["#FFFBF0", C.paper, "#CDBE96"])}"/>
<ellipse cx="86" cy="50" rx="9" ry="20" fill="${lin([C.paper, "#C9BB94"], "h")}"/></g></g>
<g transform="rotate(-32 50 50)">
<rect x="12" y="36" width="34" height="6" rx="1.5" fill="${C.dark}"/>
<g fill="#9AA4BE" opacity=".85"><rect x="12" y="46" width="44" height="2.6" rx="1.3"/><rect x="12" y="52" width="40" height="2.6" rx="1.3"/><rect x="12" y="58" width="32" height="2.6" rx="1.3"/></g>
<g fill="none" stroke="#9C8F74" stroke-width="1.4"><ellipse cx="86" cy="50" rx="6" ry="13"/><ellipse cx="86" cy="50" rx="3" ry="6.5"/></g></g>
<g ${Bs}><g transform="rotate(-32 50 50)"><rect x="58" y="29" width="7" height="42" rx="2" fill="${lin([C.red, C.redD], "h")}"/></g></g>` },
  { u: "1f4d1", n: "bookmark tabs", draw: ({ lin }) => `
<g ${B}><rect x="20" y="14" width="56" height="78" rx="4" fill="${lin([C.creamD, "#B9A87E"], "d")}"/></g>
<g ${Bs}>${[[16, C.red, C.redD], [38, C.yellow, C.yellowD], [60, C.blue, C.blueD]].map(([y, a, b]: any[]) => `<rect x="60" y="${y}" width="28" height="19" rx="5" fill="${lin([a, b], "d")}"/>`).join("")}</g>
<g ${B}><rect x="12" y="6" width="56" height="80" rx="4" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
${lines(20, 18, [38, 30, 38, 24, 38, 32, 20], "#9AA4BE", 9)}` },
  { u: "1f516", n: "bookmark", draw: ({ lin }) => `
<g ${B}><g transform="rotate(8 50 50)"><path d="M27 6 H73 V94 L50 74 L27 94Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g></g>
<g transform="rotate(8 50 50)"><path d="M34 14 H66 V80 L50 66 L34 80Z" fill="none" stroke="${C.paper}" stroke-width="1.4" stroke-dasharray="3 2.4" opacity=".7"/></g>
<g ${Bs}><polygon points="${star(53, 36, 12, 5.2)}" fill="${lin([C.gold, C.goldD])}"/></g>` },
  { u: "1f3f7-fe0f", n: "label", draw: ({ lin }) => `<g transform="translate(4 8)">
<g ${B}><g transform="rotate(40 50 50)"><path d="M6 32 a6 6 0 0 1 6 -6 H64 L94 50 L64 74 H12 a6 6 0 0 1 -6 -6Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g></g>
<g transform="rotate(40 50 50)">
<rect x="14" y="36" width="36" height="28" rx="3" fill="${C.paper}" opacity=".92"/>
<rect x="19" y="42" width="26" height="3" rx="1.5" fill="${C.yellowD}"/><rect x="19" y="49" width="18" height="3" rx="1.5" fill="${C.yellowD}" opacity=".6"/><rect x="19" y="55" width="22" height="3" rx="1.5" fill="${C.yellowD}" opacity=".6"/>
<circle cx="76" cy="50" r="5.2" fill="${C.woodDD}" opacity=".85"/>
<path d="M76 50 C72 36 94 32 92 44" fill="none" stroke="${C.woodD}" stroke-width="2" stroke-linecap="round"/></g></g>` },
  { u: "1fa99", n: "coin", draw: ({ lin }) => `
<g ${B}><circle cx="50" cy="55" r="39" fill="${C.goldD}"/><circle cx="50" cy="50" r="39" fill="${lin(["#FCE595", C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="50" r="30" fill="none" stroke="${C.goldD}" stroke-width="2" opacity=".55"/>
<circle cx="50" cy="50" r="34" fill="none" stroke="#FFF3BF" stroke-width="1.4" opacity=".6" stroke-dasharray="2 3"/>
<g ${Bs}><polygon points="${star(50, 51, 18, 8)}" fill="${lin(["#FFF3BF", C.gold, C.goldM], "d")}"/></g>` },
  { u: "1f4b0", n: "money bag", draw: ({ lin }) => `
<g ${B}><path d="M34 26 C28 16 24 12 20 8 C30 12 40 14 50 11 C60 14 70 12 80 8 C76 12 72 16 66 26Z" fill="${lin(["#EFCB98", C.wood])}"/></g>
<g ${B}><path d="M36 26 C28 38 11 52 11 72 C11 88 28 94 50 94 C72 94 89 88 89 72 C89 52 72 38 64 26Z" fill="${lin(["#EDC995", C.wood, C.woodD], "d")}"/></g>
<g ${Bs}><rect x="33" y="22" width="34" height="8" rx="4" fill="${lin([C.red, C.redD])}"/></g>
${sign("usd", 50, 63, 1.5, C.woodDD, 2.8)}` },
  { u: "1f4b4", n: "yen banknote", draw: ({ lin }) => note(lin, [C.pink, C.pinkD, "#BF6A83"], "yen", "#9A3E58") },
  { u: "1f4b5", n: "dollar banknote", draw: ({ lin }) => note(lin, [C.green, C.greenM, C.greenD], "usd", C.greenD) },
  { u: "1f4b6", n: "euro banknote", draw: ({ lin }) => note(lin, [C.blue, C.blueM, C.blueD], "eur", C.blueD) },
  { u: "1f4b7", n: "pound banknote", draw: ({ lin }) => note(lin, ["#C9B6EC", C.purple, C.purpleD], "gbp", C.purpleD) },
  { u: "1f4b8", n: "money with wings", draw: ({ lin }) => {
    const wing = (px, dir, angs) => angs.map((a) => `<ellipse cx="${px + dir * 14}" cy="52" rx="15" ry="5.6" transform="rotate(${a * -dir} ${px} 52)" fill="${lin([C.paper, "#CDBE96"], "d")}" stroke="#B9A67A" stroke-width="1.2"/>`).join("");
    return `<g ${B}>${wing(33, -1, [62, 36, 10])}${wing(67, 1, [62, 36, 10])}</g>
<g ${B}><g transform="rotate(-8 50 50)"><rect x="25" y="34" width="50" height="32" rx="4" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><circle cx="50" cy="50" r="9" fill="${C.paper}" opacity=".9"/>${sign("usd", 50, 50, 0.5, C.greenD, 3)}<rect x="29" y="38" width="42" height="24" rx="2" fill="none" stroke="${C.paper}" stroke-width="1" stroke-dasharray="2.4 2" opacity=".7"/></g>`;
  } },
  { u: "1f4b3", n: "credit card", draw: ({ lin }) => `
<g ${B}><g transform="rotate(-8 50 50)"><rect x="6" y="19" width="88" height="62" rx="8" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><rect x="6" y="32" width="88" height="11" fill="${C.darkD}" opacity=".85"/>
<rect x="16" y="52" width="17" height="13" rx="3" fill="${lin([C.gold, C.goldD], "d")}"/><path d="M16 58.5 H33 M24.5 52 V65" stroke="${C.goldD}" stroke-width="1"/>
<rect x="40" y="54" width="44" height="3.2" rx="1.6" fill="${C.paper}" opacity=".85"/><rect x="40" y="62" width="26" height="3.2" rx="1.6" fill="${C.paper}" opacity=".6"/></g>` },
  { u: "1f9fe", n: "receipt", draw: ({ lin }) => {
    const zz = Array.from({ length: 9 }, (_, i) => `L${73 - i * 6} ${i % 2 ? 92 : 86}`).join(" ");
    return `<g ${B}><path d="M24 8 H76 V86 ${zz} L25 86 V8Z" fill="${lin([C.paper, C.paperD], "d")}" stroke="#B9A67A" stroke-width="1.2"/></g>
<rect x="32" y="16" width="26" height="4" rx="2" fill="${C.dark}" opacity=".8"/>
<g stroke="#9AA4BE" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1 4.2">${[30, 39, 48, 57].map((y) => `<path d="M32 ${y} H68"/>`).join("")}</g>
<g fill="#9AA4BE" opacity=".85">${[30, 39, 48, 57].map((y) => `<rect x="32" y="${y - 1.5}" width="${14 + (y % 5) * 2}" height="3" rx="1.5"/>`).join("")}</g>
<rect x="32" y="67" width="36" height="3.2" rx="1.6" fill="${C.redM}" opacity=".85"/><rect x="48" y="75" width="20" height="3.2" rx="1.6" fill="${C.dark}" opacity=".7"/>`;
  } },
  { u: "1f4b9", n: "chart increasing with yen", draw: ({ lin }) => `
<g ${B}><rect x="8" y="12" width="84" height="76" rx="8" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M18 22 V78 H84" fill="none" stroke="#9AA4BE" stroke-width="1.8" stroke-linecap="round"/>
<g ${Bs}>${[[44, 14], [56, 24], [68, 36]].map(([x, h]) => `<rect x="${x}" y="${78 - h}" width="9" height="${h}" rx="1.5" fill="${lin([C.blue, C.blueD])}"/>`).join("")}</g>
${sign("yen", 33, 35, 0.9, C.goldD, 3)}
<path d="M24 68 L40 54 L52 60 L76 30" fill="none" stroke="${C.greenD}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<polygon points="84,22 66,28 78,40" fill="${C.greenD}"/>` },
  { u: "2709-fe0f", n: "envelope", draw: ({ lin }) => env(lin) },
  { u: "1f4e7", n: "e mail", draw: ({ lin }) => `${env(lin, 6, 14, 76, 54)}
<g ${B}><circle cx="72" cy="70" r="21" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<circle cx="72" cy="70" r="5" fill="none" stroke="${C.paper}" stroke-width="2.4"/>
<path d="M77 70 v2.5 a3.2 3.2 0 0 0 6.4 0 V70 a11.4 11.4 0 1 0 -4.8 9.3" fill="none" stroke="${C.paper}" stroke-width="2.4" stroke-linecap="round"/>` },
  { u: "1f4e8", n: "incoming envelope", draw: ({ lin }) => `<g transform="translate(6 -6)">${env(lin, 4, 32, 80, 58)}
<g ${B}><polygon points="${arrowD}" transform="translate(74 28) rotate(45) scale(.95)" fill="${lin([C.orange, C.orangeD], "d")}"/></g></g>` },
  { u: "1f4e9", n: "envelope with arrow", draw: ({ lin }) => `${env(lin, 8, 44, 84, 48)}
<g ${B}><polygon points="${arrowD}" transform="translate(50 6) scale(.9)" fill="${lin([C.orange, C.orangeD], "d")}"/></g>` },
  { u: "1f4e4", n: "outbox tray", draw: ({ lin }) => tray(lin, true) },
  { u: "1f4e5", n: "inbox tray", draw: ({ lin }) => tray(lin, false) },
  { u: "1f4e6", n: "package", draw: ({ lin }) => `
<g ${B}><polygon points="12,32 50,50 50,90 12,72" fill="${lin([C.wood, C.woodD], "d")}"/><polygon points="88,32 50,50 50,90 88,72" fill="${lin([C.woodD, "#7C4F2B"], "d")}"/><polygon points="50,12 88,32 50,50 12,32" fill="${lin([C.woodL, C.wood], "d")}"/></g>
<g ${Bs}><polygon points="34.8,20.8 72.8,38.8 65.2,42.4 27.2,24.4" fill="${C.cream}"/><polygon points="72.8,38.8 65.2,42.4 65.2,82.4 72.8,78.8" fill="${C.creamD}"/></g>
<polygon points="20,52 40,61 40,74 20,65" fill="${C.paper}" opacity=".85"/><path d="M24 57 L36 62.5 M24 62 L33 66" stroke="${C.woodD}" stroke-width="1.3" stroke-linecap="round"/>` },
  { u: "1f4eb", n: "closed mailbox with raised flag", draw: ({ lin }) => mbox(lin, false, true) },
  { u: "1f4ea", n: "closed mailbox with lowered flag", draw: ({ lin }) => mbox(lin, false, false) },
  { u: "1f4ec", n: "open mailbox with raised flag", draw: ({ lin }) => mbox(lin, true, true) },
  { u: "1f4ed", n: "open mailbox with lowered flag", draw: ({ lin }) => mbox(lin, true, false) },
  { u: "1f4ee", n: "postbox", draw: ({ lin }) => `
<g ${B}><rect x="30" y="86" width="40" height="7" rx="2" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${B}><path d="M22 28 C22 8 78 8 78 28 V86 H22Z" fill="${lin([C.redD, C.red, "#F79A8E", C.redM, C.redD], "h")}"/></g>
<g ${Bs}><rect x="30" y="30" width="40" height="7" rx="3" fill="${lin([C.red, C.redD])}"/></g>
<rect x="33" y="37" width="34" height="6" rx="2" fill="${C.darkD}" opacity=".85"/>
<g ${Bs}><rect x="33" y="52" width="34" height="22" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M42 59 H58 M42 64 H58 M50 64 V71" stroke="${C.redM}" stroke-width="2.4" stroke-linecap="round" fill="none"/>` },
];

export default __batch;
