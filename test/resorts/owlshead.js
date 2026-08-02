import lifts from '../lifts/index.js';

// winter snapshot - mixed statuses
lifts('owlshead', 'html', {
  'Summit': 'open',
  'Family': 'open',
  'Blue': 'closed',
  'Panorama': 'open',
  'Lake': 'open',
  'Magic carpet': 'open'
});

// summer page - everything closed
lifts(
  'owlshead',
  'html',
  {
    'Summit': 'closed',
    'Family': 'closed',
    'Blue': 'closed',
    'Panorama': 'closed',
    'Lake': 'closed',
    'Magic carpet': 'closed'
  },
  { example: 'owlshead-2026' }
);
