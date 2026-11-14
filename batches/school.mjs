// School set: the 40 reference icons. Read this file for technique, not for format:
// new batch files export a plain array of { u, n, draw } (see kit.mjs).
import { B, Bs, C, star } from "../kit.mjs";

const icons = [];
const add = (key, vi, n, draw) => icons.push({ key, vi, n, draw });

// ───────────────────────── row 1
add("pencil", "Bút chì", "pencil", ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50)">
<polygon points="-6,50 15,40 15,60" fill="${lin(["#F6DFB8", "#D9AE78"])}"/>
<polygon points="-6,50 1.5,46.4 1.5,53.6" fill="${C.dark}"/>
<rect x="15" y="40" width="65" height="20" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/>
<rect x="15" y="46.5" width="65" height="7" fill="#fff" opacity=".16"/>
<rect x="80" y="39.4" width="10" height="21.2" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
<path d="M90 40 H99 a6 6 0 0 1 6 6 V54 a6 6 0 0 1 -6 6 H90Z" fill="${lin([C.pink, C.pinkD])}"/>
</g></g>
<g transform="rotate(-45 50 50)" fill="${C.metalDD}" opacity=".45"><rect x="82.6" y="39.4" width="1.1" height="21.2"/><rect x="86.3" y="39.4" width="1.1" height="21.2"/></g>`);

add("notebook", "Vở lò xo", "notebook", ({ lin }) => {
  const m = lin([C.metalL, C.metalD]);
  const rings = Array.from({ length: 8 }, (_, i) => {
    const y = 18.5 + i * 8.6;
    return `<circle cx="31.5" cy="${(y + 2.2).toFixed(1)}" r="2" fill="#17302f" opacity=".55"/><rect x="18" y="${y.toFixed(1)}" width="13.5" height="4.4" rx="2.2" fill="${m}"/>`;
  }).join("");
  return `
<g ${B}><rect x="28" y="15" width="58" height="75" rx="5" fill="${lin([C.paper, C.paperD])}"/></g>
<g ${B}><rect x="24" y="11" width="58" height="76" rx="5" fill="${lin([C.teal, C.tealM, C.tealD], "d")}"/></g>
<rect x="24" y="11" width="12" height="76" rx="5" fill="#123a38" opacity=".2"/>
<g ${Bs}><rect x="43" y="25" width="31" height="21" rx="3" fill="${lin([C.paper, C.paperD])}"/></g>
<rect x="48" y="31.5" width="21" height="2.4" rx="1.2" fill="${C.tealD}" opacity=".75"/>
<rect x="48" y="37.5" width="13" height="2.4" rx="1.2" fill="${C.tealD}" opacity=".5"/>
<g ${Bs}><polygon points="${star(62, 68, 8.5, 3.8)}" fill="${lin([C.yellow, C.yellowD])}"/></g>
<g ${Bs}>${rings}</g>`;
});

add("backpack", "Ba lô", "backpack", ({ lin }) => `
<g ${B}>
<path d="M37 24 C37 5 63 5 63 24" fill="none" stroke="${C.blueD}" stroke-width="6" stroke-linecap="round"/>
<rect x="10" y="50" width="18" height="32" rx="8" fill="${lin([C.blueM, C.blueD])}"/>
<rect x="72" y="50" width="18" height="32" rx="8" fill="${lin([C.blueM, C.blueD])}"/>
</g>
<g ${B}><path d="M19 46 C19 27 32 19 50 19 C68 19 81 27 81 46 V80 a11 11 0 0 1 -11 11 H30 a11 11 0 0 1 -11 -11Z" fill="${lin([C.blue, C.blueM, C.blueD], "d")}"/></g>
<path d="M27 46 C27 33 36 27 50 27 C64 27 73 33 73 46" fill="none" stroke="${C.navyD}" stroke-width="2" stroke-dasharray="2.4 1.6" opacity=".55"/>
<g ${Bs}><rect x="45" y="35" width="10" height="9" rx="2" fill="${lin([C.woodL, C.wood])}"/></g>
<g ${B}><rect x="28" y="53" width="44" height="31" rx="9" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/></g>
<path d="M33 62 H67" stroke="${C.woodD}" stroke-width="2" stroke-dasharray="2.4 1.6" opacity=".55"/>
<g ${Bs}><rect x="46" y="59.4" width="8" height="5.2" rx="1.6" fill="${lin([C.metalL, C.metalD])}"/></g>`);

add("apple", "Quả táo", "apple", ({ lin, rad }) => `
<g ${B}><path d="M50 31 C41 21 15 24 15 51 C15 75 33 93 50 86 C67 93 85 75 85 51 C85 24 59 21 50 31Z" fill="${rad(["#F58578", "#D9473F", "#A92C2B"], 0.34, 0.3, 0.82)}"/></g>
<ellipse cx="50" cy="33.5" rx="9" ry="3.4" fill="#7D1F1F" opacity=".35"/>
<ellipse cx="32" cy="46" rx="6.5" ry="11" transform="rotate(24 32 46)" fill="#fff" opacity=".28"/>
<path d="M50 34 C50 27 52 20 56.5 13.5" fill="none" stroke="${C.woodD}" stroke-width="4" stroke-linecap="round"/>
<g ${Bs}><path d="M55 25 C60 10 77 9 84 12.5 C81 26 66 33 55 25Z" fill="${lin([C.green, C.greenM, C.greenD], "d")}"/></g>
<path d="M57.5 23.5 C64 19.5 73 15.5 81.5 13.6" fill="none" stroke="${C.greenD}" stroke-width="1.2" opacity=".7"/>`);

add("books", "Chồng sách", "books stack", ({ lin }) => {
  const page = lin([C.paper, C.paperD]);
  const book = (x, y, w, h, c, flip) => {
    const px = flip ? x : x + 7;
    const sx = flip ? x + w - 5.2 : x + 3;
    return `<g ${B}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3.5" fill="${lin(c)}"/></g>
<rect x="${px}" y="${y + 3.4}" width="${w - 7}" height="${(h - 6.8).toFixed(1)}" fill="${page}"/>
<path d="M${px} ${y + h / 2 - 2} h${w - 7} M${px} ${y + h / 2 + 2} h${w - 7}" stroke="#B8A780" stroke-width=".8" opacity=".7"/>
<rect x="${sx}" y="${y}" width="2.2" height="${h}" fill="${C.gold}" opacity=".85"/>`;
  };
  return `${book(12, 66, 76, 22, [C.green, C.greenD])}${book(19, 46, 64, 20, [C.red, C.redD], true)}<g transform="rotate(-5 46 36)">${book(15, 27, 60, 18.5, [C.blue, C.blueD])}</g>`;
});

add("ruler", "Thước kẻ", "ruler", ({ lin }) => {
  const ticks = Array.from({ length: 21 }, (_, i) => `<rect x="${(i * 5 - 0.6).toFixed(1)}" y="38" width="1.2" height="${i % 2 ? 5 : 9}"/>`).join("");
  return `<g ${B}><g transform="rotate(-35 50 50)"><rect x="-3" y="38" width="106" height="24" rx="3" fill="${lin([C.woodL, "#DBA96F", C.wood])}"/></g></g>
