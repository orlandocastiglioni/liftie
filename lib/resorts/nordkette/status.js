import select from '../../select.js';

/**
 * Every row of the SKI plus CITY area report - lift, slope or ski route alike -
 * carries its status as a bare Font Awesome glyph in the first cell, and only
 * ever as one of two glyphs: `fa fa-check` (open) or `fa fa-times` (closed).
 * That held in the 2025-02-19 and 2026-03-06 winter captures and on the live
 * summer page, and the network publishes no third state anywhere.
 *
 * coerce already reads 'check' as open, but it has no entry for 'times' at all,
 * so handing the class name straight over would turn every closed lift and
 * every closed piste into 'scheduled' - a closed mountain would read as one
 * about to open. Translate the two glyphs here instead.
 *
 * A glyph we have never seen deliberately returns undefined rather than a
 * guess: coerce's own fallback is 'scheduled', which is the honest answer for
 * a status this parser does not understand.
 */
export default function status(row) {
  const cell = select(row, 'td')[0];
  const cls = select(cell?.children ?? [], 'i')[0]?.attribs?.class ?? '';
  if (/\bfa-check\b/.test(cls)) {
    return 'open';
  }
  if (/\bfa-times\b/.test(cls)) {
    return 'closed';
  }
}
