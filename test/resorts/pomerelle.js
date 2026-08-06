import lifts from '../lifts/index.js';

// fixture: live /trail-map capture (2026-08-05). Wayback has no snapshot of
// this page at all, so no winter capture exists - but the page is hand-edited
// in the Wix editor and is not reset off-season, so the rows still read
// "Open 9am - 4pm". That is exactly the case worth pinning: the status cell
// merges the status with the operating hours, and passing it to coerce whole
// would yield 'scheduled' for all three lifts instead of 'open'.
lifts('pomerelle', 'html', {
  'Triple 88': 'open',
  'EZ Rider': 'open',
  'Magic Carpet': 'open'
});
