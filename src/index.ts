/**
 * Whiboard Emoji: hand-drawn emoji as SVG files and sprite sheets.
 *
 * This entry is small (the list of code points, no names): it turns an emoji into the address
 * of its drawing. Names and search are in `whiboard-emoji/catalog`, the React pieces in
 * `whiboard-emoji/react` and `whiboard-emoji/picker`.
 */
import { CELL, GROUPS, VERSION } from "./generated/ids.ts";

export { VERSION };

/**
 * Where the drawings are loaded from when no `base` is given: this version's `dist/` folder on
 * the jsDelivr CDN. To serve them yourself, copy `node_modules/whiboard-emoji/dist` (`svg/`,
 * `sprites/`) to your site and pass that folder's URL as `base`.
 */
export const DEFAULT_BASE = `https://cdn.jsdelivr.net/gh/Whiboard/whiboard-emoji@v${VERSION}/dist/`;

/** A group of the set, in emoji-picker order. */
export interface EmojiGroup {
  /** "smileys", "animals-nature", … (also the name of its sprite sheet) */
  id: string;
  label: string;
  /** cells per row of the group's sprite sheet */
  cols: number;
  /** code points of its emoji, in sheet order */
  emojis: readonly string[];
}

/** Options shared by everything that builds a URL. */
export interface BaseOptions {
  /** URL of the folder that holds `svg/` and `sprites/`; default {@link DEFAULT_BASE} */
  base?: string;
}

/** Where an emoji sits in its group's sprite sheet. */
export interface SpriteCell {
  /** URL of the sheet (WebP, one per group) */
  url: string;
  /** cells per row and rows of the sheet */
  cols: number;
  rows: number;
  /** this emoji's cell, counted from 0 */
  col: number;
  row: number;
  /** side of a cell in the sheet's own pixels */
  cell: number;
}

/** The groups of the set, in emoji-picker order. */
export const groups: readonly EmojiGroup[] = GROUPS.map(([id, label, cols, emojis]) => ({ id, label, cols, emojis: emojis.split(" ") }));

/** Code points of every drawn emoji, in picker order. */
export const unifiedList: readonly string[] = groups.flatMap((g) => g.emojis);

const place = new Map<string, { group: EmojiGroup; at: number }>();
/** code points without variation selectors → the id the set uses ("2764" → "2764-fe0f") */
const bare = new Map<string, string>();
for (const group of groups) {
  group.emojis.forEach((u, at) => {
    place.set(u, { group, at });
    bare.set(u.replace(/-fe0f/g, ""), u);
  });
}

const HEX = /^[0-9a-f]{2,6}(-[0-9a-f]{2,6})*$/i;
const withSlash = (base: string) => (base.endsWith("/") ? base : `${base}/`);

/**
 * The set's id for an emoji: its code points in lower-case hex joined by "-". Takes the emoji
 * itself ("😀", "❤️", "❤") or code points in any case ("1F600", "2764"); null when the set has
 * no drawing of it.
 */
export function toUnified(emoji: string): string | null {
  const raw = HEX.test(emoji) ? emoji.toLowerCase() : Array.from(emoji, (c) => (c.codePointAt(0) ?? 0).toString(16)).join("-");
  if (place.has(raw)) return raw;
  return bare.get(raw.replace(/-fe0f/g, "")) ?? null;
}

/** Does the set have a drawing of this emoji (the emoji itself or its code points)? */
export function has(emoji: string): boolean {
  return toUnified(emoji) !== null;
}

/** The emoji character for code points: "1f600" → "😀". */
export function toChar(unified: string): string {
  return String.fromCodePoint(...unified.split("-").map((h) => Number.parseInt(h, 16)));
}

/** The group an emoji belongs to, or undefined when the set has no drawing of it. */
export function groupOf(emoji: string): EmojiGroup | undefined {
  const u = toUnified(emoji);
  return u ? place.get(u)?.group : undefined;
}

/** URL of an emoji's SVG, or null when the set has no drawing of it. */
export function emojiUrl(emoji: string, { base = DEFAULT_BASE }: BaseOptions = {}): string | null {
  const u = toUnified(emoji);
  return u ? `${withSlash(base)}svg/${u}.svg` : null;
}

/** URL of a group's sprite sheet. */
export function spriteUrl(groupId: string, { base = DEFAULT_BASE }: BaseOptions = {}): string {
  return `${withSlash(base)}sprites/${groupId}.webp`;
}

/**
 * Where an emoji sits in its group's sprite sheet, or null when the set has no drawing of it.
 * Sheets are what to show in a picker: one image per group instead of one SVG per emoji.
 */
export function spriteCell(emoji: string, options: BaseOptions = {}): SpriteCell | null {
  const u = toUnified(emoji);
  const hit = u ? place.get(u) : undefined;
  if (!hit) return null;
  const { group, at } = hit;
  return {
    url: spriteUrl(group.id, options),
    cols: group.cols,
    rows: Math.ceil(group.emojis.length / group.cols),
    col: at % group.cols,
    row: Math.floor(at / group.cols),
    cell: CELL,
  };
}

/**
 * CSS for an element that shows an emoji from its sprite sheet at `size` px:
 * `Object.assign(el.style, spriteStyle("🎉", 32))`. Null when the set has no drawing of it.
 */
export function spriteStyle(
  emoji: string,
  size: number,
  options: BaseOptions = {},
): { width: string; height: string; backgroundImage: string; backgroundSize: string; backgroundPosition: string; backgroundRepeat: string } | null {
  const c = spriteCell(emoji, options);
  if (!c) return null;
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${c.url})`,
    backgroundSize: `${c.cols * size}px auto`,
    backgroundPosition: `-${c.col * size}px -${c.row * size}px`,
    backgroundRepeat: "no-repeat",
  };
}
