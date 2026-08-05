import { status, trailRows } from './report.js';

// 17 runs under the "Terrain/Runs Open" heading of the left-hand column of
// /snowreport, followed by the three non-lift features that live in the lift
// column (terrain park, uphill traffic, the hiking area).
//
// Huff publishes no per-trail difficulty anywhere in machine-readable form -
// the trail map is a raster image - so `level` is only set for the park.
export default function parse(dom) {
  return trailRows(dom).map(row => ({
    name: row.name,
    status: status(row.status),
    level: /terrain park/i.test(row.name) ? 'terrainPark' : undefined
  }));
}
