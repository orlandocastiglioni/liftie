import trails from '../trails/index.js';

// same single page and single document-order pass as the lifts (Wayback
// 2026-01-17): every row that is not under the "Lifts" heading is a trail and
// its heading is its difficulty - Beginner / MORE DIFFICULT / MOst DIFFICULT /
// Terrain Park all survive normalizeLevel's lowercase+strip. 23 rows, matching
// the page header's "Open trails 22" plus the one closed row. 'Extreme' looks
// like a difficulty label but is a real trail inside the MOst DIFFICULT group.
// The Legend block is nested inside the same section and is cut at its
// heading, otherwise it contributes two phantom rows.
trails('bear-creek-pa', [
  {
    name: 'Bear Pass',
    status: 'open',
    level: 'green'
  },
  {
    name: 'Coaster',
    status: 'open',
    level: 'green'
  },
  {
    name: 'DISCOVERY TEACHING AREA',
    status: 'open',
    level: 'green'
  },
  {
    name: 'EASY STREET',
    status: 'open',
    level: 'green'
  },
  {
    name: 'SUN BEAR',
    status: 'open',
    level: 'green'
  },
  {
    name: 'BROADWAY',
    status: 'open',
    level: 'green'
  },
  {
    name: 'CUB RUN',
    status: 'open',
    level: 'green'
  },
  {
    name: 'DRIFTER',
    status: 'open',
    level: 'green'
  },
  {
    name: 'HOME RUN',
    status: 'open',
    level: 'green'
  },
  {
    name: 'TEDDY BEAR TEACHING AREA',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Bear Claw',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'GROWLER',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'POLAR BEAR',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'BROWN BEAR',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'KODIAK',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'TIMBERLINE',
    status: 'open',
    level: 'blue'
  },
  {
    name: 'Bear TRAP',
    status: 'open',
    level: 'black'
  },
  {
    name: 'GRIZZLY',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Extreme',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Sasquatch',
    status: 'open',
    level: 'black'
  },
  {
    name: 'Black Bear Park',
    status: 'open',
    level: 'terrainPark'
  },
  {
    name: 'Family Park',
    status: 'open',
    level: 'terrainPark'
  },
  {
    name: 'CASCADE PARK',
    status: 'open',
    level: 'terrainPark'
  }
]);
