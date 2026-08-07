import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/hochoetz/index.js';
import status from '../../lib/resorts/hochoetz/status.js';
import coerce from '../../lib/tools/coerce.js';
import lifts from '../lifts/index.js';

// The Wayback Machine has never archived sdds4.intermaps.com for region_id 593,
// so the fixture is a live August capture. The roster is complete year-round -
// the Skigebietsmanager keeps all fifteen lifts on the board rather than
// emptying it - and the summer sightseeing gondola H2 is genuinely running, so
// both status icons are exercised. That the board freezes rather than empties is
// exactly why this parser publishes reportedAt.
lifts('hochoetz', 'html', {
  'H2 – 8EUB Ochsengartenbahn': 'open',
  'H3 – 6SK Wetterkreuzbahn': 'closed',
  'H4 – 6SK Kühtailebahn': 'closed',
  'H5 – 4SK Brunnenkopfbahn': 'closed',
  'H6 – 2SB Mohrenkopfbahn': 'closed',
  'H7 – 2SB Balbachbahn': 'closed',
  '8 EUB Acherkogel': 'closed',
  'H8 – 2SB Acherkogelbahn II': 'closed',
  'H9 – SL Balbach Wiesenlift': 'closed',
  'H10 – SL Zirbenlift': 'closed',
  'H11 – SL Ötzilift': 'closed',
  'H12 – SL Weselelift': 'closed',
  'H13 – SL WIDI-Lift': 'closed',
  'H14 – WIDI-Band': 'closed',
  'H15 – Ötziband': 'closed'
});

// Status is an icon filename and nothing else. The two values are the ones the
// page's own Legend block labels 'open' and 'closed'; a bare '169'/'94' reaching
// coerce would be worse than unknown, since coerce reads '1' as open and '3' as
// closed.
test('hochoetz should map the status icon filenames', () => {
  const base = 'http://sdds4.intermaps.com/skigebietsmanager_template_settings/icons/status_icon_set_6';
  const mapped = Object.fromEntries(['169', '94'].map(icon => [icon, coerce(status(`${base}/${icon}.png`))]));
  assert.deepEqual(mapped, { 169: 'open', 94: 'closed' });
});

// The page prints 'Last Update: 07 August 2026 14:32:38' in resort-local wall
// clock. Europe/Vienna was on CEST (+02:00) that day.
test('hochoetz should publish the page timestamp', (_t, done) => {
  const filename = resolve(import.meta.dirname, 'example/hochoetz.html');
  createReadStream(filename).pipe(
    parser(parse, (err, ls) => {
      assert.ifError(err);
      assert.equal(ls.reportedAt, '2026-08-07T12:32:38.000Z');
      // non-enumerable, or stats.js would count it as a sixteenth lift
      assert.equal(Object.keys(ls).length, 15);
      done();
    })
  );
});
