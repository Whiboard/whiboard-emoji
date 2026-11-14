// Polish 7: redraws of weak activities icons.
import type { Icon } from "../kit.ts";
import { B, Bs, C, star } from "../kit.ts";

const f1 = (n) => +n.toFixed(1);
const P = (p) => p.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");

// sphere: bevelled disc, detail clipped inside, soft shading on top
const sphere = (t, cols, inner = "") => `<g ${B}><circle cx="50" cy="50" r="43" fill="${t.rad(cols, 0.36, 0.3, 0.85)}"/></g>
<g ${t.clip('<circle cx="50" cy="50" r="43"/>')}>${inner}</g>
<circle cx="50" cy="50" r="43" fill="${t.rad([[0, "#fff", 0.28], [0.5, "#fff", 0], [1, "#3A1C10", 0.38]], 0.34, 0.28, 0.82)}"/>`;

// ---------- soccer: real truncated icosahedron, projected
const soccer = (t) => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const V: any[] = [];
  for (const a of [-1, 1]) for (const b of [-phi, phi]) V.push([0, a, b], [a, b, 0], [b, 0, a]);
  const sub = (a, b) => a.map((v, i) => v - b[i]);
  const add = (a, b) => a.map((v, i) => v + b[i]);
  const mul = (a, s) => a.map((v) => v * s);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const nrm = (a) => mul(a, 1 / Math.hypot(...a));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nb = (i) => V.map((w, j) => j).filter((j) => j !== i && Math.hypot(...sub(V[i], V[j])) < 2.1);
  const third = (a, b) => add(a, mul(sub(b, a), 1 / 3));
  const faces: any[] = [];
  V.forEach((v, i) => faces.push({ pent: true, pts: nb(i).map((j) => third(v, V[j])) }));
  for (let i = 0; i < 12; i++) for (const j of nb(i)) for (const k of nb(j)) if (k > j && j > i && nb(i).includes(k)) {
    const [a, b, c] = [V[i], V[j], V[k]];
    faces.push({ pent: false, pts: [third(a, b), third(a, c), third(b, a), third(b, c), third(c, a), third(c, b)] });
  }
  const v0 = V[0];
  const z = nrm(v0);
  const u0 = third(v0, V[nb(0)[0]]);
  const up = nrm(sub(u0, mul(z, dot(u0, z))));
  const xr = cross(up, z);
  const proj = (p) => {
    const q = nrm(p);
    let x = dot(q, xr), y = dot(q, up);
    const zz = dot(q, z);
    if (zz < 0) { const m = Math.hypot(x, y); x /= m; y /= m; }
    return [50 + 43 * x, 50 - 43 * y, zz];
  };
  const dk = t.lin([C.navy, C.navyD], "d");
  let hex = "", pen = "";
  for (const f of faces) {
    const pp = f.pts.map(proj);
    if (Math.max(...pp.map((q) => q[2])) <= 0.02) continue;
    const cx = pp.reduce((s, q) => s + q[0], 0) / pp.length;
    const cy = pp.reduce((s, q) => s + q[1], 0) / pp.length;
    pp.sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx));
    const pl = `<polygon points="${P(pp)}" fill="${f.pent ? dk : "none"}" stroke="${C.navyD}" stroke-width="1.5" stroke-linejoin="round"/>`;
    if (f.pent) pen += pl; else hex += pl;
  }
  return sphere(t, ["#FFFBF0", C.paper, "#CFC19B"], hex + pen);
};

// ---------- volleyball: three curved 3-strip panels
const volley = (t) => {
  const cv = "M58 54C52 36 34 22 -10 22";
  const arm = (rot, col) => `<g transform="rotate(${rot} 50 50)"><g transform="translate(0 4)"><path d="${cv}" fill="none" stroke="${col}" stroke-width="13"/></g><g fill="none" stroke="${C.navyD}" stroke-width="1.5" opacity=".55"><path d="${cv}" transform="translate(0 -3)"/><path d="${cv}" transform="translate(0 11)"/></g></g>`;
  return sphere(t, ["#FFFBF0", C.paper, "#CDBF9A"], arm(0, C.blueM) + arm(120, C.yellowM) + arm(240, C.blueM));
};

