import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/ober-mountain/index.js';
import lifts from '../lifts/index.js';

/*
 * Fixture: live capture 2026-08-11, after Ober replatformed away from the
 * Storyblok __NEXT_DATA__ payload the old parser read. Lift status is DERIVED
 * from the slopes each lift serves - Ober publishes no per-lift status.
 */
lifts('ober-mountain', 'html', {
  'Mighty Carpet': 'closed',
  'Ober Easy': 'closed',
  'Ober Challenge (Quad)': 'closed'
});

// The report is rendered twice, desktop (grid-cols-5) and mobile (grid-cols-3).
// Reading both would list every slope - and every lift's evidence - twice. Only
// the five-column variant is parsed; this pins that.
test('ober-mountain ignores the duplicate mobile layout', (_t, done) => {
  const desktop =
    '<div class="hidden grid-cols-5 lg:grid">' +
    '<div><span title="Beginner"></span> Cub Way</div>' +
    '<div>open <span title="Open"></span></div>' +
    '<div>Ober Easy</div><div>1,800</div><div>163</div></div>';
  const mobile =
    '<div class="grid grid-cols-3 lg:hidden">' +
    '<div><span title="Beginner"></span> Cub Way</div>' +
    '<div>open <span title="Open"></span></div>' +
    '<div>Ober Easy</div></div>';
  parseHtml(desktop + mobile, parse, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, { 'Ober Easy': 'open' }, 'one lift, not two rows of evidence');
    done();
  });
});

// The header row carries no difficulty dot, so it must not parse as a slope.
test('ober-mountain skips the column header', (_t, done) => {
  const header =
    '<div class="hidden grid-cols-5 lg:grid">' +
    '<div>Trail</div><div>Status</div><div>Lifts</div><div>Length</div><div>Vertical</div></div>';
  parseHtml(header, parse, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, {});
    done();
  });
});
