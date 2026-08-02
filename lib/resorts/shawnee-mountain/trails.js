// trail groups in addtl.trails are keyed by difficulty; normalizeLevel
// understands the raw group names (easy, medium, hard, terrain)
const groups = ['easy', 'medium', 'hard'];

export default function parse({ addtl: { trails = {}, terrain = {} } = {} } = {}) {
  const rows = [];
  for (const level of groups) {
    for (const { friendly, open } of Object.values(trails[level] ?? {})) {
      // `open` is a boolean - coerce needs a string token
      rows.push({ name: friendly, status: open ? 'open' : 'closed', level });
    }
  }
  for (const { friendly, open } of Object.values(terrain)) {
    rows.push({ name: friendly, status: open ? 'open' : 'closed', level: 'terrain' });
  }
  return rows;
}
