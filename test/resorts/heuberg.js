import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/heuberg/index.js';
import lifts from '../lifts/index.js';

/*
 * /skigebiete/status-anlagen-pisten-wege/ as archived on 2026-02-10, midwinter.
 * One page carries all six Oberstdorf Kleinwalsertal sectors - 46 lifts, 98
 * pistes - and this parser must return only the nine rows tagged
 * data-berg="heuberg".
 *
 * Both of the network's German status words show up here: eight lifts read
 * 'in Betrieb' and the Schlößlelift reads 'außer Betrieb'. coerce.js knows
 * neither, so unmapped this would publish as nine 'scheduled' lifts.
 */
lifts('heuberg', 'html', {
  Parsennbahn: 'open',
  'Skikuli Parsen': 'open',
  Hubertuslift: 'open',
  Heubergbahn: 'open',
  Heubergmuldelift: 'open',
  Schöntallift: 'open',
  'Doppelsessellift Zaferna': 'open',
  'Förderband Schützabühl': 'open',
  Schlößlelift: 'closed'
});

test('heuberg reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/heuberg.html'), 'utf8');
  parseHtml(
    html,
    dom => parse(dom),
    (err, ls) => {
      assert.ifError(err);
      // 'Live-Status: 10.02.2026 09:54:44' in div.infotext.heuberg,
      // Europe/Vienna wall clock (CET in February)
      assert.equal(ls.reportedAt, '2026-02-10T08:54:44.000Z');
      // and it must not count as a tenth lift
      assert.equal(Object.keys(ls).length, 9);
      done();
    }
  );
});
