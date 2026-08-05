import trails from '../trails/index.js';

// /trails.json off the same Firebase database, captured 2026-08-05: 21 keys in
// Firebase key order, minus the "MK Tubing" tubing-park row, leaves the 19
// trails plus Sundance Park (the terrain park, tagged Black in the feed)
trails(
  'mount-kato',
  [
    { name: 'Big Bear', status: 'closed', level: 'blue' },
    { name: 'Big Brave', status: 'closed', level: 'blue' },
    { name: 'Big Hawk Ridge', status: 'closed', level: 'blue' },
    { name: 'Birch Coulee', status: 'closed', level: 'blue' },
    { name: 'Birch Pass', status: 'closed', level: 'blue' },
    { name: 'Brave Chute', status: 'closed', level: 'blue' },
    { name: 'Eagle Ridge', status: 'closed', level: 'blue' },
    { name: 'Little Beaver', status: 'closed', level: 'green' },
    { name: 'Little Brave', status: 'closed', level: 'green' },
    { name: 'Little Crow', status: 'closed', level: 'green' },
    { name: 'Little Forest', status: 'closed', level: 'green' },
    { name: 'Sleepy Creek', status: 'closed', level: 'blue' },
    { name: 'Sleepy Hollow', status: 'closed', level: 'blue' },
    { name: 'Sundance', status: 'closed', level: 'blue' },
    { name: 'Sundance Park', status: 'closed', level: 'terrainPark' },
    { name: 'Timberwolf', status: 'closed', level: 'blue' },
    { name: 'Tomahawk Chute', status: 'closed', level: 'blue' },
    { name: 'Wild Deer', status: 'closed', level: 'blue' },
    { name: 'Wolf Chute', status: 'closed', level: 'blue' },
    { name: 'Wolf Ridge', status: 'closed', level: 'blue' }
  ],
  { ext: 'json', example: 'mount-kato-trails' }
);
