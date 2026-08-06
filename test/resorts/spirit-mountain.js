import assert from 'node:assert/strict';
import test from 'node:test';
import parse from '../../lib/resorts/spirit-mountain/index.js';
import lifts from '../lifts/index.js';

// The parser drops a feed nobody has touched in 30 days, so these tests pin the
// clock to the day after the fixture's newest modified_gmt (2026-02-24).
// `node --test` gives each file its own process, so the override stays here.
const RealDate = Date;
const PINNED = '2026-02-25T12:00:00Z';
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : [PINNED]));
  }
  static now() {
    return RealDate.parse(PINNED);
  }
};

const fresh = '2026-02-24T18:00:00';

// fixture: live wp/v2/lift feed captured 2026-08-05 (x-wp-total: 5). The
// taxonomy is not reset at season end, so off-season the API confidently
// reports a fully open mountain - read here as of the day after its last edit,
// the fixture pins the lift set and the class_list-based status extraction.
lifts('spirit-mountain', 'json', {
  'Prospector Carpet': 'open',
  'Highline Chair': 'open',
  'Big Air Chair': 'open',
  'Lone Oak Tow Rope': 'open',
  'Spirit Express II': 'open'
});

// the four terms below are the complete `current-status` taxonomy
// (wp/v2/current-status). closed-for-race and closed-for-weather are absent
// from coerce.js and would silently become 'scheduled' without the mapping in
// lib/resorts/spirit-mountain/status.js; an untagged item must read closed too.
test('spirit-mountain maps the whole current-status vocabulary', () => {
  const item = (name, ...status) => ({
    title: { rendered: name },
    modified_gmt: fresh,
    class_list: ['lift', 'type-lift', 'status-publish', 'hentry', ...status]
  });
  assert.deepEqual(
    parse([
      item('Open', 'current-status-open'),
      item('Season', 'current-status-closed-for-season'),
      item('Race', 'current-status-closed-for-race'),
      item('Weather', 'current-status-closed-for-weather'),
      item('Untagged')
    ]),
    {
      'Open': 'open',
      'Season': 'closed',
      'Race': 'closed',
      'Weather': 'closed',
      'Untagged': 'closed'
    }
  );
});

// Spirit leaves every lift tagged `open` all summer. Without this the Pi would
// publish a fully open mountain in August, which is what the live feed says.
test('spirit-mountain reports nothing once the feed goes stale', () => {
  const item = (name, modified_gmt) => ({
    title: { rendered: name },
    modified_gmt,
    class_list: ['lift', 'current-status-open']
  });
  assert.deepEqual(parse([item('Highline Chair', '2026-01-01T12:00:00')]), {});
  // one recent edit anywhere in the payload is enough to trust the whole report
  assert.deepEqual(parse([item('Stale', '2026-01-01T12:00:00'), item('Edited', fresh)]), {
    Stale: 'open',
    Edited: 'open'
  });
});

// Fail open: if WordPress ever stops emitting modified_gmt we would rather
// republish a possibly-stale report than blank the mountain mid-season. See the
// rationale in lib/tools/stale.js.
test('spirit-mountain still publishes when the feed carries no timestamps', () => {
  assert.deepEqual(parse([{ title: { rendered: 'X' }, class_list: ['current-status-open'] }]), { X: 'open' });
  assert.deepEqual(parse([]), {});
});
