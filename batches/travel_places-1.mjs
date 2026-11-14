// Travel & places 1: globes, maps, terrain, landscapes, buildings.
import { B, Bs, C } from "../kit.mjs";

const r = (n) => +n.toFixed(1);
const icons = [];
const add = (u, n, draw, dy = 0) => icons.push({ u, n, draw: dy ? (t) => `<g transform="translate(0 ${-dy})">${draw(t)}</g>` : draw });

const stone = (t) => t.lin([C.paper, "#D3C39B"]);
const glass = (t) => t.lin([C.sky, C.skyD]);
const base = (t) => `<g ${B}><rect x="10" y="87" width="80" height="5" rx="2" fill="${t.lin(["#C4BEAE", "#8E887A"])}"/></g>`;
const grid = (x0, y0, dx, dy, nx, ny, w, h) => {
  let d = "";
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) d += `M${r(x0 + i * dx)} ${r(y0 + j * dy)}h${w}v${h}h${-w}z`;
  return d;
};
const arch = (t, x, w, top, c) => `<g ${Bs}><path d="M${x} 88 V${r(top + w / 2)} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V88Z" fill="${c || t.lin([C.woodL, C.wood, C.woodD])}"/></g>`;
const pine = (t, x, y, s = 1) => {
  const g = t.lin([C.green, C.greenM, C.greenD]);
  return `<g ${Bs}><rect x="${r(x - 1.5 * s)}" y="${r(y + 24 * s)}" width="${r(3 * s)}" height="${r(5 * s)}" fill="${C.woodD}"/><polygon points="${r(x)},${r(y + 6 * s)} ${r(x + 10 * s)},${r(y + 24 * s)} ${r(x - 10 * s)},${r(y + 24 * s)}" fill="${g}"/><polygon points="${r(x)},${r(y)} ${r(x + 7 * s)},${r(y + 14 * s)} ${r(x - 7 * s)},${r(y + 14 * s)}" fill="${g}"/></g>`;
};
const tile = (t, bg, inner) => `<g ${B}><rect x="8" y="8" width="84" height="84" rx="14" fill="${bg}"/></g><g ${t.clip('<rect x="8" y="8" width="84" height="84" rx="14"/>')}>${inner}</g><rect x="8.8" y="8.8" width="82.4" height="82.4" rx="13.4" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.4"/>`;

// ───────── globes
const globe = (t, land, lines = "") => {
  const g = t.lin([C.green, C.greenM, C.greenD], "d");
  return `<g ${B}><circle cx="50" cy="50" r="42" fill="${t.rad(["#B3D7F8", "#6C9ADB", "#4169AE"], 0.36, 0.3, 0.85)}"/></g>
<g ${t.clip('<circle cx="50" cy="50" r="42"/>')}><g fill="${g}">${land}</g>${lines}<circle cx="50" cy="50" r="42" fill="${t.rad([[0, "#fff", 0.3], [0.5, "#fff", 0], [1, "#0A1E4A", 0.5]], 0.34, 0.28, 0.82)}"/></g>`;
};
add("1f30d", "globe showing Europe Africa", (t) =>
  globe(t, `<path d="M42 22 C50 15 62 18 60 27 C58 33 48 35 40 34 C36 30 38 25 42 22Z"/><path d="M42 40 C52 37 64 41 66 50 C67 58 58 62 56 72 C54 82 46 78 46 68 C46 60 36 56 38 48 C38 44 40 42 42 40Z"/><path d="M68 26 C78 22 90 30 92 38 C84 44 74 42 68 36Z"/><path d="M6 36 C12 32 18 40 18 50 C16 58 10 60 6 56Z"/>`));
add("1f30e", "globe showing Americas", (t) =>
  globe(t, `<path d="M18 22 C30 12 48 14 54 24 C56 32 46 36 42 44 C36 50 26 44 22 36 C16 30 14 26 18 22Z"/><path d="M44 54 C54 50 62 56 60 66 C58 76 50 86 46 82 C42 74 40 64 44 54Z"/><path d="M70 20 C78 14 92 18 94 26 C86 30 76 28 70 24Z"/>`));
add("1f30f", "globe showing Asia Australia", (t) =>
  globe(t, `<path d="M32 20 C46 12 68 14 80 24 C88 32 80 44 70 46 C64 52 54 48 48 42 C40 40 28 32 32 20Z"/><path d="M60 64 C68 60 80 62 84 68 C84 78 72 82 62 76Z"/><path d="M52 56 C58 54 60 58 56 62 C52 62 50 58 52 56Z"/><path d="M8 38 C12 34 18 40 16 50 C12 52 8 48 8 38Z"/>`));
add("1f310", "globe with meridians", (t) =>
  globe(t, "", `<g fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.7"><ellipse cx="50" cy="50" rx="17" ry="42"/><ellipse cx="50" cy="50" rx="33" ry="42"/><path d="M50 8V92M8 50H92"/><path d="M13 30Q50 38 87 30M13 70Q50 62 87 70"/></g><path d="M20 28 C26 22 38 22 42 28 C40 34 30 36 24 34Z M54 50 C64 46 74 52 70 62 C64 68 56 62 54 50Z" fill="${C.greenM}" opacity=".85"/>`));

