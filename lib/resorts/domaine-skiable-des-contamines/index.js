import { rows } from './report.js';

/**
 * 25 lifts: the Gorge, Montjoie Lay, Signal and Ruelle gondolas, the chairs
 * and drag lifts, as the operator names them (TC / TSD / TK prefix).
 */
export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'iconRM').map(({ name, status }) => [name, status]));
}
