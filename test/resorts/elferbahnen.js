import assert from 'node:assert/strict';
import test from 'node:test';
import lifts from '../lifts/index.js';
import { liftsOf } from './support/parse.js';

// Intermaps Skigebietsmanager region_id=1063, captured live 2026-11-27 (the
// SKI plus CITY tables are gone): the gondola and the three drag lifts under
// the 'lifts' caption, all closed before the season. Intermaps spells the
// names without the network page's quotes ('Schlepplift II Hölltal').
lifts('elferbahnen', 'html', {
  'Schlepplift Elfer I Elferhütte': 'closed',
  'Schlepplift II Hölltal': 'closed',
  'Schlepplift Krößbach': 'closed',
  '8er-Einseilumlaufbahn': 'closed'
});

test('elferbahnen dates its board from the Skigebietsmanager masthead', async () => {
  const rows = await liftsOf('elferbahnen', 'elferbahnen.html');
  assert.equal(rows.reportedAt, '2026-11-27T18:50:53.000Z');
});
