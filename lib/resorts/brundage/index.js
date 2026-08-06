import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// WordPress grooming report: section.lift-zone-report groups the lifts into
// four zones, each row being a div.weather-conditions-widget with h4 = name
// and p.lift-status = status ("Open" / "Closed", both known to coerce).
// Careful: the row's second, bare <p> is an hours / free-text note ("Closed
// for the Season", "Click Trail Status for Open Runs") and must never be read
// as the status - only p.lift-status is authoritative. Scope everything to
// #grooming-report so the page's summer bike widgets can't leak in.
export default {
  selector: '#grooming-report .lift-zone-report__zone__lifts li .weather-conditions-widget',
  parse: {
    name: node => findText(select(node, 'h4')[0]),
    status: node => findText(select(node, 'p.lift-status')[0])
  }
};
