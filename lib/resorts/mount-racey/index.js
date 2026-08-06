import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// The board is the WordPress page that yubari-resort.co.jp/weather_traffic/
// iframes; see dataUrl in resort.json. Lifts sit in table.lift-cond, a header
// row of <th> (リフト名 | 運行状況 | 営業時間 | コメント) followed by one <tr>
// per lift.
//
// :not(.sp-cond) is MANDATORY. The same page carries the narrow-layout weather
// panel as table.lift-cond.none_pc.sp-cond, whose rows are 天気 / 気温 / 積雪量
// / コメント - a bare 'table.lift-cond tr' publishes those four as lifts.
//
// Only td[1] is the status: td[2] is the published operating window and td[3] a
// free-text Japanese comment, and both stay put while the lift is shut
// ('本日営業終了 | 9:00 - 16:00 | 今シーズンの営業は終了しました。').
export default function parse(dom) {
  const liftStatus = {};
  for (const row of select(dom, 'table.lift-cond:not(.sp-cond) tr')) {
    // the header row holds <th> only, so requiring two <td> drops it
    const cells = select(row.children, 'td');
    if (cells.length < 2) {
      continue;
    }
    const name = findText(cells[0])?.trim();
    if (name) {
      liftStatus[name] = coerce(status(findText(cells[1])));
    }
  }
  return liftStatus;
}
