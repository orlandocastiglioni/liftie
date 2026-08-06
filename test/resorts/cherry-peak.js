import lifts from '../lifts/index.js';

// all four lifts, matching the page's own "LIFTS OPEN 3 of 4" counter. The
// fixture is the live page: out of season Cherry Peak keeps serving the last
// winter report verbatim, so it already has a mixed open/closed sample.
lifts('cherry-peak', 'html', {
  'Little Bit': 'open',
  Gateway: 'open',
  Vista: 'open',
  Summit: 'closed'
});
