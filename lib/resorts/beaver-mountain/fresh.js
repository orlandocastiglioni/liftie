import select from '../../select.js';

/**
 * Beaver Mountain never resets the conditions page at season end. Fetched on
 * 2026-08-05 it still served closing-day data - 3 of 6 lifts and 33 of 48 runs
 * reading open, under a report dated 3/27/26 that opens "Happy Closing Day!".
 * Publishing that verbatim shows the mountain half open all summer.
 *
 * The report stamps itself: the "Today's Mountain Conditions" block leads with
 * an M/D/YY date. Beaver runs daily in season and rewrites this every morning,
 * so anything much older than a fortnight is last season's page, not a report.
 */
const STALE_AFTER_DAYS = 14;

function deepText(node) {
  if (Array.isArray(node)) {
    return node.map(deepText).join('');
  }
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'script' || node.name === 'style') {
    return '';
  }
  return (node.children ?? []).map(deepText).join('');
}

export default function isFresh(dom) {
  // scope to the conditions block so a date anywhere else on the page (an
  // event listing, a footer) cannot stand in for the report's own stamp
  const blocks = select(dom, '.mountain_conditions, #mountain_conditions, .conditions');
  const text = (blocks.length ? blocks.map(deepText).join(' ') : deepText(dom)).replace(/\s+/g, ' ');
  const m = text.match(/Today's Mountain Conditions\s*(\d{1,2})\/(\d{1,2})\/(\d{2,4})/i);
  if (!m) {
    return false;
  }
  const [, mm, dd, yy] = m;
  const year = yy.length === 2 ? 2000 + Number(yy) : Number(yy);
  const when = new Date(year, Number(mm) - 1, Number(dd));
  return Date.now() - when <= STALE_AFTER_DAYS * 86400000;
}
