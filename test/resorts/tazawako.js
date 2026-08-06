import lifts from '../lifts/index.js';

// 2026-01-05: five chairs at ○ (U+25CB) with the day's hours, and 黒森山リフト at
// ✕ (U+2715) with the note 準備中 - being made ready mid-season, so 'scheduled'
// rather than 'closed'. Neither glyph is in coerce.js, and they are different
// codepoints from the 〇 U+3007 / × U+00D7 that Hodaigi uses.
lifts('tazawako', 'html', {
  水沢リフト: 'open',
  ぎんれい第1リフト: 'open',
  ぎんれい第3リフト: 'open',
  黒森山リフト: 'scheduled',
  ぎんれいクワッドリフト: 'open',
  かもしかクワッドリフト: 'open'
});

// 2026-08-06, off-season. The status panel is display:none but still holds the
// season's final values (stamped 2026 4/1 12:00更新), so the rows never blank:
// ✕ with 今シーズンの営業終了. The 準備中 rule must not fire here.
lifts(
  'tazawako',
  'html',
  {
    水沢リフト: 'closed',
    ぎんれい第1リフト: 'closed',
    ぎんれい第3リフト: 'closed',
    黒森山リフト: 'closed',
    ぎんれいクワッドリフト: 'closed',
    かもしかクワッドリフト: 'closed'
  },
  { example: 'tazawako-offseason' }
);
