import isStale from '../../tools/stale.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import reportedAt from './reported-at.js';

/**
 * The 19 rows of `trails.items` (see index.js) - the same 19 the resort's
 * trail count gives, terrain parks and the tubing area included. The feed
 * publishes no difficulty, so no level is claimed; lib/trails/parse.js
 * coerces the status word.
 */
export default function trails(body) {
  const list = [];
  const at = reportedAt(body?.trails?.last_updated);
  // same never-cleared board as index.js: an old block publishes no rows
  const stale = at && isStale(new Date(at));
  for (const { name, status } of stale ? [] : (body?.trails?.items ?? [])) {
    const n = name?.trim();
    if (n) {
      list.push({ name: n, status });
    }
  }
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return stale ? suppressed(list, REASONS.stale, at) : list;
}
