import isStale from '../../tools/stale.js';

/**
 * engstligenalp.ch's Betriebsinfo page is built in the browser from the
 * operator's own copy of its infosnow export, /wp-content/infosnow/winter.json
 * (infosnow resort 113): Resort.ElementGroup[] groups named ANLAGE (lifts),
 * SKIPISTE (runs), PARK, LOIPE, WANDERWEG, RESTAURANT and so on, each element
 * with Initial (map label), Name, TypID and StatusID.
 *
 * STATUS. The page's own statusCss() is the legend: 1 and 8 render "valid"
 * (open), 2 and 9 "chanchevalid" (in preparation), 0 and 4 "notvalid" (no
 * report filed), every other id "invalid" (closed). 15 and 16 are the closed
 * ids seen on runs and lifts. No report filed is liftie's 'scheduled', never an
 * invented 'closed'.
 *
 * DATE. Resort.Date ('24.02.2026 20:00', Zurich wall clock) is the export's
 * timestamp; it goes through lib/tools/stale.js so a feed that stops updating
 * cannot keep a February board alive, and fails open when it is unreadable.
 */
const OPEN = new Set(['1', '8']);
const SCHEDULED = new Set(['0', '2', '4', '9']);

export function status(element) {
  const id = String(element?.StatusID ?? '');
  if (OPEN.has(id)) {
    return 'open';
  }
  if (SCHEDULED.has(id) || !id) {
    return 'scheduled';
  }
  return 'closed';
}

export function reportedAt(data) {
  const m = String(data?.Resort?.Date ?? '').match(/(\d{2})\.(\d{2})\.(\d{4})\s+(\d{1,2}):(\d{2})/);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Zurich' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime());
}

export function elements(data, group) {
  if (isStale(reportedAt(data))) {
    return [];
  }
  const g = (data?.Resort?.ElementGroup ?? []).find(g => g?.['@attributes']?.name === group);
  const list = g?.Element ?? [];
  return Array.isArray(list) ? list : [list];
}

export function label(element) {
  return [element.Initial, element.Name]
    .map(s => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean)
    .join(' ');
}

export function dated(result, data) {
  const at = reportedAt(data);
  if (at) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}
