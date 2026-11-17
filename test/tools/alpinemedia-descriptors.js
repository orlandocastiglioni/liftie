import assert from 'node:assert/strict';
import test from 'node:test';
import dartmouth from '../../lib/resorts/dartmouth-skiway/resort.json' with { type: 'json' };
import middlebury from '../../lib/resorts/middlebury-snowbowl/resort.json' with { type: 'json' };
import tyrol from '../../lib/resorts/tyrol-basin/resort.json' with { type: 'json' };

// The token variable is ALPINEMEDIA_TOKEN_<org slug, upper-cased, dashes as
// underscores>; no descriptor may carry a token value itself.
test('alpinemedia descriptors name their token variable and carry no token', () => {
  for (const [resort, org] of [
    [tyrol, 'tyrol-basin'],
    [dartmouth, 'dartmouth-skiway'],
    [middlebury, 'middlebury-snowbowl']
  ]) {
    const variable = `ALPINEMEDIA_TOKEN_${org.toUpperCase().replace(/-/g, '_')}`;
    for (const url of [resort.api, resort.trails]) {
      assert.deepEqual(url.headers, { 'X-Alpine-Org': org });
      assert.deepEqual(url.envHeaders, { 'X-Alpine-API-Token': variable });
    }
  }
});
