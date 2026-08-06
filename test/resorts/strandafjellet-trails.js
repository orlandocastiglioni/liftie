import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/strandafjellet/trails.js';
import trails from '../trails/index.js';

// same 2021-01-09 capture as the lifts: 7 of 18 slopes open, matching
// _source.slopes.open. The Norwegian 4-tier scale arrives as green/blue/red/
// black - red has no liftie equivalent, so it reads black and black reads
// doubleBlack (World Cup løypa is the one true black here).
trails(
  'strandafjellet',
  [
    { name: 'Grøneløypa', status: 'open', level: 'green' },
    { name: 'Skareløypa', status: 'closed', level: 'blue' },
    { name: 'Raudeløypa', status: 'open', level: 'black' },
    { name: 'Alpinisten', status: 'closed', level: 'black' },
    { name: 'Familieløypa', status: 'open', level: 'green' },
    { name: 'Kuffertløypa 6a', status: 'open', level: 'green' },
    { name: 'Kuffertløypa 6b', status: 'closed', level: 'black' },
    { name: 'Roaldsvegen', status: 'closed', level: 'green' },
    { name: 'Skitreffen', status: 'open', level: 'black' },
    { name: 'Meraftaløypa', status: 'closed', level: 'black' },
    { name: 'Stien', status: 'closed', level: 'black' },
    { name: 'World Cup løypa', status: 'closed', level: 'doubleBlack' },
    { name: 'Turisten', status: 'closed', level: 'green' },
    { name: 'Fallet', status: 'closed', level: 'black' },
    { name: 'Barneparken', status: 'closed', level: 'green' },
    { name: 'Mini Alpenisten', status: 'open', level: 'green' },
    { name: 'Snøkvit', status: 'open', level: 'green' },
    { name: 'Parken', status: 'closed', level: 'blue' }
  ],
  { ext: 'json' }
);

// the live roster, all closed: one slope longer than 2021 and renamed in two
// places (Mini Alpenisten -> Minialpinisten, plus Mini skicross), which is why
// nothing keys off a fixed name list
trails(
  'strandafjellet',
  [
    { name: 'Grøneløypa', status: 'closed', level: 'green' },
    { name: 'Skareløypa', status: 'closed', level: 'blue' },
    { name: 'Raudeløypa', status: 'closed', level: 'black' },
    { name: 'Alpinisten', status: 'closed', level: 'black' },
    { name: 'Familieløypa', status: 'closed', level: 'green' },
    { name: 'Kuffertløypa 6a', status: 'closed', level: 'green' },
    { name: 'Kuffertløypa 6b', status: 'closed', level: 'black' },
    { name: 'Roaldsvegen', status: 'closed', level: 'green' },
    { name: 'Skitreffen', status: 'closed', level: 'black' },
    { name: 'Meraftaløypa', status: 'closed', level: 'black' },
    { name: 'Stien', status: 'closed', level: 'black' },
    { name: 'World Cup løypa', status: 'closed', level: 'doubleBlack' },
    { name: 'Turisten', status: 'closed', level: 'green' },
    { name: 'Fallet', status: 'closed', level: 'black' },
    { name: 'Barneparken', status: 'closed', level: 'green' },
    { name: 'Minialpinisten', status: 'closed', level: 'green' },
    { name: 'Snøkvit', status: 'closed', level: 'green' },
    { name: 'Parken', status: 'closed', level: 'blue' },
    { name: 'Mini skicross', status: 'closed', level: 'green' }
  ],
  { ext: 'json', example: 'strandafjellet-summer' }
);

test('strandafjellet trails carry the report date without becoming a row', () => {
  const data = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/strandafjellet-summer.json'), 'utf8'));
  const list = parse(data);
  assert.equal(list.length, 19);
  assert.equal(list.reportedAt, '2026-04-21T08:29:40.000Z');
  assert.ok(!Object.keys(list).includes('reportedAt'));
});
