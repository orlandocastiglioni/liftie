import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/catamount-outdoor/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// The capture (Trailforks region status, Jul 9 2026) is the default Mountain
// Bike report - the only one resort.json's URL gets - so nothing is published.
trails('catamount-outdoor', []);

// The same page reporting Nordic Ski (activitytype 13 selected) publishes its
// rows: the parser itself is unchanged, only gated on the activity.
const expected = [
  {
    'name': 'A-line Drop',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Access to Oval Loop For Parking',
    'status': 'open'
  },
  {
    'name': 'Applesauce',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Balsams',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Bear Run',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Black Bridge',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Black Bridge Cutoff',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Chameleon',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Cliffs Of Insanity',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Clover's Rollers",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Cow Path',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Coyote Turnpike',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Cyclocross Steps',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Deer Yard',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Dirt Jumps',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Dual Slalom Course',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Fred And Ethel',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Gap Jump A-line',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Getting Started',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Governor Chittenden Road',
    'status': 'open'
  },
  {
    'name': 'Gravy Train',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Gremlins',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Gully Whumper',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Hawk',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Hobbit Hole',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Labyrinth',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Liquid Velvet',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Mad Max',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Monster Berms',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Moose Poop',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Mullet',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Newt's Ridge",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': "Newt's Ridge",
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'North-South Trail',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Off The Wall',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Oval Connector',
    'status': 'open'
  },
  {
    'name': 'Oval Loop For Parking',
    'status': 'open'
  },
  {
    'name': "Pop's",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Pop's A-Line Drop",
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': "Pop's Connector",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Pop's Ledges",
    'status': 'open',
    'level': 'black'
  },
  {
    'name': "Pop's To Trout Lily",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Porcupine',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Powerline A-line',
    'status': 'closed',
    'level': 'doubleBlack'
  },
  {
    'name': 'Powerlines',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Pure Bliss',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Race A-line',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Ridge Run',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Rock Spine',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Sandmans',
    'status': 'open'
  },
  {
    'name': 'Sheep And Blackberry',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': 'Shovelhead',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Shovelhead alternate',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Slalom',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Sled Hill',
    'status': 'open'
  },
  {
    'name': 'Slick Rock',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Snow Shoe trail',
    'status': 'closed'
  },
  {
    'name': 'Snowshoe Trail',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Stonesteps',
    'status': 'open',
    'level': 'doubleBlack'
  },
  {
    'name': 'Sumacs',
    'status': 'open',
    'level': 'green'
  },
  {
    'name': "Taiga's Pines",
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'The Elbow',
    'status': 'open'
  },
  {
    'name': 'To The Dirt Jumps',
    'status': 'open'
  },
  {
    'name': 'Trout Lily',
    'status': 'open',
    'level': 'blue'
  },
  {
    'name': 'Twister',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Watermelon',
    'status': 'open',
    'level': 'black'
  },
  {
    'name': 'Wood drop line',
    'status': 'open',
    'level': 'doubleBlack'
  }
];

function parseWithActivity(value) {
  const html = readFileSync(resolve(import.meta.dirname, 'example/catamount-outdoor.html'), 'utf8')
    .replace('<option value="1" selected="selected">', '<option value="1">')
    .replace(`<option value="${value}">`, `<option value="${value}" selected="selected">`);
  return new Promise((ok, fail) =>
    parser(
      dom => collect(dom, descriptor),
      (err, list) => (err ? fail(err) : ok(list))
    ).end(html)
  );
}

test('catamount-outdoor: a Nordic Ski report publishes its rows', async () => {
  assert.deepEqual(await parseWithActivity('13'), expected);
});

test('catamount-outdoor: Winter Fat Bike is still a bike report', async () => {
  assert.deepEqual(await parseWithActivity('17'), []);
});
