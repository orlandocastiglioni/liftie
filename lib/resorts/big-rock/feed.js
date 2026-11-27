import suppressed, { REASONS } from '../../tools/suppressed.js';

/**
 * Big Rock's trail-report page stopped carrying the report in its HTML in the
 * autumn 2026 rebuild: /trails/ now ships empty TablePress shells that the
 * resort's own "bigrock-mountain-ops" plugin fills in the browser
 * (assets/js/public-report.js) from one public, unauthenticated route:
 *
 *   GET /wp-json/bigrock-ops/v1/public-report
 *   { current, revision, integration_version, generated_at,
 *     state:  { mountain_status, base_depth, primary_surface, last_updated, ... },
 *     counts: { trails_open, trails_total, lifts_open, lifts_total },
 *     trails: [{ name, difficulty, status, night_lit, surface_override }],
 *     lifts:  [{ name, status, scheduled_open_time }] }
 *
 * The field names and vocabularies below are read off that script (v0.3.11),
 * which is the page's own renderer, not guessed:
 *   trail status   open | pending | race | closed
 *   difficulty     easier | more_difficult | most_difficult
 *   lift status    open | scheduled | delayed | wind_hold | closed
 * All of them already fold through coerce() and normalizeLevel(), except
 * 'pending', which coerce reads as 'scheduled' - what a pending trail is.
 *
 * NOT CURRENT. Out of season the route answers current:false with empty
 * arrays (2026-11-27), and the page script then renders nothing at all. That
 * is the resort saying there is no report today, so it publishes no rows,
 * marked 'offseason' (lib/tools/suppressed.js), keyed on state.last_updated
 * when the feed has one. Never on generated_at: that is stamped per request,
 * and a date that moves on every fetch would make the Pi publish a new
 * big-rock.json every run.
 */
export function current(body) {
  return body?.current === true;
}

// "2026-11-27 13:41:51" - a naive WordPress stamp in Maine's wall clock;
// read as EST (UTC-5), which is all the precision a marker needs
function stamp(value) {
  const m = String(value ?? '').match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})$/);
  return m ? `${m[1]}T${m[2]}-05:00` : undefined;
}

export function notCurrent(empty, body) {
  const at = stamp(body?.state?.last_updated);
  return suppressed(empty, REASONS.offseason, at && Date.parse(at));
}
