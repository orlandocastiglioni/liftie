import jp from '../../tools/jp-status.js';

/**
 * The board publishes one glyph per lift and nothing else:
 *
 *   ○  U+25CB WHITE CIRCLE        -> open
 *   ×  U+00D7 MULTIPLICATION SIGN -> closed
 *   -  U+002D HYPHEN-MINUS        -> closed, the off-season placeholder
 *
 * ○ and × are handled by jp-status.js. The dash is the one that has to be
 * mapped here: coerce() strips [\s_-]+ before its lookup, so '-' becomes '' and
 * falls through to 'scheduled' - every lift would look like it was about to
 * open, all summer. Same shape of bug as nayoro-piyashiri's STANDBY.
 *
 * Judgement calls on vocabulary this site has not published yet:
 *
 *   △ / ▲   -> hold, "partially running". The dash already covers off-season
 *              here, so △ could only mean a conditional open - dynaland's and
 *              hirugano's reading, not amihari's pre-opening one.
 *   準備中   -> scheduled, "getting ready" - the lift opens later today.
 *   整備中   -> closed, "under maintenance" - not turning.
 *   要確認   -> hold, "check at the ticket window".
 *   STANDBY -> closed, following nayoro-piyashiri.
 *
 * A bare time range is NOT read as open. Cupid Valley keeps its operating
 * hours in their own block (div.todayBlk01, ゲレンデ営業時間 8:30 / 16:00), so a
 * time range in this cell would be a note about the row, not its state -
 * unlike okunakayama, where the status cell IS the hours cell.
 */
export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  // every dash-ish placeholder the CMS might emit, full-width included
  if (/^[-‐‑–—―ー−]+$/.test(t)) {
    return 'closed';
  }
  if (/^[△▲]/.test(t) || /要確認/.test(t)) {
    return 'hold';
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
  if (/整備中|クローズ/.test(t) || /^STANDBY/i.test(t)) {
    return 'closed';
  }
  return t;
}
