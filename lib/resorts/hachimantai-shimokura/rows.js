import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Hachimantai Resort runs two ski areas, Panorama and Shimokura, and serves the
// SAME single <table> on /winter/panorama/... and /winter/shimokura/... - the two
// pages are byte-identical in that region. The table lists パノラマスキー場 first
// and 下倉スキー場 (Shimokura) second, each introduced by a one-cell colspan=4
// section row, so Panorama's rows have to be filtered out or we would publish
// its lifts and courses as Shimokura's.
//
// A name filter is NOT safe: both areas have a 第1ペアリフト and a 第2ペアリフト.
// Only the section row can tell them apart. The section rows also carry an inline
// background colour (#F08300 / #0085D0) - that is cosmetic, so we key on the
// section name and on "this row has a single cell" instead.
//
// The markup is malformed in places (rows open <th> and close </td>), which is
// why cells are picked with 'th, td' rather than by tag.
const SECTION = '下倉スキー場';
const HEADER = /リフト名|コース名/;

//
// 2026-11 redesign: each area's page now has its OWN table (Shimokura's page
// lists only Shimokura's rows) and no section rows at all. So the Panorama
// filter applies only when the table actually has section rows; a table
// without any is taken whole. If a shared table comes back, the first
// section row switches the filter on again.
export default function rows(dom) {
  const list = [];
  const trs = select(dom, 'table tr');
  const sectioned = trs.some(tr => select(tr.children, 'th, td').length === 1);
  let inside = !sectioned;
  for (const tr of trs) {
    const cells = select(tr.children, 'th, td');
    if (cells.length < 2) {
      inside = (findText(cells[0]) ?? '').trim() === SECTION;
      continue;
    }
    const name = findText(cells[0])?.trim();
    if (!inside || !name || HEADER.test(name)) {
      continue;
    }
    const status = findText(cells[1])?.trim();
    if (status) {
      list.push({ name, status });
    }
  }
  return list;
}
