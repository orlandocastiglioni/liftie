import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Same page as the lifts. The Trail Status block is a list of
// .pgri-groom__area groups (Flat Top Flyer / West End / Beginner) of
// .pgri-groom__run rows: span.pgri-groom__name holds a difficulty glyph
// (span.pgri-groom__dg), the run name and optional feature badges; the status
// is the modifier class of span.pgri-groom__status.
//
// The page legend defines the glyphs: ● Easiest, ■ More Difficult,
// ◆ Most Difficult, ◆◆ Advanced (double black). Status modifiers in the
// theme CSS are --groomed, --open, --closed and --none; groomed is open, and
// --none ("no report" placeholder) yields no row at all.
const levels = {
  '●': 'green',
  '■': 'blue',
  '◆': 'black',
  '◆◆': 'doubleBlack'
};

const statuses = {
  groomed: 'open',
  open: 'open',
  closed: 'closed'
};

export default function parse(dom) {
  const rows = [];
  for (const run of select(dom, '.pgri-groom__run')) {
    const label = select(run, '.pgri-groom__name')[0];
    const name = allText(label ?? {})
      .replace(/\s+/g, ' ')
      .trim();
    const modifier = (select(run, '.pgri-groom__status')[0]?.attribs.class ?? '').match(
      /pgri-groom__status--([\w-]+)/
    )?.[1];
    const status = statuses[modifier];
    if (!name || !status) {
      continue;
    }
    const glyph = allText(select(run, '.pgri-groom__dg')[0] ?? {}).replace(/\s+/g, '');
    rows.push({ name, status, level: levels[glyph] });
  }
  return rows;
}
