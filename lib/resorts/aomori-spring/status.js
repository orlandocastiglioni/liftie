import jp from '../../tools/jp-status.js';

/**
 * The English report publishes exactly two tokens, 'Open' and 'Closed', and
 * coerce.js already knows both - so in the normal case this is a pass-through.
 *
 * jp() runs first purely as a guard. The Japanese mirror at
 * /ja/ski/lift-course-status is the same Craft CMS template with the status
 * column swapped for ○ / × glyphs; if the English page ever inherits those,
 * coerce would read × as closed by luck but ○ as 'scheduled', i.e. a running
 * gondola would render as "opening soon".
 *
 * Nothing else is mapped on purpose. This site has never published 準備中 /
 * 整備中 / △ / 要確認 / STANDBY in the Status column, and it never puts hours
 * there either - the operating times ('９：００～１５：４５', or 営業終了 once
 * the season closes) live in their own Hours column, which neither parser
 * reads. Inventing readings for tokens the resort does not use would be
 * guessing, so anything unrecognised is handed to coerce untouched.
 */
export default function status(text = '') {
  return jp(text) ?? String(text).trim();
}