// ---------- goal net
const goal = ({ lin }) => {
  const v = [32, 42, 52, 62, 72].map((x) => `M${x} 30V68`).join("");
  const h = [38, 46, 54, 62].map((y) => `M24 ${y}H76`).join("");
  const side = "M10 22L24 30M10 30L24 38M10 44L24 46M10 58L24 56M10 72L24 68M90 22L76 30M90 30L76 38M90 44L76 46M90 58L76 56M90 72L76 68M24 30L10 22M76 30L90 22M34 30L28 25M46 30L46 24M58 30L64 25M70 30L76 24";
  return `<g transform="translate(0 -5)"><g ${B}><rect x="2" y="80" width="96" height="12" rx="6" fill="${lin([C.green, C.greenM, C.greenD])}"/></g>
<polygon points="10,22 90,22 76,30 24,30" fill="${C.sky}" fill-opacity=".7"/>
<polygon points="10,22 24,30 24,68 10,78" fill="${C.skyD}" fill-opacity=".55"/><polygon points="90,22 76,30 76,68 90,78" fill="${C.skyD}" fill-opacity=".55"/>
<rect x="24" y="30" width="52" height="38" fill="${C.sky}" fill-opacity=".5"/>
<path d="${v}${h}${side}" stroke="${C.metalD}" stroke-width="1" opacity=".7" fill="none"/>
<g ${Bs}><path d="M24 68V30H76V68" fill="none" stroke="${C.metal}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></g>
<g ${B}><path d="M10 82V22H90V82" fill="none" stroke="${lin([C.paper, C.paperD], "d")}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></g>
<path d="M10 82V22H90" fill="none" stroke="${C.metalD}" stroke-width="1" opacity=".5" transform="translate(2.4 1)"/>
<g ${Bs}><circle cx="66" cy="76" r="9" fill="${lin(["#FFFBF0", C.paper, C.paperD], "d")}"/></g><polygon points="${star(66, 76, 4.2, 2.6)}" fill="${C.navyD}"/></g>`;
};

// ---------- curling stone
const curling = ({ lin, rad }) => `<g ${B}><path d="M6 70C6 54 22 44 50 44C78 44 94 54 94 70C94 84 76 92 50 92C24 92 6 84 6 70Z" fill="${lin([C.metalDD, C.metalD, C.metal, C.metalD, C.metalDD], "h")}"/></g>
<path d="M7 68C10 76 28 80 50 80C72 80 90 76 93 68V74C93 86 76 92 50 92C24 92 7 86 7 74Z" fill="${C.darkD}" opacity=".3"/>
<g ${Bs}><path d="M9 62C14 54 30 52 50 52C70 52 86 54 91 62C84 70 68 72 50 72C32 72 16 70 9 62Z" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<g fill="${C.metalDD}" opacity=".55"><circle cx="20" cy="82" r="1.1"/><circle cx="34" cy="86" r="1.1"/><circle cx="52" cy="87" r="1.2"/><circle cx="70" cy="85" r="1.1"/><circle cx="82" cy="80" r="1.1"/><circle cx="14" cy="74" r="1"/><circle cx="88" cy="74" r="1"/></g>
<g ${Bs}><rect x="38" y="36" width="24" height="14" rx="4" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${B}><path d="M26 40V28C26 16 34 12 46 12H56C68 12 76 16 76 28V34" fill="none" stroke="${lin([C.red, C.redM, C.redD], "d")}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>
<g ${Bs}><path d="M28 40H44V46H28Z" fill="${lin([C.redM, C.redD])}"/><circle cx="76" cy="38" r="5" fill="${lin([C.red, C.redD])}"/></g>
<path d="M33 24C35 18 42 16 50 16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".4"/>`;

