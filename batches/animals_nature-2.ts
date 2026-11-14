import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const eye = (x, y, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${+(3.4 * s).toFixed(2)}" ry="${+(4.2 * s).toFixed(2)}" fill="${C.darkD}"/><circle cx="${+(x - 1.1 * s).toFixed(2)}" cy="${+(y - 1.6 * s).toFixed(2)}" r="${+(1.15 * s).toFixed(2)}" fill="#fff"/>`;
const cheek = (x, y, r = 5) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="${C.pinkD}" opacity=".4"/>`;
const legs = (xs, y0, y1, w, fill, rx = 3.5) =>
  xs.map((x) => `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${rx}" fill="${fill}"/>`).join("");

const PINK = [C.pink, "#EE9FB3", C.pinkD];
const GREY = ["#C9D0DC", "#9AA4B8", "#6C778F"];
const SLATE = ["#8B96B8", "#5F6B8F", "#434D70"];
const BROWN = ["#E0AE78", C.wood, C.woodD];
const DBROWN = [C.wood, C.woodD, C.woodDD];
const WHITE = [C.paper, "#EDE3C8", C.creamD];
const ORANGE = ["#F8C58A", C.orange, C.orangeD];
const TAN = ["#F1D3A0", "#DDB57A", "#BC8D54"];

// ---------- pig
const pigFace = ({ lin }) => `
<g ${B}><path d="M13 36 L19 9 L42 22Z M87 36 L81 9 L58 22Z" fill="${lin([C.pink, C.pinkD])}"/></g>
<g ${B}><circle cx="50" cy="54" r="38" fill="${lin(PINK, "d")}"/></g>
<g ${Bs}><ellipse cx="50" cy="67" rx="16" ry="12" fill="${lin([C.pink, C.pinkD, "#C9677F"])}"/></g>
<ellipse cx="43.5" cy="67" rx="2.6" ry="4.4" fill="#B04A66"/><ellipse cx="56.5" cy="67" rx="2.6" ry="4.4" fill="#B04A66"/>
${eye(32, 48)}${eye(68, 48)}${cheek(21, 62, 5)}${cheek(79, 62, 5)}`;

const pigSide = ({ lin }) => `
<path d="M84 50 C95 44 95 60 88 58 C84 56 90 52 86 54" fill="none" stroke="${C.pinkD}" stroke-width="3.5" stroke-linecap="round"/>
<g ${B}>${legs([30, 42, 66, 77], 64, 88, 9, lin([C.pinkD, "#C9677F"]))}</g>
<g ${B}><ellipse cx="57" cy="56" rx="31" ry="21" fill="${lin(PINK, "d")}"/></g>
<g ${B}><path d="M30 24 L38 14 L44 30Z" fill="${lin([C.pink, C.pinkD])}"/></g>
<g ${B}><circle cx="30" cy="50" r="19" fill="${lin(PINK, "d")}"/></g>
<g ${Bs}><ellipse cx="14" cy="55" rx="9" ry="9" fill="${lin([C.pink, C.pinkD, "#C9677F"])}"/></g>
<ellipse cx="11" cy="53" rx="1.8" ry="3.4" fill="#B04A66"/><ellipse cx="17" cy="55" rx="1.8" ry="3.4" fill="#B04A66"/>
${eye(28, 43, 0.85)}${cheek(31, 58, 4)}`;

const boar = ({ lin }) => `
<path d="M88 46 C97 40 97 54 92 54" fill="none" stroke="${C.woodDD}" stroke-width="3.5" stroke-linecap="round"/>
<g ${B}>${legs([30, 42, 66, 77], 64, 88, 9, lin([C.woodD, C.woodDD]))}</g>
<g ${B}><path d="M30 38 C34 22 52 18 64 24 C78 20 90 34 88 52 C86 70 72 76 56 76 C40 76 28 66 30 38Z" fill="${lin(DBROWN, "d")}"/></g>
<path d="M44 26 L48 20 L54 26 L60 19 L66 27 L72 22 L76 31" fill="none" stroke="${C.woodDD}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
<g ${B}><path d="M34 28 L40 18 L46 32Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g ${B}><circle cx="30" cy="50" r="19" fill="${lin(DBROWN, "d")}"/></g>
<g ${Bs}><ellipse cx="14" cy="55" rx="9.5" ry="9" fill="${lin([C.pink, C.pinkD, "#B7566F"])}"/></g>
<ellipse cx="11" cy="53" rx="1.8" ry="3.2" fill="#6B2A3A"/><ellipse cx="17" cy="55" rx="1.8" ry="3.2" fill="#6B2A3A"/>
<g ${Bs}><path d="M20 62 C16 62 14 68 18 70 C20 66 24 64 26 63Z M33 62 C37 66 40 62 38 56 C36 58 34 60 33 62Z" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(29, 43, 0.85)}`;

const pigNose = ({ lin }) => `
<g ${B}><ellipse cx="50" cy="52" rx="42" ry="35" fill="${lin(PINK, "d")}"/></g>
<g ${Bs}><ellipse cx="50" cy="55" rx="26" ry="21" fill="${lin([C.pink, C.pinkD, "#C9677F"])}"/></g>
<ellipse cx="40" cy="55" rx="5" ry="9" fill="#B04A66"/><ellipse cx="60" cy="55" rx="5" ry="9" fill="#B04A66"/>
<ellipse cx="38.6" cy="51" rx="1.4" ry="2.6" fill="#fff" opacity=".4"/><ellipse cx="58.6" cy="51" rx="1.4" ry="2.6" fill="#fff" opacity=".4"/>
${cheek(15, 56, 5)}${cheek(85, 56, 5)}`;

// ---------- sheep family
const wool = (lin, pts) =>
  `<g ${B}>${pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${lin([C.paper, "#EDE3C8", C.creamD], "d")}"/>`).join("")}</g>`;
const WB = [[40, 52, 18], [56, 44, 19], [72, 54, 17], [54, 62, 20], [38, 66, 14], [70, 68, 14]];

const ram = ({ lin }) => `
<g ${B}>${legs([40, 50, 68, 78], 70, 90, 7, lin([C.dark, C.darkD]))}</g>
${wool(lin, WB.map(([x, y, r]) => [x + 3, y - 3, r]))}
<g ${B}><path d="M28 36 C16 36 8 46 12 60 C14 70 24 72 30 66 C36 60 38 44 28 36Z" fill="${lin(["#8B96B8", C.dark, C.darkD], "d")}"/></g>
<g ${B}><path d="M32 40 C20 20 40 6 52 18 C60 26 52 36 46 32 C50 26 44 20 38 26 C34 30 36 36 36 40Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<path d="M30 28 C24 24 28 16 36 18" fill="none" stroke="${C.dark}" stroke-width="0" />
${eye(19, 52, 0.8)}<ellipse cx="12.5" cy="60" rx="2.6" ry="2" fill="${C.darkD}"/>`;

const ewe = ({ lin }) => `
<g ${B}>${legs([40, 50, 68, 78], 70, 90, 7, lin([C.dark, C.darkD]))}</g>
${wool(lin, WB.map(([x, y, r]) => [x + 3, y - 1, r]))}
<g ${B}><path d="M22 28 C26 22 34 26 32 34Z" fill="${lin(["#8B96B8", C.dark])}"/></g>
<g ${B}><path d="M30 38 C18 36 11 46 14 58 C16 68 26 70 32 64 C38 58 40 42 30 38Z" fill="${lin(["#8B96B8", C.dark, C.darkD], "d")}"/></g>
<g ${B}><circle cx="30" cy="32" r="9" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(21, 50, 0.8)}<ellipse cx="14.5" cy="58" rx="2.6" ry="2" fill="${C.darkD}"/>`;

// ---------- goat
const goat = ({ lin }) => `
<g ${Bs}><path d="M84 46 L96 38 L90 54Z" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${B}>${legs([34, 44, 68, 78], 64, 90, 7, lin([C.creamD, "#A89870"]))}</g>
<g ${B}><ellipse cx="62" cy="56" rx="27" ry="17" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M34 16 C44 6 58 8 62 18 C54 14 44 14 38 24Z" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<g ${B}><path d="M36 22 C48 18 56 30 52 44 L44 60 C40 62 34 60 30 52 L24 40 C26 28 30 24 36 22Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M46 28 L58 36 L50 38Z" fill="${lin([C.creamD, "#A89870"])}"/></g>
<g ${Bs}><path d="M36 58 C34 68 38 74 41 68 C42 64 41 60 40 58Z" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(36, 36, 0.8)}<ellipse cx="27" cy="50" rx="1.6" ry="1.2" fill="${C.darkD}"/>`;

// ---------- camel
const camelBody = (lin, humps) => `
<g ${B}>${legs([30, 40, 68, 78], 62, 90, 7, lin([TAN[1], TAN[2]]))}</g>
<path d="M88 52 C94 56 92 70 90 78" fill="none" stroke="${C.wood}" stroke-width="3.5" stroke-linecap="round"/>
<g ${B}><path d="M30 14 C40 6 52 14 48 30 C46 40 40 46 36 54 L24 56 C32 44 34 36 30 14Z" fill="${lin(TAN, "d")}"/></g>`;

const camel = ({ lin }) => `
<g ${B}>${legs([34, 44, 68, 78], 66, 90, 7, lin([TAN[1], TAN[2]]))}</g>
<path d="M88 54 C94 58 92 70 90 78" fill="none" stroke="${C.wood}" stroke-width="3.5" stroke-linecap="round"/>
<g ${B}><path d="M32 52 C32 44 42 44 50 38 C54 24 70 24 72 40 C84 40 90 50 88 60 C86 70 76 72 66 72 C48 72 32 68 32 52Z" fill="${lin(TAN, "d")}"/></g>
<g ${B}><path d="M20 14 C28 8 38 12 36 22 C36 34 40 44 42 54 L30 62 C28 48 26 40 22 30 C14 26 12 18 20 14Z" fill="${lin(TAN, "d")}"/></g>
${eye(26, 20, 0.75)}<ellipse cx="15" cy="23" rx="1.6" ry="1.2" fill="${C.darkD}"/>`;

const camel2 = ({ lin }) => `
<g ${B}>${legs([32, 42, 68, 78], 66, 90, 7, lin([C.woodD, C.woodDD]))}</g>
<path d="M88 54 C94 58 92 70 90 78" fill="none" stroke="${C.woodD}" stroke-width="3.5" stroke-linecap="round"/>
<g ${B}><path d="M30 56 C30 48 40 46 46 40 C48 26 60 26 62 42 C64 28 78 28 80 44 C88 48 90 58 86 64 C82 72 70 72 62 72 C46 72 30 68 30 56Z" fill="${lin(DBROWN.map((c, i) => [BROWN[0], C.wood, C.woodD][i]), "d")}"/></g>
<g ${B}><path d="M18 18 C26 12 36 16 34 26 C34 36 38 46 40 54 L28 62 C26 48 24 42 20 34 C12 30 10 22 18 18Z" fill="${lin(BROWN, "d")}"/></g>
${eye(24, 24, 0.75)}<ellipse cx="13" cy="27" rx="1.6" ry="1.2" fill="${C.darkD}"/>`;

// ---------- llama
const llama = ({ lin }) => `
<g ${B}>${legs([40, 50, 68, 78], 66, 90, 6.5, lin([C.creamD, "#A89870"]))}</g>
<g ${B}><path d="M36 70 C32 56 40 50 56 50 C74 48 88 54 86 66 C84 76 70 74 60 74 C48 74 40 74 36 70Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M22 12 C32 6 40 14 40 24 C42 36 48 46 56 56 L36 64 C32 48 28 40 26 30 C16 26 14 16 22 12Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M24 12 C22 2 28 2 30 10Z M34 10 C36 2 42 4 38 14Z" fill="${lin([C.wood, C.woodD])}"/></g>
<g ${Bs}><path d="M40 16 C50 12 54 26 44 38 C46 46 52 52 56 56 C58 62 66 56 74 54 L84 60 C86 52 80 48 70 50 C56 50 44 44 40 38Z" fill="${lin([C.pink, C.pinkD])}" opacity="0"/></g>
${eye(26, 22, 0.75)}<ellipse cx="15" cy="27" rx="1.6" ry="1.2" fill="${C.darkD}"/>
<path d="M44 52 C52 56 58 54 62 50" fill="none" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>`;

// ---------- giraffe
const giraffe = ({ lin }) => {
  const sp = (x, y, r = 3.4) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.85}" transform="rotate(-20 ${x} ${y})"/>`;
  return `
<path d="M80 54 C88 58 90 68 88 76" fill="none" stroke="${C.yellowD}" stroke-width="3" stroke-linecap="round"/>
<g ${B}>${legs([36, 46, 68, 78], 66, 92, 6, lin([C.yellow, C.yellowD]))}</g>
<g ${B}><path d="M32 60 C32 50 40 50 46 48 L48 20 L30 12 C28 6 36 4 44 6 C52 8 60 20 56 40 C66 42 82 44 82 58 C82 68 70 72 56 72 C42 72 32 70 32 60Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<g ${B}><path d="M30 8 C26 8 20 14 22 20 C26 24 34 20 40 20 L52 18 C50 10 40 6 30 8Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<g ${Bs}><path d="M36 6 L36 -0 M44 8 L45 1" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round"/></g>
<g fill="${C.woodD}" opacity=".75">${sp(54, 30)}${sp(50, 44, 3)}${sp(62, 56, 4.5)}${sp(48, 60, 4)}${sp(72, 62, 3.6)}${sp(74, 50, 3.2)}${sp(40, 66, 2.6)}${sp(52, 18, 2.4)}</g>
${eye(30, 14, 0.7)}<ellipse cx="22" cy="18" rx="1.4" ry="1.1" fill="${C.darkD}"/>`;
};

