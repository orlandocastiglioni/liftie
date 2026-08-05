import coerce from '../../tools/coerce.js';
import isFresh from './fresh.js';
import statusOf from './status.js';

// wp/v2/lift returns the five lifts as a flat array (x-wp-total: 5, never
// paginated in practice - per_page=100 keeps it that way). The rendered
// /current-conditions/ page lists exactly the same five.
export default function parse(items) {
  const lifts = {};
  if (!isFresh(items)) {
    return lifts;
  }
  for (const item of items ?? []) {
    const name = item.title?.rendered?.trim();
    if (name) {
      lifts[name] = coerce(statusOf(item));
    }
  }
  return lifts;
}
