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

// The WordPress/Elementor page the site moved to in 2026, captured live
// 2026-10-27 and trimmed to the LIFTS STATUS widgets plus one unrelated
// text-editor block ahead of them (the anchor must skip it). Heading is an
// <h3>, lines are separated by an en dash, and the apostrophe is now typographic.
lifts(
  'smokey-mountain',
  'html',
  {
    'Magic Carpet': 'closed',
    'Coach’s Poma': 'closed',
    'Red Lift': 'closed',
    'Skytrac Quad Chair Lift': 'closed'
  },
  { example: 'smokey-mountain-2026' }
);
