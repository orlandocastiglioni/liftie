import lifts from '../lifts/index.js';

// Cape Smokey's operator status.php JSON feed. The main Gondola is the top-level
// whole-hill is_open flag (open here on the off-season fixture: schedule-driven,
// gondola runs in summer); Magic Carpet is the lone difficulty:'lift' entry.
lifts('cape-smokey', 'json', {
  'Gondola': 'open',
  'Magic Carpet': 'closed'
});
