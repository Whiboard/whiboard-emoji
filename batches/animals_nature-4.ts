// animals_nature-4: dinosaurs, sea life, insects, web, microbe.
import type { Icon } from "../kit.ts";
import { B, Bs, C } from "../kit.ts";

const eye = (x, y, s = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${+(3.4 * s).toFixed(2)}" ry="${+(4.2 * s).toFixed(2)}" fill="${C.darkD}"/><circle cx="${+(x - 1.1 * s).toFixed(2)}" cy="${+(y - 1.5 * s).toFixed(2)}" r="${+(1.1 * s).toFixed(2)}" fill="#fff"/>`;
const cheek = (x, y, r = 4) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="${C.pinkD}" opacity=".45"/>`;
const S = (s) => `${s}<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const SV = (s) => `${s}<g transform="matrix(1 0 0 -1 0 100)">${s}</g>`;
const ln = (d, c, w = 2.4, extra = "") => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

const icons: Icon[] = [];
const add = (u, n, draw) => icons.push({ u, n, draw });

// ───────── dinosaurs
add("1f995", "sauropod", ({ lin }) => `
<g ${B}><rect x="30" y="66" width="10" height="22" rx="5" fill="${lin([C.tealM, C.tealD])}"/><rect x="43" y="68" width="10" height="20" rx="5" fill="${lin([C.tealM, C.tealD])}"/><rect x="68" y="68" width="10" height="20" rx="5" fill="${lin([C.tealM, C.tealD])}"/><rect x="80" y="66" width="10" height="22" rx="5" fill="${lin([C.tealM, C.tealD])}"/></g>
<g ${B}><path d="M74 52 C86 56 92 50 97 38 C97 58 88 74 70 74Z" fill="${lin([C.teal, C.tealM, C.tealD])}"/>
${ln("M38 56 C26 52 22 40 20 28", C.tealM, 12)}
<ellipse cx="56" cy="60" rx="27" ry="17" fill="${lin([C.teal, C.tealM, C.tealD])}"/>
<ellipse cx="17" cy="23" rx="10.5" ry="8" fill="${lin([C.teal, C.tealM])}"/></g>
<ellipse cx="56" cy="70" rx="18" ry="5" fill="${C.cream}" opacity=".5"/>
<g fill="${C.tealD}" opacity=".5"><circle cx="48" cy="50" r="4"/><circle cx="62" cy="48" r="4.6"/><circle cx="75" cy="54" r="3.4"/></g>
${eye(13.5, 21, 0.62)}<circle cx="8" cy="26" r="1.2" fill="${C.darkD}"/>${cheek(21, 28, 3)}`);

add("1f996", "T Rex", ({ lin }) => `
<g ${B}><path d="M46 68 h14 v18 h-14z" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="46" cy="88" rx="11" ry="5" fill="${lin([C.orange, C.orangeD])}"/>
<path d="M66 68 h13 v18 h-13z" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="66" cy="88" rx="11" ry="5" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${B}><path d="M78 44 C90 48 96 56 97 68 C86 64 78 70 70 76Z" fill="${lin([C.orange, C.orangeD])}"/>
<ellipse cx="62" cy="58" rx="24" ry="22" fill="${lin([C.woodL, C.orange, C.orangeD], "d")}"/></g>
<ellipse cx="60" cy="70" rx="12" ry="9" fill="${C.cream}" opacity=".6"/>
<g ${B}><path d="M5 32 C5 18 20 12 34 14 C48 16 56 26 56 40 V54 C56 62 40 62 28 56 C14 52 5 46 5 32Z" fill="${lin([C.woodL, C.orange, C.orangeD], "d")}"/></g>
<g ${Bs}><ellipse cx="44" cy="64" rx="8" ry="4.5" transform="rotate(30 44 64)" fill="${lin([C.orange, C.orangeD])}"/></g>
${ln("M7 40 C20 46 36 50 56 46", C.darkD, 1.6)}
<g fill="#fff"><polygon points="14,42 20,44.4 16.5,50"/><polygon points="26,46 32,47.4 28.5,52.6"/><polygon points="38,48 44,48 41,53.6"/></g>
${eye(36, 28, 0.85)}<circle cx="10" cy="30" r="1.5" fill="${C.darkD}"/>${cheek(44, 40, 4)}`);

// ───────── whales, dolphin, seal
const whale = (lin, spout) => {
  const bc = spout ? [C.blue, C.blueM, C.blueD] : [C.blueM, C.blueD, C.navyD];
  const body = `<g ${B}><g transform="translate(0 ${spout ? 6 : -3})">
${ln("M78 62 C86 58 88 48 86 38", bc[1], 9)}
<path d="M86 40 C80 40 75 35 73 30 C80 28 85 31 86 35 C88 30 92 27 96 28 C95 34 92 38 86 40Z" fill="${lin([bc[0], bc[2]])}"/>
<path d="M5 62 C5 42 24 34 46 36 C64 38 76 48 82 60 C78 72 58 84 32 84 C14 84 5 76 5 62Z" fill="${lin(bc)}"/>
<path d="M8 68 C16 80 40 85 62 77 C70 73 76 69 80 62 C70 74 50 80 30 78 C18 76 10 72 8 68Z" fill="${C.cream}"/></g></g>
<g transform="translate(0 ${spout ? 6 : -3})">${ln("M6 66 C12 71 20 71 27 67", C.darkD, 1.6)}${eye(21, 55, 0.75)}${cheek(28, 63, 3.4)}
${spout ? "" : ln("M20 74 C34 80 50 78 62 72 M30 78 C42 82 52 80 60 77", C.blueD, 1.4, 'opacity=".6"')}</g>`;
  const sp = spout
    ? `<g ${Bs}>${ln("M32 40 V28 M32 28 C28 18 20 18 17 22 M32 28 C36 18 44 18 47 22", C.blue, 3.4)}</g>`
    : "";
  return body + sp;
};
add("1f433", "spouting whale", ({ lin }) => whale(lin, true));
add("1f40b", "whale", ({ lin }) => whale(lin, false));

add("1f42c", "dolphin", ({ lin }) => `
<g ${B}><path d="M44 30 C48 16 58 14 66 16 C58 20 56 26 58 32Z" fill="${lin([C.blueM, C.blueD])}"/>
<path d="M82 56 C88 54 92 48 97 44 C98 54 96 64 90 68 C94 74 90 80 82 76Z" fill="${lin([C.blueM, C.blueD])}"/>
<path d="M12 52 C10 46 18 44 24 42 C34 28 58 24 72 34 C82 42 84 54 86 66 C80 76 62 78 46 76 C30 74 22 66 18 58 C14 58 12 56 12 52Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/>
<ellipse cx="10" cy="53" rx="8" ry="4" fill="${lin([C.blue, C.blueM])}"/></g>
<path d="M20 58 C30 70 52 74 74 70 C60 78 36 78 20 58Z" fill="${C.cream}" opacity=".85"/>
<g ${Bs}><path d="M42 62 C44 72 52 80 60 80 C58 74 56 68 54 62Z" fill="${lin([C.blueM, C.blueD])}"/></g>
${ln("M6 55 C12 58 18 58 22 56", C.darkD, 1.5)}${eye(27, 47, 0.7)}`);

add("1f9ad", "seal", ({ lin }) => `<g transform="translate(-1 -4) scale(.93)">
<g ${B}><ellipse cx="91" cy="68" rx="8" ry="4.5" transform="rotate(-20 91 68)" fill="${lin(["#9AA4C0", "#6B7596"])}"/><ellipse cx="91" cy="78" rx="8" ry="4.5" transform="rotate(20 91 78)" fill="${lin(["#9AA4C0", "#6B7596"])}"/>
<ellipse cx="54" cy="68" rx="40" ry="20" transform="rotate(-6 54 68)" fill="${lin(["#C2CADC", "#8D98B5", "#6B7596"])}"/>
<circle cx="28" cy="42" r="19" fill="${lin(["#C2CADC", "#8D98B5", "#6B7596"], "d")}"/></g>
<ellipse cx="50" cy="78" rx="26" ry="7" fill="${C.cream}" opacity=".55"/>
<g ${Bs}><ellipse cx="42" cy="82" rx="12" ry="5" transform="rotate(25 42 82)" fill="${lin(["#9AA4C0", "#6B7596"])}"/></g>
<ellipse cx="19" cy="49" rx="9" ry="6.5" fill="${C.paper}"/>
<ellipse cx="12.5" cy="46.5" rx="3.4" ry="2.6" fill="${C.darkD}"/>
${ln("M16 52 C19 55 22 55 25 52", C.darkD, 1.3)}
<g fill="${C.darkD}" opacity=".55"><circle cx="20" cy="49" r=".9"/><circle cx="23" cy="48" r=".9"/></g>
${eye(30, 38, 0.8)}${cheek(36, 48, 3.4)}</g>`);

// ───────── fish
const fish = (lin, c, f, tall, stripes) => {
  const ry = tall ? 27 : 22;
  return `<g ${B}>
<path d="M30 ${50 - ry + 4} C38 ${50 - ry - 10} 56 ${50 - ry - 8} 62 ${50 - ry + 4}Z" fill="${lin(f)}"/>
${tall ? `<path d="M34 ${50 + ry - 4} C40 ${50 + ry + 10} 54 ${50 + ry + 8} 58 ${50 + ry - 4}Z" fill="${lin(f)}"/>` : ""}
<path d="M72 50 C82 44 88 36 95 28 C99 40 99 60 95 72 C88 64 82 56 72 50Z" fill="${lin(f)}"/>
<ellipse cx="45" cy="50" rx="35" ry="${ry}" fill="${lin(c, "d")}"/></g>
${stripes || ""}
${ln(`M33 ${50 - ry * 0.6} C29 46 29 54 33 ${50 + ry * 0.6}`, "#fff", 1.6, 'opacity=".4"')}
${ln("M11 54 C13 56 15 56 17 55", C.darkD, 1.4)}${eye(25, 45, 0.85)}${cheek(26, 57, 3)}`;
};
add("1f41f", "fish", ({ lin }) =>
  fish(lin, ["#A8C8F0", C.blueM, C.blueD], [C.blue, C.blueD], false, `<g fill="${C.navyD}" opacity=".25"><path d="M50 32 q6 18 0 36 h5 q6 -18 0 -36z"/><path d="M62 36 q5 14 0 28 h4 q5 -14 0 -28z"/></g><path d="M16 62 C30 76 56 76 74 62 C60 74 30 74 16 62Z" fill="${C.cream}" opacity=".7"/>`));
add("1f420", "tropical fish", ({ lin, clip }) =>
  fish(lin, [C.yellow, C.orange, C.orangeD], [C.orange, C.orangeD], true, `<g ${clip('<ellipse cx="45" cy="50" rx="35" ry="27"/>')}><path d="M40 20 h7 v60 h-7z M56 20 h6 v60 h-6z" fill="${C.paper}"/><path d="M40 20 h2 v60 h-2z M56 20 h1.5 v60 h-1.5z" fill="${C.blueD}" opacity=".5"/></g>`));

add("1f421", "blowfish", ({ lin }) => {
  const sp = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2 + 0.2;
    const x1 = 50 + 30 * Math.cos(a), y1 = 52 + 30 * Math.sin(a), x2 = 50 + 42 * Math.cos(a), y2 = 52 + 42 * Math.sin(a);
    const px = -Math.sin(a) * 3.2, py = Math.cos(a) * 3.2;
    return `M${(x1 + px).toFixed(1)} ${(y1 + py).toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${(x1 - px).toFixed(1)} ${(y1 - py).toFixed(1)}Z`;
  }).join("");
  return `<g ${Bs}><path d="${sp}" fill="${C.yellowD}"/></g>
<g ${B}><path d="M78 52 C86 46 90 42 94 40 C95 48 95 56 94 64 C90 62 86 58 78 52Z" fill="${lin([C.yellowM, C.yellowD])}"/>
<circle cx="50" cy="52" r="33" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<ellipse cx="50" cy="72" rx="22" ry="8" fill="${C.cream}" opacity=".7"/>
<g ${Bs}><ellipse cx="56" cy="58" rx="9" ry="6" transform="rotate(30 56 58)" fill="${lin([C.yellowM, C.yellowD])}"/></g>
<g ${Bs}><ellipse cx="19" cy="60" rx="5.4" ry="4.2" fill="${lin([C.pink, C.pinkD])}"/></g><ellipse cx="17.5" cy="60" rx="1.6" ry="1.6" fill="${C.darkD}"/>
${eye(34, 46, 0.95)}${cheek(30, 58, 3.6)}`;
});

