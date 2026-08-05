import slopes from './slopes.js';

/**
 * Ober Mountain does not publish a per-lift status anywhere: the slope report
 * only carries an aggregate "open_lifts" count. Every slope row does name the
 * lift that serves it though, so the lift set and its status are DERIVED from
 * the slopes: a lift counts as open as soon as one of the slopes it serves is
 * open, closed otherwise.
 *
 * That derivation reproduces the resort's own aggregate exactly - on the
 * 2025-12-15 report Mighty Carpet (Ski School) and Ober Easy (Cub Way, the two
 * Castle runs, Terrain Park) come out open and Ober Challenge (Quad) closed,
 * i.e. 2 open lifts, matching the block's own `open_lifts: '2'`.
 *
 * The derived values are already the literal 'open'/'closed' liftie uses, so
 * there is nothing for coerce() to normalise. Lifts keep the order in which
 * they first appear in the table.
 */
export default function parse(dom) {
  const status = {};
  for (const slope of slopes(dom)) {
    const open = slope.status.toLowerCase() === 'open';
    for (const lift of slope.lifts) {
      if (status[lift] !== 'open') {
        status[lift] = open ? 'open' : 'closed';
      }
    }
  }
  return status;
}