// ---------- elephant, mammoth
const elephant = ({ lin }) => `
<g ${B}>${legs([40, 52, 68, 80], 62, 90, 10, lin([GREY[1], GREY[2]]), 4)}</g>
<path d="M90 48 C94 56 92 64 90 70" fill="none" stroke="${C.metalD}" stroke-width="3" stroke-linecap="round"/>
<g ${B}><ellipse cx="60" cy="52" rx="30" ry="24" fill="${lin(GREY, "d")}"/></g>
<g ${B}><path d="M32 30 C16 28 8 42 10 58 C12 72 12 78 18 80 C24 82 26 76 24 70 C22 60 24 56 28 54 L40 60 L46 34Z" fill="${lin(GREY, "d")}"/></g>
<g ${B}><path d="M24 44 C34 40 54 42 56 56 C58 70 46 80 38 74 C32 68 36 56 30 52Z" fill="${lin(["#DCE1EA", "#B0B9CB", "#8892AC"], "d")}"/></g>
<g ${Bs}><path d="M20 60 C14 62 10 68 14 72 C18 70 22 66 24 62Z" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(24, 40, 0.8)}`;

const mammoth = ({ lin }) => `
<g ${B}>${legs([40, 52, 68, 80], 66, 90, 10, lin([C.woodD, C.woodDD]), 4)}</g>
<g ${B}><path d="M34 52 C34 32 46 20 62 22 C80 22 90 36 88 54 C88 70 82 76 72 74 L60 76 L44 76 C38 72 34 64 34 52Z" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><path d="M24 22 C36 14 50 18 54 32 C58 44 40 50 26 46 C14 42 14 28 24 22Z" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><path d="M34 40 C40 52 36 70 30 78 C24 82 20 76 24 70 C26 62 24 54 22 46Z" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><path d="M24 50 C12 50 8 64 16 74 C24 82 34 78 38 70 C32 72 24 70 22 62 C20 56 22 52 24 50Z" fill="${lin([C.paper, C.creamD, "#A89870"], "d")}"/></g>
${eye(24, 33, 0.8)}`;

