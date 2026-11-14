// Smileys 1: round faces from facekit parts, plus hands, halo, hearts and a melting head.
import type { Icon } from "../kit.ts";
import { Bs, B } from "../kit.ts";
import { HEART, INK, MOUTH, SKIN, blush, both, brow, drop, eye, head, heartPath, left, ln, mouth, right } from "../facekit.ts";

const HAND = ["#FFEB96", "#FBD45E", "#E3A332"];
const heart = ({ lin }, x, y, size, rot = 0) =>
  `<g ${Bs}><g transform="rotate(${rot} ${x} ${y})"><path d="${heartPath(x, y, size)}" fill="${lin(["#FA9A92", HEART, "#C23A3C"], "d")}"/></g></g>`;
// mitten hand, fingers up, centred on (x, y)
const hand = ({ lin }, x, y, rot = 0, s = 1, flip = 1) =>
  `<g ${Bs}><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * flip} ${s})"><rect x="-9" y="-11" width="18" height="22" rx="7" fill="${lin(HAND, "d")}"/><ellipse cx="-9" cy="2" rx="4" ry="7" transform="rotate(-18 -9 2)" fill="${lin(HAND, "d")}"/></g></g><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * flip} ${s})"><path d="M-3 -10 V-3 M3 -10 V-3" stroke="#B87A22" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></g>`;
const pucker = (cx = 50, y = 67) => `<ellipse cx="${cx}" cy="${y}" rx="4.6" ry="5.2" fill="${MOUTH}" stroke="#E4534E" stroke-width="2.2"/>`;
const dollar = (x, y) => ln(`M${x + 3.8} ${y - 4} C${x + 3} ${y - 8} ${x - 5} ${y - 8} ${x - 5} ${y - 3.5} C${x - 5} ${y + 1} ${x + 5} ${y} ${x + 5} ${y + 4.5} C${x + 5} ${y + 9} ${x - 3} ${y + 9} ${x - 4} ${y + 4.5} M${x} ${y - 10} V${y + 11}`, 3, "#3F7A3F");
const rot = (a, inner) => `<g transform="rotate(${a} 50 50)">${inner}</g>`;
const melt = ({ rad }) =>
  `<g ${B}><path d="M7 48 A43 43 0 0 1 93 48 C93 64 90 72 88 80 C86 92 74 92 73 82 C72 76 66 74 62 80 C58 89 48 89 46 80 C44 74 38 72 34 78 C30 89 18 91 15 80 C12 72 7 66 7 48Z" fill="${rad(SKIN.yellow, 0.38, 0.3, 0.8)}"/></g>`;

