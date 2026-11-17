import coerce from '../../tools/coerce.js';
import { rowsOf } from './table.js';

// LIFTS / STATUS / VERTICAL: name, OPEN|CLOSED, length (ignored). See table.js.
export default function parse(dom) {
  const lifts = {};
  for (const [name, status] of rowsOf(dom, 'LIFTS')) {
    lifts[name] = coerce(status);
  }
  return lifts;
}
