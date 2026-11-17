import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Catamount publishes its trail conditions through Trailforks (region
 * "catamount-outdoor-family-center", rid 11354) - catamountoutdoor.org
 * only embeds the Trailforks widget and otherwise writes a free-text weekly
 * narrative. Trailforks is behind Cloudflare, so resort.json fetches the
 * status page via renderd.
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
 * (option value 1 selected, hidden input activitytype=mtb), which is what
 * resort.json fetches: on 2026-11-17 every row was an MTB trail, rated with
 * mountain-bike grades. Publishing those puts bike trails on a ski app, so the
 * signal is the selected activity itself, and this fails CLOSED - unlike
 * lib/tools/stale.js - because the default this URL gets is the bike report.
 *
 * Revisit when Catamount's winter grooming report is live: if the club posts
 * Nordic statuses to Trailforks, point resort.json's trails query at
 * activitytype=13 and the rows flow through this gate unchanged.
 */
export function isSnowReport(dom) {
  const option = select(dom, 'select#activitytype option[selected]')[0];
  return SNOW_ACTIVITIES.has(option?.attribs?.value);
}

export default function parse(dom) {
  if (!isSnowReport(dom)) {
    return [];
  }
  return select(dom, 'table.statustable tbody tr[role="row"]')
    .map(row => {
      const cells = (row.children ?? []).filter(c => c.name === 'td');
      const name = findText(select(cells[1]?.children ?? [], 'a')[0]);
      const status = statuses[sort(cells[2], 'span.sicon_small')];
      if (!name || !status) {
        return;
      }
      return {
        name,
        status,
        level: levels[sort(cells[0], 'span.dicon_small')]
      };
    })
    .filter(Boolean);
}
