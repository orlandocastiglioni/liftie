import trails from '../trails/index.js';

// The Loppet's ski report is a Google Doc (docs.google.com/.../pub) that
// loppet.org embeds on its conditions page; loppet.org itself publishes no
// structured trail data. No difficulty is published, so no level is reported.
// The fixtures are the ?embedded=true wayback captures of that same document -
// identical markup, plus a frame-breakout script the parser never looks at.

// 2026-01-26 capture: the full 14-trail roster, 12 open / 2 closed. Covers the
// 'TRAIL HOURS: Open 6am-10pm' line that would otherwise parse as a trail, the
// '(lighted)' / '(natural snow)' qualifiers that are stripped from the names,
// the '~20km' distance prefix on the natural-snow parks, and the stop at
// 'Loppet Event Trail Closures'.
trails('the-loppet', [
  { 'name': 'Lower Stadium', 'status': 'open' },
  { 'name': 'Green Meadow', 'status': 'open' },
  { 'name': 'Inner Meadow', 'status': 'open' },
  { 'name': 'Jim’s Hill', 'status': 'open' },
  { 'name': 'Ridgeline', 'status': 'open' },
  { 'name': 'Twin Lake', 'status': 'open' },
  { 'name': 'La Squadra', 'status': 'open' },
  { 'name': 'North Finger', 'status': 'closed' },
  { 'name': 'Trail 18', 'status': 'open' },
  { 'name': 'Judy Loop', 'status': 'closed' },
  { 'name': 'Wirth', 'status': 'open' },
  { 'name': 'Hiawatha', 'status': 'open' },
  { 'name': 'Columbia', 'status': 'open' },
  { 'name': 'Chain of Lakes', 'status': 'open' }
]);

// 2025-01-21 capture: 13 trails. This is the season where the natural-snow
// parks report 'Ungroomed' - skiable but not machine-groomed, so open (coerce
// does not know the word and would call it 'scheduled'). It also exercises the
// 'UPCOMING CLOSURES:' blacklist, the 'Single Track Bike/Hiking Trails' stop,
// and 'CHAIN OF LAKES:' published with an empty value (the detail sits on the
// next paragraph as 'Isles - rolled'), which is dropped rather than guessed at.
trails(
  'the-loppet',
  [
    { 'name': 'Lower Stadium', 'status': 'open' },
    { 'name': 'Green Meadow', 'status': 'open' },
    { 'name': 'Jim’s Hill', 'status': 'open' },
    { 'name': 'Ridgeline', 'status': 'open' },
    { 'name': 'Twin Lake', 'status': 'open' },
    { 'name': 'La Squadra', 'status': 'open' },
    { 'name': 'Inner Meadow', 'status': 'open' },
    { 'name': 'North Finger', 'status': 'open' },
    { 'name': 'Trail 18', 'status': 'open' },
    { 'name': 'Judy Loop', 'status': 'closed' },
    { 'name': 'Wirth', 'status': 'open' },
    { 'name': 'Hiawatha', 'status': 'open' },
    { 'name': 'Columbia', 'status': 'open' }
  ],
  { example: 'the-loppet-2025' }
);
