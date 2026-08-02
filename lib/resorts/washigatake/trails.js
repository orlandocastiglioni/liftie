import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

const sections = { 初級: 'green', 中級: 'blue', 上級: 'black' };
// course tables also carry a level class (the sister takasu site dropped
// the <caption> in favor of an outside <h3> mid-2026, keep both signals)
const classes = { shokyu: 'green', chukyu: 'blue', jokyu: 'black' };

// section#course tables: caption 初級コース/中級コース/上級コース (level also in
// the table class), header コース名 | 滑走状況 | お知らせ, rows th/td name + glyph;
// section#park: the パーク名 header sits in its own table and every park is a
// separate header-less one-row table, so scope by section instead of headers
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'section#course table')) {
    const caption = select(table.children, 'caption')[0];
    const tableClass = table.attribs?.class ?? '';
    const level =
      classes[Object.keys(classes).find(c => tableClass.includes(c))] ??
      (caption && sections[Object.keys(sections).find(k => (findText(caption) ?? '').includes(k))]);
    for (const tr of select(table.children, 'tr')) {
      const cells = select(tr.children, 'th, td').map(findText);
      if (/コース名/.test(cells.filter(Boolean).join(' '))) {
        continue; // header row
      }
      if (cells[0] && cells[1]) {
        rows.push({ name: cells[0].trim(), status: status(cells[1]), level });
      }
    }
  }
  for (const table of select(dom, 'section#park table')) {
    for (const tr of select(table.children, 'tr')) {
      const cells = select(tr.children, 'th, td').map(findText);
      if (/パーク名/.test(cells.filter(Boolean).join(' '))) {
        continue; // header-only table
      }
      if (cells[0] && cells[1]) {
        rows.push({ name: cells[0].trim(), status: status(cells[1]), level: 'terrainPark' });
      }
    }
  }
  return rows;
}