add("1f988", "shark", ({ lin }) => `
<g ${B}><path d="M40 36 C46 18 58 12 66 12 C60 20 60 30 62 38Z" fill="${lin(["#8D98B5", "#5F6B8F"])}"/>
<path d="M76 54 C84 50 90 42 96 24 C98 38 94 58 94 76 C88 68 82 64 76 60Z" fill="${lin(["#8D98B5", "#5F6B8F"])}"/>
<path d="M5 56 C12 44 28 36 48 36 C64 36 76 44 82 54 C78 64 62 74 42 74 C24 74 12 68 5 56Z" fill="${lin(["#B3BFD8", "#7F8BAD", "#5F6B8F"])}"/></g>
<path d="M10 60 C24 74 56 78 80 58 C70 72 40 78 20 68Z" fill="${C.paper}"/>
<g ${Bs}><path d="M42 64 C42 74 50 82 58 84 C56 76 54 70 54 64Z" fill="${lin(["#8D98B5", "#5F6B8F"])}"/></g>
${ln("M24 52 C30 52 38 54 44 58", C.darkD, 1.5)}
<g fill="#fff"><polygon points="26,54 29,54.4 27.4,58"/><polygon points="32,55 35,56 33,59.6"/><polygon points="38,57 41,58.4 38.6,61.4"/></g>
${ln("M45 44 C43 48 43 52 45 56", "#4B5573", 1.4)}${eye(21, 46, 0.7)}`);

