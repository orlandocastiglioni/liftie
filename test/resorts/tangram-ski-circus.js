import lifts from '../lifts/index.js';

// 2026-03-08, the last week of the season. Four chairs carry TODAY_CLOSED
// (運休/本日終了) and 第2ペア carries SUSPENDED with the note
// 'コースの状況が不安定の為、暫く運休いたします' - shut for days, not a wind hold.
// Neither token is in coerce.js, so all five would read 'scheduled' unmapped.
lifts('tangram-ski-circus', 'html', {
  第1ペア: 'closed',
  第2ペア: 'closed',
  第3クワッド: 'closed',
  '第5クワッド（野尻湖ﾃﾗｽ観光ﾘﾌﾄ）': 'closed',
  第6ペア: 'closed'
});

// 2025-02-09, midwinter: every chair OPERATING (運行中). coerce.js does not know
// OPERATING either - it is the single most common live value on this page and
// would otherwise publish a fully open resort as 'scheduled'.
lifts(
  'tangram-ski-circus',
  'html',
  {
    第1ペア: 'open',
    第2ペア: 'open',
    第3クワッド: 'open',
    '第5クワッド（野尻湖ﾃﾗｽ観光ﾘﾌﾄ）': 'open',
    第6ペア: 'open'
  },
  { example: 'tangram-ski-circus-2025' }
);
