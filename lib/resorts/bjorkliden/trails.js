import reportedAt from './reported-at.js';
import rows, { payload } from './rows.js';
import status from './status.js';

// Björkliden grades on the 4-tier European scale and encodes it ONLY as the
// inline svg fill colour - there is no class, id, title or aria-label to read.
// normalizeLevel has no 'red', so the Scandinavian red becomes black and black
// is promoted to doubleBlack, keeping all four grades distinct and ordered
// (same idiom as lib/resorts/glencoe/trails.js). The shape is a useful
// cross-check on the hex: green is a circle, blue and red are rects, black is
// a diamond path.
const levels = {
  '#019A40': 'green',
  '#16A2D5': 'blue',
  '#D62A40': 'black',
  '#020202': 'doubleBlack'
};

// All three terrain sections of the same feed, in the order the site tabs them.
// 31 rows, no name collisions between the three. crossCountry rows are a
// different shape: <div> not <label>, no difficulty svg, and TWO .large-text
// cells where the first is the distance ("~4,5 km") and the second is the name.
const sections = [
  { key: 'pistsContent', section: 'pists', name: 0 },
  { key: 'offpistContent', section: 'offpist', name: 0 },
  { key: 'crossCountryContent', section: 'crossCountry', name: 1 }
];

export default function trails(body) {
  const list = [];
  for (const { key, section, name: index } of sections) {
    for (const { names, badges, fill } of rows(body, key)) {
      const name = names[index]?.trim();
      if (name) {
        list.push({ name, status: status(badges, section), level: levels[fill] });
      }
    }
  }
  const at = reportedAt(payload(body).pistsUpdated);
  if (at) {
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
