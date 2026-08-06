import select from '../../select.js';
import { itemName, itemStatus } from './rows.js';

// Lift Status panel: the one div.operation-status carrying the
// operation-status--lift modifier, ten rows, one per lift, each tagged with a
// stable per-lift class (ico-lift--kg, --a1, …). Statuses come from the class
// on span.status, see rows.js.
export default function parse(dom) {
  const liftStatus = {};
  for (const item of select(dom, '.operation-status--lift .operation-status-item')) {
    const name = itemName(item);
    const status = itemStatus(item);
    if (name && status) {
      liftStatus[name] = status;
    }
  }
  return liftStatus;
}