add("1f5fa-fe0f", "world map", (t) =>
  tile(t, t.lin(["#A9CCEF", "#6F9AD6"], "d"),
    `<g fill="${t.lin([C.green, C.greenM, C.greenD], "d")}"><path d="M14 24 C22 16 34 18 40 26 C38 34 30 36 28 42 C20 40 12 32 14 24Z"/><path d="M28 50 C36 48 42 54 40 62 C38 72 32 82 28 78 C24 70 24 56 28 50Z"/><path d="M46 22 C54 16 62 20 60 28 C56 30 54 34 58 40 C64 46 62 58 56 68 C50 72 46 66 46 58 C44 50 36 46 44 38 C42 32 42 26 46 22Z"/><path d="M64 22 C72 14 88 18 92 28 C88 38 80 38 76 44 C68 44 62 36 62 28Z"/><path d="M72 62 C80 58 92 62 90 70 C84 78 72 74 72 62Z"/></g>
<path d="M36 8V92M64 8V92" stroke="#fff" stroke-opacity=".28" stroke-width="1.6"/><path d="M37.5 8V92M65.5 8V92" stroke="#1B3A6A" stroke-opacity=".16" stroke-width="1.4"/>
<circle cx="52" cy="46" r="3.2" fill="${C.red}"/>`));

add("1f5fe", "map of Japan", (t) =>
  tile(t, t.lin(["#A9CCEF", "#6F9AD6"], "d"),
    `<circle cx="26" cy="26" r="9.5" fill="${t.rad(["#F58578", C.redD])}"/>
<g fill="${t.lin([C.cream, C.green, C.greenM], "d")}"><path d="M30 66 C34 62 40 60 44 56 C48 52 52 46 56 42 C60 38 64 34 70 32 C72 36 68 42 66 48 C62 54 60 60 54 64 C48 70 40 74 32 72Z"/><path d="M68 14 C74 10 84 14 82 20 C78 26 70 26 66 20Z"/><path d="M16 70 C22 68 28 72 26 80 C22 84 14 80 16 70Z"/><path d="M34 76 C40 74 48 76 46 79 C40 82 34 80 34 76Z"/></g>`));

add("1f9ed", "compass", (t) => `
<g ${B}><circle cx="50" cy="50" r="42" fill="${t.lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="50" r="35" fill="${t.rad([C.paper, "#E4D7B8"], 0.4, 0.35, 0.8)}"/>
<g fill="${C.darkD}" opacity=".75">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="${a % 90 ? 49.2 : 48.6}" y="17" width="${a % 90 ? 1.6 : 2.8}" height="${a % 90 ? 4 : 7}" rx=".8" transform="rotate(${a} 50 50)"/>`).join("")}</g>
<g ${Bs}><g transform="rotate(40 50 50)"><polygon points="50,20 58,50 42,50" fill="${t.lin([C.red, C.redD])}"/><polygon points="50,80 58,50 42,50" fill="${t.lin([C.metalL, C.metalD])}"/></g></g>
<circle cx="50" cy="50" r="3.6" fill="${C.goldM}"/><circle cx="49.2" cy="49.2" r="1.2" fill="${C.cream}"/>`);

// ───────── terrain
add("1f3d4-fe0f", "snow capped mountain", (t) => {
  const rock = t.lin(["#93A3C6", "#5D6C93"], "d");
  const snow = t.lin([C.paper, "#C3D2EA"]);
  return `<g ${B}><polygon points="40,14 76,86 4,86" fill="${rock}"/></g>
<polygon points="40,14 76,86 56,86 46,48" fill="#2F3C68" opacity=".25"/>
<g ${B}><polygon points="72,38 96,86 48,86" fill="${t.lin(["#A9B7D6", "#6D7CA3"], "d")}"/></g>
<polygon points="72,38 96,86 80,86 76,56" fill="#2F3C68" opacity=".2"/>
<g ${Bs}><path d="M40 14 L55.5 45 L49 40 L43 48 L36 40 L24.5 45Z" fill="${snow}"/><path d="M72 38 L82 58 L77 54 L72 61 L67 54 L62 58Z" fill="${snow}"/></g>`;
});

add("26f0-fe0f", "mountain", (t) => `
<g ${B}><polygon points="34,14 68,84 2,84" fill="${t.lin(["#C2A57E", "#8A6D52"], "d")}"/></g>
<polygon points="34,14 68,84 50,84 40,48" fill="#4B3020" opacity=".22"/>
<g ${B}><polygon points="68,34 98,84 42,84" fill="${t.lin(["#B59773", "#7D6249"], "d")}"/></g>
<polygon points="68,34 98,84 84,84 72,52" fill="#4B3020" opacity=".22"/>
<g ${B}><path d="M3 90 C14 76 30 72 44 78 C58 70 82 72 97 88 V93 H3Z" fill="${t.lin([C.green, C.greenM, C.greenD])}"/></g>
${pine(t, 20, 56, 0.9)}${pine(t, 80, 54, 1)}${pine(t, 66, 62, 0.7)}`);

add("1f30b", "volcano", (t) => `
<g ${B}><path d="M6 88 L36 36 Q50 30 64 36 L94 88Z" fill="${t.lin(["#A98270", "#6E4F47"], "d")}"/></g>
<path d="M64 36 L94 88 H74 L58 40Z" fill="#2F1A14" opacity=".25"/>
<ellipse cx="50" cy="35.5" rx="13" ry="4" fill="${t.lin([C.yellow, C.orange, C.red])}"/>
<g ${Bs}><path d="M42 38 C40 50 46 54 40 66 C38 72 40 78 38 84 M58 38 C60 48 56 54 62 62 C64 68 60 74 62 82" fill="none" stroke="${C.orange}" stroke-width="4.4" stroke-linecap="round"/></g>
<path d="M50 38 C48 50 52 58 49 70" fill="none" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/>
<g ${B}><circle cx="40" cy="22" r="8" fill="${t.lin([C.metalL, C.metal])}"/><circle cx="52" cy="14" r="9.5" fill="${t.lin([C.metalL, C.metal])}"/><circle cx="62" cy="23" r="7" fill="${t.lin([C.metalL, C.metal])}"/><circle cx="50" cy="24" r="8" fill="${t.lin([C.metalL, C.metal])}"/></g>
<g fill="${C.orange}"><circle cx="30" cy="22" r="1.8"/><circle cx="74" cy="14" r="1.8"/><circle cx="68" cy="30" r="1.4"/></g>`);

add("1f5fb", "mount fuji", (t) => `
<g ${B}><path d="M3 88 L38 22 Q50 16 62 22 L97 88Z" fill="${t.lin(["#8FA9DE", "#5F77B5", "#47599A"], "d")}"/></g>
<path d="M62 22 L97 88 H76 L58 28Z" fill="#232F5C" opacity=".22"/>
<g ${Bs}><path d="M38 22 Q50 16 62 22 L72 41 Q66 38 62 47 Q56 40 50 49 Q44 40 38 47 Q34 38 28 41Z" fill="${t.lin([C.paper, "#C3D2EA"])}"/></g>
<g ${Bs}><path d="M8 78 C8 70 20 68 24 72 C28 66 40 68 38 76 C40 80 10 82 8 78Z" fill="${t.lin([C.metalL, "#BFD0E4"])}"/><path d="M66 70 C66 63 78 62 82 66 C86 61 96 64 94 72 C95 76 68 76 66 70Z" fill="${t.lin([C.metalL, "#BFD0E4"])}"/></g>`);

