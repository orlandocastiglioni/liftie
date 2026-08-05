import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

// Ski Mont Rigaud shows its two lifts in a homepage widget (#barre_conditions).
// Each lift is a `<span>` inside `li.remontees`; the name is the span text
// (e.g. "QUAD CHAIR", "MAGIC CARP."). Status is encoded by CLASS PRESENCE, not
// text: a closed lift's span carries the extra class `remontees_out` (styled at
// opacity 0.4); an open lift's span has no such class. There is no text token
// for coerce to read, so status is derived from the class directly.
export default function parse(dom) {
  const lifts = {};
  for (const span of select(dom, '#barre_conditions li.remontees span')) {
    const name = allText(span).replace(/\s+/g, ' ').trim();
    if (!name) {
      continue;
    }
    const closed = /\bremontees_out\b/.test(span.attribs.class ?? '');
    lifts[name] = coerce(closed ? 'closed' : 'open');
  }
  return lifts;
}
