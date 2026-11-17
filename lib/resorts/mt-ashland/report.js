import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import isStale from '../../tools/stale.js';

/**
 * mtashland.com/mountain-report/ is a hand-edited WPBakery page of plain
 * <table border="2"> tables:
 *
 * - "Chairlift Status": a header row "Chair Lift | Status", then one row per
 *   lift. Its last row, "Uphill Access", is the uphill policy, not a lift.
 * - "Ski Trail Status Report": one table per terrain pod (Sonnet & Lithia,
 *   Comer & Windsor, Ariel), each a "Trail Designation" legend, a header row
 *   "Run | Difficulty | Status", then one row per run. The difficulty cell is
 *   an image; its alt text is unreliable (most runs say "Green Circle"
 *   whatever the symbol), so the grade is read from the image file name:
 *   Green_Circle / Blue_Square / Black_Diamond / ...double_black_diamond.
 *
 * Lift statuses carry the hours ("Open 9am - 9pm"), so only the leading word
 * is read.
 *
 * The report is stamped "Updated November 10, 2026 at 6:20 PM" (local time)
 * and is not cleared at the end of the season, so lib/tools/stale.js gates
 * it: a stamp older than its window publishes no rows. No stamp fails open.
 */

export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

function cells(row) {
  return select(row, 'td').map(td => clean(text(td)));
}

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

export function updatedAt(dom) {
  for (const h of select(dom, 'h3')) {
    const m = /Updated\s+([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/.exec(clean(text(h)));
    const month = m && MONTHS.indexOf(m[1].toLowerCase());
    if (m && month >= 0) {
      return new Date(Number(m[3]), month, Number(m[2]));
    }
  }
}

// statuses carry hours ("Open 9am - 9pm"), and trail rows say "Groomed"
// for an open, groomed run (coerce knows groomed); read the leading word
function status(raw) {
  const m = /^(open|closed|on hold|hold|groomed)\b/i.exec(raw);
  return coerce(m ? m[1] : raw);
}

function stale(dom) {
  return isStale(updatedAt(dom));
}

export function lifts(dom) {
  const out = {};
  if (stale(dom)) {
    return out;
  }
  for (const table of select(dom, 'table')) {
    const rows = select(table, 'tr');
    const head = rows[0] ? cells(rows[0]) : [];
    if (head[0] !== 'Chair Lift') {
      continue;
    }
    for (const row of rows.slice(1)) {
      const [name, state] = cells(row);
      if (name && state && !/^uphill/i.test(name)) {
        out[name] = status(state);
      }
    }
  }
  return out;
}

const LEVELS = [
  [/double_black_diamond/i, 'doubleBlack'],
  [/black_diamond/i, 'black'],
  [/blue_square/i, 'blue'],
  [/green_circle/i, 'green']
];

function level(td) {
  const img = select(td, 'img')[0];
  const src = `${img?.attribs?.['data-src'] ?? ''} ${img?.attribs?.src ?? ''}`;
  return LEVELS.find(([re]) => re.test(src))?.[1];
}

export function trails(dom) {
  if (stale(dom)) {
    return [];
  }
  const seen = new Set();
  const out = [];
  for (const table of select(dom, 'table')) {
    const rows = select(table, 'tr');
    const start = rows.findIndex(r => cells(r).join('|') === 'Run|Difficulty|Status');
    if (start < 0) {
      continue;
    }
    for (const row of rows.slice(start + 1)) {
      const tds = select(row, 'td');
      if (tds.length < 3) {
        continue;
      }
      const name = clean(text(tds[0]));
      const state = clean(text(tds[2]));
      if (!name || !state || seen.has(name)) {
        continue;
      }
      seen.add(name);
      out.push({ name, status: status(state), level: level(tds[1]) });
    }
  }
  return out;
}
