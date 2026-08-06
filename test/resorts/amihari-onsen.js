import lifts from '../lifts/index.js';

// 2026-02-07 board: 第３ペアリフト carried '△　9:30～15：30（強風の為運行見合わせ中）',
// a same-day wind suspension, and the note contains 運行 - if the note leaked
// into the status it would read as open.
lifts('amihari-onsen', 'html', {
  第１ペアリフトＡ: 'open',
  第１ペアリフトＢ: 'open',
  第２ペアリフト: 'open',
  第３ペアリフト: 'hold'
});

// 2024-02-28 board: the A line was suspended ('× 8：30～16：00') while its cell
// still advertised the day's operating hours, and the legend row 表示の見方 sits
// in the same table as the lifts.
lifts(
  'amihari-onsen',
  'html',
  {
    第１ペアリフトＡ: 'closed',
    第１ペアリフトＢ: 'open',
    第２ペアリフト: 'open',
    第３ペアリフト: 'open'
  },
  { example: 'amihari-onsen-2024' }
);
