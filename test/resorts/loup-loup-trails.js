import trails from '../trails/index.js';

// wayback snapshot 2025-01-16, mid-season (52" base). The first nine rows are
// the 'Status' block (area level open/closed, including the
// 'Open Weekends and Holidays' tube hill that needs its tail trimmed before
// coercing); the rest are the named runs of the 'Grooming' block, which
// publishes grooming rather than open/closed and therefore inherits the status
// of the area that governs it - Little Buck Mountain GROOMED = OPEN and South
// Summit Nordic Trails CURRENTLY = Open in this snapshot.
trails('loup-loup', [
  { name: 'Little Buck Mountain Groomed', status: 'open' },
  { name: 'Little Buck Mountain Non-Groomed', status: 'closed' },
  { name: 'Little Buck Mountain Terrain Park', status: 'closed' },
  { name: 'Little Buck Mountain Tube Hill', status: 'open' },
  { name: 'Bear Mountain Luge', status: 'closed' },
  { name: 'Fat Tire Biking', status: 'open' },
  { name: 'Snowshoeing', status: 'open' },
  { name: 'Loup Loup Nordic Trails', status: 'open' },
  { name: 'South Summit Nordic Trails', status: 'open' },
  { name: 'Peanut Rope Tow', status: 'open', level: 'green' },
  { name: 'Bunny Hill', status: 'open', level: 'green' },
  { name: 'Double Z', status: 'open', level: 'green' },
  { name: 'Loup', status: 'open', level: 'green' },
  { name: 'Jr. Poma', status: 'open', level: 'green' },
  { name: 'Ridge', status: 'open', level: 'green' },
  { name: 'Stairway', status: 'open', level: 'blue' },
  { name: 'Terrain Park', status: 'open', level: 'blue' },
  { name: 'Terminator', status: 'open', level: 'black' },
  { name: 'Raceface', status: 'open', level: 'black' },
  { name: 'Exterminator', status: 'open', level: 'black' },
  { name: 'Park', status: 'open', level: 'black' },
  { name: 'Volunteer', status: 'open', level: 'black' },
  { name: 'Bulldog', status: 'open', level: 'black' },
  { name: 'Hugh’s', status: 'open', level: 'black' },
  { name: 'Trail #4', status: 'open', level: 'green' },
  { name: 'Trail #5', status: 'open', level: 'green' },
  { name: 'Trail #6', status: 'open', level: 'green' },
  { name: 'Trail #7', status: 'open', level: 'green' },
  { name: 'Trail #3', status: 'open', level: 'blue' },
  { name: 'Trail #8', status: 'open', level: 'blue' },
  { name: 'Trail #9', status: 'open', level: 'blue' },
  { name: 'Trail #11', status: 'open', level: 'blue' },
  { name: 'Trail F', status: 'open', level: 'blue' },
  { name: 'Trail K9', status: 'open', level: 'blue' },
  { name: 'Trail Lower K9', status: 'open', level: 'blue' },
  { name: 'Trail #2', status: 'open', level: 'black' },
  { name: 'Trail #10', status: 'open', level: 'black' }
]);
