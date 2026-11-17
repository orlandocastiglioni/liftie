import coerce from '../../tools/coerce.js';
import { rows } from './report.js';

// the Lifts | Status table; see report.js for the layout and the date gate
export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'lifts').map(({ name, status }) => [name, coerce(status)]));
}
