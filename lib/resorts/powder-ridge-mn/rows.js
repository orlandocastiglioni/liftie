import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// The page /trail-and-lift-availability/ is a decoy - its entry-content is
// empty even in midwinter. The real data is here, hand-pasted into three
// Divi code modules, each an <h3> heading ("Trail Availability:" /
// "Lift Availability:" / "Tubing Availability:") followed by a
// <ul class="availability-list">. Headings and lists are collected together
// in document order so each list can be tied to the heading above it: a flat
// `ul.availability-list li` selector would merge trails, lifts and the
// snowtubing block into one.
export default function rows(dom, heading) {
  let current = '';
  for (const node of select(dom, 'h3, ul.availability-list')) {
    if (node.name === 'h3') {
      current = findText(node) ?? '';
      continue;
    }
    if (!heading.test(current)) {
      continue;
    }
    return select(node.children, 'li')
      .map(li => ({
        // `<span class="title">Beginner Hill (easy):</span>` - the colon is
        // part of the text, and "Zonker  (difficult):" has a double space
        name: (findText(select(li, 'span.title')[0]) ?? '')
          .replace(/\s+/g, ' ')
          .replace(/\s*:\s*$/, '')
          .trim(),
        // `<span class="value">Open</span>`; the li@class carries the same
        // token lowercased. Only Open/Closed have ever been observed and
        // both are known to coerce.
        status: findText(select(li, 'span.value')[0])
      }))
      .filter(row => row.name);
  }
  return [];
}
