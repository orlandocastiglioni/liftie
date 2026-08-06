import coerce from '../../tools/coerce.js';
import { lifts } from './rows.js';
import { lift } from './status.js';

// リフト運行情報 - all six chairs: 水沢リフト, ぎんれい第1リフト, ぎんれい第3リフト,
// 黒森山リフト, ぎんれいクワッドリフト, かもしかクワッドリフト
export default function parse(dom) {
  const liftStatus = {};
  for (const row of lifts(dom)) {
    if (row.name) {
      liftStatus[row.name] = coerce(lift(row.glyph, row.note));
    }
  }
  return liftStatus;
}
