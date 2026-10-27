import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/schlick-2000/index.js';
import lifts from '../lifts/index.js';

// Intermaps Skigebietsmanager region_id=871, captured live 2026-10-27. The
// SKI plus CITY network page this area used to be read from dropped its
// #pisten_anlagen tables on 2026-09-22; see lib/resorts/schlick-2000/index.js.
lifts('schlick-2000', 'html', {
  "BIG Ron's Tellerlift": 'closed',
  'EUB Galtbergbahn (10er Gondel)': 'closed',
  'EUB Kreuzjochbahn I (6er Gondel)': 'closed',
  'EUB Kreuzjochbahn II (6er Gondel)': 'closed',
  'SL Schanzlin': 'closed',
  'SL Schlickerboden': 'closed',
  'Zauberteppich 1-4*': 'closed',
  '4er Panoramabahn': 'closed',
  '4er Sennjochbahn': 'closed',
  '6er Zirmachbahn': 'closed'
});

test('schlick-2000 reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/schlick-2000.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-10-19T06:07:23.000Z');
      assert.equal(Object.keys(ls).length, 10, 'the stamp must not count as a lift');
      done();
    }
  );
});
