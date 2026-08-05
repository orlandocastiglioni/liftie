import { child, childText } from '../../tools/domutil.js';
import te2status from './status.js';

// same plugin/endpoint as the lifts, action=fetch_trail_data:
//   <div class="trail"><span style="color:#A02040;">
//     <img src=".../difficulty_icons/blue_square.png" alt="NAME difficulty icon">
//     <div class="trail-details"><p class="trail-name">..</p>
//       <p class="trail-status">..</p><p class="trail-area">Area: ..</p></div>
// the level comes from the icon filename - green_circle | blue_square |
// black_diamond | double_black_diamond - all four already known to
// normalizeLevel, which strips the underscores
export default {
  selector: 'div.trail',
  parse(node) {
    const name = childText(node, '0/1/0');
    if (!name) {
      return;
    }
    return {
      name,
      status: te2status(childText(node, '0/1/1'), child(node, 0)?.attribs?.style),
      level: child(node, '0/0')?.attribs?.src?.match(/difficulty_icons\/([a-z_]+)\./)?.[1]
    };
  }
};
