import level from './levels.js';
import status from './status.js';

/**
 * Three of the four arrays in the same single response are trails, and they
 * are the three trail tabs of the resort's own table:
 *
 * - Slopes[]     69 downhill runs. Long runs are published as a parent plus
 *                its segments (Mormors Störtlopp with ', övre' and ', nedre',
 *                and the same for 7, 11, 13, 14, 26, 29, 30), each separately
 *                statused; the site's table shows both, so both are kept. The
 *                segments are where the difficulty lives - see levels.js.
 * - Tracks[]      8 groomed cross-country loops (längdspår). The resort grades
 *                no XC track, so these publish with no level, which is also
 *                how the other Nordic rows in the registry read.
 * - Adventures[]  9 freestyle and adventure features - Stöten Snowpark, Jibb
 *                Arena, Junior Park, the mogul lane, skicross, the timing
 *                courses. normalizeLevel folds all of that into terrainPark,
 *                which is the closest liftie has and how parks read elsewhere.
 *
 * Vargys Äventyrsbana is published in BOTH Slopes and Adventures (the site
 * tags that row aktyp-skidbacke aktyp-adventures and shows it under both
 * tabs), so rows are deduped by name and the first - the graded slope entry -
 * wins.
 */
const sections = [
  { key: 'Slopes', level },
  { key: 'Tracks', level: () => undefined },
  { key: 'Adventures', level: () => 'terrainPark' }
];

export default function trails(body) {
  const list = [];
  const seen = new Set();
  for (const section of sections) {
    for (const row of body?.[section.key] ?? []) {
      const name = row?.Name?.trim();
      if (name && !seen.has(name)) {
        seen.add(name);
        list.push({ name, status: status(row.IsOpen), level: section.level(name) });
      }
    }
  }
  return list;
}
