import lifts from '../lifts/index.js';

lifts('loveland', 'html', {
  'Rainbow Magic Carpet': 'open',
  "Chet's Dream": 'open',
  'Lift 2': 'closed',
  'PTARMIGAN LIFT': 'open',
  'Lift 3': 'open',
  'Lift 4': 'open',
  'Lift 6': 'open',
  'Lift 7': 'open',
  'Lift 8': 'open',
  'Lift 9': 'open'
});

// skiloveland.com/trail-lift-report/ on 2026-11-26: the resort reports 3 of 10
// lifts open - Rainbow Magic Carpet, Chet's Dream and Lift 7. Lift 7's caption
// was typed 'Lift 7 -OPEN', with no space after the dash, which the old strict
// ' - ' split dropped entirely.
lifts(
  'loveland',
  'html',
  {
    'Rainbow Magic Carpet': 'open',
    "Chet's Dream": 'open',
    'Lift 2': 'closed',
    'PTARMIGAN LIFT': 'closed',
    'Lift 3': 'closed',
    'Lift 4': 'closed',
    'Lift 6': 'closed',
    'Lift 7': 'open',
    'Lift 8': 'closed',
    'Lift 9': 'closed'
  },
  { example: 'loveland-2026-11-26' }
);
