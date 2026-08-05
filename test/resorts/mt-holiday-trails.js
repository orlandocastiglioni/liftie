import trails from '../trails/index.js';

// same Google Doc as the lifts: the 12 rows under "Terrain / Trail Status" in
// document order. Hall's Hollow carries only the 🟦 legend glyph and no level
// word; Terrain Park and Tube Run carry neither.
trails('mt-holiday', [
  { name: 'Upper Holiday', status: 'closed', level: 'black' },
  { name: 'Lower Holiday', status: 'closed', level: 'black' },
  { name: 'Northwind', status: 'closed', level: 'blue' },
  { name: 'Snow Shoot', status: 'closed', level: 'green' },
  { name: 'Biederman’s Bowl', status: 'closed', level: 'blue' },
  { name: 'Hall’s Hollow', status: 'closed', level: 'blue' },
  { name: 'Oleson’s Ridge', status: 'closed', level: 'blue' },
  { name: 'Snowflake', status: 'closed', level: 'blue' },
  { name: 'Peppie’s', status: 'closed', level: 'black' },
  { name: 'Coffin Canyon', status: 'closed', level: 'black' },
  { name: 'Terrain Park', status: 'closed', level: 'terrainPark' },
  { name: 'Tube Run', status: 'closed' }
]);
