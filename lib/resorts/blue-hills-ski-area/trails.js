import report, { trailLevel } from './report.js';

// see report.js: a trail is closed when its box carries the "X" marker,
// open otherwise; the icon shape is the difficulty
export default function parse(dom) {
  const { trails, reportedAt } = report(dom);
  const list = trails.map(box => ({
    name: box.name,
    status: box.crossed ? 'closed' : 'open',
    level: trailLevel(box)
  }));
  if (reportedAt) {
    Object.defineProperty(list, 'reportedAt', { value: reportedAt });
  }
  return list;
}
