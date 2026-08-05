import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Mohawk publishes lifts and trails as two server-rendered tables on the same
 * WordPress (Avada) snow report page. A lift row is
 *   <div class="lift clearfix">
 *     <div class="cell">NAME</div>
 *     <div class="cell">type / terrain blurb</div>
 *     <div class="cell">status</div>
 *   </div>
 * The status cell is binary and asymmetric: closed is the literal text 'No'
 * (coerce knows it), open is an <img class="img-lift-open" alt="Lift Open">
 * with no text at all. 'Lift Open' is not in coerce's vocabulary and would
 * silently degrade to 'scheduled', so the image is translated here instead.
 */
export default {
  selector: '#snow-report-lifts-wrapper .lift',
  parse(node) {
    const cells = select(node, '.cell');
    if (cells.length < 3) {
      return;
    }
    const name = findText(cells[0]);
    if (!name) {
      return;
    }
    return {
      name,
      status: select(cells[2], 'img.img-lift-open').length ? 'open' : findText(cells[2])
    };
  }
};
