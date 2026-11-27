import { collect } from '../../tools/domutil.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import isFresh, { reportDate } from './fresh.js';

// #tablepress-10 is a LIFT | HOURS schedule, not live status: rows with
// posted hours are only *planned* to run (the page's own footnote), so
// they map to scheduled, never open; tbody skips the LIFT/HOURS header.
// The whole read is gated on the Ski Schedule's dates - see fresh.js.
const SELECTOR = '#tablepress-10 tbody tr';
const PARSE = {
  name: 0,
  status: {
    child: 1,
    fn: s => (s === 'CLOSED' ? 'closed' : 'scheduled')
  }
};

export default function parse(dom) {
  return isFresh(dom) ? collect(dom, SELECTOR, PARSE) : suppressed({}, REASONS.stale, reportDate(dom));
}
