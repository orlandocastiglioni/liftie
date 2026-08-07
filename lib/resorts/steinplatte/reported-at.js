/**
 * Every Micado FacilityApi payload carries meta.lastUpdate - the moment the
 * platform last synced the facility board ("2026-03-09T21:30:44"), on a half
 * hourly grid. The string has no offset and is the resort's own wall clock,
 * not UTC: the Wayback capture of the piste page taken at 20:37 UTC already
 * carried lastUpdate 21:30:44, which is in the future unless it is read in
 * Europe/Vienna (CET, UTC+1 that day). So resolve it against that zone rather
 * than against whatever zone the liftie host happens to run in - the Pi is not
 * in Tirol.
 *
 * Trick: parse the naive stamp as if it were UTC, ask what wall clock Vienna
 * shows at that instant, and subtract the difference. sv-SE formats as
 * "YYYY-MM-DD HH:mm:ss", which is ISO once the space becomes a T.
 */
export default function reportedAt(lastUpdate) {
  if (!lastUpdate) {
    return;
  }
  const asUtc = new Date(`${lastUpdate}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Vienna' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
