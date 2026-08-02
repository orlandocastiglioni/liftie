import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// the propsnow legend labels pti-hold as "Wind Delay" and pti-hold-check as
// "On Hold" - coerce knows 'hold' but not 'hold-check', so map it here
const statuses = {
  'hold-check': 'hold'
};

// trails share the features.waterville.com/propsnow page with the lifts,
// grouped in sections whose <h2> leading text is the difficulty (Easiest,
// More Difficult, Most Difficult, Expert Only, Terrain Park - normalizeLevel
// knows them all); each trail article's FIRST SnowReport-item-status span
// carries the pti-(open|closed|hold|hold-check) icon - later spans are flags
// like Groomed, so only the first one counts
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'section.SnowReport-section--trails')) {
    const level = findText(select(section, 'h2.SnowReport-section-title')[0])?.trim();
    for (const article of select(section, 'article.SnowReport-Trail')) {
      const name = findText(select(article, 'h3.SnowReport-feature-title')[0]);
      const icon = select(article, 'span.SnowReport-item-status i.pti')[0];
      const status = icon?.attribs.class.match(/pti-([a-z-]+)/)?.[1];
      if (name && status) {
        rows.push({ name, status: statuses[status] ?? status, level });
      }
    }
  }
  return rows;
}
