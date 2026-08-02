import coerce from '../../tools/coerce.js';

// lumiplan-style POI feed behind the mountain-report page: data[] holds
// SECTOR objects whose lifts[] carry the SKI_LIFT entries with
// OPEN/CLOSED/FORECAST in openingStatusCompl; Access Gates style sectors
// nest more sectors under children[]. Off season the feed returns sector
// stubs only (no lifts arrays).
export default function parse(data = {}) {
  const liftStatus = {};

  function walk(sectors) {
    for (const sector of sectors ?? []) {
      for (const lift of sector.lifts ?? []) {
        const status = lift.openingStatusCompl ?? lift.openingStatus;
        if (lift.name && status) {
          liftStatus[lift.name.trim()] = coerce(status);
        }
      }
      walk(sector.children);
    }
  }

  walk(data.data);
  return liftStatus;
}
