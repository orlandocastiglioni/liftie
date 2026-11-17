import resort from './resort.json' with { type: 'json' };

/**
 * Spring Mountain's status table is hand-edited and never cleared: on
 * 2026-11-17, a month before opening, it still showed last season's last
 * report (Alpine, Fawn and the terrain park OPEN, three lifts OPEN), and the
 * August 2026 capture of the old /trail-map/ page showed the same. The page
 * carries no date (its WordPress `modified` time moves with unrelated edits:
 * 2026-10-26 on that stale board), so nothing on it can tell a stale board
 * from an open day.
 *
 * So rows publish only inside a season window: from resort.json's `opening`
 * (the field lib/opening.js publishes as "opens on"; local midnight) until the
 * May 1 after it. Outside it, no rows - never "closed", we do not know that.
 *
 * REVISIT every autumn: set `opening` to that season's opening day (2025-26
 * opened Sat 2025-12-13; 2026-12-12 is the matching Saturday). Until it is
 * moved, the gate stays shut from May 1, so a forgotten date blanks the
 * resort rather than publishing last spring's board.
 */
export function inSeason(now = Date.now()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(resort.opening ?? '');
  if (!m) {
    return true;
  }
  const opening = new Date(m[1], m[2] - 1, m[3]);
  const closing = new Date(opening.getMonth() >= 4 ? Number(m[1]) + 1 : Number(m[1]), 4, 1);
  return now >= opening.getTime() && now < closing.getTime();
}
