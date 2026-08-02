import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// trail rows live on the same conditions page as the lifts, in the winter
// accordion sections #collapse20 (Trails Winter) and #collapse21 (Trails
// Glades Winter); in summer #collapse20 holds the bike park trails in the
// same markup
//
// row: <div class="col-06">
//        <div class="col-1"><i class="fa fa-check|fa-remove"></i></div>  status
//        <div class="col-1"><i class="fa fa-circle|fa-square"></i>
//                           or <img src=".../single|double-diamond-2.png"></div>
//        <div class="col-6">NAME</div>
//        <div class="col-4">optional snowcat img (groomed)</div>
//      </div>
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

export default {
  selector: '#collapse20 .col-06, #collapse21 .col-06',
  parse: node => {
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
      level: level(levelCell)
    };
  }
};
