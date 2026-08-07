import select from '../../select.js';

/**
 * Patscherkofel is one of twelve areas of the SKI plus CITY pass, each with its
 * own /skiing-resorts/<slug>/ page carrying an Intermaps widget in
 * div#pisten_anlagen. The status column holds a Font Awesome glyph and nothing
 * else - no word, no title attribute, no colour class:
 *
 *   <i class="fa fa-check"></i>  open
 *   <i class="fa fa-times"></i>  closed
 *
 * Those are the only two the widget emits (checked across the whole network,
 * in summer and in the December 2025 fixture). 'check' is already in
 * coerce.js; 'times' is NOT, and an unknown token there silently becomes
 * 'scheduled' - every closed lift on the mountain would publish as about to
 * open. So translate the glyph to a liftie word here rather than handing the
 * class name to coerce.
 *
 * Return undefined for anything else: a row with no recognised glyph is a
 * markup change, and dropping it is better than guessing.
 */
const map = {
  check: 'open',
  times: 'closed'
};

export default function status(cell) {
  if (!cell) {
    return;
  }
  const glyph = select(cell, 'i')[0]?.attribs?.class?.match(/\bfa-(check|times)\b/)?.[1];
  return glyph && map[glyph];
}

// the widget's tables are <td>-per-column with no classes on the lift rows, so
// take the status from the first cell and the name from the last; that holds
// for table.lift (3 cols), table.slope (3 cols) and table.skiroute (2 cols)
export function cells(row) {
  return row.children.filter(c => c.name === 'td');
}
