import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * The status widget holds the lift's OPENING TIME in season ('9:30 am',
 * '9:30am' - the spacing is inconsistent between rows) and the word 'Closed'
 * out of season. coerce knows 'closed' but neither time form, so without this
 * pre-normalisation every running lift would silently land on 'scheduled'.
 * Anything we don't recognise is passed through so coerce can log it.
 */
function toStatus(value) {
  const text = value.trim();
  if (/closed/i.test(text)) {
    return 'closed';
  }
  if (/\d\s*:?\d*\s*[ap]\.?\s*m\.?/i.test(text)) {
    return 'open';
  }
  return text;
}

/**
 * Elementor page: the Lift Report block holds one '.e-con.e-child' container
 * per lift, each pairing a name in a div.elementor-heading-title with a status
 * in a span.elementor-heading-title - the div/span split is the discriminator.
 * Scoping to the block is mandatory: the Terrain Report block directly above
 * uses the identical markup for its 'Trails Open'/'69/69' counters and would
 * otherwise show up as bogus lifts. The block's lone caption div carries no
 * status span, so requiring both nodes skips it.
 * Only Chair 1-5 are published; the resort's 3 rope tows never appear.
 */
export default {
  selector: '.elementor-element-3885479 .e-con.e-child',
  parse(node) {
    const nameNode = select(node, 'div.elementor-heading-title')[0];
    const statusNode = select(node, 'span.elementor-heading-title')[0];
    if (!nameNode || !statusNode) {
      return;
    }
    return {
      name: allText(nameNode).trim(),
      status: toStatus(allText(statusNode))
    };
  }
};