// ---------- rhino, hippo
const rhino = ({ lin }) => `
<path d="M90 50 C94 56 92 62 90 66" fill="none" stroke="${C.metalD}" stroke-width="3" stroke-linecap="round"/>
<g ${B}>${legs([30, 42, 66, 78], 64, 90, 10, lin([GREY[1], GREY[2]]), 4)}</g>
<g ${B}><path d="M30 46 C30 30 50 24 66 28 C84 30 92 42 90 58 C88 72 76 76 60 76 C44 76 30 70 30 46Z" fill="${lin(GREY, "d")}"/></g>
<g ${B}><path d="M10 52 C10 38 24 28 40 30 C50 32 52 46 48 58 C44 66 30 68 20 64 C12 62 10 58 10 52Z" fill="${lin(GREY, "d")}"/></g>
<g ${B}><path d="M14 48 L22 28 L28 36Z" fill="${lin([C.paper, C.creamD, "#A89870"], "d")}"/><path d="M36 30 L44 22 L48 34Z" fill="${lin(GREY, "d")}"/></g>
${eye(34, 44, 0.8)}<ellipse cx="14" cy="56" rx="1.8" ry="2.4" fill="${C.darkD}"/>`;

const hippo = ({ lin }) => `
<g ${B}>${legs([28, 40, 66, 78], 66, 90, 11, lin(["#9A92B8", "#756C97"]), 4)}</g>
<path d="M90 54 C93 58 92 62 91 64" fill="none" stroke="#756C97" stroke-width="3" stroke-linecap="round"/>
<g ${B}><ellipse cx="62" cy="58" rx="29" ry="21" fill="${lin(["#C7BEE0", "#9A92B8", "#756C97"], "d")}"/></g>
<g ${B}><path d="M6 56 C6 40 18 32 32 32 C46 32 54 42 54 56 C54 70 46 76 30 76 C14 76 6 70 6 56Z" fill="${lin(["#C7BEE0", "#9A92B8", "#756C97"], "d")}"/></g>
<g ${B}><circle cx="42" cy="30" r="6" fill="${lin(["#C7BEE0", "#756C97"])}"/><circle cx="30" cy="30" r="5" fill="${lin(["#C7BEE0", "#756C97"])}"/></g>
<g ${Bs}><path d="M8 60 C8 68 20 72 30 72 C40 72 50 68 52 60 C40 64 20 64 8 60Z" fill="${lin([C.pink, C.pinkD])}"/></g>
<ellipse cx="15" cy="49" rx="1.8" ry="2.4" fill="${C.darkD}"/><ellipse cx="22" cy="48" rx="1.8" ry="2.4" fill="${C.darkD}"/>
${eye(36, 42, 0.8)}`;

