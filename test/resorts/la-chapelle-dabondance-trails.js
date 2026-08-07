import trails from '../trails/index.js';

// Same 2026-01-17 snapshot: 9 pistes in 'Braitaz' then 18 in 'Cret-beni'. The
// station grades on the four-tier French scale, so rouge lands on black (this
// snapshot has no noire) and `grade` carries the resort's own word. 'Stade
// slalom' is printed once per card by the operator; both rows are kept.
trails('la-chapelle-dabondance', [
  { name: 'Marmotte', status: 'open', level: 'green', grade: 'verte' },
  { name: 'Marmotte bas', status: 'closed', level: 'green', grade: 'verte' },
  { name: 'Accès braitaz', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Belette', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Blanchot haut', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Boardercross braitaz', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Blanchot bas', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Stade slalom', status: 'closed', level: 'black', grade: 'rouge' },
  { name: 'Lynx', status: 'open', level: 'black', grade: 'rouge' },
  { name: 'Bamby', status: 'open', level: 'green', grade: 'verte' },
  { name: 'Dahu', status: 'open', level: 'green', grade: 'verte' },
  { name: 'Ourson', status: 'open', level: 'green', grade: 'verte' },
  { name: 'Pingouin', status: 'open', level: 'green', grade: 'verte' },
  { name: 'Biche bas', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Biche haut', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Hermine', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Huski 1', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Huski 2', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Renard', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Sanglier', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Stade slalom', status: 'closed', level: 'blue', grade: 'bleue' },
  { name: 'Le chable', status: 'open', level: 'blue', grade: 'bleue' },
  { name: 'Cerf bas', status: 'closed', level: 'black', grade: 'rouge' },
  { name: 'Cerf haut', status: 'open', level: 'black', grade: 'rouge' },
  { name: 'Loup', status: 'open', level: 'black', grade: 'rouge' },
  { name: 'Cerf intermédiaire', status: 'open', level: 'black', grade: 'rouge' },
  { name: 'Boardercross crêt-béni', status: 'closed', level: 'blue', grade: 'bleue' }
]);
