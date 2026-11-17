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
// product token, so the feed went empty (checked 2026-11-17). The plain token is now the global default.
test('tenney-mountain gets an agent the widget host accepts', async () => {
  const descriptor = JSON.parse(
    readFileSync(resolve(import.meta.dirname, '../../lib/resorts/tenney-mountain/resort.json'), 'utf8')
  );
  // the bare product token is now the global default, so no override is needed;
  // a re-added override must not bring the "compatible" form back
  const ua = descriptor.url.headers?.['User-Agent'];
  assert.ok(!ua?.includes('compatible'), 'an override must not contain "compatible"');
  delete process.env.LIFTIE_USER_AGENT;
  const { LIFTIE_USER_AGENT } = await import('../../lib/env.js');
  assert.ok(!(ua ?? LIFTIE_USER_AGENT).includes('compatible'), 'the agent sent must not contain "compatible"');
});
