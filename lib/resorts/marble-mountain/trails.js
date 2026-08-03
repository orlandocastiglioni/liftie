import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// difficulty images ship in sized variants (e.g. most_difficult_35.png); strip
// a trailing "_35" / "-300x259" size suffix so normalizeLevel sees the base
// name (most_difficult -> black, more_difficult -> blue, easiest -> green,
// freestyle_terrain -> terrainPark). Rows with no difficulty image get no level.
function levelFromImg(src) {
  if (!src) {
    return undefined;
  }
  return src
    .split('/')
    .pop()
    .replace(/\.png$/i, '')
    .replace(/[-_]\d+(x\d+)?$/i, '');
}

// Trail tables live on the same Ninja Tables page as the lifts; each is
// identified by a header column classed `ninja_clmn_nm_run`. Every body row is
// [run name | <img> difficulty | OPEN / CLOSED / "OPEN (Marginal)" | GROOMED
// state]. The open/closed column (td2) is the trail status - NOT the grooming
// column (td3). "OPEN (Marginal)" would coerce to <scheduled>, so it is mapped
// to open (the run is open, just in marginal condition).
export default function parse(dom) {
  const rows = [];
  for (const table of select(dom, 'table')) {
    if (select(table, 'th.ninja_clmn_nm_run').length === 0) {
      continue;
    }
    for (const tr of select(table, 'tbody tr')) {
      const tds = select(tr, 'td');
      if (tds.length < 3) {
        continue;
      }
      const name = allText(tds[0]).replace(/\s+/g, ' ').trim();
      if (!name) {
        continue;
      }
      const raw = allText(tds[2]).replace(/\s+/g, ' ').trim();
      const status = /marginal/i.test(raw) ? 'open' : raw;
      const level = levelFromImg(select(tds[1], 'img')[0]?.attribs?.src);
      rows.push({ name, status, level });
    }
  }
  return rows;
}
