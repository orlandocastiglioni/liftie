import coerce from '../../tools/coerce.js';
import { col, inSeason, rows } from './report.js';

/**
 * Lifts are named by their map letter or number plus their type - "A Triple
 * chairlift", "1 – SKIGO + SNOGO Matlift" - which is how the board itself
 * labels them; the type alone would collide (B and C are both quads).
 */
export default function parse(dom) {
  const lifts = {};
  if (!inSeason()) {
    return lifts;
  }
  for (const row of rows(dom, 'lift')) {
    const name = [col(row, 'identifier'), col(row, 'type')].filter(Boolean).join(' ');
    const status = col(row, 'status');
    if (name && status) {
      lifts[name] = coerce(status);
    }
  }
  return lifts;
}
