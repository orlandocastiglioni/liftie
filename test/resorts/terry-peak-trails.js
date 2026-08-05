import trails from '../trails/index.js';

// Trail rows live on the same page as the lifts. Level comes from the row's
// trail-beginner|intermediate|advanced class; the second column's
// icon-snow / icon-groomed images are snowmaking and grooming flags and are
// deliberately not read as status ('groomed' coerces to 'open').

// 2026-01-23 wayback capture: 28 rows, 11 open / 17 closed.
trails('terry-peak', [
  { 'name': 'Stewart Slope', 'status': 'open', 'level': 'green' },
  { 'name': 'Little Phil', 'status': 'open', 'level': 'green' },
  { 'name': 'Welcome', 'status': 'open', 'level': 'blue' },
  { 'name': 'Snowstorm', 'status': 'closed', 'level': 'green' },
  { 'name': 'Surprise', 'status': 'open', 'level': 'blue' },
  { 'name': 'The Falls', 'status': 'closed', 'level': 'black' },
  { 'name': 'Old Falls', 'status': 'closed', 'level': 'black' },
  { 'name': 'Black Moon', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Mini Moon', 'status': 'open', 'level': 'blue' },
  { 'name': 'Missing Link', 'status': 'open', 'level': 'blue' },
  { 'name': 'Millsite', 'status': 'open', 'level': 'green' },
  { 'name': 'Gold Run', 'status': 'closed', 'level': 'green' },
  { 'name': 'Avalanche', 'status': 'closed', 'level': 'black' },
  { 'name': 'Blizzard', 'status': 'closed', 'level': 'black' },
  { 'name': 'Avalanche Glades', 'status': 'closed', 'level': 'black' },
  { 'name': 'Ben Hur Glades', 'status': 'closed', 'level': 'black' },
  { 'name': 'North Slide Glades', 'status': 'closed', 'level': 'black' },
  { 'name': 'Maringo', 'status': 'closed', 'level': 'black' },
  { 'name': 'Holy Terror', 'status': 'closed', 'level': 'black' },
  { 'name': 'Ben Hur', 'status': 'open', 'level': 'black' },
  { 'name': 'Kussy', 'status': 'open', 'level': 'blue' },
  { 'name': "Ricky's Run", 'status': 'closed', 'level': 'blue' },
  { 'name': 'Homestake', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Hobo Queen', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Terry Cut-across', 'status': 'open', 'level': 'blue' },
  { 'name': 'Empress', 'status': 'open', 'level': 'blue' },
  { 'name': 'Inferno', 'status': 'closed', 'level': 'black' },
  { 'name': 'Little Hope', 'status': 'closed', 'level': 'black' }
]);

// 2026-08-05 live capture: the roster drifts season to season (this one adds
// 'Upper Stewart') and the crew appends inline annotations - 'Ben Hur (upper
// closed)' and 'Homestake (upper closed)' - which the parser strips so a trail
// keeps one name across polls.
trails(
  'terry-peak',
  [
    { 'name': 'Stewart Slope', 'status': 'closed', 'level': 'green' },
    { 'name': 'Upper Stewart', 'status': 'closed', 'level': 'green' },
    { 'name': 'Little Phil', 'status': 'closed', 'level': 'green' },
    { 'name': 'Welcome', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Snowstorm', 'status': 'closed', 'level': 'green' },
    { 'name': 'Surprise', 'status': 'closed', 'level': 'blue' },
    { 'name': 'The Falls', 'status': 'closed', 'level': 'black' },
    { 'name': 'Old Falls', 'status': 'closed', 'level': 'black' },
    { 'name': 'Black Moon', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Mini Moon', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Missing Link', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Millsite', 'status': 'closed', 'level': 'green' },
    { 'name': 'Gold Run', 'status': 'closed', 'level': 'green' },
    { 'name': 'Avalanche', 'status': 'closed', 'level': 'black' },
    { 'name': 'Blizzard', 'status': 'closed', 'level': 'black' },
    { 'name': 'Avalanche Glades', 'status': 'closed', 'level': 'black' },
    { 'name': 'Ben Hur Glades', 'status': 'closed', 'level': 'black' },
    { 'name': 'North Slide Glades', 'status': 'closed', 'level': 'black' },
    { 'name': 'Maringo', 'status': 'closed', 'level': 'black' },
    { 'name': 'Holy Terror', 'status': 'closed', 'level': 'black' },
    { 'name': 'Ben Hur', 'status': 'closed', 'level': 'black' },
    { 'name': 'Kussy', 'status': 'closed', 'level': 'blue' },
    { 'name': "Ricky's Run", 'status': 'closed', 'level': 'blue' },
    { 'name': 'Homestake', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Hobo Queen', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Terry Cut-across', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Empress', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Inferno', 'status': 'closed', 'level': 'black' },
    { 'name': 'Little Hope', 'status': 'closed', 'level': 'black' }
  ],
  { example: 'terry-peak-summer' }
);
