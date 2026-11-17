import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

delete process.env.LIFTIE_USER_AGENT;
const { LIFTIE_USER_AGENT } = await import('../lib/env.js');
const { USER_AGENT: BAQUEIRA } = await import('../lib/resorts/baqueira-beret/zones.js');

const PLAIN = 'IndiePeaks-lift-status/1.0 (+https://orlandocc.me/indiepeaks)';

test('user agent: the default is the plain honest agent', () => {
  assert.equal(LIFTIE_USER_AGENT, PLAIN);
});

function overrides() {
  const dir = resolve(import.meta.dirname, '../lib/resorts');
  const found = [];
  for (const id of readdirSync(dir)) {
    const resort = JSON.parse(readFileSync(resolve(dir, id, 'resort.json'), 'utf8'));
    for (const [key, value] of Object.entries(resort)) {
      const ua = value?.headers?.['User-Agent'];
      if (ua) {
        found.push({ id, key, ua });
      }
    }
  }
  return found;
}

test('user agent: no resort repeats the default as an override', () => {
  assert.deepEqual(
    overrides().filter(o => o.ua === PLAIN),
    []
  );
});

test('user agent: every override still names us - no spoofed browser agents', () => {
  for (const o of overrides()) {
    assert.match(o.ua, /IndiePeaks-lift-status\/1\.0; \+https:\/\/orlandocc\.me\/indiepeaks/, `${o.id}.${o.key}`);
  }
  assert.match(BAQUEIRA, /IndiePeaks-lift-status/);
});
