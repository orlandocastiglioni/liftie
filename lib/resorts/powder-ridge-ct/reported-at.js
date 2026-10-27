/**
 * Each block of the feed dates itself: `last_updated`, e.g.
 * '2026-09-18 14:07:15'. It is a naive WordPress timestamp - no zone - in the
 * site's own wall clock, so resolve it against America/New_York (EST/EDT as
 * appropriate) rather than the liftie host's zone. Same trick as
 * lib/resorts/glungezer/reported-at.js.
 *
 * Worth publishing: in September 2026 the board still showed the Festival
 * double "open" (summer bike park) with a stamp weeks old, which is otherwise
 * indistinguishable from a live winter report.
 */
export default function reportedAt(stamp) {
  if (typeof stamp !== 'string') {
    return;
  }
  const m = stamp.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!m) {
    return;
  }
  const [, year, month, day, hour, minute, second = '00'] = m;
  const asUtc = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'America/New_York' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
