import select from '../../select.js';
import { child, findText } from '../../tools/domutil.js';
import reportedAt from './reported-at.js';
import status from './status.js';

// Corralco grades on the 4-tier European scale: green / blue / red / black.
// normalizeLevel knows no 'red' and would drop the level entirely, so map it
// here (same idiom as lib/resorts/glencoe/trails.js). Promote black to
// doubleBlack so all four published grades stay distinct and correctly ordered
// rather than collapsing red and black onto one liftie level.
const levels = {
  GREEN: 'green',
  BLUE: 'blue',
  RED: 'black',
  BLACK: 'doubleBlack'
};

// The heading is "Trails & Activities" here and "Trails and activities" on the
// bulletinv3 host, so match on :contains(Trails).
const selector = '.POI_title:contains(Trails) + .liaisons .POI_info';

export default function trails(dom) {
  const rows = [];
  for (const node of select(dom, selector)) {
    // the section mixes trails with other mountain POIs (a restaurant shows up
    // off and on); keep only rows whose type icon is a downhill grade, which
    // doubles as the level source
    const grade = child(node, '0/0')?.attribs?.src?.match(/DOWNHILL_SKIING_(\w+)\.svg$/)?.[1];
    const level = levels[grade];
    if (!level) {
      continue;
    }
    const name = findText(child(node, '1/0/0'))?.trim();
    // 2/0 is alt="statut damage" (grooming), 2/1 is alt="statut ouverture"
    const token = child(node, '2/1')?.attribs?.src?.match(/lp_runway_trail_(\w+)\.svg$/)?.[1];
    if (!name || !token) {
      continue;
    }
    rows.push({ name, status: status(token), level });
  }
  const at = reportedAt(dom);
  if (at) {
    Object.defineProperty(rows, 'reportedAt', { value: at });
  }
  return rows;
}
