import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/dog-creek-lodge-nordic-center/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// Wayback capture of the Nordic Pulse area page from 22 Jan 2026 (mid-season):
// the full 26-trail network, none hidden, none hazarded. Dog Creek never flips
// its trails to closed - the live feed still reads 26/26 open in August - so
// every row here is open by the operator's own reporting, not a parser default.

trails('dog-creek-lodge-nordic-center', [
  {
    'name': 'Terrier Trail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Lower Grizzly',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Unnamed Trails',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Eagle Point',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Bernese Meadow',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Treehouse Loop',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Lower Treehouse',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper Treehouse',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Middle Meadow',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Bear Paw Bypass',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Pyrenees Path',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Moose Meadow',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Sneaking Wolf',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Dog Lake Trail',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Great Northern Trail',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Valley Overlook',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Moose Tracks',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper Grizzly',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Lab Lane',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper Stillwater',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Dog Mountain',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Sow's Secret",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Cub Cutoff',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Upper Stillwater to Dog Lake',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Beaver Lodge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Ice Fisher's Loop",
    'status': 'open',
    'level': 'green'
  }
]);

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp (newest grooming 2026-01-22). `node --test`
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
const Pinned = pin('2026-01-23T12:00:00Z');
globalThis.Date = Pinned;

// Dog Creek never clears its open flags: on 2026-11-17 all 25 trails still read
// open, last groomed 2026-03-16. Once grooming is that old it must publish nothing.
test('dog-creek-lodge-nordic-center reports no trails once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/dog-creek-lodge-nordic-center.html')).pipe(
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