<g transform="rotate(-35 50 50)"><g fill="${C.woodDD}" opacity=".8">${ticks}</g><circle cx="96.5" cy="54.5" r="2.6" fill="${C.woodDD}" opacity=".55"/><rect x="-3" y="57.5" width="106" height="4.5" fill="${C.woodDD}" opacity=".14"/></g>`;
});

add("globe", "Quả địa cầu", "globe", ({ lin, rad, clip }) => `
<g ${B}>
<path d="M50 5 A37 37 0 0 1 50 79" transform="rotate(18 50 42)" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD])}" stroke-width="4.6" stroke-linecap="round"/>
<rect x="46.4" y="74" width="7.2" height="12" fill="${lin([C.goldD, C.gold, C.goldD], "h")}"/>
<ellipse cx="50" cy="89" rx="23" ry="5.6" fill="${lin([C.wood, C.woodD])}"/>
</g>
<g ${B}><circle cx="50" cy="42" r="29" fill="${rad(["#B3D7F8", "#6C9ADB", "#4169AE"], 0.36, 0.3, 0.85)}"/></g>
<g ${clip('<circle cx="50" cy="42" r="29"/>')}>
<g fill="${C.greenM}">
<path d="M29 21 C37 14 49 17 51 25 C53 33 45 35 43 43 C41 51 31 50 27 42 C22 34 23 26 29 21Z"/>
<path d="M45 51 C51 47 57 53 55 61 C53 69 47 73 45 65 C43 59 41 55 45 51Z"/>
<path d="M63 19 C71 17 79 25 79 33 C77 41 69 39 65 45 C61 49 59 41 59 33 C57 27 59 21 63 19Z"/>
<path d="M67 55 C73 51 80 55 77 61 C73 65 67 63 67 55Z"/>
</g>
<circle cx="50" cy="42" r="29" fill="${rad([[0, "#fff", 0.3], [0.5, "#fff", 0], [1, "#0A1E4A", 0.5]], 0.34, 0.28, 0.82)}"/>
</g>
<circle cx="50" cy="5" r="3" transform="rotate(18 50 42)" fill="${C.goldM}"/>`);

add("cap", "Mũ tốt nghiệp", "graduation cap", ({ lin }) => `
<g ${B}><path d="M26 47 V67 C26 78 74 78 74 67 V47Z" fill="${lin(["#7385C2", "#3C4B80"])}"/></g>
<polygon points="50,61 95,41 95,44.5 50,64.5 5,44.5 5,41" fill="#3C4B80"/>
<g ${B}><polygon points="50,21 95,41 50,61 5,41" fill="${lin(["#98AAE4", "#5A6DAC"], "d")}"/></g>
<path d="M50 41 L81 47 V66" fill="none" stroke="${C.goldM}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<g ${Bs}><ellipse cx="50" cy="41" rx="5" ry="2.8" fill="${lin([C.gold, C.goldD])}"/>
<path d="M77.6 66 h6.8 l2.2 16 h-11.2Z" fill="${lin([C.gold, C.goldM, C.goldD])}"/>
<rect x="77" y="63.4" width="8" height="4.2" rx="1.6" fill="${C.goldD}"/></g>
<path d="M78.6 70 V81 M81 70 V81.5 M83.4 70 V81" stroke="${C.goldD}" stroke-width=".9" opacity=".7"/>`);

// ───────────────────────── row 2
add("openbook", "Sách mở", "open book", ({ lin }) => {
  const L = [0, 1, 2, 3, 4]
    .map((k) => {
      const y = 37 + k * 7.4;
      return `M16.5 ${y.toFixed(1)} C25 ${(y - 3.4).toFixed(1)} 35 ${(y - 2.4).toFixed(1)} 44.5 ${(y + 2.2).toFixed(1)} M83.5 ${y.toFixed(1)} C75 ${(y - 3.4).toFixed(1)} 65 ${(y - 2.4).toFixed(1)} 55.5 ${(y + 2.2).toFixed(1)}`;
    })
    .join(" ");
  return `<g ${B}><path d="M5 31 C20 25 38 25 50 33 C62 25 80 25 95 31 V83 C80 78 62 78 50 86 C38 78 20 78 5 83Z" fill="${lin([C.redM, C.redD])}"/></g>
<g ${B}><path d="M9.5 26 C22 20 40 21 50 29.5 V81 C40 73.5 22 72.5 9.5 77.5Z" fill="${lin([C.paper, C.paper, "#DDD0AE"], "h")}"/></g>
<g ${B}><path d="M90.5 26 C78 20 60 21 50 29.5 V81 C60 73.5 78 72.5 90.5 77.5Z" fill="${lin(["#DDD0AE", C.paper, C.paper], "h")}"/></g>
<path d="${L}" fill="none" stroke="#9C8F74" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
<g ${Bs}><path d="M62 75.4 V93 l3.6 -3.4 l3.6 3.4 V74.6Z" fill="${lin([C.blue, C.blueD])}"/></g>`;
});

add("crayons", "Hộp sáp màu", "crayons box", ({ lin }) => {
  const cols = [[C.red, C.redD], [C.yellow, C.yellowD], [C.green, C.greenD], [C.blue, C.blueD], [C.purple, C.purpleD]];
  const tops = [30, 22, 27, 20, 31];
  const cr = cols
    .map((c, i) => {
      const x = +(25.5 + i * 10.2).toFixed(1);
      const t = tops[i];
      return `<path d="M${x} ${t} h9 V66 h-9Z M${x + 1.2} ${t} L${x + 3} ${t - 9} h3 L${x + 7.8} ${t}Z" fill="${lin([c[0], c[0], c[1]], "h")}"/>
<rect x="${x}" y="${t + 7}" width="9" height="1.6" fill="#000" opacity=".2"/><rect x="${x}" y="${t + 11}" width="9" height="1.6" fill="#000" opacity=".2"/>`;
    })
    .join("");
  return `<g ${Bs}>${cr}</g>
<g ${B}><path d="M19 47 Q50 60 81 47 V86 a5 5 0 0 1 -5 5 H24 a5 5 0 0 1 -5 -5Z" fill="${lin([C.orange, C.orangeD])}"/></g>
<g ${Bs}><rect x="31" y="64" width="38" height="19" rx="4" fill="${lin([C.paper, C.paperD])}"/></g>
<g fill="none" stroke-width="2.3" stroke-linecap="round"><path d="M38 79 Q50 62 62 79" stroke="${C.redM}"/><path d="M41.6 79 Q50 67.4 58.4 79" stroke="${C.yellowM}"/><path d="M45.2 79 Q50 72.6 54.8 79" stroke="${C.blueM}"/></g>`;
});

add("scissors", "Kéo", "scissors", ({ lin }) => {
  const blade = lin([C.metalL, C.metal, C.metalD], "h");
  const red = lin([C.red, C.redM, C.redD]);
  const half = `<path d="M46 48 L50 3 Q56.5 26 55.5 48Z" fill="${blade}"/><path d="M46 47 H55.5 L58 66 H50Z" fill="${blade}"/>
