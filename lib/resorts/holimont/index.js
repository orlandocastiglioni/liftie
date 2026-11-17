import coerce from '../../tools/coerce.js';
import { lifts } from './report.js';

// each lift column's h4 name and h6 status; see report.js for the date gate
export default function parse(dom) {
  return Object.fromEntries(
    lifts(dom)
      .filter(({ status }) => status)
      .map(({ name, status }) => [name, coerce(status)])
  );
}
