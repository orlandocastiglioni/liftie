// Riksgränsen's badges are Swedish and coerce.js knows NONE of them - it
// lowercases and strips [\s_-] but does not strip diacritics, so there is no
// accidental match either. Left unmapped, every lift, piste, off-piste route
// and cross-country loop on the mountain would publish as 'scheduled'.
//
// The primary signal read here is the badge's border colour rather than its
// wording. The theme's built Tailwind CSS contains exactly three badge border
// colours - border-green-700, border-brand-red-800, border-gray-800 - and
// Tailwind only emits classes that actually appear in templates, so the state
// is provably a 3-colour system: green = open, red = closed, gray = something
// else. The gray text is free-form CMS content, so new Swedish wordings can
// appear mid-winter; keying on the colour means only the gray branch has to
// enumerate words, and an unrecognised gray falls through to coerce, which
// logs it and yields 'scheduled' rather than guessing 'open'.
const UNPREPARED = 'Inte förberedd';

// Gray qualifier badges sit after the state badge on a lift row, in the second
// .badges cell: 'Väderförhållanden' (weather conditions) and 'Tekniska
// svårigheter' (technical difficulties). Both describe a temporary stop rather
// than a seasonal closure, which is exactly what liftie's 'hold' means, so a
// qualified row reports hold whichever way the state badge reads. Match the
// technical one loosely - the wording is CMS text.
function isHold({ text = '' }) {
  return text === 'Väderförhållanden' || /^tekni/i.test(text);
}

/**
 * @param badges - every badge on the row as { text, colour }, document order;
 *   the first is the state, any further one is a qualifier
 * @param section - which of the four feed sections the row came from;
 *   'Inte förberedd' genuinely means the opposite thing on the XC loops
 */
export default function status(badges, section) {
  const [state, ...rest] = badges;
  if (!state) {
    return;
  }
  const hold = rest.some(isHold);
  if (state.colour === 'green') {
    return hold ? 'hold' : 'open';
  }
  if (state.colour === 'brand-red') {
    return hold ? 'hold' : 'closed';
  }
  if (state.text === UNPREPARED) {
    // The resort's own counters settle what this means, and they disagree by
    // section. Downhill: pistsOpen reads '1 / 17' where the only row that is
    // not 'Stängt' is the unprepared Gränsleden 1 - a skiable but ungroomed
    // run counts as open. Cross-country: crossCountryOpen reads '0 / 7' with
    // all seven loops unprepared - an untracked loop counts as not open.
    return section === 'crossCountry' ? 'closed' : 'open';
  }
  // some other gray state: hand the raw wording to coerce so it is logged
  return state.text;
}
