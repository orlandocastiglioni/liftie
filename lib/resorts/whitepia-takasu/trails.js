import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// 初級 / 中級 / 上級 are not in the levels map in lib/trails/parse.js
const sections = { 初級: 'green', 中級: 'blue', 上級: 'black' };

// Everything on /operation/ that is not a lift comes in one of three table
// shapes, so we walk h3 and table together in document order and keep the most
// recent heading around for the shape that has no name column:
//
//   A  難易度 | コース名 | 滑走可否   the three COURSE tables (15 runs)
//   B  コース名 | 可否 | 備考        the MOGUL table (3 runs) - note the column
//                                    order differs from A, so columns are found
//                                    by header text rather than by position
//   C  可否 | 備考                   four single-row tables with NO name column
//                                    (PARK / KID'S PIA / LET'S PIA / SNOW
//                                    TREKKING); the name is the <h3> above them
//
// The h3 is "<English label><span>Japanese label</span>", e.g.
// PARK<span>フリースタイルパーク</span>. We keep the Japanese span - it is the
// descriptive half ("PARK" alone is useless) and it matches the Japanese lift
// and course names on the rest of the page.
export default function parse(dom) {
  const rows = [];
  let heading;
  for (const node of select(dom, 'h3, table')) {
    if (node.name === 'h3') {
      heading = node;
      continue;
    }
    const trs = select(node.children, 'tr');
    const header = select(trs[0]?.children ?? [], 'th, td').map(cell => (findText(cell) ?? '').trim());
    // lift tables (both the main one and #washitopia) belong to index.js
    if (!header.length || header[0].includes('リフト名')) {
      continue;
    }
    const nameIdx = header.findIndex(h => h.includes('コース名'));
    const levelIdx = header.findIndex(h => h.includes('難易度'));
    const statusIdx = header.findIndex(h => h.includes('可否'));
    if (statusIdx < 0) {
      continue;
    }
    for (const tr of trs.slice(1)) {
      const cells = select(tr.children, 'th, td').map(findText);
      const name = nameIdx < 0 ? headingName(heading) : cells[nameIdx]?.trim();
      if (!name || !cells[statusIdx]) {
        continue;
      }
      rows.push({
        name,
        status: status(cells[statusIdx]),
        level: levelIdx < 0 ? impliedLevel(nameIdx, name) : sections[cells[levelIdx]?.trim()]
      });
    }
  }
  return rows;
}

function headingName(h3) {
  if (!h3) {
    return;
  }
  const span = select(h3.children, 'span')[0];
  return (findText(span) ?? findText(h3) ?? '').trim();
}

// Shape B (mogul) carries no difficulty at all - its rows are literally named
// 初級コース / 中級コース / 上級コース and we leave them unlevelled rather than
// read a level out of a name. Shape C is levelless too, except that the
// freestyle park announces itself: フリースタイルパーク is a terrain park.
function impliedLevel(nameIdx, name) {
  if (nameIdx < 0 && name.includes('パーク')) {
    return 'terrainPark';
  }
}
