import Debug from 'debug';
import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

const debug = Debug('liftie:resort:smokey-mountain');

/**
 * Lift status is hand-edited free text, not a table: a "LIFTS STATUS" heading
 * followed by a block of <p> lines reading "LiftName (hill size) - Status
 * [ - extra note]" (in season "Magic Carpet (small hill) - Open"; off season
 * "Skytrac Quad Chair Lift - Closed - Opens Friday January 23 @ 6 PM AST").
 *
 * Two layouts have been live:
 *
 * - until 2026: a Joomla site behind Incapsula, at
 *   /general-information/current-conditions, fetched through flaresolverr.
 *   The heading was <strong>LIFTS STATUS</strong> and the lines sat in the
 *   next <div class="custom">.
 * - since the 2026 move to WordPress/Elementor, at
 *   /general-information/current-local-conditions/: plain HTTP, no challenge.
 *   The heading is an <h3> in one Elementor widget and the lines are in the
 *   next div.elementor-widget-text-editor, separated by an EN DASH (&#8211;)
 *   rather than a hyphen. The old URL now answers 404.
 *
 * Anchor on the heading in either form and take the next block of either kind,
 * rather than selecting blocks globally: the page carries a dozen unrelated
 * ones. Each line splits on a spaced hyphen or dash: segment[0] is the lift
 * name (the trailing "(small hill)"/"(med hill)" is stripped), segment[1] the
 * status token. Only Open/Closed appear, both known to coerce; any trailing
 * "Opens ..." note is ignored.
 */

function hasClass(node, name) {
  return (node.attribs?.class ?? '').split(/\s+/).includes(name);
}

function isLinesBlock(node) {
  return (
    node?.type === 'tag' &&
    node.name === 'div' &&
    (hasClass(node, 'custom') || hasClass(node, 'elementor-widget-text-editor'))
  );
}

// walk forward across siblings, climbing to ancestors, until we hit the first
// lines block that follows the given node in document order
function nextLinesBlock(node) {
  for (let cur = node; cur; cur = cur.parent) {
    for (let sib = cur.next; sib; sib = sib.next) {
      if (isLinesBlock(sib)) {
        return sib;
      }
    }
  }
}

export default function parse(dom) {
  const heading = select(dom, 'strong, h1, h2, h3, h4, h5, h6').find(n =>
    allText(n).trim().toUpperCase().startsWith('LIFTS STATUS')
  );
  if (!heading) {
    debug('LIFTS STATUS heading not found');
    return {};
  }
  const block = nextLinesBlock(heading);
  if (!block) {
    debug('no lines block after LIFTS STATUS heading');
    return {};
  }
  const status = {};
  for (const p of select(block, 'p')) {
    // the stream parser's DomHandler collapses runs of whitespace (including
    // the trailing &nbsp; some lines carry) to single spaces, so trim suffices
    const line = allText(p).trim();
    const parts = line.split(/\s+[-–—]\s+/);
    if (parts.length < 2) {
      continue;
    }
    const name = parts[0].replace(/\s*\([^)]*\)\s*$/, '').trim();
    if (!name) {
      continue;
    }
    status[name] = coerce(parts[1]);
  }
  debug('smokey-mountain lift status:', status);
  return status;
}
