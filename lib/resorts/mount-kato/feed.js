/**
 * The Mount Kato snow report page renders "Loading..." and then reads its
 * status out of a world-readable Firebase Realtime Database. /lifts.json and
 * /trails.json are the two nodes it subscribes to; both are a flat object
 * keyed by slug:
 *   { "lift-1": { "name": "Lift 1", "status": "Closed", "lastUpdated": ... } }
 * Key order (alphabetical) is the only order the feed gives us - the page's
 * own badge order is not published.
 *
 * Nothing on that page is worth scraping: the snowfall/base/"Lifts Available"
 * numbers next to the badges are hard-coded in the Jekyll HTML.
 */
export function rows(body) {
  return Object.entries(body ?? {})
    .map(([id, row]) => ({ id, ...row }))
    .filter(row => row.name);
}

// the site's trail-status.js branches on Open / Closed / Hold and also styles
// badge-groomed and badge-some-closures. coerce knows all of those except
// "Some Closures", which means open with partial coverage.
const aliases = {
  'some closures': 'open'
};

export function status(raw) {
  return aliases[raw?.trim().toLowerCase()] ?? raw;
}
