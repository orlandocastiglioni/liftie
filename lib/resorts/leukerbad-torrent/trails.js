import { report, reportedAt, rows } from './report.js';

/**
 * Every run the report publishes, in page order: 19 Pisten, the Funpark, the
 * Schlittelpiste, 6 Winterwanderwege (one of them a snowshoe trail) and the 3
 * MOVEMENT ski-touring tracks filed under Diverses = 30 rows. Langlauf and
 * Schneeschuhtouren are in the allowlist because Torrent renders those blocks
 * too (empty today, and populated on the neighbouring Gemmi entry). The two
 * blocks deliberately left out are 'Anlagen', which the lift parser takes, and
 * 'Gastronomie', which is restaurants and hotels.
 *
 * GRADES. Torrent is a Swiss 4-tier resort and the icon title carries its own
 * word: 'Skipiste - blau' (icon 13), '- rot' (14), '- schwarz' (15), '- gelb'
 * (16). None of blau/rot/schwarz/gelb is a key in the levels map in
 * lib/trails/parse.js, so without an explicit map every piste would publish
 * level-less.
 *
 * Mapped on the baqueira-beret / corralco convention for a European red:
 * blau->blue, rot->black, schwarz->doubleBlack, which keeps the three graded
 * tiers distinct and in order. gelb gets NO level - it is the Swiss yellow
 * ski-route grade, an unpatrolled freeride itinerary rather than a step on the
 * piste scale, and Torrent's three yellow lines are literally named Freeride
 * Direttissima / Tschantamaria / Torrentstafel. `grade` carries the German word
 * verbatim in all four cases so the yellow tier is not lost.
 *
 * Ungraded kinds keep the resort's own label as the grade (Schlittelbahn,
 * Wanderweg, Schneeschuh-Wandern, Tourenski, Langlauf - klassisch & skating)
 * and get no level; the Snowpark gets terrainPark, which is a level liftie has.
 */
const sections = [
  'Pisten',
  'Funparks',
  'Schlittelpisten',
  'Langlauf',
  'Winterwanderwege',
  'Schneeschuhtouren',
  'Diverses'
];

const levels = {
  blau: 'blue',
  rot: 'black',
  schwarz: 'doubleBlack'
};

export default function trails(dom) {
  const doc = report(dom);
  const list = rows(doc, sections).map(({ name, status, kind }) => {
    // 'Skipiste - rot' -> grade 'rot'; anything else keeps its own label
    const piste = kind?.match(/^Skipiste\s*-\s*(\S+)$/)?.[1];
    return {
      name,
      status,
      level: piste ? levels[piste] : kind === 'Snowpark' ? 'terrainPark' : undefined,
      grade: piste ?? kind
    };
  });
  const at = reportedAt(doc);
  if (at) {
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
