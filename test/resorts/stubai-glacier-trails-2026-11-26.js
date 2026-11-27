import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/stubai-glacier/trails.js';
import collect from '../../lib/trails/parse.js';

// winter.intermaps.com/stubaier_gletscher/data?lang=en on 2026-11-26 (trimmed
// to lifts/slopes/routes/lastUpdate and the fun-park pois). The glacier's own
// board read "12 / 40" open slopes: 29 pistes + 7 ski routes from `slopes`
// and the 4 snow parks the feed files under pois['362'].
const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/stubai-glacier-2026-11-26.json'), 'utf8'));

test('stubai-glacier trails include the snow parks', () => {
  const list = collect(body, parse);
  assert.equal(list.length, 40);
  assert.equal(list.filter(t => t.status === 'open').length, 12);
  assert.deepEqual(
    list.filter(t => t.level === 'terrainPark'),
    [
      { name: 'Stubai Zoo Snowpark', status: 'closed', level: 'terrainPark' },
      { name: 'Stubai Zoo Medium-Line', status: 'closed', level: 'terrainPark' },
      { name: 'Spring Garden / Fun Slope', status: 'closed', level: 'terrainPark' },
      { name: 'Stubai Zoo Easy & Jibline', status: 'closed', level: 'terrainPark' }
    ]
  );
});

test('stubai-glacier trails ignore the other pois', () => {
  const withRestaurant = {
    ...body,
    pois: { ...body.pois, 202: [{ status: 'open', popup: { title: 'Jochdohle', 'clients-sub-id': 202 } }] }
  };
  assert.equal(collect(withRestaurant, parse).length, 40);
});