// ───────── soft sea life
add("1f419", "octopus", ({ lin }) => `
<g ${Bs}>${ln("M30 56 C26 72 14 70 12 82 M40 58 C38 74 30 78 28 90 M50 60 C50 74 48 82 50 92 M60 58 C62 74 70 78 72 90 M70 56 C74 72 86 70 88 82", "#B79ADD", 9)}</g>
<g ${B}><path d="M18 46 C18 18 34 8 50 8 C66 8 82 18 82 46 C82 58 74 62 66 62 H34 C26 62 18 58 18 46Z" fill="${lin(["#D5BFF0", C.purple, C.purpleD], "d")}"/></g>
<g fill="${C.purpleD}" opacity=".4"><circle cx="30" cy="24" r="2.6"/><circle cx="68" cy="22" r="3"/><circle cx="50" cy="16" r="2.2"/></g>
${eye(37, 42, 1)}${eye(63, 42, 1)}${ln("M45 52 C48 55 52 55 55 52", C.darkD, 1.6)}${cheek(28, 52, 4.4)}${cheek(72, 52, 4.4)}`);

add("1f41a", "spiral shell", ({ lin, rad }) => `
<g ${B}><path d="M24 70 C8 56 14 24 40 14 C66 6 90 24 88 50 C86 76 62 90 40 84Z" fill="${rad(["#FFE6CA", C.orange, C.orangeD], 0.34, 0.3, 0.85)}"/>
<path d="M62 62 C80 62 92 74 90 84 C80 94 56 94 50 84 C46 76 54 66 62 62Z" fill="${lin([C.pink, C.pinkD])}"/></g>
${ln("M56 42 C50 36 42 42 46 50 C50 58 62 54 62 44 C62 32 46 28 38 38 C30 48 36 64 52 66 C68 68 80 54 76 40", C.orangeD, 2.6)}
${ln("M30 26 C42 18 58 18 70 24", "#fff", 2, 'opacity=".4"')}
${ln("M60 74 C70 72 80 76 84 82", C.redD, 1.6, 'opacity=".6"')}`);

add("1fab8", "coral", ({ lin }) => `
<g ${B}><path d="M14 86 C14 76 30 72 50 72 C70 72 86 76 86 86 C86 94 70 94 50 94 C30 94 14 94 14 86Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<g ${B}>${ln("M50 76 V56 M50 62 C40 56 30 52 28 34 M28 34 C26 26 22 22 20 14 M28 34 C32 28 34 24 36 16 M50 58 C58 48 66 44 68 26 M68 26 C66 20 62 16 62 10 M68 26 C72 22 78 20 82 14 M50 56 C50 44 50 34 50 22", C.red, 8.5)}</g>
<g ${Bs}><circle cx="20" cy="13" r="5" fill="${lin([C.pink, C.pinkD])}"/><circle cx="36" cy="14" r="5" fill="${lin([C.pink, C.pinkD])}"/><circle cx="62" cy="9" r="5" fill="${lin([C.pink, C.pinkD])}"/><circle cx="82" cy="13" r="5" fill="${lin([C.pink, C.pinkD])}"/><circle cx="50" cy="21" r="5" fill="${lin([C.pink, C.pinkD])}"/></g>
${ln("M48 70 V58 M26 36 C26 44 36 52 46 58", "#fff", 1.8, 'opacity=".3"')}`);