<ellipse cx="54" cy="78" rx="10.5" ry="13.5" fill="none" stroke="${red}" stroke-width="6.5"/>`;
  return `<g ${B}><g transform="rotate(20 50 46) translate(100 0) scale(-1 1)">${half}</g></g>
<g ${B}><g transform="rotate(-20 50 46)">${half}</g></g>
<circle cx="50" cy="46" r="3.4" fill="${C.metalDD}"/><circle cx="49.2" cy="45.2" r="1.2" fill="${C.metalL}"/>`;
});

add("glue", "Lọ keo dán", "glue bottle", ({ lin }) => `
<g ${B}><path d="M31 47 C31 40 41 41 42 34 H58 C59 41 69 40 69 47 V83 a8 8 0 0 1 -8 8 H39 a8 8 0 0 1 -8 -8Z" fill="${lin(["#E9E2D0", C.paper, "#D9D0BA"], "h")}"/></g>
<rect x="31" y="54" width="38" height="25" fill="${lin([C.blue, C.blueD])}"/>
<path d="M50 58 C46 63.5 44.2 66.5 44.2 69.3 a5.8 5.8 0 0 0 11.6 0 C55.8 66.5 54 63.5 50 58Z" fill="${C.paper}"/>
<g ${B}><path d="M43 34 L46.5 13 Q50 7 53.5 13 L57 34Z" fill="${lin([C.orangeD, C.orange, C.orangeD], "h")}"/><rect x="40.5" y="30.5" width="19" height="6" rx="2.5" fill="${lin([C.orange, C.orangeD])}"/></g>`);

add("palette", "Bảng pha màu", "paint palette", ({ lin, rad }) => {
  const blobs = [[24, 44, C.red, C.redD], [35, 29, C.yellow, C.yellowD], [52, 24, C.green, C.greenD], [69, 29, C.blue, C.blueD], [80, 43, C.purple, C.purpleD], [28, 62, C.paper, C.creamD]];
  return `<g ${B}><path fill-rule="evenodd" d="M5 52 C5 28 25 13 50 13 C76 13 95 29 95 50 C95 72 75 88 50 88 C24 88 5 74 5 52Z M57 69 a9.5 7 0 1 0 19 0 a9.5 7 0 1 0 -19 0Z" fill="${lin([C.woodL, "#D6A066", C.wood], "d")}"/></g>
<g ${Bs}>${blobs.map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="7.6" ry="6.8" fill="${rad([a, b])}"/>`).join("")}</g>
${blobs.map(([x, y]) => `<ellipse cx="${x - 2.2}" cy="${y - 2.2}" rx="2.2" ry="1.5" fill="#fff" opacity=".45"/>`).join("")}`;
});

add("brush", "Cọ vẽ", "paintbrush", ({ lin, clip }) => {
  const br = "M25 43.5 C15 40 3 46 -5 50 C3 54 15 60 25 56.5Z";
  return `<g ${B}><g transform="rotate(-45 50 50)">
<path d="M40 43.6 L99 46.4 Q105 50 99 53.6 L40 56.4Z" fill="${lin([C.red, C.redM, C.redD])}"/>
<path d="${br}" fill="${lin(["#F2DDB4", "#CFA970"])}"/>
<g ${clip(`<path d="${br}"/>`)}><path d="M-8 38 H10 Q14 44 9.5 50 Q14 56 10 62 H-8Z" fill="${lin([C.blue, C.blueD])}"/></g>
<rect x="24" y="42.6" width="17" height="14.8" rx="1.6" fill="${lin([C.metalL, C.metal, C.metalD])}"/>
</g></g>
<g transform="rotate(-45 50 50)" fill="${C.metalDD}" opacity=".4"><rect x="28" y="42.6" width="1" height="14.8"/><rect x="36" y="42.6" width="1" height="14.8"/></g>`;
});

add("cup", "Ống cắm bút", "pencil cup holder", ({ lin }) => `
<g ${Bs}>
<g transform="rotate(13 64 50)"><rect x="59" y="12" width="11" height="52" rx="1.5" fill="${lin([C.woodL, C.wood], "h")}"/><g fill="${C.woodDD}" opacity=".7">${[18, 23, 28, 33, 38, 43].map((y, i) => `<rect x="59" y="${y}" width="${i % 2 ? 3 : 5}" height="1"/>`).join("")}</g></g>
<g transform="rotate(-24 32 52)"><path d="M28 30 a4 4 0 0 1 8 0 V64 h-8Z" fill="${lin([C.blue, C.blueD], "h")}"/><rect x="28" y="36" width="8" height="2" fill="${C.navyD}" opacity=".5"/></g>
<g transform="rotate(-8 42 50)"><rect x="37.5" y="24" width="9" height="40" fill="${lin([C.yellow, C.yellowD], "h")}"/><polygon points="37.5,24 42,11 46.5,24" fill="#EBCB9A"/><polygon points="40.4,15.6 42,11 43.6,15.6" fill="${C.dark}"/></g>
<g transform="rotate(3 52 50)"><rect x="47.5" y="19" width="9" height="45" fill="${lin([C.red, C.redD], "h")}"/><polygon points="47.5,19 52,6 56.5,19" fill="#EBCB9A"/><polygon points="50.4,10.6 52,6 53.6,10.6" fill="${C.redD}"/></g>
</g>
<g ${B}><path d="M25 50 H75 L71 86 a5 5 0 0 1 -5 4.5 H34 a5 5 0 0 1 -5 -4.5Z" fill="${lin(["#E5DAC0", C.paper, "#D6C9A8"], "h")}"/><rect x="22.5" y="46" width="55" height="7" rx="3.5" fill="${lin([C.paper, C.creamD])}"/></g>
<path d="M26.4 62 H73.6 M27.6 72 H72.4" stroke="${C.blueM}" stroke-width="1.6" opacity=".85"/>
<g fill="${C.blueM}">${[34, 42, 50, 58, 66].map((x) => `<circle cx="${x}" cy="67" r="1.7"/>`).join("")}</g>`);

add("eraser", "Cục tẩy", "eraser", ({ lin }) => `
<g ${B}><g transform="rotate(-18 50 50)">
<rect x="12" y="35" width="76" height="32" rx="8" fill="${lin([C.pink, C.pinkD])}"/>
<path d="M52 35 H80 a8 8 0 0 1 8 8 V59 a8 8 0 0 1 -8 8 H52Z" fill="${lin([C.blue, C.blueD])}"/>
</g></g>
<g ${B}><g transform="rotate(-18 50 50)"><rect x="33" y="32" width="34" height="38" rx="3" fill="${lin([C.paper, C.creamD])}"/></g></g>
<g transform="rotate(-18 50 50)"><rect x="33" y="38.6" width="34" height="2.6" fill="${C.blueM}" opacity=".75"/><rect x="33" y="60.8" width="34" height="2.6" fill="${C.blueM}" opacity=".75"/>
<polygon points="${star(50, 51.4, 5.6, 2.5)}" fill="${C.redM}"/></g>`);

