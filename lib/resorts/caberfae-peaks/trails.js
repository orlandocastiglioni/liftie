import lifts from './index.js';

// same /snow-report/ page and per-<li> markup as the lifts: the 3 icon lists in the
// non-first columns (7+10+10 items) are the 27 trails; difficulty is not published
// anywhere in the markup, so no level.
export default {
  selector: '.flex_column:not(.first) ul.avia-icon-list li',
  parse: lifts.parse
};
