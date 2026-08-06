import coerce from '../../tools/coerce.js';
import rows from './rows.js';
import status from './status.js';

// the five chairs under <h3>リフト</h3>: 第1ペア, 第2ペア, 第3クワッド,
// 第5クワッド（野尻湖ﾃﾗｽ観光ﾘﾌﾄ）, 第6ペア
export default function parse(dom) {
  const liftStatus = {};
  for (const row of rows(dom, 'lift')) {
    liftStatus[row.name] = coerce(status(row.token, row.label));
  }
  return liftStatus;
}
