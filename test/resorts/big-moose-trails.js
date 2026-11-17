import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/big-moose/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

trails('big-moose', [
  {
    'name': 'Canada Falls',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Lower Fitzgerald',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Moxie',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Upper Fitzgerald',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Beginner Hill',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Bog Brook',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Carry Brook',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Chase Rapids',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Eagle Stream',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Kennebec',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Lower Penobscot',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Rip Gorge (Lift Line)',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Squaw Brook',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'St Francis',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Allagash',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Roach',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Wilson Falls',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Wilson Stream',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Alley Way',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Exterminator',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Leadbetter',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'St John',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Upper Penobscot',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'East Branch',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'St Croix',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Moose River',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Piscataquis (The Cat)',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Terrain Park',
    'status': 'open',
    'level': 'terrainPark'
  }
]);

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp ("Last Updated : 03/28/26"). `node --test`
// gives each file its own process, so the override stays here.
const RealDate = Date;
const pin = iso =>
  class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [iso]));
    }
    static now() {
      return RealDate.parse(iso);
    }
  };
const Pinned = pin('2026-03-29T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page still served this same 03/28/26 report (Triple Chair
// OPEN, 6 runs open); read outside the window it must publish nothing.
test('big-moose reports no trails once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/big-moose.html')).pipe(
        parser(
          dom => collect(dom, descriptor),
          (e, v) => (e ? rej(e) : res(v))
        )
      );
    });
    assert.deepEqual(stale, []);
  } finally {
    globalThis.Date = Pinned;
  }
});
