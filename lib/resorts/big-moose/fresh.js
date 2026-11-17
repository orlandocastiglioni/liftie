import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

/**
 * Big Moose never resets its GoDaddy trail report at season end. Fetched on
 * 2026-11-17 it still served the closing report - Triple Chair OPEN and 6 runs
 * open - under the menu footnote "Last Updated : 03/28/26". The same footnote is
 * the report's own stamp in season (a 2026-02-01 capture reads
 * "Last Updated : 01/19/026" - note the three-digit year the editor types).
 *
 * Fails open like every lib/tools/stale.js caller: no footnote or an unreadable
 * date publishes as before.
 */
export default function isFresh(dom) {
  const notes = select(dom, '[data-aid=MENU_SECTION_FOOTNOTE_RENDERED]').map(n => findText(n) ?? '');
  const m = notes.join(' ').match(/Last Updated\s*:?\s*(\d{1,2})\/(\d{1,2})\/(\d{2,4})/i);
  if (!m) {
    return true;
  }
  const [, mm, dd, yy] = m;
  const n = Number(yy);
  const year = n < 100 ? 2000 + n : n;
  return !isStale(new Date(year, Number(mm) - 1, Number(dd)));
}
