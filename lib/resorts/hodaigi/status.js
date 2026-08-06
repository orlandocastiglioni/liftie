import jp from '../../tools/jp-status.js';

// The lift widget prints a bare glyph; the gelände map next to it prints the
// word behind the glyph in its own legend (.m__gelandemap_courseSample):
//   運行中 = is-active,  準備中 = is-ready,  運休 = is-close
// jp-status already covers 〇/○/◯ -> open and ×/✕/✖ -> closed (Hodaigi emits
// U+3007 and U+00D7, but the widget is hand-edited so the sibling codepoints
// are worth tolerating).
//
// Per-resort decisions jp-status deliberately leaves open:
//
//   △ / ▲  -> 'scheduled', NOT 'hold'. Hodaigi means 準備中 by it: on the
//            2026-01-12 10:30 snapshot 第9 and スノーエスカレーター carry △ in
//            the dl list and class="is-ready" in the map SVG on the same page,
//            and the map legend spells is-ready as 準備中. So it is "being made
//            ready, not open yet", not a same-day wind hold.
//   準備中  -> 'scheduled', same reason. Hodaigi never uses it as an off-season
//            marker: off-season every row goes to × instead (2026-08-05).
//   整備中 / 要確認 / STANDBY / bare time ranges never appear in this widget -
//            the update stamp lives in its own .c__lift_update_pc div - so they
//            are left unmapped on purpose rather than guessed at.
export default function status(text = '') {
  const t = String(text).trim();
  if (/^[△▲]|準備中/.test(t)) {
    return 'scheduled';
  }
  return jp(t) ?? t;
}

// The gelände map encodes the same three states as CSS classes, on both the
// lift <g> elements and the course <path> elements.
export function classStatus(className = '') {
  if (/\bis-active\b/.test(className)) {
    return 'open';
  }
  if (/\bis-ready\b/.test(className)) {
    return 'scheduled';
  }
  if (/\bis-close\b/.test(className)) {
    return 'closed';
  }
}