add("1f3d5-fe0f", "camping", (t) => `
<g ${B}><ellipse cx="50" cy="87" rx="46" ry="7" fill="${t.lin([C.green, C.greenD])}"/></g>
${pine(t, 85, 24, 1.1)}
<g ${B}><polygon points="6,86 40,18 74,86" fill="${t.lin([C.orange, C.orangeD], "d")}"/></g>
<polygon points="40,18 74,86 60,86" fill="${C.orangeD}" opacity=".4"/>
<polygon points="40,40 26,86 54,86" fill="${C.darkD}"/>
<g ${Bs}><polygon points="40,40 26,86 38,86" fill="${t.lin([C.woodL, C.orange])}"/><polygon points="40,40 54,86 43,86" fill="${C.orangeD}"/></g>
<g ${Bs}><path d="M77 88 L94 80 M77 80 L94 88" stroke="${C.woodD}" stroke-width="3.6" stroke-linecap="round"/><path d="M85 82 C77 78 81 70 84 63 C86 68 91 68 91 75 C93 79 90 82 85 82Z" fill="${t.lin([C.yellow, C.orange, C.red])}"/></g>
<path d="M85 80 C82 77 84 73 86 71 C88 74 89 77 85 80Z" fill="${C.yellow}"/>`, 6);

add("1f3d6-fe0f", "beach with umbrella", (t) => `
<g ${B}><g transform="rotate(-14 50 44)"><rect x="48.4" y="40" width="3.2" height="52" fill="${C.woodL}"/><g ${t.clip('<path d="M12 44 C12 24 30 10 50 10 C70 10 88 24 88 44 Q79 39 69.5 44 Q60 39 50 44 Q40 39 30.5 44 Q21 39 12 44Z"/>')}><rect x="0" y="0" width="100" height="50" fill="${C.paper}"/><polygon points="50,10 12,44 31,44" fill="${C.red}"/><polygon points="50,10 50,44 69,44" fill="${C.red}"/></g></g></g>
<g ${B}><path d="M5 93 C15 76 34 74 50 78 C68 74 86 76 95 93Z" fill="${t.lin([C.yellow, "#E6BB66"])}"/></g>
<g ${Bs}><path d="M7 86 Q16 80 25 86 T43 86" fill="none" stroke="${C.blue}" stroke-width="3.2" stroke-linecap="round"/><path d="M66 90 Q75 85 83 90 T92 89" fill="none" stroke="${C.blue}" stroke-width="3.2" stroke-linecap="round"/></g>
<g ${Bs}><polygon points="${r(74)},80 76,84 80,84.6 77,87.4 78,91 74,89 70,91 71,87.4 68,84.6 72,84" fill="${C.orange}"/></g>`);

add("1f3dc-fe0f", "desert", (t) => `
<g ${B}><circle cx="76" cy="26" r="13" fill="${t.rad([C.yellow, C.yellowM, C.yellowD])}"/></g>
<g ${B}><path d="M3 88 C18 58 36 52 56 72 C70 56 88 60 97 88Z" fill="${t.lin(["#F2D391", "#D8A860"])}"/></g>
<g ${B}><path d="M3 93 C26 70 62 82 97 74 V93Z" fill="${t.lin(["#F6DFA6", "#E0B56E"])}"/></g>
<g ${Bs}><path d="M30 80 V34 M30 66 H20 V48 M30 56 H40 V42" fill="none" stroke="${C.greenM}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M28 40 V72" stroke="${C.green}" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>`);

add("1f3dd-fe0f", "desert island", (t) => {
  const lf = t.lin([C.green, C.greenD], "d");
  return `<g ${B}><ellipse cx="50" cy="84" rx="46" ry="11" fill="${t.lin([C.blue, C.blueM])}"/></g>
<g ${B}><ellipse cx="50" cy="80" rx="30" ry="9" fill="${t.lin(["#F6DFA6", "#DDB066"])}"/></g>
<g ${Bs}><path d="M47 80 C45 62 52 46 58 34" fill="none" stroke="${C.woodD}" stroke-width="6" stroke-linecap="round"/></g>
<g ${Bs}><g fill="${lf}"><path d="M58 34 C50 18 34 16 22 26 C36 24 48 28 58 34Z"/><path d="M58 34 C46 32 30 38 24 52 C38 42 48 40 58 34Z"/><path d="M58 34 C64 18 80 16 90 26 C78 24 68 28 58 34Z"/><path d="M58 34 C70 32 84 38 88 52 C76 42 66 40 58 34Z"/><path d="M58 34 C54 20 56 10 60 6 C64 14 62 26 58 34Z"/></g></g>
<g ${Bs}><circle cx="55" cy="37" r="3" fill="${C.woodDD}"/><circle cx="61" cy="38" r="3" fill="${C.woodDD}"/></g>`;
});

