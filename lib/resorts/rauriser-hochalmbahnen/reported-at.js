/**
 * The feed dates itself: .lastUpdate = '2026-08-06T08:13:40'. There is no zone
 * in the stamp - intermaps writes resort-local time - so read it as
 * Europe/Vienna and let Intl supply the offset that was in force (CET in
 * winter, CEST in summer) rather than hardcoding one of the two.
 *
 * The instant used for the offset lookup is the stamp read as UTC, so within
 * an hour of a DST switch the offset can be the neighbouring one; that is
 * immaterial for a staleness date.
 */
const ZONE = 'Europe/Vienna';

function zoneOffset(instant) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find(part => part.type === 'timeZoneName')?.value;
  // 'GMT+02:00' -> '+02:00', plain 'GMT' -> '+00:00'
  return name?.slice(3) || '+00:00';
}

export default function reportedAt(data) {
  const stamp = data?.lastUpdate;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(stamp ?? '')) {
    return;
  }
  const date = new Date(`${stamp}${zoneOffset(new Date(`${stamp}Z`))}`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
