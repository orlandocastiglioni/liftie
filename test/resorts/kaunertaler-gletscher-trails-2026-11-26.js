import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/kaunertaler-gletscher/trails.js';
import collect from '../../lib/trails/parse.js';

// kaunertaler-gletscher.at nowbox on 2026-11-26: 7 pistes open on the board,
// plus the two Gletscherstraße toll-road rows, which the feed used to publish
// as open trails (9 open).
const html = readFileSync(resolve(import.meta.dirname, 'example/kaunertaler-gletscher-2026-11-26.html'), 'utf8');

function trails(page) {
  return new Promise((res, rej) => {
    parseHtml(
      page,
      dom => collect(dom, parse),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

test('kaunertaler-gletscher drops the Gletscherstraße road rows', async () => {
  const list = await trails(html);
  assert.equal(list.length, 25);
  assert.deepEqual(
    list.filter(t => /gletscherstra/i.test(t.name)),
    [],
    'road rows are not trails'
  );
  assert.deepEqual(
    list.filter(t => t.status === 'open').map(t => t.name),
    ['Murml', 'Kanonenrohr', 'Weißseeclassic', 'Ferner Ost', 'Südtirolerweg', 'Vronipiste', 'Wiesejaggl']
  );
  // the other non-piste rows (sled run, fun slope, park, tubing) stay
  assert.ok(list.some(t => t.name === 'Snowpark Kaunertal'));
});

test('kaunertaler-gletscher drops the road rows spelled with ss', async () => {
  const list = await trails(html.replaceAll('Gletscherstraße', 'Gletscherstrasse'));
  assert.equal(list.length, 25);
});
