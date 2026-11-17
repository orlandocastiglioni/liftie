import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Captured 2026-11-17: the pre-season board ("Anlagen + Trails"), all closed; opening is
// planned for 2026-12-05.
lifts(
  'petzen',
  'html',
  {
    'Kabinenbahn / Cable Car': 'closed',
    'Siebenhüttenlift': 'closed',
    '4er SL Stollenlift': 'closed',
    'Quellenlift': 'closed',
    'Übungslift': 'closed',
    'Zauberteppich TAL': 'closed',
    'Zauberteppich BERG': 'closed'
  },
  { example: 'petzen-preseason' }
);
trails('petzen', [{ 'name': 'Talabfahrt', 'status': 'closed' }], { example: 'petzen-preseason' });
