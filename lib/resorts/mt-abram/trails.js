import { isLift } from './index.js';
import rows from './rows.js';

export default function parse(dom) {
  return rows(dom)
    .filter(r => r.level || !isLift(r.name))
    .map(({ name, status, level }) => ({ name, status, level }));
}
