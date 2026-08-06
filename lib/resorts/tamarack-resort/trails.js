import select from '../../select.js';
import { rating, rowName, rowStatus } from './status.js';

// Tamarack's rating icons are not liftie level names, and two of them are not
// in normalizeLevel's map at all, so they get an explicit map. The page legend
// labels advancedBeginner "Beginner" and advancedIntermediate "Intermediate".
const levels = {
  advancedBeginner: 'green',
  advancedIntermediate: 'blue',
  advanced: 'black',
  m: 'terrainPark', // terrain-park size, only on the freestyle rows
  s: 'terrainPark'
};

// 'expert' is season-dependent. The winter report rates every run with just
// advancedBeginner / advancedIntermediate / expert, so expert is the
// black-diamond tier there (41% of winter runs carry it, against Tamarack's
// published 38% advanced terrain) - normalizeLevel's default expert ->
// doubleBlack would be wrong. The summer bike report grades with a real
// advanced + expert pair, where expert does mean double black; that is exactly
// what the presence of an 'advanced' row signals.
function expertLevel(ratings) {
  return ratings.has('advanced') ? 'doubleBlack' : 'black';
}

// Deliberately '.mWPSItem' and not '.trailItem': the trails wrapper also holds
// a .mWPSList.liftsList.type_freestyleTerrain list whose rows carry class
// liftItem, and those are the terrain parks (Showtime, Discovery).
export default function parse(dom) {
  const items = select(dom, '.mWPSTrailsWrap .mWPSItem');
  const ratings = new Set(items.map(rating).filter(Boolean));
  const expert = expertLevel(ratings);
  const rows = [];
  for (const item of items) {
    const name = rowName(item);
    const status = rowStatus(item);
    if (!name || !status) {
      continue;
    }
    const r = rating(item);
    rows.push({ name, status, level: r === 'expert' ? expert : levels[r] });
  }
  return rows;
}
