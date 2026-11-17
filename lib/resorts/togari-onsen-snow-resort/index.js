import { rows } from './report.js';

/** four lifts: Earth Top, Earth Tail, Sky Top and Sky Tail */
export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'Lift Status').map(({ name, status }) => [name, status]));
}
