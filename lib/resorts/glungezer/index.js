import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';

/**
 * Glungezer is one of the twelve SKI plus CITY areas and one of the three the
 * network site never wired up: /skiing-resorts/glungezer/ carries no
 * #pisten_anlagen block at all, in summer and in the March 2026 wayback
 * snapshot alike, and the area is missing from the network's live-info summary
 * table. It does, however, have its own Intermaps panorama feed, which is the
 * richest source of the three options (the shared innsbruck feed tags no row
 * with its area, and Skigebietsmanager region_id=853 publishes no grades):
 *
 *   https://winter.intermaps.com/glungezer/data?lang=en
 *   { lifts[6], slopes[10], routes[2], pois, lookup, lastUpdate }
 *
 * Each row is { status, popup: { title, ... }, subtitle, type }.
 *
 * STATUS is a plain lowercase word. 'open' and 'closed' are all this area emits
 * and coerce knows both, so they are passed straight through - but the map
 * bundle's own translation table shows the field can also take
 * partially_open, open_groomed, open_ungroomed, open_waitingtimes,
 * in_preparation, closed_atmos, closed_outoforder, closed_avalanche and
 * unknown, of which only partially_open survives coerce. Fold the ones whose
 * meaning is unambiguous onto the right liftie word here rather than let a
 * winter feed quietly publish a closed lift as 'scheduled'. Anything genuinely
 * unknown is left for coerce to log and default.
 */
const statuses = {
  open_groomed: 'open',
  open_ungroomed: 'open',
  open_waitingtimes: 'open',
  closed_atmos: 'closed',
  closed_outoforder: 'closed',
  closed_avalanche: 'closed',
  in_preparation: 'scheduled'
};

export function status(row) {
  const raw = row?.status;
  return coerce(statuses[raw] ?? raw);
}

export function title(row) {
  return row?.popup?.title?.trim();
}

/**
 * 6 lifts: the Glungezer cable car and Kombilift, the Schartenkogel chair, two
 * T-bars and the Ubungslift carpet. (Skigebietsmanager region_id=853 lists
 * seven for the same mountain because it repeats the Halsmarterlift as a
 * separate mid-station boarding entry; the network's own snow report says
 * "of 6", so this feed's roster is the right one.)
 */
export default function lifts(body) {
  const ls = {};
  for (const row of body?.lifts ?? []) {
    const name = title(row);
    if (name) {
      ls[name] = status(row);
    }
  }
  const at = reportedAt(body?.lastUpdate);
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
