import trails from '../trails/index.js';

// 2026-01-24 wayback capture. The Elfer's whole pisted terrain is two rote
// Abfahrten plus one ungraded ski route, which is why the trail count is the
// smallest in the pass. Hölltal open with Elferhütte shut gives both status
// glyphs on the trail side too.
trails('elferbahnen', [
  {
    name: "Abfahrt 'Elferhütte'",
    status: 'closed',
    level: 'black',
    grade: 'red'
  },
  {
    name: "Abfahrt 'Hölltal'",
    status: 'open',
    level: 'black',
    grade: 'red'
  },
  {
    name: 'Skiroute',
    status: 'closed'
  }
]);
