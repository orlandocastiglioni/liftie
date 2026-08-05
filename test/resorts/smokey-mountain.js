import lifts from '../lifts/index.js';

// Fixture: the in-season 2022-04-01 Wayback snapshot of skismokey.ca's
// current-conditions page, where the LIFTS STATUS block lists all four named
// lifts as "- Open" (proves the free-text vocabulary and structure). The size
// parentheticals "(small hill)"/"(med hill)" are stripped from the names; the
// remaining "Skytrac Quad Chair Lift" line has no parenthetical. No per-trail
// status is published (map/PDF only), so there is no trails parser.
lifts('smokey-mountain', 'html', {
  'Magic Carpet': 'open',
  "Coach's Poma": 'open',
  'Red Lift': 'open',
  'Skytrac Quad Chair Lift': 'open'
});
