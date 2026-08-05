import select from '../../select.js';
import { childText, findText } from '../../tools/domutil.js';

// Trails share the conditions page with the lifts. There is one
// section.SnowReport-section--trails per difficulty group and the difficulty
// lives only on the section heading, so rows get tagged while walking the
// sections (same shape as tenney-mountain).
//
// The level comes from the heading's icon class rather than its text: the
// heading "Extreme Difficulty" is not in the levels map in lib/trails/parse.js
// and would silently drop the level, while its icon suffix "expert-only"
// normalizes to doubleBlack. easiest / more-difficult / most-difficult /
// terrain normalize on their own. Off-season the report grows a "Snow Tubing"
// section (pti-tubing); those rows are published like any other trail and are
// kept, just without a level.
//
// An open trail carries SEVERAL span.SnowReport-item-status: the first is the
// real status and the rest are grooming / snowmaking / night-skiing badges.
// The badges nest their sr-label inside the <i>, the status span does not, so
// selecting the label as a DIRECT child of the status span picks the status
// and only the status. Trail labels are Open / Closed, both known to coerce.
export default function parse(dom) {
  const rows = [];
  for (const section of select(dom, 'section.SnowReport-section--trails')) {
    const level = select(section, 'h2 i.pti')[0]?.attribs.class?.match(/pti-([\w-]+)/)?.[1];
    for (const article of select(section, 'article.SnowReport-Trail')) {
      const name = childText(article, 0);
      const status = findText(select(article, '.SnowReport-item-status > .SnowReport-sr-label')[0]);
      if (!name || !status) {
        continue;
      }
      rows.push({ name, status, level });
    }
  }
  return rows;
}
