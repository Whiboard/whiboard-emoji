// Signs and symbols, batch 1: pictogram signs, prohibitions, warnings, phone modes, gender marks.
import type { Icon } from "../kit.ts";
import { readFileSync } from "node:fs";
import { B, Bs, C } from "../kit.ts";
import { TONE, W, disc, ink, label, line, tile } from "../symkit.ts";

const NAME = Object.fromEntries(JSON.parse(readFileSync(new URL("../data/assign/symbols-1.json", import.meta.url), "utf8")).map((e) => [e.u, e.n]));
const out: Icon[] = [];
const add = (u, draw) => out.push({ u, n: NAME[u], draw });

// ── shared parts ─────────────────────────────────────────────────────────────────────────────
const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-50 -49)">${inner}</g>`;
const poly = (pts) => pts.map((p, i) => (i ? "L" : "M") + p.join(" ")).join(" ");

/** The one stick figure: head, torso, arms, legs. kind: m = man, w = woman. Centre (cx, cy), height ≈ 87 × s. */
function person(cx, cy, s, col = W, kind = "m") {
  const head = `<circle cx="50" cy="14" r="9.5" fill="${col}"/>`;
  const body =
    kind === "w"
      ? `<path d="M50 30 L66 68 H34Z" fill="${col}" stroke="${col}" stroke-width="9" stroke-linejoin="round"/>${line("M32 36 L26 60 M68 36 L74 60", { sw: 7, color: col })}${line("M43 74 V87 M57 74 V87", { sw: 8, color: col })}`
      : `<rect x="37" y="28" width="26" height="36" rx="10" fill="${col}"/>${line("M31 36 V60 M69 36 V60", { sw: 7, color: col })}${line("M43.5 62 V86 M56.5 62 V86", { sw: 11, color: col })}`;
  return at(cx, cy, s, head + body);
}
const man = (cx, cy, s, col?) => person(cx, cy, s, col, "m");
const woman = (cx, cy, s, col?) => person(cx, cy, s, col, "w");

/** Suitcase in the glyph colour, bands in `det`. */
const bag = (cx, cy, s, det = C.blueD, bands = true, col = W) =>
  at(
    cx,
    cy,
    s,
    `${line("M38 38 V28 Q38 22 44 22 H56 Q62 22 62 28 V38", { sw: 7, color: col })}<rect x="20" y="36" width="60" height="46" rx="9" fill="${col}"/>${bands ? line("M36 46 V72 M64 46 V72", { sw: 6, color: det }) : ""}`,
  ).replace(/translate\(-50 -49\)/, "translate(-50 -52)");


// prohibition: paper disc, red ring, slash; the dark pictogram sits under the slash
const D = C.dark;
const pg = (inner, s = 0.6) => `<g transform="translate(50 50) scale(${s}) translate(-50 -50)">${inner}</g>`;
const prohib = (t, pict, { slash = true } = {}) =>
  `<g ${B}><circle cx="50" cy="50" r="43" fill="${t.lin([C.paper, C.paperD], "d")}"/></g>${ink(pict)}${ink(`<circle cx="50" cy="50" r="35.5" fill="none" stroke="${C.redM}" stroke-width="9"/>${slash ? line("M25 25 L75 75", { sw: 9, color: C.redM }) : ""}`)}`;

const blue = (t, glyph) => tile(t, "blue") + ink(glyph);

