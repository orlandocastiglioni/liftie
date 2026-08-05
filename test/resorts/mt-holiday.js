import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/mt-holiday/index.js';
import lifts from '../lifts/index.js';

// the "Mt. Holiday Snow Report" Google Doc (/mobilebasic), captured 2026-08-05:
// 5 lifts under the "Lift Status" heading, all chips Closed out of season
lifts('mt-holiday', 'html', {
  'Blue Chairlift': 'closed',
  'Yellow Chairlift': 'closed',
  'Tucker’s Tow': 'closed',
  'Tube Towlift': 'closed',
  'Double tow': 'closed'
});

// no in-season capture of the doc exists (Google Docs serves only the current
// revision and the Wayback Machine only has the JS /edit page), so cover the
// open chip and the December-2025 wording, which had no "- Services" suffix
test('mt-holiday should read an open chip and a bare lift line', (_t, done) => {
  const doc = `<div class="doc-content">
    <p><span style="color:#234a71">Lift Status</span></p>
    <ul class="lst-kix_d01bzh9me83u-0 start">
      <li><span style="color:#0000ee;text-decoration:underline">Open</span><span> Blue Chairlift - Services\u{1F7E2}\u{1F7E6}\u{2BC1}</span></li>
      <li><span style="color:#0000ee;text-decoration:underline">Closed</span><span> Yellow Chairlift</span></li>
    </ul></div>`;
  parseHtml(doc, parse, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, { 'Blue Chairlift': 'open', 'Yellow Chairlift': 'closed' });
    done();
  });
});
