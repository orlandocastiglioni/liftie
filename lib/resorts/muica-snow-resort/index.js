import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import status from './status.js';

// リフト運行予定 block on /ski/: ul.todayBlk02__list > li, each li holding one
// <dl> with the name in dt.todayBlk02__sub and the status in
// dd > p.todayBlk02__txt.
//
// Both cells are broken across lines for the narrow layout - the name as
// 第1<br class="spDisp">クワッド and スノー<br>エスカレーター, the status as
// 08:30<br>〜16:00 - so their text nodes are joined with NO separator, which is
// what deepText does. Splitting on the <br> instead would produce '第1' and
// '08:30' and lose half of every value.
//
// Off-season the block stays on the page with every row at 営業終了, so this
// keeps publishing the full five-lift roster rather than emptying out.
export default function parse(dom) {
  const liftStatus = {};
  for (const li of select(dom, '.todayBlk02__list > li')) {
    const name = deepText(select(li, 'dt.todayBlk02__sub')[0]).trim();
    if (name) {
      liftStatus[name] = coerce(status(deepText(select(li, 'p.todayBlk02__txt')[0])));
    }
  }
  return liftStatus;
}

// domutil.allText only reads a node's DIRECT text children, and here the text
// sits one level down inside a <span>, so collect it recursively
function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}
