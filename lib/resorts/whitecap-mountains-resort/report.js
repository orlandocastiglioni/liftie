import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import isStale from '../../tools/stale.js';

/**
 * whitecapresort.com/winter/snow-report is a Joomla article of plain tables:
 *
 * - table.snowreport: "Current Conditions", first row "Date / Time" |
 *   "Mar 29, 2026 - 6:00 AM", then base depth, natural snow, counts;
 * - table.lifts: "Lifts | Status | Notes", 5 lifts;
 * - four table.trails, each headed by its difficulty in the first header
 *   cell ("Easier", "More Difficult", "Most Difficult", "Expert Only"), then
 *   "Status | Notes". Notes is grooming (GROOMED / UNGROOMED), not status.
 *
 * The page is never cleared at the end of the season: on 2026-11-17 it still
 * shows closing day ("THANK YOU FOR A GREAT SEASON!", 4 lifts and 21 runs
 * OPEN). The "Date / Time" stamp gates both parsers through
 * lib/tools/stale.js; no stamp fails open.
 */
function text(node) {
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

function cells(row, tag = 'td') {
  return select(row, tag).map(c => clean(text(c)));
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export function reportDate(dom) {
  for (const row of select(dom, 'table.snowreport tr')) {
    const [label, value] = cells(row);
    if (!/^date/i.test(label ?? '')) {
      continue;
    }
    const m = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),\s*(\d{4})/.exec(value ?? '');
    const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
    if (month >= 0) {
      return new Date(Number(m[3]), month, Number(m[2]));
    }
  }
}

const LEVELS = {
  easier: 'green',
  'more difficult': 'blue',
  'most difficult': 'black',
  'expert only': 'doubleBlack'
};

function body(table) {
  return select(table, 'tr')
    .filter(row => select(row, 'th').length === 0)
    .map(row => cells(row))
    .filter(([name, status]) => name && status);
}

export function lifts(dom) {
  if (isStale(reportDate(dom))) {
    return {};
  }
  return Object.fromEntries(
    select(dom, 'table.lifts').flatMap(table => body(table).map(([name, status]) => [name, coerce(status)]))
  );
}

export function trails(dom) {
  if (isStale(reportDate(dom))) {
    return [];
  }
  return select(dom, 'table.trails').flatMap(table => {
    const head = (select(table, 'th').map(th => clean(text(th)))[0] ?? '').toLowerCase();
    const level = LEVELS[head];
    return body(table).map(([name, status]) => ({ name, status: coerce(status), level }));
  });
}
