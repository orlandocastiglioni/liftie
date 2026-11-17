import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Wayback capture of 2026-09-01: the summer board. The cable car runs; the bike trails,
// via ferrata and disc golf on the same table are not published.
lifts('petzen', 'html', { 'Kabinenbahn / Cable Car': 'open' }, { example: 'petzen-summer' });
trails('petzen', [], { example: 'petzen-summer' });
