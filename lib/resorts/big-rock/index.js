import coerce from '../../tools/coerce.js';
import { current, notCurrent } from './feed.js';

// lifts[] of the public-report feed (feed.js). The page script deletes a
// 'Mercury' row from its lift table - a retired lift still in the TablePress
// shell - so it is dropped here too, should the feed ever carry it.
export default function parse(body) {
  const lifts = {};
  if (!current(body)) {
    return notCurrent(lifts, body);
  }
  for (const { name, status } of body.lifts ?? []) {
    const n = name?.trim();
    if (n && n.toLowerCase() !== 'mercury') {
      lifts[n] = coerce(status);
    }
  }
  return lifts;
}
