// travel_places-5: 25 clocks + 13 moons.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const pt = (L, deg) => {
  const a = (deg * Math.PI) / 180;
  return `${(50 + L * Math.sin(a)).toFixed(2)} ${(50 - L * Math.cos(a)).toFixed(2)}`;
};

// ───────── clocks
const hands = (h, half) => {
  const ha = (h % 12) * 30 + (half ? 15 : 0);
  const ma = half ? 180 : 0;
  return `<g ${Bs} fill="none" stroke-linecap="round"><path d="M50 50 L${pt(19, ha)}" stroke="${C.darkD}" stroke-width="5"/><path d="M50 50 L${pt(28, ma)}" stroke="${C.dark}" stroke-width="3.2"/></g>
<circle cx="50" cy="50" r="3.2" fill="${C.goldM}"/><circle cx="49.2" cy="49.2" r="1.1" fill="${C.yellow}"/>`;
};
const ticks = (r0, r1, w) => {
  let d = "";
  for (let i = 0; i < 12; i++) {
    const big = i % 3 === 0;
    const a = i * 30;
    d += `M${pt(big ? r0 - 3 : r0, a)} L${pt(r1, a)} `;
  }
  return `<path d="${d}" stroke="${C.dark}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity=".85"/>`;
};
const clock = (h, half) => ({ lin, rad }) => `
<g ${B}><circle cx="50" cy="50" r="42" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="50" cy="50" r="35" fill="${rad([C.paper, "#F1E6C8", C.paperD], 0.38, 0.32, 0.85)}"/></g>
${ticks(30, 33, 2.2)}
${hands(h, half)}`;

const mantel = ({ lin, rad }) => `
<g ${B}><path d="M20 86 V50 C20 25 33 10 50 10 C67 10 80 25 80 50 V86Z" fill="${lin([C.wood, C.woodD, C.woodDD], "d")}"/></g>
<g ${B}><rect x="10" y="80" width="80" height="12" rx="4" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}><circle cx="50" cy="41" r="22" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
<g ${B}><circle cx="50" cy="41" r="18" fill="${rad([C.paper, C.paperD], 0.38, 0.32, 0.85)}"/></g>
<path d="M50 25.5 V28.5 M50 53.5 V56.5 M34.5 41 H37.5 M62.5 41 H65.5" stroke="${C.dark}" stroke-width="2" stroke-linecap="round"/>
<g ${Bs} fill="none" stroke-linecap="round"><path d="M50 41 L${(50 + 10 * Math.sin((300 * Math.PI) / 180)).toFixed(1)} ${(41 - 10 * Math.cos((300 * Math.PI) / 180)).toFixed(1)}" stroke="${C.darkD}" stroke-width="3.4"/><path d="M50 41 V26" stroke="${C.dark}" stroke-width="2.4"/></g>
<circle cx="50" cy="41" r="2.2" fill="${C.goldM}"/>
<g ${Bs}><rect x="35" y="62" width="30" height="15" rx="4" fill="${lin([C.woodDD, C.woodD])}"/></g>
<path d="M50 62 V69" stroke="${C.goldM}" stroke-width="1.6"/>
<g ${Bs}><circle cx="50" cy="71" r="4.6" fill="${lin([C.gold, C.goldD], "d")}"/></g>`;

// ───────── moons
const R = 42;
const sunny = ({ rad }) => rad(["#FFF6CC", C.yellow, "#E9BE55"], 0.35, 0.3, 0.85);
const shadow = ({ rad }) => rad(["#8693BE", "#5F6B8F", "#44568F"], 0.35, 0.3, 0.9);
const litPath = (right, kind) => {
  const top = `M50 ${50 - R}`;
  const arc = `A${R} ${R} 0 0 ${right ? 1 : 0} 50 ${50 + R}`;
  if (kind === "half") return `${top} ${arc} Z`;
  const sweep = kind === "cres" ? (right ? 0 : 1) : right ? 1 : 0;
  return `${top} ${arc} A24 ${R} 0 0 ${sweep} 50 ${50 - R}Z`;
};
const faceFull = (dx = 0) => `<circle cx="${38 + dx}" cy="45" r="3.2" fill="${C.darkD}"/><circle cx="${62 + dx}" cy="45" r="3.2" fill="${C.darkD}"/>
<path d="M${40 + dx} 59 Q${50 + dx} 67 ${60 + dx} 59" fill="none" stroke="${C.darkD}" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="${32 + dx}" cy="56" rx="4.4" ry="2.8" fill="${C.red}" opacity=".35"/><ellipse cx="${68 + dx}" cy="56" rx="4.4" ry="2.8" fill="${C.red}" opacity=".35"/>`;
const craters = `<g fill="#B88A2A" opacity=".28"><ellipse cx="36" cy="38" rx="6" ry="5"/><ellipse cx="62" cy="62" rx="8" ry="6.5"/><ellipse cx="66" cy="32" rx="3.6" ry="3"/><ellipse cx="40" cy="68" rx="3.2" ry="2.6"/></g>`;

