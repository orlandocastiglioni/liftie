import trails from '../trails/index.js';

// SYNTHETIC: maneige.ski refuses every scripted client (the Pi reaches it
// through flaresolverr), so no REST body could be captured here. This is the
// shape of the vallee-bleue / mont-habitant fixtures (acf counts only) filled
// with the counts Kanasuta's own maneige page showed in the Wayback capture of
// 2025-02-18: day trails 5/11, night 0/4, glades 0/8, parks 1/2, chairs day
// 2/3, night 0/1.

trails(
  'mont-kanasuta',
  [
    { name: 'Trails (day): 5/11 open', status: 'open' },
    { name: 'Trails (night): 0/4 open', status: 'closed' },
    { name: 'Glades: 0/8 open', status: 'closed' },
    { name: 'Terrain parks: 1/2 open', status: 'open', level: 'terrainPark' }
  ],
  { ext: 'json' }
);
