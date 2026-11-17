import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * skiholidaymtn.com/trail-conditions-map/ (Holiday Mountain, Monticello NY -
 * not holidaymtn.com, an SEO content farm, nor holidaymountain.com, which
 * redirects to the Manitoba hill) renders two wpDataTables "simple tables"
 * server-side, each titled by an h3#wdt-table-title-N matching
 * table#wpdtSimpleTable-N: "Lifts" (Name | status image) and "Slopes" (Name |
 * difficulty image | surface text | status image). Status is only an image:
 * uploads/.../status-open.png, status-closed.png, status-book-in-advance.png.
 * Merged full-width rows are the date banner, the "Open" counter and the
 * per-lift group headings ("Quickway Triple Lift:"), and are skipped.
 *
 * The first merged row of each table dates it: in season "January 20, 2026 -
 * 9AM Report", off-season "CLOSED FOR THE SEASON". The second publishes no
 * rows (never "closed" - the statuses under it are not a report), the first is
 * gated through lib/tools/stale.js. Anything else fails open.
 */
const STATUS = { open: 'open', closed: 'closed', 'book-in-advance': 'scheduled' };
const LEVELS = [
  [/dbl-black/i, 'doubleBlack'],
  [/black-diamond/i, 'black'],
  [/moderate/i, 'blue'],
  [/easy/i, 'green']
];
const MONTHS =
  /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2}),?\s+(\d{4})/i;

function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join(' ');
}

function clean(node) {
  return textOf(node).replace(/\s+/g, ' ').trim();
}

function table(dom, title) {
  const heading = select(dom, 'h3.wpdt-c').find(h => clean(h) === title);
  const n = heading?.attribs?.id?.match(/^wdt-table-title-(\d+)$/)?.[1];
  return n && select(dom, `table#wpdtSimpleTable-${n}`)[0];
}

export function isFresh(tbl) {
  const banner = clean(select(tbl, 'td.wpdt-merged-cell')[0]);
  if (/closed\s+for\s+the\s+season/i.test(banner)) {
    return false;
  }
  const m = MONTHS.exec(banner);
  return !(m && isStale(new Date(`${m[1]} ${m[2]}, ${m[3]}`)));
}

function image(cell) {
  return select(cell, 'img')[0]?.attribs?.src ?? '';
}

export function rows(dom, title) {
  const tbl = table(dom, title);
  if (!tbl || !isFresh(tbl)) {
    return [];
  }
  return select(tbl, 'tr').flatMap(row => {
    const cells = select(row, 'td').filter(td => !('hidden' in td.attribs));
    if (cells.length < 2 || cells.some(td => /\bwpdt-merged-cell\b/.test(td.attribs.class ?? ''))) {
      return [];
    }
    const name = clean(cells[0]);
    const status = STATUS[image(cells.at(-1)).match(/status-([a-z-]+)\.png/)?.[1]];
    if (!name || !status) {
      return [];
    }
    const grade = cells.length > 2 ? image(cells[1]) : '';
    const level = /terrain park/i.test(name) ? 'terrainPark' : LEVELS.find(([re]) => re.test(grade))?.[1];
    return [{ name, status, level }];
  });
}
