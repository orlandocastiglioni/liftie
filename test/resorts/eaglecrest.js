import lifts from '../lifts/index.js';

// wayback capture of /conditions/ from 2026-01-15, the only one with the
// chairlifts running: Porcupine 'Open', Hooter 'Open ' (trailing space) and
// Ptarmigan 'Open at 10AM', which coerce.js does not know. The table also
// carries a blank pseudo-row and a colspan link row, both filtered out.
lifts('eaglecrest', 'html', {
  Porcupine: 'open',
  Hooter: 'open',
  Ptarmigan: 'open'
});
