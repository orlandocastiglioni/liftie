import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import liftParse from '../../lib/resorts/beaver-mountain/index.js';
import trailParse from '../../lib/resorts/beaver-mountain/trails.js';
import collect from '../../lib/trails/parse.js';
import lifts from '../lifts/index.js';

// skithebeav.com/mountain/conditions/ fetched through FlareSolverr on
// 2026-11-26, before opening day. The report is dated 11/21/2026 and the header
// reads "0 Lifts Open 0 Runs Open", every lift row is closed - but the run board
// still carries 18 Open + 15 Groomed + 15 Closed from early-season track
// packing. The header wins: all 48 runs publish closed.
const RealDate = Date;
const PINNED = '2026-11-26T18:00:00Z';
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : [PINNED]));
  }
  static now() {
    return RealDate.parse(PINNED);
  }
};

const html = readFileSync(resolve(import.meta.dirname, 'example/beaver-mountain-2026-11-26.html'), 'utf8');

function parseTrails(page) {
  return new Promise((res, rej) => {
    parseHtml(
      page,
      dom => collect(dom, trailParse),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

function parseLifts(page) {
  return new Promise((res, rej) => {
    parseHtml(page, liftParse, (err, ls) => (err ? rej(err) : res(ls)));
  });
}

// the header line, e.g. `<span class="number">0</span> <span class="open lifts">Runs Open`
function withHeader(page, kind, n) {
  const re = new RegExp(`(<span class="number">)\\d+(</span>\\s*<span class="open lifts">${kind} Open)`);
  assert.match(page, re);
  return page.replace(re, `$1${n}$2`);
}

lifts(
  'beaver-mountain',
  'html',
  {
    'The LittleEEZY conveyor': 'closed',
    'The BigEEZY conveyor': 'closed',
    'Little Beaver Triple Lift': 'closed',
    "Beaver's Face Lift": 'closed',
    "Marge's Triple Lift": 'closed',
    "Harry's Dream Lift": 'closed'
  },
  { example: 'beaver-mountain-2026-11-26' }
);

test('beaver-mountain: header "0 Runs Open" publishes every run closed', async () => {
  const list = await parseTrails(html);
  assert.equal(list.length, 48);
  assert.deepEqual(
    list.filter(t => t.status !== 'closed'),
    [],
    'no run may read open while the header says 0'
  );
  // names and levels still come from the board
  assert.deepEqual(list[0], { name: 'Eezy-Peezy', status: 'closed', level: 'green' });
  assert.deepEqual(list.at(-1), { name: "Teddy's Frolic", status: 'closed', level: 'black' });
  assert.equal(list.filter(t => t.level === 'terrainPark').length, 2);
});

test('beaver-mountain: "Groomed" is closed unless the header vouches for it', async () => {
  // 18 Open + 15 Groomed on the board; a header of 20 covers only the Open ones
  const list = await parseTrails(withHeader(html, 'Runs', 20));
  assert.equal(list.filter(t => t.status === 'open').length, 18);
  assert.equal(list.find(t => t.name === 'Cottontail').status, 'closed', 'Groomed row');
  assert.equal(list.find(t => t.name === 'Eezy-Peezy').status, 'open', 'Open row');
});

test('beaver-mountain: a header covering Open + Groomed keeps groomed runs open', async () => {
  const list = await parseTrails(withHeader(html, 'Runs', 33));
  assert.equal(list.filter(t => t.status === 'open').length, 33);
});

test('beaver-mountain: no header means no override', async () => {
  const page = html.replace(/<h6 class="open_runs">[\s\S]*?<\/h6>/, '');
  const list = await parseTrails(page);
  // explicit Open rows only; Groomed is not vouched for by anything
  assert.equal(list.filter(t => t.status === 'open').length, 18);
});

test('beaver-mountain: header "0 Lifts Open" closes every lift row', async () => {
  // flip two rows open on the board, keep the header at 0
  const page = html
    .replace(/<span>closed<\/span>/, '<span>open</span>')
    .replace(/<span>closed<\/span>/, '<span>open</span>');
  const ls = await parseLifts(page);
  assert.deepEqual(new Set(Object.values(ls)), new Set(['closed']));
  const vouched = await parseLifts(withHeader(page, 'Lifts', 2));
  assert.equal(Object.values(vouched).filter(s => s === 'open').length, 2);
});
