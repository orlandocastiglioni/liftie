import trails from '../trails/index.js';

// same 2026-01-23 fixture as the lift test - the trails are the first half of
// #tgtable. It covers the level-from-icon mapping (all four difficulty icons
// plus the icon-less "Snow Tubing" row, which gets no level) and the terrain
// park, which is tagged Diamond.png here and so only reaches terrainPark
// through the name special case.
trails('montage-mountain', [
  { 'name': 'Snow Tubing', 'status': 'closed' },
  { 'name': 'Easy Street', 'status': 'open', 'level': 'green' },
  { 'name': 'High Ball', 'status': 'open', 'level': 'green' },
  { 'name': 'Lesson Area', 'status': 'open', 'level': 'green' },
  { 'name': 'Limited (Bunny)', 'status': 'open', 'level': 'green' },
  { 'name': 'Mainline', 'status': 'open', 'level': 'green' },
  { 'name': 'Branch Line', 'status': 'open', 'level': 'blue' },
  { 'name': 'Connection', 'status': 'open', 'level': 'blue' },
  { 'name': 'Doc’s Way', 'status': 'open', 'level': 'blue' },
  { 'name': 'Nordic', 'status': 'open', 'level': 'blue' },
  { 'name': 'Pusher', 'status': 'open', 'level': 'blue' },
  { 'name': 'Sidewinder', 'status': 'open', 'level': 'blue' },
  { 'name': 'Snake (Gladed/Natural Trail)', 'status': 'closed', 'level': 'blue' },
  { 'name': 'Spike', 'status': 'open', 'level': 'blue' },
  { 'name': 'Spur', 'status': 'open', 'level': 'blue' },
  { 'name': 'Stub', 'status': 'open', 'level': 'blue' },
  { 'name': 'Switch', 'status': 'open', 'level': 'blue' },
  { 'name': 'Upper Fast Track', 'status': 'open', 'level': 'blue' },
  { 'name': 'Upper Runaway', 'status': 'open', 'level': 'blue' },
  { 'name': 'Whistler', 'status': 'open', 'level': 'blue' },
  { 'name': 'Cannonball', 'status': 'open', 'level': 'black' },
  { 'name': 'Express', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Fast Track', 'status': 'open', 'level': 'black' },
  { 'name': 'Lower Runaway', 'status': 'open', 'level': 'black' },
  { 'name': 'Rattler', 'status': 'open', 'level': 'black' },
  { 'name': 'The Yard Terrain Park', 'status': 'closed', 'level': 'terrainPark' },
  { 'name': 'Boomer', 'status': 'open', 'level': 'doubleBlack' },
  { 'name': 'Smoke', 'status': 'open', 'level': 'doubleBlack' },
  { 'name': 'White Lightning', 'status': 'open', 'level': 'doubleBlack' }
]);
