import jp from '../../tools/jp-status.js';

// The 運行状況 / 営業状況 column holds exactly one glyph:
//   ○ U+25CB  running / open      (every winter capture)
//   － U+FF0D  not running         (pre-season, and single closed rows in season,
//                                  e.g. ツリーランエリア「DROP」 on 2025-03-20 with
//                                  the note 'コンディション不良の為、クローズ')
//
// jp-status already knows ○ (and ×✕✖ / 運休 / 営業終了 / 運行中 / 営業中, none of
// which have shown up here but cost nothing to accept). What it deliberately
// leaves to each resort:
//
//   － and the other dash codepoints  'closed'. coerce.js only knows the ASCII
//            hyphen, so U+FF0D would fall through to 'scheduled' and every lift
//            would advertise itself as about to open for the seven months this
//            page sits at '－'. The class covers the full-width hyphen the site
//            actually emits plus the neighbouring dashes a CMS edit could
//            substitute (U+30FC ー, U+2010, U+2013, U+2014, U+2015, ASCII -).
//   △ / ▲   'hold'. Never observed here in either the live page or any winter
//            snapshot, but it is the standard partial marker on Japanese status
//            boards, and a mid-day hold is the only thing it could mean in a
//            column whose other two values are "running" and "not running".
//   準備中 / 整備中 / 要確認 / STANDBY  never appear on this page - left unmapped
//            on purpose so an unexpected token is loud rather than guessed at.
//   a time range  says nothing about status here: the operating hours live in
//            their own 運行予定時間 column and stay filled in while the lift is
//            shut ('－ | 09:00～16:00' all summer).
export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  if (/^[△▲]/.test(t)) {
    return 'hold';
  }
  if (/^[－ー―‐–—-]/.test(t)) {
    return 'closed';
  }
  // hand anything unrecognised back to coerce untouched
  return t;
}