// ───────────────────────── row 3
add("bus", "Xe buýt trường", "school bus", ({ lin }) => {
  const glass = lin([C.sky, C.skyD]);
  const hub = lin([C.metalL, C.metalD]);
  const wheel = (x) => `<circle cx="${x}" cy="76" r="11" fill="${C.dark}"/><circle cx="${x}" cy="76" r="5" fill="${hub}"/>`;
  return `<g ${B}><path d="M6 31 a9 9 0 0 1 9 -9 H64 a7 7 0 0 1 7 7 V44 H85 a9 9 0 0 1 9 9 V72 a3 3 0 0 1 -3 3 H9 a3 3 0 0 1 -3 -3Z" fill="${lin([C.yellow, C.yellowM, C.yellowD])}"/></g>
${[12, 24.5, 37, 49.5].map((x) => `<rect x="${x}" y="28" width="10" height="15" rx="2" fill="${glass}"/>`).join("")}
<rect x="62" y="29" width="7" height="36" rx="2" fill="${glass}"/><path d="M65.5 29 V65" stroke="${C.yellowD}" stroke-width="1"/>
<rect x="6" y="49.5" width="54" height="2.4" fill="${C.darkD}" opacity=".85"/>
<rect x="6" y="56.5" width="54" height="1.7" fill="${C.darkD}" opacity=".55"/>
<path d="M75 50 H88 M75 54.5 H89.5" stroke="${C.yellowD}" stroke-width="1.4"/>
<ellipse cx="91.5" cy="61" rx="2.1" ry="3.2" fill="#FFF6D0"/>
<g ${Bs}><rect x="3.5" y="69.5" width="93" height="5.8" rx="2.9" fill="${lin([C.metal, C.metalDD])}"/></g>
<g ${Bs}>${wheel(26)}${wheel(76)}</g>`;
});

add("school", "Ngôi trường", "school house building", ({ lin }) => {
  const glass = lin([C.sky, C.skyD]);
  const slate = lin(["#7F8CAB", "#4A5673"]);
  const win = (x) => `<rect x="${x}" y="60" width="13" height="15" rx="1.5" fill="${glass}"/><path d="M${x + 6.5} 60 v15 M${x} 67.5 h13" stroke="${C.paper}" stroke-width="1.3"/>`;
  return `<g ${B}><rect x="42" y="15" width="16" height="20" fill="${lin([C.paper, C.creamD])}"/><polygon points="36.5,18 50,4 63.5,18" fill="${slate}"/></g>
<path d="M50 19.5 c-3 0 -4 3 -4 6 l-1.6 2.6 h11.2 l-1.6 -2.6 c0 -3 -1 -6 -4 -6Z" fill="${C.goldM}"/><circle cx="50" cy="29.4" r="1.3" fill="${C.goldD}"/>
<g ${B}><rect x="10" y="87" width="80" height="5" rx="2" fill="${lin(["#C4BEAE", "#8E887A"])}"/><path d="M17 88 V51 L50 30 L83 51 V88Z" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<g ${B}><path d="M7 53.5 L50 25 L93 53.5 L88 58.5 L50 33.5 L12 58.5Z" fill="${slate}"/></g>
<circle cx="50" cy="46.5" r="5.6" fill="${C.paper}" stroke="${C.goldD}" stroke-width="1.5"/><path d="M50 46.5 V42.9 M50 46.5 H52.8" stroke="${C.darkD}" stroke-width="1.1" stroke-linecap="round"/>
${win(23)}${win(64)}
<g ${Bs}><path d="M41.5 88 V71 a8.5 8.5 0 0 1 17 0 V88Z" fill="${lin([C.woodL, C.wood, C.woodD])}"/></g>
<path d="M50 62.8 V88" stroke="${C.woodDD}" stroke-width="1"/><circle cx="47.6" cy="77" r="1" fill="${C.gold}"/><circle cx="52.4" cy="77" r="1" fill="${C.gold}"/>
<g ${Bs}><rect x="37" y="86.5" width="26" height="4" rx="1.2" fill="${lin([C.paper, C.creamD])}"/></g>`;
});

add("bell", "Chuông tay", "hand bell", ({ lin }) => `
<g ${B}><g transform="rotate(-14 50 50)">
<rect x="44.5" y="4" width="11" height="27" rx="5.5" fill="${lin([C.woodD, C.woodL, C.wood, C.woodDD], "h")}"/>
<rect x="42.5" y="27" width="15" height="6.5" rx="2.4" fill="${lin([C.gold, C.goldD])}"/>
<circle cx="50" cy="87.5" r="5.6" fill="${lin([C.goldM, C.goldD])}"/>
</g></g>
<g ${B}><g transform="rotate(-14 50 50)">
<path d="M50 32 C36 32 32.5 47 30.5 62 C29.5 70 24.5 76 18 81 H82 C75.5 76 70.5 70 69.5 62 C67.5 47 64 32 50 32Z" fill="${lin(["#B27C1E", C.goldM, "#FCE595", C.gold, "#A9741A"], "h")}"/>
<rect x="14.5" y="78" width="71" height="7.5" rx="3.75" fill="${lin(["#B27C1E", C.gold, "#FCE595", C.goldM, "#A9741A"], "h")}"/>
</g></g>`);

add("chalkboard", "Bảng đen", "chalkboard blackboard", ({ lin }) => `
<g ${B}><rect x="7" y="15" width="86" height="64" rx="4.5" fill="${lin([C.woodL, C.wood, C.woodD], "d")}"/></g>
<rect x="13.5" y="21.5" width="73" height="51" rx="2" fill="${lin(["#5F957A", "#3D6E58"], "d")}"/>
<rect x="13.5" y="21.5" width="73" height="3" fill="#000" opacity=".16"/>
<ellipse cx="62" cy="64" rx="15" ry="3" fill="#fff" opacity=".09"/>
<g fill="none" stroke="${C.paper}" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" opacity=".93">
<path d="M23 57 L30 34 L37 57 M25.6 49 H34.4"/>
<path d="M44 34 V57 M44 34 H49.6 a5.4 5.4 0 0 1 0 10.8 H44 M49.6 44.8 H50.8 a6.1 6.1 0 0 1 0 12.2 H44"/>
<path d="M78 39 a11.6 11.6 0 1 0 0 13.4"/>
</g>
<g ${Bs}>
<rect x="11" y="76.5" width="78" height="5.5" rx="2.2" fill="${lin([C.woodL, C.woodD])}"/>
<rect x="22" y="72.8" width="12" height="3.8" rx="1.3" fill="${C.paper}"/><rect x="37" y="72.8" width="8.5" height="3.8" rx="1.3" fill="${C.pink}"/>
<rect x="60" y="69.6" width="17" height="7" rx="1.6" fill="${lin([C.wood, C.woodD])}"/>
</g>
<rect x="60" y="74.4" width="17" height="2.2" rx="1" fill="#D9D2C4"/>`);