// ---------- mice / rats
const mouseFace = ({ lin }) => `
<g ${B}><circle cx="20" cy="26" r="17" fill="${lin(GREY, "d")}"/><circle cx="80" cy="26" r="17" fill="${lin(GREY, "d")}"/></g>
<circle cx="20" cy="26" r="9.5" fill="${C.pink}"/><circle cx="80" cy="26" r="9.5" fill="${C.pink}"/>
<g ${B}><path d="M50 90 C26 90 12 74 12 56 C12 40 28 30 50 30 C72 30 88 40 88 56 C88 74 74 90 50 90Z" fill="${lin(GREY, "d")}"/></g>
<g ${Bs}><ellipse cx="50" cy="72" rx="9" ry="7" fill="${lin([C.paper, C.creamD])}"/></g>
<ellipse cx="50" cy="66" rx="4.4" ry="3.4" fill="${C.pinkD}"/>
<path d="M50 70 V74 M44 77 Q50 80 56 77" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>
${eye(34, 54)}${eye(66, 54)}${cheek(24, 68, 5)}${cheek(76, 68, 5)}`;

const mouseSide = (rat) => ({ lin }) => {
  const P = rat ? SLATE : GREY;
  const k = rat ? 1.12 : 1;
  return `
<path d="M80 66 C96 66 98 50 92 40 C90 34 84 30 80 32" fill="none" stroke="${C.pinkD}" stroke-width="${rat ? 3 : 2.4}" stroke-linecap="round"/>
<g ${B}>${legs([36, 62], 74, 86, 8, lin([P[1], P[2]]))}</g>
<g ${B}><path d="M20 66 C20 46 40 34 58 36 C78 38 86 52 82 66 C80 76 70 80 56 80 C38 80 20 78 20 66Z" fill="${lin(P, "d")}"/></g>
<g ${B}><path d="M10 68 C14 58 22 50 32 46 C44 44 50 54 46 64 C42 72 22 76 12 72Z" fill="${lin(P, "d")}"/></g>
<g ${B}><circle cx="42" cy="38" r="${11 * k}" fill="${lin(P, "d")}"/></g><circle cx="42" cy="38" r="${6 * k}" fill="${C.pink}"/>
<circle cx="9" cy="68" r="2.8" fill="${C.pinkD}"/>
${eye(27, 56, 0.75)}`;
};

