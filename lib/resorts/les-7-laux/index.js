import coerce from '../../tools/coerce.js';
import rows, { LIFTS, reportedAt } from './rows.js';

/**
 * REMONTÉES MÉCANIQUES - 22 lifts across the three base areas: Prapoutel (10),
 * Le Pleynet (8) and Pipay (4). Lumiplan spells the type prefix properly (TSD
 * Bouquetins, TK P'tits Loups); the resort's own infos-pistes page lower-cases
 * them into 'Tsd bouquetins', which is the other reason to read the bulletin.
 *
 * Names are unique across sectors, so the sector is not folded in.
 */
export default function lifts(dom) {
  const ls = {};
  for (const row of rows(dom)) {
    if (row.category !== LIFTS || !row.name) {
      continue;
    }
    ls[row.name] = coerce(row.status);
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
