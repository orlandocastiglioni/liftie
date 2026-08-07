import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * The cdh-viewer widget freezes at closing day rather than emptying itself -
 * the live August page still lists all 15 lifts and all 38 pistes, every one
 * Chiuso, stamped 'Ultimo aggiornamento: 04-05-2026 08:00'. Without publishing
 * that stamp a report three months stale is indistinguishable from today's.
 *
 * Format is dd-mm-yyyy HH:MM in resort-local time (Europe/Rome, CET in winter
 * and CEST in summer) - ask Intl for the offset in force rather than picking
 * one. Each of the three blocks on the page (report / slopes / lifts) carries
 * its own .cdh-timestamp; they have been identical in every capture, but read
 * the one belonging to the block being parsed.
 */
const ZONE = 'Europe/Rome';
const re = /(\d{2})-(\d{2})-(\d{4})\s+(\d{1,2}):(\d{2})/;

function zoneOffset(instant) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find(part => part.type === 'timeZoneName')?.value;
  // 'GMT+01:00' -> '+01:00', plain 'GMT' -> '+00:00'
  return name?.slice(3) || '+00:00';
}

export default function reportedAt(dom, block) {
  const node = select(dom, `${block} .cdh-timestamp`)[0] ?? select(dom, '.cdh-timestamp')[0];
  const m = node && allText(node).match(re);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  const naive = `${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00`;
  const date = new Date(`${naive}${zoneOffset(new Date(`${naive}Z`))}`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
