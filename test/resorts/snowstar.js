import lifts from '../lifts/index.js';

// fixture: wayback capture of skisnowstar.com/weather.html from 2026-03-10.
// Snowstar sat out the whole 2025/26 season, and wayback only ever captured
// this page three times (2024-05-24, 2025-03-26, 2026-03-10), so every
// available snapshot - and the live page - reads CLOSED. What the fixture does
// pin down is the tile set: the Base Depth tile (h3 = `0"`) must be dropped and
// the nine forecast tiles in .three_col_weather must never be picked up.
lifts('snowstar', 'html', {
  'Lifts': 'closed',
  'Tubing Hill': 'closed',
  'Terrain Park': 'closed'
});
