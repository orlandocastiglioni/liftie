import assert from 'node:assert/strict';
import test from 'node:test';
import parseLoose from '../../lib/tools/fixjson.js';

test('well-formed json passes through strict parse', () => {
  assert.deepEqual(parseLoose('{"a": [1, 2]}'), { a: [1, 2] });
});

test('leading comma in an array is repaired', () => {
  // bolton valley admin-ajax idiom: excluded entries render as whitespace
  const body = '{"trails": [ \n , { "name": "Abenaki Trail", "statuses": ["Groomed", "Closed"] }]}';
  assert.deepEqual(parseLoose(body), {
    trails: [{ name: 'Abenaki Trail', statuses: ['Groomed', 'Closed'] }]
  });
});

test('comma runs and trailing commas are repaired', () => {
  const body = '{"lifts": [{"name": "Vista"}, , {"name": "Wilderness"}, ]}';
  assert.deepEqual(parseLoose(body), { lifts: [{ name: 'Vista' }, { name: 'Wilderness' }] });
});

test('hopeless input still throws', () => {
  assert.throws(() => parseLoose('<html>not json</html>'));
});
