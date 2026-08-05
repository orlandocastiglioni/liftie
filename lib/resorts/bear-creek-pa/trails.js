import statusRows, { isLift } from './rows.js';

// every row that is not under the "Lifts" heading is a trail, and its group
// heading is its difficulty. The page's headings - Beginner, MORE DIFFICULT,
// MOst DIFFICULT, Terrain Park - all map through normalizeLevel, which
// lowercases and strips whitespace, so the erratic casing is harmless.
export default function parse(dom) {
  return statusRows(dom)
    .filter(row => !isLift(row))
    .map(row => ({ name: row.name, status: row.status, level: row.group }));
}
