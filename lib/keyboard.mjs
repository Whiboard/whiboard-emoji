// The emoji-keyboard page used for review sheets: 8 × 5 icons, 1295 × 1214 px.
import { FILTERS } from "../kit.mjs";

const G = (inner, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${extra}>${inner}</svg>`;
const glyph = {
  search: G('<circle cx="10.5" cy="10.5" r="6.6"/><path d="M15.5 15.5 L21 21"/>', 'stroke-width="2"'),
  sticker: G('<path d="M4.5 11.6 V9.5 A5 5 0 0 1 9.5 4.5 H14.5 A5 5 0 0 1 19.5 9.5 V12.6 L12.6 19.5 H12.2"/><path d="M19.4 12.8 H16.2 a3.4 3.4 0 0 0 -3.4 3.4 V19.4"/><circle cx="6.9" cy="17.1" r="3.9"/><path d="M6.9 15.2 V19 M5 17.1 H8.8"/>', 'stroke-width="1.5"'),
  smileFill: G('<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><circle cx="8.4" cy="9.8" r="1.5" fill="#1b1b1a" stroke="none"/><circle cx="15.6" cy="9.8" r="1.5" fill="#1b1b1a" stroke="none"/><path d="M7 13.6 Q12 20 17 13.6Z" fill="#1b1b1a" stroke="none"/>'),
  cap: G('<path d="M2 9.6 L12 5 L22 9.6 L12 14.2Z"/><path d="M6.4 11.8 V16.2 C6.4 18.6 17.6 18.6 17.6 16.2 V11.8"/><path d="M22 9.6 V15.4"/>', 'stroke-width="1.7"'),
  clock: G('<circle cx="12" cy="12" r="9.6"/><path d="M12 6.4 V12 L15.6 14.2"/>'),
  smile: G('<circle cx="12" cy="12" r="9.6"/><circle cx="8.6" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="10" r="1.1" fill="currentColor" stroke="none"/><path d="M7.6 14 Q12 18.6 16.4 14"/>'),
  dog: G('<path d="M7 7.5 C9 5.6 15 5.6 17 7.5 C18.6 9 18.8 13 18 16 C17.2 19 14.6 20.6 12 20.6 C9.4 20.6 6.8 19 6 16 C5.2 13 5.4 9 7 7.5Z"/><path d="M7 7.4 C4.6 6.6 3 8.2 3 10.6 C3 12.8 4.2 14.4 5.6 14.2 M17 7.4 C19.4 6.6 21 8.2 21 10.6 C21 12.8 19.8 14.4 18.4 14.2"/><circle cx="9.6" cy="11.6" r="1" fill="currentColor" stroke="none"/><circle cx="14.4" cy="11.6" r="1" fill="currentColor" stroke="none"/><ellipse cx="12" cy="15.2" rx="1.7" ry="1.2" fill="currentColor" stroke="none"/>'),
  apple: G('<path d="M12 8 C9.4 5.6 4.4 6.8 4.4 12.4 C4.4 17 8 21.4 12 19.8 C16 21.4 19.6 17 19.6 12.4 C19.6 6.8 14.6 5.6 12 8Z"/><path d="M12 8 Q12 4.8 14.4 3.2"/>'),
  ball: G('<circle cx="12" cy="12" r="9.6"/><path d="M12 7.6 L16 10.5 L14.5 15.2 H9.5 L8 10.5Z M12 7.6 V2.6 M16 10.5 L20.8 8.6 M14.5 15.2 L17.6 19.4 M9.5 15.2 L6.4 19.4 M8 10.5 L3.2 8.6"/>'),
  car: G('<path d="M2.6 16.4 V13 L5.4 11.6 L7.6 7.6 H16.4 L18.6 11.6 L21.4 13 V16.4Z"/><path d="M6.6 11.6 H17.4"/><circle cx="7.2" cy="16.8" r="2" fill="#1b1b1a"/><circle cx="16.8" cy="16.8" r="2" fill="#1b1b1a"/>'),
  bulb: G('<path d="M8.6 15.4 C6.6 13.8 5.8 12 5.8 10 A6.2 6.2 0 0 1 18.2 10 C18.2 12 17.4 13.8 15.4 15.4 V17.8 H8.6Z"/><path d="M9.6 20.8 H14.4"/>'),
  heart: G('<path d="M12 20.4 C4.4 15 2.8 10.8 4.4 7.6 C6 4.6 10 4.6 12 8 C14 4.6 18 4.6 19.6 7.6 C21.2 10.8 19.6 15 12 20.4Z"/>'),
  flag: G('<path d="M6 21.4 V3.6"/><path d="M6 4.8 C10 2.8 13 6.8 18.4 4.8 V13 C13 15 10 11 6 13"/>'),
  back: G('<path d="M8.2 5 H20 a2.4 2.4 0 0 1 2.4 2.4 V16.6 a2.4 2.4 0 0 1 -2.4 2.4 H8.2 L1.8 12Z"/><path d="M11.6 9 L17.4 15 M17.4 9 L11.6 15"/>', 'stroke-width="2"'),
  globe: G('<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.4" ry="10"/><path d="M2 12 H22 M3.6 7.2 H20.4 M3.6 16.8 H20.4"/>', 'stroke-width="1.5"'),
  mic: G('<rect x="8.6" y="2.2" width="6.8" height="12" rx="3.4"/><path d="M5.2 11 a6.8 6.8 0 0 0 13.6 0 M12 17.8 V21.6 M8.4 21.6 H15.6"/>', 'stroke-width="1.5"'),
};

/** Which category-bar glyph lights up for each set. */
export const TAB = {
  school: "cap", smileys: "smile", smileys_people: "smile", animals_nature: "dog", food_drink: "apple",
  activities: "ball", travel_places: "car", objects: "bulb", symbols: "heart", flags: "flag",
};

const SLOTS = ["smileFill", "cap", "clock", "smile", "dog", "apple", "ball", "car", "bulb", "heart", "flag"];
const SLOT_X = [221, 307, 395, 478, 565, 650, 735, 820, 905, 990, 1075];

/** svgs: up to 40 inline <svg> strings. */
export function keyboardHtml(svgs, tab = "cap") {
  const cats = SLOTS.map((k, i) => `<span class="cat${k === tab ? " on" : ""}" style="left:${SLOT_X[i] - 43}px">${glyph[k]}</span>`).join("");
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
html,body{margin:0;background:#1b1b1a}
body{width:1295px;height:1214px;position:relative;overflow:hidden;color:#f5f3ef;
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif}
.grain{position:absolute;inset:0;opacity:.5;pointer-events:none}
.search{position:absolute;left:28px;top:30px;width:1096px;height:116px;border-radius:58px;background:#2c2c2b;display:flex;align-items:center;gap:26px;padding-left:30px;box-sizing:border-box;color:#8f8d89;font-size:50px;letter-spacing:.2px}
.search svg{width:58px;height:58px;flex:none}
.round{position:absolute;left:1149px;top:30px;width:116px;height:116px;border-radius:50%;background:#2c2c2b;display:grid;place-items:center;color:#f5f3ef}
.round svg{width:72px;height:72px}
.grid{position:absolute;left:16px;top:190px;width:1272px;display:grid;grid-template-columns:repeat(8,159px);grid-auto-rows:158px}
.st{display:grid;place-items:center}
.st svg{width:140px;height:140px;overflow:visible}
.cats{position:absolute;left:0;top:984px;width:1295px;height:86px;color:#7b7975}
.abc{position:absolute;left:46px;top:14px;font-size:46px;color:#f5f3ef;letter-spacing:.5px}
.cat{position:absolute;top:0;width:86px;height:86px;border-radius:50%;display:grid;place-items:center}
.cat svg{width:50px;height:50px}
.cat.on{background:#363635;color:#f5f3ef}
.back{position:absolute;left:1172px;top:10px;width:80px;height:66px;color:#f5f3ef}
.back svg{width:80px;height:66px}
.sys{position:absolute;top:1104px;width:84px;height:84px;color:#f5f3ef}
.sys svg{width:84px;height:84px}
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>${FILTERS}</defs></svg>
<svg class="grain" width="1295" height="1214"><filter id="pg"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="2"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .09 0 0 0 -.02"/></filter><rect width="100%" height="100%" filter="url(#pg)"/></svg>
<div class="search">${glyph.search}<span>Search Emoji</span></div>
<div class="round">${glyph.sticker}</div>
<div class="grid">${svgs.map((s) => `<div class="st">${s}</div>`).join("")}</div>
<div class="cats"><span class="abc">ABC</span>${cats}<span class="back">${glyph.back}</span></div>
<span class="sys" style="left:98px">${glyph.globe}</span>
<span class="sys" style="left:1113px">${glyph.mic}</span>
</body></html>`;
}
