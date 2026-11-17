import trails from '../trails/index.js';

// Captured 2026-11-17 from the FacilityApi the site's own lift and piste widgets call
// (before the season: every facility status 2, Closed).
trails(
  'st-johann-in-tirol',
  [
    { 'name': 'Piste 1', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 1a', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 2', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 3', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 4', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 4a', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 4b', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 4c', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 5', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 5a', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 6', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 6a', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 7', 'status': 'closed', 'level': 'black' },
    { 'name': 'Piste 7a', 'status': 'closed', 'level': 'blue' },
    { 'name': 'Piste 8', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 9', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 11', 'status': 'closed', 'level': 'green' },
    { 'name': 'Piste 12', 'status': 'closed', 'level': 'green' }
  ],
  { ext: 'json', example: 'st-johann-in-tirol-pistes' }
);
