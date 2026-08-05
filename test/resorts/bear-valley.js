import lifts from '../lifts/index.js';

// renderd capture of the embedded TE2 status widget
// (weather.te2.io/status?configFile=bear-valley), taken 2026-08-05. Every
// lift is shut for the northern summer - the widget renders the closed rows
// as `.venue-status.status-closed`; its stylesheet defines exactly three
// buckets, status-open / status-hold / status-closed.
lifts('bear-valley', 'html', {
  'POOH CHAIR': 'closed',
  CUB: 'closed',
  GRIZZLY: 'closed',
  KOALA: 'closed',
  'LIFT - LITTLE CUB CARPET': 'closed',
  'MOKELUMNE EXPRESS': 'closed',
  PANDA: 'closed',
  'POLAR EXPRESS': 'closed',
  'SUPER CUB': 'closed'
});
