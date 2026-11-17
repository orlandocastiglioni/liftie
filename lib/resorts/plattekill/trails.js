import { rows } from './report.js';

// the four difficulty sections of the report table; the TERRAIN PARK row
// (listed under Experts Only) is graded as a park. See report.js.
export default function trails(dom) {
  return rows(dom, 'trails');
}
