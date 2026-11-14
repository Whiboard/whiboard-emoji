// Plants, flowers, leaves, nests, mushroom.
import { B, Bs, C } from "../kit.mjs";

const f1 = (n) => +n.toFixed(1);
const petals = (n, cx, cy, len, w, fill, rot = 0) =>
  Array.from({ length: n }, (_, i) => `<ellipse cx="0" cy="${f1(-len / 2)}" rx="${w}" ry="${f1(len / 2)}" transform="translate(${cx} ${cy}) rotate(${f1(rot + (i * 360) / n)})" fill="${fill}"/>`).join("");
const leaf = (x, y, len, w, ang, fill) =>
  `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" d="M0 0 C${-w} ${f1(-len * 0.25)} ${-w} ${f1(-len * 0.75)} 0 ${-len} C${w} ${f1(-len * 0.75)} ${w} ${f1(-len * 0.25)} 0 0Z" fill="${fill}"/>`;
const vein = (x, y, len, ang, col = C.greenD) =>
  `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" d="M0 -2 V${f1(-len * 0.82)}" stroke="${col}" stroke-width="1.1" opacity=".5" stroke-linecap="round" fill="none"/>`;
const gl = (lin) => lin([C.green, C.greenM, C.greenD], "d");
const bez = (p, t) => {
  const u = 1 - t;
  const x = u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6];
  const y = u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7];
  const dx = 3 * u * u * (p[2] - p[0]) + 6 * u * t * (p[4] - p[2]) + 3 * t * t * (p[6] - p[4]);
  const dy = 3 * u * u * (p[3] - p[1]) + 6 * u * t * (p[5] - p[3]) + 3 * t * t * (p[7] - p[5]);
  return [x, y, (Math.atan2(dx, -dy) * 180) / Math.PI];
};
const HEART = "M0 0 C-18 -6 -20 -26 -9 -28 C-4 -29 0 -25 0 -22 C0 -25 4 -29 9 -28 C20 -26 18 -6 0 0Z";
const OAK = "M0 -36 C7 -36 8 -28 13 -27 C21 -28 22 -19 17 -14 C25 -11 24 0 15 2 C21 8 16 17 8 17 C7 24 4 30 1 36 L-1 36 C-4 30 -7 24 -8 17 C-16 17 -21 8 -15 2 C-24 0 -25 -11 -17 -14 C-22 -19 -21 -28 -13 -27 C-8 -28 -7 -36 0 -36Z";

const flower = (cx, cy, n, len, w, g, cg, rot = 0) =>
  `<g ${B}>${petals(n, cx, cy, len, w, g, rot)}</g><g ${Bs}><circle cx="${cx}" cy="${cy}" r="${f1(len * 0.22)}" fill="${cg}"/></g>`;

const nest = (lin, eggs) => {
  const tw = [
    "M14 52 C30 62 70 62 86 52", "M12 62 C30 74 70 74 88 62", "M18 72 C34 83 66 83 82 72", "M30 82 C42 89 58 89 70 82",
    "M20 50 C26 68 30 80 38 88", "M50 58 C48 70 50 80 52 90", "M80 50 C74 68 70 80 62 88", "M34 54 C40 66 38 78 44 88", "M66 54 C60 66 62 78 56 88",
  ];
  const out = "M10 40 L2 34 M20 36 L12 28 M80 36 L88 28 M90 42 L98 38";
  const egg = (x, y, r, c) =>
    `<ellipse cx="${x}" cy="${y}" rx="9.5" ry="11.5" transform="rotate(${r} ${x} ${y})" fill="${c}"/>`;
  const e = eggs
    ? `<g ${B}>${egg(34, 40, -14, lin(["#E4F2F6", "#A9D0DE"], "d"))}${egg(66, 41, 14, lin(["#E4F2F6", "#A9D0DE"], "d"))}${egg(50, 36, 0, lin([C.paper, "#BFE0E8"], "d"))}</g>
<g fill="#7A8FB0" opacity=".6"><circle cx="31" cy="42" r="1.3"/><circle cx="38" cy="36" r="1"/><circle cx="68" cy="43" r="1.3"/><circle cx="62" cy="37" r="1"/><circle cx="48" cy="40" r="1.2"/><circle cx="54" cy="32" r="1"/></g>`
    : "";
  return `<g ${B}><ellipse cx="50" cy="46" rx="41" ry="14" fill="${lin([C.woodDD, C.woodD])}"/></g>
<g stroke="${C.woodD}" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="${out}"/></g>${e}
<g ${B}><path d="M9 46 C9 76 30 91 50 91 C70 91 91 76 91 46 C80 58 20 58 9 46Z" fill="${lin([C.wood, C.woodD], "d")}"/></g>
<g stroke="${C.woodDD}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".75"><path d="${tw.slice(0, 4).join(" ")}"/></g>
<g stroke="${C.woodL}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".7"><path d="${tw.slice(4).join(" ")}"/></g>`;
};

