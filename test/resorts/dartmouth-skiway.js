import lifts from '../lifts/index.js';

// Captured 2026-11-17 from the alpinemedia lifts service, before the season. The feed's
// fifth row, "Uphill Access" (open year-round), is the uphill policy and is dropped.
lifts('dartmouth-skiway', 'json', {
  'Big Bear Carpet': 'closed',
  'Holts': 'closed',
  'Little Cub Carpet': 'closed',
  'Winslow': 'closed'
});
