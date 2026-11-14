// Hearts, emotion marks, balloons.
import { B, Bs, C, star } from "../kit.mjs";
import { drop, heartPath, HEART } from "../facekit.mjs";
import { label, ink } from "../symkit.mjs";

const T = {
  red: ["#F58A80", C.redM, C.redD],
  pink: ["#FDDCE3", C.pink, C.pinkD],
  orange: ["#FAC07E", "#EE963F", C.orangeD],
  yellow: ["#FDE690", C.yellowM, C.yellowD],
  green: ["#B4D7A4", C.greenM, C.greenD],
  blue: ["#A9C1EE", C.blueM, C.blueD],
  sky: ["#DCEFFA", "#93C4E2", "#5FA3CF"],
  purple: ["#C8B4EA", "#9478CC", C.purpleD],
  brown: [C.woodL, C.wood, C.woodD],
  black: ["#8A7D85", C.dark, C.darkD],
  grey: ["#DDE1E8", "#A3AAB8", "#707888"],
  white: [C.paper, C.creamD, "#B8A77E"],
};

/** The one heart: gradient + big bevel + soft highlight. */
const heart = ({ lin }, tone, cx = 50, cy = 51, size = 86, rot = 0) => {
  const k = size / 86;
  const hx = cx - 21 * k, hy = cy - 20 * k;
  return `<g ${B}><g transform="rotate(${rot} ${cx} ${cy})"><path d="${heartPath(cx, cy, size)}" fill="${lin(tone, "d")}"/></g></g><ellipse cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" rx="${(9 * k).toFixed(1)}" ry="${(4.6 * k).toFixed(1)}" fill="#fff" opacity=".42" transform="rotate(${-35 + rot} ${hx.toFixed(1)} ${hy.toFixed(1)})"/>`;
};
const plain = (tone) => (t) => heart(t, tone);

const sparkle = (x, y, R, fill) => `<g ${Bs}><polygon points="${star(x, y, R, R * 0.3, 4)}" fill="${fill}" stroke="${fill}" stroke-width="2" stroke-linejoin="round"/></g>`;
const sw = (d, w, color) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Balloon family: rounded body + tail, one bevel group. */
const balloon = ({ lin }, { tone = [C.paper, "#D3DDF0", "#9FB0D2"], tail = "bl", x = 8, y = 12, w = 84, h = 58, rx = 22 } = {}) => {
  const tails = {
    bl: `M${x + 16} ${y + h - 6} L${x + 10} ${y + h + 20} L${x + 40} ${y + h - 6}Z`,
    br: `M${x + w - 16} ${y + h - 6} L${x + w - 10} ${y + h + 20} L${x + w - 40} ${y + h - 6}Z`,
    l: `M${x + 6} ${y + 16} L${x - 6} ${y + h / 2 + 2} L${x + 8} ${y + 40}Z`,
  };
  return `<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${lin(tone, "d")}"/><path d="${tails[tail]}" fill="${lin(tone, "d")}"/></g>`;
};

