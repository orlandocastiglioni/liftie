import Debug from 'debug';

const debug = Debug('liftie:dodge-ridge');

/**
 * Dodge Ridge's WordPress endpoint is a thin mirror of Alterra's TE2 platform:
 * it echoes the upstream `statusLabel` verbatim (lowercase, underscored) and
 * paints the row with `statusColor` (#36B44C open / #A02040 closed).
 *
 * coerce.js only resolves a handful of those labels (open, closed,
 * closed_for_season, hold, wind_hold, weather_hold, scheduled, delayed,
 * expected); everything else - open_top, patrol_closure, off_season,
 * work_in_progress, 30_minutes_or_less, ... - would silently become
 * 'scheduled', which is badly wrong for the closed bucket. So resolve the
 * label here with TE2's own algorithm and hand coerce a plain
 * open/closed/hold/scheduled token.
 *
 * The three lists below are TE2's, verbatim. The only deviation from the
 * widget is SCHEDULED: TE2 has no 'scheduled' bucket and lumps the
 * about-to-open labels in with HOLD, while liftie models them separately.
 */
const SCHEDULED = new Set(['30_MINUTES_OR_LESS', 'DELAYED', 'EXPECTED', 'PROGRESSIVE_OPENING', 'SCHEDULED']);

const HOLD = new Set([
  '30_MINUTES_OR_LESS',
  'DELAYED',
  'DOWNLOAD_ONLY',
  'EXPECTED',
  'HOLD',
  'LIGHTNING_HOLD',
  'MECHANICAL_HOLD',
  'MID_STATION_ONLY',
  'PROGRESSIVE_OPENING',
  'SCHEDULED',
  'SOLD_OUT',
  'WEATHER_HOLD',
  'WIND_HOLD'
]);

const CLOSED = new Set([
  'ANTICIPATED_WEATHER_IMPACT',
  'CLOSED',
  'CLOSED_FOR_BUILD',
  'CLOSED_FOR_EVENT',
  'CLOSED_FOR_INSPECTION',
  'CLOSED_FOR_PRIVATE_FUNCTION',
  'CLOSED_FOR_SEASON',
  'CLOSED_RACE_IN_PROGRESS',
  'LIGHTNING_CLOSURE',
  'MECHANICAL_CLOSURE',
  'OFF_SEASON',
  'PATROL_CLOSURE',
  'PATROL_HOLD',
  'PENDING_MITIGATION',
  'POWER_OUTAGE',
  'WIND_CLOSURE',
  'WORK_IN_PROGRESS'
]);

const OPEN = new Set([
  'ALL_WAIT_TIMES',
  'COMPETITION',
  'EVENT',
  'GROOMERS_CHOICE',
  'LOWER_OPEN',
  'OPEN',
  'OPEN_BOTTOM',
  'OPEN_BUT_CLOSED_TO_FOOT_TRAFFIC',
  'OPEN_DOWNHILL_MOUNTAIN_BIKE_ONLY',
  'OPEN_FIRST_TRACKS',
  'OPEN_FOR_CLIMBING_ONLY',
  'OPEN_FOR_CROSS_COUNTRY',
  'OPEN_FOR_DOWNHILL',
  'OPEN_FOR_DOWNHILL_ONLY',
  'OPEN_FOR_HIKING',
  'OPEN_FOR_MOUNTAIN_BIKE',
  'OPEN_FOR_MULTI_USE',
  'OPEN_FOR_RACING',
  'OPEN_FOR_TWO_WAY_TRAFFIC',
  'OPEN_PASS_REQUIRED',
  'OPEN_PRO_PASS_REQUIRED',
  'OPEN_SKI_RIDE_SCHOOL_ONLY',
  'OPEN_SKI_SCHOOL_ONLY',
  'OPEN_TOP',
  'OPEN_TO_FOOT_TRAFFIC_ONLY',
  'OPEN_TO_MID_STATION_ONLY',
  'OPEN_UPHILL_ONLY',
  'SCENIC_RIDE_ONLY',
  'TRAINING',
  'UPPER_OPEN',
  'WINDY_CONDITIONS'
]);

const OPEN_COLOR = '#36b44c';

/**
 * label - the TE2 statusLabel as rendered in p.lift-status / p.trail-status
 * color - the row's inline "color:#RRGGBB" style, used only as a last resort
 */
export default function te2status(label, color) {
  const token = String(label ?? '')
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_');
  if (token) {
    if (SCHEDULED.has(token)) {
      return 'scheduled';
    }
    // substring rules first - that is the order the TE2 widget uses, so
    // OPEN_BUT_CLOSED_TO_FOOT_TRAFFIC reads open and PATROL_HOLD reads hold
    if ((token.includes('CLOSED') || token.includes('CLOSURE')) && !token.startsWith('OPEN')) {
      return 'closed';
    }
    if (token.includes('HOLD')) {
      return 'hold';
    }
    if (token.includes('OPEN')) {
      return 'open';
    }
    if (CLOSED.has(token)) {
      return 'closed';
    }
    if (HOLD.has(token)) {
      return 'hold';
    }
    if (OPEN.has(token)) {
      return 'open';
    }
  }
  debug('unknown TE2 status label %j, falling back to statusColor %j', label, color);
  return color?.toLowerCase().includes(OPEN_COLOR) ? 'open' : 'closed';
}
