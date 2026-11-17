import select from '../../select.js';
import { normalizeLevel } from '../../trails/parse.js';

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

/*
 * hand-maintained WordPress/Avada tables on the conditions page; the resort
 * publishes no per-lift status at all (see "no": { "lifts": true }).
 *
 * one div.table-1 per difficulty (div.table-2 is the stats box, hence the
 * "-1" suffix), preceded by an <h2> whose text sits next to a difficulty
 * icon - `<h2><img .../>Easiest</h2>` - so the heading needs a deep text
 * read and the level has to be tracked in document order: the "Most
 * Difficult" table is separated from its heading by an empty spacer
 * fusion-title, so sibling walking silently loses the level.
 *
 * rows are `<td><strong>OPEN</strong></td><td>Trigger</td>` - status first,
 * name second - and the first three data rows of every table live inside
 * <thead> next to the <th>Status</th> header row, so the rows are selected
 * unscoped and the header is dropped by its lack of <td> cells.
 * status vocabulary is OPEN/CLOSED only, both known to coerce.
 */
// 2026-11 redesign: the old /conditions-and-trail-map/ page now 301s to
// /mountain-report/, a block-theme page whose trail report is one
// section.bph-tr__card per difficulty:
//
//   <section class="bph-tr__card">
//     <header><span class="bph-tr__icon bph-tr__icon--easiest"/><h3 class="bph-tr__card-title">Easiest</h3></header>
//     <table class="bph-tr__table"><tbody>
//       <tr><td class="bph-tr__status"><span class="bph-tr__dot bph-tr__dot--closed"/>
//           <span class="bph-tr__status-label">CLOSED</span></td>
//           <td class="bph-tr__run">Alpen</td></tr>
//
// The card titles are Easiest / More Difficult / Most Difficult / Terrain Parks;
// normalizeLevel knows the first three and 'terrain park', so the title is read
// singular. The page still shows no per-lift status (only an "0/9 Open Lifts"
// aggregate), so this stays a trails-only feed.
function cards(dom) {
  const rows = [];
  for (const card of select(dom, 'section.bph-tr__card')) {
    const title = deepText(select(card, '.bph-tr__card-title')[0] ?? { children: [] }).trim();
    const level = normalizeLevel(title.replace(/parks$/i, 'park'));
    for (const tr of select(card, 'tbody tr')) {
      const name = deepText(select(tr, 'td.bph-tr__run')[0] ?? { children: [] }).trim();
      const status = deepText(select(tr, '.bph-tr__status-label')[0] ?? { children: [] }).trim();
      if (name && status) {
        rows.push({ name, status, level });
      }
    }
  }
  return rows;
}

export default function parse(dom) {
  const redesigned = cards(dom);
  if (redesigned.length) {
    return redesigned;
  }
  // pre-2026-11 Avada tables, kept so a rollback of the theme still parses
  const rows = [];
  let level;
  for (const node of select(dom, '.table-1, h2')) {
    if (node.name === 'h2') {
      // ignore the page title h2s - only real difficulty headings win
      level = normalizeLevel(deepText(node).trim()) ?? level;
      continue;
    }
    for (const tr of select(node, 'tr')) {
      const cells = select(tr.children, 'td');
      if (cells.length < 2) {
        continue;
      }
      const name = deepText(cells[1]).trim();
      if (name) {
        rows.push({ name, status: deepText(cells[0]).trim(), level });
      }
    }
  }
  return rows;
}
