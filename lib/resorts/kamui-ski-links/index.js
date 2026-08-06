import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { child, findText } from '../../tools/domutil.js';
import status from './status.js';

// 本日の営業内容 at /today/. The board is a flat run of sibling divs -
// <div class='TdayL'>name</div><div class='TdayR'>status</div> - with no
// whitespace text node between the pair, so the status div is simply .next.
// Header cells use the distinct classes .TdayLT/.TdayRT and are skipped by the
// selector. Scoping to .today-w2 is mandatory: the weather block .today-w1 uses
// the same TdayL/TdayR classes for 気温 / 降雪量 / 積雪量.
//
// The first row, スキー場, is the whole-area open/closed flag rather than a
// lift, and would otherwise publish as a phantom lift.
export default function parse(dom) {
  const liftStatus = {};
  for (const cell of select(dom, '.today-w2 .TdayL')) {
    const name = findText(cell)?.trim();
    const state = findText(child(cell, '+'));
    if (!name || name === 'スキー場' || !state) {
      continue;
    }
    liftStatus[name] = coerce(status(state));
  }
  return liftStatus;
}
