// Björkliden's badges are Swedish and coerce.js knows NONE of them. coerce
// lowercases and strips [\s_-] but does not strip diacritics, so there is no
// accidental match either: left unmapped, every lift and every trail on the
// mountain would publish as 'scheduled'. Hence the explicit allowlist below.
// The exact words matter - the site emits 'Öppna' (not Öppen/Öppet) and
// 'Stängt' (not Stängd).
const OPEN = 'Öppna';
const CLOSED = 'Stängt';
const UNPREPARED = 'Inte förberedd';

// Gray qualifier badges sit after the state badge on a lift row. The resort's
// own patrol API models these as for_weather_conditions / for_technical_problem
// booleans set alongside the open flag - a temporary stop, not a seasonal
// closure - which is exactly what liftie's 'hold' means, so a qualified row
// reports hold whichever way the state badge reads. Only the weather badge has
// actually been observed; the technical one is documented by that API but has
// not shown up in any capture, so match it loosely.
function isHold(badge) {
  return badge === 'Väderförhållanden' || /^tekni/i.test(badge);
}

/**
 * @param badges - every badge on the row, in document order
 * @param section - which of the four feed sections the row came from;
 *   'Inte förberedd' genuinely means different things per section
 */
export default function status(badges, section) {
  const [state, ...rest] = badges;

  if (section === 'crossCountry') {
    // A cross-country row's only badge is the track style that has been set
    // ('Klassisk', and expect 'Skate' / 'Klassisk & Skate'), or 'Inte
    // förberedd' when nothing has been tracked. Any track style means the loop
    // is set, so treat it as open rather than trying to enumerate the styles.
    // The resort counts an unprepared loop as NOT open: 5 'Klassisk' + 3 'Inte
    // förberedd' is reported as crossCountryOpen '5 / 8'.
    return !state || state === UNPREPARED ? 'closed' : 'open';
  }

  if (state === OPEN) {
    return rest.some(isHold) ? 'hold' : 'open';
  }
  if (state === CLOSED) {
    return rest.some(isHold) ? 'hold' : 'closed';
  }
  if (state === UNPREPARED) {
    // A downhill run that is skiable but ungroomed. Here the resort counts it
    // as open - 7 'Öppna' plus 1 'Inte förberedd' out of 15 is reported as
    // pistsOpen '8 / 15' - matching its pist API's operational enum
    // [0 closed, 1 open, 2 open-but-unprepared].
    return 'open';
  }
  // hand anything new to coerce, which logs the unknown token and yields
  // 'scheduled'
  return state;
}