add("1fabc", "jellyfish", ({ lin, rad }) => `
<g ${Bs}>${ln("M30 52 C26 62 36 68 30 78 C26 84 30 88 28 92 M42 54 C38 64 46 70 40 80 C38 86 40 90 40 94 M54 54 C50 64 58 70 52 80 C50 86 52 90 52 94 M66 52 C62 62 72 68 66 78 C62 84 66 88 64 92", "#C9A8EE", 4.6)}</g>
<g ${B}><path d="M14 46 C14 22 30 8 50 8 C70 8 86 22 86 46 C80 52 76 46 69 52 C62 56 56 48 50 54 C44 48 38 56 31 52 C24 46 20 52 14 46Z" fill="${rad(["#F8D2EA", "#E2A4D4", "#A878C8"], 0.36, 0.3, 0.85)}"/></g>
${ln("M24 32 C28 22 36 16 44 14", "#fff", 2.4, 'opacity=".55"')}
${eye(39, 34, 0.9)}${eye(61, 34, 0.9)}${ln("M46 43 C48 45 52 45 54 43", C.darkD, 1.5)}${cheek(28, 42, 4)}${cheek(72, 42, 4)}`);

// ───────── crustaceans
add("1f980", "crab", ({ lin, rad }) => `
<g ${Bs}>${S(ln("M30 62 L12 62 L6 74 M32 68 L16 76 L12 88 M38 74 L28 86 L26 94", C.redM, 4.4))}</g>
<g ${B}>${S(`${ln("M32 52 C20 48 16 40 18 30", C.redM, 6.5)}<path d="M6 22 C6 10 16 6 21 14 C26 8 36 12 32 24 C30 34 10 34 6 22Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/>`)}
<ellipse cx="50" cy="62" rx="31" ry="22" fill="${rad([C.red, C.redM, C.redD], 0.36, 0.3, 0.85)}"/></g>
${S(ln("M20 15 L20 27", C.redD, 1.8))}
<ellipse cx="38" cy="48" rx="8" ry="3" transform="rotate(-20 38 48)" fill="#fff" opacity=".28"/>
${eye(40, 55, 0.9)}${eye(60, 55, 0.9)}${ln("M45 65 C48 68 52 68 55 65", C.darkD, 1.6)}${cheek(30, 64, 4)}${cheek(70, 64, 4)}`);

add("1f99e", "lobster", ({ lin }) => `
<g ${Bs}>${S(`${ln("M46 26 C44 18 40 12 30 6", C.redD, 1.6)}${ln("M37 46 L22 52 M37 52 L24 60 M38 58 L28 68", C.redM, 3.6)}`)}</g>
<g ${B}>${S(`${ln("M40 42 C30 38 26 30 26 24", C.redM, 6)}<path d="M14 18 C12 8 22 4 27 10 C34 6 40 14 36 22 C33 30 16 28 14 18Z" fill="${lin([C.red, C.redM, C.redD], "d")}"/>`)}
<ellipse cx="50" cy="80" rx="5" ry="4" fill="${lin([C.redM, C.redD])}"/>
<path d="M38 88 C38 98 62 98 62 88 L50 78Z" fill="${lin([C.redM, C.redD])}"/>
<rect x="38" y="62" width="24" height="9" rx="4.5" fill="${lin([C.red, C.redD])}"/><rect x="39" y="70" width="22" height="9" rx="4.5" fill="${lin([C.red, C.redD])}"/>
<ellipse cx="50" cy="44" rx="16" ry="21" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
${S(ln("M20 11 L22 22", C.redD, 1.6))}
${ln("M50 56 V80", C.redD, 1.4, 'opacity=".4"')}
${eye(43, 33, 0.8)}${eye(57, 33, 0.8)}${ln("M46 42 C48 44 52 44 54 42", C.darkD, 1.4)}`);

add("1f990", "shrimp", ({ lin }) => `
<g ${Bs}>${ln("M24 28 C14 22 12 16 6 14 M24 36 C14 36 10 30 6 26", C.orangeD, 1.8)}${ln("M52 62 L50 72 M62 58 L62 70 M72 50 L76 60", C.orangeD, 2.6)}</g>
<g ${B}>${ln("M36 32 C62 22 86 38 78 60 C74 72 60 78 50 76", C.orange, 17)}
<g transform="rotate(20 48 80)"><ellipse cx="38" cy="82" rx="9" ry="5" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="46" cy="90" rx="9" ry="5" fill="${lin([C.orange, C.orangeD])}"/><ellipse cx="52" cy="78" rx="9" ry="5" fill="${lin([C.orange, C.orangeD])}"/></g>
<ellipse cx="34" cy="34" rx="15" ry="13" fill="${lin(["#FFD2A0", C.orange, C.orangeD], "d")}"/></g>
${ln("M36 32 C62 22 86 38 78 60 C74 72 60 78 50 76", "#C86A2A", 17, 'stroke-dasharray="1.2 7.6" opacity=".4"')}
${ln("M38 24 C60 16 80 26 82 44", "#fff", 2.4, 'opacity=".35"')}
<path d="M22 28 L10 22 L22 34Z" fill="${C.orangeD}"/>
${eye(28, 34, 0.8)}${cheek(34, 42, 3.4)}`);

add("1f991", "squid", ({ lin }) => `<g transform="translate(0 -1)">
<g ${Bs}>${S(ln("M38 62 C34 76 30 82 28 92 M45 64 C43 78 42 86 42 94", "#E8A0B6", 5))}</g>
<g ${B}>${S(`<path d="M50 6 L28 30 L38 38Z" fill="${lin([C.pink, C.pinkD])}"/>`)}
<path d="M50 4 C66 14 72 34 68 52 H32 C28 34 34 14 50 4Z" fill="${lin(["#FBC8D4", "#E898B0", "#C96A86"], "d")}"/>
<ellipse cx="50" cy="56" rx="20" ry="11" fill="${lin([C.pink, C.pinkD, "#C96A86"])}"/></g>
<g fill="#C96A86" opacity=".45"><circle cx="44" cy="22" r="2.4"/><circle cx="56" cy="30" r="2.8"/><circle cx="46" cy="38" r="2"/></g>
${eye(41, 55, 0.8)}${eye(59, 55, 0.8)}${cheek(32, 60, 3)}${cheek(68, 60, 3)}</g>`);

add("1f9aa", "oyster", ({ lin, rad }) => `
<g ${B}><path d="M8 62 C6 50 20 44 50 44 C80 44 94 50 92 62 C90 78 70 90 50 90 C30 90 10 78 8 62Z" fill="${lin(["#A9B4CB", "#7F8BAD", "#5F6B8F"], "d")}"/></g>
<ellipse cx="50" cy="63" rx="36" ry="19" fill="${lin([C.paper, "#F2D6D8", "#D9B8BC"], "d")}"/>
<g ${B}><path d="M10 42 C6 24 22 10 48 8 C72 6 90 16 92 32 C62 28 32 32 10 42Z" fill="${lin(["#A9B4CB", "#7F8BAD", "#5F6B8F"], "d")}"/></g>
${ln("M22 36 C22 28 28 20 36 16 M40 32 C38 24 40 16 46 12 M58 30 C58 22 62 16 68 14 M74 32 C76 26 80 22 84 22", "#5F6B8F", 1.6, 'opacity=".6"')}
<g ${Bs}><circle cx="50" cy="62" r="11" fill="${rad(["#FFFFFF", C.paper, "#BFB4A8"], 0.34, 0.3, 0.85)}"/></g>
<ellipse cx="46" cy="57" rx="3.6" ry="2.4" fill="#fff" opacity=".85"/>`);

// ───────── insects
add("1f40c", "snail", ({ lin, rad }) => `
<g ${B}><path d="M6 84 C4 72 12 68 16 58 C18 48 16 40 20 38 C26 36 26 48 30 58 H88 C96 58 96 84 84 84Z" fill="${lin(["#F6EBC0", "#DCCB92", "#B8A56C"])}"/></g>
${ln("M19 40 C16 34 14 28 12 24 M25 40 C28 34 30 28 32 24", "#DCCB92", 3)}
<g ${B}><circle cx="63" cy="45" r="28" fill="${rad(["#FFD9A8", C.orange, C.orangeD], 0.34, 0.3, 0.85)}"/></g>
${ln("M63 45 C60 40 54 44 57 49 C61 54 69 50 67 42 C65 34 54 34 50 42 C46 52 54 62 64 60 C76 58 80 46 76 36", C.orangeD, 2.8)}
${eye(12, 23, 0.55)}${eye(32, 23, 0.55)}${ln("M10 62 C14 66 18 66 20 63", C.darkD, 1.4)}${cheek(12, 56, 3)}`);

add("1f98b", "butterfly", ({ lin }) => `
<g ${B}>${S(`<path d="M47 46 C36 14 10 6 8 26 C6 44 22 54 47 52Z" fill="${lin([C.yellow, C.orange, C.orangeD], "d")}"/><path d="M47 54 C26 54 12 64 16 78 C20 92 42 86 47 62Z" fill="${lin([C.pink, C.pinkD, C.purple], "d")}"/>`)}</g>
<g fill="${C.paper}" opacity=".8">${S('<circle cx="22" cy="28" r="5"/><circle cx="26" cy="74" r="4"/>')}</g>
<g ${B}><ellipse cx="50" cy="56" rx="4.4" ry="20" fill="${lin([C.dark, C.darkD])}"/><circle cx="50" cy="32" r="7" fill="${lin(["#8A7C84", C.dark])}"/></g>
${S(ln("M47 27 C44 18 40 14 34 12", C.dark, 1.8))}
<g fill="${C.darkD}"><circle cx="47" cy="32" r="1.5"/><circle cx="53" cy="32" r="1.5"/></g>`);

add("1f41b", "bug", ({ lin }) => {
  const seg = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/>`;
  return `<g ${Bs}>${ln("M44 66 V80 M58 64 V78 M72 66 V80 M86 70 V82", C.greenD, 3.4)}</g>
<g ${B}>${seg(85, 62, 10)}${seg(71, 56, 11.5)}${seg(56, 54, 12)}${seg(40, 56, 12)}<circle cx="22" cy="54" r="15" fill="${lin(["#D4EAA8", C.green, C.greenM], "d")}"/></g>
<g fill="${C.greenD}" opacity=".35"><circle cx="56" cy="50" r="3"/><circle cx="71" cy="52" r="2.6"/><circle cx="40" cy="52" r="3"/><circle cx="85" cy="58" r="2.4"/></g>
<g ${Bs}>${ln("M16 40 C14 32 12 28 8 24 M28 40 C30 32 34 28 38 24", C.greenD, 2)}<circle cx="8" cy="23" r="2.6" fill="${C.greenD}"/><circle cx="38" cy="23" r="2.6" fill="${C.greenD}"/></g>
${eye(16, 51, 0.85)}${eye(29, 51, 0.85)}${ln("M18 62 C22 66 26 66 29 62", C.darkD, 1.6)}${cheek(11, 60, 3)}${cheek(34, 60, 3)}`;
});

