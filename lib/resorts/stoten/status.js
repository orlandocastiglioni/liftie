import coerce from '../../tools/coerce.js';

// The feed states status as a JSON BOOLEAN, not a word:
// {"Id":"A","Name":"Kronliften","IsOpen":false}. Swedish 'Öppen'/'Stängd'
// appear nowhere in it (they only existed in the pre-2025 site markup), so
// there is no vocabulary to translate - but there is a trap: coerce() calls
// status.replace(), so handing it the raw boolean `true` THROWS, while `false`
// only survives by being falsy. Stringify first and let coerce do the work; it
// maps 'true' -> open and 'false' -> closed.
//
// A row with no IsOpen at all stringifies to 'undefined', which coerce does
// not know and reports as 'scheduled' - the right answer for a row the resort
// has not stated.
export default function status(isOpen) {
  return coerce(String(isOpen));
}
