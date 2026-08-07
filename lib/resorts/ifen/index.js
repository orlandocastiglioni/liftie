import { collect } from '../../tools/domutil.js';
import { berg, name, reportedAt, status } from './rows.js';

/**
 * Ifen - Hoher Ifen / Hahnenköpfle above the Auenhütte in Hirschegg,
 * Kleinwalsertal. Four lifts in the shared #lifte box: Ifen I (65), Ifen II
 * (66), Olympiabahn (67), Gaisbühllift (68).
 *
 * The lift box is seasonal in a way the piste box is not: in winter it lists
 * all 46 lifts of the network, in summer only the handful running for
 * sightseeing (one Ifen row in August). So an empty or short list here is
 * normal out of season, and is exactly why the parser must not assume a fixed
 * row count - it takes whatever carries this sector's tag.
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
    // non-enumerable: this dates the report, it is not a fifth lift
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