add("clock", "Đồng hồ báo thức", "alarm clock", ({ lin, rad }) => {
  const bell = lin([C.gold, C.goldM, C.goldD]);
  const ticks = Array.from({ length: 12 }, (_, i) => `<rect x="49.2" y="${i % 3 ? 35.5 : 34.5}" width="1.6" height="${i % 3 ? 3 : 5}" rx=".8" transform="rotate(${i * 30} 50 57)"/>`).join("");
  return `<g ${B}>
<path d="M30 80 L23 91 M70 80 L77 91" fill="none" stroke="${C.metalD}" stroke-width="5" stroke-linecap="round"/>
<path d="M29 29 L36 38 M71 29 L64 38" fill="none" stroke="${C.metalD}" stroke-width="3.4" stroke-linecap="round"/>
<rect x="48.4" y="9" width="3.2" height="18" fill="${C.metalD}"/><rect x="43.5" y="6" width="13" height="5.5" rx="2.75" fill="${C.metalD}"/>
<path d="M-13.5 0 A13.5 13.5 0 0 1 13.5 0Z" transform="translate(27 26) rotate(-35)" fill="${bell}"/>
<path d="M-13.5 0 A13.5 13.5 0 0 1 13.5 0Z" transform="translate(73 26) rotate(35)" fill="${bell}"/>
</g>
<g ${B}><circle cx="50" cy="57" r="31" fill="${lin([C.red, C.redM, C.redD], "d")}"/></g>
<circle cx="50" cy="57" r="24.5" fill="${rad([C.paper, "#E9DDC2"], 0.4, 0.35, 0.75)}"/>
<g fill="${C.darkD}" opacity=".8">${ticks}</g>
<path d="M50 57 L44 67.4" stroke="${C.darkD}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M50 57 V38.5" stroke="${C.darkD}" stroke-width="2.2" stroke-linecap="round"/>
<circle cx="50" cy="57" r="2.6" fill="${C.redM}"/>`;
});

add("microscope", "Kính hiển vi", "microscope", ({ lin }) => `
<g ${B}>
<rect x="20" y="82" width="62" height="9.5" rx="4.75" fill="${lin([C.blueD, C.navyD])}"/>
<path d="M67 85 C84 70 82 40 60 30" fill="none" stroke="${lin([C.blue, C.blueM, C.blueD])}" stroke-width="9.5" stroke-linecap="round"/>
</g>
<g ${Bs}>
<rect x="27" y="62" width="42" height="5.5" rx="2" fill="${lin([C.metal, C.metalDD])}"/>
<rect x="39" y="60" width="17" height="2.2" rx=".6" fill="${C.sky}"/>
<circle cx="73" cy="59" r="6.8" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/>
</g>
<circle cx="73" cy="59" r="2.2" fill="${C.metalDD}" opacity=".7"/>
<g ${B}><g transform="rotate(-23 46 34)">
<rect x="43" y="49" width="6" height="10" rx="1" fill="${lin([C.metalL, C.metalD], "h")}"/>
<rect x="40" y="45.5" width="12" height="5.5" rx="1.5" fill="${lin([C.metal, C.metalDD], "h")}"/>
<rect x="39" y="12" width="14" height="35" rx="3" fill="${lin(["#A5BDF0", C.blueM, C.blueD], "h")}"/>
<rect x="41.5" y="3" width="9" height="11" rx="2" fill="${lin([C.metal, C.metalDD], "h")}"/>
</g></g>`);

add("flask", "Bình thí nghiệm", "flask chemistry beaker", ({ lin, clip }) => {
  const body = "M41 14 V36 L17.5 79 a7.5 7.5 0 0 0 6.5 11.5 H76 a7.5 7.5 0 0 0 6.5 -11.5 L59 36 V14Z";
  return `<path d="${body}" fill="#DCECF6" fill-opacity=".26"/>
<g ${B}><g ${clip(`<path d="${body}"/>`)}><rect x="8" y="59" width="84" height="36" fill="${lin(["#96E2B6", "#4BB08E", "#31836D"])}"/></g></g>
<ellipse cx="50" cy="59" rx="20.4" ry="3.2" fill="#C8F3D7" opacity=".9"/>
<g fill="#fff" opacity=".55"><circle cx="41" cy="72" r="3.2"/><circle cx="56" cy="78" r="2.3"/><circle cx="51" cy="67" r="1.7"/><circle cx="62" cy="70" r="1.4"/></g>
<g fill="none" stroke="#DDF3E6" stroke-width="1.2" opacity=".8"><circle cx="47" cy="47" r="2.4"/><circle cx="53" cy="38" r="1.7"/><circle cx="49" cy="27" r="1.3"/></g>
<path d="${body}" fill="none" stroke="#D6E8F3" stroke-width="2.6" stroke-linejoin="round"/>
<g ${Bs}><rect x="37" y="9.5" width="26" height="6.5" rx="3.25" fill="#E6F1F8"/></g>
<path d="M36.5 50 L26 72" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>
<path d="M63 62 h5 M65 69 h6 M68 76 h6" stroke="#fff" stroke-width="1.3" opacity=".6"/>`;
});

add("calculator", "Máy tính bỏ túi", "calculator", ({ lin }) => {
  const key = lin([C.paper, C.creamD]);
  const op = lin([C.orange, C.orangeD]);
  const eq = lin([C.teal, C.tealD]);
  const clr = lin([C.red, C.redD]);
  const xs = [29.5, 40.5, 51.5, 62.5];
  const ys = [41, 53, 65, 77];
  const keys = ys.map((y, r) => xs.map((x, c) => `<rect x="${x}" y="${y}" width="8.6" height="8.4" rx="2.6" fill="${c === 3 ? (r === 3 ? eq : op) : r === 0 && c === 0 ? clr : key}"/>`).join("")).join("");
  return `<g ${B}><rect x="22" y="8" width="56" height="84" rx="9" fill="${lin(["#8492C6", "#5C6AA0", C.navy], "d")}"/></g>
<rect x="28.5" y="15.5" width="43" height="19" rx="3.5" fill="${lin(["#A9C79E", "#CFE3C4"])}"/>
<rect x="28.5" y="15.5" width="43" height="3" rx="1.5" fill="#000" opacity=".12"/>
<path d="M51 21.5 V30 M55 21.5 h4.6 v4.2 h-4.6 v4.3 h4.6 M63 21.5 h4.6 v8.5 h-4.6 M63 25.7 h4.6" fill="none" stroke="#3C5237" stroke-width="1.5" stroke-linecap="square"/>
<g ${Bs}>${keys}</g>`;
});

