import { equals, grid, marker, NAME, OPEN, RATING, status } from './rows.js';

const levels = { beginner: 'green', intermediate: 'blue', advanced: 'black', expert: 'doubleBlack' };

/**
 * Column A holds the difficulty, but only beginner/intermediate are
 * characters (green circle / blue square emoji) - advanced and expert are
 * in-cell Google-hosted images whose opaque ids rotate. The sheet's own "Key"
 * block spells out the mapping (a row per level, its marker in column A and
 * the label in column B), so the legend is read from the same fetch and each
 * trail's marker - image src when there is one, text otherwise - is looked up
 * in it.
 */
function legend(rows) {
  const key = marker(rows, 'Key');
  const map = new Map();
  if (key < 0) {
    return map;
  }
  for (const row of rows.slice(key + 1)) {
    const level = levels[row[NAME]?.text.toLowerCase()];
    const mark = row[RATING]?.img ?? row[RATING]?.text;
    if (level && mark) {
      map.set(mark, level);
    }
  }
  return map;
}

// trails are the rows between the "Rating"/"Open" header and the "Lifts"
// marker; the tree emoji some names carry marks a glade, it is part of the
// name and not a difficulty
export default function parse(dom) {
  const rows = grid(dom);
  const first = rows.findIndex(row => equals(row[RATING], 'Rating') && equals(row[OPEN], 'Open'));
  if (first < 0) {
    return [];
  }
  const last = marker(rows, 'Lifts');
  const byMarker = legend(rows);
  const trails = [];
  for (const row of rows.slice(first + 1, last < 0 ? undefined : last)) {
    const name = row[NAME]?.text;
    const value = status(row);
    if (name && value) {
      trails.push({
        name,
        status: value,
        level: byMarker.get(row[RATING]?.img ?? row[RATING]?.text)
      });
    }
  }
  return trails;
}
