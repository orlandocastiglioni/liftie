import Debug from 'debug';
import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

const debug = Debug('liftie:resort:smokey-mountain');

/**
 * skismokey.ca is a Joomla site behind Incapsula/Imperva - a plain curl returns
 * only a ~212-byte _Incapsula_Resource JS stub - so resort.json routes the
 * current-conditions page through flaresolverr, which clears the challenge and
 * hands pipe.js the rendered HTML.
 *
 * Lift status is hand-edited free text, not a table. An underlined
 * <strong>LIFTS STATUS</strong> heading is immediately followed by a
 * <div class="custom"> whose <p> lines read "LiftName (hill size) - Status
 * [ - extra note]" (in season "Magic Carpet (small hill) - Open"; off season
 * "Skytrac Quad Chair Lift - Closed - Opens Friday January 23 @ 6 PM AST").
 * The page carries a dozen unrelated .custom blocks, so we anchor on the
 * heading and take the next .custom sibling rather than selecting .custom
 * globally.
 *
 * Each line splits on " - ": segment[0] is the lift name (we strip the trailing
 * "(small hill)"/"(med hill)" size parenthetical), segment[1] is the status
 * token. Only Open/Closed appear, both already known to coerce; any trailing
 * "Opens ..." note (segment[2]) is ignored.
 */

function isCustomDiv(node) {
  return node?.type === 'tag' && node.name === 'div' && (node.attribs?.class ?? '').split(/\s+/).includes('custom');
}

// walk forward across siblings, climbing to ancestors, until we hit the first
// div.custom that follows the given node in document order
function nextCustomBlock(node) {
  for (let cur = node; cur; cur = cur.parent) {
    for (let sib = cur.next; sib; sib = sib.next) {
      if (isCustomDiv(sib)) {
        return sib;
      }
    }
  }
}

export default function parse(dom) {
  const heading = select(dom, 'strong').find(n => allText(n).trim().toUpperCase().startsWith('LIFTS STATUS'));
  if (!heading) {
    debug('LIFTS STATUS heading not found');
    return {};
  }
  const block = nextCustomBlock(heading);
  if (!block) {
    debug('no .custom block after LIFTS STATUS heading');
    return {};
  }
  const status = {};
  for (const p of select(block, 'p')) {
    // the stream parser's DomHandler collapses runs of whitespace (including
    // the trailing &nbsp; some lines carry) to single spaces, so trim suffices
    const line = allText(p).trim();
    const parts = line.split(/\s+-\s+/);
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
