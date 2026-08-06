import rows, { reportedAt } from './rows.js';
import status from './status.js';

// The status board carries no difficulty markers, so the levels come from the
// SLOPE OVERVIEW (ゲレンデ概要) section further down the same page, which groups
// the named slopes under 初心者コース / 中級者コース / 上級者コース. Keyed on the
// parenthesised Japanese slope name in the board's row label, e.g.
// 'Ｍ１（ミズナラスロープ上部）'; ミズナラスロープ covers both 上部 and 下部.
const levels = {
  カラマツスロープ: 'green',
  双子滑降コース: 'blue',
  白樺スロープ: 'blue',
  トドマツスロープ: 'blue',
  双子林間コース: 'blue',
  スラロームバーン: 'black',
  ミズナラスロープ: 'black'
};

// courses are the board rows that are not lifts
export default function parse(dom) {
  const list = rows(dom)
    .filter(row => !row.name.includes('リフト'))
    .map(row => ({
      name: row.name,
      status: status(row.status),
      level: levels[Object.keys(levels).find(slope => row.name.includes(slope))]
    }));
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
