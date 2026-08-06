import lifts from '../lifts/index.js';

// Wayback capture from 10 Mar 2026 - mid-season, whole roster spinning.
lifts('granby-ranch', 'html', {
  'Stagecoach Carpet': 'open',
  'Quick Draw Express': 'open',
  Milestone: 'open',
  'Pony Carpet (Ski School Only)': 'open',
  'Kicking Horse': 'open',
  Conquest: 'open'
});

// Live capture from 5 Aug 2026. Granby keeps the full lift list up year round
// and runs Quick Draw Express for summer scenic/bike laps, so the summer page
// is the only one that exercises the 'trail-status-list__lift--closed'
// modifier - both winter captures show all six lifts open.
lifts(
  'granby-ranch',
  'html',
  {
    'Stagecoach Carpet': 'closed',
    'Quick Draw Express': 'open',
    Milestone: 'closed',
    'Pony Carpet (Ski School Only)': 'closed',
    'Kicking Horse': 'closed',
    Conquest: 'closed'
  },
  { example: 'granby-ranch-summer' }
);
