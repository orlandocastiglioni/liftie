import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// trail rows live on the same conditions component as the lifts (see index.js),
// in three winter accordion panes:
//   #collapse20 "Trails With Snow Making"  (35 rows)
//   #collapse21 "Trails Natural Snow Only" (8 rows)   -> 43, the site's own count
//   #collapse30 "Parks Winter"             (3 rows)   -> not in the site's count
//
// row: <div class="col-06">
//        <div class="col-1"><i class="fa fa-check|fa-remove"></i></div>  status
//        <div class="col-1"><i class="fa fa-circle|fa-square"></i>
//                           or <img src=".../single|double-diamond-2.png"></div>
//        <div class="col-6">NAME</div>
//        <div class="col-4">optional snowcat img (groomed)</div>
//      </div>
//
// the summary tiles at the top of the document ("0/8 Lifts Open") reuse the
// col-06 class, so the selectors stay scoped under the #collapseNN panes
function level(cell) {
  if (!cell) {
    return;
  }
  if (select(cell.children, '.fa-circle').length) {
    return 'green';
  }
  if (select(cell.children, '.fa-square').length) {
    return 'blue';
  }
  const src = select(cell.children, 'img')[0]?.attribs?.src ?? '';
  if (src.includes('double-diamond')) {
    return 'doubleBlack';
  }
  if (src.includes('diamond')) {
    return 'black';
  }
}

function rows(dom, selector, forcedLevel) {
  return select(dom, selector)
    .map(node => {
      const name = findText(select(node.children, '.col-6')[0]);
      const [statusCell, levelCell] = select(node.children, '.col-1');
      // 'remove' is not in the central status vocabulary, map both icons here
      const icon = select(statusCell?.children ?? [], 'i')[0]?.attribs?.class?.match(/fa-(check|remove)/)?.[1];
      if (!name || !icon) {
        return;
      }
      return {
        name,
        status: icon === 'check' ? 'open' : 'closed',
        // the park rows carry a plain blue square icon, report them as parks
        level: forcedLevel ?? level(levelCell)
      };
    })
    .filter(Boolean);
}

export default function parse(dom) {
  return [
    ...rows(dom, '#collapse20 .col-06'),
    ...rows(dom, '#collapse21 .col-06'),
    ...rows(dom, '#collapse30 .col-06', 'terrainPark')
  ];
}