// ---------- hamster, rabbits
const hamster = ({ lin }) => `
<g ${B}><circle cx="22" cy="24" r="13" fill="${lin(ORANGE, "d")}"/><circle cx="78" cy="24" r="13" fill="${lin(ORANGE, "d")}"/></g>
<circle cx="22" cy="25" r="6.5" fill="${C.pink}"/><circle cx="78" cy="25" r="6.5" fill="${C.pink}"/>
<g ${B}><path d="M50 90 C24 90 8 76 8 58 C8 40 26 28 50 28 C74 28 92 40 92 58 C92 76 76 90 50 90Z" fill="${lin(ORANGE, "d")}"/></g>
<g ${Bs}><path d="M30 76 C24 64 36 56 50 62 C64 56 76 64 70 76 C64 88 36 88 30 76Z" fill="${lin([C.paper, C.cream, C.creamD], "d")}"/></g>
<ellipse cx="50" cy="60" rx="4" ry="3" fill="${C.pinkD}"/>
<path d="M50 63 V68 M44 71 Q50 75 56 71" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>
<g ${Bs}><rect x="46" y="70" width="3.6" height="5" rx="1.2" fill="${C.paper}"/><rect x="50.4" y="70" width="3.6" height="5" rx="1.2" fill="${C.paper}"/></g>
${eye(32, 52, 0.95)}${eye(68, 52, 0.95)}${cheek(20, 64, 5)}${cheek(80, 64, 5)}`;

const rabbitFace = ({ lin }) => `
<g ${B}><path d="M24 40 C14 20 22 4 32 4 C42 4 44 24 42 38Z M76 40 C86 20 78 4 68 4 C58 4 56 24 58 38Z" fill="${lin(WHITE, "d")}"/></g>
<path d="M29 34 C22 20 26 10 31 10 C36 10 37 22 36 33Z M71 34 C78 20 74 10 69 10 C64 10 63 22 64 33Z" fill="${C.pink}"/>
<g ${B}><path d="M50 92 C26 92 10 78 10 62 C10 46 26 36 50 36 C74 36 90 46 90 62 C90 78 74 92 50 92Z" fill="${lin(WHITE, "d")}"/></g>
<ellipse cx="50" cy="64" rx="4" ry="3" fill="${C.pinkD}"/>
<path d="M50 67 V72 M43 75 Q50 79 57 75" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>
<g ${Bs}><rect x="46" y="74" width="3.6" height="6" rx="1.2" fill="${C.paper}"/><rect x="50.4" y="74" width="3.6" height="6" rx="1.2" fill="${C.paper}"/></g>
${eye(33, 56)}${eye(67, 56)}${cheek(22, 68, 5)}${cheek(78, 68, 5)}`;

const rabbit = ({ lin }) => `
<g ${B}><circle cx="86" cy="64" r="8" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${B}><path d="M30 80 C20 60 34 36 56 36 C78 36 90 52 86 70 C84 82 70 86 56 86 C44 86 34 86 30 80Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M30 86 C24 78 40 74 56 76 L56 88 C44 90 34 90 30 86Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><path d="M30 34 C22 14 28 2 34 4 C42 6 44 22 42 34Z M44 32 C42 14 50 4 56 8 C60 14 54 28 52 34Z" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><circle cx="30" cy="48" r="17" fill="${lin(WHITE, "d")}"/></g>
<path d="M33 30 C28 18 32 10 34 12 C37 16 38 24 38 30Z" fill="${C.pink}"/>
<ellipse cx="14" cy="53" rx="2.6" ry="2" fill="${C.pinkD}"/>
${eye(25, 44, 0.8)}${cheek(30, 56, 4)}`;

// ---------- chipmunk, beaver, hedgehog
const chipmunk = ({ lin }) => `
<g ${B}><path d="M74 78 C58 78 62 52 74 44 C86 36 82 16 70 12 C82 8 96 22 92 42 C90 58 84 66 80 76Z" fill="${lin(ORANGE, "d")}"/></g>
<path d="M82 34 C86 28 84 20 76 16" fill="none" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
<g ${B}>${legs([40, 58], 76, 90, 9, lin([C.orange, C.orangeD]))}</g>
<g ${B}><path d="M26 66 C26 48 40 38 58 40 C76 42 80 58 76 72 C72 84 54 84 42 82 C30 80 26 76 26 66Z" fill="${lin(ORANGE, "d")}"/></g>
<path d="M36 46 C46 40 58 42 66 48 M32 56 C44 50 58 52 70 58" fill="none" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round" opacity=".75"/>
<g ${B}><path d="M30 52 C30 40 36 34 40 28 C44 24 48 28 46 34Z" fill="${lin(ORANGE, "d")}"/></g>
<g ${B}><circle cx="24" cy="48" r="16" fill="${lin(["#FBD6A6", C.orange, C.orangeD], "d")}"/></g>
<g ${Bs}><ellipse cx="14" cy="56" rx="9" ry="7" fill="${lin([C.paper, C.creamD])}"/></g>
<ellipse cx="7" cy="53" rx="2.2" ry="1.8" fill="${C.darkD}"/>
${eye(22, 42, 0.8)}`;

