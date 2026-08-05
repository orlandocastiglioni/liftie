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

export default function parse(dom) {
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
