import jp from '../../tools/jp-status.js';

/*
 * Ninox's コース block prints its status as '：<glyph>' - a leading FULLWIDTH
 * COLON U+FF1A that belongs to the label, not the value, so it is stripped
 * before anything else looks at the text.
 *
 * The glyph pair is verified by codepoint across five captures:
 *
 *   ○ U+25CB WHITE CIRCLE   'open'   - jp-status knows this one
 *   ☓ U+2613 SALTIRE        'closed' - nobody knows this one. It is NOT the
 *       multiplication sign × U+00D7 and NOT ASCII 'x', so neither coerce.js's
 *       `x: 'closed'` entry nor jp-status's [×✕✖] class fires on it, and
 *       coerce's whitespace-strip/lowercase leaves it untouched: unmapped, all
 *       four courses would read 'scheduled' every day of the summer.
 *
 *   -   'closed'. A bare ASCII hyphen is this board's "not running"
 *       placeholder: on 2024-12-19 the two park rows carried it while the two
 *       pistes were ○ (the park was not built yet), and on 2025-03-24 every row
 *       carried it once the season had ended. coerce strips '-' to the empty
 *       string, so left alone it too would read 'scheduled' - i.e. about to
 *       open - which is exactly backwards.
 *
 *   △ / ▲  'hold'. Not yet observed at Ninox, but it is the standard third
 *       token on Japanese boards (limited / partial) and mapping it now costs
 *       nothing. 'hold' rather than 'open' because a partially skiable course
 *       is not a promise, and rather than 'scheduled' because the course is
 *       already in play today.
 *
 *   準備中  'scheduled' - being prepared, not yet open today.
 */
export default function status(text = '') {
  const t = String(text)
    .replace(/^[：:\s]+/, '')
    .trim();
  return jp(t) ?? local(t);
}

function local(t) {
  // the whole saltire/cross family, so a CMS glyph swap cannot silently
  // degrade a closed course into 'scheduled'
  if (/^[☓✗✘Ｘｘ]/.test(t)) {
    return 'closed';
  }
  if (/^[-ー－—–]+$/.test(t)) {
    return 'closed';
  }
  if (/^[△▲]/.test(t)) {
    return 'hold';
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
  // hand anything unrecognised back to coerce, which logs it
  return t;
}