const beaver = ({ lin }) => `
<g ${B}><path d="M70 74 C84 66 98 70 96 82 C94 92 78 92 68 86Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<path d="M76 78 L88 78 M76 83 L88 84" stroke="${C.woodDD}" stroke-width="1.4" opacity=".6"/>
<g ${B}>${legs([38, 52], 76, 90, 10, lin([C.woodD, C.woodDD]))}</g>
<g ${B}><path d="M22 68 C22 46 38 34 56 36 C76 38 84 56 80 72 C76 84 58 86 44 84 C30 82 22 78 22 68Z" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><path d="M30 44 C28 34 34 26 42 26 C52 26 56 38 52 48Z" fill="${lin(DBROWN, "d")}"/><circle cx="46" cy="30" r="5" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><circle cx="26" cy="52" r="18" fill="${lin(BROWN, "d")}"/></g>
<ellipse cx="13" cy="56" rx="6" ry="4.5" fill="${C.darkD}"/>
<g ${Bs}><rect x="14" y="60" width="5" height="9" rx="1.6" fill="${C.paper}"/><rect x="19.6" y="60" width="5" height="9" rx="1.6" fill="${C.paper}"/></g>
${eye(28, 46, 0.8)}`;

const hedgehog = ({ lin }) => {
  const sp = Array.from({ length: 11 }, (_, i) => {
    const a = (-0.2 + (i / 10) * 1.2) * Math.PI;
    const x = 56 - Math.cos(a) * 36, y = 62 - Math.sin(a) * 40;
    return `<path d="M${(56 + Math.cos(a + 0.12) * 32 * -1).toFixed(1)} ${(62 - Math.sin(a + 0.12) * 32).toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}" stroke="${C.darkD}" stroke-width="0"/>`;
  }).join("");
  const sg = lin(["#8B96B8", C.dark, C.darkD], "d");
  const spikes = Array.from({ length: 12 }, (_, i) => {
    const a = Math.PI * (0.02 + (i / 11) * 0.98);
    const cx = 56, cy = 64;
    const p = (r, d) => `${(cx + Math.cos(a + d) * -r).toFixed(1)},${(cy - Math.sin(a + d) * r * 0.95).toFixed(1)}`;
    return `${p(30, -0.17)} ${p(40, 0)} ${p(30, 0.17)}`;
  });
  return `
<g ${B}>${legs([34, 62], 76, 90, 9, lin([C.woodL, C.wood]))}</g>
<g ${B}>${spikes.map((s) => `<polygon points="${s}" fill="${sg}"/>`).join("")}<path d="M24 66 C22 44 40 30 60 32 C80 34 92 50 88 66 C86 78 70 80 56 80 C40 80 26 78 24 66Z" fill="${sg}"/></g>
<g ${B}><path d="M6 68 C10 58 22 46 40 50 C58 56 56 74 46 80 C32 84 12 80 6 68Z" fill="${lin(["#F1D3A0", "#DDB57A", "#BC8D54"], "d")}"/></g>
<circle cx="7" cy="68" r="3" fill="${C.darkD}"/>
<g ${B}><circle cx="44" cy="52" r="6" fill="${lin(["#F1D3A0", "#BC8D54"])}"/></g>
${eye(28, 62, 0.75)}`;
};

// ---------- bat
const bat = ({ lin }) => `
<g ${B}><path d="M50 40 C42 24 22 18 4 26 C12 34 12 46 8 58 C18 52 24 56 28 68 C34 58 44 60 50 74Z M50 40 C58 24 78 18 96 26 C88 34 88 46 92 58 C82 52 76 56 72 68 C66 58 56 60 50 74Z" fill="${lin(SLATE, "d")}"/></g>
<path d="M50 44 L20 36 M50 50 L14 50 M50 58 L26 62 M50 44 L80 36 M50 50 L86 50 M50 58 L74 62" stroke="${C.navyD}" stroke-width="1.4" opacity=".5"/>
<g ${B}><path d="M36 30 L38 10 L48 22Z M64 30 L62 10 L52 22Z" fill="${lin(SLATE, "d")}"/></g>
<g ${B}><ellipse cx="50" cy="46" rx="14" ry="19" fill="${lin(["#A5AFCD", "#6E7AA0", "#4F5A80"], "d")}"/></g>
<g ${B}><circle cx="50" cy="36" r="13" fill="${lin(["#A5AFCD", "#6E7AA0", "#4F5A80"], "d")}"/></g>
${eye(44, 36, 0.6)}${eye(56, 36, 0.6)}
<g ${Bs}><path d="M46 44 L47 49 L49 44Z M51 44 L53 49 L54 44Z" fill="${C.paper}"/></g>`;

// ---------- bears
const bearFace = (P, earIn, muz, nose, k?) => ({ lin }) => `
<g ${B}><circle cx="20" cy="22" r="14" fill="${lin(P, "d")}"/><circle cx="80" cy="22" r="14" fill="${lin(P, "d")}"/></g>
<circle cx="20" cy="23" r="7" fill="${earIn}"/><circle cx="80" cy="23" r="7" fill="${earIn}"/>
<g ${B}><circle cx="50" cy="54" r="38" fill="${lin(P, "d")}"/></g>
<g ${Bs}><ellipse cx="50" cy="66" rx="17" ry="14" fill="${lin(muz, "d")}"/></g>
<ellipse cx="50" cy="60" rx="7" ry="5" fill="${nose}"/>
<path d="M50 64 V70 M42 73 Q50 78 58 73" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>
${eye(33, 48)}${eye(67, 48)}${cheek(22, 62, 5)}${cheek(78, 62, 5)}`;

