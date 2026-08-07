import lifts from '../lifts/index.js';

// 2026-01-17 snapshot of La Chapelle d'Abondance's page on the Portes du
// Soleil network site: its two sector cards, 'Braitaz' (2 lifts) and
// 'Cret-beni' (7), mid-morning with the hill running - 8 'Ouverte' and 1
// 'Fermée'. The third card, 'Liaisons chapelle ab', holds only inter-station
// link routes and is dropped by its sub-header.
lifts('la-chapelle-dabondance', 'html', {
  'Tc la panthiaz': 'open',
  'Ts de braitaz': 'open',
  'Tsd cret-beni': 'open',
  'Ts les fontaines': 'open',
  'Tk la combe': 'open',
  'Tk le bambi': 'open',
  'Tk le dahu': 'open',
  'Tk les pres 1': 'closed',
  'Tk les pres 2': 'open'
});
