import assert from 'node:assert/strict';
import test from 'node:test';
import collect from '../../lib/trails/parse.js';

/*
 * `level` is liftie's normalised four-value scale; `grade` is the source's own
 * word, published verbatim so a consumer can render the real local scale.
 *
 * Normalising a European resort always loses something: green/blue/red/black is
 * five grades once a double-black appears, against liftie's four. Baqueira has
 * to collapse `negra` and `doble-negra`; a three-tier hill maps its red onto
 * black, which is indistinguishable from a genuine black. Carrying the raw word
 * makes that recoverable downstream instead of thrown away here.
 *
 * grade is optional and purely additive - a parser that sets none is unchanged.
 */

const rows = list => collect(null, () => list);

test('grade passes through untouched next to the normalised level', () => {
  assert.deepEqual(rows([{ name: 'Aigle', status: 'open', level: 'black', grade: 'rouge' }]), [
    { name: 'Aigle', status: 'open', level: 'black', grade: 'rouge' }
  ]);
});

test('grade keeps two runs distinct where level cannot', () => {
  // the exact case Baqueira hits: two source grades, one liftie level
  const out = rows([
    { name: 'Escornacrabes', status: 'open', level: 'doubleBlack', grade: 'negra' },
    { name: 'Tubo Nere', status: 'open', level: 'doubleBlack', grade: 'doble-negra' }
  ]);
  assert.equal(out[0].level, out[1].level, 'the normalised reading collapses them');
  assert.notEqual(out[0].grade, out[1].grade, 'the source grade still tells them apart');
});

test('grade is optional - a parser that sets none publishes none', () => {
  const out = rows([{ name: 'Meadow', status: 'open', level: 'green' }]);
  assert.deepEqual(out, [{ name: 'Meadow', status: 'open', level: 'green' }]);
  assert.ok(!('grade' in out[0]));
});

test('grade is independent of level - it survives an unmappable level', () => {
  // 'red' is not in normalizeLevel, so level is dropped; grade must not be
  const out = rows([{ name: 'Rossa', status: 'open', level: 'red', grade: 'rosso' }]);
  assert.equal(out[0].level, undefined);
  assert.equal(out[0].grade, 'rosso');
});

test('grade is trimmed and stringified, never coerced into a status', () => {
  const out = rows([{ name: 'Blau', status: 'closed', grade: '  blau \n' }]);
  assert.equal(out[0].grade, 'blau');
  assert.equal(out[0].status, 'closed');
});
