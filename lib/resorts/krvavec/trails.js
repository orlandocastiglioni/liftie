import reportedAt from './reported-at.js';
import rows, { STAMP, values } from './rows.js';

/**
 * Krvavec grades on the full three tier European scheme and publishes it ONLY
 * as the colour class of the run's map badge - blue-circle / red-circle /
 * black-circle - never as text. Two traps in one field:
 *
 *  - lib/trails/parse.js has no red tier, so a straight pass through drops the
 *    grade of more than half the runs (they publish with no level at all);
 *  - lib/tools/coerce.js reads the bare token 'red' as CLOSED and 'blue' as
 *    'scheduled', so these colours must never reach it as a status.
 *
 * Mapped locally, in the idiom of lib/resorts/glencoe/trails.js: red is one
 * step below the local black, and Krvavec's blacks really are the hard tier
 * (two of the three are the ungroomed '(freeride)' descents), so red -> black
 * and black -> doubleBlack keeps all three published grades distinct and in
 * order. white-circle is a lift's code badge, not a difficulty.
 */
const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * PROGE - faq-item 2 of /krvavec-data.json, the resort's complete published
 * run list (27 rows in the Nov 2025 capture, 25 today), parks included.
 *
 * faq-item 3 (AKTIVNOSTI: night sledding, rental, ski school, the Intersport
 * GS course, the snowpark) uses the identical name+status idiom but is not a
 * run list and double lists the snowpark, so it is deliberately left out.
 *
 * Names are published as the resort writes them. A season can carry the same
 * name twice, distinguished only by the map number ('Smučarska proga' is 14
 * and 20 today, 'Neteptana Gospinca (freeride)' was 6 and 6b in 2025); the
 * numbers are reshuffled between seasons, so folding them into the name would
 * trade a rare duplicate for a name that changes every year.
 */
export default function trails(data) {
  const list = rows(data, 2).map(({ name, level, status }) => ({ name, status, level: levels[level] }));
  const at = reportedAt(values(data, STAMP)[0]);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
