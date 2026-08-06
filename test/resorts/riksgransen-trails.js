import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/riksgransen/trails.js';
import trails from '../trails/index.js';

// Same 6 Aug 2026 payload, all three terrain sections in feed order: 17 marked
// pistes, then 14 patrolled off-piste routes, then 7 cross-country loops.
// Reconciles with the resort's own counters - pistsOpen '1 / 17', offpistOpen
// '0 / 14', crossCountryOpen '0 / 7'.
//
// Gränsleden 1 is the one open row and the one that proves the gray badge
// splits by section: it reads 'Inte förberedd' (ungroomed but skiable), which
// the resort counts as open on a piste, while the seven cross-country loops
// read the same words and are counted as NOT open.
//
// Levels come only from the inline svg fill hex, and the reds (#D62A40) would
// carry no level at all through normalizeLevel, so red becomes black and black
// (#020202) becomes doubleBlack to keep the 4-tier scale ordered.
trails(
  'riksgransen',
  [
    { name: 'Apelsinklyftan', status: 'closed', level: 'blue' },
    { name: 'BH-löpan', status: 'closed', level: 'blue' },
    { name: 'Blåbärsbacken', status: 'closed', level: 'blue' },
    { name: 'Fjällräven', status: 'closed', level: 'green' },
    { name: 'Gränsleden 1', status: 'open', level: 'black' },
    { name: 'Gränsleden 2', status: 'closed', level: 'black' },
    { name: 'Kanan', status: 'closed', level: 'black' },
    { name: 'Klunken', status: 'closed', level: 'green' },
    { name: 'Lämmeln', status: 'closed', level: 'black' },
    { name: 'Lingonstigen', status: 'closed', level: 'black' },
    { name: 'Mössan', status: 'closed', level: 'blue' },
    { name: 'Ripan', status: 'closed', level: 'green' },
    { name: 'Skimastern', status: 'closed', level: 'doubleBlack' },
    { name: 'Smygarn', status: 'closed', level: 'green' },
    { name: 'Transporten', status: 'closed', level: 'green' },
    { name: 'Vargtassen', status: 'closed', level: 'black' },
    { name: 'Yankee', status: 'closed', level: 'blue' },
    { name: 'Björnfjellsbranten', status: 'closed', level: 'doubleBlack' },
    { name: 'Branten', status: 'closed', level: 'doubleBlack' },
    { name: 'Gränsängarna', status: 'closed', level: 'black' },
    { name: 'Hamres', status: 'closed', level: 'doubleBlack' },
    { name: 'Jokken', status: 'closed', level: 'black' },
    { name: 'Keps', status: 'closed', level: 'black' },
    { name: 'Klumpen', status: 'closed', level: 'doubleBlack' },
    { name: 'Rimfors', status: 'closed', level: 'doubleBlack' },
    { name: 'Skidskolesvängen', status: 'closed', level: 'black' },
    { name: 'Skrattvallen', status: 'closed', level: 'black' },
    { name: 'Snobben', status: 'closed', level: 'black' },
    { name: 'Sommarstigen', status: 'closed', level: 'doubleBlack' },
    { name: 'Tullhussvängen', status: 'closed', level: 'doubleBlack' },
    { name: 'Uffes vägg', status: 'closed', level: 'doubleBlack' },
    { name: 'Gatternjúnni-spåret - Delslingan', status: 'closed' },
    { name: 'Gatternjúnni-spåret - Huvudslingan', status: 'closed' },
    { name: 'Katterjåkk - Nordalsköket', status: 'closed' },
    { name: 'Korta slingan', status: 'closed' },
    { name: 'Långa slingan', status: 'closed' },
    { name: 'Soldalen', status: 'closed' },
    { name: 'Vassivarvet', status: 'closed' }
  ],
  { ext: 'json' }
);

// The cross-country rows are <div>s with TWO .large-text cells - distance
// first, name second - so a parser that took the first would publish "~2,1 km"
// as a trail name. Guard that alongside the report date.
test('riksgransen trails should name the cross-country loops, not their length', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/riksgransen.json'), 'utf8'));
  const list = parse(body);
  assert.equal(list.length, 38);
  assert.equal(list.reportedAt, '2026-06-19T08:37:00.000Z');
  assert.equal(list.filter(t => /km/.test(t.name)).length, 0);
});
