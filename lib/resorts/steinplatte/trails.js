import reportedAt from './reported-at.js';

/**
 * Same FacilityApi call as index.js with typeIDs=2 - the 23 pistes, verified
 * 1:1 against /de/pistenstatus-highlights.html. typeIDs=2 also keeps out the
 * 'Highlights' block that page renders below the pistes with identical markup
 * (Triassic Park, Aussichtsplattform, Klettersteig ...), which are not runs.
 *
 * GRADES. The API encodes difficulty in facilityTypeIdentifier, and none of
 * its tokens are in lib/trails/parse.js. Do NOT strip the '-piste' suffix and
 * let normalizeLevel see 'easy'/'medium'/'difficult': that map reads
 * easy->green, medium->blue, which shifts an Austrian scale down a notch and
 * publishes every blue run as green.
 *
 * Steinplatte grades on the standard Austrian three tier scale, blau < rot <
 * schwarz - the page's own legend says Leicht / Mittel / Schwer / Skiroute and
 * its own prose spells the colours out: "20 km leichten (blauen), 20 km
 * mittelschweren (roten) und 2 km anspruchsvollen (schwarzen) Abfahrten sowie
 * zusaetzlich 3 km markierten Skirouten". There is no green tier at all, so
 * mapped in the krvavec / baqueira idiom, one step down each, which keeps all
 * three published grades distinct and in order:
 *   easy-piste       blau     -> blue         (11 runs)
 *   medium-piste     rot      -> black        (8 runs)
 *   difficult-piste2 schwarz  -> doubleBlack  (2 runs)
 *   skiroute         Skiroute -> no level     (2 marked, unpisted ski routes)
 * `grade` carries the resort's own colour word through untouched so a consumer
 * can render the real Austrian scale instead of this lossy reading.
 *
 * STATUS: same two tokens as the lifts, 'opened' / 'closed', both known to
 * coerce.js - passed through raw.
 */
const levels = {
  'easy-piste': 'blue',
  'medium-piste': 'black',
  'difficult-piste2': 'doubleBlack'
};

const grades = {
  'easy-piste': 'blau',
  'medium-piste': 'rot',
  'difficult-piste2': 'schwarz',
  skiroute: 'Skiroute'
};

export default function trails(data = {}) {
  const { items = [], meta } = data;
  const list = [];
  for (const { title, state, facilityTypeIdentifier } of items) {
    if (!state) {
      continue; // non-facility map objects carry no state
    }
    list.push({
      name: title,
      status: state,
      level: levels[facilityTypeIdentifier],
      grade: grades[facilityTypeIdentifier]
    });
  }
  const at = reportedAt(meta?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
