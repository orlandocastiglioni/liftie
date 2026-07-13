import { findText } from '../../tools/domutil.js';

// flexible-table-block rows: color swatch | trail name | difficulty | status
// (the lift table has only 3 cells and no status column, so lifts stay disabled)
export default {
  selector: 'figure.wp-block-flexible-table-block-table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length < 4) {
      return;
    }
    const name = findText(tds[1]);
    let level = findText(tds[2]);
    if (/Extremely Difficult/i.test(level ?? '')) {
      level = 'doubleBlack';
    } else if (/Terrain Park/i.test(level ?? '')) {
      level = 'terrainPark';
    }
    const status = findText(tds[3]);
    if (name && status) {
      return { name, status, level };
    }
  }
};
