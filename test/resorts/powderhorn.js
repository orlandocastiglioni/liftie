import lifts from '../lifts/index.js';

// fixture: www.powderhorn.com/explore/conditions/mountain-report.html
// (2026-11-17, pre-season), trimmed to the Lift Status and Trail Status
// blocks of the 26/27 "pgri" theme. Five lifts, all closed.
lifts('powderhorn', 'html', {
  'Wild West Express': 'closed',
  'Explorer Conveyor': 'closed',
  'Easy Rider': 'closed',
  'Discovery Conveyor': 'closed',
  'Flat Top Flyer': 'closed'
});

// same capture with two pill modifiers edited (--open, --hold)
lifts(
  'powderhorn',
  'html',
  {
    'Wild West Express': 'hold',
    'Explorer Conveyor': 'closed',
    'Easy Rider': 'open',
    'Discovery Conveyor': 'closed',
    'Flat Top Flyer': 'closed'
  },
  { example: 'powderhorn-mixed' }
);
