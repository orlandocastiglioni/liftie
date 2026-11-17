import isStale from '../../tools/stale.js';

/**
 * martock.com is static HTML whose operational numbers are placeholders ("for
 * JavaScript did not run" - in October the page shows every trail open); the
 * site's operations.js rewrites them from /api/operations.php, the resolved
 * state of the hill's own admin (/madmin/operations.php). That JSON is the
 * source: lifts.items[] and trails.items[], each with name and status. The
 * script's statuses are open, closed, hold and partial; partial (part of a
 * run or lift open) is open. Tubing is a separate object and is not read.
 *
 * STALE GATE. `updated` is the last edit of the operations state
 * ('2026-10-01T13:38:30-03:00', with offset); it goes through stale.js, so a
 * state left untouched since the last season publishes nothing, and an
 * unreadable value fails open.
 */
const STATES = { open: 'open', partial: 'open', hold: 'hold', closed: 'closed' };

export function status(item) {
  const s = String(item?.status ?? '').toLowerCase();
  if (s in STATES) {
    return STATES[s];
  }
  return item?.open === true ? 'open' : 'scheduled';
}

export function reportedAt(data) {
  const when = data?.updated ? new Date(data.updated) : undefined;
  return when && !Number.isNaN(when.getTime()) ? when : undefined;
}

export function items(data, kind) {
  if (isStale(reportedAt(data))) {
    return [];
  }
  return (data?.[kind]?.items ?? []).filter(i => typeof i?.name === 'string' && i.name.trim());
}

export function dated(result, data) {
  const at = reportedAt(data);
  if (at) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}
