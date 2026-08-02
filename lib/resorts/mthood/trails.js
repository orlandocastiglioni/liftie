// same lumiplan POI feed as the lifts (full include list): SECTOR objects in
// data[] carry trails[] entries with OPEN/CLOSED/FORECAST in
// openingStatusCompl and trailLevel like GREEN_CIRCLE / DOUBLE_BLACK_DIAMOND
// (normalizeLevel handles both after stripping underscores). Gate sectors
// (Private Reserve, Heather Canyon Gates, Super Bowl) appear both nested
// under Access Gates children[] and again at the top level, so dedupe
// sectors while walking. sector.others[] (parking lots) is deliberately
// ignored. Off season the feed returns sector stubs only.
export default function parse(data = {}) {
  const rows = [];
  const seen = new Set();

  function walk(sectors) {
    for (const sector of sectors ?? []) {
      const key = sector.id ?? sector.name;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      for (const trail of sector.trails ?? []) {
        rows.push({
          name: trail.name,
          status: trail.openingStatusCompl ?? trail.openingStatus,
          level: trail.trailLevel
        });
      }
      walk(sector.children);
    }
  }

  walk(data.data);
  return rows;
}
