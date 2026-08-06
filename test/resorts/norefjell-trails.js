import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/norefjell/trails.js';
import trails from '../trails/index.js';

// _source.slopes.list[] from the same 6 Aug 2026 document, all 30 runs in feed
// order. Off season, so every status is "0"; the levels are the point here -
// the feed's own grades are green/blue/red/black and the 7 reds would carry no
// level at all through normalizeLevel, so red becomes black and black becomes
// doubleBlack to keep the 4-tier scale ordered.
trails(
  'norefjell',
  [
    { name: '1. Gamleveien', status: 'closed', level: 'blue' },
    { name: '2. Kryllingen', status: 'closed', level: 'blue' },
    { name: '3. Kryllingen nedre', status: 'closed', level: 'doubleBlack' },
    { name: '4. Norefjellparken', status: 'closed', level: 'black' },
    { name: '5. Nore øvre', status: 'closed', level: 'black' },
    { name: '6. Nore midtre', status: 'closed', level: 'doubleBlack' },
    { name: '7. Nore nedre', status: 'closed', level: 'blue' },
    { name: '8. OL øvre', status: 'closed', level: 'black' },
    { name: '9. OL nedre', status: 'closed', level: 'doubleBlack' },
    { name: '10. Trekanten', status: 'closed', level: 'black' },
    { name: '11. Vinkelheisløypa', status: 'closed', level: 'black' },
    { name: '12. Ola', status: 'closed', level: 'blue' },
    { name: '13. Barneområde Skistua', status: 'closed', level: 'green' },
    { name: '14. Bråtavolden', status: 'closed', level: 'green' },
    { name: '15. Toseterløypa', status: 'closed', level: 'blue' },
    { name: '16. Traversen', status: 'closed', level: 'blue' },
    { name: '17. Fjellheisløypa', status: 'closed', level: 'blue' },
    { name: '18. Gamle tosetern', status: 'closed', level: 'green' },
    { name: '19. Panoramabakken', status: 'closed', level: 'green' },
    { name: '20. Skivei 20', status: 'closed', level: 'green' },
    { name: '21. Skivei 21', status: 'closed', level: 'green' },
    { name: '22. Utsikten', status: 'closed', level: 'blue' },
    { name: '23. Ravnås', status: 'closed', level: 'blue' },
    { name: '24. Ravnåseggen', status: 'closed', level: 'blue' },
    { name: '25. Skivei 25', status: 'closed', level: 'green' },
    { name: '26. Bøseterveien', status: 'closed', level: 'green' },
    { name: '27. Østre Bøseter', status: 'closed', level: 'black' },
    { name: '28. Bøseterbakken', status: 'closed', level: 'black' },
    { name: '29. Nedre Bøseter', status: 'closed', level: 'blue' },
    { name: '30. Hotellbakken', status: 'closed', level: 'green' }
  ],
  { ext: 'json' }
);

test('norefjell trails should date the report', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/norefjell.json'), 'utf8'));
  const list = parse(body);
  assert.equal(list.reportedAt, '2026-04-22T08:09:32.000Z');
  assert.equal(list.length, 30);
});
