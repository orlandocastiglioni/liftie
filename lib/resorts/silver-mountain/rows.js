import { allText } from '../../tools/domutil.js';

/**
 * Every row on the Trail Status page is "<name> - <span>Status</span>" inside
 * an h3 (lift) or an h4 (trail), so the label is the header's own text nodes.
 * The CMS emits tabs and newlines around the name and a few rows carry a
 * trailing space before the separator ('Happy Jack  - '), hence the collapse.
 */
export function label(node) {
  return allText(node).replace(/\s+/g, ' ').trim().replace(/-$/, '').trim();
}
