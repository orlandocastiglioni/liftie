import parse from '../../tools/nordic-pulse.js';
import isStale from '../../tools/stale.js';

// Dog Creek sets its Nordic Pulse `open` flags by hand and does not clear them
// at season end: on 2026-11-17 all 25 trails still read open, with the area's
// newest grooming record at 2026-03-16. The shared parser already dates the
// report from that grooming record (reportedAt); publish nothing once it is
// provably stale (lib/tools/stale.js, fails open when there is no date). Dog
// Creek grooms in season, so a running centre always has a recent record.
export default function trails(dom) {
  const rows = parse(dom);
  const at = rows.reportedAt ? Date.parse(rows.reportedAt) : undefined;
  return isStale(at) ? [] : rows;
}
