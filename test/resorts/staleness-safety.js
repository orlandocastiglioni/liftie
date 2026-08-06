import assert from 'node:assert/strict';
import { createReadStream, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import { STALE_AFTER_DAYS } from '../../lib/tools/stale.js';
import collectTrails from '../../lib/trails/parse.js';

/*
 * Cross-resort guard for the staleness gates.
 *
 * Suppressing a summer-stale report is the easy half. The half that matters is
 * that a gate must never blank a resort during its season, and must never turn
 * "we don't know" into "everything is closed". Every gated resort is checked
 * here against its own WINTER fixture at three moments:
 *
 *   the day after the report   -> full data
 *   STALE_AFTER_DAYS - 1 later -> STILL full data (a long in-season gap)
 *   a season later             -> no rows, and specifically no 'closed' claims
 *
 * Add a resort here whenever you add a gate. Numbers come from the resort's own
 * fixture, so a parser change that quietly empties a report fails this too.
 */

const DAY = 86400000;
const iso = ms => new Date(ms).toISOString();

function pin(iso) {
  const RealDate = Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [iso]));
    }
    static now() {
      return RealDate.parse(iso);
    }
  };
  return () => {
    globalThis.Date = RealDate;
  };
}

// synchronous callers only
function withClock(iso, fn) {
  const restore = pin(iso);
  try {
    return fn();
  } finally {
    restore();
  }
}

function html(name) {
  return resolve(import.meta.dirname, `example/${name}.html`);
}

// the clock has to stay pinned until the stream finishes, not just until the
// promise is constructed - restoring early lets the parser read the real date
async function parseAt(when, file, run) {
  const restore = pin(when);
  try {
    return await new Promise((res, rej) => createReadStream(file).pipe(parser(run, (e, v) => (e ? rej(e) : res(v)))));
  } finally {
    restore();
  }
}

// reportedAt: the date the fixture's own report carries
const HTML_CASES = [
  {
    id: 'arctic-valley',
    fixture: 'arctic-valley',
    reportedAt: '2026-02-15T12:00:00Z',
    lifts: 4,
    trails: 0
  },
  {
    id: 'beaver-mountain',
    fixture: 'beaver-mountain',
    reportedAt: '2026-03-27T12:00:00Z',
    lifts: 6,
    trails: 48
  }
];

for (const c of HTML_CASES) {
  const { default: liftParse } = await import(`../../lib/resorts/${c.id}/index.js`);
  let trailParse;
  try {
    ({ default: trailParse } = await import(`../../lib/resorts/${c.id}/trails.js`));
  } catch {
    trailParse = undefined;
  }
  const at = ms => iso(Date.parse(c.reportedAt) + ms);

  test(`${c.id}: publishes in full the day after the report`, async () => {
    const lifts = await parseAt(at(DAY), html(c.fixture), liftParse);
    assert.equal(Object.keys(lifts).length, c.lifts);
  });

  test(`${c.id}: survives a ${STALE_AFTER_DAYS - 1} day in-season gap`, async () => {
    const when = at((STALE_AFTER_DAYS - 1) * DAY);
    const lifts = await parseAt(when, html(c.fixture), liftParse);
    assert.equal(Object.keys(lifts).length, c.lifts, 'lifts must not be blanked mid-season');
    if (trailParse) {
      const trails = await parseAt(when, html(c.fixture), dom => collectTrails(dom, trailParse));
      assert.equal(trails.length, c.trails, 'trails must not be blanked mid-season');
    }
  });

  test(`${c.id}: a season-old report yields no rows, not closed ones`, async () => {
    const when = at(200 * DAY);
    const lifts = await parseAt(when, html(c.fixture), liftParse);
    assert.deepEqual(lifts, {}, 'suppressed lifts must be absent, never reported closed');
    if (trailParse) {
      const trails = await parseAt(when, html(c.fixture), dom => collectTrails(dom, trailParse));
      assert.deepEqual(trails, [], 'suppressed trails must be absent, never reported closed');
    }
  });
}

// spirit-mountain is a JSON feed rather than a page, so it is driven directly
// the two feeds carry different newest-edit dates (lifts 2026-02-24, trails
// 2026-04-09), so each is measured from its own, not from a shared date
const SPIRIT = [
  { file: 'example/spirit-mountain.json', reportedAt: '2026-02-24T18:39:46Z', count: 5, kind: 'lifts' },
  { file: 'example/spirit-mountain-trails.json', reportedAt: '2026-04-09T13:38:11Z', count: 23, kind: 'trails' }
];

{
  const { default: liftParse } = await import('../../lib/resorts/spirit-mountain/index.js');
  const { default: trailParse } = await import('../../lib/resorts/spirit-mountain/trails.js');
  const load = f => JSON.parse(readFileSync(resolve(import.meta.dirname, f), 'utf8'));
  const size = (kind, out) => (kind === 'lifts' ? Object.keys(out).length : out.length);

  for (const s of SPIRIT) {
    const run = s.kind === 'lifts' ? liftParse : trailParse;
    const at = ms => iso(Date.parse(s.reportedAt) + ms);

    test(`spirit-mountain ${s.kind}: publishes in full the day after the newest edit`, () => {
      withClock(at(DAY), () => assert.equal(size(s.kind, run(load(s.file))), s.count));
    });

    test(`spirit-mountain ${s.kind}: survives a ${STALE_AFTER_DAYS - 1} day gap with no edits`, () => {
      withClock(at((STALE_AFTER_DAYS - 1) * DAY), () =>
        assert.equal(size(s.kind, run(load(s.file))), s.count, 'a quiet month must not blank the mountain')
      );
    });

    test(`spirit-mountain ${s.kind}: a season-old feed yields no rows, not closed ones`, () => {
      withClock(at(200 * DAY), () => assert.deepEqual(run(load(s.file)), s.kind === 'lifts' ? {} : []));
    });
  }
}
