// animals_nature-3: birds, reptiles, mythical, paws, feather, wing.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const I: Icon[] = [];
const a = (u, n, draw) => I.push({ u, n, draw });
const __batch: Icon[] = I;

// union of shapes painted with one gradient (clip), bevelled as one body
const U = (t, shapes, stops, dir = "d", bb = [4, 4, 92, 92], f = B) =>
  `<g ${f}><g ${t.clip(shapes)}><rect x="${bb[0]}" y="${bb[1]}" width="${bb[2]}" height="${bb[3]}" fill="${t.lin(stops, dir)}"/></g></g>`;
const eye = (x, y, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${+(3.4 * s).toFixed(2)}" ry="${+(4.2 * s).toFixed(2)}" fill="${C.darkD}"/><circle cx="${+(x - 1.1 * s).toFixed(2)}" cy="${+(y - 1.6 * s).toFixed(2)}" r="${+(1.15 * s).toFixed(2)}" fill="#fff"/>`;
const cheek = (x, y, r = 5) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${+(r * 0.7).toFixed(1)}" fill="${C.pinkD}" opacity=".4"/>`;
const legs = (xs, y0, y1, c = C.goldD) =>
  `<path d="${xs.map((x) => `M${x} ${y0} V${y1} M${x - 4.5} ${y1 + 1} H${x + 4.5}`).join(" ")}" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round"/>`;

// side-view small bird facing left
const bird = (t, o) => {
  const { lin } = t;
  return `<g ${Bs}><path d="${o.tailD ?? "M74 52 L97 62 L80 74Z"}" fill="${lin(o.tail)}"/></g>
${o.back ?? ""}${legs([48, 61], 82, 91, o.leg ?? C.goldD)}
${U(t, '<ellipse cx="55" cy="58" rx="33" ry="27"/><circle cx="33" cy="36" r="21"/>', o.body, "d", [10, 14, 80, 72])}
<g ${Bs}><ellipse cx="44" cy="68" rx="20" ry="12" fill="${lin(o.belly)}"/></g>
${o.wing ?? `<g ${Bs}><path d="M44 54 C 56 46 78 52 84 66 C 70 78 50 74 44 54Z" fill="${lin(o.wingC)}"/></g>`}
<g ${Bs}><path d="M15 31 L4 38 L15 45Z" fill="${lin(o.beak)}"/></g>${eye(28, 33, 0.85)}`;
};

// hen / rooster base
const hen = (t, o) => {
  const { lin } = t;
  return `${o.tail}${legs([49, 62], 82, 92)}
${U(t, '<ellipse cx="55" cy="62" rx="31" ry="25"/><circle cx="31" cy="38" r="18"/>', o.body, "d", [12, 18, 76, 70])}
<g ${Bs}><ellipse cx="56" cy="62" rx="19" ry="12" transform="rotate(-8 56 62)" fill="${lin(o.wing)}"/></g>
<g ${Bs} fill="${lin([C.red, C.redD])}">${o.comb}</g>
<g ${Bs}><ellipse cx="18" cy="52" rx="4.2" ry="6.5" fill="${lin([C.red, C.redD])}"/><path d="M15 36 L4 41 L15 46Z" fill="${lin([C.gold, C.goldD])}"/></g>
${eye(25, 34, 0.75)}${cheek(30, 46, 4)}`;
};

a("1f9a1", "badger", (t) => {
  const { lin } = t;
  const hd = '<ellipse cx="50" cy="58" rx="40" ry="33"/>';
  return `<g ${B}><circle cx="21" cy="29" r="12" fill="${lin([C.dark, C.darkD])}"/><circle cx="79" cy="29" r="12" fill="${lin([C.dark, C.darkD])}"/></g>
<circle cx="21" cy="30" r="5" fill="${C.paper}"/><circle cx="79" cy="30" r="5" fill="${C.paper}"/>
${U(t, hd, [C.metalL, C.metal, C.metalD], "d", [10, 25, 80, 66])}
<g ${t.clip(hd)}><path d="M12 22 L26 22 C34 42 34 60 40 94 L12 94Z M88 22 L74 22 C66 42 66 60 60 94 L88 94Z" fill="${C.dark}" opacity=".92"/>
<path d="M30 22 L70 22 C64 42 66 60 60 94 L40 94 C34 60 36 42 30 22Z" fill="${C.paper}" opacity=".9"/></g>
<ellipse cx="50" cy="72" rx="6.5" ry="4.8" fill="${C.darkD}"/><path d="M50 77 V80 M43 82 Q50 86 57 82" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>
${eye(41, 54, 0.95)}${eye(59, 54, 0.95)}`;
});

const paw = (t, x, y, r) => {
  const g = t.lin([C.wood, C.woodD], "d");
  return `<g ${Bs}><g transform="translate(${x} ${y}) rotate(${r}) scale(1.2)"><path d="M0 2 C-9 2 -16 11 -12 18 C-10 24 -3 22 0 22 C3 22 10 24 12 18 C16 11 9 2 0 2Z" fill="${g}"/>
<ellipse cx="-16" cy="-5" rx="5" ry="6.5" transform="rotate(-22 -16 -5)" fill="${g}"/><ellipse cx="-6" cy="-15" rx="5" ry="7" fill="${g}"/><ellipse cx="6" cy="-15" rx="5" ry="7" fill="${g}"/><ellipse cx="16" cy="-5" rx="5" ry="6.5" transform="rotate(22 16 -5)" fill="${g}"/></g></g>`;
};
a("1f43e", "paw prints", (t) => `${paw(t, 30, 66, 28)}${paw(t, 68, 32, 28)}`);

a("1f983", "turkey", (t) => {
  const { lin } = t;
  const cols = [[C.red, C.redD], [C.orange, C.orangeD], [C.gold, C.goldD], [C.wood, C.woodD], [C.orange, C.orangeD]];
  const fan = [-34, -14, 6, 26, 46]
    .map((r, i) => `<g ${Bs}><ellipse cx="54" cy="34" rx="8.5" ry="23" transform="rotate(${r} 54 62)" fill="${lin(cols[i])}"/></g>`)
    .join("");
  return `${fan}${legs([40, 54], 82, 92)}
${U(t, '<ellipse cx="46" cy="64" rx="27" ry="21"/><ellipse cx="30" cy="50" rx="10" ry="15"/><circle cx="22" cy="40" r="11"/>', [C.woodL, C.wood, C.woodD], "d", [10, 28, 66, 58])}
<g ${Bs}><ellipse cx="48" cy="66" rx="16" ry="11" transform="rotate(8 48 66)" fill="${lin([C.wood, C.woodDD])}"/><ellipse cx="17" cy="53" rx="4.2" ry="7" fill="${lin([C.red, C.redD])}"/><path d="M13 39 L4 43 L13 47Z" fill="${lin([C.gold, C.goldD])}"/></g>
<path d="M40 62 Q47 70 56 66 M42 68 Q49 75 57 72" fill="none" stroke="${C.cream}" stroke-width="1.4" opacity=".6"/>${eye(20, 38, 0.75)}`;
});

a("1f414", "chicken", (t) => {
  const { lin } = t;
  return hen(t, {
    tail: `<g ${Bs}><path d="M76 56 C 78 38 88 30 96 26 C 98 42 94 58 88 70Z" fill="${lin([C.creamD, C.paperD])}"/></g>`,
    body: [C.paper, C.cream, C.creamD],
    wing: [C.cream, C.paperD],
    comb: '<circle cx="25" cy="21" r="5.5"/><circle cx="32" cy="18" r="6"/><circle cx="39" cy="21" r="5"/>',
  });
});

a("1f413", "rooster", (t) => {
  const { lin } = t;
  const f = (d, c) => `<path d="${d}" fill="${lin(c)}"/>`;
  return hen(t, {
    tail: `<g ${Bs}>${f("M74 56 C 70 34 78 18 92 8 C 98 26 94 46 84 66Z", [C.green, C.greenD])}${f("M76 60 C 76 44 86 34 97 32 C 96 50 90 62 82 72Z", [C.blueM, C.navyD])}${f("M74 50 C 72 30 80 24 84 20 C 86 34 84 44 80 56Z", [C.red, C.redD])}</g>`,
    body: [C.orange, C.orangeD, "#B4602A"],
    wing: [C.red, C.redD],
    comb: '<circle cx="23" cy="20" r="6"/><circle cx="31" cy="15" r="7"/><circle cx="39" cy="19" r="6"/><circle cx="43" cy="26" r="4.5"/>',
  });
});

a("1f423", "hatching chick", (t) => {
  const { lin, rad } = t;
  return `<g ${B}><circle cx="50" cy="42" r="27" fill="${rad(["#FFF0A0", C.yellow, C.yellowM])}"/></g>
<path d="M50 16 C 44 10 40 11 38 14 M50 16 C 53 8 58 8 60 12" fill="none" stroke="${C.yellowD}" stroke-width="2.4" stroke-linecap="round"/>
${eye(39, 40, 0.95)}${eye(61, 40, 0.95)}${cheek(31, 50)}${cheek(69, 50)}
<g ${Bs}><path d="M45 47 H55 L50 54Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><path d="M9 56 L24 46 L34 58 L44 46 L50 60 L58 46 L68 58 L78 46 L91 56 C 96 78 76 95 50 95 C 24 95 4 78 9 56Z" fill="${lin([C.paper, C.cream, C.creamD], "d")}"/></g>
<path d="M22 72 Q28 84 40 86" fill="none" stroke="${C.creamD}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
});

a("1f424", "baby chick", (t) => {
  const { lin } = t;
  return `${legs([46, 60], 84, 92, C.orangeD)}
${U(t, '<ellipse cx="54" cy="60" rx="34" ry="27"/><circle cx="36" cy="36" r="24"/>', ["#FFF0A0", C.yellow, C.yellowM, C.yellowD], "d", [10, 12, 78, 76])}
<path d="M36 14 C 32 7 27 8 26 11 M36 14 C 40 6 45 7 46 10" fill="none" stroke="${C.yellowD}" stroke-width="2.4" stroke-linecap="round"/>
<g ${Bs}><ellipse cx="60" cy="62" rx="16" ry="11" transform="rotate(14 60 62)" fill="${lin([C.yellowM, C.yellowD])}"/><path d="M15 33 L5 39 L15 45Z" fill="${lin([C.orange, C.orangeD])}"/></g>
${eye(30, 33, 0.9)}${cheek(30, 46, 4.5)}`;
});

a("1f425", "front facing baby chick", (t) => {
  const { lin, rad } = t;
  return `${legs([40, 60], 86, 93, C.orangeD)}
<g ${Bs}><ellipse cx="13" cy="58" rx="8" ry="14" transform="rotate(16 13 58)" fill="${lin([C.yellowM, C.yellowD])}"/><ellipse cx="87" cy="58" rx="8" ry="14" transform="rotate(-16 87 58)" fill="${lin([C.yellowM, C.yellowD])}"/></g>
<g ${B}><circle cx="50" cy="50" r="36" fill="${rad(["#FFF0A0", C.yellow, C.yellowM])}"/></g>
<path d="M50 14 C 45 6 40 7 39 10 M50 14 C 53 5 58 6 59 9" fill="none" stroke="${C.yellowD}" stroke-width="2.4" stroke-linecap="round"/>
${eye(36, 46, 1)}${eye(64, 46, 1)}${cheek(27, 58)}${cheek(73, 58)}
<g ${Bs}><path d="M43 54 H57 L50 63Z" fill="${lin([C.orange, C.orangeD])}"/></g>`;
});

a("1f426", "bird", (t) =>
  bird(t, {
    tail: [C.blueM, C.navy],
    body: ["#B4CDF2", C.blueM, C.blueD],
    belly: [C.paper, C.creamD],
    wingC: [C.blueM, C.navyD],
    beak: [C.gold, C.goldD],
  }),
);

a("1f427", "penguin", (t) => {
  const { lin } = t;
  const fl = lin(["#7385C2", C.navyD]);
  return `<g ${Bs}><ellipse cx="38" cy="90" rx="10" ry="5" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="62" cy="90" rx="10" ry="5" fill="${lin([C.orange, C.orangeD])}"/>
<ellipse cx="17" cy="56" rx="7.5" ry="18" transform="rotate(14 17 56)" fill="${fl}"/><ellipse cx="83" cy="56" rx="7.5" ry="18" transform="rotate(-14 83 56)" fill="${fl}"/></g>
${U(t, '<ellipse cx="50" cy="50" rx="30" ry="40"/>', ["#8A9AD0", C.navy, C.navyD], "d", [20, 10, 60, 80])}
<g ${Bs}><ellipse cx="50" cy="63" rx="19" ry="26" fill="${lin([C.paper, C.creamD])}"/></g>
<g ${Bs}><circle cx="40" cy="33" r="8" fill="${C.paper}"/><circle cx="60" cy="33" r="8" fill="${C.paper}"/></g>
${eye(41, 34, 0.75)}${eye(59, 34, 0.75)}${cheek(32, 46, 4)}${cheek(68, 46, 4)}
<g ${Bs}><path d="M44 41 H56 L50 49Z" fill="${lin([C.orange, C.orangeD])}"/></g>`;
});

a("1f54a-fe0f", "dove", (t) => {
  const { lin } = t;
  const w = lin([C.paper, C.cream, C.creamD], "u");
  return `<g ${Bs}><path d="M50 56 C 50 34 64 20 86 14 C 82 30 80 44 72 58Z" fill="${lin([C.creamD, C.paperD])}"/></g>
<g ${Bs}><path d="M72 58 C 84 62 92 68 97 78 C 86 80 76 76 68 70Z" fill="${lin([C.cream, C.creamD])}"/></g>
${U(t, '<ellipse cx="52" cy="64" rx="29" ry="16" transform="rotate(-10 52 64)"/><circle cx="27" cy="51" r="11"/>', [C.paper, C.cream, C.creamD], "d", [16, 40, 66, 40])}
<g ${B}><path d="M46 62 C 28 40 40 18 90 6 C 82 22 80 40 70 62Z" fill="${w}"/></g>
<path d="M50 54 C 56 40 68 28 80 18 M56 58 C 62 46 72 36 82 28 M62 60 C 68 50 76 44 82 38" fill="none" stroke="${C.creamD}" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
<g ${Bs}><path d="M17 49 L8 52 L17 55Z" fill="${lin([C.orange, C.orangeD])}"/></g>${eye(24, 48, 0.7)}
<g ${Bs}><path d="M8 52 C 10 60 18 62 24 60 C 18 58 14 56 12 53Z" fill="${lin([C.green, C.greenD])}"/></g>`;
});

a("1f985", "eagle", (t) => {
  const { lin } = t;
  return `<g ${Bs}><path d="M44 84 L74 84 L78 95 L42 95Z" fill="${lin([C.paper, C.creamD])}"/></g>
${U(t, '<path d="M30 34 C 12 54 20 82 40 90 L70 90 C 88 70 80 42 58 32 C 52 28 36 28 30 34Z"/>', [C.wood, C.woodD, C.woodDD], "d", [14, 28, 72, 62])}
<g ${Bs}><path d="M42 42 C 68 42 84 60 74 86 C 56 80 42 68 42 42Z" fill="${lin([C.woodD, C.woodDD])}"/></g>
<path d="M50 52 C 60 56 68 66 68 78 M46 60 C 54 66 60 74 62 82" fill="none" stroke="${C.wood}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<g ${B}><circle cx="38" cy="24" r="16" fill="${lin([C.paper, C.cream, C.creamD], "d")}"/></g>
<g ${Bs}><path d="M26 18 C 12 16 8 30 14 42 C 16 34 22 32 28 32Z" fill="${lin([C.gold, C.goldM, C.goldD])}"/></g>
${eye(32, 20, 0.8)}<path d="M26 14 L38 17" stroke="${C.cream}" stroke-width="0" />`;
});

a("1f986", "duck", (t) => {
  const { lin } = t;
  return `<g ${Bs}><path d="M42 82 V92 M36 93 H48 M58 82 V92 M52 93 H64" fill="none" stroke="${C.orangeD}" stroke-width="2.8" stroke-linecap="round"/></g>
${U(t, '<ellipse cx="54" cy="66" rx="34" ry="20"/><path d="M80 58 L96 44 L92 70Z"/>', [C.cream, C.creamD, "#B09A6E"], "d", [20, 44, 78, 44])}
<g ${Bs}><ellipse cx="58" cy="66" rx="20" ry="11" transform="rotate(8 58 66)" fill="${lin([C.wood, C.woodD])}"/></g>
${U(t, '<ellipse cx="35" cy="50" rx="10" ry="19"/><circle cx="29" cy="32" r="16"/>', ["#B7DCA6", C.greenM, C.greenD], "d", [13, 16, 34, 54])}
<path d="M24 54 Q35 62 46 52" fill="none" stroke="${C.paper}" stroke-width="3.4" stroke-linecap="round"/>
<g ${Bs}><path d="M17 33 C 8 30 4 35 4 40 C 8 43 15 43 18 40Z" fill="${lin([C.gold, C.orangeD])}"/></g>${eye(27, 29, 0.75)}`;
});

a("1f9a2", "swan", (t) => {
  const { lin } = t;
  const w = lin([C.paper, C.cream, C.creamD]);
  return `<path d="M12 90 Q50 98 88 90" fill="none" stroke="${C.blue}" stroke-width="3.4" stroke-linecap="round"/>
<g ${B}><path d="M40 68 C 18 64 18 44 32 36 C 44 29 40 18 30 20" fill="none" stroke="${w}" stroke-width="11" stroke-linecap="round"/><circle cx="27" cy="18" r="8.5" fill="${w}"/></g>
<g ${Bs}><path d="M21 15 L8 19 L21 23Z" fill="${lin([C.orange, C.orangeD])}"/></g>
${U(t, '<ellipse cx="56" cy="70" rx="32" ry="19"/><path d="M82 62 L96 50 L90 76Z"/>', [C.paper, C.cream, C.creamD], "d", [24, 50, 72, 40])}
<g ${Bs}><path d="M38 70 C 50 56 76 58 88 68 C 76 80 52 82 38 70Z" fill="${lin([C.cream, C.paperD])}"/></g>
<path d="M48 70 C 58 64 68 64 78 68" fill="none" stroke="${C.creamD}" stroke-width="1.5" stroke-linecap="round"/>${eye(26, 16, 0.6)}`;
});

a("1f989", "owl", (t) => {
  const { lin } = t;
  const w = lin([C.wood, C.woodD]);
  return `<g ${Bs}><path d="M40 86 V94 M34 95 H46 M60 86 V94 M54 95 H66" fill="none" stroke="${C.goldD}" stroke-width="3" stroke-linecap="round"/></g>
${U(t, '<ellipse cx="50" cy="54" rx="36" ry="37"/><path d="M18 30 L16 8 L40 20Z M82 30 L84 8 L60 20Z"/>', [C.woodL, C.wood, C.woodD], "d", [14, 8, 72, 84])}
<g ${Bs}><ellipse cx="17" cy="62" rx="8" ry="20" transform="rotate(8 17 62)" fill="${w}"/><ellipse cx="83" cy="62" rx="8" ry="20" transform="rotate(-8 83 62)" fill="${w}"/></g>
<g ${Bs}><ellipse cx="50" cy="72" rx="19" ry="17" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M42 64 q4 4 8 0 q4 4 8 0 M40 72 q5 5 10 0 q5 5 10 0 M43 80 q3.5 4 7 0 q3.5 4 7 0" fill="none" stroke="${C.wood}" stroke-width="1.8" stroke-linecap="round"/>
<g ${Bs}><circle cx="36" cy="40" r="15" fill="${lin([C.paper, C.creamD])}"/><circle cx="64" cy="40" r="15" fill="${lin([C.paper, C.creamD])}"/></g>
${eye(36, 41, 1.35)}${eye(64, 41, 1.35)}
<g ${Bs}><path d="M45 48 H55 L50 58Z" fill="${lin([C.gold, C.goldD])}"/></g>`;
});

a("1f9a4", "dodo", (t) => {
  const { lin } = t;
  return `<g ${Bs}><path d="M80 52 C 92 44 96 52 90 58 C 96 60 94 68 84 66Z" fill="${lin(["#A9B4CC", "#6F7CA0"])}"/></g>
<g ${Bs}><path d="M46 78 V91 M40 92 H52 M62 78 V91 M56 92 H68" fill="none" stroke="${C.goldD}" stroke-width="3.4" stroke-linecap="round"/></g>
${U(t, '<ellipse cx="56" cy="60" rx="33" ry="26"/><circle cx="30" cy="36" r="16"/><ellipse cx="38" cy="48" rx="10" ry="12"/>', ["#B9C4DC", "#8593B6", "#5F6B8F"], "d", [14, 20, 76, 66])}
<g ${Bs}><ellipse cx="56" cy="62" rx="19" ry="12" transform="rotate(10 56 62)" fill="${lin(["#8593B6", "#4B5578"])}"/></g>
<path d="M28 20 C 24 12 20 13 20 16 M32 20 C 34 11 39 11 39 15" fill="none" stroke="#5F6B8F" stroke-width="2.4" stroke-linecap="round"/>
<g ${B}><path d="M20 30 C 8 28 3 38 5 48 C 7 54 14 54 17 48 C 19 44 24 44 28 42 C 26 36 24 32 20 30Z" fill="${lin([C.yellow, C.yellowM, C.goldD], "d")}"/></g>
<path d="M12 42 Q16 44 18 40" fill="none" stroke="${C.goldD}" stroke-width="1.6" stroke-linecap="round"/>${eye(28, 33, 0.8)}`;
});

a("1fab6", "feather", (t) => {
  const { lin } = t;
  return `<g ${B}><g transform="rotate(-45 50 50)"><path d="M-8 51 L10 49.5 L10 52.5Z" fill="${C.cream}"/><path d="M6 50 C 14 22 58 10 106 42 C 96 48 90 52 93 56 C 91 60 88 62 91 65 C 60 86 20 80 6 50Z" fill="${lin([C.purple, "#C9B2EA", C.purpleD], "d")}"/></g></g>
<g transform="rotate(-45 50 50)" fill="none" stroke-linecap="round"><path d="M-6 51 L96 52" stroke="${C.creamD}" stroke-width="2.8"/>
<path d="M18 48 L34 28 M36 47 L54 26 M54 47 L72 28 M72 48 L88 36 M18 53 L32 70 M36 54 L52 74 M54 54 L70 72 M72 55 L86 66" stroke="${C.purpleD}" stroke-width="1.4" opacity=".55"/></g>`;
});

a("1f9a9", "flamingo", (t) => {
  const { lin } = t;
  return `<path d="M60 66 L58 95 M66 64 L74 78 L64 80" fill="none" stroke="${C.pinkD}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<g ${B}><path d="M40 50 C 20 48 18 32 30 24 C 38 18 34 10 26 12" fill="none" stroke="${lin([C.pink, C.pinkD], "d")}" stroke-width="8.5" stroke-linecap="round"/><circle cx="24" cy="12" r="7" fill="${lin([C.pink, C.pinkD], "d")}"/></g>
<g ${Bs}><path d="M19 9 C 8 9 6 16 8 22 C 12 19 17 18 20 18Z" fill="${lin([C.pink, C.pinkD])}"/><path d="M8 20 C 9 18 11 18 13 18 L8 22Z" fill="${C.darkD}"/></g>
${U(t, '<ellipse cx="58" cy="52" rx="26" ry="17"/><path d="M78 46 L96 52 L80 62Z"/>', ["#FBC9D4", C.pink, C.pinkD], "d", [30, 34, 66, 34])}
<g ${Bs}><ellipse cx="60" cy="52" rx="18" ry="10" transform="rotate(8 60 52)" fill="${lin([C.pinkD, "#D4627F"])}"/><path d="M72 54 C 82 54 88 58 92 62 C 84 64 76 62 72 58Z" fill="${C.dark}"/></g>${eye(22, 11, 0.6)}`;
});

a("1f99a", "peacock", (t) => {
  const { lin, rad } = t;
  const spots = [200, 220, 240, 260, 280, 300, 320, 340]
    .map((d) => {
      const x = (58 + 27 * Math.cos((d * Math.PI) / 180)).toFixed(1), y = (52 + 27 * Math.sin((d * Math.PI) / 180)).toFixed(1);
      return `<circle cx="${x}" cy="${y}" r="4.6" fill="${C.gold}"/><circle cx="${x}" cy="${y}" r="2.8" fill="${C.blueM}"/><circle cx="${x}" cy="${y}" r="1.1" fill="${C.navyD}"/>`;
    })
    .join("");
  return `<g ${B}><circle cx="58" cy="52" r="37" fill="${rad(["#B3E0D4", C.teal, C.tealM, C.tealD])}"/></g>${spots}
<g ${Bs} fill="none" stroke="${C.goldD}" stroke-width="1.4"><circle cx="58" cy="52" r="15" opacity=".5"/></g>
<path d="M40 86 V93 M34 94 H46" fill="none" stroke="${C.goldD}" stroke-width="2.8" stroke-linecap="round"/>
${U(t, '<ellipse cx="46" cy="70" rx="24" ry="17"/><ellipse cx="32" cy="50" rx="9" ry="20"/><circle cx="28" cy="29" r="10"/>', [C.blue, C.blueM, C.blueD], "d", [16, 18, 56, 70])}
<path d="M25 19 L21 9 M28 18 V7 M31 19 L35 9" fill="none" stroke="${C.blueD}" stroke-width="1.8" stroke-linecap="round"/><g ${Bs} fill="${C.gold}"><circle cx="21" cy="8" r="2.2"/><circle cx="28" cy="6" r="2.2"/><circle cx="35" cy="8" r="2.2"/></g>
<g ${Bs}><path d="M19 28 L10 31 L19 34Z" fill="${lin([C.gold, C.goldD])}"/><ellipse cx="50" cy="70" rx="14" ry="9" transform="rotate(10 50 70)" fill="${lin([C.teal, C.tealD])}"/></g>${eye(26, 27, 0.7)}`;
});

a("1f99c", "parrot", (t) => {
  const { lin } = t;
  return `<path d="M8 92 H94" stroke="${C.woodD}" stroke-width="6" stroke-linecap="round"/>
<g ${Bs}><path d="M50 78 L64 76 L78 96 L58 94Z" fill="${lin([C.teal, C.tealD])}"/></g>
<path d="M50 82 V90 M62 82 V90" stroke="${C.goldD}" stroke-width="2.8" stroke-linecap="round"/>
${U(t, '<ellipse cx="56" cy="58" rx="24" ry="30"/><circle cx="38" cy="28" r="18"/>', ["#F6A296", C.redM, C.redD], "d", [20, 10, 62, 80])}
<g ${Bs}><ellipse cx="62" cy="58" rx="13" ry="22" transform="rotate(8 62 58)" fill="${lin([C.green, C.greenM, C.greenD])}"/><ellipse cx="66" cy="68" rx="7" ry="13" transform="rotate(8 66 68)" fill="${lin([C.blue, C.navy])}"/></g>
<g ${Bs}><circle cx="36" cy="27" r="9" fill="${C.paper}"/></g>${eye(35, 27, 0.75)}
<g ${B}><path d="M26 18 C 10 16 6 30 14 42 C 16 36 22 34 28 34Z" fill="${lin([C.yellow, C.gold, C.goldD], "d")}"/></g>`;
});

a("1fabd", "wing", (t) => {
  const { lin } = t;
  const L = (rx, ry, d, g) => [5, 25, 45, 65, 85].map((r) => `<ellipse cx="20" cy="${82 - d}" rx="${rx}" ry="${ry}" transform="rotate(${r} 20 82)" fill="${g}"/>`).reverse().join("");
  return `<g ${Bs}>${L(9, 34, 34, lin([C.paper, C.creamD]))}</g>
<g ${Bs}>${L(9.5, 20, 20, lin([C.paper, C.cream, C.paperD]))}</g>
<g ${Bs}><circle cx="22" cy="78" r="12" fill="${lin([C.paper, C.paperD])}"/></g>`;
});

a("1f426-200d-2b1b", "black bird", (t) =>
  bird(t, {
    tail: ["#6F7BA0", "#434D70"],
    body: ["#8793B5", "#5F6B8F", "#434D70"],
    belly: ["#7681A5", "#5A6690"],
    wingC: ["#6F7BA0", "#3B4463"],
    beak: [C.metal, C.metalD],
    leg: C.metalD,
  }),
);

a("1fabf", "goose", (t) => {
  const { lin } = t;
  const w = lin([C.paper, C.cream, C.creamD]);
  return `<g ${Bs}><path d="M46 82 V92 M40 93 H54 M64 82 V92 M58 93 H72" fill="none" stroke="${C.orangeD}" stroke-width="3" stroke-linecap="round"/></g>
<g ${B}><path d="M36 60 C 18 52 26 36 26 24" fill="none" stroke="${w}" stroke-width="11" stroke-linecap="round"/><circle cx="25" cy="21" r="10" fill="${w}"/></g>
${U(t, '<ellipse cx="56" cy="64" rx="32" ry="21"/><path d="M82 56 L96 42 L92 70Z"/>', [C.paper, C.cream, C.creamD], "d", [24, 43, 72, 42])}
<g ${Bs}><path d="M40 64 C 52 50 78 54 88 64 C 76 78 52 78 40 64Z" fill="${lin([C.cream, C.paperD])}"/><path d="M18 18 C 9 18 4 22 4 26 C 8 30 14 30 19 27Z" fill="${lin([C.orange, C.orangeD])}"/></g>${eye(24, 18, 0.65)}`;
});

a("1f426-200d-1f525", "phoenix", (t) => {
  const { lin } = t;
  const fl = (d, c) => `<path d="${d}" fill="${lin(c)}"/>`;
  return bird(t, {
    tail: [C.red, C.redD],
    tailD: "M76 52 C 86 50 92 40 90 30 C 98 38 98 54 90 62 C 98 66 96 78 82 78 C 76 76 74 72 74 66Z",
    back: `<g ${Bs}>${fl("M70 60 C 80 70 78 86 70 94 C 62 86 62 72 70 60Z", [C.gold, C.orange])}${fl("M80 62 C 92 70 94 84 88 94 C 78 86 76 74 80 62Z", [C.red, C.orangeD])}</g>`,
    body: ["#FFD27A", C.orange, C.redM],
    belly: [C.yellow, C.gold],
    beak: [C.gold, C.goldD],
    wing: `<g ${Bs}>${fl("M44 52 C 46 30 62 14 84 10 C 82 24 88 28 94 30 C 84 34 80 40 78 52 C 70 62 52 62 44 52Z", [C.gold, C.orange, C.redM])}</g>`,
    leg: C.orangeD,
  }) + `<g ${Bs}>${fl("M26 18 C 22 8 28 6 30 2 C 36 8 34 14 34 18Z", [C.gold, C.red])}${fl("M36 18 C 36 10 42 8 44 4 C 48 10 44 16 42 20Z", [C.yellow, C.orange])}</g>`;
});

a("1f438", "frog", (t) => {
  const { lin } = t;
  return `${U(t, '<circle cx="28" cy="31" r="15"/><circle cx="72" cy="31" r="15"/><ellipse cx="50" cy="60" rx="41" ry="30"/>', ["#B7DCA6", C.greenM, C.greenD], "d", [8, 16, 84, 74])}
<g ${Bs}><circle cx="28" cy="30" r="10" fill="${C.paper}"/><circle cx="72" cy="30" r="10" fill="${C.paper}"/></g>${eye(29, 31, 1.15)}${eye(71, 31, 1.15)}
<circle cx="45" cy="52" r="1.8" fill="${C.greenD}"/><circle cx="55" cy="52" r="1.8" fill="${C.greenD}"/>
<path d="M22 62 C 38 80 62 80 78 62" fill="none" stroke="${C.darkD}" stroke-width="2.4" stroke-linecap="round"/>${cheek(21, 68, 5.5)}${cheek(79, 68, 5.5)}`;
});

a("1f40a", "crocodile", (t) => {
  const { lin } = t;
  const g = lin(["#A9D49C", C.greenM, C.greenD], "d");
  const sp = [44, 54, 64, 74, 84].map((x, i) => `<path d="M${x - 3} ${44 - i * 1.6} L${x} ${37 - i * 1.6} L${x + 3} ${44 - i * 1.6}Z"/>`).join("");
  return `<g ${Bs}><rect x="27" y="62" width="12" height="20" rx="5" fill="${lin([C.greenM, C.greenD])}"/><rect x="60" y="62" width="12" height="20" rx="5" fill="${lin([C.greenM, C.greenD])}"/></g>
<g ${Bs} fill="${C.greenD}">${sp}</g>
<g ${B}><path d="M5 58 C 5 52 12 50 22 50 L34 48 C 38 40 50 40 56 44 C 70 46 84 40 96 34 C 92 50 80 64 64 68 L40 70 L22 68 C 10 68 5 64 5 58Z" fill="${g}"/></g>
<g ${Bs}><path d="M18 62 C 30 66 40 68 56 66 C 62 66 68 64 74 60 C 66 70 50 74 40 72 L22 70Z" fill="${lin([C.cream, C.goldM])}"/></g>
<path d="M6 58 C 14 60 24 58 34 58" fill="none" stroke="${C.darkD}" stroke-width="1.8" stroke-linecap="round"/>
<path d="M10 58 L12.5 54.5 L15 58 M19 58 L21.5 54.5 L24 58 M28 58 L30.5 54.5 L33 58" fill="${C.paper}" stroke="none"/>
<circle cx="42" cy="44" r="5" fill="${C.greenM}"/>${eye(42, 44, 0.65)}`;
});

a("1f422", "turtle", (t) => {
  const { lin } = t;
  const gc = lin(["#C5DDA6", C.green]);
  return `<g ${Bs}><rect x="22" y="70" width="14" height="18" rx="6" fill="${gc}"/><rect x="62" y="70" width="14" height="18" rx="6" fill="${gc}"/><path d="M86 70 L97 78 L84 78Z" fill="${gc}"/></g>
<g ${B}><circle cx="15" cy="58" r="11" fill="${gc}"/></g>
<g ${B}><path d="M14 80 C 10 46 30 28 52 28 C 76 28 92 46 88 80Z" fill="${lin(["#8DBB7E", C.greenM, C.greenD], "d")}"/></g>
<g ${Bs}><rect x="12" y="76" width="78" height="9" rx="4.5" fill="${lin([C.cream, C.goldM])}"/></g>
<path d="M40 40 L58 38 L64 54 L46 62 L32 54Z M58 38 L72 46 M64 54 L80 56 M46 62 L48 76 M32 54 L22 60" fill="none" stroke="${C.greenD}" stroke-width="2.2" stroke-linejoin="round" opacity=".75"/>
<ellipse cx="42" cy="36" rx="12" ry="5" fill="#fff" opacity=".22"/>${eye(12, 55, 0.7)}`;
});

a("1f98e", "lizard", (t) => {
  const { lin } = t;
  const g = lin(["#B7DCA6", C.greenM, C.greenD], "d");
  const st = (d, w) => `<path d="${d}" fill="none" stroke="${g}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g ${Bs}>${st("M34 38 L18 44 L12 56", 8)}${st("M44 36 L52 30 L62 28", 8)}${st("M58 62 L48 78 L38 86", 8)}${st("M66 56 L78 56 L88 48", 8)}</g>
<g ${B}>${st("M70 70 C 76 82 88 88 94 78", 8)}${st("M24 24 C 40 30 44 44 50 52 C 56 60 62 66 70 70", 15)}<ellipse cx="22" cy="24" rx="13" ry="10" transform="rotate(-24 22 24)" fill="${g}"/></g>
<g fill="${C.greenD}" opacity=".5"><circle cx="46" cy="46" r="2.6"/><circle cx="54" cy="56" r="2.6"/><circle cx="62" cy="64" r="2.4"/></g>
${eye(15, 21, 0.6)}${eye(26, 17, 0.6)}`;
});

a("1f40d", "snake", (t) => {
  const { lin } = t;
  const g = lin(["#B7DCA6", C.greenM, C.greenD], "d");
  const P = "M12 80 C 28 96 86 92 84 72 C 82 54 20 66 22 46 C 24 30 62 34 68 24";
  return `<g ${B}><path d="${P}" fill="none" stroke="${g}" stroke-width="13" stroke-linecap="round"/><ellipse cx="74" cy="20" rx="12" ry="9.5" transform="rotate(-35 74 20)" fill="${g}"/></g>
<path d="${P}" fill="none" stroke="${C.greenD}" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round" opacity=".6"/>
<path d="M82 14 L90 8 M90 8 L95 6 M90 8 L94 12" fill="none" stroke="${C.red}" stroke-width="1.8" stroke-linecap="round"/>
${eye(70, 15, 0.6)}${eye(80, 22, 0.6)}`;
});

a("1f432", "dragon face", (t) => {
  const { lin } = t;
  return `<g ${Bs}><path d="M26 30 L18 6 L40 22Z M74 30 L82 6 L60 22Z" fill="${lin([C.gold, C.goldD])}"/><path d="M16 46 L5 36 L4 62 L18 64Z M84 46 L95 36 L96 62 L82 64Z" fill="${lin([C.orange, C.orangeD])}"/></g>
${U(t, '<ellipse cx="50" cy="54" rx="38" ry="32"/>', ["#B7DCA6", C.greenM, C.greenD], "d", [12, 22, 76, 64])}
<g ${Bs}><path d="M50 18 L43 36 L57 36Z" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="50" cy="72" rx="24" ry="16" fill="${lin(["#D8EDC9", C.green, C.greenM])}"/></g>
<ellipse cx="42" cy="70" rx="2.2" ry="3" fill="${C.greenD}"/><ellipse cx="58" cy="70" rx="2.2" ry="3" fill="${C.greenD}"/>
<path d="M41 80 Q50 85 59 80" fill="none" stroke="${C.greenD}" stroke-width="1.8" stroke-linecap="round"/>
${eye(32, 48, 1)}${eye(68, 48, 1)}${cheek(21, 62)}${cheek(79, 62)}`;
});

a("1f409", "dragon", (t) => {
  const { lin } = t;
  const g = lin(["#B7DCA6", C.greenM, C.greenD], "d");
  return `<g ${Bs}><path d="M50 52 C 50 30 62 16 76 8 C 78 20 86 28 92 30 C 84 34 82 42 82 56Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><path d="M74 68 C 88 72 92 58 86 50" fill="none" stroke="${lin([C.greenM, C.greenD], "d")}" stroke-width="9" stroke-linecap="round"/></g>
<g ${Bs}><path d="M80 48 L92 44 L88 56Z" fill="${lin([C.orange, C.orangeD])}"/><rect x="30" y="76" width="13" height="16" rx="5.5" fill="${lin([C.greenM, C.greenD])}"/><rect x="60" y="76" width="13" height="16" rx="5.5" fill="${lin([C.greenM, C.greenD])}"/></g>
${U(t, '<ellipse cx="50" cy="66" rx="29" ry="19"/><ellipse cx="32" cy="52" rx="11" ry="16"/><circle cx="26" cy="40" r="15"/><ellipse cx="15" cy="46" rx="10" ry="7"/>', ["#B7DCA6", C.greenM, C.greenD], "d", [4, 22, 76, 64])}
<g ${Bs}><ellipse cx="46" cy="76" rx="22" ry="7" fill="${lin([C.cream, C.goldM])}"/><path d="M30 29 L28 13 L40 25Z" fill="${lin([C.gold, C.goldD])}"/></g>
<g ${Bs} fill="${C.orangeD}"><path d="M46 49 L50 42 L55 49Z M58 50 L63 44 L67 52Z M70 55 L75 49 L78 58Z"/></g>
<path d="M8 49 Q15 53 22 49" fill="none" stroke="${C.greenD}" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="44" r="1.5" fill="${C.greenD}"/>${eye(24, 37, 0.75)}`;
});

const shift: Record<string, number[]> = { "1f54a-fe0f": [-3, 7], "1f986": [0, -5], "1f40a": [-1, -6], "1f422": [-1, -8] };
for (const ic of I) {
  const s = shift[ic.u as string];
  if (s) { const d = ic.draw; ic.draw = (t) => `<g transform="translate(${s[0]} ${s[1]})">${d(t)}</g>`; }
}

export default __batch;