// ---------- skis with poles and boots
const skis = ({ lin }) => {
  const ski = (x, w) => `M${x} 94H${x + w}V26Q${x + w} 12 ${x + w / 2} 4Q${x} 12 ${x} 26Z`;
  const pole = (dir) => {
    const g = dir < 0 ? 0 : 100;
    const gx = dir < 0 ? 21 : 79, bx = dir < 0 ? 12 : 88;
    return `<path d="M${gx} 14L${bx} 90" stroke="${C.metalDD}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
  };
  const basket = (x, y) => `<g ${Bs}><ellipse cx="${x}" cy="${y}" rx="6" ry="2.6" fill="${lin([C.woodL, C.woodD])}"/></g>`;
  const grip = (x1, y1, x2, y2) => `<g ${Bs}><path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.red}" stroke-width="5.5" stroke-linecap="round"/></g>`;
  const boot = (x) => `<g ${Bs}><path d="M${x} 66V48C${x} 44 ${x + 2} 42 ${x + 6} 42H${x + 12}C${x + 15} 42 ${x + 16} 44 ${x + 16} 48V66C${x + 16} 69 ${x + 14} 71 ${x + 11} 71H${x + 5}C${x + 2} 71 ${x} 69 ${x} 66Z" fill="${lin([C.dark, C.darkD])}"/></g><rect x="${x + 2.5}" y="50" width="11" height="2.4" rx="1.2" fill="${C.paper}" opacity=".7"/><rect x="${x + 2.5}" y="56" width="11" height="2.4" rx="1.2" fill="${C.paper}" opacity=".7"/>`;
  return `${pole(-1)}${pole(1)}${basket(13, 80)}${basket(87, 80)}${grip(23, 24, 20.4, 6)}${grip(77, 24, 79.6, 6)}
<g ${B}><path d="${ski(30, 15)}" fill="${lin([C.blueM, C.blue, C.blueD], "h")}"/><path d="${ski(55, 15)}" fill="${lin([C.redM, C.red, C.redD], "h")}"/></g>
<g fill="${C.paper}" opacity=".85"><rect x="33" y="78" width="9" height="2.2"/><rect x="33" y="84" width="9" height="2.2"/><rect x="58" y="78" width="9" height="2.2"/><rect x="58" y="84" width="9" height="2.2"/></g>
${boot(29.5)}${boot(54.5)}`;
};

// ---------- party popper
const popper = ({ lin, clip }) => {
  const cone = "M50 98L26 40A24 7 0 0 1 74 40Z";
  return `<g transform="translate(-6 6)">
<g ${B}><g transform="rotate(42 50 50)"><path d="${cone}" fill="${lin([C.gold, C.orange, C.orangeD], "d")}"/></g></g>
<g transform="rotate(42 50 50)"><g ${clip(`<path d="${cone}"/>`)}><path d="M20 56Q50 66 80 56M20 70Q50 80 80 70M20 84Q50 94 80 84" fill="none" stroke="${C.redM}" stroke-width="5"/><path d="M20 48Q50 58 80 48" fill="none" stroke="${C.blueM}" stroke-width="3.4"/></g>
<ellipse cx="50" cy="40" rx="24" ry="7" fill="${C.orangeD}"/><ellipse cx="50" cy="40.6" rx="19" ry="4.6" fill="${C.woodDD}" opacity=".7"/><path d="M26 40A24 7 0 0 1 74 40" fill="none" stroke="${C.yellow}" stroke-width="2" stroke-linecap="round"/></g>
<g fill="none" stroke-width="3.2" stroke-linecap="round"><path d="M60 32C54 18 70 14 64 2" stroke="${C.redM}"/><path d="M68 36C80 32 76 20 90 20" stroke="${C.blueM}"/><path d="M72 46C84 48 86 38 96 42" stroke="${C.greenM}"/><path d="M52 28C46 18 56 12 50 4" stroke="${C.purple}"/></g>
<g ${Bs}><circle cx="82" cy="8" r="3.4" fill="${C.purple}"/><rect x="76" y="28" width="6" height="6" transform="rotate(25 79 31)" fill="${lin([C.red, C.redD])}"/><circle cx="42" cy="10" r="3" fill="${lin([C.blue, C.blueD])}"/><polygon points="${star(92, 56, 6, 2.6)}" fill="${lin([C.goldM, C.goldD])}"/><rect x="64" y="14" width="5" height="5" transform="rotate(20 66 16)" fill="${lin([C.green, C.greenD])}"/><circle cx="88" cy="32" r="2.6" fill="${C.pink}"/></g></g>`;
};

