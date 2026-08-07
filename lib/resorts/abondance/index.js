import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// lifts are the rows under the 'Remontées mécaniques' sub-header; see rows.js
export default function parse(dom) {
  const lifts = {};
  for (const { name, status } of rows(dom, 'lifts')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