add("1f3de-fe0f", "national park", (t) =>
  tile(t, t.lin(["#BFE0F6", "#F6E7C4"]),
    `<circle cx="70" cy="28" r="9" fill="${t.rad([C.yellow, C.yellowM])}"/>
<polygon points="8,64 30,28 52,64" fill="${t.lin(["#93A3C6", "#6B7BA2"], "d")}"/><polygon points="40,64 64,34 96,64" fill="${t.lin(["#A3B2D2", "#7886AB"], "d")}"/><path d="M30 28 L37 41 L32 38 L28 42 L23 38 L22 41Z M64 34 L70 43 L66 41 L62 45 L58 41Z" fill="${C.paper}"/>
<path d="M0 62 C20 56 40 60 56 64 C72 58 88 60 100 64 V100 H0Z" fill="${t.lin([C.green, C.greenM])}"/>
<path d="M60 100 C50 88 70 80 56 68 C52 66 54 64 58 64 C74 76 52 88 72 100Z" fill="${t.lin([C.sky, C.blueM])}"/>
${pine(t, 20, 54, 0.9)}${pine(t, 32, 62, 0.7)}${pine(t, 82, 50, 1.1)}${pine(t, 92, 62, 0.8)}`));

// ───────── buildings
add("1f3df-fe0f", "stadium", (t) => `
<g ${B}><ellipse cx="50" cy="62" rx="44" ry="30" fill="${t.lin(["#A9A296", "#7A746A"])}"/></g>
<g ${B}><ellipse cx="50" cy="54" rx="44" ry="32" fill="${t.lin([C.paper, C.creamD], "d")}"/></g>
<ellipse cx="50" cy="54" rx="36" ry="25" fill="${t.lin([C.red, C.redD])}"/>
<ellipse cx="50" cy="54" rx="36" ry="25" fill="none" stroke="${C.paper}" stroke-width="2.2" stroke-dasharray="2.4 3.6" opacity=".8"/>
<g ${B}><ellipse cx="50" cy="54" rx="27" ry="18" fill="${t.lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<g fill="none" stroke="${C.paper}" stroke-width="1.5" opacity=".85"><ellipse cx="50" cy="54" rx="22" ry="13.5"/><path d="M50 40.5V67.5"/><ellipse cx="50" cy="54" rx="6" ry="4"/></g>
<g ${Bs}><rect x="12" y="14" width="3.2" height="14" fill="${C.metalD}"/><rect x="85" y="14" width="3.2" height="14" fill="${C.metalD}"/><rect x="8" y="9" width="11" height="6" rx="1.4" fill="${t.lin([C.yellow, C.yellowD])}"/><rect x="81" y="9" width="11" height="6" rx="1.4" fill="${t.lin([C.yellow, C.yellowD])}"/></g>`);

const columns = (t, xs, w, y0, y1) => {
  const g = t.lin([C.creamD, C.paper, C.creamD], "h"), c = stone(t);
  return `<g ${Bs}>${xs.map((x) => `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" fill="${g}"/><rect x="${x - 1.4}" y="${y0 - 3}" width="${w + 2.8}" height="3.6" rx="1" fill="${c}"/><rect x="${x - 1.4}" y="${y1 - 1}" width="${w + 2.8}" height="3.6" rx="1" fill="${c}"/>`).join("")}</g>`;
};
add("1f3db-fe0f", "classical building", (t) => `
<g ${B}><polygon points="8,36 50,12 92,36" fill="${stone(t)}"/></g>
<polygon points="19,34 50,17.5 81,34" fill="${C.creamD}" opacity=".75"/>
<circle cx="50" cy="29" r="3.6" fill="${C.goldM}"/>
<g ${B}><rect x="8" y="36" width="84" height="8" fill="${stone(t)}"/></g>
${columns(t, [14, 27, 40, 53, 66, 79], 8, 47, 79)}
<g ${B}><rect x="6" y="80" width="88" height="5" fill="${stone(t)}"/><rect x="2" y="85" width="96" height="7" rx="1.5" fill="${t.lin(["#D8D0BA", "#A9A18C"])}"/></g>`);

add("1f3d7-fe0f", "building construction", (t) => {
  const y = t.lin([C.yellow, C.yellowM, C.yellowD]);
  return `<g ${B}><rect x="8" y="84" width="84" height="7" rx="2" fill="${t.lin(["#C4BEAE", "#8E887A"])}"/></g>
<g ${B}><rect x="10" y="48" width="48" height="5" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/><rect x="10" y="64" width="48" height="5" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/><rect x="10" y="80" width="48" height="5" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/><rect x="12" y="48" width="4" height="36" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/><rect x="34" y="48" width="4" height="36" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/><rect x="53" y="48" width="4" height="36" fill="${t.lin(["#B9B4A8", "#8C877C"])}"/></g>
<g ${B}><path d="M70 84 V22 M82 84 V22" stroke="${C.yellowD}" stroke-width="3.4"/><path d="M70 84 L82 70 L70 56 L82 42 L70 28 M82 84 L70 70 L82 56 L70 42 L82 28" fill="none" stroke="${C.yellowD}" stroke-width="2.2"/></g>
<g ${B}><rect x="10" y="12" width="84" height="7" fill="${y}"/><polygon points="76,4 88,4 94,12 70,12" fill="${y}"/><rect x="84" y="19" width="10" height="9" fill="${C.darkD}"/></g>
<path d="M24 19 V42" stroke="${C.dark}" stroke-width="1.6"/>
<g ${Bs}><rect x="14" y="42" width="20" height="4" rx="1.5" fill="${t.lin([C.red, C.redD])}"/><path d="M18 46 L24 40 L30 46" fill="none" stroke="${C.dark}" stroke-width="1.4"/></g>`;
});

