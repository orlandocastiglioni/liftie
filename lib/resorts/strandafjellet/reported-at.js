/**
 * Fnugg freezes the board at closing day rather than emptying it, so the date
 * is what tells a shut season from a bad morning. The payload carries two
 * stamps and only one of them is a report date:
 *
 * - _source.last_updated is Fnugg's REINDEX stamp. The live document on
 *   2026-08-06 reads 2026-08-06T12:10:35Z - minutes before the fetch - for a
 *   resort whose season ended in April and whose every lift reads "0".
 *   Publishing it would date a four-month-old board as "just now", which is
 *   worse than publishing nothing.
 * - _source.conditions.current_report.<zone>.last_updated is the stamp on the
 *   report the resort's own staff filed (reporter "MR" here). On the same
 *   document it reads 2026-04-21T08:29:40Z - the final "shut everything" edit
 *   of the season - and in the January 2021 capture it reads 07:45 the morning
 *   of the report. That is the one to publish.
 *
 * There is one report per weather zone (top / bottom, seconds apart); take the
 * most recent.
 */
export default function reportedAt(source) {
  const stamps = Object.values(source?.conditions?.current_report ?? {})
    .map(zone => Date.parse(zone?.last_updated ?? ''))
    .filter(t => !Number.isNaN(t));
  if (stamps.length > 0) {
    return new Date(Math.max(...stamps)).toISOString();
  }
}
