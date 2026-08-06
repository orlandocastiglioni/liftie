import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/krvavec/trails.js';
import trails from '../trails/index.js';

// same 2025-11-30 capture as the lifts: 7 of 27 runs open, matching the file's
// own counter. Levels come from the map badge colour class, never from text -
// blue -> blue, red -> black, black -> doubleBlack, so the three published
// European grades stay distinct and ordered.
trails(
  'krvavec',
  [
    { name: 'Ror', status: 'open', level: 'black' },
    { name: 'Luža za začetnike', status: 'open', level: 'blue' },
    { name: 'Hanek', status: 'closed', level: 'black' },
    { name: 'Dom - Gospinca (freeride)', status: 'closed', level: 'doubleBlack' },
    { name: 'Dom - Tiha dolina', status: 'closed', level: 'black' },
    // published twice, as map numbers 6 and 6b
    { name: 'Neteptana Gospinca (freeride)', status: 'closed', level: 'black' },
    { name: 'Neteptana Gospinca (freeride)', status: 'closed', level: 'black' },
    { name: 'Otroška', status: 'open', level: 'blue' },
    { name: 'Loacker park', status: 'closed', level: 'blue' },
    { name: 'Dom - Kriška planina', status: 'closed', level: 'blue' },
    { name: 'Vrh Krvavca - Gradišče - Tiha dolina', status: 'open', level: 'blue' },
    { name: 'Njivice - Gradišče', status: 'open', level: 'black' },
    { name: 'Spomladanska proga', status: 'open', level: 'blue' },
    { name: 'Zvoh', status: 'open', level: 'black' },
    { name: 'Smučarska proga', status: 'closed', level: 'doubleBlack' },
    { name: 'Gradišče - Tiha dolina', status: 'closed', level: 'black' },
    { name: 'Gradišče - Tiha dolina (odcep)', status: 'closed', level: 'black' },
    { name: 'Njivice 1', status: 'closed', level: 'doubleBlack' },
    { name: 'Poligon Triglav: FIS race course (1)', status: 'closed', level: 'black' },
    { name: 'Proga Jureta Koširja', status: 'closed', level: 'black' },
    { name: 'Poligon Triglav: FIS race course (2)', status: 'closed', level: 'black' },
    { name: 'Vrh Krvavca - plato - Tiha dolina', status: 'closed', level: 'black' },
    { name: 'INTERSPORT proga', status: 'closed', level: 'black' },
    { name: 'Njivice 2', status: 'closed', level: 'doubleBlack' },
    { name: 'Kržišče 1', status: 'closed', level: 'blue' },
    { name: 'Kržišče 2', status: 'closed', level: 'black' },
    { name: 'Snežni park', status: 'closed', level: 'black' }
  ],
  { ext: 'json' }
);

test('krvavec trails carry the report date without becoming a row', () => {
  const data = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/krvavec-summer.json'), 'utf8'));
  const list = parse(data);
  // the summer file is the frozen winter roster, two runs shorter
  assert.equal(list.length, 25);
  assert.equal(list.reportedAt, '2026-07-22T11:19:00.000Z');
  assert.ok(!Object.keys(list).includes('reportedAt'));
  assert.deepEqual(
    list.filter(t => t.status !== 'closed'),
    []
  );
});
