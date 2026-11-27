import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';
import { cells, status } from './index.js';
import reportedAt from './reported-at.js';

/**
 * LEVEL. Kaunertal runs the three tier Austrian scale - blau / rot / schwarz,
 * no green - and publishes it twice over: as the colour class on the run's
 * number badge (span.nrColor.color-blue|color-red|color-black) and as a German
 * word in td.classification (Leicht / Mittel / Schwer). The two are perfectly
 * parallel in the fixture (15 blue+Leicht, 7 red+Mittel, 5 black+Schwer).
 *
 * Neither vocabulary is in normalizeLevel's map: 'Leicht'/'Mittel'/'Schwer' are
 * German and absent outright, and of the colours only blue and black resolve -
 * 'red' is not a level at all, so the 7 rot pistes would publish ungraded. And
 * a colour must never reach coerce.js as a status, where 'red' reads CLOSED and
 * 'blue' reads 'scheduled'. So map it here.
 *
 * red -> black and black -> doubleBlack, one step down each, which keeps all
 * three published tiers distinct and correctly ordered. Same reading as the
 * other blue/red/black European resorts already in the registry
 * (lib/resorts/krvavec, and the same collapse lib/resorts/baqueira-beret and
 * lib/resorts/glencoe document).
 *
 * The level is taken from the colour class because it is a machine token that
 * survives the language switch; the German word is published verbatim as
 * `grade` so a consumer can still render the resort's own three tier scale
 * rather than liftie's lossy four value reading.
 */
const levels = {
  'color-blue': 'blue',
  'color-red': 'black',
  'color-black': 'doubleBlack'
};

function level(badge) {
  return levels[badge?.attribs.class?.split(/\s+/).find(c => c.startsWith('color-'))];
}

/**
 * #pistenStatus, 27 rows. Column 2 is the piste NAME even though it carries
 * class 'workingPeriod' and the header calls it 'Pistenname' - the markup
 * reuses the lift table's class names. Column 1 is the map number ('1', '15',
 * 'R', 'F', 'S', 'T', 'x', 'z'), left out of the name: it is the badge, and the
 * names are unique without it.
 *
 * Not all 27 rows are ski pistes - Rodelbahn Sonnleiten (R), Funslope (F),
 * Snowpark Kaunertal (S), Tubingbahn (T) and the two Gletscherstrasse road
 * segments (x, z) are in there too. The sled run, fun slope, park and tubing
 * lane are snow terrain with their own status and grade, so they are kept.
 *
 * The two road rows are dropped. They are the toll road up to the glacier
 * car park ('Gletscherstraße: Mautstelle - Ochsenalm', '... Ochsenalm -
 * Gletscherparkplatz'), open whenever the road is, so they inflated the open
 * count: on 2026-11-26 the feed published 9 open trails against the 7 open
 * pistes on the board. Matched by name (ß or ss, either case) rather than by
 * the x/z badge, which is a map label with no meaning of its own.
 */
const ROAD = /^gletscherstra(?:ß|ss)e\b/i;

export default function trails(dom) {
  const list = [];
  for (const row of select(dom, '#pistenStatus table tbody tr')) {
    const byClass = cells(row);
    const name = findText(byClass('workingPeriod'));
    const s = status(byClass('status'));
    if (!name || !s || ROAD.test(name.trim())) {
      continue;
    }
    const grade = allText(byClass('classification') ?? {}).trim();
    list.push({
      name: name.trim(),
      status: s,
      level: level(select(row, 'span.nrColor')[0]),
      grade: grade || undefined
    });
  }
  const at = reportedAt(dom, 'pistenStatus');
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
