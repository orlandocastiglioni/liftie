import select from '../../select.js';
import { rowName, rowStatus, tableRows } from './rows.js';

/**
 * the difficulty is only reliable as the css class on `div.difficulty-icon`.
 * The visible label next to it reads 'Green (Easy)', 'Blue (Moderate)',
 * 'Black Diamond (Difficult)', 'Double Black Diamond (Expert)' - none of
 * which normalizeLevel understands - and 'moderate' is not in its map
 * either, so the classes are translated here.
 */
const levels = {
  'trail-easy': 'green',
  'trail-moderate': 'blue',
  'trail-difficult': 'black',
  'trail-expert': 'doubleBlack',
  'trail-park': 'terrainPark'
};

function rowLevel(row) {
  const icon = select(row, '.difficulty-icon')[0];
  if (!icon) {
    return;
  }
  for (const name of icon.attribs.class.split(/\s+/)) {
    if (name in levels) {
      return levels[name];
    }
  }
}

// only the 'Ski Trails' block - the page also carries a 'Bike Trails' table
// that is open all summer and must not leak into the ski trail report
export default function parse(dom) {
  const trails = [];
  for (const row of tableRows(dom, 'Ski Trails')) {
    const name = rowName(row);
    if (name) {
      trails.push({ name, status: rowStatus(row), level: rowLevel(row) });
    }
  }
  return trails;
}
