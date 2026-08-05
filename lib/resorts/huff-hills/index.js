import coerce from '../../tools/coerce.js';
import { liftRows, status } from './report.js';

// four lifts, listed under the "Lift Status" heading of the right-hand column
// of /snowreport: Bunny Tow, Blue Lift, Green Lift, Race Tow. The same column
// also carries the terrain park, uphill traffic and hiking-area rows - those
// are filtered out in report.js and reported as trails instead.
export default function parse(dom) {
  const lifts = {};
  for (const row of liftRows(dom)) {
    lifts[row.name] = coerce(status(row.status));
  }
  return lifts;
}
