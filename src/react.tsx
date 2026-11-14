/**
 * React: `<Emoji emoji="🎉" />` draws an emoji with the set's drawing.
 *
 *   import { Emoji, EmojiProvider } from "whiboard-emoji/react";
 *
 *   <EmojiProvider base="/emoji/">      // optional: where you serve dist/ from
 *     <Emoji emoji="🎉" size={32} />
 *   </EmojiProvider>
 */
import { type CSSProperties, createContext, type ImgHTMLAttributes, type ReactNode, useContext } from "react";
import { emojiUrl, toChar, toUnified } from "./index.ts";

const BaseContext = createContext<string | undefined>(undefined);

/** Sets where the drawings are loaded from for every `<Emoji>` and `<EmojiPicker>` inside. */
export function EmojiProvider({ base, children }: { base: string; children?: ReactNode }) {
  return <BaseContext.Provider value={base}>{children}</BaseContext.Provider>;
}

/** The `base` given by the nearest `<EmojiProvider>`, if any. */
export function useEmojiBase(): string | undefined {
  return useContext(BaseContext);
}

export interface EmojiProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  /** the emoji itself ("🎉") or its code points ("1f389") */
  emoji: string;
  /** side of the drawing: px as a number, or any CSS length; default "1em", the size of the text around it */
  size?: number | string;
  /** URL of the folder that holds `svg/`; default: the `<EmojiProvider>`'s, else the CDN */
  base?: string;
  /** what to show when the set has no drawing of this emoji; default: the emoji as text */
  fallback?: ReactNode;
}

/**
 * An emoji as the set's drawing: an `<img>` of its SVG, sized like a letter by default. When the
 * set has no drawing of it, the emoji itself is rendered as text (or `fallback`).
 */
export function Emoji({ emoji, size = "1em", base, fallback, alt, style, ...rest }: EmojiProps) {
  const inherited = useContext(BaseContext);
  const unified = toUnified(emoji);
  const src = unified ? emojiUrl(unified, { base: base ?? inherited }) : null;
  if (!unified || !src) return <>{fallback !== undefined ? fallback : <span>{emoji}</span>}</>;
  const box: CSSProperties = { display: "inline-block", width: size, height: size, verticalAlign: "-0.15em", ...style };
  return <img src={src} alt={alt ?? toChar(unified)} draggable={false} loading="lazy" decoding="async" style={box} {...rest} />;
}
