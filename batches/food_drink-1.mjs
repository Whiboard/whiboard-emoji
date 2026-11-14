// food_drink-1: fruit, vegetables, nuts.
import { B, Bs, C, star } from "../kit.mjs";

const hi = (cx, cy, rx, ry, rot = 0, o = 0.3) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#fff" opacity="${o}"/>`;
const leaf = (lin, d, c = [C.green, C.greenM, C.greenD]) => `<g ${Bs}><path d="${d}" fill="${lin(c, "d")}"/></g>`;
const stem = (d, w = 4, c = C.woodD) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const LEAF = "M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z";
const at = (x, y, r = 0, s = 1) => `transform="translate(${x} ${y}) rotate(${r}) scale(${s})"`;

// ---- shared bases
const appleBase = (lin, rad, cols) => `<g transform="translate(50 50) scale(1.1) translate(-50 -49.5)">
<g ${B}><path d="M50 31 C41 21 15 24 15 51 C15 75 33 93 50 86 C67 93 85 75 85 51 C85 24 59 21 50 31Z" fill="${rad(cols, 0.34, 0.3, 0.82)}"/></g>
<ellipse cx="50" cy="33.5" rx="9" ry="3.4" fill="#000" opacity=".22"/>
${hi(32, 46, 6.5, 11, 24, 0.3)}
${stem("M50 34 C50 27 52 20 56.5 13.5")}
${leaf(lin, "M55 25 C60 10 77 9 84 12.5 C81 26 66 33 55 25Z")}
<path d="M57.5 23.5 C64 19.5 73 15.5 81.5 13.6" fill="none" stroke="${C.greenD}" stroke-width="1.2" opacity=".7"/></g>`;

const lemonBase = (lin, rad, cols, rx, ry, tip) => {
  const t = tip;
  return `<g ${B}><g transform="rotate(-32 50 55)"><path d="M${50 - rx - t} 55 C${50 - rx - t} 52.5 ${50 - rx} 52 ${50 - rx + 2} 49 C${50 - rx + 8} ${55 - ry} 38 ${55 - ry} 50 ${55 - ry} C62 ${55 - ry} ${50 + rx - 8} ${55 - ry} ${50 + rx - 2} 49 C${50 + rx} 52 ${50 + rx + t} 52.5 ${50 + rx + t} 55 C${50 + rx + t} 57.5 ${50 + rx} 58 ${50 + rx - 2} 61 C${50 + rx - 8} ${55 + ry} 62 ${55 + ry} 50 ${55 + ry} C38 ${55 + ry} ${50 - rx + 8} ${55 + ry} ${50 - rx + 2} 61 C${50 - rx} 58 ${50 - rx - t} 57.5 ${50 - rx - t} 55Z" fill="${rad(cols, 0.34, 0.3, 0.85)}"/></g></g>
${hi(36, 38, 12, 5, -45, 0.35)}`;
};

const ber = (rad, cols, pts, r) =>
  pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${rad(cols, 0.35, 0.3, 0.8)}"/>`).join("");

const bulb = (lin, rad, cols, d, lines, lc, o = 0.55) => `
<g ${B}><path d="${d}" fill="${rad(cols, 0.36, 0.3, 0.85)}"/></g>
<path d="${lines}" fill="none" stroke="${lc}" stroke-width="1.6" stroke-linecap="round" opacity="${o}"/>`;

