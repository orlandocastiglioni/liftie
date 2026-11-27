import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';

/**
 * Catamount publishes its trail conditions through Trailforks (region
 * "catamount-outdoor-family-center", rid 11354) - catamountoutdoor.org
 * only embeds the Trailforks widget and otherwise writes a free-text weekly
 * narrative. Trailforks is behind Cloudflare, so resort.json fetches the
 * status page via renderd. The row layout is the same for every activity.
 *
 * row: <tr role="row">
 *        <td class="small_icon"><span class="dicon_small d<colour>" data-sort="N" title="..."></span></td>
 *        <td><a href="/trails/...">NAME</a></td>
 *        <td><a><span class="sicon_small s<colour>" data-sort="N" title="..."></span></a></td>
 *        <td>condition text</td><td>date</td><td>optional badge</td>
 *      </tr>
 *
 * Neither column's title text is in liftie's vocabulary ("All Clear / Green",
 * "Easy / Green Circle", ...) so both are mapped here from the numeric
 * data-sort, which is the only stable key: dblack is reused for single and
 * double black, and the access-road difficulties have no liftie equivalent.
 */
const statuses = {
  1: 'open', // All Clear / Green
  2: 'open', // Minor Issue / Yellow - still rideable
  3: 'hold', // Significant Issue / Amber
  4: 'closed' // Closed / Red
};

const levels = {
  2: 'green', // Easy / Green Circle
  3: 'blue', // Intermediate / Blue Square
  7: 'black', // Very Difficult / Black Diamond
  8: 'doubleBlack' // Extremely Difficult / Dbl Black Diamond
  // 10 Access Trail/Road, 11 Secondary Access Road - no liftie level
};

function sort(cell, selector) {
  return select(cell?.children ?? [], selector)[0]?.attribs?.['data-sort'];
}

/**
 * Trailforks activity types that are snow sports, by the value of the status
 * page's own <select id="activitytype"> (Nordic Ski 13, Downhill Ski 11,
 * Backcountry Ski 12, Snowshoe 10). Winter Fat Bike (17) is a bike.
 */
const SNOW_ACTIVITIES = new Set(['10', '11', '12', '13']);

/**
 * True only when the page says it is reporting a snow activity. The region
 * status page reports one activity at a time and defaults to Mountain Bike
 * (option value 1 selected), so this is the guard that the query in
 * resort.json actually took. It fails CLOSED - unlike lib/tools/stale.js -
 * because the default a bare URL gets is the bike report.
 */
export function isSnowReport(dom) {
  const option = select(dom, 'select#activitytype option[selected]')[0];
  return SNOW_ACTIVITIES.has(option?.attribs?.value);
}

/**
 * Trailforks' condition vocabulary (its own filter_condition select) mixes
 * snow and dirt words: Snow Groomed, Snow Packed, Snow Covered, Snow Cover
 * Partial and Icy describe snow; Prevalent Mud, Wet, Variable, Ideal, Dry and
 * Very Dry describe a bike trail. Freeze/thaw Cycle and Unknown say neither.
 */
const SNOW_CONDITION = /^(?:snow\b|icy$)/i;

/**
 * resort.json asks for the Nordic Ski view (activitytype=13), the one
 * catamountoutdoor.org itself links. Unlike Nordic Pulse it is not a
 * dedicated ski report: each row shows the trail's LATEST Trailforks report
 * whatever activity filed it, so on 2026-11-27 it listed nine trails, most
 * with last spring's mud and wet reports and two with a November 4 "Ideal"
 * from the leaf-blowing crew. Publishing those flags would put bike trails on
 * a ski app as open Nordic trails.
 *
 * So a row is kept only when its latest report is a SNOW condition filed
 * inside stale.js's window - that is, a winter report from this season. When
 * nothing qualifies, nothing publishes, marked 'offseason'
 * (lib/tools/suppressed.js) and keyed on the newest report the page has.
 */
export default function parse(dom) {
  if (!isSnowReport(dom)) {
    return suppressed([], REASONS.summer);
  }
  let newest;
  const rows = select(dom, 'table.statustable tbody tr[role="row"]')
    .map(row => {
      const cells = (row.children ?? []).filter(c => c.name === 'td');
      const name = findText(select(cells[1]?.children ?? [], 'a')[0]);
      const status = statuses[sort(cells[2], 'span.sicon_small')];
      const condition = findText(select(cells[3]?.children ?? [], 'span.grey')[0])?.trim();
      const day = select(cells[4]?.children ?? [], '.fullTime')[0]?.attribs?.title;
      const at = day ? Date.parse(`${day}T12:00:00Z`) : Number.NaN;
      if (Number.isFinite(at) && !(newest > at)) {
        newest = at;
      }
      if (!name || !status || !SNOW_CONDITION.test(condition ?? '') || !Number.isFinite(at) || isStale(at)) {
        return;
      }
      return {
        name,
        status,
        level: levels[sort(cells[0], 'span.dicon_small')]
      };
    })
    .filter(Boolean);
  return rows.length ? rows : suppressed(rows, REASONS.offseason, newest);
}
