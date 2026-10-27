import { status, title } from '../glungezer/index.js';
import reportedAt from '../glungezer/reported-at.js';

/**
 * SKI plus CITY retired the #pisten_anlagen widget this parser used to read:
 * since 2026-09-22 every area page on ski-plus-city.com embeds an Intermaps
 * panorama instead, and the lift and slope tables are gone. The glacier was
 * open with a dozen lifts turning while the feed published nothing.
 *
 * The glacier has its own Intermaps panorama feed - the one the network page
 * now embeds - and it is the richest source available:
 *
 *   https://winter.intermaps.com/stubaier_gletscher/data?lang=en
 *   { lifts[25], slopes[36], routes[4], pois, lookup, lastUpdate }
 *
 * Same row shape as lib/resorts/glungezer (status word + popup.title), so the
 * status vocabulary, the name and the Europe/Vienna reading of `lastUpdate`
 * come from there rather than a third copy.
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
