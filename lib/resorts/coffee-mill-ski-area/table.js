import select from '../../select.js';
import outOfSeason from '../../tools/season-window.js';

/**
 * coffeemillskiarea.com is a Shopify store, and its mountain report
 * (/pages/mountain-report-lift-status, new for 2026-27) renders two theme
 * "grid" tables server-side: one headed LIFTS / STATUS / VERTICAL, one headed
 * TRAILS / STATUS / DIFFICULTY. Their classes are hashed per section
 * (ai-grid-anzhznk..., ai-grid-amexkbu...) and change whenever the section is
 * rebuilt, so a table is found by its first header cell instead.
 *
 * The report carries no date at all, and the Shopify page's own updated_at
 * (/pages/<handle>.json) dates the page body, not these sections. So the rows
 * are gated on a recurring calendar window (SEASON below) rather than stale.js.
 */
export const SEASON = { from: '11-01', to: '04-15' };

export function tableByHeader(dom, label) {
  return select(dom, 'table').find(table => {
    const first = select(table, 'thead th')[0];
    return first && cellText(first).toUpperCase() === label;
  });
}

export function rowsOf(dom, label) {
  const table = tableByHeader(dom, label);
  // a lift on Wabasha's bluff never runs mid-April to October; outside the
  // window publish no rows (never "closed")
  if (!table || outOfSeason(SEASON)) {
    return [];
  }
  return select(table, 'tbody tr')
    .map(tr => select(tr, 'td').map(cellText))
    .filter(cells => cells[0] && cells[1]);
}

// the trails table pretty-prints each cell across several lines
export function cellText(node) {
  return collectText(node).replace(/\s+/g, ' ').trim();
}

function collectText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(collectText).join('');
}
