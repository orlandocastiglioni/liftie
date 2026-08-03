import trails from '../trails/index.js';

// Ski runs from the same status.php JSON feed: 11 easy + 12 moderate + 7 difficult
// = 30 runs (difficulty 'lift' and 'summer' excluded). difficulty maps to level
// (moderate -> blue, which liftie's levels map lacks). Off-season fixture: all runs
// closed; the is_open=true path is covered by the Gondola in the lift test.
trails(
  'cape-smokey',
  [
    { 'name': 'Bunny Hill', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2a)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2b)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2c)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2d)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2e)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2f)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Country Mile (2g)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Jigs & Reels (8a)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Jigs & Reels (8b)', 'status': 'closed', 'level': 'green' },
    { 'name': 'Sneek A Peek', 'status': 'closed', 'level': 'green' },
    { 'name': 'Racers Edge', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Hecklers Highway (4a)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Hecklers Highway (4b)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Boomerang', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Racing Pitch', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Chicken Chute', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Chicken Chute (7b)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Far Side (14a)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Far Side (14b)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Far Side (14c)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Far Side (14d)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Snowboard Heaven (15a)', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Pit Fall', 'status': 'closed', 'level': 'black' },
    { 'name': 'Cliff Hanger', 'status': 'closed', 'level': 'black' },
    { 'name': 'Check Me Shorts (12a)', 'status': 'closed', 'level': 'black' },
    { 'name': 'Check Me Shorts (12b)', 'status': 'closed', 'level': 'black' },
    { 'name': 'Hickory Dickory & Dock (13a)', 'status': 'closed', 'level': 'black' },
    { 'name': 'Hickory Dickory & Dock (13b)', 'status': 'closed', 'level': 'black' },
    { 'name': 'Choker', 'status': 'closed', 'level': 'black' }
  ],
  { ext: 'json' }
);
