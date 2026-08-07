import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Both tables carry their own stamp in the bar above them - German page
 * "Aktualisiert am 15.01.2026 um 09:05", English twin "Modified at 15.01.2026
 * at 09:05" - and the resort restamps on change, not on a schedule.
 *
 * That matters here more than at most resorts: the Kaunertaler Gletscher is a
 * Ganzjahresbetrieb, so the board is never emptied. All summer it reads one
 * gondola open and 25 pistes closed off a stamp weeks old, which is exactly
 * what a frozen board would look like too. Publish the date and let the
 * consumer decide; in season the same field reads same-day.
 */
const re = /(\d{2})\.(\d{2})\.(\d{4})\D+(\d{1,2}):(\d{2})/;

export default function reportedAt(dom, id) {
  const bar = select(dom, `#${id} .tableTopBar span`)[0];
  const m = bar && allText(bar).match(re);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  // The stamp has no offset and is the resort's wall clock, not UTC. Resolve
  // it against Europe/Vienna rather than against whatever zone the liftie host
  // runs in - the Pi is not in Tirol, and the zone is CET in season but CEST
  // for the summer half the board also gets stamped in. Trick borrowed from
  // lib/resorts/steinplatte/reported-at.js: read the naive stamp as UTC, ask
  // what wall clock Vienna shows then, and subtract the difference.
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Vienna' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
