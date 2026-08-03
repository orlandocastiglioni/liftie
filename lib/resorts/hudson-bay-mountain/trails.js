import records from './warmup.js';

// HBM publishes no per-run open/closed set. The only discrete trail-level
// items are the two TerrainParkTTT records (Rotary Trail To Town, Local
// Terrain Park). status = liftStatus1 (coerced by the shared trail collector);
// the terrain park record is tagged level terrainPark.
export default function parse(dom) {
  const rows = [];
  for (const r of records(dom, 'TerrainParkTTT')) {
    const name = r.title_fld?.trim();
    if (!name) {
      continue;
    }
    rows.push({
      name,
      status: r.liftStatus1,
      level: /terrain park/i.test(name) ? 'terrainPark' : undefined
    });
  }
  return rows;
}
