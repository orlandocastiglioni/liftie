import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Hyland Hills is a Three Rivers Park District (Drupal) site and publishes no
// lift status at all - only this runs page, which is hand-authored CKEditor
// rich text holding two <table>s ("RUNS" and "TERRAIN PARK") inside the
// .userContent block. Each table opens with a fake header row built from
// <td><strong>Name</strong></td> rather than a <thead>, so header rows are
// dropped by their first-cell text. The <table> carries class="table" on the
// live page but not in older revisions, and the <h2> headings are editable
// prose, so the selector keys off .userContent alone.
// Statuses are "Open"/"Closed" and ratings are
// Easiest / More Difficult / Most Difficult / Freestyle Terrain - coerce and
// normalizeLevel already know every one of those tokens.
export default {
  selector: '.userContent table tr',
  parse(node) {
    const cells = select(node, 'td');
    if (cells.length < 3) {
      return;
    }
    const name = cellText(cells[0]);
    if (!name || name.toLowerCase() === 'name') {
      return;
    }
    return {
      name,
      status: cellText(cells[2]),
      level: cellText(cells[1])
    };
  }
};

// names carry stray &nbsp; padding ("South Terrain Park ") from the editor
function cellText(cell) {
  return (findText(cell) ?? '').replace(/\s+/g, ' ').trim();
}