add("1f41c", "ant", ({ lin }) => {
  const sl = lin(["#98A4C8", "#6B7799", "#4B5578"], "d");
  const legs = ln("M40 44 L32 30 L22 22 M44 44 L48 28 L56 16 M48 44 L62 32 L72 30", "#5F6B8F", 3.2);
  return `<g ${Bs}>${SV(legs)}${S("")}${ln("M14 40 C8 32 12 22 22 16", "#5F6B8F", 2.2)}${ln("M14 60 C8 68 12 78 22 84", "#5F6B8F", 2.2)}</g>
<g ${B}><ellipse cx="76" cy="50" rx="20" ry="16" fill="${sl}"/><ellipse cx="46" cy="50" rx="12" ry="9" fill="${sl}"/><circle cx="22" cy="50" r="14" fill="${sl}"/></g>
<ellipse cx="72" cy="43" rx="9" ry="4" fill="#fff" opacity=".25"/>
${eye(18, 43, 0.6)}${eye(18, 57, 0.6)}${ln("M10 50 C8 50 7 48 6 46 M10 50 C8 50 7 52 6 54", C.darkD, 1.4)}`;
});

add("1f41d", "honeybee", ({ lin, clip }) => `
<g ${Bs}>${ln("M20 42 C16 32 18 24 26 20 M28 42 C32 34 36 28 42 26", C.darkD, 1.8)}</g>
<g ${Bs}><ellipse cx="52" cy="30" rx="12" ry="22" transform="rotate(-16 52 30)" fill="${lin(["#FFFFFF", "#CFE6F6"])}" stroke="#8FB0CE" stroke-width="1.4" opacity=".92"/><ellipse cx="72" cy="32" rx="10" ry="20" transform="rotate(14 72 32)" fill="${lin(["#FFFFFF", "#CFE6F6"])}" stroke="#8FB0CE" stroke-width="1.4" opacity=".92"/></g>
<g ${B}><polygon points="86,50 97,59 86,67" fill="${C.darkD}"/>
<ellipse cx="58" cy="60" rx="31" ry="23" fill="${lin([C.yellow, C.yellowM, C.yellowD], "d")}"/></g>
<g ${clip('<ellipse cx="58" cy="60" rx="31" ry="23"/>')}><rect x="50" y="30" width="9" height="60" fill="${C.dark}"/><rect x="68" y="30" width="9" height="60" fill="${C.dark}"/></g>
<g ${B}><circle cx="24" cy="58" r="16" fill="${lin(["#FFE9A0", C.yellowM, C.yellowD], "d")}"/></g>
<g ${Bs}>${ln("M48 82 L46 92 M62 83 L62 92", C.darkD, 3)}</g>
${eye(20, 54, 0.85)}${ln("M14 66 C18 70 24 70 27 66", C.darkD, 1.5)}${cheek(30, 64, 3.6)}`);

