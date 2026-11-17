import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/cherry-peak/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// 38 trails - 13 green, 13 blue, 12 black - matching the page's own
// "TRAILS OPEN 19 of 38" counter. Levels come from the section id, not the
// heading text, so they must all be present.
trails('cherry-peak', [
  {
    'name': 'Longmozy',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Sunscream',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Temptation',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Cheeky',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Clutch',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Eazy Cheezy',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Tree Haus',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Exito',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Bentley's Bypass",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Base Camp',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Linda's Legacy",
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Super D',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': "Bee's Knees",
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Chimney',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Square Root',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Edge',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Funnel',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Right Slip',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Wild Bill',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Gangway',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Narrows',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'True Blue',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Think Twice',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Gutsy',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Doubtful',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Sidestep',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Nightmare Alley',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Black Hole',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Stout Heart',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Yardsale',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Spine',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Nervy',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Risky Business',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Velocity',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Downfall',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Reconsider',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'The Beaz',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Blue Moon',
    'status': 'closed',
    'level': 'black'
  }
]);

// The parser drops a report older than 45 days (lib/tools/stale.js), so the
// clock is pinned to just after the fixture's own stamp (newest Wix _updatedDate 2026-03-07T15:15Z). `node --test`
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
const Pinned = pin('2026-03-08T12:00:00Z');
globalThis.Date = Pinned;

// On 2026-11-17 the live page still served this same report (3 of 4 lifts,
// 19 of 38 trails open); read outside the window it must publish nothing.
test('cherry-peak reports no trails once the report goes stale', async () => {
  globalThis.Date = pin('2026-11-17T12:00:00Z');
  try {
    const stale = await new Promise((res, rej) => {
      createReadStream(resolve(import.meta.dirname, 'example/cherry-peak.html')).pipe(
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
