import lifts from '../lifts/index.js';

// fixture: wayback snapshot of /snowreport from 2025-03-26 (report dated
// 3/8/25). Wayback only ever captured this page twice and neither is
// mid-winter, so the lifts are all closed here - the value of this capture is
// that it carries the one-line "Uphill Traffic - Closed for Season" form that
// leaks into the lift column unless the feature rows are filtered out.
// The page's own header reads "Lift Status  - 0/4".
lifts('huff-hills', 'html', {
  'Bunny Tow': 'closed',
  'Blue Lift': 'closed',
  'Green Lift': 'closed',
  'Race Tow': 'closed'
});
