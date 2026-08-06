import jp from '../../tools/jp-status.js';

// Whitepia publishes the whole 運行可否 / 滑走可否 column as a single glyph, and
// only ever uses four of them:
//
//   ○ U+25CB  running / skiable            -> open     (jp-status)
//   × U+00D7  not running                  -> closed   (jp-status)
//   △ U+25B3  see below                    -> scheduled
//   — U+2014  no operation planned today   -> closed
//
// △ is the per-resort call. The only capture that carries one (2026-01-10,
// デルタペア) pairs it with お知らせ "準備出来次第、運行開始" - "operation starts
// once preparation is done" - and an operating window of "0:00 ~ 16:30", i.e.
// the lift has no start time yet but is expected to run. That is liftie's
// 'scheduled', not the wind-hold sense that hirugano/dynaland/amihari give △.
//
// The em dash is the off-season/not-today marker: every cell on the page is one
// out of season, alongside お知らせ "今シーズンの運行終了しました。". It is NOT
// covered by coerce.js (whose 'x' entry is the ASCII letter) nor by the closed
// class in takasu-snow-park/status.js (an ASCII hyphen), hence the dash class
// below - it spans the dash-like codepoints a Japanese CMS is liable to emit.
const DASH = /^[—－–‐ー-]/;

export default function status(text = '') {
  const t = String(text).trim();
  return jp(t) ?? local(t);
}

function local(t) {
  if (/^[△▲]/.test(t)) {
    return 'scheduled';
  }
  if (DASH.test(t)) {
    return 'closed';
  }
  return t;
}
