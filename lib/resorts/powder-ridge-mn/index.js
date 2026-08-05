import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// 6 lifts under the "Lift Availability:" heading. The third availability
// list on the page is snowtubing (Snowtubing, Lazer Light Tubing) and is not
// a lift, so it must never be picked up here.
export default function parse(dom) {
  const liftStatus = {};
  for (const { name, status } of rows(dom, /\blifts?\b/i)) {
    liftStatus[name] = coerce(status);
  }
  return liftStatus;
}
