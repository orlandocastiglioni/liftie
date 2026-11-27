import suppressed, { REASONS } from '../../tools/suppressed.js';

/**
 * Off season the SnowReport feed empties both rosters - Lifts: [] and
 * Trails: [] since 2026-09-11 - and says why in Report.Status
 * ("Closed_for_Snow" on 2026-11-27; the snow-report page itself shows 0 of 0
 * and "getting ready for opening day"). That is the resort reporting no board,
 * not a parser failing to read one, so the empty board is marked 'offseason'
 * (lib/tools/suppressed.js) and keyed on Report.UpdatedOn.
 *
 * Only an EMPTY roster under a Closed* status is marked. A populated roster
 * always publishes, whatever the status says.
 */
export function offseason(data, list) {
  return !list?.length && /^closed/i.test(data?.Report?.Status ?? '');
}

export function mark(empty, data) {
  // "2026-09-11T14:28:37.1950883" - naive, New Hampshire wall clock; read as
  // EST, which is all the precision a marker needs
  const m = String(data?.Report?.UpdatedOn ?? '').match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/);
  return suppressed(empty, REASONS.offseason, m ? Date.parse(`${m[1]}-05:00`) : undefined);
}
