import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Shared row reader for the "lift-trail-status" WordPress plugin that renders
 * Tamarack's snow report. Both halves of the report (div.mWPSLiftsWrap and
 * div.mWPSTrailsWrap) are built from the same div.mWPSItem rows, so index.js
 * and trails.js only differ in which wrapper they scope to.
 */

// the row's name lives in the h6; the sibling span.operating-hours must not be
// picked up, and the source is heavily tab padded
export function rowName(node) {
  const h6 = select(node, '.mWPSItemName h6')[0];
  return h6 && allText(h6).replace(/\s+/g, ' ').trim();
}

// status is carried as a class on the trailing icon div: icon-status-open |
// icon-status-closed | icon-status-hold (the page legend calls them Open /
// Closed / On-Hold). All three are known to coerce. Select the icon rather
// than scanning the row - the grooming div can hold a multi-KB inline SVG.
export function rowStatus(node) {
  const icon = select(node, '[class*="icon-status-"]')[0];
  return icon?.attribs.class.match(/icon-status-([a-z]+)/)?.[1];
}

export function rating(node) {
  const icon = select(node, '.statusRatingIcon')[0];
  return icon?.attribs.class.match(/icon-rating-([a-zA-Z]+)/)?.[1];
}
