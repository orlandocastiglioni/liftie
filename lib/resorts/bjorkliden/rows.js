import { parseDocument } from 'htmlparser2';
import select from '../../select.js';

// /snorapport-fjallstatus/ ships only spinners; the theme fills the tab panels
// from admin-ajax (action=track_data). One GET returns all four sections at
// once - lifts, pists, offpist and cross-country - so lifts and trails share
// the descriptor in resort.json.
//
// The catch: every *Content value is an HTML FRAGMENT STRING nested one level
// down inside the JSON. rest.js's url.html flag parses a whole-body HTML
// response and cannot reach it, so re-parse the fragment here. parseDocument is
// the synchronous entry point (the streaming parser behind the html pipeline is
// callback-based, and lib/trails/parse.js collects synchronously).
//
// Live admin-ajax answers { success, data: {...} }; the archived captures
// inline the bare data object in a data-source attribute. Accept either.
export function payload(body) {
  return body?.data ?? body ?? {};
}

// parseDocument keeps whitespace text nodes, and the badge markup is
// pretty-printed ("\n    Stängt\n"), so normalise rather than reading a single
// text child.
export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('').replace(/\s+/g, ' ').trim();
}

// A status badge is <div class="px-2 py-1.5 border ... border-<colour>-<n>">.
// The first badge in document order is the state; any further badge is a
// qualifier (a reason on lifts, nothing so far elsewhere). The cell wrapping it
// differs between sections - '.badges' on lifts, a plain cell on pists - so
// select the badge itself rather than its container.
const BADGE = 'div[class~="px-2"][class~="border"]';

// Difficulty is carried ONLY as an inline <svg> fill colour: no class, id,
// title or aria-label anywhere on the row. Take the first child shape with a
// literal hex fill; the accordion chevron that follows uses currentColor and is
// skipped by that test.
const SHAPE = 'svg circle, svg rect, svg path, svg polygon';

export default function rows(body, key) {
  const doc = parseDocument(payload(body)[key] ?? '');
  return select(doc, '.pist-status-table-row').map(node => ({
    // lifts/pists/offpist put the name in the only .large-text cell;
    // cross-country rows put the distance in the first and the name in the
    // second, so callers pick by index
    names: select(node, '.pist-status-table-cell.large-text').map(text),
    badges: select(node, BADGE).map(text),
    fill: select(node, SHAPE)
      .map(s => s.attribs.fill)
      .find(f => f?.startsWith('#'))
  }));
}
