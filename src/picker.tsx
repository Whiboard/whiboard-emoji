/**
 * React: a picker for the set, by group, with search.
 *
 *   import { EmojiPicker } from "@whiboard/emoji/picker";
 *   import "@whiboard/emoji/picker.css";
 *
 *   <EmojiPicker onSelect={(e) => insert(e.char)} />
 *
 * It draws every cell from the group's sprite sheet: an SVG per emoji is too slow to paint for
 * a grid of hundreds. Colours come from CSS variables (see picker.css).
 */
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { type EmojiInfo, emojis, search } from "./catalog.ts";
import { DEFAULT_BASE, emojiUrl, groups, spriteStyle } from "./index.ts";
import { useEmojiBase } from "./react.tsx";

/** What `onSelect` receives. */
export interface PickedEmoji extends EmojiInfo {
  /** URL of its SVG */
  url: string;
}

export interface EmojiPickerProps {
  onSelect: (emoji: PickedEmoji) => void;
  /** URL of the folder that holds `svg/` and `sprites/`; default: the `<EmojiProvider>`'s, else the CDN */
  base?: string;
  /** px or any CSS length; default 340 × 380 */
  width?: number | string;
  height?: number | string;
  /** side of one cell in px; default 40 */
  cellSize?: number;
  /** colours: "auto" follows the system; default "auto" */
  theme?: "light" | "dark" | "auto";
  searchPlaceholder?: string;
  /** focus the search box when the picker appears */
  autoFocus?: boolean;
  /** shown when a search finds nothing */
  emptyText?: string;
  className?: string;
  style?: CSSProperties;
}

/** A plain emoji per group for the group bar: no extra images to load. */
const GROUP_ICON: Record<string, string> = {
  smileys: "😀",
  "animals-nature": "🐻",
  "food-drink": "🍔",
  activities: "⚽",
  "travel-places": "🚗",
  objects: "💡",
  symbols: "🔣",
};

const byGroup = new Map(groups.map((g) => [g.id, emojis.filter((e) => e.group === g.id)]));

function Cell({ item, size, base, onPick }: { item: EmojiInfo; size: number; base: string; onPick: (e: EmojiInfo) => void }) {
  const art = spriteStyle(item.unified, size - 8, { base });
  return (
    <button type="button" className="we-cell" title={item.name} aria-label={item.name} data-emoji={item.unified} onClick={() => onPick(item)} style={{ width: size, height: size }}>
      <span aria-hidden style={{ display: "block", ...art }} />
    </button>
  );
}

/** One group; its cells (and so its sprite sheet) wait until the section comes near the view. */
function Section(props: { id: string; label: string; size: number; cols: number; base: string; root: { current: HTMLDivElement | null }; onPick: (e: EmojiInfo) => void; register: (id: string, el: HTMLElement | null) => void }) {
  const { id, label, size, cols, base, root, onPick, register } = props;
  const items = byGroup.get(id) ?? [];
  const ref = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver !== "function") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { root: root.current, rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, root]);
  return (
    <section
      aria-label={label}
      ref={(el) => {
        ref.current = el;
        register(id, el);
      }}
    >
      <h3 className="we-heading">{label}</h3>
      {/* the height the cells will take, so a jump to a later group lands where it will be */}
      <div className="we-cells" style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`, minHeight: Math.ceil(items.length / cols) * size }}>
        {near && items.map((it) => <Cell key={it.unified} item={it} size={size} base={base} onPick={onPick} />)}
      </div>
    </section>
  );
}

/** The set as a picker: a search box, a bar of groups and the drawings. */
export function EmojiPicker({
  onSelect,
  base,
  width = 340,
  height = 380,
  cellSize = 40,
  theme = "auto",
  searchPlaceholder = "Search emoji",
  autoFocus = false,
  emptyText = "No emoji match.",
  className,
  style,
}: EmojiPickerProps) {
  const inherited = useEmojiBase();
  const from = base ?? inherited ?? DEFAULT_BASE;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const scroller = useRef<HTMLDivElement | null>(null);
  const sections = useRef(new Map<string, HTMLElement>());
  const hits = useMemo(() => (query.trim() ? search(query) : null), [query]);
  // cells per row: as many as fit the width
  const [cols, setCols] = useState(8);
  useEffect(() => {
    const box = scroller.current;
    if (!box) return;
    const measure = () => setCols(Math.max(1, Math.floor(box.clientWidth / cellSize)));
    measure();
    if (typeof ResizeObserver !== "function") return;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [cellSize]);

  const pick = (e: EmojiInfo) => onSelect({ ...e, url: emojiUrl(e.unified, { base: from }) ?? "" });
  const register = (id: string, el: HTMLElement | null) => {
    if (el) sections.current.set(id, el);
    else sections.current.delete(id);
  };
  const jump = (id: string) => {
    setQuery("");
    setActive(id);
    // after the search results are gone and the sections are back
    requestAnimationFrame(() => {
      const el = sections.current.get(id);
      // .we-scroll is positioned (picker.css), so a section's offsetTop is measured from it
      if (el && scroller.current) scroller.current.scrollTop = el.offsetTop;
    });
  };
  const onScroll = () => {
    const box = scroller.current;
    if (!box) return;
    let at = groups[0]?.id ?? "";
    for (const g of groups) {
      const el = sections.current.get(g.id);
      if (el && el.offsetTop <= box.scrollTop + 8) at = g.id;
    }
    setActive(at);
  };

  return (
    <div className={className ? `we-picker ${className}` : "we-picker"} data-theme={theme} style={{ width, height, ...style }}>
      <input className="we-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} autoFocus={autoFocus} autoComplete="off" />
      <div className="we-groups" role="toolbar" aria-label="Groups">
        {groups.map((g) => (
          <button key={g.id} type="button" className="we-group" title={g.label} aria-label={g.label} aria-pressed={!hits && active === g.id} onClick={() => jump(g.id)}>
            {GROUP_ICON[g.id] ?? "•"}
          </button>
        ))}
      </div>
      <div className="we-scroll" ref={scroller} onScroll={onScroll}>
        {hits ? (
          hits.length > 0 ? (
            <div className="we-cells" style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}>
              {hits.map((it) => (
                <Cell key={it.unified} item={it} size={cellSize} base={from} onPick={pick} />
              ))}
            </div>
          ) : (
            <p className="we-empty">{emptyText}</p>
          )
        ) : (
          groups.map((g) => <Section key={g.id} id={g.id} label={g.label} size={cellSize} cols={cols} base={from} root={scroller} onPick={pick} register={register} />)
        )}
      </div>
    </div>
  );
}
