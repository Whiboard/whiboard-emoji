// travel_places-6: weather, sky and elements.
import { B, Bs, C, star } from "../kit.mjs";

const CP = "M22 56 A15 15 0 0 1 20 26 A20 20 0 0 1 56 14 A17 17 0 0 1 82 30 A13 13 0 0 1 80 56Z";
const cloud = (t, tx, ty, s, dark) =>
  `<g ${B}><g transform="translate(${tx} ${ty}) scale(${s})"><path d="${CP}" fill="${dark ? t.lin(["#A3AEC6", "#76839F", "#4F5B7A"]) : t.lin(["#F0F5FA", "#C8D5E5", "#98ACC8"])}"/></g></g>`;

const ray = (cx, cy, r0, r1, n = 8) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    const f = (r) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `M${f(r0)} L${f(r1)}`;
  }).join(" ");

const sunBody = (t, cx, cy, r, r0, r1, w = 6) => `
<g ${Bs}><path d="${ray(cx, cy, r0, r1)}" stroke="#EDB93C" stroke-width="${w}" stroke-linecap="round" fill="none"/></g>
<g ${B}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${t.rad(["#FFEB93", "#F7CB4E", "#E3992E"], 0.36, 0.3, 0.85)}"/></g>`;

const face = (cx, cy, k = 1) => `
<g fill="${C.darkD}" opacity=".85"><circle cx="${cx - 8 * k}" cy="${cy - 3 * k}" r="${2.5 * k}"/><circle cx="${cx + 8 * k}" cy="${cy - 3 * k}" r="${2.5 * k}"/></g>
<ellipse cx="${cx - 13 * k}" cy="${cy + 4 * k}" rx="${4 * k}" ry="${2.6 * k}" fill="${C.red}" opacity=".35"/><ellipse cx="${cx + 13 * k}" cy="${cy + 4 * k}" rx="${4 * k}" ry="${2.6 * k}" fill="${C.red}" opacity=".35"/>
<path d="M${cx - 7 * k} ${cy + 4 * k} Q${cx} ${cy + 12 * k} ${cx + 7 * k} ${cy + 4 * k}" fill="none" stroke="${C.darkD}" stroke-width="${2.2 * k}" stroke-linecap="round" opacity=".85"/>`;

const rain = (pts) =>
  `<g ${Bs}><path d="${pts.map(([x, y]) => `M${x} ${y} l-3 9`).join(" ")}" stroke="#5E86D6" stroke-width="4" stroke-linecap="round" fill="none"/></g>`;

const flake = (x, y, r = 5) =>
  `<g ${Bs}><path d="${[0, 60, 120].map((a) => { const dx = r * Math.cos((a * Math.PI) / 180), dy = r * Math.sin((a * Math.PI) / 180); return `M${(x - dx).toFixed(1)} ${(y - dy).toFixed(1)} L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`; }).join(" ")}" stroke="#86B6E4" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`;

const BOLT = "58,5 24,56 46,56 38,95 76,40 53,40";
const bolt = (t, x, y, s) =>
  `<g ${B}><g transform="translate(${x - 24 * s} ${y - 5 * s}) scale(${s})"><polygon points="${BOLT}" fill="${t.lin(["#FFE98A", C.gold, C.goldM, "#E08A2C"], "d")}" stroke="${C.goldM}" stroke-width="3" stroke-linejoin="round"/></g></g>`;

const sparkle = (x, y, r, f) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="${f}"/>`;

// umbrella canopy: scalloped dome with panels
const CAN = "M6 52 C6 28 28 12 50 12 C72 12 94 28 94 52 q-11 -9 -22 0 q-11 -9 -22 0 q-11 -9 -22 0 q-11 -9 -22 0Z";
const umbrella = (t, cA, cB) => {
  const xs = [6, 28, 50, 72, 94];
  const ext = (x) => `${50 + 3 * (x - 50)},${6 + 3 * 46}`;
  const panels = [1, 3].map((i) => `<polygon points="50,12 ${ext(xs[i])} ${ext(xs[i + 1])}" fill="${cB}"/>`).join("");
  return `<g ${Bs}><path d="M50 40 V84 a7.5 7.5 0 0 1 -15 0" fill="none" stroke="${t.lin([C.woodL, C.woodD])}" stroke-width="4.6" stroke-linecap="round"/><circle cx="50" cy="8" r="3.2" fill="${C.gold}"/></g>
