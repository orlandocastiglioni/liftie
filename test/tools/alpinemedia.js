import assert from 'node:assert/strict';
import test from 'node:test';
import { lifts, running, trailRows } from '../../lib/tools/alpinemedia.js';

// Synthetic payloads: the shapes of the alpinemedia lifts/trails services, cut
// down to the fields the parser reads.

test('alpinemedia: an empty or missing board is an error, never an empty board', () => {
  assert.throws(() => lifts({ total: 0, limit: 100, skip: 0, data: [] }), /empty board/);
  assert.throws(() => lifts({ name: 'NotAuthenticated', code: 401 }), /empty board/);
  assert.throws(() => trailRows({ data: [] }), /empty board/);
});

test('alpinemedia: lifts use displayName, drop Uphill Access, keep hold', () => {
  const body = {
    data: [
      { name: 'Chair 1', displayName: 'Summit Chair', status: 'open' },
      { name: 'Holts', displayName: '', status: 'hold' },
      { name: 'Uphill Access', displayName: '', status: 'open' },
      { name: 'Carpet', status: 'closed' }
    ]
  };
  assert.deepEqual(lifts(body), { 'Summit Chair': 'open', Holts: 'hold', Carpet: 'closed' });
  assert.equal(running(body), true);
  assert.equal(
    running({
      data: [
        { name: 'Uphill Access', status: 'open' },
        { name: 'Carpet', status: 'closed' }
      ]
    }),
    false
  );
});

test('alpinemedia: trail status from `open`, levels mapped, closed while no lift runs', () => {
  const body = {
    data: [
      { name: 'A', open: true, status: null, difficulty: 'expert' },
      { name: 'B', open: true, status: 'hold', difficulty: 'extreme-terrain' },
      { name: 'C', open: false, status: null, difficulty: 'terrain-park-easy' },
      { name: 'D', open: true, status: null, difficulty: 'uphill-access' }
    ]
  };
  assert.deepEqual(trailRows(body), [
    { name: 'A', status: 'open', level: 'black' },
    { name: 'B', status: 'hold', level: 'doubleBlack' },
    { name: 'C', status: 'closed', level: 'terrainPark' },
    { name: 'D', status: 'open', level: undefined }
  ]);
  assert.deepEqual(
    trailRows(body, false).map(t => t.status),
    ['closed', 'closed', 'closed', 'closed']
  );
});
