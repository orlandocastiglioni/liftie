import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Crystal Mountain (Thompsonville, MI) - not to be confused with the
// Washington resort that owns the `crystal-mountain` id.
//
// Same "mountain report" platform family as granite-peak/snowriver, but a
// newer Drupal build: the status is a text label inside
// `.cell.status .status-block` (Open / Closed / On Hold - all three coerce
// cleanly) rather than an icon `title` attribute, so the sibling parsers
// cannot be reused verbatim.
//
// The name lives in `.cell.title` alongside a lift-type badge element
// ("Quad", "Triple", ...); allText() reads only the direct text children, so
// the badge stays out of the name.
export default {
  selector: '.lift.component-row',
  parse: row => {
    const title = select(row.children, '.cell.title')[0];
    const status = select(row.children, '.cell.status .status-block')[0];
    if (!title || !status) {
      return;
    }
    return { name: allText(title), status: allText(status) };
  }
};