<g ${B}><path d="${CAN}" fill="${cA}"/></g>
<g ${t.clip(`<path d="${CAN}"/>`)}>${panels}</g>
<path d="M50 12 L28 55 M50 12 L72 55 M50 12 L50 52" stroke="${C.darkD}" stroke-width="1" opacity=".25"/>`;
};

const drop = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -7 C3.5 -1 5 2 5 4.5 a5 5 0 0 1 -10 0 C-5 2 -3.5 -1 0 -7Z" fill="${f}"/>`;

const snowman = (t, flakes) => `
<g ${Bs}><path d="M30 62 L8 46 M70 62 L92 44 M13 49 l-5 -8 M89 46.5 l6 -6" fill="none" stroke="${C.woodD}" stroke-width="3.4" stroke-linecap="round"/></g>
<g ${B}><circle cx="50" cy="72" r="23" fill="${t.rad(["#FCFAF2", "#D3DDEA", "#9CB0CC"], 0.36, 0.3, 0.9)}"/></g>
<g ${B}><circle cx="50" cy="40" r="17" fill="${t.rad(["#FCFAF2", "#D3DDEA", "#9CB0CC"], 0.36, 0.3, 0.9)}"/></g>
<g ${B}><rect x="30" y="22" width="40" height="5" rx="2.5" fill="${t.lin([C.metalDD, C.darkD])}"/><rect x="37" y="7" width="26" height="17" rx="3" fill="${t.lin([C.dark, C.darkD])}"/></g>
<rect x="37" y="17" width="26" height="4" fill="${C.red}"/>
<g ${B}><path d="M34 54 Q50 64 66 54 L65 61 Q50 70 35 61Z" fill="${t.lin([C.red, C.redD])}"/><path d="M58 62 l8 16 l-8 1Z" fill="${C.redM}"/></g>
<g fill="${C.darkD}"><circle cx="44" cy="37" r="2.2"/><circle cx="56" cy="37" r="2.2"/><circle cx="50" cy="72" r="2.3"/><circle cx="50" cy="82" r="2.3"/></g>
<g ${Bs}><path d="M49 42 L62 45 L49 47.5Z" fill="${t.lin([C.orange, C.orangeD])}"/></g>
<path d="M44 49.5 q6 3 12 0" fill="none" stroke="${C.darkD}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
${flakes ? flake(14, 18, 5) + flake(86, 16, 5.5) + flake(12, 80, 5) + flake(90, 82, 5) : ""}`;

const thermo = (t) => `
<g ${B}><g transform="rotate(30 50 50)">
<rect x="42" y="6" width="16" height="66" rx="8" fill="${t.lin(["#E9F3FA", "#BCD6E8", "#8FB4D0"], "h")}"/>
<circle cx="50" cy="77" r="15" fill="${t.lin(["#E9F3FA", "#BCD6E8", "#8FB4D0"], "d")}"/>
</g></g>
<g transform="rotate(30 50 50)"><rect x="46.6" y="30" width="6.8" height="48" rx="3.4" fill="${C.redM}"/><circle cx="50" cy="77" r="10" fill="${t.rad([C.red, C.redD])}"/><rect x="47.6" y="31" width="2" height="38" rx="1" fill="#fff" opacity=".4"/>
<g stroke="${C.metalDD}" stroke-width="1.6" opacity=".7"><path d="M60 16 h5 M60 24 h3.4 M60 32 h5 M60 40 h3.4 M60 48 h5 M60 56 h3.4"/></g></g>`;

