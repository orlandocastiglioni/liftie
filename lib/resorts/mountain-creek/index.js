import coerce from '../../tools/coerce.js';
import { rows } from './report.js';

// Lift | Status | Hours tables, one per peak; see report.js for the icons and
// the date gate.
export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'Lift').map(({ name, status }) => [name, coerce(status)]));
}