const icons = [
  { u: "1f490", n: "bouquet", draw: ({ lin }) => {
    const g1 = lin(["#FFE0E8", C.pink, C.pinkD]), g2 = lin(["#FFF0A8", C.yellow, C.yellowD]), g3 = lin(["#D6E4FA", C.blue, C.blueM]);
    return `<g ${Bs}><path d="M50 74 C44 56 34 46 30 36 M50 74 C50 52 52 40 54 26 M50 74 C58 56 68 48 74 40" stroke="${C.greenM}" stroke-width="3.4" fill="none" stroke-linecap="round"/>${leaf(36, 68, 26, 7, -62, gl(lin))}${leaf(64, 68, 26, 7, 62, gl(lin))}</g>
${flower(30, 32, 5, 19, 7.5, g1, lin([C.gold, C.goldD]), 10)}${flower(74, 38, 5, 18, 7, g3, lin([C.gold, C.goldD]), 30)}${flower(54, 22, 6, 18, 6.5, g2, lin([C.orange, C.orangeD]))}
<g ${B}><path d="M50 95 L14 52 C32 44 68 44 86 52Z" fill="${lin([C.paper, C.paperD], "d")}"/></g>
<path d="M50 94 L34 49 M50 94 L66 49" stroke="${C.paperD}" stroke-width="1.4" opacity=".9" fill="none"/>
<g ${Bs}><ellipse cx="41" cy="66" rx="9.5" ry="5.5" transform="rotate(-24 41 66)" fill="${lin([C.red, C.redD])}"/><ellipse cx="59" cy="66" rx="9.5" ry="5.5" transform="rotate(24 59 66)" fill="${lin([C.red, C.redD])}"/><path d="M47 69 L38 84 H45 L50 72Z M53 69 L62 84 H55 L50 72Z" fill="${C.redM}"/><circle cx="50" cy="67" r="4.4" fill="${lin([C.red, C.redD])}"/></g>`;
  } },

  { u: "1f338", n: "cherry blossom", draw: ({ lin }) => {
    const P = "M0 -4 C-18 -12 -20 -38 -7 -43 L0 -37 L7 -43 C20 -38 18 -12 0 -4Z";
    const g = lin(["#FFE8EE", C.pink, C.pinkD]);
    const ps = [0, 1, 2, 3, 4].map((i) => `<path d="${P}" transform="translate(50 52) rotate(${i * 72})" fill="${g}"/>`).join("");
    const st = [0, 1, 2, 3, 4, 5, 6].map((i) => { const a = (i * 51 + 10) * Math.PI / 180; return [50 + 13 * Math.sin(a), 52 - 13 * Math.cos(a)]; });
    return `<g ${B}>${ps}</g>
<path d="${st.map((p) => `M50 52 L${f1(p[0])} ${f1(p[1])}`).join(" ")}" stroke="${C.pinkD}" stroke-width="1.5" opacity=".9" fill="none"/>
<g ${Bs}><circle cx="50" cy="52" r="5" fill="${lin([C.gold, C.goldD])}"/>${st.map((p) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.2" fill="${C.redM}"/>`).join("")}</g>`;
  } },

  { u: "1f4ae", n: "white flower", draw: ({ lin, rad }) => {
    const g = rad(["#FFFFFF", C.paper, "#D6C69E"], 0.4, 0.3, 0.9);
    const ps = [0, 1, 2, 3, 4].map((i) => { const a = i * 72 * Math.PI / 180; return `<circle cx="${f1(50 + 23 * Math.sin(a))}" cy="${f1(50 - 23 * Math.cos(a))}" r="19" fill="${g}"/>`; }).join("");
    const ln = [0, 1, 2, 3, 4].map((i) => `M50 50 L${f1(50 + 30 * Math.sin(i * 1.2566))} ${f1(50 - 30 * Math.cos(i * 1.2566))}`).join(" ");
    return `<g ${B}>${ps}</g><path d="${ln}" stroke="#C9B88E" stroke-width="1.6" opacity=".7" stroke-linecap="round" fill="none"/>
<g ${B}><circle cx="50" cy="50" r="10" fill="${lin([C.yellow, C.goldM, C.goldD], "d")}"/></g>`;
  } },

  { u: "1fab7", n: "lotus", draw: ({ lin }) => {
    const P = "M0 0 C-15 -12 -16 -36 0 -52 C16 -36 15 -12 0 0Z";
    const g = lin(["#FFE3EA", C.pink, C.pinkD]), g2 = lin(["#FFF0F3", "#F8C7D3", C.pink]);
    const p = (a, s, gg) => `<path d="${P}" transform="translate(50 78) rotate(${a}) scale(${s})" fill="${gg}"/>`;
    return `<g ${B}><ellipse cx="50" cy="85" rx="42" ry="9" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${B}>${p(-62, 0.82, g)}${p(62, 0.82, g)}${p(-32, 0.95, g)}${p(32, 0.95, g)}</g>
<g ${B}>${p(0, 1, g2)}</g><path d="M50 78 V40" stroke="${C.pinkD}" stroke-width="1.2" opacity=".5"/>`;
  } },

  { u: "1f3f5-fe0f", n: "rosette", draw: ({ lin }) => {
    const sc = Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<circle cx="${f1(50 + 33 * Math.sin(a))}" cy="${f1(50 - 33 * Math.cos(a))}" r="12.5" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/>`; }).join("");
    return `<g ${B}>${sc}</g><g ${B}><circle cx="50" cy="50" r="27" fill="${lin([C.orange, C.orangeD], "d")}"/></g>
<g ${B}><circle cx="50" cy="50" r="19" fill="${lin([C.yellow, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="50" cy="50" r="9" fill="${lin([C.red, C.redD], "d")}"/></g>`;
  } },

  { u: "1f339", n: "rose", draw: ({ lin }) => `<g ${Bs}><path d="M50 56 C50 70 52 82 50 95" stroke="${C.greenM}" stroke-width="5" fill="none" stroke-linecap="round"/>${leaf(51, 80, 28, 8, 62, gl(lin))}${leaf(50, 72, 24, 7, -60, gl(lin))}</g>
<g ${B}><path d="M20 34 C20 10 80 10 80 34 C80 54 64 64 50 64 C36 64 20 54 20 34Z" fill="${lin(["#F28076", C.redM, C.redD], "d")}"/></g>
<g ${Bs}><path d="M30 28 C34 14 66 14 70 28 C66 40 56 46 50 46 C44 46 34 40 30 28Z" fill="${lin([C.red, C.redD], "d")}"/></g>
<path d="M38 30 C42 22 58 22 60 31 C61 40 46 42 44 34 C43 29 50 28 52 32" stroke="#7D1F1F" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
<path d="M26 34 C26 48 38 58 50 60" stroke="#fff" stroke-width="2" opacity=".25" fill="none" stroke-linecap="round"/>
<g ${Bs}><path d="M38 62 C42 70 58 70 62 62 C56 66 44 66 38 62Z" fill="${C.greenD}"/></g>` },

  { u: "1f940", n: "wilted flower", draw: ({ lin }) => `<g ${Bs}><path d="M62 95 C62 56 68 22 46 20 C36 20 30 28 30 40" stroke="#8D9A62" stroke-width="4.6" fill="none" stroke-linecap="round"/>${leaf(63, 78, 28, 8, 62, lin(["#B5BE86", "#8D9A62", "#6A7646"], "d"))}${leaf(63, 62, 22, 7, -62, lin(["#B5BE86", "#8D9A62", "#6A7646"], "d"))}</g>
<g ${B}><path d="M12 42 C12 36 48 36 48 42 C50 60 40 74 30 76 C20 74 10 60 12 42Z" fill="${lin(["#C97F88", "#A5535F", "#753744"], "d")}"/></g>
<path d="M22 46 C24 56 28 64 30 70 M38 46 C36 56 34 62 30 70" stroke="#5E2A36" stroke-width="1.6" fill="none" opacity=".55" stroke-linecap="round"/>
<g ${Bs}><ellipse cx="76" cy="88" rx="8" ry="4.6" transform="rotate(-28 76 88)" fill="${lin(["#C97F88", "#753744"], "d")}"/><ellipse cx="44" cy="90" rx="6.5" ry="3.8" transform="rotate(20 44 90)" fill="${lin(["#C97F88", "#753744"], "d")}"/></g>` },

  { u: "1f33a", n: "hibiscus", draw: ({ lin }) => `<g ${B}>${leaf(26, 74, 22, 8, -135, gl(lin))}${leaf(74, 74, 22, 8, 135, gl(lin))}</g>
<g ${B}>${petals(5, 50, 50, 44, 16.5, lin(["#FFA89C", C.red, C.redD]), 18)}</g>
<g ${Bs}><circle cx="50" cy="50" r="10" fill="${lin([C.redD, "#7D1F1F"], "d")}"/></g>
<path d="M50 50 C56 40 62 34 68 30" stroke="${C.goldD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<g ${Bs}><circle cx="69" cy="29" r="3" fill="${lin([C.gold, C.goldD])}"/><circle cx="63" cy="33" r="2.4" fill="${C.gold}"/><circle cx="73" cy="34" r="2.4" fill="${C.gold}"/></g>` },

  { u: "1f33b", n: "sunflower", draw: ({ lin, rad }) => {
    const g = lin(["#FFF0A0", C.yellow, C.yellowD]), g2 = lin(["#FFE680", C.yellowM, C.orangeD]);
    const seeds = [[44, 40], [56, 40], [38, 50], [50, 50], [62, 50], [44, 60], [56, 60], [50, 42], [50, 58]];
    return `<g ${B}>${petals(12, 50, 50, 46, 7.2, g2, 15)}</g><g ${B}>${petals(12, 50, 50, 42, 7.6, g)}</g>
<g ${B}><circle cx="50" cy="50" r="20" fill="${rad(["#9A6A3E", C.woodD, C.woodDD], 0.4, 0.35, 0.9)}"/></g>
<g fill="${C.woodDD}" opacity=".8">${seeds.map((s) => `<circle cx="${s[0] - 0}" cy="${s[1]}" r="1.7"/>`).join("")}</g>
<g fill="${C.woodL}" opacity=".6"><circle cx="41" cy="45" r="1.2"/><circle cx="59" cy="45" r="1.2"/><circle cx="50" cy="65" r="1.2"/><circle cx="35" cy="56" r="1.2"/><circle cx="65" cy="56" r="1.2"/></g>`;
  } },

  { u: "1f33c", n: "blossom", draw: ({ lin }) => `<g ${B}>${petals(8, 50, 50, 44, 11.5, lin(["#FFF2A8", C.yellow, C.yellowM]), 0)}</g>
<g ${B}><circle cx="50" cy="50" r="13" fill="${lin(["#FFC070", C.orange, C.orangeD], "d")}"/></g>
<ellipse cx="46" cy="45" rx="4" ry="2.6" fill="#fff" opacity=".4"/>` },

  { u: "1f337", n: "tulip", draw: ({ lin }) => `<g ${B}>${leaf(50, 96, 52, 11, -22, gl(lin))}${leaf(50, 96, 48, 11, 24, gl(lin))}</g>
<g ${Bs}><path d="M50 62 V96" stroke="${C.greenM}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><path d="M23 14 C20 44 32 64 50 64 C68 64 80 44 77 14 L63 30 L50 10 L37 30Z" fill="${lin(["#F28076", C.redM, C.redD], "d")}"/></g>
<g ${B}><path d="M50 10 C36 28 33 50 50 64 C67 50 64 28 50 10Z" fill="${lin(["#FF9A8E", C.red, C.redM], "d")}"/></g>
<path d="M44 26 C40 38 42 50 48 58" stroke="#fff" stroke-width="2.2" opacity=".3" fill="none" stroke-linecap="round"/>` },

  { u: "1fabb", n: "hyacinth", draw: ({ lin }) => {
    const rows = [1, 2, 2, 3, 3, 4, 4];
    const g = lin(["#D8C8F2", C.purple, C.purpleD], "d");
    const fl = rows.map((n, k) => Array.from({ length: n }, (_, j) => `<circle cx="${f1(50 + (j - (n - 1) / 2) * 12 + (k % 2 ? 2 : -2))}" cy="${12 + k * 8.2}" r="${k === 0 ? 6 : 7}" fill="${g}"/>`).join("")).join("");
    return `<g ${B}>${leaf(50, 96, 52, 10, -18, gl(lin))}${leaf(50, 96, 46, 10, 20, gl(lin))}</g>
<g ${Bs}><path d="M50 56 V94" stroke="${C.greenM}" stroke-width="4.6" stroke-linecap="round"/></g>
<g ${B}>${fl}</g>
<g fill="#fff" opacity=".5"><circle cx="48" cy="10" r="1.6"/><circle cx="40" cy="28" r="1.6"/><circle cx="58" cy="35" r="1.6"/><circle cx="34" cy="52" r="1.6"/><circle cx="52" cy="52" r="1.6"/></g>`;
  } },

  { u: "1f331", n: "seedling", draw: ({ lin }) => `<g ${Bs}><path d="M50 74 C50 62 50 56 50 46" stroke="${C.greenM}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
<g ${B}><path d="M50 52 C50 26 70 12 92 18 C92 44 74 60 50 52Z" fill="${gl(lin)}"/><path d="M50 56 C50 40 36 30 10 34 C10 54 28 64 50 56Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<path d="M54 50 C66 38 76 30 86 24 M46 54 C36 46 26 40 16 38" stroke="${C.greenD}" stroke-width="1.4" fill="none" opacity=".55" stroke-linecap="round"/>
<g ${B}><path d="M10 92 C14 70 36 66 50 66 C64 66 86 70 90 92Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g fill="${C.woodDD}" opacity=".35"><circle cx="30" cy="80" r="2"/><circle cx="62" cy="76" r="2"/><circle cx="74" cy="84" r="1.8"/><circle cx="46" cy="86" r="1.8"/></g>` },

  { u: "1fab4", n: "potted plant", draw: ({ lin }) => `<g ${B}>${leaf(50, 60, 48, 10, 0, gl(lin))}${leaf(50, 60, 44, 10, -38, gl(lin))}${leaf(50, 60, 44, 10, 38, gl(lin))}${leaf(50, 60, 34, 9, -72, gl(lin))}${leaf(50, 60, 34, 9, 72, gl(lin))}</g>
<g ${B}><path d="M24 60 H76 L70 90 a4 4 0 0 1 -4 3 H34 a4 4 0 0 1 -4 -3Z" fill="${lin([C.orange, "#D9803A", C.orangeD], "d")}"/></g>
<g ${B}><rect x="19" y="52" width="62" height="12" rx="4" fill="${lin([C.woodL, C.orange, C.orangeD])}"/></g>
<path d="M50 56 V20 M50 56 L30 28 M50 56 L70 28" stroke="${C.greenD}" stroke-width="1.1" opacity=".4" fill="none"/>` },

  { u: "1f332", n: "evergreen tree", draw: ({ lin }) => {
    const t = (pts, g) => `<polygon points="${pts}" fill="${g}" stroke="${C.greenM}" stroke-width="5" stroke-linejoin="round"/>`;
    return `<g ${B}><rect x="43" y="74" width="14" height="20" rx="2" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}>${t("50,48 20,78 80,78", lin([C.green, C.greenM, C.greenD], "d")).replace(`stroke="${C.greenM}"`, `stroke="#5E9455"`)}${t("50,30 26,58 74,58", lin([C.green, C.greenM, C.greenD], "d"))}${t("50,12 32,38 68,38", lin([C.green, C.greenM, C.greenD], "d"))}</g>
<path d="M50 16 L36 36 M50 34 L30 55 M50 52 L24 76" stroke="#fff" stroke-width="1.6" opacity=".22" stroke-linecap="round"/>`;
  } },

  { u: "1f333", n: "deciduous tree", draw: ({ rad, lin }) => {
    const c = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${rad([C.green, C.greenM, C.greenD], 0.36, 0.3, 0.9)}"/>`;
    return `<g ${B}><path d="M42 94 C46 88 46 76 45 56 H55 C54 76 54 88 58 94Z" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${Bs}><path d="M50 70 L36 52 M50 66 L64 48" stroke="${C.wood}" stroke-width="4" stroke-linecap="round"/></g>
<g ${B}>${c(28, 52, 20)}${c(72, 52, 20)}${c(36, 30, 23)}${c(66, 30, 23)}${c(50, 52, 24)}${c(50, 22, 18)}</g>
<g fill="#fff" opacity=".22"><ellipse cx="38" cy="24" rx="8" ry="4" transform="rotate(-30 38 24)"/><ellipse cx="22" cy="46" rx="5" ry="3" transform="rotate(-30 22 46)"/></g>`;
  } },

  { u: "1f334", n: "palm tree", draw: ({ lin }) => {
    const fr = (a, m) => `<path d="M0 0 Q22 -34 48 -8 Q24 -20 0 0Z" transform="translate(54 30)${m ? " scale(-1 1)" : ""} rotate(${a})" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/>`;
    return `<g ${B}><ellipse cx="46" cy="92" rx="34" ry="6" fill="${lin([C.cream, C.creamD])}"/></g>
<g ${B}><path d="M42 93 C50 72 56 52 54 30" stroke="${C.woodD}" stroke-width="9" fill="none" stroke-linecap="round"/></g>
<path d="M45 86 C52 68 57 50 55 32" stroke="${C.woodL}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>
<g ${B}>${[-62, -28, 14].map((a) => fr(a, 0)).join("")}${[-62, -28, 14].map((a) => fr(a, 1)).join("")}</g>
<g ${B}><circle cx="49" cy="36" r="5" fill="${C.woodDD}"/><circle cx="59" cy="37" r="5" fill="${C.woodD}"/></g>`;
  } },

  { u: "1f335", n: "cactus", draw: ({ lin }) => `<g ${B}><path d="M38 66 H24 V40 M62 56 H76 V30" stroke="${C.greenM}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${B}><rect x="34" y="12" width="32" height="82" rx="16" fill="${lin([C.green, C.greenM, C.greenD], "h")}"/></g>
<path d="M44 22 V86 M56 22 V86 M24 46 V60 M76 36 V50" stroke="${C.greenD}" stroke-width="1.6" opacity=".4" stroke-linecap="round"/>
<g stroke="${C.paper}" stroke-width="1.4" stroke-linecap="round" opacity=".9"><path d="M40 34 l-3 -2 M60 44 l3 -2 M40 62 l-3 -2 M60 70 l3 -2 M50 50 l0 -3 M50 76 v-3 M24 36 l-3 -2 M76 26 l3 -2"/></g>
<g ${Bs}><circle cx="50" cy="14" r="7" fill="${lin(["#FFD0DA", C.pink, C.pinkD], "d")}"/><circle cx="50" cy="14" r="2.4" fill="${C.gold}"/></g>` },

  { u: "1f33e", n: "sheaf of rice", draw: ({ lin }) => {
    const gr = lin([C.yellow, C.goldM, C.goldD], "d");
    const ear = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})">${[0, 1, 2, 3].map((k) => `<ellipse cx="-4.4" cy="${-6 - k * 7}" rx="3.6" ry="6.2" transform="rotate(-24 -4.4 ${-6 - k * 7})" fill="${gr}"/><ellipse cx="4.4" cy="${-9 - k * 7}" rx="3.6" ry="6.2" transform="rotate(24 4.4 ${-9 - k * 7})" fill="${gr}"/>`).join("")}<ellipse cx="0" cy="-36" rx="3.4" ry="7" fill="${gr}"/></g>`;
    const E = [[50, 52, 0], [32, 58, -22], [68, 58, 22]];
    return `<g ${Bs}><path d="${E.map((e) => `M50 94 L${e[0]} ${e[1]}`).join(" ")}" stroke="${C.goldD}" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<g ${B}>${E.map((e) => ear(...e)).join("")}</g>
<g ${B}><path d="M34 80 Q50 87 66 80" stroke="${C.red}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
<path d="M39 80 Q50 85 61 80" stroke="#fff" stroke-width="1.4" opacity=".3" fill="none"/>`;
  } },

  { u: "1f33f", n: "herb", draw: ({ lin }) => {
    const P = [22, 94, 32, 62, 56, 50, 72, 28];
    let ls = "", vs = "";
    [0.2, 0.38, 0.56, 0.74].forEach((t, i) => {
      const [x, y, a] = bez(P, t);
      const len = 28 - i * 3;
      ls += leaf(x, y, len, 8, a - 58, gl(lin)) + leaf(x, y, len, 8, a + 58, gl(lin));
      vs += vein(x, y, len, a - 58) + vein(x, y, len, a + 58);
    });
    const [tx, ty, ta] = bez(P, 1);
    return `<g ${B}><path d="M22 94 C32 62 56 50 72 28" stroke="${C.greenM}" stroke-width="4.4" fill="none" stroke-linecap="round"/>${ls}${leaf(tx, ty + 2, 20, 7, ta, gl(lin))}</g>${vs}`;
  } },

  { u: "2618-fe0f", n: "shamrock", draw: ({ lin }) => {
    const L = (a) => `<path d="${HEART}" transform="translate(50 52) rotate(${a}) scale(1.52)" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/>`;
    const v = [0, 120, 240].map((a) => `<path d="M0 -4 V-34" transform="translate(50 52) rotate(${a})" stroke="${C.greenD}" stroke-width="1.3" opacity=".5" fill="none"/>`).join("");
    return `<g ${Bs}><path d="M50 52 C50 72 56 84 66 94" stroke="${C.greenD}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
<g ${B}>${L(0)}${L(120)}${L(240)}</g>${v}`;
  } },

  { u: "1f340", n: "four leaf clover", draw: ({ lin }) => {
    const L = (a) => `<path d="${HEART}" transform="translate(50 50) rotate(${a}) scale(1.5)" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/>`;
    const v = [45, 135, 225, 315].map((a) => `<path d="M0 -4 V-34" transform="translate(50 50) rotate(${a})" stroke="${C.greenD}" stroke-width="1.3" opacity=".5" fill="none"/>`).join("");
    return `<g ${Bs}><path d="M50 50 C50 70 46 82 38 95" stroke="${C.greenD}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
<g ${B}>${L(45)}${L(135)}${L(225)}${L(315)}</g>${v}`;
  } },

  { u: "1f341", n: "maple leaf", draw: ({ lin }) => {
    const R = [[50, 8], [58, 24], [68, 18], [66, 38], [86, 34], [78, 50], [92, 60], [68, 66], [72, 78], [54, 72], [53, 90]];
    const pts = [...R, ...R.slice(1, -1).reverse().map((p) => [100 - p[0], p[1]]).slice(0), ];
    const all = [...R, [47, 90], ...R.slice(1, -1).reverse().map((p) => [100 - p[0], p[1]])];
    void pts;
    return `<g ${B}><polygon points="${all.map((p) => p.join(",")).join(" ")}" fill="${lin(["#F58A5E", C.redM, C.redD], "d")}" stroke="${C.redM}" stroke-width="3.5" stroke-linejoin="round"/></g>
<path d="M50 88 V30 M50 72 L30 60 M50 72 L70 60 M50 54 L30 36 M50 54 L70 36" stroke="#7D1F1F" stroke-width="1.8" opacity=".45" stroke-linecap="round" fill="none"/>`;
  } },

  { u: "1f342", n: "fallen leaf", draw: ({ lin }) => {
    const lf = (x, y, a, s, g) => `<path d="${OAK}" transform="translate(${x} ${y}) rotate(${a}) scale(${s})" fill="${g}"/>`;
    const vn = (x, y, a, s) => `<path d="M0 -26 V32" transform="translate(${x} ${y}) rotate(${a}) scale(${s})" stroke="#6B2E14" stroke-width="1.3" opacity=".45" fill="none"/>`;
    return `<g ${B}>${lf(66, 60, 34, 1.12, lin(["#F7C070", C.orangeD], "d"))}</g>${vn(66, 60, 34, 1.12)}
<g ${B}>${lf(36, 44, -32, 1.18, lin(["#F58A5E", C.redM, C.redD], "d"))}</g>${vn(36, 44, -32, 1.18)}
<g ${B}>${lf(48, 76, 78, 0.9, lin([C.yellow, C.goldM, C.goldD], "d"))}</g>${vn(48, 76, 78, 0.9)}`;
  } },

  { u: "1f343", n: "leaf fluttering in wind", draw: ({ lin }) => `<g ${Bs}><path d="M6 62 C18 52 30 70 44 60 C52 54 58 56 62 60 M4 78 C18 70 30 84 46 76 M14 44 C24 38 34 46 44 40" stroke="${C.blue}" stroke-width="3.6" fill="none" stroke-linecap="round"/></g>
<g ${B}>${leaf(40, 70, 60, 19, 40, gl(lin))}${leaf(66, 92, 24, 8, 30, lin([C.green, C.greenM, C.greenD], "d"))}</g>
${vein(40, 70, 60, 40)}` },

  { u: "1fab9", n: "empty nest", draw: ({ lin }) => `<g transform="translate(3.8 -4.3) scale(.92)">${nest(lin, false)}</g>` },
  { u: "1faba", n: "nest with eggs", draw: ({ lin }) => `<g transform="translate(3.8 -4.3) scale(.92)">${nest(lin, true)}</g>` },

  { u: "1f344", n: "mushroom", draw: ({ lin }) => `<g ${B}><path d="M34 52 C34 68 32 80 26 92 H74 C68 80 66 68 66 52Z" fill="${lin(["#FFFBEF", C.cream, C.creamD], "h")}"/></g>
<g ${B}><ellipse cx="50" cy="54" rx="42" ry="8" fill="${lin([C.creamD, C.woodD])}"/></g>
<g ${B}><path d="M6 54 C4 20 36 8 50 8 C64 8 96 20 94 54 C80 62 20 62 6 54Z" fill="${lin(["#F58A7E", C.redM, C.redD], "d")}"/></g>
<g ${Bs}><circle cx="30" cy="36" r="7.5" fill="${lin([C.paper, C.paperD], "d")}"/><circle cx="56" cy="24" r="6" fill="${lin([C.paper, C.paperD], "d")}"/><circle cx="76" cy="40" r="8" fill="${lin([C.paper, C.paperD], "d")}"/><circle cx="48" cy="46" r="4.6" fill="${lin([C.paper, C.paperD], "d")}"/></g>` },

  { u: "1fabe", n: "leafless tree", draw: ({ lin }) => {
    const br = [["M50 70 C50 54 40 46 28 30", 5], ["M50 70 C50 54 60 44 72 28", 5], ["M49 58 C47 44 50 30 46 12", 4.4], ["M38 42 C30 40 22 42 12 34", 3], ["M28 30 C28 24 26 20 22 12", 3], ["M28 30 L16 24", 2.6], ["M62 40 C70 40 78 38 88 42", 3], ["M72 28 C72 22 74 18 78 10", 3], ["M72 28 L86 22", 2.6], ["M47 22 L38 12", 2.6], ["M48 30 L58 20", 2.6]];
    return `<g ${B}><path d="M40 94 C46 90 46 80 46 62 H54 C54 80 54 90 60 94Z" fill="${lin([C.woodL, C.wood, C.woodD], "h")}"/></g>
<g ${B}>${br.map((b) => `<path d="${b[0]}" stroke="${C.wood}" stroke-width="${b[1]}" fill="none" stroke-linecap="round"/>`).join("")}</g>
<path d="M45 90 C48 80 48 70 48 62" stroke="${C.woodL}" stroke-width="1.6" opacity=".6" fill="none"/>`;
  } },
];

const T = {
  "1fab7": "translate(0 -10)", "1f339": "translate(0 -7)", "1f940": "translate(0 -8)", "1f337": "translate(0 -3)",
  "1f334": "translate(4.2 11.4) scale(.84)", "1f342": "translate(3 3) scale(.94)", "1f343": "translate(4.1 -15) scale(1.12)",
};
export default icons.map((ic) => (T[ic.u] ? { ...ic, draw: (t) => `<g transform="${T[ic.u]}">${ic.draw(t)}</g>` } : ic));
