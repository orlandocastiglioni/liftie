import jp from '../../tools/jp-status.js';

/*
 * Muica heads its lift board リフト運行予定 - an operation SCHEDULE - so the
 * status cell of a running lift holds that lift's hours instead of a word or a
 * glyph. Nothing in that vocabulary is known to coerce.js.
 *
 * Observed across the 2023, 2024, 2025 and 2026 winter snapshots plus the live
 * summer page:
 *
 *   08:30〜16:00  'open'. Same idiom as okunakayama. Unlike amihari, hours here
 *                 are NEVER printed next to a closed marker - the cell holds
 *                 either the hours or a word - so hours do mean open. The
 *                 separator is 〜 WAVE DASH U+301C; the fullwidth tilde U+FF5E
 *                 also turns up in this CMS family, hence both in the class.
 *   随時運行      'open' (runs on demand - the 第1ペア beginner lift). Handled
 *                 by jp-status already, via its /運行$/ rule.
 *   営業終了      'closed'. The off-season value on all five rows; jp-status
 *                 catches it.
 *
 * Left to this resort, none of them observed here yet but all standard wording:
 *
 *   一時運休 / 運転見合わせ / 点検中  'hold'. These have to be decided BEFORE
 *                 jp-status: 一時運休 contains 運休, which jp-status reads as a
 *                 flat 'closed', losing the "temporarily" that is the whole
 *                 point of the word.
 *   準備中        'scheduled' - not yet open today. Unlike mount-racey, this
 *                 site has its own off-season marker (営業終了), so 準備中 here
 *                 would not be a season-long shutdown in disguise.
 *
 * NOTE what this cannot tell you: the four winter snapshots publish byte
 * identical hours even on a rain day, so a wind hold never reaches this cell -
 * it appears as free prose in .todayBlk05 本日のお知らせ instead.
 */
export default function status(text = '') {
  const t = String(text).trim();
  if (/一時運休|運転見合わせ|点検中/.test(t)) {
    return 'hold';
  }
  return jp(t) ?? local(t);
}

function local(t) {
  if (/\d{1,2}[:：]\d{2}\s*[〜～~-]/.test(t)) {
    return 'open';
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
  // hand anything unrecognised back to coerce, which logs it
  return t;
}
