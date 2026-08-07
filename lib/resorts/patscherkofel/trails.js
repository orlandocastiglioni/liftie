import select from '../../select.js';
import { rows } from './index.js';

/**
 * GRADE. table.slope has a Difficulty column whose entire content is a coloured
 * dot: <i class="fa fa-circle blue|red|black">. That colour class IS the
 * resort's own grade word, so it is published verbatim as `grade` - the twelve
 * SKI plus CITY areas all speak this same blue/red/black vocabulary (the ones
 * that come off Intermaps' own feed spell it easy/medium/difficult in English
 * and blau/rot/schwarz in German, same three tiers), so a consumer can render
 * the real Austrian scale across the whole pass.
 *
 * LEVEL. Of those three only 'blue' and 'black' are in normalizeLevel's map;
 * 'red' is absent, so the four red pistes here would publish with no level at
 * all. Austria grades on three tiers - blau / rot / schwarz, there is no green -
 * so map one step down each to keep all three distinct and correctly ordered:
 *
 *   blue -> blue, red -> black, black -> doubleBlack
 *
 * Same reading as the other blue/red/black Alpine resorts already in the
 * registry (lib/resorts/kaunertaler-gletscher, lib/resorts/krvavec).
 *
 * A colour must never reach coerce.js as a status either - 'red' reads CLOSED
 * there and 'blue' reads 'scheduled' - hence the separate status.js.
 */
const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

function grade(row) {
  const cls = select(row, 'i.fa-circle')[0]?.attribs?.class?.split(/\s+/) ?? [];
  return cls.find(c => c in levels);
}

/**
 * 12 pistes, all in table.slope; Patscherkofel publishes no table.skiroute
 * today, but the selector covers it because sibling areas of the pass do and
 * the operator adds one the moment a route is signposted. Ski-route rows carry
 * no difficulty cell (and Kuehtai even folds routes into table.slope with a
 * relType <img> where the dot would be), so a missing grade is expected, not an
 * error - such a row publishes with neither level nor grade.
 *
 * The statistics header says "6 / 14" while the table lists 12: the header
 * counts piste segments, the table counts named runs. Trust the table.
 *
 * No timestamp anywhere on these pages, so no reportedAt - see the sibling
 * lib/resorts/rangger-koepfl, whose Intermaps source does date itself.
 */
export default function trails(dom) {
  const list = [];
  for (const table of ['table.slope', 'table.skiroute']) {
    for (const { row, name, status } of rows(dom, `#pisten_anlagen ${table} tbody tr`)) {
      if (!name || !status) {
        continue;
      }
      const g = grade(row);
      list.push({ name, status, level: levels[g], grade: g });
    }
  }
  return list;
}
