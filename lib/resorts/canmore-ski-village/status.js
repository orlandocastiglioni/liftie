import jp from '../../tools/jp-status.js';

/**
 * Only two tokens have ever appeared in the Conditions grid:
 *
 *   ◯滑走可  U+25EF LARGE CIRCLE + "skiable"        -> open
 *   ✕整備中  U+2715 MULTIPLICATION X + "in prep"     -> closed
 *
 * Both glyphs are already handled by jp-status.js; the words are repeated below
 * so a row still reads correctly if the site ever drops the glyph and leaves
 * the text alone.
 *
 * Judgement calls on vocabulary this site has not published yet:
 *
 *   整備中   -> closed, deliberately NOT 'hold'. Here it is the blanket
 *              not-open marker: all eight courses carry it right through the
 *              summer alongside '2025-2026 シーズンは終了しました。', so reading
 *              it as a hold (amihari's reading, where it means a temporary
 *              grooming stop) would show the whole hill on wind hold in August.
 *   △ / ▲    -> hold, "partially skiable" - the reading dynaland and hirugano
 *              use. This site has no separate pre-opening marker, so △ here
 *              would be a conditional open, not 準備中.
 *   準備中    -> scheduled, "getting ready" i.e. expected to open.
 *   要確認    -> hold, "check at the ticket window".
 *
 * Anything else returns undefined rather than a guess, so trails.js can fall
 * back to the second signal the markup carries - the span's inline colour.
 */
export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  if (/滑走可/.test(t)) {
    return 'open';
  }
  if (/整備中|滑走不可|クローズ/.test(t)) {
    return 'closed';
  }
  if (/^[△▲]/.test(t) || /要確認/.test(t)) {
    return 'hold';
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
}
