import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * plattekill.com/on-the-trail/ keeps the whole report in one TablePress table
 * (tablepress-24 today; found by its "Surface Condition" header instead).
 * tbody is a run of sections, each opened by a single colspan=3 cell holding
 * an <h3>: Easiest / More Difficult / Most Difficult / Experts Only (trails:
 * Name | Status | Surface Condition), Lifts (Name | Status, colspan=2), then
 * Snow and Trail Report, which are key/value rows and are never read.
 *
 * The table is hand-edited and not reset at season end, so rows are gated on
 * its date (lib/tools/stale.js): the thead's "REPORT AS OF: 1/11/26" row, or,
 * while that is blank ("/ /", as off-season), the header widget's
 * "Report for: 11/15/2026". Fails open when neither parses.
 */
const SECTIONS = {
  easiest: 'green',
  'more difficult': 'blue',
  'most difficult': 'black',
  'experts only': 'doubleBlack',
  lifts: 'lifts'
};

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

function parseDate(str) {
  const m = /(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\b/.exec(str ?? '');
  if (!m) {
    return;
  }
  const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  return new Date(year, Number(m[1]) - 1, Number(m[2]));
}

function reportTable(dom) {
  return select(dom, 'table.tablepress').find(table =>
    select(table, 'thead th').some(th => clean(th) === 'Surface Condition')
  );
}

export function reportDate(dom, table = reportTable(dom)) {
  const asOf =
    table &&
    select(table, 'thead th')
      .map(clean)
      .find(t => /report as of/i.test(t));
  const header = select(dom, '.conditions-report .note')
    .map(clean)
    .find(t => /report for/i.test(t));
  return parseDate(asOf) ?? parseDate(header);
}

export function rows(dom, kind) {
  const table = reportTable(dom);
  if (!table || isStale(reportDate(dom, table))) {
    return [];
  }
  const out = [];
  let section;
  for (const row of select(table, 'tbody tr')) {
    const cells = select(row, 'td');
    const heading = select(row, 'h3')[0];
    if (heading) {
      section = SECTIONS[clean(heading).toLowerCase()];
      continue;
    }
    if (!section || (kind === 'lifts') !== (section === 'lifts')) {
      continue;
    }
    const name = clean(cells[0]);
    if (!name) {
      continue;
    }
    const level = /terrain park/i.test(name) ? 'terrainPark' : section;
    out.push({ name, status: clean(cells[1]), level });
  }
  return out;
}
