import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/mt-washington-bc/index.js';
import lifts from '../lifts/index.js';

/*
 * Fixture: live capture 2026-08-11, after the resort replatformed from Joomla
 * to WordPress. The old parser keyed on div.slope-grid-container and published
 * nothing for months while the mountain was running - this is summer bike-park
 * operation, which is real live data, not a stale winter board.
 */
lifts('mt-washington-bc', 'html', {
  'Eagle Quad': 'open',
  'Hawk 6 Pack': 'open'
});

// The pill for a closed row renders as an em dash, not the word "Closed", so a
// parser reading the pill TEXT hands coerce "—" and silently gets 'scheduled'.
// Status must come from the modifier class. This is the trap that would make a
// closed lift read as about to open.
test('mt-washington-bc reads status from the modifier class, not the pill text', (_t, done) => {
  const row = (name, mod, text) =>
    `<div class="pgri-clist__row"><span class="pgri-clist__name"> ${name} </span>` +
    `<span class="pgri-clist__pill pgri-clist__pill--${mod}">${text}</span></div>`;
  const html =
    '<div class="pgri-clist pgri-clist--lifts">' +
    row('Open Chair', 'open', 'Open') +
    row('Shut Chair', 'closed', '&mdash;') +
    row('Held Chair', 'hold', 'Hold') +
    row('Groomed Chair', 'groomed', 'Groomed') +
    '</div>';
  parseHtml(html, parse, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, {
      'Open Chair': 'open',
      'Shut Chair': 'closed',
      'Held Chair': 'hold',
      'Groomed Chair': 'open'
    });
    done();
  });
});
