import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/tools/nordic-pulse.js';
import collect from '../../lib/trails/parse.js';

// shared parser for every nordic-pulse.com area (rikert, manning-park-xc,
// and the expansion nordic clubs). The 403 data-npww feed is server-rendered
// into script#ng-state on the ?embed=true page; we read it back from there.
const fixture = resolve(import.meta.dirname, '../resorts/example/nordic-pulse-embed.html');

test('nordic-pulse: extracts trails from the ng-state data-npww blob', (_t, done) => {
  const html = readFileSync(fixture, 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [
        { name: 'Meadow Loop', status: 'open', level: 'green' },
        { name: 'River Run', status: 'closed', level: 'blue' },
        { name: 'Summit Trail', status: 'hold', level: 'black' },
        { name: 'Expert Glade', status: 'open', level: 'doubleBlack' }
      ]);
      done();
    }
  );
});

test('nordic-pulse: reads the compact TransferState shape served since 2026-09-25', (_t, done) => {
  // Angular's compact keys (u/b/s/st/h/rt) and the /data-npw path. The area
  // metadata entry sits beside it and carries no trails; it must not be picked
  // even though its URL shares the /v3/ski-areas/<id> prefix.
  const state = {
    1: {
      b: { _id: 'x', seasonSwitch: null, season: 'winter' },
      h: {},
      s: 200,
      st: 'OK',
      u: 'https://api.nordic-pulse.com/v3/ski-areas/US-VT-Test?project=npw',
      rt: 'json'
    },
    2: {
      b: {
        trails: [
          { names: { en: 'Holland' }, open: false, 'piste:difficulty': 'easy' },
          { names: { en: 'Tormondsen' }, open: true, hazard: false, hide: false, 'piste:difficulty': 'intermediate' },
          { names: { en: 'Tormondsen Spur' }, open: true, hide: true }
        ],
        markers: []
      },
      h: {},
      s: 200,
      st: 'OK',
      u: 'https://api.nordic-pulse.com/v3/ski-areas/US-VT-Test/data-npw',
      rt: 'json'
    }
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [
        { name: 'Holland', status: 'closed', level: 'green' },
        { name: 'Tormondsen', status: 'open', level: 'blue' }
      ]);
      done();
    }
  );
});

test('nordic-pulse: hidden sub-segments are dropped, not listed as trails', (_t, done) => {
  // Trapp and Great Glen publish internal segments ("Haul Road Lower") next to
  // the parent route ("Haul Road"); nordic-pulse's own UI hides them.
  const state = {
    x: {
      url: 'https://api2.nordic-pulse.com/data-npww',
      body: {
        trails: [
          { names: { en: 'Haul Road' }, open: true, 'piste:difficulty': 'intermediate' },
          { names: { en: 'Haul Road Lower' }, open: true, 'piste:difficulty': 'intermediate', hide: true },
          { names: { en: 'Haul Road Upper' }, open: false, 'piste:difficulty': 'intermediate', hide: true }
        ]
      }
    }
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [{ name: 'Haul Road', status: 'open', level: 'blue' }]);
      done();
    }
  );
});

test('nordic-pulse: no ng-state yields an empty list, not a throw', (_t, done) => {
  parseHtml(
    '<html><body>nope</body></html>',
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, []);
      done();
    }
  );
});

test('nordic-pulse: dates the report from the area grooming record', (_t, done) => {
  // clubs set `open` by hand and many never clear it at season end, so the flag
  // alone cannot date the report. Grooming is the activity signal, taken at AREA
  // level and published only as a date - never folded into a trail's status.
  const state = {
    x: {
      url: 'https://api2.nordic-pulse.com/data-npww',
      body: {
        trails: [
          { names: { en: 'A' }, open: true, lastGroomed: '2026-03-01T09:00:00.000Z' },
          { names: { en: 'B' }, open: true, lastGroomedTrackSet: '2026-03-09T07:30:00.000Z' },
          { names: { en: 'C' }, open: false, lastGroomed: '2026-01-11T06:00:00.000Z' }
        ]
      }
    }
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-03-09T07:30:00.000Z', 'newest grooming anywhere in the area');
      assert.equal(list.length, 3, 'grooming must not change which trails are listed');
      assert.deepEqual(
        list.map(t => t.status),
        ['open', 'open', 'closed'],
        'grooming must never override a trail status'
      );
      done();
    }
  );
});

test('nordic-pulse: an area with no grooming record carries no date', (_t, done) => {
  const state = {
    x: { url: 'https://api2.nordic-pulse.com/data-npww', body: { trails: [{ names: { en: 'A' }, open: true }] } }
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, undefined);
      assert.equal(list.length, 1, 'no date must not suppress the rows');
      done();
    }
  );
});

test('nordic-pulse: hazard marks an open trail, it never reopens a closed one', (_t, done) => {
  // Nordic Pulse: "Trail is open but hazards exist". Sovereign Lake sets the
  // flag on every trail early season, closed ones included.
  const state = {
    x: {
      u: 'https://api.nordic-pulse.com/v3/ski-areas/BC-Test/data-npw',
      b: {
        trails: [
          { names: { en: 'Early Season Loop' }, open: true, hazard: true },
          { names: { en: 'World Cup' }, open: false, hazard: true },
          { names: { en: 'Meadow' }, open: false, hazard: false }
        ]
      }
    }
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(
        list.map(t => t.status),
        ['hold', 'closed', 'closed']
      );
      done();
    }
  );
});

test('nordic-pulse: the area record dates the report when no trail carries a date', (_t, done) => {
  // Trapp, Woodstock and Telemark log grooming against waypoints: every trail
  // holds only the 2021-01-08 placeholder, the area record the real date. The
  // sibling /ski-areas/status and /ski-areas/static lists share the URL prefix
  // and must not be read as this area.
  const meta = (u, b) => ({ u, b, h: {}, s: 200, st: 'OK', rt: 'json' });
  const state = {
    1: meta('https://api.nordic-pulse.com/v3/ski-areas/status?project=npw', [
      { clubId: 'XX-Other', lastGroomed: '2026-11-16T00:00:00.000Z' }
    ]),
    2: meta('https://api.nordic-pulse.com/v3/ski-areas/US-VT-Test?project=npw', {
      _id: 'US-VT-Test',
      lastGroomed: '2026-03-30T13:34:06.000Z'
    }),
    3: meta('https://api.nordic-pulse.com/v3/ski-areas/US-VT-Test/data-npw', {
      trails: [{ names: { en: 'A' }, open: false, lastGroomedTrackSet: '2021-01-08T15:36:05.000Z' }]
    })
  };
  parseHtml(
    `<html><body><script id="ng-state" type="application/json">${JSON.stringify(state)}</script></body></html>`,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.equal(list.reportedAt, '2026-03-30T13:34:06.000Z');
      done();
    }
  );
});
