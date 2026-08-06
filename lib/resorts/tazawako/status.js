import jp from '../../tools/jp-status.js';

// Tazawako publishes two different vocabularies on the same panel.
//
// LIFTS (リフト運行情報) put a glyph in .box01_c_c and a note in .box01_c_r:
//   ○ U+25CB  running                     (note = the day's hours, 9:00～16:00)
//   ✕ U+2715  not running                 (note = 準備中 or 今シーズンの営業終了)
// jp-status covers both glyph classes and 営業終了. The per-resort decisions:
//
//   準備中 next to ✕  'scheduled'. Observed on 黒森山リフト, 2026-01-05, in the
//            middle of a running season while the other five chairs turned: the
//            lift is being made ready, not shut. Read as 'closed' it would hide a
//            chair that opens later the same week; read as 'scheduled' on its own
//            (without the ✕) it would be wrong in summer, which is why the glyph
//            decides first and 準備中 only softens a closed row.
//   a time range  says nothing on its own here - the hours sit in their own
//            column and stay filled in while the lift is shut. Only the glyph is
//            read for lifts.
//   整備中 / 要確認 / STANDBY / △ ▲  never appear on this page, so they are left
//            unmapped rather than guessed at.
//
// COURSES (ゲレンデ整備状況) have no glyph at all - the single column is a
// GROOMING report that doubles as availability, and every token in it is unknown
// to coerce.js:
//   本日圧雪 / 昨夜圧雪   groomed today / last night   -> open
//   非圧雪               ungroomed, but OPEN          -> open
//   オープン             open                         -> open
//   コースの一部規制      part of the run roped off    -> open (it is skiable;
//                        same call coerce makes for partially-open)
//   準備中 / ※準備中     being prepared               -> scheduled
//   クローズ             closed                       -> closed
//   今シーズンの営業終了  season over                  -> closed (jp: 営業終了)
// Reading 非圧雪 as "not groomed, therefore closed" would permanently shut three
// of the five black runs - 駒ケ岳第3コース, ぎんれいパラダイス and
// 水沢チャンピオンコース are ungroomed every day of the season by design.

// glyph decides open vs closed; a 準備中 note softens a closed lift to scheduled
export function lift(glyph = '', note = '') {
  const g = clean(glyph);
  const base = jp(g) ?? g;
  if (base === 'closed' && /準備中/.test(clean(note))) {
    return 'scheduled';
  }
  return base;
}

export function course(text = '') {
  const t = clean(text);
  const known = jp(t);
  if (known) {
    return known;
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
  if (/クローズ/.test(t)) {
    return 'closed';
  }
  // 本日圧雪 / 昨夜圧雪 / 非圧雪 all contain 圧雪 and all mean the run is open
  if (/圧雪|オープン|一部規制/.test(t)) {
    return 'open';
  }
  // hand anything unrecognised back to coerce untouched
  return t;
}

// the cells pad their content with U+3000 IDEOGRAPHIC SPACE ('○　')
function clean(text) {
  return String(text).replace(/[\s　]+/g, '');
}
