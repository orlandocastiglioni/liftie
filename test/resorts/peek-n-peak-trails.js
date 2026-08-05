import trails from '../trails/index.js';

// same 2026-02-11 conditions-report capture as the lift test: all 26 trails
// plus the 3 terrain parks, in document order. The parks are the rows that
// carry the resort's orange-oval icon, which has no equivalent in liftie's
// levels map and is translated to terrainPark by the parser.
trails('peek-n-peak', [
  { name: 'Wil O’ The Wisp', status: 'open', level: 'black' },
  { name: 'Quarter Staff', status: 'open', level: 'black' },
  { name: 'Ox Bow', status: 'open', level: 'black' },
  { name: 'Long Bow', status: 'open', level: 'black' },
  { name: 'Cross Bow', status: 'open', level: 'black' },
  { name: 'Catapult', status: 'open', level: 'black' },
  { name: 'Willie Wynkin Woodlands', status: 'open', level: 'blue' },
  { name: 'Sherwood Meadow', status: 'open', level: 'blue' },
  { name: 'Sherwood Glade', status: 'open', level: 'blue' },
  { name: 'Robin Hood’s Retreat', status: 'open', level: 'blue' },
  { name: 'Race Arena', status: 'open', level: 'blue' },
  { name: 'Oxford Way', status: 'open', level: 'blue' },
  { name: 'Nottingham Notch', status: 'open', level: 'blue' },
  { name: 'Maid Marian’s', status: 'open', level: 'blue' },
  { name: 'King Richard’s Willy-Nilly', status: 'open', level: 'blue' },
  { name: 'Kensington Cross', status: 'open', level: 'blue' },
  { name: 'Greenwood Forest Trail', status: 'open', level: 'blue' },
  { name: 'Finsbury Field', status: 'open', level: 'blue' },
  { name: 'Doncaster Trail', status: 'open', level: 'blue' },
  { name: 'Castle Lea', status: 'open', level: 'blue' },
  { name: 'Canterbury Trail', status: 'open', level: 'blue' },
  { name: 'Arden Woods', status: 'open', level: 'blue' },
  { name: 'Snow Sports School', status: 'open', level: 'green' },
  { name: 'Little John’s Jaunt', status: 'open', level: 'green' },
  { name: 'Friar Tuck’s Trek', status: 'open', level: 'green' },
  { name: 'Alan-A-Dale', status: 'open', level: 'green' },
  { name: '540 Terrain Park', status: 'open', level: 'terrainPark' },
  { name: '360 Terrain Park', status: 'open', level: 'terrainPark' },
  { name: '180 Terrain Park', status: 'open', level: 'terrainPark' }
]);