// ---------- carp streamers on a pole
const carps = ({ lin, clip }) => {
  const carp = (y, c, belly, fin) => {
    const body = `M28 ${y + 6}C48 ${y + 1} 70 ${y + 8} 82 ${y + 14}L82 ${y + 24}C70 ${y + 30} 48 ${y + 37} 28 ${y + 32}Z`;
    const sc = [42, 52, 62, 72].map((x, i) => `<path d="M${x} ${y + 10 + (i % 2) * 5}q4 6 0 12M${x + 5} ${y + 8 + (i % 2) * 3}q4 6 0 12" />`).join("");
    return `<path d="M14 ${y + 19}H24" stroke="${C.dark}" stroke-width="1.4"/>
<g ${Bs}><path d="M52 ${y + 4}Q60 ${y - 6} 68 ${y + 10}Z" fill="${lin(fin)}"/></g>
<g ${Bs}><path d="M80 ${y + 19}L96 ${y + 6}L91 ${y + 19}L96 ${y + 32}Z" fill="${lin(fin)}"/></g>
<g ${B}><path d="${body}" fill="${lin(c)}"/></g>
<g ${clip(`<path d="${body}"/>`)}><path d="M20 ${y + 30}C40 ${y + 40} 64 ${y + 34} 86 ${y + 22}V${y + 40}H20Z" fill="${belly}" opacity=".85"/><g fill="none" stroke="#fff" stroke-width="1.2" opacity=".5" stroke-linecap="round">${sc}</g></g>
<path d="M44 ${y + 8}Q40 ${y + 19} 44 ${y + 30}" fill="none" stroke="${C.darkD}" stroke-width="1.4" opacity=".4" stroke-linecap="round"/>
<g ${Bs}><ellipse cx="26" cy="${y + 19}" rx="5" ry="14" fill="${lin([C.metalL, C.metalD], "h")}"/></g><ellipse cx="26.8" cy="${y + 19}" rx="2.6" ry="10" fill="${C.darkD}"/>
<ellipse cx="36" cy="${y + 14}" rx="3.6" ry="3.8" fill="${C.paper}"/><ellipse cx="35.4" cy="${y + 14.2}" rx="2.2" ry="2.8" fill="${C.darkD}"/><circle cx="34.6" cy="${y + 13}" r=".9" fill="#fff"/>`;
  };
  return `<g ${B}><rect x="6" y="9" width="5" height="88" rx="2.2" fill="${lin([C.woodD, C.wood, C.woodD], "h")}"/></g>
<g ${B}><circle cx="8.5" cy="7" r="5" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/></g>
${carp(10, [C.blue, C.blueM, C.blueD], C.paper, [C.blueM, C.blueD])}${carp(54, [C.red, C.redM, C.redD], C.pink, [C.redM, C.redD])}`;
};

// ---------- wind chime
const chime = ({ lin, rad }) => `<path d="M50 9V20" stroke="${C.dark}" stroke-width="1.6"/><circle cx="50" cy="7" r="3.6" fill="none" stroke="${C.metalDD}" stroke-width="2"/>
<g ${Bs}><rect x="40" y="17" width="20" height="7" rx="3" fill="${lin([C.metalL, C.metal, C.metalD])}"/></g>
<g ${B}><path d="M8 66C20 58 22 44 28 34C34 25 41 22 50 22C59 22 66 25 72 34C78 44 80 58 92 66Q85 72 78 66Q71 72 64.5 66Q57 72 50 66Q43 72 35.5 66Q29 72 22 66Q15 72 8 66Z" fill="${rad(["#EAF6FC", C.sky, C.skyD], 0.36, 0.3, 0.95)}"/></g>
<path d="M8 66C20 58 22 44 28 34C34 25 41 22 50 22C59 22 66 25 72 34C78 44 80 58 92 66" fill="none" stroke="${C.blueM}" stroke-width="2.2"/>
<path d="M13 63Q18 68 22 64Q29 69 35.5 63Q43 69 50 63Q57 69 64.5 63Q71 69 78 64Q82 68 87 63" fill="none" stroke="${C.blueM}" stroke-width="3.2" stroke-linecap="round" opacity=".7"/>
<g fill="${C.redM}" opacity=".85"><circle cx="40" cy="52" r="3.6"/><circle cx="60" cy="52" r="3.6"/><circle cx="50" cy="42" r="3.6"/></g><g fill="${C.paper}" opacity=".8"><circle cx="40" cy="52" r="1.3"/><circle cx="60" cy="52" r="1.3"/><circle cx="50" cy="42" r="1.3"/></g>
<ellipse cx="33" cy="40" rx="3.4" ry="9" transform="rotate(24 33 40)" fill="#fff" opacity=".7"/>
<path d="M50 24V64" stroke="${C.blueD}" stroke-width="1.2" opacity=".6"/><circle cx="50" cy="64" r="3.4" fill="${lin([C.gold, C.goldD])}"/>
<path d="M50 65V72" stroke="${C.dark}" stroke-width="1.4"/>
<g transform="rotate(5 50 72)"><g ${B}><path d="M40 72H60V94L50 88L40 94Z" fill="${lin([C.pink, C.pinkD])}"/></g><path d="M50 77V84" stroke="${C.redD}" stroke-width="2.2" stroke-linecap="round" opacity=".7"/><path d="M44 78V84M56 78V84" stroke="${C.paper}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>`;