add("1f9f1", "brick", (t) => {
  const brick = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="21" rx="2.5" fill="${t.lin(c)}"/>`;
  const a = [C.red, C.redM, C.redD], b = ["#F08B7C", C.redM];
  return `<g ${B}><rect x="7" y="13" width="86" height="79" rx="3" fill="${t.lin(["#E4D7B8", "#B8AA88"])}"/></g>
<g ${Bs}>${brick(9, 15, 26, a)}${brick(38, 15, 26, b)}${brick(67, 15, 24, a)}${brick(9, 39, 12, b)}${brick(24, 39, 26, a)}${brick(53, 39, 26, b)}${brick(82, 39, 9, a)}${brick(9, 63, 26, b)}${brick(38, 63, 26, a)}${brick(67, 63, 24, b)}</g>`;
});

add("1faa8", "rock", (t) => `
<g ${B}><path d="M8 76 C6 56 20 36 38 28 C52 20 72 26 82 40 C94 52 92 72 84 82 C70 90 24 90 8 76Z" fill="${t.lin(["#C4BDB0", "#958E83", "#69635D"], "d")}"/></g>
<path d="M18 62 C20 48 30 40 42 34 C50 38 44 52 38 58 C32 64 24 66 18 62Z" fill="#fff" opacity=".22"/>
<path d="M82 42 C92 54 92 72 84 82 C74 86 66 84 60 78 C74 72 80 58 82 42Z" fill="#2B2420" opacity=".2"/>
<path d="M44 34 L50 50 L44 64 M60 28 L62 44 L70 56" fill="none" stroke="#4A433E" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
<path d="M34 30 C40 24 52 22 60 26 C54 30 46 32 40 34Z" fill="${C.greenM}"/><path d="M38 30 C44 28 50 27 56 28" stroke="${C.green}" stroke-width="1.2" fill="none"/>`, 6);

add("1fab5", "wood", (t) => `
<g ${B}><g transform="rotate(-20 50 50)"><path d="M12 36 H80 V68 H12 a4 16 0 0 1 0 -32Z" fill="${t.lin(["#B98254", C.woodD, C.woodDD])}"/><rect x="26" y="26" width="10" height="12" rx="3" fill="${C.woodD}"/><ellipse cx="80" cy="52" rx="11" ry="16" fill="${t.lin([C.woodL, "#EAC896"], "d")}"/></g></g>
<g transform="rotate(-20 50 50)" fill="none" stroke="${C.woodD}" stroke-width="1.5"><ellipse cx="80" cy="52" rx="7" ry="10.5"/><ellipse cx="80" cy="52" rx="3" ry="5"/><path d="M20 42 H68 M16 52 H66 M20 62 H68" stroke="${C.woodDD}" stroke-opacity=".5" stroke-linecap="round"/></g>`);

add("1f6d6", "hut", (t) => `
${base(t)}
<g ${B}><path d="M22 52 H78 V87 H22Z" fill="${t.lin(["#D8B988", "#B98E5C", "#8E6A40"], "h")}"/></g>
<path d="M30 56 V87 M40 56 V87 M60 56 V87 M70 56 V87" stroke="${C.woodD}" stroke-width="1" opacity=".45"/>
<g ${B}><path d="M6 60 L50 8 L94 60 Q50 68 6 60Z" fill="${t.lin(["#F1CE7A", "#D1A04A", "#A9772E"], "d")}"/></g>
<path d="M50 14 L30 62 M50 14 L44 64 M50 14 L58 64 M50 14 L70 62" stroke="${C.goldD}" stroke-width="1.2" opacity=".6"/>
${arch(t, 43, 14, 62, C.woodDD)}<g ${Bs}><rect x="27" y="66" width="9" height="9" rx="1.4" fill="${glass(t)}"/><rect x="64" y="66" width="9" height="9" rx="1.4" fill="${glass(t)}"/></g>`);

// house helper
const house = (t, x, w, top, rh, wall, roof, win = true) => {
  const m = x + w / 2;
  return `<g ${B}><rect x="${x}" y="${top}" width="${w}" height="${88 - top}" fill="${wall}"/><polygon points="${x - 3},${top + 2} ${m},${top - rh} ${x + w + 3},${top + 2}" fill="${roof}"/></g>
${arch(t, m - 4, 8, 88 - 17, t.lin([C.woodL, C.wood, C.woodD]))}${win ? `<g ${Bs}><rect x="${x + 4}" y="${top + 8}" width="7" height="8" rx="1.2" fill="${glass(t)}"/><rect x="${x + w - 11}" y="${top + 8}" width="7" height="8" rx="1.2" fill="${glass(t)}"/></g>` : ""}`;
};
add("1f3d8-fe0f", "houses", (t) => `
${base(t)}
${house(t, 6, 30, 58, 18, t.lin([C.cream, C.creamD]), t.lin([C.red, C.redM, C.redD]), false)}
${house(t, 64, 30, 60, 18, t.lin([C.pink, C.pinkD]), t.lin([C.orange, C.orangeD]), false)}
${house(t, 33, 34, 48, 22, t.lin(["#B9CBEF", C.blueM]), t.lin([C.navy, C.navyD]))}`, 9);

add("1f3da-fe0f", "derelict house", (t) => `
${base(t)}
<g ${B}><g transform="rotate(-3 50 88)"><rect x="16" y="50" width="68" height="38" fill="${t.lin(["#B5A99C", "#8F8378", "#6F655D"])}"/><path d="M6 54 L36 22 L50 34 L58 28 L94 54Z" fill="${t.lin(["#8C8794", "#5E5A66"])}"/></g></g>
<g transform="rotate(-3 50 88)"><path d="M44 34 L52 28 L58 28 L66 34 L56 40Z" fill="#2B2328"/><g ${Bs}><rect x="22" y="58" width="16" height="15" fill="#2B2328"/><rect x="62" y="58" width="16" height="15" fill="#2B2328"/><path d="M20 62 L40 70 M20 70 L40 62 M60 62 L80 70" stroke="${C.woodD}" stroke-width="3" stroke-linecap="round"/></g>
<g ${Bs}><path d="M42 88 V68 H58 V88Z" fill="#6B5240"/></g><path d="M42 74 L58 80 M42 82 L58 76" stroke="${C.woodL}" stroke-width="2.4"/><path d="M30 50 L24 66 M70 52 L78 56" stroke="#4A433E" stroke-width="1.4" opacity=".6"/></g>
<g ${Bs}><path d="M12 88 C14 80 16 82 16 76 M20 88 C20 82 24 82 24 78 M80 88 C80 82 84 80 84 76 M88 88 C86 82 90 82 90 78" fill="none" stroke="${C.greenM}" stroke-width="2.2" stroke-linecap="round"/></g>`, 7);

add("1f3e0", "house", (t) => `
${base(t)}
<g ${B}><rect x="64" y="22" width="10" height="22" fill="${t.lin([C.redM, C.redD])}"/></g>
<g ${B}><rect x="16" y="52" width="68" height="36" fill="${t.lin([C.cream, C.creamD])}"/><polygon points="4,56 50,14 96,56" fill="${t.lin([C.red, C.redM, C.redD])}"/></g>
<g ${Bs}><rect x="24" y="62" width="14" height="14" rx="1.5" fill="${glass(t)}"/><rect x="62" y="62" width="14" height="14" rx="1.5" fill="${glass(t)}"/></g>
<path d="M31 62 V76 M24 69 H38 M69 62 V76 M62 69 H76" stroke="${C.paper}" stroke-width="1.3"/>
${arch(t, 42, 16, 62)}<circle cx="54" cy="78" r="1.2" fill="${C.gold}"/>`);

add("1f3e1", "house with garden", (t) => `
<g ${B}><rect x="4" y="85" width="92" height="8" rx="3" fill="${t.lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${B}><rect x="10" y="48" width="52" height="38" fill="${t.lin([C.cream, C.creamD])}"/><polygon points="4,52 36,16 68,52" fill="${t.lin([C.red, C.redM, C.redD])}"/></g>
<g ${Bs}><rect x="15" y="58" width="12" height="12" rx="1.5" fill="${glass(t)}"/>${arch(t, 38, 14, 62)}</g>
<g ${B}><rect x="80" y="54" width="5" height="32" fill="${C.woodD}"/><circle cx="82.5" cy="40" r="15" fill="${t.rad([C.green, C.greenM, C.greenD])}"/><circle cx="72" cy="52" r="9" fill="${t.rad([C.green, C.greenM, C.greenD])}"/></g>
<g ${Bs}>${[8, 20, 32, 44, 56, 68].map((x) => `<rect x="${x}" y="72" width="6" height="14" rx="1.5" fill="${t.lin([C.paper, C.creamD], "h")}"/>`).join("")}<rect x="5" y="76" width="68" height="3" fill="${C.paper}"/></g>
<g><circle cx="16" cy="84" r="2.6" fill="${C.pinkD}"/><circle cx="46" cy="84" r="2.6" fill="${C.yellowM}"/><circle cx="62" cy="84" r="2.6" fill="${C.red}"/></g>`);

add("1f3e2", "office building", (t) => {
  const w = t.lin(["#FFF1B0", C.yellowM], "d");
  return `${base(t)}
<g ${B}><rect x="10" y="46" width="22" height="41" fill="${t.lin(["#9BAEDA", C.blueD], "d")}"/><rect x="68" y="36" width="22" height="51" fill="${t.lin(["#9BAEDA", C.blueD], "d")}"/></g>
<g ${B}><rect x="28" y="8" width="44" height="79" fill="${t.lin(["#B4C5EA", C.blueM, "#4560A0"], "d")}"/><rect x="26" y="8" width="48" height="5" rx="1.5" fill="${t.lin([C.metalL, C.metalD])}"/></g>
<path d="${grid(34, 18, 11, 10.5, 3, 6, 7, 6.5)}${grid(14, 52, 9, 10.5, 2, 3, 6, 6.5)}${grid(72, 42, 9, 10.5, 2, 4, 6, 6.5)}" fill="${glass(t)}"/>
<path d="${grid(34, 81, 0, 0, 1, 1, 7, 6)}" fill="none"/>
<g ${Bs}><path d="M42 87 V77 H58 V87Z" fill="${t.lin([C.woodL, C.woodD])}"/></g>
<path d="M50 77 V87" stroke="${C.woodDD}" stroke-width="1"/><circle cx="50" cy="5" r="0.1" fill="none"/>`;
});

const jp = (t, cx, cy, c = C.paper, s = 1) => `<g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M${cx - 5 * s} ${cy - 5 * s}H${cx + 5 * s}M${cx - 5 * s} ${cy - 1.5 * s}H${cx + 5 * s}M${cx} ${cy - 1.5 * s}V${cy + 5 * s}M${cx - 3 * s} ${cy + 1.5 * s}V${cy + 4 * s}"/></g>`;
add("1f3e3", "Japanese post office", (t) => `
${base(t)}
<g ${B}><rect x="14" y="48" width="72" height="40" fill="${stone(t)}"/><polygon points="6,52 50,22 94,52 88,57 50,32 12,57" fill="${t.lin([C.red, C.redD])}"/></g>
<g ${B}><circle cx="50" cy="44" r="11" fill="${t.lin([C.red, C.redM, C.redD], "d")}"/></g>${jp(t, 50, 43)}
<g ${Bs}><rect x="21" y="62" width="16" height="14" rx="1.5" fill="${glass(t)}"/><rect x="63" y="62" width="16" height="14" rx="1.5" fill="${glass(t)}"/><path d="M40 88 V70 H60 V88Z" fill="${t.lin([C.woodL, C.woodD])}"/></g>
<rect x="38" y="60" width="24" height="5" rx="1.4" fill="${C.redM}"/>`, 7);

add("1f3e4", "post office", (t) => `
${base(t)}
<g ${B}><rect x="12" y="34" width="76" height="53" fill="${t.lin([C.yellow, C.yellowM, C.yellowD])}"/><rect x="8" y="26" width="84" height="10" rx="2" fill="${t.lin([C.blue, C.blueD])}"/></g>
<g ${B}><circle cx="50" cy="52" r="13" fill="${t.lin([C.navy, C.navyD], "d")}"/></g>
<g fill="none" stroke="${C.gold}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="46" cy="55" r="3.8"/><path d="M48 52 L58 45 M49.5 55.4 L58 51"/></g>
<g ${Bs}><rect x="18" y="62" width="14" height="14" rx="1.5" fill="${glass(t)}"/><rect x="68" y="62" width="14" height="14" rx="1.5" fill="${glass(t)}"/><path d="M42 88 V72 H58 V88Z" fill="${t.lin([C.woodL, C.woodD])}"/></g>
<g ${Bs}><rect x="38" y="68" width="24" height="5" rx="1.4" fill="${t.lin([C.red, C.redD])}"/></g>
<path d="M12 27 H88" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>`, 9);

add("1f3e5", "hospital", (t) => `
${base(t)}
<g ${B}><rect x="14" y="34" width="72" height="53" fill="${stone(t)}"/><rect x="10" y="30" width="80" height="6" rx="2" fill="${t.lin([C.blue, C.blueD])}"/></g>
<g ${B}><rect x="34" y="8" width="32" height="24" rx="3" fill="${stone(t)}"/></g>
<g ${Bs}><path d="M46 12 H54 V18 H60 V26 H54 V30 H46 V26 H40 V18 H46Z" fill="${t.lin([C.red, C.redD])}" transform="translate(0 -2)"/></g>
<path d="${grid(20, 42, 16, 14, 4, 2, 9, 9)}" fill="${glass(t)}"/>
<g ${Bs}><rect x="38" y="66" width="24" height="21" rx="2" fill="${glass(t)}"/><rect x="34" y="62" width="32" height="5" rx="1.5" fill="${t.lin([C.red, C.redD])}"/></g>
<path d="M50 67 V87" stroke="${C.paper}" stroke-width="1.4"/>`);

add("1f3e6", "bank", (t) => `
${base(t)}
<g ${B}><polygon points="8,34 50,12 92,34" fill="${stone(t)}"/><rect x="8" y="34" width="84" height="7" fill="${stone(t)}"/><rect x="14" y="41" width="72" height="42" fill="${t.lin([C.blueM, C.blueD])}"/></g>
<g ${B}><circle cx="50" cy="27" r="7.4" fill="${t.lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<path d="M53 23.6 C52 21.6 46 22 46 25 C46 28.6 54 26.4 54 30 C54 32.6 48 33 46.4 30.6 M50 20.4 V34" fill="none" stroke="${C.goldD}" stroke-width="1.5" stroke-linecap="round"/>
<g ${Bs}><path d="M42 83 V65 a8 8 0 0 1 16 0 V83Z" fill="${t.lin([C.woodL, C.wood, C.woodD])}"/></g>
${columns(t, [16, 28, 64, 76], 8, 44, 80)}
<g ${B}><rect x="6" y="80" width="88" height="7" rx="1.5" fill="${t.lin(["#D8D0BA", "#A9A18C"])}"/></g>`);

add("1f3e8", "hotel", (t) => `
${base(t)}
<g ${B}><rect x="18" y="22" width="64" height="65" fill="${t.lin(["#F1D3A5", "#D8A97A", "#B8845A"], "d")}"/><rect x="14" y="16" width="72" height="7" rx="2" fill="${stone(t)}"/></g>
<g ${B}><rect x="35" y="2" width="30" height="14" rx="3" fill="${t.lin([C.navy, C.navyD])}"/></g>
<path d="M42 5 V13 M58 5 V13 M42 9 H58" stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round"/>
<path d="${grid(25, 30, 15, 13, 4, 3, 8, 8)}" fill="${glass(t)}"/>
<g ${Bs}><rect x="38" y="68" width="24" height="19" rx="2" fill="${glass(t)}"/><path d="M34 66 H66 L63 72 H37Z" fill="${t.lin([C.red, C.redD])}"/></g>
<path d="M50 72 V87" stroke="${C.paper}" stroke-width="1.4"/>`);

const heart = (cx, cy, s) => `M${cx} ${cy + 6 * s} C${cx - 9 * s} ${cy} ${cx - 8 * s} ${cy - 8 * s} ${cx - 3.5 * s} ${cy - 7 * s} C${cx - 1 * s} ${cy - 6.5 * s} ${cx} ${cy - 4 * s} ${cx} ${cy - 4 * s} C${cx} ${cy - 4 * s} ${cx + 1 * s} ${cy - 6.5 * s} ${cx + 3.5 * s} ${cy - 7 * s} C${cx + 8 * s} ${cy - 8 * s} ${cx + 9 * s} ${cy} ${cx} ${cy + 6 * s}Z`;
add("1f3e9", "love hotel", (t) => `
${base(t)}
<g ${B}><rect x="18" y="26" width="64" height="61" fill="${t.lin(["#FBC9D5", C.pink, C.pinkD], "d")}"/><rect x="14" y="20" width="72" height="7" rx="2" fill="${stone(t)}"/></g>
<g ${B}><path d="${heart(50, 12, 1.3)}" fill="${t.lin(["#F58578", C.redD], "d")}"/></g>
<path d="${grid(25, 33, 15, 13, 4, 3, 8, 8)}" fill="${glass(t)}"/>
<g ${Bs}><rect x="38" y="68" width="24" height="19" rx="2" fill="${glass(t)}"/><path d="M34 66 H66 L63 72 H37Z" fill="${t.lin([C.red, C.redD])}"/></g>
<path d="M50 72 V87" stroke="${C.paper}" stroke-width="1.4"/>
<path d="${heart(50, 58, 0.8)}" fill="${C.red}"/>`);

add("1f3ea", "convenience store", (t) => `
${base(t)}
<g ${B}><rect x="8" y="22" width="84" height="15" rx="3" fill="${t.lin([C.green, C.greenM, C.greenD])}"/></g>
<g ${B}><rect x="12" y="37" width="76" height="50" fill="${stone(t)}"/></g>
<g fill="${C.paper}"><rect x="16" y="26" width="30" height="3.4" rx="1.7"/><rect x="16" y="31" width="18" height="3" rx="1.5"/></g><circle cx="76" cy="29" r="5" fill="${C.orange}"/>
<g ${B}><path d="M6 37 H94 L90 52 H10Z" fill="${C.paper}"/></g>
<path d="M6 37 L10 52 H21 L19 37Z M31 37 L32 52 H43 L41 37Z M53 37 L54 52 H65 L63 37Z M75 37 L76 52 H87 L85 37Z" fill="${t.lin([C.red, C.redD])}"/>
<g ${Bs}><rect x="16" y="56" width="42" height="26" rx="2" fill="${glass(t)}"/><rect x="64" y="56" width="20" height="31" rx="2" fill="${glass(t)}"/></g>
<g fill="${C.orange}"><rect x="21" y="70" width="7" height="12" rx="1.4"/><rect x="31" y="66" width="7" height="16" rx="1.4" fill="${C.blueM}"/><rect x="41" y="72" width="7" height="10" rx="1.4" fill="${C.yellowM}"/></g>`, 7);

add("1f3ec", "department store", (t) => `
${base(t)}
<g ${B}><rect x="8" y="34" width="84" height="53" fill="${t.lin(["#F4DCBA", "#D8B48A", "#B98E64"], "d")}"/><rect x="4" y="30" width="92" height="6" rx="2" fill="${stone(t)}"/></g>
<g ${B}><rect x="32" y="14" width="36" height="20" fill="${t.lin(["#F4DCBA", "#D8B48A"], "d")}"/><rect x="29" y="10" width="42" height="5" rx="1.6" fill="${stone(t)}"/></g>
<path d="M50 10 V2" stroke="${C.metalD}" stroke-width="1.6"/><g ${Bs}><polygon points="50,2 62,5.6 50,9.4" fill="${C.red}"/></g>
<circle cx="50" cy="24" r="6" fill="${C.paper}" stroke="${C.goldM}" stroke-width="1.6"/><path d="M50 24 V20.4 M50 24 H52.6" stroke="${C.darkD}" stroke-width="1.1" stroke-linecap="round"/>
<path d="${grid(14, 40, 13, 14, 6, 2, 8, 9)}" fill="${glass(t)}"/>
<g ${B}><path d="M6 60 H94 L90 70 H10Z" fill="${C.paper}"/></g>
<path d="M6 60 L10 70 H22 L20 60Z M32 60 L33 70 H44 L43 60Z M56 60 L57 70 H68 L67 60Z M80 60 L81 70 H90 L94 60Z" fill="${t.lin([C.green, C.greenD])}"/>
<g ${Bs}><rect x="14" y="73" width="20" height="14" rx="1.5" fill="${glass(t)}"/><rect x="66" y="73" width="20" height="14" rx="1.5" fill="${glass(t)}"/><path d="M42 87 V73 H58 V87Z" fill="${t.lin([C.woodL, C.woodD])}"/></g>`);

// order = assignment order
const order = ["1f30d","1f30e","1f30f","1f310","1f5fa-fe0f","1f5fe","1f9ed","1f3d4-fe0f","26f0-fe0f","1f30b","1f5fb","1f3d5-fe0f","1f3d6-fe0f","1f3dc-fe0f","1f3dd-fe0f","1f3de-fe0f","1f3df-fe0f","1f3db-fe0f","1f3d7-fe0f","1f9f1","1faa8","1fab5","1f6d6","1f3d8-fe0f","1f3da-fe0f","1f3e0","1f3e1","1f3e2","1f3e3","1f3e4","1f3e5","1f3e6","1f3e8","1f3e9","1f3ea","1f3ec"];
export default order.map((u) => icons.find((i) => i.u === u)).filter(Boolean);
