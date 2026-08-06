import jp from '../../tools/jp-status.js';

// Amihari's own legend row spells the vocabulary out:
//   〇＝運行 Operating　△＝準備中 Standby　×＝運休 Suspended
// jp-status covers 〇/○/◯ and ×/✕/✖ (the site mixes U+3007 with U+25CB and
// U+00D7 with U+2715 inside a single table) plus the bare words 運行 / 運休 that
// the 2022-23 markup used instead of glyphs. Everything below is the part
// jp-status deliberately leaves to each resort:
//
//   △ / ▲   'hold'. The legend calls it Standby, but every observed use is a
//            same-day interruption of a lift that is otherwise running today,
//            e.g. '△　9:30～15：30（強風の為運行見合わせ中）' - suspended for
//            high wind. 'scheduled' would advertise it as about to open.
//   準備中   'scheduled' as a bare word: not yet open today, still being made
//            ready. (Amihari never uses it as an off-season marker - off-season
//            the whole board disappears from the page instead.)
//   整備中   'hold'. Mid-day maintenance on a lift that is open today.
//   要確認 / STANDBY  never appear here, so they are left unmapped on purpose
//            rather than guessed at.
//   a bare time range  says NOTHING about status at Amihari: the operating
//            hours sit in the same cell as the glyph and stay there while the
//            lift is closed ('× 8：30～16：00'). Never read hours as open.
export default function status(text = '') {
  const t = String(text).trim();
  // The cell is 'glyph U+3000 hours' followed by free-text notes, and those
  // notes routinely contain 運行 / 運休 themselves ('…として運行！',
  // '強風の為運行見合わせ中'), so a leading glyph wins outright over the words.
  const token = t.match(/^[○◯〇×✕✖△▲]/)?.[0] ?? t;
  return jp(token) ?? local(token);
}

function local(t) {
  if (/^[△▲]/.test(t) || /整備中/.test(t)) {
    return 'hold';
  }
  if (/準備中/.test(t)) {
    return 'scheduled';
  }
  // hand anything unrecognised back to coerce untouched
  return t;
}
