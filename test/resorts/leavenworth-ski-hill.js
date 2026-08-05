import lifts from '../lifts/index.js';

// Fixture: the Drupal JSON:API payload captured live 2026-08-05, with the 14
// field_trail_status values replaced by the ones the club published on
// 2025-01-21 (wayback snapshot of /conditions) - the JSON:API endpoint itself
// has never been archived and the live payload is an end-of-season all-closed
// report, so this is the only way to exercise the open path. Structure, order,
// uuids and every other attribute are exactly as served.
//
// The only uphill transport LWSC publishes: 'Rope Tows' is one row for two
// physical tows, plus the moving carpet. Everything else in the payload is
// terrain or a building and belongs to trails.
lifts('leavenworth-ski-hill', 'json', {
  'Rope Tows': 'open',
  'Moving Carpet': 'open'
});
