// Reference faces: the look every other face in the set follows. Built only from facekit.ts.
import type { Icon } from "../kit.ts";
import { blush, both, brow, drop, eye, head, left, mouth, right } from "../facekit.ts";

const __batch: Icon[] = [
  { u: "1f600", n: "grinning face", draw: (t) => head(t) + both(eye.dot) + mouth.open(t) },
  { u: "1f606", n: "grinning squinting face", draw: (t) => head(t) + both(eye.squeeze, { y: 39 }) + mouth.open(t) },
  { u: "1f642", n: "slightly smiling face", draw: (t) => head(t) + both(eye.dot) + mouth.curve({ y: 66, w: 15, d: 6 }) },
  { u: "1f609", n: "winking face", draw: (t) => head(t) + left(eye.dot) + right(eye.arch, { h: 4 }) + right(brow, { by: 12 }) + mouth.curve({ y: 64, w: 17, d: 9 }) },
  { u: "1f60a", n: "smiling face with smiling eyes", draw: (t) => head(t) + both(eye.arch) + blush() + mouth.curve({ y: 63, w: 17, d: 10 }) },
  { u: "1f60d", n: "smiling face with heart-eyes", draw: (t) => head(t) + both(eye.heart, { y: 40, dx: 17, size: 23 }) + mouth.open(t, { y: 60, w: 19, d: 20, teeth: false }) },
  { u: "1f610", n: "neutral face", draw: (t) => head(t) + both(eye.dot) + mouth.flat() },
  { u: "1f62e", n: "face with open mouth", draw: (t) => head(t) + both(eye.dot, { ry: 7.4 }) + both(brow, { by: 15, arch: 4 }) + mouth.oh() },
  {
    u: "1f622",
    n: "crying face",
    draw: (t) => head(t) + both(eye.dot, { y: 43 }) + both(brow, { y: 43, tilt: -6 }) + mouth.curve({ y: 74, w: 11, d: -5 }) + drop(t, 31, 62, { s: 0.9 }),
  },
  { u: "1f620", n: "angry face", draw: (t) => head(t) + both(eye.dot, { y: 46, ry: 6 }) + both(brow, { y: 46, by: 11, tilt: 8, arch: 0 }) + mouth.curve({ y: 75, w: 12, d: -5 }) },
  { u: "1f621", n: "enraged face", draw: (t) => head(t, "red") + both(eye.dot, { y: 46, ry: 6 }) + both(brow, { y: 46, by: 11, tilt: 8, arch: 0 }) + mouth.curve({ y: 75, w: 12, d: -5 }) },
  { u: "1f62c", n: "grimacing face", draw: (t) => head(t) + both(eye.dot) + mouth.teeth() },
];

export default __batch;
