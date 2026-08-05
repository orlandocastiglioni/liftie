import lifts from '../lifts/index.js';

// wayback capture of bryceresort.com/mountain-info/conditions from 2026-03-16
// (late season - the carpets advertise 'Re-opening 3/17', so every lift shows
// the red ClosedSymbols icon while half the ski trails are still open)
lifts('bryce-resort', 'html', {
  'Bunny Slope Carpet': 'closed',
  'Lift 3': 'closed',
  'Lift One': 'closed',
  'Lift Two': 'closed',
  'Little Nip Carpet': 'closed'
});
