import reportedAt from './reported-at.js';
import { row, rows } from './sections.js';

/**
 * GRADE. The Skigebietsmanager publishes no difficulty WORD, but each slope row
 * carries a second icon whose filename encodes the grade:
 *
 *   .../icons/slope_diff_set_6/001/701/320.png  a blue disc   (rgb 0,107,222)
 *   .../icons/slope_diff_set_6/001/701/288.png  a red disc    (rgb 255,0,0)
 *   .../icons/slope_diff_set_6/001/701/326.png  a black disc  (rgb 0,0,0)
 *
 * Read off the images themselves, then cross-checked against an independent
 * source: the same template for region_id=831 (Patscherkofel) numbers its
 * twelve pistes 288/326/320/288/326/320/288/326/288/320/320/320, which matches
 * the red/black/blue fa-circle classes ski-plus-city.com prints for those same
 * twelve runs, in the same order, 12 out of 12. The mapping is not a guess.
 *
 * The colour word is published verbatim as `grade`, so this area speaks the
 * same blue/red/black vocabulary as its eleven SKI plus CITY siblings whichever
 * source each of them comes off.
 *
 * LEVEL. Austria grades on three tiers - blau / rot / schwarz, no green - and
 * normalizeLevel knows only two of the three ('red' is absent, so those four
 * pistes would publish ungraded). Map one step down each so all three stay
 * distinct and correctly ordered: blue -> blue, red -> black,
 * black -> doubleBlack. Same reading as lib/resorts/kaunertaler-gletscher and
 * the sibling lib/resorts/patscherkofel. An unrecognised icon yields no grade
 * and no level rather than a wrong one.
 */
const grades = {
  320: 'blue',
  288: 'red',
  326: 'black'
};

const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * 9 rows under the "Slopes" caption - four numbered pistes plus the three F1
 * segments and two more link runs. The Legend block reuses the identical
 * markup, hence the caption-based segmentation in sections.js.
 */
export default function trails(dom) {
  const list = [];
  for (const table of rows(dom, 'slopes')) {
    const r = row(table);
    if (!r) {
      continue;
    }
    const grade = grades[r.icons[1]?.match(/slope_diff_set_\d+\/(?:\d+\/)*(\d+)\.png/)?.[1]];
    list.push({ name: r.name, status: r.status, level: levels[grade], grade });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
