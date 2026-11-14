// The package as a consumer sees it: built files under lib/ (npm test builds them first).
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { emojis, info, search } from "../lib/catalog.js";
import { DEFAULT_BASE, emojiUrl, groupOf, groups, has, spriteCell, spriteStyle, toChar, toUnified, unifiedList, VERSION } from "../lib/index.js";
import { EmojiPicker } from "../lib/picker.js";
import { Emoji, EmojiProvider } from "../lib/react.js";

const svgs = readdirSync(new URL("../dist/svg/", import.meta.url)).filter((f) => f.endsWith(".svg"));

test("the id list is the built set", () => {
  assert.equal(unifiedList.length, svgs.length);
  assert.deepEqual([...unifiedList].sort(), svgs.map((f) => f.slice(0, -4)).sort());
  assert.equal(new Set(unifiedList).size, unifiedList.length);
  assert.equal(emojis.length, unifiedList.length);
  assert.equal(VERSION, JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version);
});

test("toUnified takes the emoji or its code points", () => {
  assert.equal(toUnified("😀"), "1f600");
  assert.equal(toUnified("1F600"), "1f600");
  // with and without the variation selector
  assert.equal(toUnified("❤️"), "2764-fe0f");
  assert.equal(toUnified("❤"), "2764-fe0f");
  assert.equal(toUnified("2764"), "2764-fe0f");
  assert.equal(toChar("2764-fe0f"), "❤️");
  // not drawn: people, flags, plain text
  assert.equal(toUnified("👍"), null);
  assert.equal(toUnified("🇻🇳"), null);
  assert.equal(toUnified("hello"), null);
  assert.equal(has("🎉"), true);
  assert.equal(has("👍"), false);
});

test("urls", () => {
  assert.match(DEFAULT_BASE, /^https:\/\/cdn\.jsdelivr\.net\/gh\/Whiboard\/whiboard-emoji@v\d+\.\d+\.\d+\/dist\/$/);
  assert.equal(emojiUrl("🎉"), `${DEFAULT_BASE}svg/1f389.svg`);
  assert.equal(emojiUrl("🎉", { base: "/emoji" }), "/emoji/svg/1f389.svg");
  assert.equal(emojiUrl("👍"), null);
});

test("sprite cells follow dist/index.json", () => {
  const index = JSON.parse(readFileSync(new URL("../dist/index.json", import.meta.url), "utf8"));
  assert.deepEqual(groups.map((g) => g.id), index.groups.map((g: { id: string }) => g.id));
  for (const g of index.groups) {
    const at = g.stickers.length - 1;
    const c = spriteCell(g.stickers[at][0], { base: "/e/" });
    assert.deepEqual(c, { url: `/e/${g.sprite}`, cols: g.cols, rows: Math.ceil(g.stickers.length / g.cols), col: at % g.cols, row: Math.floor(at / g.cols), cell: index.cell });
  }
  assert.equal(groupOf("🎉")?.id, "activities");
  const style = spriteStyle("😀", 32, { base: "/e/" });
  assert.equal(style?.backgroundPosition, "-0px -0px");
  assert.equal(style?.backgroundSize, `${(groups[0]?.cols ?? 0) * 32}px auto`);
});

test("catalog: names, keywords, search", () => {
  assert.equal(info("1f389")?.name, "party popper");
  assert.ok(info("1f389")?.keywords.includes("tada"));
  assert.deepEqual(search("tada").map((e) => e.unified), ["1f389"]);
  assert.ok(search("heart").length > 10);
  // the emoji named like the query comes before those that only mention the words
  assert.equal(search("red heart")[0]?.char, "❤️");
  assert.ok(search("red heart").length > 1);
  assert.deepEqual(search(""), []);
  assert.equal(search("heart", 3).length, 3);
});

test("<Emoji> renders the drawing, and the emoji itself when there is none", () => {
  const html = renderToStaticMarkup(createElement(Emoji, { emoji: "🎉", size: 32 }));
  assert.match(html, /^<img src="https:\/\/cdn\.jsdelivr\.net\/[^"]+\/svg\/1f389\.svg" alt="🎉"/);
  assert.match(html, /width:32px;height:32px/);
  const own = renderToStaticMarkup(createElement(EmojiProvider, { base: "/emoji/" }, createElement(Emoji, { emoji: "1f600" })));
  assert.match(own, /src="\/emoji\/svg\/1f600\.svg"/);
  assert.equal(renderToStaticMarkup(createElement(Emoji, { emoji: "👍" })), "<span>👍</span>");
  assert.equal(renderToStaticMarkup(createElement(Emoji, { emoji: "👍", fallback: "?" })), "?");
});

test("<EmojiPicker> renders the groups and a search box", () => {
  const html = renderToStaticMarkup(createElement(EmojiPicker, { onSelect: () => {}, base: "/emoji/" }));
  assert.match(html, /class="we-picker"/);
  assert.match(html, /type="search"/);
  for (const g of groups) assert.ok(html.includes(`aria-label="${g.label.replace("&", "&amp;")}"`), g.label);
});
