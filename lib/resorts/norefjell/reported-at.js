/**
 * Fnugg freezes the board rather than emptying it: the roster keeps whatever
 * the resort last set. Nerskogen still shows 3/3 lifts "open" in August off a
 * report last touched 14 February, and Åslia 1/1 off one from 15 January.
 * Without a date, that is indistinguishable from a live morning report.
 *
 * Which stamp, though - the payload has two and only one of them means
 * anything:
 *
 * - _source.last_updated is Fnugg's own REINDEX stamp, not a report stamp. A
 *   sample of the platform shows every resort restamped within seconds of
 *   every other (12:14:19, 12:14:15, 12:14:12, ...) a few minutes before the
 *   fetch. Publishing it would date a board frozen since April as "minutes
 *   ago" - worse than publishing nothing.
 * - _source.conditions.current_report.<zone>.last_updated is the stamp on the
 *   report the resort's own staff filed (reporter: "Norefjell"). It tracks the
 *   frozen boards above exactly, and it reads 22 Apr 2026 here - ten days
 *   after the published closing date of 12 Apr, i.e. the final "shut
 *   everything" edit of the season.
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
