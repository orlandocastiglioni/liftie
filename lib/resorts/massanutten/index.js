import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

// massresort.com was rebuilt on Astro for 26/27 and the SnowReport-* markup
// is gone. The conditions page now ships every lift as an
// li[data-status-lift="<id>"] with its name (p.lift-title) and type, but no
// status: a module script POSTs to the Astro action getLiftTrailStatus and
// writes the result back onto each row as data-state (open / scheduled /
// hold / closed, the four keys of the page's own label map) plus a label.
// So the page is fetched through renderd, which waits for data-state to
// appear (see resort.json).
//
// When the action fails the script sets data-state="unavailable" on every
// row; that is no status at all, not a lift about to open, so those rows are
// dropped rather than left to coerce's 'scheduled' fallback.
const STATES = new Set(['open', 'scheduled', 'hold', 'closed']);

export default function parse(dom) {
  const lifts = {};
  for (const row of select(dom, 'li[data-status-lift]')) {
    const name = allText(select(row, '.lift-title')[0] ?? {})
      .replace(/\s+/g, ' ')
      .trim();
    const state = row.attribs['data-state'];
    if (!name || !STATES.has(state)) {
      continue;
    }
    lifts[name] = coerce(state);
  }
  return lifts;
}