// ───────────────────────── row 4
add("lunchbox", "Hộp cơm trưa", "lunch box", ({ lin, rad }) => `
<g ${B}><path d="M35 38 V27 a8 8 0 0 1 8 -8 H57 a8 8 0 0 1 8 8 V38" fill="none" stroke="${C.metal}" stroke-width="5.5" stroke-linecap="round"/></g>
<g ${B}><rect x="11" y="35" width="78" height="52" rx="10" fill="${lin([C.red, C.redM, C.redD])}"/></g>
<rect x="17" y="39.5" width="66" height="3.6" rx="1.8" fill="#fff" opacity=".2"/>
<path d="M11 54 H89" stroke="${C.redD}" stroke-width="2.2" opacity=".75"/>
<g ${Bs}><rect x="24" y="48.5" width="9.5" height="12" rx="2.2" fill="${lin([C.metalL, C.metalD])}"/><rect x="66.5" y="48.5" width="9.5" height="12" rx="2.2" fill="${lin([C.metalL, C.metalD])}"/>
<rect x="36" y="60.5" width="28" height="20" rx="4.5" fill="${lin([C.paper, C.paperD])}"/></g>
<circle cx="50" cy="71.5" r="5.4" fill="${rad(["#F58578", C.redD])}"/>
<path d="M50 66.4 q.6 -2.6 2.2 -3.6" fill="none" stroke="${C.woodD}" stroke-width="1.3" stroke-linecap="round"/>
<path d="M51.4 64.6 q4 -2.6 6 -.4 q-2.6 2.8 -6 .4Z" fill="${C.greenM}"/>`);

add("milk", "Hộp sữa", "milk carton", ({ lin }) => `
<g ${B}>
<polygon points="33,26 69,26 69,18 33,18" fill="${lin([C.blueM, C.blueD])}"/>
<polygon points="26,41 62,41 69,26 33,26" fill="${lin([C.blue, C.blueM])}"/>
<polygon points="62,41 76,35 69,26" fill="${C.blueD}"/>
<polygon points="62,41 76,35 76,85 62,91" fill="${lin(["#DDD5C0", "#C2B89E"])}"/>
<rect x="26" y="41" width="36" height="50" fill="${lin([C.paper, "#E9E1CC"])}"/>
</g>
<path d="M26 71 Q35 64.5 44 71 T62 71 V91 H26Z" fill="${lin([C.blue, C.blueD])}"/>
<polygon points="62,71 76,65 76,85 62,91" fill="${C.blueD}"/>
<g ${Bs}><circle cx="44" cy="56" r="7.6" fill="${lin([C.blue, C.blueD])}"/></g>
<path d="M44 51 C41.6 54.4 40.4 56.2 40.4 57.9 a3.6 3.6 0 0 0 7.2 0 C47.6 56.2 46.4 54.4 44 51Z" fill="${C.paper}"/>`);

add("plane", "Máy bay giấy", "paper airplane", ({ lin }) => `
<path d="M10 80 C20 90 31 88 39 79" fill="none" stroke="${C.skyD}" stroke-width="1.9" stroke-dasharray="3 3.4" stroke-linecap="round" opacity=".8"/>
<g ${B}>
<polygon points="94,10 68,80 50,64" fill="${lin(["#EDE3CA", "#CFC3A2"])}"/>
<polygon points="38,58 94,10 50,64 46,88" fill="${lin(["#C4B692", "#A3956F"])}"/>
<polygon points="6,40 94,10 38,58" fill="${lin(["#FFFBF0", "#E6DCC2"], "d")}"/>
</g>`);

add("diploma", "Bằng khen", "diploma scroll certificate", ({ lin }) => `
<g ${B}><g transform="rotate(-16 50 50)">
<ellipse cx="13" cy="50" rx="5" ry="14" fill="${lin(["#E0D3B0", "#BFAF86"])}"/>
<rect x="13" y="36" width="74" height="28" fill="${lin(["#FFFBF0", C.paper, "#D9CBA6"])}"/>
<ellipse cx="87" cy="50" rx="5" ry="14" fill="${lin([C.paper, "#E2D6B6"], "h")}"/>
</g></g>
<g transform="rotate(-16 50 50)" fill="none" stroke="#B5A47A" stroke-width="1"><ellipse cx="87" cy="50" rx="2.6" ry="8.5"/><ellipse cx="87" cy="50" rx="5" ry="14" opacity=".7"/></g>
<g ${B}><g transform="rotate(-16 50 50)">
<rect x="43.5" y="34.6" width="11" height="30.8" rx="1.5" fill="${lin([C.red, C.redD])}"/>
<path d="M47 52 L40.5 70 L46 67.6 L48.6 73 L51 53Z" fill="${C.redM}"/><path d="M51 52 L57.5 70 L52.4 67.8 L50 73Z" fill="${C.redD}"/>
<path d="M49 50 C42 39.5 31.5 42 32.6 50 C33.6 57.6 43 55.4 49 50Z" fill="${lin([C.red, C.redM])}"/>
<path d="M49 50 C56 39.5 66.5 42 65.4 50 C64.4 57.6 55 55.4 49 50Z" fill="${lin([C.red, C.redM])}"/>
<circle cx="49" cy="50" r="3.8" fill="${C.redD}"/>
</g></g>`);

add("medal", "Huy chương", "medal award", ({ lin }) => `
<g ${B}><polygon points="22,5 41,5 57,45 40,49" fill="${lin([C.blueM, C.blueD])}"/></g>
<polygon points="29.6,5 34.4,5 50.6,46.6 46,47.6" fill="${C.paper}" opacity=".9"/>
<g ${B}><polygon points="78,5 59,5 43,45 60,49" fill="${lin([C.blue, C.blueM])}"/></g>
<polygon points="70.4,5 65.6,5 49.4,46.6 54,47.6" fill="${C.paper}" opacity=".9"/>
<g ${B}><rect x="44" y="41" width="12" height="7" rx="2.5" fill="${lin([C.gold, C.goldD])}"/><circle cx="50" cy="68" r="25" fill="${lin(["#FCE595", C.gold, C.goldM, C.goldD], "d")}"/></g>
<circle cx="50" cy="68" r="19.5" fill="none" stroke="#A9741A" stroke-width="1.5" opacity=".5"/>
<g ${Bs}><polygon points="${star(50, 68.6, 13, 5.6)}" fill="${lin(["#FFF3BF", C.gold])}"/></g>`);

