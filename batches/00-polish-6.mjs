// Redraws of weak icons, round 6 (build.mjs lets files named 00-* win).
import { B, Bs, C } from "../kit.mjs";

const wave = (x0, x1, y, a, l, sgn = 1) => {
  let d = `M${x0} ${y} Q${x0 + l / 4} ${y - 2 * a * sgn} ${x0 + l / 2} ${y}`;
  for (let x = x0 + l; x <= x1 + 0.1; x += l / 2) d += ` T${x} ${y}`;
  return d;
};

// ── lock helper (from objects-5), scaled into the upper left for the key variant
function lockShape(lin, tf) {
  return `<g ${B}><g transform="${tf}"><path d="M33 44 V30 a17 17 0 0 1 34 0 V44" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="9" stroke-linecap="round"/></g></g>
<g ${B}><g transform="${tf}"><rect x="18" y="42" width="64" height="50" rx="9" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g></g>
<g transform="${tf}"><rect x="23" y="46" width="54" height="3" rx="1.5" fill="#fff" opacity=".35"/><circle cx="50" cy="62" r="6.5" fill="${C.woodDD}"/><path d="M47 64 L45.5 78 H54.5 L53 64Z" fill="${C.woodDD}"/></g>`;
}

// ── dna helix: rotated by hand so the bevel stays outside any rotation
function dna(lin) {
  const A = 17, N = 2.25, L = 42, ROT = (36 * Math.PI) / 180;
  const P = (s, off) => {
    const u = off, v = -L + (2 * L * s);
    return [50 + u * Math.cos(ROT) - v * Math.sin(ROT), 50 + u * Math.sin(ROT) + v * Math.cos(ROT)];
  };
  const T = (s) => s * N * 2 * Math.PI;
  const run = (sign, front) => {
    let d = "", pen = false;
    for (let i = 0; i <= 80; i++) {
      const s = i / 80, t = T(s), isF = Math.cos(t) * sign > 0;
      if (isF === front) {
        const [x, y] = P(s, sign * A * Math.sin(t));
        d += `${pen ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
        pen = true;
      } else pen = false;
    }
    return d;
  };
  const cols = [C.green, C.orange, C.yellowM, C.teal];
  let rungs = "";
  let k = 0;
  for (let i = 1; i < 13; i++) {
    const s = i / 13, t = T(s), sn = Math.sin(t);
    if (Math.abs(sn) < 0.45) continue;
    const [x1, y1] = P(s, A * sn), [x2, y2] = P(s, -A * sn);
    rungs += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${cols[k++ % 4]}" stroke-width="3.6" stroke-linecap="round"/>`;
  }
  return `<g ${Bs}><path d="${run(1, false)}" fill="none" stroke="${C.blueD}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/><path d="${run(-1, false)}" fill="none" stroke="${C.redD}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${Bs}>${rungs}</g>
<g ${Bs}><path d="${run(1, true)}" fill="none" stroke="${C.blueM}" stroke-width="6.8" stroke-linecap="round" stroke-linejoin="round"/><path d="${run(-1, true)}" fill="none" stroke="${C.red}" stroke-width="6.8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}

// ── wheel used by the wheelchair
const wheel = (lin, cx, cy, r, w) => `<g ${B}><circle cx="${cx}" cy="${cy}" r="${r - w / 2}" fill="none" stroke="${C.dark}" stroke-width="${w}"/></g>
<circle cx="${cx}" cy="${cy}" r="${r - w - 0.5}" fill="none" stroke="${C.metal}" stroke-width="1.8"/>
<g ${Bs}><circle cx="${cx}" cy="${cy}" r="${(r * 0.3).toFixed(1)}" fill="${lin([C.metalL, C.metalD], "d")}"/></g>`;

export default [
  // ───────── melon: whole honeydew plus a cut slice with seeds
  {
    u: "1f348",
    n: "melon",
    draw: ({ lin, rad }) => `
<path d="M38 14 C40 8 44 6 48 4" stroke="${C.woodD}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
<g ${B}><circle cx="38" cy="42" r="30" fill="${rad(["#E8F0B8", "#C4D88A", "#8FB265"], 0.34, 0.3, 0.85)}"/></g>
<path d="M38 12 C26 28 26 56 38 72 M38 12 C50 28 50 56 38 72 M10 38 C26 44 50 44 66 38" fill="none" stroke="${C.greenD}" stroke-width="1.3" opacity=".3"/>
<ellipse cx="25" cy="30" rx="5" ry="9" transform="rotate(25 25 30)" fill="#fff" opacity=".35"/>
<g ${B}><path d="M36 60 H96 C96 80 82 94 66 94 C50 94 36 80 36 60Z" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}><path d="M41 60 H91 C91 77 79 88.5 66 88.5 C53 88.5 41 77 41 60Z" fill="${lin(["#F3F6CC", "#D3E39A", "#A9CC78"])}"/></g>
<g fill="#F7F2D6" stroke="#B9AE72" stroke-width=".7"><ellipse cx="56" cy="68" rx="3" ry="1.7" transform="rotate(-18 56 68)"/><ellipse cx="66" cy="70" rx="3" ry="1.7"/><ellipse cx="76" cy="68" rx="3" ry="1.7" transform="rotate(18 76 68)"/><ellipse cx="61" cy="75" rx="3" ry="1.7" transform="rotate(-10 61 75)"/><ellipse cx="71" cy="75" rx="3" ry="1.7" transform="rotate(10 71 75)"/></g>`,
  },

  // ───────── mango: lopsided kidney, green shoulder, red blush, stem + leaf
  {
    u: "1f96d",
    n: "mango",
    draw: ({ lin, rad }) => `<g transform="translate(0 3)">
<g ${B}><g transform="rotate(-24 50 52)">
<path d="M26 24 C46 4 86 14 90 48 C94 74 72 92 48 90 C22 88 8 66 14 44 C16 34 20 28 26 24Z" fill="${lin(["#E4DE6A", "#F5B84C", "#EE8A44", "#D9503F"], "d")}"/>
</g></g>
<g transform="rotate(-24 50 52)"><ellipse cx="34" cy="38" rx="6" ry="13" transform="rotate(30 34 38)" fill="#fff" opacity=".3"/><path d="M52 76 C66 74 78 62 82 48" fill="none" stroke="${C.redD}" stroke-width="2" opacity=".2"/></g>
<path d="M27 24 C26 16 28 10 33 6" stroke="${C.woodD}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
<g ${Bs}><path d="M33 12 C42 0 64 -1 74 6 C66 20 46 22 33 12Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<path d="M38 12 C48 8 60 6 70 7" fill="none" stroke="${C.greenD}" stroke-width="1.1" opacity=".7"/></g>`,
  },

  // ───────── olive: big green olive with a red pimento, black olive, leaf
  {
    u: "1fad2",
    n: "olive",
    draw: ({ lin, rad }) => `
<path d="M62 34 C68 22 74 14 88 10" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round" fill="none"/>
<g ${Bs}><path d="M64 30 C66 14 82 8 94 10 C94 24 80 34 64 30Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/><path d="M74 20 C82 6 90 6 98 4 C98 16 90 22 74 20Z" fill="${lin([C.greenM, C.greenD], "d")}" transform="translate(-14 12) scale(.9)"/></g>
<g ${B}><g transform="rotate(26 74 70)"><ellipse cx="74" cy="70" rx="15.5" ry="20" fill="${rad(["#8C7C8C", C.dark, "#2D2629"], 0.34, 0.3, 0.85)}"/></g></g>
<g transform="rotate(26 74 70)"><ellipse cx="74" cy="53.5" rx="5" ry="2.8" fill="#1F191C" opacity=".8"/><ellipse cx="68" cy="64" rx="3" ry="6" fill="#fff" opacity=".22"/></g>
<g ${B}><g transform="rotate(-26 38 54)"><ellipse cx="38" cy="54" rx="27" ry="36" fill="${rad(["#D5E080", "#9DB448", "#5E7C2C"], 0.34, 0.28, 0.85)}"/></g></g>
<g transform="rotate(-26 38 54)"><ellipse cx="38" cy="22" rx="10.5" ry="6" fill="#4B6122"/><ellipse cx="38" cy="22" rx="7.4" ry="4.2" fill="${C.red}"/><ellipse cx="36.5" cy="21" rx="3.2" ry="1.5" fill="#fff" opacity=".4"/><ellipse cx="22" cy="48" rx="5" ry="11" fill="#fff" opacity=".28"/></g>`,
  },

  // ───────── ginger root: knobby lobes, ring lines, cut yellow tips
  {
    u: "1fada",
    n: "ginger root",
    draw: ({ lin, clip }) => {
      const shapes = `<ellipse cx="50" cy="64" rx="42" ry="19" transform="rotate(-8 50 64)"/><ellipse cx="24" cy="40" rx="12" ry="21" transform="rotate(-22 24 40)"/><ellipse cx="52" cy="38" rx="12" ry="24"/><ellipse cx="80" cy="42" rx="11" ry="18" transform="rotate(24 80 42)"/><ellipse cx="28" cy="78" rx="16" ry="11"/><ellipse cx="72" cy="78" rx="14" ry="9"/>`;
      return `<g ${B}><g ${clip(shapes)}><rect x="0" y="0" width="100" height="100" fill="${lin(["#F2D9A4", "#D8AE70", "#B07E45"], "d")}"/></g></g>
<g fill="none" stroke="#8E5F30" stroke-width="1.8" stroke-linecap="round" opacity=".55"><path d="M40 28 Q52 33 64 28 M40 40 Q52 45 64 40 M41 52 Q52 57 63 52 M15 33 Q25 38 33 31 M15 46 Q24 51 31 45 M71 36 Q80 41 89 35 M70 48 Q79 53 88 47 M20 70 Q40 78 62 70"/></g>
<g ${Bs}><ellipse cx="52" cy="16.5" rx="8.5" ry="4" fill="${lin(["#FBEFA6", "#F2D26A"])}"/><ellipse cx="18.5" cy="22" rx="7" ry="3.6" transform="rotate(-22 18.5 22)" fill="${lin(["#FBEFA6", "#F2D26A"])}"/><ellipse cx="84" cy="27" rx="6.5" ry="3.4" transform="rotate(24 84 27)" fill="${lin(["#FBEFA6", "#F2D26A"])}"/></g>
<ellipse cx="44" cy="50" rx="10" ry="3.5" fill="#fff" opacity=".22"/>`;
    },
  },

  // ───────── taco: dome shell, ruffled lettuce, tomato, cheese, fold crease
  {
    u: "1f32e",
    n: "taco",
    draw: ({ lin }) => {
      const shell = lin([C.gold, C.goldM, C.goldD], "d");
      const leaf = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
      return `<g transform="translate(0 -8)"><g ${B}><g transform="rotate(-8 50 56)"><path d="M6 62 C4 18 96 18 94 62Z" fill="${lin([C.goldM, C.goldD, "#8E5E18"], "d")}"/></g></g>
<g ${B}><g transform="rotate(-8 50 56)"><g fill="${lin([C.green, C.greenM, C.greenD])}">${leaf(18, 46, 8)}${leaf(30, 38, 9)}${leaf(44, 34, 9)}${leaf(58, 34, 9)}${leaf(72, 38, 9)}${leaf(84, 46, 8)}</g></g></g>
<g transform="rotate(-8 50 56)"><g fill="${C.red}" stroke="${C.redD}" stroke-width=".8"><rect x="24" y="44" width="9" height="9" rx="2" transform="rotate(14 28 48)"/><rect x="52" y="40" width="9" height="9" rx="2" transform="rotate(-10 56 44)"/><rect x="72" y="46" width="8" height="8" rx="2" transform="rotate(20 76 50)"/></g>
<g fill="none" stroke="${C.yellowM}" stroke-width="3.6" stroke-linecap="round"><path d="M36 50 C40 42 46 46 49 52 M60 52 C64 44 68 48 70 54"/></g></g>
<g ${B}><g transform="rotate(-8 50 56)"><path d="M5 58 Q50 72 95 58 C95 82 75 94 50 94 C25 94 5 82 5 58Z" fill="${shell}"/></g></g>
<g transform="rotate(-8 50 56)" fill="none" stroke-linecap="round"><path d="M10 66 C14 80 30 88 48 89" stroke="#FFF3C4" stroke-width="3" opacity=".55"/><path d="M8 61 Q50 74 92 61" stroke="${C.goldD}" stroke-width="2" opacity=".7"/></g>
<g transform="rotate(-8 50 56)" fill="${C.goldD}" opacity=".5"><circle cx="30" cy="76" r="1.6"/><circle cx="58" cy="82" r="1.8"/><circle cx="74" cy="72" r="1.5"/><circle cx="44" cy="70" r="1.3"/></g></g>`;
    },
  },

  // ───────── bacon: two wavy strips, fat and meat lanes
  {
    u: "1f953",
    n: "bacon",
    draw: ({ lin }) => {
      const tf = 'transform="translate(50 52) scale(.93) rotate(-16) translate(-50 -50)"';
      const strip = (y) => {
        const w = (o) => wave(14, 86, y + o, 4, 36);
        return {
          base: `<path d="${w(0)}" stroke="#F4E2C0" stroke-width="26" fill="none" stroke-linejoin="round"/>`,
          bands: `<path d="${w(-5.5)}" stroke="#D95A4B" stroke-width="6.5" fill="none"/><path d="${w(5.5)}" stroke="#D95A4B" stroke-width="6.5" fill="none"/><path d="${w(-5.5)}" stroke="#F28A78" stroke-width="2" fill="none" transform="translate(0 -1.4)"/><path d="${w(5.5)}" stroke="#F28A78" stroke-width="2" fill="none" transform="translate(0 -1.4)"/>`,
        };
      };
      const a = strip(35), b = strip(66);
      return `<g ${B}><g ${tf}>${a.base}</g></g><g ${tf}>${a.bands}</g>
<g ${B}><g ${tf}>${b.base}</g></g><g ${tf}>${b.bands}</g>`;
    },
  },

  // ───────── flatbread: naan teardrop with char blisters and herbs
  {
    u: "1fad3",
    n: "flatbread",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(32 50 52)"><path d="M50 4 C58 26 92 36 90 62 C88 86 68 96 50 96 C32 96 12 86 10 62 C8 36 42 26 50 4Z" fill="${lin(["#FBEBC4", "#EBC98A", "#C99654"], "d")}"/></g></g>
<g transform="rotate(32 50 52)">
<g fill="#7E4F26" opacity=".72"><ellipse cx="38" cy="52" rx="8" ry="5"/><ellipse cx="62" cy="60" rx="7" ry="4.5" transform="rotate(30 62 60)"/><ellipse cx="46" cy="76" rx="6" ry="3.8"/><ellipse cx="68" cy="82" rx="4" ry="2.6"/><ellipse cx="26" cy="72" rx="4" ry="2.8"/><ellipse cx="52" cy="38" rx="4.5" ry="3"/><ellipse cx="76" cy="46" rx="3.4" ry="2.4"/></g>
<g fill="#A8733C" opacity=".5"><ellipse cx="40" cy="64" rx="12" ry="6"/><ellipse cx="62" cy="72" rx="9" ry="5"/></g>
<g fill="#FFF8E0" opacity=".55"><ellipse cx="36" cy="49.5" rx="4" ry="1.8"/><ellipse cx="60" cy="58" rx="3.4" ry="1.6"/><ellipse cx="44" cy="74" rx="3" ry="1.4"/></g>
<g fill="${C.greenM}"><rect x="28" y="60" width="4" height="1.8" rx=".9" transform="rotate(30 30 61)"/><rect x="54" y="48" width="4" height="1.8" rx=".9" transform="rotate(-40 56 49)"/><rect x="48" y="86" width="4" height="1.8" rx=".9"/><rect x="72" y="66" width="4" height="1.8" rx=".9" transform="rotate(60 74 67)"/></g></g>`,
  },

  // ───────── fortune cookie: smile-shaped fold, open mouth with a paper slip rising out
  {
    u: "1f960",
    n: "fortune cookie",
    draw: ({ lin }) => `
<g ${B}><g transform="rotate(-10 50 40)"><rect x="32" y="8" width="32" height="44" rx="2" fill="${lin([C.paper, C.paperD])}"/></g></g>
<g transform="rotate(-10 50 40)" stroke="${C.red}" stroke-width="1.8" stroke-linecap="round"><path d="M38 18 H58 M38 25 H54 M38 32 H58"/></g>
<g ${B}><path d="M5 36 C2 66 28 90 50 90 C72 90 98 66 95 36 C93 26 82 26 78 36 C72 48 62 54 50 54 C38 54 28 48 22 36 C18 26 7 26 5 36Z" fill="${lin(["#FADF9C", "#EBB45E", "#C0803A"], "d")}"/></g>
<path d="M23 38 C29 49 39 54 50 54 C61 54 71 49 77 38 C68 44 32 44 23 38Z" fill="#8A5520" opacity=".55"/>
<path d="M50 56 V88" fill="none" stroke="#A86A28" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
<path d="M10 44 C14 64 30 80 46 84" fill="none" stroke="#FFF1C2" stroke-width="3.6" stroke-linecap="round" opacity=".5"/>
<ellipse cx="76" cy="66" rx="12" ry="7" transform="rotate(-40 76 66)" fill="#B7762F" opacity=".22"/>
<g fill="#A86A28" opacity=".4"><circle cx="24" cy="62" r="1.4"/><circle cx="38" cy="76" r="1.2"/><circle cx="84" cy="52" r="1.4"/><circle cx="64" cy="80" r="1.2"/></g>`,
  },

  // ───────── fried shrimp: tapering curled batter body, segment ridges, red tail fan
  {
    u: "1f364",
    n: "fried shrimp",
    draw: ({ lin }) => {
      const a = "M72 20 C94 34 88 76 56 78";
      const b = "M56 78 C42 78 32 70 33 58";
      const petal = (r, g) => `<path d="M0 0 C-6 -8 -20 -8 -28 0 C-20 8 -6 8 0 0Z" transform="rotate(${r}) scale(1.2 1.3)" fill="${g}"/>`;
      const g = lin([C.red, C.redM, C.redD], "h");
      return `<g ${B}><g transform="translate(34 58) rotate(52)">${petal(-28, g)}${petal(28, g)}${petal(0, g)}</g></g>
<g transform="translate(34 58) rotate(52)" stroke="${C.redD}" stroke-width="1.2" opacity=".55" fill="none"><path d="M-8 0 H-28 M-8 -3 L-24 -11 M-8 3 L-24 11"/></g>
<g ${B}><path d="${b}" fill="none" stroke="#B9732B" stroke-width="18" stroke-linecap="round"/><path d="${a}" fill="none" stroke="#B9732B" stroke-width="25" stroke-linecap="round"/></g>
<path d="${b}" fill="none" stroke="#E7A445" stroke-width="13" stroke-linecap="round"/><path d="${a}" fill="none" stroke="#E7A445" stroke-width="19" stroke-linecap="round"/>
<path d="${a}" fill="none" stroke="#F8D27C" stroke-width="6" stroke-linecap="round" opacity=".7" transform="translate(-2 -3)"/>
<path d="${a}" fill="none" stroke="#A8641F" stroke-width="21" stroke-dasharray="1.8 8" opacity=".5"/><path d="${b}" fill="none" stroke="#A8641F" stroke-width="14" stroke-dasharray="1.8 7" opacity=".5"/>
<g fill="#B9732B" opacity=".75"><circle cx="68" cy="28" r="1.6"/><circle cx="80" cy="50" r="1.8"/><circle cx="64" cy="70" r="1.5"/><circle cx="46" cy="74" r="1.5"/><circle cx="84" cy="64" r="1.4"/><circle cx="74" cy="38" r="1.3"/></g>
<g fill="#FFF0BE" opacity=".8"><circle cx="84" cy="40" r="1.4"/><circle cx="72" cy="72" r="1.3"/><circle cx="58" cy="66" r="1.2"/></g>`;
    },
  },

  // ───────── pouring liquid: tilted glass, thick stream, puddle
  {
    u: "1fad7",
    n: "pouring liquid",
    draw: ({ lin }) => `<g transform="translate(-6 0)">
<g ${B}><ellipse cx="53" cy="89" rx="30" ry="6.5" fill="${lin([C.sky, C.blue, C.blueM])}"/></g>
<g ${B}><path d="M50 60 C48 70 46 78 44 87 L62 87 C60 78 60 70 58 61Z" fill="${lin([C.sky, C.blue, C.blueM], "h")}"/></g>
<g ${B}><g transform="translate(64 34) rotate(-125) scale(1.12)"><path d="M-17 -22 L17 -22 L13 22 Q13 26 9 26 H-9 Q-13 26 -13 22Z" fill="${lin(["#F6FBFF", "#CBE4F4", "#A0C8E6"], "d")}" stroke="${C.blueM}" stroke-width="2.2" stroke-linejoin="round"/></g></g>
<g transform="translate(64 34) rotate(-125) scale(1.12)"><path d="M-12 -17 L-9 18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M-14 -20 H14" stroke="${C.blueD}" stroke-width="1.6" opacity=".5"/><path d="M10 -2 L9 16" stroke="${C.blueM}" stroke-width="2" opacity=".4" stroke-linecap="round"/></g>
<path d="M50 66 C49 74 48 80 47 86" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6" fill="none"/>
<g ${Bs}><circle cx="27" cy="82" r="3.2" fill="${lin([C.sky, C.blueM], "d")}"/><circle cx="82" cy="80" r="2.6" fill="${lin([C.sky, C.blueM], "d")}"/><circle cx="20" cy="73" r="1.8" fill="${C.blue}"/></g></g>`,
  },

  // ───────── mate: gourd, metal rim, heaped yerba, bombilla, stitched leather band
  {
    u: "1f9c9",
    n: "mate",
    draw: ({ lin, rad }) => `
<g ${B}><path d="M16 38 C12 64 24 90 50 91 C76 90 88 64 84 38Z" fill="${lin(["#B8794A", C.woodD, C.woodDD], "d")}"/></g>
<g ${B}><rect x="34" y="86" width="32" height="8" rx="4" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${B}><path d="M19 66 C34 76 66 76 81 66 L82.5 56 C66 66 34 66 17.5 56Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<path d="M22 61 C36 70 64 70 78 61" fill="none" stroke="#FFF1C8" stroke-width="1.3" stroke-dasharray="2.4 2" opacity=".8"/>
<g ${B}><path d="M18 38 C22 14 78 14 82 38Z" fill="${rad(["#B7D38A", "#7DA553", "#4F7B3C"], 0.4, 0.3, 0.85)}"/></g>
<g fill="#E0EDB4" opacity=".7"><circle cx="34" cy="28" r="1.5"/><circle cx="48" cy="24" r="1.4"/><circle cx="62" cy="27" r="1.6"/><circle cx="72" cy="32" r="1.3"/><circle cx="42" cy="32" r="1.2"/></g>
<g fill="#3F6431" opacity=".6"><circle cx="30" cy="33" r="1.3"/><circle cx="56" cy="31" r="1.4"/><circle cx="66" cy="22" r="1.2"/></g>
<g ${B}><path d="M13 38 Q50 56 87 38" fill="none" stroke="${C.metal}" stroke-width="7" stroke-linecap="round"/></g>
<path d="M18 39 Q50 54 82 39" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/>
<g ${Bs}><path d="M52 40 L78 13" stroke="${C.metalD}" stroke-width="4.6" stroke-linecap="round"/><path d="M52 40 L78 13" stroke="${C.metalL}" stroke-width="1.6" stroke-linecap="round"/><rect x="72" y="6" width="14" height="8" rx="4" transform="rotate(-48 79 10)" fill="${lin([C.gold, C.goldD])}"/></g>
<ellipse cx="28" cy="62" rx="3.5" ry="13" transform="rotate(-6 28 62)" fill="#fff" opacity=".2"/>`,
  },

  // ───────── amphora: neck, loop handles, meander band, shoulder dots, base rays
  {
    u: "1f3fa",
    n: "amphora",
    draw: ({ lin, clip }) => {
      const body = "M41 12 C41 24 42 28 30 38 C14 50 18 78 36 88 H64 C82 78 86 50 70 38 C58 28 59 24 59 12Z";
      let m = "M16 62 ";
      for (let i = 0; i < 9; i++) m += `V${i % 2 ? 62 : 54} h4 `;
      const rays = Array.from({ length: 8 }, (_, i) => `M${(18 + i * 9.2).toFixed(1)} 90 L${(22.6 + i * 9.2).toFixed(1)} 76 L${(27.2 + i * 9.2).toFixed(1)} 90Z`).join("");
      return `<g ${B}><path d="M42 18 C14 14 6 36 25 46" fill="none" stroke="${lin([C.wood, C.woodD])}" stroke-width="6.4" stroke-linecap="round"/><path d="M58 18 C86 14 94 36 75 46" fill="none" stroke="${lin([C.wood, C.woodD])}" stroke-width="6.4" stroke-linecap="round"/></g>
<g ${B}><path d="${body}" fill="${lin(["#E49A5C", "#C8703A", "#9A4C24"], "h")}"/></g>
<g ${clip(`<path d="${body}"/>`)}>
<rect x="10" y="36" width="80" height="6.4" fill="${C.woodDD}"/><rect x="10" y="49" width="80" height="17" fill="${lin([C.paper, C.paperD])}"/>
<rect x="10" y="49" width="80" height="2" fill="${C.woodDD}"/><rect x="10" y="64" width="80" height="2" fill="${C.woodDD}"/>
<path d="${m}" fill="none" stroke="${C.woodDD}" stroke-width="2" stroke-linejoin="miter" transform="translate(1 1.5)"/>
<path d="${rays}" fill="${C.woodDD}"/>
<g fill="${C.paper}"><circle cx="30" cy="42.5" r="1"/><circle cx="40" cy="42.5" r="1"/><circle cx="50" cy="42.5" r="1"/><circle cx="60" cy="42.5" r="1"/><circle cx="70" cy="42.5" r="1"/></g>
<ellipse cx="34" cy="56" rx="3" ry="16" fill="#fff" opacity=".25"/></g>
<g ${B}><rect x="35" y="3" width="30" height="9" rx="4.5" fill="${lin([C.wood, C.woodD, C.woodDD])}"/><rect x="34" y="85" width="32" height="9" rx="4" fill="${lin([C.wood, C.woodD, C.woodDD])}"/></g>
<rect x="46" y="12" width="2.4" height="10" fill="#fff" opacity=".25"/>`;
    },
  },

  // ───────── sari: pleated skirt with gold hem, bare midriff, teal blouse, pallu sash across the chest
  {
    u: "1f97b",
    n: "sari",
    draw: ({ lin }) => {
      const pal = lin(["#F5A0A8", C.redM, C.redD], "d");
      return `<g ${B}><path d="M33 52 H67 C74 66 84 80 94 93 H6 C16 80 26 66 33 52Z" fill="${lin(["#F28A8F", C.red, C.redD])}"/></g>
<path d="M41 54 C38 66 30 78 22 92 M50 54 V92 M59 54 C62 66 70 78 78 92" fill="none" stroke="${C.redD}" stroke-width="1.6" opacity=".35"/>
<g ${Bs}><path d="M12 83 H88 L94 93 H6Z" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
<path d="M14 88 H86" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 2.4"/>
<g ${Bs}><rect x="33" y="38" width="34" height="16" rx="3" fill="${lin(["#F6D2B0", "#E0A87C"])}"/></g>
<g ${B}><path d="M33 10 C41 20 59 20 67 10 L88 24 L81 44 L68 37 V42 H32 V37 L19 44 L12 24Z" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<path d="M37 12 C43 19 57 19 63 12" fill="none" stroke="${C.tealD}" stroke-width="2.4" opacity=".6"/>
<g ${B}><path d="M62 18 L74 24 L84 62 L70 66Z" fill="${pal}" stroke="${C.goldM}" stroke-width="1.8" stroke-linejoin="round"/></g>
<path d="M76 62 L77 70 M81 61 L82 69" stroke="${C.gold}" stroke-width="1.6" stroke-linecap="round"/>
<g ${B}><path d="M24 52 L57 9 L72 15 L69 26 L40 62Z" fill="${pal}" stroke="${C.goldM}" stroke-width="2.2" stroke-linejoin="round"/></g>
<path d="M33 54 L61 17 M37 58 L66 22" fill="none" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="3 2.4"/>
<g fill="${C.gold}" opacity=".9"><circle cx="52" cy="30" r="1.8"/><circle cx="46" cy="40" r="1.8"/><circle cx="40" cy="50" r="1.8"/></g>`;
    },
  },

  // ───────── postal horn: coiled brass tube, flared bell, mouthpiece, red cord
  {
    u: "1f4ef",
    n: "postal horn",
    draw: ({ lin }) => {
      let d = "";
      const N = 40;
      for (let i = 0; i <= N; i++) {
        const t = i / N, a = ((135 + 540 * t) * Math.PI) / 180, r = 26 - 16 * t;
        d += `${i ? "L" : "M"}${(60 + r * Math.cos(a)).toFixed(1)} ${(42 + r * Math.sin(a)).toFixed(1)}`;
      }
      const g = lin(["#B27C1E", C.goldM, "#FCE595", C.gold, "#A9741A"], "v");
      return `<path d="M60 68 C58 90 88 92 86 70" fill="none" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/>
<g ${Bs}><path d="M82 70 H90 L92 86 H80Z" fill="${lin([C.red, C.redD])}"/></g>
<g ${B}><g transform="translate(43 60) rotate(-35)"><path d="M2 -4.5 C-12 -5 -24 -8 -36 -14 A5.5 14 0 0 0 -36 14 C-24 8 -12 5 2 4.5Z" fill="${g}"/></g></g>
<g transform="translate(43 60) rotate(-35)"><ellipse cx="-36" cy="0" rx="5.5" ry="14" fill="#6B4324"/><ellipse cx="-35" cy="0" rx="3" ry="9" fill="#3A2412" opacity=".6"/></g>
<g ${B}><path d="${d}" fill="none" stroke="${C.goldM}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M68 34 L85 18" stroke="${C.goldM}" stroke-width="6" stroke-linecap="round"/></g>
<path d="${d}" fill="none" stroke="#FCE595" stroke-width="2" stroke-linecap="round" opacity=".8" transform="translate(-1 -1.4)"/>
<g ${B}><circle cx="87" cy="16" r="6" fill="${lin([C.gold, C.goldD], "d")}"/></g><circle cx="87" cy="16" r="2.6" fill="${C.woodDD}"/>`;
    },
  },

  // ───────── money with wings: big feathered wings either side of a banknote
  {
    u: "1f4b8",
    n: "money with wings",
    draw: ({ lin }) => {
      const f = "M0 0 C5 -8 22 -8 30 0 C22 8 5 8 0 0Z";
      const g = lin([C.paper, "#C5D5EA"], "h");
      const wing = (rx, side) => {
        const long = [[250, 44], [236, 42], [222, 40], [208, 38], [194, 34]];
        const cov = [[244, 26], [226, 26], [208, 24]];
        const mk = (arr, sw) => arr.map(([a, L]) => `<path d="${f}" transform="translate(${rx} 58) rotate(${side > 0 ? a : 180 - a}) scale(${(L / 30).toFixed(2)} ${sw})" fill="${g}" stroke="#9DA9BE" stroke-width="${(1 / (L / 30)).toFixed(2)}"/>`).join("");
        return `<g ${B}>${mk(long, 1.3)}</g><g ${Bs}>${mk(cov, 1.1)}</g>`;
      };
      return `<g transform="translate(0 7)">${wing(41, 1)}${wing(59, -1)}
<g ${B}><g transform="rotate(-8 50 50)"><rect x="26" y="31" width="48" height="36" rx="5" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g></g>
<g transform="rotate(-8 50 50)"><rect x="31" y="36" width="38" height="26" rx="3" fill="none" stroke="${C.paper}" stroke-width="1.2" stroke-dasharray="3 2.2" opacity=".75"/><circle cx="50" cy="49" r="8.5" fill="none" stroke="${C.paper}" stroke-width="1.6" opacity=".9"/><path d="M53.2 45.2 C51 43.4 46.6 44.4 46.6 47.2 C46.6 50.4 53.4 49 53.4 52 C53.4 54.8 48.6 55.2 46.6 53 M50 42.4 V44 M50 54.4 V56" fill="none" stroke="${C.paper}" stroke-width="1.7" stroke-linecap="round"/></g></g>`;
    },
  },

  // ───────── locked with key: lock upper left, big silver key pointing at the keyhole
  {
    u: "1f510",
    n: "locked with key",
    draw: ({ lin }) => `${lockShape(lin, "translate(0 -2) scale(.82)")}
<g ${B}><g transform="translate(76 76) rotate(40)"><path fill-rule="evenodd" d="M-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0Z M-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/><rect x="-52" y="-5" width="42" height="10" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/><path d="M-52 5 h6 v9 h-6Z M-40 5 h6 v7 h-6Z" fill="${C.metal}"/></g></g>
<g transform="translate(76 76) rotate(40)"><rect x="-48" y="-3" width="36" height="2" rx="1" fill="#fff" opacity=".55"/></g>`,
  },

  // ───────── dna: two-colour helix, rungs between the crossings
  { u: "1f9ec", n: "dna", draw: ({ lin }) => dna(lin) },

  // ───────── motorized wheelchair: padded seat and back, joystick, chassis, big drive wheel
  {
    u: "1f9bc",
    n: "motorized wheelchair",
    draw: ({ lin }) => `
<path d="M34 76 L38 86" stroke="${C.metalD}" stroke-width="4" stroke-linecap="round"/>
<g ${B}><circle cx="36" cy="86" r="7" fill="${C.darkD}"/></g><circle cx="36" cy="86" r="2.6" fill="${C.metal}"/>
<path d="M32 62 L14 76" stroke="${C.metalD}" stroke-width="4.4" stroke-linecap="round"/>
<g ${B}><rect x="4" y="74" width="20" height="6" rx="3" fill="${lin([C.dark, C.darkD])}"/></g>
<g ${B}><rect x="22" y="58" width="62" height="22" rx="8" fill="${lin(["#6A7BB8", C.navy, C.navyD])}"/></g>
<rect x="28" y="62" width="30" height="3" rx="1.5" fill="#fff" opacity=".22"/><circle cx="30" cy="73" r="2.4" fill="${C.yellow}"/>
<g ${B}><rect x="26" y="44" width="40" height="15" rx="7" fill="${lin([C.blue, C.blueM, C.blueD])}"/></g>
<g ${B}><g transform="rotate(-5 66 34)"><rect x="60" y="8" width="15" height="50" rx="7.5" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g></g>
<path d="M60 38 V46" stroke="${C.metalD}" stroke-width="3.4"/>
<g ${B}><rect x="30" y="33" width="32" height="6" rx="3" fill="${lin([C.dark, C.darkD])}"/></g>
<g ${Bs}><rect x="37" y="22" width="4" height="12" rx="2" fill="${lin([C.metalL, C.metalD], "h")}"/><circle cx="39" cy="20" r="5" fill="${lin([C.red, C.redD], "d")}"/></g>
${wheel(lin, 66, 70, 22, 8)}
<path d="M66 70 L66 54 M66 70 L81 75 M66 70 L52 77 M66 70 L77 58 M66 70 L55 60" stroke="${C.metal}" stroke-width="1.2" opacity=".8"/>`,
  },

  // ───────── water wave: one big curling wave, foam on the lip, lit hollow
  {
    u: "1f30a",
    n: "water wave",
    draw: ({ lin }) => `<g transform="translate(50 50) scale(.95) translate(-50 -50)">
<g ${B}><path d="M50 38 C80 28 96 44 96 62 V88 H50Z" fill="${lin([C.tealD, C.tealM, "#BDE6DF"])}"/></g>
<g ${B}><path d="M3 90 V72 C3 52 22 40 36 26 C48 13 72 6 84 20 C92 30 92 44 86 53 C84 46 80 38 72 36 C62 34 54 42 56 56 C58 70 74 80 97 80 V90 Q97 94 93 94 H7 Q3 94 3 90Z" fill="${lin(["#B9D8F2", C.blue, C.blueM, C.blueD], "d")}"/></g>
<g fill="none" stroke="#fff" stroke-linecap="round" opacity=".45"><path d="M10 74 C14 60 28 52 40 42" stroke-width="2.2"/><path d="M12 86 C30 84 46 76 56 66" stroke-width="2"/></g>
<g ${B}><g fill="${lin([C.paper, C.paperD], "d")}"><circle cx="46" cy="16" r="5.5"/><circle cx="56" cy="11" r="6"/><circle cx="68" cy="10" r="6"/><circle cx="79" cy="15" r="6"/><circle cx="87" cy="25" r="5.6"/><circle cx="88" cy="37" r="5.6"/><circle cx="85" cy="49" r="5"/><circle cx="36" cy="25" r="4"/></g></g>
<g ${Bs}><g fill="${lin([C.paper, C.paperD], "d")}"><circle cx="64" cy="78" r="4"/><circle cx="76" cy="84" r="4.4"/><circle cx="89" cy="86" r="4.4"/><circle cx="8" cy="91" r="3.6"/></g></g>
<g fill="${C.paper}" stroke="#9DB0CB" stroke-width=".6"><circle cx="94" cy="20" r="1.8"/><circle cx="96" cy="32" r="1.4"/><circle cx="76" cy="3.6" r="1.6"/></g></g>`,
  },
];