// ── pictogram signs (blue) ───────────────────────────────────────────────────────────────────
add("1f3e7", (t) => blue(t, label("ATM", { cy: 40, h: 24, sw: 5.6, maxW: 62 }) + `<rect x="27" y="63" width="46" height="10" rx="5" fill="${W}"/>`));
add("1f6ae", (t) =>
  blue(
    t,
    man(33, 52, 0.7) +
      `<path d="M58 50 H82 L78.5 80 H61.5Z" fill="${W}" stroke="${W}" stroke-width="5" stroke-linejoin="round"/>` +
      line("M55 43 H85", { sw: 6 }) +
      `<rect x="62" y="18" width="12" height="12" rx="3" fill="${W}" transform="rotate(20 68 24)"/>`,
  ),
);
add("1f6b0", (t) =>
  blue(
    t,
    line("M22 36 H56 Q66 36 66 46 V50", { sw: 9 }) +
      line("M38 36 V22 M28 22 H48", { sw: 7 }) +
      `<rect x="56" y="48" width="20" height="9" rx="4" fill="${W}"/>` +
      `<path d="M66 60 C59 70 57 74 57 78 A9 9 0 0 0 75 78 C75 74 73 70 66 60Z" fill="${W}"/>`,
  ),
);
add("267f", (t) =>
  blue(
    t,
    `<circle cx="44" cy="19" r="8.5" fill="${W}"/>` +
      line("M44 32 V52 H62 L70 72", { sw: 9 }) +
      line("M44 40 H58", { sw: 7 }) +
      line("M31 55 A18 18 0 1 0 56 76", { sw: 8 }),
  ),
);
add("1f6b9", (t) => blue(t, man(50, 50, 0.96)));
add("1f6ba", (t) => blue(t, woman(50, 50, 0.96)));
add("1f6bb", (t) => blue(t, man(31, 50, 0.84) + woman(69, 50, 0.84) + line("M50 22 V78", { sw: 4, color: "#C3D3F2" })));
add("1f6bc", (t) =>
  blue(
    t,
    `<circle cx="50" cy="28" r="12" fill="${W}"/>` +
      `<rect x="35" y="44" width="30" height="28" rx="12" fill="${W}"/>` +
      line("M33 48 L22 38 M67 48 L78 38", { sw: 7 }) +
      line("M42 70 L33 83 M58 70 L67 83", { sw: 8 }),
  ),
);
add("1f6be", (t) => blue(t, label("WC", { h: 34, sw: 7.4, maxW: 66 })));
add("1f6c2", (t) =>
  blue(
    t,
    `<rect x="27" y="17" width="46" height="64" rx="8" fill="${W}"/>` +
      `<circle cx="50" cy="39" r="11.5" fill="none" stroke="${C.blueD}" stroke-width="4.5"/>` +
      `<path d="M50 28 C43 35 43 43 50 50 C57 43 57 35 50 28Z" fill="none" stroke="${C.blueD}" stroke-width="3.6" stroke-linejoin="round"/>` +
      line("M38 64 H62", { sw: 5.5, color: C.blueD }),
  ),
);
add("1f6c3", (t) => blue(t, bag(50, 50, 1.2, C.blueD, false) + line("M39 62 L48 71 L66 51", { sw: 8, color: C.blueD })));
add("1f6c4", (t) => blue(t, bag(50, 41, 0.92) + `<rect x="15" y="73" width="70" height="11" rx="5.5" fill="${W}"/>` + line("M26 79 H34 M66 79 H74", { sw: 4, color: C.blueD })));
add("1f6c5", (t) =>
  blue(
    t,
    bag(38, 52, 0.96) + `<circle cx="72" cy="33" r="9" fill="none" stroke="${W}" stroke-width="7"/>` + line("M72 42 V76 M72 62 H81 M72 72 H80", { sw: 6.5 }),
  ),
);

// ── warnings ─────────────────────────────────────────────────────────────────────────────────
add("26a0-fe0f", (t) => {
  const g = t.lin(TONE.yellow, "d");
  return `<g ${B}><path d="M50 14 L88 80 H12Z" fill="${g}" stroke="${g}" stroke-width="11" stroke-linejoin="round"/></g>${ink(line("M50 38 V58", { sw: 9, color: C.darkD }) + `<circle cx="50" cy="70" r="5.2" fill="${C.darkD}"/>`)}`;
});
add("1f6b8", (t) => {
  const g = t.lin(TONE.yellow, "h");
  return `<g ${B}><g transform="rotate(45 50 50)"><rect x="19" y="19" width="62" height="62" rx="9" fill="${g}"/></g></g>${ink(man(40, 50, 0.5, C.darkD) + man(62, 58, 0.34, C.darkD))}`;
});
add("26d4", (t) => disc(t, "red") + ink(`<rect x="23" y="41" width="54" height="18" rx="6" fill="${W}"/>`));

