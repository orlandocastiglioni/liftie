import select from '../../select.js';

/**
 * skisaintbruno.ca/en/sliding-conditions/ server-renders the board as
 * ul.track-list lists of li.track-element rows (WordPress theme by La Grange):
 * slope, parc and lift rows, for the north side (A, B, C and the carpets) and
 * the south side (lift D). Each row has div.track-element-col cells:
 * identifier, name (slopes and parks) or type (lifts), level, status.
 *
 * SEASON GATE. The page carries no date stamp and is NOT cleared when the
 * season ends: the 2026-05-15 Wayback capture still shows 10 trails and lifts
 * "Open" with 10 degrees in the forecast. It is reset to all-closed before the
 * next season (2026-11-17), but in between a stale spring board would publish.
 * With no stamp to read, the gate is the calendar: nothing is published in
 * May-October. A 200 m hill on the edge of Montreal does not open before
 * December or run into May, so the gate can never blank a ski day; it costs
 * only the honest "all closed" board of the autumn.
 */
const OFF_SEASON = new Set([4, 5, 6, 7, 8, 9]); // May through October

export function inSeason(now = new Date()) {
  return !OFF_SEASON.has(now.getMonth());
}

export function col(row, name) {
  const cell = select(row, `.track-element-col.${name}`)[0];
  return text(cell);
}

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'svg') {
    return '';
  }
  return (node.children ?? []).map(text).join('').replace(/\s+/g, ' ').trim();
}

export function rows(dom, kind) {
  return select(dom, `li.track-element.${kind}`).filter(row => !row.attribs.class.includes('listing-header'));
}