add("test", "Bài kiểm tra điểm A+", "test paper exam grade", ({ lin }) => `
<g ${B}><g transform="rotate(-7 50 50)">
<path d="M23 9 H65 L80 24 V88 a3 3 0 0 1 -3 3 H23 a3 3 0 0 1 -3 -3 V12 a3 3 0 0 1 3 -3Z" fill="${lin([C.paper, "#EDE3C8"], "d")}"/>
<path d="M65 9 V21 a3 3 0 0 0 3 3 H80Z" fill="#D5C7A2"/>
</g></g>
<g transform="rotate(-7 50 50)">
<rect x="27" y="18" width="22" height="2.6" rx="1.3" fill="#6F7A94" opacity=".75"/>
<rect x="27" y="25" width="15" height="2.6" rx="1.3" fill="#6F7A94" opacity=".5"/>
<g fill="#8FA3C8" opacity=".7">${[50, 57.5, 65, 72.5, 80].map((y, i) => `<rect x="27" y="${y}" width="${i === 4 ? 27 : 46}" height="2.2" rx="1.1"/>`).join("")}</g>
<g fill="none" stroke="${C.redM}" stroke-linecap="round" stroke-linejoin="round">
<path d="M50.5 42 L56 27 L61.5 42 M52.6 36.6 H59.4 M68 29.5 V37.5 M64 33.5 H72" stroke-width="2.8"/>
<ellipse cx="61" cy="34.5" rx="15.5" ry="11.5" transform="rotate(-8 61 34.5)" stroke-width="1.7" opacity=".85"/>
</g></g>`);

add("compass", "Com-pa", "drawing compass", ({ lin }) => {
  const m = lin([C.metalL, C.metal, C.metalD], "h");
  return `<path d="M58 92 Q72 93.5 81 83" fill="none" stroke="${C.blueM}" stroke-width="1.8" stroke-dasharray="3 2.6" stroke-linecap="round"/>
<path d="M36.5 54 Q50 47 62 54" fill="none" stroke="${C.metalD}" stroke-width="2.4"/>
<g ${B}>
<rect x="46.8" y="3" width="6.4" height="13" rx="2" fill="${m}"/>
<polygon points="44.6,18 52.4,20.4 32,80.6 26.4,78.4" fill="${m}"/>
<polygon points="55.4,18 47.6,20.4 65.4,72.4 71.2,70.2" fill="${m}"/>
<polygon points="26.4,78.4 32,80.6 26.6,92" fill="${C.metalD}"/>
<g transform="rotate(-19 70 76)"><rect x="66.5" y="64" width="7" height="16" rx="1" fill="${lin([C.yellow, C.yellowD], "h")}"/><polygon points="66.5,80 73.5,80 70,88.5" fill="#EBCB9A"/><polygon points="68.7,85.4 71.3,85.4 70,88.5" fill="${C.dark}"/></g>
<circle cx="50" cy="18.5" r="6.8" fill="${lin([C.gold, C.goldM, C.goldD], "d")}"/>
</g>
<circle cx="50" cy="18.5" r="2.3" fill="${C.goldD}"/>`;
});

add("setsquare", "Ê-ke", "set square triangle ruler", ({ lin }) => {
  const tb = Array.from({ length: 15 }, (_, i) => `<rect x="${20 + i * 4}" y="${i % 2 ? 85 : 82.5}" width="1" height="${i % 2 ? 3 : 5.5}"/>`).join("");
  const tl = Array.from({ length: 13 }, (_, i) => `<rect x="14" y="${30 + i * 4}" width="${i % 2 ? 3 : 5.5}" height="1"/>`).join("");
  return `<g ${B}><g transform="rotate(-6 50 52)"><path fill-rule="evenodd" d="M14 14 L88 88 H14Z M26.5 43 V75.5 H59Z" fill="${lin(["#B4E6E0", "#69B9B3"], "d")}" fill-opacity=".93" stroke="#69B9B3" stroke-width="3" stroke-linejoin="round"/></g></g>
<g transform="rotate(-6 50 52)" fill="${C.tealD}" opacity=".85">${tb}${tl}</g>`;
});

// ───────────────────────── row 5
add("desk", "Bàn học", "school desk", ({ lin, rad }) => `
<g ${B}>
<path d="M25 57 L19 90 M75 57 L81 90" fill="none" stroke="${C.metalD}" stroke-width="4.6" stroke-linecap="round"/>
<path d="M22.5 75 H77.5 V78.4 H22.5Z" fill="${C.metalD}"/>
</g>
<g ${B}><rect x="17" y="43" width="66" height="17" rx="3.5" fill="${lin([C.woodL, C.wood])}"/></g>
<rect x="22.5" y="48.5" width="55" height="8.5" rx="2" fill="#57371E"/>
<rect x="27" y="51" width="23" height="6" rx="1" fill="${C.blueM}"/><rect x="29" y="52.4" width="19" height="1.4" fill="${C.paper}" opacity=".8"/>
<rect x="53" y="52.6" width="17" height="4.4" rx="1" fill="${C.redM}"/>
<g ${B}><rect x="9" y="35" width="82" height="9.5" rx="4.5" fill="${lin([C.woodL, "#D6A066", C.woodD])}"/></g>
<g ${Bs}>
<circle cx="70" cy="27.6" r="7.8" fill="${rad(["#F58578", C.redD])}"/>
<path d="M71.4 18.6 q5 -4.4 8.6 -1.4 q-3.4 4.6 -8.6 1.4Z" fill="${C.greenM}"/>
<rect x="24" y="30.6" width="24" height="4.6" fill="${lin([C.yellow, C.yellowD])}"/><polygon points="24,30.6 24,35.2 17.5,32.9" fill="#EBCB9A"/><rect x="48" y="30.6" width="4.4" height="4.6" rx="1" fill="${C.pinkD}"/>
</g>
<path d="M70 21 q.6 -3 2.4 -4.4" fill="none" stroke="${C.woodD}" stroke-width="1.6" stroke-linecap="round"/>`);

add("pen", "Bút máy", "fountain pen", ({ lin }) => `
<g ${B}><g transform="rotate(-45 50 50) translate(-2.5 0)">
<path d="M27 43.6 L1 50 L27 56.4Z" fill="${lin(["#FCE595", C.gold, C.goldD])}"/>
<path d="M39 42.4 L27 44 V56 L39 57.6Z" fill="${lin([C.dark, C.darkD])}"/>
<path d="M39 42 H97 a7 8 0 0 1 0 16 H39Z" fill="${lin([C.teal, C.tealM, C.tealD])}"/>
<rect x="62" y="42" width="3.6" height="16" fill="${lin([C.gold, C.goldD])}"/>
<rect x="39" y="42" width="2.6" height="16" fill="${lin([C.gold, C.goldD])}"/>
<rect x="67" y="39.4" width="29" height="3.4" rx="1.7" fill="${lin([C.gold, C.goldD])}"/>
</g></g>
<g transform="rotate(-45 50 50) translate(-2.5 0)">
<path d="M3 50 H17" stroke="${C.goldD}" stroke-width="1"/><circle cx="18" cy="50" r="1.6" fill="${C.goldD}"/>
<rect x="45" y="44.6" width="50" height="2.2" rx="1.1" fill="#fff" opacity=".25"/>
</g>`);

