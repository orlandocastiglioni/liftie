import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import lifts from '../lifts/index.js';

lifts('ski-sawmill', 'html', {
  'Paul Bunyan Double': 'closed',
  'Triple Chair Lift': 'closed',
  'Lumberjack T-Bar': 'closed',
  'White Birch T-Bar': 'closed'
});

// skisawmill.com resets the connection (HTTP/2 PROTOCOL_ERROR, or an empty
// reply over HTTP/1.1) for the default LIFTIE_USER_AGENT ("Mozilla/5.0
// (compatible; IndiePeaks-lift-status/...)") and for a Chrome 126 UA, so the
// feed went empty (checked 2026-11-17). The bare product token is accepted.
test('ski-sawmill overrides the User-Agent the site rejects', () => {
  const descriptor = JSON.parse(
    readFileSync(resolve(import.meta.dirname, '../../lib/resorts/ski-sawmill/resort.json'), 'utf8')
  );
  const ua = descriptor.url.headers?.['User-Agent'];
  assert.ok(ua, 'url.headers.User-Agent is set');
  assert.ok(!ua.includes('compatible'), 'the override must not contain "compatible"');
});
