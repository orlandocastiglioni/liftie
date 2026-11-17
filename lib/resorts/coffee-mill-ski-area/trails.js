import { rowsOf } from './table.js';

// TRAILS / STATUS / DIFFICULTY. Difficulty words are EASY, INTERMEDIATE,
// MOST DIFFICULT and TERRAIN PARK, all known to normalizeLevel. See table.js.
export default function parse(dom) {
  return rowsOf(dom, 'TRAILS').map(([name, status, level]) => ({ name, status, level }));
}
