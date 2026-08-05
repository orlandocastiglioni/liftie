import trails from '../trails/index.js';

// same 2025-01-16 snow report capture as the lift test - a genuinely mixed
// day: 22 of the 27 published trails open, 5 closed (Indian Crossing,
// Tomahawk, Pinnacle, Chute, Mahlzeit), all three difficulty icons present.
trails('mohawk-mountain', [
  { name: 'Back Bowl', status: 'open', level: 'green' },
  { name: 'Deer Run', status: 'open', level: 'green' },
  { name: 'Indian Crossing', status: 'closed', level: 'green' },
  { name: 'Laurel', status: 'open', level: 'green' },
  { name: 'Ledges', status: 'open', level: 'green' },
  { name: 'Patrol Loop', status: 'open', level: 'blue' },
  { name: 'Lower Mohawk', status: 'open', level: 'green' },
  { name: 'Nutmeg - Beginner Slope', status: 'open', level: 'green' },
  { name: 'Pine', status: 'open', level: 'green' },
  { name: 'Ridge Run', status: 'open', level: 'green' },
  { name: 'Skyline Drive', status: 'open', level: 'blue' },
  { name: "Victor's Way", status: 'open', level: 'green' },
  { name: 'Tomahawk', status: 'closed', level: 'blue' },
  { name: 'Arrowhead', status: 'open', level: 'blue' },
  { name: 'Exhibition', status: 'open', level: 'blue' },
  { name: 'Housatonic', status: 'open', level: 'blue' },
  { name: 'Mohawk', status: 'open', level: 'blue' },
  { name: 'Pinnacle', status: 'closed', level: 'blue' },
  { name: 'Rabbit Run', status: 'open', level: 'blue' },
  { name: 'Rimrock', status: 'open', level: 'blue' },
  { name: 'Chute', status: 'closed', level: 'black' },
  { name: 'Lift Line', status: 'open', level: 'black' },
  { name: 'Route 100', status: 'open', level: 'black' },
  { name: 'The Rapids', status: 'open', level: 'black' },
  { name: 'Timber', status: 'open', level: 'black' },
  { name: 'Wildwood', status: 'open', level: 'black' },
  { name: 'Mahlzeit', status: 'closed', level: 'green' }
]);
