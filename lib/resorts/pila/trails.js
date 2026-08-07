import select from '../../select.js';
import { allText } from '../../tools/domutil.js';
import reportedAt from './reported-at.js';
import status from './status.js';

/**
 * Same page as the lifts - one fetch covers both - and the same desktop/mobile
 * duplication, so .cdh-table-desktop is mandatory here too. The header row
 * lives in <thead>, so tbody tr is already clean: 38 rows.
 *
 * Row: td1 the name, td2 a span whose text is the piste number and whose second
 * class is the difficulty, td3 the status, td4 snowmaking (Cannoni Si/No),
 * td5 notes.
 *
 * GRADES. Pila is a 4-tier Italian resort. The rows carry difficulty only as a
 * CSS class; the resort's own words are in the summary counters at the top of
 * the page - 'Piste blu aperte 8/8', 'Piste rosse aperte 21/24', 'Piste nere
 * aperte 4/6' - so blu / rosso / nero, and cdh-viewer.css defines a green class
 * Pila currently has no pistes for.
 *
 * None of those are keys in the levels map in lib/trails/parse.js, so without an
 * explicit map every piste would publish with no level at all. Mapped on the
 * baqueira-beret precedent for a European red: rosso->black and nero->
 * doubleBlack, which keeps all four tiers distinct and in order. `grade` carries
 * the Italian word untouched so the real scale survives the normalisation.
 *
 * The 38 rows include eight Raccordo/Skiweg connectors and three park features
 * (Snowpark n.25, Fun Park Chacard n.28, Fun Slope n.30) which the resort grades
 * like ordinary pistes - kept, with the grade the resort gives them.
 */
const selector = '#cdh-slope table.cdh-slope-table.cdh-table-desktop tbody tr';

const levels = {
  'cdh-slope-difficult-green': 'green',
  'cdh-slope-difficult-blue': 'blue',
  'cdh-slope-difficult-red': 'black',
  'cdh-slope-difficult-black': 'doubleBlack'
};

const grades = {
  'cdh-slope-difficult-green': 'verde',
  'cdh-slope-difficult-blue': 'blu',
  'cdh-slope-difficult-red': 'rosso',
  'cdh-slope-difficult-black': 'nero'
};

function difficulty(td) {
  const classes = select(td, 'span.cdh-slope-difficult')[0]?.attribs?.class?.split(/\s+/) ?? [];
  return classes.find(cls => cls in levels);
}

export default function trails(dom) {
  const rows = [];
  for (const row of select(dom, selector)) {
    const cells = select(row, 'td');
    const name = allText(cells[0] ?? {})
      .replace(/\s+/g, ' ')
      .trim();
    if (!name) {
      continue;
    }
    const grade = difficulty(cells[1]);
    rows.push({
      name,
      status: status(cells[2]),
      level: levels[grade],
      grade: grades[grade]
    });
  }
  const at = reportedAt(dom, '#cdh-slope');
  if (at) {
    Object.defineProperty(rows, 'reportedAt', { value: at });
  }
  return rows;
}
