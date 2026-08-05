import latest from './rows.js';

/**
 * The grooming report is assembled from two tabs of the same workbook:
 *
 *   - the RUNS MASTER (gid=1823982419): Lift | Run | Difficulty, a static
 *     40-run catalogue that only changes when the trail map does;
 *   - the DAILY GROOMING sheet (gid=35501842): one appended row per update,
 *     with three cells per lift - "<Lift> Freshly Groomed", "<Lift> Partially
 *     Groomed" and "<Lift> Closed".
 *
 * liftie fetches exactly one url per trail report, so the slow-changing
 * catalogue is inlined here and only the daily sheet is fetched at runtime.
 *
 * The "<Lift> Closed" cell does double duty, exactly as the resort's own page
 * script treats it: the literal word Closed (or yes/true/1) closes the whole
 * lift, anything else is read as a comma/semicolon/newline separated list of
 * closed run names.
 *
 * STATUS: grooming state is NOT a status. "Freshly Groomed" and "Partially
 * Groomed" are not tokens coerce() knows - they would silently become
 * 'scheduled' - and a blank cell means "open but ungroomed", which is what the
 * resort renders. So the mapping is decided here: closed -> 'closed',
 * everything else -> 'open'. LEVEL: the catalogue grades every run
 * Green/Blue/Black, all three of which normalizeLevel() already knows.
 */

// [lift, run, difficulty] in runs-master order
const runs = [
  ['Marmot', 'Midnite Sun', 'Green'],
  ['Marmot', "Tom's Train Park", 'Green'],
  ['Marmot', 'Fresh Aire', 'Green'],
  ['Marmot', 'Blue Grouse', 'Green'],
  ['Marmot', 'Wintun Way', 'Green'],
  ['Marmot', 'Easy Street', 'Green'],
  ['Marmot', 'Cedar Road', 'Green'],
  ['Marmot', 'Easy Money', 'Green'],
  ['Marmot', 'Lower Blue Grouse', 'Blue'],
  ['Marmot', 'Silvertip', 'Blue'],
  ['Marmot', 'Challenge', 'Blue'],
  ['Marmot', 'SnowShoe', 'Blue'],
  ['Marmot', 'Telemark', 'Blue'],
  ['Douglas', 'Highland Glide', 'Blue'],
  ['Douglas', 'North Saddle', 'Blue'],
  ['Douglas', 'Horizon', 'Blue'],
  ['Douglas', 'West Face', 'Black'],
  ['Douglas', 'Rocky Ridge', 'Black'],
  ['Douglas', 'Flying Squirrel', 'Black'],
  ['Douglas', 'Black Fox', 'Black'],
  ['Douglas', 'Lower Black Fox', 'Black'],
  ['Douglas', "Haley's Comet", 'Black'],
  ['Douglas', 'Red Tail', 'Black'],
  ['Douglas', 'Lower Red Tail', 'Black'],
  ['Coyote', 'Coyote Road', 'Green'],
  ['Coyote', 'Sugar Pine', 'Blue'],
  ['Coyote', 'East Boundary', 'Blue'],
  ['Coyote', 'White Fir', 'Blue'],
  ['Coyote', 'Upper Revolution', 'Blue'],
  ['Coyote', 'Eagles Flight', 'Blue'],
  ['Coyote', 'DiamondBack', 'Black'],
  ['Coyote', 'Black bear', 'Black'],
  ['Coyote', 'Z-Way', 'Black'],
  ['Gray Butte', 'Bee Line', 'Green'],
  ['Gray Butte', 'Get Back', 'Green'],
  ['Gray Butte', "Ray's Run", 'Blue'],
  ['Gray Butte', "Robin's Nest", 'Blue'],
  ['Gray Butte', 'Blackbird', 'Black'],
  ['Gray Butte', 'Lemurian', 'Black'],
  ['Gray Butte', "Richard's Way", 'Black']
];

// run names are hand-typed into the daily sheet, so match them the way the
// resort's own script does: drop quotes, treat any dash as a space, collapse
// whitespace, lowercase
const normName = s =>
  String(s ?? '')
    .replace(/["“”'’‘]/g, '')
    .replace(/[–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const runList = cell =>
  new Set(
    String(cell ?? '')
      .split(/[,;\n]+/)
      .map(normName)
      .filter(Boolean)
  );

export default function parse(rows) {
  const cell = latest(rows);
  if (!cell) {
    return [];
  }
  const closed = {};
  for (const lift of ['Marmot', 'Douglas', 'Coyote', 'Gray Butte']) {
    const value = cell(`${lift} Closed`);
    closed[lift] = {
      lift: /^(closed|yes|true|1)$/i.test(value),
      runs: runList(value)
    };
  }
  return runs.map(([lift, name, level]) => ({
    name,
    status: closed[lift].lift || closed[lift].runs.has(normName(name)) ? 'closed' : 'open',
    level
  }));
}
