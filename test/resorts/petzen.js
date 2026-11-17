import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-02-17: the winter board ("Pisten und Lifte"), everything open.
lifts('petzen', 'html', {
  'Kabinenbahn / Cable Car': 'open',
  'Stollenlift 4 SL': 'open',
  'Siebenhüttenlift': 'open',
  'Übungslift': 'open',
  'Quellenlift': 'open',
  'Zauberteppich TAL': 'open',
  'Zauberteppich BERG': 'open'
});
trails('petzen', [{ 'name': 'Talabfahrt', 'status': 'open' }]);
