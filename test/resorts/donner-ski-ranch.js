import lifts from '../lifts/index.js';

lifts('donner-ski-ranch', 'html', {
  'Chair 1': 'open',
  'Chair 2': 'open',
  'Chair 3': 'open',
  'Chair 4': 'open',
  'Chair 5': 'closed',
  'Chair 6': 'open',
  'Ski Moving Carpet': 'open',
  'Tubing Hill': 'open'
});

// Trimmed live capture from 17 Nov 2026: Chairs 1-6 are typed without the bold
// status ("Chair 1: Closed"), the carpet and tube hill keep it. The snow total
// and hours paragraphs in the same block must not parse as lifts.
lifts(
  'donner-ski-ranch',
  'html',
  {
    'Chair 1': 'closed',
    'Chair 2': 'closed',
    'Chair 3': 'closed',
    'Chair 4': 'closed',
    'Chair 5': 'closed',
    'Chair 6': 'closed',
    'Ski Moving Carpet': 'closed',
    'Tubing Hill': 'closed'
  },
  { example: 'donner-ski-ranch-2026-11' }
);