// ── prohibitions ─────────────────────────────────────────────────────────────────────────────
add("1f6ab", (t) => prohib(t, ""));
add("1f6b3", (t) =>
  prohib(
    t,
    pg(
      `<circle cx="22" cy="64" r="14" fill="none" stroke="${D}" stroke-width="8"/><circle cx="78" cy="64" r="14" fill="none" stroke="${D}" stroke-width="8"/>` +
        line("M22 64 L40 38 H66 L78 64 M40 38 L47 64 L66 38 M60 28 H74 M32 31 H46", { sw: 7, color: D }),
      0.74,
    ),
  ),
);
add("1f6ad", (t) =>
  prohib(
    t,
    pg(
      `<rect x="16" y="60" width="68" height="16" rx="6" fill="${D}"/><rect x="62" y="60" width="22" height="16" rx="6" fill="${C.orangeD}"/>` +
        line("M30 50 C22 40 38 34 30 22 M50 50 C42 40 58 34 50 22", { sw: 7, color: D }),
      0.78,
    ),
  ),
);
add("1f6af", (t) =>
  prohib(
    t,
    pg(
      man(30, 50, 0.9, D) +
        `<rect x="56" y="22" width="16" height="16" rx="4" fill="${D}" transform="rotate(18 64 30)"/>` +
        line("M64 50 V58", { sw: 6, color: D }) +
        line("M52 82 H84", { sw: 9, color: D }),
      0.76,
    ),
  ),
);
add("1f6b1", (t) =>
  prohib(
    t,
    pg(
      line("M16 36 H48 Q60 36 60 46 V48 M26 36 V22 M14 22 H38", { sw: 8, color: D }) +
        `<rect x="50" y="46" width="20" height="9" rx="4" fill="${D}"/><path d="M60 60 C53 70 51 74 51 78 A9 9 0 0 0 69 78 C69 74 67 70 60 60Z" fill="${D}"/>`,
      0.82,
    ),
  ),
);
add("1f6b7", (t) => prohib(t, pg(man(30, 50, 0.9, D) + woman(70, 50, 0.9, D), 0.7)));
add("1f4f5", (t) =>
  prohib(
    t,
    pg(`<rect x="31" y="12" width="38" height="76" rx="10" fill="${D}"/><rect x="38" y="22" width="24" height="46" rx="3" fill="${C.paper}"/><circle cx="50" cy="78" r="4" fill="${C.paper}"/>`, 0.66),
  ),
);
add("1f51e", (t) => prohib(t, label("18", { cy: 50, h: 32, sw: 7, maxW: 52, color: D })));

// ── hazard discs ─────────────────────────────────────────────────────────────────────────────
const pol = (r, a) => `${+(50 + r * Math.cos((a * Math.PI) / 180)).toFixed(2)} ${+(50 + r * Math.sin((a * Math.PI) / 180)).toFixed(2)}`;
const blade = (a, ri, ro) => `M${pol(ri, a - 30)} L${pol(ro, a - 30)} A${ro} ${ro} 0 0 1 ${pol(ro, a + 30)} L${pol(ri, a + 30)} A${ri} ${ri} 0 0 0 ${pol(ri, a - 30)}Z`;
add("2622-fe0f", (t) => disc(t, "yellow") + ink([90, 210, 330].map((a) => `<path d="${blade(a, 14, 35)}" fill="${C.darkD}"/>`).join("") + `<circle cx="50" cy="50" r="8" fill="${C.darkD}"/>`));
add("2623-fe0f", (t) => {
  const rings = [-90, 30, 150].map((a) => `<circle cx="${pol(18, a).split(" ")[0]}" cy="${pol(18, a).split(" ")[1]}" r="11" fill="none" stroke="${C.darkD}" stroke-width="6.5"/>`).join("");
  const tails = [90, 210, 330].map((a) => line(`M${pol(8, a)} L${pol(33, a)}`, { sw: 6, color: C.darkD })).join("");
  return disc(t, "orange") + ink(rings + tails + `<circle cx="50" cy="50" r="4.5" fill="none" stroke="${C.darkD}" stroke-width="5"/>`);
});

