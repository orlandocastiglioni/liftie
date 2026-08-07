import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import { row, rows } from './sections.js';

/**
 * 5 lifts under the "lifts" caption: Egghof Tellerlift, the three Peter-Anich-
 * Bahn sections and the Zauberteppich at Stiglreith. The status icon is
 * translated in sections.js; coerce then only has to pass 'open'/'closed'
 * through, which it knows.
 */
export default function lifts(dom) {
  const ls = {};
  for (const table of rows(dom, 'lifts')) {
    const r = row(table);
    if (r) {
      ls[r.name] = coerce(r.status);
    }
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
