import rows, { status } from './report.js';

// every strip that is not the lift strip; its heading is the difficulty.
// BEGINNER / Intermediate / Advanced / Experts Only are all known to
// normalizeLevel, "Extreme / Hike To Terrain" is not - take the part before
// the slash ("Extreme") which is.
export default function parse(dom) {
  return rows(dom, false).map(row => ({
    name: row.name,
    status: status(row.status),
    level: row.section.split('/')[0].trim()
  }));
}
