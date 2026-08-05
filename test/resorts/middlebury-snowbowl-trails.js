import trails from '../trails/index.js';

// 2026-08-04 capture of the alpinemedia trails service. Kelton and Lang are
// still flagged open - leftovers from the closed season rather than live
// truth, but they exercise the open branch. 'Bailey Falls Lift Line' is the
// one row with a displayName ('Lift Line'), which wins over name.
trails(
  'middlebury-snowbowl',
  [
    { name: 'Allen', status: 'closed', level: 'black' },
    { name: 'Allen East', status: 'closed', level: 'black' },
    { name: 'Allen West', status: 'closed', level: 'black' },
    { name: 'Lift Line', status: 'closed', level: 'black' },
    { name: 'Bailey Falls Traverse', status: 'closed', level: 'blue' },
    { name: 'Big Cookie', status: 'closed', level: 'black' },
    { name: 'Cameron', status: 'closed', level: 'black' },
    { name: 'Carpet Run', status: 'closed', level: 'green' },
    { name: 'Discovery Trail', status: 'closed', level: 'green' },
    { name: 'Fletcher', status: 'closed', level: 'black' },
    { name: 'Game Trail', status: 'closed', level: 'blue' },
    { name: 'Hadley', status: 'closed', level: 'blue' },
    { name: 'Kelton', status: 'open', level: 'black' },
    { name: 'Laforce', status: 'closed', level: 'black' },
    { name: 'Lang', status: 'open', level: 'green' },
    { name: 'Lower Kelton', status: 'closed', level: 'blue' },
    { name: 'Meredith', status: 'closed', level: 'green' },
    { name: 'Panther', status: 'closed', level: 'black' },
    { name: "Pete's Pass", status: 'closed', level: 'blue' },
    { name: 'Proctor', status: 'closed', level: 'blue' },
    { name: 'RTA', status: 'closed', level: 'black' },
    { name: 'Ross', status: 'closed', level: 'black' },
    { name: 'S Turn', status: 'closed', level: 'blue' },
    { name: 'Upper Loop', status: 'closed', level: 'blue' },
    { name: 'Voter', status: 'closed', level: 'green' },
    { name: 'Waterfall', status: 'closed', level: 'black' },
    { name: 'Wissler', status: 'closed', level: 'green' },
    { name: 'Youngman', status: 'closed', level: 'black' }
  ],
  { ext: 'json', example: 'middlebury-snowbowl-trails' }
);
