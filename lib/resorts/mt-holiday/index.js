import coerce from '../../tools/coerce.js';
import rows, { name } from './rows.js';

const HEADING = /^lift status$/i;

// a lift line reads "<chip> Blue Chairlift - Services🟢🟦⯁" - the suffix lists
// the terrain it serves plus notes ("Closes at 4pm") and is dropped by name().
// The chip is a dropdown whose preset offers exactly Open and Closed.
export default function parse(dom) {
  const lifts = {};
  for (const row of rows(dom, HEADING)) {
    const lift = name(row.text);
    if (lift) {
      lifts[lift] = coerce(row.status);
    }
  }
  return lifts;
}
