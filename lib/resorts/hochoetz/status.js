/**
 * The Skigebietsmanager publishes status as an icon FILENAME and nothing else:
 *
 *   .../icons/status_icon_set_6/169.png   open
 *   .../icons/status_icon_set_6/94.png    closed
 *
 * and the page's own Legend block renders exactly those two images labelled
 * 'open' and 'closed', so the vocabulary is two-valued and self-documenting.
 *
 * Neither number is in coerce.js, and a naive numeric pass would be actively
 * WRONG there: coerce reads '1' as open and '3' as closed, so a bare '169'
 * or '94' is not merely unknown, it is a near miss for tokens that mean
 * something else. Translate the filename to a word here.
 */
const icons = {
  169: 'open',
  94: 'closed'
};

export default function status(src = '') {
  // hand an unrecognised filename to coerce unchanged, so a third icon showing
  // up surfaces in the debug log rather than being silently forced to a value
  return icons[src.match(/\/(\d+)\.png/)?.[1]] ?? src;
}