const burst = (cx, cy, n, R, r, rot = 0) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = rot + (i * Math.PI) / n;
    const q = i % 2 ? r : R * (i % 4 === 0 ? 1 : 0.84);
    return `${(cx + q * Math.cos(a)).toFixed(1)},${(cy + q * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

export default [
  { u: "1f48c", n: "love letter", draw: ({ lin }) =>
    `<g ${B}><rect x="8" y="20" width="84" height="60" rx="7" fill="${lin(["#FDDCE3", C.pink, C.pinkD], "d")}"/></g>` +
    `<g ${Bs}><path d="M12 25 L50 56 L88 25" fill="none" stroke="${C.pinkD}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>` +
    sw("M12 76 L38 50 M88 76 L62 50", 3, C.pinkD) +
    `<g ${Bs}><path d="${heartPath(50, 54, 28)}" fill="${lin(T.red, "d")}"/></g>` },

  { u: "1f498", n: "heart with arrow", draw: (t) =>
    heart(t, T.red) +
    `<g ${Bs}>${sw("M86 14 L22 78", 4.5, C.wood)}<path d="M12 88 L18 66 L34 82Z" fill="${t.lin([C.metalL, C.metal, C.metalD], "d")}" stroke="${C.metal}" stroke-width="2" stroke-linejoin="round"/>` +
    `<path d="M80 12 L92 8 L88 20Z M74 20 L90 22 L86 34Z" fill="${C.paper}" stroke="${C.creamD}" stroke-width="1.5" stroke-linejoin="round" transform="translate(-4 4)"/></g>` },

  { u: "1f49d", n: "heart with ribbon", draw: (t) => {
    const g = t.lin([C.gold, C.goldM, C.goldD], "d");
    return heart(t, T.red, 50, 54, 82) +
      `<g ${Bs}><path d="M50 28 C38 8 18 16 30 30Z M50 28 C62 8 82 16 70 30Z" fill="${g}"/><path d="M47 28 L36 52 L46 48 L50 40Z M53 28 L64 52 L54 48 L50 40Z" fill="${g}"/><circle cx="50" cy="28" r="6" fill="${t.lin([C.gold, C.goldD])}"/></g>`;
  } },

  { u: "1f496", n: "sparkling heart", draw: (t) =>
    heart(t, T.pink, 44, 57, 72) + sparkle(78, 22, 17, C.gold) + sparkle(88, 52, 9, C.goldM) + sparkle(16, 24, 10, C.goldM) },

  { u: "1f497", n: "growing heart", draw: (t) =>
    heart(t, T.pink, 50, 62, 62) +
    sw("M18 36 L11 29 M14 52 L7 52 M22 20 L19 12 M82 36 L89 29 M86 52 L93 52 M78 20 L81 12", 4.5, C.pinkD) },

  { u: "1f493", n: "beating heart", draw: (t) =>
    heart(t, T.red, 50, 62, 64) +
    sw("M16 32 L9 25 M12 50 L6 50 M24 18 L21 10 M84 32 L91 25 M88 50 L94 50 M76 18 L79 10", 4.5, C.redM) },

  { u: "1f49e", n: "revolving hearts", draw: (t) =>
    sw("M12 56 C10 32 30 14 50 18", 4, C.pinkD) + sw("M88 44 C90 68 70 86 50 82", 4, C.pinkD) +
    heart(t, T.pink, 32, 34, 40, -12) + heart(t, T.red, 67, 66, 46, 12) },

  { u: "1f495", n: "two hearts", draw: (t) =>
    heart(t, T.pink, 36, 62, 60, -10) + heart(t, T.red, 68, 34, 50, 12) },

  { u: "1f49f", n: "heart decoration", draw: ({ lin }) =>
    `<g ${B}><rect x="17" y="17" width="66" height="66" rx="14" transform="rotate(45 50 50)" fill="${lin(T.purple, "d")}"/></g>` +
    `<g ${Bs}><path d="${heartPath(50, 52, 42)}" fill="${lin([C.paper, C.cream, C.creamD], "d")}"/></g>` },

  { u: "2763-fe0f", n: "heart exclamation", draw: (t) =>
    `<g ${B}><path d="M36 10 H64 C65 38 58 48 54 58 H46 C42 48 35 38 36 10Z" fill="${t.lin(T.red)}" stroke="${C.redM}" stroke-width="6" stroke-linejoin="round"/></g>` +
    heart(t, T.red, 50, 79, 32) },

  { u: "1f494", n: "broken heart", draw: ({ lin, clip }) => {
    const p = `<path d="${heartPath(50, 51, 80)}" fill="${lin(T.red, "d")}"/>`;
    const L = clip(`<polygon points="0,0 52,0 52,8 44,26 56,42 45,58 54,72 48,100 0,100"/>`);
    const R = clip(`<polygon points="52,0 100,0 100,100 48,100 54,72 45,58 56,42 44,26 52,8"/>`);
    return `<g ${B}><g transform="translate(-3 1) rotate(-5 40 80)"><g ${L}>${p}</g></g></g><g ${B}><g transform="translate(4 3) rotate(5 60 80)"><g ${R}>${p}</g></g></g>`;
  } },

  { u: "2764-fe0f-200d-1f525", n: "heart on fire", draw: ({ lin, rad }) =>
    heart({ lin }, T.red, 50, 62, 70) +
    `<g ${B}><path d="M50 4 C57 18 72 24 68 42 C66 54 58 60 50 60 C42 60 34 54 33 43 C32 34 38 28 42 22 C44 28 46 30 49 30 C48 22 46 14 50 4Z" fill="${lin(["#FBE08A", C.orange, "#E0602E"])}"/></g>` +
    `<path d="M50 34 C55 42 60 46 57 53 C56 58 53 60 50 60 C46 60 43 57 43 53 C43 47 48 44 50 34Z" fill="${C.paper}" opacity=".75"/>` },

  { u: "2764-fe0f-200d-1fa79", n: "mending heart", draw: ({ lin }) => {
    const t = { lin };
    return heart(t, T.red) +
      `<g ${Bs}><g transform="rotate(-40 50 52)"><rect x="17" y="42" width="66" height="20" rx="10" fill="${lin(["#FBE6C8", "#EDC796", "#D9A672"])}"/><rect x="38" y="42" width="24" height="20" fill="${lin(["#FFF4DC", "#F3DDB4"])}"/></g></g>` +
      `<g transform="rotate(-40 50 52)" fill="#B98558"><circle cx="26" cy="49" r="1.6"/><circle cx="26" cy="55" r="1.6"/><circle cx="74" cy="49" r="1.6"/><circle cx="74" cy="55" r="1.6"/><circle cx="31" cy="52" r="1.6"/><circle cx="69" cy="52" r="1.6"/></g>`;
  } },

  { u: "2764-fe0f", n: "red heart", draw: plain(T.red) },
  { u: "1fa77", n: "pink heart", draw: plain(T.pink) },
  { u: "1f9e1", n: "orange heart", draw: plain(T.orange) },
  { u: "1f49b", n: "yellow heart", draw: plain(T.yellow) },
  { u: "1f49a", n: "green heart", draw: plain(T.green) },
  { u: "1f499", n: "blue heart", draw: plain(T.blue) },
  { u: "1fa75", n: "light blue heart", draw: plain(T.sky) },
  { u: "1f49c", n: "purple heart", draw: plain(T.purple) },
  { u: "1f90e", n: "brown heart", draw: plain(T.brown) },
  { u: "1f5a4", n: "black heart", draw: plain(T.black) },
  { u: "1fa76", n: "grey heart", draw: plain(T.grey) },
  { u: "1f90d", n: "white heart", draw: plain(T.white) },

  { u: "1f48b", n: "kiss mark", draw: ({ lin }) =>
    `<g ${B}><g transform="translate(0 -7) rotate(-12 50 54)"><path d="M8 52 C18 34 36 32 44 40 C47 37 53 37 56 40 C64 32 82 34 92 52 C75 58 25 58 8 52Z" fill="${lin(["#F58A80", C.redM, C.redD])}"/><path d="M8 52 C25 58 75 58 92 52 C88 72 68 82 50 82 C32 82 12 72 8 52Z" fill="${lin(["#F28B7F", C.redM, "#B83C3A"])}"/></g></g>` +
    `<path d="M12 53 C30 59 70 59 88 53" transform="translate(0 -7) rotate(-12 50 54)" fill="none" stroke="${C.redD}" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="38" cy="61" rx="9" ry="3.4" fill="#fff" opacity=".35" transform="rotate(-20 38 61)"/>` },

  { u: "1f4af", n: "hundred points", draw: ({ lin }) =>
    `<g ${Bs}><g transform="rotate(-6 50 50)">${label("100", { cy: 42, h: 38, maxW: 80, sw: 9, color: C.redM })}${sw("M18 72 H82", 5.5, C.redM)}${sw("M24 85 H76", 5.5, C.redM)}</g></g>` },

  { u: "1f4a2", n: "anger symbol", draw: ({ lin }) => {
    const g = lin(["#F58A80", C.redM, C.redD], "d");
    const arc = (a, b) => `<path d="M${a[0]} ${a[1]} C${b[0]} ${a[1]} ${b[0]} ${a[1]} ${b[0]} ${b[1]}" fill="none"/>`;
    const q = (sx, sy) => `<path d="M${50 + sx * 40} ${50 + sy * 8} C${50 + sx * 14} ${50 + sy * 10} ${50 + sx * 8} ${50 + sy * 16} ${50 + sx * 8} ${50 + sy * 40}" fill="none" stroke="${g}" stroke-width="11" stroke-linecap="round"/>`;
    return `<g ${Bs}>${q(-1, -1)}${q(1, -1)}${q(-1, 1)}${q(1, 1)}</g>`;
  } },

  { u: "1f4a5", n: "collision", draw: ({ lin }) =>
    `<g ${B}><polygon points="${burst(50, 50, 11, 46, 25, 0.2)}" fill="${lin(["#F58A60", "#E0602E", C.redD], "d")}" stroke="#E0602E" stroke-width="3" stroke-linejoin="round"/></g>` +
    `<g ${Bs}><polygon points="${burst(50, 50, 11, 30, 15, 0.2)}" fill="${lin([C.paper, C.gold, C.goldM], "d")}" stroke="${C.gold}" stroke-width="3" stroke-linejoin="round"/></g>` },

  { u: "1f4ab", n: "dizzy", draw: ({ lin }) =>
    `<g ${Bs}>${sw("M10 72 C8 46 24 28 42 26", 7, lin([C.goldD, C.goldM, C.gold], "d"))}</g>` +
    `<g ${B}><polygon points="${star(58, 48, 32, 15)}" fill="${lin([C.yellow, C.gold, C.goldD], "d")}" stroke="${C.gold}" stroke-width="5" stroke-linejoin="round"/></g>` +
    sparkle(20, 16, 11, C.goldM) + sparkle(86, 86, 9, C.goldM) },

  { u: "1f4a6", n: "sweat droplets", draw: (t) =>
    drop(t, 36, 56, { s: 2.9 }) + drop(t, 76, 32, { s: 1.9 }) + drop(t, 74, 78, { s: 1.6 }) },

  { u: "1f4a8", n: "dashing away", draw: ({ lin }) => {
    const g = lin([C.paper, "#C9D4E6", "#8E9DBC"], "d");
    return `<g ${Bs}>${sw("M10 34 H34", 6, "#9FB0D2")}${sw("M6 51 H40", 6, "#9FB0D2")}${sw("M12 68 H34", 6, "#9FB0D2")}</g>` +
      `<g ${B}><circle cx="68" cy="30" r="15" fill="${g}"/><circle cx="80" cy="50" r="15" fill="${g}"/><circle cx="66" cy="71" r="16" fill="${g}"/><circle cx="58" cy="48" r="17" fill="${g}"/></g>`;
  } },

  { u: "1f573-fe0f", n: "hole", draw: ({ lin, rad }) =>
    `<g ${B}><ellipse cx="50" cy="52" rx="44" ry="31" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>` +
    `<ellipse cx="50" cy="53" rx="33" ry="21" fill="${rad(["#6B5E66", C.darkD, "#2B2429"], 0.5, 0.35, 0.7)}"/>` +
    `<path d="M20 60 C30 76 70 76 80 60" fill="none" stroke="${C.woodL}" stroke-width="2" opacity=".6" stroke-linecap="round"/>` },

  { u: "1f4ac", n: "speech balloon", draw: (t) =>
    balloon(t) + `<g ${Bs}><circle cx="30" cy="41" r="5.5" fill="${C.blueM}"/><circle cx="50" cy="41" r="5.5" fill="${C.blueM}"/><circle cx="70" cy="41" r="5.5" fill="${C.blueM}"/></g>` },

  { u: "1f441-fe0f-200d-1f5e8-fe0f", n: "eye in speech bubble", draw: (t) =>
    balloon(t, { tone: ["#BFD2F4", C.blueM, C.blueD] }) +
    `<g ${Bs}><path d="M20 41 C32 24 68 24 80 41 C68 58 32 58 20 41Z" fill="${C.paper}"/></g>` +
    `<circle cx="50" cy="41" r="10" fill="${t.lin([C.blue, C.navy, C.navyD], "d")}"/><circle cx="50" cy="41" r="4.5" fill="${C.darkD}"/><circle cx="47" cy="38" r="2" fill="#fff" opacity=".85"/>` },

  { u: "1f5e8-fe0f", n: "left speech bubble", draw: (t) =>
    balloon(t, { tone: ["#DDE1E8", "#A3AAB8", "#707888"], tail: "l", x: 14, y: 20, w: 80 }) +
    sw("M32 42 H76", 5, C.paper) + sw("M32 56 H62", 5, C.paper) },

  { u: "1f5ef-fe0f", n: "right anger bubble", draw: ({ lin }) => {
    const pts = Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2, o = i % 2 ? 0.86 : 1;
      return `${(49 + 41 * o * Math.cos(a)).toFixed(1)},${(42 + 33 * o * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    return `<g ${B}><polygon points="${pts}" fill="${lin([C.paper, "#D3DDF0", "#9FB0D2"], "d")}" stroke="#D3DDF0" stroke-width="3" stroke-linejoin="round"/><path d="M62 66 L90 94 L76 58Z" fill="${lin(["#D3DDF0", "#9FB0D2"], "d")}" stroke="#9FB0D2" stroke-width="2" stroke-linejoin="round"/></g>` +
      sw("M33 36 L43 30 L51 38 L61 30 L69 36", 4, C.redM);
  } },

  { u: "1f4ad", n: "thought balloon", draw: ({ lin }) => {
    const g = lin([C.paper, "#D3DDF0", "#9FB0D2"], "d");
    return `<g ${B}><circle cx="30" cy="36" r="20" fill="${g}"/><circle cx="52" cy="26" r="21" fill="${g}"/><circle cx="74" cy="38" r="19" fill="${g}"/><circle cx="62" cy="52" r="18" fill="${g}"/><circle cx="38" cy="54" r="17" fill="${g}"/><ellipse cx="52" cy="42" rx="34" ry="22" fill="${g}"/></g>` +
      `<g ${B}><circle cx="24" cy="76" r="8" fill="${g}"/><circle cx="12" cy="90" r="5" fill="${g}"/></g>`;
  } },

  { u: "1f4a4", n: "ZZZ", draw: ({ lin }) => {
    const g = lin([C.blue, C.blueM, C.blueD], "d");
    const z = (cx, cy, h) => label("Z", { cx, cy, h, sw: h * 0.24, color: g });
    return `<g ${Bs}>${z(72, 30, 34)}${z(42, 62, 26)}${z(18, 84, 15)}</g>`;
  } },
];
