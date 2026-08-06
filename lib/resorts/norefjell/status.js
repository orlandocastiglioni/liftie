// Fnugg encodes both lift and slope status as a STRING, and the value set is
// exactly {"0", "1"} - no third value exists anywhere in the platform's 126
// resorts, and _source.lifts.open equals the count of "1" at every resort with
// anything running, so "1" is open and "0" is closed.
//
// *** COERCE TRAP ***: lib/tools/coerce.js maps 1 -> open, 2 -> scheduled,
// 3 -> closed and has NO key for 0. A raw "0" therefore falls through to
// 'scheduled', which would render all 15 lifts and all 30 slopes here as
// scheduled for eight months of the year. "1" only works by accident.
// Translate before coerce; hand anything new straight to coerce so it gets
// logged rather than guessed at.
export default function status(value) {
  if (value === '1') {
    return 'open';
  }
  if (value === '0') {
    return 'closed';
  }
  return value;
}
