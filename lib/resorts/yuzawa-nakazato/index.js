import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

// #todayLift01 is the ［営業予定リフト］ list on /winter/ - each <li> is a bare
// lift name and nothing else. There is NO status vocabulary on this site: no
// ○/△/×, no 運行中/運休 anywhere in the widget. It is a membership list, so a
// lift that is not named is simply not running today, and the roster has to
// live here or liftie could never report a closed lift.
//
// Roster = the six chairs in the リフト運行予定 table on
// /winter/gerende/course/. エンゼルゲレンデエスカレーター and スマイルキッズパーク
// are in that same table but the widget reports them under #todayLift03, so
// they are trails/attractions here and not counted twice.
//
// Out of season (mid-March to mid-December) the <dd> is empty and #todayLift01
// does not exist at all, which correctly yields all-closed.
const LIFTS = ['第1高速リフト', '第2リフト', '第3リフト', '第4リフト', '第5リフト', '第6リフト'];

export default function parse(dom) {
  const running = new Set(select(dom, '#todayLift01 li').map(li => (findText(li) ?? '').trim()));
  const liftStatus = {};
  for (const lift of LIFTS) {
    liftStatus[lift] = coerce(running.has(lift) ? 'open' : 'closed');
  }
  return liftStatus;
}
