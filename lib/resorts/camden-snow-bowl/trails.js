import select from '../../select.js';
import { firstToken, squish, text } from './rows.js';

// level comes from the group heading, never from its second word: the
// headings read "Black Trails: Expert" / "Terrain Park: Expert" /
// "Glades: Expert" and "Expert" maps to doubleBlack, which would mislabel
// three of the five groups. "Glades" is not in the levels map at all - they
// are gladed black terrain here, so black is the closest honest fit.
const GROUPS = [
  [/^green/i, 'green'],
  [/^blue/i, 'blue'],
  [/^black/i, 'black'],
  [/^terrain park/i, 'terrainPark'],
  [/^glade/i, 'black']
];

function groupLevel(heading) {
  return GROUPS.find(([re]) => re.test(heading))?.[1];
}

/**
 * Each group is an h4.title followed by a ul.mfn-list, and the list is a
 * RUNNING SECTIONED list rather than a table: a bold OPEN / CLOSED item sets
 * the status for every trail item after it. Marker order is not fixed (some
 * captures open with CLOSED, some end with a marker that has nothing after
 * it) and blank spacer items sit between the runs.
 *
 * A group with no marker at all - the Glades routinely ship that way - would
 * coerce to <scheduled>, i.e. "about to open", which is worse than wrong, so
 * an unmarked run defaults to closed.
 */
export default function parse(dom) {
  const rows = [];
  let level;
  // css-select walks the document once, so a combined selector yields the
  // headings and the lists interleaved in document order
  for (const node of select(dom, 'h4.title, ul.mfn-list')) {
    if (node.name === 'h4') {
      level = groupLevel(squish(text(node)));
      continue;
    }
    let status = 'closed';
    for (const item of select(node, 'li.mfn-list-item')) {
      const desc = select(item, '.mfn-list-desc')[0];
      const label = squish(text(desc));
      if (!label) {
        continue;
      }
      // status markers are the only bolded items
      if (select(item, 'strong').length) {
        status = firstToken(label);
        continue;
      }
      rows.push({ name: label, status, level });
    }
  }
  return rows;
}
