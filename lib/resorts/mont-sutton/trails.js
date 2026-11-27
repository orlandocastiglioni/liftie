import select from '../../select.js';
import { statusToken } from './rows.js';

/**
 * Trail list of the 2026-11 conditions page (see index.js). One row per trail
 * section, as before (top and bottom halves of a trail are separate rows):
 *
 *   <div class="flexible_liste_des_pistes_list_row js-pistes-row"
 *        data-level="facile moyenne" data-number="2" data-name="Coucou">
 *     ... <div class="flexible_liste_des_pistes_list_cell -status -closed">Closed</div> ...
 *
 * The whole list is rendered TWICE - once in the page and once more in the
 * slide-out drawer (section.flexible_liste_des_pistes.-panel) - so the drawer
 * copy is excluded, otherwise every trail would appear two times.
 *
 * DIFFICULTY comes from data-level, Sutton's own four-step French scale (the
 * filter buttons use the same four codes). It maps onto liftie exactly as the
 * old icon_track-* classes did: facile = Easy, moyenne = "Difficult" (Sutton's
 * blue), difficile = "Very difficult", extreme = Extreme and Extreme +. A row
 * listing two levels takes the harder one.
 */
const LEVELS = {
  facile: 'green',
  moyenne: 'blue',
  difficile: 'black',
  extreme: 'doubleBlack'
};
const RANK = { green: 0, blue: 1, black: 2, doubleBlack: 3 };

export default function parse(dom) {
  const rows = [];
  for (const row of select(
    dom,
    'section.flexible_liste_des_pistes:not(.-panel) .flexible_liste_des_pistes_list_row.js-pistes-row'
  )) {
    const name = row.attribs?.['data-name']?.trim();
    if (!name) {
      continue;
    }
    let level;
    for (const code of (row.attribs['data-level'] ?? '').split(/\s+/)) {
      const mapped = LEVELS[code];
      if (mapped && (level === undefined || RANK[mapped] > RANK[level])) {
        level = mapped;
      }
    }
    const status = statusToken(select(row, '.flexible_liste_des_pistes_list_cell.-status')[0]);
    rows.push({ name, status, level });
  }
  return rows;
}
