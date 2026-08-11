import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Mt Washington replatformed from Joomla / SP Page Builder to WordPress some
 * time before 2026-08. The old parsers keyed on
 * div.slope-grid-container.slope-grid-rows and FontAwesome icon classes; none
 * of that markup exists any more, which is why the resort published nothing
 * while the mountain was demonstrably running ("lifts are spinning daily").
 *
 * The block plugin emits, for both lifts and trails:
 *
 *   <div class="pgri-clist pgri-clist--lifts">
 *     <h3>Lifts</h3>
 *     <div class="pgri-clist__row">
 *       <span class="pgri-clist__name"> Eagle Quad </span>
 *       <span class="pgri-clist__pill pgri-clist__pill--open">Open</span>
 *
 * STATUS COMES FROM THE MODIFIER CLASS, NOT THE PILL TEXT. A closed row renders
 * its pill as an em dash:
 *   <span class="pgri-clist__pill pgri-clist__pill--closed">—</span>
 * so reading the text hands coerce "—", which is unknown and silently becomes
 * 'scheduled' - a closed lift shown as about to open. The four modifiers in use
 * are open / closed / hold / groomed, and all four are keys coerce knows.
 */
const PILL = 'pgri-clist__pill--';
const DIFF = 'pgri-clist__diff--';

function modifier(node, prefix) {
  const cls = node?.attribs?.class ?? '';
  const m = cls.match(new RegExp(`${prefix}([a-z-]+)`));
  return m?.[1];
}

// the name span also holds the difficulty dot and a tags span, so take its own
// text nodes rather than the whole subtree
function ownText(node) {
  return (node?.children ?? [])
    .filter(c => c.type === 'text')
    .map(c => c.data)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function rows(dom, kind) {
  const out = [];
  for (const list of select(dom, `.pgri-clist--${kind}`)) {
    for (const row of select(list, '.pgri-clist__row')) {
      const nameNode = select(row, '.pgri-clist__name')[0];
      const name = ownText(nameNode) || findText(nameNode)?.trim();
      if (!name) {
        continue;
      }
      const pill = select(row, '.pgri-clist__pill')[0];
      const diff = select(row, '.pgri-clist__diff')[0];
      out.push({
        name,
        status: modifier(pill, PILL),
        level: modifier(diff, DIFF)
      });
    }
  }
  return out;
}
