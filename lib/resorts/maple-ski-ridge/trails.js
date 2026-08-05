import select from '../../select.js';
import { cellsOf, cellText, rowsOf, tableByHeader } from './table.js';

// difficulty is published only as an icon image, and the <img> carries no
// src in the server-rendered html - the media hash has to be read out of the
// wow-image data-image-info json. The three icons in use (verified by
// downloading them): green circle, blue square, black diamond. No
// double-black and no terrain park exist at this hill.
const levels = {
  '91803c_3e16789d0ecc40278cb27abe0b23a423': 'green',
  '91803c_c5b105a5a55f4a0291432d1d9003e998': 'blue',
  '91803c_4b36de36b373429490abef14bbea4029': 'black'
};

// trail rows sit in the table headed "" / "Trail Name" / "Trail Open" -
// icon, name, status. Status is Yes/No, both known to coerce. An unknown
// icon hash (they would change if the site swaps the pngs) just drops the
// level rather than the whole row.
export default function parse(dom) {
  const rows = [];
  const table = tableByHeader(dom, 'Trail Name');
  if (!table) {
    return rows;
  }
  for (const row of rowsOf(table)) {
    const cells = cellsOf(row);
    const name = cellText(cells[1]);
    const status = cellText(cells[2]);
    if (!name || !status) {
      continue;
    }
    rows.push({ name, status, level: levelOf(cells[0]) });
  }
  return rows;
}

function levelOf(cell) {
  const image = cell && select(cell, '[data-image-info]')[0];
  if (!image) {
    return;
  }
  let uri;
  try {
    uri = JSON.parse(image.attribs['data-image-info']).imageData?.uri;
  } catch {
    return;
  }
  return levels[uri?.match(/\/media\/(\w+)~mv2/)?.[1]];
}
