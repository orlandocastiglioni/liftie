/**
 * Helpers shared by the lift and trail parsers. Both read the same Wix
 * (wixui-table) tables on https://www.magicmtn.com/snow-report.
 */

/**
 * The "Open" column holds a check mark when open and is EMPTY when closed.
 * An empty cell renders as <div class="..."></div> with no text node, so
 * findText returns undefined - and coerce(undefined) silently yields
 * 'scheduled'. Every status therefore goes through this mapper, which emits
 * the plain tokens coerce already understands.
 */
export function cellStatus(text) {
  return text?.trim() ? 'open' : 'closed';
}

/**
 * Lift names embed a rope length that the resort edits between scrapes
 * ("Black Summit Quad 5,202'" was 5,200' in January), and a few names carry
 * stray double spaces ("Learn-to-Ski  Lift"). Strip both so the key is stable.
 */
export function cleanName(text) {
  return text
    ?.replace(/\s+[\d,]+'\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}
