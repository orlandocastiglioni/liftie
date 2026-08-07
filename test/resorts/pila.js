import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parserStream from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/pila/index.js';
import lifts from '../lifts/index.js';

// Fixture is the Wayback capture of 2026-02-03 (mid-season, 14 of 15 lifts
// open); the live August page carries the same 15 rows, all Chiuso, because
// the cdh-viewer widget freezes rather than emptying. Names are the site's
// own minus the leading lift number.
lifts('pila', 'html', {
  'Aosta - Pila': 'open',
  'Pila - Gorraz': 'open',
  'Leissé': 'open',
  'Gorraz Gran Grimod': 'open',
  'Grimod': 'open',
  'Couis 2': 'open',
  'Grimondet': 'closed',
  'Fun Park Chacard': 'open',
  'Gorraz - Couis': 'open',
  'Couis - Platta de Grevon': 'open',
  'Baby Gorraz': 'open',
  'Baby Pila 1': 'open',
  'Baby Pila 2': 'open',
  'Chamolé': 'open',
  'La Nouva': 'open'
});

test('pila should publish the report timestamp', (_t, done) => {
  const filename = resolve(import.meta.dirname, 'example/pila.html');
  createReadStream(filename).pipe(
    parserStream(parse, (err, status) => {
      assert.ifError(err);
      // 'Ultimo aggiornamento: 02-02-2026 08:30', dd-mm-yyyy in Europe/Rome (CET)
      assert.equal(status.reportedAt, '2026-02-02T07:30:00.000Z');
      done();
    })
  );
});
