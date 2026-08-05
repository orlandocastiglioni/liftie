import trails from '../trails/index.js';

// same 2023-12-09 fixture as the lift test. It covers the three things that
// can go wrong here: the four open trails carry an extra "groomed" badge span
// that must not be read as the status, the "Extreme Difficulty" section only
// yields doubleBlack through its pti-expert-only icon, and the legend at the
// bottom holds a decoy article.SnowReport-Trail that the section scoping drops
trails('massanutten', [
  { 'name': 'Boardwalk', 'status': 'closed', 'level': 'green' },
  { 'name': 'Easy Street', 'status': 'closed', 'level': 'green' },
  { 'name': 'Lower Nutten-To-It', 'status': 'closed', 'level': 'green' },
  { 'name': 'Meadow', 'status': 'closed', 'level': 'green' },
  { 'name': "Paul's Way", 'status': 'open', 'level': 'green' },
  { 'name': 'Southern Comfort', 'status': 'open', 'level': 'green' },
  { 'name': 'Upper Nutten-To-It', 'status': 'closed', 'level': 'green' },
  { 'name': 'Lower MAKAttack', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Lower Mass Transit', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Lower Showtime', 'status': 'open', 'level': 'blue' },
  { 'name': "Mueller's Mile", 'status': 'closed', 'level': 'blue' },
  { 'name': 'Pacesetter', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Ridgecrest', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Upper Mass Transit', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Upper ParaDice', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Upper Showtime', 'status': 'open', 'level': 'blue' },
  { 'name': 'YeeHa', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Lower Diamond Jim', 'status': 'closed', 'level': 'black' },
  { 'name': 'Lower ParaDice', 'status': 'closed', 'level': 'black' },
  { 'name': 'Slot', 'status': 'closed', 'level': 'black' },
  { 'name': 'Upper Diamond Jim', 'status': 'closed', 'level': 'black' },
  { 'name': 'Upper MAKAttack', 'status': 'closed', 'level': 'black' },
  { 'name': 'No Hessitation', 'status': 'closed', 'level': 'doubleBlack' },
  { 'name': 'Snow Tube Park - Lift 1', 'status': 'closed' },
  { 'name': 'Snow Tube Park - Lift 2', 'status': 'closed' }
]);