const koala = ({ lin }) => `
<g ${B}><circle cx="20" cy="36" r="16" fill="${lin(GREY, "d")}"/><circle cx="80" cy="36" r="16" fill="${lin(GREY, "d")}"/></g>
<circle cx="20" cy="37" r="9" fill="${C.paper}"/><circle cx="80" cy="37" r="9" fill="${C.paper}"/>
<g ${B}><ellipse cx="50" cy="56" rx="34" ry="35" fill="${lin(GREY, "d")}"/></g>
<g ${B}><ellipse cx="50" cy="60" rx="9" ry="14" fill="${lin([C.dark, C.darkD])}"/></g>
<ellipse cx="46" cy="54" rx="2" ry="3" fill="#fff" opacity=".3"/>
${eye(32, 50, 0.85)}${eye(68, 50, 0.85)}${cheek(24, 68, 5)}${cheek(76, 68, 5)}`;

const panda = ({ lin }) => `
<g ${B}><circle cx="20" cy="22" r="14" fill="${lin([C.dark, C.darkD], "d")}"/><circle cx="80" cy="22" r="14" fill="${lin([C.dark, C.darkD], "d")}"/></g>
<g ${B}><circle cx="50" cy="54" r="38" fill="${lin(WHITE, "d")}"/></g>
<g ${B}><ellipse cx="33" cy="50" rx="10.5" ry="13" transform="rotate(25 33 50)" fill="${lin(["#6E6068", C.dark, C.darkD], "d")}"/><ellipse cx="67" cy="50" rx="10.5" ry="13" transform="rotate(-25 67 50)" fill="${lin(["#6E6068", C.dark, C.darkD], "d")}"/></g>
${eye(33, 50, 0.9)}${eye(67, 50, 0.9)}
<ellipse cx="50" cy="63" rx="5.5" ry="4" fill="${C.darkD}"/>
<path d="M50 67 V72 M43 75 Q50 80 57 75" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>
${cheek(20, 68, 5)}${cheek(80, 68, 5)}`;

// ---------- sloth
const sloth = ({ lin }) => `
<g ${B}><path d="M4 18 H96 V26 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}><path d="M24 26 C18 40 18 50 24 62 L34 58 C30 48 32 40 36 30Z M76 26 C82 40 82 50 76 62 L66 58 C70 48 68 40 64 30Z" fill="${lin(BROWN, "d")}"/></g>
<g ${B}><ellipse cx="50" cy="72" rx="28" ry="18" fill="${lin(BROWN, "d")}"/></g>
<g ${B}><circle cx="50" cy="54" r="26" fill="${lin(["#F1DDBC", "#D8BB8C", "#B89462"], "d")}"/></g>
<g ${Bs}><ellipse cx="36" cy="52" rx="8.5" ry="11" transform="rotate(20 36 52)" fill="${lin([C.woodD, C.woodDD])}"/><ellipse cx="64" cy="52" rx="8.5" ry="11" transform="rotate(-20 64 52)" fill="${lin([C.woodD, C.woodDD])}"/></g>
${eye(36, 52, 0.75)}${eye(64, 52, 0.75)}
<ellipse cx="50" cy="60" rx="4.4" ry="3.2" fill="${C.darkD}"/><path d="M42 67 Q50 72 58 67" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>
<g ${Bs}><rect x="14" y="20" width="6" height="12" rx="3" fill="${lin([C.woodL, C.wood])}" opacity="0"/></g>`;

// ---------- otter
const otter = ({ lin }) => `
<path d="M80 74 C94 76 98 64 94 54" fill="none" stroke="${C.woodD}" stroke-width="7" stroke-linecap="round"/>
<g ${B}>${legs([34, 46], 74, 90, 9, lin([C.woodD, C.woodDD]))}</g>
<g ${B}><path d="M22 70 C22 46 40 32 60 36 C80 40 90 56 82 72 C76 82 56 84 42 82 C30 80 22 78 22 70Z" fill="${lin(DBROWN, "d")}"/></g>
<g ${Bs}><path d="M22 70 C24 62 34 58 44 62 C46 74 38 82 30 80 C24 78 22 74 22 70Z" fill="${lin(["#F1D3A0", "#D8B07A"], "d")}"/></g>
<g ${B}><circle cx="42" cy="30" r="6" fill="${lin(DBROWN, "d")}"/></g>
<g ${B}><ellipse cx="28" cy="44" rx="20" ry="17" fill="${lin(BROWN, "d")}"/></g>
<g ${Bs}><ellipse cx="16" cy="52" rx="10" ry="8" fill="${lin(["#F6E2BE", "#DDB57A"], "d")}"/></g>
<ellipse cx="8" cy="49" rx="3" ry="2.4" fill="${C.darkD}"/>
<path d="M13 56 H22" stroke="${C.darkD}" stroke-width="1.4" stroke-linecap="round"/>
${eye(25, 38, 0.8)}`;

