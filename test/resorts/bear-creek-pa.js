import lifts from '../lifts/index.js';

// fixture: Wayback 2026-01-17 capture of the hand-maintained Elementor
// conditions page (stamped "Updated 01/16/26 02:22am"). Status is an
// <img title> only - Open / Closed / On Hold per the page's own legend, all
// known to coerce.js. The icon order differs between lifts ([type, status])
// and trails ([status, ...modifiers]), so the parser picks the status icon by
// title, never by index. The page header reads "Open Lifts 5", matching the
// five open rows below.
lifts('bear-creek-pa', 'html', {
  'A Lift (Opens when volume dictates)': 'closed',
  Carpet: 'open',
  'F Lift': 'open',
  'B Lift': 'open',
  'E Lift': 'open',
  'SNOWTUBING LIFT': 'open'
});