export default [
  {
    u: "1f347", n: "grapes",
    draw: ({ lin, rad }) => {
      const pts = [[22, 38], [41, 38], [60, 38], [79, 38], [31, 54], [50, 54], [69, 54], [40, 70], [59, 70], [50, 86]];
      const dots = pts.map(([x, y]) => hi(x - 3.5, y - 4, 2.6, 1.6, -30, 0.5)).join("");
      return `<g ${B}>${ber(rad, ["#C9B0EE", "#9A7BCF", "#6A4DA2"], pts, 10.5)}</g>${dots}
${stem("M50 30 C50 22 56 15 62 12", 4.5)}
<g ${B}><path d="M58 22 C62 6 80 4 90 9 C87 24 70 31 58 22Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<path d="M62 20 C70 15 80 11 88 10" fill="none" stroke="${C.greenD}" stroke-width="1.2" opacity=".7"/>`;
    },
  },
  {
    u: "1f348", n: "melon",
    draw: ({ lin, rad, clip }) => `
<g ${B}><circle cx="50" cy="55" r="36" fill="${rad(["#E3EEA8", "#B7CD72", "#86A44C"], 0.34, 0.3, 0.85)}"/></g>
<g ${clip('<circle cx="50" cy="55" r="36"/>')} fill="none" stroke="#F6F3CC" stroke-width="1.6" opacity=".65">
<path d="M30 25 C42 45 40 70 28 88 M50 18 C58 42 58 70 50 92 M70 25 C62 45 62 70 72 88 M14 45 C40 52 66 52 90 44 M12 66 C38 72 64 72 90 64"/></g>
${hi(32, 38, 6, 11, 35, 0.3)}
${stem("M50 20 C50 14 52 11 56 8", 5)}
${leaf(lin, "M54 14 C58 3 72 2 80 5 C77 16 64 20 54 14Z")}`,
  },
  {
    u: "1f349", n: "watermelon",
    draw: ({ lin }) => `
<g ${B}><path d="M6 28 A44 50 0 0 0 94 28Z" fill="${lin([C.greenM, C.greenD])}"/></g>
<path d="M11 28 A39 44 0 0 0 89 28Z" fill="${C.paper}"/>
<g ${B}><path d="M14.5 28 A35.5 40 0 0 0 85.5 28Z" fill="${lin(["#F58A80", C.red, C.redM, "#B93A3A"])}"/></g>
<path d="M14.5 28 A35.5 40 0 0 0 85.5 28" fill="none" stroke="#FFD2C8" stroke-width="1.4" opacity=".35" transform="translate(0 -2)"/>
<g fill="${C.darkD}"><ellipse cx="32" cy="44" rx="2.2" ry="4" transform="rotate(-20 32 44)"/><ellipse cx="50" cy="52" rx="2.2" ry="4"/><ellipse cx="68" cy="44" rx="2.2" ry="4" transform="rotate(20 68 44)"/><ellipse cx="40" cy="63" rx="2.2" ry="4" transform="rotate(-12 40 63)"/><ellipse cx="60" cy="63" rx="2.2" ry="4" transform="rotate(12 60 63)"/></g>
<path d="M9 52 C15 62 22 69 32 74" fill="none" stroke="#fff" stroke-width="2" opacity=".25" stroke-linecap="round" transform="translate(0 0)"/>`,
  },
  {
    u: "1f34a", n: "tangerine",
    draw: ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="57" r="35" fill="${rad(["#FBC47E", C.orange, "#D4742A"], 0.34, 0.3, 0.85)}"/></g>
<ellipse cx="50" cy="26" rx="8" ry="3.2" fill="#8A4A10" opacity=".35"/>
<g fill="#C0651E" opacity=".35"><circle cx="38" cy="62" r="1.2"/><circle cx="58" cy="70" r="1.2"/><circle cx="68" cy="52" r="1.2"/><circle cx="48" cy="80" r="1.2"/><circle cx="30" cy="48" r="1.2"/></g>
${hi(32, 44, 6, 11, 28, 0.32)}
${stem("M50 27 C50 22 51 19 53 16", 3.5)}
${leaf(lin, "M52 22 C56 8 72 6 82 10 C79 22 64 28 52 22Z")}`,
  },
  {
    u: "1f34b", n: "lemon",
    draw: ({ lin, rad }) => `${lemonBase(lin, rad, ["#FFF09A", C.yellow, "#E0A92E"], 40, 31, 7)}
${leaf(lin, "M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z").replace("<path", `<path ${at(66, 28, -10, 0.8)}`)}`,
  },
  {
    u: "1f34b-200d-1f7e9", n: "lime",
    draw: ({ lin, rad }) => `${lemonBase(lin, rad, ["#D4EC9C", "#8FC25A", "#4E8A3C"], 38, 33, 5)}
<g fill="none" stroke="#fff" stroke-width="1.2" opacity=".25"><path d="M30 62 C40 70 52 72 62 66"/></g>
${leaf(lin, "M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z", [C.green, C.greenM, "#2F5A30"]).replace("<path", `<path ${at(68, 26, -10, 0.8)}`)}`,
  },
  {
    u: "1f34c", n: "banana",
    draw: ({ lin }) => `<g transform="translate(-6 2)">
<g ${B}><path d="M26 12 H42 C42 32 48 46 60 56 C70 64 82 66 90 66 C92 80 80 91 60 90 C28 86 10 54 19 24 C20 18 22 14 26 12Z" fill="${lin(["#FFE57F", C.yellow, C.yellowM, "#D49828"], "d")}"/></g>
<g ${Bs}><rect x="26" y="5" width="16" height="10" rx="2.5" fill="${lin([C.woodL, C.woodD])}"/><path d="M89 65 L95 67 L94 80 C92 83 89 85 86 86Z" fill="${C.woodDD}"/></g>
<path d="M26 26 C24 48 34 74 56 83" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".3"/>
<path d="M36 26 C37 40 42 50 52 60" fill="none" stroke="#C4872A" stroke-width="1.4" opacity=".45"/></g>`,
  },
  {
    u: "1f34d", n: "pineapple",
    draw: ({ lin, rad, clip }) => `
<g ${B}><path d="M50 44 C40 28 30 22 24 8 C36 14 44 22 50 30 C52 18 56 10 58 3 C62 14 60 24 58 34 C66 24 74 20 82 22 C74 30 62 38 54 46Z" fill="${lin([C.green, C.greenM, C.greenD])}"/>
<path d="M50 44 C34 34 20 34 12 24 C26 22 40 28 52 40Z" fill="${lin([C.greenM, C.greenD])}"/></g>
<g ${B}><ellipse cx="50" cy="66" rx="27" ry="29" fill="${rad(["#FFD96A", "#F0B03A", "#C9801E"], 0.36, 0.3, 0.85)}"/></g>
<g ${clip('<ellipse cx="50" cy="66" rx="27" ry="29"/>')} fill="none" stroke="#9A5A16" stroke-width="1.5" opacity=".55">
<path d="M14 50 L70 100 M14 66 L56 104 M14 82 L40 104 M26 40 L80 90 M42 36 L86 76 M58 36 L88 62 M86 50 L30 100 M86 66 L44 104 M86 82 L60 104 M74 40 L20 90 M58 36 L14 74 M42 36 L14 60"/></g>
${hi(38, 52, 5, 11, 20, 0.3)}`,
  },
  {
    u: "1f96d", n: "mango",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(25 50 54)"><path d="M50 16 C74 14 86 38 84 58 C82 82 62 92 44 88 C24 84 14 64 20 42 C24 26 36 18 50 16Z" fill="${rad(["#FFD66E", "#F5A24A", "#E0623A"], 0.3, 0.26, 0.95)}"/></g></g>
${hi(30, 40, 6, 14, 28, 0.32)}
<path d="M78 50 C84 64 78 78 64 84" fill="none" stroke="#C73F2C" stroke-width="3" opacity=".3" stroke-linecap="round"/>
${stem("M37 29 C35 25 35 23 37 21", 3.5)}
${leaf(lin, "M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z").replace("<path", `<path ${at(37, 28, -35, 0.7)}`)}`,
  },
  {
    u: "1f34f", n: "green apple",
    draw: ({ lin, rad }) => appleBase(lin, rad, ["#D4EDA4", "#8CC06A", "#4F8A46"]),
  },
  {
    u: "1f350", n: "pear",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M50 18 C59 18 59 32 61 38 C63 46 83 52 83 68 C83 83 69 92 50 92 C31 92 17 83 17 68 C17 52 37 46 39 38 C41 32 41 18 50 18Z" fill="${rad(["#E9F0A0", "#B8CC5C", "#7E9A3E"], 0.34, 0.3, 0.85)}"/></g>
<g fill="#7A6A22" opacity=".3"><circle cx="40" cy="66" r="1.1"/><circle cx="58" cy="74" r="1.1"/><circle cx="66" cy="62" r="1.1"/><circle cx="48" cy="82" r="1.1"/></g>
${hi(35, 66, 6, 12, 15, 0.32)}
${stem("M50 22 C50 16 52 13 56 10", 4)}
${leaf(lin, LEAF).replace("<path", `<path ${at(54, 20, -15, 0.75)}`)}`,
  },
  {
    u: "1f351", n: "peach",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M50 28 C40 20 14 28 14 56 C14 78 32 92 50 90 C68 92 86 78 86 56 C86 28 60 20 50 28Z" fill="${rad(["#FFD9A0", "#F6A27C", "#E0626A"], 0.3, 0.28, 0.95)}"/></g>
<path d="M50 29 C44 46 46 66 58 84" fill="none" stroke="#C0485A" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>
${hi(30, 48, 6, 11, 22, 0.35)}
${stem("M50 30 C50 24 52 20 55 17", 3.5)}
${leaf(lin, LEAF).replace("<path", `<path ${at(53, 27, -20, 0.85)}`)}`,
  },
  {
    u: "1f352", n: "cherries",
    draw: ({ lin, rad }) => `
${stem("M30 54 C30 36 42 22 62 14", 3.6, C.greenD)}${stem("M68 58 C68 40 66 26 62 14", 3.6, C.greenD)}
<g ${B}><circle cx="30" cy="72" r="20" fill="${rad(["#F58578", "#D0403C", "#8E2428"], 0.34, 0.3, 0.85)}"/><circle cx="68" cy="76" r="18" fill="${rad(["#F58578", "#D0403C", "#8E2428"], 0.34, 0.3, 0.85)}"/></g>
${hi(23, 64, 3.5, 6.5, 30, 0.45)}${hi(62, 69, 3.2, 6, 30, 0.45)}
<g ${Bs}><path d="M62 14 C66 0 82 -2 92 4 C90 18 74 22 62 14Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}" transform="translate(-2 4)"/></g>`,
  },
  {
    u: "1f353", n: "strawberry",
    draw: ({ lin, rad }) => {
      const pts = [[34, 46], [50, 44], [66, 46], [28, 60], [42, 58], [58, 58], [72, 60], [36, 72], [50, 70], [64, 72], [44, 82], [56, 82]];
      const seeds = pts.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.5" ry="2.3" fill="${C.yellow}"/>`).join("");
      return `
<g ${B}><path d="M50 92 C28 82 10 60 12 42 C14 28 30 26 50 32 C70 26 86 28 88 42 C90 60 72 82 50 92Z" fill="${rad(["#F58578", "#DC4A48", "#A52A30"], 0.32, 0.3, 0.85)}"/></g>
${seeds}${hi(26, 44, 4.5, 9, 25, 0.32)}
<g ${B}><path d="M50 36 C42 28 30 28 22 28 C28 36 34 40 40 40 C34 44 36 48 42 46 C46 44 48 44 50 48 C52 44 54 44 58 46 C64 48 66 44 60 40 C66 40 72 36 78 28 C70 28 58 28 50 36Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
${stem("M50 34 C50 26 52 20 56 14", 3.6, C.greenD)}`;
    },
  },
  {
    u: "1fad0", n: "blueberries",
    draw: ({ lin, rad }) => {
      const pts = [[32, 62], [68, 64], [50, 36]];
      const crowns = pts.map(([x, y]) => `<polygon points="${star(x + 1, y - 3, 5.5, 2.4, 5)}" fill="#2F3C68" opacity=".75"/>`).join("");
      return `<g transform="translate(0 6)"><g ${B}>${ber(rad, ["#9DB0F0", "#5D72C4", "#34428A"], [[32, 62], [68, 64]], 22)}${ber(rad, ["#9DB0F0", "#5D72C4", "#34428A"], [[50, 36]], 21)}</g>
<g fill="#E8ECFF" opacity=".25"><ellipse cx="32" cy="62" rx="18" ry="16"/><ellipse cx="68" cy="64" rx="18" ry="16"/><ellipse cx="50" cy="36" rx="17" ry="15"/></g>
${crowns}${hi(24, 54, 3.5, 7, 30, 0.4)}${hi(60, 56, 3.5, 7, 30, 0.4)}${hi(43, 28, 3.2, 6, 30, 0.4)}
<g ${Bs}><path d="M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z" ${at(56, 20, -20, 0.8)} fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>`;
    },
  },
  {
    u: "1f95d", n: "kiwi fruit",
    draw: ({ lin, rad }) => {
      const seeds = Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI * 2) / 16;
        return `<ellipse cx="${(50 + 15 * Math.cos(a)).toFixed(1)}" cy="${(50 + 15 * Math.sin(a)).toFixed(1)}" rx="1.3" ry="2.4" transform="rotate(${(a * 180) / Math.PI + 90} ${(50 + 15 * Math.cos(a)).toFixed(1)} ${(50 + 15 * Math.sin(a)).toFixed(1)})" fill="${C.darkD}"/>`;
      }).join("");
      const rays = Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI * 2) / 16 + 0.2;
        return `M${(50 + 10 * Math.cos(a)).toFixed(1)} ${(50 + 10 * Math.sin(a)).toFixed(1)} L${(50 + 27 * Math.cos(a)).toFixed(1)} ${(50 + 27 * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      return `<g ${B}><circle cx="50" cy="50" r="40" fill="${lin(["#B98A56", "#8A5E34"], "d")}"/></g>
