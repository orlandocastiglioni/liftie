import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/loveland/trails.js';
import collect from '../../lib/trails/parse.js';

// skiloveland.com/trail-lift-report/ on 2026-11-26, early season: 5 runs open.
// 'Take Off' is listed under both Chet's Dream and Lift 7 and was counted twice.
const html = readFileSync(resolve(import.meta.dirname, 'example/loveland-2026-11-26.html'), 'utf8');

function trails(page) {
  return new Promise((res, rej) => {
    parseHtml(
      page,
      dom => collect(dom, parse),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

test('loveland trails are deduped by name', async () => {
  const list = await trails(html);
  const names = list.map(t => t.name);
  assert.equal(new Set(names).size, names.length, 'no run listed twice');
  assert.equal(names.filter(n => n === 'Take Off').length, 1);
  assert.equal(list.length, 94);
  assert.deepEqual(
    list.filter(t => t.status === 'open').map(t => t.name),
    ['Take Off', 'Catwalk', 'Mambo', 'Home Run', 'Spillway']
  );
});

test('loveland: a run open under either lift is open', async () => {
  // close the first (Chet's Dream) copy of Take Off; the Lift 7 copy stays open
  const first = html.indexOf('>Take Off<');
  const icon = html.lastIndexOf('icon_open.png', first);
  const page = `${html.slice(0, icon)}icon_closed.png${html.slice(icon + 'icon_open.png'.length)}`;
  const list = await trails(page);
  assert.equal(list.find(t => t.name === 'Take Off').status, 'open');
});
