/**
 * Names, keywords and search for the set. Larger than the main entry (about 170 KB before
 * compression), so import it where a list or a search is shown, not everywhere an emoji is.
 */
import { META } from "./generated/meta.ts";
import { groups, toChar } from "./index.ts";

export interface EmojiInfo {
  /** code points in lower-case hex joined by "-": the name of its SVG file */
  unified: string;
  /** the emoji itself */
  char: string;
  /** English name ("party popper") */
  name: string;
  keywords: readonly string[];
  /** id of its group */
  group: string;
}

/** Every drawn emoji, in picker order. */
export const emojis: readonly EmojiInfo[] = groups.flatMap((g) =>
  g.emojis.map((unified) => {
    const [name, keywords] = META[unified] ?? [unified, ""];
    return { unified, char: toChar(unified), name, keywords: keywords ? keywords.split(", ") : [], group: g.id };
  }),
);

const byId = new Map(emojis.map((e) => [e.unified, e]));
const haystack = new Map(emojis.map((e) => [e.unified, `${e.name} ${e.keywords.join(" ")}`.toLowerCase()]));

/** Name and keywords of an emoji by its code points. */
export function info(unified: string): EmojiInfo | undefined {
  return byId.get(unified);
}

/**
 * Emoji whose name or keywords contain every word of the query: `search("party")`,
 * `search("red heart")`. Best matches first (the name is the query, starts with it, contains
 * every word), then keyword matches; picker order within each.
 */
export function search(query: string, limit = Number.POSITIVE_INFINITY): EmojiInfo[] {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const ranked: Array<[rank: number, e: EmojiInfo]> = [];
  for (const e of emojis) {
    const text = haystack.get(e.unified) ?? "";
    if (!words.every((w) => text.includes(w))) continue;
    const name = e.name.toLowerCase();
    ranked.push([name === q ? 0 : name.startsWith(q) ? 1 : words.every((w) => name.includes(w)) ? 2 : 3, e]);
  }
  // Array.prototype.sort is stable: equal ranks keep picker order
  return ranked
    .sort((a, b) => a[0] - b[0])
    .slice(0, limit)
    .map(([, e]) => e);
}
