// nordic-pulse.com embed page (?embed=true) captured live 2026-08-05: the feed
// is not reset out of season, so 16 of 17 trails still report open and only
//  "Mack's Loop" is closed. levels are easy/intermediate/advanced only.
// nordic-only area - no lifts ("no": { "lifts": true }), so there is no
// bear-basin-nordic.js lift test.
import trails from '../trails/index.js';

trails('bear-basin-nordic', [
  {
    'name': 'Polar Express',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': "Lyle's Loop",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Just Right',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Jim Beckwourth',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'George Drouillard',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Fur Rendezvous',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Big Bear',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Francois Payette',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Ed's Meadows",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Flying Squirrel',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Moon Ridge',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Camas',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Ursa Minor',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Moon Ridge Cutoff',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Mack's Loop",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Caitlin's Climb",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Scott's Loop",
    'status': 'open',
    'level': 'black'
  }
]);