add("1fab2", "beetle", ({ lin, rad }) => `
<g ${Bs}>${S(ln("M26 52 L10 44 L6 34 M25 62 L8 66 L6 78 M30 74 L18 86 L16 94", C.darkD, 3.4) + ln("M45 16 C42 8 38 6 34 8", C.darkD, 2))}</g>
<g ${B}><ellipse cx="50" cy="60" rx="27" ry="32" fill="${rad(["#8ED2CB", C.tealM, "#2F5C66"], 0.36, 0.3, 0.85)}"/>
<ellipse cx="50" cy="32" rx="18" ry="11" fill="${lin(["#8ED2CB", C.tealD])}"/>
<circle cx="50" cy="20" r="10" fill="${lin(["#8A7C84", C.dark])}"/></g>
${ln("M50 38 V90", "#1F4048", 1.8, 'opacity=".7"')}
<ellipse cx="38" cy="54" rx="6" ry="14" transform="rotate(14 38 54)" fill="#fff" opacity=".28"/>
<g fill="#fff"><circle cx="45" cy="19" r="2.8"/><circle cx="55" cy="19" r="2.8"/></g><g fill="${C.darkD}"><circle cx="45" cy="19.6" r="1.7"/><circle cx="55" cy="19.6" r="1.7"/></g>`);

add("1f41e", "lady beetle", ({ lin, rad }) => `
<g ${Bs}>${S(ln("M24 54 L10 50 M24 64 L8 70 M28 76 L16 88", C.darkD, 3.4) + ln("M44 14 C40 6 36 6 32 8", C.darkD, 2))}</g>
<g ${B}><circle cx="50" cy="58" r="34" fill="${rad(["#F58578", C.redM, C.redD], 0.34, 0.3, 0.85)}"/>
<path d="M32 28 C32 14 68 14 68 28 C60 22 40 22 32 28Z" fill="${lin(["#8A7C84", C.dark])}"/><ellipse cx="50" cy="24" rx="17" ry="12" fill="${lin(["#8A7C84", C.dark])}"/></g>
${ln("M50 32 V92", C.darkD, 1.8, 'opacity=".7"')}
<g fill="${C.darkD}"><circle cx="35" cy="52" r="6"/><circle cx="65" cy="52" r="6"/><circle cx="30" cy="72" r="4.6"/><circle cx="70" cy="72" r="4.6"/><circle cx="50" cy="80" r="3.6"/></g>
<ellipse cx="34" cy="40" rx="6" ry="9" transform="rotate(30 34 40)" fill="#fff" opacity=".3"/>
<g fill="#fff"><ellipse cx="43" cy="24" rx="3.6" ry="4.4"/><ellipse cx="57" cy="24" rx="3.6" ry="4.4"/></g><g fill="${C.darkD}"><ellipse cx="43" cy="25" rx="2" ry="2.6"/><ellipse cx="57" cy="25" rx="2" ry="2.6"/></g>`);

