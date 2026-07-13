import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

const levels = { 1: 'green', 2: 'blue', 3: 'black', 4: 'doubleBlack' };

// visual-composer grid rows: .trail-title h4 name, a numbered difficulty
// image (trails only), and a custom-field span with Open/Closed
export default function rows(dom) {
  const result = [];
  for (const row of select(dom, '.wpb_row')) {
    const name = findText(select(row.children, '.trail-title h4')[0])?.trim();
    if (!name) {
      continue;
    }
    const status = select(row.children, '.w-post-elm-value')
      .map(findText)
      .find(t => /^\s*(open|closed)\s*$/i.test(t ?? ''));
    if (!status) {
      continue;
    }
    const img = select(row.children, 'img').find(i => /\/([1-4])(-\d+x\d+)?\.png$/.test(i.attribs.src ?? ''));
    const level = img && levels[img.attribs.src.match(/\/([1-4])(?:-\d+x\d+)?\.png$/)[1]];
    result.push({ name, status: status.trim(), level });
  }
  return result;
}
