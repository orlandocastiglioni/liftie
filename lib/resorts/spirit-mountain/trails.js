import isFresh from './fresh.js';
import statusOf from './status.js';

// wp/v2/trail returns the 23 alpine trails (x-wp-total: 23). Difficulty comes
// from the `trail-difficulty` taxonomy, exposed the same way as the status:
// easiest | more-difficult | most-difficult | terrain-parks, all four of which
// normalizeLevel already resolves (green / blue / black / terrainPark).
//
// Spirit also publishes 20 NORDIC trail statuses, but those live in two
// hand-maintained Elementor tables on /winter/nordic/ and are not in this CPT.
// A resort has a single trails source, so they are not merged in here.
const prefix = 'trail-difficulty-';

export default function parse(items) {
  const rows = [];
  if (!isFresh(items)) {
    return rows;
  }
  for (const item of items ?? []) {
    const name = item.title?.rendered?.trim();
    if (!name) {
      continue;
    }
    rows.push({
      name,
      status: statusOf(item),
      level: (item.class_list ?? []).find(c => c.startsWith(prefix))?.slice(prefix.length)
    });
  }
  return rows;
}
