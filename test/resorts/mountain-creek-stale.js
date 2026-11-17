import assert from 'node:assert/strict';
import test from 'node:test';
import { stampDate } from '../../lib/resorts/mountain-creek/report.js';
import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The February capture read on 2026-11-17: "Saturday, February 7th" places in
// 2026 (the weekday matches), nine months old, so nothing publishes - not even
// "closed".
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('mountain-creek', 'html', {}, { example: 'mountain-creek-2026-02' });
trails('mountain-creek', [], { example: 'mountain-creek-2026-02' });

test('mountain-creek: the yearless stamp lands in the year its weekday fits', () => {
  const now = RealDate.parse('2026-11-17T15:00:00Z');
  assert.equal(stampDate('Saturday, February 7th', now).getFullYear(), 2026);
  assert.equal(stampDate('Updated: Monday, November 2nd', now).getFullYear(), 2026);
  // 2026-12-05 is a Saturday, but in the future: last year's is a Friday, so
  // it falls back to the newest past one
  assert.equal(stampDate('Saturday, December 5th', now).getFullYear(), 2025);
  // 2025-02-07 was a Friday
  assert.equal(stampDate('Friday, February 7th', now).getFullYear(), 2025);
  assert.equal(stampDate('Opening day soon', now), undefined);
});
