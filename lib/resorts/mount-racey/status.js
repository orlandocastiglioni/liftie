import jp from '../../tools/jp-status.js';

/*
 * The 運行状況 column of Mount Racey's lift board carries a Japanese phrase,
 * never a glyph. jp-status covers the two easy ones - 運行中 (operating) and
 * 本日営業終了 / "today's operation has ended", which its /営業終了/ rule
 * catches - and everything below is the part it deliberately leaves per resort:
 *
 *   準備中  'closed' HERE, not 'scheduled', which is the opposite of what
 *           amihari does with the same word. Two captures prove the usage:
 *           2026-02-09 04:34 UTC (13:34 JST, mid-afternoon, so nothing was
 *           being "made ready") had ビギナーズ４リフト at 準備中 with the
 *           comment 安全上の不具合が出る可能性があるので、運休します。and
 *           シャトル６ゴンドラ at 準備中 with ゴンドラ整備の為今シーズンは運休
 *           します。- a suspension for the WHOLE 2025-26 season, still showing
 *           the same way on 2025-11-14. On this board 準備中 means the lift is
 *           not turning and the コメント column says why; 'scheduled' would
 *           advertise a lift that will not run again this winter as about to
 *           open.
 *   点検中 / 運転見合わせ  'hold' - inspection and a suspension of service are
 *           by definition temporary. Not yet observed here, but they are the
 *           standard wording and are cheaper to map than to let coerce read as
 *           'scheduled'.
 *   営業前 / オープン前  'scheduled', literally "before opening".
 *
 * Not mapped on purpose: 整備中 (amihari calls it 'hold', palcall 'closed', and
 * this board has never printed it in the status column - the gondola's
 * maintenance shutdown lives in the comment column instead), and the glyphs
 * 〇/△/× which this site does not use at all.
 */
export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  if (/準備中/.test(t)) {
    return 'closed';
  }
  if (/点検中|運転見合わせ/.test(t)) {
    return 'hold';
  }
  if (/営業前|オープン前/.test(t)) {
    return 'scheduled';
  }
  // hand anything unrecognised back to coerce, which logs it
  return t;
}
