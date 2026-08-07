import coerce from '../../tools/coerce.js';
import { name, reportedAt, rows, status } from './rows.js';

/**
 * 7 lifts tagged data-berg="nebelhorn" in the shared #lifte box: the three
 * sections up to the summit, the Koblat and Sonngehren chairs, the NTC
 * practice lift and the Seealp tow. Names are unique within the sector, so they
 * key the map directly; the lift number in span.zeichen and the type in
 * span.typ are left out, as elsewhere in the registry. Rows come out grouped by
 * status rather than by number - that is the order the CMS emits them in, and
 * it is not stable, so nothing here may depend on position.
 */
export default function parse(dom) {
  const lifts = {};
  for (const node of rows(dom, 'lifte')) {
    const n = name(node);
    if (n) {
      lifts[n] = coerce(status(node));
    }
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the report, not a lift - lib/lifts/stats.js
    // counts Object.keys and would otherwise report an 8th lift
    Object.defineProperty(lifts, 'reportedAt', { value: at });
  }
  return lifts;
}
