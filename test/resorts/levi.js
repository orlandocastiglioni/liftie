import lifts from '../lifts/index.js';

// Winter capture of Levi's own app API (amenities/v1/lifts), taken from the
// 2025-11-17 19:43Z wayback snapshot - early season, glacier/front-slope
// operation only. Four lifts read open.operating=true; three of those four
// had open.now=false purely because the snapshot was taken at 21:43 local,
// after their 19:00 closing time, which is the whole reason this parser keys
// on `operating` (see lib/resorts/levi/status.js). Levi's own
// statistics/v1/today from the same snapshot agrees: lifts 4 of 26.
// 'Six' is what the feed called Levi Six that November.
lifts('levi', 'json', {
  'Express gondola': 'open',
  'North chairlift': 'open',
  'Glacier Express': 'open',
  'Front Slopes pome lift': 'closed',
  'Magic carpet lift': 'open',
  Rakka: 'closed',
  'South chairlift': 'closed',
  South: 'closed',
  'South pome lift': 'closed',
  'Leevilandia pome lift': 'closed',
  'Leevilandia magic carpet lift 1': 'closed',
  'Leevilandia magic carpet lift 2': 'closed',
  Aurinko: 'closed',
  'Levi West': 'closed',
  'Gondola 2000': 'closed',
  Tieva: 'closed',
  Lammaskuru: 'closed',
  'Vesirikka-autto': 'closed',
  Tunneli: 'closed',
  Jäkälälaki: 'closed',
  Six: 'closed',
  'Taalo pome lift': 'closed',
  Utsuvaara: 'closed',
  'Utsu pome lift': 'closed',
  Sammu: 'closed',
  'Gondola Magic Carpet': 'closed'
});
