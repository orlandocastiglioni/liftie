import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * The page dates itself, per area: 'Last Update: 07 August 2026 14:32:38' in
 * <b class="last_update_2">. That matters here more than usual - the
 * Skigebietsmanager stamps across the twelve SKI plus CITY areas range from
 * February to August, i.e. several of them are frozen at their closing day
 * rather than emptied, and an all-closed board months old is otherwise
 * indistinguishable from today's.
 *
 * Month names are English because the resort URL pins lang=en.
 *
 * Intermaps prints resort-local wall clock with no offset, so resolve it
 * against Europe/Vienna and let Intl supply the offset that was in force (CET
 * in winter, CEST in summer) rather than hardcoding one of the two. The
 * instant used for the offset lookup is the stamp read as UTC, so within an
 * hour of a DST switch the neighbouring offset can be picked; immaterial for a
 * staleness date.
 */
const ZONE = 'Europe/Vienna';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function zoneOffset(instant) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find(part => part.type === 'timeZoneName')?.value;
  // 'GMT+02:00' -> '+02:00', plain 'GMT' -> '+00:00'
  return name?.slice(3) || '+00:00';
}

export default function reportedAt(dom) {
  const stamp = findText(select(dom, 'b.last_update_2')[0])?.trim();
  const m = stamp?.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/);
  if (!m) {
    return;
  }
  const month = months.indexOf(m[2].toLowerCase());
  if (month < 0) {
    return;
  }
  const wall = `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}T${m[4]}:${m[5]}:${m[6]}`;
  const date = new Date(`${wall}${zoneOffset(new Date(`${wall}Z`))}`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
