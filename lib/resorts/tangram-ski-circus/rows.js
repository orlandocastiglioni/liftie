import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// lift.php renders three <div class="<section> list"> blocks - lift, course and
// park ("その他施設") - all with identical row markup:
//
//   <div class="head">…</div>                          <- column titles, skipped
//   <div class="line TOKEN">
//     <div>name</div>
//     <div class="cond">Japanese label</div>
//     <div>length / opening hours / free-text note</div>
//   </div>
//
// TOKEN is the second class on div.line. The trail-map overlay repeats the same
// tokens on #lift_canvas div[id^=lift_], but those carry no names, so they are
// only useful as a cross-check and are not read here.
export default function rows(dom, section) {
  const list = [];
  for (const line of select(dom, `div.${section}.list div.line`)) {
    const cells = line.children.filter(c => c.name === 'div');
    const name = findText(cells[0])?.trim();
    if (!name) {
      continue;
    }
    const token = (line.attribs.class ?? '').split(/\s+/).find(c => c && c !== 'line') ?? '';
    list.push({ name, token, label: findText(cells[1])?.trim() ?? '' });
  }
  return list;
}
