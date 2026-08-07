import { collect } from '../../tools/domutil.js';
import { berg, name, reportedAt, status } from './rows.js';

/**
 * Heuberg - the operator's sector is broader than the Heuberg summit alone: it
 * bundles the Heubergarena above Hirschegg with the Zaferna and Parsenn lifts
 * on the same side of the valley towards Mittelberg. Nine lifts in the shared
 * #lifte box: Parsennbahn (39), Skikuli Parsen (40), Hubertuslift (41),
 * Heubergbahn (42), Schlößlelift (43), Heubergmuldelift (44), Schöntallift
 * (45), Doppelsessellift Zaferna (55), Förderband Schützabühl (62). Kept as
 * the operator groups it - data-berg is the only sector signal there is.
 *
 * The lift box is seasonal in a way the piste box is not: in winter it lists
 * all 46 lifts of the network, in summer only the handful running for
 * sightseeing (two Heuberg rows in August). So an empty or short list here is
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
    // non-enumerable: this dates the report, it is not a tenth lift
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
