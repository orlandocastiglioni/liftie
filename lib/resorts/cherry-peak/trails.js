import statusRows from './rows.js';

// One Wix section per difficulty, on the same page as the lifts. The level is
// hard-coded per section id rather than read from the heading: normalizeLevel
// does not know "Easiest Trails" / "More Difficult Trails" / "Most Difficult
// Trails" (only the bare forms without the trailing word), so the heading text
// would silently drop the level from all 38 rows.
const sections = [
  ['comp-kjadl8zz', 'green'], // Easiest Trails
  ['comp-kjaeishh', 'blue'], // More Difficult Trails
  ['comp-kjaeg3d2', 'black'] // Most Difficult Trails
];

export default function parse(dom) {
  const rows = [];
  for (const [sectionId, level] of sections) {
    for (const row of statusRows(dom, sectionId)) {
      rows.push({ ...row, level });
    }
  }
  return rows;
}