const items = [];
const add = (u, n, draw) => items.push({ u, n, draw });

add("1f321-fe0f", "thermometer", thermo);
add("2600-fe0f", "sun", (t) => sunBody(t, 50, 50, 25, 32, 42, 6.5));
add("1f31e", "sun with face", (t) => sunBody(t, 50, 50, 27, 34, 42, 6.5) + face(50, 50, 1.1));
add("1fa90", "ringed planet", (t) => `
<g ${B}><g transform="rotate(-28 50 50)"><path d="M6 50 A44 15 0 0 1 94 50" fill="none" stroke="${t.lin(["#FCE595", C.gold, C.goldM])}" stroke-width="6" stroke-linecap="round"/></g></g>
<g ${B}><circle cx="50" cy="50" r="26" fill="${t.rad(["#F4C9E6", C.purple, C.purpleD], 0.34, 0.28, 0.9)}"/></g>
<g ${t.clip('<circle cx="50" cy="50" r="26"/>')}><path d="M20 42 Q50 52 82 40 V47 Q50 58 20 49Z M22 60 Q50 70 80 58 V63 Q50 75 24 66Z" fill="${C.pinkD}" opacity=".4"/></g>
<g ${B}><g transform="rotate(-28 50 50)"><path d="M6 50 A44 15 0 0 0 94 50" fill="none" stroke="${t.lin(["#FCE595", C.gold, C.goldD])}" stroke-width="6" stroke-linecap="round"/></g></g>`);
add("2b50", "star", (t) => `<g ${B}><polygon points="${star(50, 54, 43, 18.5)}" fill="${t.lin(["#FFE98A", C.gold, C.goldM], "d")}" stroke="${C.gold}" stroke-width="5" stroke-linejoin="round"/></g>
<path d="M50 24 L50 52 L30 52Z" fill="#fff" opacity=".2"/>`);
add("1f31f", "glowing star", (t) => `
<circle cx="50" cy="54" r="40" fill="${t.rad([[0, "#FFE98A", 0.5], [1, "#FFE98A", 0]], 0.5, 0.5, 0.5)}"/>
<g ${B}><polygon points="${star(50, 54, 33, 14.5)}" fill="${t.lin(["#FFE98A", C.gold, C.goldM], "d")}" stroke="${C.gold}" stroke-width="4" stroke-linejoin="round"/></g>
<g ${Bs}>${sparkle(15, 17, 11, C.gold)}${sparkle(86, 19, 9, "#F8D870")}${sparkle(85, 85, 10, C.gold)}${sparkle(14, 82, 7, "#F8D870")}</g>`);
add("1f320", "shooting star", (t) => `
<g ${Bs}><path d="M52 50 L10 90 M42 38 L8 58 M66 60 L42 92" stroke="#F0A94A" stroke-width="4.4" stroke-linecap="round" fill="none" opacity=".85"/></g>
<path d="M54 46 L24 76" stroke="#FCE595" stroke-width="3" stroke-linecap="round" opacity=".7"/>
<g ${B}><polygon points="${star(67, 34, 26, 11)}" fill="${t.lin(["#FFE98A", C.gold, C.goldM], "d")}" stroke="${C.gold}" stroke-width="3.6" stroke-linejoin="round"/></g>`);
add("1f30c", "milky way", (t) => {
  const dots = [[20, 22, 1.8], [38, 16, 1.2], [60, 20, 1.6], [80, 18, 1.3], [84, 40, 1.1], [16, 44, 1.2], [30, 36, 1.0], [70, 30, 1.0], [24, 72, 1.5], [44, 82, 1.2], [66, 78, 1.8], [82, 70, 1.2], [14, 84, 1.0], [52, 30, 1.0], [60, 62, 1.0], [40, 56, 1.0], [34, 24, 1.0]];
  return `<g ${B}><rect x="8" y="8" width="84" height="84" rx="14" fill="${t.lin(["#5D6CAC", "#3D4A80", "#2F3C68"], "d")}"/></g>
<g ${t.clip('<rect x="8" y="8" width="84" height="84" rx="14"/>')}>
<g transform="rotate(-38 50 50)"><ellipse cx="50" cy="50" rx="70" ry="19" fill="#B79BE0" opacity=".5"/><ellipse cx="52" cy="50" rx="58" ry="11" fill="#F3B3D2" opacity=".5"/><ellipse cx="54" cy="50" rx="40" ry="5.5" fill="#FFF0D0" opacity=".6"/></g>
<g fill="${C.paper}">${dots.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
${sparkle(26, 30, 6, C.paper)}${sparkle(74, 70, 7, C.paper)}</g>`;
});
add("2601-fe0f", "cloud", (t) => cloud(t, 2.5, 24, 0.95));
add("26c5", "sun behind cloud", (t) => sunBody(t, 62, 38, 15, 22, 29, 5) + cloud(t, 3, 40, 0.84));
add("26c8-fe0f", "cloud with lightning and rain", (t) => cloud(t, 5, 6, 0.9, true) + rain([[27, 66], [38, 72], [66, 72], [77, 66]]) + bolt(t, 44, 50, 0.4));
add("1f324-fe0f", "sun behind small cloud", (t) => sunBody(t, 46, 47, 19, 26, 35, 5.5) + cloud(t, 42, 56, 0.56));
add("1f325-fe0f", "sun behind large cloud", (t) => sunBody(t, 64, 34, 14, 19, 26, 5) + cloud(t, 2, 32, 0.94));
add("1f326-fe0f", "sun behind rain cloud", (t) => sunBody(t, 64, 32, 13, 19, 26, 5) + cloud(t, 3, 28, 0.84) + rain([[28, 80], [46, 84], [64, 80]]));
add("1f327-fe0f", "cloud with rain", (t) => cloud(t, 5, 6, 0.9) + rain([[24, 70], [38, 74], [52, 70], [66, 74], [80, 70]]));
add("1f328-fe0f", "cloud with snow", (t) => cloud(t, 5, 6, 0.9) + flake(25, 72, 5.5) + flake(50, 80, 5.5) + flake(75, 72, 5.5));
add("1f329-fe0f", "cloud with lightning", (t) => cloud(t, 5, 6, 0.9, true) + bolt(t, 40, 48, 0.5));
add("1f32a-fe0f", "tornado", (t) => {
  const f = t.lin(["#BAC5D8", "#8493AE", "#5F6B8F"]);
  const r = [[8, 10, 84, 13], [18, 27, 66, 12], [27, 43, 46, 11], [36, 58, 30, 10], [43, 72, 15, 9], [46, 85, 8, 7]];
  return `<g ${B}>${r.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${f}"/>`).join("")}</g>
