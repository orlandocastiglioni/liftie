import coerce from '../../tools/coerce.js';
import { rows, status } from './feed.js';

// /lifts.json holds the 10 rows the resort publishes: lift-1..lift-8 plus the
// two conveyors ("8 Chairlifts | 2 Conveyor Lifts").
export default function parse(body) {
  const lifts = {};
  for (const lift of rows(body)) {
    lifts[lift.name] = coerce(status(lift.status));
  }
  return lifts;
}
