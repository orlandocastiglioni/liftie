import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// Lifts from the WordPress conditions-list block - see rows.js for why the
// status comes from the pill's modifier class and never its text.
export default function parse(dom) {
  const status = {};
  for (const { name, status: s } of rows(dom, 'lifts')) {
    if (s) {
      status[name] = coerce(s);
    }
  }
  return status;
}
