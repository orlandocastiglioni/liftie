import { dated, rows, status } from './report.js';

/** seven lifts: the 1st-6th pair lifts (no 4th), Koshiba pair lift and the Telecabin */
export default function parse(dom) {
  return dated(Object.fromEntries(rows(dom, 'リフト名').map(([name, cell]) => [name, status(cell)])), dom);
}
