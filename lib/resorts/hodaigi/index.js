import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// The site-wide fixed footer widget .c__lift.js-fixed-lift carries the lift
// board and is server-rendered identically on every page, so the homepage is
// enough. Rows are `.c__lift_list dl.item` -> <dt>name</dt><dd>glyph</dd>.
// Scope to .c__lift_list: bare `.item` matches ~40 unrelated nodes page-wide.
//
// The gelände map on the same page carries an equivalent 7-row source
// (`.m__gelandemap_liftSvg g[data-name]`, status in the class attribute) whose
// values have agreed in every snapshot checked. We publish this list instead
// because it is the board the resort maintains as its status feed; note that it
// labels 第8 / 第9 as ペアリフト where the map (and /gelande-guide/) call them
// クワッドリフト - the resort's own disagreement, left as published.
export default function parse(dom) {
  const liftStatus = {};
  for (const item of select(dom, '.c__lift_list dl.item')) {
    const name = findText(select(item, 'dt')[0])?.trim();
    const state = findText(select(item, 'dd')[0]);
    if (name && state) {
      liftStatus[name] = coerce(status(state));
    }
  }
  return liftStatus;
}
