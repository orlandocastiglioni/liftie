import * as domutil from '../../tools/domutil.js';
import { isDor, lifts } from './dor.js';
import { name, status } from './row.js';

// The site was rebuilt in 2026-11 (DOR status widget, see dor.js). The
// pre-rebuild markup is kept as a fallback: lift rows sat in the #liftStatus
// accordion; the .o-status__legend block above them used
// .o-status__legend-icon and lived outside .o-status__table-row, so it could
// not leak in. Five lifts in both versions - the table never empties
// off-season.
const legacy = {
  selector: '#liftStatus .o-status__table-row',
  parse(node) {
    const lift = name(node);
    const state = status(node);
    if (!lift || !state) {
      return;
    }
    return { name: lift, status: state };
  }
};

export default function parse(dom) {
  if (isDor(dom)) {
    return lifts(dom);
  }
  return domutil.collect(dom, legacy.selector, legacy.parse);
}
