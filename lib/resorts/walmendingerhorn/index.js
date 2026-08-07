import { collect } from '../../tools/domutil.js';
import { berg, name, reportedAt, status } from './rows.js';

/**
 * Walmendingerhorn - above Mittelberg, Kleinwalsertal. The operator's sector
 * covers the Wildental side valley and the Moos nursery area as well as the
 * horn itself, six lifts in the shared #lifte box: Wildentallift (51),
 * Walmendingerhornbahn (56), Doppelsessellift Walmendingerhorn (57),
 * Muttelberg (58), Jedermannlift (59), Mooslift (61).
 *
 * The lift box is seasonal in a way the piste box is not: in winter it lists
 * all 46 lifts of the network, in summer only the handful running for
 * sightseeing (one Walmendingerhorn row in August). So an empty or short list
 * here is normal out of season - and the operator's own note says the
 * Walmendingerhornbahn is being rebuilt and reopens 24.12.2026, so this sector
 * may read closed into the start of winter 2026/27 while still listing all six
 * lifts. Take whatever carries the tag; never assume a fixed row count.
 */
export default function lifts(dom) {
  const ls = collect(dom, `#lifte .element[data-berg="${berg}"]`, node => {
    const n = name(node);
    const s = status(node);
    if (!n || !s) {
      return;
    }
    return { name: n, status: s };
  });
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: this dates the report, it is not a seventh lift
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
