import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import lifts from '../lifts/index.js';

lifts('tenney-mountain', 'html', {
  'Eclipse Triple Chairlift': 'open',
  'Hornet Double Chairlift': 'open',
  'Platter Pull': 'open',
  'Towpro': 'open'
});

// skitenney.propapps.io answers Cloudflare 520 to the default LIFTIE_USER_AGENT
// ("Mozilla/5.0 (compatible; IndiePeaks-lift-status/...)") but 200 to the bare
// product token, so the feed went empty (checked 2026-11-17). Keep the override.
test('tenney-mountain overrides the User-Agent the widget host rejects', () => {
  const descriptor = JSON.parse(
    readFileSync(resolve(import.meta.dirname, '../../lib/resorts/tenney-mountain/resort.json'), 'utf8')
  );
  const ua = descriptor.url.headers?.['User-Agent'];
  assert.ok(ua, 'url.headers.User-Agent is set');
  assert.ok(!ua.includes('compatible'), 'the override must not contain "compatible"');
});
