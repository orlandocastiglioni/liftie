import { findText } from '../../tools/domutil.js';

// trail table columns: difficulty icon | Trail Name | status icon | grooming;
// icon filenames carry the values (green_circle.svg, Closed.svg)
export default {
  selector: 'table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length !== 4) {
      return;
    }
    const level = tds[0].children
      .find(c => c.name === 'img')
      ?.attribs.src.match(/(green_circle|blue_square|black_diamond|double_black|terrain_park)[a-z_]*\.svg/)?.[1];
    if (!level) {
      return;
    }
    const status = tds[2].children.find(c => c.name === 'img')?.attribs.src.match(/([A-Za-z_]+)\.svg/)?.[1];
    const name = findText(tds[1]);
    if (name && status) {
      return { name, status, level };
    }
  }
};
