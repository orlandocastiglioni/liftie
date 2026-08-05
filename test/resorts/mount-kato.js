import assert from 'node:assert/strict';
import test from 'node:test';
import parse from '../../lib/resorts/mount-kato/index.js';
import lifts from '../lifts/index.js';

// /lifts.json off the resort's Firebase Realtime Database, captured 2026-08-05
// (out of season, so every row reads Closed); Firebase returns the node in key
// order: lift-1..lift-8, then the two conveyors
lifts('mount-kato', 'json', {
  'Lift 1': 'closed',
  'Lift 2': 'closed',
  'Lift 3': 'closed',
  'Lift 4': 'closed',
  'Lift 5': 'closed',
  'Lift 6': 'closed',
  'Lift 7': 'closed',
  'Lift 8': 'closed',
  'Ski Conveyor': 'closed',
  'Tube Conveyor': 'closed'
});

// the capture cannot show the in-season tokens, so cover the rest of the
// vocabulary the resort's own trail-status.js can publish
test('mount-kato should map the published status vocabulary', () => {
  const status = parse({
    a: { name: 'Open', status: 'Open' },
    b: { name: 'Closed', status: 'Closed' },
    c: { name: 'Hold', status: 'Hold' },
    d: { name: 'Groomed', status: 'Groomed' },
    e: { name: 'Some Closures', status: 'Some Closures' }
  });
  assert.deepEqual(status, {
    Open: 'open',
    Closed: 'closed',
    Hold: 'hold',
    Groomed: 'open',
    'Some Closures': 'open'
  });
});
