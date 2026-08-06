// Fnugg encodes lift and slope status as a STRING and the value set is exactly
// {"0", "1"}: a census of all 126 resorts on the platform counts lifts 0:519 /
// 1:58 and slopes 0:1263 / 1:114 and nothing else, and _source.lifts.open
// equals the count of "1" wherever anything is running.
//
// *** COERCE TRAP ***: lib/tools/coerce.js maps 1 -> open, 2 -> scheduled,
// 3 -> closed and has NO key for 0, so a raw "0" falls through to 'scheduled'
// and every lift and slope here would read as scheduled for the eight months
// Strandafjellet is shut. "1" -> open only works by accident. Translate both
// before coerce, and hand anything new straight through so it gets logged
// rather than guessed at.
export default function status(value) {
  if (value === '1') {
    return 'open';
  }
  if (value === '0') {
    return 'closed';
  }
  return value;
}
