/**
 * The Directus-backed status field is free text, not an enum. At peak season
 * the operator types a bare 'Open' / 'Closed', but early and late season the
 * same field carries sentences - observed: 'Open on 12/13/25', 'Open 12/13/25',
 * 'Open 12/13/2025', 'Open to Little Bear Chair', 'Open with no features on
 * 12/13/25'. Handed straight to coerce those all miss the map and silently
 * become 'scheduled', i.e. an open lift would be published as scheduled.
 *
 * Match the leading word first; anything unrecognised is passed through
 * untouched so coerce still gets a shot at it (watch for future
 * hold/delayed/wind wording, none observed so far).
 */
export default function normalizeStatus(status) {
  if (typeof status !== 'string') {
    return status;
  }
  const s = status.trim();
  if (/^closed/i.test(s)) {
    return 'closed';
  }
  if (/^open/i.test(s)) {
    return 'open';
  }
  return s;
}