const moon = (right, kind, face?) => (t) => {
  const { clip } = t;
  const lit = litPath(right, kind);
  let f = "";
  if (face === "full") f = faceFull();
  else if (face === "half") {
    // profile face on the lit half
    const s = right ? 1 : -1;
    const x = (v) => (50 + s * v).toFixed(1);
    f = `<circle cx="${x(20)}" cy="43" r="3.2" fill="${C.darkD}"/><path d="M${x(14)} 60 Q${x(24)} 67 ${x(32)} 58" fill="none" stroke="${C.darkD}" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="${x(30)}" cy="52" rx="4" ry="2.6" fill="${C.red}" opacity=".35"/>`;
  }
  return `<g ${B}><circle cx="50" cy="50" r="${R}" fill="${shadow(t)}"/></g>
<g ${B}><path d="${lit}" fill="${sunny(t)}"/></g>
${face ? f : `<g ${clip(`<path d="${lit}"/>`)}>${craters}</g>`}`;
};
const newMoon = (face) => (t) => `<g ${B}><circle cx="50" cy="50" r="${R}" fill="${shadow(t)}"/></g>
${face ? `<g opacity=".95"><circle cx="38" cy="45" r="3.2" fill="#C9D2F0"/><circle cx="62" cy="45" r="3.2" fill="#C9D2F0"/><path d="M40 59 Q50 67 60 59" fill="none" stroke="#C9D2F0" stroke-width="2.4" stroke-linecap="round"/></g>` : `<g fill="#2F3C68" opacity=".35"><ellipse cx="36" cy="38" rx="6" ry="5"/><ellipse cx="62" cy="62" rx="8" ry="6.5"/><ellipse cx="66" cy="32" rx="3.6" ry="3"/></g>`}`;
const fullMoon = (face) => (t) => `<g ${B}><circle cx="50" cy="50" r="${R}" fill="${sunny(t)}"/></g>
${face ? faceFull() : craters}`;

const crescent = ({ rad }) => `<g ${B}><path transform="translate(14 0)" d="M62 8 A43 43 0 1 0 62 92 A50 50 0 0 1 62 8Z" fill="${rad(["#FFF6CC", C.yellow, "#E0B04A"], 0.3, 0.3, 0.9)}"/></g>`;

const H = [
  ["1f55b", "twelve o’clock", 12, 0], ["1f567", "twelve thirty", 12, 1],
  ["1f550", "one o’clock", 1, 0], ["1f55c", "one thirty", 1, 1],
  ["1f551", "two o’clock", 2, 0], ["1f55d", "two thirty", 2, 1],
  ["1f552", "three o’clock", 3, 0], ["1f55e", "three thirty", 3, 1],
  ["1f553", "four o’clock", 4, 0], ["1f55f", "four thirty", 4, 1],
  ["1f554", "five o’clock", 5, 0], ["1f560", "five thirty", 5, 1],
  ["1f555", "six o’clock", 6, 0], ["1f561", "six thirty", 6, 1],
  ["1f556", "seven o’clock", 7, 0], ["1f562", "seven thirty", 7, 1],
  ["1f557", "eight o’clock", 8, 0], ["1f563", "eight thirty", 8, 1],
  ["1f558", "nine o’clock", 9, 0], ["1f564", "nine thirty", 9, 1],
  ["1f559", "ten o’clock", 10, 0], ["1f565", "ten thirty", 10, 1],
  ["1f55a", "eleven o’clock", 11, 0], ["1f566", "eleven thirty", 11, 1],
];
const byU = Object.fromEntries(H.map(([u, n, h, m]) => [u, { u, n, draw: clock(h, m) }]));
const M: Record<string, [string, any]> = {
  "1f570-fe0f": ["mantelpiece clock", mantel],
  "1f311": ["new moon", newMoon(false)],
  "1f312": ["waxing crescent moon", moon(true, "cres")],
  "1f313": ["first quarter moon", moon(true, "half")],
  "1f314": ["waxing gibbous moon", moon(true, "gib")],
  "1f315": ["full moon", fullMoon(false)],
  "1f316": ["waning gibbous moon", moon(false, "gib")],
  "1f317": ["last quarter moon", moon(false, "half")],
  "1f318": ["waning crescent moon", moon(false, "cres")],
  "1f319": ["crescent moon", crescent],
  "1f31a": ["new moon face", newMoon(true)],
  "1f31b": ["first quarter moon face", moon(true, "half", "half")],
  "1f31c": ["last quarter moon face", moon(false, "half", "half")],
  "1f31d": ["full moon face", fullMoon(true)],
};
for (const [u, [n, draw]] of Object.entries(M)) byU[u] = { u, n, draw };

import { readFileSync } from "node:fs";
const order = JSON.parse(readFileSync(new URL("../data/assign/travel_places-5.json", import.meta.url)) as any).map((x) => x.u);
const __batch: Icon[] = order.map((u) => byU[u]);

export default __batch;
