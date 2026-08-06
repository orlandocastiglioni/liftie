import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';
import status from './status.js';
import tables from './table.js';

/**
 * Courses come from the two Course | Status tables; concatenating them in
 * document order reproduces the published order of all 23 courses.
 *
 * No level is published. /ski/mountain does carry a static Course/Level table,
 * but its 15 rows do not line up with these 23 names: one row covers two
 * courses ('Main Line, Skyline'), several names differ ('Panorama Course' vs
 * 'Panorama', 'Wave Connector' vs 'Upper Wave' + 'Lower Wave'), and Skyline
 * Connector, Piste Off, Pipe Dream, Skate Away, Dream Walker and the half pipe
 * have no entry at all. Level is optional in lib/trails/parse.js, so the
 * courses ship without one rather than with a hand-guessed map that would rot
 * as the resort renames courses between seasons.
 *
 * Names are kept verbatim, including the resort's own misspellings
 * ('Connecter'), so they match what the site itself shows.
 */
export default function parse(dom) {
  const list = [];
  for (const rows of tables(dom, 'Course')) {
    for (const [name, state] of rows) {
      if (name && state) {
        list.push({ name, status: status(state) });
      }
    }
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}

// The page dates itself - '<strong>Updated:</strong> 2026-02-01, 10:40', JST -
// and that matters more here than at most resorts: out of season this report is
// not emptied, it is frozen, so all summer the page keeps serving last winter's
// final all-closed board. The timestamp is the only way a consumer can tell
// that apart from a live report.
export function reportedAt(dom) {
  for (const strong of select(dom, 'strong')) {
    if (!/^\s*Updated:/i.test(findText(strong) ?? '')) {
      continue;
    }
    const m = allText(strong.parent ?? {}).match(/(\d{4})-(\d{2})-(\d{2}),\s*(\d{1,2}):(\d{2})/);
    if (!m) {
      continue;
    }
    const [, y, mo, d, h, min] = m;
    const date = new Date(`${y}-${mo}-${d}T${h.padStart(2, '0')}:${min}:00+09:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
}
