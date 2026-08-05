import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Trail rows live on the same snow report page as the lifts (so resort.json
 * only needs "trails": true). A row is
 *   <div class="trail clearfix">
 *     <div class="cell">NAME</div>
 *     <div class="cell"><img alt="Easy|Intermediate|Difficult"></div>
 *     <div class="cell">open</div>
 *     <div class="cell">snowmaking</div>
 *     <div class="cell">night skiing</div>
 *     <div class="cell">grooming</div>
 *   </div>
 * Only the first three cells are status; the rest are attribute columns and
 * are deliberately ignored (grooming state must never be fed to coerce).
 *
 * Status is the same img-or-'No' idiom as the lifts: open is
 * <img class="img-trail-open" alt="Trail Open"> with no text, and 'Trail Open'
 * is unknown to coerce, so it is translated to 'open' here; closed is 'No'.
 *
 * Level comes from the icon alt in cell 2. The theme only ships three icons -
 * Easy / Intermediate / Difficult - and normalizeLevel already maps all three
 * (green / blue / black), so the raw token is passed through.
 */
export default function parse(dom) {
  return select(dom, '#snow-report-trails-wrapper .trail')
    .map(row => {
      const cells = select(row, '.cell');
      if (cells.length < 3) {
        return;
      }
      const name = findText(cells[0]);
      if (!name) {
        return;
      }
      return {
        name,
        status: select(cells[2], 'img.img-trail-open').length ? 'open' : findText(cells[2]),
        level: select(cells[1], 'img')[0]?.attribs.alt
      };
    })
    .filter(Boolean);
}
