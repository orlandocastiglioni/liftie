import select from '../select.js';
import coerce from './coerce.js';
import { allText } from './domutil.js';

/**
 * Shared parser for Mountain Capital Partners resorts (Power Pass): one
 * WordPress multisite theme (wp-content/themes/mcp) behind Purgatory, Arizona
 * Snowbowl, Sipapu, Pajarito, Brian Head, Nordic Valley, Willamette Pass and
 * Lee Canyon. The conditions page server-renders every lift and trail, and
 * every row is present (as "Closed") out of season.
 *
 *   lifts:  #m-tab-lifts ul.m-lifts-list > li
 *           .m-lift-header = name, .m-status.m-status-<status> = status
 *   trails: #m-tab-trails li.m-filter-target
 *           h4 = name, its m-status-<level> class = difficulty,
 *           .m-lifts-and-trails-meta .m-status-<status> = status
 *   parks:  #m-tab-terrain ul.m-terrain-list - not published: Indy and the
 *           app count trails without the parks
 *
 * Everything is scoped to the tab panels, because the same pages carry bike
 * tabs in summer (#m-tab-bike-lifts) whose chairs must never publish as ski
 * lifts. Trails are grouped under the lift that serves them, so a run reached
 * from two lifts is listed twice (Pajarito, 2026-11-13: 73 rows, 57 runs);
 * the first row wins.
 */

const STATUS = /\bm-status-(open|closed|hold|on-hold|wind-hold|delayed|scheduled|opening-soon)\b/;
const LEVEL = /\bm-status-(green|blue|double-blue|black|double-black|terrain-park)\b/;

// Purgatory grades two runs "double blue", which the shared level map has no
// tier for: publish them as blue and keep the source's word as the grade.
const LEVELS = {
  green: 'green',
  blue: 'blue',
  'double-blue': 'blue',
  black: 'black',
  'double-black': 'doubleBlack',
  'terrain-park': 'terrainPark'
};

function statusOf(node) {
  const el = select(node, '.m-status').find(n => STATUS.test(n.attribs?.class ?? ''));
  if (!el) {
    return 'closed';
  }
  const word = el.attribs.class.match(STATUS)[1];
  if (word === 'delayed' || word.endsWith('hold')) {
    return 'hold';
  }
  if (word === 'opening-soon') {
    return 'scheduled';
  }
  return coerce(word);
}

function textOf(node) {
  return node ? allText(node).replace(/\s+/g, ' ').trim() : '';
}

export function lifts(dom) {
  const status = {};
  for (const li of select(dom, '#m-tab-lifts ul.m-lifts-list:not(.m-terrain-list) > li')) {
    const name = textOf(select(li, '.m-lift-header')[0]);
    if (name && !(name in status)) {
      status[name] = statusOf(li);
    }
  }
  return status;
}

export function trails(dom) {
  const seen = new Set();
  const rows = [];
  for (const li of select(dom, '#m-tab-trails li.m-filter-target')) {
    const header = select(li, 'h4')[0];
    const name = textOf(header);
    if (!name || seen.has(name)) {
      continue;
    }
    seen.add(name);
    const meta = select(li, '.m-lifts-and-trails-meta')[0] ?? li;
    const row = { name, status: statusOf(meta) };
    const grade = (header.attribs?.class ?? '').match(LEVEL)?.[1];
    if (grade) {
      row.level = LEVELS[grade];
      if (grade === 'double-blue') {
        row.grade = 'double blue';
      }
    }
    rows.push(row);
  }
  return rows;
}
