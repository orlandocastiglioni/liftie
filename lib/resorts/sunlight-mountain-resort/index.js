import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// The three chairs are emitted by a child-theme shortcode inside the Elementor
// container div.grd_bg.mntn_bx.lfts (heading <h4>LIFTS</h4>): one li per lift,
// name in span.condens_lgt, OPEN/CLOSED token in span.condens_bld - both known
// to coerce, which lowercases before looking up.
export default {
  selector: 'div.mntn_bx.lfts .elementor-shortcode li',
  parse: {
    name: node => findText(select(node, 'span.condens_lgt')[0]),
    status: node => findText(select(node, 'span.condens_bld')[0])
  }
};
