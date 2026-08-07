import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import status from './status.js';

// .lifts[] from the intermaps skimap payload the resort's own conditions page
// embeds. Name is .popup.title ('A Hochalmbahn'), which carries the map letter
// the resort labels the lift with - keep it, two of the ten only differ by the
// rechts/links suffix. .status is mirrored at .popup.status; prefer the row's.
export default function lifts(data) {
  const ls = {};
  for (const lift of data?.lifts ?? []) {
    const name = lift.popup?.title?.trim();
    if (!name) {
      continue;
    }
    ls[name] = coerce(status(lift.status ?? lift.popup?.status));
  }
  const at = reportedAt(data);
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