<g ${B}><circle cx="50" cy="50" r="35" fill="${rad(["#C6E36A", "#8FC23C", "#5E9A2E"], 0.5, 0.5, 0.8)}"/></g>
<path d="${rays}" stroke="#E4F2A0" stroke-width="1.4" opacity=".6"/>
<ellipse cx="50" cy="50" rx="9" ry="8.5" fill="${C.paper}" opacity=".95"/>${seeds}
${hi(30, 28, 8, 3, -35, 0.3)}`;
    },
  },
  {
    u: "1f345", n: "tomato",
    draw: ({ lin, rad }) => `<g transform="translate(50 50) scale(1.1) translate(-50 -52.5)">
<g ${B}><path d="M50 26 C30 16 10 32 12 56 C14 78 32 92 50 90 C68 92 86 78 88 56 C90 32 70 16 50 26Z" fill="${rad(["#F58578", "#DC463E", "#A12A2C"], 0.34, 0.3, 0.85)}"/></g>
${hi(28, 46, 6, 11, 28, 0.32)}
<g ${B}><path d="M50 40 C44 36 34 36 26 30 C34 28 42 26 46 26 C46 20 48 18 50 14 C52 18 54 20 54 26 C58 26 66 28 74 30 C66 36 56 36 50 40Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>`,
  },
  {
    u: "1fad2", n: "olive",
    draw: ({ lin, rad }) => `
${stem("M60 32 C62 26 64 24 66 26", 3.6)}
<g ${B}><ellipse cx="46" cy="60" rx="34" ry="28" transform="rotate(-35 46 60)" fill="${rad(["#C5D070", "#8E9E3E", "#5A6A28"], 0.34, 0.3, 0.85)}"/></g>
<g ${Bs}><ellipse cx="22" cy="74" rx="6.5" ry="5" transform="rotate(-35 22 74)" fill="${lin([C.red, C.redD], "d")}"/></g>
${hi(38, 46, 9, 3.4, -50, 0.38)}
<g ${Bs}><path d="M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z" ${at(66, 26, -25, 0.75)} fill="${lin([C.green, C.greenM, C.greenD], "d")}"/><path d="M0 0 C5 -15 22 -16 29 -12 C26 2 11 9 0 0Z" ${at(66, 26, 25, 0.6)} fill="${lin([C.greenM, C.greenD], "d")}"/></g>`,
  },
  {
    u: "1f965", n: "coconut",
    draw: ({ lin, rad }) => `
<g ${B}><ellipse cx="50" cy="58" rx="40" ry="34" fill="${rad(["#9A6A40", "#6E4526", "#4A2C16"], 0.4, 0.3, 0.9)}"/></g>
<g stroke="#3A2210" stroke-width="1.2" opacity=".45" fill="none" stroke-linecap="round"><path d="M16 66 L20 74 M26 78 L30 84 M44 88 L46 92 M60 88 L62 92 M72 80 L76 74 M82 68 L86 62"/></g>
<g ${B}><ellipse cx="50" cy="48" rx="38" ry="31" fill="${lin([C.paper, "#E8DCBE"], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="49" rx="29" ry="23" fill="${lin(["#D8CDB0", "#EFE6D0"], "d")}"/></g>
<ellipse cx="50" cy="51" rx="23" ry="17" fill="${lin(["#F3EEDE", "#FFFDF4"], "d")}"/>
${hi(38, 42, 9, 3, -20, 0.5)}`,
  },
  {
    u: "1f951", n: "avocado",
    draw: ({ lin, rad }) => {
      const P = "M50 8 C62 8 64 24 70 34 C80 44 86 56 84 68 C82 84 68 92 50 92 C32 92 18 84 16 68 C14 56 20 44 30 34 C36 24 38 8 50 8Z";
      return `<g ${B}><path d="${P}" fill="${lin(["#5E8A48", "#3A6234"], "d")}"/></g>
<g ${B}><path d="${P}" transform="translate(8 11) scale(.84)" fill="${rad(["#F2F2A0", "#D2E27A", "#A6C65A"], 0.5, 0.6, 0.8)}"/></g>
<g ${B}><circle cx="50" cy="66" r="15" fill="${rad(["#C28A5A", "#8A5A32", "#5E3A20"], 0.36, 0.3, 0.85)}"/></g>
${hi(44, 60, 4, 6, 30, 0.4)}`;
    },
  },
  {
    u: "1f346", n: "eggplant",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="rotate(30 50 50)"><path d="M44 24 C44 36 36 42 30 54 C22 70 28 92 50 92 C72 92 78 70 70 54 C64 42 56 36 56 24Z" fill="${rad(["#B79AE0", "#7A55B4", "#46307E"], 0.34, 0.3, 0.9)}"/></g></g>
<g transform="rotate(30 50 50)">${hi(37, 66, 4.5, 12, 8, 0.38)}</g>
<g ${B}><g transform="rotate(30 50 50)"><path d="M34 26 C38 18 62 18 66 26 C64 34 58 36 50 42 C42 36 36 34 34 26Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/><path d="M46 20 C46 12 48 8 50 6 C52 8 54 12 54 20Z" fill="${C.greenD}"/></g></g>`,
  },
  {
    u: "1f954", n: "potato",
    draw: ({ lin, rad }) => `<g transform="translate(50 50) scale(1.12) translate(-53.5 -54)">
<g ${B}><path d="M20 42 C26 22 56 14 76 24 C92 32 94 58 86 72 C76 88 48 92 30 82 C12 72 14 52 20 42Z" fill="${rad(["#E8BE82", "#C48E56", "#8E5E34"], 0.34, 0.3, 0.9)}"/></g>
<g fill="#6B4324" opacity=".55"><ellipse cx="40" cy="46" rx="2.4" ry="1.6"/><ellipse cx="62" cy="40" rx="2.4" ry="1.6"/><ellipse cx="68" cy="66" rx="2.4" ry="1.6"/><ellipse cx="42" cy="72" rx="2.4" ry="1.6"/><ellipse cx="54" cy="58" rx="1.8" ry="1.2"/><ellipse cx="28" cy="62" rx="1.8" ry="1.2"/></g>
${hi(34, 36, 10, 4, -22, 0.3)}</g>`,
  },
  {
    u: "1f955", n: "carrot",
    draw: ({ lin }) => `<g transform="translate(-6 5)">
<g ${B}><g transform="rotate(40 50 50)"><path d="M46 28 C40 16 38 8 36 2 C42 8 46 14 48 22 C48 12 50 6 52 0 C54 8 54 16 52 24 C58 14 62 10 68 8 C64 16 58 22 54 28Z" fill="${lin([C.green, C.greenD])}"/></g></g>
<g ${B}><g transform="rotate(40 50 50)"><path d="M32 28 C32 18 68 18 68 28 C68 54 58 80 50 96 C42 80 32 54 32 28Z" fill="${lin(["#FBBE72", C.orange, "#D4742A"], "d")}"/></g></g>
<g transform="rotate(40 50 50)" fill="none" stroke="#B85A18" stroke-width="1.8" stroke-linecap="round" opacity=".5"><path d="M36 38 h8 M58 46 h6 M40 56 h7 M56 66 h5 M45 76 h6"/></g>
<g transform="rotate(40 50 50)">${hi(40, 44, 3, 12, 0, 0.35)}</g></g>`,
  },
  {
    u: "1f33d", n: "ear of corn",
    draw: ({ lin, clip }) => {
      const k = [];
      for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) k.push(`<circle cx="${(33 + c * 6.8 + (r % 2) * 3).toFixed(1)}" cy="${(14 + r * 8).toFixed(1)}" r="3.3" fill="#FFEFA0" opacity=".6"/>`);
      return `<g ${B}><g transform="rotate(30 50 50)"><path d="M50 6 C68 12 74 40 72 62 C70 78 60 84 50 84 C40 84 30 78 28 62 C26 40 32 12 50 6Z" fill="${lin(["#FFE06A", C.yellowM, "#D49828"], "h")}"/></g></g>
<g transform="rotate(30 50 50)">${k.join("")}</g>
<g ${B}><g transform="rotate(30 50 50)"><path d="M50 98 C26 94 14 74 22 46 C30 60 42 68 50 78Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/><path d="M50 98 C74 94 86 74 78 46 C70 60 58 68 50 78Z" fill="${lin([C.greenM, C.greenD], "d")}"/></g></g>`;
    },
  },
  {
    u: "1f336-fe0f", n: "hot pepper",
    draw: ({ lin }) => `
<g ${B}><path d="M26 26 C44 20 56 34 62 48 C68 62 80 70 94 72 C78 92 52 90 40 72 C28 54 14 42 26 26Z" fill="${lin(["#F58578", C.redM, C.redD], "d")}"/></g>
<path d="M32 34 C42 38 50 50 56 62" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".3"/>
<g ${B}><path d="M20 30 C18 20 26 14 34 18 C38 22 36 30 30 34 C26 36 22 34 20 30Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/>
<path d="M26 20 C26 12 22 8 14 6" fill="none" stroke="${C.greenD}" stroke-width="5" stroke-linecap="round"/></g>`,
  },
  {
    u: "1fad1", n: "bell pepper",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M50 26 C60 20 78 24 82 42 C86 62 78 86 62 88 C56 90 53 86 50 86 C47 86 44 90 38 88 C22 86 14 62 18 42 C22 24 40 20 50 26Z" fill="${rad(["#B2DC8E", "#6FAE55", "#3F7A3C"], 0.34, 0.3, 0.85)}"/></g>
<path d="M36 30 C28 46 30 70 40 86 M64 30 C72 46 70 70 60 86" fill="none" stroke="#2F6030" stroke-width="1.8" stroke-linecap="round" opacity=".4"/>
${hi(26, 48, 4.5, 11, 8, 0.35)}
<g ${B}><path d="M40 28 C40 24 60 24 60 28 C58 34 42 34 40 28Z" fill="${lin([C.greenM, C.greenD])}"/>
<path d="M50 26 C50 16 54 10 62 8" fill="none" stroke="${C.greenD}" stroke-width="6" stroke-linecap="round"/></g>`,
  },
  {
    u: "1f952", n: "cucumber",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-35 50 50)"><rect x="5" y="36" width="90" height="28" rx="13" fill="${lin(["#8FC070", "#5E9A4A", "#3A6E34"])}"/></g></g>
<g transform="rotate(-35 50 50)"><rect x="16" y="41" width="68" height="4" rx="2" fill="#D2EAA8" opacity=".5"/>
<g fill="#2F5A30" opacity=".45"><circle cx="24" cy="54" r="1.4"/><circle cx="38" cy="58" r="1.4"/><circle cx="52" cy="54" r="1.4"/><circle cx="66" cy="58" r="1.4"/><circle cx="78" cy="54" r="1.4"/><circle cx="31" cy="49" r="1.2"/><circle cx="59" cy="49" r="1.2"/></g></g>
<g ${Bs}><g transform="rotate(-35 50 50)"><rect x="90" y="44" width="8" height="12" rx="3" fill="${lin([C.green, C.greenD])}"/></g></g>`,
  },
  {
    u: "1f96c", n: "leafy green",
    draw: ({ lin }) => {
      const leafD = "M50 6 C80 18 86 52 66 70 C60 76 54 80 50 90 C46 80 40 76 34 70 C14 52 20 18 50 6Z";
      const g = (r, c) => `<g ${B}><g transform="rotate(${r} 50 90) translate(50 90) scale(.88) translate(-50 -90)"><path d="${leafD}" fill="${lin(c, "d")}"/></g></g>`;
      return `${g(-27, ["#A8D08A", "#6FA263", "#487745"])}${g(27, ["#A8D08A", "#6FA263", "#487745"])}${g(0, ["#C6E4A4", "#8CC070", "#4F8A46"])}
<path d="M50 14 V84 M50 40 L36 26 M50 40 L64 26 M50 58 L34 44 M50 58 L66 44" fill="none" stroke="#EAF6CE" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
<g ${B}><path d="M42 80 H58 L56 94 H44Z" fill="${lin([C.paper, "#CFE0A8"])}"/></g>`;
    },
  },
  {
    u: "1f966", n: "broccoli",
    draw: ({ lin, rad }) => {
      const pts = [[28, 48], [72, 48], [50, 30], [38, 54], [62, 54]];
      const sh = ["#9CCB84", "#5E9A4A", "#35693A"];
      return `<g ${B}><path d="M38 60 H62 L66 94 H34Z" fill="${lin(["#D8EBB0", "#A8CE80"], "h")}"/></g>
<g ${B}>${ber(rad, sh, pts, 17)}</g>
<g fill="#CFE8B0" opacity=".4"><circle cx="24" cy="42" r="2.2"/><circle cx="34" cy="50" r="2.2"/><circle cx="46" cy="24" r="2.2"/><circle cx="58" cy="34" r="2.2"/><circle cx="72" cy="42" r="2.2"/><circle cx="64" cy="54" r="2.2"/><circle cx="44" cy="56" r="2.2"/></g>
${hi(40, 22, 7, 3, -30, 0.3)}`;
    },
  },
  {
    u: "1f9c4", n: "garlic",
    draw: ({ lin, rad }) => `
<g ${Bs}><path d="M44 89 C42 92 40 94 38 94.5 M50 90 V95 M56 89 C58 92 60 94 62 94.5" fill="none" stroke="${C.creamD}" stroke-width="2.4" stroke-linecap="round"/></g>
${bulb(lin, rad, ["#FFFDF4", C.paper, "#E4D7B8", "#C9B88E"], "M50 6 C53 22 58 28 69 34 C86 44 90 68 76 82 C68 90 58 92 50 92 C42 92 32 90 24 82 C10 68 14 44 31 34 C42 28 47 22 50 6Z", "M50 28 C34 46 34 72 44 90 M50 28 C66 46 66 72 56 90 M50 28 V90", "#B49C70", 0.6)}
<path d="M30 52 C28 64 32 76 38 84 M70 52 C72 64 68 76 62 84" fill="none" stroke="#C6A0C0" stroke-width="2.4" stroke-linecap="round" opacity=".45"/>
${hi(33, 52, 3.5, 10, 12, 0.5)}`,
  },
  {
    u: "1f9c5", n: "onion",
    draw: ({ lin, rad }) => `
<g ${Bs}><path d="M44 87 C42 91 40 93 38 94 M50 88 V95 M56 87 C58 91 60 93 62 94" fill="none" stroke="${C.creamD}" stroke-width="2.4" stroke-linecap="round"/></g>
${bulb(lin, rad, ["#F8D48A", "#DDA054", "#A8672E"], "M50 10 C54 22 56 26 66 32 C88 42 92 68 74 80 C66 87 58 88 50 88 C42 88 34 87 26 80 C8 68 12 42 34 32 C44 26 46 22 50 10Z", "M50 30 C32 44 30 72 44 86 M50 30 C68 44 70 72 56 86 M50 30 C42 50 42 72 50 87 M50 30 C58 50 58 72 50 87", "#8A4E1E", 0.45)}
<g ${Bs}><path d="M47 16 C44 10 46 6 52 5 C52 10 54 14 53 18Z" fill="${lin(["#E8D8A8", "#C9A862"])}"/></g>
${hi(30, 52, 4, 11, 14, 0.38)}`,
  },
  {
    u: "1f95c", n: "peanuts",
    draw: ({ lin, clip }) => {
      const pod = "M8 50 C8 34 22 28 34 34 C42 38 44 40 50 40 C56 40 58 38 66 34 C78 28 92 34 92 50 C92 66 78 72 66 66 C58 62 56 60 50 60 C44 60 42 62 34 66 C22 72 8 66 8 50Z";
      const t = (x, y) => `translate(${x} ${y}) rotate(-35) scale(.85) translate(-50 -50)`;
      const net = "M20 40 l8 8 m6 -10 l8 8 m6 -10 l8 8 m6 -10 l8 8 M20 54 l8 8 m6 -10 l8 8 m6 -10 l8 8 m6 -10 l8 8";
      const one = (x, y) => `<g ${B}><path transform="${t(x, y)}" d="${pod}" fill="${lin(["#F0D49A", "#D6AC68", "#B07F40"], "d")}"/></g>
<path transform="${t(x, y)}" d="${net}" fill="none" stroke="#8A5E2A" stroke-width="1.3" opacity=".4"/>`;
      return `${one(40, 34)}${one(60, 66)}`;
    },
  },
  {
    u: "1fad8", n: "beans",
    draw: ({ lin, rad }) => {
      const bean = (x, y, r, s = 1) => `<g ${B}><g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-27 2 C-30 -12 -14 -20 4 -17 C22 -14 30 -4 24 8 C20 16 8 14 2 8 C-4 4 -8 10 -12 16 C-20 22 -26 14 -27 2Z" fill="${rad(["#D97A62", "#A24432", "#702A22"], 0.35, 0.3, 0.9)}"/></g></g>
<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${hi(-8, -9, 10, 3, -10, 0.35)}<ellipse cx="2" cy="7" rx="5" ry="1.8" fill="${C.paper}" opacity=".8"/></g>`;
      return `${bean(40, 34, -20)}${bean(62, 58, 15)}${bean(36, 74, -5, 0.95)}`;
    },
  },
  {
    u: "1f330", n: "chestnut",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M50 12 C58 14 62 24 74 34 C88 46 88 70 74 82 C66 90 34 90 26 82 C12 70 12 46 26 34 C38 24 42 14 50 12Z" fill="${rad(["#C98650", "#8E5530", "#5A3018"], 0.36, 0.3, 0.9)}"/></g>
<path d="M30 40 C26 56 30 72 36 84 M46 24 C42 44 42 66 46 86 M64 30 C68 50 68 70 62 86" fill="none" stroke="#3A1C0C" stroke-width="1.6" stroke-linecap="round" opacity=".28"/>
<g ${B}><path d="M24 80 C30 72 70 72 76 80 C70 94 30 94 24 80Z" fill="${lin(["#F0D49A", "#CFA464"])}"/></g>
<g ${Bs}><path d="M45 14 C46 8 50 6 55 8 C54 14 52 16 50 17Z" fill="${C.darkD}"/></g>
${hi(32, 48, 4.5, 10, 20, 0.35)}`,
  },
  {
    u: "1fada", n: "ginger root",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M10 62 C4 50 14 40 26 44 C28 30 42 26 48 36 C52 22 68 18 74 30 C82 22 96 28 92 44 C98 54 92 66 82 64 C80 76 62 80 56 72 C50 84 32 82 30 72 C20 76 8 72 10 62Z" fill="${rad(["#F2D898", "#CFA866", "#9A7236"], 0.34, 0.3, 0.9)}"/></g>
<g fill="none" stroke="#7A5424" stroke-width="1.6" stroke-linecap="round" opacity=".5"><path d="M22 58 C26 52 30 52 34 58 M42 56 C46 48 50 48 54 54 M62 52 C66 44 72 44 76 50 M70 66 C74 60 78 60 82 64"/></g>
<g ${Bs}><ellipse cx="88" cy="40" rx="6" ry="8" transform="rotate(20 88 40)" fill="${lin(["#FFF0B0", "#F2D060"], "d")}"/></g>
${hi(34, 44, 8, 3, -20, 0.35)}`,
  },
  {
    u: "1fadb", n: "pea pod",
    draw: ({ lin, rad }) => `
<g ${B}><g transform="translate(3 12) rotate(-25 50 50)"><path d="M4 40 C10 76 90 76 96 40 C82 34 18 34 4 40Z" fill="${lin([C.greenM, C.greenD])}"/>
<path d="M96 40 C100 32 100 26 96 20" fill="none" stroke="${C.greenD}" stroke-width="4.4" stroke-linecap="round"/></g></g>
<g transform="translate(3 12) rotate(-25 50 50)"><ellipse cx="50" cy="41" rx="42" ry="7" fill="#E4F2B8"/></g>
<g ${B}><g transform="translate(3 12) rotate(-25 50 50)">${ber(rad, ["#D6EEA0", "#98C860", "#5E9A3A"], [[20, 40], [39, 40], [58, 40], [77, 40]], 10.5)}</g></g>
<g transform="translate(3 12) rotate(-25 50 50)">${hi(17, 36, 3, 2, 0, 0.55)}${hi(36, 36, 3, 2, 0, 0.55)}${hi(55, 36, 3, 2, 0, 0.55)}${hi(74, 36, 3, 2, 0, 0.55)}</g>`,
  },
  {
    u: "1f344-200d-1f7eb", n: "brown mushroom",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M38 60 C40 72 38 82 33 90 C44 94 56 94 67 90 C62 82 60 72 62 60Z" fill="${lin(["#E8D8B4", "#C9B488", "#A8905E"], "h")}"/></g>
<g ${B}><path d="M8 58 C8 28 28 12 50 12 C72 12 92 28 92 58 C92 66 76 68 50 68 C24 68 8 66 8 58Z" fill="${rad(["#D09A66", "#A86E3E", "#6E4326"], 0.34, 0.28, 0.9)}"/></g>
<path d="M12 60 C30 68 70 68 88 60" fill="none" stroke="#E8D0A0" stroke-width="3" stroke-linecap="round" opacity=".6"/>
<g fill="#E8C896" opacity=".5"><ellipse cx="36" cy="30" rx="6" ry="3.4" transform="rotate(-25 36 30)"/><ellipse cx="62" cy="26" rx="4" ry="2.4"/><ellipse cx="74" cy="44" rx="4" ry="2.4"/><ellipse cx="46" cy="48" rx="3.4" ry="2"/></g>`,
  },
  {
    u: "1fadc", n: "root vegetable",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M48 38 C40 26 34 18 24 12 C36 10 46 18 50 32Z" fill="${lin([C.green, C.greenD], "d")}"/>
<path d="M52 38 C60 26 68 16 80 12 C72 24 66 32 56 40Z" fill="${lin([C.greenM, C.greenD], "d")}"/></g>
${stem("M50 40 C50 28 50 18 48 8", 3.6, "#B84A6A")}
<g ${B}><path d="M50 36 C74 34 90 50 86 66 C82 82 64 88 54 90 C52 94 52 96 50 98 C48 96 48 94 46 90 C36 88 18 82 14 66 C10 50 26 34 50 36Z" fill="${rad(["#E57C9E", "#B8426C", "#7A2848"], 0.34, 0.3, 0.9)}"/></g>
<path d="M22 56 C36 52 64 52 78 56 M20 70 C36 66 64 66 80 70" fill="none" stroke="#F4B8CC" stroke-width="1.4" opacity=".4"/>
${hi(30, 54, 5, 10, 20, 0.35)}`,
  },
];