add("1f997", "cricket", ({ lin }) => {
  const d = lin(["#9A8D98", C.dark, C.darkD], "d");
  return `<g transform="translate(-5 0)"><g ${Bs}>${ln("M20 40 C10 26 14 14 30 8 M26 38 C28 26 36 16 52 12", C.dark, 2)}${ln("M30 66 L22 82 L18 90 M38 68 L34 84 L32 92", C.dark, 3.4)}</g>
<g ${Bs}>${ln("M72 58 L88 36", C.dark, 9)}${ln("M88 36 L92 66 L96 88", C.dark, 3.6)}</g>
<g ${B}><ellipse cx="58" cy="58" rx="32" ry="15" transform="rotate(-4 58 58)" fill="${d}"/><circle cx="26" cy="50" r="13" fill="${d}"/></g>
<g ${Bs}><path d="M40 52 C52 40 76 42 90 56 C78 60 54 62 40 52Z" fill="${lin(["#C9BFCB", "#8E8290"])}"/></g>
${ln("M52 50 L80 56 M60 46 L84 52", "#5A4F56", 1.2, 'opacity=".5"')}
${eye(22, 47, 0.8)}${ln("M14 56 C18 60 22 60 25 57", "#EEE", 1.3)}</g>`;
});

add("1fab3", "cockroach", ({ lin }) => {
  const b = lin(["#B28F80", "#7C5B50", "#55403C"], "d");
  return `<g ${Bs}>${S(ln("M34 44 L18 36 L8 40 M32 56 L14 58 L6 68 M36 70 L22 82 L18 92", "#6A4C46", 3.4) + ln("M45 18 C40 8 30 6 24 10", "#6A4C46", 1.8))}</g>
<g ${B}><ellipse cx="50" cy="60" rx="22" ry="31" fill="${b}"/><ellipse cx="50" cy="38" rx="17" ry="11" fill="${lin(["#C9A494", "#8A6558"])}"/><ellipse cx="50" cy="22" rx="11" ry="9" fill="${lin(["#B28F80", "#6A4C46"])}"/></g>
${ln("M50 50 V90", "#3E2D2A", 1.6, 'opacity=".6"')}
<ellipse cx="40" cy="62" rx="4" ry="13" transform="rotate(8 40 62)" fill="#fff" opacity=".22"/>
${eye(45, 21, 0.5)}${eye(55, 21, 0.5)}`;
});

add("1f577-fe0f", "spider", ({ lin, rad }) => {
  const legs = ln("M40 30 C30 20 22 16 14 6 M38 36 C26 32 14 32 6 26 M38 42 C26 44 14 50 6 60 M40 50 C30 56 24 70 18 88", "#5F6B8F", 3.4);
  return `<g ${Bs}>${S(legs)}</g>
<g ${B}><circle cx="50" cy="63" r="22" fill="${rad(["#A4B0D2", "#6B7799", "#454F72"], 0.36, 0.3, 0.85)}"/><circle cx="50" cy="36" r="14" fill="${rad(["#A4B0D2", "#6B7799", "#454F72"], 0.36, 0.3, 0.85)}"/></g>
<ellipse cx="42" cy="56" rx="5" ry="9" transform="rotate(20 42 56)" fill="#fff" opacity=".25"/>
<path d="M50 54 L44 66 L50 76 L56 66Z" fill="${C.redM}" opacity=".85"/>
${eye(44, 34, 0.6)}${eye(56, 34, 0.6)}`;
});

add("1f578-fe0f", "spider web", () => {
  const pt = (k, r) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 4;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  };
  const spokes = Array.from({ length: 8 }, (_, k) => { const [x, y] = pt(k, 45); return `M50 50 L${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ");
  const ring = (r) => {
    let d = "";
    for (let k = 0; k < 8; k++) {
      const [x1, y1] = pt(k, r), [x2, y2] = pt(k + 1, r), [cx, cy] = pt(k + 0.5, r * 0.84);
      d += `${k ? "" : `M${x1.toFixed(1)} ${y1.toFixed(1)}`} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
    }
    return d;
  };
  return `<g ${Bs}>${ln(spokes, "#8DA2BE", 2.8)}${ln(ring(13) + ring(25) + ring(36) + ring(45), "#8DA2BE", 2.4)}</g>
<g ${Bs}><circle cx="50" cy="50" r="3.4" fill="#8DA2BE"/></g>
${ln("M44 14 C38 24 30 20 24 30", "#fff", 1.6, 'opacity=".4"')}`;
});

add("1f982", "scorpion", ({ lin }) => {
  const o = lin([C.orange, C.orangeD, "#A8601E"], "d");
  return `<g ${Bs}>${S(ln("M40 46 L24 44 L12 52 M40 52 L22 58 L12 70 M42 58 L28 72 L22 84", C.orangeD, 3.6))}</g>
<g ${B}>${S(`${ln("M42 38 C34 32 30 26 30 20", C.orange, 6)}<path d="M18 16 C16 6 26 2 31 8 C38 4 44 12 40 20 C37 28 20 26 18 16Z" fill="${lin([C.orange, C.orangeD], "d")}"/>`)}
${ln("M50 78 C50 94 84 94 84 66 C84 50 76 42 68 38", C.orangeD, 8)}
<ellipse cx="50" cy="76" rx="9" ry="6" fill="${o}"/><ellipse cx="50" cy="66" rx="11" ry="7" fill="${o}"/><ellipse cx="50" cy="55" rx="13" ry="8" fill="${o}"/>
<ellipse cx="50" cy="42" rx="15" ry="12" fill="${o}"/></g>
${ln("M50 78 C50 94 84 94 84 66 C84 50 76 42 68 38", "#7A4410", 8, 'stroke-dasharray="1.2 6" opacity=".4"')}
<path d="M64 40 C60 34 62 28 68 26 C66 32 68 36 72 36Z" fill="${C.redD}"/>
${S(ln("M20 14 L22 24", C.orangeD, 1.5))}
${eye(44, 40, 0.7)}${eye(56, 40, 0.7)}`;
});