// ---------- skunk
const skunk = ({ lin }) => `
<g ${B}><path d="M80 70 C64 70 58 50 70 36 C80 24 74 10 62 8 C84 2 98 22 94 44 C92 60 88 66 84 72Z" fill="${lin(SLATE, "d")}"/></g>
<path d="M78 16 C88 22 90 40 84 56" fill="none" stroke="${C.paper}" stroke-width="6" stroke-linecap="round"/>
<g ${B}>${legs([34, 48], 76, 90, 9, lin([C.dark, C.darkD]))}</g>
<g ${B}><path d="M22 68 C22 50 38 40 58 42 C78 44 84 58 80 72 C76 82 56 84 42 82 C30 80 22 78 22 68Z" fill="${lin(SLATE, "d")}"/></g>
<path d="M30 46 C44 40 64 44 78 54" fill="none" stroke="${C.paper}" stroke-width="6" stroke-linecap="round"/>
<g ${B}><circle cx="34" cy="40" r="6" fill="${lin(SLATE, "d")}"/></g>
<g ${B}><circle cx="26" cy="52" r="17" fill="${lin(SLATE, "d")}"/></g>
<path d="M24 36 C26 32 30 36 28 38" fill="none"/>
<path d="M26 38 L26 54" stroke="${C.paper}" stroke-width="5" stroke-linecap="round"/>
<g ${Bs}><ellipse cx="13" cy="58" rx="7" ry="6" fill="${lin([C.creamD, "#A89870"], "d")}" opacity="0"/></g>
<ellipse cx="11" cy="58" rx="3" ry="2.4" fill="${C.pinkD}"/>
${eye(20, 51, 0.75)}`;

// ---------- kangaroo
const kangaroo = ({ lin }) => `
<g ${B}><path d="M58 66 C78 68 92 80 96 90 L56 90Z" fill="${lin(BROWN, "d")}"/></g>
<g ${B}><path d="M46 30 C64 30 78 50 72 72 C70 84 52 90 42 84 C34 74 34 50 46 30Z" fill="${lin(BROWN, "d")}"/></g>
<g ${B}><ellipse cx="38" cy="88" rx="18" ry="4.6" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g ${B}><ellipse cx="52" cy="76" rx="15" ry="11" fill="${lin(BROWN, "d")}"/></g>
<g ${Bs}><path d="M40 58 C48 54 58 60 58 70 L44 72 C40 68 38 62 40 58Z" fill="${lin(["#F6E2BE", "#DDB57A"], "d")}"/></g>
<g ${B}><ellipse cx="46" cy="14" rx="4" ry="11" transform="rotate(25 46 14)" fill="${lin(BROWN, "d")}"/></g>
<g ${B}><circle cx="34" cy="30" r="14" fill="${lin(["#F1D3A0", "#DDB57A", "#BC8D54"], "d")}"/></g>
<g ${B}><ellipse cx="22" cy="36" rx="10" ry="7" fill="${lin(["#F6E2BE", "#DDB57A", "#BC8D54"], "d")}"/></g>
<ellipse cx="13" cy="35" rx="3" ry="2.4" fill="${C.darkD}"/>
<g ${Bs}><ellipse cx="32" cy="52" rx="4.5" ry="8" transform="rotate(20 32 52)" fill="${lin(BROWN, "d")}"/></g>
${eye(30, 27, 0.75)}`;

const defs: [string, string, any][] = [
  ["1f437", "pig face", pigFace],
  ["1f416", "pig", pigSide],
  ["1f417", "boar", boar],
  ["1f43d", "pig nose", pigNose],
  ["1f40f", "ram", ram],
  ["1f411", "ewe", ewe],
  ["1f410", "goat", goat],
  ["1f42a", "camel", camel],
  ["1f42b", "two hump camel", camel2],
  ["1f999", "llama", llama],
  ["1f992", "giraffe", giraffe],
  ["1f418", "elephant", elephant],
  ["1f9a3", "mammoth", mammoth],
  ["1f98f", "rhinoceros", rhino],
  ["1f99b", "hippopotamus", hippo],
  ["1f42d", "mouse face", mouseFace],
  ["1f401", "mouse", mouseSide(false)],
  ["1f400", "rat", mouseSide(true)],
  ["1f439", "hamster", hamster],
  ["1f430", "rabbit face", rabbitFace],
  ["1f407", "rabbit", rabbit],
  ["1f43f-fe0f", "chipmunk", chipmunk],
  ["1f9ab", "beaver", beaver],
  ["1f994", "hedgehog", hedgehog],
  ["1f987", "bat", bat],
  ["1f43b", "bear", bearFace(BROWN, C.woodL, [C.paper, "#EDD9B2", C.creamD], C.darkD)],
  ["1f43b-200d-2744-fe0f", "polar bear", bearFace(WHITE, C.pink, [C.paper, C.paper, C.paperD], C.darkD)],
  ["1f428", "koala", koala],
  ["1f43c", "panda", panda],
  ["1f9a5", "sloth", sloth],
  ["1f9a6", "otter", otter],
  ["1f9a8", "skunk", skunk],
  ["1f998", "kangaroo", kangaroo],
];

const FIT: Record<string, number[]> = {
  "1f411": [52, 57], "1f410": [59.5, 50], "1f992": [56, 45, 0.93], "1f418": [52, 59], "1f98f": [52, 56],
  "1f99b": [50, 57], "1f401": [51.5, 56.5], "1f400": [51.5, 56], "1f9ab": [52, 58], "1f994": [52, 57],
  "1f987": [50, 42], "1f428": [50, 56], "1f9a6": [52, 57, 0.95],
};
const __batch: Icon[] = defs.map(([u, n, draw]) => {
  const f = FIT[u];
  if (!f) return { u, n, draw };
  const [cx, cy, k = 1] = f;
  return { u, n, draw: (t) => `<g transform="translate(50 50) scale(${k}) translate(${-cx} ${-cy})">${draw(t)}</g>` };
});

export default __batch;
