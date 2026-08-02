import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// difficulty comes from the icon class, not the legend words - Quebec's
// "Difficult" is a blue square, which normalizeLevel would read as black;
// the first icon-* span in .level is the difficulty, later spans are
// glades markers (icon-wood) - grooming (icon-damee) lives in .state
const levels = {
  'icon-easy': 'green',
  'icon-diff': 'blue',
  'icon-vdiff': 'black',
  'icon-ext': 'doubleBlack',
  'icon-park': 'terrainPark',
  'icon-parc': 'terrainPark'
};

// trails are listed as .table-row entries under the same lift sections
// that the lift parser reads; name in div.name, status in .slope-state span
export default {
  selector: '.section-piste .table-row',
  parse: row => {
    const name = findText(select(row.children, '.name')[0]);
    const status = findText(select(row.children, '.slope-state span')[0]);
    const icon = select(row.children, '.level span')[0];
    const level = icon && levels[icon.attribs.class?.split(/\s+/)[0]];
    if (name && status) {
      return { name, status, level };
    }
  }
};
