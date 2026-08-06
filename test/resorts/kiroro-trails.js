import trails from '../trails/index.js';

// same fixture as the lifts test - courses and lifts share /dashboard/.
// Header widget says '3/24 Trail Open'; the last five rows are the Tree Run
// Area block, which the resort counts separately and publishes without a
// difficulty level.
trails('kiroro', [
  { name: 'Asari Course1-A', status: 'closed', level: 'green' },
  { name: 'Asari Course1-B', status: 'closed', level: 'green' },
  { name: 'Yoichi Course2-A', status: 'closed', level: 'green' },
  { name: 'Nagamine Course 1', status: 'closed', level: 'green' },
  { name: 'Family Course', status: 'open', level: 'green' },
  { name: 'Gateway Course', status: 'closed', level: 'green' },
  { name: 'Asari Dynamic', status: 'closed', level: 'blue' },
  { name: 'Asari Panorama', status: 'closed', level: 'blue' },
  { name: 'Yoichi Course1-A', status: 'closed', level: 'blue' },
  { name: 'Yoichi Course1-B', status: 'closed', level: 'blue' },
  { name: 'Center A', status: 'open', level: 'blue' },
  { name: 'Center B', status: 'open', level: 'blue' },
  { name: 'Nagamine Course 2-A', status: 'closed', level: 'blue' },
  { name: 'Nagamine Course 2-C', status: 'closed', level: 'blue' },
  { name: 'Powder Ride', status: 'closed', level: 'blue' },
  { name: 'Asari Expert A', status: 'closed', level: 'black' },
  { name: 'Asari Expert B', status: 'closed', level: 'black' },
  { name: 'Asari Course2-A', status: 'closed', level: 'black' },
  { name: 'Asari Course2-B', status: 'closed', level: 'black' },
  { name: 'Asari Course2-C', status: 'closed', level: 'black' },
  { name: 'Yoichi Course2-B', status: 'closed', level: 'black' },
  { name: 'Center C', status: 'closed', level: 'black' },
  { name: 'Nagamine Course 2-B', status: 'closed', level: 'black' },
  { name: 'Center Link', status: 'closed', level: 'black' },
  { name: 'Powder Ridge', status: 'closed' },
  { name: 'Orange Light', status: 'closed' },
  { name: 'Snow Saw', status: 'closed' },
  { name: 'Flashman', status: 'closed' },
  { name: 'Barcorde', status: 'closed' }
]);
