import status from './status.js';

/**
 * Stöten's report is a custom WP REST route, /wp-json/wp/v3/slopesinfo, which
 * is not advertised anywhere in the page HTML (the namespace index at
 * /wp-json/wp/v3 lists it; there is no wp/v2 route for the `backar` post
 * type). It returns one small object with four arrays - Slopes, Lifts,
 * Adventures, Tracks - of {Id, Name, IsOpen}.
 *
 * *** DO NOT SCRAPE THE HTML PAGE FOR STATUS ***: /backar-vader/ is served to
 * anonymous clients out of LiteSpeed's guest-mode full-page cache, so every
 * `div.open_cell` is empty and the tab counters read 0/50, 0/23 even at peak
 * season - the mid-winter Wayback capture shows exactly the same empty cells.
 * This route is uncached (Cache-Control: no-store) and is the only status
 * source. It carries no timestamp of its own, so there is no reportedAt.
 *
 * Lifts[] has 27 entries for the 23 lifts on the piste map: the two
 * multi-section lifts are published as a parent plus its sections (N
 * Trippelliften with N1/N2, S Dubbelliften with S1/S2), each separately
 * statused, exactly as the resort's own table lists them. Names are unique, so
 * all 27 are kept.
 */
export default function lifts(body) {
  const ls = {};
  for (const lift of body?.Lifts ?? []) {
    const name = lift?.Name?.trim();
    if (name) {
      ls[name] = status(lift.IsOpen);
    }
  }
  return ls;
}
