import lifts from '../lifts/index.js';

// fixture: www.massresort.com/play/conditions/ as rendered by renderd
// (2026-11-17, pre-season: everything closed), trimmed to the lift and trail
// sections. The 26/27 Astro rebuild writes the status onto each row's
// data-state only after its getLiftTrailStatus call returns.
lifts('massanutten', 'html', {
  Creekside: 'closed',
  'Easy Rider': 'closed',
  'Peak Express': 'closed',
  'Ridge Triple': 'closed',
  'Flying Carpet': 'closed',
  'Magic Carpet': 'closed',
  Sunkid: 'closed'
});

// same capture with data-state edited to every state the page script knows,
// plus 'unavailable' (status call failed), which must drop the row rather
// than publish it as scheduled
lifts(
  'massanutten',
  'html',
  {
    Creekside: 'open',
    'Easy Rider': 'closed',
    'Peak Express': 'closed',
    'Ridge Triple': 'hold',
    'Flying Carpet': 'closed',
    Sunkid: 'scheduled'
  },
  { example: 'massanutten-mixed' }
);
