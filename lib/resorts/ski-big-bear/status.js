/**
 * The Directus-backed status field is free text, not an enum. At peak season
 * the operator types a bare 'Open' / 'Closed', but early and late season the
 * same field carries sentences - observed: 'Open on 12/13/25', 'Open 12/13/25',
 * 'Open 12/13/2025', 'Open to Little Bear Chair', 'Open with no features on
 * 12/13/25'. Handed straight to coerce those all miss the map and silently
 * become 'scheduled'.
 *
 * Match the leading word first. A dated 'Open ... <m/d/yy>' is an announced
 * opening day: the 2025-12-11 payload carried it two days early, under the
 * banner "We will be open Saturday, December 13", so it only reads open from
 * that date (resort-local) on and is 'scheduled' before it. Anything
 * unrecognised is passed through untouched so coerce still gets a shot at it
 * (watch for future hold/delayed/wind wording, none observed so far).
 */
const DATE = /\b(\d{1,2})\/(\d{1,2})\/(\d{4}|\d{2})\b/;

// YYYY-MM-DD in Lackawaxen, PA
function today() {
  return new Date().toLocaleString('sv-SE', { timeZone: 'America/New_York' }).slice(0, 10);
}

function announcedDay(s) {
  const m = s.match(DATE);
  if (!m) {
    return;
  }
  const [, month, day, year] = m;
  const yyyy = year.length === 2 ? `20${year}` : year;
  return `${yyyy}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export default function normalizeStatus(status) {
  if (typeof status !== 'string') {
    return status;
  }
  const s = status.trim();
  if (/^closed/i.test(s)) {
    return 'closed';
  }
  if (/^open/i.test(s)) {
    const day = announcedDay(s);
    return day && day > today() ? 'scheduled' : 'open';
  }
  return s;
}
