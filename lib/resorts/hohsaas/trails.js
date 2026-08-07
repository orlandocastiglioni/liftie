import { name, report, reportedAt, rows, status, type } from './report.js';

/**
 * GRADE. infosnow spells the difficulty out in the type icon's title, in the
 * resort's own words: 'Skipiste - rot' (icon 14), 'Skipiste - blau' (13),
 * 'Skipiste - gelb' (16), 'Skipiste - schwarz' (15). Saas-Grund currently
 * publishes no schwarz, but the platform emits it at sibling areas, so it is
 * mapped here rather than waiting for the season that adds one.
 *
 * LEVEL. None of blau/rot/gelb/schwarz is a key in normalizeLevel, so left
 * alone every piste publishes ungraded - and the words must never be fed to
 * coerce.js either, where a colour would be read as a status. Mapped locally on
 * the Swiss three tier scale, one step down each so the tiers stay distinct and
 * ordered: blau -> blue, rot -> black, schwarz -> doubleBlack. Same reading as
 * the other blue/red/black European resorts in the registry (lib/resorts/krvavec,
 * and the collapse lib/resorts/glencoe and lib/resorts/baqueira-beret document).
 *
 * gelb is not a fourth difficulty: it is the Swiss yellow ski ROUTE - marked
 * but neither groomed nor patrolled - which has no sensible liftie level at
 * all, so it gets none and publishes on `grade` alone.
 */
const levels = {
  blau: 'blue',
  rot: 'black',
  schwarz: 'doubleBlack'
};

/**
 * PISTEN - infosnow category 2, thirteen rows, which is exactly the slope list
 * the operator's own www.saas-fee.ch page carries (that page just prints no
 * difficulty on any of them).
 *
 * The same fetch also carries Funparks (3), Schlittelpisten (2) and Langlauf
 * (14, seven loipen x klassisch/skating) under their own category ids. They are
 * deliberately left out: the sledging runs and the loipen are Saastal valley
 * products - Saas-Balen, Bidermatten, Zermeiggern - not Hohsaas ski terrain,
 * and publishing them would make this a nordic area too.
 */
export default function trails(dom) {
  const doc = report(dom);
  const list = rows(doc, 2).map(row => {
    // 'Skipiste - rot' -> 'rot'; a row with no colour in its title gets neither
    // a grade nor a level rather than a guessed one
    const grade = type(row)?.split(' - ')[1]?.trim();
    return {
      name: name(row),
      status: status(row),
      level: levels[grade?.toLowerCase()],
      grade
    };
  });
  const at = reportedAt(doc);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
