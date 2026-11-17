import assert from 'node:assert/strict';
import test from 'node:test';
import makeParse from '../../lib/lifts/parse.js';
import { parseHtml } from '../../lib/lifts/parser.js';
import lifts from '../lifts/index.js';

lifts('waterville', 'html', {
  'Exhibition Poma': 'open',
  'Green Peak Triple': 'open',
  'High Country': 'open',
  'Lower Meadows': 'open',
  'Lower Pasture Carpet': 'open',
  'Northside': 'closed',
  'Sunny Side': 'closed',
  'Tecumseh Express': 'open',
  'Upper Pasture Carpet': 'closed',
  'Valley Run Quad': 'open',
  'World Cup T-Bar': 'closed'
});

// live page 2026-11-17 (pre-season, everything closed; main/ only). The poma
// is now "Exhibition T-Bar" and World Cup T-Bar is no longer listed.
lifts(
  'waterville',
  'html',
  {
    'Exhibition T-Bar': 'closed',
    'Green Peak Triple': 'closed',
    'High Country': 'closed',
    'Lower Meadows': 'closed',
    'Lower Pasture Carpet': 'closed',
    'Northside': 'closed',
    'Sunny Side': 'closed',
    'Tecumseh Express': 'closed',
    'Upper Pasture Carpet': 'closed',
    'Valley Run Quad': 'closed'
  },
  { example: 'waterville-2026-11' }
);

// the propsnow legend labels pti-hold "Wind Delay" and pti-hold-check "On
// Hold"; the screen-reader label "Wind Delay" is not a coerce token, so the
// status must come from the icon. Rows follow the live markup with the icon
// and label swapped in.
const holds = `<section class="SnowReport-section SnowReport-section--lifts"><div class="SnowReport-features">
<article class="SnowReport-Lift SnowReport-feature"><h3 class="SnowReport-feature-title">Sunny Side</h3><div class="SnowReport-feature-icons"><span class="SnowReport-feature-icon SnowReport-item-type"><i class="pti pti-triple"  aria-hidden="true"></i><span class="SnowReport-sr-label">Triple</span></span><span class="SnowReport-feature-icon SnowReport-item-status"><i class="pti pti-hold"  aria-hidden="true"></i><span class="SnowReport-sr-label">Wind Delay</span></span></div></article>
<article class="SnowReport-Lift SnowReport-feature"><h3 class="SnowReport-feature-title">Northside</h3><div class="SnowReport-feature-icons"><span class="SnowReport-feature-icon SnowReport-item-type"><i class="pti pti-double"  aria-hidden="true"></i><span class="SnowReport-sr-label">Double</span></span><span class="SnowReport-feature-icon SnowReport-item-status"><i class="pti pti-hold-check"  aria-hidden="true"></i><span class="SnowReport-sr-label">On Hold</span></span></div></article>
</div></section>`;

test('waterville lifts read wind delay and on hold as hold', async () => {
  const parse = await makeParse('waterville');
  const status = await new Promise((resolve, reject) =>
    parseHtml(holds, parse, (err, s) => (err ? reject(err) : resolve(s)))
  );
  assert.deepEqual(status, { 'Sunny Side': 'hold', 'Northside': 'hold' });
});
