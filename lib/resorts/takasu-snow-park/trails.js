import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

const sections = { 初級: 'green', 中級: 'blue', 上級: 'black' };

// course tables: [section row like 初級コース] コース名 | 滑走状況 | お知らせ;
// park tables use パーク名 in the header instead
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table')) {
    const trs = select(table.children, 'tr');
    const caption = select(table.children, 'caption')[0];
    let level = caption && sections[Object.keys(sections).find(k => (findText(caption) ?? '').includes(k))];
    let headerIdx = -1;
    for (const [i, tr] of trs.entries()) {
      const cells = select(tr.children, 'th, td').map(findText);
      const joined = cells.filter(Boolean).join(' ');
      if (/コース名|パーク名/.test(joined)) {
        headerIdx = i;
        if (/パーク名/.test(joined)) {
          level = 'terrainPark';
        }
        continue;
      }
      if (headerIdx < 0) {
        const section = Object.keys(sections).find(k => joined.includes(k));
        if (section) {
          level = sections[section];
        }
        continue;
      }
      if (cells[0] && cells[1]) {
        rows.push({ name: cells[0].trim(), status: status(cells[1]), level });
      }
    }
  }
  return rows;
}
