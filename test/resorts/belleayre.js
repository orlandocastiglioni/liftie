import lifts from '../lifts/index.js';

// ORDA conditions plugin (lib/tools/orda.js), fetched through FlareSolverr 2026-11-13 and
// trimmed to the lift and trail tables; the first lift is hand-flipped to open and the first
// trail to on-hold.
lifts('belleayre', 'html', {
  "Belleayre Express": "open",
  "Catskill Thunder Gondola": "closed",
  "Hawk Quad": "closed",
  "Kaatskill Katerpillar": "closed",
  "Lightning Quad": "closed",
  "Little Creek Carpet": "closed",
  "Overlook Quad": "closed",
  "Thunderhawk Carpet": "closed"
});
