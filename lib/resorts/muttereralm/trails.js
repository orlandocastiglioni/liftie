import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * GRADE. Muttereralm grades on the three-tier Austrian scale - blau / rot /
 * schwarz, no green - published as the colour class on the difficulty dot,
 * <i class="fa fa-circle blue|red|black">. The English page prints no word at
 * all, so the class IS the resort's own grade vocabulary.
 *
 * normalizeLevel knows 'blue' and 'black' but not 'red', so passing the class
 * straight through would leave the four rot pistes with no level whatsoever.
 * Shift the top two down one slot instead: rot takes black and schwarz becomes
 * doubleBlack, which keeps all three published tiers distinct and in the
 * resort's own order. Same reading as the other blue/red/black Austrian
 * resorts already in the registry (lib/resorts/kaunertaler-gletscher).
 *
 * The colour word rides along untranslated in `grade`, so a consumer can render
 * the real three-tier Austrian scale rather than liftie's lossy four-value one.
 *
 * A colour must also never reach coerce.js as a status, where 'red' reads
 * CLOSED and 'blue' reads 'scheduled' - hence the difficulty dot is looked up
 * by its own i.fa-circle selector and never confused with the status cell.
 */
const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * Every Muttereralm row is graded today, but the lookup is still guarded: the
 * sibling area pages served by the same widget carry rows with an empty
 * difficulty cell, and an ungraded row is better published than dropped.
 *
 * table.skiroute is selected even though this page has none: a sibling area
 * page grows one the moment the operator files a run as a route, and a silent
 * drop is worse than an empty selector.
 */
export default function trails(dom) {
  const rows = [
    ...select(dom, '#pisten_anlagen table.slope tbody tr'),
    ...select(dom, '#pisten_anlagen table.skiroute tbody tr')
  ];
  return rows
    .map(node => {
      const tds = select(node, 'td');
      const name = findText(tds.at(-1))?.trim();
      if (!name) {
        return;
      }
      const trail = { name, status: status(select(tds[0], 'i')[0]?.attribs.class) };
      const grade = select(node, 'i.fa-circle')[0]
        ?.attribs.class?.split(/\s+/)
        .find(token => Object.hasOwn(levels, token));
      if (grade) {
        trail.level = levels[grade];
        trail.grade = grade;
      }
      return trail;
    })
    .filter(Boolean);
}
