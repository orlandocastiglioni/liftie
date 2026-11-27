import assert from 'node:assert/strict';
import test from 'node:test';
import trails from '../trails/index.js';
import { trailsOf } from './support/parse.js';

// IN SEASON - the CONSTRUCTED body described in big-rock.js. 'pending' reads
// as scheduled and 'race' as closed (coerce), easier / more_difficult /
// most_difficult as green / blue / black (normalizeLevel).
trails(
  'big-rock',
  [
    { name: 'Space Walk', status: 'open', level: 'green' },
    { name: 'Comet', status: 'open', level: 'blue' },
    { name: 'Orion', status: 'scheduled', level: 'black' },
    { name: 'Hooch', status: 'closed', level: 'black' },
    { name: 'Milky Way', status: 'closed', level: 'blue' }
  ],
  { ext: 'json', example: 'big-rock-current' }
);

test('big-rock publishes no trails from the not-current feed, and says so', async () => {
  const rows = await trailsOf('big-rock', 'big-rock.json');
  assert.deepEqual(rows, []);
  assert.deepEqual(rows.suppressed, { reason: 'offseason' });
});