const __batch: Icon[] = [
  { u: "1f603", n: "grinning face with big eyes", draw: (t) => head(t) + both(eye.dot, { rx: 5.4, ry: 8.2 }) + both(brow, { by: 16, arch: 4 }) + mouth.open(t) },
  { u: "1f604", n: "grinning face with smiling eyes", draw: (t) => head(t) + both(eye.arch) + mouth.open(t) },
  { u: "1f601", n: "beaming face with smiling eyes", draw: (t) => head(t) + both(eye.arch, { y: 38 }) + mouth.open(t, { y: 55, w: 27, d: 18, tongue: false }) },
  { u: "1f605", n: "grinning face with sweat", draw: (t) => head(t) + both(eye.dot) + both(brow, { tilt: -5, by: 14 }) + mouth.open(t, { tongue: false }) + drop(t, 79, 24, { s: 1.1 }) },
  {
    u: "1f923",
    n: "rolling on the floor laughing",
    draw: (t) => head(t) + rot(-18, both(eye.squeeze, { y: 39 }) + mouth.open(t, { y: 57, w: 23, d: 24 })) + drop(t, 16, 44, { s: 0.9, rot: -70 }) + drop(t, 85, 62, { s: 0.9, rot: 70 }),
  },
  { u: "1f602", n: "face with tears of joy", draw: (t) => head(t) + both(eye.squeeze, { y: 39 }) + mouth.open(t) + drop(t, 17, 52, { s: 1, rot: -60 }) + drop(t, 83, 52, { s: 1, rot: 60 }) },
  { u: "1f643", n: "upside-down face", draw: (t) => head(t) + rot(180, both(eye.dot) + mouth.curve({ y: 66, w: 16, d: 7 })) },
  { u: "1fae0", n: "melting face", draw: (t) => melt(t) + both(eye.dot, { y: 40, ry: 5.5 }) + both(brow, { y: 40, tilt: -6, by: 12 }) + mouth.wavy({ y: 62, w: 14 }) },
  {
    u: "1f607",
    n: "smiling face with halo",
    draw: (t) => head(t, "yellow", 39) + both(eye.arch, { y: 44 }) + blush({ y: 60, dx: 23 }) + mouth.curve({ y: 63, w: 15, d: 8 }) + `<g ${Bs}><ellipse cx="50" cy="9" rx="20" ry="4.2" fill="none" stroke="${t.lin(["#FFE48A", "#F1BE40", "#C88A1E"], "d")}" stroke-width="4"/></g>`,
  },
  {
    u: "1f970",
    n: "smiling face with hearts",
    draw: (t) => head(t, "yellow", 39) + both(eye.arch, { y: 44 }) + blush({ y: 60, dx: 23 }) + mouth.curve({ y: 63, w: 15, d: 8 }) + heart(t, 15, 19, 21, -15) + heart(t, 85, 15, 17, 14) + heart(t, 87, 46, 13, 20),
  },
  { u: "1f929", n: "star-struck", draw: (t) => head(t) + both(eye.star, { y: 40, dx: 17, R: 13 }) + mouth.open(t, { y: 58, w: 21, d: 22 }) },
  { u: "1f618", n: "face blowing a kiss", draw: (t) => head(t) + left(eye.dot) + right(eye.arch, { h: 4 }) + blush({ y: 58 }) + pucker(46, 67) + heart(t, 78, 62, 22, 12) },
  { u: "1f617", n: "kissing face", draw: (t) => head(t) + both(eye.dot) + pucker() },
  { u: "263a-fe0f", n: "smiling face", draw: (t) => head(t) + both(eye.dot, { rx: 4.2, ry: 6 }) + blush({ y: 59, o: 0.6 }) + mouth.curve({ y: 63, w: 16, d: 9 }) },
  { u: "1f61a", n: "kissing face with closed eyes", draw: (t) => head(t) + both(eye.bowl) + blush({ y: 58 }) + pucker() },
  { u: "1f619", n: "kissing face with smiling eyes", draw: (t) => head(t) + both(eye.arch) + pucker() },
  { u: "1f972", n: "smiling face with tear", draw: (t) => head(t) + both(eye.dot, { y: 42 }) + both(brow, { y: 42, tilt: -4 }) + blush({ y: 60 }) + mouth.curve({ y: 63, w: 16, d: 8 }) + drop(t, 25, 56, { s: 0.95 }) },
  { u: "1f60b", n: "face savoring food", draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, arch: 3 }) + mouth.curve({ y: 62, w: 18, d: 9 }) + mouth.tongue({ y: 65, cx: 61, w: 6, h: 13 }) },
  { u: "1f61b", n: "face with tongue", draw: (t) => head(t) + both(eye.dot) + mouth.curve({ y: 64, w: 15, d: 6 }) + mouth.tongue({ y: 68, w: 7.5, h: 17 }) },
  { u: "1f61c", n: "winking face with tongue", draw: (t) => head(t) + left(eye.dot) + right(eye.arch, { h: 4 }) + right(brow, { by: 12 }) + mouth.curve({ y: 64, w: 15, d: 6 }) + mouth.tongue({ y: 68, w: 7.5, h: 17 }) },
  {
    u: "1f92a",
    n: "zany face",
    draw: (t) => head(t) + left(eye.wide, { r: 11.5, p: 4.4, look: [3, -3], y: 38 }) + right(eye.wide, { r: 7.5, p: 3.6, look: [-1, 2], y: 42 }) + mouth.curve({ y: 63, w: 16, d: 8 }) + mouth.tongue({ y: 68, w: 7.5, h: 18, cx: 54 }),
  },
  { u: "1f61d", n: "squinting face with tongue", draw: (t) => head(t) + both(eye.squeeze, { y: 39 }) + mouth.curve({ y: 64, w: 15, d: 6 }) + mouth.tongue({ y: 68, w: 7.5, h: 17 }) },
  { u: "1f911", n: "money-mouth face", draw: (t) => head(t) + dollar(35, 41) + dollar(65, 41) + mouth.open(t, { y: 58, w: 21, d: 20, teeth: false }) },
  {
    u: "1f917",
    n: "smiling face with open hands",
    draw: (t) => head(t, "yellow", 41) + both(eye.arch) + blush() + mouth.curve({ y: 62, w: 17, d: 9 }) + hand(t, 21, 76, 40, 1.15) + hand(t, 79, 76, -40, 1.15, -1),
  },
  { u: "1f92d", n: "face with hand over mouth", draw: (t) => head(t) + both(eye.dot, { ry: 7.4 }) + both(brow, { by: 15, arch: 4 }) + hand(t, 50, 70, 0, 1.45) },
  {
    u: "1fae2",
    n: "face with open eyes and hand over mouth",
    draw: (t) => head(t) + both(eye.wide, { r: 10, look: [0, 1] }) + both(brow, { by: 17, arch: 4, w: 8 }) + hand(t, 50, 72, 0, 1.45),
  },
  {
    u: "1fae3",
    n: "face with peeking eye",
    draw: (t) =>
      head(t) + left(eye.wide, { r: 10, look: [2, 0] }) + left(brow, { by: 17, arch: 4 }) + mouth.curve({ y: 66, w: 12, d: 3, cx: 45 }) + hand(t, 68, 43, 12, 1.7) +
      `<ellipse cx="68" cy="42" rx="5.5" ry="3" fill="${INK}"/><circle cx="66.5" cy="41" r="1.2" fill="#fff" opacity=".8"/>`,
  },
  {
    u: "1f92b",
    n: "shushing face",
    draw: (t) =>
      head(t) + both(eye.dot) + both(brow, { by: 14, arch: 3 }) +
      `<g ${Bs}><ellipse cx="55" cy="83" rx="15" ry="9" fill="${t.lin(HAND, "d")}"/><rect x="45" y="55" width="11" height="32" rx="5.5" fill="${t.lin(HAND, "h")}"/></g><path d="M50 66 V75" stroke="#B87A22" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>`,
  },
  {
    u: "1f914",
    n: "thinking face",
    draw: (t) => head(t) + both(eye.dot) + left(brow, { by: 13, arch: 3 }) + right(brow, { by: 17, arch: 5 }) + mouth.curve({ y: 65, w: 9, d: -1.5, cx: 42 }) + hand(t, 62, 79, 15, 1.35),
  },
  {
    u: "1fae1",
    n: "saluting face",
    draw: (t) => head(t) + both(eye.dot) + both(brow, { by: 14, arch: 2 }) + mouth.curve({ y: 64, w: 12, d: 5 }) + hand(t, 76, 22, -72, 1.4),
  },
  {
    u: "1f971",
    n: "yawning face",
    draw: (t) => head(t) + both(eye.squeeze, { y: 38 }) + mouth.oh({ y: 65, rx: 10.5, ry: 14 }) + hand(t, 74, 76, 22, 1.35),
  },
];

export default __batch;