// ── media and phone signs ────────────────────────────────────────────────────────────────────
add("1f3a6", (t) =>
  blue(
    t,
    `<circle cx="34" cy="28" r="9" fill="${W}"/><circle cx="53" cy="26" r="9" fill="${W}"/>` +
      `<rect x="20" y="38" width="42" height="34" rx="7" fill="${W}"/>` +
      `<path d="M64 52 L82 41 V70 L64 60Z" fill="${W}" stroke="${W}" stroke-width="4" stroke-linejoin="round"/>`,
  ),
);
const sun = (core, r0, r1, sw) => `<circle cx="50" cy="50" r="${core}" fill="${W}"/>` + Array.from({ length: 8 }, (_, i) => line(`M${pol(r0, i * 45)} L${pol(r1, i * 45)}`, { sw, color: W })).join("");
add("1f505", (t) => tile(t, "slate") + ink(sun(9, 22, 22.1, 7)));
add("1f506", (t) => tile(t, "slate") + ink(sun(15, 26, 38, 7)));
add("1f4f6", (t) => blue(t, [[22, 14], [37, 28], [52, 42], [67, 56]].map(([x, h]) => `<rect x="${x}" y="${79 - h}" width="11" height="${h}" rx="3.5" fill="${W}"/>`).join("") + ""));
add("1f6dc", (t) => {
  const arc = (r) => line(`M${+(50 - r * 0.7071).toFixed(2)} ${+(72 - r * 0.7071).toFixed(2)} A${r} ${r} 0 0 1 ${+(50 + r * 0.7071).toFixed(2)} ${+(72 - r * 0.7071).toFixed(2)}`, { sw: 8 });
  return blue(t, `<circle cx="50" cy="72" r="6" fill="${W}"/>` + arc(17) + arc(31) + arc(45));
});
const orange = (t, glyph) => tile(t, "orange") + ink(glyph);
add("1f4f3", (t) =>
  orange(
    t,
    `<rect x="37" y="19" width="26" height="62" rx="8" fill="${W}"/><rect x="41.5" y="27" width="17" height="38" rx="2" fill="${C.orangeD}"/>` +
      line("M27 38 V62 M17 44 V56 M73 38 V62 M83 44 V56", { sw: 6 }),
  ),
);
add("1f4f4", (t) =>
  orange(
    t,
    `<rect x="31" y="14" width="38" height="72" rx="10" fill="${W}"/><rect x="37" y="23" width="26" height="46" rx="3" fill="${C.orangeD}"/>` +
      line("M43.5 40.5 A8 8 0 1 0 56.5 40.5 M50 36 V48", { sw: 4.4 }) +
      `<circle cx="50" cy="77.5" r="3.6" fill="${C.orangeD}"/>`,
  ),
);

// ── gender signs: chunky stand-alone glyphs ──────────────────────────────────────────────────
const ringD = (cx, cy, r) => `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;
const mark = (t, d, sw = 11) => `<g ${B}>${line(d, { sw, color: t.lin(TONE.dark, "d") })}</g>`;
add("2640-fe0f", (t) => mark(t, `${ringD(50, 36, 21)} M50 57 V86 M36 73 H64`));
add("2642-fe0f", (t) => mark(t, `${ringD(38, 62, 24)} M55 45 L82 18 M58 15 H85 V42`));
add("26a7-fe0f", (t) => mark(t, `${ringD(50, 50, 15)} M61 39 L80 20 M62 17 H83 V38 M39 39 L20 20 M14 28 L28 14 M50 65 V86 M39 76 H61`, 8.5));

const __batch: Icon[] = out;

export default __batch;
