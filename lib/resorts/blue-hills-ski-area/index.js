import report, { liftStatus } from './report.js';

// see report.js: lift rows carry only an icon, check mark or cross
export default function parse(dom) {
  const { lifts, reportedAt } = report(dom);
  const ls = {};
  for (const box of lifts) {
    const status = liftStatus(box);
    if (status) {
      ls[box.name] = status;
    }
  }
  if (reportedAt) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: reportedAt });
  }
  return ls;
}
