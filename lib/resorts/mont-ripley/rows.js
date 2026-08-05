import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Michigan Tech publishes the Mont Ripley report as four sibling <table>s
 * inside <article id="content_body">, told apart only by their <caption>:
 * "Fast Facts", "Lift Status", "Run Status" and "Tube Park Handle Tow".
 * The tube-park table has exactly the same th/td shape as the lift table but
 * its "names" are weekdays, so the table is always picked by caption - never
 * by position or markup shape.
 *
 * Every table opens with a stray empty <tr></tr>, hence the empty-row filter.
 */

function caption(table) {
  const node = select(table, 'caption')[0];
  return node ? allText(node).trim() : '';
}

export default function tableRows(dom, wanted) {
  const table = select(dom, 'article#content_body table').find(t => caption(t) === wanted);
  if (!table) {
    return [];
  }
  return select(table, 'tr')
    .map(tr => select(tr, 'td, th'))
    .filter(cells => cells.length > 0);
}

// the report is hand-written and has carried free text in the status cell
// ("Closed from storm damage" on three runs in the 2022 capture), which coerce
// would silently turn into 'scheduled' - keep the leading word only.
// Otherwise the vocabulary is OPEN / Open / Yes / CLOSED / Closed, all known.
export function status(raw) {
  const text = (raw ?? '').trim();
  if (/^closed\b/i.test(text)) {
    return 'closed';
  }
  if (/^open\b/i.test(text)) {
    return 'open';
  }
  return text;
}
