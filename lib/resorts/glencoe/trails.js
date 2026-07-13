import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

// runs list rows: name td + td with "Difficulty:<span>green</span>" and a status image
export default {
  selector: 'table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length !== 2) {
      return;
    }
    const div = select(tds[1].children, 'div')[0];
    if (!/Difficulty:/.test(findText(div) ?? '')) {
      return;
    }
    const level = findText(select(tds[1].children, 'span')[0]);
    const img = select(tds[1].children, 'img')[0];
    const name = findText(tds[0])?.trim();
    if (name && img) {
      return { name, status: status(img.attribs.src), level };
    }
  }
};
