import lifts from '../lifts/index.js';

// mid-winter capture (2026-02-01). Every running lift publishes hours instead
// of a status: note the double space in GRIZZLY's '9:30 AM  to 4:00 PM', the
// missing 'to' on SNOW PARK and THE TRANSPORTER, and ROPE TOW's '10 AM'
// without minutes. SUNRISE T-BAR is the only literal 'Closed'.
lifts('montana-snowbowl', 'html', {
  'GRIZZLY Double Chair': 'open',
  'LaVALLE Double Chair': 'open',
  'SNOW PARK Double Chair': 'open',
  'THE TRANSPORTER Triple Chair': 'open',
  'SUNRISE T-BAR': 'closed',
  'ROPE TOW': 'open'
});
