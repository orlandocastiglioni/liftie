import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/arctic-valley/index.js';

/*
 * Bespoke rather than the shared lifts() helper because this parser is
 * time-dependent: Arctic Valley never clears the report at the end of the
 * season, so the parser drops one older than three weeks. Each case pins the
 * clock so the fixtures keep asserting the same thing forever.
 */
function lifts(fixture, today) {
  const filename = resolve(import.meta.dirname, `example/${fixture}.html`);
  return new Promise((res, rej) => {
    const RealDate = Date;
    globalThis.Date = class extends RealDate {
      constructor(...args) {
        super(...(args.length ? args : [today]));
      }
    };
    createReadStream(filename).pipe(
      parser(parse, (err, status) => {
        globalThis.Date = RealDate;
        return err ? rej(err) : res(status);
      })
    );
  });
}

// arctic-valley.html: Wayback 2026-02-16, the h2 form of the "Lift Status"
// block, all four lifts published as operating hours (10:30-5:00 x3,
// 12:00-4:30). A time range is not a status coerce.js knows, so the parser
// maps it to open. Report stamped "Sunday February 15th", read the next day.
test('arctic-valley reads lift hours while the report is current', async () => {
  assert.deepEqual(await lifts('arctic-valley', '2026-02-16T09:00:00Z'), {
    'Handle Tow': 'open',
    'T-bar': 'open',
    'Chair 1': 'open',
    'Chair 2': 'open'
  });
});

// the live page moved the same content into <details><summary>• Lift Status,
// and Chair 1 reads "On wind hold" - which normalizes to `onwindhold` and
// would coerce to 'scheduled' without the parser's own mapping. Report stamped
// "Saturday May 2nd", read the next day.
test('arctic-valley maps "On wind hold" to hold, not scheduled', async () => {
  assert.deepEqual(await lifts('arctic-valley-details', '2026-05-03T09:00:00Z'), {
    'Handle Tow': 'open',
    'T-bar': 'open',
    'Chair 1': 'hold',
    'Chair 2': 'open'
  });
});

// the same May 2nd page read in August - which is exactly what the Pi would
// fetch today. Those hours are last season's; publishing them would show three
// lifts spinning in the Alaskan summer.
test('arctic-valley reports nothing once the report goes stale', async () => {
  assert.deepEqual(await lifts('arctic-valley-details', '2026-08-05T09:00:00Z'), {});
});

// the block is new - it is absent from the 2025-12, 2026-01 and 2026-02-01
// captures, where lift info lived only in the free-text conditions prose.
// No block means no lifts, not a wrong guess at the next paragraph.
test('arctic-valley reports nothing when the page has no Lift Status block', async () => {
  assert.deepEqual(await lifts('arctic-valley-no-block', '2026-02-01T09:00:00Z'), {});
});
