import { status, title } from '../glungezer/index.js';
import reportedAt from '../glungezer/reported-at.js';

/**
 * The Stubai glacier grades on the Austrian three-tier scale - blau / rot /
 * schwarz, no green. The Intermaps feed (see index.js) carries it as the
 * numeric head of each slope row's `type` - '2614-easy' / '2615-medium' /
 * '2616-difficult', a string here where Glungezer's feed sends a bare number -
 * and spells it out again in `subtitle` ('Slopes, Easy'). Read the code: it
 * survives the language switch. Published as blue / red / black, the colours
 * the network site printed for the same runs before it dropped its tables.
 *
 * normalizeLevel in lib/trails/parse.js knows 'blue' and 'black' but has no
 * 'red' at all, so shift the top two tiers down one slot: red -> black and
 * black -> doubleBlack, which keeps all three grades distinct and in the
 * resort's own order. Same reading as lib/resorts/kaunertaler-gletscher,
 * lib/resorts/rauriser-hochalmbahnen and lib/resorts/krvavec.
 */
const grades = {
  2614: 'blue',
  2615: 'red',
  2616: 'black'
};

const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * Ski routes (Skirouten) sit in the same `slopes` array with their own type
 * codes - 2617 plain, 2631 for the graded valley route. They are unpisted and
 * the operator grades only one of them, so they keep their level unset and
 * carry 'skiroute' as `grade`, as before, so a ski route is never mistaken
 * for a piste whose grade merely failed to parse.
 */
const SKIROUTES = new Set([2617, 2631]);

function code(row) {
  return Number.parseInt(String(row?.type ?? ''), 10);
}

/**
 * Every row of `slopes`: 29 pistes and 7 ski routes in the 2026-10-27 feed.
 * `routes` is left out - it holds the race tracks, the winter hiking path and
 * the cross-country loipe, none of which is a downhill trail.
 */
export default function trails(body) {
  const list = [];
  for (const row of body?.slopes ?? []) {
    const name = title(row);
    if (!name) {
      continue;
    }
    const c = code(row);
    if (SKIROUTES.has(c)) {
      list.push({ name, status: status(row), grade: 'skiroute' });
      continue;
    }
    const grade = grades[c];
    list.push({ name, status: status(row), level: levels[grade], grade });
  }
  const at = reportedAt(body?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
