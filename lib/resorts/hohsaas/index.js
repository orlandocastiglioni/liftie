import coerce from '../../tools/coerce.js';
import { name, report, reportedAt, rows, status } from './report.js';

/**
 * ANLAGEN - infosnow category 1, nine rows: the three Gondelbahn sections
 * Saas-Grund - Kreuzboden, Zwischenstation Trift and Kreuzboden - Hohsaas, the
 * Kreuzboden and Sandiger Boden ski tows, the two Foerderband carpets, and the
 * Ziebel and Bodu village tows.
 *
 * The last two are Saas-Grund's and Saas-Balen's own beginner lifts rather than
 * Hohsaas mountain lifts, but there is no finer grained feed - the operator's
 * own page bundles them the same way - so the whole published set ships as is.
 */
export default function lifts(dom) {
  const doc = report(dom);
  const ls = {};
  for (const row of rows(doc, 1)) {
    const n = name(row);
    if (n) {
      ls[n] = coerce(status(row));
    }
  }
  const at = reportedAt(doc);
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
