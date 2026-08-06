import lifts from '../lifts/index.js';

// wayback capture of /today/ from 2024-03-04: the only in-season fixture that
// mixes the two lift vocabularies - four lifts publishing their operating hours
// (Kamui's way of saying "running") and 第2/第3 saying 'stop service'. The
// スキー場 row (whole-area OPEN flag) must not appear as a lift.
lifts('kamui-ski-links', 'html', {
  カムイゴンドラ: 'open',
  第1リフト: 'open',
  第2リフト: 'closed',
  第3リフト: 'closed',
  第4リフト: 'open',
  第5リフト: 'open'
});
