import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * The "Today's CUPIDVALLEY" board is rendered server-side by WordPress into
 * /winter.html. div.todayBlk03 is the リフト運行予定 (lift schedule) block: one
 * <dl> per lift inside ul.todayBlk03__list, with <dt>name</dt> and a single
 * glyph in <p class="todayBlk03__txt">. The glyph is sometimes wrapped over
 * several source lines, hence the trim.
 *
 * The fixed roster is 第1クワッド, 第2クワッド, 第3ペア - matching the published
 * ペア1基 クワッド2基 - but the count is not assumed.
 *
 * div.todayBlk04 carries キッズパーク in identical markup and is deliberately
 * left out: it is a kids' sledding area, not a lift, and the resort itself
 * keeps it outside the リフト運行予定 list.
 *
 * A row with no glyph at all is skipped rather than guessed at. Off-season the
 * site fills the cell with '-' (mapped to closed in status.js), so an empty
 * cell means the markup changed, and publishing nothing is the honest answer.
 */
export default function parse(dom) {
  const lifts = {};
  for (const dl of select(dom, 'div.todayBlk03 ul.todayBlk03__list li dl')) {
    const name = findText(select(dl.children, 'dt')[0])?.trim();
    const state = findText(select(dl.children, 'p.todayBlk03__txt')[0])?.trim();
    if (name && state) {
      lifts[name] = coerce(status(state));
    }
  }
  return lifts;
}
