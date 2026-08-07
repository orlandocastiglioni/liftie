import reportedAt from './reported-at.js';
import rows from './rows.js';
import status from './status.js';

/**
 * The 20 rows under the 'Slopes' caption - 14 numbered pistes plus Skiroute
 * 1..6. The Winterhiking (8) and Crosscountry (1) blocks below them are NOT
 * slopes and are excluded by the caption walk in rows.js.
 *
 * NO GRADE. The Skigebietsmanager template publishes no difficulty at all for
 * this region - the middle cell of every row is a piste-type icon, not a
 * difficulty one - so these rows carry neither `level` nor `grade`. Two run
 * names happen to end in 'schwarz' and 'rot' ('Piste Nr 12 - Wetterkreuzbahn
 * schwarz'), but that is the operator naming two branches of one piste after
 * their colour and says nothing about the other eighteen; inferring a scale
 * from it would be a guess, and no level is better than a wrong one.
 */
export default function trails(dom) {
  const list = rows(dom, 'slopes').map(row => ({ name: row.name, status: status(row.status) }));
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable, or a deepEqual on the row set would see it
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
