// animals_nature-1: mammals (monkeys, dogs, cats, big cats, horses, cattle)
import { B, Bs, C } from "../kit.mjs";

const eye = (x, y, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${+(3.4 * s).toFixed(2)}" ry="${+(4.2 * s).toFixed(2)}" fill="${C.darkD}"/><circle cx="${+(x - 1.1 * s).toFixed(2)}" cy="${+(y - 1.5 * s).toFixed(2)}" r="${+(1.1 * s).toFixed(2)}" fill="#fff"/>`;
const blush = (x, y, r = 5) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="${C.pinkD}" opacity=".32"/>`;
const nose = (x, y, w = 5, c = C.darkD) =>
  `<path d="M${x - w} ${y} Q${x} ${y - w * 0.5} ${x + w} ${y} Q${x} ${y + w * 1.2} ${x - w} ${y}Z" fill="${c}"/>`;
const smile = (x, y, w = 7, c = C.darkD) =>
  `<path d="M${x - w} ${y} Q${x - w / 2} ${y + w * 0.7} ${x} ${y} Q${x + w / 2} ${y + w * 0.7} ${x + w} ${y}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>`;
const whisk = (x, y, d, c) =>
  [-5, 3].map((dy) => `<path d="M${x} ${y} L${x + d * 17} ${y + dy * 1.4}" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`).join("");
const mir = (s) => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;

// generic side-view quadruped facing left
function quad(t, o) {
  const { lin, clip } = t;
  const fur = o.fur;
  const bx = o.bx ?? 27, by = o.by ?? 36, bw = o.bw ?? 58, bh = o.bh ?? 29;
  const lw = o.lw ?? 9, lt = by + bh - 8, gy = o.gy ?? 86;
  const hx = o.hx ?? 22, hy = o.hy ?? 38;
  const lc = o.leg ?? fur[1], far = o.far ?? fur[fur.length - 1];
  const leg = (x, c) =>
    `<rect x="${x}" y="${lt}" width="${lw}" height="${gy - lt}" rx="${lw / 2}" fill="${c}"/>` +
    (o.hoof ? `<rect x="${x}" y="${gy - 5}" width="${lw}" height="5" rx="2" fill="${o.hoof}"/>` : "");
  const fx = bx + 4, hxx = bx + bw - lw - 4;
  const sn = o.sn ?? [C.cream, C.creamD];
  const f = lin(fur, "d");
  const neck = o.neck ?? `<ellipse cx="${bx + 6}" cy="${by + 11}" rx="13" ry="15" fill="${f}"/>`;
  const head =
    o.head ??
    `<g ${B}><ellipse cx="${hx}" cy="${hy}" rx="${o.hrx ?? 13}" ry="${o.hry ?? 11.5}" fill="${lin(o.hf ?? fur)}"/></g>
<g ${B}><ellipse cx="${hx - 10}" cy="${hy + 6}" rx="${o.srx ?? 8}" ry="${o.sry ?? 6.3}" fill="${lin(sn)}"/></g>
<ellipse cx="${hx - 15.5}" cy="${hy + 4.5}" rx="2.5" ry="1.9" fill="${o.nc ?? C.darkD}"/>${eye(hx - 1, hy - 3, 0.68)}`;
  return `<g transform="translate(0 ${o.dy ?? 0})">${o.back ?? ""}
<g ${B}>${leg(fx + 10, far)}${leg(hxx - 10, far)}</g>
<g ${B}>${neck}<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${bh / 2}" fill="${f}"/></g>
${o.deco ? `<g ${clip(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${bh / 2}"/>`)}>${o.deco}</g>` : ""}
<g ${B}>${leg(fx, lc)}${leg(hxx, lc)}</g>
${o.pre ?? ""}${head}${o.post ?? ""}</g>`;
}

const tailUp = (c, w = 6, d = "M84 46 Q95 40 92 24") =>
  `<g ${Bs}><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/></g>`;
const ear = (x, y, rx, ry, rot, c) =>
  `<g ${B}><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="${c}"/></g>`;

// ---- dog family
const DOGF = [C.woodL, C.wood, "#B27A45"];
function dogSide(t, extra = "", fur = DOGF, earc = C.woodD) {
  return quad(t, {
    fur, far: "#A5703F", sn: [C.cream, C.creamD], dy: -4, bx: 27, bw: 56, by: 40, bh: 26, hy: 40, hx: 22,
    back: tailUp(fur[1], 6.5, "M82 48 Q93 42 91 28"),
    post: `${ear(30, 42, 5.5, 10, 12, earc)}${extra}`,
  });
}

function dogFace(t, { fur = [C.woodL, "#D9A670"], earc = [C.wood, C.woodD], collar = "" } = {}) {
  const { lin } = t;
  const ears = [0, 1].map((i) => {
    const p = `<path d="M24 26 C6 26 4 62 12 74 C24 80 32 58 32 38Z" fill="${lin(earc)}"/>`;
    return `<g ${B}>${i ? mir(p) : p}</g>`;
  }).join("");
  return `${ears}
<g ${B}><ellipse cx="50" cy="52" rx="33" ry="32" fill="${lin(fur, "d")}"/></g>
<ellipse cx="66" cy="44" rx="11" ry="12" fill="${C.woodD}" opacity=".5"/>
<g ${B}><ellipse cx="50" cy="66" rx="17" ry="14" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(37, 45)}${eye(63, 45)}${blush(25, 62)}${blush(75, 62)}
<ellipse cx="50" cy="58" rx="7" ry="5" fill="${C.darkD}"/><ellipse cx="48" cy="56.4" rx="2" ry="1.1" fill="#fff" opacity=".6"/>
<path d="M50 63 V68 M50 68 Q44 74 39 70 M50 68 Q56 74 61 70" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>
<g ${Bs}><path d="M45 71 Q50 84 55 71Z" fill="${lin([C.pink, C.pinkD])}"/></g>${collar}`;
}

// ---- cat family
function catSide(t, fur, stripes = "", extra = {}) {
  return quad(t, {
    fur, far: fur[2], bx: 27, bw: 54, by: 42, bh: 25, lw: 8, hx: 22, hy: 38, hrx: 12.5, hry: 11, srx: 5.5, sry: 4.5,
    sn: extra.sn ?? [fur[0], fur[1]], nc: C.pinkD,
    back: `<g ${Bs}><path d="M80 56 C98 54 96 34 86 28" fill="none" stroke="${fur[1]}" stroke-width="7" stroke-linecap="round"/></g>`,
    pre: `<g ${B}><path d="M14 33 L12 14 Q13 11 16 12 L26 26Z" fill="${fur[1]}"/><path d="M28 28 L34 12 Q36 10 38 12 L38 34Z" fill="${fur[1]}"/></g>
<path d="M15 28 L14.5 18 L21 26Z M31 26 L34.5 17 L35 28Z" fill="${C.pinkD}" opacity=".55"/>`,
    deco: stripes,
    post: extra.post ?? "",
  });
}
const tabbyStripes = (c) =>
  [38, 47, 56, 65].map((x) => `<path d="M${x} 36 Q${x + 4} 46 ${x - 1} 56" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`).join("");

function catFace(t, fur, stripe) {
  const { lin } = t;
  const e1 = `<path d="M15 46 L16 14 Q17 9 22 12 L44 27Z" fill="${lin([fur[1], fur[2]])}"/>`;
  return `<g ${B}>${e1}</g><g ${B}>${mir(e1)}</g>
<path d="M20 38 L20 22 L33 30Z" fill="${C.pinkD}" opacity=".5"/><path d="M80 38 L80 22 L67 30Z" fill="${C.pinkD}" opacity=".5"/>
<g ${B}><ellipse cx="50" cy="57" rx="39" ry="31" fill="${lin(fur, "d")}"/></g>
${stripe ? `<path d="M50 28 V38 M41 30 L43 38 M59 30 L57 38" stroke="${stripe}" stroke-width="3" stroke-linecap="round" opacity=".6"/>` : ""}
${eye(34, 54)}${eye(66, 54)}${blush(22, 66)}${blush(78, 66)}
${nose(50, 63, 4.4, C.pinkD)}<path d="M50 65 V69" stroke="${C.darkD}" stroke-width="1.6"/>${smile(50, 69, 6)}
${whisk(21, 66, -0.85, C.metalDD)}${whisk(79, 66, 0.85, C.metalDD)}`;
}

// ---- ape family (side view, facing left)
function ape(t, o) {
  const { lin } = t;
  const fur = o.fur;
  return `${o.tail ?? ""}
<g ${B}><path d="M34 46 C32 24 64 16 80 32 C94 46 92 72 82 82 L42 82 C30 72 28 58 34 46Z" fill="${lin(fur, "d")}"/><ellipse cx="72" cy="80" rx="15" ry="9" fill="${fur[2]}"/></g>
<g ${B}><rect x="31" y="44" width="${o.armW ?? 15}" height="${o.armH ?? 42}" rx="7.5" fill="${lin([fur[1], fur[2]])}"/><ellipse cx="${31 + (o.armW ?? 15) / 2 - 1}" cy="87" rx="10" ry="5" fill="${fur[2]}"/></g>
${o.back ?? ""}
<g ${B}><ellipse cx="27" cy="${o.hy ?? 32}" rx="${o.hrx ?? 14}" ry="${o.hry ?? 15}" fill="${lin(fur)}"/></g>
${o.hair ?? ""}
<g ${B}><ellipse cx="22" cy="${(o.hy ?? 32) + 5}" rx="10.5" ry="9.5" fill="${lin(o.face)}"/></g>
${eye(20, (o.hy ?? 32) + 1, 0.62)}${eye(31, (o.hy ?? 32) + 1, 0.0001 * 0)}
<ellipse cx="16.5" cy="${(o.hy ?? 32) + 8}" rx="1.1" ry="1.5" fill="${C.darkD}"/><ellipse cx="21" cy="${(o.hy ?? 32) + 8.5}" rx="1.1" ry="1.5" fill="${C.darkD}"/>
<path d="M14 ${(o.hy ?? 32) + 13} Q20 ${(o.hy ?? 32) + 15} 25 ${(o.hy ?? 32) + 12}" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>`;
}

// ---- horse-style front face
function horseFace(t, o) {
  const { lin } = t;
  const earP = (rot) => `<ellipse cx="31" cy="${o.earY ?? 12}" rx="6" ry="${o.earH ?? 10}" transform="rotate(${rot} 31 ${o.earY ?? 12})" fill="${lin(o.fur)}"/>`;
  const head = "M50 16 C73 16 79 34 76 50 C75 62 78 74 73 83 C68 93 32 93 27 83 C22 74 25 62 24 50 C21 34 27 16 50 16Z";
  return `<g ${B}>${earP(-18)}${mir(earP(-18))}</g>
${o.back ?? ""}
<g ${B}><path d="${head}" fill="${lin(o.fur, "d")}"/></g>
<path d="M44 30 C48 46 47 66 46 80 L54 80 C53 66 52 46 56 30Z" fill="${o.blaze ?? "#fff"}" opacity=".35"/>
<g ${B}><ellipse cx="50" cy="80" rx="19" ry="11" fill="${lin(o.sn ?? [C.cream, C.creamD])}"/></g>
<ellipse cx="42" cy="81" rx="3" ry="2.4" fill="${C.darkD}"/><ellipse cx="58" cy="81" rx="3" ry="2.4" fill="${C.darkD}"/>
${eye(33, 46, 0.95)}${eye(67, 46, 0.95)}${blush(33, 63, 4)}${blush(67, 63, 4)}${o.front ?? ""}`;
}

const maneBlob = (c) => `<path d="M30 20 C34 10 66 10 70 20 C66 30 60 26 50 34 C40 26 34 30 30 20Z" fill="${c}"/>`;

export default [
  { u: "1f435", n: "monkey face", draw: ({ lin }) => `
<g ${B}><circle cx="15" cy="54" r="10" fill="${lin([C.wood, C.woodD])}"/></g><g ${B}><circle cx="85" cy="54" r="10" fill="${lin([C.wood, C.woodD])}"/></g>
<circle cx="15" cy="54" r="5" fill="${C.pinkD}" opacity=".6"/><circle cx="85" cy="54" r="5" fill="${C.pinkD}" opacity=".6"/>
<g ${B}><circle cx="50" cy="50" r="36" fill="${lin([C.wood, C.woodD, "#7C4F2B"], "d")}"/></g>
<g ${B}><path d="M50 36 C58 28 76 34 74 52 C73 66 66 84 50 84 C34 84 27 66 26 52 C24 34 42 28 50 36Z" fill="${lin([C.cream, "#E8C79B"])}"/></g>
${eye(38, 50)}${eye(62, 50)}${blush(30, 64)}${blush(70, 64)}
<ellipse cx="46.5" cy="62" rx="1.4" ry="1.8" fill="${C.darkD}"/><ellipse cx="53.5" cy="62" rx="1.4" ry="1.8" fill="${C.darkD}"/>
${smile(50, 71, 8, C.woodD)}` },

  { u: "1f412", n: "monkey", draw: (t) => `<g transform="translate(-4 -5)">${ape(t, {
    fur: [C.wood, C.woodD, "#7C4F2B"], face: [C.cream, "#E8C79B"], hrx: 13, hry: 13, hy: 33, armW: 13, armH: 40,
    tail: `<g ${Bs}><path d="M84 66 C97 68 96 42 86 40" fill="none" stroke="${C.woodD}" stroke-width="6.5" stroke-linecap="round"/></g>`,
    hair: `<g ${B}><circle cx="39" cy="27" r="6.5" fill="${C.woodD}"/></g>`,
  })}</g>`},

  { u: "1f98d", n: "gorilla", draw: (t) => ape(t, {
    fur: ["#8B96B8", "#5F6B8F", "#44507A"], face: ["#B2B9D0", "#8590B0"], hrx: 14, hry: 17, hy: 32, armW: 19, armH: 42,
    hair: `<path d="M16 26 Q27 20 38 26" fill="none" stroke="#3B4468" stroke-width="3" stroke-linecap="round" opacity=".55"/>`,
  }) },

  { u: "1f9a7", n: "orangutan", draw: (t) => ape(t, {
    fur: ["#F5A95C", "#D8742E", "#A8501E"], face: ["#F2CFA4", "#D9A874"], hrx: 15, hry: 15, hy: 32, armW: 14, armH: 42,
    back: `<g ${B}><ellipse cx="15" cy="44" rx="6" ry="9" fill="#E3B88A"/><ellipse cx="38" cy="44" rx="5" ry="8" fill="#E3B88A"/></g>`,
  }) },

  { u: "1f436", n: "dog face", draw: (t) => dogFace(t) },

  { u: "1f415", n: "dog", draw: (t) => dogSide(t) },

  { u: "1f9ae", n: "guide dog", draw: (t) => dogSide(t, `
<g ${Bs}><path d="M64 38 V63" stroke="${C.blueD}" stroke-width="5"/><path d="M36 50 L50 40" stroke="none"/></g>
<g ${Bs}><path d="M38 33 C42 15 62 15 62 38" fill="none" stroke="${C.metal}" stroke-width="3.2" stroke-linecap="round"/></g>
<rect x="36" y="38" width="5" height="26" rx="2" fill="${C.blueD}"/><rect x="60" y="38" width="5" height="26" rx="2" fill="${C.blueD}"/>
<path d="M37 41 H64" stroke="${C.blueD}" stroke-width="4"/>`, ["#FBDA8A", "#F1BE40", "#D49828"], "#C08418") },

  { u: "1f415-200d-1f9ba", n: "service dog", draw: (t) => dogSide(t, `
<g ${B}><path d="M44 38 H70 V64 H44Z" fill="${t.lin([C.red, C.redD])}"/></g>
<path d="M57 44 V58 M50 51 H64" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>`) },

  { u: "1f429", n: "poodle", draw: ({ lin }) => {
    const p = lin(["#FBE2BE", "#EDB985", "#C98E56"], "d");
    const pm = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${p}"/>`;
    return `<g ${B}>${pm(86, 46, 8)}${pm(80, 56, 8)}</g>
<g ${B}><rect x="33" y="62" width="6" height="22" rx="3" fill="#C98E56"/><rect x="45" y="62" width="6" height="22" rx="3" fill="#C98E56"/><rect x="66" y="62" width="6" height="22" rx="3" fill="#C98E56"/><rect x="77" y="62" width="6" height="22" rx="3" fill="#C98E56"/>${pm(36, 85, 7)}${pm(48, 85, 7)}${pm(69, 85, 7)}${pm(80, 85, 7)}</g>
<g ${B}>${pm(40, 52, 12)}${pm(54, 48, 15)}${pm(68, 53, 13)}${pm(50, 60, 11)}${pm(64, 62, 10)}</g>
<g ${B}><ellipse cx="31" cy="38" rx="10" ry="11" fill="${p}"/><ellipse cx="14.5" cy="44" rx="8" ry="6.3" fill="${lin(["#FFF1DA", "#EDC79B"])}"/></g>
<g ${B}>${pm(30, 23, 9)}${pm(22, 26, 7)}${pm(38, 27, 7)}</g>
<g ${B}><ellipse cx="38" cy="42" rx="6.5" ry="9" fill="#E3A56C"/></g>
<ellipse cx="9" cy="42.5" rx="2.6" ry="2" fill="${C.darkD}"/>${eye(25, 36, 0.68)}` } },

  { u: "1f43a", n: "wolf", draw: ({ lin, clip }) => {
    const h = "M50 90 L28 78 L12 54 L16 30 L20 8 L40 24 Q50 22 60 24 L80 8 L84 30 L88 54 L72 78Z";
    return `<g ${B}><path d="${h}" fill="${lin(["#B7C0D2", "#8791AB", "#5F6B8F"], "d")}" stroke="#8791AB" stroke-width="5" stroke-linejoin="round"/></g>
<path d="M22 24 L24 40 L34 30Z M78 24 L76 40 L66 30Z" fill="${C.pinkD}" opacity=".5"/>
<g ${clip(`<path d="${h}"/>`)}><path d="M-5 56 Q18 52 30 66 Q50 54 70 66 Q82 52 105 56 V100 H-5Z" fill="${C.paper}" opacity=".85"/></g>
<g ${B}><path d="M36 60 Q50 54 64 60 Q68 76 50 88 Q32 76 36 60Z" fill="${lin([C.paper, C.paperD])}"/></g>
${eye(36, 46, 0.95)}${eye(64, 46, 0.95)}
${nose(50, 66, 6)}<path d="M50 68 V76 M50 76 Q44 80 40 77 M50 76 Q56 80 60 77" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>` } },

  { u: "1f98a", n: "fox", draw: ({ lin, clip }) => {
    const h = "M50 90 L8 54 L12 14 L38 32 Q50 29 62 32 L88 14 L92 54Z";
    return `<g ${B}><path d="${h}" fill="${lin(["#F8B66A", "#EC8A38", "#C45F22"], "d")}" stroke="#EC8A38" stroke-width="5" stroke-linejoin="round"/></g>
<path d="M17 20 L20 38 L32 32Z M83 20 L80 38 L68 32Z" fill="${C.darkD}" opacity=".6"/>
<g ${clip(`<path d="${h}"/>`)}><path d="M-5 52 Q28 56 50 66 Q72 56 105 52 V100 H-5Z" fill="${C.paper}"/><path d="M-5 52 Q28 56 50 66 Q72 56 105 52" fill="none" stroke="${C.creamD}" stroke-width="2" opacity=".6"/></g>
${eye(33, 47)}${eye(67, 47)}
<ellipse cx="50" cy="85" rx="5.4" ry="4" fill="${C.darkD}"/><ellipse cx="48.4" cy="83.8" rx="1.6" ry="1" fill="#fff" opacity=".6"/>` } },

  { u: "1f99d", n: "raccoon", draw: ({ lin }) => `
<g ${B}><circle cx="22" cy="26" r="11" fill="${lin(["#B6B0C2", "#7F7990"])}"/><circle cx="78" cy="26" r="11" fill="${lin(["#B6B0C2", "#7F7990"])}"/></g>
<circle cx="22" cy="27" r="5" fill="${C.pinkD}" opacity=".55"/><circle cx="78" cy="27" r="5" fill="${C.pinkD}" opacity=".55"/>
<g ${B}><ellipse cx="50" cy="56" rx="40" ry="33" fill="${lin(["#C9C4D4", "#9791A8", "#6F697F"], "d")}"/></g>
<g ${B}><path d="M10 50 Q30 40 50 50 Q70 40 90 50 Q86 72 66 66 Q56 62 50 62 Q44 62 34 66 Q14 72 10 50Z" fill="#5F596E"/></g>
<ellipse cx="32" cy="42" rx="8" ry="3.6" fill="${C.paper}" opacity=".85" transform="rotate(-14 32 42)"/><ellipse cx="68" cy="42" rx="8" ry="3.6" fill="${C.paper}" opacity=".85" transform="rotate(14 68 42)"/>
<g ${B}><ellipse cx="50" cy="73" rx="16" ry="12" fill="${lin([C.paper, C.creamD])}"/></g>
<circle cx="35" cy="54" r="0" fill="none"/>${eye(34, 54, 0.9)}${eye(66, 54, 0.9)}
${nose(50, 68, 5)}${smile(50, 74, 6)}` },

  { u: "1f431", n: "cat face", draw: (t) => catFace(t, ["#FBC580", C.orange, "#D8742E"], "#A8501E") },

  { u: "1f408", n: "cat", draw: (t) => catSide(t, ["#FBC580", C.orange, "#D8742E"], tabbyStripes("#A8501E")) },

  { u: "1f408-200d-2b1b", n: "black cat", draw: (t) => catSide(t, ["#8E9AC0", "#5F6B8F", "#414C78"], "", { sn: ["#8E9AC0", "#6B77A0"] }) },

  { u: "1f981", n: "lion", draw: ({ lin }) => {
    const mg = lin([C.wood, C.woodD, "#7C4F2B"], "d");
    const ring = Array.from({ length: 11 }, (_, i) => {
      const a = (i / 11) * Math.PI * 2;
      return `<circle cx="${(50 + 33 * Math.cos(a)).toFixed(1)}" cy="${(50 + 33 * Math.sin(a)).toFixed(1)}" r="13" fill="${mg}"/>`;
    }).join("");
    return `<g ${B}>${ring}<circle cx="50" cy="50" r="33" fill="${mg}"/></g>
<g ${B}><circle cx="26" cy="30" r="8" fill="${lin([C.gold, C.goldM])}"/><circle cx="74" cy="30" r="8" fill="${lin([C.gold, C.goldM])}"/></g>
<g ${B}><ellipse cx="50" cy="54" rx="26" ry="27" fill="${lin([C.yellow, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="67" rx="14" ry="11" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(38, 49, 0.9)}${eye(62, 49, 0.9)}${blush(30, 62, 4)}${blush(70, 62, 4)}
${nose(50, 61, 5, "#8A4B33")}<path d="M50 63 V68 M50 68 Q45 73 41 70 M50 68 Q55 73 59 70" fill="none" stroke="${C.darkD}" stroke-width="1.7" stroke-linecap="round"/>` } },

  { u: "1f42f", n: "tiger face", draw: ({ lin }) => `
<g ${B}><circle cx="21" cy="26" r="11" fill="${lin([C.orange, C.orangeD])}"/><circle cx="79" cy="26" r="11" fill="${lin([C.orange, C.orangeD])}"/></g>
<circle cx="21" cy="27" r="5" fill="${C.paper}"/><circle cx="79" cy="27" r="5" fill="${C.paper}"/>
<g ${B}><ellipse cx="50" cy="56" rx="40" ry="34" fill="${lin(["#FBC580", C.orange, "#D8742E"], "d")}"/></g>
<g ${Bs}><path d="M50 24 V38 M40 26 L43 38 M60 26 L57 38 M12 48 L24 52 M12 60 L24 60 M88 48 L76 52 M88 60 L76 60" stroke="${C.darkD}" stroke-width="3.4" stroke-linecap="round" fill="none"/></g>
<g ${B}><ellipse cx="38" cy="72" rx="15" ry="12" fill="${lin([C.paper, C.creamD])}"/><ellipse cx="62" cy="72" rx="15" ry="12" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(34, 52, 0.95)}${eye(66, 52, 0.95)}${nose(50, 64, 5, C.pinkD)}<path d="M50 66 V71 M50 71 Q45 76 41 73 M50 71 Q55 76 59 73" fill="none" stroke="${C.darkD}" stroke-width="1.7" stroke-linecap="round"/>` },

  { u: "1f405", n: "tiger", draw: (t) => quad(t, {
    fur: ["#FBC580", C.orange, "#D8742E"], far: "#C26A28", dy: -5, bx: 25, bw: 60, by: 38, bh: 27, hx: 21, hy: 38, hrx: 13.5, hry: 12, sn: [C.paper, C.creamD], nc: C.pinkD,
    back: `<g ${Bs}><path d="M83 52 C96 54 96 38 91 28" fill="none" stroke="#D8742E" stroke-width="6.5" stroke-linecap="round"/></g>`,
    deco: [38, 47, 56, 65, 74].map((x) => `<path d="M${x} 34 Q${x + 5} 48 ${x - 1} 60" fill="none" stroke="${C.darkD}" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>`).join(""),
    pre: `<g ${B}><circle cx="30" cy="30" r="5.5" fill="${C.orangeD}"/></g>`,
    post: `<path d="M16 30 L22 27 M14 36 L19 36" stroke="${C.darkD}" stroke-width="2.4" stroke-linecap="round"/>`,
  }) },

  { u: "1f406", n: "leopard", draw: (t) => {
    const sp = [[38, 44], [48, 52], [58, 42], [68, 54], [76, 44], [44, 60], [62, 60]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="none" stroke="${C.darkD}" stroke-width="2" opacity=".75"/><circle cx="${x}" cy="${y}" r="1" fill="${C.darkD}" opacity=".6"/>`).join("");
    return quad(t, {
      fur: ["#FBE08A", C.yellowM, C.yellowD], far: "#C98A22", dy: -5, bx: 25, bw: 60, by: 40, bh: 24, lw: 8, hx: 21, hy: 38, hrx: 13, hry: 11, sn: [C.paper, C.creamD], nc: C.pinkD,
      back: `<g ${Bs}><path d="M83 52 C96 56 96 38 90 28" fill="none" stroke="${C.yellowD}" stroke-width="6.5" stroke-linecap="round"/></g>`,
      deco: sp,
      pre: `<g ${B}><circle cx="29" cy="30" r="5.5" fill="${C.goldM}"/></g>`,
    });
  } },

  { u: "1f434", n: "horse face", draw: (t) => horseFace(t, {
    fur: ["#E2A468", C.wood, "#A5703F"], sn: ["#F0C99A", "#D9A670"], blaze: "#fff",
    back: `<g ${B}><path d="M30 14 C20 30 22 56 28 70 C24 52 30 38 38 30Z" fill="${C.woodDD}"/><path d="M70 14 C80 30 78 56 72 70 C76 52 70 38 62 30Z" fill="${C.woodDD}"/></g>`,
    front: `<g ${B}>${maneBlob(C.woodDD)}</g>`,
  }) },

  { u: "1face", n: "moose", draw: ({ lin }) => {
    const ant = `<path d="M34 34 L14 34 L6 20 L16 22 L12 8 L24 18 L28 4 L34 20 L40 30Z" fill="${lin([C.woodL, C.wood])}" stroke="${C.wood}" stroke-width="3" stroke-linejoin="round"/>`;
    return `<g ${B}>${ant}</g><g ${B}>${mir(ant)}</g>
<g ${B}><ellipse cx="29" cy="44" rx="6" ry="11" transform="rotate(-50 29 44)" fill="${lin([C.woodD, C.woodDD])}"/><ellipse cx="71" cy="44" rx="6" ry="11" transform="rotate(50 71 44)" fill="${lin([C.woodD, C.woodDD])}"/></g>
<g ${B}><path d="M50 30 C66 30 68 46 66 58 C65 66 72 76 68 84 C64 94 36 94 32 84 C28 76 35 66 34 58 C32 46 34 30 50 30Z" fill="${lin(["#A97248", C.woodD, "#6B4324"], "d")}"/></g>
<g ${B}><ellipse cx="50" cy="78" rx="16" ry="12" fill="${lin(["#C48C55", "#935F34"])}"/></g>
<ellipse cx="43" cy="78" rx="3" ry="3.4" fill="${C.darkD}"/><ellipse cx="57" cy="78" rx="3" ry="3.4" fill="${C.darkD}"/>
${eye(39, 52, 0.85)}${eye(61, 52, 0.85)}` } },

  { u: "1facf", n: "donkey", draw: (t) => horseFace(t, {
    fur: ["#C4C9D6", "#9AA1B4", "#7A8196"], sn: [C.paper, C.paperD], earH: 12, earY: 15,
    front: `<g ${B}><path d="M36 22 C42 14 58 14 64 22 C58 30 42 30 36 22Z" fill="#6B7288"/></g>`,
  }) },

  { u: "1f40e", n: "horse", draw: (t) => quad(t, {
    fur: ["#E2A468", C.wood, "#A5703F"], far: "#8C5A30", bx: 30, bw: 54, by: 42, bh: 26, lw: 8, hoof: C.woodDD, bx0: 0,
    neck: `<path d="M28 46 L24 22 L40 18 L50 46Z" fill="${t.lin(["#E2A468", C.wood])}"/>`,
    back: `<g ${B}><path d="M84 52 C96 56 98 74 92 88 C90 76 86 68 80 62Z" fill="${C.woodDD}"/></g>`,
    pre: `<g ${B}><path d="M34 16 C42 12 48 20 46 40 C40 38 36 30 34 16Z" fill="${C.woodDD}"/></g>`,
    head: `<g ${B}><path d="M24 14 C34 10 42 16 40 28 L34 36 C28 38 22 40 16 48 C10 52 6 46 8 40 C10 30 14 20 24 14Z" fill="${t.lin(["#E2A468", C.wood])}"/></g>
<g ${B}><path d="M28 14 L30 5 L36 12Z" fill="${C.woodD}"/></g>
<ellipse cx="11" cy="45" rx="2.2" ry="1.6" fill="${C.darkD}"/>${eye(27, 24, 0.65)}`,
  }) },

  { u: "1f984", n: "unicorn", draw: (t) => horseFace(t, {
    fur: [C.paper, "#EFE3F2", "#CDB6E0"], sn: ["#FFE3EC", C.pink],
    back: `<g ${B}><path d="M28 14 C12 26 10 52 20 74 C26 54 32 40 38 30Z" fill="${t.lin([C.pinkD, C.purple])}"/><path d="M70 14 C84 26 86 52 76 74 C74 54 68 40 62 30Z" fill="${t.lin([C.blue, C.purple])}"/></g>`,
    front: `<g ${B}><path d="M50 4 L43 28 L57 28Z" fill="${t.lin([C.gold, C.goldM, C.goldD], "h")}"/></g><path d="M46.5 18 L53.5 21 M45 24 L55 27" stroke="${C.goldD}" stroke-width="1.4"/><g ${B}><path d="M34 22 C40 18 46 28 42 36 C36 32 34 28 34 22Z" fill="${C.pinkD}"/></g>`,
  }) },

  { u: "1f993", n: "zebra", draw: (t) => {
    const bars = [34, 42, 50, 58, 66, 74, 82].map((x) => `<path d="M${x} 30 L${x + 5} 70 H${x + 9} L${x + 4} 30Z" fill="${C.dark}" opacity=".85"/>`).join("");
    return quad(t, {
      fur: [C.paper, "#EBDEC2", "#C9B993"], far: "#B9A97F", leg: "#E6D8B8", bx: 27, bw: 58, by: 38, bh: 27, hoof: C.dark,
      deco: bars,
      back: `<g ${Bs}><path d="M84 48 Q96 52 93 68" fill="none" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/></g>`,
      pre: `<g ${B}><path d="M22 20 L34 18 L46 42 L36 44Z" fill="${C.dark}"/></g>${ear(16, 26, 4, 8, -25, C.dark)}`,
      hy: 36, hx: 21, hrx: 13.5, hry: 11.5, sn: ["#7D7480", C.dark], nc: C.darkD,
      post: `<path d="M20 28 L26 32 M15 34 L21 38" stroke="${C.dark}" stroke-width="2.4" stroke-linecap="round"/>`,
    });
  } },

  { u: "1f98c", n: "deer", draw: (t) => {
    const spots = [[40, 46], [52, 44], [64, 48], [74, 54], [46, 56], [58, 57]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${C.paper}" opacity=".85"/>`).join("");
    return quad(t, {
      fur: ["#E4B07A", C.wood, "#A5703F"], far: "#8C5A30", leg: "#C48C55", lw: 6.5, dy: 5, bx: 30, bw: 54, by: 44, bh: 22, hoof: C.woodDD,
      neck: `<path d="M30 52 L26 24 L40 20 L48 52Z" fill="${t.lin(["#E4B07A", C.wood])}"/>`,
      deco: spots,
      back: `<g ${B}><ellipse cx="86" cy="50" rx="5" ry="7" fill="${C.paper}"/></g>`,
      pre: `<g ${Bs}><path d="M30 20 L26 6 M28 12 L20 8 M30 15 L34 4" fill="none" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round"/><path d="M40 18 L46 5 M44 11 L52 8" fill="none" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round"/></g>`,
      head: `<g ${B}><ellipse cx="29" cy="22" rx="11" ry="9.5" transform="rotate(-18 29 22)" fill="${t.lin(["#E4B07A", C.wood])}"/><ellipse cx="18" cy="27" rx="7.5" ry="5.5" transform="rotate(-18 18 27)" fill="${t.lin([C.cream, C.creamD])}"/></g>${ear(38, 20, 3.2, 7, 60, C.woodD)}
<ellipse cx="12" cy="29" rx="2.2" ry="1.7" fill="${C.darkD}"/>${eye(28, 20, 0.62)}`,
    });
  } },

  { u: "1f9ac", n: "bison", draw: (t) => quad(t, {
    fur: ["#A97248", C.woodD, "#5E3B20"], far: "#4A2E18", leg: "#7A4B28", bx: 24, bw: 62, by: 30, bh: 36, br: 18, lw: 10, hx: 20, hy: 50, hrx: 13, hry: 12, dy: -5, hf: ["#6B4324", "#4A2E18"], sn: ["#7A4B28", "#5E3B20"], nc: C.darkD,
    neck: `<ellipse cx="36" cy="48" rx="20" ry="22" fill="${t.lin(["#8A5A34", "#4F311B"])}"/>`,
    back: `<g ${Bs}><path d="M85 44 Q96 50 93 66" fill="none" stroke="#4A2E18" stroke-width="5" stroke-linecap="round"/></g>`,
    pre: `<g ${B}><ellipse cx="46" cy="40" rx="24" ry="14" fill="#5E3B20"/></g>`,
    post: `<g ${Bs}><path d="M18 40 C12 38 10 30 14 26 C16 32 20 34 24 36Z" fill="${C.cream}"/></g>`,
  }) },

  { u: "1f42e", n: "cow face", draw: ({ lin }) => `
<g ${B}><path d="M30 20 C22 14 18 8 22 5 C28 6 34 14 36 22Z" fill="${lin([C.cream, C.goldM])}"/><path d="M70 20 C78 14 82 8 78 5 C72 6 66 14 64 22Z" fill="${lin([C.cream, C.goldM])}"/></g>
<g ${B}><ellipse cx="18" cy="38" rx="13" ry="7" transform="rotate(20 18 38)" fill="${lin([C.paper, C.creamD])}"/><ellipse cx="82" cy="38" rx="13" ry="7" transform="rotate(-20 82 38)" fill="${lin([C.paper, C.creamD])}"/></g>
<ellipse cx="18" cy="38" rx="7" ry="3" transform="rotate(20 18 38)" fill="${C.pinkD}" opacity=".5"/><ellipse cx="82" cy="38" rx="7" ry="3" transform="rotate(-20 82 38)" fill="${C.pinkD}" opacity=".5"/>
<g ${B}><path d="M50 14 C70 14 76 32 74 50 C73 60 76 66 72 74 C66 90 34 90 28 74 C24 66 27 60 26 50 C24 32 30 14 50 14Z" fill="${lin([C.paper, "#EBDEC2", C.creamD], "d")}"/></g>
<path d="M28 28 C34 20 48 22 46 36 C44 48 30 48 26 40Z" fill="${C.dark}" opacity=".85"/>
<g ${B}><ellipse cx="50" cy="73" rx="21" ry="15" fill="${lin([C.pink, C.pinkD])}"/></g>
<ellipse cx="42" cy="74" rx="3.2" ry="4" fill="${C.redD}" opacity=".75"/><ellipse cx="58" cy="74" rx="3.2" ry="4" fill="${C.redD}" opacity=".75"/>
${eye(36, 48, 0.9)}${eye(64, 48, 0.9)}` },

  { u: "1f402", n: "ox", draw: (t) => quad(t, {
    fur: ["#C98E5A", "#A8693A", "#7C4B26"], far: "#6B4324", bx: 25, bw: 60, by: 36, bh: 30, hx: 21, hy: 42, hrx: 13.5, hry: 12, sn: ["#E8B993", "#C48C55"], nc: C.darkD, hoof: C.woodDD,
    back: `<g ${Bs}><path d="M85 46 Q96 52 93 70" fill="none" stroke="#7C4B26" stroke-width="5" stroke-linecap="round"/></g><g ${B}><circle cx="93" cy="72" r="4.5" fill="${C.woodDD}"/></g>`,
    pre: `<g ${B}><path d="M24 34 C14 32 10 20 14 12 C18 20 24 24 32 28Z" fill="${C.cream}"/><path d="M32 33 C30 22 36 14 42 12 C40 20 40 26 40 33Z" fill="${C.creamD}"/></g>`,
    post: `${ear(31, 40, 4, 7.5, 40, "#8C5A30")}`,
  }) },

  { u: "1f403", n: "water buffalo", draw: (t) => quad(t, {
    fur: ["#9AA0B8", "#6F7692", "#4C5272"], far: "#3F4562", bx: 25, bw: 60, by: 38, bh: 28, hx: 21, hy: 44, hrx: 13, hry: 11.5, sn: ["#B6BBD0", "#8A91AB"], nc: C.darkD, hoof: "#3A3F5C",
    back: `<g ${Bs}><path d="M85 48 Q96 54 93 72" fill="none" stroke="#4C5272" stroke-width="5" stroke-linecap="round"/></g>`,
    pre: `<g ${B}><path d="M26 38 C8 40 2 28 10 18 C12 26 20 28 34 30Z" fill="${t.lin([C.cream, C.creamD])}"/></g>`,
    post: `<g ${B}><path d="M30 36 C18 20 34 8 46 12 C38 16 36 24 38 36Z" fill="${t.lin([C.cream, C.creamD])}"/></g>${ear(32, 44, 4, 7, 40, "#5A6080")}`,
  }) },

  { u: "1f404", n: "cow", draw: (t) => {
    const spots = `<path d="M44 38 C56 34 62 42 56 50 C50 56 40 50 44 38Z" fill="${C.dark}" opacity=".85"/><path d="M68 44 C78 42 82 52 74 58 C68 60 64 50 68 44Z" fill="${C.dark}" opacity=".85"/>`;
    return quad(t, {
      fur: [C.paper, "#EBDEC2", "#C9B993"], far: "#B9A97F", leg: "#E6D8B8", bx: 25, bw: 60, by: 36, bh: 30, hx: 21, hy: 42, hrx: 13.5, hry: 12, sn: [C.pink, C.pinkD], nc: C.redD, hoof: C.dark,
      deco: spots,
      back: `<g ${Bs}><path d="M85 46 Q96 52 93 70" fill="none" stroke="#C9B993" stroke-width="5" stroke-linecap="round"/></g><g ${B}><circle cx="93" cy="72" r="4.5" fill="${C.dark}"/></g>`,
      pre: `<g ${B}><path d="M26 34 C20 28 20 22 24 18 C26 24 30 28 34 30Z" fill="${C.cream}"/></g>`,
      post: `<g ${B}><ellipse cx="31" cy="38" rx="4" ry="7.5" transform="rotate(40 31 38)" fill="${C.dark}"/></g><g ${B}><ellipse cx="54" cy="68" rx="6" ry="4.5" fill="${C.pink}"/></g>`,
    });
  } },
];
