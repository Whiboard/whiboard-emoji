// Activities 2: sports balls and gear.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const f1 = (n) => +n.toFixed(1);
const P = (p) => p.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");
const pent = (cx, cy, R, a0) =>
  Array.from({ length: 5 }, (_, k) => {
    const a = ((a0 + 72 * k) * Math.PI) / 180;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
const pol = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];

// sphere: bevelled disc, detail clipped inside, soft shading on top
const sphere = (t, cols, inner = "") => `<g ${B}><circle cx="50" cy="50" r="43" fill="${t.rad(cols, 0.36, 0.3, 0.85)}"/></g>
<g ${t.clip('<circle cx="50" cy="50" r="43"/>')}>${inner}</g>
<circle cx="50" cy="50" r="43" fill="${t.rad([[0, "#fff", 0.28], [0.5, "#fff", 0], [1, "#3A1C10", 0.38]], 0.34, 0.28, 0.82)}"/>`;

const bez = (p, t) => {
  const u = 1 - t;
  return [0, 1].map((i) => u * u * u * p[0][i] + 3 * u * u * t * p[1][i] + 3 * u * t * t * p[2][i] + t * t * t * p[3][i]);
};
const dbez = (p, t) => {
  const u = 1 - t;
  return [0, 1].map((i) => 3 * u * u * (p[1][i] - p[0][i]) + 6 * u * t * (p[2][i] - p[1][i]) + 3 * t * t * (p[3][i] - p[2][i]));
};
const stitches = (p, n, len, col) => {
  let d = "";
  for (let k = 1; k < n; k++) {
    const t = k / n;
    const [x, y] = bez(p, t);
    const [dx, dy] = dbez(p, t);
    const m = Math.hypot(dx, dy);
    const nx = (-dy / m) * len;
    const ny = (dx / m) * len;
    d += `M${f1(x - nx)} ${f1(y - ny)}L${f1(x + nx)} ${f1(y + ny)}`;
  }
  return `<path d="M${p[0]} C${p[1]} ${p[2]} ${p[3]}" fill="none" stroke="${col}" stroke-width="1.6"/><path d="${d}" fill="none" stroke="${col}" stroke-width="1.7" stroke-linecap="round"/>`;
};
const seamBall = (t, cols, col, curve) => {
  const L = curve;
  const R = L.map(([x, y]) => [100 - x, y]);
  return sphere(t, cols, stitches(L, 11, 4.2, col) + stitches(R, 11, 4.2, col));
};

const soccer = (t) => {
  const dk = t.lin([C.navy, C.navyD], "d");
  const c0 = pent(50, 50, 12, -90);
  let sp = "";
  let outer = "";
  const E: any[] = [];
  for (let k = 0; k < 5; k++) {
    const a = -90 + 72 * k;
    const s = pol(50, 50, 12, a);
    const e = pol(50, 50, 27, a);
    E.push(e);
    sp += `M${f1(s[0])} ${f1(s[1])}L${f1(e[0])} ${f1(e[1])}`;
  }
  for (let j = 0; j < 5; j++) {
    const ang = -54 + 72 * j;
    const c = pol(50, 50, 43, ang);
    const op = pent(c[0], c[1], 11.5, ang + 180);
    outer += `<polygon points="${P(op)}" fill="${dk}"/>`;
    sp += `M${f1(E[j][0])} ${f1(E[j][1])}L${f1(op[1][0])} ${f1(op[1][1])}M${f1(E[(j + 1) % 5][0])} ${f1(E[(j + 1) % 5][1])}L${f1(op[4][0])} ${f1(op[4][1])}`;
  }
  return sphere(t, ["#FFFBF0", C.paper, "#CFC19B"], `<path d="${sp}" stroke="${C.navy}" stroke-width="2" stroke-linecap="round" fill="none"/>${outer}<polygon points="${P(c0)}" fill="${dk}" stroke="${C.navyD}" stroke-width=".8" stroke-linejoin="round"/>`);
};

const bandAt = (d, col, rot) => `<g transform="rotate(${rot} 50 50)"><path d="${d}" fill="none" stroke="${C.navyD}" stroke-width="12.5" opacity=".3"/><path d="${d}" fill="none" stroke="${col}" stroke-width="9.5"/></g>`;

const stripes = (n) => Array.from({ length: n }, (_, i) => i);

const __batch: Icon[] = [
  { u: "26bd", n: "soccer ball", draw: soccer },
  { u: "26be", n: "baseball", draw: (t) => seamBall(t, ["#FFFBF0", C.paper, "#CDBF9A"], C.redM, [[30, 5], [51, 32], [51, 68], [30, 95]]) },
  { u: "1f94e", n: "softball", draw: (t) => seamBall(t, ["#F4F08A", "#DCD64A", "#A9A52A"], C.redM, [[29, 5], [53, 32], [53, 68], [29, 95]]) },
  {
    u: "1f3c0",
    n: "basketball",
    draw: (t) =>
      sphere(
        t,
        ["#FAC48A", C.orange, "#C86C22"],
        `<g fill="none" stroke="#7A3B1C" stroke-width="2.4" stroke-linecap="round"><path d="M50 4V96M4 50H96"/><path d="M20 12C42 30 42 70 20 88M80 12C58 30 58 70 80 88"/></g>`,
      ),
  },
  {
    u: "1f3d0",
    n: "volleyball",
    draw: (t) => {
      const d = "M50 50C46 34 32 24 2 28";
      return sphere(t, ["#FFFBF0", C.paper, "#CDBF9A"], bandAt(d, C.blueM, 0) + bandAt(d, C.yellowM, 120) + bandAt(d, C.blueM, 240));
    },
  },
  {
    u: "1f3c8",
    n: "american football",
    draw: ({ lin }) => `<g ${B}><g transform="rotate(-40 50 50) translate(50 50) scale(1.18) translate(-50 -50)"><path d="M4 50C20 18 80 18 96 50C80 82 20 82 4 50Z" fill="${lin([C.wood, C.woodD, C.woodDD])}"/></g></g>
<g transform="rotate(-40 50 50) translate(50 50) scale(1.18) translate(-50 -50)" fill="none" stroke="${C.paper}" stroke-linecap="round"><path d="M22 35C19 44 19 56 22 65M29 31C26 42 26 58 29 69M78 35C81 44 81 56 78 65M71 31C74 42 74 58 71 69" stroke-width="2.6"/><path d="M38 50H62" stroke-width="2.6"/><path d="M41 44V56M46 44V56M51 44V56M56 44V56M61 44V56" stroke-width="2"/></g>`,
  },
  {
    u: "1f3c9",
    n: "rugby football",
    draw: ({ lin }) => `<g ${B}><g transform="rotate(38 50 50) translate(50 50) scale(1.12) translate(-50 -50)"><path d="M5 50C17 10 83 10 95 50C83 90 17 90 5 50Z" fill="${lin(["#DE9A58", "#B0602C", "#7E3F1C"])}"/></g></g>
<g transform="rotate(38 50 50) translate(50 50) scale(1.12) translate(-50 -50)" fill="none" stroke="${C.paper}" stroke-linecap="round" stroke-width="2.4" opacity=".92"><path d="M10 50H90"/><path d="M18 33C40 38 60 38 82 33M18 67C40 62 60 62 82 67"/><path d="M46 20V32M54 20V32M46 68V80M54 68V80" stroke-width="1.8"/></g>`,
  },
  {
    u: "1f3be",
    n: "tennis",
    draw: (t) =>
      sphere(
        t,
        ["#EFF28A", "#CBD848", "#8EA52A"],
        `<g fill="none" stroke="${C.paper}" stroke-width="3.6" stroke-linecap="round"><path d="M12 22C42 34 42 66 12 78M88 22C58 34 58 66 88 78"/></g>`,
      ),
  },
  {
    u: "1f94f",
    n: "flying disc",
    draw: ({ lin }) => `<g ${B}><g transform="rotate(-16 50 50)"><ellipse cx="50" cy="60" rx="43" ry="22" fill="${lin([C.blueM, C.blueD])}"/></g></g>
<g ${B}><g transform="rotate(-16 50 50)"><ellipse cx="50" cy="51" rx="43" ry="22" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g></g>
<g transform="rotate(-16 50 50)"><ellipse cx="50" cy="51" rx="31" ry="14.5" fill="${lin([C.blueD, C.blueM, C.blue], "d")}"/><ellipse cx="50" cy="51" rx="31" ry="14.5" fill="none" stroke="${C.paper}" stroke-width="1.6" opacity=".75"/><path d="M12 42C20 31 38 26 56 27" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".55"/></g>`,
  },
  {
    u: "1f3b3",
    n: "bowling",
    draw: ({ lin, rad, clip }) => {
      const pin = "M38 5C46 5 47 14 44 20C42 25 42 29 46 36C52 46 55 60 53 70C52 77 50 82 50 86H26C26 82 24 77 23 70C21 60 24 46 30 36C34 29 34 25 32 20C29 14 30 5 38 5Z";
      return `<g transform="translate(-6 0)"><g ${B}><path d="${pin}" fill="${lin(["#FFFBF0", C.paper, "#CDBF9A"], "h")}"/></g>
<g ${clip(`<path d="${pin}"/>`)}><rect x="20" y="23" width="40" height="4.6" fill="${C.redM}"/><rect x="20" y="30" width="40" height="3.4" fill="${C.redM}"/></g>
<g ${B}><circle cx="65" cy="71" r="25" fill="${rad(["#8294CC", C.navy, C.navyD], 0.34, 0.3, 0.85)}"/></g>
<circle cx="58" cy="62" r="2.6" fill="${C.darkD}"/><circle cx="68" cy="59.5" r="2.6" fill="${C.darkD}"/><circle cx="65" cy="70" r="3.2" fill="${C.darkD}"/>
<ellipse cx="55" cy="56" rx="6" ry="3.4" transform="rotate(-35 55 56)" fill="#fff" opacity=".3"/></g>`;
    },
  },
  {
    u: "1f3cf",
    n: "cricket game",
    draw: ({ lin, rad }) => `<g ${B}><g transform="rotate(40 50 50) translate(50 50) scale(1.14) translate(-50 -50)">
<rect x="45" y="4" width="10" height="36" rx="5" fill="${lin([C.woodDD, C.woodD, C.woodDD], "h")}"/>
<path d="M46 32H54L62 44V86A6 6 0 0 1 56 92H44A6 6 0 0 1 38 86V44Z" fill="${lin([C.wood, C.woodL, C.wood], "h")}"/>
<rect x="44" y="8" width="12" height="18" rx="3" fill="${lin([C.red, C.redD], "h")}"/>
</g></g>
<g transform="rotate(40 50 50) translate(50 50) scale(1.14) translate(-50 -50)"><path d="M50 46V88" stroke="${C.woodD}" stroke-width="1.4" opacity=".55"/><path d="M45 14H55M45 19H55" stroke="${C.redD}" stroke-width="1.2" opacity=".6"/></g>
<g ${B}><circle cx="77" cy="77" r="13" fill="${rad(["#F58578", C.redM, C.redD])}"/></g>
<path d="M69 71C75 75 75 81 70 86M85 68C80 73 82 80 86 84" fill="none" stroke="${C.paper}" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>`,
  },
  {
    u: "1f3d1",
    n: "field hockey",
    draw: ({ lin, rad }) => `<g ${B}><path d="M82 8L40 74C34 84 24 88 12 84" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="8.5" stroke-linecap="round"/></g>
<g ${Bs}><path d="M82 8L68 30" stroke="${C.blueD}" stroke-width="9" stroke-linecap="round"/></g>
<g ${B}><circle cx="76" cy="79" r="11" fill="${rad(["#FDE8A0", C.yellow, C.yellowD])}"/></g>`,
  },
  {
    u: "1f3d2",
    n: "ice hockey",
    draw: ({ lin }) => {
      const cyl = lin([C.metal, C.metalDD]);
      return `<g ${B}><path d="M16 6L44 64" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="7" stroke-linecap="round"/>
<rect x="34" y="60" width="46" height="13" rx="4.5" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<rect x="46" y="60" width="8" height="13" fill="${C.blueD}"/><rect x="62" y="60" width="8" height="13" fill="${C.blueD}"/>
<g ${B}><path d="M44 83V89A18 7 0 0 0 80 89V83Z" fill="${lin([C.dark, C.darkD], "h")}"/><ellipse cx="62" cy="83" rx="18" ry="7" fill="${lin(["#7A6D75", C.dark])}"/></g>
<ellipse cx="57" cy="81.4" rx="8" ry="2" fill="#fff" opacity=".3"/>`;
    },
  },
  {
    u: "1f94d",
    n: "lacrosse",
    draw: ({ lin, rad, clip }) => {
      const head = "M45 48C36 38 29 26 31 13C35 3 65 3 69 13C71 26 64 38 55 48Z";
      return `<g ${B}><g transform="rotate(42 50 50)"><rect x="46" y="44" width="8" height="52" rx="4" fill="${lin([C.metalD, C.metalL, C.metalD], "h")}"/></g></g>
<g transform="rotate(42 50 50)"><path d="${head}" fill="#DCECF6" fill-opacity=".45"/>
<g ${clip(`<path d="${head}"/>`)}><path d="M42 6V46M50 6V46M58 6V46M30 16H70M30 25H70M30 34H70" stroke="${C.metalDD}" stroke-width="1.1" opacity=".6"/></g></g>
<g ${B}><g transform="rotate(42 50 50)"><path d="${head}" fill="none" stroke="${lin([C.orange, C.orangeD], "d")}" stroke-width="5" stroke-linejoin="round"/></g></g>
<g ${B}><circle cx="78" cy="78" r="11" fill="${rad(["#C7E4B8", C.greenM, C.greenD])}"/></g>`;
    },
  },
  {
    u: "1f3d3",
    n: "ping pong",
    draw: ({ lin, rad }) => `<g ${B}><g transform="rotate(40 50 50)">
<rect x="43.5" y="52" width="13" height="42" rx="6.5" fill="${lin([C.woodD, C.woodL, C.woodD], "h")}"/>
<circle cx="50" cy="32" r="29" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/>
<circle cx="50" cy="32" r="25.5" fill="${rad(["#F58578", C.redM, C.redD], 0.36, 0.3, 0.85)}"/>
</g></g>
<g transform="rotate(40 50 50)"><ellipse cx="40" cy="22" rx="9" ry="5" transform="rotate(-30 40 22)" fill="#fff" opacity=".3"/><path d="M45 56H55M45 62H55" stroke="${C.woodDD}" stroke-width="1.2" opacity=".5"/></g>
<g ${B}><circle cx="77" cy="79" r="10" fill="${rad(["#FDE0B8", C.orange, C.orangeD])}"/></g>`,
  },
  {
    u: "1f3f8",
    n: "badminton",
    draw: ({ lin, rad }) => `<g ${B}><g transform="translate(-4 4) rotate(40 50 50) translate(50 50) scale(.95) translate(-50 -50)">
<path d="M41 76L15 14Q50 1 85 14L59 76Z" fill="${lin(["#CDBF9A", C.paper, "#CDBF9A"], "h")}"/>
<path d="M38 74H62C67 86 60 96 50 96C40 96 33 86 38 74Z" fill="${lin([C.pink, C.red, C.redD], "d")}"/>
</g></g>
<g transform="translate(-4 4) rotate(40 50 50) translate(50 50) scale(.95) translate(-50 -50)"><path d="M46 74L30 8M50 74V6M54 74L70 8M34 74L22 14M66 74L78 14" stroke="#B8A780" stroke-width="1.1" opacity=".7"/></g>
<g ${Bs}><g transform="translate(-4 4) rotate(40 50 50) translate(50 50) scale(.95) translate(-50 -50)"><path d="M15 14Q50 1 85 14L83 24Q50 12 17 24Z" fill="${lin([C.blue, C.blueD])}"/></g></g>`,
  },
  {
    u: "1f94a",
    n: "boxing glove",
    draw: ({ lin, rad }) => `<g ${B}><path d="M26 72C19 52 17 28 34 15C50 3 78 9 84 31C88 48 82 62 72 72Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><path d="M31 44C20 43 13 56 21 65C27 71 36 67 39 58Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${B}><rect x="26" y="70" width="46" height="22" rx="5" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="26" y="77" width="46" height="4.4" fill="${C.blueM}"/>
<path d="M44 40C48 24 62 20 72 28" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".4"/>
<path d="M30 49C26 53 26 59 30 62" fill="none" stroke="${C.redD}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`,
  },
  {
    u: "1f94b",
    n: "martial arts uniform",
    draw: ({ lin }) => `<g ${B}><path d="M35 8L50 21L65 8L93 30L83 53L72 46V90H28V46L17 53L7 30Z" fill="${lin(["#FFFBF0", C.paper, "#CDBF9A"], "d")}"/></g>
<path d="M35 8L55 62M65 8L45 62" fill="none" stroke="#B8A780" stroke-width="2.2" stroke-linecap="round"/>
<path d="M17 53L28 46M83 53L72 46" stroke="#B8A780" stroke-width="1.6"/>
<g ${B}><rect x="27" y="61" width="46" height="10" rx="2" fill="${lin([C.navy, C.navyD])}"/>
<path d="M46 70L38 90L47 86L50 72ZM54 70L62 90L53 86L50 72Z" fill="${C.navyD}"/>
<rect x="44" y="59" width="12" height="14" rx="3.5" fill="${lin([C.navy, C.navyD])}"/></g>`,
  },
  {
    u: "1f945",
    n: "goal net",
    draw: ({ lin }) => {
      const vx = [30, 38, 46, 54, 62, 70].map((x) => `M${x} 34V72`).join("");
      const hy = [43, 52, 61].map((y) => `M22 ${y}H78`).join("");
      return `<g transform="translate(0 -7)"><g ${B}><rect x="4" y="82" width="92" height="10" rx="5" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<polygon points="10,26 90,26 78,34 22,34" fill="#DCECF6" fill-opacity=".4"/>
<polygon points="10,26 22,34 22,72 10,84" fill="#DCECF6" fill-opacity=".3"/><polygon points="90,26 78,34 78,72 90,84" fill="#DCECF6" fill-opacity=".3"/>
<rect x="22" y="34" width="56" height="38" fill="#DCECF6" fill-opacity=".25"/>
<path d="${vx}${hy}M10 26L22 34M90 26L78 34M10 84L22 72M90 84L78 72M34 26L26 34M50 26V34M66 26L74 34M10 45L22 45M10 62H22M90 45H78M90 62H78" stroke="${C.metalDD}" stroke-width="1.3" opacity=".75"/>
<g ${B}><path d="M10 84V26H90V84" fill="none" stroke="#F1E9D2" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"/></g></g>`;
    },
  },
  {
    u: "26f3",
    n: "flag in hole",
    draw: ({ lin, rad }) => `<g ${B}><ellipse cx="50" cy="82" rx="44" ry="12" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<ellipse cx="42" cy="79" rx="12" ry="4.2" fill="${C.darkD}"/>
<g ${Bs}><path d="M42 80V8" stroke="${C.metalD}" stroke-width="3" stroke-linecap="round"/></g>
<g ${Bs}><polygon points="44,8 84,21 44,34" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<g ${Bs}><circle cx="72" cy="83" r="7" fill="${rad(["#FFFBF0", C.paper, "#BFB08A"])}"/></g>`,
  },
  {
    u: "26f8-fe0f",
    n: "ice skate",
    draw: ({ lin }) => `<g ${B}><path d="M24 8H53C55 8 56 10 56 12V38C56 49 65 53 79 57C89 60 93 66 93 72V76H19V12C19 10 21 8 24 8Z" fill="${lin(["#F4ECD6", "#CDBF9A"], "d")}"/></g>
<g ${Bs}><rect x="19" y="8" width="37" height="11" rx="3" fill="${lin([C.blue, C.blueD])}"/></g>
<path d="M45 27H57M45 34H58M46 41H60M52 48H64" stroke="${C.blueD}" stroke-width="2.2" stroke-linecap="round"/>
<g ${B}><rect x="16" y="74" width="80" height="8" rx="3" fill="${lin([C.woodL, C.woodD])}"/></g>
<g ${Bs}><rect x="28" y="80" width="6" height="7" fill="${C.metalD}"/><rect x="76" y="80" width="6" height="7" fill="${C.metalD}"/>
<rect x="10" y="86" width="84" height="6" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>`,
  },
  {
    u: "1f3a3",
    n: "fishing pole",
    draw: ({ lin, rad, clip }) => `<g ${B}><path d="M14 88Q58 56 88 10" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="4.6" stroke-linecap="round"/></g>
<g ${B}><path d="M14 88L28 74" stroke="${C.redD}" stroke-width="9" stroke-linecap="round"/></g>
<g ${Bs}><circle cx="42" cy="76" r="7" fill="${lin([C.metalL, C.metalD], "d")}"/></g><circle cx="42" cy="76" r="2.4" fill="${C.metalDD}"/>
<path d="M88 10Q99 38 80 56M80 72V79A4 4 0 1 1 76 75" fill="none" stroke="${C.metalD}" stroke-width="1.5" stroke-linecap="round"/>
<g ${B}><circle cx="80" cy="64" r="8.5" fill="${rad(["#FFFBF0", C.paper, "#CDBF9A"])}"/></g>
<g ${clip('<circle cx="80" cy="64" r="8.5"/>')}><rect x="70" y="54" width="20" height="9" fill="${C.redM}"/></g>
<path d="M54 91q5 -5 10 0t10 0t10 0t10 0" fill="none" stroke="${C.blueM}" stroke-width="2.6" stroke-linecap="round"/>`,
  },
  {
    u: "1f93f",
    n: "diving mask",
    draw: ({ lin }) => `<g ${B}><rect x="3" y="34" width="94" height="17" rx="6" fill="${lin([C.navy, C.navyD])}"/></g>
<g ${B}><path d="M16 26H84A8 8 0 0 1 92 34V50C92 66 80 74 68 74C60 74 58 66 50 66C42 66 40 74 32 74C20 74 8 66 8 50V34A8 8 0 0 1 16 26Z" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<g ${Bs}><path d="M17 34H46V54C46 60 42 63 36 63C26 63 17 59 17 52Z" fill="${lin([C.sky, C.skyD], "d")}"/><path d="M83 34H54V54C54 60 58 63 64 63C74 63 83 59 83 52Z" fill="${lin([C.sky, C.skyD], "d")}"/></g>
<path d="M21 40L30 38M57 40L66 38" stroke="#fff" stroke-width="2.8" stroke-linecap="round" opacity=".8"/>`,
  },
  {
    u: "1f3bd",
    n: "running shirt",
    draw: ({ lin }) => `<g ${B}><path d="M31 7H41C43 22 57 22 59 7H69C70 24 82 28 82 44V92H18V44C18 28 30 24 31 7Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M41 7C43 22 57 22 59 7M31 7C30 24 18 28 18 44M69 7C70 24 82 28 82 44" fill="none" stroke="${C.paper}" stroke-width="2.6" stroke-linecap="round"/>
<rect x="18" y="85" width="64" height="5" fill="${C.paper}" opacity=".9"/>
<g ${Bs}><rect x="34" y="42" width="32" height="26" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M47 51L52 48V63M46 63H58" fill="none" stroke="${C.redM}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="37.5" cy="45.5" r="1.1" fill="${C.metalD}"/><circle cx="62.5" cy="45.5" r="1.1" fill="${C.metalD}"/><circle cx="37.5" cy="64.5" r="1.1" fill="${C.metalD}"/><circle cx="62.5" cy="64.5" r="1.1" fill="${C.metalD}"/>`,
  },
  {
    u: "1f3bf",
    n: "skis",
    draw: ({ lin }) => {
      const ski = (x) => `M${x} 94H${x + 11}V28Q${x + 11} 12 ${x + 17} 4Q${x} 8 ${x} 26Z`;
      return `<g ${B}><g transform="translate(3 2) rotate(45 50 50)"><path d="${ski(24)}" fill="${lin([C.blue, C.blueM, C.blueD], "h")}"/><path d="${ski(47)}" fill="${lin([C.red, C.redM, C.redD], "h")}"/></g></g>
<g ${Bs}><g transform="translate(3 2) rotate(45 50 50)"><rect x="23.5" y="52" width="13" height="14" rx="3" fill="${lin([C.dark, C.darkD])}"/><rect x="46.5" y="52" width="13" height="14" rx="3" fill="${lin([C.dark, C.darkD])}"/></g></g>
<g transform="translate(3 2) rotate(45 50 50)" fill="${C.paper}" opacity=".8"><rect x="26" y="74" width="9" height="2"/><rect x="26" y="80" width="9" height="2"/><rect x="48" y="74" width="9" height="2"/><rect x="48" y="80" width="9" height="2"/></g>`;
    },
  },
  {
    u: "1f6f7",
    n: "sled",
    draw: ({ lin }) => {
      const sl = [0.2, 0.4, 0.6, 0.8].map((t) => `M${f1(24 + 72 * t)} 28L${f1(16 + 72 * t)} 46`).join("");
      return `<g ${B}><path d="M10 56C3 56 3 73 18 77H88" fill="none" stroke="${lin([C.metalL, C.metalD])}" stroke-width="4.6" stroke-linecap="round"/>
<rect x="27" y="52" width="6" height="25" fill="${lin([C.woodD, C.woodDD], "h")}"/><rect x="70" y="52" width="6" height="25" fill="${lin([C.woodD, C.woodDD], "h")}"/></g>
<g ${B}><polygon points="24,28 96,28 88,46 16,46" fill="${lin([C.woodL, C.wood])}"/><rect x="16" y="46" width="72" height="9" rx="2" fill="${lin([C.wood, C.woodD])}"/></g>
<path d="${sl}" stroke="${C.woodD}" stroke-width="1.5" opacity=".7"/>
<path d="M14 50C3 44 5 28 14 18" fill="none" stroke="${C.redM}" stroke-width="2.8" stroke-linecap="round"/>`;
    },
  },
  {
    u: "1f94c",
    n: "curling stone",
    draw: ({ lin }) => `<g ${B}><path d="M10 56V74A40 15 0 0 0 90 74V56Z" fill="${lin([C.metalDD, C.metalD, C.metal, C.metalD, C.metalDD], "h")}"/><ellipse cx="50" cy="56" rx="40" ry="15" fill="${lin([C.metal, C.metalD], "d")}"/></g>
<ellipse cx="50" cy="56" rx="27" ry="9" fill="none" stroke="${C.metalDD}" stroke-width="1.6" opacity=".6"/>
<g ${B}><rect x="41" y="28" width="18" height="28" fill="${lin([C.redM, C.redD], "h")}"/></g>
<g ${B}><rect x="22" y="12" width="56" height="18" rx="9" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<rect x="30" y="15.5" width="26" height="3" rx="1.5" fill="#fff" opacity=".35"/>`,
  },
];

export default __batch;
