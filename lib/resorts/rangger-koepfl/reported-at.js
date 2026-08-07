import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * The Skigebietsmanager prints its own stamp in the masthead - "Last Update:
 * 04 August 2026 19:02:47" in b.last_update_2 - and it is per area, not per
 * template: across the twelve SKI plus CITY regions the stamps range from
 * February to August of the same year, so some boards are restamped daily and
 * others were frozen at closing day.
 *
 * That is exactly the case reportedAt exists for. Rangger Koepfl's board is
 * never emptied: in August it still lists all five lifts and all nine slopes,
 * two lifts open for summer sightseeing, which is indistinguishable from a live
 * mid-winter morning unless the date is published alongside.
 */
const months = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};

const re = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})/;

export default function reportedAt(dom) {
  const m = allText(select(dom, 'b.last_update_2')[0] ?? {}).match(re);
  if (!m) {
    return;
  }
  const [, day, monthName, year, hour, minute, second] = m;
  const month = months[monthName.toLowerCase()];
  if (!month) {
    return;
  }
  const pad = n => String(n).padStart(2, '0');
  // The stamp carries no offset and is Tirol's wall clock, not UTC, and the
  // liftie host is not in Tirol. Resolve against Europe/Vienna, which is CET in
  // season and CEST for the summer half the board also gets stamped in: read
  // the naive stamp as UTC, ask what Vienna's clock read at that instant, and
  // subtract the difference. Same trick as lib/resorts/kaunertaler-gletscher.
  const asUtc = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${minute}:${second}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Vienna' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
