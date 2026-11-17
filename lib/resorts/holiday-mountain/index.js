import { rows } from './report.js';

// the "Lifts" table; see report.js for the layout and the season gate
export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'Lifts').map(({ name, status }) => [name, status]));
}
