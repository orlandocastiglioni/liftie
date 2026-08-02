import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

const sections = { 初級: 'green', 中級: 'blue', 上級: 'black' };
// course tables are tagged with a level class; the label moved from
// <caption> (early 2026) to an <h3> outside the table (March 2026),
// so the class is the reliable signal
const classes = { shokyu: 'green', chukyu: 'blue', jokyu: 'black' };

// course tables: コース名 | 滑走状況 | お知らせ with level in the table class
// (and formerly in a caption / section-label row); park, tree-run and yukinos
// rows each live in their own header-less one-row table (the パーク名 header
// is a separate sibling table) with the name cell classed "course_name"
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table')) {
    const trs = select(table.children, 'tr');
    const caption = select(table.children, 'caption')[0];
    const tableClass = table.attribs?.class ?? '';
    let level =
      classes[Object.keys(classes).find(c => tableClass.includes(c))] ??
      (caption && sections[Object.keys(sections).find(k => (findText(caption) ?? '').includes(k))]);
    let headerIdx = -1;
    for (const [i, tr] of trs.entries()) {
      const cellNodes = select(tr.children, 'th, td');
      const cells = cellNodes.map(findText);
      const joined = cells.filter(Boolean).join(' ');
      if (/コース名|パーク名/.test(joined)) {
        headerIdx = i;
        if (/パーク名/.test(joined)) {
          level = 'terrainPark';
        }
        continue;
      }
      if (headerIdx < 0) {
        if (/course_name/.test(cellNodes[0]?.attribs?.class ?? '')) {
          // header-less park/kids data row
          if (cells[0] && cells[1]) {
            rows.push({ name: cells[0].trim(), status: status(cells[1]), level: 'terrainPark' });
          }
          continue;
        }
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
