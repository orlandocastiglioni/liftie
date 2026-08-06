import lifts from '../lifts/index.js';

// 2025-12-28 board: both quads turning, the pair down. キッズパーク (× in this
// snapshot, div.todayBlk04) is not a lift and is not collected.
lifts('cupid-valley', 'html', {
  第1クワッド: 'open',
  第2クワッド: 'open',
  第3ペア: 'closed'
});

// off-season the board publishes '-' for every lift. coerce() strips [\s_-]+
// before its lookup, so an unmapped '-' would become 'scheduled' and August
// would render as three lifts about to open.
lifts(
  'cupid-valley',
  'html',
  {
    第1クワッド: 'closed',
    第2クワッド: 'closed',
    第3ペア: 'closed'
  },
  { example: 'cupid-valley-offseason' }
);
