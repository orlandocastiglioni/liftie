import { isLift } from './index.js';
import rows from './rows.js';

export default function parse(dom) {
  // a few runs repeat across the page's report grids ("Mahoosuc Meadow",
  // "Easy Rider to Rough Rider") - keep the first occurrence
  const seen = new Set();
  return rows(dom)
    .filter(r => r.level || !isLift(r.name))
    .filter(({ name }) => !seen.has(name) && seen.add(name))
    .map(({ name, status, level }) => ({ name, status, level }));
}
