import lifts from '../lifts/index.js';

// mid-winter capture (2026-02-01): the page's own 'Number of Lifts Open'
// counter reads 5/5, and every status span holds an opening time rather than
// a status word - '9:30 am' on chairs 1, 2 and 4 but '9:30am' on 3 and 5.
lifts('lost-trail-powder-mountain', 'html', {
  'Chair 1': 'open',
  'Chair 2': 'open',
  'Chair 3': 'open',
  'Chair 4': 'open',
  'Chair 5': 'open'
});
