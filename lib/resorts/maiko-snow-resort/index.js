import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// div#today is the daily overlay panel (リフト運行予定) that the maiko2024 theme
// bakes into every page of the /winter/ section, in season and out - which is
// why this URL is stable in August. Inside it are two ul.todayLift of five
// <li><dl> each: <dt>[A] 舞子ゴンドラ</dt><dd>8:30-15:00</dd>, ten lifts in
// fixed A..J map order.
//
// The bracketed letter is the lift's label on the resort's own piste map and is
// kept as part of the name.
//
// TRAP: the identical ten lifts are repeated further down the page inside
// div.todayFixed as three table.todayFixedLift--0n with th/td rows. Scoping to
// #today is what keeps every lift from being collected twice.
export default function parse(dom) {
  const liftStatus = {};
  for (const dl of select(dom, '#today ul.todayLift li dl')) {
    const name = findText(select(dl.children, 'dt')[0])?.trim();
    if (!name) {
      continue;
    }
    liftStatus[name] = coerce(status(findText(select(dl.children, 'dd')[0])));
  }
  return liftStatus;
}
