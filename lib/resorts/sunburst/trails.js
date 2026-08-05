import ullrStatus from './status.js';

/**
 * Trails come from the same Ullr widget key, on /widget/SNOW/trails. Their
 * shape is much flatter than the lifts': name / status / difficulty sit at the
 * top level. `groomed` ('GROOMED') is a grooming flag, not a status - feeding
 * it to coerce would turn every ungroomed-but-open run into 'open'.
 *
 * difficulty tokens (GREEN_CIRCLE, BLUE_SQUARE, BLACK_DIAMOND,
 * DOUBLE_BLACK_DIAMOND, FREESTYLE_TERRAIN) all normalise cleanly in
 * lib/trails/parse.js, so they are passed through untouched.
 *
 * The two tubing areas are kept: the operator reports them as terrain and the
 * matching tubing conveyors are listed as lifts.
 */
export default function parse(body) {
  const rows = [];
  for (const trail of body ?? []) {
    // archived rows are retired terrain the widget itself hides
    if (String(trail.status ?? '').toUpperCase() === 'ARCHIVED') {
      continue;
    }
    const name = trail.name?.trim();
    if (!name) {
      continue;
    }
    rows.push({
      name,
      status: ullrStatus(trail.status),
      level: trail.difficulty
    });
  }
  return rows;
}
