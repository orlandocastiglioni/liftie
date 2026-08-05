import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/whaleback-mountain/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

trails('whaleback-mountain', [
  {
    name: 'Learning Area',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Lower Ivory Run',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Upper Ivory Run',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Dorsal',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Flipper',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Scrimshaw',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Upper Whaletail',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Lower Whaletail',
    status: 'closed',
    level: 'green'
  },
  {
    name: 'Spout',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Bougainvillea',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Rib Cage',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Fluke',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Jonahs Revenge',
    status: 'closed',
    level: 'blue'
  },
  {
    name: "Davey Jones' Locker",
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Leviathan',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Blubber',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Whaleback',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Fin',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'Ambergris',
    status: 'closed',
    level: 'blue'
  },
  {
    name: 'The Barnacles 🌲',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Belly-Up🌲',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Beluga 🌲',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Harpoon 🌲',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Canyon',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Lower Face',
    status: 'closed',
    level: 'black'
  },
  {
    name: 'Upper Face',
    status: 'closed',
    level: 'doubleBlack'
  },
  {
    name: 'Jawbone',
    status: 'closed',
    level: 'doubleBlack'
  },
  {
    name: 'Blow Hole (bottom half)',
    status: 'closed',
    level: 'doubleBlack'
  },
  {
    name: 'Y.O.O.Y.M. 🌲',
    status: 'closed',
    level: 'doubleBlack'
  },
  {
    name: 'Kraken 🌲 upper /lower',
    status: 'closed',
    level: 'doubleBlack'
  },
  {
    name: 'HIKE PARK',
    status: 'closed',
    level: 'doubleBlack'
  }
]);

// advanced and expert are in-cell Google-hosted images whose ids rotate, so
// the parser resolves them against the legend rows of the same sheet - this
// checks that a fresh pair of ids still lands on black / doubleBlack
test('whaleback-mountain trails resolve rotated rating images', (_t, done) => {
  const img = id => `<div><img src="https://docs.google.com/sheets-images-rt/${id}=w74-h20"></div>`;
  const rows = [
    ['Rating', '', 'Open', 'Lighted Trails', 'Groomed', 'Notes'],
    ['🟢', 'Learning Area', 'O', 'L', 'G', ''],
    ['🟦', 'Spout', 'X', 'L', 'G', ''],
    [img('ROTATED-ADVANCED'), 'Canyon', 'R', 'L', '', ''],
    [img('ROTATED-EXPERT'), 'Jawbone', 'X', 'X', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Lifts', 'Open', 'Notes', '', ''],
    ['', 'Summit Chair', 'X', '', '', ''],
    ['', 'Key', '', '', '', ''],
    [img('ROTATED-EXPERT'), 'Expert', '', '', '', ''],
    [img('ROTATED-ADVANCED'), 'Advanced', '', '', '', ''],
    ['🟦', 'Intermediate ', '', '', '', ''],
    ['🟢', 'Beginner', '', '', '', ''],
    ['🌲', 'Glades', '', '', '', '']
  ];
  const html = `<table><tbody>${rows
    .map(row => `<tr><th>x</th>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      assert.deepEqual(list, [
        { name: 'Learning Area', status: 'open', level: 'green' },
        { name: 'Spout', status: 'closed', level: 'blue' },
        { name: 'Canyon', status: 'closed', level: 'black' },
        { name: 'Jawbone', status: 'closed', level: 'doubleBlack' }
      ]);
      done();
    }
  );
});
