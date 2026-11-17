import coerce from '../../tools/coerce.js';
import { fromZones, items } from './zones.js';

// Status is 'open' | 'close', both known to coerce. 'CT Parc Infantil' names a
// magic carpet in BOTH the Baqueira and the Beret sector - two distinct lifts -
// and lift status is keyed by name, so a name seen in more than one sector is
// qualified with its sector ('CT Parc Infantil (Baqueira)'), the same keys the
// old all-sectors HTML parser published.
//
// The feed also lists a few lifts twice within ONE sector under different ids
// (on 2026-11-17: TSD Bosque 1209 open + 1223 closed in Baqueira, TSD Clot der
// Os 2400 + 1210 in Beret). Which row is the real one cannot be told from the
// feed, so neither is dropped: a repeat of a key already taken is numbered
// ('TSD Bosque (Baqueira) 2'), keeping the published count equal to the
// sector totals.
export function liftStatus(zones) {
  const list = items(zones, 'remontes');
  const seen = {};
  for (const { name } of list) {
    seen[name] = (seen[name] ?? 0) + 1;
  }
  const ls = {};
  for (const { name, status, zone } of list) {
    const base = seen[name] > 1 && zone ? `${name} (${zone})` : name;
    let key = base;
    for (let n = 2; key in ls; n++) {
      key = `${base} ${n}`;
    }
    ls[key] = coerce(status);
  }
  return ls;
}

export default fromZones(liftStatus);