add("ink", "Lọ mực", "ink bottle", ({ lin }) => `
<g ${B}><path d="M23 53 C23 45 34 43.5 38 40.5 V32 H62 V40.5 C66 43.5 77 45 77 53 V80 a10 10 0 0 1 -10 10 H33 a10 10 0 0 1 -10 -10Z" fill="${lin(["#7F97DA", C.blueD, "#324680"], "d")}"/></g>
<path d="M29 55 V78" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".28"/>
<g ${Bs}><rect x="35" y="55" width="32" height="24" rx="2.6" fill="${lin([C.paper, C.paperD])}"/></g>
<path d="M51 59 L56.4 67.6 L51 75.6 L45.6 67.6Z" fill="${C.navy}"/><path d="M51 66 V75" stroke="${C.paper}" stroke-width="1"/><circle cx="51" cy="65.6" r="1.3" fill="${C.paper}"/>
<g ${B}><rect x="33.5" y="14" width="33" height="19" rx="4" fill="${lin(["#7A6D75", C.dark, C.darkD])}"/></g>
<path d="M40 17.5 V30 M45 17.5 V30 M50 17.5 V30 M55 17.5 V30 M60 17.5 V30" stroke="#000" stroke-width="1.4" opacity=".28"/>`);

add("sharpener", "Gọt bút chì", "pencil sharpener", ({ lin }) => `
<path d="M66 83 C72 73 90 75 89 86 C88 94 77 94 76.5 87.5 C76.2 83.5 80.5 82 83 85" fill="none" stroke="#EBCB9A" stroke-width="4.6" stroke-linecap="round"/>
<path d="M64.5 81 C71 70.6 92 73 91.2 86" fill="none" stroke="${C.redM}" stroke-width="1.2" stroke-linecap="round"/>
<g ${B}>
<polygon points="14,43 25,27 84,27 73,43" fill="${lin(["#F79A8E", C.red])}"/>
<polygon points="73,43 84,27 84,59 73,75" fill="${lin([C.redM, C.redD])}"/>
<rect x="14" y="43" width="59" height="32" rx="3" fill="${lin([C.red, C.redM, C.redD])}"/>
</g>
<ellipse cx="78.5" cy="51" rx="3" ry="7" fill="${C.darkD}" opacity=".8"/>
<g ${Bs}><polygon points="29,40 36,30 71,30 64,40" fill="${lin([C.metalL, C.metal, C.metalD], "d")}"/></g>
<ellipse cx="50" cy="35" rx="2.6" ry="1.9" fill="${C.metalDD}"/>
<rect x="20" y="48" width="47" height="3" rx="1.5" fill="#fff" opacity=".18"/>
<circle cx="31" cy="62" r="6.6" fill="${C.redD}"/><circle cx="31.6" cy="62.6" r="5" fill="${C.darkD}"/>`);

add("paperclip", "Kẹp giấy", "paper clip", ({ lin }) => `
<g ${Bs}><g transform="rotate(38 50 50) translate(50 49.5) scale(1.3) translate(-50 -49.5)">
<path d="M62 36 V68 A12 12 0 0 1 38 68 V28 A9 9 0 0 1 56 28 V64 A6 6 0 0 1 44 64 V36" fill="none" stroke="${lin([C.metalL, C.metal, C.metalD], "d")}" stroke-width="4.2" stroke-linecap="round"/>
</g></g>`);

add("pushpin", "Đinh ghim", "pushpin thumbtack", ({ lin }) => `
<g ${Bs}><g transform="rotate(32 50 50)"><polygon points="48,52 52,52 50.5,95 49.5,95" fill="${lin([C.metalL, C.metalD], "h")}"/></g></g>
<g ${B}><g transform="rotate(32 50 50)">
<path d="M29 52 C29 44 40 42.5 42.5 39 H57.5 C60 42.5 71 44 71 52 a21 5.5 0 0 1 -42 0Z" fill="${lin([C.redD, C.red, "#F79A8E", C.redM, C.redD], "h")}"/>
<path d="M41 18 L43.5 41 H56.5 L59 18Z" fill="${lin([C.redD, C.red, "#F79A8E", C.redM, C.redD], "h")}"/>
<ellipse cx="50" cy="15" rx="20" ry="8.5" fill="${lin(["#F9A79C", C.red, C.redM])}"/>
</g></g>`);

add("magnifier", "Kính lúp", "magnifying glass", ({ lin, rad }) => `
<g ${B}><g transform="rotate(45 61 61)">
<rect x="63" y="55" width="36" height="12" rx="6" fill="${lin([C.woodL, C.wood, C.woodD])}"/>
<rect x="59" y="56.2" width="9" height="9.6" rx="2" fill="${lin([C.gold, C.goldD])}"/>
</g></g>
<circle cx="40" cy="40" r="25" fill="${rad([[0, "#F2FAFF", 0.6], [1, "#8EC0E6", 0.36]], 0.36, 0.3, 0.8)}"/>
<g ${B}><circle cx="40" cy="40" r="27" fill="none" stroke="${lin([C.gold, C.goldM, C.goldD], "d")}" stroke-width="6.5"/></g>
<path d="M23.5 37 A17 17 0 0 1 37 23.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".75"/>`);

add("abacus", "Bàn tính", "abacus", ({ lin, rad }) => {
  const rows = [
    [30, C.red, C.redD, [22, 31, 40, 69, 78]],
    [43.5, C.yellow, C.yellowD, [22, 31, 60, 69, 78]],
    [57, C.green, C.greenD, [22, 31, 40, 49, 78]],
    [70.5, C.blue, C.blueD, [22, 51, 60, 69, 78]],
  ];
  return `<path d="${rows.map(([y]) => `M13 ${y} H87`).join(" ")}" stroke="${C.metal}" stroke-width="1.7"/>
${rows
  .map(([y, a, b, xs]) => {
    const f = rad([a, b], 0.36, 0.3, 0.75);
    return xs.map((x) => `<ellipse cx="${x}" cy="${y}" rx="4.2" ry="5.5" fill="${f}"/>`).join("");
  })
  .join("")}
<g ${B}><rect x="11.5" y="17.5" width="77" height="65.5" rx="6" fill="none" stroke="${lin([C.woodL, C.wood, C.woodD], "d")}" stroke-width="7"/></g>`;
});

// icons that are also Unicode emoji (u = the picker's "unified" id)
const U = {
  pencil: "270f-fe0f", backpack: "1f392", apple: "1f34e", books: "1f4da", ruler: "1f4cf", cap: "1f393",
  openbook: "1f4d6", scissors: "2702-fe0f", palette: "1f3a8", brush: "1f58c-fe0f", school: "1f3eb",
  bell: "1f514", clock: "23f0", microscope: "1f52c", diploma: "1f4dc", medal: "1f3c5", setsquare: "1f4d0",
  pen: "1f58b-fe0f", paperclip: "1f4ce", pushpin: "1f4cc", magnifier: "1f50d", abacus: "1f9ee",
};
for (const i of icons) if (U[i.key]) i.u = U[i.key];

export default icons;
