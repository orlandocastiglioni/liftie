import coerce from '../../tools/coerce.js';
import sections from './rows.js';

// the 7 lifts sit in the "Chairs & Tows" section of the slope report, the
// same page and the same repeater markup as the trails - see rows.js
export default function parse(dom) {
  const liftStatus = {};
  for (const { heading, rows } of sections(dom)) {
    if (!/chairs\s*&\s*tows/i.test(heading)) {
      continue;
    }
    for (const { name, status } of rows) {
      liftStatus[name] = coerce(status);
    }
  }
  return liftStatus;
}
