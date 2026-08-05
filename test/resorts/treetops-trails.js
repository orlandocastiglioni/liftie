import trails from '../trails/index.js';

// Same 2026-02-09 fixture as the lifts - the runs are an accordion on the
// same page. Terrain was 100% open that day, so every row reads open; the
// live August page runs the identical DOM with all 31 marked closed, and the
// page's own stylesheet defines exactly two modifiers (.open / .closed), so
// that is the whole vocabulary.
//
// What this does pin down is the awkward parts: the group labels ("Beginner
// Runs", "Most Difficult Runs", ...) only reach liftie's levels map once the
// trailing noun is stripped, and "Rollaway" is the row that a
// .list-group-item loop would drop - the Expert group packs both of its runs
// into one wrapper.
trails('treetops', [
  { name: 'Loafer Park', status: 'open', level: 'terrainPark' },
  { name: 'The Yard- BoarderX', status: 'open', level: 'terrainPark' },
  { name: 'Birch Run Park', status: 'open', level: 'terrainPark' },
  { name: 'Sitzmark', status: 'open', level: 'green' },
  { name: 'Stubby', status: 'open', level: 'green' },
  { name: 'Birch Run', status: 'open', level: 'green' },
  { name: 'Loafer', status: 'open', level: 'green' },
  { name: 'The Chute', status: 'open', level: 'blue' },
  { name: 'Money Pit', status: 'open', level: 'blue' },
  { name: 'Al’s Bypass', status: 'open', level: 'blue' },
  { name: 'Cross Cut', status: 'open', level: 'blue' },
  { name: 'Sweet Caroline', status: 'open', level: 'blue' },
  { name: 'Old Face Full', status: 'open', level: 'blue' },
  { name: 'Round House', status: 'open', level: 'blue' },
  { name: 'Schuss-Away', status: 'open', level: 'blue' },
  { name: 'Hemlock Hollow', status: 'open', level: 'black' },
  { name: 'Lookout', status: 'open', level: 'black' },
  { name: 'Tournament Hill', status: 'open', level: 'black' },
  { name: 'Hunter’s Drop', status: 'open', level: 'black' },
  { name: 'Spillway', status: 'open', level: 'black' },
  { name: 'The Lark', status: 'open', level: 'black' },
  { name: 'Jumpin’ Judas', status: 'open', level: 'black' },
  { name: 'Ridge Run', status: 'open', level: 'black' },
  { name: 'Timber Trail', status: 'open', level: 'black' },
  { name: 'Kathryn’s Way', status: 'open', level: 'black' },
  { name: 'The Yard', status: 'open', level: 'black' },
  { name: 'Straight Shot', status: 'open', level: 'black' },
  { name: 'Razzle Dazzle', status: 'open', level: 'black' },
  { name: 'Wood Splitter', status: 'open', level: 'black' },
  { name: 'The Glades', status: 'open', level: 'doubleBlack' },
  { name: 'Rollaway', status: 'open', level: 'doubleBlack' }
]);
