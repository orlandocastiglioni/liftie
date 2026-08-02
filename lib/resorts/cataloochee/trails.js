import { allText, child } from '../../tools/domutil.js';

// difficulty is only encoded in the td0 icon class
const levels = {
  'fa-circle': 'green',
  'fa-square-full': 'blue',
  'fa-diamond': 'black',
  'fa-rectangle-wide': 'terrainPark'
};

// same table idiom as the lifts: <tr><td><i class="fas fa-..."></i> NAME</td>
// <td><i class="fas fa-check|fa-times"></i> Open|Closed</td></tr>
// the tbody pads with dozens of empty <tr></tr> filler rows - skip them
export default {
  selector: '.trails-table tbody tr',
  parse: node => {
    const nameCell = child(node, 0);
    const statusCell = child(node, 1);
    if (!nameCell || !statusCell) {
      return;
    }
    const icon = child(nameCell, 0);
    return {
      // strip the footage suffix ("Alley Cat 900'" -> "Alley Cat")
      name: allText(nameCell)
        .trim()
        .replace(/\s+\d+'$/, ''),
      status: allText(statusCell).trim(),
      level: levels[icon?.attribs?.class?.match(/fa-[\w-]+/g)?.pop()]
    };
  }
};
