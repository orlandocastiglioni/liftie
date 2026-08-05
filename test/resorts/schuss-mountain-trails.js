import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/schuss-mountain/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// fixture: wayback capture of shantycreek.com/ski/conditions-cams/ from
// 2026-03-11, the only recent snapshot with a real open/closed mix
// (25 open / 17 closed across the 42 rows the page's own counter reports).
trails('schuss-mountain', [
  {
    'name': 'Elf Buster',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Elf Buster II',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Boulevard',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Village Way',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Over',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Under',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Purple Daze',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Natty Glades',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Concourse',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Chick's Choice",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Mellow Yellow Terrain Park',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': "King's Canyon",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Good Knight',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Sarajevo',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Goosebumps',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Queen's Corner",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Belle's Bottom",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Dungeon's Dip",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Pink Schussycat',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Double Dip',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Sapporo',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Ivan's Alley",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Suprise',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Kingdom Come',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Low Rider',
    'status': 'open',
    'level': 'terrainPark'
  },
  {
    'name': 'Bigford’s Bluebird Day',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Java',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Espresso',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'River Run',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Hunchback',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': "Brent's Paradise",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Kershner’s Red Hot Sauce',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Nagano',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': "Sally's Alley",
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Run, Forster, Run',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Forest Jump Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Snowbourn Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Torino Glades',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Little Red Riding Woods',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': "Sally's Valley Glades",
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Red Fox',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Salsa',
    'status': 'closed',
    'level': 'black'
  }
]);

// the same table reports "Making Snow" while the hill is coming online
// (2025-12-09 capture). coerce.js does not know that token and would turn it
// into 'scheduled'; these rows are excerpted verbatim from that capture.
const earlySeason = `<section class="module conditions-schuss mountain-details" id="schussmtn">
  <table class="trail-table">
    <tbody>
      <tr><td class="mc">Magic Carpet</td><td>Elf Buster</td><td>Closed</td><td class="diff"><img src="/img/icn_green.png" alt="green"/></td></tr><tr><td class="mc">Magic Carpet</td><td>Elf Buster II</td><td>Making Snow</td><td class="diff"><img src="/img/icn_green.png" alt="green"/></td></tr>
    </tbody>
  </table>
</section>`;

test('schuss-mountain trails treat "Making Snow" as closed', (_t, done) => {
  parseHtml(
    earlySeason,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [
        { name: 'Elf Buster', status: 'closed', level: 'green' },
        { name: 'Elf Buster II', status: 'closed', level: 'green' }
      ]);
      done();
    }
  );
});
