import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * The status cell is `<span class="svg16 svg--*"></span> Aperto`. Every capture
 * I have - live, and Wayback at 2026-02-03, 2025-12-13, 2023-12-01, 2022-12-03 -
 * renders only Aperto and Chiuso, and coerce.js knows both.
 *
 * The summary block at the top of the same page counts two states that never
 * showed up on a row: 'Impianti in apertura' and 'Impianti fuori servizio'. If
 * they ever reach a row, coerce would strip the space and miss both: 'inapertura'
 * falls through to 'scheduled', which is right by luck, and 'fuoriservizio' also
 * falls through to 'scheduled', which is wrong - out of service is closed. Map
 * the four words the page uses about itself here rather than leave that to the
 * fallback.
 *
 * The icon class is the same signal (cdh-viewer.css only styles the two
 * observed ones) and is the backstop for a word this map has never seen -
 * "Chiuso per vento" would coerce to 'scheduled' on its own, but its close
 * icon still says closed.
 */
const words = {
  aperto: 'open',
  aperta: 'open',
  chiuso: 'closed',
  chiusa: 'closed',
  'in apertura': 'scheduled',
  'fuori servizio': 'closed'
};

const icons = {
  'svg--checkmark--circle': 'open',
  'svg--close--circle': 'closed'
};

export default function status(td) {
  if (!td) {
    return;
  }
  const word = allText(td).replace(/\s+/g, ' ').trim().toLowerCase();
  const icon = select(td, 'span.svg16')[0]
    ?.attribs?.class?.split(/\s+/)
    .map(cls => icons[cls])
    .find(Boolean);
  // a word this map has never seen still reaches coerce, which knows more
  // aliases and logs whatever it cannot place
  return words[word] ?? icon ?? word;
}
