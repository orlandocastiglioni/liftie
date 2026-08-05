import lifts from '../lifts/index.js';

// 2026-01-17 capture
lifts('black-mountain-nh', 'html', {
  'Double Chair Summit': 'open',
  'East Bowl Triple': 'closed',
  'Platter Pull': 'open',
  'J-Bar': 'open',
  'Rope Tow': 'closed'
});

// 2026-02-10 capture: the rope tow has been renamed, and the J-Bar label sits
// in another column than its status - the section-wide zip still pairs them
lifts(
  'black-mountain-nh',
  'html',
  {
    'Double Chair Summit': 'open',
    'East Bowl Triple': 'open',
    'Platter Pull': 'open',
    'J-Bar': 'open',
    'Fluffy Cow Handle Tow': 'open'
  },
  { example: 'black-mountain-nh-hike-to' }
);