// ---------- knot (overhand knot with two tails)
const knot = ({ lin }) => {
  const f = (a) => [Math.sin(a) + 2 * Math.sin(2 * a), Math.cos(a) - 2 * Math.cos(2 * a)];
  const N = 600;
  const raw = Array.from({ length: N + 1 }, (_, i) => f((i / N) * 2 * Math.PI));
  // cut at the lobe farthest from centre
  let c0 = 0, best = 0;
  raw.forEach((q, i) => { const r = Math.hypot(q[0], q[1]); if (r > best) { best = r; c0 = i; } });
  const gap = 60;
  const seq: any[] = [];
  for (let i = c0 + gap; i <= c0 + N - gap; i++) seq.push(raw[i % N]);
  const k = 13.5;
  const pts = seq.map((q) => [50 + q[0] * k, 50 + q[1] * k]);
  const dirAt = (a, b) => { const d = [a[0] - b[0], a[1] - b[1]]; const m = Math.hypot(...d); return [d[0] / m, d[1] / m]; };
  const e0 = pts[0], e1 = pts[pts.length - 1];
  const d0 = dirAt(e0, pts[8]), d1 = dirAt(e1, pts[pts.length - 9]);
  const tail = (e, d, side) => {
    const out: any[] = [];
    let [x, y] = e;
    for (let s = 0.5; s <= 20; s += 0.5) {
      const ang = Math.atan2(d[1], d[0]) + side * (s / 20) * 0.8;
      x += Math.cos(ang) * 0.5; y += Math.sin(ang) * 0.5;
      out.push([x, y]);
    }
    return out;
  };
  const A = tail(e0, d0, 1).reverse();
  const Bt = tail(e1, d1, -1);
  const all = [...A, ...pts, ...Bt];
  const xs = all.map((q) => q[0]), ys = all.map((q) => q[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const sc = 1;
  const pp = all.map((q) => [q[0] - cx + 50, q[1] - cy + 50]);
  // crossings
  const ev: number[] = [];
  for (let i = 0; i < pp.length - 1; i++) for (let j = i + 3; j < pp.length - 1; j++) {
    const [a, b, c, d] = [pp[i], pp[i + 1], pp[j], pp[j + 1]];
    const den = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
    if (Math.abs(den) < 1e-9) continue;
    const u = ((c[0] - a[0]) * (d[1] - c[1]) - (c[1] - a[1]) * (d[0] - c[0])) / den;
    const v = ((c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0])) / den;
    if (u >= 0 && u < 1 && v >= 0 && v < 1) ev.push(i + u, j + v);
  }
  ev.sort((p, q) => p - q);
  const L = (a, b) => {
    const s: any[] = [];
    const i0 = Math.max(0, Math.floor(a)), i1 = Math.min(pp.length - 1, Math.ceil(b));
    for (let i = i0; i < i1; i += 7) s.push(pp[i]);
    s.push(pp[i1]);
    return s.length > 1 ? `M${s.map((q) => `${f1(q[0])} ${f1(q[1])}`).join("L")}` : "";
  };
  const d = L(0, pp.length);
  const over = ev.filter((_, i) => i % 2 === 0).map((p) => L(p - 14, p + 14));
  const rope = (path, w) => `<path d="${path}" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${path}" fill="none" stroke="${C.woodDD}" stroke-width="${w}" stroke-dasharray="1 3.4" opacity=".28"/>`;
  void sc;
  return `<g ${B}>${rope(d, 9.5)}</g>${over.map((p) => `<g ${B}>${rope(p, 9.5)}</g>`).join("")}`;
};

// ---------- pinata donkey
const pinata = ({ lin, clip }) => {
  const col = [C.pink, C.yellowM, C.blue, C.green, C.red];
  const body = "M30 38C30 30 40 28 58 28H76C86 28 90 34 90 44V56C90 64 84 68 76 68H44C34 68 30 62 30 54Z";
  const bands = col.map((c, i) => `<rect x="26" y="${26 + i * 8.5}" width="70" height="9.2" fill="${c}"/>`).join("");
  const leg = (x, c) => `<g ${B}><rect x="${x}" y="62" width="10" height="28" rx="4" fill="${lin(c)}"/></g><path d="M${x + 1} 88h8M${x + 1} 84h8M${x + 1} 80h8" stroke="#fff" stroke-width="1" opacity=".35"/>`;
  return `<g transform="translate(4.5 8) scale(.92)"><path d="M60 7V28" stroke="${C.woodD}" stroke-width="2"/><circle cx="60" cy="5" r="2.6" fill="none" stroke="${C.metalDD}" stroke-width="1.6"/>
${leg(33, [C.yellow, C.yellowD])}${leg(46, [C.blue, C.blueD])}${leg(66, [C.green, C.greenD])}${leg(79, [C.red, C.redD])}
<g ${B}><path d="M86 38C96 36 98 54 92 66C88 62 88 58 88 52Z" fill="${lin([C.pink, C.pinkD])}"/><path d="M88 52C94 58 96 70 90 80" fill="none" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/></g>
<g ${B}><path d="${body}" fill="${C.pink}"/></g>
<g ${clip(`<path d="${body}"/>`)}>${bands}<path d="M30 38H92M30 47H92M30 55H92M30 64H92" stroke="#fff" stroke-width="1.6" stroke-dasharray="1.6 2.6" opacity=".45"/><path d="M30 28h62V68H30Z" fill="none"/></g>
<g ${B}><ellipse cx="22" cy="14" rx="3.8" ry="12" transform="rotate(-8 22 14)" fill="${lin([C.pink, C.pinkD])}"/><ellipse cx="33" cy="13" rx="3.8" ry="12" transform="rotate(16 33 13)" fill="${lin([C.blue, C.blueD])}"/></g>
<g ${B}><path d="M20 26C32 22 44 32 42 48C41 58 34 62 26 60L12 58C5 56 3 48 6 44C10 40 12 32 20 26Z" fill="${lin([C.pink, C.pinkD], "d")}"/></g>
<g ${Bs}><path d="M30 24C36 22 44 30 44 38L38 34Z" fill="${C.yellowM}"/><path d="M22 28C28 26 34 28 38 34L30 34Z" fill="${C.red}"/></g>
<g ${Bs}><ellipse cx="11" cy="51" rx="9" ry="6.5" fill="${lin([C.paper, C.paperD])}"/></g>
<ellipse cx="6.5" cy="49" rx="3" ry="2.4" fill="${C.darkD}" opacity=".85"/><ellipse cx="26" cy="38" rx="2.5" ry="3.2" fill="${C.darkD}"/><circle cx="25.3" cy="37" r=".9" fill="#fff"/>
<path d="M12 53Q17 56 22 52" fill="none" stroke="${C.darkD}" stroke-width="1.3" stroke-linecap="round"/></g>`;
};

const __batch: Icon[] = [
  { u: "1f389", n: "party popper", draw: popper },
  { u: "1f38f", n: "carp streamer", draw: carps },
  { u: "1f390", n: "wind chime", draw: chime },
  { u: "1f3bf", n: "skis", draw: skis },
  { u: "1f94c", n: "curling stone", draw: curling },
  { u: "1f945", n: "goal net", draw: goal },
  { u: "26bd", n: "soccer ball", draw: soccer },
  { u: "1f3d0", n: "volleyball", draw: volley },
  { u: "1faa2", n: "knot", draw: knot },
  { u: "1fa85", n: "piñata", draw: pinata },
];

export default __batch;
