import { rows } from './report.js';

// the Easy / Medium / Expert tables; see report.js for the grades and the date gate
export default function trails(dom) {
  return rows(dom, 'trails');
}
