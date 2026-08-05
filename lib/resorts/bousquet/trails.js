import select from '../../select.js';
import { squish, text, visibleStatus } from './rows.js';

// the difficulty marker is an inline SVG with no text of any kind:
//   <circle>  -> green
//   <rect>    -> blue  (match the ELEMENT, not the fill: "LOWER BEELINE" is a
//                       rect filled with an embedded base64 PNG of a blue
//                       square instead of fill="#017FFF")
//   <path>    -> diamonds, drawn as two paths each: 2 = black, 4 = doubleBlack
function level(node) {
  const icon = select(node, '.elementor-icon-box-icon')[0];
  if (!icon) {
    return;
  }
  if (select(icon, 'circle').length) {
    return 'green';
  }
  if (select(icon, 'rect').length) {
    return 'blue';
  }
  const paths = select(icon, 'path').length;
  if (paths >= 4) {
    return 'doubleBlack';
  }
  if (paths >= 2) {
    return 'black';
  }
}

// trail rows are the inner sections carrying an icon-box widget. The middle
// column is a surface CONDITION ("Groomed Packed Powder", "Ungroomed +
// Experts Only", "Terrain Park") and NOT a status - liftie has no field for
// it, so it is dropped rather than coerced.
export default {
  selector: 'section.elementor-inner-section:has(.elementor-widget-icon-box)',
  parse(node) {
    const name = squish(text(select(node, '.elementor-icon-box-title')[0]));
    if (!name) {
      return;
    }
    return { name, status: visibleStatus(node), level: level(node) };
  }
};