<path d="M18 16 H60 M26 33 H52 M34 48 H50" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>`;
});
add("1f32b-fe0f", "fog", (t) => {
  const f = t.lin(["#D4DEEA", "#A2B3CB"]);
  return cloud(t, 8, 2, 0.84) + `<g ${B}><rect x="10" y="60" width="62" height="9" rx="4.5" fill="${f}"/><rect x="26" y="73" width="64" height="9" rx="4.5" fill="${f}"/><rect x="12" y="86" width="48" height="8" rx="4" fill="${f}"/></g>`;
});
add("1f32c-fe0f", "wind face", (t) => `
<g ${Bs}><path d="M40 52 H20 a6.5 6.5 0 1 1 6.5 -6.5 M38 64 H24 a6 6 0 1 1 6 6 M36 76 H14 a6 6 0 1 0 6 6" fill="none" stroke="#6F96DC" stroke-width="4.4" stroke-linecap="round"/></g>
<g ${B}><circle cx="62" cy="42" r="28" fill="${t.rad(["#F0F5FA", "#C8D5E5", "#98ACC8"], 0.36, 0.3, 0.9)}"/></g>
<g fill="none" stroke="${C.darkD}" stroke-width="2.6" stroke-linecap="round" opacity=".8"><path d="M52 34 q4 -4 8 0 M68 34 q4 -4 8 0"/></g>
<circle cx="48" cy="48" r="4" fill="${C.darkD}" opacity=".8"/><ellipse cx="46" cy="40" rx="3" ry="2" fill="#fff" opacity=".35"/>
<ellipse cx="74" cy="48" rx="5" ry="3" fill="${C.red}" opacity=".3"/>`);
add("1f300", "cyclone", (t) => `<g ${B}><g transform="translate(2 -6)"><path d="M50 52 a4 4 0 0 1 8 0 a10 10 0 0 1 -20 0 a18 18 0 0 1 36 0 a26 26 0 0 1 -52 0 a34 34 0 0 1 68 0 a42 42 0 0 1 -84 0" fill="none" stroke="${t.lin([C.blue, C.blueM, C.blueD], "d")}" stroke-width="7.5" stroke-linecap="round" transform="translate(0 0)"/></g></g>`);
add("1f308", "rainbow", (t) => {
  const cols = [[C.red, C.redD, 41], [C.orange, C.orangeD, 34], [C.yellow, C.yellowD, 27], [C.green, C.greenD, 20], [C.blue, C.blueD, 13]];
  return `<g transform="translate(0 -5)"><g ${B}>${cols.map(([a, b, r]) => `<path d="M${50 - r} 72 A${r} ${r} 0 0 1 ${50 + r} 72" fill="none" stroke="${t.lin([a, b])}" stroke-width="7.5"/>`).join("")}</g>` + cloud(t, 0, 62, 0.44) + cloud(t, 55, 62, 0.44) + "</g>";
});
add("1f302", "closed umbrella", (t) => `
<g ${Bs}><g transform="rotate(32 50 50)"><path d="M50 62 V90 a7 7 0 0 1 -14 0" fill="none" stroke="${t.lin([C.woodL, C.woodD])}" stroke-width="4.6" stroke-linecap="round"/><circle cx="50" cy="4.5" r="2.6" fill="${C.gold}"/></g></g>
<g ${B}><g transform="rotate(32 50 50)"><path d="M50 6 C62 20 67 46 64 70 Q57 75 50 70 Q43 75 36 70 C33 46 38 20 50 6Z" fill="${t.lin([C.purpleD, C.purple, "#C9B6EC", C.purple, C.purpleD], "h")}"/></g></g>
<g ${Bs}><g transform="rotate(32 50 50)"><rect x="35" y="50" width="30" height="6" rx="2.5" fill="${t.lin([C.gold, C.goldD])}"/></g></g>
<g transform="rotate(32 50 50)" stroke="${C.purpleD}" stroke-width="1.2" opacity=".6" fill="none"><path d="M50 10 C47 30 46 50 44 68 M50 10 C53 30 54 50 56 68"/></g>`);
add("2602-fe0f", "umbrella", (t) => umbrella(t, t.lin([C.redM, C.red, C.redD]), C.paper));
add("2614", "umbrella with rain drops", (t) => {
  const f = t.lin([C.blue, C.blueD]);
  return `<g transform="translate(15 2) scale(.7)">${umbrella(t, t.lin([C.blue, C.blueM, C.blueD]), C.paper)}</g><g ${Bs}>${[[14, 56, .9], [28, 70, .9], [68, 58, .9], [84, 54, .9], [78, 72, 1], [20, 84, .9], [60, 86, .9], [40, 82, .8]].map(([x, y, s]) => drop(x, y, s, f)).join("")}</g>`;
});
add("26f1-fe0f", "umbrella on ground", (t) => `<g transform="rotate(18 50 78)"><g transform="translate(9 0) scale(.82)">${umbrella(t, t.lin([C.redM, C.red, C.redD]), C.paper)}</g></g>
<g ${B}><path d="M6 94 C14 82 36 78 54 82 C74 80 90 84 94 94Z" fill="${t.lin(["#F6DFA6", "#E0BF78"])}"/></g>`);
add("26a1", "high voltage", (t) => `<g ${B}><polygon points="${BOLT}" fill="${t.lin(["#FFE98A", C.gold, C.goldM, "#E08A2C"], "d")}" stroke="${C.goldM}" stroke-width="3" stroke-linejoin="round" transform="translate(0 0)"/></g>`);
add("2744-fe0f", "snowflake", (t) => {
  const arm = `<path d="M50 50 V9 M50 24 L40 14 M50 24 L60 14 M50 36 L43 29 M50 36 L57 29"/>`;
  return `<g ${B}><g fill="none" stroke="#7FB1E2" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round">${[0, 60, 120, 180, 240, 300].map((a) => `<g transform="rotate(${a} 50 50)">${arm}</g>`).join("")}</g><circle cx="50" cy="50" r="6" fill="${t.lin(["#C9E3F8", "#7FB1E2"])}"/></g>`;
});
add("2603-fe0f", "snowman", (t) => snowman(t, true));
add("26c4", "snowman without snow", (t) => snowman(t, false));
add("2604-fe0f", "comet", (t) => `
<path d="M24 62 C40 40 68 16 94 6 C80 26 62 52 40 78Z" fill="${t.lin([[0, "#F6A94C", 1], [1, "#F6A94C", 0.1]], "u")}" opacity=".9"/>
<path d="M30 58 C48 42 66 28 86 18 M36 70 C54 56 70 42 88 34 M20 50 C34 36 52 22 70 12" fill="none" stroke="#FCE595" stroke-width="3" stroke-linecap="round" opacity=".7"/>
<g ${B}><circle cx="32" cy="68" r="21" fill="${t.rad(["#D9C6B4", "#9C8878", "#6B5A58"], 0.34, 0.28, 0.9)}"/></g>
<g fill="${C.dark}" opacity=".45"><circle cx="26" cy="64" r="4.5"/><circle cx="38" cy="76" r="3.4"/><circle cx="40" cy="62" r="2.4"/></g>`);
add("1f525", "fire", (t) => `
<g ${B}><path d="M50 5 C52 24 76 34 76 58 C76 78 64 92 50 92 C34 92 24 78 24 60 C24 48 30 42 34 36 C36 44 40 46 42 46 C40 30 44 16 50 5Z" fill="${t.lin(["#F9A453", C.red, C.redM, C.redD])}"/></g>
<g ${B}><path d="M50 50 C52 62 65 66 65 77 C65 86 58 91 50 91 C42 91 35 86 35 77 C35 66 46 62 50 50Z" fill="${t.lin(["#FFF0A0", C.yellow, C.orange])}"/></g>`);
add("1f4a7", "droplet", (t) => `
<g ${B}><path d="M50 6 C60 26 78 42 78 62 C78 78 66 92 50 92 C34 92 22 78 22 62 C22 42 40 26 50 6Z" fill="${t.rad(["#C6E0FA", C.blue, C.blueM, C.blueD], 0.36, 0.38, 0.85)}"/></g>
<path d="M34 62 C34 54 39 48 43 44" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>`);
add("1f30a", "water wave", (t) => `
<g ${B}><path d="M5 92 V64 C5 38 22 16 48 14 C68 13 84 24 88 42 C80 34 70 34 64 40 C58 47 62 58 72 61 C80 63 90 60 95 55 V92Z" fill="${t.lin(["#8FB8EE", C.blueM, C.blueD], "d")}"/></g>
<g fill="${C.paper}" opacity=".95"><circle cx="86" cy="42" r="5"/><circle cx="76" cy="34" r="4"/><circle cx="92" cy="52" r="3"/><circle cx="66" cy="29" r="2.6"/></g>
<path d="M12 76 q10 -10 22 0 t22 0 t22 0 t14 -3 M14 88 q10 -8 20 0 t20 0 t20 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>
<path d="M16 62 C18 44 30 28 46 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>`);

export default items;
