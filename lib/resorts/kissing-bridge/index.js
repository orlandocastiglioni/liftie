import { sections } from './report.js';

// the accordion's "Lifts" section; the name drops the hours/state after the
// dash. See report.js.
export default function parse(dom) {
  const lifts = {};
  for (const { title, items } of sections(dom)) {
    if (title !== 'Lifts') {
      continue;
    }
    for (const { name, status } of items) {
      const lift = name.replace(/\s+-\s+.*$/, '').trim();
      if (lift && status) {
        lifts[lift] ??= status;
      }
    }
  }
  return lifts;
}