add("1f99f", "mosquito", ({ lin }) => {
  const g = lin(["#B6ADC0", "#7B7189", "#56506A"], "d");
  return `<g ${Bs}>${ln("M44 50 L36 70 L30 92 M50 52 L50 74 L52 94 M56 50 L66 66 L76 86", "#6A6278", 2.6)}${ln("M30 42 L12 62", C.darkD, 3)}</g>
<g ${Bs}><ellipse cx="62" cy="26" rx="24" ry="8" transform="rotate(-28 62 26)" fill="${lin(["#FFFFFF", "#CFE6F6"])}" stroke="#8FB0CE" stroke-width="1.4" opacity=".92"/><ellipse cx="74" cy="38" rx="22" ry="7" transform="rotate(-8 74 38)" fill="${lin(["#FFFFFF", "#CFE6F6"])}" stroke="#8FB0CE" stroke-width="1.4" opacity=".92"/></g>
<g ${B}><ellipse cx="72" cy="62" rx="22" ry="9" transform="rotate(32 72 62)" fill="${g}"/><ellipse cx="50" cy="46" rx="14" ry="11" fill="${g}"/><circle cx="34" cy="38" r="10" fill="${lin(["#C9BFCB", "#7B7189"], "d")}"/></g>
<g fill="#fff" opacity=".55"><ellipse cx="68" cy="62" rx="1.6" ry="8" transform="rotate(32 68 62)"/><ellipse cx="78" cy="68" rx="1.6" ry="7" transform="rotate(32 78 68)"/></g>
${eye(32, 36, 0.62)}`;
});

add("1fab0", "fly", ({ lin }) => {
  const g = lin(["#98A4C8", "#6B7799", "#454F72"], "d");
  const w = `<ellipse cx="24" cy="58" rx="11" ry="27" transform="rotate(26 24 58)" fill="${lin(["#FFFFFF", "#CFE6F6"])}" stroke="#8FB0CE" stroke-width="1.4" opacity=".92"/>`;
  return `<g ${Bs}>${S(w)}</g>
<g ${Bs}>${S(ln("M40 40 L26 34 L16 40 M38 48 L22 52 L14 62 M40 54 L28 66 L24 78", "#5F6B8F", 3))}</g>
<g ${B}><ellipse cx="50" cy="64" rx="16" ry="23" fill="${g}"/><ellipse cx="50" cy="42" rx="14" ry="12" fill="${g}"/><ellipse cx="50" cy="25" rx="14" ry="11" fill="${lin(["#98A4C8", "#6B7799"])}"/></g>
<g ${B}>${S(`<ellipse cx="39" cy="24" rx="7.6" ry="9" fill="${lin(["#F58578", C.redM, C.redD], "d")}"/>`)}</g>
<g fill="#fff">${S('<circle cx="37" cy="21" r="2"/>')}</g>
${ln("M50 52 V84", "#323B5A", 1.5, 'opacity=".5"')}`;
});

add("1fab1", "worm", ({ lin }) => {
  const d = "M14 30 C34 14 40 40 52 54 C64 68 76 88 90 66";
  return `<g ${B}>${ln(d, "#F0A0A8", 15)}</g>
${ln(d, "#C86A7C", 15, 'stroke-dasharray="1.4 7" opacity=".5"')}
${ln("M14 24 C32 8 38 34 50 48 C60 60 72 78 86 62", "#fff", 3.6, 'opacity=".32"')}
${eye(14, 27, 0.8)}${ln("M8 38 C10 40 13 41 15 40", C.darkD, 1.4)}${cheek(20, 36, 3)}`;
});

add("1f9a0", "microbe", ({ lin, rad }) => {
  const k = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    return [50 + 23 * Math.cos(a), 50 + 23 * Math.sin(a), 50 + 34 * Math.cos(a), 50 + 34 * Math.sin(a)];
  });
  return `<g ${Bs}>${ln(k.map(([a, b, c, d]) => `M${a.toFixed(1)} ${b.toFixed(1)} L${c.toFixed(1)} ${d.toFixed(1)}`).join(" "), C.greenD, 3.6)}</g>
<g ${Bs}>${k.map(([, , c, d]) => `<circle cx="${c.toFixed(1)}" cy="${d.toFixed(1)}" r="6.2" fill="${lin([C.pink, C.redM], "d")}"/>`).join("")}</g>
<g ${B}><circle cx="50" cy="50" r="27" fill="${rad(["#D2EBC6", C.green, C.greenD], 0.34, 0.3, 0.85)}"/></g>
<g fill="${C.greenD}" opacity=".35"><circle cx="36" cy="64" r="3"/><circle cx="64" cy="62" r="2.6"/><circle cx="58" cy="30" r="2.2"/></g>
${eye(41, 46, 0.9)}${eye(59, 46, 0.9)}${ln("M45 57 C48 60 52 60 55 57", C.darkD, 1.6)}${cheek(33, 56, 3.6)}${cheek(67, 56, 3.6)}`;
});

const __batch: Icon[] = icons;

export default __batch;
