import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Hochoetz does NOT come from the SKI plus CITY network site. Its
 * #pisten_anlagen widget there is permanently unwired - 'open lifts 0 / 0' and
 * zero table.lift/table.slope elements, in the live page and in the winter
 * wayback capture alike - while the operator's data is published in full on
 * Intermaps' Skigebietsmanager page for region_id 593. That region id is the
 * area tag: it selects the page, and the whole page is Hochoetz, so nothing is
 * filtered row-wise.
 *
 * The template renders EVERY block with identical markup - one
 * <table class="tab_object_2_cols"> per row, cells [status icon, type icon,
 * name] - so a bare selector returns 46 rows of which 15 are lifts, 20 are
 * slopes, 8 are winter hiking trails, 1 is a cross-country loipe and 2 are the
 * icon legend's own 'open'/'closed' captions. The only thing separating them is
 * the section heading printed ahead of each block in <td class="td_caption_v2">
 * ('lifts', 'Slopes', 'Winterhiking', 'Crosscountry', 'Legend'), so walk
 * headings and row tables together in document order and keep one block.
 *
 * The row markup is malformed - every <img> is missing its closing '>', so the
 * following '</td>' is swallowed into the tag's attributes - but htmlparser2's
 * recovery still yields the right tree: the img keeps its class and src, and
 * the three cells survive. Read the status from the first cell's <img src>
 * rather than from anything positional inside it.
 */
export default function rows(dom, caption) {
  const collected = [];
  let section;
  for (const node of select(dom, 'td.td_caption_v2, table.tab_object_2_cols')) {
    if (node.name === 'td') {
      section = findText(node)?.trim().toLowerCase();
      continue;
    }
    if (section !== caption) {
      continue;
    }
    const tds = select(node, 'td');
    const name = findText(tds.at(-1))?.trim();
    if (name) {
      collected.push({ name, status: select(tds[0], 'img')[0]?.attribs.src });
    }
  }
  return collected;
}
