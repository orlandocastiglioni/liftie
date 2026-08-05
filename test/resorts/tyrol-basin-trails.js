import trails from '../trails/index.js';

// 2026-08-05 capture of the alpinemedia trails service. The platform keeps
// the last published values all summer, so the rows still flagged open are
// leftovers from 3/17/2026 rather than live truth - but they exercise the
// open branch alongside the closed one.
//
// Three names appear twice, once as a run and once as a park ('Hans Down',
// 'Sunrise', 'The Barnyard'); the level is what tells them apart. The six
// level-less rows are difficulty 'uphill-access' (Tyrol labels them "Tree
// Skiing"), which has no liftie equivalent.
trails(
  'tyrol-basin',
  [
    { name: 'Bump Buster', status: 'open', level: 'black' },
    { name: "Charlotte's Chase", status: 'closed', level: 'green' },
    { name: 'Dare Devil', status: 'open', level: 'black' },
    { name: 'Double Diamond', status: 'open', level: 'doubleBlack' },
    { name: 'Elbow', status: 'closed', level: 'black' },
    { name: 'Elbow Trees', status: 'closed' },
    { name: 'Espel', status: 'closed', level: 'green' },
    { name: 'Gentle Ben', status: 'open', level: 'green' },
    { name: 'Gentle Ben Progression Park', status: 'closed', level: 'terrainPark' },
    { name: 'Green Zone', status: 'closed', level: 'terrainPark' },
    { name: 'Hans Down', status: 'closed', level: 'terrainPark' },
    { name: 'Hans Down', status: 'open', level: 'blue' },
    { name: "Lower Sandy's Run", status: 'open', level: 'blue' },
    { name: 'Nisse Sti', status: 'open', level: 'green' },
    { name: 'Nutcracker', status: 'closed', level: 'black' },
    { name: "Shelley's Way", status: 'closed', level: 'green' },
    { name: 'Sunrise', status: 'closed', level: 'terrainPark' },
    { name: 'Sunrise', status: 'open', level: 'blue' },
    { name: "Sutter's Ridge", status: 'closed', level: 'blue' },
    { name: 'The Barnyard', status: 'open', level: 'black' },
    { name: 'The Barnyard', status: 'closed', level: 'terrainPark' },
    { name: 'The Green Zone', status: 'closed' },
    { name: 'The Underwood Way', status: 'open', level: 'black' },
    { name: 'Tobel', status: 'open', level: 'blue' },
    { name: 'Tobel Trees', status: 'closed' },
    { name: 'Trollway', status: 'open', level: 'green' },
    { name: 'Twister', status: 'closed', level: 'black' },
    { name: 'Twister Trees', status: 'closed' },
    { name: "Ullr's Alley", status: 'closed', level: 'black' },
    { name: 'Upper Dare Devil', status: 'closed' },
    { name: "Upper Sandy's Run", status: 'open', level: 'blue' },
    { name: 'West Ridge Trail', status: 'open', level: 'green' },
    { name: "Wilder's Way", status: 'closed', level: 'green' },
    { name: 'Yodeler', status: 'open', level: 'black' },
    { name: 'Yodeler Trees', status: 'closed' }
  ],
  { ext: 'json', example: 'tyrol-basin-trails' }
);
