import coerce from '../../tools/coerce.js';

// lumiplan-style POI feed behind the mountain-report page; items carry
// types (LIFT vs SECTOR groupers) and OPEN/CLOSED/FORECAST in
// openingStatusCompl. Off season the feed returns sector stubs only.
export default function parse(data = {}) {
  const liftStatus = {};
  for (const item of data.data ?? []) {
    if (!item.types?.includes('LIFT')) {
      continue;
    }
    const status = item.openingStatusCompl ?? item.openingStatus;
    if (item.name && status) {
      liftStatus[item.name.trim()] = coerce(status);
    }
  }
  return liftStatus;
}
