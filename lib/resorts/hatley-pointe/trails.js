import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// trails sit on the same PropApps report as the lifts, one
// section.SnowReport-section--trails per difficulty; the section heading text
// is Beginner | Intermediate | Advanced | Expert | Terrain Park, all of which
// normalizeLevel already resolves.
//
// as on the lifts, the direct-child .SnowReport-sr-label is the status and
// never one of the Groomed / Snowmaking / Night Skiing modifier labels that
// follow it - reading all of them would yield 'OpenGroomed' -> 'scheduled'.
//
// published trail vocabulary is Open | Partially Open | Closed, all known to
// coerce. 'Way Out' legitimately appears twice, as Intermediate and as the
// terrain park.
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'section.SnowReport-section--trails')) {
    const level = findText(select(section, 'h2.SnowReport-section-title')[0]);
    for (const article of select(section, 'article.SnowReport-Trail')) {
      const name = findText(select(article, 'h3.SnowReport-feature-title')[0]);
      const status = findText(select(article, '.SnowReport-item-status > .SnowReport-sr-label')[0]);
      if (!name || !status) {
        continue;
      }
      rows.push({ name, status, level });
    }
  }
  return rows;
}
