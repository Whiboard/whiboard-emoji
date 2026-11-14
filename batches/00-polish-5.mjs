// 00-polish-5: animal / nature redraws.
import { B, Bs, C, star } from "../kit.mjs";

const eye = (x, y, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${+(3.4 * s).toFixed(2)}" ry="${+(4.2 * s).toFixed(2)}" fill="${C.darkD}"/><circle cx="${+(x - 1.1 * s).toFixed(2)}" cy="${+(y - 1.5 * s).toFixed(2)}" r="${+(1.1 * s).toFixed(2)}" fill="#fff"/>`;
const blush = (x, y, r = 5) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="${C.pinkD}" opacity=".32"/>`;
const ear = (x, y, rx, ry, rot, c) =>
  `<g ${B}><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="${c}"/></g>`;

// side-view quadruped facing left (same as animals_nature-1)
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

const DOGF = [C.woodL, C.wood, "#B27A45"];
const rot = (a, s) => `<g transform="rotate(${a} 50 50)">${s}</g>`;

export default [
  // ---------------------------------------------------------------- monkey
  { u: "1f412", n: "monkey", draw: ({ lin }) => {
    const fur = [C.wood, C.woodD, "#7C4F2B"];
    return `
<g ${Bs}><path d="M76 82 C98 84 98 46 84 42 C76 40 74 50 80 52" fill="none" stroke="${C.woodD}" stroke-width="7" stroke-linecap="round"/></g>
<g ${B}><ellipse cx="55" cy="66" rx="25" ry="25" fill="${lin(fur, "d")}"/></g>
<g ${Bs}><ellipse cx="46" cy="68" rx="12" ry="15" fill="${lin([C.cream, "#E8C79B"])}"/></g>
<g ${B}><ellipse cx="42" cy="89" rx="16" ry="6.5" fill="${lin([C.wood, C.woodD])}"/><ellipse cx="73" cy="88" rx="9" ry="5.5" fill="${lin([C.wood, C.woodD])}"/></g>
<g ${B}><circle cx="49" cy="29" r="6.5" fill="${lin([C.woodD, "#7C4F2B"])}"/></g><circle cx="49" cy="29" r="3.2" fill="${C.pinkD}" opacity=".55"/>
<g ${B}><circle cx="34" cy="28" r="17" fill="${lin(fur, "d")}"/></g>
<g ${B}><path d="M18 33 C16 24 24 20 30 24 C34 18 44 24 42 34 C44 44 36 48 28 46 C20 46 16 40 18 33Z" fill="${lin([C.cream, "#E8C79B"])}"/></g>
${eye(24, 30, 0.62)}${eye(35, 30, 0.62)}
<ellipse cx="20" cy="38" rx="1.1" ry="1.5" fill="${C.darkD}"/><ellipse cx="25" cy="38.5" rx="1.1" ry="1.5" fill="${C.darkD}"/>
<path d="M19 43 Q25 46 31 42" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/>
<g ${B}><path d="M40 55 C34 58 30 64 28 70" fill="none" stroke="${lin([C.wood, C.woodD])}" stroke-width="9" stroke-linecap="round"/></g>
<g ${B}><path d="M8 62 C8 80 22 92 40 88 C26 82 20 72 20 58Z" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/></g>
<path d="M8 62 L10.5 58.5" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round"/>
<g ${B}><circle cx="27" cy="71" r="5.5" fill="${lin([C.wood, C.woodD])}"/></g>`;
  } },

  // ------------------------------------------------------------- orangutan
  { u: "1f9a7", n: "orangutan", draw: ({ lin }) => {
    const fur = ["#F5A95C", "#D8742E", "#A8501E"];
    const tan = [C.cream, "#E3B88A"];
    return `
<g ${B}><path d="M66 86 C48 88 38 70 40 52 C42 36 60 28 76 32 C92 38 96 62 88 78 C84 84 76 88 66 86Z" fill="${lin(fur, "d")}"/></g>
<path d="M50 78 L52 90 M60 82 L62 92 M70 82 L72 92 M80 78 L82 88" stroke="${fur[2]}" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>
<path d="M54 44 C62 40 66 46 74 42 M58 58 C66 54 72 60 82 54 M62 70 C70 66 76 72 84 66" fill="none" stroke="${fur[2]}" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
<g ${B}><path d="M64 52 C62 68 56 80 52 92" fill="none" stroke="${lin([fur[1], fur[2]])}" stroke-width="10" stroke-linecap="round"/></g>
<g ${B}><ellipse cx="49" cy="92" rx="9" ry="4.5" fill="${fur[2]}"/></g>
<g ${B}><circle cx="33" cy="30" r="19" fill="${lin(fur)}"/><path d="M18 38 C14 52 24 54 30 50 C36 54 44 52 42 40Z" fill="${fur[1]}"/></g>
<g ${B}><ellipse cx="25" cy="34" rx="11" ry="10" fill="${lin(tan)}"/><ellipse cx="38" cy="34" rx="7" ry="10" fill="${lin([ "#E3B88A", "#C99765"])}"/></g>
${eye(23, 30, 0.62)}${eye(32, 30, 0.62)}
<ellipse cx="19.5" cy="38" rx="1" ry="1.4" fill="${C.darkD}"/><ellipse cx="24" cy="38.4" rx="1" ry="1.4" fill="${C.darkD}"/>
<path d="M18 43 Q24 46 30 42" fill="none" stroke="${C.darkD}" stroke-width="1.5" stroke-linecap="round"/>
<g ${B}><path d="M46 46 C38 60 28 74 22 92" fill="none" stroke="${lin([fur[0], fur[1], fur[2]], "d")}" stroke-width="11" stroke-linecap="round"/></g>
<g ${B}><ellipse cx="21" cy="92" rx="10" ry="4.8" fill="${fur[2]}"/></g>`;
  } },

  // ----------------------------------------------------------------- bison
  { u: "1f9ac", n: "bison", draw: ({ lin }) => {
    const dk = lin(["#8A5A34", "#5E3B20", "#3F2714"], "d");
    return `
<g ${Bs}><path d="M88 46 C96 52 96 64 92 70" fill="none" stroke="#4A2E18" stroke-width="4" stroke-linecap="round"/><ellipse cx="92" cy="73" rx="3.6" ry="5.5" fill="#3F2714"/></g>
<g ${B}><rect x="68" y="62" width="9" height="26" rx="4" fill="#6B4324"/><rect x="40" y="64" width="11" height="24" rx="5" fill="#4F311B"/></g>
<g ${B}><path d="M14 58 C8 32 28 12 50 16 C62 18 66 32 76 35 C90 38 95 54 86 66 C84 72 80 72 76 72 H34 C22 70 16 66 14 58Z" fill="${lin(["#3F2714", "#5E3B20", "#9A6B3F"], "h")}"/></g>
<path d="M22 40 C32 24 46 24 54 30 M60 44 C70 46 78 52 82 62" fill="none" stroke="#C59560" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>
<g ${B}><rect x="30" y="62" width="13" height="26" rx="6" fill="${dk}"/><rect x="62" y="64" width="9" height="24" rx="4" fill="#7A4B28"/></g>
<g ${B}><rect x="30" y="84" width="13" height="5" rx="2" fill="${C.darkD}"/><rect x="62" y="84" width="9" height="5" rx="2" fill="${C.darkD}"/></g>
<g ${B}><path d="M14 74 C10 90 20 94 26 86 C28 82 26 78 24 74Z" fill="${lin(["#6B4324", "#3F2714"])}"/></g>
<g ${B}><ellipse cx="22" cy="60" rx="14" ry="15" fill="${lin(["#8A5A34", "#5E3B20"], "d")}"/></g>
<g ${B}><ellipse cx="13" cy="70" rx="7.5" ry="6.5" fill="${lin(["#8A5A34", "#5E3B20"])}"/></g>
<ellipse cx="9" cy="70" rx="2.2" ry="1.7" fill="${C.darkD}"/>
<g ${B}><path d="M20 49 C8 50 4 38 10 28" fill="none" stroke="${lin([C.cream, C.creamD], "h")}" stroke-width="5.5" stroke-linecap="round"/></g>
<path d="M10 30 L9.5 28" stroke="${C.darkD}" stroke-width="3.6" stroke-linecap="round"/>
<g ${B}><ellipse cx="32" cy="52" rx="4" ry="7" transform="rotate(30 32 52)" fill="#4F311B"/></g>
${eye(20, 55, 0.62)}`;
  } },

  // ----------------------------------------------------------------- zebra
  { u: "1f993", n: "zebra", draw: ({ lin, clip }) => {
    const body = "M30 44 C30 34 44 32 58 34 C74 32 88 38 88 52 C88 64 80 68 68 68 H42 C32 66 30 56 30 44Z";
    const neck = "M28 50 L26 20 L44 18 L52 44Z";
    const head = "M30 12 C42 12 46 22 40 30 L24 46 C18 50 8 46 10 38 C12 26 20 12 30 12Z";
    const shapes = `<path d="${body}"/><path d="${neck}"/><path d="${head}"/>`;
    let st = "";
    for (let x = 46; x < 90; x += 8) st += `M${x} 30 Q${x + 5} 50 ${x - 1} 72 `;
    for (let y = 28; y < 48; y += 9) st += `M24 ${y} Q36 ${y + 3} 48 ${y + 6} `;
    const hs = [[24, 54], [24, 8]];
    return `
<g ${B}><path d="M34 14 L48 12 L58 44 L46 46Z" fill="${C.dark}"/></g>
<g ${Bs}><path d="M86 44 C96 50 96 66 92 80" fill="none" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><rect x="64" y="60" width="9" height="28" rx="4" fill="#CDBE98"/><rect x="38" y="60" width="9" height="28" rx="4" fill="#CDBE98"/></g>
<g ${B}><path d="${body}" fill="${lin([C.paper, "#EBDEC2", "#C9B993"], "d")}"/><path d="${neck}" fill="${lin([C.paper, "#EBDEC2"], "d")}"/></g>
<g ${B}><path d="${head}" fill="${lin([C.paper, "#EBDEC2", "#C9B993"], "d")}"/></g>
<g ${clip(shapes)}><path d="${st}" fill="none" stroke="${C.dark}" stroke-width="3" opacity=".88"/></g>
<g ${B}><rect x="52" y="60" width="9" height="28" rx="4" fill="${lin([C.paper, "#E6D8B8"], "h")}"/><rect x="26" y="60" width="9" height="28" rx="4" fill="${lin([C.paper, "#E6D8B8"], "h")}"/></g>
<path d="M26 72 H35 M52 72 H61 M26 79 H35 M52 79 H61" stroke="${C.dark}" stroke-width="2.6" opacity=".85"/>
<g ${B}><rect x="26" y="84" width="9" height="5" rx="2" fill="${C.dark}"/><rect x="52" y="84" width="9" height="5" rx="2" fill="${C.dark}"/></g>
<g ${B}><ellipse cx="14" cy="41" rx="7" ry="5.5" transform="rotate(-35 14 41)" fill="${lin(["#7D7480", C.dark])}"/></g>
<g ${B}><path d="M30 14 L34 3 L40 14Z" fill="${C.dark}"/></g>
<path d="M12 40.5 h2" stroke="#fff" stroke-width="0"/>
${eye(27, 27, 0.62)}`;
  } },

  // ------------------------------------------------------------- guide dog
  { u: "1f9ae", n: "guide dog", draw: (t) => quad(t, {
    fur: ["#FBDA8A", "#F1BE40", "#D49828"], far: "#C08418", sn: [C.cream, C.creamD], dy: -4, bx: 27, bw: 56, by: 40, bh: 26, hy: 40, hx: 22,
    back: tailUp("#F1BE40", 6.5, "M82 48 Q93 42 91 28"),
    post: `${ear(30, 42, 5.5, 10, 12, "#C08418")}
<g ${Bs}><path d="M44 40 V66 M60 40 V66" stroke="${C.blueD}" stroke-width="4.4"/><path d="M42 41 H62" stroke="${C.blueD}" stroke-width="3.6" stroke-linecap="round"/><path d="M40 47 C37 51 36 55 38 60" fill="none" stroke="${C.blueD}" stroke-width="3.2" stroke-linecap="round"/></g>
<g ${Bs}><path d="M47 40 V26 H63 V40" fill="none" stroke="${C.metal}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></g>
<g ${Bs}><rect x="44" y="53" width="16" height="4" rx="1" fill="${C.blue}"/></g>`,
  }) },

  // ------------------------------------------------------------------ goat
  { u: "1f410", n: "goat", draw: (t) => {
    const { lin } = t;
    const w = [C.paper, "#EBDEC2", "#C9B993"];
    return quad(t, {
      fur: w, far: "#B9A97F", leg: "#E6D8B8", bx: 28, bw: 54, by: 38, bh: 27, hoof: C.dark, lw: 8, dy: 0,
      back: tailUp("#E6D8B8", 5, "M80 44 Q86 36 84 28"),
      pre: `<g ${B}><path d="M30 28 C34 10 48 4 62 8 C50 10 44 18 42 30Z" fill="${lin([C.cream, "#B9A47A"], "d")}"/></g>`,
      neck: `<path d="M28 50 L24 26 L42 22 L48 48Z" fill="${lin([C.paper, "#EBDEC2"], "d")}"/>`,
      head: `<g ${Bs}><path d="M14 44 C12 54 16 62 19 66 C20 58 24 52 25 46Z" fill="${lin([C.paper, "#C9B993"])}"/></g>
<g ${B}><path d="M22 18 C32 16 38 24 36 32 C34 40 22 46 16 46 C8 46 6 38 10 32 C12 24 16 18 22 18Z" fill="${lin(w, "d")}"/></g>
<g ${B}><ellipse cx="11" cy="40" rx="6.2" ry="5" transform="rotate(-20 11 40)" fill="${lin(["#F4E4D8", "#D9B7A8"])}"/></g>
<ellipse cx="8" cy="38.5" rx="1.8" ry="1.4" fill="${C.darkD}"/>
${ear(38, 31, 9, 3.6, 18, "#D9C9A3")}${eye(23, 29, 0.62)}`,
    });
  } },

  // ----------------------------------------------------------------- otter
  { u: "1f9a6", n: "otter", draw: ({ lin }) => {
    const fur = ["#B98458", "#8C5A34", "#6B4324"];
    return `<g transform="translate(5 -5) scale(.95)">
<g ${Bs}><path d="M8 82 C16 78 20 86 28 82 C36 78 40 86 48 82 C56 78 60 86 68 82 C76 78 80 86 90 82" fill="none" stroke="${C.blueM}" stroke-width="3.6" stroke-linecap="round" opacity=".85"/></g>
<g ${B}><path d="M64 56 C78 52 90 58 96 72 C84 74 72 72 62 68Z" fill="${lin(fur, "h")}"/></g>
<g ${B}><rect x="64" y="62" width="9" height="16" rx="4.5" fill="${fur[2]}"/><rect x="38" y="62" width="9" height="16" rx="4.5" fill="${fur[2]}"/></g>
<g ${B}><path d="M22 54 C22 42 36 38 50 42 C62 44 72 50 74 60 C74 70 62 72 48 72 C32 72 22 66 22 54Z" fill="${lin(fur, "d")}"/></g>
<g ${Bs}><path d="M30 64 C40 70 56 70 66 66 C62 72 46 74 34 72Z" fill="${lin(["#E6C9A0", "#C9A074"])}"/></g>
<g ${B}><rect x="52" y="64" width="9" height="16" rx="4.5" fill="${fur[1]}"/><rect x="28" y="64" width="9" height="16" rx="4.5" fill="${fur[1]}"/></g>
<g ${B}><ellipse cx="62" cy="80" rx="6" ry="3" fill="${fur[2]}"/><ellipse cx="33" cy="80" rx="6" ry="3" fill="${fur[2]}"/></g>
<g ${B}><circle cx="34" cy="34" r="5" fill="${fur[2]}"/></g>
<g ${B}><ellipse cx="25" cy="46" rx="16" ry="14" fill="${lin(fur, "d")}"/></g>
<g ${B}><ellipse cx="14" cy="53" rx="10" ry="7.5" fill="${lin([C.cream, "#E3C39A"])}"/></g>
<ellipse cx="7" cy="50" rx="3.2" ry="2.4" fill="${C.darkD}"/>
<path d="M9 55 Q13 58 17 55 M12 51 L2 46 M12 54 L1 55 M12 57 L3 63" fill="none" stroke="${C.dark}" stroke-width="1" stroke-linecap="round" opacity=".45"/>
${eye(23, 42, 0.7)}</g>`;
  } },

  // ------------------------------------------------------------ polar bear
  { u: "1f43b-200d-2744-fe0f", n: "polar bear", draw: ({ lin }) => {
    const w = [C.paper, "#EDE3C8", C.creamD];
    const arm = (a) => `M86 22 L${(86 + 9 * Math.cos(a)).toFixed(1)} ${(22 + 9 * Math.sin(a)).toFixed(1)} M86 22 L${(86 - 9 * Math.cos(a)).toFixed(1)} ${(22 - 9 * Math.sin(a)).toFixed(1)}`;
    const sf = [0, Math.PI / 3, (2 * Math.PI) / 3].map(arm).join(" ");
    return `
<g ${B}><path d="M6 78 C14 72 30 70 46 72 C66 70 84 72 94 80 C90 92 70 96 50 96 C28 96 10 92 6 78Z" fill="${lin(["#F2FAFE", C.sky, C.skyD], "d")}"/></g>
<path d="M18 82 C26 80 36 82 40 84 M60 86 C68 84 78 84 84 82" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
<g ${B}><circle cx="18" cy="24" r="11" fill="${lin(w, "d")}"/><circle cx="66" cy="24" r="11" fill="${lin(w, "d")}"/></g>
<circle cx="19" cy="25" r="5" fill="${C.pinkD}" opacity=".5"/><circle cx="65" cy="25" r="5" fill="${C.pinkD}" opacity=".5"/>
<g ${B}><ellipse cx="42" cy="50" rx="33" ry="29" fill="${lin(w, "d")}"/></g>
<g ${B}><ellipse cx="42" cy="62" rx="15" ry="11" fill="${lin([C.paper, "#E8D9B5"])}"/></g>
${eye(29, 47, 0.8)}${eye(55, 47, 0.8)}${blush(20, 60)}${blush(64, 60)}
<ellipse cx="42" cy="57" rx="6" ry="4.2" fill="${C.darkD}"/><ellipse cx="40.4" cy="55.6" rx="1.8" ry="1" fill="#fff" opacity=".6"/>
<path d="M42 61 V66 M42 66 Q37 71 33 67 M42 66 Q47 71 51 67" fill="none" stroke="${C.darkD}" stroke-width="1.7" stroke-linecap="round"/>
<g ${Bs}><path d="${sf}" fill="none" stroke="${C.blueM}" stroke-width="3" stroke-linecap="round"/></g>
<circle cx="86" cy="22" r="2.4" fill="${C.blue}"/>`;
  } },

  // ----------------------------------------------------------------- sloth
  { u: "1f9a5", n: "sloth", draw: ({ lin }) => {
    const fur = ["#C4A982", "#97785A", "#6F573F"];
    const claws = (x, d) => [0, 4.4, 8.8].map((k) => `<path d="M${x + d * k - 4} 27 L${x + d * k - 4} 34" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round"/>`).join("");
    return `
<g ${B}><path d="M4 18 C4 12 10 12 14 13 H86 C92 12 96 14 96 18 C96 24 90 24 86 24 H14 C8 24 4 23 4 18Z" fill="${lin([C.wood, C.woodD, C.woodDD])}"/></g>
<g ${B}><path d="M30 24 C26 40 24 54 30 62" fill="none" stroke="${lin(fur)}" stroke-width="10" stroke-linecap="round"/><path d="M70 24 C74 40 76 54 70 62" fill="none" stroke="${lin(fur)}" stroke-width="10" stroke-linecap="round"/></g>
<g ${Bs}>${claws(24, 1)}${claws(64, 1)}</g>
<g ${B}><ellipse cx="50" cy="74" rx="26" ry="19" fill="${lin(fur, "d")}"/><ellipse cx="36" cy="90" rx="8" ry="5" fill="${fur[2]}"/><ellipse cx="64" cy="90" rx="8" ry="5" fill="${fur[2]}"/></g>
<path d="M32 76 C38 80 40 76 44 82 M56 80 C62 76 64 82 70 78" fill="none" stroke="${fur[2]}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
<g ${B}><ellipse cx="50" cy="50" rx="24" ry="22" fill="${lin(fur, "d")}"/></g>
<g ${B}><path d="M34 46 C34 38 44 36 50 40 C56 36 66 38 66 46 C66 60 58 68 50 68 C42 68 34 60 34 46Z" fill="${lin([C.cream, "#E8D2A8"])}"/></g>
<path d="M36 44 C42 42 46 48 44 54 C38 54 34 50 36 44Z M64 44 C58 42 54 48 56 54 C62 54 66 50 64 44Z" fill="${C.darkD}" opacity=".75"/>
${eye(41, 49, 0.62)}${eye(59, 49, 0.62)}
<ellipse cx="50" cy="56.5" rx="3.6" ry="2.6" fill="${C.darkD}"/><path d="M43 61 Q50 66 57 61" fill="none" stroke="${C.darkD}" stroke-width="1.7" stroke-linecap="round"/>`;
  } },

  // ---------------------------------------------------------------- lizard
  { u: "1f98e", n: "lizard", draw: ({ lin }) => {
    const g = [C.green, C.greenM, C.greenD];
    const limb = (d, toes) => `<g ${B}><path d="${d}" fill="none" stroke="${lin(g, "d")}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g><path d="${toes}" fill="none" stroke="${C.greenD}" stroke-width="2.6" stroke-linecap="round"/>`;
    return `
<g ${B}><path d="M50 52 C60 66 70 66 78 74 C84 80 88 86 95 90 C84 94 72 90 62 82 C54 76 44 72 38 60Z" fill="${lin(g, "d")}"/></g>
${limb("M34 42 L16 48 L11 40", "M11 40 L6 38 M11 40 L12 33 M16 48 L9 52")}
${limb("M40 33 L52 25 L60 30", "M60 30 L66 31 M60 30 L62 23 M52 25 L50 18")}
${limb("M44 60 L30 72 L21 66", "M21 66 L15 68 M21 66 L19 59 M30 72 L26 79")}
${limb("M52 54 L68 54 L72 64", "M72 64 L77 68 M72 64 L66 66 M68 54 L72 47")}
<g ${B}><ellipse cx="42" cy="47" rx="15" ry="22" transform="rotate(-38 42 47)" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g ${B}><ellipse cx="22" cy="25" rx="14" ry="10" transform="rotate(-40 22 25)" fill="${lin([C.green, C.greenM], "d")}"/></g>
<path d="M18 38 L16 36" stroke="none"/>
<g fill="${C.yellowM}" opacity=".85"><circle cx="39" cy="45" r="2.6"/><circle cx="45" cy="52" r="2.6"/><circle cx="33" cy="38" r="2.2"/><circle cx="51" cy="59" r="2.2"/></g>
${eye(28, 20, 0.58)}${eye(16, 29, 0.58)}
<path d="M10 22 L14 26" stroke="${C.greenD}" stroke-width="1.4" stroke-linecap="round"/>`;
  } },

  // ----------------------------------------------------------------- eagle
  { u: "1f985", n: "eagle", draw: ({ lin }) => {
    const br = ["#A97248", C.woodD, "#5E3B20"];
    return `
<g ${B}><path d="M14 90 C14 84 20 84 24 85 H88 C94 84 96 90 90 92 H20 C16 92 14 92 14 90Z" fill="${lin([C.wood, C.woodD, C.woodDD])}"/></g>
<g ${B}><path d="M52 66 L62 97 L84 92 L76 60Z" fill="${lin([C.paper, C.creamD], "d")}"/></g>
<path d="M64 76 L70 94 M72 72 L77 92" stroke="${C.creamD}" stroke-width="1.8" opacity=".9"/>
<g ${B}><path d="M30 40 C20 58 28 82 44 90 H66 C68 70 64 46 52 34 C44 30 34 32 30 40Z" fill="${lin(br, "d")}"/></g>
<g ${Bs}><path d="M30 60 Q36 66 44 62 M32 72 Q40 78 48 72 M44 52 Q50 58 56 52" fill="none" stroke="${br[2]}" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>
<g ${B}><path d="M44 42 C60 46 68 66 66 90 H56 C54 74 48 60 40 50Z" fill="${lin([br[1], "#4A2E18"], "d")}"/></g>
<g ${Bs}><ellipse cx="46" cy="90" rx="5" ry="3" fill="${lin([C.yellow, C.yellowD])}"/><ellipse cx="62" cy="90" rx="5" ry="3" fill="${lin([C.yellow, C.yellowD])}"/></g>
<g ${B}><circle cx="38" cy="24" r="16" fill="${lin([C.paper, "#EBDEC2", C.creamD], "d")}"/></g>
<g ${B}><path d="M26 18 C14 16 10 28 16 38 C18 32 20 30 24 30 C28 28 30 24 28 20Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<path d="M17 32 C19 32 22 32 24 30" fill="none" stroke="${C.yellowD}" stroke-width="1.3"/>
<path d="M28 14 Q34 11 40 14" fill="none" stroke="${C.creamD}" stroke-width="3" stroke-linecap="round"/>
${eye(34, 21, 0.68)}`;
  } },

  // ------------------------------------------------------------------ wing
  { u: "1fabd", n: "wing", draw: ({ lin }) => {
    const P = (t) => { const u = 1 - t; return [u * u * 12 + 2 * u * t * 16 + t * t * 86, u * u * 82 + 2 * u * t * 26 + t * t * 26]; };
    const feats = [], quills = [], cov = [];
    const N = 7;
    for (let i = 0; i < N; i++) {
      const t = 0.1 + (i / (N - 1)) * 0.84;
      const [x, y] = P(t), [x2, y2] = P(t + 0.01);
      const tl = Math.hypot(x2 - x, y2 - y), tx = (x2 - x) / tl, ty = (y2 - y) / tl;
      let dx = -ty * 0.85 + tx * (-0.25 + 0.55 * t), dy = tx * 0.85 + ty * (-0.25 + 0.55 * t);
      const dl = Math.hypot(dx, dy); dx /= dl; dy /= dl;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
      const len = 34 + 22 * Math.pow(t, 1.2);
      feats.push(`<ellipse cx="0" cy="${(len / 2).toFixed(0)}" rx="7.2" ry="${(len / 2).toFixed(0)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(0)})"/>`);
      quills.push(`<path d="M0 4 V${(len - 8).toFixed(0)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(0)})"/>`);
      cov.push(`<ellipse cx="0" cy="9" rx="7.6" ry="11" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(0)})"/>`);
    }
    return `<g transform="translate(0 -2) scale(.94)">
<g ${B}><g fill="${lin(["#EBDFC2", "#C4B38C"], "d")}">${feats.join("")}</g></g>
<g fill="none" stroke="#B9A97F" stroke-width="1.2" stroke-linecap="round" opacity=".7">${quills.join("")}</g>
<g ${B}><g fill="${lin([C.paper, "#E8DABA"], "d")}">${cov.join("")}</g></g>
<g ${B}><path d="M${P(0)[0]} ${P(0)[1]} Q16 26 86 26" fill="none" stroke="${lin([C.paper, "#E4D7B8"], "d")}" stroke-width="11" stroke-linecap="round"/></g></g>`;
  } },

  // --------------------------------------------------------------- phoenix
  { u: "1f426-200d-1f525", n: "phoenix", draw: ({ lin }) => `
<g ${B}><path d="M62 62 C74 54 90 62 96 82 C84 80 76 74 70 70Z" fill="${lin([C.yellow, C.gold, C.orange])}"/></g>
<g ${B}><path d="M60 66 C70 66 82 76 84 94 C74 90 66 82 58 72Z" fill="${lin([C.orange, C.orangeD, C.red])}"/></g>
<g ${B}><path d="M56 70 C60 76 64 88 56 96 C50 88 50 78 52 72Z" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><path d="M46 52 C38 30 54 8 86 6 C82 16 86 24 80 32 C76 26 72 32 70 38 C66 34 62 40 62 48 C58 44 54 50 54 60Z" fill="${lin([C.yellow, C.orange, C.redM], "d")}"/></g>
<path d="M54 46 C58 34 66 22 80 14" fill="none" stroke="${C.gold}" stroke-width="2.6" stroke-linecap="round" opacity=".8"/>
<g ${B}><ellipse cx="46" cy="62" rx="24" ry="17" transform="rotate(-12 46 62)" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><ellipse cx="38" cy="68" rx="13" ry="8" fill="${lin([C.orange, C.red])}"/></g>
<g ${B}><path d="M22 40 C26 28 42 28 44 42 C46 54 36 58 30 54 C22 52 20 46 22 40Z" fill="${lin([C.red, C.redM], "d")}"/></g>
<g transform="translate(1 6)"><g ${B}><path d="M30 28 C26 18 32 8 44 4 C38 12 40 18 42 28Z" fill="${lin([C.gold, C.orange])}"/><path d="M26 30 C18 24 18 14 24 8 C24 16 28 22 32 26Z" fill="${lin([C.yellow, C.orange])}"/></g></g>
<g ${B}><path d="M24 40 C14 38 8 44 10 52 C16 50 20 50 26 50Z" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
${eye(31, 40, 0.68)}`,
  },

  // ------------------------------------------------------------------ worm
  { u: "1fab1", n: "worm", draw: ({ lin }) => {
    const d = "M74 88 C74 72 30 76 30 56 C30 40 64 44 60 24";
    return `<g transform="translate(0 -5)">
<g ${B}><path d="M6 84 C14 74 30 72 50 74 C70 72 88 74 94 84 C94 92 84 96 50 96 C16 96 6 92 6 84Z" fill="${lin(["#B58455", C.woodD, C.woodDD], "d")}"/></g>
<g fill="${C.woodDD}" opacity=".5"><circle cx="20" cy="86" r="2"/><circle cx="36" cy="90" r="1.6"/><circle cx="82" cy="87" r="2"/></g>
<g ${B}><path d="${d}" pathLength="100" fill="none" stroke="${lin(["#F2A0A8", C.pinkD, "#C9677F"], "h")}" stroke-width="17" stroke-linecap="round"/></g>
<path d="${d}" pathLength="100" fill="none" stroke="#8E3F55" stroke-width="17" stroke-dasharray="0.8 4.2" opacity=".28"/>
<path d="${d}" pathLength="100" fill="none" stroke="#F8D3D0" stroke-width="16" stroke-dasharray="0 70 11 100" opacity=".55"/>
${eye(55, 21, 0.78)}${eye(66, 21, 0.78)}${blush(52, 29, 3.4)}${blush(69, 29, 3.4)}
<path d="M56 29 Q61 33 66 29" fill="none" stroke="${C.darkD}" stroke-width="1.6" stroke-linecap="round"/></g>`;
  } },

  // ----------------------------------------------------------------- squid
  { u: "1f991", n: "squid", draw: ({ lin }) => {
    const pk = [C.pink, C.pinkD, "#C9677F"];
    const T = (s) => `<g transform="translate(44 42) rotate(-40) scale(1.02) translate(-50 -50)">${s}</g>`;
    const arms = [38, 44, 50, 56, 62].map((x, i) => `M${x} 64 C${x + (i - 2) * 3} 74 ${x + (i - 2) * 7} 82 ${x + (i - 2) * 6} 92`).join(" ");
    const tent = "M45 64 C34 78 36 90 32 98 M55 64 C66 78 64 90 68 98";
    return `
<g ${B}>${T(`<path d="M50 4 L82 32 C70 38 60 38 50 36 C40 38 30 38 18 32Z" fill="${lin([C.pinkD, "#C9677F"])}"/>`)}</g>
<g ${Bs}>${T(`<path d="${tent}" fill="none" stroke="${lin(pk, "d")}" stroke-width="3.6" stroke-linecap="round"/>`)}</g>
<g ${Bs}>${T(`<path d="${arms}" fill="none" stroke="${C.pinkD}" stroke-width="4.4" stroke-linecap="round"/>`)}</g>
<g ${B}>${T(`<path d="M50 8 C66 20 70 44 63 66 H37 C30 44 34 20 50 8Z" fill="${lin(pk, "d")}"/>`)}</g>
${T(`<path d="M50 14 V50 M42 24 Q40 40 44 54 M58 24 Q60 40 56 54" fill="none" stroke="#B04A66" stroke-width="1.6" stroke-linecap="round" opacity=".4"/><ellipse cx="38" cy="52" rx="4" ry="9" fill="#fff" opacity=".25"/><circle cx="32" cy="98" r="0" />`)}
${T(`<ellipse cx="40.5" cy="64" rx="5.4" ry="6.6" fill="${C.darkD}"/><ellipse cx="59.5" cy="64" rx="5.4" ry="6.6" fill="${C.darkD}"/><circle cx="38.8" cy="61.6" r="1.8" fill="#fff"/><circle cx="57.8" cy="61.6" r="1.8" fill="#fff"/>`)}`;
  } },

  // --------------------------------------------------------------- dolphin
  { u: "1f42c", n: "dolphin", draw: ({ lin }) => {
    const bl = [C.blue, C.blueM, C.blueD];
    return `
<g ${B}><path d="M70 50 C82 48 86 36 80 24 C86 26 90 22 92 14 C94 24 92 30 96 34 C90 34 88 40 88 46 C90 52 84 58 74 60Z" fill="${lin(bl, "d")}"/></g>
<g ${B}><path d="M46 38 C50 24 58 16 70 14 C66 22 66 30 64 40Z" fill="${lin([C.blueM, C.blueD])}"/></g>
<g ${B}><path d="M5 62 C8 56 16 56 20 52 C24 38 40 30 56 34 C70 38 78 46 84 56 C82 66 66 72 50 72 C36 72 26 66 20 64 C14 66 8 66 5 62Z" fill="${lin(bl, "d")}"/></g>
<g ${Bs}><path d="M20 64 C26 68 36 74 50 74 C66 74 76 68 82 62 C76 74 62 78 48 78 C34 78 24 72 20 64Z" fill="${lin([C.paper, "#C8D4EC"])}"/></g>
<g ${B}><path d="M38 58 C36 68 40 78 48 84 C50 76 50 66 46 58Z" fill="${lin([C.blueM, C.blueD])}"/></g>
<path d="M6 63 C10 62 16 60 21 57" fill="none" stroke="${C.navyD}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
<path d="M30 42 C38 36 48 36 54 40" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".3"/>
${eye(27, 52, 0.62)}`;
  } },

  // -------------------------------------------------------------- hyacinth
  { u: "1fabb", n: "hyacinth", draw: ({ lin }) => {
    const rows = [[64, [37, 49, 61]], [54, [43, 55]], [44, [37, 49, 61]], [34, [43, 55]], [24, [38, 50, 62]], [15, [44, 56]]];
    const c1 = lin(["#C9B2EE", C.purple, C.purpleD], "d");
    const c2 = lin(["#B6A0E8", "#9479CC", "#6A4FA8"], "d");
    let i = 0;
    const fl = rows
      .map(([y, xs]) => xs.map((x) => `<polygon points="${star(x, y, 7.2, 4.2, 6).replace(/\.\d+/g, (m) => m.slice(0, 2))}" fill="${i++ % 2 ? c1 : c2}" stroke="${C.purpleD}" stroke-width=".5" stroke-linejoin="round"/>`).join(""))
      .join("");
    return `
<g ${B}><path d="M50 96 C30 86 14 66 14 44 C28 60 42 76 50 96Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/><path d="M50 96 C70 86 86 66 86 44 C72 60 58 76 50 96Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g ${B}><path d="M45 96 L46 56 H54 L55 96Z" fill="${lin([C.greenM, C.greenD], "h")}"/></g>
<g ${Bs}>${fl}</g>`;
  } },

  // -------------------------------------------------------- four leaf clover
  { u: "1f340", n: "four leaf clover", draw: ({ lin }) => {
    const heart = "M0 0 C-5 -6 -22 -8 -22 -22 C-22 -32 -9 -35 0 -26 C9 -35 22 -32 22 -22 C22 -8 5 -6 0 0Z";
    const leaf = (a) => `<g ${B}><g transform="translate(50 46) rotate(${a}) scale(1.12)"><path d="${heart}" fill="${lin(["#B4D8A4", C.greenM, C.greenD], "d")}"/></g></g>
<g transform="translate(50 46) rotate(${a}) scale(1.12)"><path d="M0 -3 V-23" stroke="#D3EAC6" stroke-width="1.6" stroke-linecap="round" opacity=".8"/><path d="M-13 -26 Q-9 -14 -3 -8 M13 -26 Q9 -14 3 -8" fill="none" stroke="#D3EAC6" stroke-width="1.1" opacity=".5"/></g>`;
    return `
<g ${B}><path d="M50 46 C52 64 42 80 56 94" fill="none" stroke="${C.greenD}" stroke-width="4.6" stroke-linecap="round"/></g>
${[-135, 135, -45, 45].map(leaf).join("")}
<g ${Bs}><circle cx="50" cy="46" r="3.4" fill="${lin([C.green, C.greenD])}"/></g>`;
  } },

  // ------------------------------------------------- leaf fluttering in wind
  { u: "1f343", n: "leaf fluttering in wind", draw: ({ lin }) => `
<g ${B}><g transform="rotate(38 66 42)"><path d="M66 6 C92 20 92 56 66 76 C40 56 40 20 66 6Z" fill="${lin(["#B4D8A4", C.greenM, C.greenD], "d")}"/><path d="M66 74 L66 86" stroke="${C.woodD}" stroke-width="3.4" stroke-linecap="round"/></g></g>
<g transform="rotate(38 66 42)" fill="none" stroke="#D3EAC6" stroke-linecap="round"><path d="M66 78 V14" stroke-width="2"/><path d="M66 60 L54 50 M66 48 L52 36 M66 36 L56 28 M66 60 L78 50 M66 48 L80 36 M66 36 L76 28" stroke-width="1.3" opacity=".7"/></g>
<g ${Bs}><path d="M6 38 H36 C48 38 50 24 40 23 C34 23 33 31 38 32" fill="none" stroke="${C.blueM}" stroke-width="3.6" stroke-linecap="round"/><path d="M8 56 H46 C58 56 60 70 50 70 C44 70 44 63 49 63" fill="none" stroke="${C.blueM}" stroke-width="3.6" stroke-linecap="round"/><path d="M14 74 H32" fill="none" stroke="${C.blueM}" stroke-width="3.6" stroke-linecap="round"/></g>
<g ${B}><g transform="rotate(-30 82 84)"><path d="M82 74 C92 80 92 90 82 96 C72 90 72 80 82 74Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>`,
  },
];
