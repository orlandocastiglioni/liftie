/**
 * The feed dates itself: top-level `lastUpdate`, e.g. '2026-08-07T04:08:42'.
 * It is a naive local timestamp - no Z, no offset - and it is Tirol's wall
 * clock, not UTC, so resolve it against Europe/Vienna (CET in season, CEST for
 * the summer half the board also gets stamped in) rather than against whatever
 * zone the liftie host happens to run in.
 *
 * Worth publishing here: Intermaps never empties this board. All summer it
 * lists all six lifts and all ten pistes, the cable car and the Kombilift open
 * for sightseeing, which is indistinguishable from a quiet winter morning
 * unless the date travels with it.
 */
export default function reportedAt(stamp) {
  if (typeof stamp !== 'string') {
    return;
  }
  const m = stamp.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!m) {
    return;
  }
  const [, year, month, day, hour, minute, second = '00'] = m;
  // read the naive stamp as UTC, ask what Vienna's clock read at that instant,
  // and subtract the difference - same trick as
  // lib/resorts/kaunertaler-gletscher/reported-at.js
  const asUtc = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Vienna' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
