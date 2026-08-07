import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * Austria grades on three colours - blau < rot < schwarz - and the English
 * page publishes them as the class of a difficulty dot, `fa fa-circle
 * blue|red|black`. liftie's level map knows blue and black but not red, so
 * passing the class through unchanged would drop the level from every rot
 * piste, and mapping red onto black would collide rot with schwarz.
 *
 * Shift the top of the scale down one slot instead - rot takes black and
 * schwarz becomes doubleBlack - which keeps all three grades distinct and in
 * the source's order, the same reading Portes du Soleil already uses here.
 * (Intermaps, which feeds this page, translates the same three as easy /
 * medium / difficult, so blue really is the easiest grade on the hill.)
 *
 * Serles itself only ever shows blue and red; the black entry is here because
 * the table is shared network-wide markup, not because this hill has a
 * schwarze Piste today.
 *
 * The resort's own colour word rides along untranslated in `grade`, so a
 * consumer can render the real Austrian scale instead of the collapsed one.
 * An unknown colour publishes its grade with no level at all: no level beats
 * a made-up one.
 */
const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * table.slope carries the seven graded pistes. This area has no table.skiroute
 * at all - the selector keeps it anyway, because the tables are network-wide
 * markup and one appearing later should be picked up, not silently dropped.
 */
export default function trails(dom) {
  return select(dom, '#pisten_anlagen table.slope tbody tr, #pisten_anlagen table.skiroute tbody tr').map(row => {
    const cells = select(row, 'td');
    const trail = {
      name: findText(cells.at(-1)),
      status: status(row)
    };
    const grade = select(row, 'td.icon i')[0]?.attribs?.class?.match(/\bfa-circle\s+(\S+)/)?.[1];
    if (grade) {
      trail.grade = grade;
      trail.level = levels[grade];
    }
    return trail;
  });
}
