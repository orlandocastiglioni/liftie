/**
 * Spirit Mountain rebuilt its conditions system in Feb 2026 on two WordPress
 * custom post types, `lift` and `trail`, both tagged from a shared
 * `current-status` taxonomy. The term slug is exposed on every REST item as a
 * `current-status-<slug>` entry in class_list, which is what we read - the
 * numeric term ids in item['current-status'] are install-local and would move
 * if the terms were ever recreated.
 *
 * The taxonomy has four terms. `open` and `closed-for-season` already coerce
 * correctly (the latter normalises to 'closedforseason'). The other two are
 * unknown to coerce.js and would silently land on 'scheduled', so they are
 * mapped here. Both are reported as closed, matching the site's own front end,
 * which only ever emits .trail-status-open / .trail-status-closed.
 */
const overrides = {
  'closed-for-race': 'closed',
  // 'hold' would arguably fit coerce's weatherhold semantics, but the term
  // says "closed" and the site renders it as closed, so don't over-promise
  'closed-for-weather': 'closed'
};

const prefix = 'current-status-';

export default function statusOf(item) {
  const slug = (item.class_list ?? []).find(c => c.startsWith(prefix))?.slice(prefix.length);
  // an item with no current-status term is not open; the site's stylesheet has
  // no third state, so treat a missing term as closed rather than letting
  // coerce fall through to 'scheduled'
  if (!slug) {
    return 'closed';
  }
  return overrides[slug] ?? slug;
}
