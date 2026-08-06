import jp from '../../tools/jp-status.js';

/**
 * The panel is リフト運行予定 - "today's lift schedule" - and the whole cell is
 * the status. Three forms have been observed and NONE of them survives
 * coerce.js: a time range normalises to '8:0015:30', 運休 is not in its map and
 * '-' collapses to the empty string, so every lift would read 'scheduled'
 * year-round without this translation.
 *
 * jp-status covers 運休 (and 営業終了 / 運行終了, should they ever appear).
 * What it deliberately leaves to each resort, decided here:
 *
 *   a bare time range  'open' at Maiko. The cell holds the operating window OR
 *                      a closure word, never both, so a window IS the "running
 *                      today" signal - the site drops the lift's overlay from
 *                      liftmap.html at exactly the same time. (Contrast
 *                      amihari, where hours sit beside a × glyph and say
 *                      nothing about status; hence jp-status stays out of it.)
 *   '-' / empty        'closed'. This is the off-season and pre-opening
 *                      placeholder: the panel is baked into every /winter/ page
 *                      all year, and out of season all ten cells read '-'.
 *
 *   △ / ▲, 準備中, 整備中, 要確認, STANDBY  never appear on this page, so they
 *                      are left unmapped on purpose rather than guessed at.
 */
export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  // 8:30-15:00 / 11:30-16:00; the separator has been ASCII '-' in every
  // snapshot, the dash and tilde variants are defensive
  if (/^\d{1,2}:\d{2}\s*[-–—~〜～]\s*\d{1,2}:\d{2}/.test(t)) {
    return 'open';
  }
  // 休止 suspended, 終了 finished, 中止 cancelled - 運休 and 営業終了 are
  // already handled by jp-status
  if (/休止|終了|中止/.test(t)) {
    return 'closed';
  }
  if (!t || /^[-–—ー－]+$/.test(t)) {
    return 'closed';
  }
  // hand anything new back to coerce, which logs it
  return t;
}
