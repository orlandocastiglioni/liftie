import coerce from '../../tools/coerce.js';
import statusRows from './rows.js';

// lifts are the rows of #tgtable that follow the "LIFT | STATUS" header row -
// see rows.js. The published vocabulary is just Open / Closed, both of which
// coerce knows, so the status is handed over untouched.
//
// The icon on the first cell names the lift type (QuadChair / TripleChair /
// DoubleChair / MagicCarpet), which liftie has no slot for - and it is
// unreliable anyway: Phoebe Snow lost its QuadChair.png between the January
// and March captures. Never key lift identity off it.
export default function parse(dom) {
  const status = {};
  for (const row of statusRows(dom)) {
    if (row.isLift) {
      status[row.name] = coerce(row.status);
    }
  }
  return status;
}
