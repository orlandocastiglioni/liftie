import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import isStale from '../../tools/stale.js';

/**
 * badkleinkirchheim.com/en/skiing-area/slopes-lifts/ is server-rendered by
 * the TYPO3 extension webx_feratel_infrastructure: <table class="lift">,
 * <table class="slope"> and <table class="infrastructure"> (thermal baths,
 * not read). Each row is: status icon (<i class="fa fa-check"> open,
 * <i class="fa fa-times"> closed), type icon, name, opening period.
 *
 * Slopes grade on the Austrian three-tier scale as a coloured dot in
 * td.icon - <i class="fa fa-circle blue|red|black"> - and ski routes as
 * <i class="fas fa-diamond red">. The raw colour is published as `grade`;
 * `level` shifts the top two tiers down one slot (red -> black, black ->
 * doubleBlack) so all three stay distinct, as lib/resorts/stubai-glacier
 * does. Ski routes carry grade 'skiroute' and no level. A trailing " *" on
 * a slope name marks it snowmaking-covered and is dropped.
 *
 * The page is stamped "last update: 17.11.26 14:15" (DD.MM.YY, local time);
 * lib/tools/stale.js suppresses a report older than its window. The summer
 * cable cars run in summer and show as open then (2026-08-07 capture: 3 of
 * 24 lifts), which is true, so there is no summer gate.
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
  return s.replace(/\s+/g, ' ').trim();
}

export function reportedAt(dom) {
  for (const node of select(dom, 'p, div, span')) {
    const own = (node.children ?? [])
      .filter(c => c.type === 'text')
      .map(c => c.data)
      .join(' ');
    const m = /last update:\s*(\d{1,2})\.(\d{1,2})\.(\d{2,4})\s+(\d{1,2}):(\d{2})/i.exec(own);
    if (m) {
      const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
      return new Date(year, Number(m[2]) - 1, Number(m[1]), Number(m[4]), Number(m[5]));
    }
  }
}

function state(row) {
  const icon = select(row, 'td i')[0]?.attribs?.class ?? '';
  if (/\bfa-check\b/.test(icon)) {
    return 'open';
  }
  if (/\bfa-times\b/.test(icon)) {
    return 'closed';
  }
}

function name(row) {
  const td = select(row, 'td').find(td => !select(td, 'i, img').length && clean(text(td)));
  return td && clean(text(td)).replace(/\s*\*$/, '');
}

function rows(dom, kind) {
  if (isStale(reportedAt(dom))) {
    return [];
  }
  return select(dom, `table.${kind} tbody tr`).flatMap(row => {
    const n = name(row);
    const s = state(row);
    return n && s ? [{ row, name: n, status: coerce(s) }] : [];
  });
}

export function lifts(dom) {
  return Object.fromEntries(rows(dom, 'lift').map(({ name, status }) => [name, status]));
}

const LEVELS = { blue: 'blue', red: 'black', black: 'doubleBlack' };

function grade(row) {
  const icon = select(row, 'td.icon i')[0]?.attribs?.class ?? '';
  if (/\bfa-diamond\b/.test(icon)) {
    return 'skiroute';
  }
  return /\bfa-circle\s+(blue|red|black)\b/.exec(icon)?.[1];
}

export function trails(dom) {
  return rows(dom, 'slope').map(({ row, name, status }) => {
    const g = grade(row);
    return { name, status, level: LEVELS[g], grade: g };
  });
}
