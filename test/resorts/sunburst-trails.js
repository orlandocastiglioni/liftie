import trails from '../trails/index.js';

// Same Ullr key, /widget/SNOW/trails. 13 rows = 11 ski runs + the 2 tubing
// areas, in feed order. Live capture: the whole hill reads CLOSED in August.
// Difficulty tokens map straight through normalizeLevel; the 'GROOMED' flag
// every row carries is deliberately ignored (it is grooming, not status).
trails(
  'sunburst',
  [
    { 'name': 'The Other Way', 'status': 'closed', 'level': 'doubleBlack' },
    { 'name': 'Zig Zag', 'status': 'closed', 'level': 'green' },
    { 'name': 'South Tubing Area', 'status': 'closed', 'level': 'green' },
    { 'name': 'Ridge Runner', 'status': 'closed', 'level': 'terrainPark' },
    { 'name': 'North Park', 'status': 'closed', 'level': 'terrainPark' },
    { 'name': 'North Tubing Area', 'status': 'closed', 'level': 'green' },
    { 'name': "Werner's Way", 'status': 'closed', 'level': 'black' },
    { 'name': 'South Park', 'status': 'closed', 'level': 'terrainPark' },
    { 'name': 'Wunderberg', 'status': 'closed', 'level': 'green' },
    { 'name': 'Edelweiss', 'status': 'closed', 'level': 'blue' },
    { 'name': "Freida's Run", 'status': 'closed', 'level': 'green' },
    { 'name': 'Second Chance', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Eco Alley', 'status': 'closed', 'level': 'black' }
  ],
  { ext: 'json', example: 'sunburst-trails' }
);
