import lifts from '../lifts/index.js';

// fixture: live /trail-map capture (2026-08-05). Wayback has no snapshot of
// this page at all, so no winter capture exists - but the page is hand-edited
// in the Wix editor and is not reset off-season, so the rows still read
// "Open 9am - 4pm". The header banner (#comp-mjd2dnb2) reads "CLOSED Thank
// you! Ski ya next season!", and a banner leading with CLOSED overrides the
// stale rows: before this the feed showed 3/3 open in November.
lifts('pomerelle', 'html', {
  'Triple 88': 'closed',
  'EZ Rider': 'closed',
  'Magic Carpet': 'closed'
});

// same capture with the banner edited to "OPEN 9AM - 4PM": the rows are in
// charge again. The status cell merges the status with the operating hours,
// and passing it to coerce whole would yield 'scheduled' for all three lifts
// instead of 'open'.
lifts(
  'pomerelle',
  'html',
  {
    'Triple 88': 'open',
    'EZ Rider': 'open',
    'Magic Carpet': 'open'
  },
  { example: 'pomerelle-banner-open' }
);
