import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Every SKI plus CITY PASS area page renders the same intermaps widget: one
 * div#pisten_anlagen holding three sibling tables - table.lift, table.slope and
 * table.skiroute - that share a single row shape. Scope every selector to that
 * div: the page also renders a weather table built from the same class names.
 *
 * The FIRST <td> of a row carries the status as a Font Awesome glyph and the
 * LAST <td> the name. The cells in between differ per table - table.lift has a
 * lift-type <img>, table.slope a td.icon holding the grade, table.skiroute
 * nothing at all - so read the name from the last cell, never a fixed index.
 *
 * STATUS. Only two glyphs are ever emitted, in the winter snapshots and in
 * summer alike: fa-check and fa-times. coerce.js knows 'check' -> open, but
 * 'times' is not in its map and would silently read 'scheduled' - a closed lift
 * shown as about to open - so translate both here. An unrecognised glyph is
 * passed through verbatim so coerce logs it instead of us guessing at it.
 */
const statuses = {
  check: 'open',
  times: 'closed'
};

export function row(tr) {
  const tds = select(tr, 'td');
  if (tds.length < 2) {
    return;
  }
  const name = allText(tds.at(-1)).trim();
  if (!name) {
    return;
  }
  const glyph = select(tds[0], 'i')[0]?.attribs.class ?? '';
  const key = glyph.match(/\bfa-(check|times)\b/)?.[1];
  return {
    name,
    status: statuses[key] ?? glyph.trim(),
    // table.slope grades with <i class="fa fa-circle blue|red|black">; the
    // other two tables publish no difficulty, so this is usually absent
    grade: select(tr, 'i.fa-circle')[0]?.attribs.class?.match(/\bfa-circle\s+(\w+)/)?.[1]
  };
}

export default function rows(dom, kind) {
  return select(dom, `#pisten_anlagen table.${kind} tbody tr`).map(row).filter(Boolean);
}
