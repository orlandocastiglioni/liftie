import { parseDocument } from 'htmlparser2';
import select from '../../select.js';

/**
 * /fjallstatus-snorapport/ ships only the tab shell, the column headings and
 * spinner placeholders - every row arrives from a post-load XHR, so the page
 * itself is unscrapable (the in-season Wayback capture has 93 row skeletons
 * and not one badge). The theme module fetches admin-ajax with
 * action=track_data; a plain GET with the action in the query string returns
 * the identical body as its POST, so no POST is needed.
 *
 * Note the WordPress install lives under /wp/ - the endpoint is
 * /wp/wp-admin/admin-ajax.php, not /wp-admin/admin-ajax.php.
 *
 * One GET returns all four sections at once - lifts, pists, offpist and
 * cross-country - so lifts and trails share the descriptor in resort.json.
 * The catch: each *Content value is an HTML FRAGMENT STRING nested inside the
 * JSON, which rest.js's url.html flag cannot reach, so re-parse it here.
 * parseDocument is the synchronous entry point (lib/trails/parse.js collects
 * synchronously).
 */
export function payload(body) {
  return body?.data ?? body ?? {};
}

// the fragment is pretty-printed, so badge text arrives as "\n    Stängt\n"
export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('').replace(/\s+/g, ' ').trim();
}

// Every badge is div.label-01 and every one of them sits inside a row: 11 in
// the lift fragment for 6 rows (6 states plus 5 patrol reasons), one per row
// everywhere else. The state is always the first in document order; anything
// after it is a qualifier.
//
// Tailwind only emits classes that appear in templates, and the theme's built
// CSS contains exactly three badge border colours - border-green-700,
// border-brand-red-800 and border-gray-800 - so the state is provably a
// 3-colour system whatever Swedish wording the CMS puts inside it. Carry the
// colour alongside the text so status.js can key on the language-independent
// signal and fall back to the wording only to tell the gray sub-states apart.
function badge(node) {
  return {
    text: text(node),
    colour: node.attribs?.class?.match(/border-(brand-red|green|gray)-\d+/)?.[1]
  };
}

// Difficulty is carried ONLY as an inline <svg> fill colour - no class, id,
// title or aria-label anywhere on the row, and the shape does not disambiguate
// either (blue and red are both <rect>). Take the first child shape with a
// literal hex fill; the accordion chevron that follows uses currentColor and is
// skipped by that test.
const SHAPE = 'svg circle, svg rect, svg path, svg polygon';

export default function rows(body, key) {
  const doc = parseDocument(payload(body)[key] ?? '');
  return select(doc, '.pist-status-table-row').map(node => ({
    // lifts/pists/offpist put the name in the only .large-text cell;
    // cross-country rows are a different shape (a plain <div>, not a <label>)
    // with TWO .large-text cells where the first is the distance ("~2,1 km")
    // and the second is the name, so callers pick by index
    names: select(node, '.pist-status-table-cell.large-text').map(text),
    badges: select(node, 'div.label-01').map(badge),
    fill: select(node, SHAPE)
      .map(s => s.attribs.fill)
      .find(f => f?.startsWith('#'))
  }));
}
