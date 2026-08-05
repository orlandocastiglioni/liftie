import { child, childText } from '../../tools/domutil.js';
import te2status from './status.js';

// dodgeridge.com is WordPress; /lift-status/ ships an empty container that the
// skiresortstatus plugin fills over admin-ajax, so read the fragment directly:
//   <div class="lift"><span style="color:#A02040;"><img ...>
//     <div class="lift-details"><p class="lift-name">..</p>
//       <p class="lift-status">..</p><p class="lift-type">Type: ..</p></div>
// the fragment is slightly malformed (a stray </div> before </span>), which is
// why the child-index paths hop through the span first
export default {
  selector: 'div.lift',
  parse(node) {
    const name = childText(node, '0/1/0');
    if (!name) {
      return;
    }
    return {
      name,
      status: te2status(childText(node, '0/1/1'), child(node, 0)?.attribs?.style)
    };
  }
};
