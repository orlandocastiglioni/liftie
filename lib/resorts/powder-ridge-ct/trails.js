import reportedAt from './reported-at.js';

/**
 * The 19 rows of `trails.items` (see index.js) - the same 19 the resort's
 * trail count gives, terrain parks and the tubing area included. The feed
 * publishes no difficulty, so no level is claimed; lib/trails/parse.js
 * coerces the status word.
 */
export default function trails(body) {
  const list = [];
  for (const { name, status } of body?.trails?.items ?? []) {
    const n = name?.trim();
    if (n) {
      list.push({ name: n, status });
    }
  }
  const at = reportedAt(body?.trails?.last_updated);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
