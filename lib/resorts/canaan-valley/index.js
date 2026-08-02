import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// server-rendered lift list under 'Quick Stats' on /trail-report (populated year-round):
// <div class="lifts"><ul><li><span class="name">"A" Lift</span>...<span class="status">Closed</span>
// 'Tubing Lift' appears twice; suffix repeats so the status map keeps all 6 entries

function liftName(node) {
  return findText(select(node.children ?? [], 'span.name')[0])?.trim();
}

export default {
  selector: 'div.lifts ul li',
  parse(node) {
    const name = liftName(node);
    if (!name) {
      return;
    }
    // count earlier rows with the same name so duplicates stay distinct
    let dupes = 0;
    for (let prev = node.prev; prev; prev = prev.prev) {
      if (prev.type === 'tag' && prev.name === 'li' && liftName(prev) === name) {
        dupes += 1;
      }
    }
    return {
      name: dupes ? `${name} ${dupes + 1}` : name,
      status: findText(select(node.children, 'span.status')[0])
    };
  }
};
